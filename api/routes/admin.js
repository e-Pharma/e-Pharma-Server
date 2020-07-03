const express = require("express");
const router = express.Router();

const handler = require("../handlers/admin_order");
const clientHandler = require('../handlers/admin_client');


router.get("/order/get", handler.getOrders);
router.get("/order/get/:id",handler.getOrder);
router.post("/order/create", handler.addOrder);
router.delete("/order/delete", handler.deleteOrder);
// router.delete("/orderTemp/delete", handler.deleteOrderTemp);
// router.get("/orderTemp/get", handler.getOrderTemp);

router.get("/verifiedClients", clientHandler.getVerifiedClients);
router.get("/notVerifiedClients", clientHandler.getNotVerifiedClients);
router.get("/client/:id", clientHandler.getClient);
router.get("/clientOrders/:email", clientHandler.getClientOrders);

module.exports = router;
