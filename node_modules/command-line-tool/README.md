[![view on npm](http://img.shields.io/npm/v/command-line-tool.svg)](https://www.npmjs.org/package/command-line-tool)
[![npm module downloads](http://img.shields.io/npm/dt/command-line-tool.svg)](https://www.npmjs.org/package/command-line-tool)
[![Build Status](https://travis-ci.org/75lb/command-line-tool.svg?branch=master)](https://travis-ci.org/75lb/command-line-tool)
[![Dependency Status](https://david-dm.org/75lb/command-line-tool.svg)](https://david-dm.org/75lb/command-line-tool)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_command-line-tool"></a>

## command-line-tool
Some conventional operations used in command-line tools.


* [command-line-tool](#module_command-line-tool)
    * [CommandLineTool](#exp_module_command-line-tool--CommandLineTool) ⏏
        * [.stop([message])](#module_command-line-tool--CommandLineTool+stop)
        * [.printError(message)](#module_command-line-tool--CommandLineTool+printError)
        * [.halt([err], [options])](#module_command-line-tool--CommandLineTool+halt)
        * [.getCli(definitions, [usageSections], [argv])](#module_command-line-tool--CommandLineTool+getCli) ⇒ <code>object</code>

<a name="exp_module_command-line-tool--CommandLineTool"></a>

### CommandLineTool ⏏
**Kind**: Exported class  
<a name="module_command-line-tool--CommandLineTool+stop"></a>

#### tool.stop([message])
Print the supplied messages then stop the process (no exit code).

**Kind**: instance method of <code>[CommandLineTool](#exp_module_command-line-tool--CommandLineTool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [message] | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | One or more messages to be written to stderr before exiting. May contain `ansi.format` markup. |

<a name="module_command-line-tool--CommandLineTool+printError"></a>

#### tool.printError(message)
Prints one or more strings in red to stderr.

**Kind**: instance method of <code>[CommandLineTool](#exp_module_command-line-tool--CommandLineTool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | input message(s) |

<a name="module_command-line-tool--CommandLineTool+halt"></a>

#### tool.halt([err], [options])
Stop the process with an error message.

**Kind**: instance method of <code>[CommandLineTool](#exp_module_command-line-tool--CommandLineTool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [err] | <code>Error</code> | the error instance |
| [options] | <code>object</code> |  |
| [options.exitCode] | <code>number</code> | defaults to 1 |
| [options.stack] | <code>boolean</code> | defaults to false |

<a name="module_command-line-tool--CommandLineTool+getCli"></a>

#### tool.getCli(definitions, [usageSections], [argv]) ⇒ <code>object</code>
Parse the command-line options.

**Kind**: instance method of <code>[CommandLineTool](#exp_module_command-line-tool--CommandLineTool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| definitions | <code>Array.&lt;OptionDefinitions&gt;</code> | to be passed to command-line-args |
| [usageSections] | <code>Array.&lt;section&gt;</code> | to be passed to command-line-usage |
| [argv] | <code>Array.&lt;string&gt;</code> | If supplied, this `argv` array is parsed instead of `process.argv`. |


* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
