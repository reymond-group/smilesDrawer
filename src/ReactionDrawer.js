const SvgDrawer = require('./SvgDrawer');
const SvgWrapper = require('./SvgWrapper');
const Options = require('./Options');
const ThemeManager = require('./ThemeManager');
const formulaToCommonName = require('./FormulaToCommonName');

class ReactionDrawer {
    /**
     * The constructor for the class ReactionDrawer.
     *
     * @param {Object} options An object containing reaction drawing specitic options.
     * @param {Object} moleculeOptions An object containing molecule drawing specific options.
     */
    constructor(options, moleculeOptions) {
        this.defaultOptions = {
            scale: moleculeOptions.scale > 0.0 ? moleculeOptions.scale : 1.0,
            fontSize: moleculeOptions.fontSizeLarge * 0.8,
            fontFamily: 'Arial, Helvetica, sans-serif',
            spacing: 10,
            plus: {
                size: 9,
                thickness: 1.0
            },
            arrow: {
                length: moleculeOptions.bondLength * 4.0,
                headSize: 6.0,
                thickness: 1.0,
                margin: 3
            },
            weights: {
                normalize: false
            }
        }

        this.opts = Options.extend(true, this.defaultOptions, options);

        this.drawer = new SvgDrawer(moleculeOptions);
        this.molOpts = this.drawer.opts;
    }

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
    draw(reaction, target, themeName = 'light', weights = null, textAbove = '{reagents}', textBelow = '', infoOnly = false) {
        this.themeManager = new ThemeManager(this.molOpts.themes, themeName);

        // Normalize the weights over the reaction molecules
        if (this.opts.weights.normalize) {
            let max = -Number.MAX_SAFE_INTEGER;
            let min = Number.MAX_SAFE_INTEGER;

            if (weights.hasOwnProperty('reactants')) {
                for (let i = 0; i < weights.reactants.length; i++) {
                    for (let j = 0; j < weights.reactants[i].length; j++) {
                        if (weights.reactants[i][j] < min) {
                            min = weights.reactants[i][j];
                        }
                        if (weights.reactants[i][j] > max) {
                            max = weights.reactants[i][j];
                        }
                    }
                }
            }

            if (weights.hasOwnProperty('reagents')) {
                for (let i = 0; i < weights.reagents.length; i++) {
                    for (let j = 0; j < weights.reagents[i].length; j++) {
                        if (weights.reagents[i][j] < min) {
                            min = weights.reagents[i][j];
                        }
                        if (weights.reagents[i][j] > max) {
                            max = weights.reagents[i][j];
                        }
                    }
                }
            }

            if (weights.hasOwnProperty('products')) {
                for (let i = 0; i < weights.products.length; i++) {
                    for (let j = 0; j < weights.products[i].length; j++) {
                        if (weights.products[i][j] < min) {
                            min = weights.products[i][j];
                        }
                        if (weights.products[i][j] > max) {
                            max = weights.products[i][j];
                        }
                    }
                }
            }

            let abs_max = Math.max(Math.abs(min), Math.abs(max));
            if (abs_max === 0.0) {
                abs_max = 1;
            }

            if (weights.hasOwnProperty('reactants')) {
                for (let i = 0; i < weights.reactants.length; i++) {
                    for (let j = 0; j < weights.reactants[i].length; j++) {
                        weights.reactants[i][j] /= abs_max;
                    }
                }
            }

            if (weights.hasOwnProperty('reagents')) {
                for (let i = 0; i < weights.reagents.length; i++) {
                    for (let j = 0; j < weights.reagents[i].length; j++) {
                        weights.reagents[i][j] /= abs_max;
                    }
                }
            }

            if (weights.hasOwnProperty('products')) {
                for (let i = 0; i < weights.products.length; i++) {
                    for (let j = 0; j < weights.products[i].length; j++) {
                        weights.products[i][j] /= abs_max;
                    }
                }
            }
        }

        let svg = null;

        if (target === null || target === 'svg') {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttributeNS(null, 'width', 500 + '');
            svg.setAttributeNS(null, 'height', 500 + '');
        } else if (typeof target === 'string' || target instanceof String) {
            svg = document.getElementById(target);
        } else {
            svg = target;
        }

        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        let elements = [];

        let maxHeight = 0.0

        // Reactants
        for (var i = 0; i < reaction.reactants.length; i++) {
            if (i > 0) {
                elements.push({
                    width: this.opts.plus.size * this.opts.scale,
                    height: this.opts.plus.size * this.opts.scale,
                    svg: this.getPlus()
                });
            }

            let reactantWeights = null;
            if (weights && weights.hasOwnProperty('reactants') && weights.reactants.length > i) {
                reactantWeights = weights.reactants[i];
            }

            let reactantSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            this.drawer.draw(reaction.reactants[i], reactantSvg, themeName, reactantWeights, infoOnly, [], this.opts.weights.normalize);

            let element = {
                width: reactantSvg.viewBox.baseVal.width * this.opts.scale,
                height: reactantSvg.viewBox.baseVal.height * this.opts.scale,
                svg: reactantSvg
            };

            elements.push(element);

            if (element.height > maxHeight) {
                maxHeight = element.height;
            }
        }

        // Arrow
        elements.push({
            width: this.opts.arrow.length * this.opts.scale,
            height: this.opts.arrow.headSize * 2.0 * this.opts.scale,
            svg: this.getArrow()
        });

        // Text above the arrow / reagents
        let reagentsText = "";
        for (var i = 0; i < reaction.reagents.length; i++) {
            if (i > 0) {
                reagentsText += ", "
            }

            let text = this.drawer.getMolecularFormula(reaction.reagents[i]);
            if (text in formulaToCommonName) {
                text = formulaToCommonName[text];
            }

            reagentsText += SvgWrapper.replaceNumbersWithSubscript(text);
        }

        textAbove = textAbove.replace('{reagents}', reagentsText);

        const topText = SvgWrapper.writeText(
            textAbove,
            this.themeManager,
            this.opts.fontSize * this.opts.scale,
            this.opts.fontFamily,
            this.opts.arrow.length * this.opts.scale
        );

        let centerOffsetX = (this.opts.arrow.length * this.opts.scale - topText.width) / 2.0;

        elements.push({
            svg: topText.svg,
            height: topText.height,
            width: this.opts.arrow.length * this.opts.scale,
            offsetX: -(this.opts.arrow.length * this.opts.scale + this.opts.spacing) + centerOffsetX,
            offsetY: -(topText.height / 2.0) - this.opts.arrow.margin,
            position: 'relative'
        });

        // Text below arrow
        const bottomText = SvgWrapper.writeText(
            textBelow,
            this.themeManager,
            this.opts.fontSize * this.opts.scale,
            this.opts.fontFamily,
            this.opts.arrow.length * this.opts.scale
        );

        centerOffsetX = (this.opts.arrow.length * this.opts.scale - bottomText.width) / 2.0;

        elements.push({
            svg: bottomText.svg,
            height: bottomText.height,
            width: this.opts.arrow.length * this.opts.scale,
            offsetX: -(this.opts.arrow.length * this.opts.scale + this.opts.spacing) + centerOffsetX,
            offsetY: bottomText.height / 2.0 + this.opts.arrow.margin,
            position: 'relative'
        });

        // Products
        for (var i = 0; i < reaction.products.length; i++) {
            if (i > 0) {
                elements.push({
                    width: this.opts.plus.size * this.opts.scale,
                    height: this.opts.plus.size * this.opts.scale,
                    svg: this.getPlus()
                });
            }

            let productWeights = null;
            if (weights && weights.hasOwnProperty('products') && weights.products.length > i) {
                productWeights = weights.products[i];
            }

            let productSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            this.drawer.draw(reaction.products[i], productSvg, themeName, productWeights, infoOnly, [], this.opts.weights.normalize);

            let element = {
                width: productSvg.viewBox.baseVal.width * this.opts.scale,
                height: productSvg.viewBox.baseVal.height * this.opts.scale,
                svg: productSvg
            };

            elements.push(element);

            if (element.height > maxHeight) {
                maxHeight = element.height;
            }
        }

        let totalWidth = 0.0;

        elements.forEach(element => {
            let offsetX = element.offsetX ?? 0.0;
            let offsetY = element.offsetY ?? 0.0;

            element.svg.setAttributeNS(null, 'x', Math.round(totalWidth + offsetX));
            element.svg.setAttributeNS(null, 'y', Math.round(((maxHeight - element.height) / 2.0) + offsetY));
            element.svg.setAttributeNS(null, 'width', Math.round(element.width));
            element.svg.setAttributeNS(null, 'height', Math.round(element.height));
            svg.appendChild(element.svg);

            if (element.position !== 'relative') {
                totalWidth += Math.round(element.width + this.opts.spacing + offsetX);
            }
        });

        svg.setAttributeNS(null, 'viewBox', `0 0 ${totalWidth} ${maxHeight}`);
        svg.style.width = totalWidth + 'px';
        svg.style.height = maxHeight + 'px';

        return svg;
    }

