'use strict'
const arrayify = require('array-back')

class Stats {
  constructor () {
    this.stats = []
  }
  add (stats) {
    for (const toAdd of arrayify(stats)) {
      let stat = this.stats.find(stat => objectsEqual(stat.dimension, toAdd.dimension))
      if (!stat) {
        stat = {
          dimension: toAdd.dimension,
          metric: {}
        }
        for (const key of Object.keys(toAdd.metric)) {
          stat.metric[key] = toAdd.metric[key]
        }
        this.stats.push(stat)
      } else {
        for (const key of Object.keys(toAdd.metric)) {
          if (stat.metric[key]) {
            stat.metric[key] += toAdd.metric[key]
          } else {
            stat.metric[key] = toAdd.metric[key]
          }
        }
      }
    }
  }
  remove (stats) {
    for (const toRemove of arrayify(stats)) {
      let stat = this.stats.find(stat => objectsEqual(stat.dimension, toRemove.dimension))
      if (stat) {
        for (const metricName of Object.keys(toRemove.metric)) {
          if (stat.metric[metricName]) {
            stat.metric[metricName] -= toRemove.metric[metricName]
          }
        }

        const metricTotal = Object.keys(stat.metric).reduce((prev, curr) => {
          return stat.metric[curr] + prev
        }, 0)
        if (metricTotal === 0) {
          this.stats.splice(this.stats.indexOf(stat), 1)
        }
      }
    }
  }
}

module.exports = Stats

function objectsEqual (a, b) {
  const testValue = require('test-value')
  return Object.keys(a).length === Object.keys(b).length && testValue(a, b)
}
