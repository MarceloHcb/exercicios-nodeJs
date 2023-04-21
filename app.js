const express = require('express');
const { missionRouter } = require('./src/routes');

const app = express();

app.use(express.json());

app.use('/missions', missionRouter);
module.exports = app;