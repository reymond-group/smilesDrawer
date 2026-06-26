export default class SmilesDrawer {
    static apply(moleculeOptions?: {}, reactionOptions?: {}, attribute?: string, theme?: string, successCallback?: any, errorCallback?: any): void;
    constructor(moleculeOptions?: {}, reactionOptions?: {});
    drawer: SvgDrawer;
    reactionDrawer: ReactionDrawer;
    apply(attribute?: string, theme?: string, successCallback?: any, errorCallback?: any): void;
    /**
     * Draw the smiles to the target.
     * @param {String} smiles The SMILES to be depicted.
     * @param {*} target The target element.
     * @param {String} theme The theme.
     * @param {?CallableFunction} successCallback The function called on success.
     * @param {?CallableFunction} errorCallback The function called on error.
     * @param {?Number[]|Object} weights The weights for the gaussians.
     */
    draw(smiles: string, target: any, theme?: string, successCallback?: CallableFunction | null, errorCallback?: CallableFunction | null, weights?: (number[] | any) | null): void;
    drawMolecule(smiles: any, target: any, theme: any, weights: any, callback: any): void;
    drawReaction(smiles: any, target: any, theme: any, settings: any, weights: any, callback: any): void;
    svgToCanvas(svg: any, canvas?: any): any;
    svgToImg(svg: any, img?: any): any;
    /**
     *
     * @param {HTMLImageElement|HTMLCanvasElement|SVGElement} element
     * @param {SVGElement} svg
     * @returns {{w: Number, h: Number}} The width and height.
     */
    getDimensions(element: HTMLImageElement | HTMLCanvasElement | SVGElement, svg?: SVGElement): {
        w: number;
        h: number;
    };
}
import SvgDrawer from './SvgDrawer';
import ReactionDrawer from './ReactionDrawer';
