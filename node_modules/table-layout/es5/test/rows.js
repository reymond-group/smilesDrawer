'use strict';

var TestRunner = require('test-runner');
var Rows = require('../lib/rows');
var a = require('core-assert');

var runner = new TestRunner();

runner.test('removeEmptyColumns', function () {
  var input = [{ name: 'Lloyd', 'age': '' }, { name: 'Roger', 'age': ' ' }, { name: 'Amir' }, { name: 'Frank' }, { name: 'Amy' }];
  a.deepEqual(Rows.removeEmptyColumns(input), [{ name: 'Lloyd' }, { name: 'Roger' }, { name: 'Amir' }, { name: 'Frank' }, { name: 'Amy' }]);
});