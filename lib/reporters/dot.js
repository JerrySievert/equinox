var color = require("ansi-color").set;
var util = require('../util');

function dotReporter (results) {
  if (util.all_passed(results)) {
    console.log(color('.', "green"));
  } else {
    console.log(color('x', "red"));
  }
}

function reporter (results) {
  var test_results = util.transform(results);

  var keys = Object.keys(test_results);

  for (var i = 0; i < keys.length; i++) {
    var innerKeys = Object.keys(test_results[keys[i]]);

    for (var j = 0; j < innerKeys.length; j++) {
      dotReporter(test_results[keys[i]][innerKeys[j]]);
    }
  }

  console.log("\n");
}

exports.reporter = reporter;
