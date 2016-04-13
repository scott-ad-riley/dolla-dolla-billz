var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var marketUpdate = require('./market_api/fetch_and_import_market.js');
var url = 'mongodb://localhost:27017/dolla_dolla_db';

app.use(express.static('../client/build'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.get("/:page", function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.get("/portfolio/:page", function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/api/portfolio', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var portfolio = db.collection('portfolio');
    portfolio.find({}).toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
});

app.get('/api/portfolio/:epic', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var portfolio = db.collection('portfolio');
    portfolio.find({epic: req.params.epic.toUpperCase()}).toArray(function(err, docs) {
      res.json(docs[0]);
      db.close();
    });
  });
})


app.post('/api/portfolio/:epic', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var portfolio = db.collection('portfolio');
    if (req.body.quantity === 0) {
      portfolio.remove({"epic" : req.body.epic}, function () {
        res.send('post completed');
        res.status(200).end();
        db.close(); 
      });
    } else {
      portfolio.update(
        {
          "epic" : req.body.epic
        },
        {
          "epic": req.body.epic,
          "name": req.body.name,
          "price": req.body.price,
          "quantity": req.body.quantity,
          "buyPrice": req.body.buyPrice,
          "pastCloseOfDayPrices": req.body.pastCloseOfDayPrices,
          "buyDate": req.body.buyDate
        },
        {
          upsert: true
        }, function () {
          res.send('post completed');
          res.status(200).end();
          db.close(); 
      });
    }
  });
})


app.post('/api/portfolio', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var portfolio = db.collection('portfolio');
    portfolio.insert({
      "name": req.body.name,
      "epic": req.body.epic,
      "price": req.body.price,
      "quantity": req.body.quantity,
      "buyPrice": req.body.buyPrice,
      "pastCloseOfDayPrices": req.body.pastCloseOfDayPrices,
      "buyDate": req.body.buyDate
    });
  });
  res.send('post completed');
  res.status(200).end();
  db.close(); 
});

app.get("/api/market", function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var market = db.collection('market');
    market.find({}).toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
});

app.get("/api/market/update", function (req, res) {
  marketUpdate();
  res.send('Updated Market');
});

// app.get("/api/about", function (req, res) {
//   res.json({"dataFor": "the about"});
// });

// app.get("/api/queries", function (req, res) {
//   res.json({"dataFor": "the queries"});
// });