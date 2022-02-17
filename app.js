const express = require('express');
const path = require('path');
require('./database/mongoose');
const fileRouter = require('./router/fileRouter');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(fileRouter);

module.exports = app