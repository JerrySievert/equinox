var color = require("ansi-color").set;
var util = require('../util');

var out = '';
var failures = [ ];
var pass_count = 0;
var fail_count = 0;

function dotReporter (results, testname) {
  var passed = util.all_passed(results, testname);

  if (passed) {
    out += color('.', "green");
  } else {
    out += color('✗', "red");
  }
}

function fail (results) {
  var failed = util.all_failed(results);

  fail_count += failed.length;

  failures = failures.concat(failed);
}

function failureReporter ( ) {
  for (var i = 0; i < failures.length; i++) {
    var line = '\n' + failures[i].filename + ' : ' + failures[i].current_test + "\n";

    line += ("    " + failures[i].message + "\n    expected " +
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
