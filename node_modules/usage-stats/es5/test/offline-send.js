'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestRunner = require('test-runner');
var UsageStats = require('../../');
var a = require('core-assert');
var os = require('os');
var runner = new TestRunner();
var shared = require('./lib/shared');

runner.test('.send(): successful with nothing queued - still nothing queued', function () {
  var UsageTest = function (_UsageStats) {
    _inherits(UsageTest, _UsageStats);

    function UsageTest() {
      _classCallCheck(this, UsageTest);

      return _possibleConstructorReturn(this, (UsageTest.__proto__ || Object.getPrototypeOf(UsageTest)).apply(this, arguments));
    }

    _createClass(UsageTest, [{
      key: '_request',
      value: function _request(reqOptions, data) {
        return Promise.resolve({ res: { statusCode: 200 }, data: 'test' });
      }
    }]);

    return UsageTest;
  }(UsageStats);

  var testStats = new UsageTest('UA-00000000-0', { dir: shared.getCacheDir(this.index), an: 'test' });
  testStats.screenView('test');
  return testStats.send().then(function (responses) {
    if (responses[0].err && responses[0].err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test");
    a.strictEqual(responses.length, 1);
    a.strictEqual(responses[0].data, 'test');
    var queued = testStats._dequeue();
    a.strictEqual(queued.length, 0);
  });
});

runner.test('.send(): successful with something queued - all hits sent and queue emptied', function () {
  var UsageTest = function (_UsageStats2) {
    _inherits(UsageTest, _UsageStats2);

    function UsageTest() {
      _classCallCheck(this, UsageTest);

      return _possibleConstructorReturn(this, (UsageTest.__proto__ || Object.getPrototypeOf(UsageTest)).apply(this, arguments));
    }

    _createClass(UsageTest, [{
      key: '_request',
      value: function _request(reqOptions, data) {
        var lines = data.trim().split(os.EOL);
        a.ok(/hit=1/.test(lines[0]));
        a.ok(/cd=test/.test(lines[1]));
        return Promise.resolve({ res: { statusCode: 200 }, data: 'test' });
      }
    }]);

    return UsageTest;
  }(UsageStats);

  var testStats = new UsageTest('UA-00000000-0', {
    an: 'usage-stats',
    av: require('../../package').version,
    dir: shared.getCacheDir(this.index)
  });
  var hit = new Map([['hit', 1]]);
  testStats._enqueue(hit);
  testStats.screenView('test');
  return testStats.send().then(function (responses) {
    if (responses[0].err && responses[0].err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test");
    var queued = testStats._dequeue();
    a.strictEqual(queued.length, 0);
  });
});