import formulaToCommonName from './FormulaToCommonName';
// import Graph               from './Graph';
import Options             from './Options';
import Reaction            from './Reaction';
import SvgDrawer           from './SvgDrawer';
import SvgWrapper          from './SvgWrapper';
import ThemeManager        from './ThemeManager';

type ColorMap = {
    FOREGROUND: string
    BACKGROUND: string
};

type ThemeMap = {
    [index: string]: ColorMap
};

type MoleculeOptions = {
    width:   number
    height:  number
    padding: number
    scale:   number

    atomVisualization: string
    terminalCarbons:   boolean
    explicitHydrogens: boolean
    compactDrawing:    boolean

    bondLength:      number
    bondThickness:   number
    shortBondLength: number
    bondSpacing:     number
    fontFamily:      string
    fontSizeLarge:   number
    fontSizeSmall:   number

    isomeric:                    boolean
    debug:                       boolean
    overlapSensitivity:          number
    overlapResolutionIterations: number
    experimentalSSSR:            boolean

    kkThreshold:         number
    kkInnerThreshold:    number
    kkMaxIteration:      number
    kkMaxInnerIteration: number
    kkMaxEnergy:         number

    // weights: type TypeName {
    //     colormap:          null // ???
    //     additionalPadding: number
    //     sigma:             number
    //     interval:          number
    //     opacity:           number
    // }

    themes: ThemeMap
};

type ReactionOptions = {
    scale?:      number
    fontSize?:   number
    fontFamily?: string
    spacing?:    number

    plus?: {
        size?:      number
        thickness?: number
    }

    arrow?: {
        length?:    number
        headSize?:  number
        thickness?: number
        margin?:    number
    }

    weights?: {
        normalize?: boolean
    }
};

type ReactionWeights = {
    reactants?: number[][]
    reagents?:  number[][]
    products?:  number[][]
};

// function createSvgElement(name: string, attributes: object): SVGElement {
//     const element = document.createElementNS('http://www.w3.org/2000/svg', name)
//     for (const [attribute, value] of Object.entries(attributes)) {
//         element.setAttributeNS(null, attribute, value.toString())
//     }

//     return element
// }

export default class ReactionDrawer {
    defaultOptions: ReactionOptions;
    drawer:         SvgDrawer;
    molOpts:        MoleculeOptions;
    opts:           ReactionOptions;
    themeManager:   ThemeManager;

    /**
     * The constructor for the class ReactionDrawer.
     *
     * @param reactionOptions - An object containing reaction drawing specitic options.
     * @param moleculeOptions - An object containing molecule drawing specific options.
     */
    constructor(reactionOptions: ReactionOptions, moleculeOptions: MoleculeOptions) {
        this.defaultOptions = {
            scale:      moleculeOptions.scale > 0.0 ? moleculeOptions.scale : 1.0,
            fontSize:   moleculeOptions.fontSizeLarge * 0.8,
            fontFamily: 'Arial, Helvetica, sans-serif',
            spacing:    10,

            plus: {
                size:      9,
                thickness: 1.0,
            },

            arrow: {
                length:    moleculeOptions.bondLength * 4.0,
                headSize:  6.0,
                thickness: 1.0,
                margin:    3,
            },

            weights: {
                normalize: false,
            },
        };

        this.opts = Options.extend(true, this.defaultOptions, reactionOptions);

        this.drawer = new SvgDrawer(moleculeOptions);
        this.molOpts = this.drawer.opts;
    }

