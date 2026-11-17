export default class SvgWrapper {
    static createUnicodeCharge(n: any): string;
    static createUnicodeSubscript(n: any): string;
    static createUnicodeSuperscript(n: any): string;
    static replaceNumbersWithSubscript(text: any): any;
    static measureText(text: any, fontSize: any, fontFamily: any): {
        width: number;
        height: any;
    };
    static estimateTextSize(text: any, fontSize: any): {
        width: number;
        height: any;
    };
    /**
     * Convert an SVG to a canvas. Warning: This happens async!
     *
     * @param {SVGElement} svg
     * @param {HTMLCanvasElement} canvas
     * @param {Number} width
     * @param {Number} height
     * @param {CallableFunction} callback
     * @returns {HTMLCanvasElement} The input html canvas element after drawing to.
     */
    static svgToCanvas(svg: SVGElement, canvas: HTMLCanvasElement, width: number, height: number, callback?: CallableFunction): HTMLCanvasElement;
    /**
     * Convert an SVG to a canvas. Warning: This happens async!
     *
     * @param {SVGElement} svg
     * @param {HTMLImageElement} canvas
     * @param {Number} width
     * @param {Number} height
     */
    static svgToImg(svg: SVGElement, img: any, width: number, height: number): void;
    /**
     * Create an SVG element containing text.
     * @param {String} text
     * @param {*} themeManager
     * @param {*} options
     * @returns {{svg: SVGElement, width: Number, height: Number}} The SVG element containing the text and its dimensions.
     */
    static writeText(text: string, themeManager: any, fontSize: any, fontFamily: any, maxWidth?: number): {
        svg: SVGElement;
        width: number;
        height: number;
    };
    constructor(themeManager: any, target: any, options: any, clear?: boolean);
    svg: any;
    container: SVGGElement;
    opts: any;
    uid: string;
    gradientId: number;
    defaultGradients: Map<any, any>;
    backgroundItems: any[];
    paths: any[];
    vertices: any[];
    gradients: any[];
    highlights: any[];
    drawingWidth: number;
    drawingHeight: number;
    halfBondThickness: number;
    themeManager: any;
    maskElements: any[];
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    style: SVGStyleElement;
    constructSvg(): SVGGElement;
    /**
     * Add a background to the svg.
     */
    addLayer(svg: any): void;
    /**
     * Get the color or gradient URL for a line.
     *
     * @param {Vertex} vertex1 - The vertex on one end of the bond.
     * @param {Vertex} vertex2 - The vertex on the other end of the bond.
     * @returns {string} A string that can be used as a stroke or fill.
     */
    getBondColor(vertex1: Vertex, vertex2: Vertex): string;
    /**
     * Gets or creates a defaut atom-to-carbon radial gradient around a vertex.
     *
     * @param {Vertex}  vertex - The vertex.
     * @param {?string} color1 - The color of the vertex (uses the color of the atom by default).
     * @param {?string} color2 - The color at the radiuis (uses the color of carbon by default).
     * @returns {string} A "url(#gradient-id)" string that can be used as a stroke or fill.
     */
    getDefaultGradient(vertex: Vertex, color1: string | null, color2: string | null): string;
    /**
     * Create a radial gradient around a point.
     *
     * @param {Vector2} point  - The central point.
     * @param {number}  radius - A radius around that point.
     * @param {Array}   stops  - An array of (offset, color) pairs.
     * @returns {string} A "url(#gradient-id)" string that can be used as a stroke or fill.
     */
    createRadialGradient(point: Vector2, radius: number, stops: any[]): string;
    /**
     * Create a linear gradient between two points.
     *
     * @param {Vector2} point1 - The first point.
     * @param {Vector2} point2 - The second point.
     * @param {Array}   stops  - An array of (offset, color) pairs.
     * @returns {string} A "url(#gradient-id)" string that can be used as a stroke or fill.
     */
    createLinearGradient(point1: Vector2, point2: Vector2, stops: any[]): string;
    /**
     * Create a tspan element for sub or super scripts that styles the text
     * appropriately as one of those text types.
     *
     * @param {String} text the actual text
     * @param {String} shift the type of text, either 'sub', or 'super'
     */
    createSubSuperScripts(text: string, shift: string): SVGTSpanElement;
    /**
     * Determine drawing dimensiosn based on vertex positions.
     *
     * @param {Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
     */
    determineDimensions(vertices: Vertex[]): void;
    updateViewbox(scale: any): void;
    /**
     * Draw an svg ellipse as a ball.
     *
     * @param {Number} x The x position of the text.
     * @param {Number} y The y position of the text.
     * @param {String} elementName The name of the element (single-letter).
     */
    drawBall(x: number, y: number, elementName: string): void;
    /**
     * @param {Line}   line  - The line object to create the wedge from.
     * @param {string} color - A CSS color or url(#gradient-id) (defaults to black).
     */
    drawWedge(line: Line, color?: string): void;
    drawAtomHighlight(x: any, y: any, color?: string): void;
    /**
     * Draw a dashed wedge on the canvas.
     *
     * @param {Line}   line  - A line.
     * @param {string} color - A CSS color or url(#gradient-id) (defaults to black).
     */
    drawDashedWedge(line: Line, color?: string): void;
    /**
     * Draws a debug dot at a given coordinate and adds text.
     *
     * @param {Number} x The x coordinate.
     * @param {Number} y The y coordindate.
     * @param {String} [debugText=''] A string.
     * @param {String} [color='#f00'] A color in hex form.
     */
    drawDebugPoint(x: number, y: number, debugText?: string, color?: string): void;
    /**
     * Draws a debug text message at a given position
     *
     * @param {Number} x The x coordinate.
     * @param {Number} y The y coordinate.
     * @param {String} text The debug text.
     */
    drawDebugText(x: number, y: number, text: string, color?: string): void;
    /**
     * Draws a ring.
     *
     * @param {x} x The x coordinate of the ring.
     * @param {y} r The y coordinate of the ring.
     * @param {s} s The size of the ring.
     */
    drawRing(x: any, y: any, s: any): void;
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
    drawLine(line: Line, dashed?: boolean, color?: string, linecap?: string): void;
    /**
     * Draw a point.
     *
     * @param {Number} x The x position of the point.
     * @param {Number} y The y position of the point.
     * @param {String} elementName The name of the element (single-letter).
     */
    drawPoint(x: number, y: number, elementName: string): void;
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
    drawText(x: number, y: number, elementName: string, hydrogens: number, direction: string, isTerminal: boolean, charge: number, isotope: number, totalVertices: number, attachedPseudoElement?: {
        element: string;
        count: number;
        hyrogenCount: number;
    }): void;
    /**
     * Draw highlights under the heavy atoms (blurred using a CSS filter).
     *
     * @param {number[]}  weights - An array of weights, one for each heavy atom.
     * @param {Vector2[]} points  - An array of points, one for each heavy atom.
     * @param {number}    scale   - A multiplier used to normalize the weights (typically 1/max(abs(weights))).
     */
    drawWeights(weights: number[], points: Vector2[], scale: number): void;
    write(text: any, direction: any, x: any, y: any, singleVertex: any): void;
    /**
     * Draw the wrapped SVG to a canvas.
     * @param {HTMLCanvasElement} canvas The canvas element to draw the svg to.
     */
    toCanvas(canvas: HTMLCanvasElement, width: any, height: any): void;
}
import Vector2 from './Vector2';
import Line from './Line';
