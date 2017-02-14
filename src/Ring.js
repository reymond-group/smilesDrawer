class Ring {
    constructor(ringbond, source, target) {
        this.id = null;
        this.ringbond = ringbond;
        this.source = source;
        this.target = target;
        this.members = new Array();
        this.insiders = new Array();
        this.neighbours = new Array();
        this.positioned = false;
        this.center = new Vector2();
        this.rings = new Array();
        this.isBridged = false;
        this.template = null;
        this.isSpiro = false;
        this.isFused = false;
        this.radius = 0.0;
        this.centralAngle = 0.0;
        this.flip = true;
    }

    clone() {
        var clone = new Ring(this.ringbond, this.source, this.target);

        clone.id = this.id;
        clone.members = ArrayHelper.clone(this.members);
        clone.insiders = ArrayHelper.clone(this.insiders);
        clone.neighbours = ArrayHelper.clone(this.neighbours);
        clone.positioned = this.positioned;
        clone.center = ArrayHelper.clone(this.center);
        clone.rings = ArrayHelper.clone(this.rings);
        clone.isBridged = this.isBridged;
        clone.template = this.template;
        clone.isSpiro = this.isSpiro;
        clone.isFused = this.isFused;
        clone.radius = this.radius;
        clone.centralAngle = this.centralAngle;
        clone.flip = this.flip;

        return clone;
    }

    allowsFlip() {
        return this.flip && this.members.length > 4;
    }

    flipped() {
        if (this.members.length < 8) this.flip = false;
    }

    size() {
        return this.members.length;
    }

    getPolygon(vertices) {
        var polygon = [];

        for (var i = 0; i < this.members.length; i++) {
            polygon.push(vertices[this.members[i]].position);
        }

        return polygon;
    }

    getAngle() {
        return Math.PI - this.centralAngle;
    }

    eachMember(vertices, func, start, previous) {
        var start = start || start === 0 ? start : this.members[0];
        var current = start;
        var max = 0;

        while (current != null && max < 100) {
            var prev = current;
            func(prev);

            current = vertices[current].getNextInRing(vertices, this.id, previous);
            previous = prev;
            if (current == start) {
                current = null;
            }
            if (max == 99) console.log('crap');
            max++;
        }
    }

    getOrderedNeighbours(ringConnections) {
        var orderedNeighbours = [];
        for (var i = 0; i < this.neighbours.length; i++) {
            var vertices = RingConnection.getVertices(ringConnections, this.id, this.neighbours[i]);
            orderedNeighbours.push({
                n: vertices.length,
                neighbour: this.neighbours[i]
            });
        }

        orderedNeighbours.sort(function (a, b) {
            // Sort highest to lowest
            return b.n - a.n;
        });

        return orderedNeighbours;
    }

    isBenzene(vertices) {
        for (var i = 0; i < this.members.length; i++) {
            var e = vertices[this.members[i]].value.element.charAt(0);

            if (e == e.toUpperCase()) {
                return false;
            }
        }

        return true;
    }

    contains(vertex) {
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i] == vertex) return true;
        }

        return false;
    }

    thisOrNeighboursContain(rings, vertex) {
        for (var i = 0; i < this.neighbours.length; i++) {
            if (Ring.getRing(rings, this.neighbours[i])
                    .contains(vertex)) return true;
        }

        if (this.contains(vertex)) return true;

        return false;
    }

    hasSource() {
        return !(this.source === undefined || this.source === null);
    }

    hasTarget() {
        return !(this.target === undefined || this.target === null);
    }

    hasSourceAndTarget() {
        return this.hasSource() && this.hasTarget();
    }

    getRing(rings, id) {
        for (var i = 0; i < rings.length; i++) {
            if (rings[i].id == id) return rings[i];
        }
    }

    static contains(rings, vertex) {
        for (var i = 0; i < rings.length; i++) {
            if (rings[i].contains(vertex)) return true;
        }

        return false;
    }
}
