//@ts-check
const Drawer = require('./Drawer')
const Parser = require('./Parser')
const ReactionParser = require('./ReactionParser')
const SvgDrawer = require('./SvgDrawer')
const ReactionDrawer = require('./ReactionDrawer')
const SvgWrapper = require('./SvgWrapper')
class SmilesDrawer {
    constructor(moleculeOptions = {}, reactionOptions = {}) {
        this.drawer = new SvgDrawer(moleculeOptions);

        // moleculeOptions gets edited in reactionOptions, so clone
        this.reactionDrawer = new ReactionDrawer(reactionOptions, JSON.parse(JSON.stringify(moleculeOptions)));
    }

    draw(smiles, target, theme = 'light', successCallback = null, errorCallback = null) {
        if (smiles.includes('>')) {
            try {
                this.drawReaction(smiles, target, theme, successCallback);
            } catch (err) {
                errorCallback(err);
            }
        } else {
            try {
                this.drawMolecule(smiles, target, theme, successCallback);
            } catch (err) {
                errorCallback(err);
            }
        }
    }

    drawMolecule(smiles, target, theme, callback) {
        let parseTree = Parser.parse(smiles);

        if (target === null || target === 'svg') {
            let svg = this.drawer.draw(parseTree, null, theme);
            let dims = this.getDimensions(svg);
            svg.setAttributeNS(null, 'width', '' + dims.w);
            svg.setAttributeNS(null, 'height', '' + dims.h);
            callback(svg);
        } else if (target === 'canvas') {
            let canvas = this.svgToCanvas(this.drawer.draw(parseTree, null, theme));
            callback(canvas);
        } else if (target === 'img') {
            let img = this.svgToImg(this.drawer.draw(parseTree, null, theme));
            callback(img);
        } else {
            let elements = document.querySelectorAll(target);
            elements.forEach(element => {
                let tag = element.nodeName.toLowerCase();
                if (tag === 'svg') {
                    this.drawer.draw(parseTree, element, theme);
                    let dims = this.getDimensions(element);
                    element.setAttributeNS(null, 'width', '' + dims.w);
                    element.setAttributeNS(null, 'height', '' + dims.h);
                    callback(element);
                } else if (tag === 'canvas') {
                    this.svgToCanvas(this.drawer.draw(parseTree, null, theme), element);
                    callback(element);
                } else if (tag === 'img') {
                    this.svgToImg(this.drawer.draw(parseTree, null, theme), element);
                    callback(element);
                }
            });
        }
    }

    drawReaction(smiles, target, theme, callback) {
        let reaction = ReactionParser.parse(smiles);

        if (target === null || target === 'svg') {
            let svg = this.reactionDrawer.draw(reaction, null, '', '', theme);
            let dims = this.getDimensions(svg);
            svg.setAttributeNS(null, 'width', '' + dims.w);
            svg.setAttributeNS(null, 'height', '' + dims.h);
            callback(svg);
        } else if (target === 'canvas') {
            let canvas = this.svgToCanvas(this.reactionDrawer.draw(reaction, null, '', '', theme));
            callback(canvas);
        } else if (target === 'img') {
            let img = this.svgToImg(this.reactionDrawer.draw(reaction, null, '', '', theme));
            callback(img);
        } else {
            let elements = document.querySelectorAll(target);
            elements.forEach(element => {
                let tag = element.nodeName.toLowerCase();
                if (tag === 'svg') {
                    let dims = this.getDimensions(element);
                    this.reactionDrawer.draw(reaction, element, '', '', theme);
                    // The svg has to have a css width and height set for the other
                    // tags, however, here it would overwrite the chosen width and height
                    if (this.drawer.opts.scale <= 0) {
                        element.style.width = null;
                        element.style.height = null;
                    }
                    element.setAttributeNS(null, 'width', '' + dims.w);
                    element.setAttributeNS(null, 'height', '' + dims.h);
                    callback(element);
                } else if (tag === 'canvas') {
                    this.svgToCanvas(this.reactionDrawer.draw(reaction, null, '', '', theme), element);
                    callback(element);
                } else if (tag === 'img') {
                    this.svgToImg(this.reactionDrawer.draw(reaction, null, '', '', theme), element);
                    callback(element);
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