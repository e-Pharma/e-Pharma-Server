const express = require("express");
const router = express.Router();

const handler = require("../handlers/client_orders");
const clientHandler = require('../handlers/client_profile')
const addressHandler = require('../handlers/client_address')
const driver=require('../handlers/driver_profile')
const trackOrder=require('../handlers/client_tracker')

router.get("/order/get", handler.getOrders);
router.get("/order/get/:id",handler.getOrder);
router.post("/order/create", handler.addOrder);
router.delete("/order/delete", handler.deleteOrder);
router.post("/order/create/non_prescription", handler.addNonPrscriptionOrder);
router.get('/order/get_notifications', handler.getNotifications);
router.put('/order/cancel_order/:id', handler.cancelOrder);
router.put('/order/pay_order/:id', handler.payOrder);
// router.put("/order/feedback/:id",handler.orderFeedback);

router.get("/get/:id",clientHandler.getUser);
router.post("/edit/:id",clientHandler.editUser);
// router.get("/get/address",addressHandler.getAllAddresses);
router.post("/addNewAddress",addressHandler.addNewAddress);
router.delete("/address-book/delete/:id",addressHandler.deleteAddress);
router.delete("/address/deleteAll", addressHandler.deleteAll)
router.get("/address/getAll", addressHandler.getAllAddresses);
// router.delete("/address-book/delete/:id",addressHandler.deleteAddress);
router.get("/get/order/:id",trackOrder.getOrder);
router.get("/get/driver/:id",driver.getDriver); // for the order-tracking 
router.post("/feedback/:id",clientHandler.orderFeedback);

module.exports = router;
