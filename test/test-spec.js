var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');
var json2csv = require('json2csv');
var fs = require('fs');

function traverse(tree, transform) {
  estraverse.traverse(tree, {
    enter: function (node) {
      return transform(node, this.parents());
    }
  });
}

var Syntax = estraverse.Syntax;

function convertJsonToCsv(jsonObject, filename) {
  var filenameAsString = filename.toString();
  json = jsonObject;

  json2csv(
      {
        data: json,
        fields: [
          'VariableDeclartationCounter',
          'LiteralCounter',
          'CallExpressionCounter',
          'BinaryExpressionCounter',
          'MemberExpressionCounter',
          'SwitchStatementCounter',
          'SwitchCaseCounter',
          'BreakStatementCounter',
          'IfStatementCounter',
          'WhileStatementCounter',
          'ForStatementCounter',
          'ForInStatementCounter',
          'AssignmentExpressionCounter',
          'UpdateExpressionCounter'
        ]
      },
      function (err, csv) {
        if (err) {
          console.log(err);
        }
        fs.writeFile(filenameAsString + '.csv', csv, function (err) {
              if (err) {
                throw err;
              }
              console.log('file saved');
            }
        );
      }
  );
}

function getComplexity(code) {
  var totalComplexity = 0;
  var tree = esprima.parse(code);

  traverse(tree, function (node, parents) {
    if (node.type == Syntax.VariableDeclaration) {
      totalComplexity += complexities.VARIABLEDECLARATION;
      ++(qualityMetricCounters.VariableDeclartationCounter);
    }
    if (node.type == Syntax.Literal) {
      totalComplexity += complexities.LITERAL;
      ++qualityMetricCounters.LiteralCounter;
    }
    if (node.type == Syntax.CallExpression && (node.callee.type != Syntax.MemberExpression)) {
      totalComplexity += complexities.CALLEXPRESSION;
      ++qualityMetricCounters.CallExpressionCounter;
    }
    if (node.type == Syntax.MemberExpression) {
      totalComplexity += complexities.MEMBEREXPRESSION;
      ++qualityMetricCounters.MemberExpressionCounter;
    }
    if (node.type == Syntax.WhileStatement) {
      totalComplexity += complexities.WHILESTATEMENT;
      ++qualityMetricCounters.WhileStatementCounter;
    }
    if (node.type == Syntax.ForStatement) {
      totalComplexity += complexities.FORSTATEMENT;
      ++qualityMetricCounters.ForStatementCounter;
    }
    if (node.type == Syntax.ForInStatement) {
      totalComplexity += complexities.FORINSTATEMENT;
      ++qualityMetricCounters.ForInStatementCounter;
    }
    if (node.type == Syntax.BinaryExpression) {
      totalComplexity += complexities.BINARYEXPRESSION;
      ++qualityMetricCounters.BinaryExpressionCounter;
    }
    if (node.type == Syntax.AssignmentExpression) {
      totalComplexity += complexities.ASSIGNMENTEXPRESSION;
      ++qualityMetricCounters.AssignmentExpressionCounter;
    }
    if (node.type == Syntax.SwitchStatement) {
      totalComplexity += complexities.SWITCHSTATEMENT;
      ++qualityMetricCounters.SwitchStatementCounter;
    }
    if (node.type == Syntax.SwitchCase) {
      totalComplexity += complexities.SWITCHCASE;
      ++qualityMetricCounters.SwitchCaseCounter;
    }
    if (node.type == Syntax.BreakStatement) {
      totalComplexity += complexities.BREAKSTATEMENT;
      ++qualityMetricCounters.BreakStatementCounter;
    }
    if (node.type == Syntax.IfStatement) {
      totalComplexity += complexities.IFSTATEMENT;
      ++qualityMetricCounters.IfStatementCounter;
    }
    if (node.type == Syntax.UpdateExpression) {
      totalComplexity += complexities.UPDATEEXPRESSION;
      ++qualityMetricCounters.UpdateExpressionCounter;
    }
  });
  return totalComplexity;
}

