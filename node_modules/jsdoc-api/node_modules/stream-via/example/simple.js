const via = require('../')

process.stdin
  .pipe(via(function (chunk) {
    return chunk.toString().replace(/a/g, '4')
  }))
  .pipe(process.stdout)
