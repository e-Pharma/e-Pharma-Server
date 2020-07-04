const express = require("express");
const router = express.Router();

const handler = require("../handlers/admin_order");
const clientHandler = require('../handlers/admin_client');
const adminLogin = require("../handlers/admin_auth");

router.get("/orders", handler.getOrders);
router.get("/order/:id",handler.getOrder);
// router.get("/order/get", handler.getOrders);
// router.get("/order/get/:value",handler.getOrder);

router.get("/login",adminLogin.login);

router.get("/verifiedClients", clientHandler.getVerifiedClients);
router.get("/notVerifiedClients", clientHandler.getNotVerifiedClients);
router.get("/client/:id", clientHandler.getClient);
router.get("/clientOrders/:email", clientHandler.getClientOrders);

module.exports = router;
   