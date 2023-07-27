const express = require('express');

//* Controladores 
const repairController = require('../controllers/repair.controller.js');

const router = express.Router();

//* Rutas
router
    .route('/')
    .get(repairController.searchAllRepairs)
    .post(repairController.createRepair);

router
    .route('/:id')
    .get(repairController.searchOneRepair)
    .patch(repairController.updateRepair)
    .delete(repairController.deleteRepair);

module.exports = router;