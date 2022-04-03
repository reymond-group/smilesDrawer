const SvgDrawer = require('./SvgDrawer')
const Vector2 = require('./Vector2');
const Options = require('./Options');
const SvgWrapper = require('./SvgWrapper');

class ReactionDrawer {
    /**
     * The constructor for the class ReactionDrawer.
     *
     * @param {Object} options An object containing reaction drawing specitic options.
     * @param {Object} moleculeOptions An object containing molecule drawing specific options.
     */
    constructor(options, moleculeOptions) {
        this.drawer = new SvgDrawer(moleculeOptions, false);

        this.defaultOptions = {
            spacing: 15,
            plus: {},
            arrow: {}
        }

        this.opts = Options.extend(true, this.defaultOptions, options);
    }

    /**
   * Draws the parsed reaction smiles data to a canvas element.
   *
   * @param {Object} reaction The reaction object returned by the reaction smiles parser.
   * @param {(String|HTMLElement)} target The id of the HTML canvas element the structure is drawn to - or the element itself.
   * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
   * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
   */
    draw(reaction, target, textAbove = '{reagents}', textBelow = '', themeName = 'light', infoOnly = false) {
        console.log(reaction);
        let svg = null;

        if (typeof target === 'string' || target instanceof String) {
            svg = document.getElementById(target);
        } else {
            svg = target;
        }

        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        let svgs = [];

        for (var i = 0; i < reaction.reactants.length; i++) {
            let g = this.drawer.draw(reaction.reactants[i], svg, themeName, infoOnly);
            console.log(g)
            // this.drawer.canvasWrapper.trim();
            // canvases.push(this.drawer.canvasWrapper.canvas);
        }

        // let reagents = [];

        // for (var i = 0; i < reaction.reagents.length; i++) {
        //     reagents.push()
        // }

        // let rxnArrow = new ReactionArrow(
        //     new Vector2(0, 0),
        //     new Vector2(100, 0),
        //     this.opts.arrow,
        //     textAbove,
        //     textBelow
        // );
        // canvases.push(rxnArrow.canvas);

        // for (var i = 0; i < reaction.products.length; i++) {
        //     if (i > 0) {
        //         let text = new ReactionText("+", this.opts.plus);
        //         canvases.push(text.canvas);
        //     }
        //     this.drawer.draw(reaction.products[i], null, themeName, infoOnly);
        //     this.drawer.canvasWrapper.trim();
        //     canvases.push(this.drawer.canvasWrapper.canvas);
        // }

        // CanvasWrapper.combine(canvas, canvases, this.opts.spacing);
    }
}

module.exports = ReactionDrawer;
