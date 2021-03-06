const express = require("express");
const mongoose = require("mongoose");
const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

const Order = require("../models/order");
const Feedback =require("../models/feedback")
const Notification = require("../models/notification");
const jwt = require("jsonwebtoken");
const jwtVerify = require("../handlers/verifyJWT");
const notification = require("../models/notification");

exports.getOrders = async (req, res) => {

    // Order.find({clientId}, (err, orders) => {
    //     if(err) {
    //       logger.error(err);
    //       return response(res, null, 500, err);
    //     } else {
    //       logger.info("Success", orders);
    //       return response(res, orders, 200, "Success");
    //     }
    //   });

  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  if(isVerified.isTrue) {
    const clientId = isVerified.data.id;
    Order.find({ clientId: clientId}, (err, orders) => {
      if(err) {
        logger.error(err);
        return response(res, null, 500, err);
      } else {
        logger.info("Success", orders);
        return response(res, orders, 200, "Success");
      }
    });
  } else {
    logger.error(isVerified.isTrue);
    return response(res, null, 400, "Bad Request");
  }
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

exports.addOrder = async (req, res) => {
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  var order;
  console.log(req.body.non_prescription)
  if(isVerified.isTrue) {
    if(req.body.non_prescription === [] || req.body.non_prescription === undefined) {
        order = new Order({
            _id: new mongoose.Types.ObjectId,
            clientId: isVerified.data.id,
            email: req.body.email,
            patient: req.body.first_name+ " "+req.body.last_name,
            contact: req.body.contact,
            delivery_address: req.body.address,
            dob: req.body.dob,
            note: req.body.note,
            lat: req.body.lat,
            long: req.body.long,
            prescription_url: req.body.image,
            note: req.body.note,
            nic: req.body.nic,
          });
    } else {
        order = new Order({
            _id: new mongoose.Types.ObjectId,
            clientId: isVerified.data.id,
            email: req.body.email,
            patient: req.body.first_name+ " "+req.body.last_name,
            contact: req.body.contact,
            delivery_address: req.body.address,
            dob: req.body.dob,
            note: req.body.note,
            non_prescription: req.body.non_prescription,
            // lat: req.body.lat,
            // long: req.body.long,
            prescription_url: req.body.image,
            note: req.body.note,
            nic: req.body.nic,
          });
    }

    var notification = new Notification({
      _id: new mongoose.Types.ObjectId,
      name: req.body.first_name+ " "+req.body.last_name,
      action: "placed an order at "
    });

    order.save()
         .then(result => {
          notification.save().then(res=>{
            logger.info("Success",res)
          }).catch(error=>{
            logger.error(err);
          });
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

exports.addNonPrscriptionOrder = async (req, res) => {
  const token = req.headers['authorization'].slice(6);
  console.log(req.body.non_prescription)
  const isVerified = jwtVerify.verifyJWT(token);
  if(isVerified.isTrue) {
    const order = new Order({
      _id: new mongoose.Types.ObjectId,
      clientId: isVerified.data.id,
      email: req.body.email,
      patient: req.body.first_name+ " "+req.body.last_name,
      contact: req.body.contact,
      delivery_address: req.body.address,
      dob: req.body.dob,
      note: req.body.note,
      lat: req.body.lat,
      long: req.body.long,
      non_prescription: req.body.non_prescription,
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
    return response(res, null, 200, "Invalid Token!");
  }
}

exports.getNotifications = async (req, res) => {
  console.log(req.headers)
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  console.log(isVerified)
  if (isVerified.isTrue) {
    logger.info("Success", isVerified);
        const clientId = isVerified.data.id;
        const email = isVerified.data.email
        console.log(clientId);
        Order.find({clientId: clientId, email: email, status: 'reviewed'}, (err, order) => {
          if(err) {
            logger.error(err);
            return response(res, null, 500, "Server Error")
          } else {
            logger.info("Success", order)
            return response(res, {list: order, count: order.length}, 200, "Success")
          }
        });
  } else {
    logger.error(isVerified.isTrue);
    return response(res, null, 400, "Bad Request");
  }
}

exports.cancelOrder = async (req, res) => {
  console.log(req.headers)
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  console.log(isVerified)
  if (isVerified.isTrue) {
    Order.findByIdAndUpdate(req.params.id, { $set: { status: 'rejected'}}, (err, order) => {
      if (err) {
        logger.error(err)
        return response(res, null, 500, "Server Error")
      } else {
        logger.info("Success", order)
        return response(res, null, 200, "Success")
      }
    });
  } else {
    logger.error(isVerified.isTrue)
    return response(res, null, 200, "Invalid Token")
  }
}

exports.payOrder = async (req, res) => {
  console.log(req.headers)
  const token = req.headers['authorization'].slice(6);
  const isVerified = jwtVerify.verifyJWT(token);
  console.log(isVerified)
  if (isVerified.isTrue) {
    Order.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status }}, (err, order) => {
      if (err) {
        logger.error(err)
        return response(res, null, 500, "Server Error")
      } else {
        logger.info("Success", order)
        return response(res, null, 200, "Success")
      }
    });
  } else {
    logger.error(isVerified.isTrue)
    return response(res, null, 200, "Invalid Token")
  }

  exports.deleteAllOrders = async(req, res) => {
    Order.findOneAndDelete({ clientId: req.params.id }, (err, res) => {
      if(err) logger.error(err)
      else{
        return response(res, null, 200, "Success")
      }
    })
  }

  /* client order feedback
  exports.orderFeedback = async(res,req) => {
      if(req&&req.params && req.params.id){
        Order.findOne({_id:req.params.id})
          .exec()
          .then(order =>{
            const editField={
              feedback:req.body.feedback
            }
            Order.updateOne({_id:req.params.id},editField)
              .exec()
              .then(result=>{
                if(result){
                  console.log("Feedback added successfully");
                  return response(res,result,200,"Success")
                }
              })
              .catch(err=>response(res,null,500,err));
          })
      }else{
        return response(res,null,400,"Client not found")
      }

    // Order.findByIdAndUpdate(req.params.id,{$set:{feedback:req.body.feedback}},(err)=>{
    //   if (err) {
    //     console.log(err)
    //     return response(res, null, 500, "Server Error")
    //   } else {
    //     console.log("Success")
    //     return response(res, null, 200, "Success")
    //   }
    //  })

  }
  */
}