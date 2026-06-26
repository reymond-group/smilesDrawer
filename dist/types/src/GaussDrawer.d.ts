export default class GaussDrawer {
    /**
     * The constructor of the class Graph.
     *
     * @param {Vector2[]} points The centres of the gaussians.
     * @param {Number[]} weights The weights / amplitudes for each gaussian.
     */
    constructor(points: Vector2[], weights: number[], width: any, height: any, sigma?: number, interval?: number, colormap?: any, opacity?: number, normalized?: boolean);
    points: Vector2[];
    weights: number[];
    width: any;
    height: any;
    sigma: number;
    interval: number;
    opacity: number;
    normalized: boolean;
    colormap: any;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    setFromArray(arr_points: any, arr_weights: any): void;
    /**
       * Compute and draw the gaussians.
       */
    draw(): void;
    /**
       * Get the canvas as an HTML image.
       *
       * @param {CallableFunction} callback
       */
    getImage(callback: CallableFunction): void;
    /**
       * Get the canvas as an SVG element.
       */
    getSVG(): Element;
    /**
       * Set the colour at a specific point on the canvas.
       *
       * @param {Vector2} vec The pixel position on the canvas.
       * @param {Number} r The red colour-component.
       * @param {Number} g The green colour-component.
       * @param {Number} b The blue colour-component.
       */
    setPixel(vec: Vector2, r: number, g: number, b: number): void;
}
import Vector2 from './Vector2';
