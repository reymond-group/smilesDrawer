/** A class representing a ring */
class Ring {
    /**
     * The constructor for the class Ring.
     *
     * @param {number} ringbond The id of the ring-bond shared by the source and target atom defined in the smiles string.
     * @param {number} sourceId The source vertex id.
     * @param {number} targetId The target vertex id.
     */
    constructor(ringbond, sourceId, targetId) {
        this.id = null;
        this.ringbond = ringbond;
        this.sourceId = sourceId;
        this.targetId = targetId;
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
        this.canFlip = true;
    }
    
    /**
     * Clones this ring and returns the clone.
     *
     * @returns {Ring} A clone of this ring.
     */
    clone() {
        let clone = new Ring(this.ringbond, this.sourceId, this.target);

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
     * Check whether this ring is aromatic but has no explicit double-bonds defined (e.g. c1ccccc1).
     *
     * @param {array} vertices An array of vertices associated with the current molecule.
     * @returns {boolean} A boolean indicating whether or not this ring is implicitly aromatic (using lowercase letters in smiles).
     */
    isAromatic(vertices) {
        for (let i = 0; i < this.members.length; i++) {
            let e = vertices[this.members[i]].value.element.charAt(0);

            if (e == e.toUpperCase()) {
                return false;
            }
        }

        return true;
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
     * Checks whether or not this ring has a source defined.
     *
     * @returns {boolean} A boolean indicating whether or not this ring has a source defined.
     */
    hasSource() {
        return !(this.sourceId === undefined || this.sourceId === null);
    }

    /**
     * Checks whether or not this ring has a target defined.
     *
     * @returns {boolean} A boolean indicating whether or not this ring has a target defined.
     */
    hasTarget() {
        return !(this.targetId === undefined || this.targetId === null);
    }

    /**
     * Checks whether or not this ring has a source and a target defined.
     *
     * @returns {boolean} A boolean indicating whether or not this ring has a source and a target defined.
     */
    hasSourceAndTarget() {
        return this.hasSource() && this.hasTarget();
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
