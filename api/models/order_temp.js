const mongoose = require("mongoose");

const orderTempSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  client_id: {
    type: String,
    required: true
  },
  orders: {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    patient:{
      type: String
    },
    contact: {
      type: String,
      required: true
    },
    note: {
      type: String,
      default: null
    },
    dob: {
      type: Date,
      required: true
    },
    nic: {
      type: String,
      required: true
    },
    delivery_address: {
      type: String
    },
    lat: {
      type: Number,
      default: 0
    },
    long: {
      type:Number,
      default: 0
    },
    prescription_url: {
      type: String,
      required: true
    },
    non_prescription:{
      type: [String]
    },
    is_reviewed: {
      type: Boolean,
      default: false
    },
    is_paid: {
      type: Boolean,
      default: false
    },
    is_dispatched: {
      type: Boolean,
      default: false
    },
    is_delivered: {
      type: Boolean,
      default: false
    },
    status:{
      type:String,
      default:'is_reviewed' 
    },
   completed_on:{
    type: Date,
    required: false
   },
    ordered_at: {
      type: Date,
      default: Date.now
    },
  }
});

module.exports = mongoose.model("OrderTemp", orderTempSchema);
