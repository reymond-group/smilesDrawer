'use strict';

var TestRunner = require('test-runner');
var UsageStats = require('../../');
var a = require('core-assert');
var runner = new TestRunner();
var shared = require('./lib/shared');

runner.test('new UsageStats(): trackingId required', function () {
  a.throws(function () {
    new UsageStats();
  });
});

runner.test('._createHit(map): returns map of defaults merged with supplied', function () {
  var testStats = new UsageStats('UA-00000000-0', { an: 'testsuite' });
  a.throws(function () {
    return testStats._createHit('fail');
  });
  var hit = testStats._createHit(new Map([['cd1', 'test']]));
  a.strictEqual(hit.get('v'), 1);
  a.strictEqual(hit.get('tid'), 'UA-00000000-0');
  a.strictEqual(hit.get('cd1'), 'test');
});

runner.test('.defaults: sent with every hit', function () {
  var testStats = new UsageStats('UA-00000000-0', { an: 'testsuite' });
  a.strictEqual(testStats.defaults.has('v'), true);
  a.strictEqual(testStats.defaults.has('tid'), true);

  testStats.defaults.set('cd1', 'test');
  var hit = testStats._createHit();
  a.strictEqual(hit.get('v'), 1);
  a.strictEqual(hit.get('tid'), 'UA-00000000-0');
  a.strictEqual(hit.get('cd1'), 'test');
});

runner.test('.screenview(name): creates hit', function () {
  var testStats = new UsageStats('UA-00000000-0', { an: 'testsuite' });
  var hit = testStats.screenView('test-screen');
  a.strictEqual(testStats._hits.length, 1);
  a.strictEqual(hit.get('t'), 'screenview');
  a.strictEqual(hit.get('cd'), 'test-screen');
});

runner.test('.screenview(name, params)', function () {
  var testStats = new UsageStats('UA-00000000-0', { an: 'testsuite' });
  var params = new Map();
  params.set('cm1', 1);
  params.set('cm2', 2);
  var hit = testStats.screenView('test-screen', { hitParams: params });
  a.strictEqual(testStats._hits.length, 1);
  a.strictEqual(hit.get('t'), 'screenview');
  a.strictEqual(hit.get('cd'), 'test-screen');
  a.strictEqual(hit.get('cm1'), 1);
  a.strictEqual(hit.get('cm2'), 2);
});

runner.test('.start(sessionParams): applies sessionParams to all hits in session', function () {
  var testStats = new UsageStats('UA-00000000-0', { an: 'testsuite' });
  var sessionParams = new Map([['cd1', 'one']]);
  testStats.start(sessionParams);
  var hit = testStats.screenView('screen');
  a.strictEqual(hit.get('cd'), 'screen');
  a.strictEqual(hit.get('cd1'), 'one');
  a.strictEqual(hit.get('sc'), 'start');

  hit = testStats.event('category1', 'action1');
  a.strictEqual(hit.get('ec'), 'category1');
  a.strictEqual(hit.get('cd1'), 'one');
  a.strictEqual(hit.get('sc'), undefined);

  hit = testStats.event('category2', 'action2');
  a.strictEqual(hit.get('ec'), 'category2');
  a.strictEqual(hit.get('cd1'), 'one');
  a.strictEqual(hit.get('sc'), undefined);

  testStats.end();
  a.strictEqual(hit.get('sc'), 'end');

  hit = testStats.screenView('screen2');
  a.strictEqual(hit.get('cd'), 'screen2');
  a.strictEqual(hit.get('cd1'), undefined);
  a.strictEqual(hit.get('sc'), undefined);

  a.strictEqual(testStats._hits.length, 4);
});

runner.test('.event(): validation', function () {
  var testStats = new UsageStats('UA-00000000-0', { an: 'testsuite' });
  a.throws(function () {
    testStats.event('test-category');
  });
  a.throws(function () {
    testStats.event();
  });
});

runner.test('.event(category, action): no optionals, creates hit', function () {
  var testStats = new UsageStats('UA-00000000-0', { an: 'testsuite' });
  var hit = testStats.event('test-category', 'test-action');
  a.strictEqual(testStats._hits.length, 1);
  a.strictEqual(hit.get('ec'), 'test-category');
  a.strictEqual(hit.get('ea'), 'test-action');
  a.strictEqual(hit.has('el'), false);
  a.strictEqual(hit.has('ev'), false);
});

runner.test('.event(category, action): with optionals, creates hit', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  var hit = testStats.event('test-category', 'test-action', {
    el: 'label',
    ev: 'value'
  });
  a.strictEqual(testStats._hits.length, 1);
  a.strictEqual(hit.get('ec'), 'test-category');
  a.strictEqual(hit.get('ea'), 'test-action');
  a.strictEqual(hit.get('el'), 'label');
  a.strictEqual(hit.get('ev'), 'value');
});

runner.test('.event(options, hitParams): creates hit and applies hit params', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  var hit = testStats.event('test-category', 'test-action', {
    hitParams: new Map([['cd1', 'cd1'], ['cd2', 'cd2']])
  });
  a.strictEqual(testStats._hits.length, 1);
  a.strictEqual(hit.get('ec'), 'test-category');
  a.strictEqual(hit.get('ea'), 'test-action');
  a.strictEqual(hit.get('cd1'), 'cd1');
  a.strictEqual(hit.get('cd2'), 'cd2');
});

runner.test('._createHitsPayload(hits): returns correct form data', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  var hit1 = new Map([['hit', 1]]);
  var hit2 = new Map([['hit', 2], ['ua', 'test']]);
  var hit3 = new Map([['hit', 3], ['cd1', 'cd1'], ['ua', 'ua']]);
  var hits = [hit1, hit2, hit3];
  var result = testStats._createHitsPayload(hits);
  a.strictEqual(result, 'hit=1\nhit=2&ua=test\nhit=3&cd1=cd1&ua=ua');
});

runner.test('.exception()', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  var hit = testStats.exception({ exd: 'test', exf: true });
  a.strictEqual(testStats._hits.length, 1);
  a.strictEqual(hit.get('t'), 'exception');
  a.strictEqual(hit.get('exd'), 'test');
  a.strictEqual(hit.get('exf'), 1);
});

runner.test('exception hitParams', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  var hit = testStats.exception({
    exd: 'test',
    exf: true,
    hitParams: new Map([['cd1', 'cd1'], ['cd2', 'cd2']])
  });
  a.strictEqual(testStats._hits.length, 1);
  a.strictEqual(hit.get('cd1'), 'cd1');
  a.strictEqual(hit.get('cd2'), 'cd2');
});

runner.test('.defaults: extra params');
runner.test('methods taking maps as input also accept objects or map constructor data');
runner.test('_getOSVersion(): only cache for 24 hours');
runner.test('.enable()');
runner.test('.disable()');