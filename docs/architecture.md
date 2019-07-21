# Architecture

Equinox is built on top of *Node.js* and *PLV8*.  The script that does the
instrumentation and reporting is written to run in *Node.js*, while the
tests themselves are written in Javascript, and run inside of *PLV8*.

## Inside the Database

Equinox creates a *schema* named *equinox* in your database when it runs.
It then loads all of your tests into that schema by name as *Postgres*
functions.  These functions include all of the information needed to setup,
execute, and teardown your tests, there is no need for you to add anything
but the test code.

### Schema

The tests rely on a schema existing named *equinox*.  Don't worry, this is
created automatically for you when you run tests:

```
CREATE SCHEMA IF NOT EXISTS equinox
```

When the tests are complete, it destroys the schema:

```
DROP SCHEMA equinox CASCADE
```

### Tests

Tests are added to the database in the *equinox* schema, and executed after all
are added.  In the event of a failure to add, the schema will be destroyed, and
the error will be reported.

Once all tests are added, they are executed in order, and the results are
reported via the `reporter` of your choice:

* spec
* dot
* tap

## Inside Node.js

*Node.js* is used to instrument the tests.  It creates the *equinox schema*,
adds the tests by name, executes them in *postgres*, and returns the results
in the format requested.

The tests are run using the `pg` module, and running _SELECT_ against each
function.  The results are tallied, and reported.

## Inside Postgres

As functions are added to *postgres*, they are created as _functions_, and
instrumented with additional functionality.

```
CREATE OR REPLACE FUNCTION _modulename_ RETURNS JSON AS $$
// instrumentation
// [...]

your_code_here()

// return results of tests
return test_results;
$$ LANGUAGE plv8;
```

These tests are then run in the order that they are loaded, executing any
`setup()` or  `teardown()` as needed.
