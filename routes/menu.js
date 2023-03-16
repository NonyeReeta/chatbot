// STATIC ROUTE TO ADD NEW FOOD/ITEM TO THE RESTAURANT MENU
const express = require("express");
const menuModel = require('../models/menu')
const menuRouter = express.Router()

menuRouter.post('/menu', (req, res) => {
  const menuDetails = req.body;
    menuModel
      .create(menuDetails)
      .then(() => {
        return res.status(200).send("added new food Successfully");
      })
      .catch((err) => {
        res.status(500).send(`This food is already in the menu`);
      });
  
})

module.exports = menuRouter;