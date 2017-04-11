var collectAll = require('../')

function onAllCollected (collected) {
  console.log('Objects collected: ' + collected.length)
}

var stream = collectAll(onAllCollected, { objectMode: true })
stream.write({})
stream.write({})
stream.end({}) // outputs 'Objects collected: 3'
