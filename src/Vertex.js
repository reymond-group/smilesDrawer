/** A class representing a vertex */
SmilesDrawer.Vertex = class Vertex {
    /**
     * The constructor for the class Vertex.
     *
     * @param {*} value The value associated with this vertex.
     * @param {number} [x=0] The initial x coordinate of the positional vector of this vertex.
     * @param {number} [y=0] The initial y coordinate of the positional vector of this vertex.
     */
    constructor(value, x = 0, y = 0) {
        this.id = null;
        this.value = value;
        this.position = new SmilesDrawer.Vector2(x ? x : 0, y ? y : 0);
        this.previousPosition = new SmilesDrawer.Vector2(0, 0);
        this.parentVertexId = null;
        this.children = [];
        this.spanningTreeChildren = [];
        this.edges = [];
        this.positioned = false;
        this.angle = 0.0;
        this.globalAngle = 0.0;
        this.dir = 1.0;
        this.backAngle = 0.0;
        this.flippable = false; // can be flipped into a ring
        this.flipCenter = null;
        this.flipNeighbour = null;
        this.flipRings = new Array();
        this.neighbourCount = 0;
        this.neighbours = [];
        this.neighbouringElements = [];
    }

    /**
     * Set the 2D coordinates of the vertex.
     * 
     * @param {number} x The x component of the coordinates.
     * @param {number} y The y component of the coordinates.
     * 
     */
    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    /**
     * Set the 2D coordinates of the vertex from a Vector2.
     * 
     * @param {Vector2} v A 2D vector.
     * 
     */
    setPositionFromVector(v) {
        this.position.x = v.x;
        this.position.y = v.y;
    }

    /**
     * Add a child vertex id to this vertex.
     * @param {number} vertexID The id of a vertex to be added as a child to this vertex.
     */
    addChild(vertexId) {
        this.neighbourCount++;
        this.children.push(vertexId);
        this.neighbours.push(vertexId);

        this.value.bondCount++;
    }

    /**
     * Set the vertex id of the parent.
     * 
     * @param {number} parentVertexId The parents vertex id.
     */
    setParentVertexId(parentVertexId) {
        this.neighbourCount++;
        this.parentVertexId = parentVertexId;
        this.neighbours.push(parentVertexId);

        this.value.bondCount++;
    }

    /**
     * Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.
     *
     * @returns {boolean} A boolean indicating whether or not this vertex is terminal.
     */
    isTerminal() {
        if (this.value.hasAttachedPseudoElements) {
            return true;
        }

        return (this.parentVertexId === null && this.children.length < 2) || this.children.length === 0;
    }

    /**
     * Clones this vertex and returns the clone.
     *
     * @returns {Vertex} A clone of this vertex.
     */
    clone() {
        let clone = new Vertex(this.value, this.position.x, this.position.y);
        clone.id = this.id;
        clone.previousPosition = new SmilesDrawer.Vector2(this.previousPosition.x, this.previousPosition.y);
        clone.parentVertexId = this.parentVertexId;
        clone.children = SmilesDrawer.ArrayHelper.clone(this.children);
        clone.spanningTreeChildren = SmilesDrawer.ArrayHelper.clone(this.spanningTreeChildren);
        clone.edges = SmilesDrawer.ArrayHelper.clone(this.edges);
        clone.positioned = this.positioned;
        clone.angle = this.angle;
        clone.backAngle = this.backAngle;
        clone.flippable = this.flippable;
        clone.flipCenter = this.flipCenter;
        clone.flipRings = SmilesDrawer.ArrayHelper.clone(this.flipRings);
        return clone;
    }

    /**
     * Returns true if this vertex and the supplied vertex both have the same id, else returns false.
     *
     * @param {Vertex} vertex The vertex to check.
     * @returns {boolean} A boolean indicating whether or not the two vertices have the same id.
     */
    equals(vertex) {
        return this.id === vertex.id;
    }
    
    /**
     * Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.
     *
     * @param {Vertex} [referenceVector=null] - The refernece vector.
     * @param {boolean} [returnAsDegrees=false] - If true, returns angle in degrees, else in radians.
     * @returns {number} The angle of this vertex.
     */
    getAngle(referenceVector = null, returnAsDegrees = false) {
        let u = null;
        
        if (!referenceVector) {
            u = SmilesDrawer.Vector2.subtract(this.position, this.previousPosition);
        } else {
            u = SmilesDrawer.Vector2.subtract(this.position, referenceVector);
        }

        if (returnAsDegrees) {
            return SmilesDrawer.MathHelper.toDeg(u.angle());
        }

        return u.angle();
    }

    /**
     * Returns the suggested text direction when text is added at the position of this vertex.
     *
     * @param {array} vertices The array of vertices for the current molecule.
     * @returns {string} The suggested direction of the text.
     */
    getTextDirection(vertices) {
        let neighbours = this.getDrawnNeighbours(vertices);
        let angles = [];
        
        for (let i = 0; i < neighbours.length; i++) {
            angles.push(this.getAngle(vertices[neighbours[i]].position));
        }

        let textAngle = SmilesDrawer.MathHelper.meanAngle(angles);

        // Round to 0, 90, 180 or 270 degree
        let halfPi = Math.PI / 2.0;
        textAngle = Math.round(Math.round(textAngle / halfPi) * halfPi, 3);

        if (textAngle === 2) {
            return 'down';
        } else if (textAngle === -2) {
            return 'up';
        } else if (textAngle === 0 || textAngle === -0) {
            return 'right'; // is checking for -0 necessary?
        } else if (textAngle === 3 || textAngle === -3) {
            return 'left';
        } else {
            return 'down'; // default to down
        }
    }

    /**
     * Returns an array of ids of neighbouring vertices.
     *
     * @param {number} [vertexId=null] If a value is supplied, the vertex with this id is excluded from the returned indices.
     * @returns {array} An array containing the ids of neighbouring vertices.
     */
    getNeighbours(vertexId = null) {
        if (vertexId === null) {
            return this.neighbours;
        }

        let arr = [];

        for (let i = 0; i < this.neighbours.length; i++) {
            if (this.neighbours[i] !== vertexId) {
                arr.push(this.neighbours[i]);
            }
        }

        return arr;
    }

    /**
     * Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).
     * 
     * @param {array} vertices An array containing the vertices associated with the current molecule.
     * @returns {array} An array containing the ids of neighbouring vertices that will be drawn.
     */
    getDrawnNeighbours(vertices) {
        let arr = [];

        for (let i = 0; i < this.neighbours.length; i++) {
            if (vertices[this.neighbours[i]].value.isDrawn) {
                arr.push(this.neighbours[i]);
            }
        }

        return arr;
    }

    /**
     * Returns the number of neighbours of this vertex.
     *
     * @returns {number} The number of neighbours.
     */
    getNeighbourCount() {
        return this.neighbourCount;
    }

    /**
     * Gets the common neighbours of this and another vertex.
     *
     * @param {Vertex} vertex The vertex to check for common neighbours.
     * @returns {array} An array containing common neighbours.
     */
    getCommonNeighbours(vertex) {
        // There can only be one common neighbour of a Vertex
        // outside of a ring
        let commonNeighbours = new Array();
        let neighboursA = this.getNeighbours();
        let neighboursB = vertex.getNeighbours();

        for (let i = 0; i < neighboursA.length; i++) {
            for (let j = 0; j < neighboursB.length; j++) {
                if (neighboursA[i] === neighboursB[j]) {
                    commonNeighbours.push(neighboursA[i]);
                }
            }
        }

        return commonNeighbours;
    }

    /**
     * Checks whether or not a vertex is a neighbour of this vertex.
     *
     * @param {number} vertexId The id of the vertex to check if it is a neighbour of this vertex.
     * @returns {boolean} A boolean indicating whether or not the two vertices are neighbours.
     */
    isNeighbour(vertexId) {
        if (this.parentVertexId === vertexId) {
            return true;
        }

        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i] === vertexId) {
                return true;
            }
        }
    }
    
    /**
     * Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.
     *
     * @param {number} [vertexId=null] If supplied, the vertex with this id is excluded from the array returned.
     * @returns {array} An array containing the ids of the neighbouring vertices.
     */
    getSpanningTreeNeighbours(vertexId = null) {
        let neighbours = [];

        for (let i = 0; i < this.spanningTreeChildren.length; i++) {
            if (vertexId === undefined || vertexId != this.spanningTreeChildren[i]) {
                neighbours.push(this.spanningTreeChildren[i]);
            }
        }

        if (this.parentVertexId != null) {
            if (vertexId === undefined || vertexId != this.parentVertexId) {
                neighbours.push(this.parentVertexId);
            }
        }

        return neighbours;
    }

    /**
     * Gets the next vertex in the ring in opposide direction to the supplied vertex id.
     *
     * @param {array} vertices The array of vertices for the current molecule.
     * @param {number} ringId The id of the ring containing this vertex.
     * @param {number} previousVertexId The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex.
     * @returns {number} The id of the next vertex in the ring.
     */
    getNextInRing(vertices, ringId, previousVertexId) {
        let neighbours = this.getNeighbours();

        for (let i = 0; i < neighbours.length; i++) {
            if (SmilesDrawer.ArrayHelper.contains(vertices[neighbours[i]].value.rings, { value: ringId }) && 
                neighbours[i] != previousVertexId) {
                return neighbours[i];
            }
        }

        return null;
    }
}
