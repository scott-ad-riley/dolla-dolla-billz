var camelCase = require('../utils/strip_heading.js');
var TableRow = function (holdingObj, fields) {
  this.data = holdingObj;
  this.fields = fields;

  this.render = function () {
    var tr = document.createElement('tr');
    this.fields.forEach(function (field) {
      var td = document.createElement("td");
      if (typeof field.value === "function") {
        td.appendChild(field.value(this.data));
      } else {
        td.innerHTML = this.data[camelCase(field.heading)];
      }
      tr.appendChild(td);
    }.bind(this));
    return tr;
  };
};
module.exports = TableRow;