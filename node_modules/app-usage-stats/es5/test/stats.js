'use strict';

var TestRunner = require('test-runner');
var Stats = require('../lib/stats');
var a = require('core-assert');

var runner = new TestRunner();

runner.test('.add(): arbitrary metric value', function () {
  var stats = new Stats();
  stats.add({ dimension: { one: 1 }, metric: { total: 10 } });
  a.deepStrictEqual(stats.stats, [{ dimension: { one: 1 }, metric: { total: 10 } }]);
  stats.add({ dimension: { one: 1 }, metric: { total: 10 } });
  a.deepStrictEqual(stats.stats, [{ dimension: { one: 1 }, metric: { total: 20 } }]);
});

runner.test('.add(): varying dimensions', function () {
  var stats = new Stats();
  stats.add({ dimension: { one: 1 }, metric: { total: 1 } });
  stats.add({ dimension: { one: 1 }, metric: { total: 1 } });
  a.deepStrictEqual(stats.stats, [{ dimension: { one: 1 }, metric: { total: 2 } }]);
  stats.add([{ dimension: { one: 1 }, metric: { total: 1 } }, { dimension: { one: 1, two: 1 }, metric: { total: 1 } }]);
  a.deepStrictEqual(stats.stats, [{ dimension: { one: 1 }, metric: { total: 3 } }, { dimension: { one: 1, two: 1 }, metric: { total: 1 } }]);
});

runner.test('remove', function () {
  var stats = new Stats();
  stats.add({ dimension: { one: 1 }, metric: { a: 10, b: 10 } });
  stats.remove({ dimension: { one: 1 }, metric: { a: 1 } });
  a.deepStrictEqual(stats.stats, [{ dimension: { one: 1 }, metric: { a: 9, b: 10 } }]);
  stats.remove({ dimension: { one: 1, two: 1 }, metric: { a: 1 } });
  a.deepStrictEqual(stats.stats, [{ dimension: { one: 1 }, metric: { a: 9, b: 10 } }]);
  stats.remove({ dimension: { one: 1 }, metric: { a: 1, b: 5, c: 1 } });
  a.deepStrictEqual(stats.stats, [{ dimension: { one: 1 }, metric: { a: 8, b: 5 } }]);
});

runner.test('.remove(), stat removed entirely if total metrics zero', function () {
  var stats = new Stats();
  stats.add({ dimension: { one: 1 }, metric: { a: 10, b: 10 } });
  stats.add({ dimension: { two: 1 }, metric: { a: 10, b: 10 } });
  stats.remove({ dimension: { one: 1 }, metric: { a: 10, b: 10 } });
  a.deepStrictEqual(stats.stats, [{ dimension: { two: 1 }, metric: { a: 10, b: 10 } }]);
});