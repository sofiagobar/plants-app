const createError = require("http-errors");
const { Passport } = require("passport/lib");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const data = ({ name, email, password, picture, order, address, city } =
    req.body);

  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error));
};

module.exports.login = (req, res, next) => {
  Passport.authenticate("local-auth", (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(400, { errors: validations }));
    } else {
      req.login(user, (error) => {
        if (error) next(error);
        else res.json(user);
      });
    }
  })(req, res, next);
};

module.exports.logout = (req, res, next) => {
    req.logout();
    res.estatus(204).end()
}
