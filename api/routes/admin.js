const express = require("express");
const router = express.Router();

const handler = require("../handlers/admin_order");
const clientHandler = require('../handlers/admin_client');


router.get("/orders", handler.getOrders);

router.get("/clients", clientHandler.getClients);


module.exports = router;
