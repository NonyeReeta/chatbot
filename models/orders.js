const mongoose = require("mongoose");
// creating a schema
const Schema = mongoose.Schema;


const OrdersSchema = new Schema({
  orders: {
    title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  }
},
  time: { type: Date, default: Date.now },
});


const OrdersModel = mongoose.model("orders", OrdersSchema);

module.exports = OrdersModel;