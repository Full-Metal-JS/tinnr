var expect = require('chai').expect;
var request = require('request');

var db = require('../server/data.js');


describe('Server routes:', function(){
  var req = request.defaults();

  it('/recipes: Responds with all recipes', function(){
    var options = {
      'method': 'GET',
      'uri': 'http://127.0.0.1:3000/recipes'
    };

    req(options, function(error, res, body){
      expect(res.statusCode).to.equal(200);
      expect(res.body.results.length).to.equal(db.rresults.length);
    });
  });
});
