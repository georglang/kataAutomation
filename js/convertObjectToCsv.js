var json2csv = require('json2csv');
var fs = require('fs');

function convertObjectToCsv(complexities, filename) {
  var filenameAsString = filename.toString();

  var qualityMetricCounters = {};
  for (var key in complexities) {
    qualityMetricCounters[key] = complexities[key].counter;
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
          'UpdateExpression'
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