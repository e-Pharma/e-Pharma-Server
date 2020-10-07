const express = require('express');
const mongoose = require("mongoose");
const Medicine = require('../models/medicine');
const response = require('../utils/response');
const Logger = require("../utils/logger");
const logger = new Logger();

//add new medicine
exports.addMedicine=async(req, res) => {
    console.log(req.body);
    const medicine = new Medicine({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        unit_price: req.body.unitPrice
    });
    console.log(medicine.name);
    medicine.save()
        .then(result => {
            logger.info("Sucess", result);
            return response(res, result._id, 201, "Successfully Created!");
        })
        .catch(err => {
            logger.error(err);
            return response(res, null, 500, "Server Error!");
    });
}

//get medicine
exports.getMedicine=(req, res)=>{
    Medicine.find((err,data)=>{
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