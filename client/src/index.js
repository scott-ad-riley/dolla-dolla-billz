require('short-dom')();
var Portfolio = require('./models/portfolio.js');
var Holding = require('./models/holding.js');
var PortfolioView = require('./views/portfolio_view.js');
var HoldingView = require('./views/holding_view.js');
var LineChart = require('./views/charts/portfolio_line_chart.js');
var PieChart = require('./views/charts/portfolio_pie_chart.js');
var StockLineChart = require('./views/charts/stock_line_chart.js');
var Router = require('./utils/router.js');
var Navigation = require('./views/navigation.js');

var router = new Router();
router.route({
  path: "/portfolio",
  heading: "My Portfolio",
  dataPath: "/api/portfolio",
  defaultRoute: true,
  onLoad: function (data, refreshCache) {
    var userPortfolio = new Portfolio(data, Holding);
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
    var totalValueText = document.createElement('p');
    totalValueText.innerHTML = 'Total Value: £' + userPortfolio.value().toLocaleString();
    tableBox.appendChild(totalValueText);
  }
});

router.route({
  path: "/market",
  heading: "The Market",
  dataPath: "/api/market",
  onLoad: function (data, refreshCache) {
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
      };
      var stockChart = ce('div');
      stockChart.id = "stockChart"
      stockChart.classList.add("pure-g-12-24");
      chartContainer.appendChild(stockChart);
      var selected = stocksList.value;

      function findStock(stock) { 
        return stock.symbol === selected;
      }
      var stockToChart = data.find(findStock); 
      var stockLineGraph = new StockLineChart(stockChart, stockToChart);
    }
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
  onLoad: function () {
    container.innerHTML = "This is the queries page";
  }
});

window.onload = function() {
  var navigation = new Navigation(router.routes);
  var header = gid('header');
  var container = gid('container');
  navigation.onLinkClicked = function (path, event) {
    event.preventDefault();
    router.loadNewPage(path);
  };
  header.appendChild(navigation.render());
  router.loadInitialPage(window.location.pathname)
  window.onpopstate = function () {
    router.loadExistingPage(history.state)
  };
};