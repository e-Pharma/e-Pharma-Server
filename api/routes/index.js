const express = require('express')
const path = require('path')

const router = express.Router()


router.get('/', function (req, res){
    console.log(__dirname)
    // res.sendFile($__dirname +'/homepage.html`)
    res.sendFile(path.join(__dirname, '../../views', 'homepage.html'));
})



module.exports = router;
