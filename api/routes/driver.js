const express = require("express");
const router = express.Router();

const driverLogin = require("../handlers/driver_auth")
const driverNotificationHandler = require("../handlers/driver_notification")
const driverProfileHandler = require("../handlers/driver_profile")
const clientOrdersHandler = require("../handlers/client_orders")
const clientAddressHandler = require("../handlers/driver_profile")

router.get("/login",driverLogin.login);
//driver details
router.get("/get/:id", driverProfileHandler.getDriver);
//notifications to driver 
router.get("/notifications", driverNotificationHandler.viewNotifications);
//order details - pending
router.get("/pendingOrders", driverProfileHandler.getPendingOrders);
//order details - ongoing
router.get("/ongoingOrders", driverProfileHandler.getOngoingOrders);
//order details - completed
router.get("/completedOrders", driverProfileHandler.getCompletedOrders);
//order details - delivered
router.get("/deliveredOrders", driverProfileHandler.getDeliverededOrders);

//location details
router.get("/clientAddress", clientAddressHandler.getOngoingOrders);

//edit driver details
router.post("/edit/:id", driverProfileHandler.editDriver);

//update the order status
router.post("/updateOrderStatus/:id", driverProfileHandler.editOrderStatus);



module.exports = router;
   