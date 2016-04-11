var Holding = function (info) {
  this.buyPrice = info.buyPrice;
  this.epic = info.epic;
  this.name = info.name;
  this.pastCloseOfDayPrices = info.pastCloseOfDayPrices;
  this.price = info.price;
  this.quantity = info.quantity;
  this.buyDate = info.buyDate;
};

Holding.prototype.value = function () {
  return this.price * this.quantity;
}

Holding.prototype.change = function (distance) {
  var distance = distance || 1;
  var previousPrice = this.pastCloseOfDayPrices[(this.pastCloseOfDayPrices.length - (distance))]
  var difference = this.price - previousPrice;
  console.log("new difference: ", difference);
  return ((difference / previousPrice) * 100).toFixed(1);
}

Holding.prototype.dynamicPrice = function (newValue) {
  this.price = newValue;
  return this;
}

Holding.prototype.dynamicValue = function (newValue) {
  this.price = parseInt(newValue.replace("£", "") * 100) / this.quantity;
  return this;
}

Holding.prototype.dynamicQuantity = function (newValue) {
  console.log("args: ", newValue);
  this.quantity = newValue;
  return this;
}

module.exports = Holding;