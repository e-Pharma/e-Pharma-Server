const express = require("express");
const router = express.Router();

const handler = require("../handlers/auth");

router.post("/login", handler.clientLogin);
router.post("/register", handler.clientReg);
router.delete("/delete", handler.deleteAll);
router.delete("/delete/:id", handler.delete);
router.post("/relationship/create", handler.addRelationship);
router.get("/getData", handler.getData);
router.put("/verify_user", handler.verifyUser);
router.put("/logout", handler.logOut);
router.get("/password-reset-url/:email", handler.generatePasswordResetUrl);
router.put("/reset-password", handler.resetPassword);


module.exports = router;
