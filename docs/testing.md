# Testing

Equinox is an opinionated testing framework.

Tests that rely on each other should exist in one `file` - at the start of each
`file` being executed, a new `schema` is created in the database, and all tests
are executed within this `schema`.

All tests are implemented in Javascript, and ascribe to the `PLV8` functions
for database interaction.

## API

There is an API available for testing.  This falls into how the [architecture](architecture.md) sets up the tests.

## Tests

Tests are defined in a variable named `tests`.  It is defined as an `array` of
`objects`, that contain code and assertions in the form of `assert()`:

```
var tests = [
  {
    'should equal 1': function ( ) {
      var result = plv8.execute('SELECT 1 AS num');
      assert.equal(result.length, 1, "length should be 1");
      assert.equal(result[0].num, 1, "num should equal 1");
    }
  }
];
```

## Test Setup

Tests have the option of a `setup()` method.  If a `setup()` method exists,
it is executed before all tests are run.

```js
function setup ( ) {
  plv8.execute('CREATE TABLE logs (data JSONB)');
}
```

### Per Test

Each test also has the ability to have a `setup()` method:

```
var tests = [
  {
    setup: function ( ) {
      plv8.execute('INSERT INTO logs (data) VALUES ('{ "foo": "bar" }')');
    },
    'should return a result': function ( ) {
      var result = plv8.execute('SELECT data FROM logs');
      assert.equal(result.length, 1, "length should be 1");
      assert.equal(result[0].data.foo, 'bar', "data should equal bar");
    }
  }
];
```

## Test Teardown

Tests have the option of a `teardown()` method.  If a `teardown()` method exists,
it is executed before all tests are run.

```js
function teardown ( ) {
  plv8.execute('DROP TABLE logs');
}
```

### Per Test

Each test also has the ability to have a `teardown()` method:

```
var tests = [
  {
    teardown: function ( ) {
      plv8.execute('DELETE FROM logs');
    },
    'should return a result': function ( ) {
      var result = plv8.execute('SELECT data FROM logs');
      assert.equal(result.length, 1, "length should be 1");
      assert.equal(result[0].data.foo, 'bar', "data should equal bar");
    }
  }
];
```
