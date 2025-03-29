//@ts-check

/** 
 * A class representing a 2D vector.
 * 
 * @property {Number} x The x component of the vector.
 * @property {Number} y The y component of the vector.
 */
class Vector2 {
    /**
     * The constructor of the class Vector2.
     *
     * @param {(Number|Vector2)} x The initial x coordinate value or, if the single argument, a Vector2 object.
     * @param {Number} y The initial y coordinate value.
     */
    constructor(x, y) {
        if (arguments.length == 0) {
            this.x = 0;
            this.y = 0;
        } else if (x instanceof Vector2) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
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
     * @returns {String} A string representation of this vector.
     */
    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }

    /**
     * Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.
     *
     * @param {Vector2} vec Another vector.
     * @returns {Vector2} Returns itself.
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    }

    /**
     * Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.
     *
     * @param {Vector2} vec Another vector.
     * @returns {Vector2} Returns itself.
     */
    subtract(vec) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    /**
     * Divide the x and y coordinate values of this vector by a scalar.
     *
     * @param {Number} scalar The scalar.
     * @returns {Vector2} Returns itself.
     */
    divide(scalar) {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }
    
    /**
     * Multiply the x and y coordinate values of this vector by the values of another vector.
     *
     * @param {Vector2} v A vector.
     * @returns {Vector2} Returns itself.
     */
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    }

    /**
     * Multiply the x and y coordinate values of this vector by a scalar.
     *
     * @param {Number} scalar The scalar.
     * @returns {Vector2} Returns itself.
     */
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    /**
     * Inverts this vector. Same as multiply(-1.0).
     *
     * @returns {Vector2} Returns itself.
     */
    invert() {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    /**
     * Returns the angle of this vector in relation to the coordinate system.
     *
     * @returns {Number} The angle in radians.
     */
    angle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Returns the euclidean distance between this vector and another vector.
     *
     * @param {Vector2} vec A vector.
     * @returns {Number} The euclidean distance between the two vectors.
     */
    distance(vec) {
        return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y));
    }

    /**
     * Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).
     *
     * @param {Vector2} vec Another vector.
     * @returns {Number} The squared euclidean distance of the two vectors.
     */
    distanceSq(vec) {
        return (vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y);
    }

    /**
     * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.
     *
     * @param {Vector2} vec Another vector.
     * @returns {Number} Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.
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
     * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to an arbitrary third vector.
     *
     * @param {Vector2} center The central vector.
     * @param {Vector2} vec Another vector.
     * @returns {Number} Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to an arbitrary third vector.
     */
    relativeClockwise(center, vec) {
        let a = (this.y - center.y) * (vec.x - center.x);
        let b = (this.x - center.x) * (vec.y - center.y);
        
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
     * @param {Number} angle The angle in radians to rotate the vector.
     * @returns {Vector2} Returns itself.
     */
    rotate(angle) {
        let tmp = new Vector2(0, 0);
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);

        tmp.x = this.x * cosAngle - this.y * sinAngle;
        tmp.y = this.x * sinAngle + this.y * cosAngle;
        
        this.x = tmp.x;
        this.y = tmp.y;

        return this;
    }

    /**
     * Rotates this vector around another vector.
     *
     * @param {Number} angle The angle in radians to rotate the vector.
     * @param {Vector2} vec The vector which is used as the rotational center.
     * @returns {Vector2} Returns itself.
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

        return this;
    }

    /**
     * Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.
     *
     * @param {Vector2} vec The vector to rotate this vector to.
     * @param {Vector2} center The rotational center.
     * @param {Number} [offsetAngle=0.0] An additional amount of radians to rotate the vector.
     * @returns {Vector2} Returns itself.
     */
    rotateTo(vec, center, offsetAngle = 0.0) {
        // Problem if this is first position
        this.x += 0.001;
        this.y -= 0.001;

        let a = Vector2.subtract(this, center);
        let b = Vector2.subtract(vec, center);
        let angle = Vector2.angle(b, a);

        this.rotateAround(angle + offsetAngle, center);

        return this;
    }

    /**
     * Rotates the vector away from a specified vector around a center.
     * 
     * @param {Vector2} vec The vector this one is rotated away from.
     * @param {Vector2} center The rotational center.
     * @param {Number} angle The angle by which to rotate.
     */
    rotateAwayFrom(vec, center, angle) {
        this.rotateAround(angle, center);
        
        let distSqA = this.distanceSq(vec);
        
        this.rotateAround(-2.0 * angle, center);

        let distSqB = this.distanceSq(vec);

        // If it was rotated towards the other vertex, rotate in other direction by same amount.
        if (distSqB < distSqA) {
            this.rotateAround(2.0 * angle, center);
        }
    }

    /**
     * Returns the angle in radians used to rotate this vector away from a given vector.
     * 
     * @param {Vector2} vec The vector this one is rotated away from.
     * @param {Vector2} center The rotational center.
     * @param {Number} angle The angle by which to rotate.
     * @returns {Number} The angle in radians.
     */
    getRotateAwayFromAngle(vec, center, angle) {
        let tmp = this.clone();

        tmp.rotateAround(angle, center);
        
        let distSqA = tmp.distanceSq(vec);
        
        tmp.rotateAround(-2.0 * angle, center);

        let distSqB = tmp.distanceSq(vec);

        if (distSqB < distSqA) {
            return angle;
        } else {
            return -angle;
        }
    }

    /**
     * Returns the angle in radians used to rotate this vector towards a given vector.
     * 
     * @param {Vector2} vec The vector this one is rotated towards to.
     * @param {Vector2} center The rotational center.
     * @param {Number} angle The angle by which to rotate.
     * @returns {Number} The angle in radians.
     */
    getRotateTowardsAngle(vec, center, angle) {
        let tmp = this.clone();

        tmp.rotateAround(angle, center);
        
        let distSqA = tmp.distanceSq(vec);
        
        tmp.rotateAround(-2.0 * angle, center);

        let distSqB = tmp.distanceSq(vec);

        if (distSqB > distSqA) {
            return angle;
        } else {
            return -angle;
        }
    }

    /**
     * Gets the angles between this vector and another vector around a common center of rotation.
     *
     * @param {Vector2} vec Another vector.
     * @param {Vector2} center The center of rotation.
     * @returns {Number} The angle between this vector and another vector around a center of rotation in radians.
     */
    getRotateToAngle(vec, center) {
        let a = Vector2.subtract(this, center);
        let b = Vector2.subtract(vec, center);
        let angle = Vector2.angle(b, a);
        
        return Number.isNaN(angle) ? 0.0 : angle;
    }

    /**
     * Checks whether a vector lies within a polygon spanned by a set of vectors.
     *
     * @param {Vector2[]} polygon An array of vectors spanning the polygon.
     * @returns {Boolean} A boolean indicating whether or not this vector is within a polygon.
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
     * @returns {Number} The length of this vector.
     */
    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    /**
     * Returns the square of the length of this vector.
     *
     * @returns {Number} The square of the length of this vector.
     */
    lengthSq() {
        return (this.x * this.x) + (this.y * this.y);
    }

    /**
     * Normalizes this vector.
     *
     * @returns {Vector2} Returns itself.
     */
    normalize() {
        this.divide(this.length());

        return this;
    }

    /**
     * Returns a normalized copy of this vector.
     *
     * @returns {Vector2} A normalized copy of this vector.
     */
    normalized() {
        return Vector2.divideScalar(this, this.length());
    }

    /**
     * Calculates which side of a line spanned by two vectors this vector is.
     *
     * @param {Vector2} vecA A vector.
     * @param {Vector2} vecB A vector.
     * @returns {Number} A number indicating the side of this vector, given a line spanned by two other vectors.
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
     * @returns {Boolean} Returns a boolean indicating whether or not this vector is on the same side as another vector.
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
     * @param {Vector2} vecA A vector.
     * @param {Vector2} vecB A vector.
     * @returns {Vector2} Returns the product of two vectors.
     */
    static multiply(vecA, vecB) {
        return new Vector2(vecA.x * vecB.x, vecA.y * vecB.y);
    }

    /**
     * Multiplies two vectors (value by value) and returns the result.
     *
     * @static
     * @param {Vector2} vec A vector.
     * @param {Number} scalar A scalar.
     * @returns {Vector2} Returns the product of two vectors.
     */
    static multiplyScalar(vec, scalar) {
        return new Vector2(vec.x, vec.y).multiplyScalar(scalar);
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
     * @returns {Vector2[]} An array containing the two normals, each represented by a vector.
     */
    static normals(vecA, vecB) {
        let delta = Vector2.subtract(vecB, vecA);

        return [
            new Vector2(-delta.y, delta.x),
            new Vector2(delta.y, -delta.x)
        ];
    }

    /**
     * Returns the unit (normalized normal) vectors of a line spanned by two vectors.
     *
     * @static
     * @param {Vector2} vecA A vector spanning the line.
     * @param {Vector2} vecB A vector spanning the line.
     * @returns {Vector2[]} An array containing the two unit vectors.
     */
    static units(vecA, vecB) {
        let delta = Vector2.subtract(vecB, vecA);

        return [
            (new Vector2(-delta.y, delta.x)).normalize(),
            (new Vector2(delta.y, -delta.x)).normalize()
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
      return new Vector2(vecA.x / vecB.x, vecA.y / vecB.y);
    }

    /**
     * Divides a vector by a scalar and returns the result as new vector.
     *
     * @static
     * @param {Vector2} vecA The dividend.
     * @param {Number} s The scalar.
     * @returns {Vector2} The fraction of the two vectors.
     */
    static divideScalar(vecA, s) {
        return new Vector2(vecA.x / s, vecA.y / s);
    }

    /**
     * Returns the dot product of two vectors.
     *
     * @static
     * @param {Vector2} vecA A vector.
     * @param {Vector2} vecB A vector.
     * @returns {Number} The dot product of two vectors.
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
     * @returns {Number} The angle between two vectors in radians.
     */
    static angle(vecA, vecB) {
        let dot = Vector2.dot(vecA, vecB);

        return Math.acos(dot / (vecA.length() * vecB.length()));
    }

    /**
     * Returns the angle between two vectors based on a third vector in between.
     *
     * @static
     * @param {Vector2} vecA A vector.
     * @param {Vector2} vecB A (central) vector.
     * @param {Vector2} vecC A vector.
     * @returns {Number} The angle in radians.
     */
    static threePointangle(vecA, vecB, vecC) {
        let ab = Vector2.subtract(vecB, vecA);
        let bc = Vector2.subtract(vecC, vecB);
        let abLength = vecA.distance(vecB);
        let bcLength = vecB.distance(vecC);

        return Math.acos(Vector2.dot(ab, bc) / (abLength * bcLength));
    }
    
    /**
     * Returns the scalar projection of a vector on another vector.
     *
     * @static
     * @param {Vector2} vecA The vector to be projected.
     * @param {Vector2} vecB The vector to be projection upon.
     * @returns {Number} The scalar component.
     */
    static scalarProjection(vecA, vecB) {
        let unit = vecB.normalized();
        
        return Vector2.dot(vecA, unit);
    }

     /**
     * Returns the average vector (normalized) of the input vectors.
     *
     * @static
     * @param {Array} vecs An array containing vectors.
     * @returns {Vector2} The resulting vector (normalized).
     */
    static averageDirection(vecs) {
        let avg = new Vector2(0.0, 0.0);

        for (var i = 0; i < vecs.length; i++) {
          let vec = vecs[i];
          avg.add(vec);
        }

        return avg.normalize();
    }
}

module.exports = Vector2;