var tickers  = require('./tickers.js');
var DetailView = require('./detail_view.js');
var buildDates = require('./build_dates.js');
var getHistData = require('./get_history_data.js');
var Stock = require('./stock.js');
var MarketImporter = require('./database_importer.js');

var importer = new MarketImporter(137, 'market');

var firstGroup = new DetailView(tickers[0])
var secondGroup = new DetailView(tickers[1])
var thirdGroup = new DetailView(tickers[2])
firstGroup.fetch(function (initialStocks) { 
  // at this point we have an array of stocks
  initialStocks.forEach(function (stockWithoutHistory) { 
    // now we are dealing with one stock
    var histDataRequest = new getHistData(stockWithoutHistory.symbol, buildDates[1], buildDates[0])
    histDataRequest.fetch(function (arrayOfStockPastPrices) {
      var stock = new Stock(stockWithoutHistory, arrayOfStockPastPrices);
      importer.addRequest(stock);
    })
  })
});

secondGroup.fetch(function (initialStocks) { 
  // at this point we have an array of stocks
  initialStocks.forEach(function (stockWithoutHistory) { 
    // now we are dealing with one stock
    var histDataRequest = new getHistData(stockWithoutHistory.symbol, buildDates[1], buildDates[0])
    histDataRequest.fetch(function (arrayOfStockPastPrices) {
      var stock = new Stock(stockWithoutHistory, arrayOfStockPastPrices);
      importer.addRequest(stock);
    })
  })
});

thirdGroup.fetch(function (initialStocks) { 
  // at this point we have an array of stocks
  initialStocks.forEach(function (stockWithoutHistory) { 
    // now we are dealing with one stock
    var histDataRequest = new getHistData(stockWithoutHistory.symbol, buildDates[1], buildDates[0])
    histDataRequest.fetch(function (arrayOfStockPastPrices) {
      var stock = new Stock(stockWithoutHistory, arrayOfStockPastPrices);
      importer.addRequest(stock);
    })
  })
});


