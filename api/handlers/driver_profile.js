const express = require("express");
const mongoose = require("mongoose");
const Driver = require('../models/driver');

const response = require("../utils/response");
const driver = require("../models/driver");  

//get driver details
exports.getDriver=(req,res)=>{
    Driver.findById(req.params.id,(err,data)=>{
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
//edit driver details(name,address,contact number)
exports.editDriver=async(req,res)=>{
    if(req && req.params && req.params.id){
    Driver.findOne({_id:req.params.id})
        .exec()
        .then(driver=>{
            if(driver){
                console.log(req.body.user_name)
                const editFields={
                    user_name:req.body.user_name,
                    address:req.body.address,
                    phone:req.body.phone
                }
                Driver.updateOne({_id:req.params.id},editFields)
                    .exec()
                    .then(result=>{
                        if(result){
                            console.log("updated successfully");
                            return response(res, result, 202, "Success");  
                        }
                     })
                     .catch(err => response(res, null, 500, err));
            }else{
                response(res, null, 404, "Invalid order id");
            }
           
        }).catch(err=>response(res,null,500,err));
    }else{
        return response(res,null,400,"Driver not available")
    }
}




