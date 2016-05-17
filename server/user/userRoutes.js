'use strict';

const { 
  signin, 
  signup, 
  checkAuth, 
  getSavedMeals, 
  saveMeal, 
  saveDietPreferences, 
  getDietPreferences
} = require('./userController.js');

module.exports = function(app) {
  app.post('/signin', signin);
  app.post('/signup', signup);
  app.post('/signedin', checkAuth);
  app.get('/meals', getSavedMeals);
  app.post('/meals', saveMeal);
  app.post('/preferences', saveDietPreferences);
  app.get('/preferences', getDietPreferences);
};
