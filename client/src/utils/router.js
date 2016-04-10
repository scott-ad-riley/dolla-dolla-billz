var Router = function (app, routePrefixer) {
  this.history = []
  this.routes = app;
  this.routePrefixer = routePrefixer || function (route) {
    return "/api" + route.path
  }
}

Router.prototype.routeWithPath = function (path) {
  return this.routes.find(function (route) {
    return route.path === path;
  });
}

Router.prototype.loadInitialPage = function (requestedPath) {
  var route = this.routeWithPath(requestedPath)
  this.fetchData(route, function (data) {
      window.history.replaceState(data, route.heading, route.path)
    })
}

Router.prototype.loadNewPage = function (requestedPath) {
  var route = this.routeWithPath(requestedPath);
  console.log("loading route:", route)
  this.fetchData(route, function (data) {
      window.history.pushState(data, route.heading, route.path)
    })
}

Router.prototype.fetchData = function (route, callback) {
  if (route.data) {
    route.onload(route.data);
    callback(route.data);
  } else {
    var url = this.routePrefixer(route);
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
      if (request.status === 200) {
        var result = JSON.parse(request.responseText);
        route.onLoad(result);
        callback(result);
      }
    }
    request.send();
  }
}

module.exports = Router;