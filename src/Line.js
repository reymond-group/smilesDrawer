class Line {
    constructor(from = new Vector2(0,0), to = new Vector(0, 0), elementFrom = null, elementTo = null) {
        this.from = from;
        this.to = to;

        this.elementFrom = elementFrom;
        this.elementTo = elementTo;
    }

    clone() {
        return new Line(this.elementFrom, this.elementTo,
                        this.from.clone(), this.to.clone());
    }

    getLength() {
        return Math.sqrt(Math.pow(this.to.x - this.from.x, 2) + 
                         Math.pow(this.to.y - this.from.y, 2));
    }


    getAngle() {
        // Get the angle between the line and the x-axis
        var diff = Vector2.subtract(this.getRightVector(), this.getLeftVector());
        return diff.angle();
    }

    getRightVector() {
        // Return the vector with the larger x value (the right one)
        if (this.from.x < this.to.x)
            return this.to;
        else
            return this.from;
    }

    getLeftVector() {
        // Return the vector with the smaller x value (the left one)
        if (this.from.x < this.to.x)
            return this.from;
        else
            return this.to;
    }

    getRightElement() {
        if (this.from.x < this.to.x)
            return this.elementTo;
        else
            return this.elementFrom;
    }

    getLeftElement() {
        if (this.from.x < this.to.x)
            return this.elementFrom;
        else
            return this.elementTo;
    }

    setRightVector(x, y) {
        if (this.from.x < this.to.x)
            this.to.set(x, y);
        else
            this.from.set(x, y);
    }

    rotateToXAxis() {
        var left = this.getLeftVector();
        this.setRightVector(left.x + this.getLength(), left.y);
    }

    rotate(theta) {
        var l = this.getLeftVector();
        var r = this.getRightVector();
        var x = Math.cos(theta) * (r.x - l.x) - Math.sin(theta) * (r.y - l.y) + l.x;
        var y = Math.sin(theta) * (r.x - l.x) - Math.cos(theta) * (r.y - l.y) + l.y;
        this.setRightVector(x, y);

        return this;
    }

    shortenFrom(by) {
        var f = Vector2.subtract(this.to, this.from);
        f.normalize();
        f.multiply(by);
        this.from.add(f);

        return this;
    }

    shortenTo(by) {
        var f = Vector2.subtract(this.from, this.to);
        f.normalize();
        f.multiply(by);
        this.to.add(f);

        return this;
    }

    shorten(by) {
        var f = Vector2.subtract(this.from, this.to);
        f.normalize();
        f.multiply(by / 2.0);
        this.to.add(f);
        this.from.subtract(f);

        return this;
    }
}
