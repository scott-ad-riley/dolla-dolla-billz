require('short-dom')();
var formatPercent = require("./percent_change_view.js");
var defaultFields = [
  { heading:"Name" },
  { heading:"Epic" },
  { heading:"Buy Price (p)" },
  { heading:"Quantity" },
  { heading:"Buy Date" },
  { heading:"Price (p)",
    value: function (holding) {
      var span = ce('span');
      span.innerText = Math.round((holding.price + 0.00001) * 100) / 100; // thanks stackoverflow
      return span;
    }
   },
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
    tableEl.classList.add('pure-table');
    tableEl.classList.add('pure-table-horizontal');
    tableEl.appendChild(this.renderHeader());
    var tableBody = ce('tbody');
    tableEl.appendChild(tableBody);
    this.data.forEach(function (holding) {
      var holdingView = new HoldingViewConstructor(holding, this.fields);
      tableBody.appendChild(holdingView.render());
    }.bind(this))

    return tableEl;
  }
  this.renderHeader = function () {
    var tableHeadCont = ce('thead');
    var tableHeadingRow = ce("tr");
    tableHeadCont.appendChild(tableHeadingRow)
    this.fields.forEach(function (field) {
      var th = document.createElement("th");
      th.innerHTML = field.heading;
      tableHeadingRow.appendChild(th);
    })
    return tableHeadCont;
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