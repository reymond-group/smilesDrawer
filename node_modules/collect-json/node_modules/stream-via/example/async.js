const via = require('../')
const fs = require('fs')

process.stdin
  .pipe(via.async(function (chunk, enc, done) {
    fs.readFile('LICENSE', function (err, content) {
      done(err, Buffer.concat([ chunk, content ]))
    })
  }))
  .pipe(via(function (chunk) {
    return 'ooo, stdin input concatenated with a license: \n' + chunk.toString()
  }))
  .pipe(process.stdout)
