const mongoose = require("mongoose");
// creating a schema
const Schema = mongoose.Schema;

const foodSchema = new mongoose.Schema({
  title: String,
  description: String,
  number: Number,
});

const OrdersSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  orders: [foodSchema],
  time: { type: Date, default: Date.now },
});

const OrdersModel = mongoose.model("orders", OrdersSchema);

module.exports = OrdersModel;