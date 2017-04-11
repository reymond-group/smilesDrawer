'use strict'
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

exports.getCacheDir = getCacheDir

function getCacheDir (index, name) {
  name = name || 'api'
  const tmpPath = path.resolve(__dirname, '../../../tmp', name)

  try {
    fs.mkdirSync(tmpPath)
  } catch (err) {
    // exists
  }

  const dir = path.resolve(tmpPath, 'test' + index)
  rimraf.sync(dir)
  return dir
}
