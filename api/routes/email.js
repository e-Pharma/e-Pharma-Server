const express = require("express");
const router = express.Router();

const handler = require("../handlers/verification");

router.post("/send_verification", handler.sendVerification)

module.exports = router;
