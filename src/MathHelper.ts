/**
 * A static class containing helper functions for math-related tasks.
 */
export default class MathHelper {
    /**
     * Rounds a value to a given number of decimals.
     *
     * @param value    - A number.
     * @param decimals - The number of decimals.
     * @returns A number rounded to a given number of decimals.
     */
    static round(value: number, decimals?: number): number {
        if (decimals) {
            const pow = Math.pow(10, decimals);
            return Math.round(value * pow) / pow;
        }
        else {
            return Math.round(value);
        }
    }

    /**
     * Returns the means of the angles contained in an array, in radians.
     *
     * @param arr - An array of angles (in radians).
     * @returns The mean angle in radians.
     */
    static meanAngle(arr: number[]): number {
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
     * @param n - Number of sides of a regular polygon.
     * @returns The inner angle of the polygon, in radians.
     */
    static innerAngle(n: number): number {
        return MathHelper.toRad((n - 2) * 180 / n);
    }

    /**
     * Returns the circumradius of a n-sided regular polygon with a given side-length.
     *
     * @param s - The side length of the regular polygon.
     * @param n - The number of sides.
     * @returns The circumradius of the regular polygon.
     */
    static polyCircumradius(s: number, n: number): number {
        return s / (2 * Math.sin(Math.PI / n));
    }

    /**
     * Returns the apothem of a regular n-sided polygon based on its radius.
     *
     * @param r - The radius of a regular polygon.
     * @param n - The number of sides of the polygon.
     * @returns The apothem of the polygon.
     */
    static apothem(r: number, n: number): number {
        return r * Math.cos(Math.PI / n);
    }

    /**
     * Returns the apothem of a regular n-sided polygon with a given side-length.
     *
     * @param s - The side length of a regular polygon.
     * @param n - The number of sides of the polygon.
     * @returns The apothem of the polygon.
     */
    static apothemFromSideLength(s: number, n: number): number {
        const r = MathHelper.polyCircumradius(s, n);
        return MathHelper.apothem(r, n);
    }

    /**
     * Returns the central angle of a regular n-sided polygon, in radians.
     *
     * @param n - The number of sides of the regular polygon.
     * @returns The central angle of the n-sided polygon, in radians.
     */
    static centralAngle(n: number): number {
        return MathHelper.toRad(360 / n);
    }

    /**
     * Convertes radians to degrees.
     *
     * @param rad - An angle in radians.
     * @returns The angle in degrees.
     */
    static toDeg(rad: number): number {
        return rad * MathHelper.degFactor;
    }

    /**
     * Converts degrees to radians.
     *
     * @param deg - An angle in degrees.
     * @returns The angle in radians.
     */
    static toRad(deg: number): number {
        return deg * MathHelper.radFactor;
    }

    /**
     * Returns the parity of a permutation (1 or -1)
     *
     * @param arr - An array containing the permutation.
     * @returns The parity of the permutation (1 or -1), where 1 means even and -1 means odd.
     */
    static parityOfPermutation(arr: number[] | Uint8Array): number {
        const visited = new Uint8Array(arr.length);
        let evenLengthCycleCount = 0;

        function traverseCycle(i, cycleLength = 0) {
            if (visited[i] === 1) {
                return cycleLength;
            }

            cycleLength++;

            visited[i] = 1;
            return traverseCycle(arr[i], cycleLength);
        };

        for (let i = 0; i < arr.length; i++) {
            if (visited[i] === 1) {
                continue;
            }

            const cycleLength = traverseCycle(i);
            evenLengthCycleCount += (1 - cycleLength % 2);
        }

        return evenLengthCycleCount % 2 ? -1 : 1;
    }

    /** The factor to convert degrees to radians. */
    static get radFactor(): number {
        return Math.PI / 180.0;
    }

    /** The factor to convert radians to degrees. */
    static get degFactor(): number {
        return 180.0 / Math.PI;
    }

    /** Two times PI. */
    static get twoPI(): number {
        return 2.0 * Math.PI;
    }
}
