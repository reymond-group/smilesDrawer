'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var assert = require('assert');
var walkBack = require('walk-back');
var spawnSync = require('child_process').spawnSync;
var spawn = require('child_process').spawn;
var toSpawnArgs = require('object-to-spawn-args');
var arrayify = require('array-back');
var collectAll = require('collect-all');
var TempFile = require('./temp-file');
var FileSet = require('file-set');
var homePath = require('home-path');
var fs = require('then-fs');

var CACHE_DIR = path.resolve(homePath(), '.jsdoc-api');

var jsdocPath = walkBack(path.join(__dirname, '..'), path.join('node_modules', 'jsdoc-75lb', 'jsdoc.js'));

var JsdocCommand = function () {
  function JsdocCommand(options) {
    _classCallCheck(this, JsdocCommand);

    require('promise.prototype.finally');

    options = options || {};
    options.files = arrayify(options.files);

    this.tempFile = null;
    if (options.source) this.tempFile = new TempFile(options.source);

    var jsdocOptions = Object.assign({}, options);
    delete jsdocOptions.files;
    delete jsdocOptions.source;
    delete jsdocOptions.cache;

    this.options = options;
    this.jsdocOptions = jsdocOptions;
  }

  _createClass(JsdocCommand, [{
    key: 'execute',
    value: function execute() {
      var _this = this;

      this.preExecute();
      var err = this.validate();
      this.output = this.getOutput(err);
      if (this.output instanceof Promise) {
        this.output.finally(function () {
          _this.postExecute();
        });
      } else {
        this.postExecute();
      }
      return this.output;
    }
  }, {
    key: 'preExecute',
    value: function preExecute() {
      this.inputFileSet = new FileSet(this.options.files);
    }
  }, {
    key: 'validate',
    value: function validate() {
      assert.ok(this.options.files.length || this.options.source, 'Must set either .files or .source');

      if (this.inputFileSet.notExisting.length) {
        var err = new Error('These files do not exist: ' + this.inputFileSet.notExisting);
        err.name = 'JSDOC_ERROR';
        return err;
      }
    }
  }, {
    key: 'postExecute',
    value: function postExecute() {
      if (this.tempFile) {
        this.tempFile.delete();
      }
    }
  }, {
    key: 'verifyOutput',
    value: function verifyOutput(code, output) {
      var parseFailed = false;
      var parsedOutput = void 0;
      try {
        parsedOutput = JSON.parse(output.stdout);
      } catch (err) {
        parseFailed = true;
      }

      if (code > 0 || parseFailed) {
        var firstLineOfStdout = output.stdout.split(/\r?\n/)[0];
        var err = new Error(output.stderr.trim() || firstLineOfStdout || 'Jsdoc failed.');
        err.name = 'JSDOC_ERROR';
        throw err;
      } else {
        return parsedOutput;
      }
    }
  }]);

  return JsdocCommand;
}();

var Explain = function (_JsdocCommand) {
  _inherits(Explain, _JsdocCommand);

  function Explain() {
    _classCallCheck(this, Explain);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Explain).apply(this, arguments));
  }

  _createClass(Explain, [{
    key: 'getOutput',
    value: function getOutput(err) {
      var _this4 = this;

      if (err) return Promise.reject(err);

      return this.checkCache().then(function (cachedOutput) {
        if (cachedOutput) {
          return cachedOutput;
        } else {
          return new Promise(function (resolve, reject) {
            var jsdocOutput = {
              stdout: '',
              stderr: '',
              collectInto: function collectInto(dest) {
                var _this3 = this;

                return collectAll(function (data) {
                  _this3[dest] = data.toString();
                });
              }
            };

            var jsdocArgs = toSpawnArgs(_this4.jsdocOptions).concat(['-X']).concat(_this4.options.source ? _this4.tempFile.path : _this4.inputFileSet.files);
            jsdocArgs.unshift(jsdocPath);

            var handle = spawn('node', jsdocArgs);
            handle.stderr.pipe(jsdocOutput.collectInto('stderr'));
            handle.stdout.pipe(jsdocOutput.collectInto('stdout'));

            handle.on('close', function (code) {
              try {
                var explainOutput = _this4.verifyOutput(code, jsdocOutput);
                fs.writeFileSync(_this4.cachePath, JSON.stringify(explainOutput));
                resolve(explainOutput);
              } catch (err) {
                reject(err);
              }
            });
          });
        }
      });
    }
  }, {
    key: 'checkCache',
    value: function checkCache() {
      var _this5 = this;

      var crypto = require('crypto');
      var hash = crypto.createHash('sha1');

      var promises = this.inputFileSet.files.map(function (file) {
        return fs.readFile(file);
      });

      return Promise.all(promises).then(function (contents) {
        contents.forEach(function (content) {
          return hash.update(content);
        });
        hash.update(_this5.inputFileSet.files.join());
        _this5.checksum = hash.digest('hex');
        _this5.cachePath = path.resolve(CACHE_DIR, _this5.checksum);

        try {
          return JSON.parse(fs.readFileSync(_this5.cachePath, 'utf8'));
        } catch (err) {
          return null;
        }
      }).catch(function (err) {
        return console.error(err.stack);
      });
    }
  }]);

  return Explain;
}(JsdocCommand);

var ExplainSync = function (_JsdocCommand2) {
  _inherits(ExplainSync, _JsdocCommand2);

  function ExplainSync() {
    _classCallCheck(this, ExplainSync);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ExplainSync).apply(this, arguments));
  }

  _createClass(ExplainSync, [{
    key: 'getOutput',
    value: function getOutput(err) {
      if (err) throw err;

      var jsdocArgs = toSpawnArgs(this.jsdocOptions).concat(['-X']).concat(this.options.source ? this.tempFile.path : this.inputFileSet.files);
      jsdocArgs.unshift(jsdocPath);
      var result = spawnSync('node', jsdocArgs, { encoding: 'utf-8' });
      var explainOutput = this.verifyOutput(result.status, result);

      return explainOutput;
    }
  }]);

  return ExplainSync;
}(JsdocCommand);

var RenderSync = function (_JsdocCommand3) {
  _inherits(RenderSync, _JsdocCommand3);

  function RenderSync() {
    _classCallCheck(this, RenderSync);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RenderSync).apply(this, arguments));
  }

  _createClass(RenderSync, [{
    key: 'getOutput',
    value: function getOutput(err) {
      if (err) throw err;
      var jsdocArgs = toSpawnArgs(this.jsdocOptions).concat(this.options.source ? this.tempFile.path : this.options.files);
      jsdocArgs.unshift(jsdocPath);
      spawnSync('node', jsdocArgs);
    }
  }]);

  return RenderSync;
}(JsdocCommand);

exports.Explain = Explain;
exports.ExplainSync = ExplainSync;
exports.RenderSync = RenderSync;