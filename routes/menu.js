// STATIC ROUTE TO ADD NEW FOOD/ITEM TO THE RESTAURANT MENU
const express = require("express");
// const session = require("express-session");
const menuModel = require('../models/menu')
const menuRouter = express.Router()

menuRouter.post('/menu', (req, res) => {
  const menuDetails = req.body;
  const sessionId = req.cookies.sessionId;
  const session = req.session;
  // Check if session ID is valid and matches device ID
  if (
    session &&
    session.id === sessionId &&
    session.deviceId === req.headers["user-agent"]
  ) {
    menuModel
      .create(menuDetails)
      .then(() => {
        return res.status(200).send("added new food Successfully");
      })
      .catch((err) => {
        res.status(500).send(`This food is already in the menu`);
      });
  } else {
    res.status(440).send(`Session expired. Please login`);
  }
})

module.exports = menuRouter;