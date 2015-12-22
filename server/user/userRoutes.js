var userController = require('./userController.js');

module.exports = function (app) {
  app.post('/login', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/signedin', userController.checkAuth);
}
