var Highcharts = require('highcharts');

var LineChart = function(container, stock){

  console.log(arguments)
  var title = stock.name;
  var type = "line";
  var arr = stock.pastCloseOfDayPrices;
  var stockPrices = arr.map(Number);
  var data = [{name: stock.name, data: stockPrices}]

  var chart = new Highcharts.Chart({
    chart: {
      renderTo: container,
      type: type,
    },
    title: {
      text: title,
    },
    series: data,
    xAxis: {categories: ['1','2','3','4','5','6','7'] },
    yAxis: {
      title: {
        text: "Something"
      },
      labels: {
        align: 'left',
        x: 0,
        y: -2
      }
    },
    credits: false
  });



};

module.exports = LineChart;



