'use strict';

var TestRunner = require('test-runner');
var UsageStats = require('../../');
var a = require('core-assert');
var runner = new TestRunner();
var shared = require('./lib/shared');

runner.test('.debug() live screenview: resolves with result', function () {
  var testStats = new UsageStats('UA-70853320-4', {
    name: 'usage-stats',
    version: require('../../package').version,
    dir: shared.getCacheDir(this.index, 'debug'),
    an: 'testsuite'
  });

  testStats.screenView(this.name);
  return testStats.debug().then(function (responses) {
    var response = responses[0];
    a.strictEqual(response.hits.length, 1);
    a.strictEqual(response.hits[0].get('t'), 'screenview');
    a.strictEqual(response.result.hitParsingResult[0].valid, true);
  }).catch(function (err) {
    if (err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test");else throw err;
  });
});