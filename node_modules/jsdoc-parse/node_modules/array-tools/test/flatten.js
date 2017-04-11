var test = require('tape')
var a = require('../')

test('.flatten()', function (t) {
  var numbers = [ 1, 2, [ 3, 4 ], 5 ]
  var result = a.flatten(numbers)
  t.deepEqual(result, [ 1, 2, 3, 4, 5 ])
  t.end()
})
