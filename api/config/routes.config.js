const express = require('express');
const users = require('../controllers/users.controller');
const plants = require('../controllers/plants.controller');
const plant = require('../middlewares/plant.mid');
const secure = require('../middlewares/secure.mid');
const router = express.Router();

router.get('/plants', plants.list); ///plant.create, delete, edit --> middleware isAdmin
router.post('/plants', plants.create);
router.get('/plants/:id', plant.exists, plants.detail);
router.delete('/plants/:id', plant.exists, plants.delete);
router.put('/plants/:id', plant.exists, plants.edit);

router.post('/users', secure.isNotAuthenticated, users.create); //crear usuario, que no esté autenticado ya
router.post('/login', secure.isNotAuthenticated, users.login);
router.post('/logout', secure.isAuthenticated, users.logout);

//router.put('/profile', users.);


//GET /users/:id --> para que otros vean mi perfil

module.exports = router;