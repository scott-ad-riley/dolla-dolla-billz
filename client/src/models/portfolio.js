var Portfolio = function(url){
  this.url = url;
  this.holdings = [];
  this.fetch = function(holdingConstructor, callback){
    var request = new XMLHttpRequest();
    request.open("GET", this.url);

    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        var portfolio = JSON.parse(jsonString);
        portfolio.forEach(function (holdingData) {
          var holdingObject = new holdingConstructor(holdingData);
          this.holdings.push(holdingObject);
        }.bind(this))
        if (callback) callback(this.holdings);
      }
    }.bind(this)
    request.send();

  }
}

Portfolio.prototype.value = function () {
  return this.holdings.reduce(function (mem, holding) {
    return mem + holding.value();
  }, 0);
}

Portfolio.prototype.change = function (distance) {
  // (Price Sold - Previous Price)/(Previous Price)
  var distance = distance || 1;
  var previousValue = this.holdings.reduce(function (mem, holding) {
    return mem + (holding.pastCloseOfDayPrices[(holding.pastCloseOfDayPrices.length - (distance))] * holding.quantity)
  }, 0);
  var difference = this.value() - previousValue;
  return ((difference / previousValue) * 100).toFixed(1);
}

module.exports = Portfolio;