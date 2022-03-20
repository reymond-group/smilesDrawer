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
        this.text = text.split('\n');
        for (var i = 0; i < this.text.length; i++) {
            this.text[i] = this.text[i].trim();
        }

        this.defaultOptions = {
            color: 'black',
            textAlign: 'left',
            font: {
                fontStyle: 'normal',
                fontVariant: 'normal',
                fontWeight: 'normal',
                fontSize: 14,
                fontFamily: 'Arial',
                lineHeight: 1.2
            }
        };

        this.opts = Options.extend(true, this.defaultOptions, options);

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.textDims = this.getTextDimensions(this.text);
        this.canvas.width = this.textDims.x;
        this.canvas.height = this.textDims.y;

        // CanvasWrapper.dpiAdjust(this.canvas, this.textDims.x, this.textDims.y);

        this.drawText(this.text);
        // CanvasWrapper.trimCanvas(this.canvas);
    }

    drawText(text) {
        this.ctx.moveTo(0.0, 0.0);
        for (var i = 0; i < text.length; i++) {
            let o = this.opts.font;
            this.ctx.font = `${o.fontStyle} ${o.fontVariant} ${o.fontWeight} ${o.fontSize}px ${o.fontFamily}`;
            this.ctx.fillStyle = this.opts.color;
            this.ctx.textAlign = this.opts.textAlign;
            this.ctx.textBaseline = 'top';
            this.ctx.fillText(text[i], 0, this.opts.font.lineHeight * this.opts.font.fontSize * i);
        }
    }

    getTextDimensions(text) {
        let dims = new Vector2(0.0, 0.0);
        let maxWidth = 0.0;
        let totalHeight = 0.0;
        text.forEach(t => {
            let o = this.opts.font;
            this.ctx.font = `${o.fontStyle} ${o.fontVariant} ${o.fontWeight} ${o.fontSize}px ${o.fontFamily}`;
            const metrics = this.ctx.measureText(t);
            let width = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);

            if (width > maxWidth) {
                maxWidth = width;
            }

            totalHeight += this.opts.font.lineHeight * this.opts.font.fontSize;
        });

        return new Vector2(maxWidth, totalHeight);
    }
}

module.exports = ReactionText;