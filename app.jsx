//@ts-check
const Drawer = require('./src/Drawer')
const Parser = require('./src/Parser')
const ReactionParser = require('./src/ReactionParser')
const SvgDrawer = require('./src/SvgDrawer')
const ReactionDrawer = require('./src/ReactionDrawer')
const SmiDrawer = require('./src/SmilesDrawer')
const GaussDrawer = require('./src/GaussDrawer')

// Detect SSR (server side rendering)
var canUseDOM = !!(
  (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
);

/**
 * The SmilesDrawer namespace.
 * @typicalname SmilesDrawer
 */
var SmilesDrawer = {
  Version: '2.1.10'
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
}

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
}

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
}

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
}

if (canUseDOM) {
  window.SmilesDrawer = SmilesDrawer;
  window.SmiDrawer = SmiDrawer;
}

// Attach SmiDrawer to SmilesDrawer for npm imports
SmilesDrawer.SmiDrawer = SmiDrawer;

// There be dragons (polyfills)

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function (value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}

module.exports = SmilesDrawer;