    /**
     * Draws the parsed reaction smiles data to a canvas element.
     *
     * @param reaction  - The reaction object returned by the reaction smiles parser.
     * @param target    - The id of the HTML canvas element the structure is drawn to - or the element itself.
     * @param themeName - The name of the theme to use. Built-in themes are 'light' and 'dark'.
     * @param weights   - The weights for reactants, agents, and products.
     * @param textAbove - The text above the arrow (default "{reagents}", which will be replaced).
     * @param textBelow - The text below the arrow.
     * @param infoOnly  - Only output info on the molecule without drawing anything to the canvas.
     *
     * @returns The svg element.
     */
    draw(
        reaction:  Reaction,
        target:    SVGElement | string,

        themeName: string          = 'light',
        weights:   ReactionWeights = undefined,
        textAbove: string          = '{reagents}',
        textBelow: string          = '',
        infoOnly:  boolean         = false
    ) {
        this.themeManager = new ThemeManager(this.molOpts.themes, themeName);

        // Normalize the weights over the reaction molecules
        if (this.opts.weights.normalize) {
            let max = -Number.MAX_SAFE_INTEGER;
            let min =  Number.MAX_SAFE_INTEGER;

            if ('reactants' in weights) {
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

            if ('reagents' in weights) {
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

            if ('products' in weights) {
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

            if ('reactants' in weights) {
                for (let i = 0; i < weights.reactants.length; i++) {
                    for (let j = 0; j < weights.reactants[i].length; j++) {
                        weights.reactants[i][j] /= abs_max;
                    }
                }
            }

            if ('reagents' in weights) {
                for (let i = 0; i < weights.reagents.length; i++) {
                    for (let j = 0; j < weights.reagents[i].length; j++) {
                        weights.reagents[i][j] /= abs_max;
                    }
                }
            }

            if ('products' in weights) {
                for (let i = 0; i < weights.products.length; i++) {
                    for (let j = 0; j < weights.products[i].length; j++) {
                        weights.products[i][j] /= abs_max;
                    }
                }
            }
        }

        let svg: SVGElement | Element;

        if (target === null || target === 'svg') {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttributeNS(null, 'width', 500 + '');
            svg.setAttributeNS(null, 'height', 500 + '');
        }
        else if (target instanceof SVGElement) {
            svg = target;
        }
        else {
            svg = document.getElementById(target);
        }

        if (!(svg instanceof SVGElement)) {
            throw Error('Target was not an SVGElement or the ID of an SVGElement.');
        }

        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        const elements = [];

        let maxHeight = 0.0;

        // Reactants
        for (let i = 0; i < reaction.reactants.length; i++) {
            if (i > 0) {
                elements.push({
                    width:  this.opts.plus.size * this.opts.scale,
                    height: this.opts.plus.size * this.opts.scale,
                    svg:    this.getPlus(),
                });
            }

            let reactantWeights = null;
            if (weights && 'reactants' in weights && weights.reactants.length > i) {
                reactantWeights = weights.reactants[i];
            }

            const reactantSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            this.drawer.draw(reaction.reactants[i], reactantSvg, themeName, reactantWeights, infoOnly, [], this.opts.weights.normalize);

            const element = {
                width:  reactantSvg.viewBox.baseVal.width  * this.opts.scale,
                height: reactantSvg.viewBox.baseVal.height * this.opts.scale,
                svg:    reactantSvg,
            };

            elements.push(element);

            if (element.height > maxHeight) {
                maxHeight = element.height;
            }
        }

        // Arrow
        elements.push({
            width:  this.opts.arrow.length   * this.opts.scale,
            height: this.opts.arrow.headSize * this.opts.scale * 2.0,
            svg:    this.getArrow(),
        });

        // Text above the arrow / reagents
        let reagentsText = '';
        for (let i = 0; i < reaction.reagents.length; i++) {
            if (i > 0) {
                reagentsText += ', ';
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
            svg:      topText.svg,
            height:   topText.height,
            width:    this.opts.arrow.length * this.opts.scale,
            offsetX:  -(this.opts.arrow.length * this.opts.scale + this.opts.spacing) + centerOffsetX,
            offsetY:  -(topText.height / 2.0) - this.opts.arrow.margin,
            position: 'relative',
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
            svg:      bottomText.svg,
            height:   bottomText.height,
            width:    this.opts.arrow.length * this.opts.scale,
            offsetX:  -(this.opts.arrow.length * this.opts.scale + this.opts.spacing) + centerOffsetX,
            offsetY:  bottomText.height / 2.0 + this.opts.arrow.margin,
            position: 'relative',
        });

        // Products
        for (let i = 0; i < reaction.products.length; i++) {
            if (i > 0) {
                elements.push({
                    width:  this.opts.plus.size * this.opts.scale,
                    height: this.opts.plus.size * this.opts.scale,
                    svg:    this.getPlus(),
                });
            }

            let productWeights = null;
            if (weights && 'products' in weights && weights.products.length > i) {
                productWeights = weights.products[i];
            }

            const productSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            this.drawer.draw(reaction.products[i], productSvg, themeName, productWeights, infoOnly, [], this.opts.weights.normalize);

            const element = {
                width:  productSvg.viewBox.baseVal.width  * this.opts.scale,
                height: productSvg.viewBox.baseVal.height * this.opts.scale,
                svg:    productSvg,
            };

            elements.push(element);

            if (element.height > maxHeight) {
                maxHeight = element.height;
            }
        }

        let totalWidth = 0.0;

        elements.forEach((element) => {
            const offsetX = element.offsetX || 0.0;
            const offsetY = element.offsetY || 0.0;

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

    getPlus(): SVGElement {
        const s = this.opts.plus.size.toString();
        const w = this.opts.plus.thickness.toString();
        const m = ((this.opts.plus.size - this.opts.plus.thickness) / 2).toString();

        const svg    = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const rect_h = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const rect_v = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        svg.setAttributeNS(null, 'id', 'plus');

        rect_h.setAttributeNS(null, 'x',     '0');
        rect_h.setAttributeNS(null, 'y',      m);
        rect_h.setAttributeNS(null, 'width',  s);
        rect_h.setAttributeNS(null, 'height', w);
        rect_h.setAttributeNS(null, 'fill',   this.themeManager.getColor('C'));

        rect_v.setAttributeNS(null, 'x',      m);
        rect_v.setAttributeNS(null, 'y',     '0');
        rect_v.setAttributeNS(null, 'width',  w);
        rect_v.setAttributeNS(null, 'height', s);
        rect_v.setAttributeNS(null, 'fill',   this.themeManager.getColor('C'));

        svg.appendChild(rect_h);
        svg.appendChild(rect_v);
        svg.setAttributeNS(null, 'viewBox', `0 0 ${s} ${s}`);

        return svg;
    }

    getArrowhead(): SVGMarkerElement {
        const s =  this.opts.arrow.headSize.toString();
        const h = (this.opts.arrow.headSize / 2).toString();

        const marker  = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

        marker.setAttributeNS(null, 'id',          'arrowhead');
        marker.setAttributeNS(null, 'viewBox',     `0 0 ${s} ${s}`);
        marker.setAttributeNS(null, 'markerUnits', 'userSpaceOnUse');
        marker.setAttributeNS(null, 'markerWidth',  s);
        marker.setAttributeNS(null, 'markerHeight', s);
        marker.setAttributeNS(null, 'refX',        '0');
        marker.setAttributeNS(null, 'refY',         h);
        marker.setAttributeNS(null, 'orient',      'auto');
        marker.setAttributeNS(null, 'fill',         this.themeManager.getColor('C'));

        polygon.setAttributeNS(null, 'points', `0 0, ${s} ${h}, 0 ${s}`);

        marker.appendChild(polygon);

        return marker;
    }

    getCDArrowhead(): SVGMarkerElement {
        const s = this.opts.arrow.headSize;
        const sw = s * (7 / 4.5);
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        const path   = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        marker.setAttributeNS(null, 'id',           'arrowhead');
        marker.setAttributeNS(null, 'viewBox',      `0 0 ${sw} ${s}`);
        marker.setAttributeNS(null, 'markerUnits',  'userSpaceOnUse');
        marker.setAttributeNS(null, 'markerWidth',  (sw * 2).toString());
        marker.setAttributeNS(null, 'markerHeight', (s  * 2).toString());
        marker.setAttributeNS(null, 'refX',         '2.2');
        marker.setAttributeNS(null, 'refY',         '2.2');
        marker.setAttributeNS(null, 'orient',       'auto');
        marker.setAttributeNS(null, 'fill',         this.themeManager.getColor('C'));

        path.setAttributeNS(null, 'style', 'fill-rule:nonzero;');
        path.setAttributeNS(null, 'd', 'm 0 0 l 7 2.25 l -7 2.25 c 0 0 0.735 -1.084 0.735 -2.28 c 0 -1.196 -0.735 -2.22 -0.735 -2.22 z');

        marker.appendChild(path);

        return marker;
    }

    getArrow(): SVGElement {
        const s = this.opts.arrow.headSize;
        const l = this.opts.arrow.length;

        const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        defs.appendChild(this.getCDArrowhead());
        svg.appendChild(defs);

        svg.setAttributeNS(null, 'id', 'arrow');

        line.setAttributeNS(null, 'x1',          '0.0');
        line.setAttributeNS(null, 'y1',          (this.opts.arrow.thickness / -2).toString());
        line.setAttributeNS(null, 'x2',           l.toString());
        line.setAttributeNS(null, 'y2',          (this.opts.arrow.thickness / -2).toString());
        line.setAttributeNS(null, 'stroke-width', this.opts.arrow.thickness.toString());
        line.setAttributeNS(null, 'stroke',       this.themeManager.getColor('C'));
        line.setAttributeNS(null, 'marker-end',  'url(#arrowhead)');

        svg.appendChild(line);
        svg.setAttributeNS(null, 'viewBox', `0 ${-s / 2.0} ${l + s * (7 / 4.5)} ${s}`);

        return svg;
    }
}
