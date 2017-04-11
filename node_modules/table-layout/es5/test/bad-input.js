'use strict';

var TestRunner = require('test-runner');
var Table = require('../../');
var a = require('core-assert');

var runner = new TestRunner();

runner.test('table.lines(): no data', function () {
  var table = new Table([]);
  a.deepEqual(table.getLines([]), []);

  table = new Table([]);
  a.deepEqual(table.getLines(), []);
});