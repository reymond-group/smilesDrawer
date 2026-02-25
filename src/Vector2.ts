/**
 * A class representing a 2D vector.
 *
 * @property x - The x component of the vector.
 * @property y - The y component of the vector.
 */
export default class Vector2 {
    x: number;
    y: number;

    /**
     * The constructor of the class Vector2.
     *
     * @param {(Number|Vector2)} x The initial x coordinate value or, if the single argument, a Vector2 object.
     * @param {Number} y The initial y coordinate value.
     */
    constructor();
    constructor(v: Vector2);
    constructor(x: number, y: number);
    constructor(x: Vector2 | number | void, y: number | void) {
        if (x === undefined) {
            this.x = 0;
            this.y = 0;
        }
        else if (x instanceof Vector2) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x as number;
            this.y = y as number;
        }
    }

    /**
     * Clones this vector and returns the clone.
     *
     * @returns A clone of this vector.
     */
    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    /**
     * Returns a string representation of this vector.
     *
     * @returns A string representation of this vector.
     */
    toString(): string {
        return '(' + this.x + ',' + this.y + ')';
    }

    /**
     * Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.
     *
     * @param vec - Another vector.
     * @returns Returns itself.
     */
    add(vec: Vector2): this {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    }

    /**
     * Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.
     *
     * @param vec - Another vector.
     * @returns Returns itself.
     */
    subtract(vec: Vector2): this {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    /**
     * Divide the x and y coordinate values of this vector by a scalar.
     *
     * @param scalar - The scalar.
     * @returns Returns itself.
     */
    divide(scalar: number): this {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    /**
     * Multiply the x and y coordinate values of this vector by the values of another vector.
     *
     * @param vec - Another vector.
     * @returns Returns itself.
     */
    multiply(vec: Vector2): this {
        this.x *= vec.x;
        this.y *= vec.y;

        return this;
    }

    /**
     * Multiply the x and y coordinate values of this vector by a scalar.
     *
     * @param scalar - The scalar.
     * @returns Returns itself.
     */
    multiplyScalar(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    /**
     * Inverts this vector. Same as multiply(-1.0).
     *
     * @returns Returns itself.
     */
    invert(): this {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    /**
     * Returns the angle of this vector in relation to the coordinate system.
     *
     * @returns The angle in radians.
     */
    angle(): number {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Returns the euclidean distance between this vector and another vector.
     *
     * @param vec - Another vector.
     * @returns The euclidean distance between the two vectors.
     */
    distance(vec: Vector2): number {
        return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y));
    }

    /**
     * Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).
     *
     * @param vec - Another vector.
     * @returns The squared euclidean distance of the two vectors.
     */
    distanceSq(vec: Vector2): number {
        return (vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y);
    }

    /**
     * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.
     *
     * @param vec - Another vector.
     * @returns Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.
     */
    clockwise(vec: Vector2): number {
        const a = this.y * vec.x;
        const b = this.x * vec.y;

        if (a > b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }

        return 1;
    }

    /**
     * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to an arbitrary third vector.
     *
     * @param center - The central vector.
     * @param vec    - Another vector.
     * @returns Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to an arbitrary third vector.
     */
    relativeClockwise(center: Vector2, vec: Vector2): number {
        const a = (this.y - center.y) * (vec.x - center.x);
        const b = (this.x - center.x) * (vec.y - center.y);

        if (a > b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }

        return 1;
    }

    /**
     * Rotates this vector by a given number of radians around the origin of the coordinate system.
     *
     * @param angle - The angle to rotate the vector, in radians.
     * @returns Returns itself.
     */
    rotate(angle: number): this {
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        const x = this.x * c - this.y * s;
        const y = this.x * s + this.y * c;

        this.x = x;
        this.y = y;

        return this;
    }

    /**
     * Rotates this vector around another vector.
     *
     * @param angle - The angle to rotate the vector, in radians.
     * @param vec   - The vector which is used as the rotational center.
     * @returns Returns itself.
     */
    rotateAround(angle: number, vec: Vector2): this {
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        this.x -= vec.x;
        this.y -= vec.y;

        const x = this.x * c - this.y * s;
        const y = this.x * s + this.y * c;

        this.x = x + vec.x;
        this.y = y + vec.y;

        return this;
    }

    /**
     * Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.
     *
     * @param vec         - The vector to rotate this vector to.
     * @param center      - The rotational center.
     * @param offsetAngle -  An additional amount of radians to rotate the vector (default 0).
     * @returns Returns itself.
     */
    rotateTo(vec: Vector2, center: Vector2, offsetAngle: number = 0.0): this {
        // Problem if this is first position
        this.x += 0.001;
        this.y -= 0.001;

        const a = Vector2.subtract(this, center);
        const b = Vector2.subtract(vec,  center);
        const angle = Vector2.angle(b, a);

        this.rotateAround(angle + offsetAngle, center);

        return this;
    }

    /**
     * Rotates the vector away from a specified vector around a center.
     *
     * @param vec    - The vector this one is rotated away from.
     * @param center - The rotational center.
     * @param angle  - The angle by which to rotate.
     * @returns Returns itself.
     */
    rotateAwayFrom(vec: Vector2, center: Vector2, angle: number): this {
        this.rotateAround(angle, center);
        const distSqA = this.distanceSq(vec);

        this.rotateAround(-2.0 * angle, center);
        const distSqB = this.distanceSq(vec);

        // If it was rotated towards the other vertex, rotate in other direction by same amount.
        if (distSqB < distSqA) {
            this.rotateAround(2.0 * angle, center);
        }

        return this;
    }

    /**
     * Returns the angle in radians used to rotate this vector away from a given vector.
     *
     * @param vec    - The vector this one is rotated away from.
     * @param center - The rotational center.
     * @param angle  - The angle by which to rotate.
     * @returns The angle in radians.
     */
    getRotateAwayFromAngle(vec: Vector2, center: Vector2, angle: number): number {
        const tmp = this.clone();

        tmp.rotateAround(angle, center);
        const distSqA = tmp.distanceSq(vec);

        tmp.rotateAround(-2.0 * angle, center);
        const distSqB = tmp.distanceSq(vec);

        if (distSqB < distSqA) {
            return angle;
        }
        else {
            return -angle;
        }
    }

    /**
     * Returns the angle in radians used to rotate this vector towards a given vector.
     *
     * @param vec    - The vector this one is rotated towards to.
     * @param center - The rotational center.
     * @param angle  - The angle by which to rotate.
     * @returns The angle in radians.
     */
    getRotateTowardsAngle(vec: Vector2, center: Vector2, angle: number): number {
        const tmp = this.clone();

        tmp.rotateAround(angle, center);
        const distSqA = tmp.distanceSq(vec);

        tmp.rotateAround(-2.0 * angle, center);
        const distSqB = tmp.distanceSq(vec);

        if (distSqB > distSqA) {
            return angle;
        }
        else {
            return -angle;
        }
    }

    /**
     * Gets the angles between this vector and another vector around a common center of rotation.
     *
     * @param vec    - Another vector.
     * @param center - The center of rotation.
     * @returns The angle between this vector and another vector around a center of rotation in radians.
     */
    getRotateToAngle(vec: Vector2, center: Vector2): number {
        const a = Vector2.subtract(this, center);
        const b = Vector2.subtract(vec, center);
        const angle = Vector2.angle(b, a);

        return Number.isNaN(angle) ? 0.0 : angle;
    }

    /**
     * Checks whether a vector lies within a polygon spanned by a set of vectors.
     *
     * @param polygon - An array of vectors spanning the polygon.
     * @returns A boolean indicating whether or not this vector is within the polygon.
     */
    isInPolygon(polygon: Vector2[]): boolean {
        let inside = false;

        // Its not always a given, that the polygon is convex (-> sugars)
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const a = polygon[i];
            const b = polygon[j];
            if (((a.y > this.y) != (b.y > this.y)) && (this.x < (b.x - a.x) * (this.y - a.y) / (b.y - a.y) + a.x)) {
                inside = !inside;
            }
        }

        return inside;
    }

    /**
     * Returns the length of this vector.
     *
     * @returns The length of this vector.
     */
    length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    /**
     * Returns the square of the length of this vector.
     *
     * @returns The square of the length of this vector.
     */
    lengthSq(): number {
        return (this.x * this.x) + (this.y * this.y);
    }

    /**
     * Normalizes this vector.
     *
     * @returns Returns itself.
     */
    normalize(): this {
        this.divide(this.length());
        return this;
    }

    /**
     * Returns a normalized copy of this vector.
     *
     * @returns A normalized copy of this vector.
     */
    normalized(): Vector2 {
        return Vector2.divideScalar(this, this.length());
    }

    /**
     * Calculates which side of a line spanned by two vectors this vector is.
     *
     * @param vecA - A vector.
     * @param vecB - A vector.
     * @returns A number indicating the side of this vector, given a line spanned by two other vectors.
     */
    whichSide(vecA: Vector2, vecB: Vector2): number {
        return (this.x - vecA.x) * (vecB.y - vecA.y) - (this.y - vecA.y) * (vecB.x - vecA.x);
    }

    /**
     * Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.
     *
     * @param vecA - A vector spanning the line.
     * @param vecB - A vector spanning the line.
     * @param vecC - A vector to check whether or not it is on the same side as this vector.
     * @returns {Boolean} Returns a boolean indicating whether or not this vector is on the same side as another vector.
     */
    sameSideAs(vecA: Vector2, vecB: Vector2, vecC: Vector2): boolean {
        const d    = this.whichSide(vecA, vecB);
        const dRef = vecC.whichSide(vecA, vecB);

        return (d < 0 && dRef < 0) || (d == 0 && dRef == 0) || (d > 0 && dRef > 0);
    }

    /**
     * Adds two vectors and returns the result as a new vector.
     *
     * @param vecA - A summand.
     * @param vecB - A summand.
     * @returns Returns the sum of two vectors.
     */
    static add(vecA: Vector2, vecB: Vector2): Vector2 {
        return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
    }

    /**
     * Subtracts one vector from another and returns the result as a new vector.
     *
     * @param vecA - The minuend.
     * @param vecB - The subtrahend.
     * @returns Returns the difference of two vectors.
     */
    static subtract(vecA: Vector2, vecB: Vector2): Vector2 {
        return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
    }

    /**
     * Multiplies two vectors (value by value) and returns the result.
     *
     * @param vecA - A vector.
     * @param vecB - A vector.
     * @returns Returns the product of two vectors.
     */
    static multiply(vecA: Vector2, vecB: Vector2): Vector2 {
        return new Vector2(vecA.x * vecB.x, vecA.y * vecB.y);
    }

    /**
     * Multiplies two vectors (value by value) and returns the result.
     *
     * @param vec    - A vector.
     * @param scalar - A scalar.
     * @returns Returns the product of the vector and the scalar.
     */
    static multiplyScalar(vec: Vector2, scalar: number): Vector2 {
        return new Vector2(vec.x * scalar, vec.y * scalar);
    }

    /**
     * Returns the midpoint of a line spanned by two vectors.
     *
     * @static
     * @param vecA - A vector spanning the line.
     * @param vecB - A vector spanning the line.
     * @returns The midpoint of the line spanned by two vectors.
     */
    static midpoint(vecA: Vector2, vecB: Vector2): Vector2 {
        return new Vector2((vecA.x + vecB.x) / 2, (vecA.y + vecB.y) / 2);
    }

    /**
     * Returns the normals of a line spanned by two vectors.
     *
     * @param vecA - A vector spanning the line.
     * @param vecB - A vector spanning the line.
     * @returns An array containing the two normals, each represented by a vector.
     */
    static normals(vecA: Vector2, vecB: Vector2): [Vector2, Vector2] {
        const delta = Vector2.subtract(vecB, vecA);

        return [
            new Vector2(-delta.y, delta.x),
            new Vector2(delta.y, -delta.x),
        ];
    }

    /**
     * Returns the unit (normalized normal) vectors of a line spanned by two vectors.
     *
     * @param vecA - A vector spanning the line.
     * @param vecB - A vector spanning the line.
     * @returns An array containing the two unit vectors.
     */
    static units(vecA: Vector2, vecB: Vector2): [Vector2, Vector2] {
        const delta = Vector2.subtract(vecB, vecA).normalize();

        return [
            new Vector2(-delta.y, delta.x),
            new Vector2(delta.y, -delta.x),
        ];
    }

    /**
     * Divides a vector by another vector and returns the result as new vector.
     *
     * @param vecA - The dividend.
     * @param vecB - The divisor.
     * @returns The fraction of the two vectors.
     */
    static divide(vecA: Vector2, vecB: Vector2): Vector2 {
        return new Vector2(vecA.x / vecB.x, vecA.y / vecB.y);
    }

    /**
     * Divides a vector by a scalar and returns the result as new vector.
     *
     * @param vecA   - The dividend.
     * @param scalar - The scalar.
     * @returns The new, scaled vector.
     */
    static divideScalar(vecA: Vector2, scalar: number): Vector2 {
        return new Vector2(vecA.x / scalar, vecA.y / scalar);
    }

    /**
     * Returns the dot product of two vectors.
     *
     * @param vecA - A vector.
     * @param vecB - A vector.
     * @returns The dot product of two vectors.
     */
    static dot(vecA: Vector2, vecB: Vector2): number {
        return vecA.x * vecB.x + vecA.y * vecB.y;
    }

    /**
     * Returns the angle between two vectors.
     *
     * @param vecA - A vector.
     * @param vecB - A vector.
     * @returns The angle between the two vectors, in radians.
     */
    static angle(vecA: Vector2, vecB: Vector2): number {
        const dot = Vector2.dot(vecA, vecB);
        const len = Math.sqrt(vecA.lengthSq() * vecB.lengthSq());
        return Math.acos(dot / len);
    }

    /**
     * Returns the angle between two vectors based on a third vector in between.
     *
     * @param vecA - A vector.
     * @param vecB - The central vector.
     * @param vecC - Another vector.
     * @returns The angle in radians.
     */
    static threePointangle(vecA: Vector2, vecB: Vector2, vecC: Vector2): number {
        const ab = Vector2.subtract(vecB, vecA);
        const bc = Vector2.subtract(vecC, vecB);
        const abLength = vecA.distance(vecB);
        const bcLength = vecB.distance(vecC);

        return Math.acos(Vector2.dot(ab, bc) / (abLength * bcLength));
    }

    /**
     * Returns the scalar projection of a vector on another vector.
     *
     * @param vecA - The vector to be projected.
     * @param vecB - The vector to be projection upon.
     * @returns The scalar component.
     */
    static scalarProjection(vecA: Vector2, vecB: Vector2): number {
        return Vector2.dot(vecA, vecB.normalized());
    }

    /**
     * Returns the average vector (normalized) of the input vectors.
     *
     * @param vecs - An array containing vectors.
     * @returns The resulting vector (normalized).
     */
    static averageDirection(vecs: Vector2[]): Vector2 {
        const avg = new Vector2(0.0, 0.0);

        for (let i = 0; i < vecs.length; i++) {
            avg.add(vecs[i]);
        }

        return avg.normalize();
    }
}
