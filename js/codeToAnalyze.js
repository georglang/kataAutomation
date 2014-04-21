var codeToAnalyze = {
  codeParts: [
    {
      name: 'romanNumerals',
      code: function () {
        var arabicDigits = [10, 5, 1];
        var romanDigits = ['X', 'V', 'I'];

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
  var complexityOfSession;

  for (var i = 0; i < codeToAnalyze.codeParts.length; i++) {
    //extracts only the content between code: function () {}
    entireString = codeToAnalyze.codeParts[i].code.toString();
    functionBodyString = entireString.substring(entireString.indexOf("{") + 1, entireString.lastIndexOf("}"));

    complexityOfSession = getComplexity(functionBodyString);
    codeToAnalyze.codeParts[i].complexityOfSession = complexityOfSession;

//    console.log('TOTAL COMPLEXITY OF ' + codeToAnalyze.codeParts[i].name + ': ', complexityOfSession);
//    console.log('OCCURENCE OF QUALITYMETRIKS: ', qualityMetricCounters);

    convertJsonToCsv(qualityMetricCounters, codeToAnalyze.codeParts[i].name);
    resetQualityMetricCounters();
  }
}
