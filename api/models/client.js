const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: "client"
  },
  permission_level: {
    type: Number,
    required: true
  },
  contact_number: {
    type: String,
  },
  nic: {
    type: String
  },
  address: {
    type: String
  },
  avatar_url: {
    type: String,
    default: "https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png"
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  is_token_exired: {
    type: Boolean,
    default: false
  },
  registered_at: {
    type: Date,
    default: Date.now
  },
  account_status: {
    type: String,
    defaulf: "Active"
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  country: {
    type: String,
    default: "Sri Lanka"
  },
  relations:[{
    nic:{
      type:String
    },
    first_name:{
      type:String
    },
    last_name:{
      type:String
    },
    dob:{
      type:Date
    },
    relationship:{
      type:String
    },
    contact_number:{
      type:String
    },
    gender:{
      type:String
    }
  }]
});

module.exports = mongoose.model("Client", clientSchema);