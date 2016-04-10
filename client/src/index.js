require('short-dom')();
var Portfolio = require('./models/portfolio.js');
var Holding = require('./models/holding.js');
var PortfolioView = require('./views/portfolio_view.js');
var HoldingView = require('./views/holding_view.js');
var LineChart = require('./views/charts/portfolio_line_chart.js');
var PieChart = require('./views/charts/portfolio_pie_chart.js');
var Router = require('./utils/router.js');
var Navigation = require('./views/navigation.js');

var routes = [
  {
    path: "/portfolio",
    heading: "My Portfolio",
    onLoad: function (data) {
      var userPortfolio = new Portfolio(null, data, Holding);
      console.log(userPortfolio)
      var container = gid('container');
      var lineGraphBox = ce('div');
      lineGraphBox.classList.add("pure-u-12-24");
      container.appendChild(lineGraphBox);
      var lineGraph = new LineChart(lineGraphBox, userPortfolio.holdings);
      var portfolioView = new PortfolioView(userPortfolio.holdings);
      var tableBox = ce('div');
      tableBox.classList.add("pure-u-12-24");
      tableBox.appendChild(portfolioView.render());
      container.appendChild(tableBox);
    }
  },
  {
    path: "/market",
    heading: "The Market"
  },
  {
    path: "/about",
    heading: "About Us"
  },
  {
    path: "/queries",
    heading: "Queries"
  }
]

window.onload = function() {
  var router = new Router(routes);
  var navigation = new Navigation(routes);
  var header = gid('header');
  header.appendChild(navigation.render());
  router.loadPage(window.location.pathname) // might become loadInitial which does replaceState instead of pushState
  // var url = '/api/portfolio';
  // var userPortfolio = new Portfolio(url);
  // userPortfolio.addUpdateCallback(displayView);

  // var lineGraph = document.getElementById('line-graph');
  // var createChart = function(holdings) {
  //   new LineChart(lineGraph, holdings);
  // };
  // userPortfolio.addUpdateCallback(createChart);

  // var pieChart = document.getElementById('pie-chart');
  // var createPieChart = function(holdings){
  //   new PieChart(pieChart, holdings);
  // };
  //   userPortfolio.addUpdateCallback(createPieChart);
  //   userPortfolio.fetch(Holding);

};

var displayView = function (holdingsArray) {
  var portfolioView = new PortfolioView(holdingsArray);
  document.getElementsByClassName('pure-g')[0].appendChild(portfolioView.render());
};