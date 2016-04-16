var pass = 0;
var fail = 0;
var count = 0;

function tapReporter (name, results) {
  console.log("# " + name);

  for (var i = 0; i < results.length; i++) {
    count++;

    if (results[i].status === 'pass') {
      pass++;
      console.log("ok " + count + " " + results[i].message);
    } else {
      fail++;
      console.log("not ok " + count + " " + results[i].message);
      console.log(" ---");
      console.log("   operator: " + results[i].operator);
      console.log("   expected: " + results[i].expected);
      console.log("   actual:   " + results[i].actual);
      console.log(" ...");
    }
  }
}

function reporter (results) {
  console.log("TAP versoin 13");

  var keys = Object.keys(results);

  for (var i = 0; i < keys.length; i++) {
    tapReporter(keys[i], results[keys[i]]);
  }

  console.log("1.." + count);
  console.log("# tests " + count);

  if (pass) {
    console.log("# pass  " + pass);
  }

  if (fail) {
    console.log("# fail  " + fail);
  }
}

exports.reporter = reporter;
