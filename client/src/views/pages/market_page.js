var StockLineChart = require('../charts/stock_line_chart.js');

var renderMarketPage = function(data, refreshCache) {
    var stockSelected;
    container.innerHTML = "";
    var left = document.createElement('div');
    left.classList.add("pure-u-12-24");    
    container.appendChild(left);

    var right = document.createElement('div');
    right.classList.add("pure-u-12-24");        
    container.appendChild(right);
    
    data.sort(function(a,b) {
      if(a.name < b.name) return 1;
      if(a.name > b.name) return -1;
      return 0;
    });
    var stocksList = document.createElement('select');
    for (var i = data.length - 1; i >= 0; i--) {
      var option = document.createElement('option');
      option.value = data[i].symbol;
      option.innerText = data[i].name;
      stocksList.appendChild(option);
    }
    left.appendChild(stocksList);
    var chartContainer = ce('div');
    container.appendChild(chartContainer);

    var tableContainer = document.createElement('div');
    left.appendChild(tableContainer);

    stocksList.onchange = function() {
      while (right.firstChild) {
          right.removeChild(right.firstChild);
      }

      var stockChart = ce('div');
      stockChart.id = "stockChart";
      right.appendChild(stockChart);
      var selected = stocksList.value;

      function findStock(stock) {
        return stock.symbol === selected;
      }
      stockSelected = data.find(findStock); 
      var stockLineGraph = new StockLineChart(stockChart, stockSelected);

      while (tableContainer.firstChild ) {
          tableContainer.removeChild(tableContainer.firstChild);
      }
      var stockTable = document.createElement('table');
      tableContainer.appendChild(stockTable);
      stockTable.id = "stock-table";
      stockTable.classList.add("pure-table")

      Object.keys(stockSelected).forEach(function(key,index) {
        if(key === '_id' || key === 'pastCloseOfDayPrices' || key === 'lastUpdated' || key === 'pastCloseOfDayPrices' ){
          return;
        }
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        td.innerText = key;
        td2.innerText = stockSelected[key];
        tr.appendChild(td);
        tr.appendChild(td2);
        stockTable.appendChild(tr);
      });
    }
    stocksList.onchange();

    var buyForm = document.createElement('form');
    left.appendChild(buyForm);

    var quantityBuy = document.createElement('input');
    quantityBuy.type = 'number';
    buyForm.appendChild(quantityBuy);

    var buyButton = document.createElement('button');
    buyButton.innerText = "BuyBuyBuy";
    buyForm.appendChild(buyButton);

    buyForm.onsubmit = function(event) {
      event.preventDefault();
      console.log(stockSelected.name);
    }
  };

  module.exports = renderMarketPage;