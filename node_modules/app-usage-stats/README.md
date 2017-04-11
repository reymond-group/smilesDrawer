[![view on npm](http://img.shields.io/npm/v/app-usage-stats.svg)](https://www.npmjs.org/package/app-usage-stats)
[![npm module downloads](http://img.shields.io/npm/dt/app-usage-stats.svg)](https://www.npmjs.org/package/app-usage-stats)
[![Build Status](https://travis-ci.org/75lb/app-usage-stats.svg?branch=master)](https://travis-ci.org/75lb/app-usage-stats)
[![Dependency Status](https://david-dm.org/75lb/app-usage-stats.svg)](https://david-dm.org/75lb/app-usage-stats)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_app-usage-stats"></a>

## app-usage-stats
A convention for tracking javascript application usage, making full use of [custom dimensions and metrics](https://support.google.com/analytics/answer/2709828?hl=en&ref_topic=2709827).

**Example**  
```js
const UsageStats = require('app-usage-stats')
const stats = new UsageStats('UA-987654321')
```

* [app-usage-stats](#module_app-usage-stats)
    * [AppUsageStats](#exp_module_app-usage-stats--AppUsageStats) ⇐ <code>[UsageStats](https://github.com/75lb/usage-stats)</code> ⏏
        * [new AppUsageStats(tid, [options])](#new_module_app-usage-stats--AppUsageStats_new)
        * [.unsent](#module_app-usage-stats--AppUsageStats.AppUsageStats+unsent) : <code>Array.&lt;object&gt;</code>
        * [.sent](#module_app-usage-stats--AppUsageStats.AppUsageStats+sent) : <code>Array.&lt;object&gt;</code>
        * [.queuePath](#module_app-usage-stats--AppUsageStats.AppUsageStats+queuePath) : <code>string</code>
        * [.hit(dimension, metric, [options])](#module_app-usage-stats--AppUsageStats+hit)
        * [.save()](#module_app-usage-stats--AppUsageStats+save)
        * [.saveSync()](#module_app-usage-stats--AppUsageStats+saveSync)
        * [.load()](#module_app-usage-stats--AppUsageStats+load)
        * [.loadSync()](#module_app-usage-stats--AppUsageStats+loadSync)
        * [.send([options])](#module_app-usage-stats--AppUsageStats+send)

<a name="exp_module_app-usage-stats--AppUsageStats"></a>

### AppUsageStats ⇐ <code>[UsageStats](https://github.com/75lb/usage-stats)</code> ⏏
**Kind**: Exported class  
**Extends:** <code>[UsageStats](https://github.com/75lb/usage-stats)</code>  
<a name="new_module_app-usage-stats--AppUsageStats_new"></a>

#### new AppUsageStats(tid, [options])

| Param | Type | Description |
| --- | --- | --- |
| tid | <code>string</code> | Google Analytics tracking ID |
| [options] | <code>object</code> |  |
| [options.dimensionMap] | <code>object</code> | A custom dimension name to ID Map. |
| [options.metricMap] | <code>object</code> | A custom metric name to ID Map. |
| [options.sendInterval] | <code>object</code> | If specified, stats will be sent no more frequently than this period. |

<a name="module_app-usage-stats--AppUsageStats.AppUsageStats+unsent"></a>

#### usage.unsent : <code>Array.&lt;object&gt;</code>
Stats not yet sent.

**Kind**: instance property of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  
<a name="module_app-usage-stats--AppUsageStats.AppUsageStats+sent"></a>

#### usage.sent : <code>Array.&lt;object&gt;</code>
Stats sent.

**Kind**: instance property of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  
<a name="module_app-usage-stats--AppUsageStats.AppUsageStats+queuePath"></a>

#### usage.queuePath : <code>string</code>
Queued stats path. Defaults to `~/.usage-stats/${trackingId}-unsent.json`.

**Kind**: instance property of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  
<a name="module_app-usage-stats--AppUsageStats+hit"></a>

#### usage.hit(dimension, metric, [options])
Track a hit. The magic dimension `name` will be mapped to a GA screenView.

**Kind**: instance method of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  

| Param | Type | Description |
| --- | --- | --- |
| dimension | <code>Array.&lt;object&gt;</code> | dimension-value maps |
| metric | <code>Array.&lt;object&gt;</code> | metric-value maps |
| [options] | <code>object</code> |  |
| [options.timeout] | <code>number</code> | A maxium wait period in ms, after which any pending requests will be aborted. |
| [options.send] | <code>number</code> | Each hit will be sent. |

<a name="module_app-usage-stats--AppUsageStats+save"></a>

#### usage.save()
Save stats

**Kind**: instance method of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  
<a name="module_app-usage-stats--AppUsageStats+saveSync"></a>

#### usage.saveSync()
Save stats sync.

**Kind**: instance method of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  
<a name="module_app-usage-stats--AppUsageStats+load"></a>

#### usage.load()
Load stats

**Kind**: instance method of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  
<a name="module_app-usage-stats--AppUsageStats+loadSync"></a>

#### usage.loadSync()
Loads stats sync.

**Kind**: instance method of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  
<a name="module_app-usage-stats--AppUsageStats+send"></a>

#### usage.send([options])
Send and reset stats.

**Kind**: instance method of <code>[AppUsageStats](#exp_module_app-usage-stats--AppUsageStats)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> |  |
| [options.timeout] | <code>number</code> | A maxium wait period in ms, after which any pending requests will be aborted. |


* * *

&copy; 2016 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
