'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayify = require('array-back');
var path = require('path');

var JsdocCommand = function () {
  function JsdocCommand(options, cache) {
    _classCallCheck(this, JsdocCommand);

    require('promise.prototype.finally');
    options = options || {};
    options.files = arrayify(options.files);

    this.cache = cache;
    this.tempFile = null;
    var TempFile = require('./temp-file');
    if (options.source) this.tempFile = new TempFile(options.source);

    var jsdocOptions = Object.assign({}, options);
    delete jsdocOptions.files;
    delete jsdocOptions.source;
    delete jsdocOptions.cache;

    this.options = options;
    this.jsdocOptions = jsdocOptions;

    var walkBack = require('walk-back');
    this.jsdocPath = walkBack(path.join(__dirname, '..'), path.join('node_modules', 'jsdoc-75lb', 'jsdoc.js'));
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
      var FileSet = require('file-set');
      this.inputFileSet = new FileSet(this.options.files);
    }
  }, {
    key: 'validate',
    value: function validate() {
      var assert = require('assert');
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
  }, {
    key: 'readCache',
    value: function readCache() {
      var _this2 = this;

      if (this.cache) {
        var _ret = function () {
          var fs = require('then-fs');
          var promises = _this2.inputFileSet.files.map(function (file) {
            return fs.readFile(file, 'utf8');
          });
          return {
            v: Promise.all(promises).then(function (contents) {
              _this2.cacheKey = contents.concat(_this2.inputFileSet.files);
              return _this2.cache.read(_this2.cacheKey);
            })
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else {
        return Promise.reject();
      }
    }
  }, {
    key: 'readCacheSync',
    value: function readCacheSync() {
      var _this3 = this;

      if (this.cache) {
        var _ret2 = function () {
          var fs = require('fs');
          var contents = _this3.inputFileSet.files.map(function (file) {
            return fs.readFileSync(file, 'utf8');
          });
          _this3.cacheKey = contents.concat(_this3.inputFileSet.files);
          return {
            v: _this3.cache.readSync(_this3.cacheKey)
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }
    }
  }]);

  return JsdocCommand;
}();

module.exports = JsdocCommand;