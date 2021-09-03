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
    if (user.isAdmin === true) {
        next();
    } else {
        next(createError(401, 'user is not authorised'))
    }
};

module.exports.isUser = (req, res, next) => {
    if (req.params.id === 'me' || req.user.id == req.params.id) {
        next()
    } else {
        next(createError(403))
    }
}
