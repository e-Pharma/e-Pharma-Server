const express = require('express');
const Driver = require('../models/driver');
const response = require('../utils/response');

//view drivers (delivery persons)
exports.viewDrivers=(req, res)=>{
    Driver.find({isDeleted:false}, (err,data)=>{
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

//add new driver (delivery person)
exports.addNewDriver=(req, res)=>{
    Driver.insert(req.body, (err,data)=>{
        if(err){
            console.log(err);
            return response(res, null, 500, "Server Error");
        }
        else{
            res.json(data);
            return response(res, data, 200, "Success");
        }
    })
}