var assert = require('chai').assert;
var Holding = require('../src/models/holding.js');
var Portfolio = require('../src/models/portfolio.js');

describe("A Portfolio", function () {
  it("should be able to calculate it's total value", function () {
    var holding1 = new Holding({
      "name": "Fusionex",
      "epic":"FXI",
      "price": 120.00,
      "quantity": 2000,
      "buyPrice": 80.00,
      "pastCloseOfDayPrices": [92.00, 89.00, 103.00, 125.00, 108.00, 98.00, 110.00],
      "buyDate":"2014-11-15"
    })
    var holding2 = new Holding({
      "name": "Empiric Student Prop",
      "epic":"ESP",
      "price": 112.00,
      "quantity": 3500,
      "buyPrice": 100.00,
      "pastCloseOfDayPrices": [90.00, 78.50, 82.50, 110.00, 109.00, 109.00, 110.50],
      "buyDate":"2013-10-23"
    })
    var holding3 = new Holding({
      "name": "Worldpay",
      "epic":"WGP",
      "price": 301.00,
      "quantity": 1000,
      "buyPrice": 209.40,
      "pastCloseOfDayPrices": [232.60, 220.00, 222.00, 221.60, 240.00, 238.00, 235.40],
      "buyDate":"2015-12-22"
    })
    var userPortfolio = new Portfolio();
    userPortfolio.holdings = [holding1, holding2, holding3];
    assert.equal(933000, userPortfolio.value());
  })
})