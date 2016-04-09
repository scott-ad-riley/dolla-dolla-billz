var Highcharts = require('highcharts');

var PieChart = function(container, holdings){

  var title = "The Title";
  var type = "pie";
  var data = [{
    name: "pie",
    data: [] 
  }];

  for (var i = holdings.length - 1; i >= 0; i--) {
      var objToPush = {
        name: holdings[i].name,
        y:holdings[i].value()
      };
      data[0].data.push(objToPush);
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

module.exports = PieChart;



