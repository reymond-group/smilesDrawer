const Drawer = require('./Drawer')
const ReactionArrow = require('./ReactionArrow');
const ReactionText = require('./ReactionText');
const Vector2 = require('./Vector2');
const Options = require('./Options')

class ReactionDrawer {
    /**
     * The constructor for the class ReactionDrawer.
     *
     * @param {Object} options An object containing reaction drawing specitic options.
     * @param {Object} moleculeOptions An object containing molecule drawing specific options.
     */
    constructor(options, moleculeOptions) {
        this.drawer = new Drawer(moleculeOptions);

        this.defaultOptions = {
            spacing: 10,
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
    draw(reaction, target, themeName = 'light', infoOnly = false) {
        let canvas = null;

        if (typeof target === 'string' || target instanceof String) {
            canvas = document.getElementById(target);
        } else {
            canvas = target;
        }

        let ctx = canvas.getContext('2d');
        let canvases = [];

        for (var i = 0; i < reaction.reactants.length; i++) {
            if (i > 0) {
                let text = new ReactionText("+", this.opts.plus);
                canvases.push(text.canvas);
            }
            this.drawer.draw(reaction.reactants[i], null, themeName, infoOnly);
            this.drawer.canvasWrapper.trim();
            canvases.push(this.drawer.canvasWrapper.canvas);
        }

        let rxnArrow = new ReactionArrow(
            new Vector2(0, 0),
            new Vector2(100, 0),
            "Some bla bla 😍\n",
            "100%",
            this.opts.arrow
        );
        canvases.push(rxnArrow.canvas);

        for (var i = 0; i < reaction.products.length; i++) {
            if (i > 0) {
                let text = new ReactionText("+", this.opts.plus);
                canvases.push(text.canvas);
            }
            this.drawer.draw(reaction.products[i], null, themeName, infoOnly);
            this.drawer.canvasWrapper.trim();
            canvases.push(this.drawer.canvasWrapper.canvas);
        }

        let canvasWidth = 0;
        let canvasHeight = 0;
        let drawingData = []

        for (var i = 0; i < canvases.length; i++) {
            let cv = canvases[i];

            if (canvasHeight < cv.height) {
                canvasHeight = cv.height;
            }

            if (i > 0) {
                canvasWidth += this.opts.spacing;
            }

            drawingData.push([cv, canvasWidth])
            canvasWidth += cv.width;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        drawingData.forEach(d => {
            ctx.drawImage(d[0], d[1], (canvasHeight / 2.0) - (d[0].height / 2.0), d[0].width, d[0].height);
        });
    }
}

module.exports = ReactionDrawer;