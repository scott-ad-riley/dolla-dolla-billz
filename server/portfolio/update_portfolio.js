var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/dolla_dolla_db';
var getCurrentPortfolio = require('./get_portfolio');

var updatePortfolioShares = function (marketShares) {
  console.log(marketShares)
  this.currentPortfolio;
  getCurrentPortfolio(function (portfolioShares) {
    this.currentPortfolio = portfolioShares;

    this.currentPortfolio.forEach(function (holding) {
      console.log(holding);
    });

  });
  // MongoClient.connect(url, function(err, db) {
  //     if(err) {
  //         console.log(err);
  //         return;
  //     }
  //     console.log(stockArray.length);
  //     var market = db.collection('market');
      
  //     market.drop(function() {
  //         market.insert(stockArray);
  //         db.close(updatePortfolioShares.bind(this));
  //     });
  // });
}

module.exports = updatePortfolioShares;