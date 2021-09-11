const createError = require("http-errors");
const Order = require("../models/order.model");

module.exports.create = (req, res, next) => {
  Order.create({
    ...req.body,
    buyer: req.user.id,
  })
    .then((order) => res.status(201).json(order))
    .catch((error) => next(error));
};

module.exports.listMyOrders = (req, res, next) => {
  Order.find({ buyer: req.user.id })
    .sort({ createdAt: "desc" })
    .then((orders) => {
      if (orders) {
        res.status(200).json(orders);
      } else {
        next(createError(404, "orders not found"));
      }
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  Order.find()
    .sort({ createdAt: "desc" })
    .then((orders) => res.json(orders))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  if ((req.order.buyer == req.user.id)) {
    res.json(req.order);
  } else {
    next(createError(403));
  }
};