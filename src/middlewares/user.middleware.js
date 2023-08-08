const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');

exports.ValidUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: {
            id,
            status: 'available',
        },
    });

    if (!user) {
        return next(new AppError(`User with id: ${id} not found`, 404));
    };

    req.user = user;
    next();
});