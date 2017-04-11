'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JsdocCommand = require('./jsdoc-command');

var Explain = function (_JsdocCommand) {
  _inherits(Explain, _JsdocCommand);

  function Explain() {
    _classCallCheck(this, Explain);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Explain).apply(this, arguments));
  }

  _createClass(Explain, [{
    key: 'getOutput',
    value: function getOutput(err) {
      if (err) return Promise.reject(err);

      if (this.options.cache) {
        return this.readCache().catch(this._runJsdoc.bind(this));
      } else {
        return this._runJsdoc();
      }
    }
  }, {
    key: '_runJsdoc',
    value: function _runJsdoc() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var collectAll = require('collect-all');
        var jsdocOutput = {
          stdout: '',
          stderr: '',
          collectInto: function collectInto(dest) {
            var _this2 = this;

            return collectAll(function (data) {
              _this2[dest] = data.toString();
            });
          }
        };

        var toSpawnArgs = require('object-to-spawn-args');
        var jsdocArgs = toSpawnArgs(_this3.jsdocOptions).concat(['-X']).concat(_this3.options.source ? _this3.tempFile.path : _this3.inputFileSet.files);
        jsdocArgs.unshift(_this3.jsdocPath);

        var spawn = require('child_process').spawn;
        var handle = spawn('node', jsdocArgs);
        handle.stderr.pipe(jsdocOutput.collectInto('stderr'));
        handle.stdout.pipe(jsdocOutput.collectInto('stdout'));

        handle.on('close', function (code) {
          try {
            (function () {
              var explainOutput = _this3.verifyOutput(code, jsdocOutput);
              if (_this3.options.cache) {
                _this3.cache.write(_this3.cacheKey, explainOutput).then(function () {
                  return resolve(explainOutput);
                });
              } else {
                resolve(explainOutput);
              }
            })();
          } catch (err) {
            reject(err);
          }
        });
      });
    }
  }]);

  return Explain;
}(JsdocCommand);

module.exports = Explain;