const { DataTypes } = require('sequelize');
const { db } = require('../database/config.js');

const Repair = db.define('notes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
    },

    motorsNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('completed', 'cancelled', 'pending'),
        allowNull: false,
        defaultValue: 'pending',
    },
});

module.exports = Repair;