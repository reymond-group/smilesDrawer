'use strict'
const UsageStats = require('./usage-stats-core')

class UsageStatsAbortable extends UsageStats {
  constructor (trackingId, options) {
    super(trackingId, options)
    this._requestControllers = []
  }

  send (options) {
    options = options || {}
    let sendPromise
    if (options.timeout) {
      const timeout = setTimeout(() => this.abort(), options.timeout)
      const endTimeout = () => clearTimeout(timeout)
      sendPromise = super.send()
        .then(responses => {
          endTimeout()
          return responses
        })
        .catch(err => {
          endTimeout()
          throw err
        })
    } else {
      sendPromise = super.send()
    }

    return sendPromise
      .then(responses => {
        this._requestControllers = []
        return responses
      })
      .catch(err => {
        this._requestControllers = []
        throw err
      })
  }

  _getRequestOptions (url) {
    const reqOptions = super._getRequestOptions(url)
    reqOptions.controller = {}
    this._requestControllers.push(reqOptions.controller)
    return reqOptions
  }

  abort () {
    if (this._disabled) return this
    while (this._requestControllers.length) {
      const controller = this._requestControllers.shift()
      if (controller && controller.abort) {
        controller.abort()
      }
    }
    return this
  }
}

module.exports = UsageStatsAbortable
