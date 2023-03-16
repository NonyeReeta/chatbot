const express = require('express')
const chatRouter = express.Router();
// module to generate random orderId
const { v4: uuidv4 } = require("uuid");
const menuModel = require('../models/menu')
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

// route to receive the customers order and save
chatRouter.post('/place-order', (req, res) => {
    const orders = req.body.params.orders;
    let orderId = uuidv4();
    ordersModel.create({orderId, orders})
    .then(() => {
        return res.json({ message: "Order Placed" , orderId});
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

module.exports = chatRouter;