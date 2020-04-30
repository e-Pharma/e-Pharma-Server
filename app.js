const express = require('express')
const connedtDB = require('./db/connection')

const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
connedtDB()
