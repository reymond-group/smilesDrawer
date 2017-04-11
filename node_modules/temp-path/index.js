
var path = require('path')
var os = require('os')

var tmpdir = os.tmpdir ? os.tmpdir() : os.tmpDir()

module.exports = function () {
  return path.join(tmpdir, random() + random())
}

function random() {
  return Math.random().toString(36).slice(2)
}
