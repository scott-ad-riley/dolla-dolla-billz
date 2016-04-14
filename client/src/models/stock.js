var Stock = function(data) {
  this.percentChange = parseFloat(data.chg_percent).toFixed(1);
  this.day_high = data.day_high;
  this.day_low = data.day_low;
  this.name = data.name;
  this.price = data.price;
  this.epic = data.epic;
  this.ts = data.ts;
  this.type = data.type;
  this.utctime = data.utctime;
  this.volume = data.volume;
  this.yearHigh = parseInt(data.year_high);
  this.yearLow = parseInt(data.year_low);
  this.pastCloseOfDayPrices = data.pastCloseOfDayPrices;
  this.lastUpdated = this.lastUpdated;
};

Stock.prototype.change = function () {
  return this.percentChange;
}

Stock.prototype.buy = function (quantity, callback) {
  var url = "/api/portfolio";
  var request = new XMLHttpRequest();
  this.quantity = quantity;
  this.buyDate = new Date();
  this.buyPrice = parseInt(this.price);
  request.open("POST", "/api/portfolio/" + this.epic.toLowerCase());
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    if (request.status === 200) {
      if (callback) callback();
    }
  };
  request.send(JSON.stringify(this));
} 

module.exports = Stock;