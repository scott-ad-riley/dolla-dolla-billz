var Portfolio = function(data, holdingConstructor){
  this.holdings = data.map(function (holding) {
    return new holdingConstructor(holding);
  }) || [];
  this.onUpdate = [];
};

Portfolio.prototype.value = function () {
  return this.holdings.reduce(function (mem, holding) {
    return mem + holding.value();
  }, 0);
};

Portfolio.prototype.update = function () {
  this.onUpdate.forEach(function (callback) {
    callback(this.holdings);
  }.bind(this));
};

Portfolio.prototype.addUpdateCallback = function (callback) {
  this.onUpdate.push(callback);
};

Portfolio.prototype.change = function (distance) {
  var distance = distance || 1;
  var previousValue = this.holdings.reduce(function (mem, holding) {
    return mem + (holding.pastCloseOfDayPrices[(holding.pastCloseOfDayPrices.length - (distance))] * holding.quantity)
  }, 0);
  var difference = this.value() - previousValue;
  return ((difference / previousValue) * 100).toFixed(1);
}

module.exports = Portfolio;