// @ts-check
import DomHelper from './DomHelper';
import SvgDrawer from './SvgDrawer';

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
export default class Drawer {
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
     * @param {string|String|HTMLCanvasElement} target The id of the HTML canvas element the structure is drawn to - or the element itself.
     * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
     * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
     */
    draw(data, target, themeName = 'light', infoOnly = false, highlight_atoms = []) {
        const canvas = DomHelper.getDrawable(target, HTMLCanvasElement);
        const svg = this.svgDrawer.draw(data, null, themeName, null, infoOnly, highlight_atoms);
        return DomHelper.svgToCanvas(svg, canvas);
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
        return this.svgDrawer.getMolecularFormula();
    }
}
