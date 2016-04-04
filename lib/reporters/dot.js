var color = require("ansi-color").set;
var util = require('../util');

var out = '';

function dotReporter (results, testname) {
  if (util.all_passed(results, testname)) {
    out += color('.', "green");
  } else {
    out += color('✗', "red");
  }
}

function reporter (results) {
  var test_results = util.transform(results);

  var keys = Object.keys(test_results);

  for (var i = 0; i < keys.length; i++) {
    var innerKeys = Object.keys(test_results[keys[i]]);

    for (var j = 0; j < innerKeys.length; j++) {
      dotReporter(test_results[keys[i]][innerKeys[j]], innerKeys[j]);
    }
  }

  console.log(out);

  console.log("\n");
}

exports.reporter = reporter;
