'use strict';

var TestRunner = require('test-runner');
var Columns = require('../lib/columns');
var a = require('core-assert');

var runner = new TestRunner();

runner.test('columns.autoSize(contentColumns, maxWidth)', function () {
  var columns = new Columns([{ name: 'one', contentWidth: 10, contentWrappable: true }, { name: 'two', contentWidth: 20, contentWrappable: true }]);

  columns.maxWidth = 30;
  columns.autoSize();
  a.strictEqual(columns.list[0].generatedWidth, 12);
  a.strictEqual(columns.list[1].generatedWidth, 18);
});