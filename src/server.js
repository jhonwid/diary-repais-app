require('dotenv').config();

//* Configuracion conexion con el servisor
const app = require('./app.js');
const { db } = require('./database/config.js');

db.authenticate()
    .then(() => console.log('Database connected...🤞'))
    .catch((err) => console.log(err));

db.sync()
    .then(() => console.log('Database synced...😁'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...👌`);
});