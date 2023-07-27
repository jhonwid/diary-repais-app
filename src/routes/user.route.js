const express = require('express');

//*Importacion de controladores de las funciones asincronas
const userController = require('./../controllers/user.controller.js');

const router = express.Router();

//* Rutas de las funciones asincronas
router
    .route('/')
    .get(userController.searchAllUser)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.searchOneUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;