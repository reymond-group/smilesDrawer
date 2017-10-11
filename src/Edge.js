/** 
 * A class representing an edge. 
 * 
 * @property {Number} id The id of this edge.
 * @property {Number} sourceId The id of the source vertex.
 * @property {Number} targetId The id of the target vertex.
 * @property {Number} weight The weight of this edge.
 * @property {String} [bondType='-'] The bond type of this edge.
 * @property {Boolean} [isPartOfAromaticRing=false] Whether or not this edge is part of an aromatic ring.
 * @property {Boolean} [center=false] Wheter or not the bond is centered. For example, this affects straight double bonds.
 * @property {String} [chiral=''] Chirality information.
 */
SmilesDrawer.Edge = class Edge {
    /**
     * The constructor for the class Edge.
     *
     * @param {Number} sourceId A vertex id.
     * @param {Number} targetId A vertex id.
     * @param {Number} [weight=1] The weight of the edge.
     */
    constructor(sourceId, targetId, weight = 1) {
        this.id = null;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.weight = weight;
        this.bondType = '-';
        this.isPartOfAromaticRing = false;
        this.center = false;
        this.chiral = '';
    }

    /**
     * Returns the number of bonds associated with the bond type of this edge.
     *
     * @returns {Number} The number of bonds associated with this edge.
     */
    getBondCount() {
        return Edge.bonds[this.bondType];
    }

    /**
     * An object mapping the bond type to the number of bonds.
     *
     * @returns {Object} The object containing the map.
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

