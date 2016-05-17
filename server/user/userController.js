const User = require('./userModel.js');
const jwt = require('jwt-simple');
const { findIndex } = require('lodash');

module.exports = {
  signin: function({ body: { username, password } }, res, next) {
    User.findOne({username})
      .then(user => {
        if (!user) {
          res.status(401).send({error: 'User does not exist'});
          next(new Error('User does not exist'));
        } else {
          return user.checkPassword(password)
            .then(foundUser => {
              if (foundUser) {
                let token = jwt.encode(user, 'secret');
                res.json({
                  username: user.username,
                  token,
                  preferences: user.dietPreferences
                });
              } else {
                res.status(401).send('User or password is incorrect');
                next(new Error('User or password is incorrect'));
              }
            });
        }
      })
      .catch(error => next(error));
  },
  signup: function({ body: { username, password, preferences } }, res, next) {
    User.findOne({username})
      .then(user => {
        if (user) {
          res.status(403).send({error: 'User already exists'});
          next(new Error('User already exists!'));
        } else {
          let newUser = {
            username,
            password,
            dietPreferences: preferences
          };
          let newSignupUser = new User(newUser);
          return newSignupUser.save();
        }
      })
      .then(user => {
        let token = jwt.encode(user, 'secret');
        res.json({token});
      })
      .catch(err => next(err));
  },
  checkAuth: function(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('no token'));
    } else {
      let user = jwt.decode(token, 'secret');
      User.findOne({username: user.username})
        .then(foundUser => {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .catch(err => next(err));
    }
  },
  getSavedMeals: function(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('no token'));
    } else {
      let user = jwt.decode(token, 'secret');
      User.findOne({username: user.username})
        .then((foundUser) => {
          if (foundUser) {
            res.status(200);
            res.json(foundUser.savedRecipes);
          } else {
            res.status(401).send();
          }
        })
        .catch(err => next(err));
    }
  },
  saveMeal: function(req, res, next) {
    let token = req.headers['x-access-token'];
    let mealId = req.body;

    if (!token) {
      next(new Error('no token'));
    } else {
      let user = jwt.decode(token, 'secret');

      User.findOne({username: user.username})
        .then(foundUser => {
          if (foundUser && findIndex(foundUser.savedRecipes, mealId) === -1) {
            foundUser.savedRecipes.push(mealId);
            foundUser.save()
              .then(() => res.status(200).send())
              .catch(err => {
                res.status(200).send();
                next(err);
              });
          } else {
            res.status(401).send();
          }
        })
        .catch(err => next(err));
    }
  },
  saveDietPreferences: function({ body: { preferences } }, res, next) {
    let token = req.headers['x-access-token'];

    if (!token) {
      next(new Error('no token'));
    } else {
      let { username } = jwt.decode(token, 'secret');
      User.findOne({username})
        .then(foundUser => {
          if (foundUser) {
            foundUser.dietPreferences = preferences;
            return foundUser.save();
          }
          res.status(4000).send();
        })
        .then(() => {
          res.status(200).send();
        })
        .catch(err => {
          res.status(400).send();
          next(err);
        });
    }
  },

  getDietPreferences: function({ headers }, res, next) {
    let token = headers['x-access-token'];

    if (!token) {
      next(new Error('no token'));
    } else {
      let { username } = jwt.decode(token, 'secret');
      User.findOne({username})
        .then(foundUser => {
          if (foundUser) {
            let dietPreferences = foundUser.dietPreferences;
            res.status(200);
            res.json(dietPreferences);
          } else {
            res.status(401).send();
          }
        })
        .catch(err => next(err));
    }
  }
};
