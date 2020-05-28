const express = require("express");
const router = express.Router();

const handler = require("../handlers/search");




router.get("/medicines", handler.getMedicines);


module.exports = router;
