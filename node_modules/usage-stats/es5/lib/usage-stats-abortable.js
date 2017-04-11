'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsageStats = require('./usage-stats-core');

var UsageStatsAbortable = function (_UsageStats) {
  _inherits(UsageStatsAbortable, _UsageStats);

  function UsageStatsAbortable(trackingId, options) {
    _classCallCheck(this, UsageStatsAbortable);

    var _this = _possibleConstructorReturn(this, (UsageStatsAbortable.__proto__ || Object.getPrototypeOf(UsageStatsAbortable)).call(this, trackingId, options));

    _this._requestControllers = [];
    return _this;
  }

  _createClass(UsageStatsAbortable, [{
    key: 'send',
    value: function send(options) {
      var _this2 = this;

      options = options || {};
      var sendPromise = void 0;
      if (options.timeout) {
        (function () {
          var timeout = setTimeout(function () {
            return _this2.abort();
          }, options.timeout);
          var endTimeout = function endTimeout() {
            return clearTimeout(timeout);
          };
          sendPromise = _get(UsageStatsAbortable.prototype.__proto__ || Object.getPrototypeOf(UsageStatsAbortable.prototype), 'send', _this2).call(_this2).then(function (responses) {
            endTimeout();
            return responses;
          }).catch(function (err) {
            endTimeout();
            throw err;
          });
        })();
      } else {
        sendPromise = _get(UsageStatsAbortable.prototype.__proto__ || Object.getPrototypeOf(UsageStatsAbortable.prototype), 'send', this).call(this);
      }

      return sendPromise.then(function (responses) {
        _this2._requestControllers = [];
        return responses;
      }).catch(function (err) {
        _this2._requestControllers = [];
        throw err;
      });
    }
  }, {
    key: '_getRequestOptions',
    value: function _getRequestOptions(url) {
      var reqOptions = _get(UsageStatsAbortable.prototype.__proto__ || Object.getPrototypeOf(UsageStatsAbortable.prototype), '_getRequestOptions', this).call(this, url);
      reqOptions.controller = {};
      this._requestControllers.push(reqOptions.controller);
      return reqOptions;
    }
  }, {
    key: 'abort',
    value: function abort() {
      if (this._disabled) return this;
      while (this._requestControllers.length) {
        var controller = this._requestControllers.shift();
        if (controller && controller.abort) {
          controller.abort();
        }
      }
      return this;
    }
  }]);

  return UsageStatsAbortable;
}(UsageStats);

module.exports = UsageStatsAbortable;