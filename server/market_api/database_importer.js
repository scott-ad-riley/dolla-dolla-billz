var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/dolla_dolla_db';

var CollectionImporter = function (maxConcRequests, collectionName) {
  this.max = maxConcRequests;
  this.collection = collectionName;
  this.currentRequestCount = 0;
  this.requests = [];
}

CollectionImporter.prototype.addRequest = function (objectToInsert) {
  if (this.max === this.currentRequestCount) {
    this.requests.push(objectToInsert);
  } else {
    this.insertObject(objectToInsert);
  }
}

CollectionImporter.prototype.insertObject = function (object) {
  this.currentRequestCount++;
  MongoClient.connect(url, function(err, db) {
      if(err) {
          console.log(err);
          return;
      }
      var collection = db.collection(this.collection);
      collection.insert(object);
      db.close(function () {
        this.currentRequestCount--;
        if (this.requests.length > 0) {
          this.insertObject(this.requests.pop())
        }
      }.bind(this))
  }.bind(this));
}

module.exports = CollectionImporter;