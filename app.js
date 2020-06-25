const express = require('express')
const connedtDB = require('./db/connection')
const routes = require('./api/routes')
const path = require('path')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
// const fileuploader = require('express-fileupload')

const PORT = process.env.PORT || 3000
connedtDB()

app.use(cors())
// app.use(fileuploader({createParentPath: true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'views'));
app.use("/",routes)
app.listen(PORT,function(){
    console.log('Server started on port 3000')
});