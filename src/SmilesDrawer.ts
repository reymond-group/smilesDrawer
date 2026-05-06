// @ts-check
import Atom           from './Atom';
import DomHelper      from './DomHelper';
import Options        from './Options';
import Parser         from './Parser';
import Reaction       from './Reaction';
import ReactionDrawer from './ReactionDrawer';
import ReactionParser from './ReactionParser';
import SvgDrawer      from './SvgDrawer';
import {Drawable}     from './Types';

// HACK: We don't have a Moleucle class yet; the parser
// returns the first (root) atom in the parse tree.
type  Molecule = Atom;
const Molecule = Atom;

type ArrowText = {
    textAboveArrow?: string;
    textBelowArrow?: string;
};

export default class SmilesDrawer {
    drawer:         SvgDrawer;
    reactionDrawer: ReactionDrawer;

    constructor(moleculeOptions = {}, reactionOptions = {}) {
        this.drawer = new SvgDrawer(moleculeOptions);

        // moleculeOptions gets edited in reactionOptions, so clone
        this.reactionDrawer = new ReactionDrawer(reactionOptions, JSON.parse(JSON.stringify(this.drawer.opts)));
    }

    static apply(
        moleculeOptions = {},
        reactionOptions = {},
        attribute:        string = 'data-smiles',
        theme:            string = 'light',
        successCallback?: (t: Drawable) => unknown,
        errorCallback?:   (e: Error) => unknown,
    ): Promise<Drawable>[] {
        const drawer = new SmilesDrawer(moleculeOptions, reactionOptions);
        return drawer.apply(attribute, theme, successCallback, errorCallback);
    }

