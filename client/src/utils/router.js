var Router = function (app, routePrefixer) {
  this.routes = app;
}

Router.prototype.routeWithPath = function (path) {
  return this.routes.find(function (route) {
    return route.path === path;
  });
}

Router.prototype.loadInitialPage = function (requestedPath) {
  var route = this.routeWithPath(requestedPath)
  if (route.dataPath) {
    this.fetchData(route, function (data) {
        replaceInHistory(route)
      })
  } else {
    replaceInHistory(route);
    route.onLoad();
  }
}

Router.prototype.loadNewPage = function (requestedPath) {
  var route = this.routeWithPath(requestedPath);
  console.log("loading route:", route)
  if (route.dataPath) {
    this.fetchData(route, function (data) {
        addToHistory(route)
      })
  } else {
    addToHistory(route);
    route.onLoad();
  }
}

Router.prototype.loadExistingPage = function (routeObjFromHistory) {
  var route = this.routeWithPath(routeObjFromHistory.path);
  if (route.dataPath) {
    this.fetchData(route, function (data) {
      console.log("not modified history!")
    })
  } else {
    route.onLoad();
  }
}

Router.prototype.fetchData = function (route, callback) {
  if (route.data) {
    console.log("got %s from the cache", route.path)
    route.onLoad(route.data);
    callback(route.data);
  } else {
    var url = route.dataPath;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
      if (request.status === 200) {
        var result = JSON.parse(request.responseText);
        route.onLoad(result);
        route.data = result;
        callback(result);
      }
    }
    request.send();
  }
}

var formatRouteToSave = function (route) {
  return {
    path: route.path,
    data: route.data || null
  }
}

var replaceInHistory = function (route) {
  window.history.replaceState(formatRouteToSave(route), route.heading, route.path)
}

var addToHistory = function (route) {
  window.history.pushState(formatRouteToSave(route), route.heading, route.path);
}

module.exports = Router;