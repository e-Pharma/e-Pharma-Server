const express = require("express");
const mongoose = require("mongoose");
const response = require("../utils/response");

const Address = require('../models/delivery_address');
const Client =require('../models/client')
const jwt = require("jsonwebtoken");
const jwtVerify = require("../handlers/verifyJWT")

exports.getAddress=(req,res)=>{
    // const token = req.headers['authorization'].slice(6);
    // const isVerified = jwtVerify.verifyJWT(token);
    // if(isVerified.isTrue) {
    //     const clientId = isVerified.data.id;
    Address.findById(req.params.id,(err,data)=>{
            // {clientId:clientId}
            if(err){
                console.log(err);
                return response(res,null,500,err);
            }
            else{
                console.log(data);
                return response(res, data, 200, "Success");
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
        Address.findById(req.params.id,(err,data)=>{
            if(err){
                

            }
            else{
                const newData=new Address({
                // _id:new mongoose.Types.ObjectId,
                _id:req.params.id,
                clientId:req.params.id,
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
        })
}

exports.deleteAddress=(req,res)=>{
    const query={_id:req.params.id}
    Address.deleteOne(query,(err,obj)=>{
        if(err){
            console.log(err);
            return response(res,null,500,err);
        }else{
            console.log("Deleted Successfully");
            return response(res, null, 200, "Success");
        }
    })
}
