var color = require("ansi-color").set;

function specReporter (name, results) {
  console.log("\n" + name + ":\n");

  for (var i = 0; i < results.length; i++) {
    if (results[i].status === 'pass') {
      console.log("  ✓ " + color(results[i].message, "green"));
    } else {
      console.log("  ✗ " + color(results[i].message, "yellow"));
      console.log("     » " + color("expected " + results[i].expected + ",", "yellow"));
      console.log("     " + color("got " + results[i].actual + "(" + results[i].operator + ")", "yellow"));
    }
  }
}

function reporter (results) {
  var keys = Object.keys(results);

  for (var i = 0; i < keys.length; i++) {
    specReporter(keys[i], results[keys[i]]);
  }
}

exports.reporter = reporter;
