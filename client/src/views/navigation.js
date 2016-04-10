require('short-dom')();
var Navigation = function (app) {
  this.pages = app;
}

Navigation.prototype.render = function () {
  console.log('called nav render!')
  var nav = ce('nav');
  var logo = this.logo();
  nav.appendChild(this.logo());
  var ul = ce('ul');
  ul.classList.add('menu-right')
  this.pages.forEach(function (page) {
    var li = ce('li');
    var link = ce('a');
    link.href = page.path;
    link.innerText = page.heading;
    li.appendChild(link);
    ul.appendChild(li);
  })
  nav.appendChild(ul);
  return nav;
}

Navigation.prototype.logo = function () {
  var container = ce('div');
  container.classList.add("logo-left");
  var image = ce('img');
  image.src = "media/dolla.jpeg";
  image.alt = "Dolla Dolla Billz Logo";
  container.appendChild(image);
  return container;
}

module.exports = Navigation;