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

module.exports = codeToAnalyze;