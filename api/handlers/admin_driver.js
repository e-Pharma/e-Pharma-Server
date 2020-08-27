const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Driver = require('../models/driver');
const response = require('../utils/response');
const Logger = require("../utils/logger");
const logger = new Logger();

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
exports.addDriver=async(req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err,hash)=>{
        if(err){
            logger.error(err);
            return response(res, null, 500, err);
        }
        else{
            const driver = new Driver({
                _id: new mongoose.Types.ObjectId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                vehicleNumber: req.body.vehicleNumber,
                user_name: req.body.username,
                password: hash,
                email: req.body.email,
                phone: req.body.contactNumber,
                address: req.body.address
            });
            console.log(driver.firstName);
            driver.save()
                .then(result => {
                    logger.info("Sucess", result);
                    return response(res, result._id, 201, "Successfully Created!");
                })
                .catch(err => {
                    logger.error(err);
                    return response(res, null, 500, "Server Error!");
            });
        }
    });
}

//delete driver
exports.deleteDriver = async(req,res)=>{
    Driver.findByIdAndUpdate(req.params.id, {
        isDeleted: true
    }, (err,data)=>{
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


//temporary update driver (for admin client tracker testing)
exports.updateDriverLatLong = async(req, res)=>{
    const io = req.app.get('io'); //This line must go into the driver's location (lat and long) update function
    Driver.findByIdAndUpdate(req.params.id, {
        lat: req.body.lat,
        long: req.body.long
    },(err,data)=>{
        if(err){
            console.log(err);
            return response(res, null, 500, "Server Error");
        }
        else{
            io.emit('locationUpdated'); //This line must go into the driver's location (lat and long) update function
            console.log(data);
            return response(res, data, 200, "Success");
        }
    })
}