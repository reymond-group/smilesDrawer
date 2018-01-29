//@ts-check
import Drawer from './src/Drawer'
import Parser from './src/Parser'

/** 
 * A static class exposing the SmilesDrawer API. 
 */
export default class SmilesDrawer {
  /**
  * Cleans a SMILES string (removes non-valid characters)
  *
  * @static
  * @param {String} smiles A SMILES string.
  * @returns {String} The clean SMILES string.
  */
  static clean(smiles) {
    return smiles.replace(/[^A-Za-z0-9@\.\+\-\?!\(\)\[\]\{\}/\\=#\$:\*]/g,'');
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
  static apply(options, selector='canvas[data-smiles]', themeName='light', onError=null) {
    let smilesDrawer = new Drawer(options);
    let elements = document.querySelectorAll(selector);

    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];

        SmilesDrawer.parse(element.getAttribute('data-smiles'), function(tree) {
            smilesDrawer.draw(tree, element, themeName, false);
        }, function(err) {
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
  static parse(smiles, successCallback, errorCallback) {
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
}