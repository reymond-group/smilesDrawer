'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsageStats = require('app-usage-stats');
var os = require('os');

module.exports = function (SuperClass, version) {
  return function (_SuperClass) {
    _inherits(JsdocToMarkdownStats, _SuperClass);

    function JsdocToMarkdownStats() {
      _classCallCheck(this, JsdocToMarkdownStats);

      var _this = _possibleConstructorReturn(this, (JsdocToMarkdownStats.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats)).call(this));

      var metricMap = {
        invocation: 1,
        source: 2,
        configure: 3,
        html: 4,
        template: 5,
        'heading-depth': 6,
        'example-lang': 7,
        plugin: 8,
        helper: 9,
        partial: 10,
        'name-format': 11,
        'no-gfm': 12,
        separators: 13,
        'module-index-format': 14,
        'global-index-format': 15,
        'param-list-format': 16,
        'property-list-format': 17,
        'member-index-format': 18,
        private: 19,
        'no-cache': 20
      };
      if (SuperClass.name === 'Jsdoc2md1') {
        metricMap.conf = 3;
      }
      _this._usage = new UsageStats('UA-70853320-3', {
        an: 'jsdoc2md',
        av: version,
        sendInterval: 1000 * 60 * 60 * 24,
        metricMap: metricMap,
        dimensionMap: {
          interface: 4,
          exception: 5
        }
      });

      _this._usage.defaults.set('cd1', process.version).set('cd2', os.type()).set('cd3', os.release()).set('cd4', 'api');

      _this._usage.loadSync();
      _this._interface = 'api';
      _this._sendOptions = { timeout: 3000 };

      process.on('exit', function () {
        return _this._usage.saveSync();
      });
      return _this;
    }

    _createClass(JsdocToMarkdownStats, [{
      key: '_hit',
      value: function _hit(method, options, exception) {
        var metrics = Object.assign({ invocation: 1 }, options);
        for (var key in metrics) {
          metrics[key] = 1;
        }
        var dimensions = { name: method.name, interface: this._interface };
        if (exception) dimensions.exception = exception;
        this._sendOptions.send = options.send;
        return this._usage.hit(dimensions, metrics, this._sendOptions);
      }
    }, {
      key: '_stats',
      value: function _stats(method, options) {
        var _this2 = this;

        options = options || {};
        if (options['no-usage-stats']) this._usage.disable();
        return Promise.all([this._hit(method, options).catch(function (err) {
          return '';
        }), method.call(SuperClass.prototype, options).catch(function (err) {
          return _this2._hit(method, options, err.toString()).then(function () {
            throw err;
          }).catch(function () {
            throw err;
          });
        })]).then(function (results) {
          return results[1];
        });
      }
    }, {
      key: '_statsSync',
      value: function _statsSync(method, options) {
        options = options || {};
        if (options['no-usage-stats']) this._usage.disable();
        try {
          var output = method.call(SuperClass.prototype, options);
          this._hit(method, options);
          return output;
        } catch (err) {
          this._hit(method, options, err.toString());
          throw err;
        }
      }
    }, {
      key: '_statsStream',
      value: function _statsStream(method, options) {
        var _this3 = this;

        options = options || {};
        if (options['no-usage-stats']) this._usage.disable();
        var output = method.call(SuperClass.prototype, options);
        this._hit(method, options);
        output.once('error', function (err) {
          _this3._hit(method, options, err.toString());
          output.emit('error', err);
        });
        return output;
      }
    }, {
      key: 'render',
      value: function render(options) {
        return this._stats(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'render', this), options);
      }
    }, {
      key: 'renderSync',
      value: function renderSync(options) {
        return this._statsSync(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'renderSync', this), options);
      }
    }, {
      key: 'getTemplateData',
      value: function getTemplateData(options) {
        return this._stats(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'getTemplateData', this), options);
      }
    }, {
      key: 'getTemplateDataSync',
      value: function getTemplateDataSync(options) {
        return this._statsSync(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'getTemplateDataSync', this), options);
      }
    }, {
      key: 'getJsdocData',
      value: function getJsdocData(options) {
        return this._stats(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'getJsdocData', this), options);
      }
    }, {
      key: 'getJsdocDataSync',
      value: function getJsdocDataSync(options) {
        return this._statsSync(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'getJsdocDataSync', this), options);
      }
    }, {
      key: 'clear',
      value: function clear() {
        return this._stats(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'clear', this));
      }
    }, {
      key: 'getNamepaths',
      value: function getNamepaths(options) {
        return this._stats(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'getNamepaths', this), options);
      }
    }, {
      key: 'renderStream',
      value: function renderStream(options, iface) {
        if (iface) {
          if (iface === 'test') {
            this._usage.disable();
          } else {
            this._interface = iface;
          }
        }
        return this._statsStream(_get(JsdocToMarkdownStats.prototype.__proto__ || Object.getPrototypeOf(JsdocToMarkdownStats.prototype), 'renderStream', this), options);
      }
    }]);

    return JsdocToMarkdownStats;
  }(SuperClass);
};