var color = require("ansi-color").set;

function specReporter (name, results) {
  console.log("\n" + name + ":\n");

  var current_test;

  for (var i = 0; i < results.length; i++) {
    if (current_test !== results[i].current_test) {
      current_test = results[i].current_test;

      console.log("  " + results[i].current_test);
    }

    if (results[i].status === 'pass') {
      console.log("    " + color("✓", "green") + " " + results[i].message);
    } else {
      console.log("    " + color("✗", "red") + " " + results[i].message);
      console.log("      » " + color("expected " + results[i].expected + ",", "yellow"));
      console.log("        " + color("got " + results[i].actual + " (" + results[i].operator + ")", "yellow"));
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
