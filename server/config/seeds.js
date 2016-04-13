var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dolla_dolla_db";

var emptyCollection = function (callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return;
    }
    var portfolio = db.collection('portfolio')
    portfolio.remove({})
    db.close(callback);
  })  
} 

var emptyMarketCollection = function (callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return;
    }
    var market = db.collection('market')
    market.remove({})
    db.close(callback);
  })  
} 


var insertData = function () {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return;
    }
    var portfolio = db.collection('portfolio')
    var data = [
        {
          "name": "CLS Holdings",
          "epic":"CLI",
          "price": 1514,
          "quantity": 2000,
          "buyPrice": 1200,
          "pastCloseOfDayPrices": [1515, 1520, 1476, 1476, 1495, 1500, 1455],
          "buyDate":"2014-11-15"
        },
        {
          "name": "Cairn Energy",
          "epic":"CNE",
          "price": 200,
          "quantity": 3500,
          "buyPrice": 140.00,
          "pastCloseOfDayPrices": [199, 199, 199, 195, 197, 195, 196],
          "buyDate":"2013-10-23"
        },
        {
          "name": "Compass Group",
          "epic":"CPG",
          "price": 1258,
          "quantity": 1000,
          "buyPrice": 1349,
          "pastCloseOfDayPrices": [1263, 1264, 1264, 1268, 1269, 1246, 1246],
          "buyDate":"2015-12-22"
        }
    ];
    portfolio.insert(data);
    db.close(emptyMarketCollection.bind(this, insertMarketData));
  })
}

var insertMarketData = function () {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return;
    }
    var market = db.collection('market')
    var data = [
        {
          "name": "Euromoney Inst Inv",
          "epic":"ERM",
          "price": 883,
          "pastCloseOfDayPrices": [875, 863, 895, 917, 951, 949, 950],
          "yearHigh" : 1281,
          "yearLow" : 851
        },
        {
          "name": "CLS Holdings",
          "epic":"CLI",
          "price": 1514,
          "pastCloseOfDayPrices": [1515, 1520, 1476, 1476, 1495, 1500, 1455],
          "yearHigh" : 2037,
          "yearLow" : 1343
        },
        {
          "name": "Cairn Energy",
          "epic":"CNE",
          "price": 200,
          "pastCloseOfDayPrices": [199, 199, 199, 195, 197, 195, 196],
          "yearHigh" : 214,          
          "yearLow" : 124
        },
        {
          "name": "Compass Group",
          "epic":"CPG",
          "price": 1258,
          "pastCloseOfDayPrices": [1263, 1264, 1264, 1268, 1269, 1246, 1246],
          "yearHigh" : 1298,          
          "yearLow" : 963          
        }
    ];
    market.insert(data);
    db.close();
  })
}



emptyCollection(insertData);
