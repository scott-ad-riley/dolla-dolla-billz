var Highcharts = require('highcharts');

var LineChart = function(container, data, title){
  this.title = title;
  this.type = "line";
  this.handleData(data);
  this.container = container;

  new Highcharts.Chart({
    chart: {
      renderTo: this.container,
      type: this.type,
    },
    title: {
      text: this.title,
    },
    series: this.data,
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

LineChart.prototype.handleData = function (data){
  if (Array.isArray(data)) {
    this.data = data.map(function (holding) {
      return {
          name: holding[i].name,
          data: holding[i].pastCloseOfDayPrices 
        }
    });
  } else {
    this.data = [{
              name: data.name,
              data: data.pastCloseOfDayPrices 
            }];
  }

}

module.exports = LineChart;



