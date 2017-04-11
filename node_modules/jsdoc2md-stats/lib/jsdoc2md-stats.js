'use strict'
const UsageStats = require('app-usage-stats')
const os = require('os')

module.exports = function (SuperClass, version) {
  return class JsdocToMarkdownStats extends SuperClass {
    constructor () {
      super()

      const metricMap = {
        invocation: 1,
        source: 2,
        configure: 3,
        html: 4,
        template: 5,
        'heading-depth': 6,
        'example-lang': 7,
        plugin: 8,
        helper: 9,
        partial: 10,
        'name-format': 11,
        'no-gfm': 12,
        separators: 13,
        'module-index-format': 14,
        'global-index-format': 15,
        'param-list-format': 16,
        'property-list-format': 17,
        'member-index-format': 18,
        private: 19,
        'no-cache': 20
      }
      if (SuperClass.name === 'Jsdoc2md1') {
        metricMap.conf = 3
      }
      this._usage = new UsageStats('UA-70853320-3', {
        an: 'jsdoc2md',
        av: version,
        sendInterval: 1000 * 60 * 60 * 24, // 24 hours
        metricMap: metricMap,
        dimensionMap: {
          interface: 4,
          exception: 5
        }
      })

      this._usage.defaults
        .set('cd1', process.version)
        .set('cd2', os.type())
        .set('cd3', os.release())
        .set('cd4', 'api')

      this._usage.loadSync()
      this._interface = 'api'
      this._sendOptions = { timeout: 3000 }

      process.on('exit', () => this._usage.saveSync())
    }

    _hit (method, options, exception) {
      const metrics = Object.assign({ invocation: 1 }, options)
      for (const key in metrics) {
        metrics[key] = 1
      }
      const dimensions = { name: method.name, interface: this._interface }
      if (exception) dimensions.exception = exception
      this._sendOptions.send = options.send
      return this._usage.hit(dimensions, metrics, this._sendOptions)
    }

    _stats (method, options) {
      options = options || {}
      if (options['no-usage-stats']) this._usage.disable()
      return Promise
        .all([
          this._hit(method, options)
            .catch(err => ''),
          method.call(SuperClass.prototype, options)
            .catch(err => {
              return this._hit(method, options, err.toString())
                .then(() => { throw err })
                .catch(() => { throw err })
            })
        ])
        .then(results => results[1])
    }

    _statsSync (method, options) {
      options = options || {}
      if (options['no-usage-stats']) this._usage.disable()
      try {
        const output = method.call(SuperClass.prototype, options)
        this._hit(method, options)
        return output
      } catch (err) {
        this._hit(method, options, err.toString())
        throw err
      }
    }

    _statsStream (method, options) {
      options = options || {}
      if (options['no-usage-stats']) this._usage.disable()
      const output = method.call(SuperClass.prototype, options)
      this._hit(method, options)
      output.once('error', err => {
        this._hit(method, options, err.toString())
        output.emit('error', err)
      })
      return output
    }

    render (options) {
      return this._stats(super.render, options)
    }

    renderSync (options) {
      return this._statsSync(super.renderSync, options)
    }

    getTemplateData (options) {
      return this._stats(super.getTemplateData, options)
    }

    getTemplateDataSync (options) {
      return this._statsSync(super.getTemplateDataSync, options)
    }

    getJsdocData (options) {
      return this._stats(super.getJsdocData, options)
    }

    getJsdocDataSync (options) {
      return this._statsSync(super.getJsdocDataSync, options)
    }

    clear () {
      return this._stats(super.clear)
    }

    getNamepaths (options) {
      return this._stats(super.getNamepaths, options)
    }

    renderStream (options, iface) {
      if (iface) {
        if (iface === 'test') {
          this._usage.disable()
        } else {
          this._interface = iface
        }
      }
      return this._statsStream(super.renderStream, options)
    }
  }
}
