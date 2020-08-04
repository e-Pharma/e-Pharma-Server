const mongoose = require("mongoose");

const deliveryAddressSchema = mongoose.Schema({
 
    _id:mongoose.Schema.Types.ObjectId,
    clientId:{type:String},
    items:[{
        id:mongoose.Schema.Types.ObjectId,
        type:{type:String},
        city:{type:String},
        address:{type:String,required:true}
    }]
});

module.exports =mongoose.model("deliveryAddress",deliveryAddressSchema);