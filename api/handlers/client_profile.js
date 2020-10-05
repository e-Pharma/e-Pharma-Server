const express = require("express");
const mongoose = require("mongoose");
const Client = require('../models/client');
const Feedback =require("../models/feedback")

const response = require("../utils/response");

//get user details
exports.getUser=(req,res)=>{
    Client.findById(req.params.id,(err,data)=>{
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
//edit user details(name,address,contact number)
exports.editUser=async(req,res)=>{
    if(req && req.params && req.params.id){
    Client.findOne({_id:req.params.id})
        .exec()
        .then(user=>{
            const editFields={
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                address:req.body.address,
                contact_number:req.body.contact_number
            }
            Client.updateOne({_id:req.params.id},editFields)
                .exec()
                .then(result=>{
                    if(result){
                        console.log("updated successfully");
                        return response(res, result, 200, "Success");  
                    }
                 })
                 .catch(err => response(res, null, 500, err));
        })
    }else{
        return response(res,null,400,"no client id found")
    }
}


exports.orderFeedback=(req,res)=>{
    const docId=req.params.id;
    console.log(docId)
    var item = new Array();
    console.log(req.body)

    Feedback.findByIdAndUpdate(docId,
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
}



