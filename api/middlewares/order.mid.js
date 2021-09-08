const createError = require("http-errors");
const Order = require("../models/order.model");

module.exports.exists = (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((order) => {
      if (order) {
        req.order = order;    //llevarmelo al controlador
        next();
      } else {
        next(createError(404, "Order not found"));
      }
    })
    .catch((error) => next(error));
};