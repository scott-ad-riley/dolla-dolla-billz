var Portfolio = require('./models/portfolio.js');
var Holding = require('./models/holding.js');
var PortfolioView = require('./views/portfolio_view.js');
var HoldingView = require('./views/holding_view.js');
var LineChart = require('./views/charts/portfolio_line_chart.js');
var PieChart = require('./views/charts/portfolio_pie_chart.js');


window.onload = function() {
  var url = '/api/portfolio';
  var userPortfolio = new Portfolio(url);
  userPortfolio.addUpdateCallback(displayView);

  var lineGraph = document.getElementById('line-graph');
  var createChart = function(holdings) {
    new LineChart(lineGraph, holdings);
  };
  userPortfolio.addUpdateCallback(createChart);

  var pieChart = document.getElementById('pie-chart');
  var createPieChart = function(holdings){
    new PieChart(pieChart, holdings);
  };
    userPortfolio.addUpdateCallback(createPieChart);
    userPortfolio.fetch(Holding);

};

var displayView = function (holdingsArray) {
  var portfolioView = new PortfolioView(holdingsArray);
  document.body.appendChild(portfolioView.render());
};