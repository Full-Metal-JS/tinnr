const jwt = require('jwt-simple');

module.exports = {
  logError: (err, req, res, next) => {
    console.error(err.stack);
    next(err);
  },
  handleError: (err, req, res) => {
    res.status(500).send({error: err.message});
  },
  decode: (req, res, next) => {
    let token = req.headers['x-access-token'];
    let user;

    if (!token) {
      return res.status(403).send();
    }
    try {
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
};
