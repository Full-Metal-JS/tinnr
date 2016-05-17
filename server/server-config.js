const express = require('express');
const db = require('./db.js');

let app = express();

require('./config/middleware.js')(app, express);

module.exports = app;
