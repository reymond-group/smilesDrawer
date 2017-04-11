'use strict'
var jsdoc2md = require('jsdoc-to-markdown')
var through = require('through2')
var gutil = require('gulp-util')
var PluginError = gutil.PluginError
var PLUGIN_NAME = 'gulp-jsdoc-to-markdown'

module.exports = gulpJsdoc2md

function gulpJsdoc2md (options) {
  return through.obj(function (file, enc, callback) {
    var self = this

    if (file.isNull()) {
      // Do nothing if no contents
    }
    if (file.isBuffer()) {
      var buf = new Buffer(0)
      var jsdoc2mdStream = jsdoc2md(options)
      jsdoc2mdStream.on('readable', function () {
        var chunk = this.read()
        if (chunk) buf = Buffer.concat([ buf, chunk ])
      })
      jsdoc2mdStream.on('end', function () {
        file.contents = buf
        self.push(file)
        return callback()
      })
      jsdoc2mdStream.on('error', function (err) {
        self.emit('error', new PluginError(PLUGIN_NAME, err.message))
      })
      jsdoc2mdStream.end(file.contents)
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(jsdoc2md(options))
      self.push(file)
      return callback()
    }
  })
}
