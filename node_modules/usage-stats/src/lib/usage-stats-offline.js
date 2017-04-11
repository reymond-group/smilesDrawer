'use strict'
const UsageStatsAbortable = require('./usage-stats-abortable')
const path = require('path')
const os = require('os')
const fs = require('fs')
const arrayify = require('array-back')
const u = require('./util')

class UsageStatsOffline extends UsageStatsAbortable {
  constructor (trackingId, options) {
    super(trackingId, options)
    this._queuePath = path.resolve(this.dir, 'queue')
  }

  /**
   * Return the total hits stored on the queue.
   * @returns {number}
   */
  get queueLength () {
    let hits = []
    try {
      const queue = fs.readFileSync(this._queuePath, 'utf8')
      hits = queue.trim().split(os.EOL)
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err
      }
    }
    return hits.length
  }

  /**
   * Returns hits queued.
   * @param [count] {number} - Number of hits to dequeue. Defaults to "all hits".
   * @return {map[]}
   * @private
   * @sync
   */
  _dequeue (count) {
    try {
      const queue = fs.readFileSync(this._queuePath, 'utf8')
      let hits
      try {
        hits = u.jsonToHits(queue)
      } catch (err) {
        hits = []
      }
      let output = []
      if (count) {
        output = hits.splice(0, count)
        fs.writeFileSync(this._queuePath, u.hitsToJson(hits))
      } else {
        fs.writeFileSync(this._queuePath, '')
        output = hits
      }
      return output
    } catch (err) {
      /* queue file doesn't exist */
      if (err.code === 'ENOENT') {
        return []
      } else {
        throw err
      }
    }
  }

  /**
   * Append an array of hits to the queue.
   * @param {string[]} - Array of hits.
   * @private
   * @sync
   * @chainable
   */
  _enqueue (hits) {
    hits = arrayify(hits)
    if (hits.length) {
      fs.appendFileSync(this._queuePath, u.hitsToJson(hits))
    }
    return this
  }
}

module.exports = UsageStatsOffline
