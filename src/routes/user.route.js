const express = require('express');

//* Importacion de controladores de las funciones asincronas
const userController = require('./../controllers/user.controller.js');
//* Importacion de middlewares de validacion
const validationMiddleware = require('../middlewares/validation.middleware.js');
const userMiddleware = require('./../middlewares/user.middleware.js');
const authenticationMiddleware = require('./../middlewares/authentication.middleware.js');

const router = express.Router();

//* Rutas de las funciones asincronas
router.post('/login', userController.login);

router
    .route('/')
    .get(authenticationMiddleware.protect, userController.searchAllUser)
    .post(validationMiddleware.CreateUserValidation, userController.createUser);

router.use(authenticationMiddleware.protect);
// Falta validacion para actualizar, eliminar. login usuario y reparacion en validationMiddelware.js
router
    .use('/.id', userMiddleware.ValidUser)
    .route('/:id')
    .get(userController.searchOneUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;