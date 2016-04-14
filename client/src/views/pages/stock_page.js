// require('short-dom')();
// require('../../utils/array_prototype_last.js');
var Stock = require('../../models/stock.js');
var Market = require('../../models/market.js');
var StockDetailView = require('../stock_detail_view');
var MarketView = require('../tables/market_view.js');
var TableRowView = require('../tables/row.js');
// var HoldingDetailView = require('../holding_detail_view.js')

module.exports = function (data, refreshCache, router) {
  container.innerHTML = "";
  var epic = router.currentPath.split("/").last();
  var stock = data.find(function (stockData) {
    return stockData.epic === epic.toUpperCase();
  });
  var market = new Market(data, Stock);
  var marketView = new MarketView(market, TableRowView);
  var tableBox = ce('div');
  tableBox.classList.add("pure-u-12-24");
  tableBox.appendChild(marketView.render());
  marketView.addRowClick(function (epic) {
    router.loadNewPage("/market/" + epic);
  });
  container.appendChild(tableBox);

  var stockDetailView = new StockDetailView(new Stock(stock), refreshCache, router, router.navigation);
  var displayBox = ce('div');
  displayBox.classList.add("pure-u-12-24");
  displayBox.appendChild(stockDetailView.render());
  container.appendChild(displayBox);
}