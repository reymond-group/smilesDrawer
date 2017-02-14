class Vector2 {
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

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }

    static add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    static subtract(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    static multiply(v1, v2) {
        if (v2.x && v2.y)
            return new Vector2(v1.x * v2.x, v1.y * v2.y);
        else
            return new Vector2(v1.x * v2, v1.y * v2);
    }

    static midpoint(v1, v2) {
        return new Vector2((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
    }

    static normals(v1, v2) {
        var delta = Vector2.subtract(v2, v1);

        return [
            new Vector2(-delta.y, delta.x),
            new Vector2(delta.y, -delta.x)
        ];
    }

    multiply(s) {
        this.x *= s;
        this.y *= s;
    }

    static divide(v1, v2) {
        if (v2.x && v2.y)
            return new Vector2(v1.x / v2.x, v1.y / v2.y);
        else
            return new Vector2(v1.x / v2, v1.y / v2);
    }

    divide(s) {
        this.x /= s;
        this.y /= s;
    }

    invert() {
        this.x = -this.x;
        this.y = -this.y;
    }

    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static angle(v1, v2) {
        var dot = Vector2.dot(v1, v2);
        return Math.acos(dot / (v1.length() * v2.length()));
    }

    angle() {
        // It's atan2(y, x);
        return Math.atan2(this.y, this.x);
    }

    distance(v) {
        return Math.sqrt((v.x - this.x) * (v.x - this.x) + (v.y - this.y) * (v.y - this.y));
    }

    distanceSq(v) {
        return (v.x - this.x) * (v.x - this.x) + (v.y - this.y) * (v.y - this.y);
    }

    clockwise(v) {
        var a = this.y * v.x;
        var b = this.x * v.y;
        if (a > b) return -1;
        if (a === b) return 0;
        return 1;
    }

    rotate(angle) {
        var tmp = new Vector2();
        tmp.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        tmp.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        this.x = tmp.x;
        this.y = tmp.y;
    }

    rotateAround(angle, v) {
        var s = Math.sin(angle);
        var c = Math.cos(angle);

        this.x -= v.x;
        this.y -= v.y;

        var x = this.x * c - this.y * s;
        var y = this.x * s + this.y * c;

        this.x = x + v.x;
        this.y = y + v.y;
    }

    rotateTo(v, center, offsetAngle) {
        offsetAngle = offsetAngle ? offsetAngle : 0.0;

        var a = Vector2.subtract(this, center);
        var b = Vector2.subtract(v, center);
        var angle = Vector2.angle(b, a);

        this.rotateAround(angle + offsetAngle, center);
    }

    getRotateToAngle(v, center) {
        var a = Vector2.subtract(this, center);
        var b = Vector2.subtract(v, center);
        var angle = Vector2.angle(b, a);

        return angle;
    }

    isInPolygon(polygon) {
        var inside = false;

        // Its not always a given, that the polygon is convex (-> sugars)
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            if (((polygon[i].y > this.y) != (polygon[j].y > this.y)) &&
                    (this.x < (polygon[j].x - polygon[i].x) * (this.y - polygon[i].y) /
                    (polygon[j].y - polygon[i].y) + polygon[i].x)) {
                inside = !inside;
            }
        }


        return inside;
    }

    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    normalize() {
        this.divide(this.length());
    }

    normalized() {
        return Vector2.divide(this, this.length());
    }

    static scalarProjection(v1, v2) {
        var unit = v2.normalized();
        return Vector2.dot(v1, unit);
    }

    whichSide(v1, v2) {
        return (this.x - v1.x) * (v2.y - v1.y) - (this.y - v1.y) * (v2.x - v1.x);
    }

    sameSideAs(v1, v2, v3) {
        var d = this.whichSide(v1, v2);
        var dRef = v3.whichSide(v1, v2);

        return d < 0 && dRef < 0 || d == 0 && dRef == 0 || d > 0 && dRef > 0;
    }
}
