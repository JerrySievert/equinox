var fs = require('fs');
var db = require('./db');
var util = require('./util');

var fixtures = fs.readFileSync(__dirname + '/../stubs/fixtures.js', 'utf8');
var setup = fs.readFileSync(__dirname + '/../stubs/setup.js', 'utf8');
var run = fs.readFileSync(__dirname + '/../stubs/run.js', 'utf8');
var teardown = fs.readFileSync(__dirname + '/../stubs/teardown.js', 'utf8');

function _apply (filename, content, callback) {
  var funcname = util.create_funcname(filename);
  var sql = "CREATE OR REPLACE FUNCTION equinox." + funcname + "( ) RETURNS JSON AS $$\n";

  sql += fixtures;
  sql += setup;
  sql += content;
  sql += "\n";
  sql += "var __filename = \"" + filename + "\";\n";
  sql += run;
  sql += teardown;

  sql += "\n$$ LANGUAGE plv8";

  db.query(sql, [ ], callback);
}

function load (files, callback) {
  var count = 0;
  var contents = [ ];
  var i;
  var sql;

  if (files.length === 0) {
    return callback("No files specified");
  }

  for (i = 0; i < files.length; i++) {
    try {
      var testPath = process.cwd() + '/' + files[i];
      sql = fs.readFileSync(testPath, 'utf8');

      // Load fixtures
      try {
        var fixturePath = testPath.substring(0, testPath.lastIndexOf('/') + 1) + 'fixtures/';
        var filename = testPath.substring(testPath.lastIndexOf('/') + 1);
        if (fs.existsSync(fixturePath + filename)) {
          var config = require(fixturePath + filename);
          if (config.fixtures) {
            sql += "\n" + util.load_fixtures(fixturePath + 'data/', config.fixtures);
          }
        }
      } catch (err) {
        return callback("Unable to load fixtures for " + files[i]);
      }

      contents.push(sql);
    } catch (err) {
      return callback("Unable to read file " + files[i]);
    }
  }

  for (i = 0; i < contents.length; i++) {
    _apply(files[i], contents[i], function (err) {
      if (err) {
        console.log("ERROR: " + err);
      }

      count++;
      if (count === contents.length) {
        return callback();
      }
    });
  }
}

exports.load = load;
