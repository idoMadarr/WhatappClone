const express = require('express');
const { sendMessage } = require('../controller/communicateController');

const route = express.Router();

// Url: http://localhost:5000/communicate/:clientId
route.post('/:clientId', sendMessage);

module.exports = route;
