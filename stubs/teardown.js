// check for teardown method
if (typeof test_teardown === 'function') {
  test_teardown();
}

return test_statuses;
