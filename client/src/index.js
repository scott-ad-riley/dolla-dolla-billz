window.onload = function() {
  var url = '/sample_data.json'
  var request = new XMLHttpRequest();
  request.open("GET", url);

  request.onload = function(){
    if(request.status === 200){
      var jsonString = request.responseText;
      var portfolio = JSON.parse(jsonString);
      console.log(portfolio)
    }
  }
  request.send();
};