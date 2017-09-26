var pg = require('pg');

var pg_client;

function connect (database, hostname, username, password, port, callback) {
  var conString = 'postgres://';

  if (username) {
    conString += username;
    if (password) {
      conString += ':';
      conString += password;
    }
    conString += '@';
  }

  if (hostname) {
    conString += hostname;
    if (port) {
      conString += ':';
      conString += port;
    }
    conString += '/';
  }

  conString += database;

  pg.connect(conString, function (err, client, done) {
    if (err) {
      return callback(err);
    }

    pg_client = client;

    callback(null, client);
  });
}

function query (sql, params, callback) {
  if (pg_client === undefined) {
    return callback("not connected to the database. did you try connect()?");
  }

  pg_client.query(sql, params, callback);
}

exports.connect = connect;
exports.query = query;
