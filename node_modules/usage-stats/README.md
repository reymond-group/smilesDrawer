[![view on npm](http://img.shields.io/npm/v/usage-stats.svg)](https://www.npmjs.org/package/usage-stats)
[![npm module downloads](http://img.shields.io/npm/dt/usage-stats.svg)](https://www.npmjs.org/package/usage-stats)
[![Build Status](https://travis-ci.org/75lb/usage-stats.svg?branch=master)](https://travis-ci.org/75lb/usage-stats)
[![Coverage Status](https://coveralls.io/repos/github/75lb/usage-stats/badge.svg?branch=master)](https://coveralls.io/github/75lb/usage-stats?branch=master)
[![Dependency Status](https://david-dm.org/75lb/usage-stats.svg)](https://david-dm.org/75lb/usage-stats)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# usage-stats

A minimal, offline-friendly [Google Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/) client for tracking usage statistics in shell and javascript applications.

This is a low-level API client, it doesn't hold any opinion of how usage tracking should be done. If you're looking for a convention which leverages the power and flexibility of [Custom Metrics and Dimensions](https://support.google.com/analytics/answer/2709828?hl=en&ref_topic=2709827), take a look at [app-usage-stats](https://github.com/75lb/app-usage-stats).

## Synopsis

### Command line

Tracking statistics in shell scripts:

```sh
# Track an event: category 'Backup', action 'start'
usage-stats event --tid UA-98765432-1 --ec Backup --ea start

# Perform the backup
cp files/** backup/

# Track an event: category 'Backup', action 'complete'
usage-stats event --tid UA-98765432-1 --ec Backup --ea complete
```

### API

The most trivial example.

```js
const UsageStats = require('usage-stats')
const usageStats = new UsageStats('UA-98765432-1', { an: 'example' })

usageStats.screenView('screen name')
usageStats.event('category', 'action')
usageStats.send()
```

More realistic usage in a server application:

```js
const UsageStats = require('usage-stats')
const usageStats = new UsageStats('UA-98765432-1', {
  an: 'encode-video',
  av: '1.0.0'
})

// start a new session
usageStats.start()

// user set two options..
usageStats.event('option', 'verbose-level', 'infinite')
usageStats.event('option', 'preset', 'iPod')

try {
  // Begin. Track as a screenView.
  usageStats.screenView('encoding')
  beginEncoding(options)
} catch (err) {
  // Exception tracking
  usageStats.exception(err.message, true)
}

// finished - mark the session as complete
// and send stats (or store if offline).
usageStats.end().send()
```

## Protocol Parameters

See [here](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters) for the full list of Google Analytics Measurement Protocol parameters.

### Sent by default

All parameters are send on demand, beside this list.

* Operating System version (sent in the UserAgent)
* [Client ID](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cid) (a random UUID, generated once per OS user and stored)
* [Language](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ul) (`process.env.LANG`, if set)
* [Screen resolution](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sr) (terminal rows by columns, by default)

## CLI Reference

To install the command line client:

```
$ npm install -g usage-stats
```

Running the tool with no arguments will print the usage guide:

<pre><code><strong>usage-stats</strong>

  A minimal, offline-friendly Google Analytics Measurement Protocol client for
  tracking usage statistics in shell and javascript applications.

<strong>Synopsis</strong>

  $ usage-stats &lt;command&gt; &lt;command-options&gt;
  $ usage-stats &lt;command&gt; --help

<strong>Commands</strong>

  screenview   Track a screenview
  event        Track an event
  exception    Track an exception
</code></pre>

## API Reference

**Kind**: Exported class  
* [UsageStats](#exp_module_usage-stats--UsageStats) ⏏
    * [new UsageStats(trackingId, [options])](#new_module_usage-stats--UsageStats_new)
    * [.dir](#module_usage-stats--UsageStats.UsageStats+dir) : <code>string</code>
    * [.defaults](#module_usage-stats--UsageStats.UsageStats+defaults) : <code>Map</code>
    * [.start([sessionParams])](#module_usage-stats--UsageStats+start) ↩︎
    * [.end([sessionParams])](#module_usage-stats--UsageStats+end) ↩︎
    * [.disable()](#module_usage-stats--UsageStats+disable) ↩︎
    * [.enable()](#module_usage-stats--UsageStats+enable) ↩︎
    * [.event(category, action, [options])](#module_usage-stats--UsageStats+event) ⇒ <code>Map</code>
    * [.screenView(name, [options])](#module_usage-stats--UsageStats+screenView) ⇒ <code>Map</code>
    * [.exception([options])](#module_usage-stats--UsageStats+exception) ⇒ <code>Map</code>
    * [.send([options])](#module_usage-stats--UsageStats+send) ⇒ <code>Promise</code>
    * [.debug()](#module_usage-stats--UsageStats+debug) ⇒ <code>Promise</code>
    * [.abort()](#module_usage-stats--UsageStats+abort) ↩︎

<a name="new_module_usage-stats--UsageStats_new"></a>

### new UsageStats(trackingId, [options])

| Param | Type | Description |
| --- | --- | --- |
| trackingId | <code>string</code> | Google Analytics tracking ID (required). |
| [options] | <code>object</code> |  |
| [options.an] | <code>string</code> | App name |
| [options.av] | <code>string</code> | App version |
| [options.lang] | <code>string</code> | Language. Defaults to `process.env.LANG`. |
| [options.sr] | <code>string</code> | Screen resolution. Defaults to `${process.stdout.rows}x${process.stdout.columns}`. |
| [options.ua] | <code>string</code> | User Agent string to use. |
| [options.dir] | <code>string</code> | Path of the directory used for persisting clientID and queue. Defaults to `~/.usage-stats`. |
| [options.url] | <code>string</code> | Defaults to `'https://www.google-analytics.com/batch'`. |
| [options.debugUrl] | <code>string</code> | Defaults to `'https://www.google-analytics.com/debug/collect'`. |

**Example**  
```js
const usageStats = new UsageStats('UA-98765432-1', {
  an: 'sick app',
  av: '1.0.0'
})
```
<a name="module_usage-stats--UsageStats.UsageStats+dir"></a>

### usageStats.dir : <code>string</code>
Cache directory. Defaults to `~/.usage-stats`.

**Kind**: instance property of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
<a name="module_usage-stats--UsageStats.UsageStats+defaults"></a>

### usageStats.defaults : <code>Map</code>
A list of parameters to be to sent with every hit.

**Kind**: instance property of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
**Example**  
```js
usageStats.defaults
  .set('cd1', process.version)
  .set('cd2', os.type())
  .set('cd3', os.release())
  .set('cd4', 'api')
```
<a name="module_usage-stats--UsageStats+start"></a>

### usageStats.start([sessionParams]) ↩︎
Starts the [session](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sc).

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [sessionParams] | <code>Array.&lt;Map&gt;</code> | An optional map of paramaters to send with each hit in the sesison. |

<a name="module_usage-stats--UsageStats+end"></a>

### usageStats.end([sessionParams]) ↩︎
Ends the [session](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sc).

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [sessionParams] | <code>Array.&lt;Map&gt;</code> | An optional map of paramaters to send with the final hit of this sesison. |

<a name="module_usage-stats--UsageStats+disable"></a>

### usageStats.disable() ↩︎
Disable the module. While disabled, all operations are no-ops.

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
**Chainable**  
<a name="module_usage-stats--UsageStats+enable"></a>

### usageStats.enable() ↩︎
Re-enable the module.

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
**Chainable**  
<a name="module_usage-stats--UsageStats+event"></a>

### usageStats.event(category, action, [options]) ⇒ <code>Map</code>
Track an event. All event hits are queued until `.send()` is called.

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  

| Param | Type | Description |
| --- | --- | --- |
| category | <code>string</code> | Event category (required). |
| action | <code>string</code> | Event action (required). |
| [options] | <code>option</code> |  |
| [options.el] | <code>string</code> | Event label |
| [options.ev] | <code>string</code> | Event value |
| [options.hitParams] | <code>Array.&lt;map&gt;</code> | One or more additional params to send with the hit. |

<a name="module_usage-stats--UsageStats+screenView"></a>

### usageStats.screenView(name, [options]) ⇒ <code>Map</code>
Track a screenview. All screenview hits are queued until `.send()` is called. Returns the hit instance.

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Screen name |
| [options] | <code>object</code> |  |
| [options.hitParams] | <code>Array.&lt;map&gt;</code> | One or more additional params to set on the hit. |

<a name="module_usage-stats--UsageStats+exception"></a>

### usageStats.exception([options]) ⇒ <code>Map</code>
Track a exception. All exception hits are queued until `.send()` is called.

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | optional params |
| [options.exd] | <code>string</code> | Error message |
| [options.exf] | <code>boolean</code> | Set true if the exception was fatal |
| [options.hitParams] | <code>Array.&lt;map&gt;</code> | One or more additional params to set on the hit. |

<a name="module_usage-stats--UsageStats+send"></a>

### usageStats.send([options]) ⇒ <code>Promise</code>
Send queued stats using as few requests as possible (typically a single request - a max of 20 events/screenviews may be sent per request). If offline, the stats will be stored and re-tried on next invocation.

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
**Fulfil**: <code>response[]</code> - array of responses. Each response has `data` and the original node `res`.  
**Reject**: <code>Error</code> - Rejects with the first error encountered. The error is a standard node http error with a `name` of `request-fail` and a `hits` property showing what failed to send.  

| Param | Type |
| --- | --- |
| [options] | <code>object</code> | 
| [options.timeout] | <code>number</code> | 

<a name="module_usage-stats--UsageStats+debug"></a>

### usageStats.debug() ⇒ <code>Promise</code>
Send any hits (including queued) to the GA [validation server](https://developers.google.com/analytics/devguides/collection/protocol/v1/validating-hits), fulfilling with the result.

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
**Fulfil**: <code>Response[]</code>  
**Reject**: <code>Error</code> - Error instance includes `hits`.  
<a name="module_usage-stats--UsageStats+abort"></a>

### usageStats.abort() ↩︎
Aborts the in-progress .send() operation, queuing any unsent hits.

**Kind**: instance method of <code>[UsageStats](#exp_module_usage-stats--UsageStats)</code>  
**Chainable**  

* * *

&copy; 2016 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
