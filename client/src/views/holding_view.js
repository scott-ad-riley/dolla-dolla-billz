var HoldingView = function (holdingObj, fields) {
  this.data = holdingObj;
  this.fields = fields;

  this.render = function () {
    var tr = document.createElement('tr');
    
    var td1 = document.createElement("td");
    td1.innerHTML = this.data[fields[0]];
    tr.appendChild(td1);

    var td2 = document.createElement("td");
    td2.innerHTML = this.data[fields[1]];
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.innerHTML = this.data[fields[2]];
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    td4.innerHTML = this.data[fields[3]];
    tr.appendChild(td4);

    var td5 = document.createElement("td");
    td5.innerHTML = this.data[fields[4]];
    tr.appendChild(td5);

    var td6 = document.createElement("td");
    td6.innerHTML = this.data[fields[5]];
    tr.appendChild(td6);

     var tr7 = document.createElement("td");
    var value = (td6.innerHTML * td4.innerHTML)/100;
    tr7.innerHTML = "£" + value;
    tr.appendChild(tr7);

    return tr;
  }
}
module.exports = HoldingView;