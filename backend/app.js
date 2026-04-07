const express = require('express');

const scanRouter = require('./routes/scan');
const chatRouter = require('./routes/chat');

const app = express();

app.use(express.json());

app.use('/scan', scanRouter);
app.use('/chat', chatRouter);

module.exports = app;
