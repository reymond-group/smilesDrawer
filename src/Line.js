class Line {
    constructor(a, b, elementA, elementB) {
        this.a = a ? a : new Vector2(0, 0);
        this.b = b ? b : new Vector2(0, 0);

        this.elementA = elementA;
        this.elementB = elementB;
    }

    clone() {
        return new Line(this.a.clone(), this.b.clone(), this.elementA, this.elementB);
    }

    getLength() {
        return Math.sqrt(Math.pow(this.b.x - this.a.x, 2) + Math.pow(this.b.y - this.a.y, 2));
    }


    getAngle() {
        // Get the angle between the line and the x-axis
        var diff = Vector2.subtract(this.getRightVector(), this.getLeftVector());
        return diff.angle();
    }

    getRightVector() {
        // Return the vector with the larger x value (the right one)
        if (this.a.x < this.b.x)
            return this.b;
        else
            return this.a;
    }

    getLeftVector() {
        // Return the vector with the smaller x value (the left one)
        if (this.a.x < this.b.x)
            return this.a;
        else
            return this.b;
    }

    getRightElement() {
        if (this.a.x < this.b.x)
            return this.elementB;
        else
            return this.elementA;
    }

    getLeftElement() {
        if (this.a.x < this.b.x)
            return this.elementA;
        else
            return this.elementB;
    }

    setRightVector(x, y) {
        if (this.a.x < this.b.x)
            this.b.set(x, y);
        else
            this.a.set(x, y);
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

    shortenA(by) {
        var f = Vector2.subtract(this.b, this.a);
        f.normalize();
        f.multiply(by);
        this.a.add(f);

        return this;
    }

    shortenB(by) {
        var f = Vector2.subtract(this.a, this.b);
        f.normalize();
        f.multiply(by);
        this.b.add(f);

        return this;
    }

    shorten(by) {
        var f = Vector2.subtract(this.a, this.b);
        f.normalize();
        f.multiply(by / 2.0);
        this.b.add(f);
        this.a.subtract(f);

        return this;
    }
}
