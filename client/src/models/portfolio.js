var Portfolio = function(url){
  this.url = url;
  this.holdings = [];
  this.fetch = function(holdingConstructor, callback){
    var request = new XMLHttpRequest();
    request.open("GET", this.url);

    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        var portfolio = JSON.parse(jsonString);
        portfolio.forEach(function (holdingData) {
          var holdingObject = new holdingConstructor(holdingData);
          this.holdings.push(holdingObject);
        }.bind(this))
        if (callback) callback(this.holdings);
      }
    }.bind(this)
    request.send();

  }
}

Portfolio.prototype.value = function () {
  return this.holdings.reduce(function (mem, holding) {
    return mem + holding.value();
  }, 0)
}

module.exports = Portfolio;