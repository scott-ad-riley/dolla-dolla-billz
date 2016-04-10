var Router = function (app, routePrefixer) {
  this.history = []
  this.routes = app;
  this.routePrefixer = routePrefixer || function (route) {
    return "/api" + route.path
  }
}

Router.prototype.loadPage = function (requestedPath) {
  console.log('called loadpage')
  var route = this.routes.find(function (route) {
    return route.path === requestedPath;
  });
  console.log("loading route:", route)
  // we need to fetch the data
  this.fetch(this.routePrefixer(route), route.onLoad)
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