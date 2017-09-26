# Installing

Equinox requires [Node.js](https://nodejs.org/) in order to instrument the
database and execute tests.

```
$ npm install equinox
```

This brings `equinox` into your development environment.  If you are using
`node.js` for development and testing, you can add `equinox` to your tests
in `package.json`:

```
  "scripts": {
    "test": "equinox -d test --files ./test/tests.js -r tap"
  },
```

If you are using an alternate development environment, you can install
`equinox` globally using `npm`:

```
$ npm install -g equinox
```
