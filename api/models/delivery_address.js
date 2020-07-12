const mongoose = require("mongoose");

const deliveryAddressSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    clientId:{type:String,required:true},
    type:{type:String,required:true},
    city:{type:String,required:true},
    address:{type:String,required:true}
    // addresss:[{
    //     type:{type:String,required:true},
    //     city:{type:String,required:true},
    //     address:[{type:String,required:true}]
    // }]
   
});

module.exports =mongoose.model("deliveryAddress",deliveryAddressSchema);