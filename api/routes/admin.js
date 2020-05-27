const express = require("express");
const router = express.Router();

const handler = require("../handlers/admin_order");

const userHandler = require("../handlers/admin_user");



router.get("/orders", handler.getOrders);

router.get("/users", userHandler.getUsers);


module.exports = router;
