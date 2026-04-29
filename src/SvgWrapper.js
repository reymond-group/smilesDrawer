import DomHelper  from './DomHelper';
import Line       from './Line';
import MathHelper from './MathHelper';
import Vector2    from './Vector2';

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default class SvgWrapper {
    constructor(themeManager, target, options, clear = true) {
        this.svg = DomHelper.getDrawable(target, SVGSVGElement);

        this.container = null;
        this.opts = options;
        this.uid = makeid(5);
        this.gradientId = 0;

        this.defaultGradients = new Map();

        // maintain a list of line elements and their corresponding gradients
        // maintain a list of vertex elements
        // maintain a list of highlighting elements
        this.backgroundItems = [];
        this.paths = [];
        this.vertices = [];
        this.gradients = [];
        this.highlights = [];

        // maintain the dimensions
        this.drawingWidth = 0;
        this.drawingHeight = 0;
        this.halfBondThickness = this.opts.bondThickness / 2.0;

        // for managing color schemes
        this.themeManager = themeManager;

        // create the mask
        this.maskElements = [];

        // min and max values of the coordinates
        this.maxX = -Number.MAX_VALUE;
        this.maxY = -Number.MAX_VALUE;
        this.minX = Number.MAX_VALUE;
        this.minY = Number.MAX_VALUE;

        // clear the svg element
        if (clear) {
            while (this.svg.firstChild) {
                this.svg.removeChild(this.svg.firstChild);
            }
        }

        // Create styles here as text measurement is done before constructSvg
        this.style = document.createElementNS('http://www.w3.org/2000/svg', 'style');

        // create the css styles
        this.style.appendChild(document.createTextNode(`
                .element {
                    font: ${this.opts.fontSizeLarge}pt ${this.opts.fontFamily};
                }
                .sub {
                    font: ${this.opts.fontSizeSmall}pt ${this.opts.fontFamily};
                }
            `));

        if (this.svg) {
            this.svg.appendChild(this.style);
        }
        else {
            this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this.container.appendChild(this.style);
        }
    }

    constructSvg() {
    // TODO: add the defs element to put gradients in
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
            masks = document.createElementNS('http://www.w3.org/2000/svg', 'mask'),
            background = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
            highlights = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
            paths = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
            vertices = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
            pathChildNodes = this.paths;

        { // Set up the basic masking layer...
            let mask = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            mask.setAttributeNS(null, 'x', this.minX);
            mask.setAttributeNS(null, 'y', this.minY);
            mask.setAttributeNS(null, 'width', this.maxX - this.minX);
            mask.setAttributeNS(null, 'height', this.maxY - this.minY);
            mask.setAttributeNS(null, 'fill', 'white');

            masks.appendChild(mask);
        }

        // give the mask an id and set bounds explicitly for userSpaceOnUse
        masks.setAttributeNS(null, 'id', this.uid + '-text-mask');
        masks.setAttributeNS(null, 'maskUnits', 'userSpaceOnUse');
        masks.setAttributeNS(null, 'x', this.minX);
        masks.setAttributeNS(null, 'y', this.minY);
        masks.setAttributeNS(null, 'width', this.maxX - this.minX);
        masks.setAttributeNS(null, 'height', this.maxY - this.minY);

        for (let path of pathChildNodes) {
            paths.appendChild(path);
        }

        for (let backgroundItem of this.backgroundItems) {
            background.appendChild(backgroundItem);
        }
        for (let highlight of this.highlights) {
            highlights.appendChild(highlight);
        }
        for (let vertex of this.vertices) {
            vertices.appendChild(vertex);
        }
        for (let mask of this.maskElements) {
            masks.appendChild(mask);
        }
        for (let gradient of this.gradients) {
            defs.appendChild(gradient);
        }

        paths.setAttributeNS(null, 'mask', 'url(#' + this.uid + '-text-mask)');

        this.updateViewbox(this.opts.scale);

        if (this.svg) {
            this.svg.appendChild(defs);
            this.svg.appendChild(masks);
            this.svg.appendChild(background);
            this.svg.appendChild(highlights);
            this.svg.appendChild(paths);
            this.svg.appendChild(vertices);
        }
        else {
            this.container.appendChild(defs);
            this.container.appendChild(masks);
            this.container.appendChild(background);
            this.container.appendChild(paths);
            this.container.appendChild(vertices);
            return this.container;
        }
    }

    /**
     * Add a background to the svg.
     */
    addLayer(svg) {
        this.backgroundItems.push(svg.firstChild);
    }

    /**
     * Get the color or gradient URL for a line.
     *
     * @param {Vertex} vertex1 - The vertex on one end of the bond.
     * @param {Vertex} vertex2 - The vertex on the other end of the bond.
     * @returns {string} A string that can be used as a stroke or fill.
     */
    getBondColor(vertex1, vertex2) {
        const c1 = this.themeManager.getColor(vertex1.value.element);
        const c2 = this.themeManager.getColor(vertex2.value.element);

        if (c1 === c2) {
            return c1;
        }

        const cc = this.themeManager.getColor('C');
        const d  = vertex1.position.distance(vertex2.position) / this.opts.bondLength;

        if (d > 0.9 && d < 1.1) {
            // Bonds of a typical length with carbon on one end can share a radial gradient.
            if (c1 === cc) return this.getDefaultGradient(vertex2, c2, cc);
            if (c2 === cc) return this.getDefaultGradient(vertex1, c1, cc);
        }

        return this.createLinearGradient(vertex1.position, vertex2.position, [
            ['20%', c1],
            ['80%', c2],
        ]);
    }

    /**
     * Gets or creates a defaut atom-to-carbon radial gradient around a vertex.
     *
     * @param {Vertex}  vertex - The vertex.
     * @param {?string} color1 - The color of the vertex (uses the color of the atom by default).
     * @param {?string} color2 - The color at the radiuis (uses the color of carbon by default).
     * @returns {string} A "url(#gradient-id)" string that can be used as a stroke or fill.
     */
    getDefaultGradient(vertex, color1, color2) {
        let gradientUrl = this.defaultGradients.get(vertex);
        if (gradientUrl) return gradientUrl;

        gradientUrl = this.createRadialGradient(vertex.position, this.opts.bondLength, [
            ['20%', color1 || this.themeManager.getColor(vertex.value.element)],
            ['80%', color2 || this.themeManager.getColor('C')],
        ]);

        this.defaultGradients.set(vertex, gradientUrl);
        return gradientUrl;
    }

    /**
     * Create a radial gradient around a point.
     *
     * @param {Vector2} point  - The central point.
     * @param {number}  radius - A radius around that point.
     * @param {Array}   stops  - An array of (offset, color) pairs.
     * @returns {string} A "url(#gradient-id)" string that can be used as a stroke or fill.
     */
    createRadialGradient(point, radius, stops) {
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        const gradientId = this.uid + `-atom-${this.gradientId++}`;

        gradient.setAttributeNS(null, 'id', gradientId);
        gradient.setAttributeNS(null, 'gradientUnits', 'userSpaceOnUse');
        gradient.setAttributeNS(null, 'cx', point.x);
        gradient.setAttributeNS(null, 'cy', point.y);
        gradient.setAttributeNS(null, 'r',  radius);

        for (const [offset, color] of stops) {
            const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop.setAttributeNS(null, 'offset',     offset);
            stop.setAttributeNS(null, 'stop-color', color);
            gradient.appendChild(stop);
        }

        this.gradients.push(gradient);
        return `url(#${gradientId})`;
    }

    /**
     * Create a linear gradient between two points.
     *
     * @param {Vector2} point1 - The first point.
     * @param {Vector2} point2 - The second point.
     * @param {Array}   stops  - An array of (offset, color) pairs.
     * @returns {string} A "url(#gradient-id)" string that can be used as a stroke or fill.
     */
    createLinearGradient(point1, point2, stops) {
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        const gradientId = this.uid + `-bond-${this.gradientId++}`;

        gradient.setAttributeNS(null, 'id', gradientId);
        gradient.setAttributeNS(null, 'gradientUnits', 'userSpaceOnUse');
        gradient.setAttributeNS(null, 'x1', point1.x);
        gradient.setAttributeNS(null, 'y1', point1.y);
        gradient.setAttributeNS(null, 'x2', point2.x);
        gradient.setAttributeNS(null, 'y2', point2.y);

        for (const [offset, color] of stops) {
            const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop.setAttributeNS(null, 'offset',     offset);
            stop.setAttributeNS(null, 'stop-color', color);
            gradient.appendChild(stop);
        }

        this.gradients.push(gradient);
        return `url(#${gradientId})`;
    }

    /**
     * Create a tspan element for sub or super scripts that styles the text
     * appropriately as one of those text types.
     *
     * @param {String} text the actual text
     * @param {String} shift the type of text, either 'sub', or 'super'
     */
    createSubSuperScripts(text, shift) {
        let elem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        elem.setAttributeNS(null, 'baseline-shift', shift);
        elem.appendChild(document.createTextNode(text));
        elem.setAttributeNS(null, 'class', 'sub');

        return elem;
    }

    static createUnicodeCharge(n) {
        if (n === 1) {
            return '⁺';
        }

        if (n === -1) {
            return '⁻';
        }

        if (n > 1) {
            return SvgWrapper.createUnicodeSuperscript(n) + '⁺';
        }

        if (n < -1) {
            return SvgWrapper.createUnicodeSuperscript(n) + '⁻';
        }

        return '';
    }

    /**
     * Determine drawing dimensiosn based on vertex positions.
     *
     * @param {Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
     */
    determineDimensions(vertices) {
        for (let i = 0; i < vertices.length; i++) {
            if (!vertices[i].value.isDrawn) {
                continue;
            }

            let p = vertices[i].position;

            if (this.maxX < p.x) this.maxX = p.x;
            if (this.maxY < p.y) this.maxY = p.y;
            if (this.minX > p.x) this.minX = p.x;
            if (this.minY > p.y) this.minY = p.y;
        }

        // Add padding
        let padding = this.opts.padding;
        this.maxX += padding;
        this.maxY += padding;
        this.minX -= padding;
        this.minY -= padding;

        this.drawingWidth = this.maxX - this.minX;
        this.drawingHeight = this.maxY - this.minY;
    }

    updateViewbox(scale) {
        let x = this.minX;
        let y = this.minY;
        let width = this.maxX - this.minX;
        let height = this.maxY - this.minY;

        this.svg.setAttributeNS(null, 'viewBox', `${x} ${y} ${width} ${height}`);
    }

    /**
     * Draw an svg ellipse as a ball.
     *
     * @param {Number} x The x position of the text.
     * @param {Number} y The y position of the text.
     * @param {String} elementName The name of the element (single-letter).
     */
    drawBall(x, y, elementName) {
        let r = this.opts.bondLength / 4.5;

        if (x - r < this.minX) {
            this.minX = x - r;
        }

        if (x + r > this.maxX) {
            this.maxX = x + r;
        }

        if (y - r < this.minY) {
            this.minY = y - r;
        }

        if (y + r > this.maxY) {
            this.maxY = y + r;
        }

        let ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ball.setAttributeNS(null, 'cx', x);
        ball.setAttributeNS(null, 'cy', y);
        ball.setAttributeNS(null, 'r', r);
        ball.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));

        this.vertices.push(ball);
    }

    /**
     * @param {Line}   line  - The line object to create the wedge from.
     * @param {string} color - A CSS color or url(#gradient-id) (defaults to black).
     */
    drawWedge(line, color = '#000') {
        let l = line.getLeftVector().clone(),
            r = line.getRightVector().clone();

        let normals = Vector2.normals(l, r);

        normals[0].normalize();
        normals[1].normalize();

        let isRightChiralCenter = line.getRightChiral();

        let start = l,
            end = r;

        if (isRightChiralCenter) {
            start = r;
            end = l;
        }

        let t = Vector2.add(start, Vector2.multiplyScalar(normals[0], this.halfBondThickness)),
            u = Vector2.add(end, Vector2.multiplyScalar(normals[0], 3.0 + this.opts.fontSizeLarge / 4.0)),
            v = Vector2.add(end, Vector2.multiplyScalar(normals[1], 3.0 + this.opts.fontSizeLarge / 4.0)),
            w = Vector2.add(start, Vector2.multiplyScalar(normals[1], this.halfBondThickness));

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttributeNS(null, 'points', `${t.x},${t.y} ${u.x},${u.y} ${v.x},${v.y} ${w.x},${w.y}`);
        polygon.setAttributeNS(null, 'fill',   color);
        this.paths.push(polygon);
    }

    /* Draw a highlight for an atom
     *
     *  @param {Number} x The x position of the highlight
     *  @param {Number} y The y position of the highlight
     *  @param {string} color The color of the highlight, default #03fc9d
     */
    drawAtomHighlight(x, y, color = '#03fc9d') {
        let ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ball.setAttributeNS(null, 'cx', x);
        ball.setAttributeNS(null, 'cy', y);
        ball.setAttributeNS(null, 'r', this.opts.bondLength / 3);
        ball.setAttributeNS(null, 'fill', color);

        this.highlights.push(ball);
    }

    /**
     * Draw a dashed wedge on the canvas.
     *
     * @param {Line}   line  - A line.
     * @param {string} color - A CSS color or url(#gradient-id) (defaults to black).
     */
    drawDashedWedge(line, color = '#000') {
        if (isNaN(line.from.x) || isNaN(line.from.y) || isNaN(line.to.x) || isNaN(line.to.y)) {
            console.error('Invalid line passed to SvgWrapper.drawDashedWedge()!', line);
            return;
        }

        let l = line.getLeftVector().clone(),
            r = line.getRightVector().clone(),
            normals = Vector2.normals(l, r);

        normals[0].normalize();
        normals[1].normalize();

        let isRightChiralCenter = line.getRightChiral(),
            start,
            end;

        if (isRightChiralCenter) {
            start = r;
            end = l;
        }
        else {
            start = l;
            end = r;
        }

        let dir = Vector2.subtract(end, start).normalize(),
            length = line.getLength(),
            step = 1.25 / (length / (this.opts.bondLength / 10.0));

        for (let t = 0.0; t < 1.0; t += step) {
            let to = Vector2.multiplyScalar(dir, t * length),
                startDash = Vector2.add(start, to),
                width = this.opts.fontSizeLarge / 2.0 * t,
                dashOffset = Vector2.multiplyScalar(normals[0], width);

            startDash.subtract(dashOffset);
            let endDash = startDash.clone();
            endDash.add(Vector2.multiplyScalar(dashOffset, 2.0));

            this.drawLine(new Line(startDash, endDash), false, color);
        }
    }

    /**
     * Draws a debug dot at a given coordinate and adds text.
     *
     * @param {Number} x The x coordinate.
     * @param {Number} y The y coordindate.
     * @param {String} [debugText=''] A string.
     * @param {String} [color='#f00'] A color in hex form.
     */
    drawDebugPoint(x, y, debugText = '', color = '#f00') {
        let point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        point.setAttributeNS(null, 'cx', x);
        point.setAttributeNS(null, 'cy', y);
        point.setAttributeNS(null, 'r', '2');
        point.setAttributeNS(null, 'fill', color);
        this.vertices.push(point);
        this.drawDebugText(x + 2, y - 2, debugText, color);
    }

    /**
     * Draws a debug text message at a given position
     *
     * @param {Number} x The x coordinate.
     * @param {Number} y The y coordinate.
     * @param {String} text The debug text.
     */
    drawDebugText(x, y, text, color = '#f00') {
        let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElem.setAttributeNS(null, 'x', x);
        textElem.setAttributeNS(null, 'y', y);
        textElem.setAttributeNS(null, 'class', 'debug');
        textElem.setAttributeNS(null, 'fill', color);
        textElem.setAttributeNS(null, 'style', 'font: 5px sans-serif');
        textElem.appendChild(document.createTextNode(text));

        this.vertices.push(textElem);
    }

    /**
     * Draws a ring.
     *
     * @param {x} x The x coordinate of the ring.
     * @param {y} r The y coordinate of the ring.
     * @param {s} s The size of the ring.
     */
    drawRing(x, y, s) {
        let circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        let radius = MathHelper.apothemFromSideLength(this.opts.bondLength, s);
        circleElem.setAttributeNS(null, 'cx', x);
        circleElem.setAttributeNS(null, 'cy', y);
        circleElem.setAttributeNS(null, 'r', radius - this.opts.bondSpacing);
        circleElem.setAttributeNS(null, 'stroke', this.themeManager.getColor('C'));
        circleElem.setAttributeNS(null, 'stroke-width', this.opts.bondThickness);
        circleElem.setAttributeNS(null, 'fill', 'none');
        this.paths.push(circleElem);
    }

    /**
     * Draws a line.
     *
     * @param {Line}    line    - A line.
     * @param {boolean} dashed  - Defaults to false.
     * @param {string}  color   - A CSS color or url(#gradient-id).
     * @param {string}  linecap - Defaults to round.
     *
     * TODO: Promote `color` to be the second argument, and maybe make it required.
     * If we make it required, we should do that for other drawing functions as well.
     * This is API-changing, so save it for v3.0...
     */
    drawLine(line, dashed = false, color = '#000', linecap = 'round') {
        const l = line.getLeftVector();
        const r = line.getRightVector();

        const lineElem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineElem.setAttributeNS(null, 'x1', l.x);
        lineElem.setAttributeNS(null, 'y1', l.y);
        lineElem.setAttributeNS(null, 'x2', r.x);
        lineElem.setAttributeNS(null, 'y2', r.y);

        lineElem.setAttributeNS(null, 'stroke',         color);
        lineElem.setAttributeNS(null, 'stroke-width',   this.opts.bondThickness);
        lineElem.setAttributeNS(null, 'stroke-linecap', linecap);
        if (dashed) {
            lineElem.setAttributeNS(null, 'stroke-dasharray', '5,5');
        }

        this.paths.push(lineElem);
    }

    /**
     * Draw a point.
     *
     * @param {Number} x The x position of the point.
     * @param {Number} y The y position of the point.
     * @param {String} elementName The name of the element (single-letter).
     */
    drawPoint(x, y, elementName) {
        let r = 0.75;

        if (x - r < this.minX) {
            this.minX = x - r;
        }

        if (x + r > this.maxX) {
            this.maxX = x + r;
        }

        if (y - r < this.minY) {
            this.minY = y - r;
        }

        if (y + r > this.maxY) {
            this.maxY = y + r;
        }

        // first create a mask
        let mask = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        mask.setAttributeNS(null, 'cx', x);
        mask.setAttributeNS(null, 'cy', y);
        mask.setAttributeNS(null, 'r', '1.5');
        mask.setAttributeNS(null, 'fill', 'black');
        this.maskElements.push(mask);

        // now create the point
        let point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        point.setAttributeNS(null, 'cx', x);
        point.setAttributeNS(null, 'cy', y);
        point.setAttributeNS(null, 'r', r);
        point.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));
        this.vertices.push(point);
    }

    /**
     * Draw a text to the canvas.
     *
     * @param {Number} x The x position of the text.
     * @param {Number} y The y position of the text.
     * @param {String} elementName The name of the element (single-letter).
     * @param {Number} hydrogens The number of hydrogen atoms.
     * @param {String} direction The direction of the text in relation to the associated vertex.
     * @param {Boolean} isTerminal A boolean indicating whether or not the vertex is terminal.
     * @param {Number} charge The charge of the atom.
     * @param {Number} isotope The isotope number.
     * @param {Number} totalVertices The total number of vertices in the graph.
     * @param {Object} attachedPseudoElement A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count.
     * @param {String} attachedPseudoElement.element The element symbol.
     * @param {Number} attachedPseudoElement.count The number of occurences that match the key.
     * @param {Number} attachedPseudoElement.hyrogenCount The number of hydrogens attached to each atom matching the key.
     */
    drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, totalVertices, attachedPseudoElement = {}) {
        let text = [];
        let display = elementName;

        if (charge !== 0 && charge !== null) {
            display += SvgWrapper.createUnicodeCharge(charge);
        }

        if (isotope !== 0 && isotope !== null) {
            display = SvgWrapper.createUnicodeSuperscript(isotope) + display;
        }

        text.push([display, elementName]);

        if (hydrogens === 1) {
            text.push(['H', 'H']);
        }
        else if (hydrogens > 1) {
            text.push(['H' + SvgWrapper.createUnicodeSubscript(hydrogens), 'H']);
        }

        // TODO: Better handle exceptions
        // Exception for nitro (draw nitro as NO2 instead of N+O-O)
        if (charge === 1 && elementName === 'N' && '0O' in attachedPseudoElement && '0O-1' in attachedPseudoElement) {
            attachedPseudoElement = {'0O': {element: 'O', count: 2, hydrogenCount: 0, previousElement: 'C', charge: ''}};
            charge = 0;
        }

        for (let key of Object.keys(attachedPseudoElement)) {
            let pe = attachedPseudoElement[key];
            let pe_display = pe.element;

            if (pe.count > 1) {
                pe_display += SvgWrapper.createUnicodeSubscript(pe.count);
            }

            if (pe.charge) {
                pe_display += SvgWrapper.createUnicodeCharge(pe.charge);
            }

            text.push([pe_display, pe.element]);

            const hcount = pe.hydrogenCount * pe.count;
            if (hcount === 1) {
                text.push(['H', 'H']);
            }
            else if (hcount > 1) {
                text.push(['H' + SvgWrapper.createUnicodeSubscript(hcount), 'H']);
            }
        }

        this.write(text, direction, x, y, totalVertices === 1);
    }

    /**
     * Draw highlights under the heavy atoms (blurred using a CSS filter).
     *
     * @param {number[]}  weights - An array of weights, one for each heavy atom.
     * @param {Vector2[]} points  - An array of points, one for each heavy atom.
     * @param {number}    scale   - A multiplier used to normalize the weights (typically 1/max(abs(weights))).
     */
    drawWeights(weights, points, scale) {
        // NOTE: This calculates the highlight circle radius and the blur radius
        // based on opts.weights.sigma and tries to mimic the existing (GaussDrawer)
        // output.  We'll eventually want dedicated options for those instead.
        const sigma = this.opts.weights.sigma;

        // Use the first and last colors in the color map, if given.
        // Default to the same values as GaussDrawer (https://loading.io/color/feature/PiYG-11/).
        // TODO: Suport a full color map and the option to disable opacity scaling.
        const cmap = this.opts.weights.colormap;
        const pos  = (cmap == null) ? '#4d9221' : cmap[cmap.length - 1];
        const neg  = (cmap == null) ? '#c51b7d' : cmap[0];

        // This uses a CSS blur because it's simple and because different browsers
        // interpret feGaussianBlur's stdDeviation attribute differently (σ vs 2σ).
        // TODO: Test this in other rendering engines, and if they can't handle it,
        // add feGaussianBlur back as a fallback / configuration option.
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttributeNS(null, 'style', `filter:blur(${sigma / 2}px)`);
        this.backgroundItems.push(g);

        for (let i = 0; i < weights.length; ++i) {
            const weight = weights[i];
            const point  = points[i];
            if (!weight) continue;

            let color = (weight > 0) ? pos : neg;
            color = `rgb(from ${color} r g b / ${Math.abs(weight) * scale})`;

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttributeNS(null, 'cx',   point.x);
            circle.setAttributeNS(null, 'cy',   point.y);
            circle.setAttributeNS(null, 'r',    sigma);
            circle.setAttributeNS(null, 'fill', color);
            g.appendChild(circle);
        }
    }

    write(text, direction, x, y, singleVertex) {
        // Measure element name only, without charge or isotope ...
        let bbox = SvgWrapper.measureText(text[0][1], this.opts.fontSizeLarge, this.opts.fontFamily);

        // For left-direction text with charges/isotopes, account for
        // the extra width from decorations without inflating the bbox
        if (direction === 'left' && text[0][0] !== text[0][1]) {
            let fullBbox = SvgWrapper.measureText(text[0][0], this.opts.fontSizeLarge, this.opts.fontFamily);
            bbox.width = fullBbox.width;
        }

        // Get the approximate width and height of text and add update max/min
        // to allow for narrower paddings
        if (singleVertex) {
            if (x + bbox.width * text.length > this.maxX) {
                this.maxX = x + bbox.width * text.length;
            }
            if (x - bbox.width / 2.0 < this.minX) {
                this.minX = x - bbox.width / 2.0;
            }
            if (y - bbox.height < this.minY) {
                this.minY = y - bbox.height;
            }
            if (y + bbox.height > this.maxY) {
                this.maxY = y + bbox.height;
            }
        }
        else {
            if (direction !== 'right') {
                if (x + bbox.width * text.length > this.maxX) {
                    this.maxX = x + bbox.width * text.length;
                }
                if (x - bbox.width * text.length < this.minX) {
                    this.minX = x - bbox.width * text.length;
                }
            }
            else if (direction !== 'left') {
                if (x + bbox.width * text.length > this.maxX) {
                    this.maxX = x + bbox.width * text.length;
                }
                if (x - bbox.width / 2.0 < this.minX) {
                    this.minX = x - bbox.width / 2.0;
                }
            }

            if (y - bbox.height < this.minY) {
                this.minY = y - bbox.height;
            }

            if (y + bbox.height > this.maxY) {
                this.maxY = y + bbox.height;
            }

            if (direction === 'down') {
                if (y + 0.8 * bbox.height * text.length > this.maxY) {
                    this.maxY = y + 0.8 * bbox.height * text.length;
                }
            }

            if (direction === 'up') {
                if (y - 0.8 * bbox.height * text.length < this.minY) {
                    this.minY = y - 0.8 * bbox.height * text.length;
                }
            }
        }

        let cx = x;
        let cy = y;

        // Draw the text
        let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElem.setAttributeNS(null, 'class', 'element');
        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        textElem.setAttributeNS(null, 'fill', '#ffffff');

        if (direction === 'left') {
            text = text.reverse();
        }

        if (direction === 'right' || direction === 'down' || direction === 'up') {
            x -= bbox.width / 2.0;
        }

        if (direction === 'left') {
            x += bbox.width / 2.0;
        }

        text.forEach((part, i) => {
            const display = part[0];
            const elementName = part[1];
            let tspanElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspanElem.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));
            tspanElem.textContent = display;

            if (direction === 'up' || direction === 'down') {
                tspanElem.setAttributeNS(null, 'x', '0px');
                if (direction === 'up') {
                    tspanElem.setAttributeNS(null, 'y', `-${0.9 * i}em`);
                }
                else {
                    tspanElem.setAttributeNS(null, 'y', `${0.9 * i}em`);
                }
            }

            textElem.appendChild(tspanElem);
        });

        textElem.setAttributeNS(null, 'data-direction', direction);

        if (direction === 'left' || direction === 'right') {
            textElem.setAttributeNS(null, 'dominant-baseline', 'alphabetic');
            textElem.setAttributeNS(null, 'y', '0.36em');
        }
        else {
            textElem.setAttributeNS(null, 'dominant-baseline', 'central');
        }

        if (direction === 'left') {
            textElem.setAttributeNS(null, 'text-anchor', 'end');
        }

        g.appendChild(textElem);

        g.setAttributeNS(null, 'style', `transform: translateX(${x}px) translateY(${y}px)`);

        let maskRadius = this.opts.fontSizeLarge * 0.75;
        if (text[0][1].length > 1) {
            maskRadius = this.opts.fontSizeLarge * 1.1;
        }

        let mask = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        mask.setAttributeNS(null, 'cx', cx);
        mask.setAttributeNS(null, 'cy', cy);
        mask.setAttributeNS(null, 'r', maskRadius);
        mask.setAttributeNS(null, 'fill', 'black');

        this.maskElements.push(mask);

        this.vertices.push(g);
    }

    /**
     * Draw the wrapped SVG to a canvas.
     * @param {HTMLCanvasElement} canvas The canvas element to draw the svg to.
     */
    toCanvas(canvas, width, height) {
        const cavas = DomHelper.getDrawable(canvas);
        DomHelper.svgToCanvas(this.svg, canvas);
    }

    static createUnicodeSubscript(n) {
        let result = '';

        n.toString().split('').forEach((d) => {
            result += ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'][parseInt(d)];
        });

        return result;
    }

    static createUnicodeSuperscript(n) {
        let result = '';

        n.toString().split('').forEach((d) => {
            let parsed = parseInt(d);
            if (Number.isFinite(parsed)) {
                result += ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][parsed];
            }
        });

        return result;
    }

    static replaceNumbersWithSubscript(text) {
        let subscriptNumbers = {0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉'};

        for (const [key, value] of Object.entries(subscriptNumbers)) {
            text = text.replaceAll(key, value);
        }

        return text;
    }

    static measureText(text, fontSize, fontFamily) {
        const element = document.createElement('canvas');
        const ctx = element.getContext('2d');
        // In some environments (Node.js, JSDOM, CI runners) the canvas element
        // exists but there is no graphics backend behind it causing getContext('2d')
        // to return null
        // Fall back to arithmetic estimation so the layout doesn't break
        if (!ctx) {
            return SvgWrapper.estimateTextSize(text, fontSize);
        }

        // In Firefox, the measureText() function is inconsistent at small font sizes.
        // So measure a large(ish) font, then scale the measurements later.
        const scale = fontSize / 16;
        ctx.font = `16pt ${fontFamily}`;
        const textMetrics = ctx.measureText(text);

        const w = Math.abs(textMetrics.actualBoundingBoxLeft)   + Math.abs(textMetrics.actualBoundingBoxRight);
        const h = Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent);

        return {
            width:  w * scale,
            height: h * scale,
        };
    }

    static estimateTextSize(text, fontSize) {
        let width = 0;

        for (const char of String(text)) {
            if (char === ' ') {
                width += 0.35;
            }
            else if (/[A-Z]/.test(char)) {
                width += 0.68;
            }
            else if (/[a-z]/.test(char)) {
                width += 0.56;
            }
            else if (/[0-9]/.test(char)) {
                width += 0.55;
            }
            else {
                width += 0.45;
            }
        }

        return {
            width:  fontSize * width,
            height: fontSize,
        };
    }

    /**
     * Convert an SVG to a canvas. Warning: This happens async!
     *
     * @param {SVGElement} svg
     * @param {HTMLCanvasElement} canvas
     * @param {Number} width  (unused)
     * @param {Number} height (unused)
     * @param {?CallableFunction} callback
     * @returns {HTMLCanvasElement} The input html canvas element after drawing to.
     */
    static svgToCanvas(svg, canvas, width, height, callback = null) {
        DomHelper.svgToCanvas(svg, canvas).then(callback);
        return canvas;
    }

    /**
     * Convert an SVG to an image. Warning: This happens async!
     *
     * @param {SVGElement} svg
     * @param {HTMLImageElement} img
     * @param {Number} width  (unused)
     * @param {Number} height (unused)
     */
    static svgToImg(svg, img, width, height) {
        DomHelper.svgToImg(svg, img);
    }

    /**
     * Create an SVG element containing text.
     * @param {String} text
     * @param {*} themeManager
     * @param {*} options
     * @returns {{svg: SVGElement, width: Number, height: Number}} The SVG element containing the text and its dimensions.
     */
    static writeText(text, themeManager, fontSize, fontFamily, maxWidth = Number.MAX_SAFE_INTEGER) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.appendChild(document.createTextNode(`
            .text {
                font: ${fontSize}pt ${fontFamily};
                dominant-baseline: alphabetic;
            }
        `));
        svg.appendChild(style);

        let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElem.setAttributeNS(null, 'class', 'text');

        let lines = [];
        text.split('\n').forEach((line) => {
            let dims = SvgWrapper.measureText(line, fontSize, fontFamily);
            if (dims.width >= maxWidth) {
                const words  = line.split(' ');
                let   offset = 0;

                for (let i = 0; i < words.length; i++) {
                    const part     = words.slice(offset, i + 1).join(' ');
                    const partDims = SvgWrapper.measureText(part, fontSize, fontFamily);

                    if (partDims.width > maxWidth && i > offset) {
                        lines.push(words.slice(offset, i).join(' '));
                        offset = i;
                    }
                }

                if (offset < words.length) {
                    lines.push(words.slice(offset, words.length).join(' '));
                }
            }
            else {
                lines.push(line);
            }
        });

        let maxLineWidth = 0.0;
        lines.forEach((line, i) => {
            let tspanElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspanElem.setAttributeNS(null, 'fill', themeManager.getColor('C'));
            tspanElem.textContent = line;
            tspanElem.setAttributeNS(null, 'x', '0px');
            tspanElem.setAttributeNS(null, 'y', `${i + 1}em`);
            textElem.appendChild(tspanElem);

            const dims = SvgWrapper.measureText(line, fontSize, fontFamily);
            maxLineWidth = Math.max(maxLineWidth, dims.width);
        });

        textElem.setAttributeNS(null, 'transform',   `translate(${maxLineWidth / 2}, 0)`);
        textElem.setAttributeNS(null, 'text-anchor', 'middle');

        svg.appendChild(textElem);

        // The extra 0.4 here it to account for any subscripts on the bottom line.
        // The factor of 4 / 3 is to convert from points to CSS pixels (1in = 72pt = 96px).
        return {svg: svg, width: maxLineWidth, height: (lines.length + 0.4) * fontSize * 4 / 3};
    }
}
