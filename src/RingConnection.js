/** A class representing a ring connection */
class RingConnection {
    /**
     * The constructor for the class RingConnection.
     *
     * @param {number} firstRing A ring.
     * @param {number} secondRing A ring.
     */
    constructor(firstRing, secondRing) {
        this.id = null;
        this.rings = new Pair(firstRing.id, secondRing.id);
        this.vertices = [];

        for (let m = 0; m < firstRing.members.length; m++) {
            let c = firstRing.members[m];

            for (let n = 0; n < secondRing.members.length; n++) {
                let d = secondRing.members[n];

                if (c === d) {
                    this.addVertex(c);
                }
            }
        }
    }

    /**
     * Adding a vertex to the ring connection.
     *
     * @param {number} vertexId A vertex id.
     */
    addVertex(vertexId) {
        if (!ArrayHelper.contains(this.vertices, { value: vertexId })) {
            this.vertices.push(vertexId);
        }
    }

    /**
     * Checks whether or not this ring connection is a bridge in a bridged ring.
     *
     * @param {array} vertices The array of vertices associated with the current molecule.
     * @returns {boolean} A boolean indicating whether or not this ring connection is a bridge.
     */
    isBridge(vertices) {
        if (this.vertices.length > 2) { 
            return true;
        }

        for (let i = 0; i < this.vertices.length; i++) {
            let vertexId = this.vertices[i];
            
            if(vertices[vertexId].value.rings.length > 2) {
                return true;
            }
        }

        return false;
    }

    /**
     * Update the ring id of this ring connection that is not the ring id supplied as the second argument.
     *
     * @param {number} ringId A ring id. The new ring id to be set.
     * @param {number} otherRingId A ring id. The id that is NOT to be updated.
     */
    updateOther(ringId, otherRingId) {
        if (this.rings.first === otherRingId) {
            this.rings.second = ringId;
        } else {
            this.rings.first = ringId;
        }
    }

    /**
     * Checks whether or not two rings are connected by a bridged bond.
     *
     * @static
     * @param {array} ringConnections An array of ring connections containing the ring connections associated with the current molecule.
     * @param {array} vertices An array of vertices containing the vertices associated with the current molecule.
     * @param {number} firstRingId A ring id.
     * @param {number} secondRingId A ring id.
     * @returns {boolean} A boolean indicating whether or not two rings ar connected by a bridged bond.
     */
    static isBridge(ringConnections, vertices, firstRingId, secondRingId) {
        let ringConnection = null;
        
        for (let i = 0; i < ringConnections.length; i++) {
            ringConnection = ringConnections[i];
            
            let rings = ringConnection.rings;
            
            if (rings.first === firstRingId && rings.second === secondRingId ||
                rings.first === secondRingId && rings.second === firstRingId) {
                return ringConnection.isBridge(vertices);
            }
        }

        return false;
    }

    /**
     * Retruns the neighbouring rings of a given ring.
     *
     * @static
     * @param {array} ringConnections An array of ring connections containing ring connections associated with the current molecule.
     * @param {number} ringId A ring id.
     * @returns {array} An array of ring ids of neighbouring rings.
     */
    static getNeighbours(ringConnections, ringId) {
        let neighbours = [];

        for (let i = 0; i < ringConnections.length; i++) {
            let pair = ringConnections[i].rings;
            
            if (pair.first === ringId) {
                neighbours.push(pair.second);
            } else if (pair.second === ringId) {
                neighbours.push(pair.first);
            }
        }

        return neighbours;
    }

    /**
     * Returns an array of vertex ids associated with a given ring connection.
     *
     * @static
     * @param {array} ringConnections An array of ring connections containing ring connections associated with the current molecule.
     * @param {number} firstRingId A ring id.
     * @param {number} secondRingId A ring id.
     * @returns {array} An array of vertex ids associated with the ring connection.
     */
    static getVertices(ringConnections, firstRingId, secondRingId) {
        for (let i = 0; i < ringConnections.length; i++) {
            let rc = ringConnections[i];
            
            if (rc.rings.first == firstRingId && rc.rings.second == secondRingId ||
                rc.rings.first == secondRingId && rc.rings.second == firstRingId) {
                
                return rc.vertices;
            }
        }
    }
}
