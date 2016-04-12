var camelCase = require('camelcase');

module.exports = function (string) {
  var pattern = /\(.+/g
  return camelCase(string.replace(pattern, ""));
};