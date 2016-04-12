var getParentNodeOfType = function (node, parentType) {
  if (node.parentNode.nodeName.toLowerCase() == parentType) {
    return node.parentNode;
  } else if (!node.parentNode) {
    return document.body
  } else {
    return getParentNodeOfType(node.parentNode, parentType)
  }
}

module.exports = getParentNodeOfType;