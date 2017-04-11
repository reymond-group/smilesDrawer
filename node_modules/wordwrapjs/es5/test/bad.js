'use strict';

var TestRunner = require('test-runner');
var TextBlock = require('../../');
var a = require('core-assert');

var runner = new TestRunner();

runner.test('non-string input', function () {
  a.strictEqual(TextBlock.wrap(undefined), '');
  a.strictEqual(TextBlock.wrap(function () {}), 'function () {}');
  a.strictEqual(TextBlock.wrap({}), '[object Object]');
  a.strictEqual(TextBlock.wrap(null), 'null');
  a.strictEqual(TextBlock.wrap(true), 'true');
  a.strictEqual(TextBlock.wrap(0), '0');
  a.strictEqual(TextBlock.wrap(NaN), 'NaN');
  a.strictEqual(TextBlock.wrap(Infinity), 'Infinity');
});