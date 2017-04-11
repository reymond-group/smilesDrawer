'use strict'
const fs = require('fs')
const getTempPath = require('temp-path')

class TempFile {
  constructor (source) {
    this.path = getTempPath() + '.js'
    fs.writeFileSync(this.path, source)
  }
  delete () {
    fs.unlinkSync(this.path)
  }
}

module.exports = TempFile
