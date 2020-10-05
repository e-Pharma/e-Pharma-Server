const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
