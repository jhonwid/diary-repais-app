const express = require('express');

//* Importacion de controladores de las funciones asincronas
const userController = require('./../controllers/user.controller.js');
//* Importacion de middlewares de validacion
const validationMiddleware = require('../middlewares/validation.middleware.js');
const userMiddleware = require('./../middlewares/user.middleware.js');
const authenticationMiddleware = require('./../middlewares/authentication.middleware.js');

const router = express.Router();

//* Rutas de las funciones asincronas de usuario
router
    .route('/')
    .get(authenticationMiddleware.protect, userController.searchAllUser)
    .post(validationMiddleware.CreateUserValidation, userController.createUser);

router.post('/login', userMiddleware.existUserEmail, userController.login);

router.use(authenticationMiddleware.protect);

router
    .use('/.id', userMiddleware.ValidUser)
    .route('/:id')
    .get(userController.searchOneUser)
    .patch(validationMiddleware.updateUserValidation, userController.updateUser)
    .delete(validationMiddleware.deleteUserValidation, userController.deleteUser);

module.exports = router;