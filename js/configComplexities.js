var ASTNodes = {
  VariableDeclaration: {
    complexity: 1,
    counter: 0
  },
  Literal: {
    complexity: 1,
    counter: 0
  },
  SwitchCase: {
    complexity: 1,
    counter: 0
  },
  BreakStatement: {
    complexity: 1,
    counter: 0
  },
  CallExpression: {
    complexity: 1,
    counter: 0
  },
  BinaryExpression: {
    complexity: 1,
    counter: 0
  },
  UpdateExpression: {
    complexity: 2,
    counter: 0
  },
  MemberExpression: {
    complexity: 1,
    counter: 0
  },
  SwitchStatement: {
    complexity: 3,
    counter: 0
  },
  IfStatement: {
    complexity: 4,
    counter: 0
  },
  WhileStatement: {
    complexity: 5,
    counter: 0
  },
  ForStatement: {
    complexity: 5,
    counter: 0
  },
  ForInStatement: {
    complexity: 5,
    counter: 0
  },
  AssignmentExpression: {
    complexity: 6,
    counter: 0
  }
};

module.exports = ASTNodes;
