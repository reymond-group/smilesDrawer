/** A class representing a line */
class Line {
    /**
     * The constructor for the class Line.
     *
     * @param {Vector2} [from=new Vector2(0, 0)] A vector marking the beginning of the line.
     * @param {Vector2} [to=new Vector2(0, 0)] A vector marking the end of the line.
     * @param {string} [elementFrom=null] A one-letter representation of the element associated with the vector marking the beginning of the line.
     * @param {string} [elementTo=null] A one-letter representation of the element associated with the vector marking the end of the line.
     * @param {boolean} [chiralFrom=false] Whether or not the from atom is a chiral center.
     * @param {boolean} [chiralTo=false] Whether or not the to atom is a chiral center.
     */
    constructor(from = new Vector2(0,0), to = new Vector(0, 0), elementFrom = null, elementTo = null, chiralFrom = false, chiralTo = false) {
        this.from = from;
        this.to = to;
        this.elementFrom = elementFrom;
        this.elementTo = elementTo;
        this.chiralFrom = chiralFrom;
        this.chiralTo = chiralTo;
    }

    /**
     * Clones this line and returns the clone.
     *
     * @returns {Line} A clone of this line.
     */
    clone() {
        return new Line(this.from.clone(), this.to.clone(), this.elementFrom, this.elementTo);
    }

    /**
     * Returns the length of this line.
     *
     * @returns {number} The length of this line.
     */
    getLength() {
        return Math.sqrt(Math.pow(this.to.x - this.from.x, 2) + 
                         Math.pow(this.to.y - this.from.y, 2));
    }


    /**
     * Returns the angle of the line in relation to the coordinate system (the x-axis).
     *
     * @returns {number} The angle in radians.
     */
    getAngle() {
        // Get the angle between the line and the x-axis
        let diff = Vector2.subtract(this.getRightVector(), this.getLeftVector());
        return diff.angle();
    }

    /**
     * Returns the right vector (the vector with the larger x value).
     *
     * @returns {Vector2} The right vector.
     */
    getRightVector() {
        // Return the vector with the larger x value (the right one)
        if (this.from.x < this.to.x) {
            return this.to;
        } else {
            return this.from;
        }
    }
    
    /**
     * Returns the left vector (the vector with the smaller x value).
     *
     * @returns {Vector2} The left vector.
     */
    getLeftVector() {
        // Return the vector with the smaller x value (the left one)
        if (this.from.x < this.to.x) {
            return this.from;
        } else {
            return this.to;
        }
    }

    /**
     * Returns the element associated with the right vector (the vector with the larger x value).
     *
     * @returns {string} The element associated with the right vector.
     */
    getRightElement() {
        if (this.from.x < this.to.x) {
            return this.elementTo;
        } else {
            return this.elementFrom;
        }
    }

    /**
     * Returns the element associated with the left vector (the vector with the smaller x value).
     *
     * @returns {string} The element associated with the left vector.
     */
    getLeftElement() {
        if (this.from.x < this.to.x) {
            return this.elementFrom;
        } else {
            return this.elementTo;
        }
    }

    /**
     * Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.
     *
     * @returns {boolean} Whether or not the atom associated with the right vector is a chiral center.
     */
    getRightChiral() {
        if (this.from.x < this.to.x) {
            return this.chiralTo;
        } else {
            return this.chiralFrom;
        }
    }

    /**
     * Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.
     *
     * @returns {boolean} Whether or not the atom  associated with the left vector is a chiral center.
     */
    getLeftChiral() {
        if (this.from.x < this.to.x) {
            return this.chiralFrom;
        } else {
            return this.chiralTo;
        }
    }

    /**
     * Set the value of the right vector.
     *
     * @param {number} x The x value.
     * @param {number} y The y value.
     * @returns {Line} This line.
     */
    setRightVector(x, y) {
        if (this.from.x < this.to.x) {
            this.to.set(x, y);
        } else {
            this.from.set(x, y);
        }

        return this;
    }

    /**
     * Set the value of the left vector.
     *
     * @param {number} x The x value.
     * @param {number} y The y value.
     * @returns {Line} This line.
     */
    setLeftVector(x, y) {
        if (this.from.x < this.to.x) {
            this.from.set(x, y);
        } else {
            this.to.set(x, y);
        }

        return this;
    }

    /**
     * Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.
     *
     * @returns {Line} This line.
     */
    rotateToXAxis() {
        let left = this.getLeftVector();
        
        this.setRightVector(left.x + this.getLength(), left.y);
        
        return this;
    }

    /**
     * Rotate the line by a given value (in radians). The center of rotation is the left vector.
     *
     * @param {number} theta The angle (in radians) to rotate the line.
     * @returns {Line} This line.
     */
    rotate(theta) {
        let l = this.getLeftVector();
        let r = this.getRightVector();
        let x = Math.cos(theta) * (r.x - l.x) - Math.sin(theta) * (r.y - l.y) + l.x;
        let y = Math.sin(theta) * (r.x - l.x) - Math.cos(theta) * (r.y - l.y) + l.y;
        
        this.setRightVector(x, y);

        return this;
    }

    /**
     * Shortens this line from the "from" direction by a given value (in pixels).
     *
     * @param {number} by The length in pixels to shorten the vector by.
     * @returns {Line} This line.
     */
    shortenFrom(by) {
        let f = Vector2.subtract(this.to, this.from);
        
        f.normalize();
        f.multiply(by);
        
        this.from.add(f);

        return this;
    }

    /**
     * Shortens this line from the "to" direction by a given value (in pixels).
     *
     * @param {number} by The length in pixels to shorten the vector by.
     * @returns {Line} This line.
     */
    shortenTo(by) {
        let f = Vector2.subtract(this.from, this.to);
        
        f.normalize();
        f.multiply(by);
        
        this.to.add(f);

        return this;
    }

    /**
     * Shorten the right side.
     *
     * @param {number} by The length in pixels to shorten the vector by.
     * @returns {Line} Returns itself.
     */
    shortenRight(by) {
        if (this.from.x < this.to.x) {
            this.shortenTo(by);
        } else {
            this.shortenFrom(by);
        }

        return this;
    }
    
    /**
     * Shorten the left side.
     * 
     * @param {number} by The length in pixels to shorten the vector by.
     * @returns {Line} Returns itself.
     */
    shortenLeft(by) {
        if (this.from.x < this.to.x) {
            this.shortenFrom(by);
        } else {
            this.shortenTo(by);
        }

        return this;
    }

    /**
     * Shortens this line from both directions by a given value (in pixels).
     *
     * @param {number} by The length in pixels to shorten the vector by.
     * @returns {Line} This line.
     */
    shorten(by) {
        let f = Vector2.subtract(this.from, this.to);
        
        f.normalize();
        f.multiply(by / 2.0);
        
        this.to.add(f);
        this.from.subtract(f);

        return this;
    }

    /**
     * Returns the normals of this line.
     *
     * @returns {array} An array containing the two normals as vertices.
     */
    getNormals() {
        let delta = Vector2.subtract(from, to);

        return [
            new Vector2(-delta.y, delta.x),
            new Vector2(delta.y, -delta.x)
        ];
    }
}
