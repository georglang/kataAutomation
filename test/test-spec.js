var main = require('../js/main.js');
var getComplexity = main.getComplexity;
var astNodes = main.astNodes;

describe('test', function () {
  it('test', function () {
    expect(true).toBe(true);
  });

  it('literal', function () {
    expect(getComplexity('0')).toBe(astNodes.Literal.complexity);
  });

  it('variable declaration', function () {
    expect(getComplexity('var x')).toBe(astNodes.VariableDeclaration.complexity);
  });

  it('variabel declaration and literal', function () {
    expect(getComplexity('var x = 0')).toBe(astNodes.VariableDeclaration.complexity + astNodes.Literal.complexity);
  });

  it('call expression', function () {
    expect(getComplexity('count()')).toBe(astNodes.CallExpression.complexity);
  });

  it('call expression with literal', function () {
    expect(getComplexity('count(4)')).toBe(astNodes.CallExpression.complexity + astNodes.Literal.complexity);
  });

  it('method expression call without value', function () {
    expect(getComplexity('object.print()')).toBe(astNodes.MemberExpression.complexity);
  });

  it('method expression call with literal', function () {
    expect(getComplexity('object.print(3)')).toBe(astNodes.MemberExpression.complexity + astNodes.Literal.complexity);
  });

  it('method expression', function () {
    expect(getComplexity('object.property')).toBe(astNodes.MemberExpression.complexity);
  });

  it('while loop without literal', function () {
    expect(getComplexity('while(false){}')).toBe(astNodes.WhileStatement.complexity + astNodes.Literal.complexity);
  });

  it('while loop with binary expression', function () {
    expect(getComplexity('while(i<1){}')).toBe(astNodes.WhileStatement.complexity + astNodes.BinaryExpression.complexity + astNodes.Literal.complexity);
  });

  it('for loop with literal', function () {
    expect(getComplexity('for (var i=0; i<5; i++){}')).toBe(
        astNodes.ForStatement.complexity + astNodes.VariableDeclaration.complexity + astNodes.Literal.complexity + astNodes.BinaryExpression.complexity +
            astNodes.Literal.complexity + astNodes.UpdateExpression.complexity
    );
  });

  it('for loop with member expression', function () {
    expect(getComplexity('for (var i=0; i<arr.length; i++){}')).toBe(
        astNodes.ForStatement.complexity + astNodes.VariableDeclaration.complexity + astNodes.Literal.complexity + astNodes.BinaryExpression.complexity +
            astNodes.MemberExpression.complexity + astNodes.UpdateExpression.complexity
    );
  });

  it('for in loop', function () {
    expect(getComplexity('for(var property in myObj){}')).toBe(
        astNodes.ForStatement.complexity + astNodes.VariableDeclaration.complexity
    );
  });

  it('assignment expression', function () {
    expect(getComplexity('i = 1')).toBe(astNodes.AssignmentExpression.complexity + astNodes.Literal.complexity);
  });

  it('assignment expression with binary expression', function () {
    expect(getComplexity('i = i+1')).toBe(astNodes.AssignmentExpression.complexity + astNodes.BinaryExpression.complexity + astNodes.Literal.complexity);
  });

  it('call expression with binary expression', function () {
    expect(getComplexity('count(i-1)')).toBe(astNodes.CallExpression.complexity + astNodes.BinaryExpression.complexity + astNodes.Literal.complexity);
  });

  it('condition', function () {
    expect(getComplexity('if(false){}')).toBe(astNodes.IfStatement.complexity + astNodes.Literal.complexity);
  });

  it('condition with binary expression', function () {
    expect(getComplexity('if(i>0){}')).toBe(astNodes.IfStatement.complexity + astNodes.BinaryExpression.complexity + astNodes.Literal.complexity);
  });

  it('switch with 2 cases', function () {
    expect(getComplexity('switch (expr) {case "Oranges":break;case "Apples":break;default:}'))
        .toBe(
            astNodes.SwitchStatement.complexity + astNodes.SwitchCase.complexity + astNodes.Literal.complexity + astNodes.BreakStatement.complexity
                + astNodes.SwitchCase.complexity + astNodes.Literal.complexity + astNodes.BreakStatement.complexity + astNodes.SwitchCase.complexity
        );
  });

  it('switch statement with one case', function () {
    expect(getComplexity(
        'switch (expr) {case "Oranges": console.log("Oranges are $0.59 a pound.");break;}'))
        .toBe(
            astNodes.SwitchStatement.complexity + astNodes.SwitchCase.complexity + astNodes.Literal.complexity + astNodes.MemberExpression.complexity + astNodes.BreakStatement.complexity
                + astNodes.Literal.complexity
        );
  });
});