const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Feedback = require('../models/feedback');
const response = require('../utils/response');
const Logger = require("../utils/logger");
const logger = new Logger();

//get order feedback
exports.orderFeedback=(req, res)=>{
    Feedback.findById(req.params.id, (err,data)=>{
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