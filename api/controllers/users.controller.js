const createError = require("http-errors");
const passport = require("passport");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const data = ({ name, email, password, picture, address, city } = req.body);

  User.create({
      ...req.body,
      picture: req?.file?.path
    })
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error));
};

module.exports.login = (req, res, next) => {
  passport.authenticate("local-auth", (error, user, validations) => {
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
  res.status(204).end();
};

module.exports.detail = (req, res, next) => {
  if (req.params.id === "me") {
    return res.json(req.user);
  }

  User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const data = ({ name, email, password, picture, address, city } = req.body);

  Object.assign(req.user, data);

  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.loginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate("google-auth", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  passportController(req, res, next);
};

module.exports.doLoginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate(
    "google-auth",
    (error, user, validations) => {
      if (error) {
        next(error);
      } else {
        req.login(user, (error) => {
          if (error) next(error);
          else res.redirect("http://localhost:3000");
        });
      }
    }
  );
/*else if (!user) {
        res
          .status(400)
          .render("users/login", { user: req.body, errors: validations }); //sería un res.redirect('/login')??
      }*/
  passportController(req, res, next);
};
