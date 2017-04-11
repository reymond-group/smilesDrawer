'use strict'
var glob = require('glob')
var arrayify = require('array-back')

/**
 * Exports a contructor taking a list of file patterns as input, returning a `file-set` instance containing the expanded patterns split into separate lists of `files`, `dirs` and `notExisting`.
 * @module
 * @example
 * ```js
 * const FileSet = require('file-set')
 * ```
 * @typicalname FileSet
 */
module.exports = FileSet

/* Polyfill for old node versions */
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString()
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length
    }
    position -= searchString.length
    var lastIndex = subjectString.indexOf(searchString, position)
    return lastIndex !== -1 && lastIndex === position
  }
}

/**
 * @class
 * @classdesc Expands file patterns, returning the matched and unmatched files and directories
 * @param {string | string[]} - A pattern, or array of patterns to expand
 * @alias module:file-set
 */
function FileSet (patternList) {
  if (!(this instanceof FileSet)) return new FileSet(patternList)

  /**
   * The existing files found
   * @type {string[]}
   */
  this.files = []

  /**
   * The existing directories found
   * @type {string[]}
   */
  this.dirs = []

  /**
   * Paths which were not found
   * @type {string[]}
   */
  this.notExisting = []

  this.add(patternList)
}

/**
 * add file patterns to the set
 * @param files {string|string[]} - A pattern, or array of patterns to expand
 */
FileSet.prototype.add = function (files) {
  var self = this
  var fs = require('fs')

  files = arrayify(files)
  files.forEach(function (file) {
    try {
      var stat = fs.statSync(file)
      if (stat.isFile()) {
        if (self.files.indexOf(file) === -1) self.files.push(file)
      } else if (stat.isDirectory()) {
        if (self.dirs.indexOf(file) === -1) self.dirs.push(file)
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        var found = glob.sync(file, { mark: true })
        if (found.length) {
          found.forEach(function (match) {
            if (match.endsWith('/')) {
              if (self.dirs.indexOf(match) === -1) self.dirs.push(match)
            } else {
              if (self.files.indexOf(match) === -1) self.files.push(match)
            }
          })
        } else {
          if (self.notExisting.indexOf(file) === -1) self.notExisting.push(file)
        }
      } else {
        throw err
      }
    }
  })
}
