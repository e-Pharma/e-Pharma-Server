const express = require("express");
const mongoose = require("mongoose");
const response = require("../utils/response");

const Address = require('../models/delivery_address');
const Client =require('../models/client')
const jwt = require("jsonwebtoken");
const jwtVerify = require("../handlers/verifyJWT")
const Logger = require("../utils/logger");
const logger = new Logger();

exports.getAddress=(req,res)=>{
    const token = req.headers['authorization'].slice(6);
    const isVerified = jwtVerify.verifyJWT(token);
    console.log(isVerified.data.id)
    if(isVerified.isTrue){
        Address.find({clientId: isVerified.data.id}, (err,data)=>{
            if(err){
                console.log(err);
                return response(res,null,500,err);
            }
            else{
                console.log(data);
                return response(res, data.items, 200, "Success");
            }
        })
    } else {
        logger.error("Error", isVerified)
        return response(res, null, 400, "Bad Request!")
    }
    // // if(isVerified.isTrue) {
    // //     const clientId = isVerified.data.id;
    // Address.findById(req.params.id,(err,data)=>{
    //         // {clientId:clientId}
    //         if(err){
    //             console.log(err);
    //             return response(res,null,500,err);
    //         }
    //         else{
    //             console.log(data);
    //             return response(res, data.items, 200, "Success");
    //         }
    //     })
    // // }else {
    // //     // logger.error(isVerified.isTrue);
    // //     return response(res, null, 400, "Bad Request");
    // //   }
}

exports.getAllAddresses = (req, res) => {
    const token = req.headers['authorization'].slice(6);
    console.log("TOK"+token)
    const isVerified = jwtVerify.verifyJWT(token);
    if(isVerified.isTrue) {
        const clientId = isVerified.data.id;
        console.log("CLIENT:"+clientId)
        Address.findOne({ clientId: clientId },(err,data)=>{
            if(err){
                console.log(err);
                return response(res,null,500,err);
            }
            else{
                console.log("DATA:"+data)
                return response(res, data.items, 200, "Success");
            }
        });
    }else {
        logger.error(isVerified.isTrue);
        return response(res, null, 400, "Bad Request");
  }
}

/*add new address to the address book*/
exports.addNewAddress=(req,res)=>{
    /** Do not change. */
    const token = req.headers['authorization'].slice(6);
    const isVerified = jwtVerify.verifyJWT(token);

    if(isVerified.isTrue){
     console.log(req.body)

     Address.findOneAndUpdate({clientId: isVerified.data.id},
        // {$push:{items:item}},
        {$push:{items:req.body}},
       
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
    } else {
        console.log(err);
        return response(res,null,400,"Invalid Request");
    }

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

exports.deleteAll = async(req, res)=>{
    Address.deleteMany({},(err,res1)=>{
        if(err){
            logger.error(err)
            return response(res, null, 500, "Server Error")
        } else {
            logger.info(res1)
            return response(res, res1, 200, "Success")
        }
    })
}