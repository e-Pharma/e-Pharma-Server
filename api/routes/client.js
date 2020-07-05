const express = require("express");
const router = express.Router();


// router.get('/',function(req,res,next){
//     res.send("user details here")
// })
// router.post('/insert',function(req,res,next){

// })
// router.post('/update',function(req,res,next){
    
// })
// router.post('/delete',function(req,res,next) 
// })

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
router.post("/addNewAddress/:id",addressHandler.addNewAddress)

module.exports = router;
