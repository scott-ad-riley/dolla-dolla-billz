module.exports = function (path) {
  var result = path.split("/");
  result.shift()
  return result;
}