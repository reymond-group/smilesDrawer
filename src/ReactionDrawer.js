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
            fontSize: 3.5,
            fontFamily: 'Helvetica, Arial, sans-serif',
            spacing: 5,
            plus: {},
            arrow: {
                length: 50,
                margin: 3
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
   * @param {(String|HTMLElement)} target The id of the HTML canvas element the structure is drawn to - or the element itself.
   * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
   * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
   * 
   * @returns {SVGElement} The svg element
   */
    draw(reaction, target, themeName = 'light', textAbove = '{reagents}', textBelow = '', infoOnly = false) {
        this.themeManager = new ThemeManager(this.molOpts.themes, themeName);
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
                    width: this.molOpts.fontSizeLarge * this.opts.scale,
                    height: this.molOpts.fontSizeLarge * this.opts.scale,
                    svg: this.getPlus()
                });
            }

            let reactantSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            this.drawer.draw(reaction.reactants[i], reactantSvg, themeName, infoOnly);

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
            height: this.molOpts.fontSizeLarge * 0.9 * this.opts.scale,
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
            '100%',
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
                    width: this.molOpts.fontSizeLarge * this.opts.scale,
                    height: this.molOpts.fontSizeLarge * this.opts.scale,
                    svg: this.getPlus()
                });
            }

            let productSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            this.drawer.draw(reaction.products[i], productSvg, themeName, infoOnly);

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

            element.svg.setAttributeNS(null, 'x', totalWidth + offsetX);
            element.svg.setAttributeNS(null, 'y', ((maxHeight - element.height) / 2.0) + offsetY);
            element.svg.setAttributeNS(null, 'width', element.width);
            element.svg.setAttributeNS(null, 'height', element.height);
            svg.appendChild(element.svg);

            if (element.position !== 'relative') {
                totalWidth += element.width + this.opts.spacing + offsetX;
            }
        });

        svg.setAttributeNS(null, 'viewBox', `0 0 ${totalWidth} ${maxHeight}`);
        svg.style.width = totalWidth + 'px';
        svg.style.height = maxHeight + 'px';

        return svg;
    }

    getPlus() {
        let s = this.molOpts.fontSizeLarge * 0.9;
        let w = s / 10.0;
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
        let s = this.molOpts.fontSizeLarge * 0.9;
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
        let s = this.molOpts.fontSizeLarge * 0.9;
        let sw = s * (7 / 4.5);
        let marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        marker.setAttributeNS(null, 'id', 'arrowhead');
        marker.setAttributeNS(null, 'viewBox', `0 0 ${sw} ${s}`);
        marker.setAttributeNS(null, 'markerUnits', 'userSpaceOnUse');
        marker.setAttributeNS(null, 'markerWidth', sw);
        marker.setAttributeNS(null, 'markerHeight', s);
        marker.setAttributeNS(null, 'refX', 2.2);
        marker.setAttributeNS(null, 'refY', s / 2);
        marker.setAttributeNS(null, 'orient', 'auto');
        marker.setAttributeNS(null, 'fill', this.themeManager.getColor("C"));

        path.setAttributeNS(null, 'style', 'fill-rule:nonzero;');
        path.setAttributeNS(null, 'd', 'M0,0L7.0,2.25L0,4.5C0,4.5 0.735,3.416 0.735,2.22C0.735,1.024 0,0 0,0Z');

        marker.appendChild(path);

        return marker;
    }

    getArrow() {
        let s = this.molOpts.fontSizeLarge * 0.9;
        let w = s / 10.0;
        let l = this.opts.arrow.length;

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        defs.appendChild(this.getCDArrowhead());
        svg.appendChild(defs);

        svg.setAttributeNS(null, 'id', 'arrow');

        line.setAttributeNS(null, 'x1', 0);
        line.setAttributeNS(null, 'y1', w / 2.0);
        line.setAttributeNS(null, 'x2', l);
        line.setAttributeNS(null, 'y2', w / 2.0);
        line.setAttributeNS(null, 'stroke-width', w);
        line.setAttributeNS(null, 'stroke', this.themeManager.getColor("C"));
        line.setAttributeNS(null, 'marker-end', 'url(#arrowhead)');

        svg.appendChild(line);
        svg.setAttributeNS(null, 'viewBox', `0 ${-s / 2.0} ${l + s} ${s}`);

        return svg;
    }
}

module.exports = ReactionDrawer;
