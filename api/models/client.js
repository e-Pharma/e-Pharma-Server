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
    type: String
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  registered_at: {
    type: Date,
    default: Date.now
  },
  country: {
    type: String,
    default: "Sri Lanka"
  }
});

module.exports = mongoose.model("Client", clientSchema);
