'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const port = process.env.MONGOLAB_URI || 'mongodb://localhost/tinnr';
const db = mongoose.connect(port);

module.exports = db;
