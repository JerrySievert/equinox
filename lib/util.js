var path = require('path');

function create_funcname (filename) {
  var funcname = filename.replace(path.sep, "_");
  funcname = funcname.replace("\.", "_");

  return funcname;
}

function transform (results) {
  var test_results = { };

  var keys = Object.keys(results);

  for (var i = 0; i < keys.length; i++) {
    if (test_results[keys[i]] === undefined) {
      test_results[keys[i]] = { };
    }

    for (var j = 0; j < results[keys[i]].length; j++) {
      if (test_results[keys[i]][results[keys[i]][j].current_test] === undefined) {
        test_results[keys[i]][results[keys[i]][j].current_test] = [ ];
      }

      test_results[keys[i]][results[keys[i]][j].current_test].push(results[keys[i]][j]);
    }
  }

  return test_results;
}

function all_passed (results, current_test) {
  var filtered = results.filter(function (item) {
    if (item.current_test === current_test) {
      return true;
    }

    return false;
  });

  var actual = filtered.filter(function (item) {
    if (item.status === 'pass') {
      return true;
    }

    return false;
  });

  return actual.length === filtered.length;
}

function all_failed (results) {
  var filtered = results.filter(function (item) {
    if (item.status === 'pass') {
      return false;
    }

    return true;
  });

  return filtered;
}

exports.create_funcname = create_funcname;
exports.transform = transform;
exports.all_passed = all_passed;
exports.all_failed = all_failed;
