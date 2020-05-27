const express = require('express');
const User = require('../models/user');

exports.getUsers = (req,res)=>{
    User.find((err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log(data);
            res.end("Data retreived successfully");
        }
    })
}