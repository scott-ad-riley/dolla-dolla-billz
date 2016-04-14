var Market = function (data, StockConstructor) {
  this.stocks = data.map(function (stockData) {
    return new StockConstructor(stockData)
  }).sort(function (a, b) {
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1;
    return 0;
  })
};

module.exports = Market;