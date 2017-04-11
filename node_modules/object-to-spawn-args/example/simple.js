var toSpawnArgs = require('../')
var spawn = require('child_process').spawn

var options = {
  l: true,
  a: true
}

spawn('ls', toSpawnArgs(options), { stdio: 'inherit' })
