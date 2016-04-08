var Holding = function (info) {
  this.buyPrice = info.buyPrice;
  this.epic = info.epic;
  this.name = info.name;
  this.pastCloseOfDayPrices = info.pastCloseOfDayPrices;
  this.price = info.price;
  this.quantity = info.quantity;
  this.buyDate = info.buyDate;
}

module.exports = Holding;