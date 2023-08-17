const { DataTypes } = require('sequelize');
const { db } = require('./../database/config.js');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt.js');

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM('client', 'employee'),
        allowNull: false,
        defaultValue: 'client',
    },

    status: {
        type: DataTypes.ENUM('available'),
        allowNull: false,
        defaultValue: 'available',
    },
    // }, { //* Crear contraseña encriptada por medio de un hooks
    //     hooks: {
    //         beforeCreate: async (user) => {
    //             const salt = await bcrypt.genSalt(10);
    //             const secretPassword = await bcrypt.hash(user.password, salt)
    //             user.password = secretPassword;
    //         },
    //     },
});
module.exports = User;