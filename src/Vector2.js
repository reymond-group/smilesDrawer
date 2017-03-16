/** A class representing a 2D vector. */
class Vector2 {
    /**
     * The constructor of the class Vector2.
     *
     * @param {number} x The initial x coordinate value.
     * @param {number} y The initial y coordinate value.
     */
    constructor(x, y) {
        if (arguments.length == 0) {
            this.x = 0;
            this.y = 0;
        } else if (arguments.length == 1) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * Sets the values of the x and y coordinates of this vector.
     *
     * @param {number} [x=0] The value of the x coordinate.
     * @param {number} [y=0] The value of the y coordinate.
     */
    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Clones this vector and returns the clone.
     *
     * @returns {Vector2} The clone of this vector.
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * Returns a string representation of this vector.
     *
     * @returns {string} A string representation of this vector.
     */
    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }

    /**
     * Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.
     *
     * @param {Vector2} vec Another vector.
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    /**
     * Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.
     *
     * @param {Vector2} vec Another vector.
     */
    subtract(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    /**
     * Divide the x and y coordinate values of this vector by a scalar.
     *
     * @param {number} scalar The scalar.
     */
    divide(scalar) {
        this.x /= scalar;
        this.y /= scalar;
    }
    
    /**
     * Multiply the x and y coordinate values of this vector by a scalar.
     *
     * @param {number} scalar The scalar.
     */
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    /**
     * Inverts this vector. Same as multiply(-1.0).
     *
     */
    invert() {
        this.x = -this.x;
        this.y = -this.y;
    }

    /**
     * Returns the angle of this vector in relation to the coordinate system.
     *
     * @returns {number} The angle in radians.
     */
    angle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Returns the euclidean distance between this vector and another vector.
     *
     * @param {Vector2} vec A vector.
     * @returns {number} The euclidean distance between the two vectors.
     */
    distance(vec) {
        return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y));
    }

    /**
     * Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).
     *
     * @param {Vector2} vec Another vector.
     * @returns {number} The squared euclidean distance of the two vectors.
     */
    distanceSq(vec) {
        return (vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y);
    }

    /**
     * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.
     *
     * @param {Vector2} vec Another vector.
     * @returns {number} Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.
     */
    clockwise(vec) {
        let a = this.y * vec.x;
        let b = this.x * vec.y;
        
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
     * @param {number} angle The angle in radians to rotate the vector.
     */
    rotate(angle) {
        let tmp = new Vector2();
        
        tmp.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        tmp.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        
        this.x = tmp.x;
        this.y = tmp.y;
    }

    /**
     * Rotates this vector around another vector.
     *
     * @param {number} angle The angle in radians to rotate the vector.
     * @param {Vector2} vec The vector which is used as the rotational center.
     */
    rotateAround(angle, vec) {
        let s = Math.sin(angle);
        let c = Math.cos(angle);

        this.x -= vec.x;
        this.y -= vec.y;

        let x = this.x * c - this.y * s;
        let y = this.x * s + this.y * c;

        this.x = x + vec.x;
        this.y = y + vec.y;
    }

    /**
     * Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.
     *
     * @param {Vector2} vec The vector to rotate this vector to.
     * @param {Vector2} center The rotational center.
     * @param {number} [offsetAngle=0.0] An additional amount of radians to rotate the vector.
     */
    rotateTo(vec, center, offsetAngle = 0.0) {
        // Problem if this is first position
        this.x += 0.001;
        this.y -= 0.001;
        let a = Vector2.subtract(this, center);
        let b = Vector2.subtract(vec, center);
        let angle = Vector2.angle(b, a);

        this.rotateAround(angle + offsetAngle, center);
    }

    /**
     * Gets the angles between this vector and another vector around a common center of rotation.
     *
     * @param {Vector2} vec Another vector.
     * @param {Vector2} center The center of rotation.
     * @returns {number} The angle between this vector and another vector around a center of rotation in radians.
     */
    getRotateToAngle(vec, center) {
        let a = Vector2.subtract(this, center);
        let b = Vector2.subtract(vec, center);
        let angle = Vector2.angle(b, a);

        return angle;
    }

    /**
     * Checks whether a vector lies within a polygon spanned by a set of vectors.
     *
     * @param {array} polygon An array of vectors spanning the polygon.
     * @returns {boolean} A boolean indicating whether or not this vector is within a polygon.
     */
    isInPolygon(polygon) {
        let inside = false;

        // Its not always a given, that the polygon is convex (-> sugars)
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            if (((polygon[i].y > this.y) != (polygon[j].y > this.y)) &&
                (this.x < (polygon[j].x - polygon[i].x) * (this.y - polygon[i].y) /
                (polygon[j].y - polygon[i].y) + polygon[i].x)) {
                inside = !inside;
            }
        }


        return inside;
    }

    /**
     * Returns the length of this vector.
     *
     * @returns {number} The length of this vector.
     */
    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    /**
     * Normalizes this vector.
     *
     */
    normalize() {
        this.divide(this.length());
    }

    /**
     * Returns a normalized copy of this vector.
     *
     * @returns {Vector2} A normalized copy of this vector.
     */
    normalized() {
        return Vector2.divide(this, this.length());
    }

    /**
     * Calculates which side of a line spanned by two vectors this vector is.
     *
     * @param {Vector2} vecA A vector.
     * @param {Vector2} vecB A vector.
     * @returns {number} A number indicating the side of this vector, given a line spanned by two other vectors.
     */
    whichSide(vecA, vecB) {
        return (this.x - vecA.x) * (vecB.y - vecA.y) - (this.y - vecA.y) * (vecB.x - vecA.x);
    }

    /**
     * Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.
     *
     * @param {Vector2} vecA A vector spanning the line.
     * @param {Vector2} vecB A vector spanning the line.
     * @param {Vector2} vecC A vector to check whether or not it is on the same side as this vector.
     * @returns {boolean} Returns a boolean indicating whether or not this vector is on the same side as another vector.
     */
    sameSideAs(vecA, vecB, vecC) {
        let d = this.whichSide(vecA, vecB);
        let dRef = vecC.whichSide(vecA, vecB);

        return d < 0 && dRef < 0 || d == 0 && dRef == 0 || d > 0 && dRef > 0;
    }

    /**
     * Adds two vectors and returns the result as a new vector.
     *
     * @static
     * @param {Vector2} vecA A summand.
     * @param {Vector2} vecB A summand.
     * @returns {Vector2} Returns the sum of two vectors.
     */
    static add(vecA, vecB) {
        return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
    }

    /**
     * Subtracts one vector from another and returns the result as a new vector.
     *
     * @static
     * @param {Vector2} vecA The minuend.
     * @param {Vector2} vecB The subtrahend.
     * @returns {Vector2} Returns the difference of two vectors.
     */
    static subtract(vecA, vecB) {
        return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
    }

    /**
     * Multiplies two vectors (value by value) and returns the result.
     *
     * @static
     * @param {Vector2} vecA A factor.
     * @param {Vector2} vecB A factor.
     * @returns {Vector2} Returns the product of two vectors.
     */
    static multiply(vecA, vecB) {
        if (vecB.x && vecB.y) {
            return new Vector2(vecA.x * vecB.x, vecA.y * vecB.y);
        }

        return new Vector2(vecA.x * vecB, vecA.y * vecB);
    }

    /**
     * Returns the midpoint of a line spanned by two vectors.
     *
     * @static
     * @param {Vector2} vecA A vector spanning the line.
     * @param {Vector2} vecB A vector spanning the line.
     * @returns {Vector2} The midpoint of the line spanned by two vectors.
     */
    static midpoint(vecA, vecB) {
        return new Vector2((vecA.x + vecB.x) / 2, (vecA.y + vecB.y) / 2);
    }

    /**
     * Returns the normals of a line spanned by two vectors.
     *
     * @static
     * @param {Vector2} vecA A vector spanning the line.
     * @param {Vector2} vecB A vector spanning the line.
     * @returns {array} An array containing the two normals, each represented by a vector.
     */
    static normals(vecA, vecB) {
        let delta = Vector2.subtract(vecB, vecA);

        return [
            new Vector2(-delta.y, delta.x),
            new Vector2(delta.y, -delta.x)
        ];
    }

    /**
     * Divides a vector by another vector and returns the result as new vector.
     *
     * @static
     * @param {Vector2} vecA The dividend.
     * @param {Vector2} vecB The divisor.
     * @returns {Vector2} The fraction of the two vectors.
     */
    static divide(vecA, vecB) {
        if (vecB.x && vecB.y) {
            return new Vector2(vecA.x / vecB.x, vecA.y / vecB.y);
        }

        return new Vector2(vecA.x / vecB, vecA.y / vecB);
    }

    /**
     * Returns the dot product of two vectors.
     *
     * @static
     * @param {Vector2} vecA A vector.
     * @param {Vector2} vecB A vector.
     * @returns {number} The dot product of two vectors.
     */
    static dot(vecA, vecB) {
        return vecA.x * vecB.x + vecA.y * vecB.y;
    }

    /**
     * Returns the angle between two vectors.
     *
     * @static
     * @param {Vector2} vecA A vector.
     * @param {Vector2} vecB A vector.
     * @returns {number} The angle between two vectors in radians.
     */
    static angle(vecA, vecB) {
        let dot = Vector2.dot(vecA, vecB);

        return Math.acos(dot / (vecA.length() * vecB.length()));
    }
    
    /**
     * Returns the scalar projection of a vector on another vector.
     *
     * @static
     * @param {Vector2} vecA Thecreate jsdoc babel vector to be projected.
     * @param {Vector2} vecB The vector to be projection upon.
     * @returns {number} The scalar component.
     */
    static scalarProjection(vecA, vecB) {
        let unit = vecB.normalized();
        
        return Vector2.dot(vecA, unit);
    }
}
