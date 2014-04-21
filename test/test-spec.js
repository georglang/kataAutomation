var main = require('../js/main.js');
var getComplexity = main.getComplexity;
var complexities = main.complexities;

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