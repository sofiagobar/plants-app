const createError = require("http-errors");
const Plant = require("../models/plant.model");

module.exports.list = (req, res, next) => {
  const { search, petFriendly } = req.query;
  const criterial = {}

  if (search) {
    criterial.name = new RegExp(search, "i");
  }

  if (petFriendly === 'true')  {
    criterial.petFriendly = true
  } 

  Plant.find(criterial)
    .then((plants) => res.json(plants))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  res.json(req.plant);
};

module.exports.delete = (req, res, next) => {
  Plant.deleteOne({ _id: req.plant.id })
    .then(() => res.status(204).send())
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  Plant.findOne({ name: req.body.name })
    .then(plant => {
      if (plant) {
        next(createError(400, { errors: { name: 'This plant already exists' } }));
      } else {
        return Plant.create({
          ...req.body,
          picture: req?.file?.path
        })
        .then((plant) => {res.status(201).json(plant)})
      }
    })
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  const data = { name, price, description, petFriendly, environment, picture } = req.body;
  const plant = req.plant;
  Object.assign(plant, data);
  plant.save()
    .then((plant) => res.json(plant))
    .catch((error) => next(error));
};
