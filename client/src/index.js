require('short-dom')();
var Router = require('./utils/router.js');
var Navigation = require('./views/navigation.js');
// Models
var Portfolio = require('./models/portfolio.js');
var Holding = require('./models/holding.js');
// Model Views
var PortfolioView = require('./views/portfolio_view.js');
var HoldingView = require('./views/holding_view.js');
// Chart Views
var LineChart = require('./views/charts/portfolio_line_chart.js');
var PieChart = require('./views/charts/portfolio_pie_chart.js');
// Page Views
var renderPortfolioPage = require('./views/pages/portfolio_page.js');
// User Query Views
var DynamicHoldingView = require('./views/queries/dynamic_holding_view.js')

var router = new Router();
router.route({
  path: "/portfolio",
  heading: "My Portfolio",
  dataPath: "/api/portfolio",
  defaultRoute: true,
  onLoad: renderPortfolioPage
});

router.route({
  path: "/market",
  heading: "The Market",
  onLoad: function () {
    container.innerHTML = "This is the market page";
  }
});

router.route({
  path: "/about",
  heading: "About Us",
  onLoad: function () {
    container.innerHTML = "This is the about page";
  }
});

router.route({
  path: "/queries",
  heading: "Queries",
  dataPath: "/api/portfolio", 
  onLoad: function (data, refreshCache) {
    container.innerHTML = "";
    var DynamicPortfolio = new PortfolioView(new Portfolio(data, Holding), DynamicHoldingView);
    DynamicPortfolio.makeEditable("Quantity");
    DynamicPortfolio.makeEditable("Price");
    DynamicPortfolio.makeEditable("Value");
    DynamicPortfolio.makeEditable("Change");
    var tableBox = ce('div');
    tableBox.classList.add('pure-u-12-24');
    container.appendChild(DynamicPortfolio.render());
  }
});

window.onload = function() {
  var navigation = new Navigation(router.routes);
  var header = gid('header');
  var container = gid('container');
  navigation.onLinkClicked = function (setActiveLink, path, event) {
    event.preventDefault();
    router.loadNewPage(path);
    setActiveLink(path);
  };
  header.appendChild(navigation.render());
  router.loadInitialPage(window.location.pathname)
  window.onpopstate = function () {
    router.loadExistingPage(history.state)
  };
};