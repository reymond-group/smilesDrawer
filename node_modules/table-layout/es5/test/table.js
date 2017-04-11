'use strict';

var TestRunner = require('test-runner');
var Table = require('../../');
var os = require('os');
var a = require('core-assert');

var runner = new TestRunner();

runner.test('new Table()', function () {
  var fixture = require('./fixture/simple-maxWidth');
  var table = new Table(fixture.data, fixture.options);

  a.strictEqual(table.rows.list.length, 2);
  a.strictEqual(table.columns.list.length, 2);
});

runner.test('table.getWrapped()', function () {
  var fixture = require('./fixture/simple-maxWidth');
  var table = new Table(fixture.data, fixture.options);

  a.deepEqual(table.getWrapped(), [[['row 1 column one ..', '.. ..'], ['r1 c2']], [['r2 c1'], ['row two column 2']]]);
});

runner.test('table.getLines()', function () {
  var fixture = require('./fixture/simple-maxWidth');
  var table = new Table(fixture.data, fixture.options);

  a.deepEqual(table.getLines(), [['row 1 column one ..', 'r1 c2'], ['.. ..', ''], ['r2 c1', 'row two column 2']]);
});

runner.test('table.renderLines()', function () {
  var fixture = require('./fixture/simple-maxWidth');
  var table = new Table(fixture.data, fixture.options);

  a.deepEqual(table.renderLines(), ['<row 1 column one .. ><r1 c2           >', '<.. ..               ><                >', '<r2 c1               ><row two column 2>']);
});

runner.test('table.toString()', function () {
  var fixture = require('./fixture/simple-maxWidth');
  var result = ['<row 1 column one .. ><r1 c2           >', '<.. ..               ><                >', '<r2 c1               ><row two column 2>'].join(os.EOL) + os.EOL;

  var table = new Table(fixture.data, fixture.options);
  a.strictEqual(table.toString(), result);
});

runner.test('table.renderLines() 2', function () {
  var fixture = require('./fixture/simple-maxWidth');
  var result = ['<row 1 column one .. ><r1 c2           >', '<.. ..               ><                >', '<r2 c1               ><row two column 2>'];

  var table = new Table(fixture.data, fixture.options);
  a.deepEqual(table.renderLines(), result);
});

runner.test('table.renderLines() 3', function () {
  var fixture = require('./fixture/primatives');
  var result = ['<row 1 column one .. .. ..><3000>', '<true                     ><null>', '<[object Object]          ><    >'];

  var table = new Table(fixture.data, fixture.options);
  a.deepEqual(table.renderLines(), result);
});