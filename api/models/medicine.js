const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  unit_price: {
    type: Number,
    required: true
  },
  quantity:{
    type: String,
    default: "50"
  },
  is_available: {
    type: Boolean,
    required: true,
    default: true
  },
  
});

module.exports = mongoose.model("Medicine", medicineSchema);
