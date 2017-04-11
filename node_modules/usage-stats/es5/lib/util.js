'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var arrayify = require('array-back');
var os = require('os');

exports.hitsToJson = hitsToJson;
exports.jsonToHits = jsonToHits;
exports.mapToJson = mapToJson;
exports.jsonToMap = jsonToMap;

function hitsToJson(hits) {
  return arrayify(hits).map(function (hit) {
    return mapToJson(hit) + os.EOL;
  }).join('');
}

function jsonToHits(json) {
  if (json) {
    var hits = json.trim().split(os.EOL);
    return hits.map(function (hitJson) {
      return jsonToMap(hitJson);
    });
  } else {
    return [];
  }
}

function mapToJson(map) {
  return JSON.stringify([].concat(_toConsumableArray(map)));
}
function jsonToMap(json) {
  return new Map(JSON.parse(json));
}