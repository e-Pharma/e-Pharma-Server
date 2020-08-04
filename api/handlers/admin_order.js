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
  var value = req.query.value;
  console.log(typeof value);
  console.log(value);
  Order.find({ status: value })
    .exec()
    .then(orders => {
      response(res, orders);
      console.log(orders);
    })
    .catch(err => response(res, null, 500, err));
};

exports.getOrder = async (req, res) => {

  Order.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    else {
      console.log(data);
      res.send(data);
    }
  });

}

exports.updateOrder = async (req, res, next) => {
  if (req && req.params && req.params.id) {
    logger.info("Update request for", req.params.id);

    Order.findOne({ _id: req.params.id })
      .exec()
      .then(order => {
        if (!!order) {
          const updateDoc = {
            delivery_charges: req.body.delivery_charges,
            full_amount: req.body.full_amount,
            medicine_list: req.body.medicine_list,
            status: req.body.status
          };
          Order.updateOne({ _id: req.params.id }, updateDoc)
            .exec()
            .then(result => {
              if (result) response(res, null, 202, "Order updated");
            })
            .catch(err => response(res, null, 500, err));
        } else {
          response(res, null, 404, "Invalid order id");
        }
      })
      .catch(err => response(res, null, 500, err));
  } else {
    response(res, null, 404, "No order id found here");
  }
};

  // exports.getOrder = async (req, res) => {
  //   var value = req.query.value;
  //   console.log(typeof value);
  //   console.log(value);
  //   Order.find({status:value})
  //     .exec()
  //     .then(orders => {
  //       response(res, orders);
  //       console.log(orders);
  //     })
  //     .catch(err => response(res, null, 500, err));
  // }


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
  // }