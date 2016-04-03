var test = require('tape');
var util = require('../lib/util');

var failing = [ { actual: 1,
    expected: 1,
    status: 'pass',
    message: 'length should be 1',
    current_test: 'should equal 1' },
  { actual: 2,
    expected: 1,
    message: 'num should equal 1',
    operator: '==',
    status: 'fail',
    current_test: 'should equal 1' } ];

var passing = [ { actual: 1,
    expected: 1,
    status: 'pass',
    message: 'length should be 1',
    current_test: 'should equal 1' },
  { actual: 1,
    expected: 1,
    message: 'num should equal 1',
    operator: '==',
    status: 'pass',
    current_test: 'should equal 1' } ];

test('all_passed() passes when correct', function (t) {
  t.plan(1);

  var status = util.all_passed(passing, 'should equal 1');

  t.equal(status, true, 'all_passed() returns true');
});

test('all_passed() fails when not correct', function (t) {
  t.plan(1);

  var status = util.all_passed(failing, 'should equal 1');

  t.equal(status, false, 'all_passed() returns false');
});

test('create_funcname() creates the correct function names', function (t) {
  t.plan(2);

  t.equal(util.create_funcname('foo.js'), 'foo_js', 'dots are replaced');
  t.equal(util.create_funcname('foo/bar.js'), 'foo_bar_js', 'slashes are replaced');
});
