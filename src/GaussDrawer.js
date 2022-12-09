const Vector2 = require('./Vector2')

import chroma from "chroma-js"

class GaussDrawer {
    /**
   * The constructor of the class Graph.
   * 
   * @param {Vector2[]} points The centres of the gaussians.
   * @param {Number[]} weights The weights / amplitudes for each gaussian.
   */
    constructor(points, weights, width, height, sigma = 0.3, colormap = null) {
        this.points = points;
        this.weights = weights;
        this.width = width;
        this.height = height;
        this.sigma = sigma;

        if (colormap === null) {
            colormap = [
                '#00876c', '#469b83', '#6eaf9a', '#93c3b3', '#b7d7cc',
                '#dbebe5', '#ffffff', '#fde0e0', '#f9c2c1', '#f3a3a4',
                '#eb8387', '#e0636b', '#d43d51'
            ].reverse()
        }
        this.colormap = colormap;

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    setFromArray(arr_points, arr_weights) {
        this.points = [];
        arr_points.forEach(a => {
            this.points.push(new Vector2(a[0], a[1]));
        });

        arr_weights.forEach(w => {
            this.weights.push(w);
        });
    }

    /**
     * Compute and draw the gaussians.
     */
    draw() {


        let m = [];
        for (let x = 0; x < this.width; x++) {
            let row = [];
            for (let y = 0; y < this.height; y++) {
                row.push(0.0);
            }
            m.push(row);
        }

        for (let i = 0; i < this.points.length; i++) {
            let v = this.points[i];
            let a = this.weights[i];

            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    let v_x = (x - v.x) ** 2 / (2 * this.sigma ** 2);
                    let v_y = (y - v.y) ** 2 / (2 * this.sigma ** 2);
                    let val = a * Math.exp(-(v_x + v_y));

                    m[x][y] += val;
                }
            }
        }

        let max = -Number.MAX_SAFE_INTEGER;
        let min = Number.MAX_SAFE_INTEGER;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (m[x][y] < min) {
                    min = m[x][y];
                }

                if (m[x][y] > max) {
                    max = m[x][y];
                }
            }
        }

        console.log(min, max);

        let abs_max = Math.max(Math.abs(min), Math.abs(max));
        const scale = chroma.scale(this.colormap).domain([-abs_max, abs_max]);

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                // m[x][y] = (m[x][y] - min) / (max - min);
                m[x][y] = m[x][y] / abs_max;
                let [r, g, b] = scale(m[x][y]).rgb();
                this.setPixel(new Vector2(x, y), r, g, b, 255);
            }
        }
    }

    /**
     * Get the canvas as an HTML image.
     * 
     * @param {CallableFunction} callback
     */
    getImage(callback) {
        let image = new Image();
        image.onload = () => {
            this.context.imageSmoothingEnabled = false;
            this.context.drawImage(image, 0, 0, this.width, this.height);

            if (callback) {
                callback(image);
            }
        };

        image.onerror = function (err) {
            console.log(err);
        }

        image.src = this.canvas.toDataURL();
    }

    /**
     * Set the colour at a specific point on the canvas.
     * 
     * @param {Vector2} vec The pixel position on the canvas.
     * @param {Number} r The red colour-component.
     * @param {Number} g The green colour-component.
     * @param {Number} b The blue colour-component.
     * @param {Number} a The alpha colour-component.
     */
    setPixel(vec, r, g, b, a) {
        this.context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
        this.context.fillRect(vec.x, vec.y, 1, 1);
    }
}

module.exports = GaussDrawer