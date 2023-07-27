const User = require('./../models/user.model.js');

//* Funciones asincronas, encontrar todos los usuarios, encontrar un solo usuario, crear usuario, actualizar usuario y elominar usuario.

//* Buscar todos los Usuario
exports.searchAllUser = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error😫',
            error,
        });
    }
};

//* Buscar un solo Usuario por id
exports.searchOneUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id,
                // status: 'available',
            },
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not exist🧐`,
            });
        }

        return res.status(200).json({
            status: 'success',
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

//* Crear Usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await User.create({ name, email, password, role }) //? Esperate(await) para que el usuario se cree(create)

        return res.status(201).json({
            status: 'success',
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
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, email } = req.body;

        const user = await User.findOne({
            where: {
                id,
                status: 'available',
            },
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `The user with id ${id} not update🙅‍♂️`,
            });
        }

        await user.update({ name, email });

        return res.status(200).json({
            status: 'success',
            message: 'User update successfully🥳',
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

//* Eliminar Usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id: id.toLowerCase().trim(),
                status: 'available',
            },
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} can't delete🙅‍♂️`,
            });
        }

        await user.update({ status: false });

        return res.status(200).json({
            status: 'success',
            message: 'User deleted successfully😁',
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