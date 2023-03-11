const mongoose = require("mongoose");
// creating a schema
const Schema = mongoose.Schema;


const OrdersSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  title: [{ type: String }],
  time: { type: Date, default: Date.now },
});


const OrdersModel = mongoose.model("Orders", OrdersSchema);

module.exports = OrdersModel;