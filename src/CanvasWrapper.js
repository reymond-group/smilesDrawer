/** A class wrapping a canvas element */
class CanvasWrapper {
    /**
     * The constructor for the class CanvasWrapper.
     *
     * @param {string} targetId The canvas id.
     * @param {object} theme A theme from the smiles drawer options.
     */
    constructor(targetId, theme) {
        this.canvas = document.getElementById(targetId);
        this.ctx = this.canvas.getContext('2d');
        this.colors = theme;
        
        this.drawingWidth = 0.0;
        this.drawingHeight = 0.0;
        this.offsetX = 0.0;
        this.offsetY = 0.0;
    
        this.clear();
    }

    /**
     * Sets a provided theme.
     *
     * @param {object} theme A theme from the smiles drawer options.
     */
    setTheme(theme) {
        this.colors = theme;
    }
    
    /**
     * Scale the canvas based on vertex positions.
     *
     * @param {array} vertices An array of vertices containing the vertices associated with the current molecule.
     */
    scale(vertices) {
        // Figure out the final size of the image
        var max = { x: -Number.MAX_VALUE, y: -Number.MAX_VALUE };
        var min = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };

        for (var i = 0; i < vertices.length; i++) {
            var p = vertices[i].position;
            if(max.x < p.x) max.x = p.x;
            if(max.y < p.y) max.y = p.y;
            if(min.x > p.x) min.x = p.x;
            if(min.y > p.y) min.y = p.y;
        }

        // Add padding
        var padding = 20.0;
        max.x += padding;
        max.y += padding;
        min.x -= padding;
        min.y -= padding;

        this.drawingWidth = max.x - min.x;
        this.drawingHeight = max.y - min.y;

        var scaleX = this.canvas.offsetWidth / this.drawingWidth;
        var scaleY = this.canvas.offsetHeight / this.drawingHeight;

        var scale = (scaleX < scaleY) ? scaleX : scaleY;

        this.ctx.scale(scale, scale);

        this.offsetX = -min.x;
        this.offsetY = -min.y;

