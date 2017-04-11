[![view on npm](http://img.shields.io/npm/v/cli-commands.svg)](https://www.npmjs.org/package/cli-commands)
[![npm module downloads](http://img.shields.io/npm/dt/cli-commands.svg)](https://www.npmjs.org/package/cli-commands)
[![Build Status](https://travis-ci.org/75lb/cli-commands.svg?branch=master)](https://travis-ci.org/75lb/cli-commands)
[![Dependency Status](https://david-dm.org/75lb/cli-commands.svg)](https://david-dm.org/75lb/cli-commands)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_cli-commands"></a>

## cli-commands
A convention for building command-driven CLI apps.

**Example**  
```js
const cliCommands = new CliCommmands([
 { name: 'send', description: 'Send something', command: require('send-command').create() },
 { name: 'logs', description: 'View the logs', command: require('logs-command').create() },
])
```

* [cli-commands](#module_cli-commands)
    * [CliCommmands](#exp_module_cli-commands--CliCommmands) ⏏
        * [new CliCommmands(commandDefinitions)](#new_module_cli-commands--CliCommmands_new)

<a name="exp_module_cli-commands--CliCommmands"></a>

### CliCommmands ⏏
**Kind**: Exported class  
<a name="new_module_cli-commands--CliCommmands_new"></a>

#### new CliCommmands(commandDefinitions)

| Param | Type | Description |
| --- | --- | --- |
| commandDefinitions | <code>Array.&lt;object&gt;</code> | One or more command definitions. |


* * *

&copy; 2016 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
