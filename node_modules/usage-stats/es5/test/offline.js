'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestRunner = require('test-runner');
var UsageStats = require('../../');
var a = require('core-assert');
var runner = new TestRunner();
var shared = require('./lib/shared');
var fs = require('fs');

runner.test('._enqueue(hits): writes hits to cacheDir', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  var hit1 = new Map([['hit', 1]]);
  var hit2 = new Map([['hit', 2]]);
  var hit3 = new Map([['hit', 3]]);
  testStats._enqueue([hit1, hit2]);
  testStats._enqueue(hit3);
  var queue = fs.readFileSync(testStats._queuePath, 'utf8');
  a.strictEqual(queue, '[["hit",1]]\n[["hit",2]]\n[["hit",3]]\n');
});

runner.skip('._enqueue(): remove session control from queued hits', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  var hit1 = new Map([['hit', 1], ['sc', 'start']]);
  testStats._enqueue(hit1);
  var queue = fs.readFileSync(testStats._queuePath, 'utf8');
  a.strictEqual(queue, '[["hit",1]]\n');
  var hit2 = new Map([['hit', 2], ['cd1', 'test']]);
  testStats._enqueue(hit2);
  queue = fs.readFileSync(testStats._queuePath, 'utf8');
  a.strictEqual(queue, '[["hit",1]]\n[["hit",2],["cd1","test"]]\n');
});

runner.test('._dequeue(count): removes and returns hits', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  var hit1 = new Map([['hit', 1]]);
  var hit2 = new Map([['hit', 2]]);
  var hit3 = new Map([['hit', 3]]);
  var hit4 = new Map([['hit', 4]]);
  testStats._enqueue([hit1, hit2, hit3, hit4]);

  var queue = testStats._dequeue(2);
  a.deepEqual(queue, [hit1, hit2]);
  queue = testStats._dequeue(1);
  a.deepEqual(queue, [hit3]);
  queue = testStats._dequeue(2);
  a.deepEqual(queue, [hit4]);
  queue = testStats._dequeue(2);
  a.deepEqual(queue, []);
});

runner.test('._dequeue(): handles garbage on the queue', function () {
  var testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) });
  fs.writeFileSync(testStats._queuePath, 'blah');

  var queue = void 0;
  a.doesNotThrow(function () {
    return queue = testStats._dequeue();
  });
  a.deepEqual(queue, []);
});

runner.test('.send(): failed with nothing queued - throws', function () {
  var UsageTest = function (_UsageStats) {
    _inherits(UsageTest, _UsageStats);

    function UsageTest() {
      _classCallCheck(this, UsageTest);

      return _possibleConstructorReturn(this, (UsageTest.__proto__ || Object.getPrototypeOf(UsageTest)).apply(this, arguments));
    }

    _createClass(UsageTest, [{
      key: '_request',
      value: function _request() {
        return Promise.reject(new Error('failed'));
      }
    }]);

    return UsageTest;
  }(UsageStats);

  var testStats = new UsageTest('UA-00000000-0', { dir: shared.getCacheDir(this.index, 'offline') });
  testStats.screenView('test');
  return new Promise(function (resolve, reject) {
    testStats.send().then(function (responses) {
      reject(new Error("shouldn't reach here"));
    }).catch(function (err) {
      if (err.message === 'failed') {
        resolve();
      } else {
        reject(err);
      }
    });
  });
});

runner.test('.send(): failed with nothing queued - hit is queued', function () {
  var UsageTest = function (_UsageStats2) {
    _inherits(UsageTest, _UsageStats2);

    function UsageTest() {
      _classCallCheck(this, UsageTest);

      return _possibleConstructorReturn(this, (UsageTest.__proto__ || Object.getPrototypeOf(UsageTest)).apply(this, arguments));
    }

    _createClass(UsageTest, [{
      key: '_request',
      value: function _request() {
        return Promise.reject(new Error('failed'));
      }
    }]);

    return UsageTest;
  }(UsageStats);

  var testStats = new UsageTest('UA-00000000-0', { dir: shared.getCacheDir(this.index, 'offline') });
  testStats.screenView('test');
  return new Promise(function (resolve, reject) {
    testStats.send().then(function () {
      reject(new Error('should not reach here'));
    }).catch(function () {
      var queued = testStats._dequeue();
      a.strictEqual(queued.length, 1);
      a.strictEqual(queued[0].get('cd'), 'test');
      resolve();
    }).catch(reject);
  });
});

runner.test('.send(): failed with something queued - all hits queued', function () {
  var UsageTest = function (_UsageStats3) {
    _inherits(UsageTest, _UsageStats3);

    function UsageTest() {
      _classCallCheck(this, UsageTest);

      return _possibleConstructorReturn(this, (UsageTest.__proto__ || Object.getPrototypeOf(UsageTest)).apply(this, arguments));
    }

    _createClass(UsageTest, [{
      key: '_request',
      value: function _request() {
        return Promise.reject(new Error('failed'));
      }
    }]);

    return UsageTest;
  }(UsageStats);

  var testStats = new UsageTest('UA-00000000-0', { dir: shared.getCacheDir(this.index, 'offline') });
  var hit = testStats._createHit(new Map([['one', 'test']]));
  testStats._enqueue(hit);
  testStats.screenView('test');
  return new Promise(function (resolve, reject) {
    testStats.send().then(function () {
      reject(new Error('should not reach here'));
    }).catch(function (responses) {
      var queued = testStats._dequeue();
      a.strictEqual(queued.length, 2);
      a.strictEqual(queued[0].get('one'), 'test');
      a.strictEqual(queued[1].get('cd'), 'test');
      resolve();
    }).catch(reject);
  });
});