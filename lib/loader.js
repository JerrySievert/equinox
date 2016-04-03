var fs = require('fs');
var db = require('./db');
var util = require('./util');

var setup = fs.readFileSync(__dirname + '/../stubs/setup.js', 'utf8');
var run = fs.readFileSync(__dirname + '/../stubs/run.js', 'utf8');
var teardown = fs.readFileSync(__dirname + '/../stubs/teardown.js', 'utf8');

function _apply (filename, content, callback) {
  var funcname = util.create_funcname(filename);
  var sql = "CREATE OR REPLACE FUNCTION equinox." + funcname + "( ) RETURNS JSON AS $$\n";

  sql += setup;
  sql += content;
  sql += "\n";
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
      sql = fs.readFileSync(process.cwd() + '/' + files[i], 'utf8');
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
