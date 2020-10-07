const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    items:[{
        name:{type:String},
        feedback:{type:String}
    }]
});

module.exports =mongoose.model("feedback",feedbackSchema);