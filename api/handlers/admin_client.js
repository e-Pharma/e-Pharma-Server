const express = require('express');
const Client = require('../models/client');
const Order = require('../models/order');
const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

//get verified clients
exports.getVerifiedClients = (req,res)=>{
    Client.find({is_verified:true},(err,data)=>{
        if(err){
            console.log(err);
            return response(res, null, 500, "Server Error");
        }
        else{
            console.log(data);
            return response(res, data, 200, "Success");
            //res.end("Data retreived successfully");
        }
    })
}

//get not verified clients
exports.getNotVerifiedClients = (req,res)=>{
    Client.find({is_verified:false},(err,data)=>{
        if(err){
            console.log(err);
            return response(res, null, 500, "Server Error");
        }
        else{
            console.log(data);
            return response(res, data, 200, "Success");
            //res.end("Data retreived successfully");
        }
    })
}

//get a single verified client by their _id
exports.getClient = (req,res)=>{
    Client.findById(req.params.id,(err,data)=>{
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

//get a specific client's orders, find by their email address
exports.getClientOrders = (req,res)=>{
    Order.find({"email":req.params.email},(err,data)=>{
        if(err){
            console.log(err);
            return response(res, null, 500, "Server Error")
        }
        else{
            console.log(data);
            return response(res, data, 200, "Success")
        }
    })
}