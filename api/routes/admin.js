const express = require("express");
const router = express.Router();

const handler = require("../handlers/admin_order");



router.get("/orders", handler.getOrders);


module.exports = router;
