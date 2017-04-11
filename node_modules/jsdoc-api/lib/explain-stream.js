'use strict'
const Duplex = require('stream').Duplex
const arrayify = require('array-back')

class ExplainStream extends Duplex {
  constructor (explain, options) {
    super()
    this.explain = explain
    this.options = options || {}
    this.options.files = arrayify(this.options.files)
    const collectAll = require('collect-all')
    this._writeCollector = collectAll(source => {
      if (!(this.inProgress || this.options.files.length || this.options.source)) {
        this.options.source = source
        this.start()
        this.inProgress = true
      }
    })
    this.on('finish', () => {
      this._writeCollector.end()
    })
  }

  start () {
    const Explain = require('./explain')
    const explain = new Explain(this.options)
    explain.execute()
      .then(output => {
        this.push(JSON.stringify(output, null, '  '))
        this.push(null)
        this.inProgress = false
      })
      .catch(err => {
        /* emit the error on the next tick to prevent it crashing the rejection handler */
        process.nextTick(() => {
          this.emit('error', err)
        })
      })
    this.inProgress = true
  }

  _read () {
    if (!this.inProgress && (this.options.files.length || this.options.source)) {
      this.start()
    }
  }

  _write (chunk, encoding, done) {
    this._writeCollector.write(chunk)
    done()
  }
}

module.exports = ExplainStream