    apply(
        attribute:        string = 'data-smiles',
        theme:            string = 'light',
        successCallback?: (t: Drawable) => unknown,
        errorCallback?:   (e: Error) => unknown,
    ): Promise<Drawable>[] {
        const elements = document.querySelectorAll(`[${attribute}]`);
        return Array.prototype.flatMap.call(elements, (element) => {
            const smiles = element.getAttribute(attribute);

            if (smiles === null) {
                throw Error('No SMILES provided.');
            }

            let currentTheme = theme;
            let weights = null;

            if (element.hasAttribute('data-smiles-theme')) {
                currentTheme = element.getAttribute('data-smiles-theme');
            }

            if (element.hasAttribute('data-smiles-weights')) {
                weights = element.getAttribute('data-smiles-weights').split(',').map(parseFloat);
            }

            if (element.hasAttribute('data-smiles-reactant-weights')
                || element.hasAttribute('data-smiles-reagent-weights')
                || element.hasAttribute('data-smiles-product-weights')
            ) {
                weights = {reactants: [], reagents: [], products: []};
                if (element.hasAttribute('data-smiles-reactant-weights')) {
                    weights.reactants = element.getAttribute('data-smiles-reactant-weights').split(';').map((v) => {
                        return v.split(',').map(parseFloat);
                    });
                }

                if (element.hasAttribute('data-smiles-reagent-weights')) {
                    weights.reagents = element.getAttribute('data-smiles-reagent-weights').split(';').map((v) => {
                        return v.split(',').map(parseFloat);
                    });
                }

                if (element.hasAttribute('data-smiles-product-weights')) {
                    weights.products = element.getAttribute('data-smiles-product-weights').split(';').map((v) => {
                        return v.split(',').map(parseFloat);
                    });
                }
            }

            if (element.hasAttribute('data-smiles-options') || element.hasAttribute('data-smiles-reaction-options')) {
                let moleculeOptions = this.drawer.opts;
                if (element.hasAttribute('data-smiles-options')) {
                    const opts = JSON.parse(element.getAttribute('data-smiles-options').replace(/'/g, '"'));
                    moleculeOptions = Options.extend(true, {}, moleculeOptions, opts);
                }

                let reactionOptions = this.reactionDrawer.opts;
                if (element.hasAttribute('data-smiles-reaction-options')) {
                    const opts = JSON.parse(element.getAttribute('data-smiles-reaction-options').replace(/'/g, '"'));
                    reactionOptions = Options.extend(true, {}, reactionOptions, opts);
                }

                const smilesDrawer = new SmilesDrawer(moleculeOptions, reactionOptions);
                return smilesDrawer.draw(smiles, element, currentTheme, successCallback, errorCallback, weights);
            }
            else {
                return this.draw(smiles, element, currentTheme, successCallback, errorCallback, weights);
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
    draw(
        smiles:           Molecule | Reaction | string,
        target:           Drawable | NodeList | string | null,
        theme:            string = 'light',
        successCallback?: (t: Drawable) => unknown,
        errorCallback?:   (e: Error) => unknown,
        weights?:         number[]
    ): Promise<Drawable>[] {
        try {
            const object = SmilesDrawer.parse(smiles);
            if (object instanceof Reaction) {
                const arrowText = this.getArrowText(smiles);
                return this.drawReaction(object, target, theme, arrowText, weights, successCallback);
            }
            else {
                return this.drawMolecule(object, target, theme, weights, successCallback);
            }
        }
        catch (error) {
            if (errorCallback) {
                errorCallback(error);
            }
            else {
                console.error(error);
            }

            return [Promise.reject(error)];
        }
    }

    drawMolecule(
        smiles:    Molecule | string,
        target:    Drawable | NodeList | string | null,
        theme:     string,
        weights?:  number[],
        callback?: (t: Drawable) => unknown,
    ): Promise<Drawable>[] {
        const molecule = SmilesDrawer.parseMolecule(smiles);
        const targets  = this.getTargets(target || 'svg');

        if (targets.length === 1 && targets[0] instanceof SVGSVGElement) {
            // In the common case where we draw to a single SVG element, draw directly.
            const svg = this.drawer.draw(molecule, targets[0], theme, weights);
            if (callback) callback(svg);
            return [Promise.resolve(svg)];
        }
        else {
            // Otherwise, draw the SVG once and copy it out to the target elements.
            const svg = this.drawer.draw(molecule, null, theme, weights);
            return this.copySvgToTargets(svg, targets, callback);
        }
    }

    drawReaction(
        smiles:    Reaction | string,
        target:    Drawable | NodeList | string | null,
        theme:     string,
        arrowText: ArrowText,
        weights?:  number[],
        callback?: (t: Drawable) => unknown,
    ): Promise<Drawable>[] {
        const reaction = SmilesDrawer.parseReaction(smiles);
        const targets  = this.getTargets(target || 'svg');

        const above = arrowText.textAboveArrow;
        const below = arrowText.textBelowArrow;

        if (targets.length === 1 && targets[0] instanceof SVGSVGElement) {
            // In the common case where we draw to a single SVG element, draw directly.
            const svg = this.reactionDrawer.draw(reaction, targets[0], theme, weights, above, below);
            if (callback) callback(svg);
            return [Promise.resolve(svg)];
        }
        else {
            // Otherwise, draw the SVG once and copy it out to the target elements.
            const svg = this.reactionDrawer.draw(reaction, null, theme, weights, above, below);
            return this.copySvgToTargets(svg, targets, callback);
        }
    }

    static clean(smiles: string): string {
        smiles  = smiles.trimStart();
        const i = smiles.search(/\s/);
        if (i >= 0) {
            return smiles.substring(0, i);
        }
        else {
            return smiles;
        }
    }

    static parse(smiles: Molecule | Reaction | string, strict?: boolean): Molecule | Reaction {
        if (smiles instanceof Molecule || smiles instanceof Reaction) {
            return smiles;
        }
        else if (smiles.includes('>')) {
            return SmilesDrawer.parseReaction(smiles, strict);
        }
        else {
            return SmilesDrawer.parseMolecule(smiles, strict);
        }
    }

    static parseMolecule(smiles: Molecule | string, strict?: boolean): Molecule {
        if (smiles instanceof Molecule) {
            return smiles;
        }

        if (!strict) smiles = SmilesDrawer.clean(smiles);
        return Parser.parse(smiles);
    }

    static parseReaction(smiles: Reaction | string, strict?: boolean): Reaction {
        if (smiles instanceof Reaction) {
            return smiles;
        }

        if (!strict) smiles = SmilesDrawer.clean(smiles);
        return ReactionParser.parse(smiles);
    }

    /**
     * @deprecated
     * Copy an SVG to an HTML canvas element.
     *
     * @param svg    - The SVG to copy.
     * @param canvas - The canvas to copy it to, or none to create a new canvas.
     * @returns The canvas element.
     */
    svgToCanvas(svg: SVGSVGElement, canvas?: HTMLCanvasElement): Promise<HTMLCanvasElement> {
        return DomHelper.svgToCanvas(svg, canvas);
    }

    /**
     * @deprecated
     * Copy an SVG to an HTML image element.
     *
     * @param svg - The SVG to copy.
     * @param img - The image to copy it to, or none to create a new image.
     * @returns The image element.
     */
    svgToImg(svg: SVGSVGElement, img?: HTMLImageElement): Promise<HTMLImageElement> {
        return DomHelper.svgToImg(svg, img);
    }

    getArrowText(smiles: Molecule | Reaction | string): ArrowText {
        // This is a really awkward way to provide arrow text...
        // TODO: Move it to the options object in v3.0.
        const defaults: ArrowText = {
            textAboveArrow: '{reagents}',
            textBelowArrow: '',
        };

        if (typeof smiles !== 'string') {
            return defaults;
        }

        const a = smiles.indexOf('__');
        const z = smiles.lastIndexOf('__');

        if (a === z) {
            return defaults;
        }

        const json = smiles.substring(a + 2, z).replace(/'/g, '"');
        return Object.assign(defaults, JSON.parse(json));
    }

    /**
     * Convert a user-provided target spec to a list of render targets.
     *
     * @param target - A user-supplied target, as passed to one of the draw functions.
     * @returns A list of render targets.
     */
    getTargets(target: NodeList | Drawable | string): Drawable[] {
        // Probably a querySelectorAll() result.
        if (target instanceof NodeList) {
            return Array.prototype.filter.call(target, (element) => {
                if (element instanceof SVGSVGElement) {
                    return true;
                }
                else if (element instanceof HTMLCanvasElement) {
                    return true;
                }
                else if (element instanceof HTMLImageElement) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }

        // Assume all non-strings are drawable.
        if (typeof target !== 'string') {
            return [target];
        }

        if (target === 'svg') {
            return [DomHelper.createSvg()];
        }
        if (target === 'canvas') {
            return [DomHelper.createCanvas()];
        }
        if (target === 'img') {
            return [DomHelper.createImg()];
        }
        if (target === 'offscreen-canvas') {
            const w = this.drawer.opts.width;
            const h = this.drawer.opts.height;
            return [DomHelper.createOffscreenCanvas(w, h)];
        }

        // Assume all other strings are CSS queries:
        return this.getTargets(document.querySelectorAll(target));
    }

    copySvgToTargets(svg: SVGSVGElement, targets: Drawable[], callback?: (t: Drawable) => unknown): Promise<Drawable>[] {
        let data_url = undefined;

        const w = this.drawer.opts.width;
        const h = this.drawer.opts.height;

        return targets.map((element) => {
            let promise = undefined;

            if (element instanceof SVGSVGElement) {
                promise = DomHelper.svgToSvg(svg, element);
            }
            else if (element instanceof HTMLCanvasElement) {
                data_url ||= DomHelper.svgToDataUrl(svg);
                promise = DomHelper.dataUrlToCanvas(data_url, element, w, h);
            }
            else if (element instanceof HTMLImageElement) {
                data_url ||= DomHelper.svgToDataUrl(svg);
                promise = DomHelper.dataUrlToImg(data_url, element, w, h);
            }
            else if (element instanceof OffscreenCanvas) {
                data_url ||= DomHelper.svgToDataUrl(svg);
                promise = DomHelper.dataUrlToOffscreenCanvas(data_url, element, w, h);
            }
            else {
                const type = (element as object).constructor.name;
                const message = `Can't draw to a ${type}!`;
                console.warn(message);

                // TODO: Add custom error subclasses.
                return Promise.reject(new Error(message));
            }

            // If callback is not a function, it gets replaced with the identity function.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#parameters
            return promise.then(callback).then(() => element);
        });
    }
}
