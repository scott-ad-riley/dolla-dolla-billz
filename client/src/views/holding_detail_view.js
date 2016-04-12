require('short-dom')();
var Holding = require('../models/holding.js');

module.exports = function (data, refreshCache, router) {

  var holding = new Holding(data);
  console.log(holding);
}