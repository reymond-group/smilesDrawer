class RingConnection {
    constructor(firstRing, secondRing) {
        this.id = null;
        this.rings = new Pair(firstRing, secondRing);
        this.vertices = [];
    }

    addVertex(vertex) {
        if (!ArrayHelper.contains(this.vertices, {
            value: vertex
        }))
        this.vertices.push(vertex);
    }

    isBridge(vertices) {
        if(this.vertices.length > 2) return true;

        for(var i = 0; i < this.vertices.length; i++) {
            var vertexId = this.vertices[i];
            if(vertices[vertexId].value.rings.length > 2) return true;
        }

        return false;
    }

    /**
    * Updates the value other than the one supplied as the second parameter
    */
    updateOther(update, other) {
        if (this.rings.first === other)
            this.rings.second = update;
        else
            this.rings.first = update;
    }

    static isBridge(ringConnections, vertices, firstRing, secondRing) {
        var ringConnection = null;
        for (var i = 0; i < ringConnections.length; i++) {
            ringConnection = ringConnections[i];
            var rings = ringConnection.rings;
            if (rings.first === firstRing && rings.second === secondRing ||
                    rings.first === secondRing && rings.second === firstRing)
                return ringConnection.isBridge(vertices);
        }
    }

    static getNeighbours(array, id) {
        var neighbours = [];

        for (var i = 0; i < array.length; i++) {
            var pair = array[i].rings;
            if (pair.first == id) {
                neighbours.push(pair.second);
            } else if (pair.second == id) {
                neighbours.push(pair.first);
            }
        }

        return neighbours;
    }

    static getVertices(ringConnections, firstRing, secondRing) {
        for (var i = 0; i < ringConnections.length; i++) {
            var rc = ringConnections[i];
            if (rc.rings.first == firstRing && rc.rings.second == secondRing ||
                    rc.rings.first == secondRing && rc.rings.second == firstRing) {
                return rc.vertices;
            }
        }
    }
}
