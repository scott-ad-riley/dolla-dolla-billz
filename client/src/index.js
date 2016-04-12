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
var StockLineChart = require('./views/charts/stock_line_chart.js');
// Page Views
var renderPortfolioPage = require('./views/pages/portfolio_page.js');
var renderHoldingPage = require('./views/pages/holding_page.js');
// User Query Views
var DynamicHoldingView = require('./views/queries/dynamic_holding_view.js')

var router = new Router();
router.route({
  path: "/portfolio"  ,
  heading: "My Portfolio",
  dataPrefix: "/api",
  defaultRoute: true,
  onLoad: renderPortfolioPage
});

router.route({
  path: "/portfolio/:epic",
  dataPath: "/api/portfolio",
  onLoad: renderHoldingPage
})

router.route({
  path: "/market",
  heading: "The Market",
  dataPath: "/api/market",
  onLoad: function (data, refreshCache) {
    container.innerHTML = "";
    data.sort(function(a,b) {
      if(a.name < b.name) return 1;
      if(a.name > b.name) return -1;
      return 0;
    });
    var stocksList = document.createElement('select');
    for (var i = data.length - 1; i >= 0; i--) {
      var option = document.createElement('option');
      option.value = data[i].symbol;
      option.innerText = data[i].name;
      stocksList.appendChild(option);
    }
    container.appendChild(stocksList);
    var chartContainer = ce('div');
    container.appendChild(chartContainer);

    stocksList.onchange = function() {
      while (chartContainer.firstChild) {
          chartContainer.removeChild(chartContainer.firstChild);
      }
      var stockChart = ce('div');
      stockChart.id = "stockChart";
      stockChart.classList.add("pure-g-12-24");
      chartContainer.appendChild(stockChart);
      var selected = stocksList.value;

      function findStock(stock) {
        return stock.symbol === selected;
      }
      var stockToChart = data.find(findStock); 
      var stockLineGraph = new StockLineChart(stockChart, stockToChart);
    };
    stocksList.onchange();
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

window.onload = function () {
  var navigation = new Navigation(router.routes);
  var header = gid('header');
  var container = gid('container');

  navigation.onLinkClicked = function (setActiveLink, path, event) {
    event.preventDefault();
    router.loadNewPage(path);
    setActiveLink(path);
  };

  header.appendChild(navigation.render());
  router.loadInitialPage(window.location.pathname);
  navigation.setActiveLink(router.currentPath);

  window.onpopstate = function () {
    router.loadExistingPage(history.state);
    navigation.setActiveLink(history.state.url);
  };
};