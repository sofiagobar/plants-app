const mongoose = require('mongoose');
const Plant = require('../models/plant.model');
const plants = require('../data/plants.json');

require('../config/db.config');

mongoose.connection.once('open', () => {
    mongoose.connection.dropDatabase()
        .then(() => Plant.create(plants))
        .then(plants => console.info(`Successfully created ${plants.length} contacts`))
        .catch(error => console.error('An error ocurred running seeds', error))
        .then(() => mongoose.disconnect())
})