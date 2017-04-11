'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var os = require('os');
var fs = require('fs');
var arrayify = require('array-back');
var t = require('typical');

var UsageStats = function () {
  function UsageStats(trackingId, options) {
    _classCallCheck(this, UsageStats);

    if (!trackingId) throw new Error('a Google Analytics TrackingID is required');
    options = options || {};

    var homePath = require('home-path');

    this.dir = options.dir || path.resolve(homePath(), '.usage-stats');
    this._disabled = false;
    this._hits = [];

    this._url = {
      debug: options.debugUrl || 'https://www.google-analytics.com/debug/collect',
      batch: options.url || 'https://www.google-analytics.com/batch'
    };

    this.defaults = new Map([['v', 1], ['tid', trackingId], ['ds', 'app'], ['cid', this._getClientId()], ['ua', options.ua || 'Mozilla/5.0 ' + this._getOSVersion()], ['ul', options.lang || process.env.LANG], ['sr', options.sr || this._getScreenResolution()]]);
    if (options.an) this.defaults.set('an', options.an);
    if (options.av) this.defaults.set('av', options.av);
  }

  _createClass(UsageStats, [{
    key: 'start',
    value: function start(sessionParams) {
      if (this._disabled) return this;
      this._sessionStarted = true;
      if (sessionParams) this._sessionParams = sessionParams;
      return this;
    }
  }, {
    key: 'end',
    value: function end(sessionParams) {
      if (this._disabled) return this;
      if (this._hits.length === 1) {
        var hit = this._hits[0];
        hit.set('sc', 'end');
        if (sessionParams) hit = new Map([].concat(_toConsumableArray(hit), [sessionParams]));
      } else if (this._hits.length > 1) {
        var _hit = this._hits[this._hits.length - 1];
        _hit.set('sc', 'end');
        if (sessionParams) _hit = new Map([].concat(_toConsumableArray(_hit), [sessionParams]));
      }
      if (this._sessionParams) delete this._sessionParams;
      return this;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this._disabled = true;
      return this;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this._disabled = false;
      return this;
    }
  }, {
    key: '_createHit',
    value: function _createHit(map, options) {
      if (map && !(map instanceof Map)) throw new Error('map instance required');
      options = options || {};
      var hit = new Map([].concat(_toConsumableArray(this.defaults), _toConsumableArray(map || new Map())));
      if (options.hitParams) hit = new Map([].concat(_toConsumableArray(hit), _toConsumableArray(options.hitParams)));
      if (this._sessionParams) hit = new Map([].concat(_toConsumableArray(hit), _toConsumableArray(this._sessionParams)));
      if (this._sessionStarted) {
        hit.set('sc', 'start');
        this._sessionStarted = false;
      }
      return hit;
    }
  }, {
    key: 'event',
    value: function event(category, action, options) {
      if (this._disabled) return this;
      if (!(category && action)) throw new Error('category and action required');
      options = options || {};
      if (options.hitParams && t.isPlainObject(options.hitParams)) {
        options.hitParams = objToMap(options.hitParams);
      }

      var hit = this._createHit(new Map([['t', 'event'], ['ec', category], ['ea', action]]), options);

      if (t.isDefined(options.el)) hit.set('el', options.el);
      if (t.isDefined(options.ev)) hit.set('ev', options.ev);
      this._hits.push(hit);
      return hit;
    }
  }, {
    key: 'screenView',
    value: function screenView(name, options) {
      if (this._disabled) return this;
      options = options || {};
      if (options.hitParams && t.isPlainObject(options.hitParams)) {
        options.hitParams = objToMap(options.hitParams);
      }

      var hit = this._createHit(new Map([['t', 'screenview'], ['cd', name]]), options);
      if (!hit.has('an')) throw new Error("'an' parameter required (App name)");
      if (!hit.has('cd')) throw new Error("'cd' parameter required (screen name)");
      this._hits.push(hit);
      return hit;
    }
  }, {
    key: 'exception',
    value: function exception(options) {
      if (this._disabled) return this;
      options = options || {};
      var hit = this._createHit(new Map([['t', 'exception']]), options);
      if (t.isDefined(options.exd)) hit.set('exd', options.exd);
      if (t.isDefined(options.exf)) hit.set('exf', options.exf ? 1 : 0);
      this._hits.push(hit);
      return hit;
    }
  }, {
    key: 'send',
    value: function send() {
      if (this._disabled) return Promise.resolve([]);

      var toSend = this._hits.slice();
      this._hits.length = 0;

      var requests = [];
      while (toSend.length) {
        var batch = toSend.splice(0, 20);
        var reqOptions = this._getRequestOptions(this._url.batch);
        var req = this._sendBatch(reqOptions, batch);
        requests.push(req);
      }

      return Promise.all(requests);
    }
  }, {
    key: '_getRequestOptions',
    value: function _getRequestOptions(url) {
      var urlUtil = require('url');
      var reqOptions = urlUtil.parse(url);
      reqOptions.method = 'POST';
      reqOptions.headers = { 'content-type': 'text/plain' };
      return reqOptions;
    }
  }, {
    key: 'debug',
    value: function debug() {
      var _this = this;

      if (this._disabled) return Promise.resolve([]);
      var toSend = this._hits.slice();
      this._hits.length = 0;

      var requests = [];

      var _loop = function _loop() {
        var batch = toSend.splice(0, 20);
        var reqOptions = _this._getRequestOptions(_this._url.debug);
        var req = _this._sendBatch(reqOptions, batch).then(function (response) {
          return {
            hits: batch,
            result: JSON.parse(response.data.toString())
          };
        });
        requests.push(req);
      };

      while (toSend.length) {
        _loop();
      }
      return Promise.all(requests);
    }
  }, {
    key: '_sendBatch',
    value: function _sendBatch(reqOptions, batch) {
      var _this2 = this;

      return this._request(reqOptions, this._createHitsPayload(batch)).then(function (response) {
        if (response.res.statusCode >= 300) {
          throw new Error('Unexpected response');
        } else {
          return response;
        }
      }).catch(function (err) {
        _this2._hits = _this2._hits.concat(batch);
        err.hits = batch;
        throw err;
      });
    }
  }, {
    key: '_getClientId',
    value: function _getClientId() {
      var cid = null;
      var uuid = require('uuid');
      var cidPath = path.resolve(this.dir, 'cid');
      try {
        cid = fs.readFileSync(cidPath, 'utf8');
      } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        cid = uuid.v4();
        fs.writeFileSync(cidPath, cid);
      }
      return cid;
    }
  }, {
    key: '_getOSVersion',
    value: function _getOSVersion() {
      var output = null;
      var osVersionPath = path.resolve(this.dir, 'osversion');
      try {
        output = fs.readFileSync(osVersionPath, 'utf8');
      } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        var execSync = require('child_process').execSync;
        if (!execSync) {
          output = 'N/A';
        } else {
          if (os.platform() === 'win32') {
            output = '(Windows NT ' + os.release() + ')';
          } else if (os.platform() === 'darwin') {
            output = '(Macintosh; Intel MAC OS X ' + execSync('sw_vers -productVersion').toString().trim() + ')';
          } else if (os.platform() === 'linux') {
            output = '(X11; Linux ' + os.release() + ')';
          }
        }
        fs.writeFileSync(osVersionPath, output);
      }
      return output;
    }
  }, {
    key: '_request',
    value: function _request(reqOptions, data) {
      var request = require('req-then');
      return request(reqOptions, data);
    }
  }, {
    key: '_getScreenResolution',
    value: function _getScreenResolution() {
      return process.stdout.columns && process.stdout.rows ? process.stdout.columns + 'x' + process.stdout.rows : 'N/A';
    }
  }, {
    key: '_createHitsPayload',
    value: function _createHitsPayload(hits) {
      return arrayify(hits).map(function (hit) {
        return Array.from(hit).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return key + '=' + encodeURIComponent(value);
        }).join('&');
      }).join(os.EOL);
    }
  }, {
    key: 'abort',
    value: function abort() {}
  }, {
    key: 'dir',
    get: function get() {
      return this._dir;
    },
    set: function set(val) {
      this._dir = val;
      var mkdirp = require('mkdirp');
      mkdirp.sync(this._dir);
    }
  }]);

  return UsageStats;
}();

function objToMap(obj) {
  var map = new Map();
  Object.keys(obj).forEach(function (key) {
    return map.set(key, obj[key]);
  });
  return map;
}

module.exports = UsageStats;