const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  vehicleNumber: { type:String, required:true },
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  lat: { type: Number, default: 0 },
  long: { type:Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  registered_at: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("Driver", driverSchema);      