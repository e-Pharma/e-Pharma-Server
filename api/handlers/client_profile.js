const express = require("express");
const mongoose = require("mongoose");
const Client = require('../models/client');
const Feedback =require("../models/feedback")
const nodemailer =require('nodemailer');
const mailgun =require('nodemailer-mailgun-transport')
const response = require("../utils/response");
const apiKeys =require("../api keys/mailgun");

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

exports.sendInquiery=(req,res)=>{
    const auth ={
        api_key :apiKeys.api_key,
        domain:apiKeys.domain
    }

    // const transporter =nodemailer.createTransport(mailgun(auth));
    const transporter =nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'thilini96ucsc@gmail.com',
            pass:'t@ucsc96'
        }
    });

    const mailOptions ={
        from:'thilini96ucsc@gmail.com',
        to:'thilinihk96@gmail.com',
        subject:'e-Pharma test',
        text:`Hello Thilini testing nodemailer`
    };

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log('error sending mail',err);
        }else{
            console.log('Email sent',info.response)
        }

    })

}



