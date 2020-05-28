const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    role:{
        type:String,
        default:'User'
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    permission_level:{
        type:Number,
        default:1
    },
    contact_number:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avatar_url:{
        type:String,
        required:false
    },
    registered_at:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model('User', userSchema);