const express        = require('express');
const morgan         = require('morgan');

//Initializations
const app            = express();
const path           = require('path');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//routes
app.use(require('./src/routes/usuario.routes'));
app.use(require('./src/routes/documento.routes'));
app.use(require('./src/routes/persona.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;