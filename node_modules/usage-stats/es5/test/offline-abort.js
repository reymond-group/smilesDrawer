'use strict';

var TestRunner = require('test-runner');
var UsageStats = require('../../');
var a = require('core-assert');
var runner = new TestRunner();
var shared = require('./lib/shared');

runner.test('.abort(): aborting throws, hit queued', function () {
  var http = require('http');
  var server = http.createServer(function (req, res) {
    setTimeout(function () {
      res.statusCode = 200;
      res.end('yeah?');
    }, 1000);
  });
  server.listen(9000);

  var testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9000'
  });
  testStats.screenView('test');

  return new Promise(function (resolve, reject) {
    testStats.send().then(function (responses) {
      reject(new Error('should not reach here'));
    }).catch(function () {
      var queued = testStats._dequeue();
      a.strictEqual(queued.length, 1);
      a.strictEqual(testStats._aborted, false);
      server.close();
      resolve();
    }).catch(function (err) {
      server.close();
      reject(err);
    });

    setTimeout(testStats.abort.bind(testStats), 50);
  });
});

runner.test('.abort(): called before .send() is a no-op', function () {
  var testStats = new UsageStats('UA-00000000-0');
  testStats.screenView('test');
  testStats.abort();
  a.ok(!this._aborted);
});

runner.test('.abort(): abort after a completed send is a no-op', function () {
  var http = require('http');
  var server = http.createServer(function (req, res) {
    setTimeout(function () {
      res.statusCode = 200;
      res.end('yeah?');
    }, 20);
  });
  server.listen(9020);

  var testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9020'
  });
  testStats.screenView('test');

  return new Promise(function (resolve, reject) {
    testStats.send().then(function (responses) {
      a.strictEqual(testStats.queueLength, 0);
      a.strictEqual(testStats._aborted, false);
      testStats.abort();
      a.strictEqual(testStats._aborted, false);
      server.close();
      resolve();
    }).catch(function (err) {
      console.error(err.stack);
      server.close();
      reject(err);
    });
  });
});

runner.test('.abort(): multiple requests - throws, all requests queued', function () {
  var http = require('http');
  var server = http.createServer(function (req, res) {
    setTimeout(function () {
      res.statusCode = 200;
      res.end('yeah?');
    }, 1000);
  });
  server.listen(9010);

  var testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9010'
  });

  for (var i = 0; i < 100; i++) {
    testStats._enqueue(new Map([['hit', i]]));
  }

  setTimeout(testStats.abort.bind(testStats), 50);

  return new Promise(function (resolve, reject) {
    testStats.send().then(function (responses) {
      server.close();
      reject(new Error('should not reach here'));
    }).catch(function () {
      a.strictEqual(testStats.queueLength, 100);
      a.strictEqual(testStats._aborted, false);
      server.close();
      resolve();
    }).catch(function (err) {
      server.close();
      reject(err);
    });
  });
});