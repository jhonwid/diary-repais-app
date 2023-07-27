//* Importaciones
const express = require('express'); //? Importacion de libreria express
const morgan = require('morgan'); //? Importacion de libreria morgan

//* Rutas 
const userRoutes = require('./routes/user.route.js'); //? Variable para ruta de usuario
const repairRoutes = require('./routes/repair.route.js'); //? Variable para ruta de reparacion

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//* Rutas
app.use('/api/v1/users', userRoutes); //? Ruta de app.js a user.route.js
app.use('/api/v1/repairs', repairRoutes); //? Ruta de app.js a repair.route.js

//* Exportacion
module.exports = app;