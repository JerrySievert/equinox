# Equinox

Testing for Postgres

Write tests, and let `equinox` do the rest for you!

## Install

`equinox` requires [PLV8](https://github.com/plv8/plv8) to be installed before
running tests.  PLV8 adds Javascript as an extension in Postgres.  There are
operating system specific directions available in [install.md](docs/install.md).

```
npm install equinox
```

## Usage

Run all tests against a database named `database`, with the default `dot`
reporter.

```
$ equinox -d database --files examples/*.js
```

### Options

There are several options available for running tests:

Parameter|Description|Default
---|---|---
files|Files to load and execute|
database|Database to run in|
host|Hostname to connect to|localhost
user|Database user to connect with|
password|Database password to connect with|
reporter|Test reporter to use (dot, spec, tap)|dot

In addition to these options, it is possible to set `environment` variables
that define the database connection.  These will be overridden by any command-line
arguments:

* `PGDATABASE`
* `PGHOST`
* `PGUSER`
* `PGPASSWORD`

### Example Tests

Tests are simple to write and start using immediately.

```js
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

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[MIT](LICENSE.md)
