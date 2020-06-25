const express = require("express");
const mongoose = require("mongoose");
const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

const Order = require("../models/order");

exports.getOrders = async (req, res) => {
   var value = req.query.value;
    console.log(typeof value);
    console.log(value);
    Order.find({status:value})
      .exec()
      .then(orders => {
        response(res, orders);
        console.log(orders);
      })
      .catch(err => response(res, null, 500, err));
  };

  exports.getOrder = async (req, res) => {

    Order.findById(req.params.id,(err,data)=>{
      if(err){
          console.log(err);
          return;
      }
      else{
          console.log(data);
          res.send(data);
      }
  });

  exports.addOrder = async (req, res) => {

    const order = new Order({
      _id: new mongoose.Types.ObjectId,
      email: req.body.email,
      patient: req.body.patient,
      contact: req.body.contact,
      delivery_address: req.body.address,
      lat: req.body.lat,
      long: req.body.long,
      prescription_url: req.body.image,
      note: req.body.note
    });

    order.save()
         .then(result => {
           logger.info("Sucess", result);
           return response(res, result, 201, "Successfully Created!");
         })
         .catch(err => {
           logger.error(err);
           return response(res, null, 500, "Server Error!");
         });
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
   };


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