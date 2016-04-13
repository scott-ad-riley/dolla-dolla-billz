var convertPathToArray = require('../utils/path_to_array.js');
require('short-dom')();
var Navigation = function (app) {
  this.pages = app;
  this.onLinkClicked = null;
  this.nav = ce('nav');
  this.refreshButton = null;
};

Navigation.prototype.render = function () {
  var ul = ce('ul');
  this.pages
    .filter(function (page) {
      return page.heading
    })
    .forEach(function (page) {
      var li = ce('li');
      var link = ce('a');
      li.classList.add("link");
      link.href = page.path;
      link.innerText = page.heading;
      link.onclick = this.onLinkClicked.bind(this, this.setActiveLink.bind(this), page.path);
      li.appendChild(link);
      ul.appendChild(li);
    }.bind(this))
  this.nav.appendChild(ul);
  return this.nav;
}

Navigation.prototype.renderRefreshButton = function (handler) {
  this.removeRefreshButton();
  this.refreshButton = ce('div');
  this.refreshButton.classList.add('refresh-button');
  this.nav.appendChild(this.refreshButton)
  this.refreshButton.innerHTML = "&#8634;";
  this.refreshButton.onclick = handler;
}

Navigation.prototype.removeRefreshButton = function () {
  if (this.refreshButton) {
    this.nav.removeChild(this.refreshButton);
    this.refreshButton = null;
  }
}

Navigation.prototype.setActiveLink = function (path) {
  this.removeRefreshButton();
  var pathVars = convertPathToArray(path);
  var pathToUse = (pathVars.length > 1) ? "/" + pathVars[0] : path;
  var links = this.nav.childNodes[0].childNodes;
  var position;
  this.pages
    .filter(function (page) {
      return page.heading
    })
    .forEach(function (route, index) {
      if (route.path === pathToUse) {
        position = index;
      }
    })
  Array.prototype.forEach.call(links, function (link) {
    link.childNodes[0].style.border = "none";
    link.childNodes[0].style.marginBottom = "0";
  })
  links[position].childNodes[0].style.borderBottom = "2px solid white";
  links[position].childNodes[0].style.marginBottom = "-1px";
}

module.exports = Navigation;