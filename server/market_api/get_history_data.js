var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var GetHistoryData = function (stockSymbol, initialDate, endDate) {
  this.epic = stockSymbol;
  this.initialDate = initialDate;
  this.endDate = endDate;
}

GetHistoryData.prototype.fetch = function (callback) {
  var url = this.buildQueryString();
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function() {
    if(request.status === 200) {
      var response = JSON.parse(request.responseText).query.results.quote;
      var pastPricesRaw = [];
      for (var i = response.length - 1; i >= 0; i--) {
        pastPricesRaw.push(parseFloat(response[i].Close).toFixed(2));
      }
      var pastPrices = [];
      var counter  = 0;
      while(counter < 7) {
        var last = pastPricesRaw.pop();
        pastPrices.push(last);
        counter ++;
      }
      callback(pastPrices);
    }
  }.bind(this);
  request.send();
}

GetHistoryData.prototype.buildQueryString = function () {
  var query = 'select * from yahoo.finance.historicaldata where symbol in ("'+this.epic+'") and startDate = "'+this.initialDate+'" and endDate = "'+this.endDate+'"';
  return 'https://query.yahooapis.com/v1/public/yql?q='+query+'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
}

module.exports = GetHistoryData;