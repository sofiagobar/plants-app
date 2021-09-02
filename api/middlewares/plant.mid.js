const createError = require("http-errors");
const Plant = require("../models/plant.model");

module.exports.exists = (req, res, next) => {
  const id = req.params.id;
  Plant.findById(id)
    .then((plant) => {
      if (plant) {
        req.plant = plant;    //llevarmelo al controlador
        next();
      } else {
        next(createError(404, "Plant not found"));
      }
    })
    .catch((error) => next(error));
};
