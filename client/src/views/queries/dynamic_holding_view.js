require('short-dom')();
var camelCase = require('../../utils/strip_heading.js');
var HoldingView = function (holdingObj, fields) {
  this.data = holdingObj;
  this.fields = fields;
  this.tableRow = ce('tr');

  this.render = function () {
    this.fields.forEach(this.renderCell.bind(this, false, null, this.data))
    return this.tableRow;
  }

  this.renderSpecificRow = function (updatedHoldingObject, positionToIgnore) {
    this.fields.forEach(this.renderCell.bind(this, true, positionToIgnore, updatedHoldingObject));
  }

  this.getCell = function (cellPosition) {
    return this.tableRow.childNodes[cellPosition]
  }

  this.renderCell = function (isUpdate, cellToIgnore, holdingObj, field, cellIndex, fields) {
    if (cellToIgnore === cellIndex) return;
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
    var position = Array.prototype.indexOf.call(this.tableRow.childNodes, event.target);
    // we need to create a new model
    var newHoldingObject = holdingObj[camelCase("dynamic " + methodName)](event.target.innerText);
    this.renderSpecificRow(newHoldingObject, position);
  } 
}
module.exports = HoldingView;