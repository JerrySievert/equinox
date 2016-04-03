var tests = [
  {
    'should equal 1': function ( ) {
      var result = plv8.execute('SELECT 1 AS num');
      assert.equal(result.length, 1);
      assert.equal(result[0].num, 1);
    }
  }
];
