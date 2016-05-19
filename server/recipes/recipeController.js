'use strict';
const { shuffle } = require('underscore');
const db = require('../data');
const Recipe = require('./recipeModel');
const request = require('request');
const url = require('url');
// var Q = require('q');
// commented out for deployment 
// uncomment for development
// var apiInfo = require('./apiKeys.js');

module.exports = {
  getRecipes: (req, res, next) => {
    // insert api id and api password
    const YUMMLY_API_ID = process.env.YUMMLY_API_ID || apiInfo.API_ID;
    const YUMMLY_API_KEY = process.env.YUMMLY_API_KEY || apiInfo.API_KEY;
    const params = url.parse(req.url).query;

    if (url.parse(req.url).query) {
      const apiUrl = 'http://api.yummly.com/v1/api/recipes?_app_id=' + YUMMLY_API_ID + '&_app_key=' + YUMMLY_API_KEY + '&' + params + '&requirePictures=true';

      request(apiUrl, function(err, response, body) {
        if (err) {
          res.status(401).send();
          next(err);
        } else {
          res.json(body);
        }
      });
    } else {
      // shuffles recipes stored in data.js
      db.matches = shuffle(db.matches);
      res.status(200);
      res.json(JSON.stringify(db));
    }
  },
  saveRecipe: function({ body: { id }, body}, res, next) {

    Recipe.findOne({id})
      .then(recipe => {
        if (recipe) {
          recipe.numberOfSaves++;
          return recipe.save();
        }
        let newRecipe = new Recipe(body);
        return newRecipe.save();
      })
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        res.status(400).send();
        next(err);
      });
  }
};
