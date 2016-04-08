var Portfolio = require('./models/portfolio.js');
var Holding = require('./models/holding.js');
var PortfolioView = require('./views/portfolio_view.js')
var HoldingView = require('./views/holding_view.js')

window.onload = function() {
  var url = '/api/portfolio'
  var userPortfolio = new Portfolio(url);
  userPortfolio.fetch(Holding, displayView);
};

var displayView = function (holdingsArray) {
  var portfolioView = new PortfolioView(holdingsArray);
  document.body.appendChild(portfolioView.render());
}