require('short-dom')();
var Router = require('./utils/router.js');
var Navigation = require('./views/navigation.js');
// Page Views
var renderPortfolioPage = require('./views/pages/portfolio_page.js');
var renderAboutPage = require('./views/pages/about_view.js');
var renderHoldingPage = require('./views/pages/holding_page.js');
var renderMarketPage = require('./views/pages/market_page.js');
var renderStockPage = require('./views/pages/stock_page.js');
var renderQueriesPage = require('./views/pages/queries_page.js');

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
  onLoad: renderMarketPage
});

router.route({
  path: "/market/:epic",
  dataPath: "/api/market",
  onLoad: renderStockPage
});

router.route({
  path: "/about",
  heading: "About Us",
  onLoad: function () {
    renderAboutPage();
  }
});

router.route({
  path: "/queries",
  heading: "Queries",
  dataPath: "/api/portfolio",
  onLoad: renderQueriesPage
});

var navigation = new Navigation(router.routes);
router.navigation = navigation;
window.onload = function () {
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