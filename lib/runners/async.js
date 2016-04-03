var db = require('../db');
var util = require('../util');

var current = 0;
var results = { };
var count;

function _execute_query (filename, callback) {
  var funcname = util.create_funcname(filename);

  db.query("SELECT equinox." + funcname + "()", function (err, data) {
    if (err) {
      results[filename] = { "error": err };
    } else {
      if (data.rowCount === 1) {
        results[filename] = data.rows[0];
      } else {
        results[filename] = { "error": "Expected one row returned, got " + data.rowsCount };
      }
    }

    current++;

    if (current === count) {
      callback(null, results);
    }
  });

}

function async_runner (files, callback) {
  if (files.length === 0) {
    return callback({ "error": "Expected at least one test to run" });
  }

  count = files.length;

  for (var i = 0; i < count; i++) {
    _execute_query(files[i], callback);
  }
}

exports.runner = async_runner;
