const express = require('express');
const Client = require('../models/client');
const Order = require('../models/order');
const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

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

exports.getClientOrders = (req,res)=>{
    order.find({"email":req.params.email},(err,data)=>{
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