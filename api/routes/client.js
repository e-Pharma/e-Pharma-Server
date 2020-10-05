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
router.get('/order/get_notifications', handler.getNotifications);
router.put('/order/cancel_order/:id', handler.cancelOrder);
router.put('/order/pay_order/:id', handler.payOrder);


router.get("/get/:id",clientHandler.getUser);
router.post("/edit/:id",clientHandler.editUser);
router.get("/get/address/:id",addressHandler.getAddress);
router.post("/addNewAddress/:id",addressHandler.addNewAddress);
router.delete("/address-book/delete/:id",addressHandler.deleteAddress);
router.get("/address/getAll", addressHandler.getAllAddresses);

module.exports = router;
