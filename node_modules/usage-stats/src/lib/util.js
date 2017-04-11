'use strict'
const arrayify = require('array-back')
const os = require('os')

exports.hitsToJson = hitsToJson
exports.jsonToHits = jsonToHits
exports.mapToJson = mapToJson
exports.jsonToMap = jsonToMap

function hitsToJson (hits) {
  return arrayify(hits)
    .map(hit => {
      return mapToJson(hit) + os.EOL
    })
    .join('')
}

function jsonToHits (json) {
  if (json) {
    const hits = json.trim().split(os.EOL)
    return hits.map(hitJson => jsonToMap(hitJson))
  } else {
    return []
  }
}

function mapToJson (map) {
  return JSON.stringify([...map])
}
function jsonToMap (json) {
  return new Map(JSON.parse(json))
}
