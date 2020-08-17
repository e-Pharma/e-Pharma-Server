const express = require("express");
const router = express.Router();

const driverLogin = require("../handlers/driver_auth")
const driverProfileHandler = require("../handlers/driver_profile")
const clientOrdersHandler = require("../handlers/client_orders")

router.get("/login",driverLogin.login);
//driver details
router.get("/get/:id", driverProfileHandler.getDriver);
//order details - pending
router.get("/pendingOrders", driverProfileHandler.getPendingOrders);
//order details - ongoing
router.get("/ongoingOrders", driverProfileHandler.getOngoingOrders);

//edit driver details
router.post("/edit/:id", driverProfileHandler.editDriver);

//update the order status
router.post("/updateOrderStatus/:id", driverProfileHandler.editOrderStatus);



module.exports = router;
   