var assert = require('chai').assert;
var Holding = require('../src/models/holding.js');

describe("A Holding", function () {
  it("should be able to calculate it's total value", function () {
    var holding = new Holding({
      "name": "Fusionex",
      "epic":"FXI",
      "price": 120.00,
      "quantity": 2000,
      "buyPrice": 80.00,
      "pastCloseOfDayPrices": [92.00, 89.00, 103.00, 125.00, 108.00, 98.00, 110.00],
      "buyDate":"2014-11-15"
    })
    assert.equal(240000, holding.value())
  })
})