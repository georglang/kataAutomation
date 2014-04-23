var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');

var codeToAnalyze = require('./codeToAnalyze.js');
var convertObjectToCsv = require('./convertObjectToCsv.js');
var astNodes = require('./configComplexities.js');

var qualityMetricsCounters = require('./qualityMetricsCounters.js');

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
  var tree = esprima.parse(code);

  traverse(tree, function (node, parents) {
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
  });
  return totalComplexity;
}

function resetQualityMetricCounters() {
      qualityMetricsCounters.VariableDeclartationCounter = 0,
      qualityMetricsCounters.LiteralCounter = 0,
      qualityMetricsCounters.CallExpressionCounter = 0,
      qualityMetricsCounters.BinaryExpressionCounter = 0,
      qualityMetricsCounters.MemberExpressionCounter = 0,
      qualityMetricsCounters.SwitchStatementCounter = 0,
      qualityMetricsCounters.SwitchCaseCounter = 0,
      qualityMetricsCounters.BreakStatementCounter = 0,
      qualityMetricsCounters.IfStatementCounter = 0,
      qualityMetricsCounters.WhileStatementCounter = 0,
      qualityMetricsCounters.ForStatementCounter = 0,
      qualityMetricsCounters.ForInStatementCounter = 0,
      qualityMetricsCounters.AssignmentExpressionCounter = 0,
      qualityMetricsCounters.UpdateExpressionCounter = 0
}


function getComplexityOfCodeParts() {
  var entireString;
  var functionBodyString;
  var complexityOfSession;

  for (var i = 0; i < codeToAnalyze.codeParts.length; i++) {
    //extracts only the content between code: function () {}
    entireString = codeToAnalyze.codeParts[i].code.toString();
    functionBodyString = entireString.substring(entireString.indexOf("{") + 1, entireString.lastIndexOf("}"));

    complexityOfSession = getComplexity(functionBodyString);
    codeToAnalyze.codeParts[i].complexityOfSession = complexityOfSession;

    convertObjectToCsv(astNodes, codeToAnalyze.codeParts[i].name);
    resetQualityMetricCounters();
  }
}

getComplexityOfCodeParts();

module.exports = {
  getComplexity: getComplexity,
  complexities: astNodes
};