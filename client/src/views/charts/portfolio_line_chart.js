var Highcharts = require('highcharts');

var LineChart = function(container, data, title){

  var type = "line";
  var data = [];

  for (var i = data.length - 1; i >= 0; i--) {
      var objToPush = {
        name: data[i].name,
        data: data[i].pastCloseOfDayPrices 
      };
      data.push(objToPush);
  }

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



