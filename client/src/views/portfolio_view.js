var HoldingView = require('./holding_view.js');

var PortfolioView = function (portfolioObj, headings) {
  this.data = portfolioObj;
  this.fields = headings || ["Name","Epic","Buy Price","Quantity","Buy Date", "Price", "Value"];
  this.properties = ["name","epic","buyPrice","quantity","buyDate", 'price'];
  this.render = function () {
    var tableEl = document.createElement("table");
    tableEl.id = "portfolio-table"
    tableEl.classList.add('pure-u-12-24');
    tableEl.appendChild(this.renderHeader());

    this.data.forEach(function (holding) {
      var holdingView = new HoldingView(holding, this.properties);
      tableEl.appendChild(holdingView.render());
    }.bind(this))

    return tableEl;
  }
  this.renderHeader = function () {
    var tableHeadingRow = document.createElement("tr");
    this.fields.forEach(function (field) {
      var th = document.createElement("th");
      th.innerHTML = field;
      tableHeadingRow.appendChild(th);
    })
    return tableHeadingRow;
  }
}
module.exports = PortfolioView;