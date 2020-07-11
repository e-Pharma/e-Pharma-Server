const express = require("express");
const router = express.Router();

// const handler = require("../handlers/admin_order");
// const clientHandler = require('../handlers/admin_client');
const driverLogin = require("../handlers/driver_auth");

// router.get("/orders", handler.getOrders);
// router.get("/order/:id",handler.getOrder);
// router.get("/order/get", handler.getOrders);
// router.get("/order/get/:value",handler.getOrder);
// router.post("/updateOrder/:id",handler.updateOrder);

router.get("/login",driverLogin.login);

// router.get("/verifiedClients", clientHandler.getVerifiedClients);
// router.get("/notVerifiedClients", clientHandler.getNotVerifiedClients);
// router.get("/client/:id", clientHandler.getClient);
// router.get("/clientOrders/:email", clientHandler.getClientOrders);

module.exports = router;
   