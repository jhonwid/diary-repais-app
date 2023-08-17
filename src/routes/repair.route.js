const express = require('express');

//* Importacion de Controladores 
const repairController = require('../controllers/repair.controller.js');
//* Importacion de middlewares de validacion
const validationMiddleware = require('../middlewares/validation.middleware.js');
const repairMiddleware = require('./../middlewares/repair.middleware.js');
const authenticationMiddleware = require('./../middlewares/authentication.middleware.js');

const router = express.Router();

//* Rutas de las funciones asincronas reparaciones
router.use(authenticationMiddleware.protect);

router
    .route('/')
    .get(authenticationMiddleware.restrictTo('employee'), repairController.searchAllRepairs)
    .post(validationMiddleware.createRepairValidation, repairController.createRepair);

router
    .use('/:id', repairMiddleware.validRepair)
    .use(authenticationMiddleware.restrictTo('employee'))
    .route('/:id')
    .get(repairController.searchOneRepair)
    .patch(validationMiddleware.updateRepairValidation, repairController.updateRepair)
    .delete(validationMiddleware.deleteRepairValidation, repairController.deleteRepair);

module.exports = router;