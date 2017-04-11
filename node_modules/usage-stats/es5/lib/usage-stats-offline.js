'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsageStatsAbortable = require('./usage-stats-abortable');
var path = require('path');
var os = require('os');
var fs = require('fs');
var arrayify = require('array-back');
var u = require('./util');

var UsageStatsOffline = function (_UsageStatsAbortable) {
  _inherits(UsageStatsOffline, _UsageStatsAbortable);

  function UsageStatsOffline(trackingId, options) {
    _classCallCheck(this, UsageStatsOffline);

    var _this = _possibleConstructorReturn(this, (UsageStatsOffline.__proto__ || Object.getPrototypeOf(UsageStatsOffline)).call(this, trackingId, options));

    _this._queuePath = path.resolve(_this.dir, 'queue');
    return _this;
  }

  _createClass(UsageStatsOffline, [{
    key: '_dequeue',
    value: function _dequeue(count) {
      try {
        var queue = fs.readFileSync(this._queuePath, 'utf8');
        var hits = void 0;
        try {
          hits = u.jsonToHits(queue);
        } catch (err) {
          hits = [];
        }
        var output = [];
        if (count) {
          output = hits.splice(0, count);
          fs.writeFileSync(this._queuePath, u.hitsToJson(hits));
        } else {
          fs.writeFileSync(this._queuePath, '');
          output = hits;
        }
        return output;
      } catch (err) {
        if (err.code === 'ENOENT') {
          return [];
        } else {
          throw err;
        }
      }
    }
  }, {
    key: '_enqueue',
    value: function _enqueue(hits) {
      hits = arrayify(hits);
      if (hits.length) {
        fs.appendFileSync(this._queuePath, u.hitsToJson(hits));
      }
      return this;
    }
  }, {
    key: 'queueLength',
    get: function get() {
      var hits = [];
      try {
        var queue = fs.readFileSync(this._queuePath, 'utf8');
        hits = queue.trim().split(os.EOL);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }
      return hits.length;
    }
  }]);

  return UsageStatsOffline;
}(UsageStatsAbortable);

module.exports = UsageStatsOffline;