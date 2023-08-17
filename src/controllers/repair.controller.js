const Repair = require('../models/repair.model.js');
const catchAsync = require('./../utils/catchAsync.js');

//* Funciones asincronas, encontrar todas las reparaciones, encontar una sola reparacion, crear reparacion, actualizar reparacion y elominar reparacion.

//* Buscar todas las reparaciones
exports.searchAllRepairs = async (req, res) => {
    try {
        const repairs = await Repair.findAll({
            where: {
                status: 'pending',
            },
        });

        return res.status(200).json({
            status: 'success',
            results: repairs.length,
            repairs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error😪',
            error,
        });
    }
};

//* Buscar una sola reparacion por id
exports.searchOneRepair = async (req, res) => {
    try {
        const { repair } = req;

        return res.status(200).json({
            status: 'success',
            repair,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong! 😱',
            error,
        });
    }
};

//* Crear reparacion
exports.createRepair = async (req, res) => {
    try {
        const { date, userId } = req.body;

        const repair = await Repair.create({ date, userId });

        return res.status(201).json({
            status: 'success',
            message: 'Repair created successfully🥳',
            repair,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error😅',
            error,
        });
    }
};

//* Actualizar reparacion por id
exports.updateRepair = async (req, res) => {
    try {
        const { repair } = req;

        await repair.update({ status: 'completed' });

        return res.status(200).json({
            status: 'success',
            message: 'Repair update successfully😁',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong! 😱',
            error,
        });
    }
};

//* Eliminar reparacion por id
exports.deleteRepair = async (req, res) => {
    try {
        const { repair } = req;

        await repair.update({ status: 'deleted' });

        return res.status(200).json({
            status: 'success',
            message: 'Repair deleted successfully😁',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error🙃',
            error,
        });
    }
};