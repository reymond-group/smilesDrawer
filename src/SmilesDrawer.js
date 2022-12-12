//@ts-check
const Drawer = require('./Drawer')
const Parser = require('./Parser')
const ReactionParser = require('./ReactionParser')
const SvgDrawer = require('./SvgDrawer')
const ReactionDrawer = require('./ReactionDrawer')
const SvgWrapper = require('./SvgWrapper')
const Options = require('./Options');
class SmilesDrawer {
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

            if (element.hasAttribute('data-smiles-reactant-weights') ||
                element.hasAttribute('data-smiles-reagent-weights') ||
                element.hasAttribute('data-smiles-product-weights')) {
                weights = { reactants: [], reagents: [], products: [] };
                if (element.hasAttribute('data-smiles-reactant-weights')) {
                    weights.reactants = element.getAttribute('data-smiles-reactant-weights').split(';').map(v => {
                        return v.split(',').map(parseFloat)
                    });
                }

                if (element.hasAttribute('data-smiles-reagent-weights')) {
                    weights.reagents = element.getAttribute('data-smiles-reagent-weights').split(';').map(v => {
                        return v.split(',').map(parseFloat)
                    });
                }

                if (element.hasAttribute('data-smiles-product-weights')) {
                    weights.products = element.getAttribute('data-smiles-product-weights').split(';').map(v => {
                        return v.split(',').map(parseFloat)
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
            let settingsString = info.substring(
                info.indexOf('__') + 2,
                info.lastIndexOf('__')
            );

            settings = JSON.parse(settingsString.replaceAll('\'', '"'));
        }

        let defaultSettings = {
            textAboveArrow: '{reagents}',
            textBelowArrow: ''
        }

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
                    this.drawer.draw(parseTree, element, theme, weights);
                    // let dims = this.getDimensions(element);
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
                    this.reactionDrawer.draw(reaction, element, theme, weights, settings.textAboveArrow, settings.textBelowArrow);
                    // The svg has to have a css width and height set for the other
                    // tags, however, here it would overwrite the chosen width and height
                    if (this.reactionDrawer.opts.scale <= 0) {
                        element.style.width = null;
                        element.style.height = null;
                    }
                    // let dims = this.getDimensions(element);
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

        return { w: w, h: h };
    }
}

module.exports = SmilesDrawer;