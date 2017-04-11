var test = require('tape')
var ddata = require('../')

function makeOptions (data) {
  return { data: { root: data }, hash: {} }
}

test('descendants', function (t) {
  var options = makeOptions([
    { id: 'one' }, { id: 'two', memberof: 'one' }, { id: 'three', memberof: 'two' }, { id: 'four' }
  ])
  options.hash.min = 0

  t.deepEqual(ddata.descendants.call({ id: 'one' }, options), [
    { id: 'two', memberof: 'one' }, { id: 'three', memberof: 'two' }
  ])

  options = makeOptions([
    { id: 'one' }, { id: 'two', memberof: 'one' }, { id: 'three', memberof: 'two' }, { id: 'four' }
  ])
  options.hash.min = 0

  t.deepEqual(ddata.descendants.call({ id: 'two' }, options), [
    { id: 'three', memberof: 'two' }
  ])

  options = makeOptions([
    { id: 'one' }, { id: 'two', memberof: 'one' }, { id: 'three', memberof: 'two' }, { id: 'four' }
  ])
  options.hash.min = 0

  t.deepEqual(ddata.descendants.call({ id: 'four' }, options), [])
  t.end()
})
