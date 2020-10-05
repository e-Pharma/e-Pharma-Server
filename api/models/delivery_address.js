const mongoose = require("mongoose");

const deliveryAddressSchema = mongoose.Schema({
 
    _id:mongoose.Schema.Types.ObjectId,
    clientId:{type:String},
    items:[{
        type:{type:String},//address lat 
        city:{type:String},//address lng
        address:{type:String,required:true}
    }]
});

module.exports =mongoose.model("deliveryAddress",deliveryAddressSchema);