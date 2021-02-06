'use strict';

require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

//middleware de procesador de subida de ficheros
app.use(fileUpload());

//middleware para servir archivos estáticos
app.use(express.static('public'));

const usersRouter = require('./app/routes/users-routes');
const newsRouter = require('./app/routes/news-routes');
const categoriesRouter = require('./app/routes/categories-routes');
const commentsRouter = require('./app/routes/comments-routes');
const votingRouter = require('./app/routes/voting-routes');

const port = process.env.SERVER_PORT || 3000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/v1/users/', usersRouter);
app.use('/api/v1/news/', newsRouter);
app.use('/api/v1/', commentsRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/voting/', votingRouter);

app.listen(port, () => console.log(`Escuchando ${port}...`));
