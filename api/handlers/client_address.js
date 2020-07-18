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

/*add new address to the address book*/
exports.addNewAddress=(req,res)=>{
    // const token = req.headers['authorization'].slice(6);
    // const isVerified = jwtVerify.verifyJWT(token);

    // if(isVerified.isTrue){

/*find by ducument id and update and push item in array*/
    const docId=req.params.id;
    console.log(docId)
    //console.log(req.body.items)
    Address.findByIdAndUpdate(docId,
        {$push:{items:req.body.items}},
        {safe:true,upsert:true},
        function(err,doc){
            if(err){
                console.log(err);
                return response(res,null,500,err);

            }else{
                console.log("Successfully added");
                return response(res, null, 200, "Success");

            }
        }
        )

}

exports.deleteAddress=(req,res)=>{
    const docId={_id:req.params.id}
    Address.findByIdAndUpdate(docId,
        {$pull:{items:req.body.items}},
        {safe:true,upsert:true},
        function(err,doc){
            if(err){
                console.log(err);
                return response(res,null,500,err);

            }else{
                console.log("Deleted Successfully");
                return response(res, null, 200, "Success");
            }
        }
    )
}
