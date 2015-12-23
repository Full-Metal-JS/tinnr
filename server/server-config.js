var express = require('express');
// var mongoose = require('mongoose');
var db = require('./db.js');

var app = express();

require('./config/middleware.js')(app, express);

module.exports = app;