    getPlus() {
        let s = this.opts.plus.size;
        let w = this.opts.plus.thickness;
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let rect_h = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        let rect_v = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        svg.setAttributeNS(null, 'id', 'plus');

        rect_h.setAttributeNS(null, 'x', 0);
        rect_h.setAttributeNS(null, 'y', s / 2.0 - w / 2.0);
        rect_h.setAttributeNS(null, 'width', s);
        rect_h.setAttributeNS(null, 'height', w);
        rect_h.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));

        rect_v.setAttributeNS(null, 'x', s / 2.0 - w / 2.0);
        rect_v.setAttributeNS(null, 'y', 0);
        rect_v.setAttributeNS(null, 'width', w);
        rect_v.setAttributeNS(null, 'height', s);
        rect_v.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));

        svg.appendChild(rect_h);
        svg.appendChild(rect_v);
        svg.setAttributeNS(null, 'viewBox', `0 0 ${s} ${s}`);

        return svg;
    }

    getArrowhead() {
        let s = this.opts.arrow.headSize;
        let marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

        marker.setAttributeNS(null, 'id', 'arrowhead');
        marker.setAttributeNS(null, 'viewBox', `0 0 ${s} ${s}`);
        marker.setAttributeNS(null, 'markerUnits', 'userSpaceOnUse');
        marker.setAttributeNS(null, 'markerWidth', s);
        marker.setAttributeNS(null, 'markerHeight', s);
        marker.setAttributeNS(null, 'refX', 0);
        marker.setAttributeNS(null, 'refY', s / 2);
        marker.setAttributeNS(null, 'orient', 'auto');
        marker.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));

        polygon.setAttributeNS(null, 'points', `0 0, ${s} ${s / 2}, 0 ${s}`)

        marker.appendChild(polygon);

        return marker;
    }

    getCDArrowhead() {
        let s = this.opts.arrow.headSize;
        let sw = s * (7 / 4.5);
        let marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        marker.setAttributeNS(null, 'id', 'arrowhead');
        marker.setAttributeNS(null, 'viewBox', `0 0 ${sw} ${s}`);
        marker.setAttributeNS(null, 'markerUnits', 'userSpaceOnUse');
        marker.setAttributeNS(null, 'markerWidth', sw * 2);
        marker.setAttributeNS(null, 'markerHeight', s * 2);
        marker.setAttributeNS(null, 'refX', 2.2);
        marker.setAttributeNS(null, 'refY', 2.2);
        marker.setAttributeNS(null, 'orient', 'auto');
        marker.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));

        path.setAttributeNS(null, 'style', 'fill-rule:nonzero;');
        path.setAttributeNS(null, 'd', 'm 0 0 l 7 2.25 l -7 2.25 c 0 0 0.735 -1.084 0.735 -2.28 c 0 -1.196 -0.735 -2.22 -0.735 -2.22 z');

        marker.appendChild(path);

        return marker;
    }

    getArrow() {
        let s = this.opts.arrow.headSize;
        let l = this.opts.arrow.length;

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        defs.appendChild(this.getCDArrowhead());
        svg.appendChild(defs);

        svg.setAttributeNS(null, 'id', 'arrow');

        line.setAttributeNS(null, 'x1', 0.0);
        line.setAttributeNS(null, 'y1', -this.opts.arrow.thickness / 2.0);
        line.setAttributeNS(null, 'x2', l);
        line.setAttributeNS(null, 'y2', -this.opts.arrow.thickness / 2.0);
        line.setAttributeNS(null, 'stroke-width', this.opts.arrow.thickness);
        line.setAttributeNS(null, 'stroke', this.themeManager.getColor("C"));
        line.setAttributeNS(null, 'marker-end', 'url(#arrowhead)');

        svg.appendChild(line);
        svg.setAttributeNS(null, 'viewBox', `0 ${-s / 2.0} ${l + s * (7 / 4.5)} ${s}`);

        return svg;
    }
}

module.exports = ReactionDrawer;
