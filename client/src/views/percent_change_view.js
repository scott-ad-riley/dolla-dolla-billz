require('short-dom')();
var formatPercentChange = function (model) {
  var span = ce('span');
  var percentChange = model.change();

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