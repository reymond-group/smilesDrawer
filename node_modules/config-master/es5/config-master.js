'use strict';

var _marked = [configsInTree, packageConfigsInTree].map(regeneratorRuntime.mark);

var path = require('path');
var walkBack = require('walk-back');

module.exports = loadConfig;

function loadConfig(configName, options) {
  options = options || {};
  var configFileName = '.' + configName + '.json';
  var startFrom = options.startFrom || process.cwd();

  var configs = Array.from(configsInTree(startFrom, configFileName)).reverse();
  var packageConfigs = Array.from(packageConfigsInTree(startFrom, configName)).reverse();
  return Object.assign.apply(null, [{}].concat(packageConfigs).concat(configs));
}

function configsInTree(startFrom, fileName) {
  var file;
  return regeneratorRuntime.wrap(function configsInTree$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          file = void 0;

        case 1:
          if (!(file = walkBack(startFrom, fileName))) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return require(file);

        case 4:
          startFrom = path.resolve(path.dirname(file), '..');
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function packageConfigsInTree(startFrom, configName) {
  var file, config;
  return regeneratorRuntime.wrap(function packageConfigsInTree$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          file = void 0;

        case 1:
          if (!(file = walkBack(startFrom, 'package.json'))) {
            _context2.next = 9;
            break;
          }

          config = require(file)[configName];

          if (!config) {
            _context2.next = 6;
            break;
          }

          _context2.next = 6;
          return config;

        case 6:
          startFrom = path.resolve(path.dirname(file), '..');
          _context2.next = 1;
          break;

        case 9:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}