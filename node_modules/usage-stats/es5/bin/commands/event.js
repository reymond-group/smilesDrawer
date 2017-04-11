'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Command = require('./command');
var UsageStats = require('../../../');

var Event = function (_Command) {
  _inherits(Event, _Command);

  function Event() {
    _classCallCheck(this, Event);

    return _possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).apply(this, arguments));
  }

  _createClass(Event, [{
    key: 'optionDefinitions',
    value: function optionDefinitions() {
      return _get(Event.prototype.__proto__ || Object.getPrototypeOf(Event.prototype), 'optionDefinitions', this).call(this).concat([{ name: 'ec', type: String, description: 'Event category' }, { name: 'ea', type: String, description: 'Event action' }, { name: 'el', type: String, description: 'Event label' }, { name: 'ev', type: String, description: 'Event value' }]);
    }
  }, {
    key: 'usage',
    value: function usage() {
      var sections = _get(Event.prototype.__proto__ || Object.getPrototypeOf(Event.prototype), 'usage', this).call(this);
      sections.unshift({ header: 'usage-stats event', content: 'Track an event.' });
      return sections;
    }
  }, {
    key: 'execute',
    value: function execute(options) {
      options = options || {};
      var usage = new UsageStats(options.tid, options);
      usage.event(options.ec, options.ea, options);
      if (options.debug) {
        return usage.debug();
      } else {
        return usage.send();
      }
    }
  }]);

  return Event;
}(Command);

module.exports = Event;