/** A class representing an edge */
class Edge {
    /**
     * The constructor for the class Edge.
     *
     * @param {number} sourceId A vertex id.
     * @param {number} targetId A vertex id.
     * @param {number} weight The weight of the edge.
     */
    constructor(sourceId, targetId, weight) {
        this.id = null;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.weight = weight;
        this.bondType = '-';
        this.isInAromaticRing = false;
        this.center = false;
    }

    /**
     * Returns the number of bonds associated with the bond type of this edge.
     *
     * @returns {number} The number of bonds associated with this edge.
     */
    getBondCount() {
        return Edge.bonds[this.bondType];
    }

    /**
     * An object mapping the bond type to the number of bonds.
     *
     * @returns {object} The object containing the map.
     */
    static get bonds() {
        return {
            '-': 1,
            '/': 1,
            '\\': 1,
            '=': 2,
            '#': 3,
            '$': 4
        }
    }
}

