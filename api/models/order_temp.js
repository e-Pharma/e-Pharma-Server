const mongoose = require("mongoose");

const orderTempSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orders: {
      type: Array,
  }
});

module.exports = mongoose.model("OrderTemp", orderTempSchema);
