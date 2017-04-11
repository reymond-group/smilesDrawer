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

runner.test('.send(): screenview (live)', function () {
  var testStats = new UsageStats('UA-70853320-4', {
    name: 'usage-stats',
    version: require('../../package').version,
    dir: shared.getCacheDir(this.index),
    an: 'testsuite'
  });

  testStats.screenView(this.name);
  return testStats.send().then(function (responses) {
    return responses.map(function (response) {
      return response.res.statusCode;
    });
  }).catch(function (err) {
    if (err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test");
  });
});

runner.test('.send(): offline throws', function () {
  var OfflineUsageStats = function (_UsageStats) {
    _inherits(OfflineUsageStats, _UsageStats);

    function OfflineUsageStats() {
      _classCallCheck(this, OfflineUsageStats);

      return _possibleConstructorReturn(this, (OfflineUsageStats.__proto__ || Object.getPrototypeOf(OfflineUsageStats)).apply(this, arguments));
    }

    _createClass(OfflineUsageStats, [{
      key: '_request',
      value: function _request() {
        return Promise.reject(new Error('offline'));
      }
    }]);

    return OfflineUsageStats;
  }(UsageStats);

  var testStats = new OfflineUsageStats('UA-70853320-4', {
    name: 'usage-stats',
    version: require('../../package').version,
    dir: shared.getCacheDir(this.index),
    an: 'testsuite'
  });

  testStats.screenView(this.name);
  return testStats.send().catch(function (err) {
    a.strictEqual(err.message, 'offline');
  });
});