const express = require('express');
const Client = require('../models/client');

exports.getClients = (req,res)=>{
    Client.find((err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log(data);
            res.send(data);
            //res.end("Data retreived successfully");
        }
    })
}