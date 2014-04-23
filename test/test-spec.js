var main = require('../js/main.js');
var getComplexity = main.getComplexity;
var complexities = main.complexities;

describe('test', function () {
  it('test', function () {
    expect(true).toBe(true);
  });

  it('literal', function () {
    expect(getComplexity('0')).toBe(complexities.Literal.complexity);
  });

  it('variable declaration', function () {
    expect(getComplexity('var x')).toBe(complexities.VariableDeclaration.complexity);
  });

  it('variabel declaration and literal', function () {
    expect(getComplexity('var x = 0')).toBe(complexities.VariableDeclaration.complexity + complexities.Literal.complexity);
  });

  it('call expression', function () {
    expect(getComplexity('count()')).toBe(complexities.CallExpression.complexity);
  });

  it('call expression with literal', function () {
    expect(getComplexity('count(4)')).toBe(complexities.CallExpression.complexity + complexities.Literal.complexity);
  });

  it('method expression call without value', function () {
    expect(getComplexity('object.print()')).toBe(complexities.MemberExpression.complexity);
  });

  it('method expression call with literal', function () {
    expect(getComplexity('object.print(3)')).toBe(complexities.MemberExpression.complexity + complexities.Literal.complexity);
  });

  it('method expression', function () {
    expect(getComplexity('object.property')).toBe(complexities.MemberExpression.complexity);
  });

  it('while loop without literal', function () {
    expect(getComplexity('while(false){}')).toBe(complexities.WhileStatement.complexity + complexities.Literal.complexity);
  });

  it('while loop with binary expression', function () {
    expect(getComplexity('while(i<1){}')).toBe(complexities.WhileStatement.complexity + complexities.BinaryExpression.complexity + complexities.Literal.complexity);
  });

  it('for loop with literal', function () {
    expect(getComplexity('for (var i=0; i<5; i++){}')).toBe(
        complexities.ForStatement.complexity + complexities.VariableDeclaration.complexity + complexities.Literal.complexity + complexities.BinaryExpression.complexity +
            complexities.Literal.complexity + complexities.UpdateExpression.complexity
    );
  });

  it('for loop with member expression', function () {
    expect(getComplexity('for (var i=0; i<arr.length; i++){}')).toBe(
        complexities.ForStatement.complexity + complexities.VariableDeclaration.complexity + complexities.Literal.complexity + complexities.BinaryExpression.complexity +
            complexities.MemberExpression.complexity + complexities.UpdateExpression.complexity
    );
  });

  it('for in loop', function () {
    expect(getComplexity('for(var property in myObj){}')).toBe(
        complexities.ForStatement.complexity + complexities.VariableDeclaration.complexity
    );
  });

  it('assignment expression', function () {
    expect(getComplexity('i = 1')).toBe(complexities.AssignmentExpression.complexity + complexities.Literal.complexity);
  });

  it('assignment expression with binary expression', function () {
    expect(getComplexity('i = i+1')).toBe(complexities.AssignmentExpression.complexity + complexities.BinaryExpression.complexity + complexities.Literal.complexity);
  });

  it('call expression with binary expression', function () {
    expect(getComplexity('count(i-1)')).toBe(complexities.CallExpression.complexity + complexities.BinaryExpression.complexity + complexities.Literal.complexity);
  });

  it('condition', function () {
    expect(getComplexity('if(false){}')).toBe(complexities.IfStatement.complexity + complexities.Literal.complexity);
  });

  it('condition with binary expression', function () {
    expect(getComplexity('if(i>0){}')).toBe(complexities.IfStatement.complexity + complexities.BinaryExpression.complexity + complexities.Literal.complexity);
  });

  it('switch with 2 cases', function () {
    expect(getComplexity('switch (expr) {case "Oranges":break;case "Apples":break;default:}'))
        .toBe(
            complexities.SwitchStatement.complexity + complexities.SwitchCase.complexity + complexities.Literal.complexity + complexities.BreakStatement.complexity
                + complexities.SwitchCase.complexity + complexities.Literal.complexity + complexities.BreakStatement.complexity + complexities.SwitchCase.complexity
        );
  });

  it('switch statement with one case', function () {
    expect(getComplexity(
        'switch (expr) {case "Oranges": console.log("Oranges are $0.59 a pound.");break;}'))
        .toBe(
            complexities.SwitchStatement.complexity + complexities.SwitchCase.complexity + complexities.Literal.complexity + complexities.MemberExpression.complexity + complexities.BreakStatement.complexity
                + complexities.Literal.complexity
        );
  });
});