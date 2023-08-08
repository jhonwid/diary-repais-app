const express = require('express');

//* Importacion de Controladores 
const repairController = require('../controllers/repair.controller.js');
//* Importacion de middlewares de validacion
const validationMiddleware = require('../middlewares/validation.middleware.js');
const repairMiddleware = require('./../middlewares/repair.middleware.js');
const authenticationMiddleware = require('./../middlewares/authentication.middleware.js');

const router = express.Router();

router.use(authenticationMiddleware.protect);

//* Rutas
router
    .route('/')
    .get(repairController.searchAllRepairs)
    .post(validationMiddleware.createRepairValidation, repairController.createRepair);
// Falta validacion para actualizar usuario y reparacion en validationMiddelware.js
router
    .use('/:id', repairMiddleware.validRepair)
    .route('/:id')
    .get(repairController.searchOneRepair)
    .patch(repairController.updateRepair)
    .delete(repairController.deleteRepair);

module.exports = router;