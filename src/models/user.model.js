const { DataTypes } = require('sequelize');
const { db } = require('./../database/config.js');

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
});

module.exports = User;