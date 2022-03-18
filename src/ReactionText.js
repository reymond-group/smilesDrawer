//@ts-check
const Vector2 = require('./Vector2')
const Options = require('./Options')
const CanvasWrapper = require('./CanvasWrapper')

class ReactionText {
    /**
     * 
     * @param {string} text The text to be drawn.
     * @param {Object} options The options for this text.
     */
    constructor(text, options) {
        this.text = text;

        this.defaultOptions = {
            color: 'black',
            textAlign: 'left',
            font: {
                fontStyle: 'normal',
                fontVariant: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                fontFamily: 'Arial'
            }
        };

        this.opts = Options.extend(true, this.defaultOptions, options);

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.drawText(text);
        CanvasWrapper.trimCanvas(this.canvas);
    }

    drawText(text) {
        let o = this.opts.font;
        this.ctx.font = `${o.fontStyle} ${o.fontVariant} ${o.fontWeight} ${o.fontSize} ${o.fontFamily}`;
        this.ctx.fillStyle = this.opts.color;
        this.ctx.textAlign = this.opts.textAlign;
        this.ctx.fillText(text, 20, 20);
    }
}

module.exports = ReactionText;