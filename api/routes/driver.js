const express = require("express");
const router = express.Router();

const driverLogin = require("../handlers/driver_auth")
const driverProfileHandler = require("../handlers/driver_profile")

router.get("/login",driverLogin.login);
router.get("/get/:id", driverProfileHandler.getDriver);
router.post("/edit/:id", driverProfileHandler.editDriver);


module.exports = router;
   