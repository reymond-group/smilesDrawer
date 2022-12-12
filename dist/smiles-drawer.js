(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

//@ts-check
const Drawer = require('./src/Drawer');

const Parser = require('./src/Parser');

const ReactionParser = require('./src/ReactionParser');

const SvgDrawer = require('./src/SvgDrawer');

const ReactionDrawer = require('./src/ReactionDrawer');

const SmiDrawer = require('./src/SmilesDrawer');

const GaussDrawer = require('./src/GaussDrawer'); // Detect SSR (server side rendering)


var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
/**
 * The SmilesDrawer namespace.
 * @typicalname SmilesDrawer
 */

var SmilesDrawer = {
  Version: '1.0.0'
};
SmilesDrawer.Drawer = Drawer;
SmilesDrawer.Parser = Parser;
SmilesDrawer.SvgDrawer = SvgDrawer;
SmilesDrawer.ReactionDrawer = ReactionDrawer;
SmilesDrawer.ReactionParser = ReactionParser;
SmilesDrawer.GaussDrawer = GaussDrawer;
/**
* Cleans a SMILES string (removes non-valid characters)
*
* @static
* @param {String} smiles A SMILES string.
* @returns {String} The clean SMILES string.
*/

SmilesDrawer.clean = function (smiles) {
  return smiles.replace(/[^A-Za-z0-9@\.\+\-\?!\(\)\[\]\{\}/\\=#\$:\*]/g, '');
};
/**
* Applies the smiles drawer draw function to each canvas element that has a smiles string in the data-smiles attribute.
*
* @static
* @param {Object} options SmilesDrawer options.
* @param {String} [selector='canvas[data-smiles]'] Selectors for the draw areas (canvas elements).
* @param {String} [themeName='light'] The theme to apply.
* @param {Function} [onError='null'] A callback function providing an error object.
*/


SmilesDrawer.apply = function (options, selector = 'canvas[data-smiles]', themeName = 'light', onError = null) {
  let smilesDrawer = new Drawer(options);
  let elements = document.querySelectorAll(selector);

  for (var i = 0; i < elements.length; i++) {
    let element = elements[i];
    SmilesDrawer.parse(element.getAttribute('data-smiles'), function (tree) {
      smilesDrawer.draw(tree, element, themeName, false);
    }, function (err) {
      if (onError) {
        onError(err);
      }
    });
  }
};
/**
* Parses the entered smiles string.
* 
* @static
* @param {String} smiles A SMILES string.
* @param {Function} successCallback A callback that is called on success with the parse tree.
* @param {Function} errorCallback A callback that is called with the error object on error.
*/


SmilesDrawer.parse = function (smiles, successCallback, errorCallback) {
  try {
    if (successCallback) {
      successCallback(Parser.parse(smiles));
    }
  } catch (err) {
    if (errorCallback) {
      errorCallback(err);
    }
  }
};
/**
* Parses the entered reaction smiles string.
* 
* @static
* @param {String} reactionSmiles A reaction SMILES string.
* @param {Function} successCallback A callback that is called on success with the parse tree.
* @param {Function} errorCallback A callback that is called with the error object on error.
*/


SmilesDrawer.parseReaction = function (reactionSmiles, successCallback, errorCallback) {
  try {
    if (successCallback) {
      successCallback(ReactionParser.parse(reactionSmiles));
    }
  } catch (err) {
    if (errorCallback) {
      errorCallback(err);
    }
  }
};

if (canUseDOM) {
  window.SmilesDrawer = SmilesDrawer;
  window.SmiDrawer = SmiDrawer;
} // Attach SmiDrawer to SmilesDrawer for npm imports


SmilesDrawer.SmiDrawer = SmiDrawer; // There be dragons (polyfills)

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function (value) {
      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this); // Steps 3-5.

      var len = O.length >>> 0; // Steps 6-7.

      var start = arguments[1];
      var relativeStart = start >> 0; // Step 8.

      var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.

      var end = arguments[2];
      var relativeEnd = end === undefined ? len : end >> 0; // Step 11.

      var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.

      while (k < final) {
        O[k] = value;
        k++;
      } // Step 13.


      return O;
    }
  });
}

module.exports = SmilesDrawer;

},{"./src/Drawer":6,"./src/GaussDrawer":10,"./src/Parser":15,"./src/ReactionDrawer":18,"./src/ReactionParser":19,"./src/SmilesDrawer":23,"./src/SvgDrawer":24}],2:[function(require,module,exports){
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.chroma = factory());
})(this, (function () { 'use strict';

    var limit$2 = function (x, min, max) {
        if ( min === void 0 ) min=0;
        if ( max === void 0 ) max=1;

        return x < min ? min : x > max ? max : x;
    };

    var limit$1 = limit$2;

    var clip_rgb$3 = function (rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i=0; i<=3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                rgb[i] = limit$1(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit$1(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    var classToType = {};
    for (var i$1 = 0, list$1 = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i$1 < list$1.length; i$1 += 1) {
        var name = list$1[i$1];

        classToType[("[object " + name + "]")] = name.toLowerCase();
    }
    var type$p = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };

    var type$o = type$p;

    var unpack$B = function (args, keyOrder) {
        if ( keyOrder === void 0 ) keyOrder=null;

    	// if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) { return Array.prototype.slice.call(args); }
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
    	if (type$o(args[0]) == 'object' && keyOrder) {
    		return keyOrder.split('')
    			.filter(function (k) { return args[0][k] !== undefined; })
    			.map(function (k) { return args[0][k]; });
    	}
    	// otherwise we just return the first argument
    	// (which we suppose is an array of args)
        return args[0];
    };

    var type$n = type$p;

    var last$4 = function (args) {
        if (args.length < 2) { return null; }
        var l = args.length-1;
        if (type$n(args[l]) == 'string') { return args[l].toLowerCase(); }
        return null;
    };

    var PI$2 = Math.PI;

    var utils = {
    	clip_rgb: clip_rgb$3,
    	limit: limit$2,
    	type: type$p,
    	unpack: unpack$B,
    	last: last$4,
    	PI: PI$2,
    	TWOPI: PI$2*2,
    	PITHIRD: PI$2/3,
    	DEG2RAD: PI$2 / 180,
    	RAD2DEG: 180 / PI$2
    };

    var input$h = {
    	format: {},
    	autodetect: []
    };

    var last$3 = utils.last;
    var clip_rgb$2 = utils.clip_rgb;
    var type$m = utils.type;
    var _input = input$h;

    var Color$D = function Color() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var me = this;
        if (type$m(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }

        // last argument could be the mode
        var mode = last$3(args);
        var autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!_input.sorted) {
                _input.autodetect = _input.autodetect.sort(function (a,b) { return b.p - a.p; });
                _input.sorted = true;
            }
            // auto-detect format
            for (var i = 0, list = _input.autodetect; i < list.length; i += 1) {
                var chk = list[i];

                mode = chk.test.apply(chk, args);
                if (mode) { break; }
            }
        }

        if (_input.format[mode]) {
            var rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb$2(rgb);
        } else {
            throw new Error('unknown format: '+args);
        }

        // add alpha channel
        if (me._rgb.length === 3) { me._rgb.push(1); }
    };

    Color$D.prototype.toString = function toString () {
        if (type$m(this.hex) == 'function') { return this.hex(); }
        return ("[" + (this._rgb.join(',')) + "]");
    };

    var Color_1 = Color$D;

    var chroma$k = function () {
    	var args = [], len = arguments.length;
    	while ( len-- ) args[ len ] = arguments[ len ];

    	return new (Function.prototype.bind.apply( chroma$k.Color, [ null ].concat( args) ));
    };

    chroma$k.Color = Color_1;
    chroma$k.version = '2.4.2';

    var chroma_1 = chroma$k;

    var unpack$A = utils.unpack;
    var max$2 = Math.max;

    var rgb2cmyk$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$A(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max$2(r,max$2(g,b));
        var f = k < 1 ? 1 / (1-k) : 0;
        var c = (1-r-k) * f;
        var m = (1-g-k) * f;
        var y = (1-b-k) * f;
        return [c,m,y,k];
    };

    var rgb2cmyk_1 = rgb2cmyk$1;

    var unpack$z = utils.unpack;

    var cmyk2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$z(args, 'cmyk');
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) { return [0,0,0,alpha]; }
        return [
            c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
            m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
            y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
            alpha
        ];
    };

    var cmyk2rgb_1 = cmyk2rgb;

    var chroma$j = chroma_1;
    var Color$C = Color_1;
    var input$g = input$h;
    var unpack$y = utils.unpack;
    var type$l = utils.type;

    var rgb2cmyk = rgb2cmyk_1;

    Color$C.prototype.cmyk = function() {
        return rgb2cmyk(this._rgb);
    };

    chroma$j.cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$C, [ null ].concat( args, ['cmyk']) ));
    };

    input$g.format.cmyk = cmyk2rgb_1;

    input$g.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$y(args, 'cmyk');
            if (type$l(args) === 'array' && args.length === 4) {
                return 'cmyk';
            }
        }
    });

    var unpack$x = utils.unpack;
    var last$2 = utils.last;
    var rnd = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    var hsl2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hsla = unpack$x(args, 'hsla');
        var mode = last$2(args) || 'lsa';
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1]*100) + '%';
        hsla[2] = rnd(hsla[2]*100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return (mode + "(" + (hsla.join(',')) + ")");
    };

    var hsl2css_1 = hsl2css$1;

    var unpack$w = utils.unpack;

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    var rgb2hsl$3 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$w(args, 'rgba');
        var r = args[0];
        var g = args[1];
        var b = args[2];

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        var l = (max + min) / 2;
        var s, h;

        if (max === min){
            s = 0;
            h = Number.NaN;
        } else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }

        if (r == max) { h = (g - b) / (max - min); }
        else if (g == max) { h = 2 + (b - r) / (max - min); }
        else if (b == max) { h = 4 + (r - g) / (max - min); }

        h *= 60;
        if (h < 0) { h += 360; }
        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
        return [h,s,l];
    };

    var rgb2hsl_1 = rgb2hsl$3;

    var unpack$v = utils.unpack;
    var last$1 = utils.last;
    var hsl2css = hsl2css_1;
    var rgb2hsl$2 = rgb2hsl_1;
    var round$6 = Math.round;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    var rgb2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$v(args, 'rgba');
        var mode = last$1(args) || 'rgb';
        if (mode.substr(0,3) == 'hsl') {
            return hsl2css(rgb2hsl$2(rgba), mode);
        }
        rgba[0] = round$6(rgba[0]);
        rgba[1] = round$6(rgba[1]);
        rgba[2] = round$6(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
    };

    var rgb2css_1 = rgb2css$1;

    var unpack$u = utils.unpack;
    var round$5 = Math.round;

    var hsl2rgb$1 = function () {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$u(args, 'hsl');
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r,g,b;
        if (s === 0) {
            r = g = b = l*255;
        } else {
            var t3 = [0,0,0];
            var c = [0,0,0];
            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1/3;
            t3[1] = h_;
            t3[2] = h_ - 1/3;
            for (var i=0; i<3; i++) {
                if (t3[i] < 0) { t3[i] += 1; }
                if (t3[i] > 1) { t3[i] -= 1; }
                if (6 * t3[i] < 1)
                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
                else if (2 * t3[i] < 1)
                    { c[i] = t2; }
                else if (3 * t3[i] < 2)
                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
                else
                    { c[i] = t1; }
            }
            (assign = [round$5(c[0]*255),round$5(c[1]*255),round$5(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r,g,b,args[3]];
        }
        return [r,g,b,1];
    };

    var hsl2rgb_1 = hsl2rgb$1;

    var hsl2rgb = hsl2rgb_1;
    var input$f = input$h;

    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

    var round$4 = Math.round;

    var css2rgb$1 = function (css) {
        css = css.toLowerCase().trim();
        var m;

        if (input$f.format.named) {
            try {
                return input$f.format.named(css);
            } catch (e) {
                // eslint-disable-next-line
            }
        }

        // rgb(250,20,0)
        if ((m = css.match(RE_RGB))) {
            var rgb = m.slice(1,4);
            for (var i=0; i<3; i++) {
                rgb[i] = +rgb[i];
            }
            rgb[3] = 1;  // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA))) {
            var rgb$1 = m.slice(1,5);
            for (var i$1=0; i$1<4; i$1++) {
                rgb$1[i$1] = +rgb$1[i$1];
            }
            return rgb$1;
        }

        // rgb(100%,0%,0%)
        if ((m = css.match(RE_RGB_PCT))) {
            var rgb$2 = m.slice(1,4);
            for (var i$2=0; i$2<3; i$2++) {
                rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
            }
            rgb$2[3] = 1;  // default alpha
            return rgb$2;
        }

        // rgba(100%,0%,0%,0.4)
        if ((m = css.match(RE_RGBA_PCT))) {
            var rgb$3 = m.slice(1,5);
            for (var i$3=0; i$3<3; i$3++) {
                rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
            }
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL))) {
            var hsl = m.slice(1,4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA))) {
            var hsl$1 = m.slice(1,4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb(hsl$1);
            rgb$5[3] = +m[4];  // default alpha = 1
            return rgb$5;
        }
    };

    css2rgb$1.test = function (s) {
        return RE_RGB.test(s) ||
            RE_RGBA.test(s) ||
            RE_RGB_PCT.test(s) ||
            RE_RGBA_PCT.test(s) ||
            RE_HSL.test(s) ||
            RE_HSLA.test(s);
    };

    var css2rgb_1 = css2rgb$1;

    var chroma$i = chroma_1;
    var Color$B = Color_1;
    var input$e = input$h;
    var type$k = utils.type;

    var rgb2css = rgb2css_1;
    var css2rgb = css2rgb_1;

    Color$B.prototype.css = function(mode) {
        return rgb2css(this._rgb, mode);
    };

    chroma$i.css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$B, [ null ].concat( args, ['css']) ));
    };

    input$e.format.css = css2rgb;

    input$e.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$k(h) === 'string' && css2rgb.test(h)) {
                return 'css';
            }
        }
    });

    var Color$A = Color_1;
    var chroma$h = chroma_1;
    var input$d = input$h;
    var unpack$t = utils.unpack;

    input$d.format.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$t(args, 'rgba');
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };

    chroma$h.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$A, [ null ].concat( args, ['gl']) ));
    };

    Color$A.prototype.gl = function() {
        var rgb = this._rgb;
        return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
    };

    var unpack$s = utils.unpack;

    var rgb2hcg$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$s(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) {
            h = Number.NaN;
        } else {
            if (r === max) { h = (g - b) / delta; }
            if (g === max) { h = 2+(b - r) / delta; }
            if (b === max) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, c, _g];
    };

    var rgb2hcg_1 = rgb2hcg$1;

    var unpack$r = utils.unpack;
    var floor$3 = Math.floor;

    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */

    var hcg2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$r(args, 'hcg');
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r,g,b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
            r = g = b = _g;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;
            var i = floor$3(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var hcg2rgb_1 = hcg2rgb;

    var unpack$q = utils.unpack;
    var type$j = utils.type;
    var chroma$g = chroma_1;
    var Color$z = Color_1;
    var input$c = input$h;

    var rgb2hcg = rgb2hcg_1;

    Color$z.prototype.hcg = function() {
        return rgb2hcg(this._rgb);
    };

    chroma$g.hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$z, [ null ].concat( args, ['hcg']) ));
    };

    input$c.format.hcg = hcg2rgb_1;

    input$c.autodetect.push({
        p: 1,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$q(args, 'hcg');
            if (type$j(args) === 'array' && args.length === 3) {
                return 'hcg';
            }
        }
    });

    var unpack$p = utils.unpack;
    var last = utils.last;
    var round$3 = Math.round;

    var rgb2hex$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$p(args, 'rgba');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last(args) || 'auto';
        if (a === undefined) { a = 1; }
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = '0' + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba': return ("#" + str + hxa);
            case 'argb': return ("#" + hxa + str);
            default: return ("#" + str);
        }
    };

    var rgb2hex_1 = rgb2hex$2;

    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    var hex2rgb$1 = function (hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [r,g,b,1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substr(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [r$1,g$1,b$1,a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(("unknown hex color: " + hex));
    };

    var hex2rgb_1 = hex2rgb$1;

    var chroma$f = chroma_1;
    var Color$y = Color_1;
    var type$i = utils.type;
    var input$b = input$h;

    var rgb2hex$1 = rgb2hex_1;

    Color$y.prototype.hex = function(mode) {
        return rgb2hex$1(this._rgb, mode);
    };

    chroma$f.hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$y, [ null ].concat( args, ['hex']) ));
    };

    input$b.format.hex = hex2rgb_1;
    input$b.autodetect.push({
        p: 4,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$i(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
                return 'hex';
            }
        }
    });

    var unpack$o = utils.unpack;
    var TWOPI$2 = utils.TWOPI;
    var min$2 = Math.min;
    var sqrt$4 = Math.sqrt;
    var acos = Math.acos;

    var rgb2hsi$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */
        var ref = unpack$o(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min$2(r,g,b);
        var i = (r+g+b) / 3;
        var s = i > 0 ? 1 - min_/i : 0;
        if (s === 0) {
            h = NaN;
        } else {
            h = ((r-g)+(r-b)) / 2;
            h /= sqrt$4((r-g)*(r-g) + (r-b)*(g-b));
            h = acos(h);
            if (b > g) {
                h = TWOPI$2 - h;
            }
            h /= TWOPI$2;
        }
        return [h*360,s,i];
    };

    var rgb2hsi_1 = rgb2hsi$1;

    var unpack$n = utils.unpack;
    var limit = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos$4 = Math.cos;

    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */
    var hsi2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */
        args = unpack$n(args, 'hsi');
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r,g,b;

        if (isNaN(h)) { h = 0; }
        if (isNaN(s)) { s = 0; }
        // normalize hue
        if (h > 360) { h -= 360; }
        if (h < 0) { h += 360; }
        h /= 360;
        if (h < 1/3) {
            b = (1-s)/3;
            r = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            g = 1 - (b+r);
        } else if (h < 2/3) {
            h -= 1/3;
            r = (1-s)/3;
            g = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            b = 1 - (r+g);
        } else {
            h -= 2/3;
            g = (1-s)/3;
            b = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            r = 1 - (g+b);
        }
        r = limit(i*r*3);
        g = limit(i*g*3);
        b = limit(i*b*3);
        return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
    };

    var hsi2rgb_1 = hsi2rgb;

    var unpack$m = utils.unpack;
    var type$h = utils.type;
    var chroma$e = chroma_1;
    var Color$x = Color_1;
    var input$a = input$h;

    var rgb2hsi = rgb2hsi_1;

    Color$x.prototype.hsi = function() {
        return rgb2hsi(this._rgb);
    };

    chroma$e.hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$x, [ null ].concat( args, ['hsi']) ));
    };

    input$a.format.hsi = hsi2rgb_1;

    input$a.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$m(args, 'hsi');
            if (type$h(args) === 'array' && args.length === 3) {
                return 'hsi';
            }
        }
    });

    var unpack$l = utils.unpack;
    var type$g = utils.type;
    var chroma$d = chroma_1;
    var Color$w = Color_1;
    var input$9 = input$h;

    var rgb2hsl$1 = rgb2hsl_1;

    Color$w.prototype.hsl = function() {
        return rgb2hsl$1(this._rgb);
    };

    chroma$d.hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$w, [ null ].concat( args, ['hsl']) ));
    };

    input$9.format.hsl = hsl2rgb_1;

    input$9.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$l(args, 'hsl');
            if (type$g(args) === 'array' && args.length === 3) {
                return 'hsl';
            }
        }
    });

    var unpack$k = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;

    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */
    var rgb2hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$k(args, 'rgb');
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h,s,v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) { h = (g - b) / delta; }
            if (g === max_) { h = 2+(b - r) / delta; }
            if (b === max_) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, s, v]
    };

    var rgb2hsv$1 = rgb2hsl;

    var unpack$j = utils.unpack;
    var floor$2 = Math.floor;

    var hsv2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$j(args, 'hsv');
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r,g,b;
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;

            var i = floor$2(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));

            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r,g,b,args.length > 3?args[3]:1];
    };

    var hsv2rgb_1 = hsv2rgb;

    var unpack$i = utils.unpack;
    var type$f = utils.type;
    var chroma$c = chroma_1;
    var Color$v = Color_1;
    var input$8 = input$h;

    var rgb2hsv = rgb2hsv$1;

    Color$v.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };

    chroma$c.hsv = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$v, [ null ].concat( args, ['hsv']) ));
    };

    input$8.format.hsv = hsv2rgb_1;

    input$8.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$i(args, 'hsv');
            if (type$f(args) === 'array' && args.length === 3) {
                return 'hsv';
            }
        }
    });

    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    var LAB_CONSTANTS$3 = labConstants;
    var unpack$h = utils.unpack;
    var pow$a = Math.pow;

    var rgb2lab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$h(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r,g,b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };

    var rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) { return r / 12.92; }
        return pow$a((r + 0.055) / 1.055, 2.4);
    };

    var xyz_lab = function (t) {
        if (t > LAB_CONSTANTS$3.t3) { return pow$a(t, 1 / 3); }
        return t / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
    };

    var rgb2xyz = function (r,g,b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS$3.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS$3.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS$3.Zn);
        return [x,y,z];
    };

    var rgb2lab_1 = rgb2lab$2;

    var LAB_CONSTANTS$2 = labConstants;
    var unpack$g = utils.unpack;
    var pow$9 = Math.pow;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$g(args, 'lab');
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x,y,z, r,g,b_;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = LAB_CONSTANTS$2.Yn * lab_xyz(y);
        x = LAB_CONSTANTS$2.Xn * lab_xyz(x);
        z = LAB_CONSTANTS$2.Zn * lab_xyz(z);

        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

        return [r,g,b_,args.length > 3 ? args[3] : 1];
    };

    var xyz_rgb = function (r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$9(r, 1 / 2.4) - 0.055)
    };

    var lab_xyz = function (t) {
        return t > LAB_CONSTANTS$2.t1 ? t * t * t : LAB_CONSTANTS$2.t2 * (t - LAB_CONSTANTS$2.t0)
    };

    var lab2rgb_1 = lab2rgb$1;

    var unpack$f = utils.unpack;
    var type$e = utils.type;
    var chroma$b = chroma_1;
    var Color$u = Color_1;
    var input$7 = input$h;

    var rgb2lab$1 = rgb2lab_1;

    Color$u.prototype.lab = function() {
        return rgb2lab$1(this._rgb);
    };

    chroma$b.lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$u, [ null ].concat( args, ['lab']) ));
    };

    input$7.format.lab = lab2rgb_1;

    input$7.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$f(args, 'lab');
            if (type$e(args) === 'array' && args.length === 3) {
                return 'lab';
            }
        }
    });

    var unpack$e = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$3 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var round$2 = Math.round;

    var lab2lch$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$e(args, 'lab');
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$3(a * a + b * b);
        var h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
        if (round$2(c*10000) === 0) { h = Number.NaN; }
        return [l, c, h];
    };

    var lab2lch_1 = lab2lch$2;

    var unpack$d = utils.unpack;
    var rgb2lab = rgb2lab_1;
    var lab2lch$1 = lab2lch_1;

    var rgb2lch$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$d(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab(r,g,b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch$1(l,a,b_);
    };

    var rgb2lch_1 = rgb2lch$1;

    var unpack$c = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin$3 = Math.sin;
    var cos$3 = Math.cos;

    var lch2lab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        var ref = unpack$c(args, 'lch');
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) { h = 0; }
        h = h * DEG2RAD;
        return [l, cos$3(h) * c, sin$3(h) * c]
    };

    var lch2lab_1 = lch2lab$2;

    var unpack$b = utils.unpack;
    var lch2lab$1 = lch2lab_1;
    var lab2rgb = lab2rgb_1;

    var lch2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$b(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab$1 (l,c,h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb (L,a,b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var lch2rgb_1 = lch2rgb$1;

    var unpack$a = utils.unpack;
    var lch2rgb = lch2rgb_1;

    var hcl2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hcl = unpack$a(args, 'hcl').reverse();
        return lch2rgb.apply(void 0, hcl);
    };

    var hcl2rgb_1 = hcl2rgb;

    var unpack$9 = utils.unpack;
    var type$d = utils.type;
    var chroma$a = chroma_1;
    var Color$t = Color_1;
    var input$6 = input$h;

    var rgb2lch = rgb2lch_1;

    Color$t.prototype.lch = function() { return rgb2lch(this._rgb); };
    Color$t.prototype.hcl = function() { return rgb2lch(this._rgb).reverse(); };

    chroma$a.lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$t, [ null ].concat( args, ['lch']) ));
    };
    chroma$a.hcl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$t, [ null ].concat( args, ['hcl']) ));
    };

    input$6.format.lch = lch2rgb_1;
    input$6.format.hcl = hcl2rgb_1;

    ['lch','hcl'].forEach(function (m) { return input$6.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$9(args, m);
            if (type$d(args) === 'array' && args.length === 3) {
                return m;
            }
        }
    }); });

    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */

    var w3cx11$1 = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflower: '#6495ed',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        laserlemon: '#ffff54',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrod: '#fafad2',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        maroon2: '#7f0000',
        maroon3: '#b03060',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        purple2: '#7f007f',
        purple3: '#a020f0',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var w3cx11_1 = w3cx11$1;

    var Color$s = Color_1;
    var input$5 = input$h;
    var type$c = utils.type;

    var w3cx11 = w3cx11_1;
    var hex2rgb = hex2rgb_1;
    var rgb2hex = rgb2hex_1;

    Color$s.prototype.name = function() {
        var hex = rgb2hex(this._rgb, 'rgb');
        for (var i = 0, list = Object.keys(w3cx11); i < list.length; i += 1) {
            var n = list[i];

            if (w3cx11[n] === hex) { return n.toLowerCase(); }
        }
        return hex;
    };

    input$5.format.named = function (name) {
        name = name.toLowerCase();
        if (w3cx11[name]) { return hex2rgb(w3cx11[name]); }
        throw new Error('unknown color name: '+name);
    };

    input$5.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$c(h) === 'string' && w3cx11[h.toLowerCase()]) {
                return 'named';
            }
        }
    });

    var unpack$8 = utils.unpack;

    var rgb2num$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$8(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };

    var rgb2num_1 = rgb2num$1;

    var type$b = utils.type;

    var num2rgb = function (num) {
        if (type$b(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = (num >> 8) & 0xFF;
            var b = num & 0xFF;
            return [r,g,b,1];
        }
        throw new Error("unknown num color: "+num);
    };

    var num2rgb_1 = num2rgb;

    var chroma$9 = chroma_1;
    var Color$r = Color_1;
    var input$4 = input$h;
    var type$a = utils.type;

    var rgb2num = rgb2num_1;

    Color$r.prototype.num = function() {
        return rgb2num(this._rgb);
    };

    chroma$9.num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$r, [ null ].concat( args, ['num']) ));
    };

    input$4.format.num = num2rgb_1;

    input$4.autodetect.push({
        p: 5,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            if (args.length === 1 && type$a(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
                return 'num';
            }
        }
    });

    var chroma$8 = chroma_1;
    var Color$q = Color_1;
    var input$3 = input$h;
    var unpack$7 = utils.unpack;
    var type$9 = utils.type;
    var round$1 = Math.round;

    Color$q.prototype.rgb = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        if (rnd === false) { return this._rgb.slice(0,3); }
        return this._rgb.slice(0,3).map(round$1);
    };

    Color$q.prototype.rgba = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        return this._rgb.slice(0,4).map(function (v,i) {
            return i<3 ? (rnd === false ? v : round$1(v)) : v;
        });
    };

    chroma$8.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$q, [ null ].concat( args, ['rgb']) ));
    };

    input$3.format.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$7(args, 'rgba');
        if (rgba[3] === undefined) { rgba[3] = 1; }
        return rgba;
    };

    input$3.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$7(args, 'rgba');
            if (type$9(args) === 'array' && (args.length === 3 ||
                args.length === 4 && type$9(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
                return 'rgb';
            }
        }
    });

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */

    var log$1 = Math.log;

    var temperature2rgb$1 = function (kelvin) {
        var temp = kelvin / 100;
        var r,g,b;
        if (temp < 66) {
            r = 255;
            g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log$1(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log$1(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log$1(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log$1(g);
            b = 255;
        }
        return [r,g,b,1];
    };

    var temperature2rgb_1 = temperature2rgb$1;

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/

    var temperature2rgb = temperature2rgb_1;
    var unpack$6 = utils.unpack;
    var round = Math.round;

    var rgb2temperature$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$6(args, 'rgb');
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb(temp);
            if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
                maxTemp = temp;
            } else {
                minTemp = temp;
            }
        }
        return round(temp);
    };

    var rgb2temperature_1 = rgb2temperature$1;

    var chroma$7 = chroma_1;
    var Color$p = Color_1;
    var input$2 = input$h;

    var rgb2temperature = rgb2temperature_1;

    Color$p.prototype.temp =
    Color$p.prototype.kelvin =
    Color$p.prototype.temperature = function() {
        return rgb2temperature(this._rgb);
    };

    chroma$7.temp =
    chroma$7.kelvin =
    chroma$7.temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$p, [ null ].concat( args, ['temp']) ));
    };

    input$2.format.temp =
    input$2.format.kelvin =
    input$2.format.temperature = temperature2rgb_1;

    var unpack$5 = utils.unpack;
    var cbrt = Math.cbrt;
    var pow$8 = Math.pow;
    var sign$1 = Math.sign;

    var rgb2oklab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        // OKLab color space implementation taken from
        // https://bottosson.github.io/posts/oklab/
        var ref = unpack$5(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)];
        var lr = ref$1[0];
        var lg = ref$1[1];
        var lb = ref$1[2];
        var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

        return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
        ];
    };

    var rgb2oklab_1 = rgb2oklab$2;

    function rgb2lrgb(c) {
        var abs = Math.abs(c);
        if (abs < 0.04045) {
            return c / 12.92;
        }
        return (sign$1(c) || 1) * pow$8((abs + 0.055) / 1.055, 2.4);
    }

    var unpack$4 = utils.unpack;
    var pow$7 = Math.pow;
    var sign = Math.sign;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var oklab2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$4(args, 'lab');
        var L = args[0];
        var a = args[1];
        var b = args[2];

        var l = pow$7(L + 0.3963377774 * a + 0.2158037573 * b, 3);
        var m = pow$7(L - 0.1055613458 * a - 0.0638541728 * b, 3);
        var s = pow$7(L - 0.0894841775 * a - 1.291485548 * b, 3);

        return [
            255 * lrgb2rgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
            255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
            255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
            args.length > 3 ? args[3] : 1
        ];
    };

    var oklab2rgb_1 = oklab2rgb$1;

    function lrgb2rgb(c) {
        var abs = Math.abs(c);
        if (abs > 0.0031308) {
            return (sign(c) || 1) * (1.055 * pow$7(abs, 1 / 2.4) - 0.055);
        }
        return c * 12.92;
    }

    var unpack$3 = utils.unpack;
    var type$8 = utils.type;
    var chroma$6 = chroma_1;
    var Color$o = Color_1;
    var input$1 = input$h;

    var rgb2oklab$1 = rgb2oklab_1;

    Color$o.prototype.oklab = function () {
        return rgb2oklab$1(this._rgb);
    };

    chroma$6.oklab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$o, [ null ].concat( args, ['oklab']) ));
    };

    input$1.format.oklab = oklab2rgb_1;

    input$1.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$3(args, 'oklab');
            if (type$8(args) === 'array' && args.length === 3) {
                return 'oklab';
            }
        }
    });

    var unpack$2 = utils.unpack;
    var rgb2oklab = rgb2oklab_1;
    var lab2lch = lab2lch_1;

    var rgb2oklch$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$2(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2oklab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch(l, a, b_);
    };

    var rgb2oklch_1 = rgb2oklch$1;

    var unpack$1 = utils.unpack;
    var lch2lab = lch2lab_1;
    var oklab2rgb = oklab2rgb_1;

    var oklch2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$1(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = oklab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var oklch2rgb_1 = oklch2rgb;

    var unpack = utils.unpack;
    var type$7 = utils.type;
    var chroma$5 = chroma_1;
    var Color$n = Color_1;
    var input = input$h;

    var rgb2oklch = rgb2oklch_1;

    Color$n.prototype.oklch = function () {
        return rgb2oklch(this._rgb);
    };

    chroma$5.oklch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$n, [ null ].concat( args, ['oklch']) ));
    };

    input.format.oklch = oklch2rgb_1;

    input.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack(args, 'oklch');
            if (type$7(args) === 'array' && args.length === 3) {
                return 'oklch';
            }
        }
    });

    var Color$m = Color_1;
    var type$6 = utils.type;

    Color$m.prototype.alpha = function(a, mutate) {
        if ( mutate === void 0 ) mutate=false;

        if (a !== undefined && type$6(a) === 'number') {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color$m([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
        }
        return this._rgb[3];
    };

    var Color$l = Color_1;

    Color$l.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };

    var Color$k = Color_1;
    var LAB_CONSTANTS$1 = labConstants;

    Color$k.prototype.darken = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lab = me.lab();
    	lab[0] -= LAB_CONSTANTS$1.Kn * amount;
    	return new Color$k(lab, 'lab').alpha(me.alpha(), true);
    };

    Color$k.prototype.brighten = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.darken(-amount);
    };

    Color$k.prototype.darker = Color$k.prototype.darken;
    Color$k.prototype.brighter = Color$k.prototype.brighten;

    var Color$j = Color_1;

    Color$j.prototype.get = function (mc) {
        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) { return src[i]; }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var Color$i = Color_1;
    var type$5 = utils.type;
    var pow$6 = Math.pow;

    var EPS = 1e-7;
    var MAX_ITER = 20;

    Color$i.prototype.luminance = function(lum) {
        if (lum !== undefined && type$5(lum) === 'number') {
            if (lum === 0) {
                // return pure black
                return new Color$i([0,0,0,this._rgb[3]], 'rgb');
            }
            if (lum === 1) {
                // return pure white
                return new Color$i([255,255,255,this._rgb[3]], 'rgb');
            }
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = 'rgb';
            var max_iter = MAX_ITER;

            var test = function (low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) {
                    // close enough
                    return mid;
                }
                return lm > lum ? test(low, mid) : test(mid, high);
            };

            var rgb = (cur_lum > lum ? test(new Color$i([0,0,0]), this) : test(this, new Color$i([255,255,255]))).rgb();
            return new Color$i(rgb.concat( [this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
    };


    var rgb2luminance = function (r,g,b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    var luminance_x = function (x) {
        x /= 255;
        return x <= 0.03928 ? x/12.92 : pow$6((x+0.055)/1.055, 2.4);
    };

    var interpolator$1 = {};

    var Color$h = Color_1;
    var type$4 = utils.type;
    var interpolator = interpolator$1;

    var mix$1 = function (col1, col2, f) {
        if ( f === void 0 ) f=0.5;
        var rest = [], len = arguments.length - 3;
        while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

        var mode = rest[0] || 'lrgb';
        if (!interpolator[mode] && !rest.length) {
            // fall back to the first supported mode
            mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
            throw new Error(("interpolation mode " + mode + " is not defined"));
        }
        if (type$4(col1) !== 'object') { col1 = new Color$h(col1); }
        if (type$4(col2) !== 'object') { col2 = new Color$h(col2); }
        return interpolator[mode](col1, col2, f)
            .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };

    var Color$g = Color_1;
    var mix = mix$1;

    Color$g.prototype.mix =
    Color$g.prototype.interpolate = function(col2, f) {
    	if ( f === void 0 ) f=0.5;
    	var rest = [], len = arguments.length - 2;
    	while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

    	return mix.apply(void 0, [ this, col2, f ].concat( rest ));
    };

    var Color$f = Color_1;

    Color$f.prototype.premultiply = function(mutate) {
    	if ( mutate === void 0 ) mutate=false;

    	var rgb = this._rgb;
    	var a = rgb[3];
    	if (mutate) {
    		this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
    		return this;
    	} else {
    		return new Color$f([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
    	}
    };

    var Color$e = Color_1;
    var LAB_CONSTANTS = labConstants;

    Color$e.prototype.saturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lch = me.lch();
    	lch[1] += LAB_CONSTANTS.Kn * amount;
    	if (lch[1] < 0) { lch[1] = 0; }
    	return new Color$e(lch, 'lch').alpha(me.alpha(), true);
    };

    Color$e.prototype.desaturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.saturate(-amount);
    };

    var Color$d = Color_1;
    var type$3 = utils.type;

    Color$d.prototype.set = function (mc, value, mutate) {
        if ( mutate === void 0 ) mutate = false;

        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) {
                if (type$3(value) == 'string') {
                    switch (value.charAt(0)) {
                        case '+':
                            src[i] += +value;
                            break;
                        case '-':
                            src[i] += +value;
                            break;
                        case '*':
                            src[i] *= +value.substr(1);
                            break;
                        case '/':
                            src[i] /= +value.substr(1);
                            break;
                        default:
                            src[i] = +value;
                    }
                } else if (type$3(value) === 'number') {
                    src[i] = value;
                } else {
                    throw new Error("unsupported value for Color.set");
                }
                var out = new Color$d(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var Color$c = Color_1;

    var rgb = function (col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color$c(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'rgb'
        )
    };

    // register interpolator
    interpolator$1.rgb = rgb;

    var Color$b = Color_1;
    var sqrt$2 = Math.sqrt;
    var pow$5 = Math.pow;

    var lrgb = function (col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color$b(
            sqrt$2(pow$5(x1,2) * (1-f) + pow$5(x2,2) * f),
            sqrt$2(pow$5(y1,2) * (1-f) + pow$5(y2,2) * f),
            sqrt$2(pow$5(z1,2) * (1-f) + pow$5(z2,2) * f),
            'rgb'
        )
    };

    // register interpolator
    interpolator$1.lrgb = lrgb;

    var Color$a = Color_1;

    var lab = function (col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color$a(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'lab'
        )
    };

    // register interpolator
    interpolator$1.lab = lab;

    var Color$9 = Color_1;

    var _hsx = function (col1, col2, f, m) {
        var assign, assign$1;

        var xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === 'hcg') {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        } else if (m === 'oklch') {
            xyz0 = col1.oklch().reverse();
            xyz1 = col2.oklch().reverse();
        }

        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === 'h' || m === 'oklch') {
            (assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
            (assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
        }

        var sat, hue, lbv, dh;

        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1 - (hue0 + 360);
            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1 + 360 - hue0;
            } else {
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
        } else {
            hue = Number.NaN;
        }

        if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
        lbv = lbv0 + f * (lbv1 - lbv0);
        return m === 'oklch' ? new Color$9([lbv, sat, hue], m) : new Color$9([hue, sat, lbv], m);
    };

    var interpolate_hsx$5 = _hsx;

    var lch = function (col1, col2, f) {
    	return interpolate_hsx$5(col1, col2, f, 'lch');
    };

    // register interpolator
    interpolator$1.lch = lch;
    interpolator$1.hcl = lch;

    var Color$8 = Color_1;

    var num = function (col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color$8(c1 + f * (c2-c1), 'num')
    };

    // register interpolator
    interpolator$1.num = num;

    var interpolate_hsx$4 = _hsx;

    var hcg = function (col1, col2, f) {
    	return interpolate_hsx$4(col1, col2, f, 'hcg');
    };

    // register interpolator
    interpolator$1.hcg = hcg;

    var interpolate_hsx$3 = _hsx;

    var hsi = function (col1, col2, f) {
    	return interpolate_hsx$3(col1, col2, f, 'hsi');
    };

    // register interpolator
    interpolator$1.hsi = hsi;

    var interpolate_hsx$2 = _hsx;

    var hsl = function (col1, col2, f) {
    	return interpolate_hsx$2(col1, col2, f, 'hsl');
    };

    // register interpolator
    interpolator$1.hsl = hsl;

    var interpolate_hsx$1 = _hsx;

    var hsv = function (col1, col2, f) {
    	return interpolate_hsx$1(col1, col2, f, 'hsv');
    };

    // register interpolator
    interpolator$1.hsv = hsv;

    var Color$7 = Color_1;

    var oklab = function (col1, col2, f) {
        var xyz0 = col1.oklab();
        var xyz1 = col2.oklab();
        return new Color$7(
            xyz0[0] + f * (xyz1[0] - xyz0[0]),
            xyz0[1] + f * (xyz1[1] - xyz0[1]),
            xyz0[2] + f * (xyz1[2] - xyz0[2]),
            'oklab'
        );
    };

    // register interpolator
    interpolator$1.oklab = oklab;

    var interpolate_hsx = _hsx;

    var oklch = function (col1, col2, f) {
        return interpolate_hsx(col1, col2, f, 'oklch');
    };

    // register interpolator
    interpolator$1.oklch = oklch;

    var Color$6 = Color_1;
    var clip_rgb$1 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$1 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$2 = Math.sin;
    var atan2$1 = Math.atan2;

    var average = function (colors, mode, weights) {
        if ( mode === void 0 ) mode='lrgb';
        if ( weights === void 0 ) weights=null;

        var l = colors.length;
        if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
        // normalize weights
        var k = l / weights.reduce(function(a, b) { return a + b; });
        weights.forEach(function (w,i) { weights[i] *= k; });
        // convert colors to Color objects
        colors = colors.map(function (c) { return new Color$6(c); });
        if (mode === 'lrgb') {
            return _average_lrgb(colors, weights)
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for (var i=0; i<xyz.length; i++) {
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
                var A = xyz[i] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$2(A) * weights[0];
            }
        }

        var alpha = first.alpha() * weights[0];
        colors.forEach(function (c,ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci+1];
            for (var i=0; i<xyz.length; i++) {
                if (!isNaN(xyz2[i])) {
                    cnt[i] += weights[ci+1];
                    if (mode.charAt(i) === 'h') {
                        var A = xyz2[i] / 180 * PI$1;
                        dx += cos$2(A) * weights[ci+1];
                        dy += sin$2(A) * weights[ci+1];
                    } else {
                        xyz[i] += xyz2[i] * weights[ci+1];
                    }
                }
            }
        });

        for (var i$1=0; i$1<xyz.length; i$1++) {
            if (mode.charAt(i$1) === 'h') {
                var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
                while (A$1 < 0) { A$1 += 360; }
                while (A$1 >= 360) { A$1 -= 360; }
                xyz[i$1] = A$1;
            } else {
                xyz[i$1] = xyz[i$1]/cnt[i$1];
            }
        }
        alpha /= l;
        return (new Color$6(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };


    var _average_lrgb = function (colors, weights) {
        var l = colors.length;
        var xyz = [0,0,0,0];
        for (var i=0; i < colors.length; i++) {
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0],2) * f;
            xyz[1] += pow$4(rgb[1],2) * f;
            xyz[2] += pow$4(rgb[2],2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$1(xyz[0]);
        xyz[1] = sqrt$1(xyz[1]);
        xyz[2] = sqrt$1(xyz[2]);
        if (xyz[3] > 0.9999999) { xyz[3] = 1; }
        return new Color$6(clip_rgb$1(xyz));
    };

    // minimal multi-purpose interface

    // @requires utils color analyze

    var chroma$4 = chroma_1;
    var type$2 = utils.type;

    var pow$3 = Math.pow;

    var scale$2 = function(colors) {

        // constructor
        var _mode = 'rgb';
        var _nacol = chroma$4('#ccc');
        var _spread = 0;
        // const _fixed = false;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0,0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;

        // private methods

        var setColors = function(colors) {
            colors = colors || ['#fff', '#000'];
            if (colors && type$2(colors) === 'string' && chroma$4.brewer &&
                chroma$4.brewer[colors.toLowerCase()]) {
                colors = chroma$4.brewer[colors.toLowerCase()];
            }
            if (type$2(colors) === 'array') {
                // handle single color
                if (colors.length === 1) {
                    colors = [colors[0], colors[0]];
                }
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for (var c=0; c<colors.length; c++) {
                    colors[c] = chroma$4(colors[c]);
                }
                // auto-fill color position
                _pos.length = 0;
                for (var c$1=0; c$1<colors.length; c$1++) {
                    _pos.push(c$1/(colors.length-1));
                }
            }
            resetCache();
            return _colors = colors;
        };

        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length-1;
                var i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i-1;
            }
            return 0;
        };

        var tMapLightness = function (t) { return t; };
        var tMapDomain = function (t) { return t; };

        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };

        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) { bypassMap = false; }
            if (isNaN(val) || (val === null)) { return _nacol; }
            if (!bypassMap) {
                if (_classes && (_classes.length > 2)) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length-2);
                } else if (_max !== _min) {
                    // just interpolate between min/max
                    t = (val - _min) / (_max - _min);
                } else {
                    t = 1;
                }
            } else {
                t = val;
            }

            // domain map
            t = tMapDomain(t);

            if (!bypassMap) {
                t = tMapLightness(t);  // lightness correction
            }

            if (_gamma !== 1) { t = pow$3(t, _gamma); }

            t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

            t = Math.min(1, Math.max(0, t));

            var k = Math.floor(t * 10000);

            if (_useCache && _colorCache[k]) {
                col = _colorCache[k];
            } else {
                if (type$2(_colors) === 'array') {
                    //for i in [0.._pos.length-1]
                    for (var i=0; i<_pos.length; i++) {
                        var p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if ((t >= p) && (i === (_pos.length-1))) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i+1]) {
                            t = (t-p)/(_pos[i+1]-p);
                            col = chroma$4.interpolate(_colors[i], _colors[i+1], t, _mode);
                            break;
                        }
                    }
                } else if (type$2(_colors) === 'function') {
                    col = _colors(t);
                }
                if (_useCache) { _colorCache[k] = col; }
            }
            return col;
        };

        var resetCache = function () { return _colorCache = {}; };

        setColors(colors);

        // public interface

        var f = function(v) {
            var c = chroma$4(getColor(v));
            if (_out && c[_out]) { return c[_out](); } else { return c; }
        };

        f.classes = function(classes) {
            if (classes != null) {
                if (type$2(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length-1]];
                } else {
                    var d = chroma$4.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    } else {
                        _classes = chroma$4.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };


        f.domain = function(domain) {
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length-1];
            _pos = [];
            var k = _colors.length;
            if ((domain.length === k) && (_min !== _max)) {
                // update positions
                for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
                    var d = list[i];

                  _pos.push((d-_min) / (_max-_min));
                }
            } else {
                for (var c=0; c<k; c++) {
                    _pos.push(c/(k-1));
                }
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
                    var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
                    if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
                        tMapDomain = function (t) {
                            if (t <= 0 || t >= 1) { return t; }
                            var i = 0;
                            while (t >= tBreaks[i+1]) { i++; }
                            var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
                            var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
                            return out;
                        };
                    }

                }
            }
            _domain = [_min, _max];
            return f;
        };

        f.mode = function(_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };

        f.range = function(colors, _pos) {
            setColors(colors);
            return f;
        };

        f.out = function(_o) {
            _out = _o;
            return f;
        };

        f.spread = function(val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };

        f.correctLightness = function(v) {
            if (v == null) { v = true; }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tMapLightness = function(t) {
                    var L0 = getColor(0, true).lab()[0];
                    var L1 = getColor(1, true).lab()[0];
                    var pol = L0 > L1;
                    var L_actual = getColor(t, true).lab()[0];
                    var L_ideal = L0 + ((L1 - L0) * t);
                    var L_diff = L_actual - L_ideal;
                    var t0 = 0;
                    var t1 = 1;
                    var max_iter = 20;
                    while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
                        (function() {
                            if (pol) { L_diff *= -1; }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            } else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return L_diff = L_actual - L_ideal;
                        })();
                    }
                    return t;
                };
            } else {
                tMapLightness = function (t) { return t; };
            }
            return f;
        };

        f.padding = function(p) {
            if (p != null) {
                if (type$2(p) === 'number') {
                    p = [p,p];
                }
                _padding = p;
                return f;
            } else {
                return _padding;
            }
        };

        f.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) { out = 'hex'; }
            var result = [];

            if (arguments.length === 0) {
                result = _colors.slice(0);

            } else if (numColors === 1) {
                result = [f(0.5)];

            } else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

            } else { // returns all colors based on the defined classes
                colors = [];
                var samples = [];
                if (_classes && (_classes.length > 2)) {
                    for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        samples.push((_classes[i-1]+_classes[i])*0.5);
                    }
                } else {
                    samples = _domain;
                }
                result = samples.map(function (v) { return f(v); });
            }

            if (chroma$4[out]) {
                result = result.map(function (c) { return c[out](); });
            }
            return result;
        };

        f.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else {
                return _useCache;
            }
        };

        f.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else {
                return _gamma;
            }
        };

        f.nodata = function(d) {
            if (d != null) {
                _nacol = chroma$4(d);
                return f;
            } else {
                return _nacol;
            }
        };

        return f;
    };

    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }

    //
    // interpolates between a set of colors uzing a bezier spline
    //

    // @requires utils lab
    var Color$5 = Color_1;

    var scale$1 = scale$2;

    // nth row of the pascal triangle
    var binom_row = function(n) {
        var row = [1, 1];
        for (var i = 1; i < n; i++) {
            var newrow = [1];
            for (var j = 1; j <= row.length; j++) {
                newrow[j] = (row[j] || 0) + row[j - 1];
            }
            row = newrow;
        }
        return row;
    };

    var bezier = function(colors) {
        var assign, assign$1, assign$2;

        var I, lab0, lab1, lab2;
        colors = colors.map(function (c) { return new Color$5(c); });
        if (colors.length === 2) {
            // linear interpolation
            (assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length === 3) {
            // quadratic bezier interpolation
            (assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            (assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length >= 5) {
            // general case (degree n bezier)
            var labs, row, n;
            labs = colors.map(function (c) { return c.lab(); });
            n = colors.length - 1;
            row = binom_row(n);
            I = function (t) {
                var u = 1 - t;
                var lab = ([0, 1, 2].map(function (i) { return labs.reduce(function (sum, el, j) { return (sum + row[j] * Math.pow( u, (n - j) ) * Math.pow( t, j ) * el[i]); }, 0); }));
                return new Color$5(lab, 'lab');
            };
        } else {
            throw new RangeError("No point in running bezier with only one color.")
        }
        return I;
    };

    var bezier_1 = function (colors) {
        var f = bezier(colors);
        f.scale = function () { return scale$1(f); };
        return f;
    };

    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */

    var chroma$3 = chroma_1;

    var blend = function (bottom, top, mode) {
        if (!blend[mode]) {
            throw new Error('unknown blend mode ' + mode);
        }
        return blend[mode](bottom, top);
    };

    var blend_f = function (f) { return function (bottom,top) {
            var c0 = chroma$3(top).rgb();
            var c1 = chroma$3(bottom).rgb();
            return chroma$3.rgb(f(c0, c1));
        }; };

    var each = function (f) { return function (c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        }; };

    var normal = function (a) { return a; };
    var multiply = function (a,b) { return a * b / 255; };
    var darken = function (a,b) { return a > b ? b : a; };
    var lighten = function (a,b) { return a > b ? a : b; };
    var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
    var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
    var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
    var dodge = function (a,b) {
        if (a === 255) { return 255; }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a
    };

    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b

    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));

    var blend_1 = blend;

    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf

    var type$1 = utils.type;
    var clip_rgb = utils.clip_rgb;
    var TWOPI = utils.TWOPI;
    var pow$2 = Math.pow;
    var sin$1 = Math.sin;
    var cos$1 = Math.cos;
    var chroma$2 = chroma_1;

    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if ( start === void 0 ) start=300;
        if ( rotations === void 0 ) rotations=-1.5;
        if ( hue === void 0 ) hue=1;
        if ( gamma === void 0 ) gamma=1;
        if ( lightness === void 0 ) lightness=[0,1];

        var dh = 0, dl;
        if (type$1(lightness) === 'array') {
            dl = lightness[1] - lightness[0];
        } else {
            dl = 0;
            lightness = [lightness, lightness];
        }

        var f = function(fract) {
            var a = TWOPI * (((start+120)/360) + (rotations * fract));
            var l = pow$2(lightness[0] + (dl * fract), gamma);
            var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
            var amp = (h * l * (1-l)) / 2;
            var cos_a = cos$1(a);
            var sin_a = sin$1(a);
            var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
            var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
            var b = l + (amp * (+1.97294 * cos_a));
            return chroma$2(clip_rgb([r*255,g*255,b*255,1]));
        };

        f.start = function(s) {
            if ((s == null)) { return start; }
            start = s;
            return f;
        };

        f.rotations = function(r) {
            if ((r == null)) { return rotations; }
            rotations = r;
            return f;
        };

        f.gamma = function(g) {
            if ((g == null)) { return gamma; }
            gamma = g;
            return f;
        };

        f.hue = function(h) {
            if ((h == null)) { return hue; }
            hue = h;
            if (type$1(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) { hue = hue[1]; }
            } else {
                dh = 0;
            }
            return f;
        };

        f.lightness = function(h) {
            if ((h == null)) { return lightness; }
            if (type$1(h) === 'array') {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [h,h];
                dl = 0;
            }
            return f;
        };

        f.scale = function () { return chroma$2.scale(f); };

        f.hue(hue);

        return f;
    };

    var Color$4 = Color_1;
    var digits = '0123456789abcdef';

    var floor$1 = Math.floor;
    var random = Math.random;

    var random_1 = function () {
        var code = '#';
        for (var i=0; i<6; i++) {
            code += digits.charAt(floor$1(random() * 16));
        }
        return new Color$4(code, 'hex');
    };

    var type = type$p;
    var log = Math.log;
    var pow$1 = Math.pow;
    var floor = Math.floor;
    var abs$1 = Math.abs;


    var analyze = function (data, key) {
        if ( key === void 0 ) key=null;

        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE*-1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === 'object') {
            data = Object.values(data);
        }
        data.forEach(function (val) {
            if (key && type(val) === 'object') { val = val[key]; }
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) { r.min = val; }
                if (val > r.max) { r.max = val; }
                r.count += 1;
            }
        });

        r.domain = [r.min, r.max];

        r.limits = function (mode, num) { return limits(r, mode, num); };

        return r;
    };


    var limits = function (data, mode, num) {
        if ( mode === void 0 ) mode='equal';
        if ( num === void 0 ) num=7;

        if (type(data) == 'array') {
            data = analyze(data);
        }
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function (a,b) { return a-b; });

        if (num === 1) { return [min,max]; }

        var limits = [];

        if (mode.substr(0,1) === 'c') { // continuous
            limits.push(min);
            limits.push(max);
        }

        if (mode.substr(0,1) === 'e') { // equal interval
            limits.push(min);
            for (var i=1; i<num; i++) {
                limits.push(min+((i/num)*(max-min)));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'l') { // log scale
            if (min <= 0) {
                throw new Error('Logarithmic scales are only possible for values > 0');
            }
            var min_log = Math.LOG10E * log(min);
            var max_log = Math.LOG10E * log(max);
            limits.push(min);
            for (var i$1=1; i$1<num; i$1++) {
                limits.push(pow$1(10, min_log + ((i$1/num) * (max_log - min_log))));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'q') { // quantile scale
            limits.push(min);
            for (var i$2=1; i$2<num; i$2++) {
                var p = ((values.length-1) * i$2)/num;
                var pb = floor(p);
                if (pb === p) {
                    limits.push(values[pb]);
                } else { // p > pb
                    var pr = p - pb;
                    limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
                }
            }
            limits.push(max);

        }

        else if (mode.substr(0,1) === 'k') { // k-means clustering
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */
            var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;

            // get seed values
            centroids = [];
            centroids.push(min);
            for (var i$3=1; i$3<num; i$3++) {
                centroids.push(min + ((i$3/num) * (max-min)));
            }
            centroids.push(max);

            while (repeat) {
                // assignment step
                for (var j=0; j<num; j++) {
                    clusterSizes[j] = 0;
                }
                for (var i$4=0; i$4<n; i$4++) {
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = (void 0);
                    for (var j$1=0; j$1<num; j$1++) {
                        var dist = abs$1(centroids[j$1]-value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }

                // update centroids step
                var newCentroids = new Array(num);
                for (var j$2=0; j$2<num; j$2++) {
                    newCentroids[j$2] = null;
                }
                for (var i$5=0; i$5<n; i$5++) {
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i$5];
                    } else {
                        newCentroids[cluster] += values[i$5];
                    }
                }
                for (var j$3=0; j$3<num; j$3++) {
                    newCentroids[j$3] *= 1/clusterSizes[j$3];
                }

                // check convergence
                repeat = false;
                for (var j$4=0; j$4<num; j$4++) {
                    if (newCentroids[j$4] !== centroids[j$4]) {
                        repeat = true;
                        break;
                    }
                }

                centroids = newCentroids;
                nb_iters++;

                if (nb_iters > 200) {
                    repeat = false;
                }
            }

            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for (var j$5=0; j$5<num; j$5++) {
                kClusters[j$5] = [];
            }
            for (var i$6=0; i$6<n; i$6++) {
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for (var j$6=0; j$6<num; j$6++) {
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
            limits.push(tmpKMeansBreaks[0]);
            for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && (limits.indexOf(v) === -1)) {
                    limits.push(v);
                }
            }
        }
        return limits;
    };

    var analyze_1 = {analyze: analyze, limits: limits};

    var Color$3 = Color_1;


    var contrast = function (a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color$3(a);
        b = new Color$3(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };

    var Color$2 = Color_1;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var min = Math.min;
    var max = Math.max;
    var atan2 = Math.atan2;
    var abs = Math.abs;
    var cos = Math.cos;
    var sin = Math.sin;
    var exp = Math.exp;
    var PI = Math.PI;

    var deltaE = function(a, b, Kl, Kc, Kh) {
        if ( Kl === void 0 ) Kl=1;
        if ( Kc === void 0 ) Kc=1;
        if ( Kh === void 0 ) Kh=1;

        // Delta E (CIE 2000)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
        var rad2deg = function(rad) {
            return 360 * rad / (2 * PI);
        };
        var deg2rad = function(deg) {
            return (2 * PI * deg) / 360;
        };
        a = new Color$2(a);
        b = new Color$2(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var avgL = (L1 + L2)/2;
        var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        var C2 = sqrt(pow(a2, 2) + pow(b2, 2));
        var avgC = (C1 + C2)/2;
        var G = 0.5*(1-sqrt(pow(avgC, 7)/(pow(avgC, 7) + pow(25, 7))));
        var a1p = a1*(1+G);
        var a2p = a2*(1+G);
        var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        var C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
        var avgCp = (C1p + C2p)/2;
        var arctan1 = rad2deg(atan2(b1, a1p));
        var arctan2 = rad2deg(atan2(b2, a2p));
        var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
        var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
        var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360)/2 : (h1p + h2p)/2;
        var T = 1 - 0.17*cos(deg2rad(avgHp - 30)) + 0.24*cos(deg2rad(2*avgHp)) + 0.32*cos(deg2rad(3*avgHp + 6)) - 0.2*cos(deg2rad(4*avgHp - 63));
        var deltaHp = h2p - h1p;
        deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
        deltaHp = 2*sqrt(C1p*C2p)*sin(deg2rad(deltaHp)/2);
        var deltaL = L2 - L1;
        var deltaCp = C2p - C1p;    
        var sl = 1 + (0.015*pow(avgL - 50, 2))/sqrt(20 + pow(avgL - 50, 2));
        var sc = 1 + 0.045*avgCp;
        var sh = 1 + 0.015*avgCp*T;
        var deltaTheta = 30*exp(-pow((avgHp - 275)/25, 2));
        var Rc = 2*sqrt(pow(avgCp, 7)/(pow(avgCp, 7) + pow(25, 7)));
        var Rt = -Rc*sin(2*deg2rad(deltaTheta));
        var result = sqrt(pow(deltaL/(Kl*sl), 2) + pow(deltaCp/(Kc*sc), 2) + pow(deltaHp/(Kh*sh), 2) + Rt*(deltaCp/(Kc*sc))*(deltaHp/(Kh*sh)));
        return max(0, min(100, result));
    };

    var Color$1 = Color_1;

    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if ( mode === void 0 ) mode='lab';

        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color$1(a);
        b = new Color$1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i in l1) {
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d*d;
        }
        return Math.sqrt(sum_sq);
    };

    var Color = Color_1;

    var valid = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        try {
            new (Function.prototype.bind.apply( Color, [ null ].concat( args) ));
            return true;
        } catch (e) {
            return false;
        }
    };

    // some pre-defined color scales:
    var chroma$1 = chroma_1;

    var scale = scale$2;

    var scales = {
    	cool: function cool() { return scale([chroma$1.hsl(180,1,.9), chroma$1.hsl(250,.7,.4)]) },
    	hot: function hot() { return scale(['#000','#f00','#ff0','#fff']).mode('rgb') }
    };

    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */

    var colorbrewer = {
        // sequential
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

        // diverging

        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

        // qualitative

        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
    };

    // add lowercase aliases for case-insensitive matches
    for (var i = 0, list = Object.keys(colorbrewer); i < list.length; i += 1) {
        var key = list[i];

        colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }

    var colorbrewer_1 = colorbrewer;

    var chroma = chroma_1;

    // feel free to comment out anything to rollup
    // a smaller chroma.js built

    // io --> convert colors

















    // operators --> modify existing Colors










    // interpolators












    // generators -- > create new colors
    chroma.average = average;
    chroma.bezier = bezier_1;
    chroma.blend = blend_1;
    chroma.cubehelix = cubehelix;
    chroma.mix = chroma.interpolate = mix$1;
    chroma.random = random_1;
    chroma.scale = scale$2;

    // other utility methods
    chroma.analyze = analyze_1.analyze;
    chroma.contrast = contrast;
    chroma.deltaE = deltaE;
    chroma.distance = distance;
    chroma.limits = analyze_1.limits;
    chroma.valid = valid;

    // scale
    chroma.scales = scales;

    // colors
    chroma.colors = w3cx11_1;
    chroma.brewer = colorbrewer_1;

    var chroma_js = chroma;

    return chroma_js;

}));

},{}],3:[function(require,module,exports){
"use strict";

//@ts-check

/** 
 * A static class containing helper functions for array-related tasks. 
 */
class ArrayHelper {
  /**
   * Clone an array or an object. If an object is passed, a shallow clone will be created.
   *
   * @static
   * @param {*} arr The array or object to be cloned.
   * @returns {*} A clone of the array or object.
   */
  static clone(arr) {
    let out = Array.isArray(arr) ? Array() : {};

    for (let key in arr) {
      let value = arr[key];

      if (typeof value.clone === 'function') {
        out[key] = value.clone();
      } else {
        out[key] = typeof value === 'object' ? ArrayHelper.clone(value) : value;
      }
    }

    return out;
  }
  /**
   * Returns a boolean indicating whether or not the two arrays contain the same elements.
   * Only supports 1d, non-nested arrays.
   *
   * @static
   * @param {Array} arrA An array.
   * @param {Array} arrB An array.
   * @returns {Boolean} A boolean indicating whether or not the two arrays contain the same elements.
   */


  static equals(arrA, arrB) {
    if (arrA.length !== arrB.length) {
      return false;
    }

    let tmpA = arrA.slice().sort();
    let tmpB = arrB.slice().sort();

    for (var i = 0; i < tmpA.length; i++) {
      if (tmpA[i] !== tmpB[i]) {
        return false;
      }
    }

    return true;
  }
  /**
   * Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.
   *
   * @static
   * @param {Object[]} arr An array.
   * @param {*} arr[].id If the array contains an object with the property 'id', the properties value is printed. Else, the array elements value is printend.
   * @returns {String} A string representation of the array.
   */


  static print(arr) {
    if (arr.length == 0) {
      return '';
    }

    let s = '(';

    for (let i = 0; i < arr.length; i++) {
      s += arr[i].id ? arr[i].id + ', ' : arr[i] + ', ';
    }

    s = s.substring(0, s.length - 2);
    return s + ')';
  }
  /**
   * Run a function for each element in the array. The element is supplied as an argument for the callback function
   *
   * @static
   * @param {Array} arr An array.
   * @param {Function} callback The callback function that is called for each element.
   */


  static each(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i]);
    }
  }
  /**
   * Return the array element from an array containing objects, where a property of the object is set to a given value.
   *
   * @static
   * @param {Array} arr An array.
   * @param {(String|Number)} property A property contained within an object in the array.
   * @param {(String|Number)} value The value of the property.
   * @returns {*} The array element matching the value.
   */


  static get(arr, property, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][property] == value) {
        return arr[i];
      }
    }
  }
  /**
   * Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.
   *
   * @static
   * @param {Array} arr An array.
   * @param {Object} options See method description.
   * @param {*} options.value The value for which to check.
   * @param {String} [options.property=undefined] The property on which to check.
   * @param {Function} [options.func=undefined] A custom property function.
   * @returns {Boolean} A boolean whether or not the array contains a value.
   */


  static contains(arr, options) {
    if (!options.property && !options.func) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == options.value) {
          return true;
        }
      }
    } else if (options.func) {
      for (let i = 0; i < arr.length; i++) {
        if (options.func(arr[i])) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][options.property] == options.value) {
          return true;
        }
      }
    }

    return false;
  }
  /**
   * Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.
   *
   * @static
   * @param {Array} arrA An array.
   * @param {Array} arrB An array.
   * @returns {Array} The intersecting vlaues.
   */


  static intersection(arrA, arrB) {
    let intersection = new Array();

    for (let i = 0; i < arrA.length; i++) {
      for (let j = 0; j < arrB.length; j++) {
        if (arrA[i] === arrB[j]) {
          intersection.push(arrA[i]);
        }
      }
    }

    return intersection;
  }
  /**
   * Returns an array of unique elements contained in an array.
   *
   * @static
   * @param {Array} arr An array.
   * @returns {Array} An array of unique elements contained within the array supplied as an argument.
   */


  static unique(arr) {
    let contains = {};
    return arr.filter(function (i) {
      // using !== instead of hasOwnProperty (http://andrew.hedges.name/experiments/in/)
      return contains[i] !== undefined ? false : contains[i] = true;
    });
  }
  /**
   * Count the number of occurences of a value in an array.
   *
   * @static
   * @param {Array} arr An array.
   * @param {*} value A value to be counted.
   * @returns {Number} The number of occurences of a value in the array.
   */


  static count(arr, value) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        count++;
      }
    }

    return count;
  }
  /**
   * Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.
   *
   * @static
   * @param {Array} arr An array.
   * @param {*} value A value to be toggled.
   * @returns {Array} The toggled array.
   */


  static toggle(arr, value) {
    let newArr = Array();
    let removed = false;

    for (let i = 0; i < arr.length; i++) {
      // Do not copy value if it exists
      if (arr[i] !== value) {
        newArr.push(arr[i]);
      } else {
        // The element was not copied to the new array, which
        // means it was removed
        removed = true;
      }
    } // If the element was not removed, then it was not in the array
    // so add it


    if (!removed) {
      newArr.push(value);
    }

    return newArr;
  }
  /**
   * Remove a value from an array.
   *
   * @static
   * @param {Array} arr An array.
   * @param {*} value A value to be removed.
   * @returns {Array} A new array with the element with a given value removed.
   */


  static remove(arr, value) {
    let tmp = Array();

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== value) {
        tmp.push(arr[i]);
      }
    }

    return tmp;
  }
  /**
   * Remove a value from an array with unique values.
   *
   * @static
   * @param {Array} arr An array.
   * @param {*} value A value to be removed.
   * @returns {Array} An array with the element with a given value removed.
   */


  static removeUnique(arr, value) {
    let index = arr.indexOf(value);

    if (index > -1) {
      arr.splice(index, 1);
    }

    return arr;
  }
  /**
   * Remove all elements contained in one array from another array.
   *
   * @static
   * @param {Array} arrA The array to be filtered.
   * @param {Array} arrB The array containing elements that will be removed from the other array.
   * @returns {Array} The filtered array.
   */


  static removeAll(arrA, arrB) {
    return arrA.filter(function (item) {
      return arrB.indexOf(item) === -1;
    });
  }
  /**
   * Merges two arrays and returns the result. The first array will be appended to the second array.
   *
   * @static
   * @param {Array} arrA An array.
   * @param {Array} arrB An array.
   * @returns {Array} The merged array.
   */


  static merge(arrA, arrB) {
    let arr = new Array(arrA.length + arrB.length);

    for (let i = 0; i < arrA.length; i++) {
      arr[i] = arrA[i];
    }

    for (let i = 0; i < arrB.length; i++) {
      arr[arrA.length + i] = arrB[i];
    }

    return arr;
  }
  /**
   * Checks whether or not an array contains all the elements of another array, without regard to the order.
   *
   * @static
   * @param {Array} arrA An array.
   * @param {Array} arrB An array.
   * @returns {Boolean} A boolean indicating whether or not both array contain the same elements.
   */


  static containsAll(arrA, arrB) {
    let containing = 0;

    for (let i = 0; i < arrA.length; i++) {
      for (let j = 0; j < arrB.length; j++) {
        if (arrA[i] === arrB[j]) {
          containing++;
        }
      }
    }

    return containing === arrB.length;
  }
  /**
   * Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...
   *
   * @param {Object[]} arr An array of vertex ids with their associated atomic numbers.
   * @param {Number} arr[].vertexId A vertex id.
   * @param {String} arr[].atomicNumber The atomic number associated with the vertex id.
   * @returns {Object[]} The array sorted by atomic number. Example of an array entry: { atomicNumber: 2, vertexId: 5 }.
   */


  static sortByAtomicNumberDesc(arr) {
    let map = arr.map(function (e, i) {
      return {
        index: i,
        value: e.atomicNumber.split('.').map(Number)
      };
    });
    map.sort(function (a, b) {
      let min = Math.min(b.value.length, a.value.length);
      let i = 0;

      while (i < min && b.value[i] === a.value[i]) {
        i++;
      }

      return i === min ? b.value.length - a.value.length : b.value[i] - a.value[i];
    });
    return map.map(function (e) {
      return arr[e.index];
    });
  }
  /**
   * Copies a an n-dimensional array.
   * 
   * @param {Array} arr The array to be copied.
   * @returns {Array} The copy.
   */


  static deepCopy(arr) {
    let newArr = Array();

    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];

      if (item instanceof Array) {
        newArr[i] = ArrayHelper.deepCopy(item);
      } else {
        newArr[i] = item;
      }
    }

    return newArr;
  }

}

module.exports = ArrayHelper;

},{}],4:[function(require,module,exports){
"use strict";

//@ts-check
const ArrayHelper = require('./ArrayHelper');

const Vertex = require('./Vertex');

const Ring = require('./Ring');
/** 
 * A class representing an atom.
 * 
 * @property {String} element The element symbol of this atom. Single-letter symbols are always uppercase. Examples: H, C, F, Br, Si, ...
 * @property {Boolean} drawExplicit A boolean indicating whether or not this atom is drawn explicitly (for example, a carbon atom). This overrides the default behaviour.
 * @property {Object[]} ringbonds An array containing the ringbond ids and bond types as specified in the original SMILE.
 * @property {String} branchBond The branch bond as defined in the SMILES.
 * @property {Number} ringbonds[].id The ringbond id as defined in the SMILES.
 * @property {String} ringbonds[].bondType The bond type of the ringbond as defined in the SMILES.
 * @property {Number[]} rings The ids of rings which contain this atom.
 * @property {String} bondType The bond type associated with this array. Examples: -, =, #, ...
 * @property {Boolean} isBridge A boolean indicating whether or not this atom is part of a bridge in a bridged ring (contained by the largest ring).
 * @property {Boolean} isBridgeNode A boolean indicating whether or not this atom is a bridge node (a member of the largest ring in a bridged ring which is connected to a bridge-atom).
 * @property {Number[]} originalRings Used to back up rings when they are replaced by a bridged ring.
 * @property {Number} bridgedRing The id of the bridged ring if the atom is part of a bridged ring.
 * @property {Number[]} anchoredRings The ids of the rings that are anchored to this atom. The centers of anchored rings are translated when this atom is translated.
 * @property {Object} bracket If this atom is defined as a bracket atom in the original SMILES, this object contains all the bracket information. Example: { hcount: {Number}, charge: ['--', '-', '+', '++'], isotope: {Number} }.
 * @property {Number} plane Specifies on which "plane" the atoms is in stereochemical deptictions (-1 back, 0 middle, 1 front).
 * @property {Object[]} attachedPseudoElements A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count.
 * @property {String} attachedPseudoElement[].element The element symbol.
 * @property {Number} attachedPseudoElement[].count The number of occurences that match the key.
 * @property {Number} attachedPseudoElement[].hyrogenCount The number of hydrogens attached to each atom matching the key.
 * @property {Boolean} hasAttachedPseudoElements A boolean indicating whether or not this attom will be drawn with an attached pseudo element or concatinated elements.
 * @property {Boolean} isDrawn A boolean indicating whether or not this atom is drawn. In contrast to drawExplicit, the bond is drawn neither.
 * @property {Boolean} isConnectedToRing A boolean indicating whether or not this atom is directly connected (but not a member of) a ring.
 * @property {String[]} neighbouringElements An array containing the element symbols of neighbouring atoms.
 * @property {Boolean} isPartOfAromaticRing A boolean indicating whether or not this atom is part of an explicitly defined aromatic ring. Example: c1ccccc1.
 * @property {Number} bondCount The number of bonds in which this atom is participating.
 * @property {String} chirality The chirality of this atom if it is a stereocenter (R or S).
 * @property {Number} priority The priority of this atom acording to the CIP rules, where 0 is the highest priority.
 * @property {Boolean} mainChain A boolean indicating whether or not this atom is part of the main chain (used for chirality).
 * @property {String} hydrogenDirection The direction of the hydrogen, either up or down. Only for stereocenters with and explicit hydrogen.
 * @property {Number} subtreeDepth The depth of the subtree coming from a stereocenter.
 * @property {Number} class
 */


class Atom {
  /**
   * The constructor of the class Atom.
   *
   * @param {String} element The one-letter code of the element.
   * @param {String} [bondType='-'] The type of the bond associated with this atom.
   */
  constructor(element, bondType = '-') {
    this.idx = null;
    this.element = element.length === 1 ? element.toUpperCase() : element;
    this.drawExplicit = false;
    this.ringbonds = Array();
    this.rings = Array();
    this.bondType = bondType;
    this.branchBond = null;
    this.isBridge = false;
    this.isBridgeNode = false;
    this.originalRings = Array();
    this.bridgedRing = null;
    this.anchoredRings = Array();
    this.bracket = null;
    this.plane = 0;
    this.attachedPseudoElements = {};
    this.hasAttachedPseudoElements = false;
    this.isDrawn = true;
    this.isConnectedToRing = false;
    this.neighbouringElements = Array();
    this.isPartOfAromaticRing = element !== this.element;
    this.bondCount = 0;
    this.chirality = '';
    this.isStereoCenter = false;
    this.priority = 0;
    this.mainChain = false;
    this.hydrogenDirection = 'down';
    this.subtreeDepth = 1;
    this.hasHydrogen = false;
    this.class = undefined;
  }
  /**
   * Adds a neighbouring element to this atom.
   * 
   * @param {String} element A string representing an element.
   */


  addNeighbouringElement(element) {
    this.neighbouringElements.push(element);
  }
  /**
   * Attaches a pseudo element (e.g. Ac) to the atom.
   * @param {String} element The element identifier (e.g. Br, C, ...).
   * @param {String} previousElement The element that is part of the main chain (not the terminals that are converted to the pseudo element or concatinated).
   * @param {Number} [hydrogenCount=0] The number of hydrogens for the element.
   * @param {Number} [charge=0] The charge for the element.
   */


  attachPseudoElement(element, previousElement, hydrogenCount = 0, charge = 0) {
    if (hydrogenCount === null) {
      hydrogenCount = 0;
    }

    if (charge === null) {
      charge = 0;
    }

    let key = hydrogenCount + element + charge;

    if (this.attachedPseudoElements[key]) {
      this.attachedPseudoElements[key].count += 1;
    } else {
      this.attachedPseudoElements[key] = {
        element: element,
        count: 1,
        hydrogenCount: hydrogenCount,
        previousElement: previousElement,
        charge: charge
      };
    }

    this.hasAttachedPseudoElements = true;
  }
  /**
   * Returns the attached pseudo elements sorted by hydrogen count (ascending).
   *
   * @returns {Object} The sorted attached pseudo elements.
   */


  getAttachedPseudoElements() {
    let ordered = {};
    let that = this;
    Object.keys(this.attachedPseudoElements).sort().forEach(function (key) {
      ordered[key] = that.attachedPseudoElements[key];
    });
    return ordered;
  }
  /**
   * Returns the number of attached pseudo elements.
   *
   * @returns {Number} The number of attached pseudo elements.
   */


  getAttachedPseudoElementsCount() {
    return Object.keys(this.attachedPseudoElements).length;
  }
  /**
   * Returns whether this atom is a heteroatom (not C and not H).
   *
   * @returns {Boolean} A boolean indicating whether this atom is a heteroatom.
   */


  isHeteroAtom() {
    return this.element !== 'C' && this.element !== 'H';
  }
  /**
   * Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.
   *
   * @param {Number} ringId A ring id.
   */


  addAnchoredRing(ringId) {
    if (!ArrayHelper.contains(this.anchoredRings, {
      value: ringId
    })) {
      this.anchoredRings.push(ringId);
    }
  }
  /**
   * Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.
   *
   * @returns {Number} The number of ringbonds this atom is connected to.
   */


  getRingbondCount() {
    return this.ringbonds.length;
  }
  /**
   * Backs up the current rings.
   */


  backupRings() {
    this.originalRings = Array(this.rings.length);

    for (let i = 0; i < this.rings.length; i++) {
      this.originalRings[i] = this.rings[i];
    }
  }
  /**
   * Restores the most recent backed up rings.
   */


  restoreRings() {
    this.rings = Array(this.originalRings.length);

    for (let i = 0; i < this.originalRings.length; i++) {
      this.rings[i] = this.originalRings[i];
    }
  }
  /**
   * Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.
   *
   * @param {Atom} atomA An atom.
   * @param {Atom} atomB An atom.
   * @returns {Boolean} A boolean indicating whether or not two atoms share a common ringbond.
   */


  haveCommonRingbond(atomA, atomB) {
    for (let i = 0; i < atomA.ringbonds.length; i++) {
      for (let j = 0; j < atomB.ringbonds.length; j++) {
        if (atomA.ringbonds[i].id == atomB.ringbonds[j].id) {
          return true;
        }
      }
    }

    return false;
  }
  /**
   * Check whether or not the neighbouring elements of this atom equal the supplied array.
   * 
   * @param {String[]} arr An array containing all the elements that are neighbouring this atom. E.g. ['C', 'O', 'O', 'N']
   * @returns {Boolean} A boolean indicating whether or not the neighbours match the supplied array of elements.
   */


  neighbouringElementsEqual(arr) {
    if (arr.length !== this.neighbouringElements.length) {
      return false;
    }

    arr.sort();
    this.neighbouringElements.sort();

    for (var i = 0; i < this.neighbouringElements.length; i++) {
      if (arr[i] !== this.neighbouringElements[i]) {
        return false;
      }
    }

    return true;
  }
  /**
   * Get the atomic number of this atom.
   * 
   * @returns {Number} The atomic number of this atom.
   */


  getAtomicNumber() {
    return Atom.atomicNumbers[this.element];
  }
  /**
   * Get the maximum number of bonds for this atom.
   * 
   * @returns {Number} The maximum number of bonds of this atom.
   */


  getMaxBonds() {
    return Atom.maxBonds[this.element];
  }
  /**
   * A map mapping element symbols to their maximum bonds.
   */


  static get maxBonds() {
    return {
      'H': 1,
      'C': 4,
      'N': 3,
      'O': 2,
      'P': 3,
      'S': 2,
      'B': 3,
      'F': 1,
      'I': 1,
      'Cl': 1,
      'Br': 1
    };
  }
  /**
   * A map mapping element symbols to the atomic number.
   */


  static get atomicNumbers() {
    return {
      'H': 1,
      'He': 2,
      'Li': 3,
      'Be': 4,
      'B': 5,
      'b': 5,
      'C': 6,
      'c': 6,
      'N': 7,
      'n': 7,
      'O': 8,
      'o': 8,
      'F': 9,
      'Ne': 10,
      'Na': 11,
      'Mg': 12,
      'Al': 13,
      'Si': 14,
      'P': 15,
      'p': 15,
      'S': 16,
      's': 16,
      'Cl': 17,
      'Ar': 18,
      'K': 19,
      'Ca': 20,
      'Sc': 21,
      'Ti': 22,
      'V': 23,
      'Cr': 24,
      'Mn': 25,
      'Fe': 26,
      'Co': 27,
      'Ni': 28,
      'Cu': 29,
      'Zn': 30,
      'Ga': 31,
      'Ge': 32,
      'As': 33,
      'Se': 34,
      'Br': 35,
      'Kr': 36,
      'Rb': 37,
      'Sr': 38,
      'Y': 39,
      'Zr': 40,
      'Nb': 41,
      'Mo': 42,
      'Tc': 43,
      'Ru': 44,
      'Rh': 45,
      'Pd': 46,
      'Ag': 47,
      'Cd': 48,
      'In': 49,
      'Sn': 50,
      'Sb': 51,
      'Te': 52,
      'I': 53,
      'Xe': 54,
      'Cs': 55,
      'Ba': 56,
      'La': 57,
      'Ce': 58,
      'Pr': 59,
      'Nd': 60,
      'Pm': 61,
      'Sm': 62,
      'Eu': 63,
      'Gd': 64,
      'Tb': 65,
      'Dy': 66,
      'Ho': 67,
      'Er': 68,
      'Tm': 69,
      'Yb': 70,
      'Lu': 71,
      'Hf': 72,
      'Ta': 73,
      'W': 74,
      'Re': 75,
      'Os': 76,
      'Ir': 77,
      'Pt': 78,
      'Au': 79,
      'Hg': 80,
      'Tl': 81,
      'Pb': 82,
      'Bi': 83,
      'Po': 84,
      'At': 85,
      'Rn': 86,
      'Fr': 87,
      'Ra': 88,
      'Ac': 89,
      'Th': 90,
      'Pa': 91,
      'U': 92,
      'Np': 93,
      'Pu': 94,
      'Am': 95,
      'Cm': 96,
      'Bk': 97,
      'Cf': 98,
      'Es': 99,
      'Fm': 100,
      'Md': 101,
      'No': 102,
      'Lr': 103,
      'Rf': 104,
      'Db': 105,
      'Sg': 106,
      'Bh': 107,
      'Hs': 108,
      'Mt': 109,
      'Ds': 110,
      'Rg': 111,
      'Cn': 112,
      'Uut': 113,
      'Uuq': 114,
      'Uup': 115,
      'Uuh': 116,
      'Uus': 117,
      'Uuo': 118
    };
  }
  /**
   * A map mapping element symbols to the atomic mass.
   */


  static get mass() {
    return {
      'H': 1,
      'He': 2,
      'Li': 3,
      'Be': 4,
      'B': 5,
      'b': 5,
      'C': 6,
      'c': 6,
      'N': 7,
      'n': 7,
      'O': 8,
      'o': 8,
      'F': 9,
      'Ne': 10,
      'Na': 11,
      'Mg': 12,
      'Al': 13,
      'Si': 14,
      'P': 15,
      'p': 15,
      'S': 16,
      's': 16,
      'Cl': 17,
      'Ar': 18,
      'K': 19,
      'Ca': 20,
      'Sc': 21,
      'Ti': 22,
      'V': 23,
      'Cr': 24,
      'Mn': 25,
      'Fe': 26,
      'Co': 27,
      'Ni': 28,
      'Cu': 29,
      'Zn': 30,
      'Ga': 31,
      'Ge': 32,
      'As': 33,
      'Se': 34,
      'Br': 35,
      'Kr': 36,
      'Rb': 37,
      'Sr': 38,
      'Y': 39,
      'Zr': 40,
      'Nb': 41,
      'Mo': 42,
      'Tc': 43,
      'Ru': 44,
      'Rh': 45,
      'Pd': 46,
      'Ag': 47,
      'Cd': 48,
      'In': 49,
      'Sn': 50,
      'Sb': 51,
      'Te': 52,
      'I': 53,
      'Xe': 54,
      'Cs': 55,
      'Ba': 56,
      'La': 57,
      'Ce': 58,
      'Pr': 59,
      'Nd': 60,
      'Pm': 61,
      'Sm': 62,
      'Eu': 63,
      'Gd': 64,
      'Tb': 65,
      'Dy': 66,
      'Ho': 67,
      'Er': 68,
      'Tm': 69,
      'Yb': 70,
      'Lu': 71,
      'Hf': 72,
      'Ta': 73,
      'W': 74,
      'Re': 75,
      'Os': 76,
      'Ir': 77,
      'Pt': 78,
      'Au': 79,
      'Hg': 80,
      'Tl': 81,
      'Pb': 82,
      'Bi': 83,
      'Po': 84,
      'At': 85,
      'Rn': 86,
      'Fr': 87,
      'Ra': 88,
      'Ac': 89,
      'Th': 90,
      'Pa': 91,
      'U': 92,
      'Np': 93,
      'Pu': 94,
      'Am': 95,
      'Cm': 96,
      'Bk': 97,
      'Cf': 98,
      'Es': 99,
      'Fm': 100,
      'Md': 101,
      'No': 102,
      'Lr': 103,
      'Rf': 104,
      'Db': 105,
      'Sg': 106,
      'Bh': 107,
      'Hs': 108,
      'Mt': 109,
      'Ds': 110,
      'Rg': 111,
      'Cn': 112,
      'Uut': 113,
      'Uuq': 114,
      'Uup': 115,
      'Uuh': 116,
      'Uus': 117,
      'Uuo': 118
    };
  }

}

module.exports = Atom;

},{"./ArrayHelper":3,"./Ring":20,"./Vertex":29}],5:[function(require,module,exports){
"use strict";

//@ts-check
const MathHelper = require('./MathHelper');

const Vector2 = require('./Vector2');

const Line = require('./Line');

const Vertex = require('./Vertex');

const Ring = require('./Ring');

const {
  getChargeText
} = require('./UtilityFunctions');
/** 
 * A class wrapping a canvas element.
 * 
 * @property {HTMLElement} canvas The HTML element for the canvas associated with this CanvasWrapper instance.
 * @property {CanvasRenderingContext2D} ctx The CanvasRenderingContext2D of the canvas associated with this CanvasWrapper instance.
 * @property {Object} colors The colors object as defined in the SmilesDrawer options.
 * @property {Object} opts The SmilesDrawer options.
 * @property {Number} drawingWidth The width of the canvas.
 * @property {Number} drawingHeight The height of the canvas.
 * @property {Number} offsetX The horizontal offset required for centering the drawing.
 * @property {Number} offsetY The vertical offset required for centering the drawing.
 * @property {Number} fontLarge The large font size in pt.
 * @property {Number} fontSmall The small font size in pt.
 */


class CanvasWrapper {
  /**
   * The constructor for the class CanvasWrapper.
   *
   * @param {(String|HTMLElement)} target The canvas id or the canvas HTMLElement.
   * @param {ThemeManager} themeManager Theme manager for setting proper colors.
   * @param {Object} options The smiles drawer options object.
   */
  constructor(target, themeManager, options) {
    if (typeof target === 'string' || target instanceof String) {
      this.canvas = document.getElementById(target);
    } else {
      this.canvas = target;
    }

    this.ctx = this.canvas.getContext('2d');
    this.themeManager = themeManager;
    this.opts = options;
    this.drawingWidth = 0.0;
    this.drawingHeight = 0.0;
    this.offsetX = 0.0;
    this.offsetY = 0.0;
    this.fontLarge = this.opts.fontSizeLarge + 'pt Helvetica, Arial, sans-serif';
    this.fontSmall = this.opts.fontSizeSmall + 'pt Helvetica, Arial, sans-serif';
    this.updateSize(this.opts.width, this.opts.height);
    this.ctx.font = this.fontLarge;
    this.hydrogenWidth = this.ctx.measureText('H').width;
    this.halfHydrogenWidth = this.hydrogenWidth / 2.0;
    this.halfBondThickness = this.opts.bondThickness / 2.0; // TODO: Find out why clear was here.
    // this.clear();
  }
  /**
   * Update the width and height of the canvas
   * 
   * @param {Number} width 
   * @param {Number} height 
   */


  updateSize(width, height) {
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.backingStoreRatio = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1;
    this.ratio = this.devicePixelRatio / this.backingStoreRatio;

    if (this.ratio !== 1) {
      this.canvas.width = width * this.ratio;
      this.canvas.height = height * this.ratio;
      this.canvas.style.width = width + 'px';
      this.canvas.style.height = height + 'px';
      this.ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
    } else {
      this.canvas.width = width * this.ratio;
      this.canvas.height = height * this.ratio;
    }
  }
  /**
   * Sets a provided theme.
   *
   * @param {Object} theme A theme from the smiles drawer options.
   */


  setTheme(theme) {
    this.colors = theme;
  }
  /**
   * Scale the canvas based on vertex positions.
   *
   * @param {Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
   */


  scale(vertices) {
    // Figure out the final size of the image
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;

    for (var i = 0; i < vertices.length; i++) {
      if (!vertices[i].value.isDrawn) {
        continue;
      }

      let p = vertices[i].position;
      if (maxX < p.x) maxX = p.x;
      if (maxY < p.y) maxY = p.y;
      if (minX > p.x) minX = p.x;
      if (minY > p.y) minY = p.y;
    } // Add padding


    var padding = this.opts.padding;
    maxX += padding;
    maxY += padding;
    minX -= padding;
    minY -= padding;
    this.drawingWidth = maxX - minX;
    this.drawingHeight = maxY - minY;
    var scaleX = this.canvas.offsetWidth / this.drawingWidth;
    var scaleY = this.canvas.offsetHeight / this.drawingHeight;
    var scale = scaleX < scaleY ? scaleX : scaleY;
    this.ctx.scale(scale, scale);
    this.offsetX = -minX;
    this.offsetY = -minY; // Center

    if (scaleX < scaleY) {
      this.offsetY += this.canvas.offsetHeight / (2.0 * scale) - this.drawingHeight / 2.0;
    } else {
      this.offsetX += this.canvas.offsetWidth / (2.0 * scale) - this.drawingWidth / 2.0;
    }
  }
  /**
   * Resets the transform of the canvas.
   */


  reset() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  /**
   * Returns the hex code of a color associated with a key from the current theme.
   *
   * @param {String} key The color key in the theme (e.g. C, N, BACKGROUND, ...).
   * @returns {String} A color hex value.
   */


  getColor(key) {
    key = key.toUpperCase();

    if (key in this.colors) {
      return this.colors[key];
    }

    return this.colors['C'];
  }
  /**
   * Draws a circle to a canvas context.
   * @param {Number} x The x coordinate of the circles center.
   * @param {Number} y The y coordinate of the circles center.
   * @param {Number} radius The radius of the circle
   * @param {String} color A hex encoded color.
   * @param {Boolean} [fill=true] Whether to fill or stroke the circle.
   * @param {Boolean} [debug=false] Draw in debug mode.
   * @param {String} [debugText=''] A debug message.
   */


  drawCircle(x, y, radius, color, fill = true, debug = false, debugText = '') {
    let ctx = this.ctx;
    let offsetX = this.offsetX;
    let offsetY = this.offsetY;
    ctx.save();
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x + offsetX, y + offsetY, radius, 0, MathHelper.twoPI, true);
    ctx.closePath();

    if (debug) {
      if (fill) {
        ctx.fillStyle = '#f00';
        ctx.fill();
      } else {
        ctx.strokeStyle = '#f00';
        ctx.stroke();
      }

      this.drawDebugText(x, y, debugText);
    } else {
      if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
      } else {
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    }

    ctx.restore();
  }
  /**
   * Draw a line to a canvas.
   *
   * @param {Line} line A line.
   * @param {Boolean} [dashed=false] Whether or not the line is dashed.
   * @param {Number} [alpha=1.0] The alpha value of the color.
   */


  drawLine(line, dashed = false, alpha = 1.0) {
    let ctx = this.ctx;
    let offsetX = this.offsetX;
    let offsetY = this.offsetY; // Add a shadow behind the line

    let shortLine = line.clone().shorten(4.0);
    let l = shortLine.getLeftVector().clone();
    let r = shortLine.getRightVector().clone();
    l.x += offsetX;
    l.y += offsetY;
    r.x += offsetX;
    r.y += offsetY; // Draw the "shadow"

    if (!dashed) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(r.x, r.y);
      ctx.lineCap = 'round';
      ctx.lineWidth = this.opts.bondThickness + 1.2;
      ctx.strokeStyle = this.themeManager.getColor('BACKGROUND');
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();
    }

    l = line.getLeftVector().clone();
    r = line.getRightVector().clone();
    l.x += offsetX;
    l.y += offsetY;
    r.x += offsetX;
    r.y += offsetY;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(r.x, r.y);
    ctx.lineCap = 'round';
    ctx.lineWidth = this.opts.bondThickness;
    let gradient = this.ctx.createLinearGradient(l.x, l.y, r.x, r.y);
    gradient.addColorStop(0.4, this.themeManager.getColor(line.getLeftElement()) || this.themeManager.getColor('C'));
    gradient.addColorStop(0.6, this.themeManager.getColor(line.getRightElement()) || this.themeManager.getColor('C'));

    if (dashed) {
      ctx.setLineDash([1, 1.5]);
      ctx.lineWidth = this.opts.bondThickness / 1.5;
    }

    if (alpha < 1.0) {
      ctx.globalAlpha = alpha;
    }

    ctx.strokeStyle = gradient;
    ctx.stroke();
    ctx.restore();
  }
  /**
   * Draw a wedge on the canvas.
   *
   * @param {Line} line A line.
   * @param {Number} width The wedge width.
   */


  drawWedge(line, width = 1.0) {
    if (isNaN(line.from.x) || isNaN(line.from.y) || isNaN(line.to.x) || isNaN(line.to.y)) {
      return;
    }

    let ctx = this.ctx;
    let offsetX = this.offsetX;
    let offsetY = this.offsetY; // Add a shadow behind the line

    let shortLine = line.clone().shorten(5.0);
    let l = shortLine.getLeftVector().clone();
    let r = shortLine.getRightVector().clone();
    l.x += offsetX;
    l.y += offsetY;
    r.x += offsetX;
    r.y += offsetY;
    l = line.getLeftVector().clone();
    r = line.getRightVector().clone();
    l.x += offsetX;
    l.y += offsetY;
    r.x += offsetX;
    r.y += offsetY;
    ctx.save();
    let normals = Vector2.normals(l, r);
    normals[0].normalize();
    normals[1].normalize();
    let isRightChiralCenter = line.getRightChiral();
    let start = l;
    let end = r;

    if (isRightChiralCenter) {
      start = r;
      end = l;
    }

    let t = Vector2.add(start, Vector2.multiplyScalar(normals[0], this.halfBondThickness));
    let u = Vector2.add(end, Vector2.multiplyScalar(normals[0], 1.5 + this.halfBondThickness));
    let v = Vector2.add(end, Vector2.multiplyScalar(normals[1], 1.5 + this.halfBondThickness));
    let w = Vector2.add(start, Vector2.multiplyScalar(normals[1], this.halfBondThickness));
    ctx.beginPath();
    ctx.moveTo(t.x, t.y);
    ctx.lineTo(u.x, u.y);
    ctx.lineTo(v.x, v.y);
    ctx.lineTo(w.x, w.y);
    let gradient = this.ctx.createRadialGradient(r.x, r.y, this.opts.bondLength, r.x, r.y, 0);
    gradient.addColorStop(0.4, this.themeManager.getColor(line.getLeftElement()) || this.themeManager.getColor('C'));
    gradient.addColorStop(0.6, this.themeManager.getColor(line.getRightElement()) || this.themeManager.getColor('C'));
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  }
  /**
   * Draw a dashed wedge on the canvas.
   *
   * @param {Line} line A line.
   */


  drawDashedWedge(line) {
    if (isNaN(line.from.x) || isNaN(line.from.y) || isNaN(line.to.x) || isNaN(line.to.y)) {
      return;
    }

    let ctx = this.ctx;
    let offsetX = this.offsetX;
    let offsetY = this.offsetY;
    let l = line.getLeftVector().clone();
    let r = line.getRightVector().clone();
    l.x += offsetX;
    l.y += offsetY;
    r.x += offsetX;
    r.y += offsetY;
    ctx.save();
    let normals = Vector2.normals(l, r);
    normals[0].normalize();
    normals[1].normalize();
    let isRightChiralCenter = line.getRightChiral();
    let start;
    let end;
    let sStart;
    let sEnd;
    let shortLine = line.clone();

    if (isRightChiralCenter) {
      start = r;
      end = l;
      shortLine.shortenRight(1.0);
      sStart = shortLine.getRightVector().clone();
      sEnd = shortLine.getLeftVector().clone();
    } else {
      start = l;
      end = r;
      shortLine.shortenLeft(1.0);
      sStart = shortLine.getLeftVector().clone();
      sEnd = shortLine.getRightVector().clone();
    }

    sStart.x += offsetX;
    sStart.y += offsetY;
    sEnd.x += offsetX;
    sEnd.y += offsetY;
    let dir = Vector2.subtract(end, start).normalize();
    ctx.strokeStyle = this.themeManager.getColor('C');
    ctx.lineCap = 'round';
    ctx.lineWidth = this.opts.bondThickness;
    ctx.beginPath();
    let length = line.getLength();
    let step = 1.25 / (length / (this.opts.bondThickness * 3.0));
    let changed = false;

    for (var t = 0.0; t < 1.0; t += step) {
      let to = Vector2.multiplyScalar(dir, t * length);
      let startDash = Vector2.add(start, to);
      let width = 1.5 * t;
      let dashOffset = Vector2.multiplyScalar(normals[0], width);

      if (!changed && t > 0.5) {
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = this.themeManager.getColor(line.getRightElement()) || this.themeManager.getColor('C');
        changed = true;
      }

      startDash.subtract(dashOffset);
      ctx.moveTo(startDash.x, startDash.y);
      startDash.add(Vector2.multiplyScalar(dashOffset, 2.0));
      ctx.lineTo(startDash.x, startDash.y);
    }

    ctx.stroke();
    ctx.restore();
  }
  /**
   * Draws a debug text message at a given position
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordinate.
   * @param {String} text The debug text.
   */


  drawDebugText(x, y, text) {
    let ctx = this.ctx;
    ctx.save();
    ctx.font = '5px Droid Sans, sans-serif';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ff0000';
    ctx.fillText(text, x + this.offsetX, y + this.offsetY);
    ctx.restore();
  }
  /**
   * Draw a ball to the canvas.
   *
   * @param {Number} x The x position of the text.
   * @param {Number} y The y position of the text.
   * @param {String} elementName The name of the element (single-letter).
   */


  drawBall(x, y, elementName) {
    let ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + this.offsetX, y + this.offsetY, this.opts.bondLength / 4.5, 0, MathHelper.twoPI, false);
    ctx.fillStyle = this.themeManager.getColor(elementName);
    ctx.fill();
    ctx.restore();
  }
  /**
   * Draw a point to the canvas.
   *
   * @param {Number} x The x position of the point.
   * @param {Number} y The y position of the point.
   * @param {String} elementName The name of the element (single-letter).
   */


  drawPoint(x, y, elementName) {
    let ctx = this.ctx;
    let offsetX = this.offsetX;
    let offsetY = this.offsetY;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x + offsetX, y + offsetY, 1.5, 0, MathHelper.twoPI, true);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.arc(x + this.offsetX, y + this.offsetY, 0.75, 0, MathHelper.twoPI, false);
    ctx.fillStyle = this.themeManager.getColor(elementName);
    ctx.fill();
    ctx.restore();
  }
  /**
   * Draw a text to the canvas.
   *
   * @param {Number} x The x position of the text.
   * @param {Number} y The y position of the text.
   * @param {String} elementName The name of the element (single-letter).
   * @param {Number} hydrogens The number of hydrogen atoms.
   * @param {String} direction The direction of the text in relation to the associated vertex.
   * @param {Boolean} isTerminal A boolean indicating whether or not the vertex is terminal.
   * @param {Number} charge The charge of the atom.
   * @param {Number} isotope The isotope number.
   * @param {Number} vertexCount The number of vertices in the molecular graph.
   * @param {Object} attachedPseudoElement A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count.
   * @param {String} attachedPseudoElement.element The element symbol.
   * @param {Number} attachedPseudoElement.count The number of occurences that match the key.
   * @param {Number} attachedPseudoElement.hyrogenCount The number of hydrogens attached to each atom matching the key.
   */


  drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, vertexCount, attachedPseudoElement = {}) {
    let ctx = this.ctx;
    let offsetX = this.offsetX;
    let offsetY = this.offsetY;
    ctx.save();
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';
    let pseudoElementHandled = false; // Charge

    let chargeText = '';
    let chargeWidth = 0;

    if (charge) {
      chargeText = getChargeText(charge);
      ctx.font = this.fontSmall;
      chargeWidth = ctx.measureText(chargeText).width;
    }

    let isotopeText = '0';
    let isotopeWidth = 0;

    if (isotope > 0) {
      isotopeText = isotope.toString();
      ctx.font = this.fontSmall;
      isotopeWidth = ctx.measureText(isotopeText).width;
    } // TODO: Better handle exceptions
    // Exception for nitro (draw nitro as NO2 instead of N+O-O)


    if (charge === 1 && elementName === 'N' && attachedPseudoElement.hasOwnProperty('0O') && attachedPseudoElement.hasOwnProperty('0O-1')) {
      attachedPseudoElement = {
        '0O': {
          element: 'O',
          count: 2,
          hydrogenCount: 0,
          previousElement: 'C',
          charge: ''
        }
      };
      charge = 0;
    }

    ctx.font = this.fontLarge;
    ctx.fillStyle = this.themeManager.getColor('BACKGROUND');
    let dim = ctx.measureText(elementName);
    dim.totalWidth = dim.width + chargeWidth;
    dim.height = parseInt(this.fontLarge, 10);
    let r = dim.width > this.opts.fontSizeLarge ? dim.width : this.opts.fontSizeLarge;
    r /= 1.5;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x + offsetX, y + offsetY, r, 0, MathHelper.twoPI, true);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    let cursorPos = -dim.width / 2.0;
    let cursorPosLeft = -dim.width / 2.0;
    ctx.fillStyle = this.themeManager.getColor(elementName);
    ctx.fillText(elementName, x + offsetX + cursorPos, y + this.opts.halfFontSizeLarge + offsetY);
    cursorPos += dim.width;

    if (charge) {
      ctx.font = this.fontSmall;
      ctx.fillText(chargeText, x + offsetX + cursorPos, y - this.opts.fifthFontSizeSmall + offsetY);
      cursorPos += chargeWidth;
    }

    if (isotope > 0) {
      ctx.font = this.fontSmall;
      ctx.fillText(isotopeText, x + offsetX + cursorPosLeft - isotopeWidth, y - this.opts.fifthFontSizeSmall + offsetY);
      cursorPosLeft -= isotopeWidth;
    }

    ctx.font = this.fontLarge;
    let hydrogenWidth = 0;
    let hydrogenCountWidth = 0;

    if (hydrogens === 1) {
      let hx = x + offsetX;
      let hy = y + offsetY + this.opts.halfFontSizeLarge;
      hydrogenWidth = this.hydrogenWidth;
      cursorPosLeft -= hydrogenWidth;

      if (direction === 'left') {
        hx += cursorPosLeft;
      } else if (direction === 'right') {
        hx += cursorPos;
      } else if (direction === 'up' && isTerminal) {
        hx += cursorPos;
      } else if (direction === 'down' && isTerminal) {
        hx += cursorPos;
      } else if (direction === 'up' && !isTerminal) {
        hy -= this.opts.fontSizeLarge + this.opts.quarterFontSizeLarge;
        hx -= this.halfHydrogenWidth;
      } else if (direction === 'down' && !isTerminal) {
        hy += this.opts.fontSizeLarge + this.opts.quarterFontSizeLarge;
        hx -= this.halfHydrogenWidth;
      }

      ctx.fillText('H', hx, hy);
      cursorPos += hydrogenWidth;
    } else if (hydrogens > 1) {
      let hx = x + offsetX;
      let hy = y + offsetY + this.opts.halfFontSizeLarge;
      hydrogenWidth = this.hydrogenWidth;
      ctx.font = this.fontSmall;
      hydrogenCountWidth = ctx.measureText(hydrogens).width;
      cursorPosLeft -= hydrogenWidth + hydrogenCountWidth;

      if (direction === 'left') {
        hx += cursorPosLeft;
      } else if (direction === 'right') {
        hx += cursorPos;
      } else if (direction === 'up' && isTerminal) {
        hx += cursorPos;
      } else if (direction === 'down' && isTerminal) {
        hx += cursorPos;
      } else if (direction === 'up' && !isTerminal) {
        hy -= this.opts.fontSizeLarge + this.opts.quarterFontSizeLarge;
        hx -= this.halfHydrogenWidth;
      } else if (direction === 'down' && !isTerminal) {
        hy += this.opts.fontSizeLarge + this.opts.quarterFontSizeLarge;
        hx -= this.halfHydrogenWidth;
      }

      ctx.font = this.fontLarge;
      ctx.fillText('H', hx, hy);
      ctx.font = this.fontSmall;
      ctx.fillText(hydrogens, hx + this.halfHydrogenWidth + hydrogenCountWidth, hy + this.opts.fifthFontSizeSmall);
      cursorPos += hydrogenWidth + this.halfHydrogenWidth + hydrogenCountWidth;
    }

    if (pseudoElementHandled) {
      ctx.restore();
      return;
    }

    for (let key in attachedPseudoElement) {
      if (!attachedPseudoElement.hasOwnProperty(key)) {
        continue;
      }

      let openParenthesisWidth = 0;
      let closeParenthesisWidth = 0;
      let element = attachedPseudoElement[key].element;
      let elementCount = attachedPseudoElement[key].count;
      let hydrogenCount = attachedPseudoElement[key].hydrogenCount;
      let elementCharge = attachedPseudoElement[key].charge;
      ctx.font = this.fontLarge;

      if (elementCount > 1 && hydrogenCount > 0) {
        openParenthesisWidth = ctx.measureText('(').width;
        closeParenthesisWidth = ctx.measureText(')').width;
      }

      let elementWidth = ctx.measureText(element).width;
      let elementCountWidth = 0;
      let elementChargeText = '';
      let elementChargeWidth = 0;
      hydrogenWidth = 0;

      if (hydrogenCount > 0) {
        hydrogenWidth = this.hydrogenWidth;
      }

      ctx.font = this.fontSmall;

      if (elementCount > 1) {
        elementCountWidth = ctx.measureText(elementCount).width;
      }

      if (elementCharge !== 0) {
        elementChargeText = getChargeText(elementCharge);
        elementChargeWidth = ctx.measureText(elementChargeText).width;
      }

      hydrogenCountWidth = 0;

      if (hydrogenCount > 1) {
        hydrogenCountWidth = ctx.measureText(hydrogenCount).width;
      }

      ctx.font = this.fontLarge;
      let hx = x + offsetX;
      let hy = y + offsetY + this.opts.halfFontSizeLarge;
      ctx.fillStyle = this.themeManager.getColor(element);

      if (elementCount > 0) {
        cursorPosLeft -= elementCountWidth;
      }

      if (elementCount > 1 && hydrogenCount > 0) {
        if (direction === 'left') {
          cursorPosLeft -= closeParenthesisWidth;
          ctx.fillText(')', hx + cursorPosLeft, hy);
        } else {
          ctx.fillText('(', hx + cursorPos, hy);
          cursorPos += openParenthesisWidth;
        }
      }

      if (direction === 'left') {
        cursorPosLeft -= elementWidth;
        ctx.fillText(element, hx + cursorPosLeft, hy);
      } else {
        ctx.fillText(element, hx + cursorPos, hy);
        cursorPos += elementWidth;
      }

      if (hydrogenCount > 0) {
        if (direction === 'left') {
          cursorPosLeft -= hydrogenWidth + hydrogenCountWidth;
          ctx.fillText('H', hx + cursorPosLeft, hy);

          if (hydrogenCount > 1) {
            ctx.font = this.fontSmall;
            ctx.fillText(hydrogenCount, hx + cursorPosLeft + hydrogenWidth, hy + this.opts.fifthFontSizeSmall);
          }
        } else {
          ctx.fillText('H', hx + cursorPos, hy);
          cursorPos += hydrogenWidth;

          if (hydrogenCount > 1) {
            ctx.font = this.fontSmall;
            ctx.fillText(hydrogenCount, hx + cursorPos, hy + this.opts.fifthFontSizeSmall);
            cursorPos += hydrogenCountWidth;
          }
        }
      }

      ctx.font = this.fontLarge;

      if (elementCount > 1 && hydrogenCount > 0) {
        if (direction === 'left') {
          cursorPosLeft -= openParenthesisWidth;
          ctx.fillText('(', hx + cursorPosLeft, hy);
        } else {
          ctx.fillText(')', hx + cursorPos, hy);
          cursorPos += closeParenthesisWidth;
        }
      }

      ctx.font = this.fontSmall;

      if (elementCount > 1) {
        if (direction === 'left') {
          ctx.fillText(elementCount, hx + cursorPosLeft + openParenthesisWidth + closeParenthesisWidth + hydrogenWidth + hydrogenCountWidth + elementWidth, hy + this.opts.fifthFontSizeSmall);
        } else {
          ctx.fillText(elementCount, hx + cursorPos, hy + this.opts.fifthFontSizeSmall);
          cursorPos += elementCountWidth;
        }
      }

      if (elementCharge !== 0) {
        if (direction === 'left') {
          ctx.fillText(elementChargeText, hx + cursorPosLeft + openParenthesisWidth + closeParenthesisWidth + hydrogenWidth + hydrogenCountWidth + elementWidth, y - this.opts.fifthFontSizeSmall + offsetY);
        } else {
          ctx.fillText(elementChargeText, hx + cursorPos, y - this.opts.fifthFontSizeSmall + offsetY);
          cursorPos += elementChargeWidth;
        }
      }
    }

    ctx.restore();
  }
  /**
   * Translate the integer indicating the charge to the appropriate text.
   * @param {Number} charge The integer indicating the charge.
   * @returns {String} A string representing a charge.
   */


  getChargeText(charge) {
    if (charge === 1) {
      return '+';
    } else if (charge === 2) {
      return '2+';
    } else if (charge === -1) {
      return '-';
    } else if (charge === -2) {
      return '2-';
    } else {
      return '';
    }
  }
  /**
   * Draws a dubug dot at a given coordinate and adds text.
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordindate.
   * @param {String} [debugText=''] A string.
   * @param {String} [color='#f00'] A color in hex form.
   */


  drawDebugPoint(x, y, debugText = '', color = '#f00') {
    this.drawCircle(x, y, 2, color, true, true, debugText);
  }
  /**
   * Draws a ring inside a provided ring, indicating aromaticity.
   *
   * @param {Ring} ring A ring.
   */


  drawAromaticityRing(ring) {
    let ctx = this.ctx;
    let radius = MathHelper.apothemFromSideLength(this.opts.bondLength, ring.getSize());
    ctx.save();
    ctx.strokeStyle = this.themeManager.getColor('C');
    ctx.lineWidth = this.opts.bondThickness;
    ctx.beginPath();
    ctx.arc(ring.center.x + this.offsetX, ring.center.y + this.offsetY, radius - this.opts.bondSpacing, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  /**
   * Clear the canvas.
   *
   */


  clear() {
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
  }

}

module.exports = CanvasWrapper;

},{"./Line":12,"./MathHelper":13,"./Ring":20,"./UtilityFunctions":27,"./Vector2":28,"./Vertex":29}],6:[function(require,module,exports){
"use strict";

//@ts-check
const SvgDrawer = require('./SvgDrawer');
/** 
 * The main class of the application representing the smiles drawer 
 * 
 * @property {Graph} graph The graph associated with this SmilesDrawer.Drawer instance.
 * @property {Number} ringIdCounter An internal counter to keep track of ring ids.
 * @property {Number} ringConnectionIdCounter An internal counter to keep track of ring connection ids.
 * @property {CanvasWrapper} canvasWrapper The CanvasWrapper associated with this SmilesDrawer.Drawer instance.
 * @property {Number} totalOverlapScore The current internal total overlap score.
 * @property {Object} defaultOptions The default options.
 * @property {Object} opts The merged options.
 * @property {Object} theme The current theme.
 */


class Drawer {
  /**
   * The constructor for the class SmilesDrawer.
   *
   * @param {Object} options An object containing custom values for different options. It is merged with the default options.
   */
  constructor(options) {
    this.svgDrawer = new SvgDrawer(options);
  }
  /**
   * Draws the parsed smiles data to a canvas element.
   *
   * @param {Object} data The tree returned by the smiles parser.
   * @param {(String|HTMLCanvasElement)} target The id of the HTML canvas element the structure is drawn to - or the element itself.
   * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
   * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
   */


  draw(data, target, themeName = 'light', infoOnly = false, highlight_atoms = []) {
    let canvas = null;

    if (typeof target === 'string' || target instanceof String) {
      canvas = document.getElementById(target);
    } else {
      canvas = target;
    }

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.svgDrawer.opts.width + ' ' + this.svgDrawer.opts.height);
    svg.setAttributeNS(null, 'width', this.svgDrawer.opts.width + '');
    svg.setAttributeNS(null, 'height', this.svgDrawer.opts.height + '');
    this.svgDrawer.draw(data, svg, themeName, infoOnly, highlight_atoms);
    this.svgDrawer.svgWrapper.toCanvas(canvas, this.svgDrawer.opts.width, this.svgDrawer.opts.height);
  }
  /**
   * Returns the total overlap score of the current molecule.
   *
   * @returns {Number} The overlap score.
   */


  getTotalOverlapScore() {
    return this.svgDrawer.getTotalOverlapScore();
  }
  /**
   * Returns the molecular formula of the loaded molecule as a string.
   * 
   * @returns {String} The molecular formula.
   */


  getMolecularFormula() {
    this.svgDrawer.getMolecularFormula();
  }

}

module.exports = Drawer;

},{"./SvgDrawer":24}],7:[function(require,module,exports){
"use strict";

//@ts-check
const MathHelper = require('./MathHelper');

const ArrayHelper = require('./ArrayHelper');

const Vector2 = require('./Vector2');

const Line = require('./Line');

const Vertex = require('./Vertex');

const Edge = require('./Edge');

const Atom = require('./Atom');

const Ring = require('./Ring');

const RingConnection = require('./RingConnection');

const CanvasWrapper = require('./CanvasWrapper');

const Graph = require('./Graph');

const SSSR = require('./SSSR');

const ThemeManager = require('./ThemeManager');

const Options = require('./Options');
/** 
 * The main class of the application representing the smiles drawer 
 * 
 * @property {Graph} graph The graph associated with this SmilesDrawer.Drawer instance.
 * @property {Number} ringIdCounter An internal counter to keep track of ring ids.
 * @property {Number} ringConnectionIdCounter An internal counter to keep track of ring connection ids.
 * @property {CanvasWrapper} canvasWrapper The CanvasWrapper associated with this SmilesDrawer.Drawer instance.
 * @property {Number} totalOverlapScore The current internal total overlap score.
 * @property {Object} defaultOptions The default options.
 * @property {Object} opts The merged options.
 * @property {Object} theme The current theme.
 */


class DrawerBase {
  /**
   * The constructor for the class SmilesDrawer.
   *
   * @param {Object} options An object containing custom values for different options. It is merged with the default options.
   */
  constructor(options) {
    this.graph = null;
    this.doubleBondConfigCount = 0;
    this.doubleBondConfig = null;
    this.ringIdCounter = 0;
    this.ringConnectionIdCounter = 0;
    this.canvasWrapper = null;
    this.totalOverlapScore = 0;
    this.defaultOptions = {
      width: 500,
      height: 500,
      scale: 0.0,
      bondThickness: 1.0,
      bondLength: 30,
      shortBondLength: 0.8,
      bondSpacing: 0.17 * 30,
      atomVisualization: 'default',
      isomeric: true,
      debug: false,
      terminalCarbons: false,
      explicitHydrogens: true,
      overlapSensitivity: 0.42,
      overlapResolutionIterations: 1,
      compactDrawing: true,
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSizeLarge: 11,
      fontSizeSmall: 3,
      padding: 10.0,
      experimentalSSSR: false,
      kkThreshold: 0.1,
      kkInnerThreshold: 0.1,
      kkMaxIteration: 20000,
      kkMaxInnerIteration: 50,
      kkMaxEnergy: 1e9,
      weights: {
        colormap: null,
        additionalPadding: 20.0,
        sigma: 10,
        interval: 0.0,
        opacity: 1.0
      },
      themes: {
        dark: {
          C: '#fff',
          O: '#e74c3c',
          N: '#3498db',
          F: '#27ae60',
          CL: '#16a085',
          BR: '#d35400',
          I: '#8e44ad',
          P: '#d35400',
          S: '#f1c40f',
          B: '#e67e22',
          SI: '#e67e22',
          H: '#aaa',
          BACKGROUND: '#141414'
        },
        light: {
          C: '#222',
          O: '#e74c3c',
          N: '#3498db',
          F: '#27ae60',
          CL: '#16a085',
          BR: '#d35400',
          I: '#8e44ad',
          P: '#d35400',
          S: '#f1c40f',
          B: '#e67e22',
          SI: '#e67e22',
          H: '#666',
          BACKGROUND: '#fff'
        },
        oldschool: {
          C: '#000',
          O: '#000',
          N: '#000',
          F: '#000',
          CL: '#000',
          BR: '#000',
          I: '#000',
          P: '#000',
          S: '#000',
          B: '#000',
          SI: '#000',
          H: '#000',
          BACKGROUND: '#fff'
        },
        "solarized": {
          C: "#586e75",
          O: "#dc322f",
          N: "#268bd2",
          F: "#859900",
          CL: "#16a085",
          BR: "#cb4b16",
          I: "#6c71c4",
          P: "#d33682",
          S: "#b58900",
          B: "#2aa198",
          SI: "#2aa198",
          H: "#657b83",
          BACKGROUND: "#fff"
        },
        "solarized-dark": {
          C: "#93a1a1",
          O: "#dc322f",
          N: "#268bd2",
          F: "#859900",
          CL: "#16a085",
          BR: "#cb4b16",
          I: "#6c71c4",
          P: "#d33682",
          S: "#b58900",
          B: "#2aa198",
          SI: "#2aa198",
          H: "#839496",
          BACKGROUND: "#fff"
        },
        "matrix": {
          C: "#678c61",
          O: "#2fc079",
          N: "#4f7e7e",
          F: "#90d762",
          CL: "#82d967",
          BR: "#23755a",
          I: "#409931",
          P: "#c1ff8a",
          S: "#faff00",
          B: "#50b45a",
          SI: "#409931",
          H: "#426644",
          BACKGROUND: "#fff"
        },
        "github": {
          C: "#24292f",
          O: "#cf222e",
          N: "#0969da",
          F: "#2da44e",
          CL: "#6fdd8b",
          BR: "#bc4c00",
          I: "#8250df",
          P: "#bf3989",
          S: "#d4a72c",
          B: "#fb8f44",
          SI: "#bc4c00",
          H: "#57606a",
          BACKGROUND: "#fff"
        },
        "carbon": {
          C: "#161616",
          O: "#da1e28",
          N: "#0f62fe",
          F: "#198038",
          CL: "#007d79",
          BR: "#fa4d56",
          I: "#8a3ffc",
          P: "#ff832b",
          S: "#f1c21b",
          B: "#8a3800",
          SI: "#e67e22",
          H: "#525252",
          BACKGROUND: "#fff"
        },
        "cyberpunk": {
          C: "#ea00d9",
          O: "#ff3131",
          N: "#0abdc6",
          F: "#00ff9f",
          CL: "#00fe00",
          BR: "#fe9f20",
          I: "#ff00ff",
          P: "#fe7f00",
          S: "#fcee0c",
          B: "#ff00ff",
          SI: "#ffffff",
          H: "#913cb1",
          BACKGROUND: "#fff"
        },
        "gruvbox": {
          C: "#665c54",
          O: "#cc241d",
          N: "#458588",
          F: "#98971a",
          CL: "#79740e",
          BR: "#d65d0e",
          I: "#b16286",
          P: "#af3a03",
          S: "#d79921",
          B: "#689d6a",
          SI: "#427b58",
          H: "#7c6f64",
          BACKGROUND: "#fbf1c7"
        },
        "gruvbox-dark": {
          C: "#ebdbb2",
          O: "#cc241d",
          N: "#458588",
          F: "#98971a",
          CL: "#b8bb26",
          BR: "#d65d0e",
          I: "#b16286",
          P: "#fe8019",
          S: "#d79921",
          B: "#8ec07c",
          SI: "#83a598",
          H: "#bdae93",
          BACKGROUND: "#282828"
        },
        custom: {
          C: '#222',
          O: '#e74c3c',
          N: '#3498db',
          F: '#27ae60',
          CL: '#16a085',
          BR: '#d35400',
          I: '#8e44ad',
          P: '#d35400',
          S: '#f1c40f',
          B: '#e67e22',
          SI: '#e67e22',
          H: '#666',
          BACKGROUND: '#fff'
        }
      }
    };
    this.opts = Options.extend(true, this.defaultOptions, options);
    this.opts.halfBondSpacing = this.opts.bondSpacing / 2.0;
    this.opts.bondLengthSq = this.opts.bondLength * this.opts.bondLength;
    this.opts.halfFontSizeLarge = this.opts.fontSizeLarge / 2.0;
    this.opts.quarterFontSizeLarge = this.opts.fontSizeLarge / 4.0;
    this.opts.fifthFontSizeSmall = this.opts.fontSizeSmall / 5.0; // Set the default theme.

    this.theme = this.opts.themes.dark;
  }
  /**
   * Draws the parsed smiles data to a canvas element.
   *
   * @param {Object} data The tree returned by the smiles parser.
   * @param {(String|HTMLCanvasElement)} target The id of the HTML canvas element the structure is drawn to - or the element itself.
   * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
   * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
   */


  draw(data, target, themeName = 'light', infoOnly = false) {
    this.initDraw(data, themeName, infoOnly);

    if (!this.infoOnly) {
      this.themeManager = new ThemeManager(this.opts.themes, themeName);
      this.canvasWrapper = new CanvasWrapper(target, this.themeManager, this.opts);
    }

    if (!infoOnly) {
      this.processGraph(); // Set the canvas to the appropriate size

      this.canvasWrapper.scale(this.graph.vertices); // Do the actual drawing

      this.drawEdges(this.opts.debug);
      this.drawVertices(this.opts.debug);
      this.canvasWrapper.reset();

      if (this.opts.debug) {
        console.log(this.graph);
        console.log(this.rings);
        console.log(this.ringConnections);
      }
    }
  }
  /**
   * Returns the number of rings this edge is a part of.
   *
   * @param {Number} edgeId The id of an edge.
   * @returns {Number} The number of rings the provided edge is part of.
   */


  edgeRingCount(edgeId) {
    let edge = this.graph.edges[edgeId];
    let a = this.graph.vertices[edge.sourceId];
    let b = this.graph.vertices[edge.targetId];
    return Math.min(a.value.rings.length, b.value.rings.length);
  }
  /**
   * Returns an array containing the bridged rings associated with this  molecule.
   *
   * @returns {Ring[]} An array containing all bridged rings associated with this molecule.
   */


  getBridgedRings() {
    let bridgedRings = Array();

    for (var i = 0; i < this.rings.length; i++) {
      if (this.rings[i].isBridged) {
        bridgedRings.push(this.rings[i]);
      }
    }

    return bridgedRings;
  }
  /**
   * Returns an array containing all fused rings associated with this molecule.
   *
   * @returns {Ring[]} An array containing all fused rings associated with this molecule.
   */


  getFusedRings() {
    let fusedRings = Array();

    for (var i = 0; i < this.rings.length; i++) {
      if (this.rings[i].isFused) {
        fusedRings.push(this.rings[i]);
      }
    }

    return fusedRings;
  }
  /**
   * Returns an array containing all spiros associated with this molecule.
   *
   * @returns {Ring[]} An array containing all spiros associated with this molecule.
   */


  getSpiros() {
    let spiros = Array();

    for (var i = 0; i < this.rings.length; i++) {
      if (this.rings[i].isSpiro) {
        spiros.push(this.rings[i]);
      }
    }

    return spiros;
  }
  /**
   * Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings)
   *
   * @returns {String} A string as described in the method description.
   */


  printRingInfo() {
    let result = '';

    for (var i = 0; i < this.rings.length; i++) {
      const ring = this.rings[i];
      result += ring.id + ';';
      result += ring.members.length + ';';
      result += ring.neighbours.length + ';';
      result += ring.isSpiro ? 'true;' : 'false;';
      result += ring.isFused ? 'true;' : 'false;';
      result += ring.isBridged ? 'true;' : 'false;';
      result += ring.rings.length + ';';
      result += '\n';
    }

    return result;
  }
  /**
   * Rotates the drawing to make the widest dimension horizontal.
   */


  rotateDrawing() {
    // Rotate the vertices to make the molecule align horizontally
    // Find the longest distance
    let a = 0;
    let b = 0;
    let maxDist = 0;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertexA = this.graph.vertices[i];

      if (!vertexA.value.isDrawn) {
        continue;
      }

      for (var j = i + 1; j < this.graph.vertices.length; j++) {
        let vertexB = this.graph.vertices[j];

        if (!vertexB.value.isDrawn) {
          continue;
        }

        let dist = vertexA.position.distanceSq(vertexB.position);

        if (dist > maxDist) {
          maxDist = dist;
          a = i;
          b = j;
        }
      }
    }

    let angle = -Vector2.subtract(this.graph.vertices[a].position, this.graph.vertices[b].position).angle();

    if (!isNaN(angle)) {
      // Round to 30 degrees
      let remainder = angle % 0.523599; // Round either up or down in 30 degree steps

      if (remainder < 0.2617995) {
        angle = angle - remainder;
      } else {
        angle += 0.523599 - remainder;
      } // Finally, rotate everything


      for (var i = 0; i < this.graph.vertices.length; i++) {
        if (i === b) {
          continue;
        }

        this.graph.vertices[i].position.rotateAround(angle, this.graph.vertices[b].position);
      }

      for (var i = 0; i < this.rings.length; i++) {
        this.rings[i].center.rotateAround(angle, this.graph.vertices[b].position);
      }
    }
  }
  /**
   * Returns the total overlap score of the current molecule.
   *
   * @returns {Number} The overlap score.
   */


  getTotalOverlapScore() {
    return this.totalOverlapScore;
  }
  /**
   * Returns the ring count of the current molecule.
   *
   * @returns {Number} The ring count.
   */


  getRingCount() {
    return this.rings.length;
  }
  /**
   * Checks whether or not the current molecule  a bridged ring.
   *
   * @returns {Boolean} A boolean indicating whether or not the current molecule  a bridged ring.
   */


  hasBridgedRing() {
    return this.bridgedRing;
  }
  /**
   * Returns the number of heavy atoms (non-hydrogen) in the current molecule.
   *
   * @returns {Number} The heavy atom count.
   */


  getHeavyAtomCount() {
    let hac = 0;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      if (this.graph.vertices[i].value.element !== 'H') {
        hac++;
      }
    }

    return hac;
  }
  /**
   * Returns the molecular formula of the loaded molecule as a string.
   * 
   * @returns {String} The molecular formula.
   */


  getMolecularFormula(data = null) {
    let molecularFormula = '';
    let counts = new Map();
    let graph = data === null ? this.graph : new Graph(data, this.opts.isomeric); // Initialize element count

    for (var i = 0; i < graph.vertices.length; i++) {
      let atom = graph.vertices[i].value;

      if (counts.has(atom.element)) {
        counts.set(atom.element, counts.get(atom.element) + 1);
      } else {
        counts.set(atom.element, 1);
      } // Hydrogens attached to a chiral center were added as vertices,
      // those in non chiral brackets are added here


      if (atom.bracket && !atom.bracket.chirality) {
        if (counts.has('H')) {
          counts.set('H', counts.get('H') + atom.bracket.hcount);
        } else {
          counts.set('H', atom.bracket.hcount);
        }
      } // Add the implicit hydrogens according to valency, exclude
      // bracket atoms as they were handled and always have the number
      // of hydrogens specified explicitly


      if (!atom.bracket) {
        let nHydrogens = Atom.maxBonds[atom.element] - atom.bondCount;

        if (atom.isPartOfAromaticRing) {
          nHydrogens--;
        }

        if (counts.has('H')) {
          counts.set('H', counts.get('H') + nHydrogens);
        } else {
          counts.set('H', nHydrogens);
        }
      }
    }

    if (counts.has('C')) {
      let count = counts.get('C');
      molecularFormula += 'C' + (count > 1 ? count : '');
      counts.delete('C');
    }

    if (counts.has('H')) {
      let count = counts.get('H');
      molecularFormula += 'H' + (count > 1 ? count : '');
      counts.delete('H');
    }

    let elements = Object.keys(Atom.atomicNumbers).sort();
    elements.map(e => {
      if (counts.has(e)) {
        let count = counts.get(e);
        molecularFormula += e + (count > 1 ? count : '');
      }
    });
    return molecularFormula;
  }
  /**
   * Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.
   *
   * @param {Vertex} vertexA A vertex.
   * @param {Vertex} vertexB A vertex.
   * @returns {(String|null)} Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.
   */


  getRingbondType(vertexA, vertexB) {
    // Checks whether the two vertices are the ones connecting the ring
    // and what the bond type should be.
    if (vertexA.value.getRingbondCount() < 1 || vertexB.value.getRingbondCount() < 1) {
      return null;
    }

    for (var i = 0; i < vertexA.value.ringbonds.length; i++) {
      for (var j = 0; j < vertexB.value.ringbonds.length; j++) {
        // if(i != j) continue;
        if (vertexA.value.ringbonds[i].id === vertexB.value.ringbonds[j].id) {
          // If the bonds are equal, it doesn't matter which bond is returned.
          // if they are not equal, return the one that is not the default ("-")
          if (vertexA.value.ringbonds[i].bondType === '-') {
            return vertexB.value.ringbonds[j].bond;
          } else {
            return vertexA.value.ringbonds[i].bond;
          }
        }
      }
    }

    return null;
  }

  initDraw(data, themeName, infoOnly, highlight_atoms) {
    this.data = data;
    this.infoOnly = infoOnly;
    this.ringIdCounter = 0;
    this.ringConnectionIdCounter = 0;
    this.graph = new Graph(data, this.opts.isomeric);
    this.rings = Array();
    this.ringConnections = Array();
    this.originalRings = Array();
    this.originalRingConnections = Array();
    this.bridgedRing = false; // Reset those, in case the previous drawn SMILES had a dangling \ or /

    this.doubleBondConfigCount = null;
    this.doubleBondConfig = null;
    this.highlight_atoms = highlight_atoms;
    this.initRings();
    this.initHydrogens();
  }

  processGraph() {
    this.position(); // Restore the ring information (removes bridged rings and replaces them with the original, multiple, rings)

    this.restoreRingInformation(); // Atoms bonded to the same ring atom

    this.resolvePrimaryOverlaps();
    let overlapScore = this.getOverlapScore();
    this.totalOverlapScore = this.getOverlapScore().total;

    for (var o = 0; o < this.opts.overlapResolutionIterations; o++) {
      for (var i = 0; i < this.graph.edges.length; i++) {
        let edge = this.graph.edges[i];

        if (this.isEdgeRotatable(edge)) {
          let subTreeDepthA = this.graph.getTreeDepth(edge.sourceId, edge.targetId);
          let subTreeDepthB = this.graph.getTreeDepth(edge.targetId, edge.sourceId); // Only rotate the shorter subtree

          let a = edge.targetId;
          let b = edge.sourceId;

          if (subTreeDepthA > subTreeDepthB) {
            a = edge.sourceId;
            b = edge.targetId;
          }

          let subTreeOverlap = this.getSubtreeOverlapScore(b, a, overlapScore.vertexScores);

          if (subTreeOverlap.value > this.opts.overlapSensitivity) {
            let vertexA = this.graph.vertices[a];
            let vertexB = this.graph.vertices[b];
            let neighboursB = vertexB.getNeighbours(a);

            if (neighboursB.length === 1) {
              let neighbour = this.graph.vertices[neighboursB[0]];
              let angle = neighbour.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, MathHelper.toRad(120));
              this.rotateSubtree(neighbour.id, vertexB.id, angle, vertexB.position); // If the new overlap is bigger, undo change

              let newTotalOverlapScore = this.getOverlapScore().total;

              if (newTotalOverlapScore > this.totalOverlapScore) {
                this.rotateSubtree(neighbour.id, vertexB.id, -angle, vertexB.position);
              } else {
                this.totalOverlapScore = newTotalOverlapScore;
              }
            } else if (neighboursB.length === 2) {
              // Switch places / sides
              // If vertex a is in a ring, do nothing
              if (vertexB.value.rings.length !== 0 && vertexA.value.rings.length !== 0) {
                continue;
              }

              let neighbourA = this.graph.vertices[neighboursB[0]];
              let neighbourB = this.graph.vertices[neighboursB[1]];

              if (neighbourA.value.rings.length === 1 && neighbourB.value.rings.length === 1) {
                // Both neighbours in same ring. TODO: does this create problems with wedges? (up = down and vice versa?)
                if (neighbourA.value.rings[0] !== neighbourB.value.rings[0]) {
                  continue;
                } // TODO: Rotate circle

              } else if (neighbourA.value.rings.length !== 0 || neighbourB.value.rings.length !== 0) {
                continue;
              } else {
                let angleA = neighbourA.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, MathHelper.toRad(120));
                let angleB = neighbourB.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, MathHelper.toRad(120));
                this.rotateSubtree(neighbourA.id, vertexB.id, angleA, vertexB.position);
                this.rotateSubtree(neighbourB.id, vertexB.id, angleB, vertexB.position);
                let newTotalOverlapScore = this.getOverlapScore().total;

                if (newTotalOverlapScore > this.totalOverlapScore) {
                  this.rotateSubtree(neighbourA.id, vertexB.id, -angleA, vertexB.position);
                  this.rotateSubtree(neighbourB.id, vertexB.id, -angleB, vertexB.position);
                } else {
                  this.totalOverlapScore = newTotalOverlapScore;
                }
              }
            }

            overlapScore = this.getOverlapScore();
          }
        }
      }
    }

    this.resolveSecondaryOverlaps(overlapScore.scores);

    if (this.opts.isomeric) {
      this.annotateStereochemistry();
    } // Initialize pseudo elements or shortcuts


    if (this.opts.compactDrawing && this.opts.atomVisualization === 'default') {
      this.initPseudoElements();
    }

    this.rotateDrawing();
  }
  /**
   * Initializes rings and ringbonds for the current molecule.
   */


  initRings() {
    let openBonds = new Map(); // Close the open ring bonds (spanning tree -> graph)

    for (var i = this.graph.vertices.length - 1; i >= 0; i--) {
      let vertex = this.graph.vertices[i];

      if (vertex.value.ringbonds.length === 0) {
        continue;
      }

      for (var j = 0; j < vertex.value.ringbonds.length; j++) {
        let ringbondId = vertex.value.ringbonds[j].id;
        let ringbondBond = vertex.value.ringbonds[j].bond; // If the other ringbond id has not been discovered,
        // add it to the open bonds map and continue.
        // if the other ringbond id has already been discovered,
        // create a bond between the two atoms.

        if (!openBonds.has(ringbondId)) {
          openBonds.set(ringbondId, [vertex.id, ringbondBond]);
        } else {
          let sourceVertexId = vertex.id;
          let targetVertexId = openBonds.get(ringbondId)[0];
          let targetRingbondBond = openBonds.get(ringbondId)[1];
          let edge = new Edge(sourceVertexId, targetVertexId, 1);
          edge.setBondType(targetRingbondBond || ringbondBond || '-');
          let edgeId = this.graph.addEdge(edge);
          let targetVertex = this.graph.vertices[targetVertexId];
          vertex.addRingbondChild(targetVertexId, j);
          vertex.value.addNeighbouringElement(targetVertex.value.element);
          targetVertex.addRingbondChild(sourceVertexId, j);
          targetVertex.value.addNeighbouringElement(vertex.value.element);
          vertex.edges.push(edgeId);
          targetVertex.edges.push(edgeId);
          openBonds.delete(ringbondId);
        }
      }
    } // Get the rings in the graph (the SSSR)


    let rings = SSSR.getRings(this.graph, this.opts.experimentalSSSR);

    if (rings === null) {
      return;
    }

    for (var i = 0; i < rings.length; i++) {
      let ringVertices = [...rings[i]];
      let ringId = this.addRing(new Ring(ringVertices)); // Add the ring to the atoms

      for (var j = 0; j < ringVertices.length; j++) {
        this.graph.vertices[ringVertices[j]].value.rings.push(ringId);
      }
    } // Find connection between rings
    // Check for common vertices and create ring connections. This is a bit
    // ugly, but the ringcount is always fairly low (< 100)


    for (var i = 0; i < this.rings.length - 1; i++) {
      for (var j = i + 1; j < this.rings.length; j++) {
        let a = this.rings[i];
        let b = this.rings[j];
        let ringConnection = new RingConnection(a, b); // If there are no vertices in the ring connection, then there
        // is no ring connection

        if (ringConnection.vertices.size > 0) {
          this.addRingConnection(ringConnection);
        }
      }
    } // Add neighbours to the rings


    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];
      ring.neighbours = RingConnection.getNeighbours(this.ringConnections, ring.id);
    } // Anchor the ring to one of it's members, so that the ring center will always
    // be tied to a single vertex when doing repositionings


    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];
      this.graph.vertices[ring.members[0]].value.addAnchoredRing(ring.id);
    } // Backup the ring information to restore after placing the bridged ring.
    // This is needed in order to identify aromatic rings and stuff like this in
    // rings that are member of the superring.


    this.backupRingInformation(); // Replace rings contained by a larger bridged ring with a bridged ring

    while (this.rings.length > 0) {
      let id = -1;

      for (var i = 0; i < this.rings.length; i++) {
        let ring = this.rings[i];

        if (this.isPartOfBridgedRing(ring.id) && !ring.isBridged) {
          id = ring.id;
        }
      }

      if (id === -1) {
        break;
      }

      let ring = this.getRing(id);
      let involvedRings = this.getBridgedRingRings(ring.id);
      this.bridgedRing = true;
      this.createBridgedRing(involvedRings, ring.members[0]); // Remove the rings

      for (var i = 0; i < involvedRings.length; i++) {
        this.removeRing(involvedRings[i]);
      }
    }
  }

  initHydrogens() {
    // Do not draw hydrogens except when they are connected to a stereocenter connected to two or more rings.
    if (!this.opts.explicitHydrogens) {
      for (var i = 0; i < this.graph.vertices.length; i++) {
        let vertex = this.graph.vertices[i];

        if (vertex.value.element !== 'H') {
          continue;
        } // Hydrogens should have only one neighbour, so just take the first
        // Also set hasHydrogen true on connected atom


        let neighbour = this.graph.vertices[vertex.neighbours[0]];
        neighbour.value.hasHydrogen = true;

        if (!neighbour.value.isStereoCenter || neighbour.value.rings.length < 2 && !neighbour.value.bridgedRing || neighbour.value.bridgedRing && neighbour.value.originalRings.length < 2) {
          vertex.value.isDrawn = false;
        }
      }
    }
  }
  /**
   * Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.
   *
   * @param {Number} ringId A ring id.
   * @returns {Number[]} An array containing all ring ids of rings part of a bridged ring system.
   */


  getBridgedRingRings(ringId) {
    let involvedRings = Array();
    let that = this;

    let recurse = function (r) {
      let ring = that.getRing(r);
      involvedRings.push(r);

      for (var i = 0; i < ring.neighbours.length; i++) {
        let n = ring.neighbours[i];

        if (involvedRings.indexOf(n) === -1 && n !== r && RingConnection.isBridge(that.ringConnections, that.graph.vertices, r, n)) {
          recurse(n);
        }
      }
    };

    recurse(ringId);
    return ArrayHelper.unique(involvedRings);
  }
  /**
   * Checks whether or not a ring is part of a bridged ring.
   *
   * @param {Number} ringId A ring id.
   * @returns {Boolean} A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.
   */


  isPartOfBridgedRing(ringId) {
    for (var i = 0; i < this.ringConnections.length; i++) {
      if (this.ringConnections[i].containsRing(ringId) && this.ringConnections[i].isBridge(this.graph.vertices)) {
        return true;
      }
    }

    return false;
  }
  /**
   * Creates a bridged ring.
   *
   * @param {Number[]} ringIds An array of ids of rings involved in the bridged ring.
   * @param {Number} sourceVertexId The vertex id to start the bridged ring discovery from.
   * @returns {Ring} The bridged ring.
   */


  createBridgedRing(ringIds, sourceVertexId) {
    let ringMembers = new Set();
    let vertices = new Set();
    let neighbours = new Set();

    for (var i = 0; i < ringIds.length; i++) {
      let ring = this.getRing(ringIds[i]);
      ring.isPartOfBridged = true;

      for (var j = 0; j < ring.members.length; j++) {
        vertices.add(ring.members[j]);
      }

      for (var j = 0; j < ring.neighbours.length; j++) {
        let id = ring.neighbours[j];

        if (ringIds.indexOf(id) === -1) {
          neighbours.add(ring.neighbours[j]);
        }
      }
    } // A vertex is part of the bridged ring if it only belongs to
    // one of the rings (or to another ring
    // which is not part of the bridged ring).


    let leftovers = new Set();

    for (let id of vertices) {
      let vertex = this.graph.vertices[id];
      let intersection = ArrayHelper.intersection(ringIds, vertex.value.rings);

      if (vertex.value.rings.length === 1 || intersection.length === 1) {
        ringMembers.add(vertex.id);
      } else {
        leftovers.add(vertex.id);
      }
    } // Vertices can also be part of multiple rings and lay on the bridged ring,
    // however, they have to have at least two neighbours that are not part of
    // two rings


    let tmp = Array();
    let insideRing = Array();

    for (let id of leftovers) {
      let vertex = this.graph.vertices[id];
      let onRing = false;

      for (let j = 0; j < vertex.edges.length; j++) {
        if (this.edgeRingCount(vertex.edges[j]) === 1) {
          onRing = true;
        }
      }

      if (onRing) {
        vertex.value.isBridgeNode = true;
        ringMembers.add(vertex.id);
      } else {
        vertex.value.isBridge = true;
        ringMembers.add(vertex.id);
      }
    } // Create the ring


    let ring = new Ring([...ringMembers]);
    this.addRing(ring);
    ring.isBridged = true;
    ring.neighbours = [...neighbours];

    for (var i = 0; i < ringIds.length; i++) {
      ring.rings.push(this.getRing(ringIds[i]).clone());
    }

    for (var i = 0; i < ring.members.length; i++) {
      this.graph.vertices[ring.members[i]].value.bridgedRing = ring.id;
    } // Atoms inside the ring are no longer part of a ring but are now
    // associated with the bridged ring


    for (var i = 0; i < insideRing.length; i++) {
      let vertex = this.graph.vertices[insideRing[i]];
      vertex.value.rings = Array();
    } // Remove former rings from members of the bridged ring and add the bridged ring


    for (let id of ringMembers) {
      let vertex = this.graph.vertices[id];
      vertex.value.rings = ArrayHelper.removeAll(vertex.value.rings, ringIds);
      vertex.value.rings.push(ring.id);
    } // Remove all the ring connections no longer used


    for (var i = 0; i < ringIds.length; i++) {
      for (var j = i + 1; j < ringIds.length; j++) {
        this.removeRingConnectionsBetween(ringIds[i], ringIds[j]);
      }
    } // Update the ring connections and add this ring to the neighbours neighbours


    for (let id of neighbours) {
      let connections = this.getRingConnections(id, ringIds);

      for (var j = 0; j < connections.length; j++) {
        this.getRingConnection(connections[j]).updateOther(ring.id, id);
      }

      this.getRing(id).neighbours.push(ring.id);
    }

    return ring;
  }
  /**
   * Checks whether or not two vertices are in the same ring.
   *
   * @param {Vertex} vertexA A vertex.
   * @param {Vertex} vertexB A vertex.
   * @returns {Boolean} A boolean indicating whether or not the two vertices are in the same ring.
   */


  areVerticesInSameRing(vertexA, vertexB) {
    // This is a little bit lighter (without the array and push) than
    // getCommonRings().length > 0
    for (var i = 0; i < vertexA.value.rings.length; i++) {
      for (var j = 0; j < vertexB.value.rings.length; j++) {
        if (vertexA.value.rings[i] === vertexB.value.rings[j]) {
          return true;
        }
      }
    }

    return false;
  }
  /**
   * Returns an array of ring ids shared by both vertices.
   *
   * @param {Vertex} vertexA A vertex.
   * @param {Vertex} vertexB A vertex.
   * @returns {Number[]} An array of ids of rings shared by the two vertices.
   */


  getCommonRings(vertexA, vertexB) {
    let commonRings = Array();

    for (var i = 0; i < vertexA.value.rings.length; i++) {
      for (var j = 0; j < vertexB.value.rings.length; j++) {
        if (vertexA.value.rings[i] == vertexB.value.rings[j]) {
          commonRings.push(vertexA.value.rings[i]);
        }
      }
    }

    return commonRings;
  }
  /**
   * Returns the aromatic or largest ring shared by the two vertices.
   *
   * @param {Vertex} vertexA A vertex.
   * @param {Vertex} vertexB A vertex.
   * @returns {(Ring|null)} If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.
   */


  getLargestOrAromaticCommonRing(vertexA, vertexB) {
    let commonRings = this.getCommonRings(vertexA, vertexB);
    let maxSize = 0;
    let largestCommonRing = null;

    for (var i = 0; i < commonRings.length; i++) {
      let ring = this.getRing(commonRings[i]);
      let size = ring.getSize();

      if (ring.isBenzeneLike(this.graph.vertices)) {
        return ring;
      } else if (size > maxSize) {
        maxSize = size;
        largestCommonRing = ring;
      }
    }

    return largestCommonRing;
  }
  /**
   * Returns an array of vertices positioned at a specified location.
   *
   * @param {Vector2} position The position to search for vertices.
   * @param {Number} radius The radius within to search.
   * @param {Number} excludeVertexId A vertex id to be excluded from the search results.
   * @returns {Number[]} An array containing vertex ids in a given location.
   */


  getVerticesAt(position, radius, excludeVertexId) {
    let locals = Array();

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

      if (vertex.id === excludeVertexId || !vertex.positioned) {
        continue;
      }

      let distance = position.distanceSq(vertex.position);

      if (distance <= radius * radius) {
        locals.push(vertex.id);
      }
    }

    return locals;
  }
  /**
   * Returns the closest vertex (connected as well as unconnected).
   *
   * @param {Vertex} vertex The vertex of which to find the closest other vertex.
   * @returns {Vertex} The closest vertex.
   */


  getClosestVertex(vertex) {
    let minDist = 99999;
    let minVertex = null;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let v = this.graph.vertices[i];

      if (v.id === vertex.id) {
        continue;
      }

      let distSq = vertex.position.distanceSq(v.position);

      if (distSq < minDist) {
        minDist = distSq;
        minVertex = v;
      }
    }

    return minVertex;
  }
  /**
   * Add a ring to this representation of a molecule.
   *
   * @param {Ring} ring A new ring.
   * @returns {Number} The ring id of the new ring.
   */


  addRing(ring) {
    ring.id = this.ringIdCounter++;
    this.rings.push(ring);
    return ring.id;
  }
  /**
   * Removes a ring from the array of rings associated with the current molecule.
   *
   * @param {Number} ringId A ring id.
   */


  removeRing(ringId) {
    this.rings = this.rings.filter(function (item) {
      return item.id !== ringId;
    }); // Also remove ring connections involving this ring

    this.ringConnections = this.ringConnections.filter(function (item) {
      return item.firstRingId !== ringId && item.secondRingId !== ringId;
    }); // Remove the ring as neighbour of other rings

    for (var i = 0; i < this.rings.length; i++) {
      let r = this.rings[i];
      r.neighbours = r.neighbours.filter(function (item) {
        return item !== ringId;
      });
    }
  }
  /**
   * Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.
   *
   * @param {Number} ringId A ring id.
   * @returns {Ring} A ring associated with the current molecule.
   */


  getRing(ringId) {
    for (var i = 0; i < this.rings.length; i++) {
      if (this.rings[i].id == ringId) {
        return this.rings[i];
      }
    }
  }
  /**
   * Add a ring connection to this representation of a molecule.
   *
   * @param {RingConnection} ringConnection A new ringConnection.
   * @returns {Number} The ring connection id of the new ring connection.
   */


  addRingConnection(ringConnection) {
    ringConnection.id = this.ringConnectionIdCounter++;
    this.ringConnections.push(ringConnection);
    return ringConnection.id;
  }
  /**
   * Removes a ring connection from the array of rings connections associated with the current molecule.
   *
   * @param {Number} ringConnectionId A ring connection id.
   */


  removeRingConnection(ringConnectionId) {
    this.ringConnections = this.ringConnections.filter(function (item) {
      return item.id !== ringConnectionId;
    });
  }
  /**
   * Removes all ring connections between two vertices.
   *
   * @param {Number} vertexIdA A vertex id.
   * @param {Number} vertexIdB A vertex id.
   */


  removeRingConnectionsBetween(vertexIdA, vertexIdB) {
    let toRemove = Array();

    for (var i = 0; i < this.ringConnections.length; i++) {
      let ringConnection = this.ringConnections[i];

      if (ringConnection.firstRingId === vertexIdA && ringConnection.secondRingId === vertexIdB || ringConnection.firstRingId === vertexIdB && ringConnection.secondRingId === vertexIdA) {
        toRemove.push(ringConnection.id);
      }
    }

    for (var i = 0; i < toRemove.length; i++) {
      this.removeRingConnection(toRemove[i]);
    }
  }
  /**
   * Get a ring connection with a given id.
   * 
   * @param {Number} id 
   * @returns {RingConnection} The ring connection with the specified id.
   */


  getRingConnection(id) {
    for (var i = 0; i < this.ringConnections.length; i++) {
      if (this.ringConnections[i].id == id) {
        return this.ringConnections[i];
      }
    }
  }
  /**
   * Get the ring connections between a ring and a set of rings.
   *
   * @param {Number} ringId A ring id.
   * @param {Number[]} ringIds An array of ring ids.
   * @returns {Number[]} An array of ring connection ids.
   */


  getRingConnections(ringId, ringIds) {
    let ringConnections = Array();

    for (var i = 0; i < this.ringConnections.length; i++) {
      let rc = this.ringConnections[i];

      for (var j = 0; j < ringIds.length; j++) {
        let id = ringIds[j];

        if (rc.firstRingId === ringId && rc.secondRingId === id || rc.firstRingId === id && rc.secondRingId === ringId) {
          ringConnections.push(rc.id);
        }
      }
    }

    return ringConnections;
  }
  /**
   * Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.
   *
   * @returns {Object} Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }
   */


  getOverlapScore() {
    let total = 0.0;
    let overlapScores = new Float32Array(this.graph.vertices.length);

    for (var i = 0; i < this.graph.vertices.length; i++) {
      overlapScores[i] = 0;
    }

    for (var i = 0; i < this.graph.vertices.length; i++) {
      var j = this.graph.vertices.length;

      while (--j > i) {
        let a = this.graph.vertices[i];
        let b = this.graph.vertices[j];

        if (!a.value.isDrawn || !b.value.isDrawn) {
          continue;
        }

        let dist = Vector2.subtract(a.position, b.position).lengthSq();

        if (dist < this.opts.bondLengthSq) {
          let weighted = (this.opts.bondLength - Math.sqrt(dist)) / this.opts.bondLength;
          total += weighted;
          overlapScores[i] += weighted;
          overlapScores[j] += weighted;
        }
      }
    }

    let sortable = Array();

    for (var i = 0; i < this.graph.vertices.length; i++) {
      sortable.push({
        id: i,
        score: overlapScores[i]
      });
    }

    sortable.sort(function (a, b) {
      return b.score - a.score;
    });
    return {
      total: total,
      scores: sortable,
      vertexScores: overlapScores
    };
  }
  /**
   * When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.
   *
   * @param {Vertex} vertexA A vertex.
   * @param {Vertex} vertexB A vertex.
   * @param {Vector2[]} sides An array containing the two normals of the line spanned by the two provided vertices.
   * @returns {Object} Returns an object containing the following information: {
          totalSideCount: Counts the sides of each vertex in the molecule, is an array [ a, b ],
          totalPosition: Same as position, but based on entire molecule,
          sideCount: Counts the sides of each neighbour, is an array [ a, b ],
          position: which side to position the second bond, is 0 or 1, represents the index in the normal array. This is based on only the neighbours
          anCount: the number of neighbours of vertexA,
          bnCount: the number of neighbours of vertexB
      }
   */


  chooseSide(vertexA, vertexB, sides) {
    // Check which side has more vertices
    // Get all the vertices connected to the both ends
    let an = vertexA.getNeighbours(vertexB.id);
    let bn = vertexB.getNeighbours(vertexA.id);
    let anCount = an.length;
    let bnCount = bn.length; // All vertices connected to the edge vertexA to vertexB

    let tn = ArrayHelper.merge(an, bn); // Only considering the connected vertices

    let sideCount = [0, 0];

    for (var i = 0; i < tn.length; i++) {
      let v = this.graph.vertices[tn[i]].position;

      if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
        sideCount[0]++;
      } else {
        sideCount[1]++;
      }
    } // Considering all vertices in the graph, this is to resolve ties
    // from the above side counts


    let totalSideCount = [0, 0];

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let v = this.graph.vertices[i].position;

      if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
        totalSideCount[0]++;
      } else {
        totalSideCount[1]++;
      }
    }

    return {
      totalSideCount: totalSideCount,
      totalPosition: totalSideCount[0] > totalSideCount[1] ? 0 : 1,
      sideCount: sideCount,
      position: sideCount[0] > sideCount[1] ? 0 : 1,
      anCount: anCount,
      bnCount: bnCount
    };
  }
  /**
   * Sets the center for a ring.
   *
   * @param {Ring} ring A ring.
   */


  setRingCenter(ring) {
    let ringSize = ring.getSize();
    let total = new Vector2(0, 0);

    for (var i = 0; i < ringSize; i++) {
      total.add(this.graph.vertices[ring.members[i]].position);
    }

    ring.center = total.divide(ringSize);
  }
  /**
   * Gets the center of a ring contained within a bridged ring and containing a given vertex.
   *
   * @param {Ring} ring A bridged ring.
   * @param {Vertex} vertex A vertex.
   * @returns {Vector2} The center of the subring that containing the vertex.
   */


  getSubringCenter(ring, vertex) {
    let rings = vertex.value.originalRings;
    let center = ring.center;
    let smallest = Number.MAX_VALUE; // Always get the smallest ring.

    for (var i = 0; i < rings.length; i++) {
      for (var j = 0; j < ring.rings.length; j++) {
        if (rings[i] === ring.rings[j].id) {
          if (ring.rings[j].getSize() < smallest) {
            center = ring.rings[j].center;
            smallest = ring.rings[j].getSize();
          }
        }
      }
    }

    return center;
  }
  /**
   * Draw the actual edges as bonds to the canvas.
   *
   * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
   */


  drawEdges(debug) {
    let that = this;
    let drawn = Array(this.graph.edges.length);
    drawn.fill(false);
    this.graph.traverseBF(0, function (vertex) {
      let edges = that.graph.getEdges(vertex.id);

      for (var i = 0; i < edges.length; i++) {
        let edgeId = edges[i];

        if (!drawn[edgeId]) {
          drawn[edgeId] = true;
          that.drawEdge(edgeId, debug);
        }
      }
    }); // Draw ring for implicitly defined aromatic rings

    if (!this.bridgedRing) {
      for (var i = 0; i < this.rings.length; i++) {
        let ring = this.rings[i];

        if (this.isRingAromatic(ring)) {
          this.canvasWrapper.drawAromaticityRing(ring);
        }
      }
    }
  }
  /**
   * Draw the an edge as a bonds to the canvas.
   *
   * @param {Number} edgeId An edge id.
   * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
   */


  drawEdge(edgeId, debug) {
    let that = this;
    let edge = this.graph.edges[edgeId];
    let vertexA = this.graph.vertices[edge.sourceId];
    let vertexB = this.graph.vertices[edge.targetId];
    let elementA = vertexA.value.element;
    let elementB = vertexB.value.element;

    if ((!vertexA.value.isDrawn || !vertexB.value.isDrawn) && this.opts.atomVisualization === 'default') {
      return;
    }

    let a = vertexA.position;
    let b = vertexB.position;
    let normals = this.getEdgeNormals(edge); // Create a point on each side of the line

    let sides = ArrayHelper.clone(normals);
    sides[0].multiplyScalar(10).add(a);
    sides[1].multiplyScalar(10).add(a);

    if (edge.bondType === '=' || this.getRingbondType(vertexA, vertexB) === '=' || edge.isPartOfAromaticRing && this.bridgedRing) {
      // Always draw double bonds inside the ring
      let inRing = this.areVerticesInSameRing(vertexA, vertexB);
      let s = this.chooseSide(vertexA, vertexB, sides);

      if (inRing) {
        // Always draw double bonds inside a ring
        // if the bond is shared by two rings, it is drawn in the larger
        // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
        let lcr = this.getLargestOrAromaticCommonRing(vertexA, vertexB);
        let center = lcr.center;
        normals[0].multiplyScalar(that.opts.bondSpacing);
        normals[1].multiplyScalar(that.opts.bondSpacing); // Choose the normal that is on the same side as the center

        let line = null;

        if (center.sameSideAs(vertexA.position, vertexB.position, Vector2.add(a, normals[0]))) {
          line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
        } else {
          line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        }

        line.shorten(this.opts.bondLength - this.opts.shortBondLength * this.opts.bondLength); // The shortened edge

        if (edge.isPartOfAromaticRing) {
          this.canvasWrapper.drawLine(line, true);
        } else {
          this.canvasWrapper.drawLine(line);
        } // The normal edge


        this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else if (edge.center || vertexA.isTerminal() && vertexB.isTerminal()) {
        normals[0].multiplyScalar(that.opts.halfBondSpacing);
        normals[1].multiplyScalar(that.opts.halfBondSpacing);
        let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
        let lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        this.canvasWrapper.drawLine(lineA);
        this.canvasWrapper.drawLine(lineB);
      } else if (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
        // Both lines are the same length here
        // Add the spacing to the edges (which are of unit length)
        normals[0].multiplyScalar(that.opts.halfBondSpacing);
        normals[1].multiplyScalar(that.opts.halfBondSpacing);
        let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
        let lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        this.canvasWrapper.drawLine(lineA);
        this.canvasWrapper.drawLine(lineB);
      } else if (s.sideCount[0] > s.sideCount[1]) {
        normals[0].multiplyScalar(that.opts.bondSpacing);
        normals[1].multiplyScalar(that.opts.bondSpacing);
        let line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
        line.shorten(this.opts.bondLength - this.opts.shortBondLength * this.opts.bondLength);
        this.canvasWrapper.drawLine(line);
        this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else if (s.sideCount[0] < s.sideCount[1]) {
        normals[0].multiplyScalar(that.opts.bondSpacing);
        normals[1].multiplyScalar(that.opts.bondSpacing);
        let line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        line.shorten(this.opts.bondLength - this.opts.shortBondLength * this.opts.bondLength);
        this.canvasWrapper.drawLine(line);
        this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
        normals[0].multiplyScalar(that.opts.bondSpacing);
        normals[1].multiplyScalar(that.opts.bondSpacing);
        let line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
        line.shorten(this.opts.bondLength - this.opts.shortBondLength * this.opts.bondLength);
        this.canvasWrapper.drawLine(line);
        this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
        normals[0].multiplyScalar(that.opts.bondSpacing);
        normals[1].multiplyScalar(that.opts.bondSpacing);
        let line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        line.shorten(this.opts.bondLength - this.opts.shortBondLength * this.opts.bondLength);
        this.canvasWrapper.drawLine(line);
        this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else {}
    } else if (edge.bondType === '#') {
      normals[0].multiplyScalar(that.opts.bondSpacing / 1.5);
      normals[1].multiplyScalar(that.opts.bondSpacing / 1.5);
      let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
      let lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
      this.canvasWrapper.drawLine(lineA);
      this.canvasWrapper.drawLine(lineB);
      this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
    } else if (edge.bondType === '.') {// TODO: Something... maybe... version 2?
    } else {
      let isChiralCenterA = vertexA.value.isStereoCenter;
      let isChiralCenterB = vertexB.value.isStereoCenter;

      if (edge.wedge === 'up') {
        this.canvasWrapper.drawWedge(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      } else if (edge.wedge === 'down') {
        this.canvasWrapper.drawDashedWedge(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      } else {
        this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      }
    }

    if (debug) {
      let midpoint = Vector2.midpoint(a, b);
      this.canvasWrapper.drawDebugText(midpoint.x, midpoint.y, 'e: ' + edgeId);
    }
  }
  /**
   * Draws the vertices representing atoms to the canvas.
   *
   * @param {Boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
   */


  drawVertices(debug) {
    var i = this.graph.vertices.length;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];
      let atom = vertex.value;
      let charge = 0;
      let isotope = 0;
      let bondCount = vertex.value.bondCount;
      let element = atom.element;
      let hydrogens = Atom.maxBonds[element] - bondCount;
      let dir = vertex.getTextDirection(this.graph.vertices);
      let isTerminal = this.opts.terminalCarbons || element !== 'C' || atom.hasAttachedPseudoElements ? vertex.isTerminal() : false;
      let isCarbon = atom.element === 'C'; // This is a HACK to remove all hydrogens from nitrogens in aromatic rings, as this
      // should be the most common state. This has to be fixed by kekulization

      if (atom.element === 'N' && atom.isPartOfAromaticRing) {
        hydrogens = 0;
      }

      if (atom.bracket) {
        hydrogens = atom.bracket.hcount;
        charge = atom.bracket.charge;
        isotope = atom.bracket.isotope;
      }

      if (this.opts.atomVisualization === 'allballs') {
        this.canvasWrapper.drawBall(vertex.position.x, vertex.position.y, element);
      } else if (atom.isDrawn && (!isCarbon || atom.drawExplicit || isTerminal || atom.hasAttachedPseudoElements) || this.graph.vertices.length === 1) {
        if (this.opts.atomVisualization === 'default') {
          this.canvasWrapper.drawText(vertex.position.x, vertex.position.y, element, hydrogens, dir, isTerminal, charge, isotope, this.graph.vertices.length, atom.getAttachedPseudoElements());
        } else if (this.opts.atomVisualization === 'balls') {
          this.canvasWrapper.drawBall(vertex.position.x, vertex.position.y, element);
        }
      } else if (vertex.getNeighbourCount() === 2 && vertex.forcePositioned == true) {
        // If there is a carbon which bonds are in a straight line, draw a dot
        let a = this.graph.vertices[vertex.neighbours[0]].position;
        let b = this.graph.vertices[vertex.neighbours[1]].position;
        let angle = Vector2.threePointangle(vertex.position, a, b);

        if (Math.abs(Math.PI - angle) < 0.1) {
          this.canvasWrapper.drawPoint(vertex.position.x, vertex.position.y, element);
        }
      }

      if (debug) {
        let value = 'v: ' + vertex.id + ' ' + ArrayHelper.print(atom.ringbonds);
        this.canvasWrapper.drawDebugText(vertex.position.x, vertex.position.y, value);
      } else {// this.canvasWrapper.drawDebugText(vertex.position.x, vertex.position.y, vertex.value.chirality);
      }
    } // Draw the ring centers for debug purposes


    if (this.opts.debug) {
      for (var i = 0; i < this.rings.length; i++) {
        let center = this.rings[i].center;
        this.canvasWrapper.drawDebugPoint(center.x, center.y, 'r: ' + this.rings[i].id);
      }
    }
  }
  /**
   * Position the vertices according to their bonds and properties.
   */


  position() {
    let startVertex = null; // Always start drawing at a bridged ring if there is one
    // If not, start with a ring
    // else, start with 0

    for (var i = 0; i < this.graph.vertices.length; i++) {
      if (this.graph.vertices[i].value.bridgedRing !== null) {
        startVertex = this.graph.vertices[i];
        break;
      }
    }

    for (var i = 0; i < this.rings.length; i++) {
      if (this.rings[i].isBridged) {
        startVertex = this.graph.vertices[this.rings[i].members[0]];
      }
    }

    if (this.rings.length > 0 && startVertex === null) {
      startVertex = this.graph.vertices[this.rings[0].members[0]];
    }

    if (startVertex === null) {
      startVertex = this.graph.vertices[0];
    }

    this.createNextBond(startVertex, null, 0.0);
  }
  /**
   * Stores the current information associated with rings.
   */


  backupRingInformation() {
    this.originalRings = Array();
    this.originalRingConnections = Array();

    for (var i = 0; i < this.rings.length; i++) {
      this.originalRings.push(this.rings[i]);
    }

    for (var i = 0; i < this.ringConnections.length; i++) {
      this.originalRingConnections.push(this.ringConnections[i]);
    }

    for (var i = 0; i < this.graph.vertices.length; i++) {
      this.graph.vertices[i].value.backupRings();
    }
  }
  /**
   * Restores the most recently backed up information associated with rings.
   */


  restoreRingInformation() {
    // Get the subring centers from the bridged rings
    let bridgedRings = this.getBridgedRings();
    this.rings = Array();
    this.ringConnections = Array();

    for (var i = 0; i < bridgedRings.length; i++) {
      let bridgedRing = bridgedRings[i];

      for (var j = 0; j < bridgedRing.rings.length; j++) {
        let ring = bridgedRing.rings[j];
        this.originalRings[ring.id].center = ring.center;
      }
    }

    for (var i = 0; i < this.originalRings.length; i++) {
      this.rings.push(this.originalRings[i]);
    }

    for (var i = 0; i < this.originalRingConnections.length; i++) {
      this.ringConnections.push(this.originalRingConnections[i]);
    }

    for (var i = 0; i < this.graph.vertices.length; i++) {
      this.graph.vertices[i].value.restoreRings();
    }
  } // TODO: This needs some cleaning up

  /**
   * Creates a new ring, that is, positiones all the vertices inside a ring.
   *
   * @param {Ring} ring The ring to position.
   * @param {(Vector2|null)} [center=null] The center of the ring to be created.
   * @param {(Vertex|null)} [startVertex=null] The first vertex to be positioned inside the ring.
   * @param {(Vertex|null)} [previousVertex=null] The last vertex that was positioned.
   * @param {Boolean} [previousVertex=false] A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it.
   */


  createRing(ring, center = null, startVertex = null, previousVertex = null) {
    if (ring.positioned) {
      return;
    }

    center = center ? center : new Vector2(0, 0);
    let orderedNeighbours = ring.getOrderedNeighbours(this.ringConnections);
    let startingAngle = startVertex ? Vector2.subtract(startVertex.position, center).angle() : 0;
    let radius = MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());
    let angle = MathHelper.centralAngle(ring.getSize());
    ring.centralAngle = angle;
    let a = startingAngle;
    let that = this;
    let startVertexId = startVertex ? startVertex.id : null;

    if (ring.members.indexOf(startVertexId) === -1) {
      if (startVertex) {
        startVertex.positioned = false;
      }

      startVertexId = ring.members[0];
    } // If the ring is bridged, then draw the vertices inside the ring
    // using a force based approach


    if (ring.isBridged) {
      this.graph.kkLayout(ring.members.slice(), center, startVertex.id, ring, this.opts.bondLength, this.opts.kkThreshold, this.opts.kkInnerThreshold, this.opts.kkMaxIteration, this.opts.kkMaxInnerIteration, this.opts.kkMaxEnergy);
      ring.positioned = true; // Update the center of the bridged ring

      this.setRingCenter(ring);
      center = ring.center; // Setting the centers for the subrings

      for (var i = 0; i < ring.rings.length; i++) {
        this.setRingCenter(ring.rings[i]);
      }
    } else {
      ring.eachMember(this.graph.vertices, function (v) {
        let vertex = that.graph.vertices[v];

        if (!vertex.positioned) {
          vertex.setPosition(center.x + Math.cos(a) * radius, center.y + Math.sin(a) * radius);
        }

        a += angle;

        if (!ring.isBridged || ring.rings.length < 3) {
          vertex.angle = a;
          vertex.positioned = true;
        }
      }, startVertexId, previousVertex ? previousVertex.id : null);
    }

    ring.positioned = true;
    ring.center = center; // Draw neighbours in decreasing order of connectivity

    for (var i = 0; i < orderedNeighbours.length; i++) {
      let neighbour = this.getRing(orderedNeighbours[i].neighbour);

      if (neighbour.positioned) {
        continue;
      }

      let vertices = RingConnection.getVertices(this.ringConnections, ring.id, neighbour.id);

      if (vertices.length === 2) {
        // This ring is a fused ring
        ring.isFused = true;
        neighbour.isFused = true;
        let vertexA = this.graph.vertices[vertices[0]];
        let vertexB = this.graph.vertices[vertices[1]]; // Get middle between vertex A and B

        let midpoint = Vector2.midpoint(vertexA.position, vertexB.position); // Get the normals to the line between A and B

        let normals = Vector2.normals(vertexA.position, vertexB.position); // Normalize the normals

        normals[0].normalize();
        normals[1].normalize(); // Set length from middle of side to center (the apothem)

        let r = MathHelper.polyCircumradius(this.opts.bondLength, neighbour.getSize());
        let apothem = MathHelper.apothem(r, neighbour.getSize());
        normals[0].multiplyScalar(apothem).add(midpoint);
        normals[1].multiplyScalar(apothem).add(midpoint); // Pick the normal which results in a larger distance to the previous center
        // Also check whether it's inside another ring

        let nextCenter = normals[0];

        if (Vector2.subtract(center, normals[1]).lengthSq() > Vector2.subtract(center, normals[0]).lengthSq()) {
          nextCenter = normals[1];
        } // Get the vertex (A or B) which is in clock-wise direction of the other


        let posA = Vector2.subtract(vertexA.position, nextCenter);
        let posB = Vector2.subtract(vertexB.position, nextCenter);

        if (posA.clockwise(posB) === -1) {
          if (!neighbour.positioned) {
            this.createRing(neighbour, nextCenter, vertexA, vertexB);
          }
        } else {
          if (!neighbour.positioned) {
            this.createRing(neighbour, nextCenter, vertexB, vertexA);
          }
        }
      } else if (vertices.length === 1) {
        // This ring is a spiro
        ring.isSpiro = true;
        neighbour.isSpiro = true;
        let vertexA = this.graph.vertices[vertices[0]]; // Get the vector pointing from the shared vertex to the new centpositioner

        let nextCenter = Vector2.subtract(center, vertexA.position);
        nextCenter.invert();
        nextCenter.normalize(); // Get the distance from the vertex to the center

        let r = MathHelper.polyCircumradius(this.opts.bondLength, neighbour.getSize());
        nextCenter.multiplyScalar(r);
        nextCenter.add(vertexA.position);

        if (!neighbour.positioned) {
          this.createRing(neighbour, nextCenter, vertexA);
        }
      }
    } // Next, draw atoms that are not part of a ring that are directly attached to this ring


    for (var i = 0; i < ring.members.length; i++) {
      let ringMember = this.graph.vertices[ring.members[i]];
      let ringMemberNeighbours = ringMember.neighbours; // If there are multiple, the ovlerap will be resolved in the appropriate step

      for (var j = 0; j < ringMemberNeighbours.length; j++) {
        let v = this.graph.vertices[ringMemberNeighbours[j]];

        if (v.positioned) {
          continue;
        }

        v.value.isConnectedToRing = true;
        this.createNextBond(v, ringMember, 0.0);
      }
    }
  }
  /**
   * Rotate an entire subtree by an angle around a center.
   *
   * @param {Number} vertexId A vertex id (the root of the sub-tree).
   * @param {Number} parentVertexId A vertex id in the previous direction of the subtree that is to rotate.
   * @param {Number} angle An angle in randians.
   * @param {Vector2} center The rotational center.
   */


  rotateSubtree(vertexId, parentVertexId, angle, center) {
    let that = this;
    this.graph.traverseTree(vertexId, parentVertexId, function (vertex) {
      vertex.position.rotateAround(angle, center);

      for (var i = 0; i < vertex.value.anchoredRings.length; i++) {
        let ring = that.rings[vertex.value.anchoredRings[i]];

        if (ring) {
          ring.center.rotateAround(angle, center);
        }
      }
    });
  }
  /**
   * Gets the overlap score of a subtree.
   *
   * @param {Number} vertexId A vertex id (the root of the sub-tree).
   * @param {Number} parentVertexId A vertex id in the previous direction of the subtree.
   * @param {Number[]} vertexOverlapScores An array containing the vertex overlap scores indexed by vertex id.
   * @returns {Object} An object containing the total overlap score and the center of mass of the subtree weighted by overlap score { value: 0.2, center: new Vector2() }.
   */


  getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) {
    let that = this;
    let score = 0;
    let center = new Vector2(0, 0);
    let count = 0;
    this.graph.traverseTree(vertexId, parentVertexId, function (vertex) {
      if (!vertex.value.isDrawn) {
        return;
      }

      let s = vertexOverlapScores[vertex.id];

      if (s > that.opts.overlapSensitivity) {
        score += s;
        count++;
      }

      let position = that.graph.vertices[vertex.id].position.clone();
      position.multiplyScalar(s);
      center.add(position);
    });
    center.divide(score);
    return {
      value: score / count,
      center: center
    };
  }
  /**
   * Returns the current (positioned vertices so far) center of mass.
   * 
   * @returns {Vector2} The current center of mass.
   */


  getCurrentCenterOfMass() {
    let total = new Vector2(0, 0);
    let count = 0;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

      if (vertex.positioned) {
        total.add(vertex.position);
        count++;
      }
    }

    return total.divide(count);
  }
  /**
   * Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.
   *
   * @param {Vector2} vec The point at which to look for neighbours.
   * @param {Number} [r=currentBondLength*2.0] The radius of vertices to include.
   * @returns {Vector2} The current center of mass.
   */


  getCurrentCenterOfMassInNeigbourhood(vec, r = this.opts.bondLength * 2.0) {
    let total = new Vector2(0, 0);
    let count = 0;
    let rSq = r * r;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

      if (vertex.positioned && vec.distanceSq(vertex.position) < rSq) {
        total.add(vertex.position);
        count++;
      }
    }

    return total.divide(count);
  }
  /**
   * Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.
   */


  resolvePrimaryOverlaps() {
    let overlaps = Array();
    let done = Array(this.graph.vertices.length); // Looking for overlaps created by two bonds coming out of a ring atom, which both point straight
    // away from the ring and are thus perfectly overlapping.

    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];

      for (var j = 0; j < ring.members.length; j++) {
        let vertex = this.graph.vertices[ring.members[j]];

        if (done[vertex.id]) {
          continue;
        }

        done[vertex.id] = true;
        let nonRingNeighbours = this.getNonRingNeighbours(vertex.id);

        if (nonRingNeighbours.length > 1) {
          // Look for rings where there are atoms with two bonds outside the ring (overlaps)
          let rings = Array();

          for (var k = 0; k < vertex.value.rings.length; k++) {
            rings.push(vertex.value.rings[k]);
          }

          overlaps.push({
            common: vertex,
            rings: rings,
            vertices: nonRingNeighbours
          });
        } else if (nonRingNeighbours.length === 1 && vertex.value.rings.length === 2) {
          // Look for bonds coming out of joined rings to adjust the angle, an example is: C1=CC(=CC=C1)[C@]12SCCN1CC1=CC=CC=C21
          // where the angle has to be adjusted to account for fused ring
          let rings = Array();

          for (var k = 0; k < vertex.value.rings.length; k++) {
            rings.push(vertex.value.rings[k]);
          }

          overlaps.push({
            common: vertex,
            rings: rings,
            vertices: nonRingNeighbours
          });
        }
      }
    }

    for (var i = 0; i < overlaps.length; i++) {
      let overlap = overlaps[i];

      if (overlap.vertices.length === 2) {
        let a = overlap.vertices[0];
        let b = overlap.vertices[1];

        if (!a.value.isDrawn || !b.value.isDrawn) {
          continue;
        }

        let angle = (2 * Math.PI - this.getRing(overlap.rings[0]).getAngle()) / 6.0;
        this.rotateSubtree(a.id, overlap.common.id, angle, overlap.common.position);
        this.rotateSubtree(b.id, overlap.common.id, -angle, overlap.common.position); // Decide which way to rotate the vertices depending on the effect it has on the overlap score

        let overlapScore = this.getOverlapScore();
        let subTreeOverlapA = this.getSubtreeOverlapScore(a.id, overlap.common.id, overlapScore.vertexScores);
        let subTreeOverlapB = this.getSubtreeOverlapScore(b.id, overlap.common.id, overlapScore.vertexScores);
        let total = subTreeOverlapA.value + subTreeOverlapB.value;
        this.rotateSubtree(a.id, overlap.common.id, -2.0 * angle, overlap.common.position);
        this.rotateSubtree(b.id, overlap.common.id, 2.0 * angle, overlap.common.position);
        overlapScore = this.getOverlapScore();
        subTreeOverlapA = this.getSubtreeOverlapScore(a.id, overlap.common.id, overlapScore.vertexScores);
        subTreeOverlapB = this.getSubtreeOverlapScore(b.id, overlap.common.id, overlapScore.vertexScores);

        if (subTreeOverlapA.value + subTreeOverlapB.value > total) {
          this.rotateSubtree(a.id, overlap.common.id, 2.0 * angle, overlap.common.position);
          this.rotateSubtree(b.id, overlap.common.id, -2.0 * angle, overlap.common.position);
        }
      } else if (overlap.vertices.length === 1) {
        if (overlap.rings.length === 2) {// TODO: Implement for more overlap resolution
          // console.log(overlap);
        }
      }
    }
  }
  /**
   * Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.
   *
   * @param {Object[]} scores An array of objects sorted descending by score.
   * @param {Number} scores[].id A vertex id.
   * @param {Number} scores[].score The overlap score associated with the vertex id.
   */


  resolveSecondaryOverlaps(scores) {
    for (var i = 0; i < scores.length; i++) {
      if (scores[i].score > this.opts.overlapSensitivity) {
        let vertex = this.graph.vertices[scores[i].id];

        if (vertex.isTerminal()) {
          let closest = this.getClosestVertex(vertex);

          if (closest) {
            // If one of the vertices is the first one, the previous vertex is not the central vertex but the dummy
            // so take the next rather than the previous, which is vertex 1
            let closestPosition = null;

            if (closest.isTerminal()) {
              closestPosition = closest.id === 0 ? this.graph.vertices[1].position : closest.previousPosition;
            } else {
              closestPosition = closest.id === 0 ? this.graph.vertices[1].position : closest.position;
            }

            let vertexPreviousPosition = vertex.id === 0 ? this.graph.vertices[1].position : vertex.previousPosition;
            vertex.position.rotateAwayFrom(closestPosition, vertexPreviousPosition, MathHelper.toRad(20));
          }
        }
      }
    }
  }
  /**
   * Get the last non-null or 0 angle vertex.
   * @param {Number} vertexId A vertex id.
   * @returns {Vertex} The last vertex with an angle that was not 0 or null.
   */


  getLastVertexWithAngle(vertexId) {
    let angle = 0;
    let vertex = null;

    while (!angle && vertexId) {
      vertex = this.graph.vertices[vertexId];
      angle = vertex.angle;
      vertexId = vertex.parentVertexId;
    }

    return vertex;
  }
  /**
   * Positiones the next vertex thus creating a bond.
   *
   * @param {Vertex} vertex A vertex.
   * @param {Vertex} [previousVertex=null] The previous vertex which has been positioned.
   * @param {Number} [angle=0.0] The (global) angle of the vertex.
   * @param {Boolean} [originShortest=false] Whether the origin is the shortest subtree in the branch.
   * @param {Boolean} [skipPositioning=false] Whether or not to skip positioning and just check the neighbours.
   */


  createNextBond(vertex, previousVertex = null, angle = 0.0, originShortest = false, skipPositioning = false) {
    if (vertex.positioned && !skipPositioning) {
      return;
    } // If the double bond config was set on this vertex, do not check later


    let doubleBondConfigSet = false; // Keeping track of configurations around double bonds

    if (previousVertex) {
      let edge = this.graph.getEdge(vertex.id, previousVertex.id);

      if ((edge.bondType === '/' || edge.bondType === '\\') && ++this.doubleBondConfigCount % 2 === 1) {
        if (this.doubleBondConfig === null) {
          this.doubleBondConfig = edge.bondType;
          doubleBondConfigSet = true; // Switch if the bond is a branch bond and previous vertex is the first
          // TODO: Why is it different with the first vertex?

          if (previousVertex.parentVertexId === null && vertex.value.branchBond) {
            if (this.doubleBondConfig === '/') {
              this.doubleBondConfig = '\\';
            } else if (this.doubleBondConfig === '\\') {
              this.doubleBondConfig = '/';
            }
          }
        }
      }
    } // If the current node is the member of one ring, then point straight away
    // from the center of the ring. However, if the current node is a member of
    // two rings, point away from the middle of the centers of the two rings


    if (!skipPositioning) {
      if (!previousVertex) {
        // Add a (dummy) previous position if there is no previous vertex defined
        // Since the first vertex is at (0, 0), create a vector at (bondLength, 0)
        // and rotate it by 90°
        let dummy = new Vector2(this.opts.bondLength, 0);
        dummy.rotate(MathHelper.toRad(-60));
        vertex.previousPosition = dummy;
        vertex.setPosition(this.opts.bondLength, 0);
        vertex.angle = MathHelper.toRad(-60); // Do not position the vertex if it belongs to a bridged ring that is positioned using a layout algorithm.

        if (vertex.value.bridgedRing === null) {
          vertex.positioned = true;
        }
      } else if (previousVertex.value.rings.length > 0) {
        let neighbours = previousVertex.neighbours;
        let joinedVertex = null;
        let pos = new Vector2(0.0, 0.0);

        if (previousVertex.value.bridgedRing === null && previousVertex.value.rings.length > 1) {
          for (var i = 0; i < neighbours.length; i++) {
            let neighbour = this.graph.vertices[neighbours[i]];

            if (ArrayHelper.containsAll(neighbour.value.rings, previousVertex.value.rings)) {
              joinedVertex = neighbour;
              break;
            }
          }
        }

        if (joinedVertex === null) {
          for (var i = 0; i < neighbours.length; i++) {
            let v = this.graph.vertices[neighbours[i]];

            if (v.positioned && this.areVerticesInSameRing(v, previousVertex)) {
              pos.add(Vector2.subtract(v.position, previousVertex.position));
            }
          }

          pos.invert().normalize().multiplyScalar(this.opts.bondLength).add(previousVertex.position);
        } else {
          pos = joinedVertex.position.clone().rotateAround(Math.PI, previousVertex.position);
        }

        vertex.previousPosition = previousVertex.position;
        vertex.setPositionFromVector(pos);
        vertex.positioned = true;
      } else {
        // If the previous vertex was not part of a ring, draw a bond based
        // on the global angle of the previous bond
        let v = new Vector2(this.opts.bondLength, 0);
        v.rotate(angle);
        v.add(previousVertex.position);
        vertex.setPositionFromVector(v);
        vertex.previousPosition = previousVertex.position;
        vertex.positioned = true;
      }
    } // Go to next vertex
    // If two rings are connected by a bond ...


    if (vertex.value.bridgedRing !== null) {
      let nextRing = this.getRing(vertex.value.bridgedRing);

      if (!nextRing.positioned) {
        let nextCenter = Vector2.subtract(vertex.previousPosition, vertex.position);
        nextCenter.invert();
        nextCenter.normalize();
        let r = MathHelper.polyCircumradius(this.opts.bondLength, nextRing.members.length);
        nextCenter.multiplyScalar(r);
        nextCenter.add(vertex.position);
        this.createRing(nextRing, nextCenter, vertex);
      }
    } else if (vertex.value.rings.length > 0) {
      let nextRing = this.getRing(vertex.value.rings[0]);

      if (!nextRing.positioned) {
        let nextCenter = Vector2.subtract(vertex.previousPosition, vertex.position);
        nextCenter.invert();
        nextCenter.normalize();
        let r = MathHelper.polyCircumradius(this.opts.bondLength, nextRing.getSize());
        nextCenter.multiplyScalar(r);
        nextCenter.add(vertex.position);
        this.createRing(nextRing, nextCenter, vertex);
      }
    } else {
      // Draw the non-ring vertices connected to this one  
      let isStereoCenter = vertex.value.isStereoCenter;
      let tmpNeighbours = vertex.getNeighbours();
      let neighbours = Array(); // Remove neighbours that are not drawn

      for (var i = 0; i < tmpNeighbours.length; i++) {
        if (this.graph.vertices[tmpNeighbours[i]].value.isDrawn) {
          neighbours.push(tmpNeighbours[i]);
        }
      } // Remove the previous vertex (which has already been drawn)


      if (previousVertex) {
        neighbours = ArrayHelper.remove(neighbours, previousVertex.id);
      }

      let previousAngle = vertex.getAngle();

      if (neighbours.length === 1) {
        let nextVertex = this.graph.vertices[neighbours[0]]; // Make a single chain always cis except when there's a tribble (yes, this is a Star Trek reference) bond
        // or if there are successive double bonds. Added a ring check because if there is an aromatic ring the ring bond inside the ring counts as a double bond and leads to =-= being straight.

        if (vertex.value.bondType === '#' || previousVertex && previousVertex.value.bondType === '#' || vertex.value.bondType === '=' && previousVertex && previousVertex.value.rings.length === 0 && previousVertex.value.bondType === '=' && vertex.value.branchBond !== '-') {
          vertex.value.drawExplicit = false;

          if (previousVertex) {
            let straightEdge1 = this.graph.getEdge(vertex.id, previousVertex.id);
            straightEdge1.center = true;
          }

          let straightEdge2 = this.graph.getEdge(vertex.id, nextVertex.id);
          straightEdge2.center = true;

          if (vertex.value.bondType === '#' || previousVertex && previousVertex.value.bondType === '#') {
            nextVertex.angle = 0.0;
          }

          nextVertex.drawExplicit = true;
          this.createNextBond(nextVertex, vertex, previousAngle + nextVertex.angle);
        } else if (previousVertex && previousVertex.value.rings.length > 0) {
          // If coming out of a ring, always draw away from the center of mass
          let proposedAngleA = MathHelper.toRad(60);
          let proposedAngleB = -proposedAngleA;
          let proposedVectorA = new Vector2(this.opts.bondLength, 0);
          let proposedVectorB = new Vector2(this.opts.bondLength, 0);
          proposedVectorA.rotate(proposedAngleA).add(vertex.position);
          proposedVectorB.rotate(proposedAngleB).add(vertex.position); // let centerOfMass = this.getCurrentCenterOfMassInNeigbourhood(vertex.position, 100);

          let centerOfMass = this.getCurrentCenterOfMass();
          let distanceA = proposedVectorA.distanceSq(centerOfMass);
          let distanceB = proposedVectorB.distanceSq(centerOfMass);
          nextVertex.angle = distanceA < distanceB ? proposedAngleB : proposedAngleA;
          this.createNextBond(nextVertex, vertex, previousAngle + nextVertex.angle);
        } else {
          let a = vertex.angle; // Take the min and max if the previous angle was in a 4-neighbourhood (90° angles)
          // TODO: If a is null or zero, it should be checked whether or not this one should go cis or trans, that is,
          //       it should go into the oposite direction of the last non-null or 0 previous vertex / angle.

          if (previousVertex && previousVertex.neighbours.length > 3) {
            if (a > 0) {
              a = Math.min(1.0472, a);
            } else if (a < 0) {
              a = Math.max(-1.0472, a);
            } else {
              a = 1.0472;
            }
          } else if (!a) {
            let v = this.getLastVertexWithAngle(vertex.id);
            a = v.angle;

            if (!a) {
              a = 1.0472;
            }
          } // Handle configuration around double bonds


          if (previousVertex && !doubleBondConfigSet) {
            let bondType = this.graph.getEdge(vertex.id, nextVertex.id).bondType;

            if (bondType === '/') {
              if (this.doubleBondConfig === '/') {// Nothing to do since it will be trans per default
              } else if (this.doubleBondConfig === '\\') {
                a = -a;
              }

              this.doubleBondConfig = null;
            } else if (bondType === '\\') {
              if (this.doubleBondConfig === '/') {
                a = -a;
              } else if (this.doubleBondConfig === '\\') {// Nothing to do since it will be trans per default
              }

              this.doubleBondConfig = null;
            }
          }

          if (originShortest) {
            nextVertex.angle = a;
          } else {
            nextVertex.angle = -a;
          }

          this.createNextBond(nextVertex, vertex, previousAngle + nextVertex.angle);
        }
      } else if (neighbours.length === 2) {
        // If the previous vertex comes out of a ring, it doesn't have an angle set
        let a = vertex.angle;

        if (!a) {
          a = 1.0472;
        } // Check for the longer subtree - always go with cis for the longer subtree


        let subTreeDepthA = this.graph.getTreeDepth(neighbours[0], vertex.id);
        let subTreeDepthB = this.graph.getTreeDepth(neighbours[1], vertex.id);
        let l = this.graph.vertices[neighbours[0]];
        let r = this.graph.vertices[neighbours[1]];
        l.value.subtreeDepth = subTreeDepthA;
        r.value.subtreeDepth = subTreeDepthB; // Also get the subtree for the previous direction (this is important when
        // the previous vertex is the shortest path)

        let subTreeDepthC = this.graph.getTreeDepth(previousVertex ? previousVertex.id : null, vertex.id);

        if (previousVertex) {
          previousVertex.value.subtreeDepth = subTreeDepthC;
        }

        let cis = 0;
        let trans = 1; // Carbons go always cis

        if (r.value.element === 'C' && l.value.element !== 'C' && subTreeDepthB > 1 && subTreeDepthA < 5) {
          cis = 1;
          trans = 0;
        } else if (r.value.element !== 'C' && l.value.element === 'C' && subTreeDepthA > 1 && subTreeDepthB < 5) {
          cis = 0;
          trans = 1;
        } else if (subTreeDepthB > subTreeDepthA) {
          cis = 1;
          trans = 0;
        }

        let cisVertex = this.graph.vertices[neighbours[cis]];
        let transVertex = this.graph.vertices[neighbours[trans]];
        let edgeCis = this.graph.getEdge(vertex.id, cisVertex.id);
        let edgeTrans = this.graph.getEdge(vertex.id, transVertex.id); // If the origin tree is the shortest, make them the main chain

        let originShortest = false;

        if (subTreeDepthC < subTreeDepthA && subTreeDepthC < subTreeDepthB) {
          originShortest = true;
        }

        transVertex.angle = a;
        cisVertex.angle = -a;

        if (this.doubleBondConfig === '\\') {
          if (transVertex.value.branchBond === '\\') {
            transVertex.angle = -a;
            cisVertex.angle = a;
          }
        } else if (this.doubleBondConfig === '/') {
          if (transVertex.value.branchBond === '/') {
            transVertex.angle = -a;
            cisVertex.angle = a;
          }
        }

        this.createNextBond(transVertex, vertex, previousAngle + transVertex.angle, originShortest);
        this.createNextBond(cisVertex, vertex, previousAngle + cisVertex.angle, originShortest);
      } else if (neighbours.length === 3) {
        // The vertex with the longest sub-tree should always go straight
        let d1 = this.graph.getTreeDepth(neighbours[0], vertex.id);
        let d2 = this.graph.getTreeDepth(neighbours[1], vertex.id);
        let d3 = this.graph.getTreeDepth(neighbours[2], vertex.id);
        let s = this.graph.vertices[neighbours[0]];
        let l = this.graph.vertices[neighbours[1]];
        let r = this.graph.vertices[neighbours[2]];
        s.value.subtreeDepth = d1;
        l.value.subtreeDepth = d2;
        r.value.subtreeDepth = d3;

        if (d2 > d1 && d2 > d3) {
          s = this.graph.vertices[neighbours[1]];
          l = this.graph.vertices[neighbours[0]];
          r = this.graph.vertices[neighbours[2]];
        } else if (d3 > d1 && d3 > d2) {
          s = this.graph.vertices[neighbours[2]];
          l = this.graph.vertices[neighbours[0]];
          r = this.graph.vertices[neighbours[1]];
        } // Create a cross if more than one subtree is of length > 1
        // or the vertex is connected to a ring


        if (previousVertex && previousVertex.value.rings.length < 1 && s.value.rings.length < 1 && l.value.rings.length < 1 && r.value.rings.length < 1 && this.graph.getTreeDepth(l.id, vertex.id) === 1 && this.graph.getTreeDepth(r.id, vertex.id) === 1 && this.graph.getTreeDepth(s.id, vertex.id) > 1) {
          s.angle = -vertex.angle;

          if (vertex.angle >= 0) {
            l.angle = MathHelper.toRad(30);
            r.angle = MathHelper.toRad(90);
          } else {
            l.angle = -MathHelper.toRad(30);
            r.angle = -MathHelper.toRad(90);
          }

          this.createNextBond(s, vertex, previousAngle + s.angle);
          this.createNextBond(l, vertex, previousAngle + l.angle);
          this.createNextBond(r, vertex, previousAngle + r.angle);
        } else {
          s.angle = 0.0;
          l.angle = MathHelper.toRad(90);
          r.angle = -MathHelper.toRad(90);
          this.createNextBond(s, vertex, previousAngle + s.angle);
          this.createNextBond(l, vertex, previousAngle + l.angle);
          this.createNextBond(r, vertex, previousAngle + r.angle);
        }
      } else if (neighbours.length === 4) {
        // The vertex with the longest sub-tree should always go to the reflected opposide direction
        let d1 = this.graph.getTreeDepth(neighbours[0], vertex.id);
        let d2 = this.graph.getTreeDepth(neighbours[1], vertex.id);
        let d3 = this.graph.getTreeDepth(neighbours[2], vertex.id);
        let d4 = this.graph.getTreeDepth(neighbours[3], vertex.id);
        let w = this.graph.vertices[neighbours[0]];
        let x = this.graph.vertices[neighbours[1]];
        let y = this.graph.vertices[neighbours[2]];
        let z = this.graph.vertices[neighbours[3]];
        w.value.subtreeDepth = d1;
        x.value.subtreeDepth = d2;
        y.value.subtreeDepth = d3;
        z.value.subtreeDepth = d4;

        if (d2 > d1 && d2 > d3 && d2 > d4) {
          w = this.graph.vertices[neighbours[1]];
          x = this.graph.vertices[neighbours[0]];
          y = this.graph.vertices[neighbours[2]];
          z = this.graph.vertices[neighbours[3]];
        } else if (d3 > d1 && d3 > d2 && d3 > d4) {
          w = this.graph.vertices[neighbours[2]];
          x = this.graph.vertices[neighbours[0]];
          y = this.graph.vertices[neighbours[1]];
          z = this.graph.vertices[neighbours[3]];
        } else if (d4 > d1 && d4 > d2 && d4 > d3) {
          w = this.graph.vertices[neighbours[3]];
          x = this.graph.vertices[neighbours[0]];
          y = this.graph.vertices[neighbours[1]];
          z = this.graph.vertices[neighbours[2]];
        }

        w.angle = -MathHelper.toRad(36);
        x.angle = MathHelper.toRad(36);
        y.angle = -MathHelper.toRad(108);
        z.angle = MathHelper.toRad(108);
        this.createNextBond(w, vertex, previousAngle + w.angle);
        this.createNextBond(x, vertex, previousAngle + x.angle);
        this.createNextBond(y, vertex, previousAngle + y.angle);
        this.createNextBond(z, vertex, previousAngle + z.angle);
      }
    }
  }
  /**
   * Gets the vetex sharing the edge that is the common bond of two rings.
   *
   * @param {Vertex} vertex A vertex.
   * @returns {(Number|null)} The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.
   */


  getCommonRingbondNeighbour(vertex) {
    let neighbours = vertex.neighbours;

    for (var i = 0; i < neighbours.length; i++) {
      let neighbour = this.graph.vertices[neighbours[i]];

      if (ArrayHelper.containsAll(neighbour.value.rings, vertex.value.rings)) {
        return neighbour;
      }
    }

    return null;
  }
  /**
   * Check if a vector is inside any ring.
   *
   * @param {Vector2} vec A vector.
   * @returns {Boolean} A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.
   */


  isPointInRing(vec) {
    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];

      if (!ring.positioned) {
        continue;
      }

      let radius = MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());
      let radiusSq = radius * radius;

      if (vec.distanceSq(ring.center) < radiusSq) {
        return true;
      }
    }

    return false;
  }
  /**
   * Check whether or not an edge is part of a ring.
   *
   * @param {Edge} edge An edge.
   * @returns {Boolean} A boolean indicating whether or not the edge is part of a ring.
   */


  isEdgeInRing(edge) {
    let source = this.graph.vertices[edge.sourceId];
    let target = this.graph.vertices[edge.targetId];
    return this.areVerticesInSameRing(source, target);
  }
  /**
   * Check whether or not an edge is rotatable.
   *
   * @param {Edge} edge An edge.
   * @returns {Boolean} A boolean indicating whether or not the edge is rotatable.
   */


  isEdgeRotatable(edge) {
    let vertexA = this.graph.vertices[edge.sourceId];
    let vertexB = this.graph.vertices[edge.targetId]; // Only single bonds are rotatable

    if (edge.bondType !== '-') {
      return false;
    } // Do not rotate edges that have a further single bond to each side - do that!
    // If the bond is terminal, it doesn't make sense to rotate it
    // if (vertexA.getNeighbourCount() + vertexB.getNeighbourCount() < 5) {
    //   return false;
    // }


    if (vertexA.isTerminal() || vertexB.isTerminal()) {
      return false;
    } // Ringbonds are not rotatable


    if (vertexA.value.rings.length > 0 && vertexB.value.rings.length > 0 && this.areVerticesInSameRing(vertexA, vertexB)) {
      return false;
    }

    return true;
  }
  /**
   * Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).
   *
   * @param {Ring} ring A ring.
   * @returns {Boolean} A boolean indicating whether or not a ring is implicitly defined as aromatic.
   */


  isRingAromatic(ring) {
    for (var i = 0; i < ring.members.length; i++) {
      let vertex = this.graph.vertices[ring.members[i]];

      if (!vertex.value.isPartOfAromaticRing) {
        return false;
      }
    }

    return true;
  }
  /**
   * Get the normals of an edge.
   *
   * @param {Edge} edge An edge.
   * @returns {Vector2[]} An array containing two vectors, representing the normals.
   */


  getEdgeNormals(edge) {
    let v1 = this.graph.vertices[edge.sourceId].position;
    let v2 = this.graph.vertices[edge.targetId].position; // Get the normalized normals for the edge

    let normals = Vector2.units(v1, v2);
    return normals;
  }
  /**
   * Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).
   *
   * @param {Number} vertexId A vertex id.
   * @returns {Vertex[]} An array of vertices.
   */


  getNonRingNeighbours(vertexId) {
    let nrneighbours = Array();
    let vertex = this.graph.vertices[vertexId];
    let neighbours = vertex.neighbours;

    for (var i = 0; i < neighbours.length; i++) {
      let neighbour = this.graph.vertices[neighbours[i]];
      let nIntersections = ArrayHelper.intersection(vertex.value.rings, neighbour.value.rings).length;

      if (nIntersections === 0 && neighbour.value.isBridge == false) {
        nrneighbours.push(neighbour);
      }
    }

    return nrneighbours;
  }
  /**
   * Annotaed stereochemistry information for visualization.
   */


  annotateStereochemistry() {
    let maxDepth = 10; // For each stereo-center

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

      if (!vertex.value.isStereoCenter) {
        continue;
      }

      let neighbours = vertex.getNeighbours();
      let nNeighbours = neighbours.length;
      let priorities = Array(nNeighbours);

      for (var j = 0; j < nNeighbours; j++) {
        let visited = new Uint8Array(this.graph.vertices.length);
        let priority = Array(Array());
        visited[vertex.id] = 1;
        this.visitStereochemistry(neighbours[j], vertex.id, visited, priority, maxDepth, 0); // Sort each level according to atomic number

        for (var k = 0; k < priority.length; k++) {
          priority[k].sort(function (a, b) {
            return b - a;
          });
        }

        priorities[j] = [j, priority];
      }

      let maxLevels = 0;
      let maxEntries = 0;

      for (var j = 0; j < priorities.length; j++) {
        if (priorities[j][1].length > maxLevels) {
          maxLevels = priorities[j][1].length;
        }

        for (var k = 0; k < priorities[j][1].length; k++) {
          if (priorities[j][1][k].length > maxEntries) {
            maxEntries = priorities[j][1][k].length;
          }
        }
      }

      for (var j = 0; j < priorities.length; j++) {
        let diff = maxLevels - priorities[j][1].length;

        for (var k = 0; k < diff; k++) {
          priorities[j][1].push([]);
        } // Break ties by the position in the SMILES string as per specification


        priorities[j][1].push([neighbours[j]]); // Make all same length. Fill with zeroes.

        for (var k = 0; k < priorities[j][1].length; k++) {
          let diff = maxEntries - priorities[j][1][k].length;

          for (var l = 0; l < diff; l++) {
            priorities[j][1][k].push(0);
          }
        }
      }

      priorities.sort(function (a, b) {
        for (var j = 0; j < a[1].length; j++) {
          for (var k = 0; k < a[1][j].length; k++) {
            if (a[1][j][k] > b[1][j][k]) {
              return -1;
            } else if (a[1][j][k] < b[1][j][k]) {
              return 1;
            }
          }
        }

        return 0;
      });
      let order = new Uint8Array(nNeighbours);

      for (var j = 0; j < nNeighbours; j++) {
        order[j] = priorities[j][0];
        vertex.value.priority = j;
      } // Check the angles between elements 0 and 1, and 0 and 2 to determine whether they are
      // drawn cw or ccw
      // TODO: OC(Cl)=[C@]=C(C)F currently fails here, however this is, IMHO, not a valid SMILES.


      let posA = this.graph.vertices[neighbours[order[0]]].position;
      let posB = this.graph.vertices[neighbours[order[1]]].position;
      let posC = this.graph.vertices[neighbours[order[2]]].position;
      let cwA = posA.relativeClockwise(posB, vertex.position);
      let cwB = posA.relativeClockwise(posC, vertex.position); // If the second priority is clockwise from the first, the ligands are drawn clockwise, since
      // The hydrogen can be drawn on either side

      let isCw = cwA === -1;
      let rotation = vertex.value.bracket.chirality === '@' ? -1 : 1;
      let rs = MathHelper.parityOfPermutation(order) * rotation === 1 ? 'R' : 'S'; // Flip the hydrogen direction when the drawing doesn't match the chirality.

      let wedgeA = 'down';
      let wedgeB = 'up';

      if (isCw && rs !== 'R' || !isCw && rs !== 'S') {
        vertex.value.hydrogenDirection = 'up';
        wedgeA = 'up';
        wedgeB = 'down';
      }

      if (vertex.value.hasHydrogen) {
        this.graph.getEdge(vertex.id, neighbours[order[order.length - 1]]).wedge = wedgeA;
      } // Get the shortest subtree to flip up / down. Ignore lowest priority
      // The rules are following:
      // 1. Do not draw wedge between two stereocenters
      // 2. Heteroatoms
      // 3. Draw outside ring
      // 4. Shortest subtree


      let wedgeOrder = new Array(neighbours.length - 1);
      let showHydrogen = vertex.value.rings.length > 1 && vertex.value.hasHydrogen;
      let offset = vertex.value.hasHydrogen ? 1 : 0;

      for (var j = 0; j < order.length - offset; j++) {
        wedgeOrder[j] = new Uint32Array(2);
        let neighbour = this.graph.vertices[neighbours[order[j]]];
        wedgeOrder[j][0] += neighbour.value.isStereoCenter ? 0 : 100000; // wedgeOrder[j][0] += neighbour.value.rings.length > 0 ? 0 : 10000;
        // Only add if in same ring, unlike above

        wedgeOrder[j][0] += this.areVerticesInSameRing(neighbour, vertex) ? 0 : 10000;
        wedgeOrder[j][0] += neighbour.value.isHeteroAtom() ? 1000 : 0;
        wedgeOrder[j][0] -= neighbour.value.subtreeDepth === 0 ? 1000 : 0;
        wedgeOrder[j][0] += 1000 - neighbour.value.subtreeDepth;
        wedgeOrder[j][1] = neighbours[order[j]];
      }

      wedgeOrder.sort(function (a, b) {
        if (a[0] > b[0]) {
          return -1;
        } else if (a[0] < b[0]) {
          return 1;
        }

        return 0;
      }); // If all neighbours are in a ring, do not draw wedge, the hydrogen will be drawn.

      if (!showHydrogen) {
        let wedgeId = wedgeOrder[0][1];

        if (vertex.value.hasHydrogen) {
          this.graph.getEdge(vertex.id, wedgeId).wedge = wedgeB;
        } else {
          let wedge = wedgeB;

          for (var j = order.length - 1; j >= 0; j--) {
            if (wedge === wedgeA) {
              wedge = wedgeB;
            } else {
              wedge = wedgeA;
            }

            if (neighbours[order[j]] === wedgeId) {
              break;
            }
          }

          this.graph.getEdge(vertex.id, wedgeId).wedge = wedge;
        }
      }

      vertex.value.chirality = rs;
    }
  }
  /**
   * 
   * 
   * @param {Number} vertexId The id of a vertex.
   * @param {(Number|null)} previousVertexId The id of the parent vertex of the vertex.
   * @param {Uint8Array} visited An array containing the visited flag for all vertices in the graph.
   * @param {Array} priority An array of arrays storing the atomic numbers for each level.
   * @param {Number} maxDepth The maximum depth.
   * @param {Number} depth The current depth.
   */


  visitStereochemistry(vertexId, previousVertexId, visited, priority, maxDepth, depth, parentAtomicNumber = 0) {
    visited[vertexId] = 1;
    let vertex = this.graph.vertices[vertexId];
    let atomicNumber = vertex.value.getAtomicNumber();

    if (priority.length <= depth) {
      priority.push(Array());
    }

    for (var i = 0; i < this.graph.getEdge(vertexId, previousVertexId).weight; i++) {
      priority[depth].push(parentAtomicNumber * 1000 + atomicNumber);
    }

    let neighbours = this.graph.vertices[vertexId].neighbours;

    for (var i = 0; i < neighbours.length; i++) {
      if (visited[neighbours[i]] !== 1 && depth < maxDepth - 1) {
        this.visitStereochemistry(neighbours[i], vertexId, visited.slice(), priority, maxDepth, depth + 1, atomicNumber);
      }
    } // Valences are filled with hydrogens and passed to the next level.


    if (depth < maxDepth - 1) {
      let bonds = 0;

      for (var i = 0; i < neighbours.length; i++) {
        bonds += this.graph.getEdge(vertexId, neighbours[i]).weight;
      }

      for (var i = 0; i < vertex.value.getMaxBonds() - bonds; i++) {
        if (priority.length <= depth + 1) {
          priority.push(Array());
        }

        priority[depth + 1].push(atomicNumber * 1000 + 1);
      }
    }
  }
  /**
   * Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon sets
   * the involved atoms not to be displayed.
   */


  initPseudoElements() {
    for (var i = 0; i < this.graph.vertices.length; i++) {
      const vertex = this.graph.vertices[i];
      const neighbourIds = vertex.neighbours;
      let neighbours = Array(neighbourIds.length);

      for (var j = 0; j < neighbourIds.length; j++) {
        neighbours[j] = this.graph.vertices[neighbourIds[j]];
      } // Ignore atoms that have less than 3 neighbours, except if
      // the vertex is connected to a ring and has two neighbours


      if (vertex.getNeighbourCount() < 3 || vertex.value.rings.length > 0) {
        continue;
      } // TODO: This exceptions should be handled more elegantly (via config file?)
      // Ignore phosphates (especially for triphosphates)


      if (vertex.value.element === 'P') {
        continue;
      } // Ignore also guanidine


      if (vertex.value.element === 'C' && neighbours.length === 3 && neighbours[0].value.element === 'N' && neighbours[1].value.element === 'N' && neighbours[2].value.element === 'N') {
        continue;
      } // Continue if there are less than two heteroatoms
      // or if a neighbour has more than 1 neighbour


      let heteroAtomCount = 0;
      let ctn = 0;

      for (var j = 0; j < neighbours.length; j++) {
        let neighbour = neighbours[j];
        let neighbouringElement = neighbour.value.element;
        let neighbourCount = neighbour.getNeighbourCount();

        if (neighbouringElement !== 'C' && neighbouringElement !== 'H' && neighbourCount === 1) {
          heteroAtomCount++;
        }

        if (neighbourCount > 1) {
          ctn++;
        }
      }

      if (ctn > 1 || heteroAtomCount < 2) {
        continue;
      } // Get the previous atom (the one which is not terminal)


      let previous = null;

      for (var j = 0; j < neighbours.length; j++) {
        let neighbour = neighbours[j];

        if (neighbour.getNeighbourCount() > 1) {
          previous = neighbour;
        }
      }

      for (var j = 0; j < neighbours.length; j++) {
        let neighbour = neighbours[j];

        if (neighbour.getNeighbourCount() > 1) {
          continue;
        }

        neighbour.value.isDrawn = false;
        let hydrogens = Atom.maxBonds[neighbour.value.element] - neighbour.value.bondCount;
        let charge = '';

        if (neighbour.value.bracket) {
          hydrogens = neighbour.value.bracket.hcount;
          charge = neighbour.value.bracket.charge || 0;
        }

        vertex.value.attachPseudoElement(neighbour.value.element, previous ? previous.value.element : null, hydrogens, charge);
      }
    } // The second pass


    for (var i = 0; i < this.graph.vertices.length; i++) {
      const vertex = this.graph.vertices[i];
      const atom = vertex.value;
      const element = atom.element;

      if (element === 'C' || element === 'H' || !atom.isDrawn) {
        continue;
      }

      const neighbourIds = vertex.neighbours;
      let neighbours = Array(neighbourIds.length);

      for (var j = 0; j < neighbourIds.length; j++) {
        neighbours[j] = this.graph.vertices[neighbourIds[j]];
      }

      for (var j = 0; j < neighbours.length; j++) {
        let neighbour = neighbours[j].value;

        if (!neighbour.hasAttachedPseudoElements || neighbour.getAttachedPseudoElementsCount() !== 2) {
          continue;
        }

        const pseudoElements = neighbour.getAttachedPseudoElements();

        if (pseudoElements.hasOwnProperty('0O') && pseudoElements.hasOwnProperty('3C')) {
          neighbour.isDrawn = false;
          vertex.value.attachPseudoElement('Ac', '', 0);
        }
      }
    }
  }

}

module.exports = DrawerBase;

},{"./ArrayHelper":3,"./Atom":4,"./CanvasWrapper":5,"./Edge":8,"./Graph":11,"./Line":12,"./MathHelper":13,"./Options":14,"./Ring":20,"./RingConnection":21,"./SSSR":22,"./ThemeManager":26,"./Vector2":28,"./Vertex":29}],8:[function(require,module,exports){
"use strict";

//@ts-check

/** 
 * A class representing an edge. 
 * 
 * @property {Number} id The id of this edge.
 * @property {Number} sourceId The id of the source vertex.
 * @property {Number} targetId The id of the target vertex.
 * @property {Number} weight The weight of this edge. That is, the degree of the bond (single bond = 1, double bond = 2, etc).
 * @property {String} [bondType='-'] The bond type of this edge.
 * @property {Boolean} [isPartOfAromaticRing=false] Whether or not this edge is part of an aromatic ring.
 * @property {Boolean} [center=false] Wheter or not the bond is centered. For example, this affects straight double bonds.
 * @property {String} [wedge=''] Wedge direction. Either '', 'up' or 'down'
 */
class Edge {
  /**
   * The constructor for the class Edge.
   *
   * @param {Number} sourceId A vertex id.
   * @param {Number} targetId A vertex id.
   * @param {Number} [weight=1] The weight of the edge.
   */
  constructor(sourceId, targetId, weight = 1) {
    this.id = null;
    this.sourceId = sourceId;
    this.targetId = targetId;
    this.weight = weight;
    this.bondType = '-';
    this.isPartOfAromaticRing = false;
    this.center = false;
    this.wedge = '';
  }
  /**
   * Set the bond type of this edge. This also sets the edge weight.
   * @param {String} bondType 
   */


  setBondType(bondType) {
    this.bondType = bondType;
    this.weight = Edge.bonds[bondType];
  }
  /**
   * An object mapping the bond type to the number of bonds.
   *
   * @returns {Object} The object containing the map.
   */


  static get bonds() {
    return {
      '-': 1,
      '/': 1,
      '\\': 1,
      '=': 2,
      '#': 3,
      '$': 4
    };
  }

}

module.exports = Edge;

},{}],9:[function(require,module,exports){
"use strict";

//@ts-check
const formulaToCommonName = {
  'C2H4O2': 'acetic acid',
  'C3H6O': 'acetone',
  'C2H3N': 'acetonitrile',
  'C6H6': 'benzene',
  'CCl4': 'carbon tetrachloride',
  'C6H5Cl': 'chlorobenzene',
  'CHCl3': 'chloroform',
  'C6H12': 'cyclohexane',
  'C2H4Cl2': '1,2-dichloroethane',
  'C4H10O3': 'diethylene glycol',
  'C6H14O3': 'diglyme',
  'C4H10O2': 'DME',
  'C3H7NO': 'DMF',
  'C2H6OS': 'DMSO',
  'C2H6O': 'ethanol',
  'C2H6O2': 'ethylene glycol',
  'C3H8O3': 'glycerin',
  'C7H16': 'heptane',
  'C6H18N3OP': 'HMPA',
  'C6H18N3P': 'HMPT',
  'C6H14': 'hexane',
  'CH4O': 'methanol',
  'C5H12O': 'MTBE',
  'CH2Cl2': 'methylene chloride',
  'CH5H9NO': 'NMP',
  'CH3NO2': 'nitromethane',
  'C5H12': 'pentane',
  'C5H5N': 'pyridine',
  'C7H8': 'toluene',
  'C6H15N': 'triethyl amine',
  'H2O': 'water'
};
module.exports = formulaToCommonName;

},{}],10:[function(require,module,exports){
"use strict";

var _chromaJs = require("chroma-js");

var _chromaJs2 = _interopRequireDefault(_chromaJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Vector2 = require('./Vector2');

const convertImage = require('./PixelsToSvg');

class GaussDrawer {
  /**
  * The constructor of the class Graph.
  * 
  * @param {Vector2[]} points The centres of the gaussians.
  * @param {Number[]} weights The weights / amplitudes for each gaussian.
  */
  constructor(points, weights, width, height, sigma = 0.3, interval = 0, colormap = null, opacity = 1.0, normalized = false) {
    this.points = points;
    this.weights = weights;
    this.width = width;
    this.height = height;
    this.sigma = sigma;
    this.interval = interval;
    this.opacity = opacity;
    this.normalized = normalized;

    if (colormap === null) {
      let piyg11 = ["#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#ffffff", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221"];
      colormap = piyg11;
    }

    this.colormap = colormap;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  setFromArray(arr_points, arr_weights) {
    this.points = [];
    arr_points.forEach(a => {
      this.points.push(new Vector2(a[0], a[1]));
    });
    this.weights = [];
    arr_weights.forEach(w => {
      this.weights.push(w);
    });
  }
  /**
   * Compute and draw the gaussians.
   */


  draw() {
    let m = [];

    for (let x = 0; x < this.width; x++) {
      let row = [];

      for (let y = 0; y < this.height; y++) {
        row.push(0.0);
      }

      m.push(row);
    }

    for (let i = 0; i < this.points.length; i++) {
      let v = this.points[i];
      let a = this.weights[i];

      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          let v_x = (x - v.x) ** 2 / (2 * this.sigma ** 2);
          let v_y = (y - v.y) ** 2 / (2 * this.sigma ** 2);
          let val = a * Math.exp(-(v_x + v_y));
          m[x][y] += val;
        }
      }
    }

    let abs_max = 1.0;

    if (!this.normalized) {
      let max = -Number.MAX_SAFE_INTEGER;
      let min = Number.MAX_SAFE_INTEGER;

      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          if (m[x][y] < min) {
            min = m[x][y];
          }

          if (m[x][y] > max) {
            max = m[x][y];
          }
        }
      }

      abs_max = Math.max(Math.abs(min), Math.abs(max));
    }

    const scale = _chromaJs2.default.scale(this.colormap).domain([-1.0, 1.0]);

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (!this.normalized) {
          m[x][y] = m[x][y] / abs_max;
        }

        if (this.interval !== 0) {
          m[x][y] = Math.round(m[x][y] / this.interval) * this.interval;
        }

        let [r, g, b] = scale(m[x][y]).rgb();
        this.setPixel(new Vector2(x, y), r, g, b);
      }
    }
  }
  /**
   * Get the canvas as an HTML image.
   * 
   * @param {CallableFunction} callback
   */


  getImage(callback) {
    let image = new Image();

    image.onload = () => {
      this.context.imageSmoothingEnabled = false;
      this.context.drawImage(image, 0, 0, this.width, this.height);

      if (callback) {
        callback(image);
      }
    };

    image.onerror = function (err) {
      console.log(err);
    };

    image.src = this.canvas.toDataURL();
  }
  /**
   * Get the canvas as an SVG element.
   * 
   * @param {CallableFunction} callback
   */


  getSVG() {
    return convertImage(this.context.getImageData(0, 0, this.width, this.height));
  }
  /**
   * Set the colour at a specific point on the canvas.
   * 
   * @param {Vector2} vec The pixel position on the canvas.
   * @param {Number} r The red colour-component.
   * @param {Number} g The green colour-component.
   * @param {Number} b The blue colour-component.
   * @param {Number} a The alpha colour-component.
   */


  setPixel(vec, r, g, b) {
    this.context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + this.opacity + ")";
    this.context.fillRect(vec.x, vec.y, 1, 1);
  }

}

module.exports = GaussDrawer;

},{"./PixelsToSvg":16,"./Vector2":28,"chroma-js":2}],11:[function(require,module,exports){
"use strict";

//@ts-check
const MathHelper = require('./MathHelper');

const Vector2 = require('./Vector2');

const Vertex = require('./Vertex');

const Edge = require('./Edge');

const Ring = require('./Ring');

const Atom = require('./Atom');
/** 
 * A class representing the molecular graph. 
 * 
 * @property {Vertex[]} vertices The vertices of the graph.
 * @property {Edge[]} edges The edges of this graph.
 * @property {Number[]} atomIdxToVertexId A map mapping atom indices to vertex ids.
 * @property {Object} vertexIdsToEdgeId A map mapping vertex ids to the edge between the two vertices. The key is defined as vertexAId + '_' + vertexBId.
 * @property {Boolean} isometric A boolean indicating whether or not the SMILES associated with this graph is isometric.
 */


class Graph {
  /**
   * The constructor of the class Graph.
   * 
   * @param {Object} parseTree A SMILES parse tree.
   * @param {Boolean} [isomeric=false] A boolean specifying whether or not the SMILES is isomeric.
   */
  constructor(parseTree, isomeric = false) {
    this.vertices = Array();
    this.edges = Array();
    this.atomIdxToVertexId = Array();
    this.vertexIdsToEdgeId = {};
    this.isomeric = isomeric; // Used to assign indices to the heavy atoms.

    this._atomIdx = 0; // Used for the bridge detection algorithm

    this._time = 0;

    this._init(parseTree);
  }
  /**
   * PRIVATE FUNCTION. Initializing the graph from the parse tree.
   *
   * @param {Object} node The current node in the parse tree.
   * @param {?Number} parentVertexId=null The id of the previous vertex.
   * @param {Boolean} isBranch=false Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C).
   */


  _init(node, order = 0, parentVertexId = null, isBranch = false) {
    // Create a new vertex object
    const element = node.atom.element ? node.atom.element : node.atom;
    let atom = new Atom(element, node.bond);

    if (element !== 'H') {
      atom.idx = this._atomIdx;
      this._atomIdx++;
    }

    atom.branchBond = node.branchBond;
    atom.ringbonds = node.ringbonds;
    atom.bracket = node.atom.element ? node.atom : null;
    atom.class = node.atom.class;
    let vertex = new Vertex(atom);
    let parentVertex = this.vertices[parentVertexId];
    this.addVertex(vertex);

    if (atom.idx !== null) {
      this.atomIdxToVertexId.push(vertex.id);
    } // Add the id of this node to the parent as child


    if (parentVertexId !== null) {
      vertex.setParentVertexId(parentVertexId);
      vertex.value.addNeighbouringElement(parentVertex.value.element);
      parentVertex.addChild(vertex.id);
      parentVertex.value.addNeighbouringElement(atom.element); // In addition create a spanningTreeChildren property, which later will
      // not contain the children added through ringbonds

      parentVertex.spanningTreeChildren.push(vertex.id); // Add edge between this node and its parent

      let edge = new Edge(parentVertexId, vertex.id, 1);
      let vertexId = null;

      if (isBranch) {
        edge.setBondType(vertex.value.branchBond || '-');
        vertexId = vertex.id;
        edge.setBondType(vertex.value.branchBond || '-');
        vertexId = vertex.id;
      } else {
        edge.setBondType(parentVertex.value.bondType || '-');
        vertexId = parentVertex.id;
      }

      let edgeId = this.addEdge(edge);
    }

    let offset = node.ringbondCount + 1;

    if (atom.bracket) {
      offset += atom.bracket.hcount;
    }

    let stereoHydrogens = 0;

    if (atom.bracket && atom.bracket.chirality) {
      atom.isStereoCenter = true;
      stereoHydrogens = atom.bracket.hcount;

      for (var i = 0; i < stereoHydrogens; i++) {
        this._init({
          atom: 'H',
          isBracket: 'false',
          branches: Array(),
          branchCount: 0,
          ringbonds: Array(),
          ringbondCount: false,
          next: null,
          hasNext: false,
          bond: '-'
        }, i, vertex.id, true);
      }
    }

    for (var i = 0; i < node.branchCount; i++) {
      this._init(node.branches[i], i + offset, vertex.id, true);
    }

    if (node.hasNext) {
      this._init(node.next, node.branchCount + offset, vertex.id);
    }
  }
  /**
   * Clears all the elements in this graph (edges and vertices).
   */


  clear() {
    this.vertices = Array();
    this.edges = Array();
    this.vertexIdsToEdgeId = {};
  }
  /**
   * Add a vertex to the graph.
   *
   * @param {Vertex} vertex A new vertex.
   * @returns {Number} The vertex id of the new vertex.
   */


  addVertex(vertex) {
    vertex.id = this.vertices.length;
    this.vertices.push(vertex);
    return vertex.id;
  }
  /**
   * Add an edge to the graph.
   *
   * @param {Edge} edge A new edge.
   * @returns {Number} The edge id of the new edge.
   */


  addEdge(edge) {
    let source = this.vertices[edge.sourceId];
    let target = this.vertices[edge.targetId];
    edge.id = this.edges.length;
    this.edges.push(edge);
    this.vertexIdsToEdgeId[edge.sourceId + '_' + edge.targetId] = edge.id;
    this.vertexIdsToEdgeId[edge.targetId + '_' + edge.sourceId] = edge.id;
    edge.isPartOfAromaticRing = source.value.isPartOfAromaticRing && target.value.isPartOfAromaticRing;
    source.value.bondCount += edge.weight;
    target.value.bondCount += edge.weight;
    source.edges.push(edge.id);
    target.edges.push(edge.id);
    return edge.id;
  }
  /**
   * Returns the edge between two given vertices.
   *
   * @param {Number} vertexIdA A vertex id.
   * @param {Number} vertexIdB A vertex id.
   * @returns {(Edge|null)} The edge or, if no edge can be found, null.
   */


  getEdge(vertexIdA, vertexIdB) {
    let edgeId = this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB];
    return edgeId === undefined ? null : this.edges[edgeId];
  }
  /**
   * Returns the ids of edges connected to a vertex.
   *
   * @param {Number} vertexId A vertex id.
   * @returns {Number[]} An array containing the ids of edges connected to the vertex.
   */


  getEdges(vertexId) {
    let edgeIds = Array();
    let vertex = this.vertices[vertexId];

    for (var i = 0; i < vertex.neighbours.length; i++) {
      edgeIds.push(this.vertexIdsToEdgeId[vertexId + '_' + vertex.neighbours[i]]);
    }

    return edgeIds;
  }
  /**
   * Check whether or not two vertices are connected by an edge.
   *
   * @param {Number} vertexIdA A vertex id.
   * @param {Number} vertexIdB A vertex id.
   * @returns {Boolean} A boolean indicating whether or not two vertices are connected by an edge.
   */


  hasEdge(vertexIdA, vertexIdB) {
    return this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB] !== undefined;
  }
  /**
   * Returns an array containing the vertex ids of this graph.
   * 
   * @returns {Number[]} An array containing all vertex ids of this graph.
   */


  getVertexList() {
    let arr = [this.vertices.length];

    for (var i = 0; i < this.vertices.length; i++) {
      arr[i] = this.vertices[i].id;
    }

    return arr;
  }
  /**
   * Returns an array containing source, target arrays of this graphs edges.
   * 
   * @returns {Array[]} An array containing source, target arrays of this graphs edges. Example: [ [ 2, 5 ], [ 6, 9 ] ].
   */


  getEdgeList() {
    let arr = Array(this.edges.length);

    for (var i = 0; i < this.edges.length; i++) {
      arr[i] = [this.edges[i].sourceId, this.edges[i].targetId];
    }

    return arr;
  }
  /**
   * Get the adjacency matrix of the graph.
   * 
   * @returns {Array[]} The adjancency matrix of the molecular graph.
   */


  getAdjacencyMatrix() {
    let length = this.vertices.length;
    let adjacencyMatrix = Array(length);

    for (var i = 0; i < length; i++) {
      adjacencyMatrix[i] = new Array(length);
      adjacencyMatrix[i].fill(0);
    }

    for (var i = 0; i < this.edges.length; i++) {
      let edge = this.edges[i];
      adjacencyMatrix[edge.sourceId][edge.targetId] = 1;
      adjacencyMatrix[edge.targetId][edge.sourceId] = 1;
    }

    return adjacencyMatrix;
  }
  /**
   * Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.
   * 
   * @returns {Array[]} The adjancency matrix of the molecular graph with all bridges removed.
   */


  getComponentsAdjacencyMatrix() {
    let length = this.vertices.length;
    let adjacencyMatrix = Array(length);
    let bridges = this.getBridges();

    for (var i = 0; i < length; i++) {
      adjacencyMatrix[i] = new Array(length);
      adjacencyMatrix[i].fill(0);
    }

    for (var i = 0; i < this.edges.length; i++) {
      let edge = this.edges[i];
      adjacencyMatrix[edge.sourceId][edge.targetId] = 1;
      adjacencyMatrix[edge.targetId][edge.sourceId] = 1;
    }

    for (var i = 0; i < bridges.length; i++) {
      adjacencyMatrix[bridges[i][0]][bridges[i][1]] = 0;
      adjacencyMatrix[bridges[i][1]][bridges[i][0]] = 0;
    }

    return adjacencyMatrix;
  }
  /**
   * Get the adjacency matrix of a subgraph.
   * 
   * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
   * @returns {Array[]} The adjancency matrix of the subgraph.
   */


  getSubgraphAdjacencyMatrix(vertexIds) {
    let length = vertexIds.length;
    let adjacencyMatrix = Array(length);

    for (var i = 0; i < length; i++) {
      adjacencyMatrix[i] = new Array(length);
      adjacencyMatrix[i].fill(0);

      for (var j = 0; j < length; j++) {
        if (i === j) {
          continue;
        }

        if (this.hasEdge(vertexIds[i], vertexIds[j])) {
          adjacencyMatrix[i][j] = 1;
        }
      }
    }

    return adjacencyMatrix;
  }
  /**
   * Get the distance matrix of the graph.
   * 
   * @returns {Array[]} The distance matrix of the graph.
   */


  getDistanceMatrix() {
    let length = this.vertices.length;
    let adja = this.getAdjacencyMatrix();
    let dist = Array(length);

    for (var i = 0; i < length; i++) {
      dist[i] = Array(length);
      dist[i].fill(Infinity);
    }

    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length; j++) {
        if (adja[i][j] === 1) {
          dist[i][j] = 1;
        }
      }
    }

    for (var k = 0; k < length; k++) {
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    return dist;
  }
  /**
   * Get the distance matrix of a subgraph.
   * 
   * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
   * @returns {Array[]} The distance matrix of the subgraph.
   */


  getSubgraphDistanceMatrix(vertexIds) {
    let length = vertexIds.length;
    let adja = this.getSubgraphAdjacencyMatrix(vertexIds);
    let dist = Array(length);

    for (var i = 0; i < length; i++) {
      dist[i] = Array(length);
      dist[i].fill(Infinity);
    }

    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length; j++) {
        if (adja[i][j] === 1) {
          dist[i][j] = 1;
        }
      }
    }

    for (var k = 0; k < length; k++) {
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    return dist;
  }
  /**
   * Get the adjacency list of the graph.
   * 
   * @returns {Array[]} The adjancency list of the graph.
   */


  getAdjacencyList() {
    let length = this.vertices.length;
    let adjacencyList = Array(length);

    for (var i = 0; i < length; i++) {
      adjacencyList[i] = [];

      for (var j = 0; j < length; j++) {
        if (i === j) {
          continue;
        }

        if (this.hasEdge(this.vertices[i].id, this.vertices[j].id)) {
          adjacencyList[i].push(j);
        }
      }
    }

    return adjacencyList;
  }
  /**
   * Get the adjacency list of a subgraph.
   * 
   * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
   * @returns {Array[]} The adjancency list of the subgraph.
   */


  getSubgraphAdjacencyList(vertexIds) {
    let length = vertexIds.length;
    let adjacencyList = Array(length);

    for (var i = 0; i < length; i++) {
      adjacencyList[i] = Array();

      for (var j = 0; j < length; j++) {
        if (i === j) {
          continue;
        }

        if (this.hasEdge(vertexIds[i], vertexIds[j])) {
          adjacencyList[i].push(j);
        }
      }
    }

    return adjacencyList;
  }
  /**
   * Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.
   * 
   * @returns {Number[]} An array containing the edge ids of the bridges.
   */


  getBridges() {
    let length = this.vertices.length;
    let visited = new Array(length);
    let disc = new Array(length);
    let low = new Array(length);
    let parent = new Array(length);
    let adj = this.getAdjacencyList();
    let outBridges = Array();
    visited.fill(false);
    parent.fill(null);
    this._time = 0;

    for (var i = 0; i < length; i++) {
      if (!visited[i]) {
        this._bridgeDfs(i, visited, disc, low, parent, adj, outBridges);
      }
    }

    return outBridges;
  }
  /**
   * Traverses the graph in breadth-first order.
   * 
   * @param {Number} startVertexId The id of the starting vertex.
   * @param {Function} callback The callback function to be called on every vertex.
   */


  traverseBF(startVertexId, callback) {
    let length = this.vertices.length;
    let visited = new Array(length);
    visited.fill(false);
    var queue = [startVertexId];

    while (queue.length > 0) {
      // JavaScripts shift() is O(n) ... bad JavaScript, bad!
      let u = queue.shift();
      let vertex = this.vertices[u];
      callback(vertex);

      for (var i = 0; i < vertex.neighbours.length; i++) {
        let v = vertex.neighbours[i];

        if (!visited[v]) {
          visited[v] = true;
          queue.push(v);
        }
      }
    }
  }
  /**
   * Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.
   *
   * @param {Number} vertexId A vertex id.
   * @param {Number} parentVertexId The id of a neighbouring vertex.
   * @returns {Number} The depth of the sub-tree.
   */


  getTreeDepth(vertexId, parentVertexId) {
    if (vertexId === null || parentVertexId === null) {
      return 0;
    }

    let neighbours = this.vertices[vertexId].getSpanningTreeNeighbours(parentVertexId);
    let max = 0;

    for (var i = 0; i < neighbours.length; i++) {
      let childId = neighbours[i];
      let d = this.getTreeDepth(childId, vertexId);

      if (d > max) {
        max = d;
      }
    }

    return max + 1;
  }
  /**
   * Traverse a sub-tree in the graph.
   *
   * @param {Number} vertexId A vertex id.
   * @param {Number} parentVertexId A neighbouring vertex.
   * @param {Function} callback The callback function that is called with each visited as an argument.
   * @param {Number} [maxDepth=999999] The maximum depth of the recursion.
   * @param {Boolean} [ignoreFirst=false] Whether or not to ignore the starting vertex supplied as vertexId in the callback.
   * @param {Number} [depth=1] The current depth in the tree.
   * @param {Uint8Array} [visited=null] An array holding a flag on whether or not a node has been visited.
   */


  traverseTree(vertexId, parentVertexId, callback, maxDepth = 999999, ignoreFirst = false, depth = 1, visited = null) {
    if (visited === null) {
      visited = new Uint8Array(this.vertices.length);
    }

    if (depth > maxDepth + 1 || visited[vertexId] === 1) {
      return;
    }

    visited[vertexId] = 1;
    let vertex = this.vertices[vertexId];
    let neighbours = vertex.getNeighbours(parentVertexId);

    if (!ignoreFirst || depth > 1) {
      callback(vertex);
    }

    for (var i = 0; i < neighbours.length; i++) {
      this.traverseTree(neighbours[i], vertexId, callback, maxDepth, ignoreFirst, depth + 1, visited);
    }
  }
  /**
   * Positiones the (sub)graph using Kamada and Kawais algorithm for drawing general undirected graphs. https://pdfs.semanticscholar.org/b8d3/bca50ccc573c5cb99f7d201e8acce6618f04.pdf
   * There are undocumented layout parameters. They are undocumented for a reason, so be very careful.
   * 
   * @param {Number[]} vertexIds An array containing vertexIds to be placed using the force based layout.
   * @param {Vector2} center The center of the layout.
   * @param {Number} startVertexId A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex.
   * @param {Ring} ring The bridged ring associated with this force-based layout.
   */


  kkLayout(vertexIds, center, startVertexId, ring, bondLength, threshold = 0.1, innerThreshold = 0.1, maxIteration = 2000, maxInnerIteration = 50, maxEnergy = 1e9) {
    let edgeStrength = bondLength; // Add vertices that are directly connected to the ring

    var i = vertexIds.length;

    while (i--) {
      let vertex = this.vertices[vertexIds[i]];
      var j = vertex.neighbours.length;
    }

    let matDist = this.getSubgraphDistanceMatrix(vertexIds);
    let length = vertexIds.length; // Initialize the positions. Place all vertices on a ring around the center

    let radius = MathHelper.polyCircumradius(500, length);
    let angle = MathHelper.centralAngle(length);
    let a = 0.0;
    let arrPositionX = new Float32Array(length);
    let arrPositionY = new Float32Array(length);
    let arrPositioned = Array(length);
    i = length;

    while (i--) {
      let vertex = this.vertices[vertexIds[i]];

      if (!vertex.positioned) {
        arrPositionX[i] = center.x + Math.cos(a) * radius;
        arrPositionY[i] = center.y + Math.sin(a) * radius;
      } else {
        arrPositionX[i] = vertex.position.x;
        arrPositionY[i] = vertex.position.y;
      }

      arrPositioned[i] = vertex.positioned;
      a += angle;
    } // Create the matrix containing the lengths


    let matLength = Array(length);
    i = length;

    while (i--) {
      matLength[i] = new Array(length);
      var j = length;

      while (j--) {
        matLength[i][j] = bondLength * matDist[i][j];
      }
    } // Create the matrix containing the spring strenghts


    let matStrength = Array(length);
    i = length;

    while (i--) {
      matStrength[i] = Array(length);
      var j = length;

      while (j--) {
        matStrength[i][j] = edgeStrength * Math.pow(matDist[i][j], -2.0);
      }
    } // Create the matrix containing the energies


    let matEnergy = Array(length);
    let arrEnergySumX = new Float32Array(length);
    let arrEnergySumY = new Float32Array(length);
    i = length;

    while (i--) {
      matEnergy[i] = Array(length);
    }

    i = length;
    let ux, uy, dEx, dEy, vx, vy, denom;

    while (i--) {
      ux = arrPositionX[i];
      uy = arrPositionY[i];
      dEx = 0.0;
      dEy = 0.0;
      let j = length;

      while (j--) {
        if (i === j) {
          continue;
        }

        vx = arrPositionX[j];
        vy = arrPositionY[j];
        denom = 1.0 / Math.sqrt((ux - vx) * (ux - vx) + (uy - vy) * (uy - vy));
        matEnergy[i][j] = [matStrength[i][j] * (ux - vx - matLength[i][j] * (ux - vx) * denom), matStrength[i][j] * (uy - vy - matLength[i][j] * (uy - vy) * denom)];
        matEnergy[j][i] = matEnergy[i][j];
        dEx += matEnergy[i][j][0];
        dEy += matEnergy[i][j][1];
      }

      arrEnergySumX[i] = dEx;
      arrEnergySumY[i] = dEy;
    } // Utility functions, maybe inline them later


    let energy = function (index) {
      return [arrEnergySumX[index] * arrEnergySumX[index] + arrEnergySumY[index] * arrEnergySumY[index], arrEnergySumX[index], arrEnergySumY[index]];
    };

    let highestEnergy = function () {
      let maxEnergy = 0.0;
      let maxEnergyId = 0;
      let maxDEX = 0.0;
      let maxDEY = 0.0;
      i = length;

      while (i--) {
        let [delta, dEX, dEY] = energy(i);

        if (delta > maxEnergy && arrPositioned[i] === false) {
          maxEnergy = delta;
          maxEnergyId = i;
          maxDEX = dEX;
          maxDEY = dEY;
        }
      }

      return [maxEnergyId, maxEnergy, maxDEX, maxDEY];
    };

    let update = function (index, dEX, dEY) {
      let dxx = 0.0;
      let dyy = 0.0;
      let dxy = 0.0;
      let ux = arrPositionX[index];
      let uy = arrPositionY[index];
      let arrL = matLength[index];
      let arrK = matStrength[index];
      i = length;

      while (i--) {
        if (i === index) {
          continue;
        }

        let vx = arrPositionX[i];
        let vy = arrPositionY[i];
        let l = arrL[i];
        let k = arrK[i];
        let m = (ux - vx) * (ux - vx);
        let denom = 1.0 / Math.pow(m + (uy - vy) * (uy - vy), 1.5);
        dxx += k * (1 - l * (uy - vy) * (uy - vy) * denom);
        dyy += k * (1 - l * m * denom);
        dxy += k * (l * (ux - vx) * (uy - vy) * denom);
      } // Prevent division by zero


      if (dxx === 0) {
        dxx = 0.1;
      }

      if (dyy === 0) {
        dyy = 0.1;
      }

      if (dxy === 0) {
        dxy = 0.1;
      }

      let dy = dEX / dxx + dEY / dxy;
      dy /= dxy / dxx - dyy / dxy; // had to split this onto two lines because the syntax highlighter went crazy.

      let dx = -(dxy * dy + dEX) / dxx;
      arrPositionX[index] += dx;
      arrPositionY[index] += dy; // Update the energies

      let arrE = matEnergy[index];
      dEX = 0.0;
      dEY = 0.0;
      ux = arrPositionX[index];
      uy = arrPositionY[index];
      let vx, vy, prevEx, prevEy, denom;
      i = length;

      while (i--) {
        if (index === i) {
          continue;
        }

        vx = arrPositionX[i];
        vy = arrPositionY[i]; // Store old energies

        prevEx = arrE[i][0];
        prevEy = arrE[i][1];
        denom = 1.0 / Math.sqrt((ux - vx) * (ux - vx) + (uy - vy) * (uy - vy));
        dx = arrK[i] * (ux - vx - arrL[i] * (ux - vx) * denom);
        dy = arrK[i] * (uy - vy - arrL[i] * (uy - vy) * denom);
        arrE[i] = [dx, dy];
        dEX += dx;
        dEY += dy;
        arrEnergySumX[i] += dx - prevEx;
        arrEnergySumY[i] += dy - prevEy;
      }

      arrEnergySumX[index] = dEX;
      arrEnergySumY[index] = dEY;
    }; // Setting up variables for the while loops


    let maxEnergyId = 0;
    let dEX = 0.0;
    let dEY = 0.0;
    let delta = 0.0;
    let iteration = 0;
    let innerIteration = 0;

    while (maxEnergy > threshold && maxIteration > iteration) {
      iteration++;
      [maxEnergyId, maxEnergy, dEX, dEY] = highestEnergy();
      delta = maxEnergy;
      innerIteration = 0;

      while (delta > innerThreshold && maxInnerIteration > innerIteration) {
        innerIteration++;
        update(maxEnergyId, dEX, dEY);
        [delta, dEX, dEY] = energy(maxEnergyId);
      }
    }

    i = length;

    while (i--) {
      let index = vertexIds[i];
      let vertex = this.vertices[index];
      vertex.position.x = arrPositionX[i];
      vertex.position.y = arrPositionY[i];
      vertex.positioned = true;
      vertex.forcePositioned = true;
    }
  }
  /**
   * PRIVATE FUNCTION used by getBridges().
   */


  _bridgeDfs(u, visited, disc, low, parent, adj, outBridges) {
    visited[u] = true;
    disc[u] = low[u] = ++this._time;

    for (var i = 0; i < adj[u].length; i++) {
      let v = adj[u][i];

      if (!visited[v]) {
        parent[v] = u;

        this._bridgeDfs(v, visited, disc, low, parent, adj, outBridges);

        low[u] = Math.min(low[u], low[v]); // If low > disc, we have a bridge

        if (low[v] > disc[u]) {
          outBridges.push([u, v]);
        }
      } else if (v !== parent[u]) {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }
  /**
   * Returns the connected components of the graph.
   * 
   * @param {Array[]} adjacencyMatrix An adjacency matrix.
   * @returns {Set[]} Connected components as sets.
   */


  static getConnectedComponents(adjacencyMatrix) {
    let length = adjacencyMatrix.length;
    let visited = new Array(length);
    let components = new Array();
    let count = 0;
    visited.fill(false);

    for (var u = 0; u < length; u++) {
      if (!visited[u]) {
        let component = Array();
        visited[u] = true;
        component.push(u);
        count++;

        Graph._ccGetDfs(u, visited, adjacencyMatrix, component);

        if (component.length > 1) {
          components.push(component);
        }
      }
    }

    return components;
  }
  /**
   * Returns the number of connected components for the graph. 
   * 
   * @param {Array[]} adjacencyMatrix An adjacency matrix.
   * @returns {Number} The number of connected components of the supplied graph.
   */


  static getConnectedComponentCount(adjacencyMatrix) {
    let length = adjacencyMatrix.length;
    let visited = new Array(length);
    let count = 0;
    visited.fill(false);

    for (var u = 0; u < length; u++) {
      if (!visited[u]) {
        visited[u] = true;
        count++;

        Graph._ccCountDfs(u, visited, adjacencyMatrix);
      }
    }

    return count;
  }
  /**
   * PRIVATE FUNCTION used by getConnectedComponentCount().
   */


  static _ccCountDfs(u, visited, adjacencyMatrix) {
    for (var v = 0; v < adjacencyMatrix[u].length; v++) {
      let c = adjacencyMatrix[u][v];

      if (!c || visited[v] || u === v) {
        continue;
      }

      visited[v] = true;

      Graph._ccCountDfs(v, visited, adjacencyMatrix);
    }
  }
  /**
   * PRIVATE FUNCTION used by getConnectedComponents().
   */


  static _ccGetDfs(u, visited, adjacencyMatrix, component) {
    for (var v = 0; v < adjacencyMatrix[u].length; v++) {
      let c = adjacencyMatrix[u][v];

      if (!c || visited[v] || u === v) {
        continue;
      }

      visited[v] = true;
      component.push(v);

      Graph._ccGetDfs(v, visited, adjacencyMatrix, component);
    }
  }

}

module.exports = Graph;

},{"./Atom":4,"./Edge":8,"./MathHelper":13,"./Ring":20,"./Vector2":28,"./Vertex":29}],12:[function(require,module,exports){
"use strict";

//@ts-check
const Vector2 = require('./Vector2');
/** 
 * A class representing a line.
 * 
 * @property {Vector2} from The Vector2 defining the start of the line.
 * @property {Vector2} to The Vector2 defining the end of the line.
 * @property {String} elementFrom The element symbol associated with the start of the line.
 * @property {String} elementTo The element symbol associated with the end of the line.
 * @property {Boolean} chiralFrom A boolean indicating whether or not the source atom is a chiral center.
 * @property {Boolean} chiralTo A boolean indicating whether or tno the target atom is a chiral center.
 */


class Line {
  /**
   * The constructor for the class Line.
   *
   * @param {Vector2} [from=new Vector2(0, 0)] A vector marking the beginning of the line.
   * @param {Vector2} [to=new Vector2(0, 0)] A vector marking the end of the line.
   * @param {string} [elementFrom=null] A one-letter representation of the element associated with the vector marking the beginning of the line.
   * @param {string} [elementTo=null] A one-letter representation of the element associated with the vector marking the end of the line.
   * @param {Boolean} [chiralFrom=false] Whether or not the from atom is a chiral center.
   * @param {Boolean} [chiralTo=false] Whether or not the to atom is a chiral center.
   */
  constructor(from = new Vector2(0, 0), to = new Vector2(0, 0), elementFrom = null, elementTo = null, chiralFrom = false, chiralTo = false) {
    this.from = from;
    this.to = to;
    this.elementFrom = elementFrom;
    this.elementTo = elementTo;
    this.chiralFrom = chiralFrom;
    this.chiralTo = chiralTo;
  }
  /**
   * Clones this line and returns the clone.
   *
   * @returns {Line} A clone of this line.
   */


  clone() {
    return new Line(this.from.clone(), this.to.clone(), this.elementFrom, this.elementTo);
  }
  /**
   * Returns the length of this line.
   *
   * @returns {Number} The length of this line.
   */


  getLength() {
    return Math.sqrt(Math.pow(this.to.x - this.from.x, 2) + Math.pow(this.to.y - this.from.y, 2));
  }
  /**
   * Returns the angle of the line in relation to the coordinate system (the x-axis).
   *
   * @returns {Number} The angle in radians.
   */


  getAngle() {
    // Get the angle between the line and the x-axis
    let diff = Vector2.subtract(this.getRightVector(), this.getLeftVector());
    return diff.angle();
  }
  /**
   * Returns the right vector (the vector with the larger x value).
   *
   * @returns {Vector2} The right vector.
   */


  getRightVector() {
    // Return the vector with the larger x value (the right one)
    if (this.from.x < this.to.x) {
      return this.to;
    } else {
      return this.from;
    }
  }
  /**
   * Returns the left vector (the vector with the smaller x value).
   *
   * @returns {Vector2} The left vector.
   */


  getLeftVector() {
    // Return the vector with the smaller x value (the left one)
    if (this.from.x < this.to.x) {
      return this.from;
    } else {
      return this.to;
    }
  }
  /**
   * Returns the element associated with the right vector (the vector with the larger x value).
   *
   * @returns {String} The element associated with the right vector.
   */


  getRightElement() {
    if (this.from.x < this.to.x) {
      return this.elementTo;
    } else {
      return this.elementFrom;
    }
  }
  /**
   * Returns the element associated with the left vector (the vector with the smaller x value).
   *
   * @returns {String} The element associated with the left vector.
   */


  getLeftElement() {
    if (this.from.x < this.to.x) {
      return this.elementFrom;
    } else {
      return this.elementTo;
    }
  }
  /**
   * Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.
   *
   * @returns {Boolean} Whether or not the atom associated with the right vector is a chiral center.
   */


  getRightChiral() {
    if (this.from.x < this.to.x) {
      return this.chiralTo;
    } else {
      return this.chiralFrom;
    }
  }
  /**
   * Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.
   *
   * @returns {Boolean} Whether or not the atom  associated with the left vector is a chiral center.
   */


  getLeftChiral() {
    if (this.from.x < this.to.x) {
      return this.chiralFrom;
    } else {
      return this.chiralTo;
    }
  }
  /**
   * Set the value of the right vector.
   *
   * @param {Number} x The x value.
   * @param {Number} y The y value.
   * @returns {Line} This line.
   */


  setRightVector(x, y) {
    if (this.from.x < this.to.x) {
      this.to.x = x;
      this.to.y = y;
    } else {
      this.from.x = x;
      this.from.y = y;
    }

    return this;
  }
  /**
   * Set the value of the left vector.
   *
   * @param {Number} x The x value.
   * @param {Number} y The y value.
   * @returns {Line} This line.
   */


  setLeftVector(x, y) {
    if (this.from.x < this.to.x) {
      this.from.x = x;
      this.from.y = y;
    } else {
      this.to.x = x;
      this.to.y = y;
    }

    return this;
  }
  /**
   * Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.
   *
   * @returns {Line} This line.
   */


  rotateToXAxis() {
    let left = this.getLeftVector();
    this.setRightVector(left.x + this.getLength(), left.y);
    return this;
  }
  /**
   * Rotate the line by a given value (in radians). The center of rotation is the left vector.
   *
   * @param {Number} theta The angle (in radians) to rotate the line.
   * @returns {Line} This line.
   */


  rotate(theta) {
    let l = this.getLeftVector();
    let r = this.getRightVector();
    let sinTheta = Math.sin(theta);
    let cosTheta = Math.cos(theta);
    let x = cosTheta * (r.x - l.x) - sinTheta * (r.y - l.y) + l.x;
    let y = sinTheta * (r.x - l.x) - cosTheta * (r.y - l.y) + l.y;
    this.setRightVector(x, y);
    return this;
  }
  /**
   * Shortens this line from the "from" direction by a given value (in pixels).
   *
   * @param {Number} by The length in pixels to shorten the vector by.
   * @returns {Line} This line.
   */


  shortenFrom(by) {
    let f = Vector2.subtract(this.to, this.from);
    f.normalize();
    f.multiplyScalar(by);
    this.from.add(f);
    return this;
  }
  /**
   * Shortens this line from the "to" direction by a given value (in pixels).
   *
   * @param {Number} by The length in pixels to shorten the vector by.
   * @returns {Line} This line.
   */


  shortenTo(by) {
    let f = Vector2.subtract(this.from, this.to);
    f.normalize();
    f.multiplyScalar(by);
    this.to.add(f);
    return this;
  }
  /**
   * Shorten the right side.
   *
   * @param {Number} by The length in pixels to shorten the vector by.
   * @returns {Line} Returns itself.
   */


  shortenRight(by) {
    if (this.from.x < this.to.x) {
      this.shortenTo(by);
    } else {
      this.shortenFrom(by);
    }

    return this;
  }
  /**
   * Shorten the left side.
   * 
   * @param {Number} by The length in pixels to shorten the vector by.
   * @returns {Line} Returns itself.
   */


  shortenLeft(by) {
    if (this.from.x < this.to.x) {
      this.shortenFrom(by);
    } else {
      this.shortenTo(by);
    }

    return this;
  }
  /**
   * Shortens this line from both directions by a given value (in pixels).
   *
   * @param {Number} by The length in pixels to shorten the vector by.
   * @returns {Line} This line.
   */


  shorten(by) {
    let f = Vector2.subtract(this.from, this.to);
    f.normalize();
    f.multiplyScalar(by / 2.0);
    this.to.add(f);
    this.from.subtract(f);
    return this;
  }

}

module.exports = Line;

},{"./Vector2":28}],13:[function(require,module,exports){
"use strict";

/** 
 * A static class containing helper functions for math-related tasks. 
 */
class MathHelper {
  /**
   * Rounds a value to a given number of decimals.
   *
   * @static
   * @param {Number} value A number.
   * @param {Number} decimals The number of decimals.
   * @returns {Number} A number rounded to a given number of decimals.
   */
  static round(value, decimals) {
    decimals = decimals ? decimals : 1;
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
  /**
   * Returns the means of the angles contained in an array. In radians.
   *
   * @static
   * @param {Number[]} arr An array containing angles (in radians).
   * @returns {Number} The mean angle in radians.
   */


  static meanAngle(arr) {
    let sin = 0.0;
    let cos = 0.0;

    for (var i = 0; i < arr.length; i++) {
      sin += Math.sin(arr[i]);
      cos += Math.cos(arr[i]);
    }

    return Math.atan2(sin / arr.length, cos / arr.length);
  }
  /**
   * Returns the inner angle of a n-sided regular polygon.
   *
   * @static
   * @param {Number} n Number of sides of a regular polygon.
   * @returns {Number} The inner angle of a given regular polygon.
   */


  static innerAngle(n) {
    return MathHelper.toRad((n - 2) * 180 / n);
  }
  /**
   * Returns the circumradius of a n-sided regular polygon with a given side-length.
   *
   * @static
   * @param {Number} s The side length of the regular polygon.
   * @param {Number} n The number of sides.
   * @returns {Number} The circumradius of the regular polygon.
   */


  static polyCircumradius(s, n) {
    return s / (2 * Math.sin(Math.PI / n));
  }
  /**
   * Returns the apothem of a regular n-sided polygon based on its radius.
   *
   * @static
   * @param {Number} r The radius.
   * @param {Number} n The number of edges of the regular polygon.
   * @returns {Number} The apothem of a n-sided polygon based on its radius.
   */


  static apothem(r, n) {
    return r * Math.cos(Math.PI / n);
  }

  static apothemFromSideLength(s, n) {
    let r = MathHelper.polyCircumradius(s, n);
    return MathHelper.apothem(r, n);
  }
  /**
   * The central angle of a n-sided regular polygon. In radians.
   *
   * @static
   * @param {Number} n The number of sides of the regular polygon.
   * @returns {Number} The central angle of the n-sided polygon in radians.
   */


  static centralAngle(n) {
    return MathHelper.toRad(360 / n);
  }
  /**
   * Convertes radians to degrees.
   *
   * @static
   * @param {Number} rad An angle in radians.
   * @returns {Number} The angle in degrees.
   */


  static toDeg(rad) {
    return rad * MathHelper.degFactor;
  }
  /**
   * Converts degrees to radians.
   *
   * @static
   * @param {Number} deg An angle in degrees.
   * @returns {Number} The angle in radians.
   */


  static toRad(deg) {
    return deg * MathHelper.radFactor;
  }
  /**
   * Returns the parity of the permutation (1 or -1)
   * @param {(Array|Uint8Array)} arr An array containing the permutation.
   * @returns {Number} The parity of the permutation (1 or -1), where 1 means even and -1 means odd.
   */


  static parityOfPermutation(arr) {
    let visited = new Uint8Array(arr.length);
    let evenLengthCycleCount = 0;

    let traverseCycle = function (i, cycleLength = 0) {
      if (visited[i] === 1) {
        return cycleLength;
      }

      cycleLength++;
      visited[i] = 1;
      return traverseCycle(arr[i], cycleLength);
    };

    for (var i = 0; i < arr.length; i++) {
      if (visited[i] === 1) {
        continue;
      }

      let cycleLength = traverseCycle(i);
      evenLengthCycleCount += 1 - cycleLength % 2;
    }

    return evenLengthCycleCount % 2 ? -1 : 1;
  }
  /** The factor to convert degrees to radians. */


  static get radFactor() {
    return Math.PI / 180.0;
  }
  /** The factor to convert radians to degrees. */


  static get degFactor() {
    return 180.0 / Math.PI;
  }
  /** Two times PI. */


  static get twoPI() {
    return 2.0 * Math.PI;
  }

}

module.exports = MathHelper;

},{}],14:[function(require,module,exports){
"use strict";

//@ts-check
class Options {
  /**
   * A helper method to extend the default options with user supplied ones.
   */
  static extend() {
    let that = this;
    let extended = {};
    let deep = false;
    let i = 0;
    let length = arguments.length;

    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }

    let merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = that.extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    for (; i < length; i++) {
      let obj = arguments[i];
      merge(obj);
    }

    return extended;
  }

}

module.exports = Options;

},{}],15:[function(require,module,exports){
"use strict";

// WHEN REPLACING, CHECK FOR:
// KEEP THIS WHEN REGENERATING THE PARSER !!
module.exports = function () {
  "use strict";
  /*
   * Generated by PEG.js 0.10.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function (expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function (expectation) {
        return "\"" + literalEscape(expectation.text) + "\"";
      },
      "class": function (expectation) {
        var escapedParts = "",
            i;

        for (i = 0; i < expectation.parts.length; i++) {
          escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
        }

        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
      },
      any: function (expectation) {
        return "any character";
      },
      end: function (expectation) {
        return "end of input";
      },
      other: function (expectation) {
        return expectation.description;
      }
    };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
        return '\\x0' + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return '\\x' + hex(ch);
      });
    }

    function classEscape(s) {
      return s.replace(/\\/g, '\\\\').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/-/g, '\\-').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
        return '\\x0' + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return '\\x' + hex(ch);
      });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = new Array(expected.length),
          i,
          j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }

        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  function peg$parse(input, options) {
    options = options !== void 0 ? options : {}; // KEEP THIS WHEN REGENERATING THE PARSER !!

    var nOpenParentheses = input.split('(').length - 1;
    var nCloseParentheses = input.split(')').length - 1;

    if (nOpenParentheses !== nCloseParentheses) {
      throw peg$buildSimpleError('The number of opening parentheses does not match the number of closing parentheses.', 0);
    } // KEEP THIS WHEN REGENERATING THE PARSER !!


    var peg$FAILED = {},
        peg$startRuleFunctions = {
      chain: peg$parsechain
    },
        peg$startRuleFunction = peg$parsechain,
        peg$c0 = function (s) {
      var branches = [];
      var rings = [];

      for (var i = 0; i < s[1].length; i++) {
        branches.push(s[1][i]);
      }

      for (var i = 0; i < s[2].length; i++) {
        var bond = s[2][i][0] ? s[2][i][0] : '-';
        rings.push({
          'bond': bond,
          'id': s[2][i][1]
        });
      }

      for (var i = 0; i < s[3].length; i++) {
        branches.push(s[3][i]);
      }

      for (var i = 0; i < s[6].length; i++) {
        branches.push(s[6][i]);
      }

      return {
        'atom': s[0],
        'isBracket': s[0].element ? true : false,
        'branches': branches,
        'branchCount': branches.length,
        'ringbonds': rings,
        'ringbondCount': rings.length,
        'bond': s[4] ? s[4] : '-',
        'next': s[5],
        'hasNext': s[5] ? true : false
      };
    },
        peg$c1 = "(",
        peg$c2 = peg$literalExpectation("(", false),
        peg$c3 = ")",
        peg$c4 = peg$literalExpectation(")", false),
        peg$c5 = function (b) {
      var bond = b[1] ? b[1] : '-';
      b[2].branchBond = bond;
      return b[2];
    },
        peg$c6 = function (a) {
      return a;
    },
        peg$c7 = /^[\-=#$:\/\\.]/,
        peg$c8 = peg$classExpectation(["-", "=", "#", "$", ":", "/", "\\", "."], false, false),
        peg$c9 = function (b) {
      return b;
    },
        peg$c10 = "[",
        peg$c11 = peg$literalExpectation("[", false),
        peg$c12 = "se",
        peg$c13 = peg$literalExpectation("se", false),
        peg$c14 = "as",
        peg$c15 = peg$literalExpectation("as", false),
        peg$c16 = "]",
        peg$c17 = peg$literalExpectation("]", false),
        peg$c18 = function (b) {
      return {
        'isotope': b[1],
        'element': b[2],
        'chirality': b[3],
        'hcount': b[4],
        'charge': b[5],
        'class': b[6]
      };
    },
        peg$c19 = "B",
        peg$c20 = peg$literalExpectation("B", false),
        peg$c21 = "r",
        peg$c22 = peg$literalExpectation("r", false),
        peg$c23 = "C",
        peg$c24 = peg$literalExpectation("C", false),
        peg$c25 = "l",
        peg$c26 = peg$literalExpectation("l", false),
        peg$c27 = /^[NOPSFI]/,
        peg$c28 = peg$classExpectation(["N", "O", "P", "S", "F", "I"], false, false),
        peg$c29 = function (o) {
      if (o.length > 1) return o.join('');
      return o;
    },
        peg$c30 = /^[bcnops]/,
        peg$c31 = peg$classExpectation(["b", "c", "n", "o", "p", "s"], false, false),
        peg$c32 = "*",
        peg$c33 = peg$literalExpectation("*", false),
        peg$c34 = function (w) {
      return w;
    },
        peg$c35 = /^[A-Z]/,
        peg$c36 = peg$classExpectation([["A", "Z"]], false, false),
        peg$c37 = /^[a-z]/,
        peg$c38 = peg$classExpectation([["a", "z"]], false, false),
        peg$c39 = function (e) {
      return e.join('');
    },
        peg$c40 = "%",
        peg$c41 = peg$literalExpectation("%", false),
        peg$c42 = /^[1-9]/,
        peg$c43 = peg$classExpectation([["1", "9"]], false, false),
        peg$c44 = /^[0-9]/,
        peg$c45 = peg$classExpectation([["0", "9"]], false, false),
        peg$c46 = function (r) {
      if (r.length == 1) return Number(r);
      return Number(r.join('').replace('%', ''));
    },
        peg$c47 = "@",
        peg$c48 = peg$literalExpectation("@", false),
        peg$c49 = "TH",
        peg$c50 = peg$literalExpectation("TH", false),
        peg$c51 = /^[12]/,
        peg$c52 = peg$classExpectation(["1", "2"], false, false),
        peg$c53 = "AL",
        peg$c54 = peg$literalExpectation("AL", false),
        peg$c55 = "SP",
        peg$c56 = peg$literalExpectation("SP", false),
        peg$c57 = /^[1-3]/,
        peg$c58 = peg$classExpectation([["1", "3"]], false, false),
        peg$c59 = "TB",
        peg$c60 = peg$literalExpectation("TB", false),
        peg$c61 = "OH",
        peg$c62 = peg$literalExpectation("OH", false),
        peg$c63 = function (c) {
      if (!c[1]) return '@';
      if (c[1] == '@') return '@@';
      return c[1].join('').replace(',', '');
    },
        peg$c64 = function (c) {
      return c;
    },
        peg$c65 = "+",
        peg$c66 = peg$literalExpectation("+", false),
        peg$c67 = function (c) {
      if (!c[1]) return 1;
      if (c[1] != '+') return Number(c[1].join(''));
      return 2;
    },
        peg$c68 = "-",
        peg$c69 = peg$literalExpectation("-", false),
        peg$c70 = function (c) {
      if (!c[1]) return -1;
      if (c[1] != '-') return -Number(c[1].join(''));
      return -2;
    },
        peg$c71 = "H",
        peg$c72 = peg$literalExpectation("H", false),
        peg$c73 = function (h) {
      if (h[1]) return Number(h[1]);
      return 1;
    },
        peg$c74 = ":",
        peg$c75 = peg$literalExpectation(":", false),
        peg$c76 = /^[0]/,
        peg$c77 = peg$classExpectation(["0"], false, false),
        peg$c78 = function (c) {
      return Number(c[1][0] + c[1][1].join(''));
    },
        peg$c79 = function (i) {
      return Number(i.join(''));
    },
        peg$currPos = 0,
        peg$savedPos = 0,
        peg$posDetailsCache = [{
      line: 1,
      column: 1
    }],
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location);
    }

    function error(message, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildSimpleError(message, location);
    }

    function peg$literalExpectation(text, ignoreCase) {
      return {
        type: "literal",
        text: text,
        ignoreCase: ignoreCase
      };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return {
        type: "class",
        parts: parts,
        inverted: inverted,
        ignoreCase: ignoreCase
      };
    }

    function peg$anyExpectation() {
      return {
        type: "any"
      };
    }

    function peg$endExpectation() {
      return {
        type: "end"
      };
    }

    function peg$otherExpectation(description) {
      return {
        type: "other",
        description: description
      };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p;

      if (details) {
        return details;
      } else {
        p = pos - 1;

        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails = peg$computePosDetails(endPos);
      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildSimpleError(message, location) {
      return new peg$SyntaxError(message, null, null, location);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }

    function peg$parsechain() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseatom();

      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsebranch();

        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsebranch();
        }

        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$currPos;
          s6 = peg$parsebond();

          if (s6 === peg$FAILED) {
            s6 = null;
          }

          if (s6 !== peg$FAILED) {
            s7 = peg$parsering();

            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }

          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$currPos;
            s6 = peg$parsebond();

            if (s6 === peg$FAILED) {
              s6 = null;
            }

            if (s6 !== peg$FAILED) {
              s7 = peg$parsering();

              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }

          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$parsebranch();

            while (s6 !== peg$FAILED) {
              s5.push(s6);
              s6 = peg$parsebranch();
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parsebond();

              if (s6 === peg$FAILED) {
                s6 = null;
              }

              if (s6 !== peg$FAILED) {
                s7 = peg$parsechain();

                if (s7 === peg$FAILED) {
                  s7 = null;
                }

                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parsebranch();

                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parsebranch();
                  }

                  if (s8 !== peg$FAILED) {
                    s2 = [s2, s3, s4, s5, s6, s7, s8];
                    s1 = s2;
                  } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsebranch() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 40) {
        s2 = peg$c1;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c2);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parsebond();

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parsechain();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s5 = peg$c3;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c4);
              }
            }

            if (s5 !== peg$FAILED) {
              s2 = [s2, s3, s4, s5];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c5(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parseatom() {
      var s0, s1;
      s0 = peg$currPos;
      s1 = peg$parseorganicsymbol();

      if (s1 === peg$FAILED) {
        s1 = peg$parsearomaticsymbol();

        if (s1 === peg$FAILED) {
          s1 = peg$parsebracketatom();

          if (s1 === peg$FAILED) {
            s1 = peg$parsewildcard();
          }
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c6(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsebond() {
      var s0, s1;
      s0 = peg$currPos;

      if (peg$c7.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos); // Hack to resolve problem caused by:
        // O=C(N[C@@H](CC(O)=O)C(N[C@H](C1=CC=C(O)C=C1)C(N[C@@H](CC(O)=O)C(NCC(N[C@@H](C(N[C@@H]([C@H](C)CC(O)=O)C(N/C(C(O[C@H](C)[C@@H]2NC([C@H](CO)NC(C(O3)C3CCC)=O)=O)=O)=C\\\\C4=CNC5=C4C=CC=C5)=O)=O)[C@H](O)C(N)=O)=O)=O)=O)=O)[C@H](CC(O)=O)NC([C@@H](CC6=CNC7=C6C=CC=C7)NC2=O)=O
        // KEEP THIS WHEN REGENERATING THE PARSER !!

        if (s1 === input.charAt(peg$currPos + 1)) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            throw peg$buildSimpleError('The parser encountered a bond repetition.', peg$currPos + 1);
          }
        } // KEEP THIS WHEN REGENERATING THE PARSER !!


        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c8);
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c9(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsebracketatom() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 91) {
        s2 = peg$c10;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c11);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parseisotope();

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c12) {
            s4 = peg$c12;
            peg$currPos += 2;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c13);
            }
          }

          if (s4 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c14) {
              s4 = peg$c14;
              peg$currPos += 2;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c15);
              }
            }

            if (s4 === peg$FAILED) {
              s4 = peg$parsearomaticsymbol();

              if (s4 === peg$FAILED) {
                s4 = peg$parseelementsymbol();

                if (s4 === peg$FAILED) {
                  s4 = peg$parsewildcard();
                }
              }
            }
          }

          if (s4 !== peg$FAILED) {
            s5 = peg$parsechiral();

            if (s5 === peg$FAILED) {
              s5 = null;
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parsehcount();

              if (s6 === peg$FAILED) {
                s6 = null;
              }

              if (s6 !== peg$FAILED) {
                s7 = peg$parsecharge();

                if (s7 === peg$FAILED) {
                  s7 = null;
                }

                if (s7 !== peg$FAILED) {
                  s8 = peg$parseclass();

                  if (s8 === peg$FAILED) {
                    s8 = null;
                  }

                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 93) {
                      s9 = peg$c16;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c17);
                      }
                    }

                    if (s9 !== peg$FAILED) {
                      s2 = [s2, s3, s4, s5, s6, s7, s8, s9];
                      s1 = s2;
                    } else {
                      peg$currPos = s1;
                      s1 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c18(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parseorganicsymbol() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 66) {
        s2 = peg$c19;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c20);
        }
      }

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 114) {
          s3 = peg$c21;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c22);
          }
        }

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 === peg$FAILED) {
        s1 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 67) {
          s2 = peg$c23;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c24);
          }
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 108) {
            s3 = peg$c25;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c26);
            }
          }

          if (s3 === peg$FAILED) {
            s3 = null;
          }

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 === peg$FAILED) {
          if (peg$c27.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c28);
            }
          }
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c29(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsearomaticsymbol() {
      var s0, s1;
      s0 = peg$currPos;

      if (peg$c30.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c31);
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c6(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsewildcard() {
      var s0, s1;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 42) {
        s1 = peg$c32;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c33);
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c34(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parseelementsymbol() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c35.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c36);
        }
      }

      if (s2 !== peg$FAILED) {
        if (peg$c37.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c39(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsering() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 37) {
        s2 = peg$c40;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c41);
        }
      }

      if (s2 !== peg$FAILED) {
        if (peg$c42.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c43);
          }
        }

        if (s3 !== peg$FAILED) {
          if (peg$c44.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c45);
            }
          }

          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 === peg$FAILED) {
        if (peg$c44.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c45);
          }
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c46(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsechiral() {
      var s0, s1, s2, s3, s4, s5, s6;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 64) {
        s2 = peg$c47;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c48);
        }
      }

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 64) {
          s3 = peg$c47;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c48);
          }
        }

        if (s3 === peg$FAILED) {
          s3 = peg$currPos;

          if (input.substr(peg$currPos, 2) === peg$c49) {
            s4 = peg$c49;
            peg$currPos += 2;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c50);
            }
          }

          if (s4 !== peg$FAILED) {
            if (peg$c51.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c52);
              }
            }

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }

          if (s3 === peg$FAILED) {
            s3 = peg$currPos;

            if (input.substr(peg$currPos, 2) === peg$c53) {
              s4 = peg$c53;
              peg$currPos += 2;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c54);
              }
            }

            if (s4 !== peg$FAILED) {
              if (peg$c51.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c52);
                }
              }

              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }

            if (s3 === peg$FAILED) {
              s3 = peg$currPos;

              if (input.substr(peg$currPos, 2) === peg$c55) {
                s4 = peg$c55;
                peg$currPos += 2;
              } else {
                s4 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c56);
                }
              }

              if (s4 !== peg$FAILED) {
                if (peg$c57.test(input.charAt(peg$currPos))) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c58);
                  }
                }

                if (s5 !== peg$FAILED) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }

              if (s3 === peg$FAILED) {
                s3 = peg$currPos;

                if (input.substr(peg$currPos, 2) === peg$c59) {
                  s4 = peg$c59;
                  peg$currPos += 2;
                } else {
                  s4 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                  }
                }

                if (s4 !== peg$FAILED) {
                  if (peg$c42.test(input.charAt(peg$currPos))) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c43);
                    }
                  }

                  if (s5 !== peg$FAILED) {
                    if (peg$c44.test(input.charAt(peg$currPos))) {
                      s6 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                      }
                    }

                    if (s6 === peg$FAILED) {
                      s6 = null;
                    }

                    if (s6 !== peg$FAILED) {
                      s4 = [s4, s5, s6];
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }

                if (s3 === peg$FAILED) {
                  s3 = peg$currPos;

                  if (input.substr(peg$currPos, 2) === peg$c61) {
                    s4 = peg$c61;
                    peg$currPos += 2;
                  } else {
                    s4 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c62);
                    }
                  }

                  if (s4 !== peg$FAILED) {
                    if (peg$c42.test(input.charAt(peg$currPos))) {
                      s5 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s5 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                      }
                    }

                    if (s5 !== peg$FAILED) {
                      if (peg$c44.test(input.charAt(peg$currPos))) {
                        s6 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s6 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c45);
                        }
                      }

                      if (s6 === peg$FAILED) {
                        s6 = null;
                      }

                      if (s6 !== peg$FAILED) {
                        s4 = [s4, s5, s6];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
              }
            }
          }
        }

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c63(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsecharge() {
      var s0, s1;
      s0 = peg$currPos;
      s1 = peg$parseposcharge();

      if (s1 === peg$FAILED) {
        s1 = peg$parsenegcharge();
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c64(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parseposcharge() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 43) {
        s2 = peg$c65;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c66);
        }
      }

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 43) {
          s3 = peg$c65;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c66);
          }
        }

        if (s3 === peg$FAILED) {
          s3 = peg$currPos;

          if (peg$c42.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }

          if (s4 !== peg$FAILED) {
            if (peg$c44.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c45);
              }
            }

            if (s5 === peg$FAILED) {
              s5 = null;
            }

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c67(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsenegcharge() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 45) {
        s2 = peg$c68;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c69);
        }
      }

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 45) {
          s3 = peg$c68;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c69);
          }
        }

        if (s3 === peg$FAILED) {
          s3 = peg$currPos;

          if (peg$c42.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }

          if (s4 !== peg$FAILED) {
            if (peg$c44.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c45);
              }
            }

            if (s5 === peg$FAILED) {
              s5 = null;
            }

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c70(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsehcount() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 72) {
        s2 = peg$c71;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c72);
        }
      }

      if (s2 !== peg$FAILED) {
        if (peg$c44.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c45);
          }
        }

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c73(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parseclass() {
      var s0, s1, s2, s3, s4, s5, s6;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 58) {
        s2 = peg$c74;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c75);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;

        if (peg$c42.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c43);
          }
        }

        if (s4 !== peg$FAILED) {
          s5 = [];

          if (peg$c44.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c45);
            }
          }

          while (s6 !== peg$FAILED) {
            s5.push(s6);

            if (peg$c44.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c45);
              }
            }
          }

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        if (s3 === peg$FAILED) {
          if (peg$c76.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c77);
            }
          }
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c78(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parseisotope() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c42.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c43);
        }
      }

      if (s2 !== peg$FAILED) {
        if (peg$c44.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c45);
          }
        }

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          if (peg$c44.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c45);
            }
          }

          if (s4 === peg$FAILED) {
            s4 = null;
          }

          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c79(s1);
      }

      s0 = s1;
      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
}();

},{}],16:[function(require,module,exports){
"use strict";

// Adapted from https://codepen.io/shshaw/pen/XbxvNj by 
function convertImage(img) {
  "use strict";

  function each(obj, fn) {
    var length = obj.length,
        likeArray = length === 0 || length > 0 && length - 1 in obj,
        i = 0;

    if (likeArray) {
      for (; i < length; i++) {
        if (fn.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (fn.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    }
  }

  function componentToHex(c) {
    var hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function getColor(r, g, b, a) {
    a = parseInt(a);

    if (a === undefined || a === 255) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    if (a === 0) {
      return false;
    }

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a / 255 + ')';
  } // Optimized for horizontal lines


  function makePathData(x, y, w) {
    return 'M' + x + ' ' + y + 'h' + w + '';
  }

  function makePath(color, data) {
    return '<path stroke="' + color + '" d="' + data + '" />\n';
  }

  function colorsToPaths(colors) {
    var output = ""; // Loop through each color to build paths

    each(colors, function (color, values) {
      var orig = color;
      color = getColor.apply(null, color.split(','));

      if (color === false) {
        return;
      }

      var paths = [];
      var curPath;
      var w = 1; // Loops through each color's pixels to optimize paths

      each(values, function () {
        if (curPath && this[1] === curPath[1] && this[0] === curPath[0] + w) {
          w++;
        } else {
          if (curPath) {
            paths.push(makePathData(curPath[0], curPath[1], w));
            w = 1;
          }

          curPath = this;
        }
      });
      paths.push(makePathData(curPath[0], curPath[1], w)); // Finish last path

      output += makePath(color, paths.join(''));
    });
    return output;
  }

  var getColors = function (img) {
    var colors = {},
        data = img.data,
        len = data.length,
        w = img.width,
        h = img.height,
        x = 0,
        y = 0,
        i = 0,
        color;

    for (; i < len; i += 4) {
      if (data[i + 3] > 0) {
        color = data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3];
        colors[color] = colors[color] || [];
        x = i / 4 % w;
        y = Math.floor(i / 4 / w);
        colors[color].push([x, y]);
      }
    }

    return colors;
  };

  let colors = getColors(img);
  let paths = colorsToPaths(colors);
  let output = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 ' + img.width + ' ' + img.height + '" shape-rendering="crispEdges"><g shape-rendering="crispEdges">' + paths + '</g></svg>';
  var dummyDiv = document.createElement('div');
  dummyDiv.innerHTML = output;
  return dummyDiv.firstChild;
}

module.exports = convertImage;

},{}],17:[function(require,module,exports){
"use strict";

4; //@ts-check

const Parser = require('./Parser');

class Reaction {
  /**
   * The constructor for the class Reaction.
   *
   * @param {string} reactionSmiles A reaction SMILES.
   */
  constructor(reactionSmiles) {
    this.reactantsSmiles = [];
    this.reagentsSmiles = [];
    this.productsSmiles = [];
    this.reactantsWeights = [];
    this.reagentsWeights = [];
    this.productsWeights = [];
    this.reactants = [];
    this.reagents = [];
    this.products = [];
    let parts = reactionSmiles.split(">");

    if (parts.length !== 3) {
      throw new Error("Invalid reaction SMILES. Did you add fewer than or more than two '>'?");
    }

    if (parts[0] !== "") {
      this.reactantsSmiles = parts[0].split(".");
    }

    if (parts[1] !== "") {
      this.reagentsSmiles = parts[1].split(".");
    }

    if (parts[2] !== "") {
      this.productsSmiles = parts[2].split(".");
    }

    for (var i = 0; i < this.reactantsSmiles.length; i++) {
      this.reactants.push(Parser.parse(this.reactantsSmiles[i]));
    }

    for (var i = 0; i < this.reagentsSmiles.length; i++) {
      this.reagents.push(Parser.parse(this.reagentsSmiles[i]));
    }

    for (var i = 0; i < this.productsSmiles.length; i++) {
      this.products.push(Parser.parse(this.productsSmiles[i]));
    }
  }

}

module.exports = Reaction;

},{"./Parser":15}],18:[function(require,module,exports){
"use strict";

const SvgDrawer = require('./SvgDrawer');

const SvgWrapper = require('./SvgWrapper');

const Options = require('./Options');

const ThemeManager = require('./ThemeManager');

const formulaToCommonName = require('./FormulaToCommonName');

class ReactionDrawer {
  /**
   * The constructor for the class ReactionDrawer.
   *
   * @param {Object} options An object containing reaction drawing specitic options.
   * @param {Object} moleculeOptions An object containing molecule drawing specific options.
   */
  constructor(options, moleculeOptions) {
    this.defaultOptions = {
      scale: moleculeOptions.scale > 0.0 ? moleculeOptions.scale : 1.0,
      fontSize: moleculeOptions.fontSizeLarge * 0.8,
      fontFamily: 'Arial, Helvetica, sans-serif',
      spacing: 10,
      plus: {
        size: 9,
        thickness: 1.0
      },
      arrow: {
        length: moleculeOptions.bondLength * 4.0,
        headSize: 6.0,
        thickness: 1.0,
        margin: 3
      },
      weights: {
        normalize: false
      }
    };
    this.opts = Options.extend(true, this.defaultOptions, options);
    this.drawer = new SvgDrawer(moleculeOptions);
    this.molOpts = this.drawer.opts;
  }
  /**
  * Draws the parsed reaction smiles data to a canvas element.
  *
  * @param {Object} reaction The reaction object returned by the reaction smiles parser.
  * @param {(String|SVGElement)} target The id of the HTML canvas element the structure is drawn to - or the element itself.
  * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
  * @param {?Object} weights=null The weights for reactants, agents, and products.
  * @param {String} textAbove='{reagents}' The text above the arrow.
  * @param {String} textBelow='' The text below the arrow.
  * @param {?Object} weights=null The weights for reactants, agents, and products.
  * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
  * 
  * @returns {SVGElement} The svg element
  */


  draw(reaction, target, themeName = 'light', weights = null, textAbove = '{reagents}', textBelow = '', infoOnly = false) {
    this.themeManager = new ThemeManager(this.molOpts.themes, themeName); // Normalize the weights over the reaction molecules

    if (this.opts.weights.normalize) {
      let max = -Number.MAX_SAFE_INTEGER;
      let min = Number.MAX_SAFE_INTEGER;

      if (weights.hasOwnProperty('reactants')) {
        for (let i = 0; i < weights.reactants.length; i++) {
          for (let j = 0; j < weights.reactants[i].length; j++) {
            if (weights.reactants[i][j] < min) {
              min = weights.reactants[i][j];
            }

            if (weights.reactants[i][j] > max) {
              max = weights.reactants[i][j];
            }
          }
        }
      }

      if (weights.hasOwnProperty('reagents')) {
        for (let i = 0; i < weights.reagents.length; i++) {
          for (let j = 0; j < weights.reagents[i].length; j++) {
            if (weights.reagents[i][j] < min) {
              min = weights.reagents[i][j];
            }

            if (weights.reagents[i][j] > max) {
              max = weights.reagents[i][j];
            }
          }
        }
      }

      if (weights.hasOwnProperty('products')) {
        for (let i = 0; i < weights.products.length; i++) {
          for (let j = 0; j < weights.products[i].length; j++) {
            if (weights.products[i][j] < min) {
              min = weights.products[i][j];
            }

            if (weights.products[i][j] > max) {
              max = weights.products[i][j];
            }
          }
        }
      }

      let abs_max = Math.max(Math.abs(min), Math.abs(max));

      if (weights.hasOwnProperty('reactants')) {
        for (let i = 0; i < weights.reactants.length; i++) {
          for (let j = 0; j < weights.reactants[i].length; j++) {
            weights.reactants[i][j] /= abs_max;
          }
        }
      }

      if (weights.hasOwnProperty('reagents')) {
        for (let i = 0; i < weights.reagents.length; i++) {
          for (let j = 0; j < weights.reagents[i].length; j++) {
            weights.reagents[i][j] /= abs_max;
          }
        }
      }

      if (weights.hasOwnProperty('products')) {
        for (let i = 0; i < weights.products.length; i++) {
          for (let j = 0; j < weights.products[i].length; j++) {
            weights.products[i][j] /= abs_max;
          }
        }
      }
    }

    let svg = null;

    if (target === null || target === 'svg') {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttributeNS(null, 'width', 500 + '');
      svg.setAttributeNS(null, 'height', 500 + '');
    } else if (typeof target === 'string' || target instanceof String) {
      svg = document.getElementById(target);
    } else {
      svg = target;
    }

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    let elements = [];
    let maxHeight = 0.0; // Reactants

    for (var i = 0; i < reaction.reactants.length; i++) {
      if (i > 0) {
        elements.push({
          width: this.opts.plus.size * this.opts.scale,
          height: this.opts.plus.size * this.opts.scale,
          svg: this.getPlus()
        });
      }

      let reactantWeights = null;

      if (weights && weights.hasOwnProperty('reactants') && weights.reactants.length > i) {
        reactantWeights = weights.reactants[i];
      }

      let reactantSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.drawer.draw(reaction.reactants[i], reactantSvg, themeName, reactantWeights, infoOnly, [], this.opts.weights.normalize);
      let element = {
        width: reactantSvg.viewBox.baseVal.width * this.opts.scale,
        height: reactantSvg.viewBox.baseVal.height * this.opts.scale,
        svg: reactantSvg
      };
      elements.push(element);

      if (element.height > maxHeight) {
        maxHeight = element.height;
      }
    } // Arrow


    elements.push({
      width: this.opts.arrow.length * this.opts.scale,
      height: this.opts.arrow.headSize * 2.0 * this.opts.scale,
      svg: this.getArrow()
    }); // Text above the arrow / reagents

    let reagentsText = "";

    for (var i = 0; i < reaction.reagents.length; i++) {
      if (i > 0) {
        reagentsText += ", ";
      }

      let text = this.drawer.getMolecularFormula(reaction.reagents[i]);

      if (text in formulaToCommonName) {
        text = formulaToCommonName[text];
      }

      reagentsText += SvgWrapper.replaceNumbersWithSubscript(text);
    }

    textAbove = textAbove.replace('{reagents}', reagentsText);
    const topText = SvgWrapper.writeText(textAbove, this.themeManager, this.opts.fontSize * this.opts.scale, this.opts.fontFamily, this.opts.arrow.length * this.opts.scale);
    let centerOffsetX = (this.opts.arrow.length * this.opts.scale - topText.width) / 2.0;
    elements.push({
      svg: topText.svg,
      height: topText.height,
      width: this.opts.arrow.length * this.opts.scale,
      offsetX: -(this.opts.arrow.length * this.opts.scale + this.opts.spacing) + centerOffsetX,
      offsetY: -(topText.height / 2.0) - this.opts.arrow.margin,
      position: 'relative'
    }); // Text below arrow

    const bottomText = SvgWrapper.writeText(textBelow, this.themeManager, this.opts.fontSize * this.opts.scale, this.opts.fontFamily, this.opts.arrow.length * this.opts.scale);
    centerOffsetX = (this.opts.arrow.length * this.opts.scale - bottomText.width) / 2.0;
    elements.push({
      svg: bottomText.svg,
      height: bottomText.height,
      width: this.opts.arrow.length * this.opts.scale,
      offsetX: -(this.opts.arrow.length * this.opts.scale + this.opts.spacing) + centerOffsetX,
      offsetY: bottomText.height / 2.0 + this.opts.arrow.margin,
      position: 'relative'
    }); // Products

    for (var i = 0; i < reaction.products.length; i++) {
      if (i > 0) {
        elements.push({
          width: this.opts.plus.size * this.opts.scale,
          height: this.opts.plus.size * this.opts.scale,
          svg: this.getPlus()
        });
      }

      let productWeights = null;

      if (weights && weights.hasOwnProperty('products') && weights.products.length > i) {
        productWeights = weights.products[i];
      }

      let productSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.drawer.draw(reaction.products[i], productSvg, themeName, productWeights, infoOnly, [], this.opts.weights.normalize);
      let element = {
        width: productSvg.viewBox.baseVal.width * this.opts.scale,
        height: productSvg.viewBox.baseVal.height * this.opts.scale,
        svg: productSvg
      };
      elements.push(element);

      if (element.height > maxHeight) {
        maxHeight = element.height;
      }
    }

    let totalWidth = 0.0;
    elements.forEach(element => {
      let offsetX = element.offsetX ?? 0.0;
      let offsetY = element.offsetY ?? 0.0;
      element.svg.setAttributeNS(null, 'x', Math.round(totalWidth + offsetX));
      element.svg.setAttributeNS(null, 'y', Math.round((maxHeight - element.height) / 2.0 + offsetY));
      element.svg.setAttributeNS(null, 'width', Math.round(element.width));
      element.svg.setAttributeNS(null, 'height', Math.round(element.height));
      svg.appendChild(element.svg);

      if (element.position !== 'relative') {
        totalWidth += Math.round(element.width + this.opts.spacing + offsetX);
      }
    });
    svg.setAttributeNS(null, 'viewBox', `0 0 ${totalWidth} ${maxHeight}`);
    svg.style.width = totalWidth + 'px';
    svg.style.height = maxHeight + 'px';
    return svg;
  }

  getPlus() {
    let s = this.opts.plus.size;
    let w = this.opts.plus.thickness;
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let rect_h = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    let rect_v = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svg.setAttributeNS(null, 'id', 'plus');
    rect_h.setAttributeNS(null, 'x', 0);
    rect_h.setAttributeNS(null, 'y', s / 2.0 - w / 2.0);
    rect_h.setAttributeNS(null, 'width', s);
    rect_h.setAttributeNS(null, 'height', w);
    rect_h.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));
    rect_v.setAttributeNS(null, 'x', s / 2.0 - w / 2.0);
    rect_v.setAttributeNS(null, 'y', 0);
    rect_v.setAttributeNS(null, 'width', w);
    rect_v.setAttributeNS(null, 'height', s);
    rect_v.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));
    svg.appendChild(rect_h);
    svg.appendChild(rect_v);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${s} ${s}`);
    return svg;
  }

  getArrowhead() {
    let s = this.opts.arrow.headSize;
    let marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    marker.setAttributeNS(null, 'id', 'arrowhead');
    marker.setAttributeNS(null, 'viewBox', `0 0 ${s} ${s}`);
    marker.setAttributeNS(null, 'markerUnits', 'userSpaceOnUse');
    marker.setAttributeNS(null, 'markerWidth', s);
    marker.setAttributeNS(null, 'markerHeight', s);
    marker.setAttributeNS(null, 'refX', 0);
    marker.setAttributeNS(null, 'refY', s / 2);
    marker.setAttributeNS(null, 'orient', 'auto');
    marker.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));
    polygon.setAttributeNS(null, 'points', `0 0, ${s} ${s / 2}, 0 ${s}`);
    marker.appendChild(polygon);
    return marker;
  }

  getCDArrowhead() {
    let s = this.opts.arrow.headSize;
    let sw = s * (7 / 4.5);
    let marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    marker.setAttributeNS(null, 'id', 'arrowhead');
    marker.setAttributeNS(null, 'viewBox', `0 0 ${sw} ${s}`);
    marker.setAttributeNS(null, 'markerUnits', 'userSpaceOnUse');
    marker.setAttributeNS(null, 'markerWidth', sw * 2);
    marker.setAttributeNS(null, 'markerHeight', s * 2);
    marker.setAttributeNS(null, 'refX', 2.2);
    marker.setAttributeNS(null, 'refY', 2.2);
    marker.setAttributeNS(null, 'orient', 'auto');
    marker.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));
    path.setAttributeNS(null, 'style', 'fill-rule:nonzero;');
    path.setAttributeNS(null, 'd', 'm 0 0 l 7 2.25 l -7 2.25 c 0 0 0.735 -1.084 0.735 -2.28 c 0 -1.196 -0.735 -2.22 -0.735 -2.22 z');
    marker.appendChild(path);
    return marker;
  }

  getArrow() {
    let s = this.opts.arrow.headSize;
    let l = this.opts.arrow.length;
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    defs.appendChild(this.getCDArrowhead());
    svg.appendChild(defs);
    svg.setAttributeNS(null, 'id', 'arrow');
    line.setAttributeNS(null, 'x1', 0.0);
    line.setAttributeNS(null, 'y1', -this.opts.arrow.thickness / 2.0);
    line.setAttributeNS(null, 'x2', l);
    line.setAttributeNS(null, 'y2', -this.opts.arrow.thickness / 2.0);
    line.setAttributeNS(null, 'stroke-width', this.opts.arrow.thickness);
    line.setAttributeNS(null, 'stroke', this.themeManager.getColor("C"));
    line.setAttributeNS(null, 'marker-end', 'url(#arrowhead)');
    svg.appendChild(line);
    svg.setAttributeNS(null, 'viewBox', `0 ${-s / 2.0} ${l + s * (7 / 4.5)} ${s}`);
    return svg;
  }

}

module.exports = ReactionDrawer;

},{"./FormulaToCommonName":9,"./Options":14,"./SvgDrawer":24,"./SvgWrapper":25,"./ThemeManager":26}],19:[function(require,module,exports){
"use strict";

//@ts-check
const Reaction = require('./Reaction');

class ReactionParser {
  /**
   * Returns the hex code of a color associated with a key from the current theme.
   *
   * @param {String} reactionSmiles A reaction SMILES.
   * @returns {Reaction} A reaction object.
   */
  static parse(reactionSmiles) {
    let reaction = new Reaction(reactionSmiles);
    return reaction;
  }

}

module.exports = ReactionParser;

},{"./Reaction":17}],20:[function(require,module,exports){
"use strict";

//@ts-check
const ArrayHelper = require('./ArrayHelper');

const Vector2 = require('./Vector2');

const Vertex = require('./Vertex');

const RingConnection = require('./RingConnection');
/** 
 * A class representing a ring.
 * 
 * @property {Number} id The id of this ring.
 * @property {Number[]} members An array containing the vertex ids of the ring members.
 * @property {Number[]} edges An array containing the edge ids of the edges between the ring members.
 * @property {Number[]} insiders An array containing the vertex ids of the vertices contained within the ring if it is a bridged ring.
 * @property {Number[]} neighbours An array containing the ids of neighbouring rings.
 * @property {Boolean} positioned A boolean indicating whether or not this ring has been positioned.
 * @property {Vector2} center The center of this ring.
 * @property {Ring[]} rings The rings contained within this ring if this ring is bridged.
 * @property {Boolean} isBridged A boolean whether or not this ring is bridged.
 * @property {Boolean} isPartOfBridged A boolean whether or not this ring is part of a bridge ring.
 * @property {Boolean} isSpiro A boolean whether or not this ring is part of a spiro.
 * @property {Boolean} isFused A boolean whether or not this ring is part of a fused ring.
 * @property {Number} centralAngle The central angle of this ring.
 * @property {Boolean} canFlip A boolean indicating whether or not this ring allows flipping of attached vertices to the inside of the ring.
 */


class Ring {
  /**
   * The constructor for the class Ring.
   *
   * @param {Number[]} members An array containing the vertex ids of the members of the ring to be created.
   */
  constructor(members) {
    this.id = null;
    this.members = members;
    this.edges = [];
    this.insiders = [];
    this.neighbours = [];
    this.positioned = false;
    this.center = new Vector2(0, 0);
    this.rings = [];
    this.isBridged = false;
    this.isPartOfBridged = false;
    this.isSpiro = false;
    this.isFused = false;
    this.centralAngle = 0.0;
    this.canFlip = true;
  }
  /**
   * Clones this ring and returns the clone.
   *
   * @returns {Ring} A clone of this ring.
   */


  clone() {
    let clone = new Ring(this.members);
    clone.id = this.id;
    clone.insiders = ArrayHelper.clone(this.insiders);
    clone.neighbours = ArrayHelper.clone(this.neighbours);
    clone.positioned = this.positioned;
    clone.center = this.center.clone();
    clone.rings = ArrayHelper.clone(this.rings);
    clone.isBridged = this.isBridged;
    clone.isPartOfBridged = this.isPartOfBridged;
    clone.isSpiro = this.isSpiro;
    clone.isFused = this.isFused;
    clone.centralAngle = this.centralAngle;
    clone.canFlip = this.canFlip;
    return clone;
  }
  /**
   * Returns the size (number of members) of this ring.
   *
   * @returns {Number} The size (number of members) of this ring.
   */


  getSize() {
    return this.members.length;
  }
  /**
   * Gets the polygon representation (an array of the ring-members positional vectors) of this ring.
   *
   * @param {Vertex[]} vertices An array of vertices representing the current molecule.
   * @returns {Vector2[]} An array of the positional vectors of the ring members.
   */


  getPolygon(vertices) {
    let polygon = [];

    for (let i = 0; i < this.members.length; i++) {
      polygon.push(vertices[this.members[i]].position);
    }

    return polygon;
  }
  /**
   * Returns the angle of this ring in relation to the coordinate system.
   *
   * @returns {Number} The angle in radians.
   */


  getAngle() {
    return Math.PI - this.centralAngle;
  }
  /**
   * Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.
   *
   * @param {Vertex[]} vertices The vertices associated with the current molecule.
   * @param {Function} callback A callback with the current vertex id as a parameter.
   * @param {Number} startVertexId The vertex id of the start vertex.
   * @param {Number} previousVertexId The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex).
   */


  eachMember(vertices, callback, startVertexId, previousVertexId) {
    startVertexId = startVertexId || startVertexId === 0 ? startVertexId : this.members[0];
    let current = startVertexId;
    let max = 0;

    while (current != null && max < 100) {
      let prev = current;
      callback(prev);
      current = vertices[current].getNextInRing(vertices, this.id, previousVertexId);
      previousVertexId = prev; // Stop while loop when arriving back at the start vertex

      if (current == startVertexId) {
        current = null;
      }

      max++;
    }
  }
  /**
   * Returns an array containing the neighbouring rings of this ring ordered by ring size.
   *
   * @param {RingConnection[]} ringConnections An array of ring connections associated with the current molecule.
   * @returns {Object[]} An array of neighbouring rings sorted by ring size. Example: { n: 5, neighbour: 1 }.
   */


  getOrderedNeighbours(ringConnections) {
    let orderedNeighbours = Array(this.neighbours.length);

    for (let i = 0; i < this.neighbours.length; i++) {
      let vertices = RingConnection.getVertices(ringConnections, this.id, this.neighbours[i]);
      orderedNeighbours[i] = {
        n: vertices.length,
        neighbour: this.neighbours[i]
      };
    }

    orderedNeighbours.sort(function (a, b) {
      // Sort highest to lowest
      return b.n - a.n;
    });
    return orderedNeighbours;
  }
  /**
   * Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.
   *
   * @param {Vertex[]} vertices An array of vertices associated with the current molecule.
   * @returns {Boolean} A boolean indicating whether or not this ring is an implicitly defined benzene-like.
   */


  isBenzeneLike(vertices) {
    let db = this.getDoubleBondCount(vertices);
    let length = this.members.length;
    return db === 3 && length === 6 || db === 2 && length === 5;
  }
  /**
   * Get the number of double bonds inside this ring.
   *
   * @param {Vertex[]} vertices An array of vertices associated with the current molecule.
   * @returns {Number} The number of double bonds inside this ring.
   */


  getDoubleBondCount(vertices) {
    let doubleBondCount = 0;

    for (let i = 0; i < this.members.length; i++) {
      let atom = vertices[this.members[i]].value;

      if (atom.bondType === '=' || atom.branchBond === '=') {
        doubleBondCount++;
      }
    }

    return doubleBondCount;
  }
  /**
   * Checks whether or not this ring contains a member with a given vertex id.
   *
   * @param {Number} vertexId A vertex id.
   * @returns {Boolean} A boolean indicating whether or not this ring contains a member with the given vertex id.
   */


  contains(vertexId) {
    for (let i = 0; i < this.members.length; i++) {
      if (this.members[i] == vertexId) {
        return true;
      }
    }

    return false;
  }

}

module.exports = Ring;

},{"./ArrayHelper":3,"./RingConnection":21,"./Vector2":28,"./Vertex":29}],21:[function(require,module,exports){
"use strict";

//@ts-check
const Vertex = require('./Vertex');

const Ring = require('./Ring');
/** 
 * A class representing a ring connection.
 * 
 * @property {Number} id The id of this ring connection.
 * @property {Number} firstRingId A ring id.
 * @property {Number} secondRingId A ring id.
 * @property {Set<Number>} vertices A set containing the vertex ids participating in the ring connection.
 */


class RingConnection {
  /**
   * The constructor for the class RingConnection.
   *
   * @param {Ring} firstRing A ring.
   * @param {Ring} secondRing A ring.
   */
  constructor(firstRing, secondRing) {
    this.id = null;
    this.firstRingId = firstRing.id;
    this.secondRingId = secondRing.id;
    this.vertices = new Set();

    for (var m = 0; m < firstRing.members.length; m++) {
      let c = firstRing.members[m];

      for (let n = 0; n < secondRing.members.length; n++) {
        let d = secondRing.members[n];

        if (c === d) {
          this.addVertex(c);
        }
      }
    }
  }
  /**
   * Adding a vertex to the ring connection.
   *
   * @param {Number} vertexId A vertex id.
   */


  addVertex(vertexId) {
    this.vertices.add(vertexId);
  }
  /**
   * Update the ring id of this ring connection that is not the ring id supplied as the second argument.
   *
   * @param {Number} ringId A ring id. The new ring id to be set.
   * @param {Number} otherRingId A ring id. The id that is NOT to be updated.
   */


  updateOther(ringId, otherRingId) {
    if (this.firstRingId === otherRingId) {
      this.secondRingId = ringId;
    } else {
      this.firstRingId = ringId;
    }
  }
  /**
   * Returns a boolean indicating whether or not a ring with a given id is participating in this ring connection.
   * 
   * @param {Number} ringId A ring id.
   * @returns {Boolean} A boolean indicating whether or not a ring with a given id participates in this ring connection.
   */


  containsRing(ringId) {
    return this.firstRingId === ringId || this.secondRingId === ringId;
  }
  /**
   * Checks whether or not this ring connection is a bridge in a bridged ring.
   *
   * @param {Vertex[]} vertices The array of vertices associated with the current molecule.
   * @returns {Boolean} A boolean indicating whether or not this ring connection is a bridge.
   */


  isBridge(vertices) {
    if (this.vertices.size > 2) {
      return true;
    }

    for (let vertexId of this.vertices) {
      if (vertices[vertexId].value.rings.length > 2) {
        return true;
      }
    }

    return false;
  }
  /**
   * Checks whether or not two rings are connected by a bridged bond.
   *
   * @static
   * @param {RingConnection[]} ringConnections An array of ring connections containing the ring connections associated with the current molecule.
   * @param {Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
   * @param {Number} firstRingId A ring id.
   * @param {Number} secondRingId A ring id.
   * @returns {Boolean} A boolean indicating whether or not two rings ar connected by a bridged bond.
   */


  static isBridge(ringConnections, vertices, firstRingId, secondRingId) {
    let ringConnection = null;

    for (let i = 0; i < ringConnections.length; i++) {
      ringConnection = ringConnections[i];

      if (ringConnection.firstRingId === firstRingId && ringConnection.secondRingId === secondRingId || ringConnection.firstRingId === secondRingId && ringConnection.secondRingId === firstRingId) {
        return ringConnection.isBridge(vertices);
      }
    }

    return false;
  }
  /**
   * Retruns the neighbouring rings of a given ring.
   *
   * @static
   * @param {RingConnection[]} ringConnections An array of ring connections containing ring connections associated with the current molecule.
   * @param {Number} ringId A ring id.
   * @returns {Number[]} An array of ring ids of neighbouring rings.
   */


  static getNeighbours(ringConnections, ringId) {
    let neighbours = [];

    for (let i = 0; i < ringConnections.length; i++) {
      let ringConnection = ringConnections[i];

      if (ringConnection.firstRingId === ringId) {
        neighbours.push(ringConnection.secondRingId);
      } else if (ringConnection.secondRingId === ringId) {
        neighbours.push(ringConnection.firstRingId);
      }
    }

    return neighbours;
  }
  /**
   * Returns an array of vertex ids associated with a given ring connection.
   *
   * @static
   * @param {RingConnection[]} ringConnections An array of ring connections containing ring connections associated with the current molecule.
   * @param {Number} firstRingId A ring id.
   * @param {Number} secondRingId A ring id.
   * @returns {Number[]} An array of vertex ids associated with the ring connection.
   */


  static getVertices(ringConnections, firstRingId, secondRingId) {
    for (let i = 0; i < ringConnections.length; i++) {
      let ringConnection = ringConnections[i];

      if (ringConnection.firstRingId === firstRingId && ringConnection.secondRingId === secondRingId || ringConnection.firstRingId === secondRingId && ringConnection.secondRingId === firstRingId) {
        return [...ringConnection.vertices];
      }
    }
  }

}

module.exports = RingConnection;

},{"./Ring":20,"./Vertex":29}],22:[function(require,module,exports){
"use strict";

//@ts-check
const Graph = require('./Graph');
/** A class encapsulating the functionality to find the smallest set of smallest rings in a graph. */


class SSSR {
  /**
   * Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.
   * 
   * @param {Graph} graph A Graph object.
   * @param {Boolean} [experimental=false] Whether or not to use experimental SSSR.
   * @returns {Array[]} An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.
   */
  static getRings(graph, experimental = false) {
    let adjacencyMatrix = graph.getComponentsAdjacencyMatrix();

    if (adjacencyMatrix.length === 0) {
      return null;
    }

    let connectedComponents = Graph.getConnectedComponents(adjacencyMatrix);
    let rings = Array();

    for (var i = 0; i < connectedComponents.length; i++) {
      let connectedComponent = connectedComponents[i];
      let ccAdjacencyMatrix = graph.getSubgraphAdjacencyMatrix([...connectedComponent]);
      let arrBondCount = new Uint16Array(ccAdjacencyMatrix.length);
      let arrRingCount = new Uint16Array(ccAdjacencyMatrix.length);

      for (var j = 0; j < ccAdjacencyMatrix.length; j++) {
        arrRingCount[j] = 0;
        arrBondCount[j] = 0;

        for (var k = 0; k < ccAdjacencyMatrix[j].length; k++) {
          arrBondCount[j] += ccAdjacencyMatrix[j][k];
        }
      } // Get the edge number and the theoretical number of rings in SSSR


      let nEdges = 0;

      for (var j = 0; j < ccAdjacencyMatrix.length; j++) {
        for (var k = j + 1; k < ccAdjacencyMatrix.length; k++) {
          nEdges += ccAdjacencyMatrix[j][k];
        }
      }

      let nSssr = nEdges - ccAdjacencyMatrix.length + 1; // console.log(nEdges, ccAdjacencyMatrix.length, nSssr);
      // console.log(SSSR.getEdgeList(ccAdjacencyMatrix));
      // console.log(ccAdjacencyMatrix);
      // If all vertices have 3 incident edges, calculate with different formula (see Euler)

      let allThree = true;

      for (var j = 0; j < arrBondCount.length; j++) {
        if (arrBondCount[j] !== 3) {
          allThree = false;
        }
      }

      if (allThree) {
        nSssr = 2.0 + nEdges - ccAdjacencyMatrix.length;
      } // All vertices are part of one ring if theres only one ring.


      if (nSssr === 1) {
        rings.push([...connectedComponent]);
        continue;
      }

      if (experimental) {
        nSssr = 999;
      }

      let {
        d,
        pe,
        pe_prime
      } = SSSR.getPathIncludedDistanceMatrices(ccAdjacencyMatrix);
      let c = SSSR.getRingCandidates(d, pe, pe_prime);
      let sssr = SSSR.getSSSR(c, d, ccAdjacencyMatrix, pe, pe_prime, arrBondCount, arrRingCount, nSssr);

      for (var j = 0; j < sssr.length; j++) {
        let ring = Array(sssr[j].size);
        let index = 0;

        for (let val of sssr[j]) {
          // Get the original id of the vertex back
          ring[index++] = connectedComponent[val];
        }

        rings.push(ring);
      }
    } // So, for some reason, this would return three rings for C1CCCC2CC1CCCC2, which is wrong
    // As I don't have time to fix this properly, it will stay in. I'm sorry next person who works
    // on it. At that point it might be best to reimplement the whole SSSR thing...


    return rings;
  }
  /**
   * Creates a printable string from a matrix (2D array).
   * 
   * @param {Array[]} matrix A 2D array.
   * @returns {String} A string representing the matrix.
   */


  static matrixToString(matrix) {
    let str = '';

    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        str += matrix[i][j] + ' ';
      }

      str += '\n';
    }

    return str;
  }
  /**
   * Returnes the two path-included distance matrices used to find the sssr.
   * 
   * @param {Array[]} adjacencyMatrix An adjacency matrix.
   * @returns {Object} The path-included distance matrices. { p1, p2 }
   */


  static getPathIncludedDistanceMatrices(adjacencyMatrix) {
    let length = adjacencyMatrix.length;
    let d = Array(length);
    let pe = Array(length);
    let pe_prime = Array(length);
    var l = 0;
    var m = 0;
    var n = 0;
    var i = length;

    while (i--) {
      d[i] = Array(length);
      pe[i] = Array(length);
      pe_prime[i] = Array(length);
      var j = length;

      while (j--) {
        d[i][j] = i === j || adjacencyMatrix[i][j] === 1 ? adjacencyMatrix[i][j] : Number.POSITIVE_INFINITY;

        if (d[i][j] === 1) {
          pe[i][j] = [[[i, j]]];
        } else {
          pe[i][j] = Array();
        }

        pe_prime[i][j] = Array();
      }
    }

    var k = length;
    var j;

    while (k--) {
      i = length;

      while (i--) {
        j = length;

        while (j--) {
          const previousPathLength = d[i][j];
          const newPathLength = d[i][k] + d[k][j];

          if (previousPathLength > newPathLength) {
            var l, m, n;

            if (previousPathLength === newPathLength + 1) {
              pe_prime[i][j] = [pe[i][j].length];
              l = pe[i][j].length;

              while (l--) {
                pe_prime[i][j][l] = [pe[i][j][l].length];
                m = pe[i][j][l].length;

                while (m--) {
                  pe_prime[i][j][l][m] = [pe[i][j][l][m].length];
                  n = pe[i][j][l][m].length;

                  while (n--) {
                    pe_prime[i][j][l][m][n] = [pe[i][j][l][m][0], pe[i][j][l][m][1]];
                  }
                }
              }
            } else {
              pe_prime[i][j] = Array();
            }

            d[i][j] = newPathLength;
            pe[i][j] = [[]];
            l = pe[i][k][0].length;

            while (l--) {
              pe[i][j][0].push(pe[i][k][0][l]);
            }

            l = pe[k][j][0].length;

            while (l--) {
              pe[i][j][0].push(pe[k][j][0][l]);
            }
          } else if (previousPathLength === newPathLength) {
            if (pe[i][k].length && pe[k][j].length) {
              var l;

              if (pe[i][j].length) {
                let tmp = Array();
                l = pe[i][k][0].length;

                while (l--) {
                  tmp.push(pe[i][k][0][l]);
                }

                l = pe[k][j][0].length;

                while (l--) {
                  tmp.push(pe[k][j][0][l]);
                }

                pe[i][j].push(tmp);
              } else {
                let tmp = Array();
                l = pe[i][k][0].length;

                while (l--) {
                  tmp.push(pe[i][k][0][l]);
                }

                l = pe[k][j][0].length;

                while (l--) {
                  tmp.push(pe[k][j][0][l]);
                }

                pe[i][j][0] = tmp;
              }
            }
          } else if (previousPathLength === newPathLength - 1) {
            var l;

            if (pe_prime[i][j].length) {
              let tmp = Array();
              l = pe[i][k][0].length;

              while (l--) {
                tmp.push(pe[i][k][0][l]);
              }

              l = pe[k][j][0].length;

              while (l--) {
                tmp.push(pe[k][j][0][l]);
              }

              pe_prime[i][j].push(tmp);
            } else {
              let tmp = Array();
              l = pe[i][k][0].length;

              while (l--) {
                tmp.push(pe[i][k][0][l]);
              }

              l = pe[k][j][0].length;

              while (l--) {
                tmp.push(pe[k][j][0][l]);
              }

              pe_prime[i][j][0] = tmp;
            }
          }
        }
      }
    }

    return {
      d: d,
      pe: pe,
      pe_prime: pe_prime
    };
  }
  /**
   * Get the ring candidates from the path-included distance matrices.
   * 
   * @param {Array[]} d The distance matrix.
   * @param {Array[]} pe A matrix containing the shortest paths.
   * @param {Array[]} pe_prime A matrix containing the shortest paths + one vertex.
   * @returns {Array[]} The ring candidates.
   */


  static getRingCandidates(d, pe, pe_prime) {
    let length = d.length;
    let candidates = Array();
    let c = 0;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (d[i][j] === 0 || pe[i][j].length === 1 && pe_prime[i][j] === 0) {
          continue;
        } else {
          // c is the number of vertices in the cycle.
          if (pe_prime[i][j].length !== 0) {
            c = 2 * (d[i][j] + 0.5);
          } else {
            c = 2 * d[i][j];
          }

          if (c !== Infinity) {
            candidates.push([c, pe[i][j], pe_prime[i][j]]);
          }
        }
      }
    } // Candidates have to be sorted by c


    candidates.sort(function (a, b) {
      return a[0] - b[0];
    });
    return candidates;
  }
  /**
   * Searches the candidates for the smallest set of smallest rings.
   * 
   * @param {Array[]} c The candidates.
   * @param {Array[]} d The distance matrix.
   * @param {Array[]} adjacencyMatrix An adjacency matrix.
   * @param {Array[]} pe A matrix containing the shortest paths.
   * @param {Array[]} pe_prime A matrix containing the shortest paths + one vertex.
   * @param {Uint16Array} arrBondCount A matrix containing the bond count of each vertex.
   * @param {Uint16Array} arrRingCount A matrix containing the number of rings associated with each vertex.
   * @param {Number} nsssr The theoretical number of rings in the graph.
   * @returns {Set[]} The smallest set of smallest rings.
   */


  static getSSSR(c, d, adjacencyMatrix, pe, pe_prime, arrBondCount, arrRingCount, nsssr) {
    let cSssr = Array();
    let allBonds = Array();

    for (let i = 0; i < c.length; i++) {
      if (c[i][0] % 2 !== 0) {
        for (let j = 0; j < c[i][2].length; j++) {
          let bonds = c[i][1][0].concat(c[i][2][j]); // Some bonds are added twice, resulting in [[u, v], [u, v]] instead of [u, v].
          // TODO: This is a workaround, fix later. Probably should be a set rather than an array, however the computational overhead
          //       is probably bigger compared to leaving it like this.

          for (var k = 0; k < bonds.length; k++) {
            if (bonds[k][0].constructor === Array) bonds[k] = bonds[k][0];
          }

          let atoms = SSSR.bondsToAtoms(bonds);

          if (SSSR.getBondCount(atoms, adjacencyMatrix) === atoms.size && !SSSR.pathSetsContain(cSssr, atoms, bonds, allBonds, arrBondCount, arrRingCount)) {
            cSssr.push(atoms);
            allBonds = allBonds.concat(bonds);
          }

          if (cSssr.length > nsssr) {
            return cSssr;
          }
        }
      } else {
        for (let j = 0; j < c[i][1].length - 1; j++) {
          let bonds = c[i][1][j].concat(c[i][1][j + 1]); // Some bonds are added twice, resulting in [[u, v], [u, v]] instead of [u, v].
          // TODO: This is a workaround, fix later. Probably should be a set rather than an array, however the computational overhead
          //       is probably bigger compared to leaving it like this.

          for (var k = 0; k < bonds.length; k++) {
            if (bonds[k][0].constructor === Array) bonds[k] = bonds[k][0];
          }

          let atoms = SSSR.bondsToAtoms(bonds);

          if (SSSR.getBondCount(atoms, adjacencyMatrix) === atoms.size && !SSSR.pathSetsContain(cSssr, atoms, bonds, allBonds, arrBondCount, arrRingCount)) {
            cSssr.push(atoms);
            allBonds = allBonds.concat(bonds);
          }

          if (cSssr.length > nsssr) {
            return cSssr;
          }
        }
      }
    }

    return cSssr;
  }
  /**
   * Returns the number of edges in a graph defined by an adjacency matrix.
   * 
   * @param {Array[]} adjacencyMatrix An adjacency matrix.
   * @returns {Number} The number of edges in the graph defined by the adjacency matrix.
   */


  static getEdgeCount(adjacencyMatrix) {
    let edgeCount = 0;
    let length = adjacencyMatrix.length;
    var i = length - 1;

    while (i--) {
      var j = length;

      while (j--) {
        if (adjacencyMatrix[i][j] === 1) {
          edgeCount++;
        }
      }
    }

    return edgeCount;
  }
  /**
   * Returns an edge list constructed form an adjacency matrix.
   * 
   * @param {Array[]} adjacencyMatrix An adjacency matrix.
   * @returns {Array[]} An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]
   */


  static getEdgeList(adjacencyMatrix) {
    let length = adjacencyMatrix.length;
    let edgeList = Array();
    var i = length - 1;

    while (i--) {
      var j = length;

      while (j--) {
        if (adjacencyMatrix[i][j] === 1) {
          edgeList.push([i, j]);
        }
      }
    }

    return edgeList;
  }
  /**
   * Return a set of vertex indices contained in an array of bonds.
   * 
   * @param {Array} bonds An array of bonds. A bond is defined as [ sourceVertexId, targetVertexId ].
   * @returns {Set<Number>} An array of vertices.
   */


  static bondsToAtoms(bonds) {
    let atoms = new Set();
    var i = bonds.length;

    while (i--) {
      atoms.add(bonds[i][0]);
      atoms.add(bonds[i][1]);
    }

    return atoms;
  }
  /**
  * Returns the number of bonds within a set of atoms.
  * 
  * @param {Set<Number>} atoms An array of atom ids.
  * @param {Array[]} adjacencyMatrix An adjacency matrix.
  * @returns {Number} The number of bonds in a set of atoms.
  */


  static getBondCount(atoms, adjacencyMatrix) {
    let count = 0;

    for (let u of atoms) {
      for (let v of atoms) {
        if (u === v) {
          continue;
        }

        count += adjacencyMatrix[u][v];
      }
    }

    return count / 2;
  }
  /**
   * Checks whether or not a given path already exists in an array of paths.
   * 
   * @param {Set[]} pathSets An array of sets each representing a path.
   * @param {Set<Number>} pathSet A set representing a path.
   * @param {Array[]} bonds The bonds associated with the current path.
   * @param {Array[]} allBonds All bonds currently associated with rings in the SSSR set.
   * @param {Uint16Array} arrBondCount A matrix containing the bond count of each vertex.
   * @param {Uint16Array} arrRingCount A matrix containing the number of rings associated with each vertex.
   * @returns {Boolean} A boolean indicating whether or not a give path is contained within a set.
   */


  static pathSetsContain(pathSets, pathSet, bonds, allBonds, arrBondCount, arrRingCount) {
    var i = pathSets.length;

    while (i--) {
      if (SSSR.isSupersetOf(pathSet, pathSets[i])) {
        return true;
      }

      if (pathSets[i].size !== pathSet.size) {
        continue;
      }

      if (SSSR.areSetsEqual(pathSets[i], pathSet)) {
        return true;
      }
    } // Check if the edges from the candidate are already all contained within the paths of the set of paths.
    // TODO: For some reason, this does not replace the isSupersetOf method above -> why?


    let count = 0;
    let allContained = false;
    i = bonds.length;

    while (i--) {
      var j = allBonds.length;

      while (j--) {
        if (bonds[i][0] === allBonds[j][0] && bonds[i][1] === allBonds[j][1] || bonds[i][1] === allBonds[j][0] && bonds[i][0] === allBonds[j][1]) {
          count++;
        }

        if (count === bonds.length) {
          allContained = true;
        }
      }
    } // If all the bonds and thus vertices are already contained within other rings
    // check if there's one vertex with ringCount < bondCount


    let specialCase = false;

    if (allContained) {
      for (let element of pathSet) {
        if (arrRingCount[element] < arrBondCount[element]) {
          specialCase = true;
          break;
        }
      }
    }

    if (allContained && !specialCase) {
      return true;
    } // Update the ring counts for the vertices


    for (let element of pathSet) {
      arrRingCount[element]++;
    }

    return false;
  }
  /**
   * Checks whether or not two sets are equal (contain the same elements).
   * 
   * @param {Set<Number>} setA A set.
   * @param {Set<Number>} setB A set.
   * @returns {Boolean} A boolean indicating whether or not the two sets are equal.
   */


  static areSetsEqual(setA, setB) {
    if (setA.size !== setB.size) {
      return false;
    }

    for (let element of setA) {
      if (!setB.has(element)) {
        return false;
      }
    }

    return true;
  }
  /**
   * Checks whether or not a set (setA) is a superset of another set (setB).
   * 
   * @param {Set<Number>} setA A set.
   * @param {Set<Number>} setB A set.
   * @returns {Boolean} A boolean indicating whether or not setB is a superset of setA.
   */


  static isSupersetOf(setA, setB) {
    for (var element of setB) {
      if (!setA.has(element)) {
        return false;
      }
    }

    return true;
  }

}

module.exports = SSSR;

},{"./Graph":11}],23:[function(require,module,exports){
"use strict";

//@ts-check
const Drawer = require('./Drawer');

const Parser = require('./Parser');

const ReactionParser = require('./ReactionParser');

const SvgDrawer = require('./SvgDrawer');

const ReactionDrawer = require('./ReactionDrawer');

const SvgWrapper = require('./SvgWrapper');

const Options = require('./Options');

class SmilesDrawer {
  constructor(moleculeOptions = {}, reactionOptions = {}) {
    this.drawer = new SvgDrawer(moleculeOptions); // moleculeOptions gets edited in reactionOptions, so clone

    this.reactionDrawer = new ReactionDrawer(reactionOptions, JSON.parse(JSON.stringify(this.drawer.opts)));
  }

  static apply(moleculeOptions = {}, reactionOptions = {}, attribute = 'data-smiles', theme = 'light', successCallback = null, errorCallback = null) {
    const drawer = new SmilesDrawer(moleculeOptions, reactionOptions);
    drawer.apply(attribute, theme, successCallback, errorCallback);
  }

  apply(attribute = 'data-smiles', theme = 'light', successCallback = null, errorCallback = null) {
    let elements = document.querySelectorAll(`[${attribute}]`);
    elements.forEach(element => {
      let smiles = element.getAttribute(attribute);

      if (smiles === null) {
        throw Error('No SMILES provided.');
      }

      let currentTheme = theme;
      let weights = null;

      if (element.hasAttribute('data-smiles-theme')) {
        currentTheme = element.getAttribute('data-smiles-theme');
      }

      if (element.hasAttribute('data-smiles-weights')) {
        weights = element.getAttribute('data-smiles-weights').split(",").map(parseFloat);
      }

      if (element.hasAttribute('data-smiles-reactant-weights') || element.hasAttribute('data-smiles-reagent-weights') || element.hasAttribute('data-smiles-product-weights')) {
        weights = {
          reactants: [],
          reagents: [],
          products: []
        };

        if (element.hasAttribute('data-smiles-reactant-weights')) {
          weights.reactants = element.getAttribute('data-smiles-reactant-weights').split(';').map(v => {
            return v.split(',').map(parseFloat);
          });
        }

        if (element.hasAttribute('data-smiles-reagent-weights')) {
          weights.reagents = element.getAttribute('data-smiles-reagent-weights').split(';').map(v => {
            return v.split(',').map(parseFloat);
          });
        }

        if (element.hasAttribute('data-smiles-product-weights')) {
          weights.products = element.getAttribute('data-smiles-product-weights').split(';').map(v => {
            return v.split(',').map(parseFloat);
          });
        }
      }

      if (element.hasAttribute('data-smiles-options') || element.hasAttribute('data-smiles-reaction-options')) {
        let moleculeOptions = {};

        if (element.hasAttribute('data-smiles-options')) {
          moleculeOptions = JSON.parse(element.getAttribute('data-smiles-options').replaceAll('\'', '"'));
        }

        let reactionOptions = {};

        if (element.hasAttribute('data-smiles-reaction-options')) {
          reactionOptions = JSON.parse(element.getAttribute('data-smiles-reaction-options').replaceAll('\'', '"'));
        }

        let smilesDrawer = new SmilesDrawer(moleculeOptions, reactionOptions);
        smilesDrawer.draw(smiles, element, currentTheme, successCallback, errorCallback, weights);
      } else {
        this.draw(smiles, element, currentTheme, successCallback, errorCallback, weights);
      }
    });
  }
  /**
   * Draw the smiles to the target.
   * @param {String} smiles The SMILES to be depicted.
   * @param {*} target The target element.
   * @param {String} theme The theme.
   * @param {?CallableFunction} successCallback The function called on success.
   * @param {?CallableFunction} errorCallback The function called on error.
   * @param {?Number[]|Object} weights The weights for the gaussians.
   */


  draw(smiles, target, theme = 'light', successCallback = null, errorCallback = null, weights = null) {
    // get the settings
    let rest = [];
    [smiles, ...rest] = smiles.split(' ');
    let info = rest.join(' ');
    let settings = {};

    if (info.includes('__')) {
      let settingsString = info.substring(info.indexOf('__') + 2, info.lastIndexOf('__'));
      settings = JSON.parse(settingsString.replaceAll('\'', '"'));
    }

    let defaultSettings = {
      textAboveArrow: '{reagents}',
      textBelowArrow: ''
    };
    settings = Options.extend(true, defaultSettings, settings);

    if (smiles.includes('>')) {
      try {
        this.drawReaction(smiles, target, theme, settings, weights, successCallback);
      } catch (err) {
        if (errorCallback) {
          errorCallback(err);
        } else {
          console.error(err);
        }
      }
    } else {
      try {
        this.drawMolecule(smiles, target, theme, weights, successCallback);
      } catch (err) {
        if (errorCallback) {
          errorCallback(err);
        } else {
          console.error(err);
        }
      }
    }
  }

  drawMolecule(smiles, target, theme, weights, callback) {
    let parseTree = Parser.parse(smiles);

    if (target === null || target === 'svg') {
      let svg = this.drawer.draw(parseTree, null, theme, weights);
      let dims = this.getDimensions(svg);
      svg.setAttributeNS(null, 'width', '' + dims.w);
      svg.setAttributeNS(null, 'height', '' + dims.h);

      if (callback) {
        callback(svg);
      }
    } else if (target === 'canvas') {
      let canvas = this.svgToCanvas(this.drawer.draw(parseTree, null, theme, weights));

      if (callback) {
        callback(canvas);
      }
    } else if (target === 'img') {
      let img = this.svgToImg(this.drawer.draw(parseTree, null, theme, weights));

      if (callback) {
        callback(img);
      }
    } else if (target instanceof HTMLImageElement) {
      this.svgToImg(this.drawer.draw(parseTree, null, theme, weights), target);

      if (callback) {
        callback(target);
      }
    } else if (target instanceof SVGElement) {
      this.drawer.draw(parseTree, target, theme, weights);

      if (callback) {
        callback(target);
      }
    } else {
      let elements = document.querySelectorAll(target);
      elements.forEach(element => {
        let tag = element.nodeName.toLowerCase();

        if (tag === 'svg') {
          this.drawer.draw(parseTree, element, theme, weights); // let dims = this.getDimensions(element);
          // element.setAttributeNS(null, 'width', '' + dims.w);
          // element.setAttributeNS(null, 'height', '' + dims.h);

          if (callback) {
            callback(element);
          }
        } else if (tag === 'canvas') {
          this.svgToCanvas(this.drawer.draw(parseTree, null, theme, weights), element);

          if (callback) {
            callback(element);
          }
        } else if (tag === 'img') {
          this.svgToImg(this.drawer.draw(parseTree, null, theme, weights), element);

          if (callback) {
            callback(element);
          }
        }
      });
    }
  }

  drawReaction(smiles, target, theme, settings, weights, callback) {
    let reaction = ReactionParser.parse(smiles);

    if (target === null || target === 'svg') {
      let svg = this.reactionDrawer.draw(reaction, null, theme);
      let dims = this.getDimensions(svg);
      svg.setAttributeNS(null, 'width', '' + dims.w);
      svg.setAttributeNS(null, 'height', '' + dims.h);

      if (callback) {
        callback(svg);
      }
    } else if (target === 'canvas') {
      let canvas = this.svgToCanvas(this.reactionDrawer.draw(reaction, null, theme, weights, settings.textAboveArrow, settings.textBelowArrow));

      if (callback) {
        callback(canvas);
      }
    } else if (target === 'img') {
      let img = this.svgToImg(this.reactionDrawer.draw(reaction, null, theme, weights, settings.textAboveArrow, settings.textBelowArrow));

      if (callback) {
        callback(img);
      }
    } else if (target instanceof HTMLImageElement) {
      this.svgToImg(this.reactionDrawer.draw(reaction, null, theme, weights, settings.textAboveArrow, settings.textBelowArrow), target);

      if (callback) {
        callback(target);
      }
    } else if (target instanceof SVGElement) {
      this.reactionDrawer.draw(reaction, target, theme, weights, settings.textAboveArrow, settings.textBelowArrow);

      if (callback) {
        callback(target);
      }
    } else {
      let elements = document.querySelectorAll(target);
      elements.forEach(element => {
        let tag = element.nodeName.toLowerCase();

        if (tag === 'svg') {
          this.reactionDrawer.draw(reaction, element, theme, weights, settings.textAboveArrow, settings.textBelowArrow); // The svg has to have a css width and height set for the other
          // tags, however, here it would overwrite the chosen width and height

          if (this.reactionDrawer.opts.scale <= 0) {
            element.style.width = null;
            element.style.height = null;
          } // let dims = this.getDimensions(element);
          // element.setAttributeNS(null, 'width', '' + dims.w);
          // element.setAttributeNS(null, 'height', '' + dims.h);


          if (callback) {
            callback(element);
          }
        } else if (tag === 'canvas') {
          this.svgToCanvas(this.reactionDrawer.draw(reaction, null, theme, weights, settings.textAboveArrow, settings.textBelowArrow), element);

          if (callback) {
            callback(element);
          }
        } else if (tag === 'img') {
          this.svgToImg(this.reactionDrawer.draw(reaction, null, theme, weights, settings.textAboveArrow, settings.textBelowArrow), element);

          if (callback) {
            callback(element);
          }
        }
      });
    }
  }

  svgToCanvas(svg, canvas = null) {
    if (canvas === null) {
      canvas = document.createElement('canvas');
    }

    let dims = this.getDimensions(canvas, svg);
    SvgWrapper.svgToCanvas(svg, canvas, dims.w, dims.h);
    return canvas;
  }

  svgToImg(svg, img = null) {
    if (img === null) {
      img = document.createElement('img');
    }

    let dims = this.getDimensions(img, svg);
    SvgWrapper.svgToImg(svg, img, dims.w, dims.h);
    return img;
  }
  /**
   * 
   * @param {HTMLImageElement|HTMLCanvasElement|SVGElement} element 
   * @param {SVGElement} svg 
   * @returns {{w: Number, h: Number}} The width and height.
   */


  getDimensions(element, svg = null) {
    let w = this.drawer.opts.width;
    let h = this.drawer.opts.height;

    if (this.drawer.opts.scale <= 0) {
      if (w === null) {
        w = element.width;
      }

      if (h === null) {
        h = element.height;
      }

      if (element.style.width !== "") {
        w = parseInt(element.style.width);
      }

      if (element.style.height !== "") {
        h = parseInt(element.style.height);
      }
    } else if (svg) {
      w = parseFloat(svg.style.width);
      h = parseFloat(svg.style.height);
    }

    return {
      w: w,
      h: h
    };
  }

}

module.exports = SmilesDrawer;

},{"./Drawer":6,"./Options":14,"./Parser":15,"./ReactionDrawer":18,"./ReactionParser":19,"./SvgDrawer":24,"./SvgWrapper":25}],24:[function(require,module,exports){
"use strict";

// we use the drawer to do all the preprocessing. then we take over the drawing
// portion to output to svg
const ArrayHelper = require('./ArrayHelper');

const Atom = require('./Atom');

const DrawerBase = require('./DrawerBase');

const Graph = require('./Graph');

const Line = require('./Line');

const SvgWrapper = require('./SvgWrapper');

const ThemeManager = require('./ThemeManager');

const Vector2 = require('./Vector2');

const GaussDrawer = require('./GaussDrawer');

class SvgDrawer {
  constructor(options, clear = true) {
    this.preprocessor = new DrawerBase(options);
    this.opts = this.preprocessor.opts;
    this.clear = clear;
    this.svgWrapper = null;
  }
  /**
   * Draws the parsed smiles data to an svg element.
   *
   * @param {Object} data The tree returned by the smiles parser.
   * @param {?(String|SVGElement)} target The id of the HTML svg element the structure is drawn to - or the element itself.
   * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
   * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
   *
   * @returns {SVGElement} The svg element
   */


  draw(data, target, themeName = 'light', weights = null, infoOnly = false, highlight_atoms = [], weightsNormalized = false) {
    if (target === null || target === 'svg') {
      target = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      target.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      target.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      target.setAttributeNS(null, 'width', this.opts.width);
      target.setAttributeNS(null, 'height', this.opts.height);
    } else if (target instanceof String) {
      target = document.getElementById(target);
    }

    let optionBackup = {
      padding: this.opts.padding,
      compactDrawing: this.opts.compactDrawing
    }; // Overwrite options when weights are added

    if (weights !== null) {
      this.opts.padding += this.opts.weights.additionalPadding;
      this.opts.compactDrawing = false;
    }

    let preprocessor = this.preprocessor;
    preprocessor.initDraw(data, themeName, infoOnly, highlight_atoms);

    if (!infoOnly) {
      this.themeManager = new ThemeManager(this.opts.themes, themeName);

      if (this.svgWrapper === null || this.clear) {
        this.svgWrapper = new SvgWrapper(this.themeManager, target, this.opts, this.clear);
      }
    }

    preprocessor.processGraph(); // Set the canvas to the appropriate size

    this.svgWrapper.determineDimensions(preprocessor.graph.vertices); // Do the actual drawing

    this.drawAtomHighlights(preprocessor.opts.debug);
    this.drawEdges(preprocessor.opts.debug);
    this.drawVertices(preprocessor.opts.debug);

    if (weights !== null) {
      this.drawWeights(weights, weightsNormalized);
    }

    if (preprocessor.opts.debug) {
      console.log(preprocessor.graph);
      console.log(preprocessor.rings);
      console.log(preprocessor.ringConnections);
    }

    this.svgWrapper.constructSvg(); // Reset options in case weights were added.

    if (weights !== null) {
      this.opts.padding = optionBackup.padding;
      this.opts.compactDrawing = optionBackup.padding;
    }

    return target;
  }
  /**
  * Draws the parsed smiles data to a canvas element.
  *
  * @param {Object} data The tree returned by the smiles parser.
  * @param {(String|HTMLCanvasElement)} target The id of the HTML canvas element the structure is drawn to - or the element itself.
  * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
  * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
  */


  drawCanvas(data, target, themeName = 'light', infoOnly = false) {
    let canvas = null;

    if (typeof target === 'string' || target instanceof String) {
      canvas = document.getElementById(target);
    } else {
      canvas = target;
    }

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); // 500 as a size is arbritrary, but the canvas is scaled when drawn to the canvas anyway

    svg.setAttributeNS(null, 'viewBox', '0 0 ' + 500 + ' ' + 500);
    svg.setAttributeNS(null, 'width', 500 + '');
    svg.setAttributeNS(null, 'height', 500 + '');
    svg.setAttributeNS(null, 'style', 'visibility: hidden: position: absolute; left: -1000px');
    document.body.appendChild(svg);
    this.svgDrawer.draw(data, svg, themeName, infoOnly);
    this.svgDrawer.svgWrapper.toCanvas(canvas, this.svgDrawer.opts.width, this.svgDrawer.opts.height);
    document.body.removeChild(svg);
    return target;
  }
  /**
   * Draws a ring inside a provided ring, indicating aromaticity.
   *
   * @param {Ring} ring A ring.
   */


  drawAromaticityRing(ring) {
    let svgWrapper = this.svgWrapper;
    svgWrapper.drawRing(ring.center.x, ring.center.y, ring.getSize());
  }
  /**
   * Draw the actual edges as bonds.
   *
   * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
   */


  drawEdges(debug) {
    let preprocessor = this.preprocessor,
        graph = preprocessor.graph,
        rings = preprocessor.rings,
        drawn = Array(this.preprocessor.graph.edges.length);
    drawn.fill(false);
    graph.traverseBF(0, vertex => {
      let edges = graph.getEdges(vertex.id);

      for (var i = 0; i < edges.length; i++) {
        let edgeId = edges[i];

        if (!drawn[edgeId]) {
          drawn[edgeId] = true;
          this.drawEdge(edgeId, debug);
        }
      }
    }); // Draw ring for implicitly defined aromatic rings

    if (!this.bridgedRing) {
      for (var i = 0; i < rings.length; i++) {
        let ring = rings[i]; //TODO: uses canvas ctx to draw... need to update this to SVG

        if (preprocessor.isRingAromatic(ring)) {
          this.drawAromaticityRing(ring);
        }
      }
    }
  }
  /**
   * Draw the an edge as a bond.
   *
   * @param {Number} edgeId An edge id.
   * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
   */


  drawEdge(edgeId, debug) {
    let preprocessor = this.preprocessor,
        opts = preprocessor.opts,
        svgWrapper = this.svgWrapper,
        edge = preprocessor.graph.edges[edgeId],
        vertexA = preprocessor.graph.vertices[edge.sourceId],
        vertexB = preprocessor.graph.vertices[edge.targetId],
        elementA = vertexA.value.element,
        elementB = vertexB.value.element;

    if ((!vertexA.value.isDrawn || !vertexB.value.isDrawn) && preprocessor.opts.atomVisualization === 'default') {
      return;
    }

    let a = vertexA.position,
        b = vertexB.position,
        normals = preprocessor.getEdgeNormals(edge),
        // Create a point on each side of the line
    sides = ArrayHelper.clone(normals);
    sides[0].multiplyScalar(10).add(a);
    sides[1].multiplyScalar(10).add(a);

    if (edge.bondType === '=' || preprocessor.getRingbondType(vertexA, vertexB) === '=' || edge.isPartOfAromaticRing && preprocessor.bridgedRing) {
      // Always draw double bonds inside the ring
      let inRing = preprocessor.areVerticesInSameRing(vertexA, vertexB);
      let s = preprocessor.chooseSide(vertexA, vertexB, sides);

      if (inRing) {
        // Always draw double bonds inside a ring
        // if the bond is shared by two rings, it is drawn in the larger
        // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
        let lcr = preprocessor.getLargestOrAromaticCommonRing(vertexA, vertexB);
        let center = lcr.center;
        normals[0].multiplyScalar(opts.bondSpacing);
        normals[1].multiplyScalar(opts.bondSpacing); // Choose the normal that is on the same side as the center

        let line = null;

        if (center.sameSideAs(vertexA.position, vertexB.position, Vector2.add(a, normals[0]))) {
          line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
        } else {
          line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        }

        line.shorten(opts.bondLength - opts.shortBondLength * opts.bondLength); // The shortened edge

        if (edge.isPartOfAromaticRing) {
          // preprocessor.canvasWrapper.drawLine(line, true);
          svgWrapper.drawLine(line, true);
        } else {
          // preprocessor.canvasWrapper.drawLine(line);
          svgWrapper.drawLine(line);
        }

        svgWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else if (edge.center || vertexA.isTerminal() && vertexB.isTerminal() || s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
        this.multiplyNormals(normals, opts.halfBondSpacing);
        let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB),
            lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        svgWrapper.drawLine(lineA);
        svgWrapper.drawLine(lineB);
      } else if (s.sideCount[0] > s.sideCount[1] || s.totalSideCount[0] > s.totalSideCount[1]) {
        this.multiplyNormals(normals, opts.bondSpacing);
        let line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
        line.shorten(opts.bondLength - opts.shortBondLength * opts.bondLength);
        svgWrapper.drawLine(line);
        svgWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else if (s.sideCount[0] < s.sideCount[1] || s.totalSideCount[0] <= s.totalSideCount[1]) {
        this.multiplyNormals(normals, opts.bondSpacing);
        let line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        line.shorten(opts.bondLength - opts.shortBondLength * opts.bondLength);
        svgWrapper.drawLine(line);
        svgWrapper.drawLine(new Line(a, b, elementA, elementB));
      }
    } else if (edge.bondType === '#') {
      normals[0].multiplyScalar(opts.bondSpacing / 1.5);
      normals[1].multiplyScalar(opts.bondSpacing / 1.5);
      let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
      let lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
      svgWrapper.drawLine(lineA);
      svgWrapper.drawLine(lineB);
      svgWrapper.drawLine(new Line(a, b, elementA, elementB));
    } else if (edge.bondType === '.') {// TODO: Something... maybe... version 2?
    } else {
      let isChiralCenterA = vertexA.value.isStereoCenter;
      let isChiralCenterB = vertexB.value.isStereoCenter;

      if (edge.wedge === 'up') {
        svgWrapper.drawWedge(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      } else if (edge.wedge === 'down') {
        svgWrapper.drawDashedWedge(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      } else {
        svgWrapper.drawLine(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      }
    }

    if (debug) {
      let midpoint = Vector2.midpoint(a, b);
      svgWrapper.drawDebugText(midpoint.x, midpoint.y, 'e: ' + edgeId);
    }
  }
  /**
   * Draw the highlights for atoms to the canvas.
   * 
   * @param {Boolean} debug 
   */


  drawAtomHighlights(debug) {
    let preprocessor = this.preprocessor;
    let opts = preprocessor.opts;
    let graph = preprocessor.graph;
    let rings = preprocessor.rings;
    let svgWrapper = this.svgWrapper;

    for (var i = 0; i < graph.vertices.length; i++) {
      let vertex = graph.vertices[i];
      let atom = vertex.value;

      for (var j = 0; j < preprocessor.highlight_atoms.length; j++) {
        let highlight = preprocessor.highlight_atoms[j];

        if (atom.class === highlight[0]) {
          svgWrapper.drawAtomHighlight(vertex.position.x, vertex.position.y, highlight[1]);
        }
      }
    }
  }
  /**
   * Draws the vertices representing atoms to the canvas.
   *
   * @param {Boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
   */


  drawVertices(debug) {
    let preprocessor = this.preprocessor,
        opts = preprocessor.opts,
        graph = preprocessor.graph,
        rings = preprocessor.rings,
        svgWrapper = this.svgWrapper;
    var i = graph.vertices.length;

    for (var i = 0; i < graph.vertices.length; i++) {
      let vertex = graph.vertices[i];
      let atom = vertex.value;
      let charge = 0;
      let isotope = 0;
      let bondCount = vertex.value.bondCount;
      let element = atom.element;
      let hydrogens = Atom.maxBonds[element] - bondCount;
      let dir = vertex.getTextDirection(graph.vertices);
      let isTerminal = opts.terminalCarbons || element !== 'C' || atom.hasAttachedPseudoElements ? vertex.isTerminal() : false;
      let isCarbon = atom.element === 'C'; // This is a HACK to remove all hydrogens from nitrogens in aromatic rings, as this
      // should be the most common state. This has to be fixed by kekulization

      if (atom.element === 'N' && atom.isPartOfAromaticRing) {
        hydrogens = 0;
      }

      if (atom.bracket) {
        hydrogens = atom.bracket.hcount;
        charge = atom.bracket.charge;
        isotope = atom.bracket.isotope;
      }

      if (opts.atomVisualization === 'allballs') {
        svgWrapper.drawBall(vertex.position.x, vertex.position.y, element);
      } else if (atom.isDrawn && (!isCarbon || atom.drawExplicit || isTerminal || atom.hasAttachedPseudoElements) || graph.vertices.length === 1) {
        if (opts.atomVisualization === 'default') {
          let attachedPseudoElements = atom.getAttachedPseudoElements(); // Draw to the right if the whole molecule is concatenated into one string

          if (atom.hasAttachedPseudoElements && graph.vertices.length === Object.keys(attachedPseudoElements).length + 1) {
            dir = 'right';
          }

          svgWrapper.drawText(vertex.position.x, vertex.position.y, element, hydrogens, dir, isTerminal, charge, isotope, graph.vertices.length, attachedPseudoElements);
        } else if (opts.atomVisualization === 'balls') {
          svgWrapper.drawBall(vertex.position.x, vertex.position.y, element);
        }
      } else if (vertex.getNeighbourCount() === 2 && vertex.forcePositioned == true) {
        // If there is a carbon which bonds are in a straight line, draw a dot
        let a = graph.vertices[vertex.neighbours[0]].position;
        let b = graph.vertices[vertex.neighbours[1]].position;
        let angle = Vector2.threePointangle(vertex.position, a, b);

        if (Math.abs(Math.PI - angle) < 0.1) {
          svgWrapper.drawPoint(vertex.position.x, vertex.position.y, element);
        }
      }

      if (debug) {
        let value = 'v: ' + vertex.id + ' ' + ArrayHelper.print(atom.ringbonds);
        svgWrapper.drawDebugText(vertex.position.x, vertex.position.y, value);
      } // else {
      //   svgWrapper.drawDebugText(vertex.position.x, vertex.position.y, vertex.value.chirality);
      // }

    } // Draw the ring centers for debug purposes


    if (opts.debug) {
      for (var i = 0; i < rings.length; i++) {
        let center = rings[i].center;
        svgWrapper.drawDebugPoint(center.x, center.y, 'r: ' + rings[i].id);
      }
    }
  }
  /**
   * Draw the weights on a background image.
   * @param {Number[]} weights The weights assigned to each atom.
   */


  drawWeights(weights, weightsNormalized) {
    if (weights.every(w => w === 0)) {
      return;
    }

    if (weights.length !== this.preprocessor.graph.atomIdxToVertexId.length) {
      throw new Error('The number of weights supplied must be equal to the number of (heavy) atoms in the molecule.');
    }

    let points = [];

    for (const atomIdx of this.preprocessor.graph.atomIdxToVertexId) {
      let vertex = this.preprocessor.graph.vertices[atomIdx];
      points.push(new Vector2(vertex.position.x - this.svgWrapper.minX, vertex.position.y - this.svgWrapper.minY));
    }

    let gd = new GaussDrawer(points, weights, this.svgWrapper.drawingWidth, this.svgWrapper.drawingHeight, this.opts.weights.sigma, this.opts.weights.interval, this.opts.weights.colormap, this.opts.weights.opacity, weightsNormalized);
    gd.draw();
    this.svgWrapper.addLayer(gd.getSVG());
  }
  /**
   * Returns the total overlap score of the current molecule.
   *
   * @returns {Number} The overlap score.
   */


  getTotalOverlapScore() {
    return this.preprocessor.getTotalOverlapScore();
  }
  /**
   * Returns the molecular formula of the loaded molecule as a string.
   *
   * @returns {String} The molecular formula.
   */


  getMolecularFormula(graph = null) {
    return this.preprocessor.getMolecularFormula(graph);
  }
  /**
   * @param {Array} normals list of normals to multiply
   * @param {Number} spacing value to multiply normals by
   */


  multiplyNormals(normals, spacing) {
    normals[0].multiplyScalar(spacing);
    normals[1].multiplyScalar(spacing);
  }

}

module.exports = SvgDrawer;

},{"./ArrayHelper":3,"./Atom":4,"./DrawerBase":7,"./GaussDrawer":10,"./Graph":11,"./Line":12,"./SvgWrapper":25,"./ThemeManager":26,"./Vector2":28}],25:[function(require,module,exports){
"use strict";

const {
  getChargeText
} = require('./UtilityFunctions');

const Line = require('./Line');

const Vector2 = require('./Vector2');

const MathHelper = require('./MathHelper');

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

class SvgWrapper {
  constructor(themeManager, target, options, clear = true) {
    if (typeof target === 'string' || target instanceof String) {
      this.svg = document.getElementById(target);
    } else {
      this.svg = target;
    }

    this.container = null;
    this.opts = options;
    this.uid = makeid(5);
    this.gradientId = 0; // maintain a list of line elements and their corresponding gradients
    // maintain a list of vertex elements
    // maintain a list of highlighting elements

    this.backgroundItems = [];
    this.paths = [];
    this.vertices = [];
    this.gradients = [];
    this.highlights = []; // maintain the dimensions

    this.drawingWidth = 0;
    this.drawingHeight = 0;
    this.halfBondThickness = this.opts.bondThickness / 2.0; // for managing color schemes

    this.themeManager = themeManager; // create the mask

    this.maskElements = []; // min and max values of the coordinates

    this.maxX = -Number.MAX_VALUE;
    this.maxY = -Number.MAX_VALUE;
    this.minX = Number.MAX_VALUE;
    this.minY = Number.MAX_VALUE; // clear the svg element

    if (clear) {
      while (this.svg.firstChild) {
        this.svg.removeChild(this.svg.firstChild);
      }
    } // Create styles here as text measurement is done before constructSvg


    this.style = document.createElementNS('http://www.w3.org/2000/svg', 'style'); // create the css styles

    this.style.appendChild(document.createTextNode(`
                .element {
                    font: ${this.opts.fontSizeLarge}pt ${this.opts.fontFamily};
                }
                .sub {
                    font: ${this.opts.fontSizeSmall}pt ${this.opts.fontFamily};
                }
            `));

    if (this.svg) {
      this.svg.appendChild(this.style);
    } else {
      this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(this.style);
    }
  }

  constructSvg() {
    // TODO: add the defs element to put gradients in
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
        masks = document.createElementNS('http://www.w3.org/2000/svg', 'mask'),
        background = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
        highlights = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
        paths = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
        vertices = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
        pathChildNodes = this.paths;
    let mask = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    mask.setAttributeNS(null, 'x', this.minX);
    mask.setAttributeNS(null, 'y', this.minY);
    mask.setAttributeNS(null, 'width', this.maxX - this.minX);
    mask.setAttributeNS(null, 'height', this.maxY - this.minY);
    mask.setAttributeNS(null, 'fill', 'white');
    masks.appendChild(mask); // give the mask an id

    masks.setAttributeNS(null, 'id', this.uid + '-text-mask');

    for (let path of pathChildNodes) {
      paths.appendChild(path);
    }

    for (let backgroundItem of this.backgroundItems) {
      background.appendChild(backgroundItem);
    }

    for (let highlight of this.highlights) {
      highlights.appendChild(highlight);
    }

    for (let vertex of this.vertices) {
      vertices.appendChild(vertex);
    }

    for (let mask of this.maskElements) {
      masks.appendChild(mask);
    }

    for (let gradient of this.gradients) {
      defs.appendChild(gradient);
    }

    paths.setAttributeNS(null, 'mask', 'url(#' + this.uid + '-text-mask)');
    this.updateViewbox(this.opts.scale); // Position the background

    background.setAttributeNS(null, 'style', `transform: translateX(${this.minX}px) translateY(${this.minY}px)`);

    if (this.svg) {
      this.svg.appendChild(defs);
      this.svg.appendChild(masks);
      this.svg.appendChild(background);
      this.svg.appendChild(highlights);
      this.svg.appendChild(paths);
      this.svg.appendChild(vertices);
    } else {
      this.container.appendChild(defs);
      this.container.appendChild(masks);
      this.container.appendChild(background);
      this.container.appendChild(paths);
      this.container.appendChild(vertices);
      return this.container;
    }
  }
  /**
   * Add a background to the svg.
   */


  addLayer(svg) {
    this.backgroundItems.push(svg.firstChild);
  }
  /**
   * Create a linear gradient to apply to a line
   *
   * @param {Line} line the line to apply the gradiation to.
   */


  createGradient(line) {
    // create the gradient and add it
    let gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient'),
        gradientUrl = this.uid + `-line-${this.gradientId++}`,
        l = line.getLeftVector(),
        r = line.getRightVector(),
        fromX = l.x,
        fromY = l.y,
        toX = r.x,
        toY = r.y;
    gradient.setAttributeNS(null, 'id', gradientUrl);
    gradient.setAttributeNS(null, 'gradientUnits', 'userSpaceOnUse');
    gradient.setAttributeNS(null, 'x1', fromX);
    gradient.setAttributeNS(null, 'y1', fromY);
    gradient.setAttributeNS(null, 'x2', toX);
    gradient.setAttributeNS(null, 'y2', toY);
    let firstStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    firstStop.setAttributeNS(null, 'stop-color', this.themeManager.getColor(line.getLeftElement()) || this.themeManager.getColor('C'));
    firstStop.setAttributeNS(null, 'offset', '20%');
    let secondStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    secondStop.setAttributeNS(null, 'stop-color', this.themeManager.getColor(line.getRightElement() || this.themeManager.getColor('C')));
    secondStop.setAttributeNS(null, 'offset', '100%');
    gradient.appendChild(firstStop);
    gradient.appendChild(secondStop);
    this.gradients.push(gradient);
    return gradientUrl;
  }
  /**
   * Create a tspan element for sub or super scripts that styles the text
   * appropriately as one of those text types.
   *
   * @param {String} text the actual text
   * @param {String} shift the type of text, either 'sub', or 'super'
   */


  createSubSuperScripts(text, shift) {
    let elem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    elem.setAttributeNS(null, 'baseline-shift', shift);
    elem.appendChild(document.createTextNode(text));
    elem.setAttributeNS(null, 'class', 'sub');
    return elem;
  }

  static createUnicodeCharge(n) {
    if (n === 1) {
      return '⁺';
    }

    if (n === -1) {
      return '⁻';
    }

    if (n > 1) {
      return SvgWrapper.createUnicodeSuperscript(n) + '⁺';
    }

    if (n < -1) {
      return SvgWrapper.createUnicodeSuperscript(n) + '⁻';
    }

    return '';
  }
  /**
   * Determine drawing dimensiosn based on vertex positions.
   *
   * @param {Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
   */


  determineDimensions(vertices) {
    for (var i = 0; i < vertices.length; i++) {
      if (!vertices[i].value.isDrawn) {
        continue;
      }

      let p = vertices[i].position;
      if (this.maxX < p.x) this.maxX = p.x;
      if (this.maxY < p.y) this.maxY = p.y;
      if (this.minX > p.x) this.minX = p.x;
      if (this.minY > p.y) this.minY = p.y;
    } // Add padding


    let padding = this.opts.padding;
    this.maxX += padding;
    this.maxY += padding;
    this.minX -= padding;
    this.minY -= padding;
    this.drawingWidth = this.maxX - this.minX;
    this.drawingHeight = this.maxY - this.minY;
  }

  updateViewbox(scale) {
    let x = this.minX;
    let y = this.minY;
    let width = this.maxX - this.minX;
    let height = this.maxY - this.minY;

    if (scale <= 0.0) {
      if (width > height) {
        let diff = width - height;
        height = width;
        y -= diff / 2.0;
      } else {
        let diff = height - width;
        width = height;
        x -= diff / 2.0;
      }
    } else {
      if (this.svg) {
        this.svg.style.width = scale * width + 'px';
        this.svg.style.height = scale * height + 'px';
      }
    }

    this.svg.setAttributeNS(null, 'viewBox', `${x} ${y} ${width} ${height}`);
  }
  /**
   * Draw an svg ellipse as a ball.
   *
   * @param {Number} x The x position of the text.
   * @param {Number} y The y position of the text.
   * @param {String} elementName The name of the element (single-letter).
   */


  drawBall(x, y, elementName) {
    let r = this.opts.bondLength / 4.5;

    if (x - r < this.minX) {
      this.minX = x - r;
    }

    if (x + r > this.maxX) {
      this.maxX = x + r;
    }

    if (y - r < this.minY) {
      this.minY = y - r;
    }

    if (y + r > this.maxY) {
      this.maxY = y + r;
    }

    let ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ball.setAttributeNS(null, 'cx', x);
    ball.setAttributeNS(null, 'cy', y);
    ball.setAttributeNS(null, 'r', r);
    ball.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));
    this.vertices.push(ball);
  }
  /**
   * @param {Line} line the line object to create the wedge from
   */


  drawWedge(line) {
    let l = line.getLeftVector().clone(),
        r = line.getRightVector().clone();
    let normals = Vector2.normals(l, r);
    normals[0].normalize();
    normals[1].normalize();
    let isRightChiralCenter = line.getRightChiral();
    let start = l,
        end = r;

    if (isRightChiralCenter) {
      start = r;
      end = l;
    }

    let t = Vector2.add(start, Vector2.multiplyScalar(normals[0], this.halfBondThickness)),
        u = Vector2.add(end, Vector2.multiplyScalar(normals[0], 3.0 + this.opts.fontSizeLarge / 4.0)),
        v = Vector2.add(end, Vector2.multiplyScalar(normals[1], 3.0 + this.opts.fontSizeLarge / 4.0)),
        w = Vector2.add(start, Vector2.multiplyScalar(normals[1], this.halfBondThickness));
    let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'),
        gradient = this.createGradient(line, l.x, l.y, r.x, r.y);
    polygon.setAttributeNS(null, 'points', `${t.x},${t.y} ${u.x},${u.y} ${v.x},${v.y} ${w.x},${w.y}`);
    polygon.setAttributeNS(null, 'fill', `url('#${gradient}')`);
    this.paths.push(polygon);
  }
  /* Draw a highlight for an atom
   * 
   *  @param {Number} x The x position of the highlight
   *  @param {Number} y The y position of the highlight
   *  @param {string} color The color of the highlight, default #03fc9d
   */


  drawAtomHighlight(x, y, color = "#03fc9d") {
    let ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ball.setAttributeNS(null, 'cx', x);
    ball.setAttributeNS(null, 'cy', y);
    ball.setAttributeNS(null, 'r', this.opts.bondLength / 3);
    ball.setAttributeNS(null, 'fill', color);
    this.highlights.push(ball);
  }
  /**
   * Draw a dashed wedge on the canvas.
   *
   * @param {Line} line A line.
   */


  drawDashedWedge(line) {
    if (isNaN(line.from.x) || isNaN(line.from.y) || isNaN(line.to.x) || isNaN(line.to.y)) {
      return;
    }

    let l = line.getLeftVector().clone(),
        r = line.getRightVector().clone(),
        normals = Vector2.normals(l, r);
    normals[0].normalize();
    normals[1].normalize();
    let isRightChiralCenter = line.getRightChiral(),
        start,
        end;

    if (isRightChiralCenter) {
      start = r;
      end = l;
    } else {
      start = l;
      end = r;
    }

    let dir = Vector2.subtract(end, start).normalize(),
        length = line.getLength(),
        step = 1.25 / (length / (this.opts.bondLength / 10.0)),
        changed = false;
    let gradient = this.createGradient(line);

    for (let t = 0.0; t < 1.0; t += step) {
      let to = Vector2.multiplyScalar(dir, t * length),
          startDash = Vector2.add(start, to),
          width = this.opts.fontSizeLarge / 2.0 * t,
          dashOffset = Vector2.multiplyScalar(normals[0], width);
      startDash.subtract(dashOffset);
      let endDash = startDash.clone();
      endDash.add(Vector2.multiplyScalar(dashOffset, 2.0));
      this.drawLine(new Line(startDash, endDash), null, gradient);
    }
  }
  /**
   * Draws a debug dot at a given coordinate and adds text.
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordindate.
   * @param {String} [debugText=''] A string.
   * @param {String} [color='#f00'] A color in hex form.
   */


  drawDebugPoint(x, y, debugText = '', color = '#f00') {
    let point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttributeNS(null, 'cx', x);
    point.setAttributeNS(null, 'cy', y);
    point.setAttributeNS(null, 'r', '2');
    point.setAttributeNS(null, 'fill', '#f00');
    this.vertices.push(point);
    this.drawDebugText(x, y, debugText);
  }
  /**
   * Draws a debug text message at a given position
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordinate.
   * @param {String} text The debug text.
   */


  drawDebugText(x, y, text) {
    let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttributeNS(null, 'x', x);
    textElem.setAttributeNS(null, 'y', y);
    textElem.setAttributeNS(null, 'class', 'debug');
    textElem.setAttributeNS(null, 'fill', '#ff0000');
    textElem.setAttributeNS(null, 'style', `
                font: 5px Droid Sans, sans-serif;
            `);
    textElem.appendChild(document.createTextNode(text));
    this.vertices.push(textElem);
  }
  /**
   * Draws a ring.
   *
   * @param {x} x The x coordinate of the ring.
   * @param {y} r The y coordinate of the ring.
   * @param {s} s The size of the ring.
   */


  drawRing(x, y, s) {
    let circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let radius = MathHelper.apothemFromSideLength(this.opts.bondLength, s);
    circleElem.setAttributeNS(null, 'cx', x);
    circleElem.setAttributeNS(null, 'cy', y);
    circleElem.setAttributeNS(null, 'r', radius - this.opts.bondSpacing);
    circleElem.setAttributeNS(null, 'stroke', this.themeManager.getColor('C'));
    circleElem.setAttributeNS(null, 'stroke-width', this.opts.bondThickness);
    circleElem.setAttributeNS(null, 'fill', 'none');
    this.paths.push(circleElem);
  }
  /**
   * Draws a line.
   *
   * @param {Line} line A line.
   * @param {Boolean} dashed defaults to false.
   * @param {String} gradient gradient url. Defaults to null.
   */


  drawLine(line, dashed = false, gradient = null, linecap = 'round') {
    let opts = this.opts,
        stylesArr = [['stroke-width', this.opts.bondThickness], ['stroke-linecap', linecap], ['stroke-dasharray', dashed ? '5, 5' : 'none']],
        l = line.getLeftVector(),
        r = line.getRightVector(),
        fromX = l.x,
        fromY = l.y,
        toX = r.x,
        toY = r.y;
    let styles = stylesArr.map(sub => sub.join(':')).join(';'),
        lineElem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineElem.setAttributeNS(null, 'x1', fromX);
    lineElem.setAttributeNS(null, 'y1', fromY);
    lineElem.setAttributeNS(null, 'x2', toX);
    lineElem.setAttributeNS(null, 'y2', toY);
    lineElem.setAttributeNS(null, 'style', styles);
    this.paths.push(lineElem);

    if (gradient == null) {
      gradient = this.createGradient(line, fromX, fromY, toX, toY);
    }

    lineElem.setAttributeNS(null, 'stroke', `url('#${gradient}')`);
  }
  /**
   * Draw a point.
   *
   * @param {Number} x The x position of the point.
   * @param {Number} y The y position of the point.
   * @param {String} elementName The name of the element (single-letter).
   */


  drawPoint(x, y, elementName) {
    let r = 0.75;

    if (x - r < this.minX) {
      this.minX = x - r;
    }

    if (x + r > this.maxX) {
      this.maxX = x + r;
    }

    if (y - r < this.minY) {
      this.minY = y - r;
    }

    if (y + r > this.maxY) {
      this.maxY = y + r;
    } // first create a mask


    let mask = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    mask.setAttributeNS(null, 'cx', x);
    mask.setAttributeNS(null, 'cy', y);
    mask.setAttributeNS(null, 'r', '1.5');
    mask.setAttributeNS(null, 'fill', 'black');
    this.maskElements.push(mask); // now create the point

    let point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttributeNS(null, 'cx', x);
    point.setAttributeNS(null, 'cy', y);
    point.setAttributeNS(null, 'r', r);
    point.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));
    this.vertices.push(point);
  }
  /**
   * Draw a text to the canvas.
   *
   * @param {Number} x The x position of the text.
   * @param {Number} y The y position of the text.
   * @param {String} elementName The name of the element (single-letter).
   * @param {Number} hydrogens The number of hydrogen atoms.
   * @param {String} direction The direction of the text in relation to the associated vertex.
   * @param {Boolean} isTerminal A boolean indicating whether or not the vertex is terminal.
   * @param {Number} charge The charge of the atom.
   * @param {Number} isotope The isotope number.
   * @param {Number} totalVertices The total number of vertices in the graph.
   * @param {Object} attachedPseudoElement A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count.
   * @param {String} attachedPseudoElement.element The element symbol.
   * @param {Number} attachedPseudoElement.count The number of occurences that match the key.
   * @param {Number} attachedPseudoElement.hyrogenCount The number of hydrogens attached to each atom matching the key.
   */


  drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, totalVertices, attachedPseudoElement = {}) {
    let text = [];
    let display = elementName;

    if (charge !== 0 && charge !== null) {
      display += SvgWrapper.createUnicodeCharge(charge);
    }

    if (isotope !== 0 && isotope !== null) {
      display = SvgWrapper.createUnicodeSuperscript(isotope) + display;
    }

    text.push([display, elementName]);

    if (hydrogens === 1) {
      text.push(['H', 'H']);
    } else if (hydrogens > 1) {
      text.push(['H' + SvgWrapper.createUnicodeSubscript(hydrogens), 'H']);
    } // TODO: Better handle exceptions
    // Exception for nitro (draw nitro as NO2 instead of N+O-O)


    if (charge === 1 && elementName === 'N' && attachedPseudoElement.hasOwnProperty('0O') && attachedPseudoElement.hasOwnProperty('0O-1')) {
      attachedPseudoElement = {
        '0O': {
          element: 'O',
          count: 2,
          hydrogenCount: 0,
          previousElement: 'C',
          charge: ''
        }
      };
      charge = 0;
    }

    for (let key in attachedPseudoElement) {
      if (!attachedPseudoElement.hasOwnProperty(key)) {
        continue;
      }

      let pe = attachedPseudoElement[key];
      let display = pe.element;

      if (pe.count > 1) {
        display += SvgWrapper.createUnicodeSubscript(pe.count);
      }

      if (pe.charge !== '') {
        display += SvgWrapper.createUnicodeCharge(charge);
      }

      text.push([display, pe.element]);

      if (pe.hydrogenCount === 1) {
        text.push(['H', 'H']);
      } else if (pe.hydrogenCount > 1) {
        text.push(['H' + SvgWrapper.createUnicodeSubscript(pe.hydrogenCount), 'H']);
      }
    }

    this.write(text, direction, x, y, totalVertices === 1);
  }

  write(text, direction, x, y, singleVertex) {
    // Measure element name only, without charge or isotope ...
    let bbox = SvgWrapper.measureText(text[0][1], this.opts.fontSizeLarge, this.opts.fontFamily); // ... but for direction left move to the right to 

    if (direction === 'left' && text[0][0] !== text[0][1]) {
      bbox.width *= 2.0;
    } // Get the approximate width and height of text and add update max/min
    // to allow for narrower paddings


    if (singleVertex) {
      if (x + bbox.width * text.length > this.maxX) {
        this.maxX = x + bbox.width * text.length;
      }

      if (x - bbox.width / 2.0 < this.minX) {
        this.minX = x - bbox.width / 2.0;
      }

      if (y - bbox.height < this.minY) {
        this.minY = y - bbox.height;
      }

      if (y + bbox.height > this.maxY) {
        this.maxY = y + bbox.height;
      }
    } else {
      if (direction !== 'right') {
        if (x + bbox.width * text.length > this.maxX) {
          this.maxX = x + bbox.width * text.length;
        }

        if (x - bbox.width * text.length < this.minX) {
          this.minX = x - bbox.width * text.length;
        }
      } else if (direction !== 'left') {
        if (x + bbox.width * text.length > this.maxX) {
          this.maxX = x + bbox.width * text.length;
        }

        if (x - bbox.width / 2.0 < this.minX) {
          this.minX = x - bbox.width / 2.0;
        }
      }

      if (y - bbox.height < this.minY) {
        this.minY = y - bbox.height;
      }

      if (y + bbox.height > this.maxY) {
        this.maxY = y + bbox.height;
      }

      if (direction === 'down') {
        if (y + 0.8 * bbox.height * text.length > this.maxY) {
          this.maxY = y + 0.8 * bbox.height * text.length;
        }
      }

      if (direction === 'up') {
        if (y - 0.8 * bbox.height * text.length < this.minY) {
          this.minY = y - 0.8 * bbox.height * text.length;
        }
      }
    }

    let cx = x;
    let cy = y; // Draw the text

    let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttributeNS(null, 'class', 'element');
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    textElem.setAttributeNS(null, 'fill', '#ffffff');

    if (direction === 'left') {
      text = text.reverse();
    }

    if (direction === 'right' || direction === 'down' || direction === 'up') {
      x -= bbox.width / 2.0;
    }

    if (direction === 'left') {
      x += bbox.width / 2.0;
    }

    text.forEach((part, i) => {
      const display = part[0];
      const elementName = part[1];
      let tspanElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspanElem.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));
      tspanElem.textContent = display;

      if (direction === 'up' || direction === 'down') {
        tspanElem.setAttributeNS(null, 'x', '0px');

        if (direction === 'up') {
          tspanElem.setAttributeNS(null, 'y', `-${0.9 * i}em`);
        } else {
          tspanElem.setAttributeNS(null, 'y', `${0.9 * i}em`);
        }
      }

      textElem.appendChild(tspanElem);
    });
    textElem.setAttributeNS(null, 'data-direction', direction);

    if (direction === 'left' || direction === 'right') {
      textElem.setAttributeNS(null, 'dominant-baseline', 'alphabetic');
      textElem.setAttributeNS(null, 'y', '0.36em');
    } else {
      textElem.setAttributeNS(null, 'dominant-baseline', 'central');
    }

    if (direction === 'left') {
      textElem.setAttributeNS(null, 'text-anchor', 'end');
    }

    g.appendChild(textElem);
    g.setAttributeNS(null, 'style', `transform: translateX(${x}px) translateY(${y}px)`);
    let maskRadius = this.opts.fontSizeLarge * 0.75;

    if (text[0][1].length > 1) {
      maskRadius = this.opts.fontSizeLarge * 1.1;
    }

    let mask = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    mask.setAttributeNS(null, 'cx', cx);
    mask.setAttributeNS(null, 'cy', cy);
    mask.setAttributeNS(null, 'r', maskRadius);
    mask.setAttributeNS(null, 'fill', 'black');
    this.maskElements.push(mask);
    this.vertices.push(g);
  }
  /**
   * Draw the wrapped SVG to a canvas.
   * @param {HTMLCanvasElement} canvas The canvas element to draw the svg to.
   */


  toCanvas(canvas, width, height) {
    if (typeof canvas === 'string' || canvas instanceof String) {
      canvas = document.getElementById(canvas);
    }

    let image = new Image();

    image.onload = function () {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    };

    image.src = 'data:image/svg+xml;charset-utf-8,' + encodeURIComponent(this.svg.outerHTML);
  }

  static createUnicodeSubscript(n) {
    let result = '';
    n.toString().split('').forEach(d => {
      result += ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'][parseInt(d)];
    });
    return result;
  }

  static createUnicodeSuperscript(n) {
    let result = '';
    n.toString().split('').forEach(d => {
      result += ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][parseInt(d)];
    });
    return result;
  }

  static replaceNumbersWithSubscript(text) {
    let subscriptNumbers = {
      '0': '₀',
      '1': '₁',
      '2': '₂',
      '3': '₃',
      '4': '₄',
      '5': '₅',
      '6': '₆',
      '7': '₇',
      '8': '₈',
      '9': '₉'
    };

    for (const [key, value] of Object.entries(subscriptNumbers)) {
      text = text.replaceAll(key, value);
    }

    return text;
  }

  static measureText(text, fontSize, fontFamily, lineHeight = 0.9) {
    const element = document.createElement('canvas');
    const ctx = element.getContext("2d");
    ctx.font = `${fontSize}pt ${fontFamily}`;
    let textMetrics = ctx.measureText(text);
    let compWidth = Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight);
    return {
      'width': textMetrics.width > compWidth ? textMetrics.width : compWidth,
      'height': (Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxAscent)) * lineHeight
    };
  }
  /**
   * Convert an SVG to a canvas. Warning: This happens async!
   * 
   * @param {SVGElement} svg 
   * @param {HTMLCanvasElement} canvas 
   * @param {Number} width 
   * @param {Number} height 
   * @param {CallableFunction} callback
   * @returns {HTMLCanvasElement} The input html canvas element after drawing to.
   */


  static svgToCanvas(svg, canvas, width, height, callback = null) {
    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);
    let image = new Image();

    image.onload = function () {
      canvas.width = width;
      canvas.height = height;
      let context = canvas.getContext('2d');
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, width, height);

      if (callback) {
        callback(canvas);
      }
    };

    image.onerror = function (err) {
      console.log(err);
    };

    image.src = 'data:image/svg+xml;charset-utf-8,' + encodeURIComponent(svg.outerHTML);
    return canvas;
  }
  /**
   * Convert an SVG to a canvas. Warning: This happens async!
   * 
   * @param {SVGElement} svg 
   * @param {HTMLImageElement} canvas 
   * @param {Number} width 
   * @param {Number} height
   */


  static svgToImg(svg, img, width, height) {
    let canvas = document.createElement('canvas');
    this.svgToCanvas(svg, canvas, width, height, result => {
      img.src = canvas.toDataURL("image/png");
    });
  }
  /**
   * Create an SVG element containing text.
   * @param {String} text 
   * @param {*} themeManager 
   * @param {*} options 
   * @returns {{svg: SVGElement, width: Number, height: Number}} The SVG element containing the text and its dimensions.
   */


  static writeText(text, themeManager, fontSize, fontFamily, maxWidth = Number.MAX_SAFE_INTEGER) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.appendChild(document.createTextNode(`
        .text {
            font: ${fontSize}pt ${fontFamily};
            dominant-baseline: ideographic;
        }
    `));
    svg.appendChild(style);
    let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttributeNS(null, 'class', 'text');
    let maxLineWidth = 0.0;
    let totalHeight = 0.0;
    let lines = [];
    text.split("\n").forEach(line => {
      let dims = SvgWrapper.measureText(line, fontSize, fontFamily, 1.0);

      if (dims.width >= maxWidth) {
        let totalWordsWidth = 0.0;
        let maxWordsHeight = 0.0;
        let words = line.split(" ");
        let offset = 0;

        for (let i = 0; i < words.length; i++) {
          let wordDims = SvgWrapper.measureText(words[i], fontSize, fontFamily, 1.0);

          if (totalWordsWidth + wordDims.width > maxWidth) {
            lines.push({
              text: words.slice(offset, i).join(' '),
              width: totalWordsWidth,
              height: maxWordsHeight
            });
            totalWordsWidth = 0.0;
            maxWordsHeight = 0.0;
            offset = i;
          }

          if (wordDims.height > maxWordsHeight) {
            maxWordsHeight = wordDims.height;
          }

          totalWordsWidth += wordDims.width;
        }

        if (offset < words.length) {
          lines.push({
            text: words.slice(offset, words.length).join(' '),
            width: totalWordsWidth,
            height: maxWordsHeight
          });
        }
      } else {
        lines.push({
          text: line,
          width: dims.width,
          height: dims.height
        });
      }
    });
    lines.forEach((line, i) => {
      totalHeight += line.height;
      let tspanElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspanElem.setAttributeNS(null, 'fill', themeManager.getColor("C"));
      tspanElem.textContent = line.text;
      tspanElem.setAttributeNS(null, 'x', '0px');
      tspanElem.setAttributeNS(null, 'y', `${totalHeight}px`);
      textElem.appendChild(tspanElem);

      if (line.width > maxLineWidth) {
        maxLineWidth = line.width;
      }
    });
    svg.appendChild(textElem);
    return {
      svg: svg,
      width: maxLineWidth,
      height: totalHeight
    };
  }

}

module.exports = SvgWrapper;

},{"./Line":12,"./MathHelper":13,"./UtilityFunctions":27,"./Vector2":28}],26:[function(require,module,exports){
"use strict";

class ThemeManager {
  constructor(colors, theme) {
    this.colors = colors;
    this.theme = this.colors[theme];
  }
  /**
   * Returns the hex code of a color associated with a key from the current theme.
   *
   * @param {String} key The color key in the theme (e.g. C, N, BACKGROUND, ...).
   * @returns {String} A color hex value.
   */


  getColor(key) {
    if (key) {
      key = key.toUpperCase();

      if (key in this.theme) {
        return this.theme[key];
      }
    }

    return this.theme['C'];
  }
  /**
   * Sets the theme to the specified string if it exists. If it does not, this
   * does nothing.
   *
   * @param {String} theme the name of the theme to switch to
   */


  setTheme(theme) {
    if (this.colors.hasOwnProperty(theme)) {
      this.theme = this.colors[theme];
    } // TODO: this probably should notify those who are watching this theme
    // manager that the theme has changed so that colors can be changed
    // on the fly

  }

}

module.exports = ThemeManager;

},{}],27:[function(require,module,exports){
"use strict";

/**
 * Translate the integer indicating the charge to the appropriate text.
 * @param {Number} charge The integer indicating the charge.
 * @returns {String} A string representing a charge.
 */
function getChargeText(charge) {
  if (charge === 1) {
    return '+';
  } else if (charge === 2) {
    return '2+';
  } else if (charge === -1) {
    return '-';
  } else if (charge === -2) {
    return '2-';
  } else {
    return '';
  }
}

module.exports = {
  getChargeText
};

},{}],28:[function(require,module,exports){
"use strict";

//@ts-check

/** 
 * A class representing a 2D vector.
 * 
 * @property {Number} x The x component of the vector.
 * @property {Number} y The y component of the vector.
 */
class Vector2 {
  /**
   * The constructor of the class Vector2.
   *
   * @param {(Number|Vector2)} x The initial x coordinate value or, if the single argument, a Vector2 object.
   * @param {Number} y The initial y coordinate value.
   */
  constructor(x, y) {
    if (arguments.length == 0) {
      this.x = 0;
      this.y = 0;
    } else if (arguments.length == 1) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }
  /**
   * Clones this vector and returns the clone.
   *
   * @returns {Vector2} The clone of this vector.
   */


  clone() {
    return new Vector2(this.x, this.y);
  }
  /**
   * Returns a string representation of this vector.
   *
   * @returns {String} A string representation of this vector.
   */


  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
  /**
   * Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.
   *
   * @param {Vector2} vec Another vector.
   * @returns {Vector2} Returns itself.
   */


  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }
  /**
   * Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.
   *
   * @param {Vector2} vec Another vector.
   * @returns {Vector2} Returns itself.
   */


  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }
  /**
   * Divide the x and y coordinate values of this vector by a scalar.
   *
   * @param {Number} scalar The scalar.
   * @returns {Vector2} Returns itself.
   */


  divide(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }
  /**
   * Multiply the x and y coordinate values of this vector by the values of another vector.
   *
   * @param {Vector2} v A vector.
   * @returns {Vector2} Returns itself.
   */


  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  /**
   * Multiply the x and y coordinate values of this vector by a scalar.
   *
   * @param {Number} scalar The scalar.
   * @returns {Vector2} Returns itself.
   */


  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  /**
   * Inverts this vector. Same as multiply(-1.0).
   *
   * @returns {Vector2} Returns itself.
   */


  invert() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  /**
   * Returns the angle of this vector in relation to the coordinate system.
   *
   * @returns {Number} The angle in radians.
   */


  angle() {
    return Math.atan2(this.y, this.x);
  }
  /**
   * Returns the euclidean distance between this vector and another vector.
   *
   * @param {Vector2} vec A vector.
   * @returns {Number} The euclidean distance between the two vectors.
   */


  distance(vec) {
    return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y));
  }
  /**
   * Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).
   *
   * @param {Vector2} vec Another vector.
   * @returns {Number} The squared euclidean distance of the two vectors.
   */


  distanceSq(vec) {
    return (vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y);
  }
  /**
   * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.
   *
   * @param {Vector2} vec Another vector.
   * @returns {Number} Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.
   */


  clockwise(vec) {
    let a = this.y * vec.x;
    let b = this.x * vec.y;

    if (a > b) {
      return -1;
    } else if (a === b) {
      return 0;
    }

    return 1;
  }
  /**
   * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to an arbitrary third vector.
   *
   * @param {Vector2} center The central vector.
   * @param {Vector2} vec Another vector.
   * @returns {Number} Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to an arbitrary third vector.
   */


  relativeClockwise(center, vec) {
    let a = (this.y - center.y) * (vec.x - center.x);
    let b = (this.x - center.x) * (vec.y - center.y);

    if (a > b) {
      return -1;
    } else if (a === b) {
      return 0;
    }

    return 1;
  }
  /**
   * Rotates this vector by a given number of radians around the origin of the coordinate system.
   *
   * @param {Number} angle The angle in radians to rotate the vector.
   * @returns {Vector2} Returns itself.
   */


  rotate(angle) {
    let tmp = new Vector2(0, 0);
    let cosAngle = Math.cos(angle);
    let sinAngle = Math.sin(angle);
    tmp.x = this.x * cosAngle - this.y * sinAngle;
    tmp.y = this.x * sinAngle + this.y * cosAngle;
    this.x = tmp.x;
    this.y = tmp.y;
    return this;
  }
  /**
   * Rotates this vector around another vector.
   *
   * @param {Number} angle The angle in radians to rotate the vector.
   * @param {Vector2} vec The vector which is used as the rotational center.
   * @returns {Vector2} Returns itself.
   */


  rotateAround(angle, vec) {
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    this.x -= vec.x;
    this.y -= vec.y;
    let x = this.x * c - this.y * s;
    let y = this.x * s + this.y * c;
    this.x = x + vec.x;
    this.y = y + vec.y;
    return this;
  }
  /**
   * Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.
   *
   * @param {Vector2} vec The vector to rotate this vector to.
   * @param {Vector2} center The rotational center.
   * @param {Number} [offsetAngle=0.0] An additional amount of radians to rotate the vector.
   * @returns {Vector2} Returns itself.
   */


  rotateTo(vec, center, offsetAngle = 0.0) {
    // Problem if this is first position
    this.x += 0.001;
    this.y -= 0.001;
    let a = Vector2.subtract(this, center);
    let b = Vector2.subtract(vec, center);
    let angle = Vector2.angle(b, a);
    this.rotateAround(angle + offsetAngle, center);
    return this;
  }
  /**
   * Rotates the vector away from a specified vector around a center.
   * 
   * @param {Vector2} vec The vector this one is rotated away from.
   * @param {Vector2} center The rotational center.
   * @param {Number} angle The angle by which to rotate.
   */


  rotateAwayFrom(vec, center, angle) {
    this.rotateAround(angle, center);
    let distSqA = this.distanceSq(vec);
    this.rotateAround(-2.0 * angle, center);
    let distSqB = this.distanceSq(vec); // If it was rotated towards the other vertex, rotate in other direction by same amount.

    if (distSqB < distSqA) {
      this.rotateAround(2.0 * angle, center);
    }
  }
  /**
   * Returns the angle in radians used to rotate this vector away from a given vector.
   * 
   * @param {Vector2} vec The vector this one is rotated away from.
   * @param {Vector2} center The rotational center.
   * @param {Number} angle The angle by which to rotate.
   * @returns {Number} The angle in radians.
   */


  getRotateAwayFromAngle(vec, center, angle) {
    let tmp = this.clone();
    tmp.rotateAround(angle, center);
    let distSqA = tmp.distanceSq(vec);
    tmp.rotateAround(-2.0 * angle, center);
    let distSqB = tmp.distanceSq(vec);

    if (distSqB < distSqA) {
      return angle;
    } else {
      return -angle;
    }
  }
  /**
   * Returns the angle in radians used to rotate this vector towards a given vector.
   * 
   * @param {Vector2} vec The vector this one is rotated towards to.
   * @param {Vector2} center The rotational center.
   * @param {Number} angle The angle by which to rotate.
   * @returns {Number} The angle in radians.
   */


  getRotateTowardsAngle(vec, center, angle) {
    let tmp = this.clone();
    tmp.rotateAround(angle, center);
    let distSqA = tmp.distanceSq(vec);
    tmp.rotateAround(-2.0 * angle, center);
    let distSqB = tmp.distanceSq(vec);

    if (distSqB > distSqA) {
      return angle;
    } else {
      return -angle;
    }
  }
  /**
   * Gets the angles between this vector and another vector around a common center of rotation.
   *
   * @param {Vector2} vec Another vector.
   * @param {Vector2} center The center of rotation.
   * @returns {Number} The angle between this vector and another vector around a center of rotation in radians.
   */


  getRotateToAngle(vec, center) {
    let a = Vector2.subtract(this, center);
    let b = Vector2.subtract(vec, center);
    let angle = Vector2.angle(b, a);
    return Number.isNaN(angle) ? 0.0 : angle;
  }
  /**
   * Checks whether a vector lies within a polygon spanned by a set of vectors.
   *
   * @param {Vector2[]} polygon An array of vectors spanning the polygon.
   * @returns {Boolean} A boolean indicating whether or not this vector is within a polygon.
   */


  isInPolygon(polygon) {
    let inside = false; // Its not always a given, that the polygon is convex (-> sugars)

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (polygon[i].y > this.y != polygon[j].y > this.y && this.x < (polygon[j].x - polygon[i].x) * (this.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
        inside = !inside;
      }
    }

    return inside;
  }
  /**
   * Returns the length of this vector.
   *
   * @returns {Number} The length of this vector.
   */


  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Returns the square of the length of this vector.
   *
   * @returns {Number} The square of the length of this vector.
   */


  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Normalizes this vector.
   *
   * @returns {Vector2} Returns itself.
   */


  normalize() {
    this.divide(this.length());
    return this;
  }
  /**
   * Returns a normalized copy of this vector.
   *
   * @returns {Vector2} A normalized copy of this vector.
   */


  normalized() {
    return Vector2.divideScalar(this, this.length());
  }
  /**
   * Calculates which side of a line spanned by two vectors this vector is.
   *
   * @param {Vector2} vecA A vector.
   * @param {Vector2} vecB A vector.
   * @returns {Number} A number indicating the side of this vector, given a line spanned by two other vectors.
   */


  whichSide(vecA, vecB) {
    return (this.x - vecA.x) * (vecB.y - vecA.y) - (this.y - vecA.y) * (vecB.x - vecA.x);
  }
  /**
   * Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.
   *
   * @param {Vector2} vecA A vector spanning the line.
   * @param {Vector2} vecB A vector spanning the line.
   * @param {Vector2} vecC A vector to check whether or not it is on the same side as this vector.
   * @returns {Boolean} Returns a boolean indicating whether or not this vector is on the same side as another vector.
   */


  sameSideAs(vecA, vecB, vecC) {
    let d = this.whichSide(vecA, vecB);
    let dRef = vecC.whichSide(vecA, vecB);
    return d < 0 && dRef < 0 || d == 0 && dRef == 0 || d > 0 && dRef > 0;
  }
  /**
   * Adds two vectors and returns the result as a new vector.
   *
   * @static
   * @param {Vector2} vecA A summand.
   * @param {Vector2} vecB A summand.
   * @returns {Vector2} Returns the sum of two vectors.
   */


  static add(vecA, vecB) {
    return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
  }
  /**
   * Subtracts one vector from another and returns the result as a new vector.
   *
   * @static
   * @param {Vector2} vecA The minuend.
   * @param {Vector2} vecB The subtrahend.
   * @returns {Vector2} Returns the difference of two vectors.
   */


  static subtract(vecA, vecB) {
    return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
  }
  /**
   * Multiplies two vectors (value by value) and returns the result.
   *
   * @static
   * @param {Vector2} vecA A vector.
   * @param {Vector2} vecB A vector.
   * @returns {Vector2} Returns the product of two vectors.
   */


  static multiply(vecA, vecB) {
    return new Vector2(vecA.x * vecB.x, vecA.y * vecB.y);
  }
  /**
   * Multiplies two vectors (value by value) and returns the result.
   *
   * @static
   * @param {Vector2} vec A vector.
   * @param {Number} scalar A scalar.
   * @returns {Vector2} Returns the product of two vectors.
   */


  static multiplyScalar(vec, scalar) {
    return new Vector2(vec.x, vec.y).multiplyScalar(scalar);
  }
  /**
   * Returns the midpoint of a line spanned by two vectors.
   *
   * @static
   * @param {Vector2} vecA A vector spanning the line.
   * @param {Vector2} vecB A vector spanning the line.
   * @returns {Vector2} The midpoint of the line spanned by two vectors.
   */


  static midpoint(vecA, vecB) {
    return new Vector2((vecA.x + vecB.x) / 2, (vecA.y + vecB.y) / 2);
  }
  /**
   * Returns the normals of a line spanned by two vectors.
   *
   * @static
   * @param {Vector2} vecA A vector spanning the line.
   * @param {Vector2} vecB A vector spanning the line.
   * @returns {Vector2[]} An array containing the two normals, each represented by a vector.
   */


  static normals(vecA, vecB) {
    let delta = Vector2.subtract(vecB, vecA);
    return [new Vector2(-delta.y, delta.x), new Vector2(delta.y, -delta.x)];
  }
  /**
   * Returns the unit (normalized normal) vectors of a line spanned by two vectors.
   *
   * @static
   * @param {Vector2} vecA A vector spanning the line.
   * @param {Vector2} vecB A vector spanning the line.
   * @returns {Vector2[]} An array containing the two unit vectors.
   */


  static units(vecA, vecB) {
    let delta = Vector2.subtract(vecB, vecA);
    return [new Vector2(-delta.y, delta.x).normalize(), new Vector2(delta.y, -delta.x).normalize()];
  }
  /**
   * Divides a vector by another vector and returns the result as new vector.
   *
   * @static
   * @param {Vector2} vecA The dividend.
   * @param {Vector2} vecB The divisor.
   * @returns {Vector2} The fraction of the two vectors.
   */


  static divide(vecA, vecB) {
    return new Vector2(vecA.x / vecB.x, vecA.y / vecB.y);
  }
  /**
   * Divides a vector by a scalar and returns the result as new vector.
   *
   * @static
   * @param {Vector2} vecA The dividend.
   * @param {Number} s The scalar.
   * @returns {Vector2} The fraction of the two vectors.
   */


  static divideScalar(vecA, s) {
    return new Vector2(vecA.x / s, vecA.y / s);
  }
  /**
   * Returns the dot product of two vectors.
   *
   * @static
   * @param {Vector2} vecA A vector.
   * @param {Vector2} vecB A vector.
   * @returns {Number} The dot product of two vectors.
   */


  static dot(vecA, vecB) {
    return vecA.x * vecB.x + vecA.y * vecB.y;
  }
  /**
   * Returns the angle between two vectors.
   *
   * @static
   * @param {Vector2} vecA A vector.
   * @param {Vector2} vecB A vector.
   * @returns {Number} The angle between two vectors in radians.
   */


  static angle(vecA, vecB) {
    let dot = Vector2.dot(vecA, vecB);
    return Math.acos(dot / (vecA.length() * vecB.length()));
  }
  /**
   * Returns the angle between two vectors based on a third vector in between.
   *
   * @static
   * @param {Vector2} vecA A vector.
   * @param {Vector2} vecB A (central) vector.
   * @param {Vector2} vecC A vector.
   * @returns {Number} The angle in radians.
   */


  static threePointangle(vecA, vecB, vecC) {
    let ab = Vector2.subtract(vecB, vecA);
    let bc = Vector2.subtract(vecC, vecB);
    let abLength = vecA.distance(vecB);
    let bcLength = vecB.distance(vecC);
    return Math.acos(Vector2.dot(ab, bc) / (abLength * bcLength));
  }
  /**
   * Returns the scalar projection of a vector on another vector.
   *
   * @static
   * @param {Vector2} vecA The vector to be projected.
   * @param {Vector2} vecB The vector to be projection upon.
   * @returns {Number} The scalar component.
   */


  static scalarProjection(vecA, vecB) {
    let unit = vecB.normalized();
    return Vector2.dot(vecA, unit);
  }
  /**
  * Returns the average vector (normalized) of the input vectors.
  *
  * @static
  * @param {Array} vecs An array containing vectors.
  * @returns {Vector2} The resulting vector (normalized).
  */


  static averageDirection(vecs) {
    let avg = new Vector2(0.0, 0.0);

    for (var i = 0; i < vecs.length; i++) {
      let vec = vecs[i];
      avg.add(vec);
    }

    return avg.normalize();
  }

}

module.exports = Vector2;

},{}],29:[function(require,module,exports){
"use strict";

//@ts-check
const MathHelper = require('./MathHelper');

const ArrayHelper = require('./ArrayHelper');

const Vector2 = require('./Vector2');

const Atom = require('./Atom');
/** 
 * A class representing a vertex.
 * 
 * @property {Number} id The id of this vertex.
 * @property {Atom} value The atom associated with this vertex.
 * @property {Vector2} position The position of this vertex.
 * @property {Vector2} previousPosition The position of the previous vertex.
 * @property {Number|null} parentVertexId The id of the previous vertex.
 * @property {Number[]} children The ids of the children of this vertex.
 * @property {Number[]} spanningTreeChildren The ids of the children of this vertex as defined in the spanning tree defined by the SMILES.
 * @property {Number[]} edges The ids of edges associated with this vertex.
 * @property {Boolean} positioned A boolean indicating whether or not this vertex has been positioned.
 * @property {Number} angle The angle of this vertex.
 * @property {Number} dir The direction of this vertex.
 * @property {Number} neighbourCount The number of neighbouring vertices.
 * @property {Number[]} neighbours The vertex ids of neighbouring vertices.
 * @property {String[]} neighbouringElements The element symbols associated with neighbouring vertices.
 * @property {Boolean} forcePositioned A boolean indicating whether or not this vertex was positioned using a force-based approach.
 */


class Vertex {
  /**
   * The constructor for the class Vertex.
   *
   * @param {Atom} value The value associated with this vertex.
   * @param {Number} [x=0] The initial x coordinate of the positional vector of this vertex.
   * @param {Number} [y=0] The initial y coordinate of the positional vector of this vertex.
   */
  constructor(value, x = 0, y = 0) {
    this.id = null;
    this.value = value;
    this.position = new Vector2(x ? x : 0, y ? y : 0);
    this.previousPosition = new Vector2(0, 0);
    this.parentVertexId = null;
    this.children = Array();
    this.spanningTreeChildren = Array();
    this.edges = Array();
    this.positioned = false;
    this.angle = null;
    this.dir = 1.0;
    this.neighbourCount = 0;
    this.neighbours = Array();
    this.neighbouringElements = Array();
    this.forcePositioned = false;
  }
  /**
   * Set the 2D coordinates of the vertex.
   * 
   * @param {Number} x The x component of the coordinates.
   * @param {Number} y The y component of the coordinates.
   * 
   */


  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }
  /**
   * Set the 2D coordinates of the vertex from a Vector2.
   * 
   * @param {Vector2} v A 2D vector.
   * 
   */


  setPositionFromVector(v) {
    this.position.x = v.x;
    this.position.y = v.y;
  }
  /**
   * Add a child vertex id to this vertex.
   * @param {Number} vertexId The id of a vertex to be added as a child to this vertex.
   */


  addChild(vertexId) {
    this.children.push(vertexId);
    this.neighbours.push(vertexId);
    this.neighbourCount++;
  }
  /**
   * Add a child vertex id to this vertex as the second child of the neighbours array,
   * except this vertex is the first vertex of the SMILE string, then it is added as the first.
   * This is used to get the correct ordering of neighbours for parity calculations.
   * If a hydrogen is implicitly attached to the chiral center, insert as the third child.
   * @param {Number} vertexId The id of a vertex to be added as a child to this vertex.
   * @param {Number} ringbondIndex The index of the ringbond.
   */


  addRingbondChild(vertexId, ringbondIndex) {
    this.children.push(vertexId);

    if (this.value.bracket) {
      let index = 1;

      if (this.id === 0 && this.value.bracket.hcount === 0) {
        index = 0;
      }

      if (this.value.bracket.hcount === 1 && ringbondIndex === 0) {
        index = 2;
      }

      if (this.value.bracket.hcount === 1 && ringbondIndex === 1) {
        if (this.neighbours.length < 3) {
          index = 2;
        } else {
          index = 3;
        }
      }

      if (this.value.bracket.hcount === null && ringbondIndex === 0) {
        index = 1;
      }

      if (this.value.bracket.hcount === null && ringbondIndex === 1) {
        if (this.neighbours.length < 3) {
          index = 1;
        } else {
          index = 2;
        }
      }

      this.neighbours.splice(index, 0, vertexId);
    } else {
      this.neighbours.push(vertexId);
    }

    this.neighbourCount++;
  }
  /**
   * Set the vertex id of the parent.
   * 
   * @param {Number} parentVertexId The parents vertex id.
   */


  setParentVertexId(parentVertexId) {
    this.neighbourCount++;
    this.parentVertexId = parentVertexId;
    this.neighbours.push(parentVertexId);
  }
  /**
   * Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.
   *
   * @returns {Boolean} A boolean indicating whether or not this vertex is terminal.
   */


  isTerminal() {
    if (this.value.hasAttachedPseudoElements) {
      return true;
    }

    return this.parentVertexId === null && this.children.length < 2 || this.children.length === 0;
  }
  /**
   * Clones this vertex and returns the clone.
   *
   * @returns {Vertex} A clone of this vertex.
   */


  clone() {
    let clone = new Vertex(this.value, this.position.x, this.position.y);
    clone.id = this.id;
    clone.previousPosition = new Vector2(this.previousPosition.x, this.previousPosition.y);
    clone.parentVertexId = this.parentVertexId;
    clone.children = ArrayHelper.clone(this.children);
    clone.spanningTreeChildren = ArrayHelper.clone(this.spanningTreeChildren);
    clone.edges = ArrayHelper.clone(this.edges);
    clone.positioned = this.positioned;
    clone.angle = this.angle;
    clone.forcePositioned = this.forcePositioned;
    return clone;
  }
  /**
   * Returns true if this vertex and the supplied vertex both have the same id, else returns false.
   *
   * @param {Vertex} vertex The vertex to check.
   * @returns {Boolean} A boolean indicating whether or not the two vertices have the same id.
   */


  equals(vertex) {
    return this.id === vertex.id;
  }
  /**
   * Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.
   *
   * @param {Vector2} [referenceVector=null] - The reference vector.
   * @param {Boolean} [returnAsDegrees=false] - If true, returns angle in degrees, else in radians.
   * @returns {Number} The angle of this vertex.
   */


  getAngle(referenceVector = null, returnAsDegrees = false) {
    let u = null;

    if (!referenceVector) {
      u = Vector2.subtract(this.position, this.previousPosition);
    } else {
      u = Vector2.subtract(this.position, referenceVector);
    }

    if (returnAsDegrees) {
      return MathHelper.toDeg(u.angle());
    }

    return u.angle();
  }
  /**
   * Returns the suggested text direction when text is added at the position of this vertex.
   *
   * @param {Vertex[]} vertices The array of vertices for the current molecule.
   * @returns {String} The suggested direction of the text.
   */


  getTextDirection(vertices) {
    let neighbours = this.getDrawnNeighbours(vertices);
    let angles = Array(); // If there is only one vertex in the graph, always draw to the right

    if (vertices.length === 1) {
      return 'right';
    }

    for (let i = 0; i < neighbours.length; i++) {
      angles.push(this.getAngle(vertices[neighbours[i]].position));
    }

    let textAngle = MathHelper.meanAngle(angles); // Round to 0, 90, 180 or 270 degree

    let halfPi = Math.PI / 2.0;
    textAngle = Math.round(Math.round(textAngle / halfPi) * halfPi);

    if (textAngle === 2) {
      return 'down';
    } else if (textAngle === -2) {
      return 'up';
    } else if (textAngle === 0 || textAngle === -0) {
      return 'right'; // is checking for -0 necessary?
    } else if (textAngle === 3 || textAngle === -3) {
      return 'left';
    } else {
      return 'down'; // default to down
    }
  }
  /**
   * Returns an array of ids of neighbouring vertices.
   *
   * @param {Number} [vertexId=null] If a value is supplied, the vertex with this id is excluded from the returned indices.
   * @returns {Number[]} An array containing the ids of neighbouring vertices.
   */


  getNeighbours(vertexId = null) {
    if (vertexId === null) {
      return this.neighbours.slice();
    }

    let arr = Array();

    for (let i = 0; i < this.neighbours.length; i++) {
      if (this.neighbours[i] !== vertexId) {
        arr.push(this.neighbours[i]);
      }
    }

    return arr;
  }
  /**
   * Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).
   * 
   * @param {Vertex[]} vertices An array containing the vertices associated with the current molecule.
   * @returns {Number[]} An array containing the ids of neighbouring vertices that will be drawn.
   */


  getDrawnNeighbours(vertices) {
    let arr = Array();

    for (let i = 0; i < this.neighbours.length; i++) {
      if (vertices[this.neighbours[i]].value.isDrawn) {
        arr.push(this.neighbours[i]);
      }
    }

    return arr;
  }
  /**
   * Returns the number of neighbours of this vertex.
   *
   * @returns {Number} The number of neighbours.
   */


  getNeighbourCount() {
    return this.neighbourCount;
  }
  /**
   * Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.
   *
   * @param {Number} [vertexId=null] If supplied, the vertex with this id is excluded from the array returned.
   * @returns {Number[]} An array containing the ids of the neighbouring vertices.
   */


  getSpanningTreeNeighbours(vertexId = null) {
    let neighbours = Array();

    for (let i = 0; i < this.spanningTreeChildren.length; i++) {
      if (vertexId === undefined || vertexId != this.spanningTreeChildren[i]) {
        neighbours.push(this.spanningTreeChildren[i]);
      }
    }

    if (this.parentVertexId != null) {
      if (vertexId === undefined || vertexId != this.parentVertexId) {
        neighbours.push(this.parentVertexId);
      }
    }

    return neighbours;
  }
  /**
   * Gets the next vertex in the ring in opposide direction to the supplied vertex id.
   *
   * @param {Vertex[]} vertices The array of vertices for the current molecule.
   * @param {Number} ringId The id of the ring containing this vertex.
   * @param {Number} previousVertexId The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex.
   * @returns {Number} The id of the next vertex in the ring.
   */


  getNextInRing(vertices, ringId, previousVertexId) {
    let neighbours = this.getNeighbours();

    for (let i = 0; i < neighbours.length; i++) {
      if (ArrayHelper.contains(vertices[neighbours[i]].value.rings, {
        value: ringId
      }) && neighbours[i] != previousVertexId) {
        return neighbours[i];
      }
    }

    return null;
  }

}

module.exports = Vertex;

},{"./ArrayHelper":3,"./Atom":4,"./MathHelper":13,"./Vector2":28}]},{},[1])

