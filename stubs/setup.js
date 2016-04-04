// test statuses stored here
var test_statuses = [ ];
var current_test;

// assertion failure
function fail (actual, expected, message, operator, error) {
  test_statuses.push({
    actual:       actual,
    expected:     expected,
    message:      message,
    operator:     operator,
    status:       "fail",
    error:        error,
    current_test: current_test
  });
}

// assertion ok
function ok (actual, expected, message) {
  test_statuses.push({
    actual:       actual,
    expected:     expected,
    status:       "pass",
    message:      message,
    current_test: current_test
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

// initial setup
var tests = [ ];

// console methods
console = {
  log: function ( ) {
    var args = Array.prototype.slice.call(arguments);
    plv8.elog(NOTICE, args.join(' '));
  },
  warn: function ( ) {
    var args = Array.prototype.slice.call(arguments);
    plv8.elog(WARNING, args.join(' '));
  },
  error: function ( ) {
    var args = Array.prototype.slice.call(arguments);
    plv8.elog(ERROR, args.join(' '));
  }
};

// check for setup method
if (typeof test_setup === 'function') {
  test_setup();
}
