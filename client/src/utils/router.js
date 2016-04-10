var Router = function (app, routePrefixer) {
  this.routes = app;
}

Router.prototype.routeWithPath = function (path) {
  var result = this.routes.find(function (route) {
    return route.path === path;
  });
  if (!result) {
    return this.routes.find(function (route) {
      return route.defaultRoute;
    })
  }
  return result;
}

Router.prototype.loadInitialPage = function (requestedPath) {
  var route = this.routeWithPath(requestedPath);
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
  if (route.dataPath) {
    this.fetchData(route, function (data) {
        addToHistory(route)
      }, false)
  } else {
    addToHistory(route);
    route.onLoad();
  }
}

Router.prototype.loadExistingPage = function (routeObjFromHistory) {
  var route = this.routeWithPath(routeObjFromHistory.path);
  if (route.dataPath) {
    this.fetchData(route, null, false)
  } else {
    route.onLoad();
  }
}

Router.prototype.fetchDataNoCache = function (route) {
  this.fetchData(route, null, true);
}

Router.prototype.fetchData = function (route, callback, disableCache) {
  if (route.data && !disableCache) {
    route.onLoad(route.data);
    if (callback) callback(route.data, this.fetchDataNoCache);
  } else {
    var url = route.dataPath;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
      if (request.status === 200) {
        var result = JSON.parse(request.responseText);
        route.onLoad(result);
        route.data = result;
        if (callback) callback(result, this.fetchDataNoCache);
      }
    }.bind(this)
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