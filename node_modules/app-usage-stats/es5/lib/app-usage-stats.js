'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsageStats = require('usage-stats');
var fs = require('fs');
var path = require('path');
var Stats = require('./stats');

var AppUsageStats = function (_UsageStats) {
  _inherits(AppUsageStats, _UsageStats);

  function AppUsageStats(tid, options) {
    _classCallCheck(this, AppUsageStats);

    options = options || {};

    var _this = _possibleConstructorReturn(this, (AppUsageStats.__proto__ || Object.getPrototypeOf(AppUsageStats)).call(this, tid, options));

    _this.unsent = new Stats();

    _this.sent = new Stats();

    _this.queuePath = path.resolve(_this.dir, tid + '-unsent.json');

    _this.dimensionMap = options.dimensionMap || {};
    _this.metricMap = options.metricMap || {};
    _this._lastSent = Date.now();
    _this._lastSentPath = path.resolve(_this.dir, tid + '-lastSent.json');
    _this.sendInterval = options.sendInterval;
    return _this;
  }

  _createClass(AppUsageStats, [{
    key: 'hit',
    value: function hit(dimension, metric, options) {
      if (this._disabled) return Promise.resolve([]);
      options = options || {};
      this.unsent.add({ dimension: dimension, metric: metric });

      if (this.sendInterval) {
        if (Date.now() - this._lastSent >= this.sendInterval || options.send) {
          return this.send(options);
        } else {
          return Promise.resolve([]);
        }
      }
    }
  }, {
    key: '_convertToHits',
    value: function _convertToHits() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.unsent.stats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var stat = _step.value;

          var hit = this.screenView(stat.dimension.name);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Object.keys(stat.dimension)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var key = _step2.value;

              if (!['name'].includes(key)) {
                var dId = this.dimensionMap[key];
                if (dId) {
                  hit.set('cd' + dId, stat.dimension[key]);
                }
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (stat.metric) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = Object.keys(stat.metric)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var metric = _step3.value;

                var mId = this.metricMap[metric];
                if (mId) {
                  hit.set('cm' + mId, stat.metric[metric]);
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'save',
    value: function save() {
      var _this2 = this;

      var toSave = this.unsent.stats.slice();
      return new Promise(function (resolve, reject) {
        fs.writeFile(_this2.queuePath, JSON.stringify(toSave), function (err) {
          if (err) {
            reject(err);
          } else {
            _this2.unsent.remove(toSave);
            _this2._saveLastSent();
            resolve();
          }
        });
      });
    }
  }, {
    key: 'saveSync',
    value: function saveSync() {
      fs.writeFileSync(this.queuePath, JSON.stringify(this.unsent.stats));
      this.unsent = new Stats();
      this._saveLastSent();
    }
  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        fs.readFile(_this3.queuePath, 'utf8', function (err, data) {
          if (err) {
            reject(err);
          } else {
            var stats = JSON.parse(data);
            _this3.unsent.add(stats);
            _this3._loadLastSent();
            resolve(stats);
          }
        });
      });
    }
  }, {
    key: 'loadSync',
    value: function loadSync() {
      try {
        var stats = JSON.parse(fs.readFileSync(this.queuePath, 'utf8'));
        this.unsent.add(stats);
      } catch (err) {
        if (err.code === 'ENOENT') {} else if (err.name === 'SyntaxError') {
          fs.writeFileSync(this.queuePath, '[]');
        } else {
          throw err;
        }
      }
      this._loadLastSent();
    }
  }, {
    key: '_loadLastSent',
    value: function _loadLastSent() {
      var lastSent = void 0;
      try {
        lastSent = JSON.parse(fs.readFileSync(this._lastSentPath, 'utf8'));
      } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        lastSent = Date.now();
      }
      this._lastSent = lastSent;
    }
  }, {
    key: '_saveLastSent',
    value: function _saveLastSent() {
      fs.writeFileSync(this._lastSentPath, JSON.stringify(this._lastSent));
    }
  }, {
    key: 'send',
    value: function send(options) {
      var _this4 = this;

      if (this._disabled) return Promise.resolve([]);
      this._convertToHits();
      var toSend = clone(this.unsent.stats);
      this.unsent = new Stats();
      this._lastSent = Date.now();
      return _get(AppUsageStats.prototype.__proto__ || Object.getPrototypeOf(AppUsageStats.prototype), 'send', this).call(this, options).then(function (responses) {
        _this4.sent.add(toSend);
        return responses;
      }).catch(function (err) {
        _this4.unsent.add(toSend);
        throw err;
      });
    }
  }]);

  return AppUsageStats;
}(UsageStats);

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

module.exports = AppUsageStats;