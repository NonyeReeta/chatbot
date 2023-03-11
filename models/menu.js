const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: [true, "Article with this title already exists"],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MenuModel = mongoose.model("menu", MenuSchema);

module.exports = MenuModel;