require('short-dom')();
var formatPercent = require("../percent_change_view.js");
var getParentNodeOfType = require('../../utils/get_parent_node_of_type.js')

var MarketView = function (collection, RowConstructor, containerID, headings, epicPosition) {
  this.data = collection;
  this.fields = headings;
  this.tableEl = ce('table')
  this.filterBox = ce('input');
  this.epicPosition = epicPosition;
  this.containerID = containerID
  this.render = function () {
    var tableBox = ce('div');
    tableBox.style.width = "100%";
    tableBox.appendChild(this.tableEl);
    tableBox.id = this.containerID;
    tableBox.appendChild(this.renderSearch());
    this.tableEl.style.tableLayout = "fixed";
    this.tableEl.style.width = "100%";
    this.tableEl.classList.add('pure-table');
    this.tableEl.classList.add('pure-table-horizontal');
    this.tableEl.appendChild(this.renderHeader());
    var tableBody = ce('tbody');
    tableBody.classList.add('list');
    this.tableEl.appendChild(tableBody);
    this.data.forEach(function (data) {
      var rowView = new RowConstructor(data, this.fields);
      tableBody.appendChild(rowView.render());
    }.bind(this));
    tableBox.appendChild(this.tableEl);
    return tableBox;
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

  this.renderSearch = function () {
    var input = ce('input');
    input.classList.add('search');
    input.classList.add('go-right');
    return input;
  }

  this.addRowClick = function (callback) {
    this.tableEl.childNodes[1].onclick = function (e) {
      var tableRow = getParentNodeOfType(e.target, "tr");
      var clickedStockEpic = tableRow.childNodes[this.epicPosition].innerText;
      callback(clickedStockEpic.toLowerCase())
    }.bind(this);
  }

}

module.exports = MarketView;