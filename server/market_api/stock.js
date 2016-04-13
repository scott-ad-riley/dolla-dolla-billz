var Stock = function(data, pastCloseOfDayPrices) {
  this.change = data.change;
  this.chg_percent = data.chg_percent;
  this.day_high = data.day_high;
  this.day_low = data.day_low;
  this.name = data.name;
  this.price = data.price;
  this.epic = data.symbol;
  this.ts = data.ts;
  this.type = data.type;
  this.utctime = data.utctime;
  this.volume = data.volume;
  this.year_high = data.year_high;
  this.year_low = data.year_low;
  this.pastCloseOfDayPrices = pastCloseOfDayPrices;
  this.lastUpdated = Date();
};

module.exports = Stock;