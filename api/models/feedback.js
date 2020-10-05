const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
 
    _id:mongoose.Schema.Types.ObjectId,
    clientId:{type:String},
    items:[{
        name:{type:String},
        feedback:{type:String}
    }]
});

module.exports =mongoose.model("feedback",feedbackSchema);