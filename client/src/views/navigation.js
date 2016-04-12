require('short-dom')();
var Navigation = function (app) {
  this.pages = app;
  this.onLinkClicked = null;
  this.nav = ce('nav')
};

Navigation.prototype.render = function () {
  // var logo = this.logo();
  // nav.appendChild(this.logo());
  var ul = ce('ul');
  this.pages.forEach(function (page) {
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

Navigation.prototype.setActiveLink = function (path) {
  var links = this.nav.childNodes[0].childNodes;
  var position;
  this.pages.forEach(function (route, index) {
    if (route.path === path) {
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



// Navigation.prototype.logo = function () {
//   var container = ce('div');
//   container.classList.add("logo-left");
//   var image = ce('img');
//   image.src = "media/dolla.jpeg";
//   image.alt = "Dolla Dolla Billz Logo";
//   container.appendChild(image);
//   return container;
// }

module.exports = Navigation;