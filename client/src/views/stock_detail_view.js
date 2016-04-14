require('short-dom')();
var LineChart = require('./charts/line_chart.js');

var StockDetailView = function (stock, refreshCache, router) {
  this.stock = stock;
  this.refreshCache = refreshCache;
  this.router = router;
  this.input = ce('input')
}

StockDetailView.prototype.render = function () {
  var box = ce('div');
  new LineChart(box, this.stock, this.stock.name, "pastCloseOfDayPrices");
  var details = ce('div');
  details.appendChild(this.renderForm())
  box.appendChild(details);
  return box;
}

StockDetailView.prototype.renderForm = function () {
  var container = ce('div');
  this.input.type = "number";
  this.input.value = "0";
  this.input.min = "0";
  this.input.step = "10";
  var valueDisplay = ce('div');
  valueDisplay.innerText = "";
  this.input.oninput = function () {
    if (this.input.value !== "0") {
      valueDisplay.innerText = "Worth: " + this.calculatePrice();
    } else {
     valueDisplay.innerText = "";
    }
  }.bind(this);
  container.appendChild(this.input);
  container.appendChild(this.renderBuyButton());
  container.appendChild(valueDisplay);
  return container
}

StockDetailView.prototype.calculatePrice = function () {
  return "£" + (this.stock.price * this.input.value) / 100;
}

StockDetailView.prototype.renderBuyButton = function () {
  var buyButton = ce('button');
  buyButton.innerText = "Buy";
  buyButton.onclick = function () {
    this.stock.buy(this.input.value, function () {
      this.router.loadNewPage("/portfolio/" + this.stock.epic.toLowerCase())
      this.router.navigation.setActiveLink("/portfolio/" + this.stock.epic.toLowerCase());
    }.bind(this));
    this.input.value = "0";
  }.bind(this)
  return buyButton
}

module.exports = StockDetailView;