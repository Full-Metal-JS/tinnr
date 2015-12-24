var express = require('express');
var mongoose = require('mongoose');
var db = require('./db.js');

var app = express();
// mongoose.connect('mongodb://localhost/tinnr');

require('./config/middleware.js')(app, express);

module.exports = app;
