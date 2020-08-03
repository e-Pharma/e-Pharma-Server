const express = require("express");
const router = express.Router();

const handler = require("../handlers/admin_order");
const clientHandler = require('../handlers/admin_client');
const adminLogin = require("../handlers/admin_auth");
const driverHandler = require('../handlers/admin_driver');

router.get("/orders", handler.getOrders);
router.get("/order/:id",handler.getOrder);
// router.get("/order/get", handler.getOrders);
// router.get("/order/get/:value",handler.getOrder);
router.post("/updateOrder/:id",handler.updateOrder);

router.get("/login",adminLogin.login);

//ADMIN CLIENT
router.get("/verifiedClients", clientHandler.getVerifiedClients);
router.get("/notVerifiedClients", clientHandler.getNotVerifiedClients);
router.get("/client/:id", clientHandler.getClient);
router.get("/clientOrders/:email", clientHandler.getClientOrders);

//ADMIN DRIVER (DELIVERY PERSON)
router.get("/drivers", driverHandler.viewDrivers);
router.post("/addDriver", driverHandler.addDriver);
router.put("/deleteDriver/:id", driverHandler.deleteDriver); //set isDeleted=true

module.exports = router;
   