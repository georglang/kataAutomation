var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');

function traverse(tree, transform) {
  estraverse.traverse(tree, {
    enter: function (node) {
      return transform(node, this.parents());
    }
  });
};
var Syntax = estraverse.Syntax;

var massWeight = {
  VARIABLEDECLARATION : 1,
  LITERAL : 1,
  CALLEXPRESSION : 2,
  MEMBEREXPRESSION : 3
};

function getMass(code) {
  var mass = 0;
  var tree = esprima.parse(code);

  traverse(tree, function (node, parents) {
    if (node.type == Syntax.VariableDeclaration) {
      mass += massWeight.VARIABLEDECLARATION;
    }
    if (node.type == Syntax.Literal) {
      mass += massWeight.LITERAL;
    }
    if (node.type == Syntax.CallExpression && (node.callee.type != Syntax.MemberExpression)) {
      mass += massWeight.CALLEXPRESSION;
    }
    if (node.type == Syntax.MemberExpression) {
      mass += massWeight.MEMBEREXPRESSION;
    }
  });
  return mass;
}


describe('test', function () {
  it('test', function () {
    expect(true).toBe(true);
  });

  it('constant', function () {
    expect(getMass('0')).toBe(massWeight.LITERAL);
  });

  it('declare variable', function () {
    expect(getMass('var x')).toBe(massWeight.VARIABLEDECLARATION);
  });

  it('variabel declaration and literal', function () {
    expect(getMass('var x = 0')).toBe(massWeight.VARIABLEDECLARATION + massWeight.LITERAL);
  });

  it('call expression', function () {
    expect(getMass('count()')).toBe(massWeight.CALLEXPRESSION);
  });

  it('call expression with literal', function () {
    expect(getMass('count(4)')).toBe(massWeight.CALLEXPRESSION + massWeight.LITERAL);
  });

  it('call instance method without value', function () {
    expect(getMass('object.print()')).toBe(massWeight.MEMBEREXPRESSION);
  });

  it('call instance method with value', function () {
    expect(getMass('object.print(3)')).toBe(massWeight.MEMBEREXPRESSION + massWeight.LITERAL);
  });

  it('call instance property', function () {
    expect(getMass('object.property')).toBe(massWeight.MEMBEREXPRESSION);
  });

  //Loop Examples

  it('while loop without condition', function () {
    expect(getMass('while(false){}')).toBe(massWeight.WHILESTATEMENT + massWeight.LITERAL);
  });
});



