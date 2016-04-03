// iterate through the tests, running each
for (var i = 0; i < tests.length; i++) {
  var test = tests[i];
  var keys = Object.keys(test).filter(function (item) {
    if (item === "setup" || item === "teardown") {
      return false;
    }

    return true;
  });

  // run the setup
  if (test.setup && typeof test.setup === 'function') {
    test.setup();
  }

  // run the tests
  for (var j = 0; j < keys.length; j++) {
    if (typeof test[keys[j]] === 'function') {
      current_test = keys[j];
      try {
        test[keys[j]]();
      } catch (err) {
        fail(undefined, undefined, undefined, undefined, err);
      }
    } else {
      current_test = null;
    }
  }

  // run the teardown
  if (test.teardown && typeof test.teardown === 'function') {
    test.teardown();
  }
}
