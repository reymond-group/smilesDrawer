export default class ReactionDrawer {
    /**
     * The constructor for the class ReactionDrawer.
     *
     * @param {Object} reactionOptions An object containing reaction drawing specific options.
     * @param {Object} moleculeOptions An object containing molecule drawing specific options.
     */
    constructor(reactionOptions: any, moleculeOptions: any);
    drawer: SvgDrawer;
    molOpts: {};
    defaultOptions: {
        scale: any;
        fontSize: number;
        fontFamily: string;
        spacing: number;
        plus: {
            size: number;
            thickness: number;
        };
        arrow: {
            length: number;
            headSize: number;
            thickness: number;
            margin: number;
        };
        weights: {
            normalize: boolean;
        };
    };
    opts: {};
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
    draw(reaction: any, target: (string | SVGElement), themeName?: string, weights?: any | null, textAbove?: string, textBelow?: string, infoOnly?: boolean): SVGElement;
    themeManager: ThemeManager;
    getPlus(): SVGSVGElement;
    getArrowhead(): SVGMarkerElement;
    getCDArrowhead(): SVGMarkerElement;
    getArrow(): SVGSVGElement;
}
import SvgDrawer from './SvgDrawer';
import ThemeManager from './ThemeManager';
