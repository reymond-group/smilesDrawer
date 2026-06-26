export default class SvgDrawer {
    constructor(options: any, clear?: boolean);
    preprocessor: DrawerBase;
    opts: {};
    clear: boolean;
    svgWrapper: SvgWrapper;
    /**
     * Draws the parsed smiles data to an svg element.
     *
     * @param {Object} data The tree returned by the smiles parser.
     * @param {?(string|String|Element)} target The id of the HTML svg element the structure is drawn to - or the element itself.
     * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
     * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
     *
     * @returns {SVGSVGElement} The (possibly new) SVG element that was drawn to.
     */
    draw(data: any, target: (string | string | Element) | null, themeName?: string, weights?: any, infoOnly?: boolean, highlight_atoms?: any[], weightsNormalized?: boolean): SVGSVGElement;
    themeManager: ThemeManager;
    /**
     * Draws the parsed smiles data to a canvas element.
     *
     * @param {Object} data The tree returned by the smiles parser.
     * @param {(string|String|HTMLCanvasElement)} target The id of the HTML canvas element the structure is drawn to - or the element itself.
     * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
     * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
     */
    drawCanvas(data: any, target: (string | string | HTMLCanvasElement), themeName?: string, infoOnly?: boolean): string | HTMLCanvasElement;
    /**
     * Draws a ring inside a provided ring, indicating aromaticity.
     *
     * @param {Ring} ring A ring.
     */
    drawAromaticityRing(ring: Ring): void;
    /**
     * Draw the actual edges as bonds.
     *
     * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
     */
    drawEdges(debug: boolean): void;
    /**
     * Draw the an edge as a bond.
     *
     * @param {Number} edgeId An edge id.
     * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
     */
    drawEdge(edgeId: number, debug: boolean): void;
    /**
     * Draw the highlights for atoms to the canvas.
     *
     * @param {Boolean} _debug UNUSED
     */
    drawAtomHighlights(_debug: boolean): void;
    /**
     * Draws the vertices representing atoms to the canvas.
     *
     * @param {Boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
     */
    drawVertices(debug: boolean): void;
    /**
     * Draw the weights on a background image.
     * @param {Number[]} weights The weights assigned to each atom.
     */
    drawWeights(weights: number[], weightsNormalized: any): void;
    /**
     * Returns the total overlap score of the current molecule.
     *
     * @returns {Number} The overlap score.
     */
    getTotalOverlapScore(): number;
    /**
     * Returns the molecular formula of the loaded molecule as a string.
     *
     * @returns {String} The molecular formula.
     */
    getMolecularFormula(graph?: any): string;
    /**
     * @param {Array} normals list of normals to multiply
     * @param {Number} spacing value to multiply normals by
     */
    multiplyNormals(normals: any[], spacing: number): void;
}
import DrawerBase from './DrawerBase';
import SvgWrapper from './SvgWrapper';
import ThemeManager from './ThemeManager';
import Ring from './Ring';
