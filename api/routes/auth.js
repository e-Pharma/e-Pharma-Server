const express = require("express");
const router = express.Router();

const handler = require("../handlers/auth");

router.post("/login", handler.clientLogin);
router.post("/register", handler.clientReg);
router.delete("/delete", handler.deleteAll);
router.post("/relationship/create", handler.addRelationship);

module.exports = router;
