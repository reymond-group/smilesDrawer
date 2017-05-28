/** 
 * A class representing the molecular graph. 
 * 
 * @property {SmilesDrawer.Vertex[]} vertices The vertices of the graph.
 * @property {SmilesDrawer.Edge[]} edges The edges of this graph.
 * @property {Object} vertexIdsToEdgeId A map mapping vertex ids to the edge between the two vertices. The key is defined as vertexAId + '_' + vertexBId.
 * @property {Object} elementCount A map associating element symbols with the number of occurences in this graph.
 * @property {Boolean} isometric A boolean indicating whether or not the SMILES associated with this graph is isometric.
 */
SmilesDrawer.Graph = class Graph {
    /**
     * The constructor of the class Graph.
     * 
     * @param {Object} parseTree A SMILES parse tree.
     * @param {Boolean} [isomeric=false] A boolean specifying whether or not the SMILES is isomeric.
     */
    constructor(parseTree, isomeric = false) {
        this.vertices = [];
        this.edges = [];
        this.vertexIdsToEdgeId = {};
        this.elementCount = {};
        this.isomeric = isomeric;

        // Used for the bridge detection algorithm
        this._time = 0;
        this._init(parseTree);
        this._initInfos();
    }

    /**
     * PRIVATE FUNCTION. Initializing the graph from the parse tree.
     *
     * @param {Object} node The current node in the parse tree.
     * @param {Number} parentVertexId=null The id of the previous vertex.
     * @param {Boolean} isBranch=false Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C).
     */
    _init(node, order = 0, parentVertexId = null, isBranch = false) {
        // Create a new vertex object
        let atom = new SmilesDrawer.Atom(node.atom.element ? node.atom.element : node.atom, node.bond);
        
        atom.branchBond = node.branchBond;
        atom.ringbonds = node.ringbonds;
        atom.bracket = node.atom.element ? node.atom : null;
        atom.setOrder(parentVertexId, order);

        let vertex = new SmilesDrawer.Vertex(atom);
        let parentVertex = this.vertices[parentVertexId];

        this.addVertex(vertex);

        // Add the id of this node to the parent as child
        if (parentVertexId !== null) {
            vertex.setParentVertexId(parentVertexId);
            vertex.value.addNeighbouringElement(parentVertex.value.element);
            parentVertex.addChild(vertex.id);
            parentVertex.value.addNeighbouringElement(atom.element);

            // In addition create a spanningTreeChildren property, which later will
            // not contain the children added through ringbonds
            parentVertex.spanningTreeChildren.push(vertex.id);

            // Add edge between this node and its parent
            let edge = new SmilesDrawer.Edge(parentVertexId, vertex.id, 1);
            
            if (isBranch) {
                edge.bondType = vertex.value.branchBond;
            } else {
                edge.bondType = parentVertex.value.bondType;
            }

            let edgeId = this.addEdge(edge);
            vertex.edges.push(edgeId);
            parentVertex.edges.push(edgeId);
        }
        
        if (atom.bracket && this.isomeric) {
            for (var i = 0; i < atom.bracket.hcount; i++) {
                if (this.isomeric) {
                    this._init({ atom: { element: 'H', bond: '-' }, ringbonds: [] }, i + 1, vertex.id);
                }
            }
        }

        let offset = node.ringbondCount + 1;

        if (atom.bracket) {
            offset += atom.bracket.hcount;
        }
        
        for (var i = 0; i < node.branchCount; i++) {
            this._init(node.branches[i], i + offset, vertex.id, true);
        }

        if (node.hasNext) {
            this._init(node.next, node.branchCount + offset, vertex.id);
        }
    }

    /**
     * PRIVATE FUNCTION. Initializes element counts etc.
     */
    _initInfos() {
        for (var i = 0; i < this.vertices.length; i++) {
            let atom = this.vertices[i].value;
            
            if (typeof this.elementCount[atom.element] !== 'undefined') {
                this.elementCount[atom.element] += 1;
            } else {
                this.elementCount[atom.element] = 0;
            }
        }
    }

    /**
     * Clears all the elements in this graph (edges and vertices).
     */
    clear() {
        this.vertices = [];
        this.edges = [];
        this.vertexIdsToEdgeId = {};
    }

    /**
     * Add a vertex to the graph.
     *
     * @param {SmilesDrawer.Vertex} vertex A new vertex.
     * @returns {Number} The vertex id of the new vertex.
     */
    addVertex(vertex) {
        vertex.id = this.vertices.length;
        this.vertices.push(vertex);
        
        return vertex.id;
    }

    /**
     * Add an edge to the graph.
     *
     * @param {SmilesDrawer.Edge} edge A new edge.
     * @returns {Number} The edge id of the new edge.
     */
    addEdge(edge) {
        edge.id = this.edges.length;
        this.edges.push(edge);
        
        this.vertexIdsToEdgeId[edge.sourceId + '_' + edge.targetId] = edge.id;
        this.vertexIdsToEdgeId[edge.targetId + '_' + edge.sourceId] = edge.id;
        
        return edge.id;
    }

    /**
     * Returns the edge between two given vertices.
     *
     * @param {Number} vertexIdA A vertex id.
     * @param {Number} vertexIdB A vertex id.
     * @returns {Number|null} The edge or, if no edge can be found, null.
     */
    getEdge(vertexIdA, vertexIdB) {
        let edgeId = this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB];

        return edgeId === undefined ? null : this.edges[edgeId];
    }

    /**
     * Returns the edge between two given vertices.
     *
     * @param {Number} vertexIdA A vertex id.
     * @param {Number} vertexIdB A vertex id.
     * @returns {Number|null} The edge or, if no edge can be found, null.
     */
    hasEdge(vertexIdA, vertexIdB) {
        return this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB] !== undefined
    }

    /**
     * Returns an array containing the vertex ids of this graph.
     * 
     * @returns {Number[]} An array containing all vertex ids of this graph.
     */
    getVertexList() {
        let arr = [this.vertices.length];

        for (var i = 0; i < this.vertices.length; i++) {
            arr[i] = this.vertices[i].id;
        }

        return arr;
    }

    /**
     * Returns an array containing source, target arrays of this graphs edges.
     * 
     * @returns {Array[]} An array containing source, target arrays of this graphs edges. Example: [ [ 2, 5 ], [ 6, 9 ] ].
     */
    getEdgeList() {
        let arr = [this.edges.length];

        for (var i = 0; i < this.edges.length; i++) {
            arr[i] = [this.edges[i].sourceId, this.edges[i].targetId];
        }

        return arr;
    }

    /**
     * Get the adjacency matrix of the graph.
     * 
     * @returns {Array[]} The adjancency matrix of the molecular graph.
     */
    getAdjacencyMatrix() {
        let length = this.vertices.length;
        let adjacencyMatrix = Array(length);
        
        for (var i = 0; i < length; i++) {
            adjacencyMatrix[i] = new Array(length);
            adjacencyMatrix[i].fill(0);
        }

        for (var i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];

            adjacencyMatrix[edge.sourceId][edge.targetId] = 1;
            adjacencyMatrix[edge.targetId][edge.sourceId] = 1;
        }

        return adjacencyMatrix;
    }

    /**
     * Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.
     * 
     * @returns {Array[]} The adjancency matrix of the molecular graph with all bridges removed.
     */
    getComponentsAdjacencyMatrix() {
        let length = this.vertices.length;
        let adjacencyMatrix = Array(length);
        let bridges = this.getBridges();
        
        for (var i = 0; i < length; i++) {
            adjacencyMatrix[i] = new Array(length);
            adjacencyMatrix[i].fill(0);
        }

        for (var i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];
            
            adjacencyMatrix[edge.sourceId][edge.targetId] = 1;
            adjacencyMatrix[edge.targetId][edge.sourceId] = 1;
        }

        for (var i = 0; i < bridges.length; i++) {
            adjacencyMatrix[bridges[i][0]][bridges[i][1]] = 0;
            adjacencyMatrix[bridges[i][1]][bridges[i][0]] = 0;
        }

        return adjacencyMatrix;
    }

    /**
     * Get the adjacency matrix of a subgraph.
     * 
     * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
     * @returns {Array[]} The adjancency matrix of the subgraph.
     */
    getSubgraphAdjacencyMatrix(vertexIds) {
        let length = vertexIds.length;
        let adjacencyMatrix = Array(length);

        for (var i = 0; i < length; i++) {
            adjacencyMatrix[i] = new Array(length);
            adjacencyMatrix[i].fill(0);

            for (var j = 0; j < length; j++) {
                if (i === j) {
                    continue;
                }

                if (this.hasEdge(vertexIds[i], vertexIds[j])) {
                    adjacencyMatrix[i][j] = 1;
                }
            }
        }

        return adjacencyMatrix;
    }

    /**
     * Get the adjacency list of the graph.
     * 
     * @returns {Array[]} The adjancency list of the graph.
     */
    getAdjacencyList() {
        let length = this.vertices.length;
        let adjacencyList = Array(length);

        for (var i = 0; i < length; i++) {
            adjacencyList[i] = [];

            for (var j = 0; j < length; j++) {
                if (i === j) {
                    continue;
                }

                if (this.hasEdge(this.vertices[i].id, this.vertices[j].id)) {
                    adjacencyList[i].push(j);
                }
            }
        }

        return adjacencyList;
    }

    /**
     * Get the adjacency list of a subgraph.
     * 
     * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
     * @returns {Array[]} The adjancency list of the subgraph.
     */
    getSubgraphAdjacencyList(vertexIds) {
        let length = vertexIds.length;
        let adjacencyList = Array(length);

        for (var i = 0; i < length; i++) {
            adjacencyList[i] = [];

            for (var j = 0; j < length; j++) {
                if (i === j) {
                    continue;
                }

                if (this.hasEdge(vertexIds[i], vertexIds[j])) {
                    adjacencyList[i].push(j);
                }
            }
        }

        return adjacencyList;
    }

    /**
     * Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.
     * 
     * @returns {Number[]} An array containing the edge ids of the bridges.
     */
    getBridges() {
        let length = this.vertices.length;
        let visited = new Array(length);
        let disc = new Array(length);
        let low = new Array(length);
        let parent = new Array(length);
        let adj = this.getAdjacencyList();
        let outBridges = [];

        visited.fill(false);
        parent.fill(null);
        this._time = 0;
        
        for (var i = 0; i < length; i++) {
            if (!visited[i]) {
                this._bridgeDfs(i, visited, disc, low, parent, adj, outBridges);
            }
        }

        return outBridges;
    }

    /**
     * PRIVATE FUNCTION used by getBridges().
     */
    _bridgeDfs(u, visited, disc, low, parent, adj, outBridges) {
        visited[u] = true;
        disc[u] = low[u] = ++this._time;

        for (var i = 0; i < adj[u].length; i++) {
            let v = adj[u][i];

            if (!visited[v]) {
                parent[v] = u;

                this._bridgeDfs(v, visited, disc, low, parent, adj, outBridges);

                low[u] = Math.min(low[u], low[v]);
                
                // If low > disc, we have a bridge
                if (low[v] > disc[u]) {
                    outBridges.push([u, v]);
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }

    /**
     * Returns the number of connected components for the grpah 
     * 
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Number} The number of connected components of the supplied graph.
     */
    static getConnectedComponentCount(adjacencyMatrix) {
        let length = adjacencyMatrix.length;
        let visited = new Array(length);
        let count = 0;

        visited.fill(false);

        for (var u = 0; u < length; u++) {
            if (!visited[u]) {
                visited[u] = true;
                count++;
                Graph._ccCountDfs(u, visited, adjacencyMatrix);
            }
        }

        return count;
    }

    /**
     * PRIVATE FUNCTION used by getConnectedComponentCount().
     */
    static _ccCountDfs(u, visited, adjacencyMatrix) {
        for (var v = 0; v < adjacencyMatrix[u].length; v++) {
            let c = adjacencyMatrix[u][v];

            if (!c || visited[v] || u === v) {
                continue;
            }

            visited[v] = true;
            Graph._ccCountDfs(v, visited, adjacencyMatrix);
        }
    }
}