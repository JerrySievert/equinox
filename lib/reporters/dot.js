var color = require("ansi-color").set;
var util = require('../util');

var out = '';
var failures = [ ];

function dotReporter (results, testname) {
  if (util.all_passed(results, testname)) {
    out += color('.', "green");
  } else {
    out += color('✗', "red");
  }
}

function fail (results) {
  var failed = util.all_failed(results);

  failures = failures.concat(failed);
}

function failureReporter ( ) {
  for (var i = 0; i < failures.length; i++) {
    var line = '\nFailure in ' + failures[i].filename + ' : ' + failures[i].current_test + "\n";

    line += ("\t" + failures[i].message + "\n" + "\texpected " +
            failures[i].expected + ", got " + failures[i].actual +
            " (" + failures[i].operator + ")\n");

    console.log(color(line, 'red'));
  }
}

function reporter (results) {
  var test_results = util.transform(results);

  var keys = Object.keys(test_results);

  for (var i = 0; i < keys.length; i++) {
    var innerKeys = Object.keys(test_results[keys[i]]);

    for (var j = 0; j < innerKeys.length; j++) {
      dotReporter(test_results[keys[i]][innerKeys[j]], innerKeys[j]);
      fail(test_results[keys[i]][innerKeys[j]], innerKeys[j]);
    }
  }

  console.log(out);

  failureReporter( );
}

exports.reporter = reporter;
