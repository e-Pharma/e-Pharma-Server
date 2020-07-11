const express = require("express");
const mongoose = require("mongoose");
const response = require("../utils/response");

const deliveryAddress = require('../models/delivery_address');
const Client =require('../models/client')
const jwt = require("jsonwebtoken");
const jwtVerify = require("../handlers/verifyJWT")

exports.getAddress=(req,res)=>{
    // const token = req.headers['authorization'].slice(6);
    // const isVerified = jwtVerify.verifyJWT(token);
    // if(isVerified.isTrue) {
    //     const clientId = isVerified.data.id;
        Client.find(req.params.id,(err,data)=>{
            // {clientId:clientId}
            if(err){
                console.log(err);
                return response(res,null,500,err);
            }
            else{
                console.log(data);
                return response(res, data.address, 200, "Success");
            }
        })
    // }else {
    //     // logger.error(isVerified.isTrue);
    //     return response(res, null, 400, "Bad Request");
    //   }
}

//add new address to the address book
exports.addNewAddress=(req,res)=>{
    // const token = req.headers['authorization'].slice(6);
    // const isVerified = jwtVerify.verifyJWT(token);

    // if(isVerified.isTrue){
        const newData=new deliveryAddress({
            _id:new mongoose.Types.ObjectId,
            clientId:"5eff0dbb44376c5f074aaa63",
            // isVerified.data.id,
            type:req.body.type,
            city:req.body.city,
            address:req.body.address
        });
        newData.save()
        .then(result=>{
            console.log("New Address Addded Successfully");
            return response(res,result._id,201,"New Address Addded Successfully")
        })
        .catch(err=>{
            console.log(err);
            return response(res,null,500,"Error Occurred");
        })
    // }
    // else{
    //     return response(res, null, 400, "Bad Request!");
    // }

}
