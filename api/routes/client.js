const express = require("express");
const router = express.Router();
const client = require('../models/client')

router.get('/',function(req,res,next){
    res.send("user details here")
})
router.post('/insert',function(req,res,next){

})
router.post('/update',function(req,res,next){
    
})
router.post('/delete',function(req,res,next) 
})
module.exports = router;
