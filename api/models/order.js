const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  name: {
    type: String,
    required: true
  },
  delivery_address: {
    type: String
  },
  prescription_url: {
    type: String
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
  ordered_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Order", orderSchema);
