var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');

var codeToAnalyse = require('./codeToAnalyse.js');
var convertObjectToCsv = require('./convertObjectToCsv.js');
var astNodes = require('./astNodes.js');

function traverse(tree, transform) {
  estraverse.traverse(tree, {
    enter: function (node) {
      return transform(node, this.parents());
    }
  });
}

var Syntax = estraverse.Syntax;

function getComplexity(code) {
  var totalComplexity = 0;
  var ast = esprima.parse(code);

  function addToTotalComplexity(node) {
    var astNode = astNodes[node.type];

    if (astNode === undefined) {
      return;
    }
    if (node.type == Syntax.CallExpression && (node.callee.type != Syntax.MemberExpression)) {
      totalComplexity += astNodes.CallExpression.complexity;
      ++astNodes.CallExpression.counter;
    }
    else if (node.type !== Syntax.CallExpression) {
      totalComplexity += astNode.complexity;
      ++astNode.counter;
    }
  }

  traverse(ast, addToTotalComplexity);

  astNodes.TotalComplexity.counter = totalComplexity;
  return totalComplexity;
}

function resetQualityMetricCounters() {
  for (var key in astNodes) {
    astNodes[key].counter = 0;
  }
}

function getComplexityOfCodeParts() {
  var entireString;
  var functionBodyString;
  var complexityOfCodePart;
  var nameOfCodePart;

  for (var i = 0; i < codeToAnalyse.length; i++) {
    //extracts only the content between code: function () {}
    entireString = codeToAnalyse[i].code.toString();
    functionBodyString = entireString.substring(entireString.indexOf("{") + 1, entireString.lastIndexOf("}"));

    complexityOfCodePart = getComplexity(functionBodyString);
    nameOfCodePart = codeToAnalyse[i].name

    convertObjectToCsv(astNodes, nameOfCodePart);
    resetQualityMetricCounters();
  }
}

getComplexityOfCodeParts();

module.exports = {
  getComplexity: getComplexity,
  astNodes: astNodes
};