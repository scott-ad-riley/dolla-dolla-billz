require('short-dom')();
var camelCase = require('../../utils/strip_heading.js');
var HoldingView = function (holdingObj, fields) {
  this.data = holdingObj;
  this.fields = fields;
  this.tableRow = ce('tr');

  this.render = function () {
    this.fields.forEach(this.renderCell.bind(this, false, this.data))
    return this.tableRow;
  }

  this.renderSpecificRow = function (updatedHoldingObject) {
    this.fields.forEach(this.renderCell.bind(this, true, updatedHoldingObject));
  }

  this.getCell = function (cellPosition) {
    return this.tableRow.childNodes[cellPosition]
  }

  this.renderCell = function (isUpdate, holdingObj, field, cellIndex, fields) {
    var td = (isUpdate) ? this.getCell(cellIndex) : document.createElement("td");
    td.innerText = "";
    if (typeof field.value === "function") {
      td.appendChild(field.value(holdingObj));
    } else {
      td.innerHTML = holdingObj[camelCase(field.heading)];
    }
    if (field.isEditable) {
      td.contentEditable = true;
      td.oninput = this.onChange.bind(this, field.heading, holdingObj);
    }
    if (!isUpdate) this.tableRow.appendChild(td);
  }

  this.onChange = function (methodName, holdingObj, event) {
    // we need to create a new model
    var newHoldingObject = holdingObj[camelCase("dynamic " + methodName)](event.target.innerText);
    this.renderSpecificRow(newHoldingObject);
  } 
}
module.exports = HoldingView;