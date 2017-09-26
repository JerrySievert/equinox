var tests = [
  {
    'should equal 1': function ( ) {
      var result = plv8.execute('SELECT 2 AS num');
      console.log('woo');
      assert.equal(result.length, 1, "length should be 1");
      assert.equal(result[0].num, 1, "num should equal 1");
    }
  }
];
