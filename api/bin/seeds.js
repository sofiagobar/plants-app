const mongoose = require('mongoose');
const faker = require('faker');
const Plant = require('../models/plant.model');
const plants = require('../data/plants.json');

require('../config/db.config');

mongoose.connection.once('open', () => {
    mongoose.connection.dropDatabase()
        .then(() => {
            const environment = ['indoor', 'outdoor'];
            const light = ['Low Light', 'Bright Light'];
            const water = ['Water every week','Water every 1–2 weeks', 'Water every 2 weeks']
            const data = plants.map((plant) => {
                return {
                    ...plant,
                    price: (Math.random() * 30).toFixed(2), //num aleatorio + num aleatorio constr string metido en Number.parsefloat
                    description: faker.lorem.paragraph(),
                    environment: environment[Math.floor(Math.random() * environment.length)],
                    petFriendly: `petFriendly${Math.random() > 0.5}`,//petFriendlyOk petFriendlyNok
                    light: light[Math.floor(Math.random() * light.length)],
                    water: water[Math.floor(Math.random() * water.length)],
                }
            })
            return Plant.create(data)
        })
        .then(plants => console.info(`Successfully created ${plants.length} plants`))
        .catch(error => console.error('An error ocurred running seeds', error))
        .then(() => mongoose.disconnect())
})