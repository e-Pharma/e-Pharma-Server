const express = require("express");
const mongoose = require("mongoose");
const Driver = require('../models/driver');
const Order = require("../models/order");
const Logger = require("../utils/logger");

const logger = new Logger();

const response = require("../utils/response");
const driver = require("../models/driver");  

//get driver details
exports.getDriver=(req,res)=>{
    Driver.findById(req.params.id,(err,data)=>{
        if(err){
            console.log(err);
            return response(res, null, 500, "Server Error");
        }
        else{
            console.log(data);
            return response(res, data, 200, "Success");
        }
    })
}

//get order details
exports.getOrder=(req,res)=>{
    Order.findById(req.params.id,(err,data)=>{
        if(err){
            console.log(err);
            return response(res, null, 500, "Server Error");
        }
        else{
            console.log(data);
            return response(res, data, 200, "Success");
        }
    })
}

//edit driver details(name,address,contact number)
exports.editDriver=async(req,res)=>{
    if(req && req.params && req.params.id){
    Driver.findOne({_id:req.params.id})
        .exec()
        .then(driver=>{
            if(driver){
                console.log(req.body.user_name)
                const editFields={
                    user_name:req.body.user_name,
                    address:req.body.address,
                    phone:req.body.phone
                }
                Driver.updateOne({_id:req.params.id},editFields)
                    .exec()
                    .then(result=>{
                        if(result){
                            console.log("updated successfully");
                            return response(res, result, 202, "Success");  
                        }
                     })
                     .catch(err => response(res, null, 500, err));
            }else{
                response(res, null, 404, "Invalid order id");
            }
           
        }).catch(err=>response(res,null,500,err));
    }else{
        return response(res,null,400,"Driver not available")
    }
}

// exports.getOrders = async (req, res) => {

//     Order.find({status:"pending"}, (err, orders) => {
//         if(err) {
//           logger.error(err);
//           return response(res, null, 500, err);
//         } else {
//           console.log(orders);
//           logger.info("Success", orders);
//           return response(res, orders, 200, "Success");
//         }
//       });

// };

//retrieve pending orders
exports.getPendingOrders = async (req, res) => {
    var value = req.query.value;
    console.log(typeof value);
    console.log(value);
    Order.find({ status: "pending" })
      .exec()
      .then(orders => {
        response(res, orders);
        console.log(orders);
      })
      .catch(err => response(res, null, 500, err));
};

//retrieve ongoing orders
exports.getOngoingOrders = async (req, res) => {
    var value = req.query.value;
    console.log(typeof value);
    console.log(value);
    Order.find({ status: "ongoing" })
      .exec()
      .then(orders => {
        response(res, orders);
        console.log(orders);
      })
      .catch(err => response(res, null, 500, err));
};

//retrieve completed orders
exports.getCompletedOrders = async (req, res) => {
    var value = req.query.value;
    console.log(typeof value);
    console.log(value);
    Order.find({ status: "completed" })
      .exec()
      .then(orders => {
        response(res, orders);
        console.log(orders);
      })
      .catch(err => response(res, null, 500, err));
};

//retrieve delivered orders
exports.getDeliveredOrders = async (req, res) => {
    var value = req.query.value;
    console.log(typeof value);
    console.log(value);
    Order.find({ status: "delivered" })
      .exec()
      .then(orders => {
        response(res, orders);
        console.log(orders);
      })
      .catch(err => response(res, null, 500, err));
};

//update the pending order status
exports.editOrderStatus=async(req,res)=>{
    if(req && req.params && req.params.id){
        console.log(req.body.status)
    Order.findOne({_id:req.params.id})
        .exec()
        .then(order=>{
            if(order){
                const editFields={
                    status:req.body.status,

                }
                Order.updateOne({_id:req.params.id},editFields)
                    .exec()
                    .then(result=>{
                        if(result){
                            console.log("status changed");
                            return response(res, result, 202, "Success");  
                        }
                     })
                     .catch(err => response(res, null, 500, err));
            }else{
                response(res, null, 404, "Invalid order id");
            }
           
        }).catch(err=>response(res,null,500,err));
    }else{
        return response(res,null,400,"Order not available")
    }
}

//update the latitude of driver
exports.updateLocation=async(req,res)=>{
    if(req && req.params && req.params.id){
        console.log(req.body.lat),
        console.log(req.body.long),
        
    Driver.findOne({_id:req.params.id})
        .exec()
        .then(order=>{
            if(order){
                const editFields={
                    lat:req.body.lat,
                    long:req.body.long
                }
                Order.updateOne({_id:req.params.id},editFields)
                    .exec()
                    .then(result=>{
                        if(result){
                            console.log("Location updated");
                            return response(res, result, 202, "Success");  
                        }
                     })
                     .catch(err => response(res, null, 500, err));
            }else{
                response(res, null, 404, "Invalid driver id");
            }
           
        }).catch(err=>response(res,null,500,err));
    }else{
        return response(res,null,400,"Driver not available")
    }
}

