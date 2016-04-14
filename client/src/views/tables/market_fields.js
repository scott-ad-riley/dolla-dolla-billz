var formatPercent = require("../percent_change_view.js");

module.exports = [
  { heading:"Name" },
  { heading:"Epic" },
  { heading:"Price (p)",
    value: function (stock) {
      var span = ce('span');
      span.innerText = Math.round(stock.price);
      return span;
    }
   },
  { heading:"Year High" },
  { heading:"Year Low" },
  {
    heading:"Change",
    value: formatPercent
  }
];