const createError = require("http-errors");
const Plant = require("../models/plant.model");

module.exports.list = (req, res, next) => {
  const criterial = { search, petFriendly } = req.query;
  
  if (search) {
    criterial.name = new RegExp(search, "i"); //regexp coge cadena de caracteres y los busca en el String, 'i' ignora mayus
  }

  if (petFriendly) {
    criterial.petFriendly = new RegExp(petFriendly, "i");
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
