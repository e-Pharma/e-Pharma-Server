const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);      