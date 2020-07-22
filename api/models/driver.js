const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model("Driver", driverSchema);      