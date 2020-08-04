const express = require('express')
const path = require('path')

const router = express.Router()

const authRoutes = require("./auth")
const adminRoutes = require("./admin")
const driverRoutes = require("./driver")
const emailRoutes = require("./email")
const searchRoutes = require("./search")
const imageRoutes = require("./image_upload")
const clientRoutes = require("./client")
const { hasUncaughtExceptionCaptureCallback } = require('process')

router.get('/', function (req, res){
    console.log(__dirname)
    // res.sendFile($__dirname +'/homepage.html`)
    res.sendFile(path.join(__dirname, '../../views', 'homepage.html'));
    //res.send("Welcome")

   
});

router.use('/auth',authRoutes);
router.use('/admin',adminRoutes);
router.use('/driver',driverRoutes);
router.use('/email',emailRoutes);
router.use('/search/',searchRoutes);
router.use('/image', imageRoutes);
router.use('/client', clientRoutes);


module.exports = router;
//all starts from here