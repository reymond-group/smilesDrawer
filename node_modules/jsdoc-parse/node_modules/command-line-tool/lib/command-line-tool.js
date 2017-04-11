'use strict'
var arrayify = require('array-back')
var ansi = require('ansi-escape-sequences')

exports.stop = stop

function stop (exitCode, options) {
  options = options || {}
  arrayify(options.message).forEach(function (msg) {
    if (msg instanceof Error) {
      var err = msg
      if (err.code === 'EPIPE') process.exit(0) /* no big deal */
      console.error(ansi.format(msg.stack, exitCode > 0 ? 'red' : ''))
    } else {
      console.error(ansi.format(msg, exitCode > 0 ? 'red' : ''))
    }
  })

  if (options.usage) console.error(options.usage)
  process.exit(exitCode)
}
