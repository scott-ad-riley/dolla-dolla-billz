require('short-dom')();
var LineChart = require('./charts/portfolio_line_chart.js');

var HoldingDetailView = function (holding, refreshCache, router) {
  this.holding = holding;
  this.refreshCache = refreshCache;
  this.router = router;
}

HoldingDetailView.prototype.render = function () {
  var box = ce('div');
  new LineChart(box, this.holding, this.holding.name, "pastCloseOfDayPrices");
  var details = ce('div');
  var input = ce('input');
  input.type = "number";
  input.value = "0";
  input.min = "0";
  input.step = "10";
  input.max = this.holding.quantity;
  details.appendChild(input);
  var button = ce('button');
  button.innerText = "Sell";
  button.onclick = function () {
    this.holding.sell(input.value);
    this.holding.save()
    if (input.value === input.max) {
      this.router.loadNewPage('/portfolio')
    } else {
      this.refreshCache()
    }
    input.value = "0";
  }.bind(this)
  details.appendChild(button);
  box.appendChild(details);
  return box;
}

module.exports = HoldingDetailView;