const express = require("express");
const mongoose = require("mongoose");
const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

const Order = require("../models/order");


exports.getOrder = (req, res) => {
   
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
     
  }
  
  
  