var getDeepestChildNode = function (td) {
  // Val I'm so sorry
  if (typeof td === "string" || typeof td === "number") {
    return td.toString();
  } else if (td.childNodes.length) {
    if (td.childNodes[0].nodeName === "#text") {
      return td.childNodes[0].nodeValue;
    } else if (td.childNodes[0].nodeName === "SPAN") {
      return td.childNodes[0].innerText;
    } else {
      return getDeepestChildNode(td.childNodes[0]);
    }
  } else {
    return td;
  }
};

module.exports = getDeepestChildNode;