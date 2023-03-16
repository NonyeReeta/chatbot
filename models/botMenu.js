const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BotMenuSchema = new Schema({
  number: {
    type: String,
    required: true,
    unique: [true, "number already exists"],
  },
  question: {
    type: String,
    require: true,
    unique: [true, "question already exists"],
  },
});

const BotMenuModel = mongoose.model("botMenu", BotMenuSchema);

module.exports = BotMenuModel;
