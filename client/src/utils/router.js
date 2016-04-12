var Router = function () {
  this.routes = [];
  this.currentPath = "";
}

Router.prototype.route = function (route) {
  this.routes.push(route);
}

Router.prototype.routeWithPath = function (path) {
  this.currentRoute = path;
  // we need to loop over the input path first
  var newPath = convertPathToArray(path);
  // first match
  var possibleRoutes = this.routes.filter(function (route) {
    return convertPathToArray(route.path)[1] === newPath[0];
  });
  if (possibleRoutes.length === 0) { // no paths found
    return this.getDefaultRoute();
  } else if (possibleRoutes.length === 1) { // just one path matches
    return possibleRoutes[0];
  } else { // multiple matches (look at dynamic routes)
    var result =  possibleRoutes.find(function (route) {
      return (route.pathVars.length === newPath.length);
    });
    return result;
  }
}

Router.prototype.getDefaultRoute = function () {
  return this.routes.find(function (route) {
    return route.defaultRoute;
  })
}

Router.prototype.loadInitialPage = function (requestedPath) {
  var route = this.routeWithPath(requestedPath);
  if (route.dataPrefix) {
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
  if (route.dataPrefix) {
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
  if (route.dataPrefix) {
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

  var url = route.dataPrefix + this.currentRoute;
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