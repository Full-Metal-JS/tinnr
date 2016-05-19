'use strict';
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const { logError, handleError } = require('./utils.js');

module.exports = function(app, express) {
  let usersRouter = express.Router();
  let recipesRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../../client')));

  app.use('/api/users', usersRouter);
  app.use('/api/recipes', recipesRouter);
  app.use('*', (req, res) => {
    res.status(404).send('404: Page not found');
  });

  require('../user/userRoutes')(usersRouter);
  require('../recipes/recipeRoutes')(recipesRouter);

  app.use(logError);
  app.use(handleError);
};
