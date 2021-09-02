const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    const data = { name, email, password, picture, order, address, city } = req.body;

    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(error => next(error))
}

module.exports.login = (req, res, next) => {
    
}