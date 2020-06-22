const express = require('express');
const Client = require('../models/client');
const order = require('../models/order');

exports.getVerifiedClients = (req,res)=>{
    Client.find({is_verified:true},(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log(data);
            res.send(data);
            //res.end("Data retreived successfully");
        }
    })
}

exports.getNotVerifiedClients = (req,res)=>{
    Client.find({is_verified:false},(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log(data);
            res.send(data);
            //res.end("Data retreived successfully");
        }
    })
}

exports.getClient = (req,res)=>{
    Client.findById(req.params.id,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log(data);
            res.send(data);
        }
    })
}

exports.getClientOrders = (req,res)=>{
    order.find({"email":req.params.email},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.send(data);
        }
    })
}