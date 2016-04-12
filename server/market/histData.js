var Stock = function(data, pastCloseOfDayPrices) {
  this.change = data.change;
  this.chg_percent = data.chg_percent;
  this.day_high = data.day_high;
  this.day_low = data.day_low;
  this.name = data.name;
  this.price = data.price;
  this.symbol = data.symbol;
  this.ts = data.ts;
  this.type = data.type;
  this.utctime = data.utctime;
  this.volume = data.volume;
  this.year_high = data.year_high;
  this.year_low = data.year_low;
  this.pastCloseOfDayPrices = pastCloseOfDayPrices;
  this.lastUpdated = Date();
};

var getHistData = function(data, callback) {

  Date.prototype.yyyymmddhh = function() {
    var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  var hh = this.getHours().toString();
  return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]); // padding
};

Date.prototype.yahoodate = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
};

var todayDate = new Date();
todayDate = todayDate.yahoodate();
var nowDate = new Date();
var lastWeek = new Date(nowDate.getTime()-1000*60*60*24*20);
var lastWeekDate = lastWeek.yahoodate();

query = 'select * from yahoo.finance.historicaldata where symbol in ("'+data.symbol+'") and startDate = "'+lastWeekDate+'" and endDate = "'+todayDate+'"';
url = 'https://query.yahooapis.com/v1/public/yql?q='+query+'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
    var stock = new Stock(data, pastPrices);
    callback(stock);
  }
};
request.send();
};

module.exports = getHistData;