//@ts-check
const Vector2 = require('./Vector2')
const Options = require('./Options')
const CanvasWrapper = require('./CanvasWrapper')

class ReactionArrow {
    /**
     * 
     * @param {Vector2} from The starting point of the line.
     * @param {Vector2} to The end point of the line.
     */
    constructor(from, to, textAbove, textBelow, options) {
        this.from = from;
        this.to = to;
        this.textAbove = textAbove;
        this.textBelow = textBelow;

        this.defaultOptions = {
            color: 'black',
            lineWidth: 2.0,
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

        this.canvas = document.createElement("canvas");
        let arrowheadSize = Math.max(
            this.opts.fromArrowhead.width,
            this.opts.fromArrowhead.length,
            this.opts.toArrowhead.width,
            this.opts.toArrowhead.length
        );
        let padding = new Vector2(arrowheadSize, arrowheadSize).multiplyScalar(2);
        this.from.add(padding);
        this.to.add(padding);

        this.canvas.width = Math.max(this.from.x, this.to.x) + arrowheadSize;
        this.canvas.height = Math.max(this.from.y, this.to.y) + arrowheadSize;
        this.ctx = this.canvas.getContext('2d');
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

        CanvasWrapper.trimCanvas(this.canvas);
    }

    drawLine(color = "black", lineWidth = 1.0) {
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = lineWidth;

        this.ctx.beginPath();
        this.ctx.moveTo(this.from.x, this.from.y);
        this.ctx.lineTo(this.to.x, this.to.y);
        this.ctx.stroke();
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
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(x, y);
        this.ctx.rotate(rad);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(width, length);
        this.ctx.lineTo(-width, length);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
}

module.exports = ReactionArrow;