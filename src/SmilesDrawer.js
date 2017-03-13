/** The main class of the application representing the smiles drawer */
class SmilesDrawer {
    /**
     * The constructor for the class SmilesDrawer.
     *
     * @param {object} options An object containing custom values for different options. It is merged with the default options.
     */
    constructor(options) {
        this.ringIdCounter = 0;
        this.ringConnectionIdCounter = 0;
        this.canvasWrapper = null;
        this.direction = 1;
        this.totalOverlapScore = 0;

        this.maxBonds = {
            'c': 4,
            'C': 4,
            'n': 3,
            'N': 3,
            'o': 2,
            'O': 2
        };

        this.defaultOptions = {
            shortBondLength: 15, // 25,
            bondLength: 22, // 30,
            bondSpacing: 4,
            debug: false,
            drawingIterations: 10,
            themes: {
                dark: {
                    C: '#fff',
                    O: '#e74c3c',
                    N: '#3498db',
                    F: '#27ae60',
                    CL: '#16a085',
                    BR: '#d35400',
                    I: '#8e44ad',
                    P: '#d35400',
                    S: '#f1c40f',
                    B: '#e67e22',
                    SI: '#e67e22',
                    BACKGROUND: '#141414'
                },
                light: {
                    C: '#222',
                    O: '#e74c3c',
                    N: '#3498db',
                    F: '#27ae60',
                    CL: '#16a085',
                    BR: '#d35400',
                    I: '#8e44ad',
                    P: '#d35400',
                    S: '#f1c40f',
                    B: '#e67e22',
                    SI: '#e67e22',
                    BACKGROUND: '#fff'
                }
            }
        };

        this.opts = this.extend(true, this.defaultOptions, options);

        // Set the default theme.
        this.theme = this.opts.themes.dark;
    }

