require('short-dom')();
var LineChart = require('./charts/portfolio_line_chart.js');

var HoldingDetailView = function (holding, refreshCache, router) {
  this.holding = holding;
  this.refreshCache = refreshCache;
  this.router = router;
  this.input = ce('input')
}

HoldingDetailView.prototype.render = function () {
  var box = ce('div');
  new LineChart(box, this.holding, this.holding.name, "pastCloseOfDayPrices");
  var details = ce('div');
  details.appendChild(this.renderForm())
  box.appendChild(details);
  return box;
}

HoldingDetailView.prototype.renderForm = function () {
  var container = ce('div');
  this.input.type = "number";
  this.input.value = "0";
  this.input.min = "0";
  this.input.step = "10";
  container.appendChild(this.input);
  container.appendChild(this.renderSellButton());
  container.appendChild(this.renderBuyButton());
  return container
}

HoldingDetailView.prototype.renderSellButton = function () {
  var sellButton = ce('button');
  var maxShares = this.holding.quantity;
  sellButton.innerText = "Sell";
  sellButton.onclick = function () {
    this.holding.sell(this.input.value);
    this.holding.save()
    if (this.input.value === maxShares) {
      this.router.loadNewPage('/portfolio')
    } else {
      this.refreshCache()
    }
    this.input.value = "0";
  }.bind(this)
  return sellButton;
}

HoldingDetailView.prototype.renderBuyButton = function () {
  var buyButton = ce('button');
  buyButton.innerText = "Buy";
  buyButton.onclick = function () {
    this.holding.buy(this.input.value);
    this.holding.save()
    this.refreshCache()
    this.input.value = "0";
  }.bind(this)
  return buyButton
}

module.exports = HoldingDetailView;