function resetQualityMetricCounters() {
  qualityMetricCounters.VariableDeclartationCounter = 0,
      qualityMetricCounters.LiteralCounter = 0,
      qualityMetricCounters.CallExpressionCounter = 0,
      qualityMetricCounters.BinaryExpressionCounter = 0,
      qualityMetricCounters.MemberExpressionCounter = 0,
      qualityMetricCounters.SwitchStatementCounter = 0,
      qualityMetricCounters.SwitchCaseCounter = 0,
      qualityMetricCounters.BreakStatementCounter = 0,
      qualityMetricCounters.IfStatementCounter = 0,
      qualityMetricCounters.WhileStatementCounter = 0,
      qualityMetricCounters.ForStatementCounter = 0,
      qualityMetricCounters.ForInStatementCounter = 0,
      qualityMetricCounters.AssignmentExpressionCounter = 0,
      qualityMetricCounters.UpdateExpressionCounter = 0
}

var qualityMetricCounters = {
  VariableDeclartationCounter: 0,
  LiteralCounter: 0,
  CallExpressionCounter: 0,
  BinaryExpressionCounter: 0,
  MemberExpressionCounter: 0,
  SwitchStatementCounter: 0,
  SwitchCaseCounter: 0,
  BreakStatementCounter: 0,
  IfStatementCounter: 0,
  WhileStatementCounter: 0,
  ForStatementCounter: 0,
  ForInStatementCounter: 0,
  AssignmentExpressionCounter: 0,
  UpdateExpressionCounter: 0
}

var complexities = {
  VARIABLEDECLARATION: 1,
  LITERAL: 1,
  SWITCHCASE: 1,
  BREAKSTATEMENT: 1,
  CALLEXPRESSION: 2,
  BINARYEXPRESSION: 2,
  UPDATEEXPRESSION: 2,
  MEMBEREXPRESSION: 3,
  SWITCHSTATEMENT: 3,
  IFSTATEMENT: 4,
  WHILESTATEMENT: 5,
  FORSTATEMENT: 5,
  FORINSTATEMENT: 5,
  ASSIGNMENTEXPRESSION: 6
};

var codeToAnalyse = {
  codes: [
    {
      name: 'romanNumerals',
      code: function () {
        var arabicDigits = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        var romanDigits = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        var convert = function (arabic) {
          var roman = "";

          for (var i = 0; i < arabicDigits.length; i++) {
            while (arabic >= arabicDigits[i]) {
              roman += romanDigits[i];
              arabic -= arabicDigits[i];
            }
          }
          return roman;
        };
      }
    }
  ]
};

function getComplexityOfSessions() {
  var entireString;
  var functionBodyString;
  var complexityOfCode;

  for (var i = 0; i < codeToAnalyse.codes.length; i++) {
    //extracts only the content between code: function () {}
    entireString = codeToAnalyse.codes[i].code.toString();
    functionBodyString = entireString.substring(entireString.indexOf("{") + 1, entireString.lastIndexOf("}"));

    complexityOfCode = getComplexity(functionBodyString);
    codeToAnalyse.codes[i].complexityOfSession = complexityOfCode;

    console.log('TOTAL COMPLEXITY OF ' + codeToAnalyse.codes[i].name + ': ', complexityOfCode);
    console.log('OCCURENCE OF QUALITYMETRIKS: ', qualityMetricCounters);

    convertJsonToCsv(qualityMetricCounters, codeToAnalyse.codes[i].name);
    resetQualityMetricCounters();
  }
}

getComplexityOfSessions();

