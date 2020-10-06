const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Order = require('../models/order');
const Client = require('../models/client');
const response = require('../utils/response');
const Logger = require("../utils/logger");
const logger = new Logger();

//total orders card (count)
exports.getTotalOrders=(req,res)=>{
    Order.countDocuments((err,data)=>{
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

//completed orders card (count)
exports.getCompletedOrders=(req,res)=>{
    Order.countDocuments({"status":"delivered"},(err,data)=>{
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

//rejected orders card (count)
exports.getRejectedOrders=(req,res)=>{
    Order.countDocuments({"status":"rejected"},(err,data)=>{
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

//Total Clients (count)
exports.getTotalClients=(req,res)=>{
    Client.countDocuments({"is_verified":true},(err,data)=>{
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