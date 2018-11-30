if (typeof get_fixtures !== 'function') {
  function get_fixtures() {
    return {};
  }
}
var loaded_fixtures = [];

function load_fixtures () {
  fixtures = get_fixtures();
  fixtures.forEach(function(items) {
    var table = Object.keys(items)[0];
    var ids = [];
    var isPrimaryKeyMissing = false; // Check if there are fixtures without primary key
    items[table].forEach(function(item) {
      var fields = Object.keys(item);
      var params = [];
      var values = [];
      var mod = 1;
      var isPrimaryKeyExists = false;
      for (var i = 0; i < fields.length; i++) {
        if (fields[i] == 'id') { // HARDCODE: use "id" as primary key
          isPrimaryKeyExists = true;
        }
        var value = item[fields[i]];
        if (/\{.*\}/.test(value)) { // HARDCODE: insert JSON fields directly
          params.push("'" + value + "'");
          mod--;
        } else {
          params.push('$' + (i + mod)); // Add placeholders
          values.push(value);
        }
      }
      if (!isPrimaryKeyExists) {
        isPrimaryKeyMissing = true;
      }

      var query = 'INSERT INTO ' + table + ' ("' + fields.join('", "') + '") VALUES (' + params.join(', ') + ')';
      if (!isPrimaryKeyMissing && isPrimaryKeyExists) {
        query += ' RETURNING id';
        var id = plv8.execute(query, values);
        ids.push(id[0]['id']);
      } else {
        var id = plv8.execute(query, values);
      }
    });

    if (isPrimaryKeyMissing) {
      ids = [];
    }

    loaded_fixtures.unshift({table, ids});
  });
}

function unload_fixtures () {
  loaded_fixtures.forEach(function(items) {
    var table = items['table'];
    if (!items['ids'].length) { // Remove all records if there are no primary keys set
      plv8.execute('TRUNCATE ' + table + ' CASCADE');
    } else {
      items['ids'].forEach(function(id) { // Remove loaded fixtures by primary keys
        plv8.execute('DELETE FROM ' + table + ' WHERE id = $1', id);
      });
    }
  });
  loaded_fixtures = [];
}