const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

/* User authentication */

const Client = require("../models/client");

/**
 * Return new user token
 * @param {string} email: new clients email
 * @param {string} password: new user's password
 * @return {string} 201: Token
**/
exports.clientReg = async (req, res, next) => {
  console.log(req.body)
  Client.find({ email: req.body.email })
    .exec()
    .then(client => {
      if (client.length > 0)
        return response(res, null, 409, "User already registered");
        bcrypt.hash(req.body.password, 10, (err, hash) => {

        if (err) {
          logger.error(err);
          return response(res, null, 500, err);
        } else {
          const client = new Client({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            role: "client",
            permission_level:1,
            contact_number: req.body.contact,
            nic:req.body.nic,
            address:req.body.address,
            avatar_url:"",
            // Write image upload
          });

          client
            .save()
            .then(result => {
              logger.info("User created", result);
              const token = jwt.sign(
                {
                  id: result._id,
                  email: result.email,
                  first_name: result.first_name,
                },
                data.JWT_SECRET,
                {
                  //expiresIn: "1h"
                }
              );

              return response(res, token, 201, "User created");
            })
            .catch(error => {
              logger.error(error);
              return response(res, null, 500, error);
            });
        }
      });
    })
    .catch(err => {
      logger.error("kl"+err);
      return response(res, null, 500, err);
    });
};

exports.clientLogin = async (req, res, next) => {
  Client.find({ email: req.body.email })
    .exec()
    .then(client => {
      console.log(client)
      if (client.length < 1) return response(res, null, 401, "Auth Failed");
      bcrypt.compare(req.body.password, client[0].password, (err, result) => {
        if (err) {
          logger.error(err);
          return response(res, null, 401, "Auth Failed");
        }

        if (!result) return response(res, null, 401, "Auth Failed");

        logger.info(
          "User",
          client[0].first_name,
          "(permission level",
          client[0].last_name,
          ") authorized"
        );
        const token = jwt.sign(
          {
            id: client[0]._id,
            email: client[0].email,
            first_name: client[0].first_name,
          },
          data.JWT_SECRET,
          {
            //expiresIn: "1h"
          }
        );

        Client.findOneAndUpdate({email: req.body.email}, {$set: {isLoggedIn: true}}, (err, result) => {
          if(err) {
            logger.error(err);
            return response(res, null, 500, "Server Error");
          } else {
            var date = new Date().getTime();
            date+=(1*60*60*1000)
            logger.info("Success", result);
            return response(res, {
              token: token,
              expireDate: date
            });
          }
        });
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, err);
    });
};

exports.deleteAll = async(req, res) => {
  Client.deleteMany({}, (err, result) => {
    if(err) {
      logger.error(err)
      return response(res, null, 500, "Server Error")
    } else {
      logger.info("Success", result)
      return response(res, null, 200, "Success")
    }
  })
}