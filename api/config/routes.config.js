const express = require('express');
const users = require('../controllers/users.controller');
const plants = require('../controllers/plants.controller');
const plant = require('../middlewares/plant.mid');
const secure = require('../middlewares/secure.mid');
const upload = require('../config/multer.config');
const orders = require('../controllers/order.controller');
const order = require('../middlewares/order.mid')
const router = express.Router();

router.get('/plants', plants.list); 
router.post('/plants', upload.single('picture'), secure.isAdmin, plants.create);
router.get('/plants/:id', plant.exists, plants.detail);
router.delete('/plants/:id', secure.isAdmin, plant.exists, plants.delete);
router.put('/plants/:id', secure.isAdmin, plant.exists, plants.edit);

router.get('/users', secure.isAdmin, secure.isAuthenticated, users.list); ///
router.post('/register', upload.single('picture'), secure.isNotAuthenticated, users.create);
router.post('/login', users.login);
router.post('/logout', secure.isAuthenticated, users.logout);

router.get('/authenticate/google', users.loginWithGoogle);
router.get('/authenticate/google/cb', users.doLoginWithGoogle);

router.get('/profile', secure.isAuthenticated, users.detail); //user sólo puede ver su profile!!
router.put('/profile', secure.isAuthenticated, upload.single('picture'), users.update); //user actualizar su perfil --sólo puede actualizar el suyo!!

router.post('/orders', secure.isAuthenticated, orders.create);
router.get('/orders', secure.isAuthenticated, orders.listMyOrders) //usuario ve sus propias orders
router.get('/orders/:id', secure.isAuthenticated, order.exists, orders.detail)
router.put('/orders/:id', secure.isAuthenticated, order.exists, orders.edit)
router.get('/allorders', secure.isAuthenticated, secure.isAdmin, orders.list) //listar todas orders de todos los usuarios
//no se pueden delete las orders
module.exports = router;