var Portfolio = require('./models/portfolio.js')

window.onload = function() {
  var url = '/sample_data.json'
  var userPortfolio = new Portfolio(url);
  userPortfolio.fetch();
};