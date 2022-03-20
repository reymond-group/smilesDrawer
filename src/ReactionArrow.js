//@ts-check
const Vector2 = require('./Vector2')
const Options = require('./Options')
const CanvasWrapper = require('./CanvasWrapper')
const ReactionText = require('./ReactionText')

class ReactionArrow {
    /**
     * 
     * @param {Vector2} from The starting point of the line.
     * @param {Vector2} to The end point of the line.
     */
    constructor(from, to, options, textAbove, textBelow) {
        this.from = from;
        this.to = to;

        this.defaultOptions = {
            color: 'black',
            lineWidth: 2.0,
            spacing: 5.0,
            textAbove: {},
            textBelow: {},
            fromArrowhead: {
                show: false,
                color: 'black',
                width: 10.0,
                length: 10.0
            },
            toArrowhead: {
                show: true,
                color: 'black',
                width: 10.0,
                length: 10.0
            }
        };

        this.opts = Options.extend(true, this.defaultOptions, options);

        this.textAbove = textAbove ? new ReactionText(textAbove, this.opts.textAbove) : null;
        this.textBelow = textBelow ? new ReactionText(textBelow, this.opts.textBelow) : null;

        this.canvas = document.createElement('canvas');
        this.arrowCanvas = document.createElement('canvas');

        let arrowheadSize = Math.max(
            this.opts.fromArrowhead.width,
            this.opts.fromArrowhead.length,
            this.opts.toArrowhead.width,
            this.opts.toArrowhead.length
        );
        let padding = new Vector2(arrowheadSize, arrowheadSize).multiplyScalar(2);

        this.from.add(padding);
        this.to.add(padding);

        this.arrowCanvas.width = Math.max(this.from.x, this.to.x) + arrowheadSize
        this.arrowCanvas.height = Math.max(this.from.y, this.to.y) + arrowheadSize

        this.arrowCtx = this.arrowCanvas.getContext('2d');
        this.angle = Math.atan((this.to.y - this.from.y) / (this.to.x - this.from.x));

        this.drawLine(this.opts.color, this.opts.lineWidth)
        if (this.opts.fromArrowhead.show) {
            this.drawFromArrowhead(
                this.opts.fromArrowhead.color,
                this.opts.fromArrowhead.width,
                this.opts.fromArrowhead.length
            );
        }

        if (this.opts.toArrowhead.show) {
            this.drawToArrowhead(
                this.opts.toArrowhead.color,
                this.opts.toArrowhead.width,
                this.opts.toArrowhead.length
            );
        }

        CanvasWrapper.trimCanvas(this.arrowCanvas);

        let canvases = [];

        if (this.textAbove) {
            canvases.push(this.textAbove.canvas);
        }

        canvases.push(this.arrowCanvas);

        if (this.textBelow) {
            canvases.push(this.textBelow.canvas);
        }

        CanvasWrapper.combine(this.canvas, canvases, this.opts.spacing, 'vertical');
    }

    drawLine(color = "black", lineWidth = 1.0) {
        this.arrowCtx.strokeStyle = color;
        this.arrowCtx.fillStyle = color;
        this.arrowCtx.lineWidth = lineWidth;

        this.arrowCtx.beginPath();
        this.arrowCtx.moveTo(this.from.x, this.from.y);
        this.arrowCtx.lineTo(this.to.x, this.to.y);
        this.arrowCtx.stroke();
    }

    drawFromArrowhead(color = "black", width = 5.0, length = 5.0) {
        let rad = this.angle + ((this.to.x > this.from.x) ? -90 : 90) * Math.PI / 180;
        this.drawArrowhead(this.from.x - length, this.from.y, rad, color, width, length);
    }

    drawToArrowhead(color = "black", width = 5.0, length = 5.0) {
        let rad = this.angle + ((this.to.x > this.from.x) ? 90 : -90) * Math.PI / 180;
        this.drawArrowhead(this.to.x + length, this.to.y, rad, color, width, length);
    }

    drawArrowhead(x, y, rad, color = "black", width = 5.0, length = 5.0) {
        width = width / 2.0
        this.arrowCtx.strokeStyle = color;
        this.arrowCtx.fillStyle = color;
        this.arrowCtx.save();
        this.arrowCtx.beginPath();
        this.arrowCtx.translate(x, y);
        this.arrowCtx.rotate(rad);
        this.arrowCtx.moveTo(0, 0);
        this.arrowCtx.lineTo(width, length);
        this.arrowCtx.lineTo(-width, length);
        this.arrowCtx.closePath();
        this.arrowCtx.fill();
        this.arrowCtx.restore();
    }
}

module.exports = ReactionArrow;