var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./data.js');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/recipes', function(req, res){
  res.status(200);
  res.json(db);
});

module.exports = app;
