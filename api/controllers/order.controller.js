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
  Order.findById(req.params.id)
    .then((order) => {
      req.order = order;
      if (order) {
        if ((order.buyer == req.user.id)) {
          res.json(order);
        } else {
          next(createError(403));
        }
      }
    })
    .catch(next);
};

module.exports.edit = (req, res, next) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (order) {
        req.order = order; //llevarmelo al controlador
        next();
      } else {
        next(createError(404, "order not found"));
      }
    })
    .catch((error) => next(error));

 /*const data = ({ products } = req.body);

  console.log("data", data);
  const order = req.order;
  Object.assign(order, data);
  order
    .save()
    .then((order) => res.json(order))
    .catch((error) => next(error));*/
};
