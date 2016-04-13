var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DetailView = function (tickersArray) {
  this.tickers = tickersArray.map(function (ticker) {
    return ticker + ".l";
  });
  this.stocks = [];
}

DetailView.prototype.fetch = function (callback) {
  var stocks = this.tickers.toString();
  var url = 'http://finance.yahoo.com/webservice/v1/symbols/'+stocks+'/quote?format=json&view=detail';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function() {
    if(request.status === 200) {
      var response = JSON.parse(request.responseText).list.resources;
      response.forEach(function (stock) {
        var data = stock.resource.fields;
        this.stocks.push(data);
      }.bind(this))
      callback(this.stocks);
    }
  }.bind(this);
  request.send();

}

module.exports = DetailView;