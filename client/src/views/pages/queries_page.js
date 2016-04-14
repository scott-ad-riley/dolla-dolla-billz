// Models
var Portfolio = require('../../models/portfolio.js');
var Holding = require('../../models/holding.js');
// Views
var DynamicTable = require('../portfolio_view.js');
var DynamicHoldingView = require('../queries/dynamic_holding_view.js');

module.exports = function (data, refreshCache, router) {
  container.innerHTML = "";
  var DynamicPortfolio = new DynamicTable(new Portfolio(data, Holding), DynamicHoldingView);
  DynamicPortfolio.makeEditable("Quantity");
  DynamicPortfolio.makeEditable("Price");
  DynamicPortfolio.makeEditable("Value");
  DynamicPortfolio.makeEditable("Change");
  router.navigation.renderRefreshButton(refreshCache);
  var tableBox = ce('div');
  tableBox.classList.add('pure-u-12-24');
  container.appendChild(DynamicPortfolio.render());
}
