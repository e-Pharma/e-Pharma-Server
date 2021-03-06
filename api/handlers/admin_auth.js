const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

const Admin = require("../models/admin");

/**
 * Return new user token
 * @param {string} officerID: officer's ID
 * @param {string} password: officer's password
 * @return {string} 201: Token
 */

exports.login = async (req, res, next) => {
    Admin.find({ user_name: req.query.user_name })
      .exec()
      .then(admin => {
        if (admin.length < 1) return response(res, null, 401, "Auth failed not oneS");
        bcrypt.compare(req.query.password, admin[0].password, (err, result) => {
          if (err) {
            logger.error(err);
            return response(res, null, 401, "Auth failed password");
          }
  
          if (!result) return response(res, null, 401, "Auth failed here");
  
          logger.info(
            "Officer",
            admin[0].user_name,
            "(permission level",
            admin[0]._id,
            ") authorized"
          );
          const token = jwt.sign(
            {
              id: admin[0]._id,
              adminID: admin[0].user_name,
              pos:"admin",
              first_name: admin[0].user_name,
              role: 1
            },
            // data.JWT_SECRET,
            process.env.JWT_SECRET,
            {

            //   expiresIn: "1h"
            }
          );
  
          return response(res, {
            token: token
          });
        });
      })
      .catch(err => {
        logger.error(err);
        return response(res, null, 500, err);
      });
  }; 

  exports.passwordUpdate = async (req, res) => {
    if (req) {
      logger.info("Password update request for", req.params.officer_id);
  
      Admin.findOne({ user_name: 'admin' })
        .exec()
        .then(user => {
          if (!!user) {
            bcrypt.compare(req.body.old_pass, user.password, (err, result) => {
              if (err) {
                logger.error(err);
                return response(res, null, 401, "Invalid password");
              }
  
              if (!result) return response(res, null, 401, "Invalid password");
              bcrypt.hash(req.body.new_pass, 10, (err, hash) => {
                if (err) {
                  logger.error(err);
                  return response(res, null, 500, err);
                }
                const updateDoc = {
                  password: hash
                };
  
                Admin.updateOne(
                  { user_name: 'admin' },
                  updateDoc
                )
                  .exec()
                  .then(result => {
                    if (result) {
                      response(res, null, 202, "Password updated");
                    }
                  })
                  .catch(err => response(res, null, 500, err));
              });
            });
          } else {
            response(res, null, 404, "Invalid id");
          }
        })
        .catch(err => response(res, null, 500, err));
    } else {
      response(res, null, 404, "id not found");
    }
  };