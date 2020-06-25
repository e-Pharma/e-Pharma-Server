const express = require("express");
const router = express.Router();

const handler = require("../handlers/admin_order");
const clientHandler = require('../handlers/admin_client');


router.get("/orders", handler.getOrders);
router.get("/order/:id",handler.getOrder);
router.post("/order/create", handler.addOrder);

router.get("/verifiedClients", clientHandler.getVerifiedClients);
router.get("/notVerifiedClients", clientHandler.getNotVerifiedClients);
router.get("/client/:id", clientHandler.getClient);
router.get("/clientOrders/:email", clientHandler.getClientOrders);

module.exports = router;
