require('short-dom')();
var Portfolio = require('../../models/portfolio.js');
var Holding = require('../../models/holding.js');
var TableView = require('../tables/table_view.js');
var TableRowView = require('../tables/row.js');
var portfolioTableFields = require('../tables/portfolio_fields.js');

module.exports = function (data, refreshCache, router) {
  var userPortfolio = new Portfolio(data, Holding);
  container.innerHTML = "";
  var portfolioView = new TableView(userPortfolio.holdings, TableRowView, 'portfolio-table', portfolioTableFields, 0);
  var foo = ce('div');
  foo.classList.add('pure-u-1-5');
  container.appendChild(foo);TableView
  var tableBox = ce('div');
  var totalValueText = document.createElement('p');
  totalValueText.innerHTML = 'Total Value: £' + userPortfolio.value().toLocaleString();
  tableBox.classList.add("pure-u-3-5");
  tableBox.appendChild(totalValueText);
  tableBox.appendChild(portfolioView.render());
  portfolioView.addRowClick(function (epic) {
    router.loadNewPage("/portfolio/" + epic);
  });
  container.appendChild(tableBox);
  var listOptions = {
    valueNames: [ 'epic' ]
  };
  var marketList = new List('portfolio-table', listOptions);
  container.appendChild(foo.cloneNode());
}