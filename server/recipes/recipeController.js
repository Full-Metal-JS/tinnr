var db = require('../data.js');

module.exports = {
  getAll: function(req, res) {
    res.status(200);
    res.json(db.matches);
  }
};
