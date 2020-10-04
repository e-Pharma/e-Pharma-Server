const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sender: { type: String, required: true },
  message: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
})

module.exports = mongoose.model("Notification", notificationSchema);     