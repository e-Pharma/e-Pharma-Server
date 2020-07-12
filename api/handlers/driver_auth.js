const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

const Driver = require("../models/driver");

/**
 * Return new user token
 * @param {string} staffID: driver's ID
 * @param {string} password: driver's password
 * @return {string} 201: Token
 */

exports.login = async (req, res, next) => {
    Driver.find({ user_name: req.query.user_name })
      .exec()
      .then(driver => {
        if (driver.length < 1) return response(res, null, 401, "Auth failed not oneS");
        bcrypt.compare(req.query.password, driver[0].password, (err, result) => {
          if (err) {
            logger.error(err);
            return response(res, null, 401, "Auth failed password");
          }
  
          if (!result) return response(res, null, 401, "Auth failed here");
  
          logger.info(
            "Staff",
            driver[0].user_name,
            "(permission level",
            driver[0]._id,
            ") authorized"
          );
          const token = jwt.sign(
            {
                
              id: driver[0]._id,
              driverID: driver[0].user_name,
              pos:"driver",
              first_name: driver[0].user_name,
              role: 1
            },
            data.JWT_SECRET,
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