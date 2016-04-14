require('short-dom')();
var formatPercent = require("../percent_change_view.js");
var getParentNodeOfType = require('../../utils/get_parent_node_of_type.js')
var defaultFields = [
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

var MarketView = function (marketObj, RowConstructor, headings) {
  this.data = marketObj.stocks;
  this.fields = headings || defaultFields;
  this.tableEl = ce('table')
  this.render = function () {
    this.tableEl.style.tableLayout = "fixed";
    this.tableEl.style.width = "100%";
    this.tableEl.classList.add('pure-table');
    this.tableEl.classList.add('pure-table-horizontal');
    this.tableEl.appendChild(this.renderHeader());
    var tableBody = ce('tbody');
    this.tableEl.appendChild(tableBody);
    this.data.forEach(function (data) {
      var rowView = new RowConstructor(data, this.fields);
      tableBody.appendChild(rowView.render());
    }.bind(this));
    return this.tableEl;
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

  // this.makeEditable = function (requestedHeading) {
  //   var removeKeys = /\(.+/g;
  //   var heading = this.fields.find(function (field) {
  //     return field.heading.replace(removeKeys, "").trim() === requestedHeading;
  //   })
  //   heading.isEditable = true;
  // }

  this.addRowClick = function (callback) {
    this.tableEl.childNodes[1].onclick = function (e) {
      var elementToUse = getParentNodeOfType(e.target, "tr");
      var position = Array.prototype.indexOf.call(this.tableEl.childNodes[1].childNodes, elementToUse);
      callback(this.data[position].epic.toLowerCase())
    }.bind(this);
  }
}

module.exports = MarketView;