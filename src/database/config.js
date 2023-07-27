const { Sequelize } = require("sequelize")

const db = new Sequelize({
    dialect: "postgres",
    database: "posdb_app_agenda_motos",
    username: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    logging: false,
});

module.exports = { db };