'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Command = require('./command');
var commandLineUsage = require('command-line-usage');

var NoCommand = function (_Command) {
  _inherits(NoCommand, _Command);

  function NoCommand(commandList) {
    _classCallCheck(this, NoCommand);

    var _this = _possibleConstructorReturn(this, (NoCommand.__proto__ || Object.getPrototypeOf(NoCommand)).call(this));

    _this.commandList = commandList;
    return _this;
  }

  _createClass(NoCommand, [{
    key: 'optionDefinitions',
    value: function optionDefinitions() {
      return [{ name: 'help', type: Boolean, alias: 'h' }];
    }
  }, {
    key: 'usage',
    value: function usage() {
      return [{
        header: 'usage-stats',
        content: 'A minimal, offline-friendly Google Analytics Measurement Protocol client for tracking usage statistics in shell and javascript applications.'
      }, {
        header: 'Synopsis',
        content: ['$ usage-stats <command> <command-options>', '$ usage-stats <command> --help']
      }, {
        header: 'Commands',
        content: this.commandList.filter(function (c) {
          return c.name !== null;
        }).map(function (c) {
          return { name: c.name, desc: c.desc };
        })
      }];
    }
  }, {
    key: 'execute',
    value: function execute(options) {
      return Promise.resolve(commandLineUsage(this.usage()));
    }
  }]);

  return NoCommand;
}(Command);

module.exports = NoCommand;