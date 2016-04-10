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
    dataPath: "/api/portfolio",
    defaultRoute: true,
    onLoad: function (data, refreshCache) {
      var userPortfolio = new Portfolio(data, Holding);
      var container = gid('container');
      container.innerHTML = "";
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
    heading: "The Market",
    onLoad: function () {
      container.innerHTML = "This is the market page";
    }
  },
  {
    path: "/about",
    heading: "About Us",
    onLoad: function () {
      container.innerHTML = "This is the about page";
    }
  },
  {
    path: "/queries",
    heading: "Queries",
    onLoad: function () {
      container.innerHTML = "This is the queries page";
    }
  }
]

window.onload = function() {
  var router = new Router(routes);
  var navigation = new Navigation(routes);
  var header = gid('header');
  navigation.onLinkClicked = function (path, event) {
    event.preventDefault();
    router.loadNewPage(path);
  }
  header.appendChild(navigation.render());
  router.loadInitialPage(window.location.pathname)
  window.onpopstate = function () {
    router.loadExistingPage(history.state)
  }
};