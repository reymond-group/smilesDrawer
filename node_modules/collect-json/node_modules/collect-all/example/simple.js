var collectAll = require('../')
process.stdin
  .pipe(collectAll(function (input) {
    input = 'received: ' + input
    return input
  }))
  .pipe(process.stdout)
