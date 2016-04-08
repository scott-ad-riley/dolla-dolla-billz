var Portfolio = function(url){
  this.url = url;
  this.holdings = [];
  this.fetch = function(holdingConstructor){
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
        console.log(this.holdings)
      }
    }.bind(this)
    request.send();

  }
}

module.exports = Portfolio;