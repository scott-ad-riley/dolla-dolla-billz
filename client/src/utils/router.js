var Router = function (app) {
  this.history = []
  this.routes = app;
}

Router.prototype.loadPage = function (requestedPath) {
  var route = this.routes.find(function (route) {
    return route.path === requestedPath;
  });
  console.log("loading route:", route)
  // we need to fetch the data
  this.fetch("/api" + route.path, route.onload)
  // then deal with history updating
}

Router.prototype.fetch = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function () {
    if (request.status === 200) {
      var result = JSON.parse(request.responseText);
      callback(result);
    }
  }
  request.send();
}

module.exports = Router;