    /**
     * A helper method to extend the default options with user supplied ones.
     *
     */
    extend() {
        let that = this;
        let extended = {};
        let deep = false;
        let i = 0;
        let length = arguments.length;

        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        let merge = function (obj) {
            for (let prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = that.extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        for ( ; i < length; i++) {
            let obj = arguments[i];
            merge(obj);
        }

        return extended;
    };


    /**
     * Draws the parsed smiles data to a canvas element.
     *
     * @param {object} data The tree returned by the smiles parser.
     * @param {string} targetId The id of the HTML canvas element the structure is drawn to.
     * @param {string} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
     * @param {boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
     */
    draw(data, targetId, themeName = 'dark', infoOnly = false) {
        this.data = data;
        this.canvasWrapper = new CanvasWrapper(targetId, this.opts.themes[themeName]); 
        
        this.ringIdCounter = 0;
        this.ringConnectionIdCounter = 0;

        this.vertices = [];
        this.edges = [];
        this.rings = [];
        this.ringConnections = [];

        this.backupVertices = [];
        this.backupRings = [];

        this.initGraph(data);
        this.initRings();

        if (!infoOnly) {
            this.position();
            var overlapScore = this.getOverlapScore();
            var count = 0;
            var bridgedRingCount = this.getBridgedRings().length;        

            // Only redraw if there are no bridged rings ...
            if (bridgedRingCount === 0) {
                while ((overlapScore.total > (this.opts.bondLength / 10.0)) && count < this.opts.drawingIterations) {
                    if (this.direction === 1) {
                        this.direction = -1;
                    } else if (this.direction === -1) {
                        this.direction = 0;
                    }
                    
                    this.clearPositions();
                    this.position();

                    var newOverlapScore = this.getOverlapScore();

                    if (newOverlapScore.total < overlapScore.total) {
                        overlapScore = newOverlapScore;
                    } else {
                        this.restorePositions();
                    }

                    count++;
                }
            }

            this.resolveSecondaryOverlaps(overlapScore.scores);
            this.totalOverlapScore = this.getOverlapScore().total;
            
            // Set the canvas to the appropriate size
            this.canvasWrapper.scale(this.vertices);

            // Do the actual drawing
            this.drawEdges(this.opts.debug);
            this.drawVertices(this.opts.debug);

            this.canvasWrapper.reset();
        }
    }

    /**
     * Returns the number of rings this edge is a part of.
     *
     * @param {number} edgeId The id of an edge.
     * @returns {number} The number of rings the provided edge is part of.
     */
    edgeRingCount(edgeId) {
        let edge = this.edges[edgeId];
        let a = this.vertices[edge.sourceId];
        let b = this.vertices[edge.targetId];

        return Math.min(a.value.rings.length, b.value.rings.length);
    }

    /**
     * Returns an array containing the bridged rings associated with this  molecule.
     *
     * @returns {array} An array containing all bridged rings associated with this molecule.
     */
    getBridgedRings() {
        let bridgedRings = [];

        for (let i = 0; i < this.rings.length; i++) {
            if (this.rings[i].isBridged) {
                bridgedRings.push(this.rings[i]);
            }
        }

        return bridgedRings;
    }

    /**
     * Returns an array containing all fused rings associated with this molecule.
     *
     * @returns {array} An array containing all fused rings associated with this molecule.
     */
    getFusedRings() {
        let fusedRings = [];

        for (let i = 0; i < this.rings.length; i++) {
            if (this.rings[i].isFused) {
                fusedRings.push(this.rings[i]);
            }
        }

        return fusedRings;
    }

    /**
     * Returns an array containing all spiros associated with this molecule.
     *
     * @returns {array} An array containing all spiros associated with this molecule.
     */
    getSpiros() {
        let spiros = [];

        for (let i = 0; i < this.rings.length; i++) {
            if (this.rings[i].isSpiro) {
                spiros.push(this.rings[i]);
            }
        }
        
        return spiros;
    }

    /**
     * Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings); Insiders Count (the number of vertices contained within a bridged ring)
     *
     * @returns {string} A string as described in the method description.
     */
    printRingInfo() {
        let result = '';
        for (let i = 0; i < this.rings.length; i++) {
            let ring = this.rings[i];
            result += ring.id + ';';
            result += ring.members.length + ';';
            result += ring.neighbours.length + ';';
            result += ring.isSpiro ? 'true;' : 'false;'
            result += ring.isFused ? 'true;' : 'false;'
            result += ring.isBridged ? 'true;' : 'false;'
            result += ring.rings.length + ';';
            result += ring.insiders.length;
            result += '\n';
        }

        return result;
    }

    /**
     * Returns the total overlap score of the current molecule.
     *
     * @returns {number} The overlap score.
     */
    getTotalOverlapScore() {
        return this.totalOverlapScore;
    }

    /**
     * Returns the ring count of the current molecule.
     *
     * @returns {number} The ring count.
     */
    getRingCount() {
        return this.rings.length;
    }

    /**
     * Checks whether or not the current molecule contains a bridged ring.
     *
     * @returns {boolean} A boolean indicating whether or not the current molecule contains a bridged ring.
     */
    hasBridgedRing() {
        for (let i = 0; i < this.rings.length; i++) {
            if (this.rings[i].isBridged) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns the number of heavy atoms (non-hydrogen) in the current molecule.
     *
     * @returns {number} The heavy atom count.
     */
    getHeavyAtomCount() {
        let hac = 0;
        
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].value.element.toLowerCase() !== 'h') {
                hac++;
            }
        }

        return hac;
    }

    /**
     * Initializes the graph (vertices and edges) based on the tree supplied by the smiles parser.
     *
     * @param {object} node The current node in the parse tree.
     * @param {number} parentVertexId=null The id of the previous vertex.
     * @param {boolean} isBranch=false Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C).
     */
    initGraph(node, parentVertexId = null, isBranch = false) {
        // Create a new vertex object
        let atom = new Atom(node.atom.element ? node.atom.element : node.atom, node.bond);
        atom.branchBond = node.branchBond;
        atom.ringbonds = node.ringbonds;
        atom.bracket = node.atom.element ? node.atom : null;


        let vertex = new Vertex(atom);
        let parentVertex = this.vertices[parentVertexId];

        vertex.parentVertexId = parentVertexId;

        this.addVertex(vertex);

        // Add the id of this node to the parent as child
        if (parentVertexId != null) {
            this.vertices[parentVertexId].children.push(vertex.id);

            // In addition create a spanningTreeChildren property, which later will
            // not contain the children added through ringbonds
            this.vertices[parentVertexId].spanningTreeChildren.push(vertex.id);

            // Add edge between this node and its parent
            let edge = new Edge(parentVertexId, vertex.id, 1);
            
            if (isBranch) {
                edge.bondType = vertex.value.branchBond;
            } else {
                edge.bondType = this.vertices[parentVertexId].value.bondType;
            }

            let edgeId = this.addEdge(edge);
            vertex.edges.push(edgeId);
            parentVertex.edges.push(edgeId);
        }


        for (let i = 0; i < node.branchCount; i++) {
            this.initGraph(node.branches[i], vertex.id, true);
        }

        if (node.hasNext) {
            this.initGraph(node.next, vertex.id);
        }
    }

    /**
     * Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {string|null} Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.
     */
    getRingbondType(vertexA, vertexB) {
        // Checks whether the two vertices are the ones connecting the ring
        // and what the bond type should be.
        if (vertexA.value.getRingbondCount() < 1 || vertexB.value.getRingbondCount() < 1) {
            return null;
        }

        for (let i = 0; i < vertexA.value.ringbonds.length; i++) {
            for (let j = 0; j < vertexB.value.ringbonds.length; j++) {
                // if(i != j) continue;
                if (vertexA.value.ringbonds[i].id == vertexB.value.ringbonds[j].id) {
                    // If the bonds are equal, it doesn't matter which bond is returned.
                    // if they are not equal, return the one that is not the default ("-")
                    if (vertexA.value.ringbonds[i].bondType == '-') {
                        return vertexB.value.ringbonds[j].bond;
                    } else {
                        return vertexA.value.ringbonds[i].bond;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Initializes rings and ringbonds for the current molecule.
     *
     */
    initRings() {
        let that = this;
        let openBonds = {};
        let ringId = 0;

        for (let i = this.vertices.length - 1; i >= 0; i--) {
            let vertex = this.vertices[i];
            
            if (vertex.value.ringbonds.length === 0) {
                continue;
            }

            for (let r = 0; r < vertex.value.ringbonds.length; r++) {
                let ringbondId = vertex.value.ringbonds[r].id;
                
                if (openBonds[ringbondId] === undefined) {
                    openBonds[ringbondId] = vertex.id;
                } else {
                    let target = openBonds[ringbondId];
                    let source = vertex.id;
                    let edgeId = that.addEdge(new Edge(source, target, 1));
                    
                    that.vertices[source].children.push(target);
                    that.vertices[target].children.push(source);

                    that.vertices[source].edges.push(edgeId);
                    that.vertices[target].edges.push(edgeId);

                    let ring = new Ring(ringbondId, source, target);
                    that.addRing(ring);

                    // Annotate the ring (add ring members to ring and rings to vertices)
                    let path = that.getRingVertices(ring.sourceId, ring.targetId);

                    for (let j = 0; j < path.length; j++) {
                        ring.members.push(path[j]);
                        that.vertices[path[j]].value.rings.push(ring.id);
                    }

                    openBonds[ringbondId] = undefined;
                }
            }
        }

        // Find connection between rings
        // Check for common vertices and create ring connections. This is a bit
        // ugly, but the ringcount is always fairly low (< 100)
        for (let i = 0; i < this.rings.length - 1; i++) {
            for (let j = i + 1; j < this.rings.length; j++) {
                let a = this.rings[i];
                let b = this.rings[j];

                let ringConnection = new RingConnection(a, b);

                // If there are no vertices in the ring connection, then there
                // is no ring connection
                if (ringConnection.vertices.length > 0) {
                    this.addRingConnection(ringConnection);
                }
            }
        }

        // Add neighbours to the rings
        for (let i = 0; i < this.rings.length; i++) {
            let ring = this.rings[i];
            ring.neighbours = RingConnection.getNeighbours(this.ringConnections, ring.id);
        }

        // Replace rings contained by a larger bridged ring with a bridged ring
        while (this.rings.length > 0) {
            let id = -1;
            for (let i = 0; i < this.rings.length; i++) {
                let ring = this.rings[i];

                if (this.isPartOfBridgedRing(ring.id)) {
                    id = ring.id;
                }
            }
            
            if (id === -1) {
                break;
            }

            let ring = this.getRing(id);
            let involvedRings = this.getBridgedRingRings(ring.id);

            this.createBridgedRing(involvedRings, ring.sourceId);

            // Remove the rings
            for (let i = 0; i < involvedRings.length; i++) {
                this.removeRing(involvedRings[i]);
            }
        }
    }

    /**
     * Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.
     *
     * @param {number} ringId A ring id.
     * @returns {array} An array containing all ring ids of rings part of a bridged ring system.
     */
    getBridgedRingRings(ringId) {
        let involvedRings = new Array();
        let that = this;

        let recurse = function (r) {
            let ring = that.getRing(r);
            involvedRings.push(r);

            for (let i = 0; i < ring.neighbours.length; i++) {
                let n = ring.neighbours[i];
                
                if (involvedRings.indexOf(n) === -1 &&
                    n !== r &&
                    RingConnection.isBridge(that.ringConnections, that.vertices, r, n)) {
                    recurse(n);
                }
            }
        };

        recurse(ringId);

        return ArrayHelper.unique(involvedRings);
    }

    /**
     * Checks whether or not a ring is part of a bridged ring.
     *
     * @param {number} ringId A ring id.
     * @returns {boolean} A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.
     */
    isPartOfBridgedRing(ringId) {
        for (let i = 0; i < this.ringConnections.length; i++) {
            if (this.ringConnections[i].rings.contains(ringId) &&
                this.ringConnections[i].isBridge(this.vertices)) {
                
                return true;
            }
        }

        return false;
    }

    /**
     * Creates a bridged ring.
     *
     * @param {array} ringIds An array of ids of rings involved in the bridged ring.
     * @param {number} sourceVertexId The vertex id to start the bridged ring discovery from.
     * @returns {Ring} The bridged ring.
     */
    createBridgedRing(ringIds, sourceVertexId) {
        let bridgedRing = new Array();
        let vertices = new Array();
        let neighbours = new Array();
        let ringConnections = new Array();

        for (let i = 0; i < ringIds.length; i++) {
            let ring = this.getRing(ringIds[i]);
            
            for (let j = 0; j < ring.members.length; j++) {
                vertices.push(ring.members[j]);
            }

            for (let j = 0; j < ring.neighbours.length; j++) {
                neighbours.push(ring.neighbours[j]);
            }
        }

        // Remove duplicates
        vertices = ArrayHelper.unique(vertices);

        // A vertex is part of the bridged ring if it only belongs to
        // one of the rings (or to another ring
        // which is not part of the bridged ring).
        let leftovers = new Array();
        
        for (let i = 0; i < vertices.length; i++) {
            let vertex = this.vertices[vertices[i]];
            let intersection = ArrayHelper.intersection(ringIds, vertex.value.rings);
            
            if (vertex.value.rings.length == 1 || intersection.length == 1) {
                bridgedRing.push(vertex.id);
            } else {
                leftovers.push(vertex.id);
            }
        }

        // Vertices can also be part of multiple rings and lay on the bridged ring,
        // however, they have to have at least two neighbours that are not part of
        // two rings
        let tmp = new Array();
        let insideRing = new Array();

        for (let i = 0; i < leftovers.length; i++) {
            let vertex = this.vertices[leftovers[i]];
            let onRing = false;

            /*
            if (ArrayHelper.intersection(vertex.getNeighbours(), bridgedRing).length > 1) {
                vertex.value.isBridgeNode = true;
                tmp.push(vertex.id);
            } else {
                vertex.value.isBridge = true;
                insideRing.push(vertex.id);
            }
            */

            for(let j = 0; j < vertex.edges.length; j++) {
                if(this.edgeRingCount(vertex.edges[j]) == 1) {
                    onRing = true;
                }
            }

            if(onRing) {
                vertex.value.isBridgeNode = true;
                tmp.push(vertex.id);
            } else {
                vertex.value.isBridge = true;
                insideRing.push(vertex.id);
            }
        }

        // Merge the two arrays containing members of the bridged ring
        let ringMembers = ArrayHelper.merge(bridgedRing, tmp)

        // The neighbours of the rings in the bridged ring that are not connected by a
        // bridge are now the neighbours of the bridged ring
        neighbours = ArrayHelper.unique(neighbours);
        neighbours = ArrayHelper.removeAll(neighbours, ringIds);

        // The source vertex is the start vertex. The target vertex has to be a member
        // of the birdged ring and a neighbour of the start vertex
        let source = this.vertices[sourceVertexId];
        let sourceNeighbours = source.getNeighbours();
        let target = null;

        for (let i = 0; i < sourceNeighbours.length; i++) {
            let n = sourceNeighbours[i];
            
            if (ringMembers.indexOf(n) !== -1) {
                target = n;
            }
        }
        
        // Create the ring
        let ring = new Ring(-1, sourceVertexId, target);
        
        ring.isBridged = true;
        ring.members = ringMembers;
        ring.neighbours = neighbours;
        ring.insiders = insideRing;
        
        for(let i = 0; i < ringIds.length; i++) {
            ring.rings.push(this.getRing(ringIds[i]).clone());
        }

        this.addRing(ring);

        // Atoms inside the ring are no longer part of a ring but are now
        // associated with the bridged ring
        for (let i = 0; i < insideRing.length; i++) {
            let vertex = this.vertices[insideRing[i]];
            
            vertex.value.rings = new Array();
            vertex.value.bridgedRing = ring.id;
        }

        // Remove former rings from members of the bridged ring and add the bridged ring
        for (let i = 0; i < ringMembers.length; i++) {
            let vertex = this.vertices[ringMembers[i]];
            
            vertex.value.rings = ArrayHelper.removeAll(vertex.value.rings, ringIds);
            vertex.value.rings.push(ring.id);
        }

        // Remove all the ring connections no longer used
        for (let i = 0; i < ringIds.length; i++) {
            for (let j = i + 1; j < ringIds.length; j++) {
                this.removeRingConnectionsBetween(ringIds[i], ringIds[j]);
            }
        }

        // Update the ring connections
        for (let i = 0; i < neighbours.length; i++) {
            let connections = this.getRingConnections(neighbours[i], ringIds);
            
            for (let j = 0; j < connections.length; j++) {
                this.getRingConnection(connections[j]).updateOther(ring.id, neighbours[i]);
            }
        }
        
        return ring;
    }

    /**
     * Returns an array of vertices that are members of the ring specified by the source and target vertex ids. It is assumed that those two vertices share the ringbond (the break introduced when creating the smiles MST).
     *
     * @param {number} sourceId A vertex id.
     * @param {number} targetId A vertex id.
     * @returns {array} An array of vertex ids.
     */
    getRingVertices(sourceId, targetId) {
        let prev = this.dijkstra(sourceId, targetId);

        // Backtrack from target to source
        let tmp = [];
        let path = [];
        let u = targetId;

        while (u != null) {
            tmp.push(u);
            u = prev[u];
        }

        // Reverse the backtrack path to get forward path
        for (let i = tmp.length - 1; i >= 0; i--) {
            path.push(tmp[i]);
        }

        return path;
    }

    /**
     * Dijkstras algorithm for finding the shortest path between two vertices.
     *
     * @param {number} sourceId The id of the source vertex.
     * @param {number} targetId The id of the target vertex.
     * @returns {array} The path (vertex ids) from the source to the target vertex.
     */
    dijkstra(sourceId, targetId) {
        // First initialize q which contains all the vertices
        // including their neighbours, their id and a visited boolean
        let prev = new Array(this.vertices.length);
        let dist = new Array(this.vertices.length);
        let visited = new Array(this.vertices.length);
        let neighbours = new Array(this.vertices.length);

        // Initialize arrays for the algorithm
        for (let i = 0; i < this.vertices.length; i++) {
            dist[i] = i == sourceId ? 0 : Number.MAX_VALUE;
            prev[i] = null;
            visited[i] = false;
            neighbours[i] = this.vertices[i].getNeighbours();
        }

        // Dijkstras alogrithm
        while (ArrayHelper.count(visited, false) > 0) {
            let u = this.getMinDist(dist, visited);

            // if u is the target, we're done
            if (u == targetId) {
                return prev;
            }

            visited[u] = true; // this "removes" the node from q

            for (let i = 0; i < neighbours[u].length; i++) {
                let v = neighbours[u][i];
                let tmp = dist[u] + this.getEdgeWeight(u, v);

                // Do not move directly from the source to the target
                // this should never happen, so just continue
                if (u == sourceId && v == targetId || u == targetId && v == sourceId) {
                    continue;
                }

                if (tmp < dist[v]) {
                    dist[v] = tmp;
                    prev[v] = u;
                }
            }
        }
    }

    /**
     * Gets the minimal distance from an array containing distances.
     *
     * @param {array} dist An array of distances.
     * @param {array} visited An array indicated whether or not a vertex has been visited.
     * @returns {number} The id with the minimal distance.
     */
    getMinDist(dist, visited) {
        let min = Number.MAX_VALUE;
        let v = null;

        for (let i = 0; i < dist.length; i++) {
            if (visited[i]) {
                continue;
            }
            else if (dist[i] < min) {
                v = i;
                min = dist[v];
            }
        }

        return v;
    }



    /**
     * Checks whether or not tow vertices are in the same ring.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {boolean} A boolean indicating whether or not the two vertices are in the same ring.
     */
    areVerticesInSameRing(vertexA, vertexB) {
        // This is a little bit lighter (without the array and push) than
        // getCommonRings().length > 0
        for (let i = 0; i < vertexA.value.rings.length; i++) {
            for (let j = 0; j < vertexB.value.rings.length; j++) {
                if (vertexA.value.rings[i] == vertexB.value.rings[j]) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Returns an array of ring ids shared by both vertices.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {array} An array of ids of rings shared by the two vertices.
     */
    getCommonRings(vertexA, vertexB) {
        let commonRings = [];

        for (let i = 0; i < vertexA.value.rings.length; i++) {
            for (let j = 0; j < vertexB.value.rings.length; j++) {
                if (vertexA.value.rings[i] == vertexB.value.rings[j]) {
                    commonRings.push(vertexA.value.rings[i]);
                }
            }
        }

        return commonRings;
    }

    /**
     * Returns the smallest ring shared by the two vertices.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {Ring|null} If a smallest common ring exists, that ring, else null.
     */
    getSmallestCommonRing(vertexA, vertexB) {
        let commonRings = this.getCommonRings(vertexA, vertexB);
        let minSize = Number.MAX_VALUE;
        let smallestCommonRing = null;

        for (let i = 0; i < commonRings.length; i++) {
            let size = this.getRing(commonRings[i]).getSize();
            
            if (size < minSize) {
                minSize = size;
                smallestCommonRing = this.getRing(commonRings[i]);
            }
        }

        return smallestCommonRing;
    }

    /**
     * Returns the largest ring shared by the two vertices.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {Ring|null} If a largest common ring exists, that ring, else null.
     */
    getLargestCommonRing(vertexA, vertexB) {
        let commonRings = this.getCommonRings(vertexA, vertexB);
        let maxSize = 0;
        let largestCommonRing = null;

        for (let i = 0; i < commonRings.length; i++) {
            let size = this.getRing(commonRings[i]).getSize();
            
            if (size > maxSize) {
                maxSize = size;
                largestCommonRing = this.getRing(commonRings[i]);
            }
        }

        return largestCommonRing;
    }

     /**
     * Returns an array of vertices positioned at a specified location.
     *
     * @param {Vector2} position The position to search for vertices.
     * @param {number} radius The radius within to search.
     * @param {number} excludeVertexId A vertex id to be excluded from the search results.
     * @returns {array} An array containing vertex ids in a given location.
     */
    getVerticesAt(position, radius, excludeVertexId) {
        let locals = new Array();

        for (let i = 0; i < this.vertices.length; i++) {
            let vertex = this.vertices[i];
            
            if (vertex.id === excludeVertexId || !vertex.positioned) {
                continue;
            }

            let distance = position.distance(vertex.position);
           
            if (distance <= radius) {
                locals.push(vertex.id);
            }
        }

        return locals;
    }

    /**
     * Returns the rings and vertices contained in a sub-graph.
     *
     * @param {number} vertexId The vertex id to start the sub-graph search from
     * @param {number} previousId The vertex id in the opposite of which the search will be started.
     * @returns {object} An object containing two arrays, one with the vertices in the subgraph and one with the rings in the subgraph.
     */
    getBranch(vertexId, previousId) {
        let vertices = new Array();
        let rings = new Array();
        let that = this;
        
        let recurse = function (v, p) {
            let vertex = that.vertices[v];
            
            for (let i = 0; i < vertex.value.rings.length; i++) {
                rings.push(vertex.value.rings[i]);
            }

            for (let i = 0; i < vertex.children.length; i++) {
                let child = vertex.children[i];
                
                if (child !== p && !ArrayHelper.contains(vertices, { value: child })) {
                    vertices.push(child);
                    recurse(child, v);
                }
            }

            let parentVertexId = vertex.parentVertexId;
            
            if (parentVertexId !== p && parentVertexId !== null && 
                !ArrayHelper.contains(vertices, { value: parentVertexId })) {
                vertices.push(parentVertexId);
                recurse(parentVertexId, v);
            }
        }

        vertices.push(vertexId);
        recurse(vertexId, previousId);

        return {
            vertices: vertices,
            rings: ArrayHelper.unique(rings)
        };
    }

    /**
     * Add a vertex to this representation of a molcule.
     *
     * @param {Vertex} vertex A new vertex.
     * @returns {number} The vertex id of the new vertex.
     */
    addVertex(vertex) {
        vertex.id = this.vertices.length;
        this.vertices.push(vertex);
        
        return vertex.id;
    }

    /**
     * Add an edge to this representation of a molecule.
     *
     * @param {Edge} edge A new edge.
     * @returns {number} The edge id of the new edge.
     */
    addEdge(edge) {
        edge.id = this.edges.length;
        this.edges.push(edge);
        
        return edge.id;
    }

    /**
     * Add a ring to this representation of a molecule.
     *
     * @param {Ring} ring A new ring.
     * @returns {number} The ring id of the new ring.
     */
    addRing(ring) {
        ring.id = this.ringIdCounter++;
        this.rings.push(ring);
        
        return ring.id;
    }

    /**
     * Removes a ring from the array of rings associated with the current molecule.
     *
     * @param {number} ringId A ring id.
     */
    removeRing(ringId) {
        this.rings = this.rings.filter(function (item) {
            return item.id !== ringId;
        });

        // Also remove ring connections involving this ring
        this.ringConnections = this.ringConnections.filter(function (item) {
            return item.rings.first !== ringId && item.rings.second !== ringId;
        });

        // Remove the ring as neighbour of other rings
        for (let i = 0; i < this.rings.length; i++) {
            let r = this.rings[i];
            r.neighbours = r.neighbours.filter(function (item) {
                return item !== ringId;
            });
        }
    }
    
    /**
     * Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.
     *
     * @param {number} ringId A ring id.
     * @returns {Ring} A ring associated with the current molecule.
     */
    getRing(ringId) {
        for (let i = 0; i < this.rings.length; i++) {
            if (this.rings[i].id == ringId) {
                return this.rings[i];
            }
        }
    }
    
    /**
     * Add a ring connection to this representation of a molecule.
     *
     * @param {RingConnection} ringConnection A new ringConnection.
     * @returns {number} The ring connection id of the new ring connection.
     */
    addRingConnection(ringConnection) {
        ringConnection.id = this.ringConnectionIdCounter++;
        this.ringConnections.push(ringConnection);
        
        return ringConnection.id;
    }
    
    /**
     * Removes a ring connection from the array of rings connections associated with the current molecule.
     *
     * @param {number} ringConnectionId A ring connection id.
     */
    removeRingConnection(ringConnectionId) {
        this.ringConnections = this.ringConnections.filter(function (item) {
            return item.id !== ringConnectionId;
        });
    }

    /**
     * Removes all ring connections between two vertices.
     *
     * @param {number} vertexIdA A vertex id.
     * @param {number} vertexIdB A vertex id.
     */
    removeRingConnectionsBetween(vertexIdA, vertexIdB) {
        let toRemove = new Array();
        for (let i = 0; i < this.ringConnections.length; i++) {
            let ringConnection = this.ringConnections[i];

            if (ringConnection.rings.first === vertexIdA && ringConnection.rings.second === vertexIdB ||
                ringConnection.rings.first === vertexIdB && ringConnection.rings.second === vertexIdA) {
                toRemove.push(ringConnection.id);
            }
        }

        for (let i = 0; i < toRemove.length; i++) {
            this.removeRingConnection(toRemove[i]);
        }
    }


    getRingConnection(id) {
        for (let i = 0; i < this.ringConnections.length; i++) {
            if (this.ringConnections[i].id == id) {
                return this.ringConnections[i];
            }
        }
    }

    /**
     * Get the ring connections associated with a ring, the ring connections between two rings or the ring connections between one ring and multiple other rings.
     *
     * @param {number} ringId A ring id.
     * @param {number|array|null} ringIds=null A ring id, an array of ring ids or null.
     * @returns {array} An array of ring connection ids.
     */
    getRingConnections(ringId, ringIds = null) {
        let ringConnections = new Array();
        
        if (ringIds === null) {
            for (let i = 0; i < this.ringConnections.length; i++) {
                let ringConnection = this.ringConnections[i];
                
                if (ringConnection.rings.first === ringId || ringConnection.rings.second === ringId) {
                    ringConnections.push(ringConnection.id);
                }
            }
        } else if (ringIds.constructor !== Array) {
            for (let i = 0; i < this.ringConnections.length; i++) {
                let ringConnection = this.ringConnections[i];
                
                if (ringConnection.rings.first === ringId && ringConnection.rings.second === ringIds ||
                    ringConnection.rings.first === ringIds && ringConnection.rings.second === ringId) {
                    ringConnections.push(ringConnection.id);
                }
            }
        } else {
            for (let i = 0; i < this.ringConnections.length; i++) {
                for (let j = 0; j < ringIds.length; j++) {
                    let id = ringIds[j];
                    let ringConnection = this.ringConnections[i];
                    
                    if (ringConnection.rings.first === ringId && ringConnection.rings.second === id ||
                        ringConnection.rings.first === id && ringConnection.rings.second === ringId) {
                        ringConnections.push(ringConnection.id);
                    }
                }
            }
        }

        return ringConnections;
    }

    /**
     * Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.
     *
     * @returns {object} Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }
     */
    getOverlapScore() {
        let total = 0.0;
        let overlapScores = new Float32Array(this.vertices.length);
        
        for (let i = 0; i < this.vertices.length; i++) {
            overlapScores[i] = 0;
        }

        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = i + 1; j < this.vertices.length; j++) {
                let a = this.vertices[i];
                let b = this.vertices[j];

                let dist = Vector2.subtract(a.position, b.position).length();
                
                if (dist < this.opts.bondLength) {
                    let weighted = this.opts.bondLength - dist;
                    total += weighted;
                    overlapScores[i] += weighted;
                    overlapScores[j] += weighted;
                }
            }
        }

        let sortable = [];

        for (let i = 0; i < this.vertices.length; i++) {
            sortable.push({
                id: i,
                score: overlapScores[i]
            });
        }

        sortable.sort(function (a, b) {
            return b.score - a.score;
        });

        return {
            total: total,
            scores: sortable
        };
    }
    
    /**
     * When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @param {array} sides An array containing the two normals of the line spanned by the two provided vertices.
     * @returns {object} Returns an object containing the following information: {
            totalSideCount: Counts the sides of each vertex in the molecule, is an array [ a, b ],
            totalPosition: Same as position, but based on entire molecule,
            sideCount: Counts the sides of each neighbour, is an array [ a, b ],
            position: which side to position the second bond, is 0 or 1, represents the index in the normal array. This is based on only the neighbours
            anCount: the number of neighbours of vertexA,
            bnCount: the number of neighbours of vertexB
        }
     */
    chooseSide(vertexA, vertexB, sides) {
        // Check which side has more vertices
        // Get all the vertices connected to the both ends
        let an = vertexA.getNeighbours(vertexB.id);
        let bn = vertexB.getNeighbours(vertexA.id);
        let anCount = an.length;
        let bnCount = bn.length;

        // All vertices connected to the edge vertexA to vertexB
        let tn = ArrayHelper.merge(an, bn);

        // Only considering the connected vertices
        let sideCount = [0, 0];

        for (let i = 0; i < tn.length; i++) {
            let v = this.vertices[tn[i]].position;
            
            if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
                sideCount[0]++;
            } else {
                sideCount[1]++;
            }
        }

        // Considering all vertices in the graph, this is to resolve ties
        // from the above side counts
        let totalSideCount = [0, 0];

        for (let i = 0; i < this.vertices.length; i++) {
            let v = this.vertices[i].position;
            
            if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
                totalSideCount[0]++;
            } else {
                totalSideCount[1]++;
            }
        }

        return {
            totalSideCount: totalSideCount,
            totalPosition: totalSideCount[0] > totalSideCount[1] ? 0 : 1,
            sideCount: sideCount,
            position: sideCount[0] > sideCount[1] ? 0 : 1,
            anCount: anCount,
            bnCount: bnCount
        };
    }
    
    /**
     * Checks whether or not two vertices are connected.
     *
     * @param {number} vertexIdA A vertex id.
     * @param {number} vertexIdA A vertex id.
     * @returns {boolean} A boolean indicating whether or not two vertices are connected.
     */
    areConnected(vertexIdA, vertexIdB) {
        for(let i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];
            
            if(edge.sourceId === vertexIdA && edge.targetId === vertexIdB || 
               edge.sourceId === vertexIdB && edge.targetId === vertexIdA) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Returns the weight of the edge between two given vertices.
     *
     * @param {number} vertexIdA A vertex id.
     * @param {number} vertexIdB A vertex id.
     * @returns {number|null} The weight of the edge or, if no edge can be found, null.
     */
    getEdgeWeight(vertexIdA, vertexIdB) {
        for (let i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];
            
            if (edge.sourceId == vertexIdA && edge.targetId == vertexIdB || 
                edge.targetId == vertexIdA && edge.sourceId == vertexIdB) {
                return edge.weight;
            }
        }
        
        return null;
    }
    
    /**
     * Returns the edge between two given vertices.
     *
     * @param {number} vertexIdA A vertex id.
     * @param {number} vertexIdB A vertex id.
     * @returns {number|null} The edge or, if no edge can be found, null.
     */
    getEdge(vertexIdA, vertexIdB) {
        for (let i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];
            
            if (edge.sourceId == vertexIdA && edge.targetId == vertexIdB || 
                edge.targetId == vertexIdA && edge.sourceId == vertexIdB) {
                return edge;
            }
        }
        
        return null;
    }

    /**
     * Applies a force-based layout to a set of provided vertices.
     *
     * @param {array} vertices An array containing vertices to be placed using the force based layout.
     * @param {Vector2} center The center of the layout.
     * @param {number} startVertexId A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex.
     * @param {Ring} ring The bridged ring associated with this force-based layout.
     */
    forceLayout(vertices, center, startVertexId, ring) {
        console.log(ring);
        
        // Constants
        let l = this.opts.bondLength;
        let kr = 6000; // repulsive force
        let ks = 5; // spring
        let g = 0.5; // gravity (to center)

        if(ring.rings.length > 2) {
            kr = 750;
            ks = 1.5;
            g = 0;
        }

        // On bridged bonds, add the remaining neighbours to the vertices
        // to be positioned using the force layout
        let tmp = [];

        for (let u = 0; u < vertices.length; u++) {
            let vertex = this.vertices[vertices[u]];
            
            if(!vertex.value.isBridge) {
                continue;
            }
            
            let neighbours = vertex.getNeighbours();
            
            for (let i = 0; i < neighbours.length; i++) {
                let neighbourId = neighbours[i];
                
                if (!ArrayHelper.contains(vertices, { value: neighbourId })) {
                    tmp.push(neighbourId);
                }
            }
        }

        vertices = ArrayHelper.merge(vertices, tmp);

        // this.vertices[startVertexId].positioned = false;

        // Place vertices randomly around center
        for (let i = 0; i < vertices.length; i++) {
            let vertex = this.vertices[vertices[i]];
            
            if (!vertex.positioned) {
                vertex.position.x = center.x + Math.random();
                vertex.position.y = center.y + Math.random();
            }

            //if(ring.rings.length > 2 && ring.members.length > 6 && vertex.id !== startVertexId)
            //  vertex.positioned = false;
        }

        let forces = {};
        
        for (let i = 0; i < vertices.length; i++) {
            forces[vertices[i]] = new Vector2();
        }

        for (let n = 0; n < 5000; n++) {
            
            for (let i = 0; i < vertices.length; i++) {
                forces[vertices[i]].set(0, 0);
            }

            // Repulsive forces
            for (let u = 0; u < vertices.length - 1; u++) {
                let vertexA = this.vertices[vertices[u]];
                
                for (let v = u + 1; v < vertices.length; v++) {
                    let vertexB = this.vertices[vertices[v]];

                    let dx = vertexB.position.x - vertexA.position.x;
                    let dy = vertexB.position.y - vertexA.position.y;

                    if (dx === 0 || dy === 0) {
                        continue;
                    }

                    let dSq = dx * dx + dy * dy;
                    let d = Math.sqrt(dSq);

                    let force = kr / dSq;
                    let fx = force * dx / d;
                    let fy = force * dy / d;

                    if (!vertexA.positioned) {
                        forces[vertexA.id].x -= fx;
                        forces[vertexA.id].y -= fy;
                    }

                    if (!vertexB.positioned) {
                        forces[vertexB.id].x += fx;
                        forces[vertexB.id].y += fy;
                    }
                }
            }

            // Fake repulsive forces between edges


            // Repulsive forces ring centers
            if (ring.rings.length > 2) {
                let ringCenters = new Array(ring.rings.length);
                
                for (let i = 0; i < ring.rings.length; i++) {
                    ringCenters[i] = new Vector2();
                    
                    for (let j = 0; j < ring.rings[i].members.length; j++) {
                        ringCenters[i].x += this.vertices[ring.rings[i].members[j]].position.x;
                        ringCenters[i].y += this.vertices[ring.rings[i].members[j]].position.y;
                    }

                    ringCenters[i].x /= ring.rings[i].members.length;
                    ringCenters[i].y /= ring.rings[i].members.length;

                    ring.rings[i].center.set(ringCenters[i].x, ringCenters[i].y);
                    
                    for (let u = 0; u < ring.rings[i].members.length; u++) {
                        let vertexA = this.vertices[ring.rings[i].members[u]];
                        let dx = ringCenters[i].x - vertexA.position.x;
                        let dy = ringCenters[i].y - vertexA.position.y;

                        if (dx === 0 || dy === 0) {
                            continue;
                        }

                        let dSq = dx * dx + dy * dy;
                        let d = Math.sqrt(dSq);
                        let force = kr / dSq;
                        
                        if (ring.rings[i].members.length === 5 || ring.rings[i].members.length === 6) {
                            force *= 20;
                        }

                        if (ring.rings[i].members.length > 10) {
                            //continue;
                        }

                        let fx = force * dx / d;
                        let fy = force * dy / d;

                        if (!vertexA.positioned) {
                            forces[vertexA.id].x -= fx;
                            forces[vertexA.id].y -= fy;
                        }
                    }
                }
            }

            // Attractive forces
            for (let u = 0; u < vertices.length - 1; u++) {
                let vertexA = this.vertices[vertices[u]];
                
                for (let v = u + 1; v < vertices.length; v++) {
                    let vertexB = this.vertices[vertices[v]];
                    
                    if (!vertexA.isNeighbour(vertexB.id)) {
                        continue;
                    }

                    let dx = vertexB.position.x - vertexA.position.x;
                    let dy = vertexB.position.y - vertexA.position.y;

                    if (dx === 0 || dy === 0) {
                        continue;
                    }

                    let d = Math.sqrt(dx * dx + dy * dy);

                    let force = ks * (d - l);

                    if(d < l) {
                        force *= 0.5;
                    } else {
                        force *= 2.0;
                    }

                    let fx = force * dx / d;
                    let fy = force * dy / d;

                    if (!vertexA.positioned) {
                        forces[vertexA.id].x += fx;
                        forces[vertexA.id].y += fy;
                    }

                    if (!vertexB.positioned) {
                        forces[vertexB.id].x -= fx;
                        forces[vertexB.id].y -= fy;
                    }
                }
            }

            // Gravity

            for (let u = 0; u < vertices.length; u++) {
                let vertex = this.vertices[vertices[u]];
                let dx = center.x - vertex.position.x;
                let dy = center.y - vertex.position.y;

                if (dx === 0 || dy === 0) {
                    continue;
                }

                let d = Math.sqrt(dx * dx + dy * dy);
                let force = g * (1 / d);
                let fx = force * dx / d;
                let fy = force * dy / d;

                if (!vertex.positioned) {
                    forces[vertex.id].x += fx;
                    forces[vertex.id].y += fy;
                }
            }

            // Move the vertex
            for (let u = 0; u < vertices.length; u++) {
                let vertex = this.vertices[vertices[u]];
                
                if (vertex.positioned) {
                    continue;
                }

                let dx = 0.1 * forces[vertex.id].x;
                let dy = 0.1 * forces[vertex.id].y;

                let dSq = dx * dx + dy * dy;

                // Avoid oscillations
                if (dSq > 500) {
                    let s = Math.sqrt(500 / dSq);
                    dx = dx * s;
                    dy = dy * s;
                }


                vertex.position.x += dx;
                vertex.position.y += dy;
            }
        }

        for (let u = 0; u < vertices.length; u++) {
            this.vertices[vertices[u]].positioned = true;
        }

        for (let u = 0; u < vertices.length; u++) {
            let vertex = this.vertices[vertices[u]];
            let parentVertex = this.vertices[vertex.parentVertexId];
            let neighbours = vertex.getNeighbours();
            
            let angle = vertex.getAngle(null, true) - 60;
            for (let i = 0; i < neighbours.length; i++) {
                if (vertex.value.isBridge || (parentVertex !== undefined && parentVertex.value.isBridge)) {
                    this.createNextBond(this.vertices[neighbours[i]], vertex, MathHelper.toRad(angle));
                } else if (this.vertices[neighbours[i]].value.rings.length === 0) {
                    // If there is a spiro, this will be handeled in create ring
                    // This here positiones the vertices going away from the outer ring
                    if (ring.rings.length > 2) {
                        center = this.getSubringCenter(ring, vertex);
                    }

                    this.createNextBond(this.vertices[neighbours[i]], vertex, center);
                }

                angle += 120;
            }
        }
    }

    /**
     * Gets the center of a ring contained within a bridged ring and containing a given vertex.
     *
     * @param {Ring} ring A bridged ring.
     * @param {Vertex} vertex A vertex.
     * @returns {Vector2} The center of the subring that contains the provided vertex.
     */
    getSubringCenter(ring, vertex) {
        for (let i = 0; i < ring.rings.length; i++) {
            let subring = ring.rings[i];
            for (let j = 0; j < subring.members.length; j++) {
                if (subring.members[j] === vertex.id) {
                    return subring.center;
                }
            }
        }

        return ring.center;
    }

    /**
     * Draw the actual edges as bonds to the canvas.
     *
     * @param {boolean} debug A boolean indicating whether or not to draw debug helpers.
     */
    drawEdges(debug) {
        let that = this;
        
        for (let i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];
            let vertexA = this.vertices[edge.sourceId];
            let vertexB = this.vertices[edge.targetId];
            let elementA = vertexA.value.element;
            let elementB = vertexB.value.element;
            let a = vertexA.position;
            let b = vertexB.position;
            let normals = this.getEdgeNormals(edge);
            let gradient = 'gradient' + vertexA.value.element.toUpperCase() + vertexB.value.element.toUpperCase();

            // Create a point on each side of the line
            let sides = ArrayHelper.clone(normals);
            
            ArrayHelper.each(sides, function (v) {
                v.multiply(10);
                v.add(a)
            });

            if (edge.bondType === '=' || this.getRingbondType(vertexA, vertexB) === '=') {
                // Always draw double bonds inside the ring
                let inRing = this.areVerticesInSameRing(vertexA, vertexB);
                let s = this.chooseSide(vertexA, vertexB, sides);

                if (inRing) {
                    // Always draw double bonds inside a ring
                    // if the bond is shared by two rings, it is drawn in the larger
                    // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
                    let lcr = this.getLargestCommonRing(vertexA, vertexB);
                    let center = lcr.center;

                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing);
                    });

                    // Choose the normal that is on the same side as the center
                    let line = null;
                    
                    if (center.sameSideAs(vertexA.position, vertexB.position, Vector2.add(a, normals[0]))) {
                        line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                    } else {
                        line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
                    }

                    line.shorten(this.opts.bondLength - this.opts.shortBondLength);

                    // The shortened edge
                    this.canvasWrapper.drawLine(line);

                    // The normal edge
                    this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                } else if (edge.center) {
                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing / 2.0)
                    });

                    let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                    let lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

                    lineA.shorten(this.opts.bondLength - this.opts.shortBondLength);
                    lineB.shorten(this.opts.bondLength - this.opts.shortBondLength);

                    this.canvasWrapper.drawLine(lineA);
                    this.canvasWrapper.drawLine(lineB);
                } else if (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
                    // Both lines are the same length here
                    // Add the spacing to the edges (which are of unit length)
                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing / 2)
                    });

                    let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                    let lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

                    this.canvasWrapper.drawLine(lineA);
                    this.canvasWrapper.drawLine(lineB);
                } else if (s.sideCount[0] > s.sideCount[1]) {
                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing)
                    });

                    let line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                    
                    line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                    this.canvasWrapper.drawLine(line);
                    this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                } else if (s.sideCount[0] < s.sideCount[1]) {
                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing)
                    });

                    let line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
                    
                    line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                    this.canvasWrapper.drawLine(line);
                    this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing)
                    });

                    let line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                    
                    line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                    this.canvasWrapper.drawLine(line);
                    this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing)
                    });

                    let line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
                    
                    line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                    this.canvasWrapper.drawLine(line);
                    this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                } else {

                }
            } 
            else if(edge.bondType === '#') {
                ArrayHelper.each(normals, function (v) {
                    v.multiply(that.opts.bondSpacing / 1.5)
                });

                let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                let lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

                lineA.shorten(this.opts.bondLength - this.opts.shortBondLength);
                lineB.shorten(this.opts.bondLength - this.opts.shortBondLength);

                this.canvasWrapper.drawLine(lineA);
                this.canvasWrapper.drawLine(lineB);

                this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
            } else {
                this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
            }

            if (debug) {
                let midpoint = Vector2.midpoint(a, b);
                this.canvasWrapper.drawDebugText(midpoint.x, midpoint.y, 'e: ' + i);
            }
        }

        // Draw ring for benzenes
        for (let i = 0; i < this.rings.length; i++) {
            let ring = this.rings[i];
            
            if (ring.isAromatic(this.vertices)) {
                this.canvasWrapper.drawAromaticityRing(ring);
            }
        }
    }

    /**
     * Draws the vertices representing atoms to the canvas.
     *
     * @param {boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
     */
    drawVertices(debug) {
        for (let i = 0; i < this.vertices.length; i++) {
            let vertex = this.vertices[i];
            let atom = vertex.value;
            let charge = 0;
            let bondCount = this.getBondCount(vertex);
            let element = atom.element.length == 1 ? atom.element.toUpperCase() : atom.element;
            let hydrogens = this.maxBonds[element] - bondCount;
            let dir = vertex.getTextDirection(this.vertices);
            let isTerminal = vertex.isTerminal();
            let isCarbon = atom.element.toLowerCase() === 'c';

            if(atom.bracket) {
                hydrogens = atom.bracket.hcount;
                charge = atom.bracket.charge;
            }

            if (!isCarbon || atom.explicit || isTerminal) {
                this.canvasWrapper.drawText(vertex.position.x, vertex.position.y,
                        element, hydrogens, dir, isTerminal, charge)
            }

            if (debug) {
                let value = 'v: ' + vertex.id + ' ' + ArrayHelper.print(atom.ringbonds);
                this.canvasWrapper.drawDebugText(vertex.position.x, vertex.position.y, value);
            }
        }

        // Draw the ring centers for debug purposes
        if (this.opts.debug) {
            for (let i = 0; i < this.rings.length; i++) {
                let center = this.rings[i].center;
                this.canvasWrapper.drawDebugPoint(center.x, center.y, 
                        'r: ' + this.rings[i].id);
            }
        }   
    }

    /**
     * Position the vertices according to their bonds and properties.
     *
     */
    position() {
        var startVertex = 0;

        // If there is a bridged ring, alwas start with the bridged ring
        for(let i = 0; i < this.rings.length; i++) {
            if(this.rings[i].isBridged) {
                startVertex = this.rings[i].members[i];
            }
        }

        this.createNextBond(this.vertices[startVertex]);

        // Atoms bonded to the same ring atom
        this.resolvePrimaryOverlaps();
    }

    /**
     * Reset the positions of rings and vertices. The previous positions will be backed up.
     *
     */
    clearPositions() {
        this.backupVertices = [];
        this.backupRings = [];

        for (let i = 0; i < this.vertices.length; i++) {
            let vertex = this.vertices[i];
            this.backupVertices.push(vertex.clone());
            vertex.positioned = false;
            vertex.position = new Vector2();
        }

        for (let i = 0; i < this.rings.length; i++) {
            var ring = this.rings[i];
            this.backupRings.push(ring.clone());
            ring.positioned = false;
            ring.center = new Vector2();
        }
    }

    /**
     * Restore the positions backed up during the last clearPositions() call.
     *
     */
    restorePositions() {
        for (let i = 0; i < this.backupVertices.length; i++) {
            this.vertices[i] = this.backupVertices[i];
        }

        for (let i = 0; i < this.backupRings.length; i++) {
            this.rings[i] = this.backupRings[i];
        }
    }

    // TODO: This needs some cleaning up

    /**
     * Creates a new ring, that is, positiones all the vertices inside a ring.
     *
     * @param {Ring} ring The ring to position.
     * @param {Vector2} center The center of the ring to be created.
     * @param {Vector|null} [startVector=null] The first vector to be positioned inside the ring.
     * @param {Vertex|null} [previousVertex=null] The last vertex that was positioned.
     */
    createRing(ring, center, startVector = null, previousVertex = null) {
        if (ring.positioned) {
            return;
        }

        center = center ? center : new Vector2(0, 0);

        let orderedNeighbours = ring.getOrderedNeighbours(this.ringConnections);
        let startingAngle = startVector ? Vector2.subtract(startVector.position, center).angle() : 0;

        let radius = MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());
        ring.radius = radius;
        
        let angle = MathHelper.centralAngle(ring.getSize());
        ring.centralAngle = angle;
        
        let a = startingAngle;
        
        let that = this;
        ring.eachMember(this.vertices, function (v) {
            let vertex = that.vertices[v];
            
            if (!vertex.positioned) {
                vertex.position.x = center.x + Math.cos(a) * radius;
                vertex.position.y = center.y + Math.sin(a) * radius;
            }

            a += angle;

            if(!ring.isBridged || ring.rings.length < 3) {
                vertex.positioned = true;
            }
        }, (startVector) ? startVector.id : null, (previousVertex) ? previousVertex.id : null);

        // If the ring is bridged, then draw the vertices inside the ring
        // using a force based approach
        if (ring.isBridged) {
            let allVertices = ArrayHelper.merge(ring.members, ring.insiders);
            this.forceLayout(allVertices, center, startVector.id, ring);
        }

        // Anchor the ring to one of it's members, so that the ring center will always
        // be tied to a single vertex when doing repositionings
        this.vertices[ring.members[0]].value.addAnchoredRing(ring.id);

        ring.positioned = true;
        ring.center = center;
        // Draw neighbours in decreasing order of connectivity
        for (let i = 0; i < orderedNeighbours.length; i++) {
            let neighbour = this.getRing(orderedNeighbours[i].neighbour);
            
            if (neighbour.positioned) {
                continue;
            }

            let vertices = RingConnection.getVertices(this.ringConnections, ring.id, neighbour.id);
            
            if (vertices.length == 2) {
                // This ring is a fused ring
                ring.isFused = true;
                neighbour.isFused = true;

                let vertexA = this.vertices[vertices[0]];
                let vertexB = this.vertices[vertices[1]];

                // Get middle between vertex A and B
                let midpoint = Vector2.midpoint(vertexA.position, vertexB.position);

                // Get the normals to the line between A and B
                let normals = Vector2.normals(vertexA.position, vertexB.position);

                // Normalize the normals
                ArrayHelper.each(normals, function (v) {
                    v.normalize()
                });

                // Set length from middle of side to center (the apothem)
                let r = MathHelper.polyCircumradius(this.opts.bondLength, neighbour.getSize());
                let apothem = MathHelper.apothem(r, neighbour.getSize());
                
                ArrayHelper.each(normals, function (v) {
                    v.multiply(apothem)
                });

                // Move normals to the middle of the line between a and b
                ArrayHelper.each(normals, function (v) {
                    v.add(midpoint)
                });

                // Check if the center of the next ring lies within another ring and
                // select the normal accordingly
                let nextCenter = normals[0];
                
                if (this.isPointInRing(nextCenter)) {
                    nextCenter = normals[1];
                }

                // Get the vertex (A or B) which is in clock-wise direction of the other
                let posA = Vector2.subtract(vertexA.position, nextCenter);
                let posB = Vector2.subtract(vertexB.position, nextCenter);

                if (posA.clockwise(posB) === -1) {
                    this.createRing(neighbour, nextCenter, vertexA, vertexB);
                } else {
                    this.createRing(neighbour, nextCenter, vertexB, vertexA);
                }
            } else if (vertices.length == 1) {
                // This ring is a spiro
                ring.isSpiro = true;
                neighbour.isSpiro = true;

                let vertexA = this.vertices[vertices[0]];
                
                // Get the vector pointing from the shared vertex to the new center
                let nextCenter = Vector2.subtract(center, vertexA.position);
                nextCenter.invert();
                nextCenter.normalize();

                // Get the distance from the vertex to the center
                let r = MathHelper.polyCircumradius(this.opts.bondLength, neighbour.getSize());
                nextCenter.multiply(r);
                nextCenter.add(vertexA.position);
                this.createRing(neighbour, nextCenter, vertexA);
            }
        }

        // Next, draw atoms that are not part of a ring that are directly attached to this ring
        for (let i = 0; i < ring.members.length; i++) {
            let ringMember = this.vertices[ring.members[i]];
            let ringMemberNeighbours = ringMember.getNeighbours();

            // If there are multiple, the ovlerap will be resolved in the appropriate step
            for (let j = 0; j < ringMemberNeighbours.length; j++) {
                if (ring.thisOrNeighboursContain(this.rings, ringMemberNeighbours[j])) {
                    continue;
                }
                
                let v = this.vertices[ringMemberNeighbours[j]];
                this.createNextBond(v, ringMember, ring.center);
            }
        }
    }

    /**
     * Rotate an entire subtree by an angle around a center.
     *
     * @param {number} vertexId A vertex id (the root of the sub-tree).
     * @param {number} parentVertexId A vertex id in the previous direction of the subtree that is to rotate.
     * @param {number} angle An angle in randians.
     * @param {Vector2} center The rotational center.
     */
    rotateSubtree(vertexId, parentVertexId, angle, center) {
        let that = this;
        
        this.traverseTree(vertexId, parentVertexId, function (vertex) {
            vertex.position.rotateAround(angle, center);

            for (let i = 0; i < vertex.value.anchoredRings.length; i++) {
                that.rings[vertex.value.anchoredRings[i]].center.rotateAround(angle, center);
            }
        });
    }

    /**
     * Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.
     *
     */
    resolvePrimaryOverlaps() {
        let overlaps = [];
        let sharedSideChains = []; // side chains attached to an atom shared by two rings
        let done = new Array(this.vertices.length);

        for (let i = 0; i < this.rings.length; i++) {
            let ring = this.rings[i];
            
            for (let j = 0; j < ring.members.length; j++) {
                let vertex = this.vertices[ring.members[j]];

                if (done[vertex.id]) {
                    continue;
                }

                done[vertex.id] = true;

                // Look for rings where there are atoms with two bonds outside the ring (overlaps)
                if (vertex.getNeighbours().length > 2) {
                    let rings = [];
                    
                    for (var k = 0; k < vertex.value.rings.length; k++) {
                        rings.push(vertex.value.rings[k]);
                    }

                    overlaps.push({
                        common: vertex,
                        rings: rings,
                        vertices: this.getNonRingNeighbours(vertex.id)
                    });
                }

                // Side chains attached to an atom shared by two rings
                if (vertex.value.rings.length == 2 && vertex.getNeighbours().length == 4) {
                    let nrn = this.getNonRingNeighbours(vertex.id)[0];
                    
                    if (nrn && nrn.getNeighbours().length > 1) {
                        let other = this.getCommonRingbondNeighbour(vertex);
                        sharedSideChains.push({
                            common: vertex,
                            other: other,
                            vertex: nrn
                        });
                    }
                }
            }
        }

        for (let i = 0; i < sharedSideChains.length; i++) {
            let chain = sharedSideChains[i];
            let angle = -chain.vertex.position.getRotateToAngle(chain.other.position, chain.common.position);
            this.rotateSubtree(chain.vertex.id, chain.common.id, angle + Math.PI, chain.common.position);
        }

        for (let i = 0; i < overlaps.length; i++) {
            let overlap = overlaps[i];
            
            if (overlap.vertices.length == 1) {
                let a = overlap.vertices[0];
                
                if (a.getNeighbours().length == 1) {
                    a.flippable = true;
                    a.flipCenter = overlap.common.id;

                    for (let j = 0; j < overlap.rings.length; j++) {
                        a.flipRings.push(overlap.rings[j]);
                    }
                }
            } else if (overlap.vertices.length == 2) {
                let angle = (2 * Math.PI - this.getRing(overlap.rings[0]).getAngle()) / 6.0;
                let a = overlap.vertices[0];
                let b = overlap.vertices[1];
                
                a.backAngle -= angle;
                b.backAngle += angle;
                
                this.rotateSubtree(a.id, overlap.common.id, angle, overlap.common.position);
                this.rotateSubtree(b.id, overlap.common.id, -angle, overlap.common.position);

                if (a.getNeighbours().length == 1) {
                    a.flippable = true;
                    a.flipCenter = overlap.common.id;
                    a.flipNeighbour = b.id;
                    
                    for (let j = 0; j < overlap.rings.length; j++) {
                        a.flipRings.push(overlap.rings[j]);
                    }
                }
                if (b.getNeighbours().length == 1) {
                    b.flippable = true;
                    b.flipCenter = overlap.common.id;
                    b.flipNeighbour = a.id;
                    
                    for (let j = 0; j < overlap.rings.length; j++) {
                        b.flipRings.push(overlap.rings[j]);
                    }
                }
            }
        }
    }

    /**
     * Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.
     *
     * @param {array} scores An array of objects sorted descending by score. An object is in the form of { id: 0, score: 22 }.
     */
    resolveSecondaryOverlaps(scores) {
        for (let i = 0; i < scores.length; i++) {
            if (scores[i].score > this.opts.bondLength / 5) {
                let vertex = this.vertices[scores[i].id];

                if (vertex.flippable) {
                    // Rings that get concatenated in to a bridge one, will be undefined here ...
                    let a = vertex.flipRings[0] ? this.rings[vertex.flipRings[0]] : null;
                    let b = vertex.flipRings[1] ? this.rings[vertex.flipRings[1]] : null;
                    let flipCenter = this.vertices[vertex.flipCenter].position;

                    // Make a always the bigger ring than b
                    if (a && b) {
                        let tmp = (a.members.length > b.members.length) ? a : b;
                        b = (a.members.length < b.members.length) ? a : b;
                        a = tmp;
                    }

                    if (a && a.allowsFlip()) {
                        vertex.position.rotateTo(a.center, flipCenter);
                        a.setFlipped();
                        
                        if (vertex.flipNeighbour !== null) {
                            // It's better to not straighten the other one, since it will possibly overlap
                            // var flipNeighbour = this.vertices[vertex.flipNeighbour];
                            // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                        }
                    } else if (b && b.allowsFlip()) {
                        vertex.position.rotateTo(b.center, flipCenter);
                        b.setFlipped();
                        
                        if (vertex.flipNeighbour !== null) {
                            // It's better to not straighten the other one, since it will possibly overlap
                            // var flipNeighbour = this.vertices[vertex.flipNeighbour];
                            // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                        }
                    }

                    // Only do a refresh of the remaining!
                    // recalculate scores (how expensive?)
                    // scores = this.getOverlapScore().scores;
                }
            }
        }
    }

    /**
     * Positiones the next vertex thus creating a bond.
     *
     * @param {Vertex} vertex A vertex.
     * @param {Vertex} previousVertex The previous vertex which has been positioned.
     * @param {ring|number} ringOrAngle Either a ring or a number. If the vertex is connected to a ring, it is positioned based on the ring center and thus the ring is supplied. If the vertex is not in a ring, an angle (in radians) is supplied.
     * @param {number} dir Either 1 or -1 to break ties (if no angle can be elucidated.
     */
    createNextBond(vertex, previousVertex, ringOrAngle, dir) {
        if (vertex.positioned) {
            return;
        }

        // If the current node is the member of one ring, then point straight away
        // from the center of the ring. However, if the current node is a member of
        // two rings, point away from the middle of the centers of the two rings
        if (!previousVertex) {
            // Here, ringOrAngle is always an angle

            // Add a (dummy) previous position if there is no previous vertex defined
            // Since the first vertex is at (0, 0), create a vector at (bondLength, 0)
            // and rotate it by 90°
            let dummy = new Vector2(this.opts.bondLength, 0);
            dummy.rotate(MathHelper.toRad(-120));

            vertex.previousPosition = dummy;
            vertex.position = new Vector2(this.opts.bondLength, 0);
            vertex.angle = MathHelper.toRad(-120);
            vertex.positioned = true;
        } else if (previousVertex.value.rings.length == 0 && !vertex.value.isBridge) {
            // Here, ringOrAngle is always an angle

            // If the previous vertex was not part of a ring, draw a bond based
            // on the global angle of the previous bond
            let v = new Vector2(this.opts.bondLength, 0);
            v.rotate(ringOrAngle);
            v.add(previousVertex.position);

            vertex.position = v;
            vertex.previousPosition = previousVertex.position;
            vertex.positioned = true;
        } else if (previousVertex.value.isBridgeNode && vertex.value.isBridge) {
            // If the previous atom is in a bridged ring and this one is inside the ring
            let pos = Vector2.subtract(ringOrAngle, previousVertex.position);
            pos.normalize();

            // Unlike with the ring, do not multiply with radius but with bond length
            pos.multiply(this.opts.bondLength);
            vertex.position.add(previousVertex.position);
            vertex.position.add(pos);

            vertex.previousPosition = previousVertex.position;
            vertex.positioned = true;
        } else if (vertex.value.isBridge) {
            // The previous atom is in a bridged ring and this one is in it as well
            let v = new Vector2(this.opts.bondLength, 0);
            v.rotate(ringOrAngle);
            v.add(previousVertex.position);

            vertex.position = v;
            vertex.previousPosition = previousVertex.position;
            vertex.positioned = true;
        } else if (previousVertex.value.rings.length == 1) {
            // Here, ringOrAngle is always a ring (THIS IS CURRENTLY NOT TRUE - WHY?)
            // Use the same approach es with rings that are connected at one vertex
            // and draw the atom in the opposite direction of the center.
            let pos = Vector2.subtract(ringOrAngle, previousVertex.position);

            pos.invert();
            pos.normalize();
            // Unlike with the ring, do not multiply with radius but with bond length
            pos.multiply(this.opts.bondLength);
            
            vertex.position.add(previousVertex.position);
            vertex.position.add(pos);
            vertex.previousPosition = previousVertex.position;
            vertex.positioned = true;
        } else if (previousVertex.value.rings.length == 2) {
            // Here, ringOrAngle is always a ring
            let ringA = this.getRing(previousVertex.value.rings[0]);
            let ringB = this.getRing(previousVertex.value.rings[1]);

            // Project the current vertex onto the vector between the two centers to
            // get the direction
            let a = Vector2.subtract(ringB.center, ringA.center);
            let b = Vector2.subtract(previousVertex.position, ringA.center);
            let s = Vector2.scalarProjection(b, a);
            
            a.normalize();
            a.multiply(s);
            a.add(ringA.center);

            let pos = Vector2.subtract(a, previousVertex.position);
            pos.invert();
            pos.normalize();
            pos.multiply(this.opts.bondLength);
            
            vertex.position.add(previousVertex.position);
            vertex.position.add(pos);
            vertex.previousPosition = previousVertex.position;
            vertex.positioned = true;
        }

        // Go to next vertex
        // If two rings are connected by a bond ...
        if (vertex.value.rings.length > 0) {
            let nextRing = this.getRing(vertex.value.rings[0]);
            let nextCenter = Vector2.subtract(vertex.previousPosition, vertex.position);
            nextCenter.invert();
            nextCenter.normalize();

            let r = MathHelper.polyCircumradius(this.opts.bondLength, nextRing.getSize());
            nextCenter.multiply(r);
            nextCenter.add(vertex.position);
            this.createRing(nextRing, nextCenter, vertex);
        } else {
            // Draw the non-ring vertices connected to this one        
            let neighbours = vertex.getNeighbours();
            
            if (previousVertex) {
                neighbours = ArrayHelper.remove(neighbours, previousVertex.id);
            }

            let angle = vertex.getAngle();

            if (neighbours.length == 1) {
                let nextVertex = this.vertices[neighbours[0]];

                // Make a single chain always cis except when there's a tribble bond
                if((vertex.value.bondType === '#' || (previousVertex && previousVertex.value.bondType === '#')) ||
                    vertex.value.bondType === '=' && previousVertex && previousVertex.value.bondType === '=') {
                    vertex.value.explicit = true;
                    
                    let straightEdge1 = this.getEdge(vertex.id, previousVertex.id);
                    let straightEdge2 = this.getEdge(vertex.id, nextVertex.id);
                    
                    straightEdge1.center = true;
                    straightEdge2.center = true;

                    nextVertex.angle = angle;
                    this.createNextBond(nextVertex, vertex, nextVertex.angle, -dir);
                }
                else {
                    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

                    if (this.direction !== 0) {
                        plusOrMinus = this.direction;
                    }
                    
                    if (!dir) {
                        dir = plusOrMinus;
                    }
                    
                    nextVertex.angle = MathHelper.toRad(60) * dir;
                    this.createNextBond(nextVertex, vertex, angle + nextVertex.angle, -dir);
                }
            } else if (neighbours.length == 2) {
                // Check for the longer subtree - always go with cis for the longer subtree
                let subTreeDepthA = this.getTreeDepth(neighbours[0], vertex.id);
                let subTreeDepthB = this.getTreeDepth(neighbours[1], vertex.id);

                let cis = 0;
                let trans = 1;

                if (subTreeDepthA > subTreeDepthB) {
                    cis = 1;
                    trans = 0;
                }

                if (vertex.position.clockwise(vertex.previousPosition) === 1) {
                    let cisVertex = this.vertices[neighbours[cis]];
                    let transVertex = this.vertices[neighbours[trans]];

                    transVertex.angle = MathHelper.toRad(60);
                    cisVertex.angle = -MathHelper.toRad(60);

                    this.createNextBond(transVertex, vertex, angle + transVertex.angle);
                    this.createNextBond(cisVertex, vertex, angle + cisVertex.angle);
                } else {
                    let cisVertex = this.vertices[neighbours[cis]];
                    let transVertex = this.vertices[neighbours[trans]];

                    transVertex.angle = -MathHelper.toRad(60);
                    cisVertex.angle = MathHelper.toRad(60);

                    this.createNextBond(cisVertex, vertex, angle + cisVertex.angle);
                    this.createNextBond(transVertex, vertex, angle + transVertex.angle);
                }
            } else if (neighbours.length == 3) {
                // The vertex with the longest sub-tree should always go straight
                let d1 = this.getTreeDepth(neighbours[0], vertex.id);
                let d2 = this.getTreeDepth(neighbours[1], vertex.id);
                let d3 = this.getTreeDepth(neighbours[2], vertex.id);
                
                let s = this.vertices[neighbours[0]];
                let l = this.vertices[neighbours[1]];
                let r = this.vertices[neighbours[2]];

                if(d2 > d1 && d2 > d3) {
                    s = this.vertices[neighbours[1]];
                    l = this.vertices[neighbours[0]];
                    r = this.vertices[neighbours[2]];
                }
                else if(d3 > d1 && d3 > d2) {
                    s = this.vertices[neighbours[2]];
                    l = this.vertices[neighbours[0]];
                    r = this.vertices[neighbours[1]];
                }
                
                this.createNextBond(s, vertex, angle);
                this.createNextBond(l, vertex, angle + MathHelper.toRad(90));
                this.createNextBond(r, vertex, angle - MathHelper.toRad(90));
            } else if (neighbours.length == 4) {
                // The vertex with the longest sub-tree should always go to the reflected opposide direction
                let d1 = this.getTreeDepth(neighbours[0], vertex.id);
                let d2 = this.getTreeDepth(neighbours[1], vertex.id);
                let d3 = this.getTreeDepth(neighbours[2], vertex.id);
                let d4 = this.getTreeDepth(neighbours[3], vertex.id);

                let w = this.vertices[neighbours[0]];
                let x = this.vertices[neighbours[1]];
                let y = this.vertices[neighbours[2]];
                let z = this.vertices[neighbours[3]];

                if(d2 > d1 && d2 > d3 && d2 > d4) {
                    w = this.vertices[neighbours[1]];
                    x = this.vertices[neighbours[0]];
                    y = this.vertices[neighbours[2]];
                    z = this.vertices[neighbours[3]];
                }
                else if(d3 > d1 && d3 > d2 && d3 > d4) {
                    w = this.vertices[neighbours[2]];
                    x = this.vertices[neighbours[0]];
                    y = this.vertices[neighbours[1]];
                    z = this.vertices[neighbours[3]];
                }
                else if(d4 > d1 && d4 > d2 && d4 > d3) {
                    w = this.vertices[neighbours[3]];
                    x = this.vertices[neighbours[0]];
                    y = this.vertices[neighbours[1]];
                    z = this.vertices[neighbours[2]];
                }

                this.createNextBond(w, vertex, angle - MathHelper.toRad(36));
                this.createNextBond(x, vertex, angle + MathHelper.toRad(36));
                this.createNextBond(y, vertex, angle - MathHelper.toRad(108));
                this.createNextBond(z, vertex, angle + MathHelper.toRad(108));
            }
        }
    }

    /**
     * Gets the vetex sharing the edge that is the common bond of two rings.
     *
     * @param {Vertex} vertex A vertex.
     * @returns {number|null} The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.
     */
    getCommonRingbondNeighbour(vertex) {
        let neighbours = vertex.getNeighbours();
        
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = this.vertices[neighbours[i]];
            
            if (ArrayHelper.containsAll(neighbour.value.rings, vertex.value.rings)) {
                return neighbour;
            }
        }

        return null;
    }

    /**
     * Check if a vector is inside any ring.
     *
     * @param {Vector2} vec A vector.
     * @returns {boolean} A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.
     */
    isPointInRing(vec) {
        for (let i = 0; i < this.rings.length; i++) {
            let polygon = this.rings[i].getPolygon(this.vertices);
            
            if (vec.isInPolygon(polygon)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check whether or not an edge is part of a ring.
     *
     * @param {Edge} edge An edge.
     * @returns {boolean} A boolean indicating whether or not the edge is part of a ring.
     */
    isEdgeInRing(edge) {
        let source = this.vertices[edge.sourceId];
        let target = this.vertices[edge.targetId];

        return this.areVerticesInSameRing(source, target);
    }

    /**
     * Check whether or not a ring is an explicity defined aromatic ring (lower case smiles).
     *
     * @param {Ring} ring A ring.
     * @returns {boolean} A boolean indicating whether or not a ring is explicitly defined as aromatic.
     */
    isRingAromatic(ring) {
        for (let i = 0; i < ring.members.length; i++) {
            if (!this.isVertexInAromaticRing(ring.members[i])) {
                return false;
            }
        }

        return true;
    }

    /**
     * Checks whether or not an edge is part of an explicit aromatic ring (lower case smiles).
     *
     * @param {Edge} edge An edge.
     * @returns {boolean} A boolean indicating whether or not the vertex is part of an explicit aromatic ring.
     */
    isEdgeInAromaticRing(edge) {
        return this.isVertexInAromaticRing(edge.sourceId) &&
            this.isVertexInAromaticRing(edge.targetId);
    }

    /**
     * Checks whether or not a vertex is part of an explicit aromatic ring (lower case smiles).
     *
     * @param {number} vertexId A vertex id.
     * @returns {boolean} A boolean indicating whether or not the vertex is part of an explicit aromatic ring.
     */
    isVertexInAromaticRing(vertexId) {
        var element = this.vertices[vertexId].value.element;
        
        return element == element.toLowerCase();
    }

    /**
     * Get the normals of an edge.
     *
     * @param {Edge} edge An edge.
     * @returns {array} An array containing two vectors, representing the normals.
     */
    getEdgeNormals(edge) {
        let v1 = this.vertices[edge.sourceId].position;
        let v2 = this.vertices[edge.targetId].position;

        // Get the normals for the edge
        let normals = Vector2.normals(v1, v2);

        // Normalize the normals
        ArrayHelper.each(normals, function (v) {
            v.normalize()
        });

        return normals;
    }

    /**
     * Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.
     *
     * @param {number} vertexId A vertex id.
     * @param {number} parentVertexId The id of a neighbouring vertex.
     * @returns {number} The depth of the sub-tree.
     */
    getTreeDepth(vertexId, parentVertexId) {
        let neighbours = this.vertices[vertexId].getSpanningTreeNeighbours(parentVertexId);
        let max = 0;

        for (let i = 0; i < neighbours.length; i++) {
            let childId = neighbours[i];
            let d = this.getTreeDepth(childId, vertexId);
            
            if (d > max) {
                max = d;
            }
        }

        return max + 1;
    }

    /**
     * Traverse a sub-tree in the graph.
     *
     * @param {number} vertexId A vertex id.
     * @param {number} parentVertexId A neighbouring vertex.
     * @param {function} callback The callback function that is called with each visited as an argument.
     */
    traverseTree(vertexId, parentVertexId, callback) {
        let vertex = this.vertices[vertexId];
        let neighbours = vertex.getSpanningTreeNeighbours(parentVertexId);

        callback(vertex);

        for (let i = 0; i < neighbours.length; i++) {
            this.traverseTree(neighbours[i], vertexId, callback);
        }
    }

    /**
     * Gets the number of bonds of a vertex.
     *
     * @param {Vertex} vertex A vertex.
     * @returns {number} The number of bonds the vertex participates in.
     */
    getBondCount(vertex) {
        let count = 0;

        for (let i = 0; i < vertex.edges.length; i++) {
            count += this.edges[vertex.edges[i]].getBondCount();
        }

        return count;
    }

    /**
     * Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).
     *
     * @param {number} vertexId A vertex id.
     * @returns {array} An array of vertices.
     */
    getNonRingNeighbours(vertexId) {
        let nrneighbours = [];
        let vertex = this.vertices[vertexId];
        let neighbours = vertex.getNeighbours();

        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = this.vertices[neighbours[i]];
            let nIntersections = ArrayHelper.intersection(vertex.value.rings, neighbour.value.rings).length;
            
            if (nIntersections === 0 && neighbour.value.isBridge == false) {
                nrneighbours.push(neighbour);
            }
        }

        return nrneighbours;
    }
}
