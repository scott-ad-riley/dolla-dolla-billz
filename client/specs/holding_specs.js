var assert = require('chai').assert;
var Holding = require('../src/models/holding.js');

describe("A Holding", function () {
  var holding;
  beforeEach(function () {
    holding = new Holding({
      "name": "Fusionex",
      "epic":"FXI",
      "price": 120.00,
      "quantity": 2000,
      "buyPrice": 80.00,
      "pastCloseOfDayPrices": [92.00, 89.00, 103.00, 125.00, 108.00, 98.00, 110.00],
      "buyDate":"2014-11-15"
    });
  });
  it("should calculate it's total value", function () {
    assert.equal(240000, holding.value());
  });
  
  it("should calculate it's percent change over last value", function () {
    assert.equal(9.1, holding.change());
  });

  it("should calculate it's percent change over second last value", function () {
    assert.equal(22.4, holding.change(2));
  });

  it("should calculate it's percent change over third last value", function () {
    assert.equal(11.1, holding.change(3));
  });

  it("should update if the sell price increases", function () {
    var updatedHolding = holding.dynamicPrice("110");
    assert.equal(0.0, updatedHolding.change());
    assert.equal(220000, updatedHolding.value());
  });

  it("should update if the value increases", function () {
    var updatedHolding = holding.dynamicValue("£2600.00");
    assert.equal(18.2, updatedHolding.change());
    assert.equal(130, updatedHolding.price);
  });

  it("should update if the quantity increases", function () {
    var updatedHolding = holding.dynamicQuantity(2500)
    assert.equal(300000, updatedHolding.value());
  })
});