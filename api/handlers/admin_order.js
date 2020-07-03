const express = require("express");
const mongoose = require("mongoose");
const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

const Order = require("../models/order");
const OrderTemp = require("../models/order_temp");
var orderArray = new Array();
const jwt = require("jsonwebtoken");
const jwtVerify = require("../handlers/verifyJWT")

exports.getOrders = async (req, res) => {
    Order.find({})
      .exec()
      .then(orders => {
        response(res, orders);
        console.log(orders);
      })
      .catch(err => response(res, null, 500, err));
};

exports.getOrder = async (req, res) => {
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  if(isVerified.isTrue) {
    Order.findById(req.params.id,(err,data)=>{
      if(err){
          console.log(err);
          return response(res, null, 500, "Error");
      }
      else{
          console.log(data);
          return response(res, data, 200, "Success");
      }
    });
  } else {
    logger.error("Error");
    return response(res, null, 400, "Bad Request");
  }
}

exports.getOrderTemp = async (req, res) => {
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  if(isVerified.isTrue) {
    const clientId = isVerified.data.id;
    OrderTemp.find({client_id: clientId})
    .exec()
    .then(orders => {
      logger.info("Success", orders);
      return response(res, orders, 200, "Success");
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, "Server Error");
    });
  }
}

exports.deleteOrder = async (req, res) => {
  Order.deleteMany({}, (err, result) => {
    if(err) {
      logger.error(err);
      return response(res, null, 500, "Server Error");
    } else {
      logger.info("Success", result)
      return response(res, null, 200, "Success");
    }
  })
}

exports.deleteOrderTemp = async (req, res) => {
  OrderTemp.deleteMany({}, (err, result) => {
    if(err) {
      logger.error(err);
      return response(res, null, 500, "Server Error");
    } else {
      logger.info("Success", result);
      return response(res, null, 200, "Success");
    }
  });
}

exports.addOrder = async (req, res) => {
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  if(isVerified.isTrue) {
    const order = new Order({
      _id: new mongoose.Types.ObjectId,
      email: req.body.email,
      patient: req.body.first_name+ " "+req.body.last_name,
      contact: req.body.contact,
      delivery_address: req.body.address,
      dob: req.body.dob,
      // lat: req.body.lat,
      // long: req.body.long,
      prescription_url: req.body.image,
      note: req.body.note,
      nic: req.body.nic
    });

    order.save()
         .then(result => {
          logger.info("Sucess", result);
          return response(res, result._id, 201, "Successfully Created!");
         })
         .catch(err => {
           logger.error(err);
           return response(res, null, 500, "Server Error!");
         });
  } else {
    logger.error(isVerified);
    return response(res, null, 400, "Bad Request!");
  }
}

    // var value = req.query.value;
    //  console.log(typeof value);
    //  console.log(value);
    //  Order.find({status:value})
    //    .exec()
    //    .then(orders => {
    //      response(res, orders);
    //      console.log(orders);
    //    })
    //    .catch(err => response(res, null, 500, err));
  


  // exports.getOrders = async (req, res) => {
  //   if (req && req.params && req.params.val) {
  //     val = req.params.val;
  //     Order.find({val:false })
  //       .exec()
  //       .then(user => {
  //         if (!!user) {
  //           Fine.find({ driver: user._id })
  //             .sort({ issued_at: -1 })
  //             .exec()
  //             .then(docs => {
  //               response(res, docs);
  //             })
  //             .catch(err => response(res, null, 500, err));
  //         } else {
  //           response(res, null, 404, "Invalid driver id");
  //         }
  //       })
  //       .catch(err => response(res, null, 500, err));
  //   } else {
  //     response(res, null, 404, "No driver id found");
  //   }
  // };