var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/dolla_dolla_db';

var CollectionImporter = function (maxConcRequests) {
  this.max = maxConcRequests;
  this.currentRequestCount = 0;
  this.marketRequests = [];
  this.portfolioRequests = [];
}

CollectionImporter.prototype.addMarketRequest = function (objectToInsert, callback) {
  if (this.max === this.currentRequestCount) {
    this.marketRequests.push({value: objectToInsert, callback: callback});
  } else {
    this.upsertObject({value: objectToInsert, callback: callback});
  }
}

CollectionImporter.prototype.addHoldingRequest = function (objectToInsert) {
  if (this.max === this.currentRequestCount) {
    this.portfolioRequests.push(objectToInsert);
  } else {
    this.updateHolding(objectToInsert);
  }
}

CollectionImporter.prototype.upsertObject = function (data) {
  this.currentRequestCount++;
  MongoClient.connect(url, function(err, db) {
      if(err) {
          console.log(err);
          return;
      }
      var collection = db.collection('market');
      collection.update(
        {
          "epic" : data.value.epic
        },
        data.value,
        {
          upsert: true
        }, function () {
          db.close(function () {
            data.callback();
            this.currentRequestCount--;
            if (this.marketRequests.length > 0) {
              this.upsertObject(this.marketRequests.pop())
            } else if (this.portfolioRequests > 0) {
              this.updateHolding(this.portfolioRequests.pop())
            }
          }.bind(this))
      }.bind(this));
      
  }.bind(this));
}

CollectionImporter.prototype.updateHolding = function (object) {
  this.currentRequestCount++;
  MongoClient.connect(url, function(err, db) {
      if(err) {
          console.log(err);
          return;
      }
      var collection = db.collection('portfolio');
      collection.updateOne(
        {
          "epic" : object.epic
        },
        {
          $set : {
            price: object.price,
            pastCloseOfDayPrices: object.pastCloseOfDayPrices
          }
        },
        function () {
          db.close(function () {
            this.currentRequestCount--;
            if (this.marketRequests.length > 0) {
              this.upsertObject(this.marketRequests.pop())
            } else if (this.portfolioRequests > 0) {
              this.updateHolding(this.portfolioRequests.pop())
            }
          }.bind(this))
      }.bind(this));
      
  }.bind(this));
}

module.exports = CollectionImporter;