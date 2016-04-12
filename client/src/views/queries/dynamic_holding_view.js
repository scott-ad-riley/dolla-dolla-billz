require('short-dom')();
var camelCase = require('../../utils/strip_heading.js');
var getDeepestChildNode = require('../../utils/get_deepest_child_node.js');
var HoldingView = function (holdingObj, fields) {
  this.data = holdingObj;
  this.fields = fields;
  this.tableRow = ce('tr');

  this.render = function () {
    this.fields.forEach(this.renderCell.bind(this, false, null, null, this.data))
    return this.tableRow;
  }
  this.cellWidth = function () {
    return (100 / this.fields).toFixed(5) + "%";
  }

  this.renderSpecificRow = function (updatedHoldingObject, positionEdited, cursorOffset) {
    this.fields.forEach(this.renderCell.bind(this, true, positionEdited, cursorOffset, updatedHoldingObject));
  }

  this.getCell = function (cellPosition) {
    return this.tableRow.childNodes[cellPosition]
  }

  this.getCellContentsAsText = function (td) {
    return getDeepestChildNode(td);
  }

  this.renderCell = function (isUpdate, editedCellIndex, cursorOffset, holdingObj, field, cellIndex, fields) {
    var td = (isUpdate) ? this.getCell(cellIndex) : document.createElement("td");
    // if (editedCellIndex === cellIndex) return;
    var previousContent = this.getCellContentsAsText(td);
    td.innerText = "";
    td.style.width = this.cellWidth();
    var newContent = (typeof field.value === "function") ? field.value(holdingObj) : holdingObj[camelCase(field.heading)];
    if (this.getCellContentsAsText(newContent) !== previousContent && isUpdate && editedCellIndex !== cellIndex) {
      td.classList.add("updated");
      setTimeout(function () {
        td.classList.remove('updated');
      }, 600)
    }
    if (typeof field.value === "function") {
      td.appendChild(field.value(holdingObj));
    } else {
      td.innerHTML = holdingObj[camelCase(field.heading)];
    }
    if (field.isEditable) {
      td.contentEditable = true;
      td.oninput = this.onChange.bind(this, field.heading, holdingObj);
    }
    if (isUpdate && editedCellIndex === cellIndex) this.moveCursorToPosition(td, cursorOffset);
    if (!isUpdate) this.tableRow.appendChild(td);
  }

  this.moveCursorToPosition = function (el, cursorOffset) {
    // black magic.
    el.focus()
    var sel = window.getSelection();
    if (sel.focusNode.childNodes[0].childNodes.length) {
      sel.collapse(sel.focusNode.childNodes[0].childNodes[0], cursorOffset);
    } else {
      sel.collapse(sel.focusNode.childNodes[0], cursorOffset);
    }
  }

  this.onChange = function (methodName, holdingObj, event) {
    var position = Array.prototype.indexOf.call(this.tableRow.childNodes, event.target);
    var offset = getSelection().anchorOffset;
    // we need to create a new model
    var newHoldingObject = holdingObj[camelCase("dynamic " + methodName)](event.target.innerText);
    this.renderSpecificRow(newHoldingObject, position, offset);
  } 
}
module.exports = HoldingView;