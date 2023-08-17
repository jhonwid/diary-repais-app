const User = require('./../models/user.model.js');
const catchAsync = require('./../utils/catchAsync.js');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt.js');

//* Funciones asincronas, encontrar todos los usuarios, encontrar un solo usuario, crear usuario, actualizar usuario y elominar usuario.

//* Buscar todos los Usuario
exports.searchAllUser = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        where: {
            status: 'available',
        },
    });

    return res.status(200).json({
        status: 'success',
        results: users.length,
        users,
    });
});

//* Buscar un solo Usuario por id
exports.searchOneUser = catchAsync(async (req, res) => {
    const { user } = req;

    return res.status(200).json({
        status: 'success',
        user,
    });
});

//* Crear Usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashPassword, role }) //? Esperate(await) para que el usuario se cree(create)

        const token = await generateJWT(user.id);

        return res.status(201).json({
            status: 'success',
            token,
            user,
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

//* Actualizar Usuario
exports.updateUser = catchAsync(async (req, res) => {

    const { user } = req;

    const { name, email } = req.body;

    await user.update({ name, email });

    return res.status(200).json({
        status: 'success',
        message: 'User update successfully...🥳',
    });
});

//* Eliminar Usuario
exports.deleteUser = catchAsync(async (req, res) => {
    const { user } = req;

    await user.update({ status: false });

    return res.status(200).json({
        status: 'success',
        message: 'User deleted successfully...😁',
    });
});

//* Login Usuario
//! Que no salga la contraseña en el POSTMAN
// exports.login = async (req, res) => {
//     try {

//         const { email, password } = require.body;

//         const user = await User.findOne({
//             where: {
//                 email,
//                 status: 'available',
//             }
//         });

//         if (!user) {
//             return res.status(400).json({
//                 status: 'fail',
//                 message: 'Invalid credentials',
//             });
//         }

//         if (!(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({
//                 status: 'fail',
//                 message: 'Invalid credentials',
//             });
//         }

//         const token = await generateJWT(user.id);

//         return res.status(200).json({
//             status: 'success',
//             token,
//             user,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: 'fail',
//             message: 'Internal server error',
//         });
//     }
// };
exports.login = async (req, res, next) => {
    const { user } = req;
    const { password } = req.body;

    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            status: 'error',
            message: 'Incorrect email or password',
        });
    }

    const token = await generateJWT(user.id)

    res.status(200).json({
        status: 'success',
        token,
        user,
    });
};