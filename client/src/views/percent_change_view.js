require('short-dom')();
var formatPercentChange = function (holding) {
  var span = ce('span');
  var percentChange = holding.change();
  console.log(percentChange);
  if (percentChange > 0) {
    span.innerHTML = "&#x25B2;" + percentChange + "%"; // Gives me the ▲ character
    span.classList.add('green');
  } else if (percentChange < 0) {
    span.innerHTML = "&#x25BC;" + percentChange + "%"; // Gives me the ▼ character
    span.classList.add('red');
  } else {
    span.innerHTML = percentChange;
  }
  return span;
};

module.exports = formatPercentChange;