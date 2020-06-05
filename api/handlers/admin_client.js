const express = require('express');
const Client = require('../models/client');

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