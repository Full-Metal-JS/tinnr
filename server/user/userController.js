var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.checkPassword(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },
  signup: function (req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var create;
    var newUser;

    var findOne = Q.nbind(User.findOne, User);

    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exists'));
        } else {
            create = Q.nbind(User.create, User);
            return create({
              username: username,
              password: password
            });
          }
        })
      .then(function (user) {
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },
  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('no token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },
  getSavedMeals: function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('no token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function(foundUser) {
          if (foundUser) {
            var mealIds = foundUser.savedRecipes;
            res.status(200);
            res.json(mealIds);
          } else {
            res.status(401).send();
          }
        })
        .fail(function(error) {
          next(error);
        });
    }
  },
  saveMeal: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var mealId = req.body.mealId;

    if (!token) {
      next(new Error('no token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function(foundUser) {
          if (foundUser) {
            foundUser.savedRecipes.push(mealId);
            Q.ninvoke(foundUser, 'save')
              .then(function() {
                res.status(200).send();
              })
              .fail(function(error) {
                res.status(400).send();
              });
          } else {
            res.status(401).send();
          }
        })
        .fail(function(error) {
          next(error);
        });
    }
  }
};
