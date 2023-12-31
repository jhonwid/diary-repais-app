require('dotenv').config();

//* Configuracion conexion con el servisor
const app = require('./app.js');
const { db } = require('./database/config.js');

//* Configuracion de la base de datos
db.authenticate()
    .then(() => console.log('Database connected...🤞'))
    .catch((err) => console.log(err));

db.sync({ force: false })
    .then(() => console.log('Database synced...😁'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...👌`);
});