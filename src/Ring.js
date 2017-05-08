/** A class representing a ring */
class Ring {
    /**
     * The constructor for the class Ring.
     *
     * @param {array} members An array containing the vertex ids of the members of the ring to be created.
     */
    constructor(members) {
        this.id = null;
        this.members = members.slice();
        this.edges = [];
        this.insiders = [];
        this.neighbours = [];
        this.positioned = false;
        this.center = new Vector2();
        this.rings = [];
        this.isBridged = false;
        this.template = null;
        this.isSpiro = false;
        this.isFused = false;
        this.centralAngle = 0.0;
        this.canFlip = true;
    }
    
    /**
     * Clones this ring and returns the clone.
     *
     * @returns {Ring} A clone of this ring.
     */
    clone() {
        let clone = new Ring(this.members);

        clone.id = this.id;
        clone.insiders = ArrayHelper.clone(this.insiders);
        clone.neighbours = ArrayHelper.clone(this.neighbours);
        clone.positioned = this.positioned;
        clone.center = this.center.clone();
        clone.rings = ArrayHelper.clone(this.rings);
        clone.isBridged = this.isBridged;
        clone.template = this.template;
        clone.isSpiro = this.isSpiro;
        clone.isFused = this.isFused;
        clone.centralAngle = this.centralAngle;
        clone.canFlip = this.canFlip;

        return clone;
    }

    /**
     * Returns a boolean indicating whether or not this ring is allowed to flip attached vertices (atoms) to the inside of the ring. Is only allowed for rings with more than 4 members. Can be disabling by setting the canFlip property of the ring to false.
     *
     * @returns {boolean} Returns a boolean indicating whether or not vertices (atoms) attached to this ring can be flipped to the inside of the ring.
     */
    allowsFlip() {
        return this.canFlip && this.members.length > 4;
    }

    /**
     * Sets the canFlip property of this ring to false if the ring has less than 8 members. If the ring has more than 8 members, the value of canFlip is not changed.
     *
     */
    setFlipped() {
        if (this.members.length < 8) {
            this.canFlip = false;
        }
    }

    /**
     * Returns the size (number of members) of this ring.
     *
     * @returns {number} The size (number of members) of this ring.
     */
    getSize() {
        return this.members.length;
    }

    /**
     * Gets the polygon representation (an array of the ring-members positional vectors) of this ring.
     *
     * @param {array} vertices An array of vertices representing the current molecule.
     * @returns {array} An array of the positional vectors of the ring members.
     */
    getPolygon(vertices) {
        let polygon = [];

        for (let i = 0; i < this.members.length; i++) {
            polygon.push(vertices[this.members[i]].position);
        }

        return polygon;
    }

    /**
     * Returns the angle of this ring in relation to the coordinate system.
     *
     * @returns {number} The angle in radians.
     */
    getAngle() {
        return Math.PI - this.centralAngle;
    }

    /**
     * Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.
     *
     * @param {array} vertices The vertices associated with the current molecule.
     * @param {function} callback A callback with the current vertex id as a parameter.
     * @param {number} startVertexId The vertex id of the start vertex.
     * @param {number} previousVertexId The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex).
     */
    eachMember(vertices, callback, startVertexId, previousVertexId) {
        startVertexId = startVertexId || startVertexId === 0 ? startVertexId : this.members[0];
        let current = startVertexId;
        let max = 0;

        while (current != null && max < 100) {
            let prev = current;
            
            callback(prev);
            current = vertices[current].getNextInRing(vertices, this.id, previousVertexId);
            previousVertexId = prev;
            
            // Stop while loop when arriving back at the start vertex
            if (current == startVertexId) {
                current = null;
            }
            
            // Currently, there can be rings where the start vertex is never
            // reached again (bridged rings)
            if (max == 99) {
                console.log('Smiles-drawer was not able to loop over the members of this ring.', this);
                throw 'Smiles-drawer was not able to loop over the members of this ring.'; 
            }

            max++;
        }
    }

    /**
     * Returns an array containing the neighbouring rings of this ring ordered by ring size.
     *
     * @param {array} ringConnections An array of ring connections associated with the current molecule.
     * @returns {array} An array of neighbouring rings sorted by ring size.
     */
    getOrderedNeighbours(ringConnections) {
        let orderedNeighbours = [];

        for (let i = 0; i < this.neighbours.length; i++) {
            let vertices = RingConnection.getVertices(ringConnections, this.id, this.neighbours[i]);
            
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

    /**
     * Check whether this ring is explicitly aromatic (e.g. c1ccccc1).
     *
     * @param {array} vertices An array of vertices associated with the current molecule.
     * @returns {boolean} A boolean indicating whether or not this ring is explicitly aromatic (using lowercase letters in smiles).
     */
    isAromatic(vertices) {
        for (let i = 0; i < this.members.length; i++) {
            let e = vertices[this.members[i]].value.element.charAt(0);

            if (e === e.toUpperCase()) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.
     *
     * @param {array} vertices An array of vertices associated with the current molecule.
     * @returns {boolean} A boolean indicating whether or not this ring is an implicitly defined benzene-like.
     */
    isBenzeneLike(vertices) {
        let db = this.getDoubleBondCount(vertices);
        let length = this.members.length;

        return db === 3 && length === 6 ||
               db === 2 && length === 5 ;
    }

    /**
     * Get the number of double bonds inside this ring.
     *
     * @param {array} vertices An array of vertices associated with the current molecule.
     * @returns {number} The number of double bonds inside this ring.
     */
    getDoubleBondCount(vertices) {
        let doubleBondCount = 0;

        for (let i = 0; i < this.members.length; i++) {
            let atom = vertices[this.members[i]].value;

            if (atom.bondType === '=' || atom.branchBond === '=') {
                doubleBondCount++;
            }
        }

        return doubleBondCount;
    }

    /**
     * Checks whether or not this ring contains a member with a given vertex id.
     *
     * @param {number} vertexId A vertex id.
     * @returns {boolean} A boolean indicating whether or not this ring contains a member with the given vertex id.
     */
    contains(vertexId) {
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i] == vertexId) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks whether or not this ring or one of its neighbouring rings contains a member with a given vertex id.
     *
     * @param {array} rings An array of rings associated with this molecule.
     * @param {number} vertexId A vertex id.
     * @returns {boolean} A boolean indicating whether or not this ring or one of its neighbouring rings contains a emember with the given vertex id.
     */
    thisOrNeighboursContain(rings, vertexId) {
        for (let i = 0; i < this.neighbours.length; i++) {
            if (Ring.getRing(rings, this.neighbours[i]).contains(vertexId)) {
                return true;
            }
        }

        if (this.contains(vertexId)) {
            return true;
        }

        return false;
    }

    /**
     * Returns a ring based on a provided ring id.
     *
     * @param {array} rings An array of rings associated with the current molecule.
     * @param {number} id A ring id.
     * @returns {Ring} A ring with a given id.
     */
    static getRing(rings, id) {
        for (let i = 0; i < rings.length; i++) {
            if (rings[i].id == id) {
                return rings[i];
            }
        }
    }
}
