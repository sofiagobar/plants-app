const express = require('express');
const users = require('../controllers/users.controller');
const plants = require('../controllers/plants.controller');
const plant = require('../middlewares/plant.mid');
const secure = require('../middlewares/secure.mid');
const upload = require('../config/multer.config');
const router = express.Router();

router.get('/plants', plants.list); 
router.post('/plants', upload.single('picture'), secure.isAdmin, plants.create); ///plant.create, delete, edit --> middleware isAdmin
router.get('/plants/:id', plant.exists, plants.detail);
router.delete('/plants/:id', secure.isAdmin, plant.exists, plants.delete);
router.put('/plants/:id', secure.isAdmin, plant.exists, plants.edit);

router.post('/users', upload.single('picture'), secure.isNotAuthenticated, users.create); //crear usuario, que no esté autenticado ya
router.post('/login', secure.isNotAuthenticated, users.login);
router.post('/logout', secure.isAuthenticated, users.logout);

router.get('/authenticate/google', users.loginWithGoogle);
router.get('/authenticate/google/cb', users.doLoginWithGoogle);

router.get('/profile', secure.isAuthenticated, secure.isUser, users.detail); //user sólo puede ver su profile!!
router.put('/profile', secure.isAuthenticated, secure.isUser, users.update); //user actualizar su perfil --sólo puede actualizar el suyo!!
// Delete no tiene sentido


//router.get('/users', secure.isAdmin, users.get);///???
//GET /users/:id --> para que otros vean mi perfil

module.exports = router;