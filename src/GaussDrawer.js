import Vector2 from './Vector2';

/**
 * Converts an array of CSS colors into an array of UInt8 RGBA 4-tuples.
 *
 * @param {string[]} colormap - An array of CSS color values.
 * @returns {number[][]}      - An array of UInt8 RGBA 4-tuples.
 */
function buildChannelMap(colormap) {
    const canvas  = document.createElement('canvas');
    canvas.width  = colormap.length;
    canvas.height = 1;
    const context = canvas.getContext('2d', {alpha: true});

    for (let i = 0; i < colormap.length; ++i) {
        context.fillStyle = colormap[i];
        context.fillRect(i, 0, 1, 1);
    }

    const buffer = context.getImageData(0, 0, colormap.length, 1, {
        colorSpace:  'srgb',
        pixelFormat: 'rgba-unorm8',
    }).data;

    return buffer.values().chunks(4).toArray();
}

export default class GaussDrawer {
    /**
     * The constructor of the class Graph.
     *
     * @param {Vector2[]} points The centres of the gaussians.
     * @param {Number[]} weights The weights / amplitudes for each gaussian.
     */
    constructor(points, weights, width, height, sigma = 0.3, interval = 0, colormap = null, opacity = 1.0, normalized = false) {
        this.points = points;
        this.weights = weights;
        this.width = Math.round(width);
        this.height = Math.round(height);
        this.sigma = sigma;
        this.interval = interval;
        this.opacity = opacity;
        this.normalized = normalized;

        if (colormap === null) {
            let piyg11 = [
                '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef',
                '#ffffff',
                '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221'];
            colormap = piyg11;
        }
        this.colormap = colormap;

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d', {alpha: true});
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    /**
       * Compute and draw the gaussians.
       */
    draw() {
        let m = [];

        for (let y = 0; y < this.height; y++) {
            m.push(new Float32Array(this.width));
        }

        // It looks like in some common js engines, multiplication by a
        // fraction is faster than division ...
        let divisor = 1.0 / (2 * this.sigma * this.sigma);

        for (let i = 0; i < this.points.length; i++) {
            let v = this.points[i];
            let a = this.weights[i];

            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    // let v_x = (x - v.x) ** 2 / (2 * this.sigma ** 2);
                    // let v_y = (y - v.y) ** 2 / (2 * this.sigma ** 2);
                    let dx = x - v.x;
                    let dy = y - v.y;
                    let v_xy = (dx * dx + dy * dy) * divisor;
                    let val = a * Math.exp(-v_xy);

                    m[y][x] += val;
                }
            }
        }

        let abs_max = 1.0;

        if (!this.normalized) {
            let max = -Number.MAX_SAFE_INTEGER;
            let min = Number.MAX_SAFE_INTEGER;

            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (m[y][x] < min) {
                        min = m[y][x];
                    }

                    if (m[y][x] > max) {
                        max = m[y][x];
                    }
                }
            }

            abs_max = Math.max(Math.abs(min), Math.abs(max));
        }

        const channelmap = buildChannelMap(this.colormap);
        const imagedata  = new ImageData(this.width, this.height, {
            colorSpace:  'srgb',
            pixelFormat: 'rgba-unorm8',
        });

        const buffer = imagedata.data;
        let   pixel  = 0;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let v = m[y][x];

                if (!this.normalized) {
                    v = v / abs_max;
                }

                if (this.interval !== 0) {
                    v = Math.round(v / this.interval) * this.interval;
                }

                // Scale from [-1, 1] to [0, channelmap.length)
                let c = (v + 1) / 2 * (channelmap.length - 1);
                c = Math.min(c, channelmap.length - 1);

                const lo = channelmap[Math.floor(c)];
                const hi = channelmap[Math.ceil(c)];
                const p  = c - Math.floor(c);
                const q  = 1.0 - p;

                buffer[pixel + 0] = lo[0] * q + hi[0] * p;
                buffer[pixel + 1] = lo[1] * q + hi[1] * p;
                buffer[pixel + 2] = lo[2] * q + hi[2] * p;
                buffer[pixel + 3] = this.opacity * 256;
                pixel += 4;
            }
        }

        this.context.putImageData(imagedata, 0, 0);
    }

    /**
     * Get the content of the underlying canvas as a data URL.
     *
     * @returns {string} A data URL.
     */
    getDataURL() {
        return this.canvas.toDataURL();
    }
}
