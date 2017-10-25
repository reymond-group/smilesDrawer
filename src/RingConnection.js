/** 
 * A class representing a ring connection.
 * 
 * @property {Number} id The id of this ring connection.
 * @property {Number} firstRingId A ring id.
 * @property {Number} secondRingId A ring id.
 * @property {Set<Number>} vertices A set containing the vertex ids participating in the ring connection.
 */
SmilesDrawer.RingConnection = class RingConnection {
    /**
     * The constructor for the class RingConnection.
     *
     * @param {SmilesDrawer.Ring} firstRing A ring.
     * @param {SmilesDrawer.Ring} secondRing A ring.
     */
    constructor(firstRing, secondRing) {
        this.id = null;
        this.firstRingId = firstRing.id;
        this.secondRingId = secondRing.id;
        this.vertices = new Set();

        for (var m = 0; m < firstRing.members.length; m++) {
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
     * @param {Number} vertexId A vertex id.
     */
    addVertex(vertexId) {
        this.vertices.add(vertexId);
    }

    /**
     * Update the ring id of this ring connection that is not the ring id supplied as the second argument.
     *
     * @param {Number} ringId A ring id. The new ring id to be set.
     * @param {Number} otherRingId A ring id. The id that is NOT to be updated.
     */
    updateOther(ringId, otherRingId) {
        if (this.firstRingId === otherRingId) {
            this.secondRingId = ringId;
        } else {
            this.firstRingId = ringId;
        }
    }

    /**
     * Returns a boolean indicating whether or not a ring with a given id is participating in this ring connection.
     * 
     * @param {Number} ringId A ring id.
     * @returns {Boolean} A boolean indicating whether or not a ring with a given id participates in this ring connection.
     */
    containsRing(ringId) {
        return this.firstRingId === ringId || this.secondRingId === ringId;
    }

    /**
     * Retruns the neighbouring rings of a given ring.
     *
     * @static
     * @param {SmilesDrawer.RingConnection[]} ringConnections An array of ring connections containing ring connections associated with the current molecule.
     * @param {Number} ringId A ring id.
     * @returns {Number[]} An array of ring ids of neighbouring rings.
     */
    static getNeighbours(ringConnections, ringId) {
        let neighbours = [];

        for (let i = 0; i < ringConnections.length; i++) {
            let ringConnection = ringConnections[i];
            
            if (ringConnection.firstRingId === ringId) {
                neighbours.push(ringConnection.secondRingId);
            } else if (ringConnection.secondRingId === ringId) {
                neighbours.push(ringConnection.firstRingId);
            }
        }

        return neighbours;
    }

    /**
     * Returns an array of vertex ids associated with a given ring connection.
     *
     * @static
     * @param {SmilesDrawer.RingConnection[]} ringConnections An array of ring connections containing ring connections associated with the current molecule.
     * @param {Number} firstRingId A ring id.
     * @param {Number} secondRingId A ring id.
     * @returns {Number[]} An array of vertex ids associated with the ring connection.
     */
    static getVertices(ringConnections, firstRingId, secondRingId) {
        for (let i = 0; i < ringConnections.length; i++) {
            let ringConnection = ringConnections[i];
            if (ringConnection.firstRingId === firstRingId && ringConnection.secondRingId === secondRingId ||
                ringConnection.firstRingId === secondRingId && ringConnection.secondRingId === firstRingId) {
                return [...ringConnection.vertices];
            }
        }
    }
}
