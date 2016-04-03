# Equinox

Testing for Postgres

Simply write tests, and let `equinox` do the rest for you!

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

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[MIT](LICENSE.md)
