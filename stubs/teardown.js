// check for teardown method
if (test_teardown && typeof test_teardown === 'function') {
  test_teardown();
}

return test_statuses;
