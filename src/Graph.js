/* A class representing the molecular graph. */
class Graph {
    /**
     * The constructor of the class Graph.
     */
    constructor() {
        this.vertices = [];
        this.edges = [];
        this.vertexIdsToEdgeId = {};
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
}