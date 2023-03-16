// STATIC ROUTE TO ADD INITIAL QUESTION TO THE BOT MENU
const express = require("express");
const botMenuModel = require("../models/botMenu");
const botMenuRouter = express.Router();

botMenuRouter.post("/menu", (req, res) => {
  const botMenuDetails = req.body;
  botMenuModel
    .create(botMenuDetails)
    .then(() => {
      return res.status(200).send("added question Successfully");
    })
    .catch((err) => {
      res.status(500).send(`This question is already in the list`);
    });
});

module.exports = botMenuRouter;
