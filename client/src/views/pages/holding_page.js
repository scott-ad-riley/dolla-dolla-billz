require('short-dom')();
require('../../utils/array_prototype_last.js');
var Holding = require('../../models/holding.js');
var Portfolio = require('../../models/portfolio.js');
var PortfolioView = require('../portfolio_view.js');
var HoldingView = require('../holding_view.js');
var HoldingDetailView = require('../holding_detail_view.js')

module.exports = function (data, refreshCache, router) {
  container.innerHTML = "";
  var epic = router.currentPath.split("/").last();
  var holdingData = data.find(function (holdingData) {
    return holdingData.epic === epic.toUpperCase();
  });
  var holdingDetailView = new HoldingDetailView(new Holding(holdingData), refreshCache, router);
  var userPortfolio = new Portfolio(data, Holding);
  var portfolioView = new PortfolioView(userPortfolio, HoldingView);
  var tableBox = ce('div');
  tableBox.classList.add("pure-u-12-24");
  tableBox.appendChild(portfolioView.render());
  portfolioView.addRowClick(function (epic) {
    router.loadNewPage("/portfolio/" + epic);
  });
  container.appendChild(tableBox);
  var displayBox = ce('div');
  displayBox.classList.add("pure-u-12-24");
  displayBox.appendChild(holdingDetailView.render());
  container.appendChild(displayBox);
}