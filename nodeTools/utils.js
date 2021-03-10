var esprima = require('esprima');
var estraverse = require('estraverse');

function createObjectExpression(content) {
  var ast = esprima.parseScript('var a = ' + content)
  var result = [];
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (node.type == 'ObjectExpression' && parent) {
        if (parent.id && parent.id.name === 'a') {
          result = node.properties;
          estraverse.VisitorOption.Break;
        }
      }
    }
  });
  return result;
}

function createArrayExpression(content) {
  var ast = esprima.parseScript('var a = ' + content)
  var result;
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (node.type == 'ObjectExpression' && parent) {
        if (parent.id && parent.id.name === 'a') {
          result = node;
          estraverse.VisitorOption.Break;
        }
      }
    }
  });
  return result;
}

module.exports = {
  createObjectExpression,
  createArrayExpression,
}