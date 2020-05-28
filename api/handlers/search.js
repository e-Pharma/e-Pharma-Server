
const express = require('express');

const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");
const Medicine = require('../models/medicine');

exports.getMedicines = async (req, res) => {
    var value = req.query.value;
     Medicine.find({},{name:1})
       .exec()
       .then(medicines => {
         response(res, medicines);
         console.log(medicines);
       })
       .catch(err => response(res, null, 500, err));
   };