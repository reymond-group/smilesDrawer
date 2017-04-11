# Promise.prototype.finally [ ![Codeship Status for matthew-andrews/Promise.prototype.finally](https://codeship.io/projects/d2ed45d0-3364-0132-3c6b-26237c03a86a/status)](https://codeship.io/projects/40589)

A polyfill for `Promise.prototype.finally`.  See docs on what finally is on [your favourite pre-ES6 promise library](https://github.com/tildeio/rsvp.js/blob/master/README.md#finally).

Warning: This micro-library doesn't force you to use any particular Promise implementation by using whatever `Promise` has been defined as globally.  This is so that you may use any ES6 standard Promise compliant library - or, of course, native ES6 Promises.

If you're running the code on a browser or node version that doesn't include native promises you will need to include a polyfill. The following polyfills are tested as part of this module's test suite:-

- [Jake Archibald](https://twitter.com/jaffathecake)'s [ES6 Promise library](https://github.com/jakearchibald/es6-promise) (which is actually adapted from [Stefan Penner](https://twitter.com/stefanpenner)'s [RSVP.js](https://github.com/tildeio/rsvp.js)). -  `require('es6-promise').polyfill();`

## Installation

```
npm install promise.prototype.finally --save
```

## Examples

```js
require('es6-promise').polyfill();
require('promise.prototype.finally');

Promise.resolve(6)
	.finally(function() {
		console.log('this will always be called');
	});

Promise.reject(6)
	.finally(function() {
		console.log('this will always be called');
	});
```

## Credits and collaboration

The lead developer of **Promise.prototype.finally** is [Matt Andrews](http://twitter.com/andrewsmatt) at FT, the code is based on [a snippet](https://github.com/domenic/promises-unwrapping/issues/18#issuecomment-57801572) by [Stefan Penner](https://twitter.com/stefanpenner) - used [with permission](https://twitter.com/stefanpenner/status/520904347073667072). All open source code released by FT Labs is licenced under the MIT licence. We welcome comments, feedback and suggestions.  Please feel free to raise an issue or pull request.
