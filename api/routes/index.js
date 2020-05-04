const express = require('express')
const path = require('path')

const router = express.Router()

const authRoutes = require("./auth")

router.get('/', function (req, res){
    console.log(__dirname)
    // res.sendFile($__dirname +'/homepage.html`)
    res.sendFile(path.join(__dirname, '../../views', 'homepage.html'));
});

router.use('/auth',authRoutes)

module.exports = router;
