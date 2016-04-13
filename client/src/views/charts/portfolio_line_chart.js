var Highcharts = require('highcharts');

var LineChart = function(container, data, title, keyToUse){
  this.title = title;
  this.type = "line";
  this.handleData(data, keyToUse);
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
    xAxis: { categories: ['7','6','5','4','3','2','1'] },
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

LineChart.prototype.handleData = function (data, keyToUse){
  if (Array.isArray(data)) {
    this.data = data.map(function (holding) {
      return {
          name: holding[i].name,
          data: holding[i][keyToUse] 
        }
    });
  } else {
    this.data = [{
              name: data.name,
              data: data[keyToUse] 
            }];
  }

}

module.exports = LineChart;



