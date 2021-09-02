const express = require('express');
const users = require('../controllers/users.controller');
const plants = require('../controllers/plants.controller');
const plant = require('../middlewares/plant.mid');
const router = express.Router();

router.get('/plants', plants.list);
router.post('/plants', plants.create);
router.get('/plants/:id', plant.exists, plants.detail);
router.delete('/plants/:id', plant.exists, plants.delete);
router.put('/plants/:id', plant.exists, plants.edit);

router.post('/users', users.create);

module.exports = router;