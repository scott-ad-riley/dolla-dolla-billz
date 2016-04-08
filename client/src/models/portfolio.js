var Portfolio = function(url){
  this.url = url;
  this.holdings = [];
  this.fetch = function(callback){
    var request = new XMLHttpRequest();
    request.open("GET", this.url);

    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        var portfolio = JSON.parse(jsonString);
        console.log(portfolio)
      }
    }
    request.send();

  }
}

module.exports = Portfolio;