class Vertex {
    constructor(value, x, y) {
        this.id = null;
        this.value = value;
        this.position = new Vector2(x ? x : 0, y ? y : 0);
        this.previousPosition = new Vector2(0, 0);
        this.parent = null;
        this.children = [];
        this.spanningTreeChildren = [];
        this.edges = [];
        this.positioned = false;
        this.angle = 0.0;
        this.backAngle = 0.0;
        this.flippable = false; // can be flipped into a ring
        this.flipCenter = null;
        this.flipNeighbour = null;
        this.flipRings = new Array();
    }

    isTerminal() {
        if(this.parent === null && this.children < 2) return true;
        if(this.children.length === 0) return true;
        return false;
    }

    clone() {
        var clone = new Vertex(this.value, this.position.x, this.position.y);
        clone.id = this.id;
        clone.previousPosition = new Vector2(this.previousPosition.x, this.previousPosition.y);
        clone.parent = this.parent;
        clone.children = ArrayHelper.clone(this.children);
        clone.spanningTreeChildren = ArrayHelper.clone(this.spanningTreeChildren);
        clone.edges = ArrayHelper.clone(this.edges);
        clone.positioned = this.positioned;
        clone.angle = this.angle;
        clone.backAngle = this.backAngle;
        clone.flippable = this.flippable;
        clone.flipCenter = this.flipCenter;
        clone.flipRings = ArrayHelper.clone(this.flipRings);
        return clone;
    }

    equals(v) {
        return this.id == v.id;
    }

    getAngle(v, deg) {
        var u = null;
        if (!v)
            u = Vector2.subtract(this.position, this.previousPosition);
        else
            u = Vector2.subtract(this.position, v);

        if (deg) return MathHelper.toDeg(u.angle());

        return u.angle();
    }

    /**
    * Returns the direction in which there is no bond in order to place the text.
    */
    getTextDirection(vertices) {
        var neighbours = this.getNeighbours();
        var angles = [];
        for (var i = 0; i < neighbours.length; i++) {
            angles.push(this.getAngle(vertices[neighbours[i]].position));
        }

        var textAngle = MathHelper.meanAngle(angles);

        // Round to 0, 90, 180 or 270 degree
        var halfPi = Math.PI / 2.0;
        textAngle = Math.round(Math.round(textAngle / halfPi) * halfPi, 3);

        if (textAngle == 2) return 'down';
        if (textAngle == -2) return 'up';
        if (textAngle === 0 || textAngle === -0) return 'right'; // is checking for -0 necessary?
        if (textAngle == 3 || textAngle == -3) return 'left';
    }

    /**
    * If a vertex id is supplied, it is excluded.
    */
    getNeighbours(v) {
        var neighbours = [];

        for (var i = 0; i < this.children.length; i++) {
            if (v === undefined || v != this.children[i])
                neighbours.push(this.children[i]);
        }

        if (this.parent != null) {
            if (v === undefined || v != this.parent)
                neighbours.push(this.parent);
        }

        return neighbours;
    }

    getCommonNeighbours(v) {
        // There can only be one common neighbour of a Vertex
        // outside of a ring
        var commonNeighbours = new Array();
        var neighboursA = this.getNeighbours();
        var neighboursB = v.getNeighbours();

        for (var i = 0; i < neighboursA.length; i++) {
            for (var j = 0; j < neighboursB.length; j++) {
                if (neighboursA[i] === neighboursB[j]) {
                    commonNeighbours.push(neighboursA[i]);
                }
            }
        }

        return commonNeighbours;
    }

    isNeighbour(v) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] === v) return true;
        }

        return this.parent === v;
    }

    /**
    * Returns the neighbours without the ones defined over ringbonds
    */
    getSpanningTreeNeighbours(v) {
        var neighbours = [];

        for (var i = 0; i < this.spanningTreeChildren.length; i++) {
            if (v === undefined || v != this.spanningTreeChildren[i])
                neighbours.push(this.spanningTreeChildren[i]);
        }

        if (this.parent != null) {
            if (v === undefined || v != this.parent)
                neighbours.push(this.parent);
        }

        return neighbours;
    }

    getNextInRing(vertices, ring, previous) {
        var neighbours = this.getNeighbours();

        for (var i = 0; i < neighbours.length; i++) {
            if (ArrayHelper.contains(vertices[neighbours[i]].value.rings, {
                value: ring
            }) && neighbours[i] != previous)
            return neighbours[i];
        }

        return null;
    }
}
