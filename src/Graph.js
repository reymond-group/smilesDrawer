/* A class representing the molecular graph. */
class Graph {
    /**
     * The constructor of the class Graph.
     */
    constructor() {
        this.vertices = [];
        this.edges = [];
        this.vertexIdsToEdgeId = {};

        // Used for the bridge detection algorithm
        this._time = 0;
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
     * @param {Vertex} vertex A new vertex.
     * @returns {number} The vertex id of the new vertex.
     */
    addVertex(vertex) {
        vertex.id = this.vertices.length;
        this.vertices.push(vertex);
        
        return vertex.id;
    }

    /**
     * Add an edge to the graph.
     *
     * @param {Edge} edge A new edge.
     * @returns {number} The edge id of the new edge.
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
     * @param {number} vertexIdA A vertex id.
     * @param {number} vertexIdB A vertex id.
     * @returns {number|null} The edge or, if no edge can be found, null.
     */
    getEdge(vertexIdA, vertexIdB) {
        let edgeId = this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB];

        return edgeId === undefined ? null : this.edges[edgeId];
    }

    /**
     * Returns the edge between two given vertices.
     *
     * @param {number} vertexIdA A vertex id.
     * @param {number} vertexIdB A vertex id.
     * @returns {number|null} The edge or, if no edge can be found, null.
     */
    hasEdge(vertexIdA, vertexIdB) {
        return this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB] !== undefined
    }

    /**
     * Returns an array containing the vertex ids of this graph.
     * 
     * @returns {array} An array containing all vertex ids of this graph.
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
     * @returns {array} An array containing source, target arrays of this graphs edges.
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
     * @returns {array} The adjancency matrix of the molecular graph.
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
     * @returns {array} The adjancency matrix of the molecular graph with all bridges removed.
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
     * @param {array} vertexIds An array containing the vertex ids contained within the subgraph.
     * @returns {array} The adjancency matrix of the subgraph.
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
     * @returns {array} The adjancency list of the graph.
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
     * @param {array} vertexIds An array containing the vertex ids contained within the subgraph.
     * @returns {array} The adjancency list of the subgraph.
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
     * Get the path of the 
     * 
     * @param {array} startVertexId The start vertex of the cycle.
     * @param {array} vertexIds An array containing the vertex ids contained within the subgraph.
     */
    getLargestCycleInSubgraph(startVertexId, vertexIds) {
        let path = [];
        let adjacencyList = this.getSubgraphAdjacencyList(vertexIds);
        return path;
    }

    /**
     * Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.
     * 
     * @returns {array} An array containing the edge ids of the bridges.
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
     * @param {array} adjacencyMatrix An adjacency matrix.
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