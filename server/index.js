
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const compression = require("compression");
const morgan = require("morgan");
const cors = require('cors');
const helmet = require("helmet");


const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con la URL de tu aplicación frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilita el envío de cookies de manera segura
  optionsSuccessStatus: 204, // Algunos navegadores envían una solicitud OPTIONS antes de una solicitud POST
};



const apiRoutes = require('./routes/apiRoutes.js')



const app = express();
app.use(cors(corsOptions));



app.use(helmet());
app.use(compression());


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))


app.use('/api', apiRoutes)



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});

