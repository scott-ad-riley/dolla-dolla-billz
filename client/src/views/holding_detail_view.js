require('short-dom')();
var LineChart = require('./charts/portfolio_line_chart.js');

var HoldingDetailView = function (holding) {
  this.holding = holding;
}

HoldingDetailView.prototype.render = function () {
  var box = ce('div');
  new LineChart(box, this.holding, this.holding.name, "pastCloseOfDayPrices");
  return box;
}

module.exports = HoldingDetailView;