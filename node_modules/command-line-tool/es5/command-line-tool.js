'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayify = require('array-back');
var ansi = require('ansi-escape-sequences');
var t = require('typical');

var CommandLineTool = function () {
  function CommandLineTool() {
    _classCallCheck(this, CommandLineTool);
  }

  _createClass(CommandLineTool, [{
    key: 'stop',
    value: function stop(message) {
      arrayify(message).forEach(function (msg) {
        console.error(ansi.format(msg));
      });
      process.exit(0);
    }
  }, {
    key: 'printError',
    value: function printError(message) {
      arrayify(message).forEach(function (msg) {
        console.error(ansi.format(msg, 'red'));
      });
    }
  }, {
    key: 'halt',
    value: function halt(err, options) {
      options = Object.assign({ exitCode: 1 }, options);
      if (err) {
        if (err.code === 'EPIPE') {
          process.exit(0);
        } else {
          this.printError(t.isString(err) ? err : options.stack ? err.stack : err.message, options);
        }
      }
      process.exit(options.exitCode);
    }
  }, {
    key: 'getCli',
    value: function getCli(definitions, usageSections, argv) {
      var commandLineArgs = require('command-line-args');
      var commandLineUsage = require('command-line-usage');
      var usage = usageSections ? commandLineUsage(usageSections) : '';
      var options = commandLineArgs(definitions, argv);
      return { options: options, usage: usage };
    }
  }]);

  return CommandLineTool;
}();

module.exports = CommandLineTool;