const express = require("express");
const router = express.Router();

const handler = require("../handlers/client_orders");
const clientHandler = require('../handlers/client_profile')
const addressHandler = require('../handlers/client_address')

router.get("/order/get", handler.getOrders);
router.get("/order/get/:id",handler.getOrder);
router.post("/order/create", handler.addOrder);
router.delete("/order/delete", handler.deleteOrder);
router.post("/order/create/non_prescription", handler.addNonPrscriptionOrder);


router.get("/get/:id",clientHandler.getUser);
router.get("/viewAddress/:id",addressHandler.getAddress)
router.post("/addNewAddress",addressHandler.addNewAddress)
router.post("/edit/:id",clientHandler.editUser)

module.exports = router;
