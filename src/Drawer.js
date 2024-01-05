//@ts-check
const SvgDrawer = require('./SvgDrawer')

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
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.svgDrawer.opts.width + ' ' + this.svgDrawer.opts.height);
    svg.setAttributeNS(null, 'width', this.svgDrawer.opts.width + '');
    svg.setAttributeNS(null, 'height', this.svgDrawer.opts.height + '');
    this.svgDrawer.draw(data, svg, themeName, null, infoOnly, highlight_atoms);
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
