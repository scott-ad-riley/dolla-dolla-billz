var matchRoute = require('./route_matcher.js');
var Router = function () {
  this.routes = [];
}

Router.prototype.route = function (route) {
  // var pathVars = convertPathToArray(route.path);
  // route.isDynamic = pathVars.reduce(hasColon, false);
  this.routes.push(route);
}

// when a request comes in, what do we need to do to it to convert it to the format we want/how do we step through the stages to return it

// if we create a route match function that takes in a requestedPath, and returns the route object

Router.prototype.routeWithPath = function (path) {

  // we need to loop over the input path first
  var newPath = convertPathToArray(path);
  // first match
  var possibleRoutes = this.routes.filter(function (route) {
    return route.pathVars[0] === newPath[0];
  });
  if (possibleRoutes.length === 0) { // no paths found
    return this.getDefaultRoute();
  } else if (possibleRoutes.length === 1) { // just one path matches
    return possibleRoutes[0];
  } else { // multiple matches (look at dynamic routes)
    var foo =  possibleRoutes.find(function (route) {
      return (route.pathVars.length === newPath.length);
    })
    return foo;
  }
}

Router.prototype.getDefaultRoute = function () {
  return this.routes.find(function (route) {
    return route.defaultRoute;
  })
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

Router.prototype.fetchData = function (route, callback, disableCache, requestedPath) {
  if (route.data && !disableCache && !route.isDynamic) {
    route.onLoad(route.data);
    if (callback) callback(route.data, this.fetchDataNoCache);
  }

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

var convertPathToArray = function (path) {
  var result = path.split("/");
  result.shift()
  return result;
}

var replaceDynamicValue = function (requestedPath, matchedPath) {
  var result = [];
  matchedPath.forEach(function (pathVar, index) {
    if (value.indexOf(":") === 0) {
      result.push(requestedPath[index]);
    } else {
      result.push(pathVar);
    }
  })
  return result;
}

var hasColon = function (mem, value) {
  return value.indexOf(":") === 0 ? true : mem;
}

module.exports = Router;