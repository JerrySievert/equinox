// test statuses stored here
var test_statuses = [ ];

// assertion failure
function fail (actual, expected, message, operator) {
  test_statuses.push({
    actual:   actual,
    expected: expected,
    message:  message,
    operator: operator,
    status:  "fail"
  });
}

// assertion ok
function ok (actual, expected, message) {
  test_statuses.push({
    actual:   actual,
    expected: expected,
    status:   "pass",
    message:  message
  });
}

// assert methods
var assert = {
  equal: function (actual, expected, message) {
    if (actual !== expected) {
      fail(actual, expected, message, "==");
    } else {
      ok(actual, expected, message);
    }
  }
};

// check for setup method
if (test_setup && typeof test_setup === 'function') {
  test_setup();
}
