const createError = require("http-errors");
const Order = require("../models/order.model");

module.exports.create = (req, res, next) => {
  Order.create(req.body)
    .then((order) => res.status(201).json(order))
    .catch((error) => next(error));
};

module.exports.listMyOrders = (req, res, next) => {
  Order.find({ buyer: req.user.id })
    .sort({ createdAt: "desc" })
    .then((orders) => res.json(orders))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Order.find()
    .sort({ createdAt: "desc" })
    .then((orders) => res.json(orders))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch(next)
}; 

module.exports.edit = (req, res, next) => {
  const order = req.order;
  Object.assign(order, req.body);
  order.save()
    .then((order) => res.json(order))
    .catch((error) => next(error));
}
