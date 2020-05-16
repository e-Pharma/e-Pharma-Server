const express = require('express')
const path = require('path')

const router = express.Router()

const authRoutes = require("./auth")
const adminRoutes = require("./admin")

router.get('/', function (req, res){
    console.log(__dirname)
    // res.sendFile($__dirname +'/homepage.html`)
    res.sendFile(path.join(__dirname, '../../views', 'homepage.html'));
    //res.send("Welcome")
});

router.use('/auth',authRoutes);
router.use('/admin',adminRoutes);

module.exports = router;
