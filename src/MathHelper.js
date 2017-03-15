/** A static class containing helper functions for math-related tasks. */
class MathHelper {
    /**
     * Rounds a value to a given number of decimals.
     *
     * @static
     * @param {number} value A number.
     * @param {number} decimals The number of decimals.
     * @returns {number} A number rounded to a given number of decimals.
     */
    static round(value, decimals) {
        decimals = decimals ? decimals : 1;
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    /**
     * Returns the means of the angles contained in an array. In radians.
     *
     * @static
     * @param {array} arr An array containing angles (in radians).
     * @returns {number} The mean angle in radians.
     */
    static meanAngle(arr) {
        let sin = 0.0;
        let cos = 0.0;
        
        for (let i = 0; i < arr.length; i++) {
            sin += Math.sin(arr[i]);
            cos += Math.cos(arr[i]);
        }

        return Math.atan2(sin / arr.length, cos / arr.length);
    }

    /**
     * Returns the inner angle of a n-sided regular polygon.
     *
     * @static
     * @param {number} n Number of sides of a regular polygon.
     * @returns {number} The inner angle of a given regular polygon.
     */
    static innerAngle(n) {
        return MathHelper.toRad((n - 2) * 180 / n);
    }

    /**
     * Returns the circumradius of a n-sided regular polygon with a given side-length.
     *
     * @static
     * @param {number} s The side length of the regular polygon.
     * @param {number} n The number of sides.
     * @returns {number} The circumradius of the regular polygon.
     */
    static polyCircumradius(s, n) {
        return s / (2 * Math.sin(Math.PI / n));
    }

    /**
     * Returns the apothem of a regular n-sided polygon based on its radius.
     *
     * @static
     * @param {number} r The radius.
     * @param {number} n The number of edges of the regular polygon.
     * @returns {number} The apothem of a n-sided polygon based on its radius.
     */
    static apothem(r, n) {
        return r * Math.cos(Math.PI / n);
    }

    static apothemFromSideLength(s, n) {
        let r = MathHelper.polyCircumradius(s, n);
        
        return MathHelper.apothem(r, n);
    }

    /**
     * The central angle of a n-sided regular polygon. In radians.
     *
     * @static
     * @param {number} n The number of sides of the regular polygon.
     * @returns {number} The central angle of the n-sided polygon in radians.
     */
    static centralAngle(n) {
        return MathHelper.toRad(360 / n);
    }

    /**
     * Convertes radians to degrees.
     *
     * @static
     * @param {number} rad An angle in radians.
     * @returns {number} The angle in degrees.
     */
    static toDeg(rad) {
        return rad * 180 / Math.PI;
    }

    /**
     * Converts degrees to radians.
     *
     * @static
     * @param {number} deg An angle in degrees.
     * @returns {number} The angle in radians.
     */
    static toRad(deg) {
        return deg * Math.PI / 180;
    }
}
