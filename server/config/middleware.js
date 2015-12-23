var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var utils = require('./utils.js');

module.exports = function(app, express) {
  var usersRouter = express.Router();
  var mealsRouter = express.Router();
  var recipesRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../../client')));

  app.use('/api/recipes', recipesRouter);
  app.use(utils.logError);
  app.use(utils.handleError);
  // app.use('/api/meals', mealsRouter);
  // app.use('/api/users', usersRouter);

  // require('../user/userRoutes.js')(usersRouter);
  // require('../meals/mealRoutes.js')(mealsRouter);
  require('../recipes/recipeRoutes.js')(recipesRouter);
};
