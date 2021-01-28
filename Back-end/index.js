'use strict';

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const categoriesRouter = require('./app/routes/categories-routes');
const votingRouter = require('./app/routes/voting-routes');

const port = process.env.SERVER_PORT || 3001;

// const accessLogStream = fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' });
// app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/voting/', votingRouter);

app.listen(port, () => console.log(`Listening ${port}...`));
