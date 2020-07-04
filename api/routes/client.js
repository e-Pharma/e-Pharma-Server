const express = require("express");
const router = express.Router();

const handler = require("../handlers/client_orders");

router.get("/order/get", handler.getOrders);
router.get("/order/get/:id",handler.getOrder);
router.post("/order/create", handler.addOrder);
router.delete("/order/delete", handler.deleteOrder);
router.post("/order/create/non_prescription", handler.addNonPrscriptionOrder);

module.exports = router;
