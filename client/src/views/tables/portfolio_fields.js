var formatPercent = require("../percent_change_view.js");

module.exports = [
  { heading:"Epic" },
  { heading:"Quantity" },
  { heading:"Price (p)",
    value: function (holding) {
      var span = ce('span');
      span.innerText = Math.round(holding.price);
      return span;
    }
   },
  {
    heading:"Value",
    value: function (holding) {
      var span = ce('span');
      span.innerText = "£" + (holding.value() / 100).toFixed(2);
      return span;
    }
  },
  {
    heading:"Change",
    value: formatPercent
  }
];