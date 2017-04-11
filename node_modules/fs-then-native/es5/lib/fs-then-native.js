'use strict';

var fs = require('fs');
var fsThen = {};

for (var method in fs) {
  fsThen[method] = fs[method];
}

fsThen.writeFile = function () {
  var _arguments = arguments;

  return new Promise(function (resolve, reject) {
    fs.writeFile.apply(fs, Array.prototype.slice.call(_arguments).concat([function (err) {
      if (err) reject(err);else resolve();
    }]));
  });
};

fsThen.readFile = function () {
  var _arguments2 = arguments;

  return new Promise(function (resolve, reject) {
    fs.readFile.apply(fs, Array.prototype.slice.call(_arguments2).concat([function (err, data) {
      if (err) reject(err);else resolve(data);
    }]));
  });
};

fsThen.readdir = function () {
  var _arguments3 = arguments;

  return new Promise(function (resolve, reject) {
    fs.readdir.apply(fs, Array.prototype.slice.call(_arguments3).concat([function (err, data) {
      if (err) reject(err);else resolve(data);
    }]));
  });
};

fsThen.rmdir = function () {
  var _arguments4 = arguments;

  return new Promise(function (resolve, reject) {
    fs.rmdir.apply(fs, Array.prototype.slice.call(_arguments4).concat([function (err) {
      if (err) reject(err);else resolve();
    }]));
  });
};

fsThen.mkdir = function () {
  var _arguments5 = arguments;

  return new Promise(function (resolve, reject) {
    fs.mkdir.apply(fs, Array.prototype.slice.call(_arguments5).concat([function (err) {
      if (err) reject(err);else resolve();
    }]));
  });
};

fsThen.unlink = function () {
  var _arguments6 = arguments;

  return new Promise(function (resolve, reject) {
    fs.unlink.apply(fs, Array.prototype.slice.call(_arguments6).concat([function (err) {
      if (err) reject(err);else resolve();
    }]));
  });
};

module.exports = fsThen;