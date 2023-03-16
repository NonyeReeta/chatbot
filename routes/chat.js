const express = require('express')
const chatRouter = express.Router();
const menuModel = require('../models/menu')
const botMenuModel = require('../models/botMenu')
const ordersModel = require('../models/orders')
const currentOrderModel = require('../models/currentOrder')

chatRouter.get("/get-menu", (req, res) => {
    // get food options
    menuModel
      .find({})
      .then((menu) => {
        res.send(menu);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
});

// get order order history
chatRouter.get('/orders', (req, res) => {
  ordersModel
  .find({})
  .then((orders) => {
    res.send(orders);
  })
  .catch((err) => {
    res.status(500).send(err.message)
  })
})

// get current order
chatRouter.get('/current-order', (req, res) => {
  currentOrderModel.find({})
  .then((currentOrder) => {
    res.send(currentOrder);
  })
  .catch((err) => {
    res.status(500).send(err.message)
  })
})

// get order object
chatRouter.get('/get-order/:arg', (req, res) => {
  const orderNum = req.params.arg
  // currentOrderModel.
})

// route to receive the customers order and save
chatRouter.post('/place-order', (req, res) => {
    const orders = req.body;
    console.log(orders)
    ordersModel.create(orders)
    .then(() => {
        return res.json({ message: "Order Placed" });
    }).catch(err => {
        res.status(500).send('An error occured while placing order')
    })
})



module.exports = chatRouter;