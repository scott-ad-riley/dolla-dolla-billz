var Portfolio = require('./models/portfolio.js');
var Holding = require('./models/holding.js');

window.onload = function() {
  var url = '/sample_data.json'
  var userPortfolio = new Portfolio(url);
  userPortfolio.fetch(Holding);
};