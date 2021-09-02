const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user.model');


passport.use('local-auth', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, next) => {
    User.findOne({ username })
      .then(user => {
        if (!user) {
          next(null, null, { username: 'Invalid username or password'})
        } else {
          return user.checkPassword(password)
            .then(match => {
              if (match) {
                next(null, user)
              } else {
                next(null, null, { username: 'Invalid username or password' })
              }
            })
        }
      }).catch(next)
  }));