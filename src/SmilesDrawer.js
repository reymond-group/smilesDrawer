// @ts-check
import DomHelper      from './DomHelper';
import Options        from './Options';
import Parser         from './Parser';
import ReactionDrawer from './ReactionDrawer';
import ReactionParser from './ReactionParser';
import SvgDrawer      from './SvgDrawer';
import SvgWrapper     from './SvgWrapper';

export default class SmilesDrawer {
    constructor(moleculeOptions = {}, reactionOptions = {}) {
        this.drawer = new SvgDrawer(moleculeOptions);

        // moleculeOptions gets edited in reactionOptions, so clone
        this.reactionDrawer = new ReactionDrawer(reactionOptions, JSON.parse(JSON.stringify(this.drawer.opts)));
    }

    static apply(moleculeOptions = {}, reactionOptions = {}, attribute = 'data-smiles', theme = 'light', successCallback = null, errorCallback = null) {
        const drawer = new SmilesDrawer(moleculeOptions, reactionOptions);
        drawer.apply(attribute, theme, successCallback, errorCallback);
    }

    apply(attribute = 'data-smiles', theme = 'light', successCallback = null, errorCallback = null) {
        let elements = document.querySelectorAll(`[${attribute}]`);
        elements.forEach((element) => {
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
                let moleculeOptions = {};
                if (element.hasAttribute('data-smiles-options')) {
                    moleculeOptions = JSON.parse(element.getAttribute('data-smiles-options').replace(/'/g, '"'));
                }

                let reactionOptions = {};
                if (element.hasAttribute('data-smiles-reaction-options')) {
                    reactionOptions = JSON.parse(element.getAttribute('data-smiles-reaction-options').replace(/'/g, '"'));
                }

                let smilesDrawer = new SmilesDrawer(moleculeOptions, reactionOptions);
                smilesDrawer.draw(smiles, element, currentTheme, successCallback, errorCallback, weights);
            }
            else {
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
            let settingsString = info.substring(
                info.indexOf('__') + 2,
                info.lastIndexOf('__')
            );

            settings = JSON.parse(settingsString.replace(/'/g, '"'));
        }

        let defaultSettings = {
            textAboveArrow: '{reagents}',
            textBelowArrow: '',
        };

        settings = Options.extend(true, defaultSettings, settings);

        try {
            if (smiles.includes('>')) {
                this.drawReaction(smiles, target, theme, settings, weights, successCallback);
            }
            else {
                this.drawMolecule(smiles, target, theme, weights, successCallback);
            }
        }
        catch (err) {
            if (errorCallback) {
                errorCallback(err);
            }
            else {
                console.error(err);
            }
        }
    }

    drawMolecule(smiles, target, theme, weights, callback) {
        let parseTree = Parser.parse(smiles);

        const targets = this.getTargets(target || 'svg');
        if (targets.length === 1 && targets[0] instanceof SVGSVGElement) {
            // In the common case where we draw to a single SVG element, draw directly.
            this.drawer.draw(parseTree, targets[0], theme, weights);
            if (callback) {
                callback(targets[0]);
            }
        }
        else {
            // Otherwise, draw the SVG once and copy it out to the target elements.
            const svg = this.drawer.draw(parseTree, null, theme, weights);
            this.copySvgToTargets(svg, targets, callback);
        }
    }

    drawReaction(smiles, target, theme, settings, weights, callback) {
        let reaction = ReactionParser.parse(smiles);

        const above   = settings.textAboveArrow;
        const below   = settings.textBelowArrow;
        const targets = this.getTargets(target || 'svg');

        if (targets.length === 1 && targets[0] instanceof SVGSVGElement) {
            // In the common case where we draw to a single SVG element, draw directly.
            this.reactionDrawer.draw(reaction, targets[0], theme, weights, above, below);
            if (callback) {
                callback(targets[0]);
            }
        }
        else {
            // Otherwise, draw the SVG once and copy it out to the target elements.
            const svg = this.reactionDrawer.draw(reaction, null, theme, weights, above, below);
            this.copySvgToTargets(svg, targets, callback);
        }
    }

    svgToCanvas(svg, canvas = null) {
        return DomHelper.svgToCanvas(svg, canvas);
    }

    svgToImg(svg, img = null) {
        return DomHelper.svgToImg(svg, img);
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
            if (!(element instanceof SVGElement)) {
                if (w === null) w = element.width;
                if (h === null) h = element.height;
            }

            if (element.style.width !== '') {
                w = parseInt(element.style.width);
            }

            if (element.style.height !== '') {
                h = parseInt(element.style.height);
            }
        }
        else if (svg) {
            w = parseFloat(svg.style.width);
            h = parseFloat(svg.style.height);
        }

        return {w: w, h: h};
    }

    getTargets(target) {
        // Probably a querySelectorAll() result.
        if (target instanceof NodeList) {
            return target;
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
        return document.querySelectorAll(target);
    }

    copySvgToTargets(svg, targets, callback) {
        let data_url = undefined;
        let promise  = undefined;

        const w = this.drawer.opts.width;
        const h = this.drawer.opts.height;

        targets.forEach((element) => {
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
                console.warn(`Can't copy an SVG to a ${element.constructor.name}!`);
                return;
            }

            // This only runs if callback is callable:
            promise.then(callback);
        });
    }
}