        // Center
        if (scaleX < scaleY) {
            this.offsetY += this.canvas.offsetHeight / (2.0 * scale) - this.drawingHeight / 2.0;
        }
        else {
            this.offsetX += this.canvas.offsetWidth / (2.0 * scale) - this.drawingWidth / 2.0;
        }
    }

    /**
     * Resets the transform of the canvas.
     *
     */
    reset() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    /**
     * Returns the hex code of a color associated with a key from the current theme.
     *
     * @param {string} key The color key in the theme (e.g. C, N, BACKGROUND, ...).
     * @returns {string} A color hex value.
     */
    getColor(key) {
        key = key.toUpperCase();

        if (key in this.colors) {
            return this.colors[key];
        }

        return this.colors['C'];
    }

    /**
     * Draws a circle to a canvas context.
     * @param {number} x The x coordinate of the circles center.
     * @param {number} y The y coordinate of the circles center.
     * @param {number} radius The radius of the circle
     * @param {string} color A hex encoded color.
     * @param {boolean} [fill=true] Whether to fill or stroke the circle.
     * @param {boolean} [debug=false] Draw in debug mode.
     * @param {string} [debugText=''] A debug message.
     */
    drawCircle(x, y, radius, color, fill = true, debug = false, debugText = '') {
        if (isNaN(x) || isNaN(y)) {
            return;
        }

        let ctx = this.ctx;
        let offsetX = this.offsetX;
        let offsetY = this.offsetY;

        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2, true); 
        ctx.closePath();

        if(debug) {
            if(fill) {
                ctx.fillStyle = '#f00';
                ctx.fill();
            } else {
                ctx.strokeStyle = '#f00';
                ctx.stroke();
            }

            this.drawDebugText(x, y, debugText);
        } else {
            if(fill) {
                ctx.fillStyle = color;
                ctx.fill();
            } else {
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    /**
     * Draw a line to a canvas.
     *
     * @param {Line} line A line.
     */
    drawLine(line) {
        if (isNaN(line.from.x) || isNaN(line.from.y) || 
                isNaN(line.to.x) || isNaN(line.to.y)) {
            return;
        }

        let ctx = this.ctx;
        let offsetX = this.offsetX;
        let offsetY = this.offsetY;

        // Add a shadow behind the line
        let shortLine = line.clone().shorten(8.0);

        let l = shortLine.getLeftVector().clone();
        let r = shortLine.getRightVector().clone();

        l.x += offsetX;
        l.y += offsetY;

        r.x += offsetX;
        r.y += offsetY;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(r.x, r.y);
        ctx.lineCap = 'round';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = this.getColor('BACKGROUND');
        ctx.shadowBlur = 0.0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = this.getColor('BACKGROUND');
        ctx.stroke();
        ctx.restore();


        l = line.getLeftVector().clone();
        r = line.getRightVector().clone();

        l.x += offsetX;
        l.y += offsetY;

        r.x += offsetX;
        r.y += offsetY;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(r.x, r.y);
        ctx.lineCap = 'round';
        ctx.lineWidth = 1.5;

        let gradient = this.ctx.createLinearGradient(l.x, l.y, r.x, r.y);
        gradient.addColorStop(0.4, this.getColor(line.getLeftElement()) || 
                this.getColor('C'));
        gradient.addColorStop(0.6, this.getColor(line.getRightElement()) || 
                this.getColor('C'));

        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();
    }

    /**
     * Draws a debug text message at a given position
     *
     * @param {number} x The x coordinate.
     * @param {number} y The y coordinate.
     * @param {string} text The debug text.
     */
    drawDebugText(x, y, text) {
        let ctx = this.ctx;
        ctx.save();
        
        ctx.font = '5px Droid Sans, sans-serif';
        ctx.textAlign = 'start';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#ff0000';
        ctx.fillText(text, x + this.offsetX, y + this.offsetY);
        ctx.restore();
    }

    /**
     * Draw a text to the canvas.
     *
     * @param {number} x The x position of the text.
     * @param {number} y The y position of the text.
     * @param {number} hydrogens The number of hydrogen atoms.
     * @param {string} direction The direction of the text in relation to the associated vertex.
     * @param {boolean} isTerminal A boolean indicating whether or not the vertex is terminal.
     * @param {string} charge The charge of the atom.
     */
    drawText(x, y, elementName, hydrogens, direction, isTerminal, charge) {
        // Return empty line element for debugging, remove this check later, values should not be NaN
        if (isNaN(x) || isNaN(y)) {
            return;
        }

        let ctx = this.ctx;
        let offsetX = this.offsetX;
        let offsetY = this.offsetY;

        ctx.save();

        let fontLarge = '10px Droid Sans, sans-serif';
        let fontSmall = '6px Droid Sans, sans-serif';

        ctx.textAlign = 'start';
        ctx.textBaseline = 'top';

        // Charge
        let chargeText = '+'
        let chargeWidth = 0;
        if (charge) {
            if (charge === 2) {
                chargeText = '2+';
            } else if (charge === -1) {
                chargeText = '-';
            } else if (charge === -2) {
                chargeText = '2-';
            }

            ctx.font = fontSmall;
            chargeWidth = ctx.measureText(chargeText).width;
        }

        ctx.font = fontLarge;
        ctx.fillStyle = this.getColor(elementName);

        let dim = ctx.measureText(elementName);
        dim.totalWidth = dim.width + chargeWidth;
        dim.height = parseInt(fontLarge, 10);

        let r = (dim.totalWidth > dim.height) ? dim.totalWidth : dim.height;
        r /= 2.0;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY + dim.height / 20.0, 
                r + 1.0, 0, Math.PI * 2, true); 
        ctx.closePath();
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // Correct vertical text position
        // y -= 2;

        ctx.fillStyle = this.getColor(elementName);
        ctx.fillText(elementName, x - dim.totalWidth / 2.0 + offsetX, 
                y - dim.height / 2.0 + offsetY);

        if(charge) {
            ctx.font = fontSmall;
            ctx.fillText(chargeText, x - dim.totalWidth / 2.0 + dim.width + offsetX, 
                    y - dim.height / 2.0 + offsetY);
        }

        ctx.font = fontLarge;

        let hDim = ctx.measureText('H');
        hDim.height = parseInt(fontLarge, 10);

        if (hydrogens === 1) {
            let hx = x - dim.totalWidth / 2.0 + offsetX;
            let hy = y - dim.height / 2.0 + offsetY;

            if (direction === 'left') {
                hx -= dim.totalWidth;
            } else if (direction === 'right') {
                hx += dim.totalWidth;
            } else if (direction === 'up' && isTerminal) {
                hx += dim.totalWidth;
            } else if (direction === 'down' && isTerminal) {
                hx += dim.totalWidth;
            } else if (direction === 'up' && !isTerminal) {
                hy -= dim.height;
            } else if (direction === 'down' && !isTerminal) {
                hy += dim.height;
            }

            ctx.fillText('H', hx, hy);
        } else if (hydrogens > 1) {
            let hx = x - dim.totalWidth / 2.0 + offsetX;
            let hy = y - dim.height / 2.0 + offsetY;

            ctx.font = fontSmall;
            let cDim = ctx.measureText(hydrogens);
            cDim.height = parseInt(fontSmall, 10);

            if (direction === 'left') {
                hx -= hDim.width + cDim.width;
            } else if (direction === 'right') {
                hx += dim.totalWidth;
            } else if (direction === 'up' && isTerminal) {
                hx += dim.totalWidth;
            } else if (direction === 'down' && isTerminal) {
                hx += dim.totalWidth;
            } else if (direction === 'up' && !isTerminal) {
                hy -= dim.height;
            } else if (direction === 'down' && !isTerminal) {
                hy += dim.height;
            }

            ctx.font = fontLarge;
            ctx.fillText('H', hx, hy)

                ctx.font = fontSmall;
            ctx.fillText(hydrogens, hx + hDim.width, hy + hDim.height / 2.0);
        }

        ctx.restore();
    }

    /**
     * Draws a dubug dot at a given coordinate and adds text.
     *
     * @param {number} x The x coordinate.
     * @param {number} y The y coordindate.
     * @param {string} [debugText=''] A string.
     * @param {string} [color='#f00'] A color in hex form.
     */
    drawDebugPoint(x, y, debugText = '', color = '#f00') {
        this.drawCircle(x, y, 2, color, true, true, debugText);
    }

    /**
     * Draws a ring inside a provided ring, indicating aromaticity.
     *
     * @param {Ring} ring A ring.
     */
    drawAromaticityRing(ring) {
        var ctx = this.ctx;

        ctx.save();
        ctx.strokeStyle = this.getColor('C');
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ring.center.x + this.offsetX, ring.center.y + this.offsetY, 
                ring.radius - 10, 0, Math.PI * 2, true); 
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    /**
     * Clear the canvas.
     *
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

}
