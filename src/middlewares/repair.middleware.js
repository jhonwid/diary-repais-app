const AppError = require('../utils/appError');
const Repair = require('./../models/repair.model');
const catchAsync = require('../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
        where: {
            id,
            status: 'pending',
        },
    });

    if (!repair) {
        return res.status(404).json({
            status: 'error',
            message: `Note with id ${id} not found...🙅‍♂️`,
        });
    };

    req.repair = repair;
    next();
});