describe('test', function () {
  it('test', function () {
    expect(true).toBe(true);
  });

  it('literal', function () {
    expect(getComplexity('0')).toBe(complexities.LITERAL);
  });

  it('variable declaration', function () {
    expect(getComplexity('var x')).toBe(complexities.VARIABLEDECLARATION);
  });

  it('variabel declaration and literal', function () {
    expect(getComplexity('var x = 0')).toBe(complexities.VARIABLEDECLARATION + complexities.LITERAL);
  });

  it('call expression', function () {
    expect(getComplexity('count()')).toBe(complexities.CALLEXPRESSION);
  });

  it('call expression with literal', function () {
    expect(getComplexity('count(4)')).toBe(complexities.CALLEXPRESSION + complexities.LITERAL);
  });

  it('method expression call without value', function () {
    expect(getComplexity('object.print()')).toBe(complexities.MEMBEREXPRESSION);
  });

  it('method expression call with literal', function () {
    expect(getComplexity('object.print(3)')).toBe(complexities.MEMBEREXPRESSION + complexities.LITERAL);
  });

  it('method expression', function () {
    expect(getComplexity('object.property')).toBe(complexities.MEMBEREXPRESSION);
  });

  it('while loop without literal', function () {
    expect(getComplexity('while(false){}')).toBe(complexities.WHILESTATEMENT + complexities.LITERAL);
  });

  it('while loop with binary expression', function () {
    expect(getComplexity('while(i<1){}')).toBe(complexities.WHILESTATEMENT + complexities.BINARYEXPRESSION + complexities.LITERAL);
  });

  it('for loop with literal', function () {
    expect(getComplexity('for (var i=0; i<5; i++){}')).toBe(
        complexities.FORSTATEMENT + complexities.VARIABLEDECLARATION + complexities.LITERAL + complexities.BINARYEXPRESSION +
            complexities.LITERAL + complexities.UPDATEEXPRESSION
    );
  });

  it('for loop with member expression', function () {
    expect(getComplexity('for (var i=0; i<arr.length; i++){}')).toBe(
        complexities.FORSTATEMENT + complexities.VARIABLEDECLARATION + complexities.LITERAL + complexities.BINARYEXPRESSION +
            complexities.MEMBEREXPRESSION + complexities.UPDATEEXPRESSION
    );
  });

  it('for in loop', function () {
    expect(getComplexity('for(var property in myObj){}')).toBe(
        complexities.FORINSTATEMENT + complexities.VARIABLEDECLARATION
    );
  });

  it('assignment expression', function () {
    expect(getComplexity('i = 1')).toBe(complexities.ASSIGNMENTEXPRESSION + complexities.LITERAL);
  });

  it('assignment expression with binary expression', function () {
    expect(getComplexity('i = i+1')).toBe(complexities.ASSIGNMENTEXPRESSION + complexities.BINARYEXPRESSION + complexities.LITERAL);
  });

  it('call expression with binary expression', function () {
    expect(getComplexity('count(i-1)')).toBe(complexities.CALLEXPRESSION + complexities.BINARYEXPRESSION + complexities.LITERAL);
  });

  it('condition', function () {
    expect(getComplexity('if(false){}')).toBe(complexities.IFSTATEMENT + complexities.LITERAL);
  });

  it('condition with binary expression', function () {
    expect(getComplexity('if(i>0){}')).toBe(complexities.IFSTATEMENT + complexities.BINARYEXPRESSION + complexities.LITERAL);
  });

  it('switch with 2 cases', function () {
    expect(getComplexity('switch (expr) {case "Oranges":break;case "Apples":break;default:}'))
        .toBe(
            complexities.SWITCHSTATEMENT + complexities.SWITCHCASE + complexities.LITERAL + complexities.BREAKSTATEMENT
                + complexities.SWITCHCASE + complexities.LITERAL + complexities.BREAKSTATEMENT + complexities.SWITCHCASE
        );
  });

  it('switch statement with one case', function () {
    expect(getComplexity(
        'switch (expr) {case "Oranges": console.log("Oranges are $0.59 a pound.");break;}'))
        .toBe(
            complexities.SWITCHSTATEMENT + complexities.SWITCHCASE + complexities.LITERAL + complexities.MEMBEREXPRESSION + complexities.BREAKSTATEMENT
                + complexities.LITERAL
        );
  });
});