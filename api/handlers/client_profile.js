const express = require("express");
const mongoose = require("mongoose");
const Client = require('../models/client');

const response = require("../utils/response");

//get user details
exports.getUser=(req,res)=>{
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



