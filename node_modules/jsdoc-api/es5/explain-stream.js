'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Duplex = require('stream').Duplex;
var arrayify = require('array-back');

var ExplainStream = function (_Duplex) {
  _inherits(ExplainStream, _Duplex);

  function ExplainStream(explain, options) {
    _classCallCheck(this, ExplainStream);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ExplainStream).call(this));

    _this.explain = explain;
    _this.options = options || {};
    _this.options.files = arrayify(_this.options.files);
    var collectAll = require('collect-all');
    _this._writeCollector = collectAll(function (source) {
      if (!(_this.inProgress || _this.options.files.length || _this.options.source)) {
        _this.options.source = source;
        _this.start();
        _this.inProgress = true;
      }
    });
    _this.on('finish', function () {
      _this._writeCollector.end();
    });
    return _this;
  }

  _createClass(ExplainStream, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      var Explain = require('./explain');
      var explain = new Explain(this.options);
      explain.execute().then(function (output) {
        _this2.push(JSON.stringify(output, null, '  '));
        _this2.push(null);
        _this2.inProgress = false;
      }).catch(function (err) {
        process.nextTick(function () {
          _this2.emit('error', err);
        });
      });
      this.inProgress = true;
    }
  }, {
    key: '_read',
    value: function _read() {
      if (!this.inProgress && (this.options.files.length || this.options.source)) {
        this.start();
      }
    }
  }, {
    key: '_write',
    value: function _write(chunk, encoding, done) {
      this._writeCollector.write(chunk);
      done();
    }
  }]);

  return ExplainStream;
}(Duplex);

module.exports = ExplainStream;