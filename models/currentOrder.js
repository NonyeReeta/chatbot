const mongoose = require("mongoose");
// creating a schema
const Schema = mongoose.Schema;

const CurrentOrderSchema = new Schema({
  orders: [],
  time: { type: Date, default: Date.now },
});

const CurrentOrderModel = mongoose.model("currentOrder", CurrentOrderSchema);

module.exports = CurrentOrderModel;
