const express = require("express");
const router = express.Router();

const handler = require("../handlers/auth");

router.get("/login", handler.clientLogin);
router.post("/register", handler.clientReg);

module.exports = router;
