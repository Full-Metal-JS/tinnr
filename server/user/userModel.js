const mongoose = require('mongoose');
mongoose.Promise = Promise;
const bcrypt = require('bcrypt-nodejs');
const SALT = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  savedRecipes: [],
  dietPreferences: {
    type: Object,
    default: {}
  }
});

UserSchema.methods.checkPassword = function(password) {
  return new Promise((resolve, reject) => {
    let savedPW = this.password;
    bcrypt.compare(password, savedPW, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT, (err, salt) => {
    if (err) {
      return next(err); 
    } 
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      } 
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('users', UserSchema);
