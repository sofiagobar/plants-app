const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401, "user is not authenticated"));
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(createError(403, 'user is authenticated'))
  } else {
    next();
  }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.user?.isAdmin) {
        next();
    } else {
        next(createError(401, 'user is not authorised'))
    }
};
