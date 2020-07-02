const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
    type: [String],
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
  /*
    order has 4 stages
    1. is_reviewed => client order yet to be reviewed by the admin
    2. is_paid => admin approved but client is yet to pay for it.
    3. is_dispatched => client paid for the order but package is yet to be dispatch from the store.
    4. is_delivered => packeage is dispatched but not yet received by the client.
    5. completed => order is succesfully completed. client gets the package
    6. is_rejected => order is rejected by either admin or client any any stage.
  */
 completed_on:{
  type: Date,
  required: false
 },
  ordered_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Order", orderSchema);
