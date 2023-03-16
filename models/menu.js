const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: [true, "Menu with this title already exists"],
  },
  description: {
    type: String,
  },
  number: {
    type: Number,
    required: true,
    unique: [true, "Menu with this number already exists"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MenuModel = mongoose.model("menus", MenuSchema);

module.exports = MenuModel;