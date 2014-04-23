var json2csv = require('json2csv');
var fs = require('fs');

function convertObjectToCsv(astNodes, filename) {
  var filenameAsString = filename.toString();

  var qualityMetricCounters = {};
  for (var node in astNodes) {
    qualityMetricCounters[node] = astNodes[node].counter;
  }

  var json = qualityMetricCounters;

  json2csv(
      {
        data: json,
        fields: [
          'VariableDeclaration',
          'Literal',
          'CallExpression',
          'BinaryExpression',
          'MemberExpression',
          'SwitchStatement',
          'SwitchCase',
          'BreakStatement',
          'IfStatement',
          'WhileStatement',
          'ForStatement',
          'ForInStatement',
          'AssignmentExpression',
          'UpdateExpression',
          'TotalComplexity',
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

module.exports = convertObjectToCsv;