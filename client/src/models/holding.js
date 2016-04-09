var Holding = function (info) {
  this.buyPrice = info.buyPrice;
  this.epic = info.epic;
  this.name = info.name;
  this.pastCloseOfDayPrices = info.pastCloseOfDayPrices;
  this.price = info.price;
  this.quantity = info.quantity;
  this.buyDate = info.buyDate;
}

Holding.prototype.value = function () {
  return this.price * this.quantity;
}

Holding.prototype.change = function (distance) {
    var distance = distance || 0;
    var previousPrice = this.pastCloseOfDayPrices[(this.pastCloseOfDayPrices.length - (distance + 1))]
    var difference = this.price - previousPrice;
    return ((difference / previousPrice) * 100).toFixed(1);
}

module.exports = Holding;