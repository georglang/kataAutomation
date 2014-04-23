var json2csv = require('json2csv');
var fs = require('fs');

function convertObjectToCsv(complexities, filename) {
  var filenameAsString = filename.toString();

  var counter = {};
  for (var key in complexities) {
    counter[key] = complexities[key].counter;
  }

  var json = counter;

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