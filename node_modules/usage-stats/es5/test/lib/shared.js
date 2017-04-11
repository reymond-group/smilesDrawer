'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

exports.getCacheDir = getCacheDir;

function getCacheDir(index, name) {
  name = name || 'api';
  var tmpPath = path.resolve(__dirname, '../../../tmp', name);

  try {
    fs.mkdirSync(tmpPath);
  } catch (err) {}

  var dir = path.resolve(tmpPath, 'test' + index);
  rimraf.sync(dir);
  return dir;
}