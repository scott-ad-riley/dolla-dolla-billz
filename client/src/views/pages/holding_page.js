require('short-dom')();
require('../../utils/array_prototype_last.js');
var Holding = require('../../models/holding.js');
var Portfolio = require('../../models/portfolio.js');
var TableView = require('../tables/table_view.js');
var TableRowView = require('../tables/row.js');
var HoldingDetailView = require('../holding_detail_view.js')
var portfolioTableFields = require('../tables/portfolio_fields.js');

module.exports = function (data, refreshCache, router) {
  container.innerHTML = "";
  var epic = router.currentPath.split("/").last();
  console.log(epic);
  var holdingData = data.find(function (holdingData) {
    return holdingData.epic === epic.toUpperCase();
  });
  var holdingDetailView = new HoldingDetailView(new Holding(holdingData), refreshCache, router);
  var userPortfolio = new Portfolio(data, Holding);
  var portfolioView = new TableView(userPortfolio.holdings, TableRowView, 'market-table', portfolioTableFields, 0);
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