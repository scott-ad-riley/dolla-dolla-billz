require('short-dom')();
var formatPercent = require("./percent_change_view.js");
var defaultFields = [
  { heading:"Name" },
  { heading:"Epic" },
  { heading:"Buy Price (p)" },
  { heading:"Quantity" },
  { heading:"Buy Date" },
  { heading:"Price (p)" },
  {
    heading:"Value",
    value: function (holding) {
      var span = ce('span');
      span.innerText = "£" + (holding.value() / 100).toFixed(2)
      return span;
    }
  },
  {
    heading:"Change",
    value: formatPercent
  }
];

var PortfolioView = function (portfolioObj, HoldingViewConstructor, headings) {
  this.data = portfolioObj.holdings;
  this.fields = headings || defaultFields;
  this.render = function () {
    var tableEl = document.createElement("table");
    tableEl.id = "portfolio-table"
    tableEl.classList.add('pure-u-12-24');
    tableEl.appendChild(this.renderHeader());
    this.data.forEach(function (holding) {
      var holdingView = new HoldingViewConstructor(holding, this.fields);
      tableEl.appendChild(holdingView.render());
    }.bind(this))

    return tableEl;
  }
  this.renderHeader = function () {
    var tableHeadingRow = document.createElement("tr");
    this.fields.forEach(function (field) {
      var th = document.createElement("th");
      th.innerHTML = field.heading;
      tableHeadingRow.appendChild(th);
    })
    return tableHeadingRow;
  }

  this.makeEditable = function (requestedHeading) {
    var removeKeys = /\(.+/g;
    var heading = this.fields.find(function (field) {
      return field.heading.replace(removeKeys, "").trim() === requestedHeading;
    })
    heading.isEditable = true;
  }
}
module.exports = PortfolioView;