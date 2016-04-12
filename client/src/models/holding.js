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
};

Holding.prototype.change = function (distance) {
  var distance = distance || 1;
  var previousPrice = this.pastCloseOfDayPrices[(this.pastCloseOfDayPrices.length - (distance))];
  var difference = this.price - previousPrice;
  return ((difference / previousPrice) * 100).toFixed(1);
}

Holding.prototype.dynamicPrice = function (newValue) {
  this.price = newValue;
  return this;
}

Holding.prototype.dynamicValue = function (newValue) {
  console.log("nothing happened here!")
  this.price = parseInt(newValue.replace("£", "") * 100) / this.quantity;
  return this;
}

Holding.prototype.dynamicQuantity = function (newValue) {
  this.quantity = newValue;
  return this;
}

Holding.prototype.dynamicChange = function (newValue) {
  console.log("nothing happening here!")
  var stripArrowsAndPercent = /[\u25B2\u25BC%]/g
  var percentValue = parseFloat(newValue.replace(stripArrowsAndPercent, "")) / 100;
  var previousPrice = this.pastCloseOfDayPrices[this.pastCloseOfDayPrices.length - 1];
  this.price = Math.round((percentValue * previousPrice) + previousPrice);
  return this;
}


module.exports = Holding;