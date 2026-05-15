// @ts-check
import Atom       from './Atom';
import Edge       from './Edge';
import MathHelper from './MathHelper';
import Ring       from './Ring';
import Vector2    from './Vector2';
import Vertex     from './Vertex';

/**
 * A class representing the molecular graph.
 *
 * @property {Vertex[]} vertices The vertices of the graph.
 * @property {Edge[]} edges The edges of this graph.
 * @property {Number[]} atomIdxToVertexId A map mapping atom indices to vertex ids.
 * @property {Object} vertexIdsToEdgeId A map mapping vertex ids to the edge between the two vertices. The key is defined as vertexAId + '_' + vertexBId.
 * @property {Boolean} isometric A boolean indicating whether or not the SMILES associated with this graph is isometric.
 */
export default class Graph {
    /**
     * The constructor of the class Graph.
     *
     * @param {Object} parseTree A SMILES parse tree.
     * @param {Boolean} [isomeric=false] A boolean specifying whether or not the SMILES is isomeric.
     */
    constructor(parseTree, isomeric = false) {
        this.vertices = [];
        this.edges = [];
        this.atomIdxToVertexId = [];
        this.vertexIdsToEdgeId = {};
        this.isomeric = isomeric;

        // Used to assign indices to the heavy atoms.
        this._atomIdx = 0;

        // Used for the bridge detection algorithm
        this._time = 0;
        this._init(parseTree);
    }

    /**
     * PRIVATE FUNCTION. Initializing the graph from the parse tree.
     *
     * @param {Object} node The current node in the parse tree.
     * @param {?Number} parentVertexId=null The id of the previous vertex.
     * @param {Boolean} isBranch=false Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C).
     */
    _init(node, order = 0, parentVertexId = null, isBranch = false) {
    // Create a new vertex object
        const element = node.atom.element ? node.atom.element : node.atom;
        let atom = new Atom(element, node.bond);

        if (element !== 'H' || (!node.hasNext && parentVertexId === null)) {
            atom.idx = this._atomIdx;
            this._atomIdx++;
        }

        atom.branchBond = node.branchBond;
        atom.ringbonds = node.ringbonds;
        atom.bracket = node.atom.element ? node.atom : null;
        atom.class = node.atom.class;

        let vertex = new Vertex(atom);
        let parentVertex = this.vertices[parentVertexId];

        this.addVertex(vertex);

        if (atom.idx !== null) {
            this.atomIdxToVertexId.push(vertex.id);
        }

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
            let edge = new Edge(parentVertexId, vertex.id, 1);

            if (isBranch) {
                edge.setBondType(vertex.value.branchBond || '-');
            }
            else {
                edge.setBondType(parentVertex.value.bondType || '-');
            }

            this.addEdge(edge);
        }

        let offset = node.ringbondCount + 1;

        if (atom.bracket) {
            offset += atom.bracket.hcount;
        }

        let stereoHydrogens = 0;
        if (atom.bracket && atom.bracket.chirality) {
            atom.isStereoCenter = true;
            stereoHydrogens = atom.bracket.hcount;
            for (let i = 0; i < stereoHydrogens; i++) {
                this._init({
                    atom:          'H',
                    isBracket:     'false',
                    branches:      [],
                    branchCount:   0,
                    ringbonds:     [],
                    ringbondCount: false,
                    next:          null,
                    hasNext:       false,
                    bond:          '-',
                }, i, vertex.id, true);
            }
        }

        for (let i = 0; i < node.branchCount; i++) {
            this._init(node.branches[i], i + offset, vertex.id, true);
        }

        if (node.hasNext) {
            this._init(node.next, node.branchCount + offset, vertex.id);
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
     * @param {Vertex} vertex A new vertex.
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
     * @param {Edge} edge A new edge.
     * @returns {Number} The edge id of the new edge.
     */
    addEdge(edge) {
        let source = this.vertices[edge.sourceId];
        let target = this.vertices[edge.targetId];

        edge.id = this.edges.length;
        this.edges.push(edge);

        this.vertexIdsToEdgeId[edge.sourceId + '_' + edge.targetId] = edge.id;
        this.vertexIdsToEdgeId[edge.targetId + '_' + edge.sourceId] = edge.id;
        edge.isPartOfAromaticRing = source.value.isPartOfAromaticRing && target.value.isPartOfAromaticRing;

        source.value.bondCount += edge.weight;
        target.value.bondCount += edge.weight;

        source.edges.push(edge.id);
        target.edges.push(edge.id);

        return edge.id;
    }

    /**
     * Returns the edge between two given vertices.
     *
     * @param {Number} vertexIdA A vertex id.
     * @param {Number} vertexIdB A vertex id.
     * @returns {(Edge|null)} The edge or, if no edge can be found, null.
     */
    getEdge(vertexIdA, vertexIdB) {
        let edgeId = this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB];

        return edgeId === undefined ? null : this.edges[edgeId];
    }

    /**
     * Returns the ids of edges connected to a vertex.
     *
     * @param {Number} vertexId A vertex id.
     * @returns {Number[]} An array containing the ids of edges connected to the vertex.
     */
    getEdges(vertexId) {
        let edgeIds = [];
        let vertex = this.vertices[vertexId];

        for (let i = 0; i < vertex.neighbours.length; i++) {
            edgeIds.push(this.vertexIdsToEdgeId[vertexId + '_' + vertex.neighbours[i]]);
        }

        return edgeIds;
    }

    /**
     * Check whether or not two vertices are connected by an edge.
     *
     * @param {Number} vertexIdA A vertex id.
     * @param {Number} vertexIdB A vertex id.
     * @returns {Boolean} A boolean indicating whether or not two vertices are connected by an edge.
     */
    hasEdge(vertexIdA, vertexIdB) {
        return this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB] !== undefined;
    }

    /**
     * Returns an array containing the vertex ids of this graph.
     *
     * @returns {Number[]} An array containing all vertex ids of this graph.
     */
    getVertexList() {
        let arr = [this.vertices.length];

        for (let i = 0; i < this.vertices.length; i++) {
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
        let arr = Array(this.edges.length);

        for (let i = 0; i < this.edges.length; i++) {
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

        for (let i = 0; i < length; i++) {
            adjacencyMatrix[i] = new Array(length);
            adjacencyMatrix[i].fill(0);
        }

        for (let i = 0; i < this.edges.length; i++) {
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

        for (let i = 0; i < length; i++) {
            adjacencyMatrix[i] = new Array(length);
            adjacencyMatrix[i].fill(0);
        }

        for (let i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];

            adjacencyMatrix[edge.sourceId][edge.targetId] = 1;
            adjacencyMatrix[edge.targetId][edge.sourceId] = 1;
        }

        for (let i = 0; i < bridges.length; i++) {
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

        for (let i = 0; i < length; i++) {
            adjacencyMatrix[i] = new Array(length);
            adjacencyMatrix[i].fill(0);

            for (let j = 0; j < length; j++) {
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
     * Get the distance matrix of the graph.
     *
     * @returns {Array[]} The distance matrix of the graph.
     */
    getDistanceMatrix() {
        let length = this.vertices.length;
        let adja = this.getAdjacencyMatrix();
        let dist = Array(length);

        for (let i = 0; i < length; i++) {
            dist[i] = Array(length);
            dist[i].fill(Infinity);
        }

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (adja[i][j] === 1) {
                    dist[i][j] = 1;
                }
            }
        }

        for (let k = 0; k < length; k++) {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length; j++) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        return dist;
    }

    /**
     * Get the distance matrix of a subgraph.
     *
     * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
     * @returns {Array[]} The distance matrix of the subgraph.
     */
    getSubgraphDistanceMatrix(vertexIds) {
        let length = vertexIds.length;
        let adja = this.getSubgraphAdjacencyMatrix(vertexIds);
        let dist = Array(length);

        for (let i = 0; i < length; i++) {
            dist[i] = Array(length);
            dist[i].fill(Infinity);
            dist[i][i] = 0;
        }

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (adja[i][j] === 1) {
                    dist[i][j] = 1;
                }
            }
        }

        for (let k = 0; k < length; k++) {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length; j++) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        return dist;
    }

    /**
     * Get the adjacency list of the graph.
     *
     * @returns {Array[]} The adjancency list of the graph.
     */
    getAdjacencyList() {
        let length = this.vertices.length;
        let adjacencyList = Array(length);

        for (let i = 0; i < length; i++) {
            adjacencyList[i] = [];

            for (let j = 0; j < length; j++) {
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

        for (let i = 0; i < length; i++) {
            adjacencyList[i] = [];

            for (let j = 0; j < length; j++) {
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
     * Returns the perimeter order of a bridged ring after removing interior bridge atoms.
     * Falls back to the unsorted perimeter vertices when the remaining subgraph is not a simple cycle.
     *
     * @param {Number[]} vertexIds The bridged-ring vertex ids.
     * @param {Ring} ring The bridged ring.
     * @param {Number} startVertexId A preferred starting vertex id.
     * @returns {Number[]} The ordered perimeter vertex ids.
     */
    getBridgedRingPerimeter(vertexIds, ring, startVertexId) {
        let insiderSet = new Set(ring.insiders || []);
        let perimeter = vertexIds.filter(id => !insiderSet.has(id));

        if (perimeter.length < 3) {
            return perimeter;
        }

        let perimeterSet = new Set(perimeter);
        let adjacency = new Map();

        for (let i = 0; i < perimeter.length; i++) {
            let id = perimeter[i];
            let neighbours = this.vertices[id].neighbours.filter(neighbourId => perimeterSet.has(neighbourId));
            adjacency.set(id, neighbours);

            if (neighbours.length !== 2) {
                return perimeter;
            }
        }

        let start = perimeterSet.has(startVertexId) ? startVertexId : perimeter[0];
        let ordered = [start];
        let previous = null;
        let current = start;

        while (ordered.length < perimeter.length) {
            let neighbours = adjacency.get(current).filter(neighbourId => neighbourId !== previous);

            if (previous === null) {
                neighbours.sort((a, b) => this.vertices[a].value.smilesOrder - this.vertices[b].value.smilesOrder);
            }

            if (neighbours.length === 0) {
                return perimeter;
            }

            let next = neighbours[0];

            if (next === start) {
                return perimeter;
            }

            ordered.push(next);
            previous = current;
            current = next;
        }

        return adjacency.get(current).includes(start) ? ordered : perimeter;
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

        for (let i = 0; i < length; i++) {
            if (!visited[i]) {
                this._bridgeDfs(i, visited, disc, low, parent, adj, outBridges);
            }
        }

        return outBridges;
    }

    /**
     * Traverses the graph in breadth-first order.
     *
     * @param {Number} startVertexId The id of the starting vertex.
     * @param {Function} callback The callback function to be called on every vertex.
     */
    traverseBF(startVertexId, callback) {
        let length = this.vertices.length;
        let visited = new Array(length);

        visited.fill(false);

        let queue = [startVertexId];

        while (queue.length > 0) {
            // JavaScripts shift() is O(n) ... bad JavaScript, bad!
            let u = queue.shift();
            let vertex = this.vertices[u];

            callback(vertex);

            for (let i = 0; i < vertex.neighbours.length; i++) {
                let v = vertex.neighbours[i];
                if (!visited[v]) {
                    visited[v] = true;
                    queue.push(v);
                }
            }
        }
    }

    /**
     * Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.
     *
     * @param {Number} vertexId A vertex id.
     * @param {Number} parentVertexId The id of a neighbouring vertex.
     * @returns {Number} The depth of the sub-tree.
     */
    getTreeDepth(vertexId, parentVertexId) {
        if (vertexId === null || parentVertexId === null) {
            return 0;
        }

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
     * @param {Number} vertexId A vertex id.
     * @param {Number} parentVertexId A neighbouring vertex.
     * @param {Function} callback The callback function that is called with each visited as an argument.
     * @param {Number} [maxDepth=999999] The maximum depth of the recursion.
     * @param {Boolean} [ignoreFirst=false] Whether or not to ignore the starting vertex supplied as vertexId in the callback.
     * @param {Number} [depth=1] The current depth in the tree.
     * @param {Uint8Array} [visited=null] An array holding a flag on whether or not a node has been visited.
     */
    traverseTree(vertexId, parentVertexId, callback, maxDepth = 999999, ignoreFirst = false, depth = 1, visited = null) {
        if (visited === null) {
            visited = new Uint8Array(this.vertices.length);
        }

        if (depth > maxDepth + 1 || visited[vertexId] === 1) {
            return;
        }

        visited[vertexId] = 1;

        let vertex = this.vertices[vertexId];
        let neighbours = vertex.getNeighbours(parentVertexId);

        if (!ignoreFirst || depth > 1) {
            callback(vertex);
        }

        for (let i = 0; i < neighbours.length; i++) {
            this.traverseTree(neighbours[i], vertexId, callback, maxDepth, ignoreFirst, depth + 1, visited);
        }
    }

    /**
     * Positiones the (sub)graph using Kamada and Kawais algorithm for drawing general undirected graphs. https://pdfs.semanticscholar.org/b8d3/bca50ccc573c5cb99f7d201e8acce6618f04.pdf
     * There are undocumented layout parameters. They are undocumented for a reason, so be very careful.
     *
     * @param {Number[]} vertexIds An array containing vertexIds to be placed using the force based layout.
     * @param {Vector2} center The center of the layout.
     * @param {Number} startVertexId A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex.
     * @param {Ring} ring The bridged ring associated with this force-based layout.
     */
    /**
     * Compute 2D starting positions for a ring system from its graph-distance
     * matrix using classical multidimensional scaling (MDS).
     *
     * Used by kkLayout to seed cage like ring systems where a plain
     * circular start sends Kamada-Kawai into a local minimum. Classical
     * MDS gives a single global answer in closed form, so KK starts somewhere
     * sensible. An visual example of having MDS+KK vs only KK difference is on dodecahedrane 
     * check https://math.mit.edu/~urschel/publications/p2021e.pdf Figure 5 (last page) for 
     * a very close example of how KK vs MDS+KK looks like in dodecahedrane
     *
     * The algorithm is classical MDS, also called Torgerson scaling or
     * Principal Coordinates Analysis (Torgerson, "Multidimensional scaling: I.
     * Theory and method", Psychometrika 17, 1952). Given an n x n distance
     * matrix D it returns the 2D point set whose pairwise Euclidean distances
     * best match D in least-squares sense. 
     *
     *   1. Square the distances element-wise:           D2[i][j] = D[i][j]^2
     *   2. Double-centre to get a Gram-like matrix:     B = -1/2 H D2 H
     *      with H = I - (1/n) 1 1^T (centres rows and columns on zero).
     *   3. Take the top two eigenvectors of B.
     *   4. Coordinates: x_i = sqrt(lambda_1) v_1[i],
     *                   y_i = sqrt(lambda_2) v_2[i].
     *
     *  The final rescale (lines below) sizes the layout so that the largest
     * pairwise distance is roughly bondLength * sqrt(n), which puts the result
     * on the same scale as the rest of the drawing 
     *
     * @param {Array[]} matDist Graph-distance matrix (shortest paths in bonds).
     * @param {number} length Number of vertices.
     * @param {number} bondLength Target bond length, used as the output scale.
     * @returns {{x: Float32Array, y: Float32Array}} 2D coordinates centred at 0.
     */
    static mdsLayout(matDist, length, bondLength) {
        // Step 1: Compute B = -0.5 * H * D^2 * H (double-centered squared distances)
        // H = I - (1/n) * 11^T
        let dsq = new Array(length);
        for (let i = 0; i < length; i++) {
            dsq[i] = new Float64Array(length);
            for (let j = 0; j < length; j++) {
                dsq[i][j] = matDist[i][j] * matDist[i][j];
            }
        }

        // Row means, column means, grand mean
        let rowMean = new Float64Array(length);
        let grandMean = 0;
        for (let i = 0; i < length; i++) {
            let s = 0;
            for (let j = 0; j < length; j++) s += dsq[i][j];
            rowMean[i] = s / length;
            grandMean += s;
        }
        grandMean /= (length * length);

        // B[i][j] = -0.5 * (D^2[i][j] - rowMean[i] - rowMean[j] + grandMean)
        let B = new Array(length);
        for (let i = 0; i < length; i++) {
            B[i] = new Float64Array(length);
            for (let j = 0; j < length; j++) {
                B[i][j] = -0.5 * (dsq[i][j] - rowMean[i] - rowMean[j] + grandMean);
            }
        }

        // Step 2: Power iteration to find top 2 eigenvectors of B
        let eigvec1 = Graph._powerIteration(B, length, 200);
        let eval1 = Graph._rayleigh(B, eigvec1, length);

        // B' = B - eval1 * v1 * v1^T
        let B2 = new Array(length);
        for (let i = 0; i < length; i++) {
            B2[i] = new Float64Array(length);
            for (let j = 0; j < length; j++) {
                B2[i][j] = B[i][j] - eval1 * eigvec1[i] * eigvec1[j];
            }
        }

        let eigvec2 = Graph._powerIteration(B2, length, 200);
        let eval2 = Graph._rayleigh(B2, eigvec2, length);

        // Step 3: Coordinates = eigvec * sqrt(eigenvalue) * bondLength
        let scale1 = eval1 > 0 ? Math.sqrt(eval1) : 0;
        let scale2 = eval2 > 0 ? Math.sqrt(eval2) : 0;

        // Normalize so max distance between any pair ~= diameter of a polygon
        // with this many vertices at bondLength spacing
        let x = new Float32Array(length);
        let y = new Float32Array(length);
        for (let i = 0; i < length; i++) {
            x[i] = eigvec1[i] * scale1;
            y[i] = eigvec2[i] * scale2;
        }

        // Scale to match bondLength
        let maxDist = 0;
        for (let i = 0; i < length; i++) {
            for (let j = i + 1; j < length; j++) {
                let d = Math.sqrt((x[i] - x[j]) * (x[i] - x[j]) + (y[i] - y[j]) * (y[i] - y[j]));
                if (d > maxDist) maxDist = d;
            }
        }
        if (maxDist > 0) {
            let targetSize = bondLength * Math.max(2, Math.sqrt(length));
            let s = targetSize / maxDist;
            for (let i = 0; i < length; i++) {
                x[i] *= s;
                y[i] *= s;
            }
        }

        return {x, y};
    }

    /**
     * Power iteration to find the dominant eigenvector of a symmetric matrix.
     * @param {Array[]} mat The matrix.
     * @param {number} n Size.
     * @param {number} maxIter Maximum iterations.
     * @returns {Float64Array} The normalized eigenvector.
     */
    static _powerIteration(mat, n, maxIter) {
        let v = new Float64Array(n);
        // Seed with non-uniform vector to break symmetry
        for (let i = 0; i < n; i++) {
            v[i] = 1.0 + 0.1 * i;
        }

        for (let iter = 0; iter < maxIter; iter++) {
            let w = new Float64Array(n);
            for (let i = 0; i < n; i++) {
                let s = 0;
                for (let j = 0; j < n; j++) s += mat[i][j] * v[j];
                w[i] = s;
            }
            // Normalize
            let norm = 0;
            for (let i = 0; i < n; i++) norm += w[i] * w[i];
            norm = Math.sqrt(norm);
            if (norm < 1e-12) break;
            for (let i = 0; i < n; i++) v[i] = w[i] / norm;
        }
        return v;
    }

    /**
     * Rayleigh quotient: v^T * A * v (for normalized v).
     * @param {Array[]} mat The matrix.
     * @param {Float64Array} v Normalized eigenvector.
     * @param {number} n Size.
     * @returns {number} The eigenvalue estimate.
     */
    static _rayleigh(mat, v, n) {
        let r = 0;
        for (let i = 0; i < n; i++) {
            let s = 0;
            for (let j = 0; j < n; j++) s += mat[i][j] * v[j];
            r += v[i] * s;
        }
        return r;
    }

    kkLayout(vertexIds, center, startVertexId, ring, bondLength,
        threshold = 0.1,
        innerThreshold = 0.1,
        maxIteration = 2000,
        maxInnerIteration = 50,
        maxEnergy = 1e9
    ) {
        let edgeStrength = bondLength;

        let matDist = this.getSubgraphDistanceMatrix(vertexIds);
        let length = vertexIds.length;

        let arrPositionX = new Float32Array(length);
        let arrPositionY = new Float32Array(length);
        let arrPositioned = Array(length);

        let radius = MathHelper.polyCircumradius(bondLength, length);
        let angle = MathHelper.centralAngle(length);
        let a = 0.0;

        let insiderSet = new Set(ring.insiders || []);
        let insiders = vertexIds.filter(id => insiderSet.has(id));

        let anyPositioned = false;
        for (let i = 0; i < length; i++) {
            if (this.vertices[vertexIds[i]].positioned) {
                anyPositioned = true;
                break;
            }
        }

        // Pick the starting positions for KK based on the shape of the ring system.
        // KK refines from these positions, but it can only find a local minimum,
        // so a bad start gives a poor outptu (see dodecahedrane)
        //however with MDS-based init it lays out as better dodecahedron
        // projection
        //
        //Three cases:
        // 1. A small bridged ring with 1-2 atoms in the interior
        //Place the outer ring as a regular polygon, then drop
        // the interior atom(s) at the centroid of their neighbours on the
        // perimeter. This is the original SmilesDrawer strategy and still
        // gives the best result for these molecules.
        //
        //2. A cage or a ring system with many interior atoms (cubane,
        //dodecahedrane, fullerenes, cyclophanes). The "drop interior atoms
        //at the centroid" trick from case 1 fails here because it stacks
        //many atoms on top of each other in the middle. Instead we use
        //MDS to compute a 2D layout from the graph-distance matrix in one
        //shot. See Graph.mdsLayout below for details.
        //
        //3. Anything else  the system is too small for MDS to help, or
        //some atoms have already been placed by a previous layout stage.
        //Fall back to a simple circle as the starting guess and KK takes it
        //from there.
        if (insiders.length > 0 && insiders.length <= 2) {
            let perimeter = this.getBridgedRingPerimeter(vertexIds, ring, startVertexId);
            let perimeterSet = new Set(perimeter);
            let perimeterCount = perimeter.length;
            let perimeterRadius = perimeterCount > 2
                ? MathHelper.polyCircumradius(bondLength, perimeterCount)
                : radius;
            let perimeterAngle = perimeterCount > 0
                ? Math.PI * 2.0 / perimeterCount
                : angle;
            let perimeterOffset = 0.0;
            let initialPositions = new Map();

            if (perimeterSet.has(startVertexId)) {
                let startVertexIndex = perimeter.indexOf(startVertexId);
                let startVertex = this.vertices[startVertexId];

                if (startVertex.positioned) {
                    perimeterOffset = Vector2.subtract(startVertex.position, center).angle() - startVertexIndex * perimeterAngle;
                }
            }

            for (let i = 0; i < perimeter.length; i++) {
                let id = perimeter[i];
                let vertex = this.vertices[id];

                if (vertex.positioned) {
                    initialPositions.set(id, vertex.position.clone());
                }
                else {
                    let point = new Vector2(
                        center.x + Math.cos(perimeterOffset + i * perimeterAngle) * perimeterRadius,
                        center.y + Math.sin(perimeterOffset + i * perimeterAngle) * perimeterRadius
                    );
                    initialPositions.set(id, point);
                }
            }

            let innerRadius = Math.max(bondLength * 0.35, perimeterRadius * 0.35);

            for (let i = 0; i < insiders.length; i++) {
                let id = insiders[i];
                let vertex = this.vertices[id];

                if (vertex.positioned) {
                    initialPositions.set(id, vertex.position.clone());
                    continue;
                }

                let neighbours = vertex.neighbours.filter(neighbourId => perimeterSet.has(neighbourId));
                let point = new Vector2(center.x, center.y);

                if (neighbours.length > 0) {
                    point = new Vector2(0.0, 0.0);

                    for (let j = 0; j < neighbours.length; j++) {
                        point.add(initialPositions.get(neighbours[j]));
                    }

                    point.divide(neighbours.length);

                    let direction = Vector2.subtract(point, center);
                    if (direction.lengthSq() < 1e-4) {
                        direction = new Vector2(Math.cos(i * perimeterAngle), Math.sin(i * perimeterAngle));
                    }
                    else {
                        direction.normalize();
                    }

                    point = direction.multiplyScalar(innerRadius).add(center.clone());
                }
                else {
                    point.x += Math.cos(i * perimeterAngle) * innerRadius;
                    point.y += Math.sin(i * perimeterAngle) * innerRadius;
                }

                initialPositions.set(id, point);
            }

            var i = length;
            while (i--) {
                let vertex = this.vertices[vertexIds[i]];
                if (!vertex.positioned) {
                    let initial = initialPositions.get(vertex.id);
                    if (initial) {
                        arrPositionX[i] = initial.x;
                        arrPositionY[i] = initial.y;
                    }
                    else {
                        arrPositionX[i] = center.x + Math.cos(a) * radius;
                        arrPositionY[i] = center.y + Math.sin(a) * radius;
                    }
                }
                else {
                    arrPositionX[i] = vertex.position.x;
                    arrPositionY[i] = vertex.position.y;
                }
                arrPositioned[i] = vertex.positioned;
                a += angle;
            }
        }
        else if (!anyPositioned && length >= 6) {
            let mds = Graph.mdsLayout(matDist, length, bondLength);
            for (let i = 0; i < length; i++) {
                arrPositionX[i] = center.x + mds.x[i];
                arrPositionY[i] = center.y + mds.y[i];
                arrPositioned[i] = false;
            }
        }
        else {
            var i = length;
            while (i--) {
                let vertex = this.vertices[vertexIds[i]];
                if (!vertex.positioned) {
                    arrPositionX[i] = center.x + Math.cos(a) * radius;
                    arrPositionY[i] = center.y + Math.sin(a) * radius;
                }
                else {
                    arrPositionX[i] = vertex.position.x;
                    arrPositionY[i] = vertex.position.y;
                }
                arrPositioned[i] = vertex.positioned;
                a += angle;
            }
        }

        // Create the matrix containing the lengths
        let matLength = Array(length);
        i = length;
        while (i--) {
            matLength[i] = new Array(length);
            let j = length;
            while (j--) {
                matLength[i][j] = bondLength * matDist[i][j];
            }
        }

        // Create the matrix containing the spring strenghts
        let matStrength = Array(length);
        i = length;
        while (i--) {
            matStrength[i] = Array(length);
            let j = length;
            while (j--) {
                matStrength[i][j] = edgeStrength * Math.pow(matDist[i][j], -2.0);
            }
        }

        // Create the matrix containing the energies
        let matEnergy = Array(length);
        let arrEnergySumX = new Float32Array(length);
        let arrEnergySumY = new Float32Array(length);
        i = length;
        while (i--) {
            matEnergy[i] = Array(length);
        }

        i = length;

        while (i--) {
            let ux = arrPositionX[i];
            let uy = arrPositionY[i];
            let dEx = 0.0;
            let dEy = 0.0;
            let j = length;
            while (j--) {
                if (i === j) {
                    continue;
                }
                let vx = arrPositionX[j];
                let vy = arrPositionY[j];
                let denom = 1.0 / Math.sqrt((ux - vx) * (ux - vx) + (uy - vy) * (uy - vy));
                matEnergy[i][j] = [
                    matStrength[i][j] * ((ux - vx) - matLength[i][j] * (ux - vx) * denom),
                    matStrength[i][j] * ((uy - vy) - matLength[i][j] * (uy - vy) * denom),
                ];
                matEnergy[j][i] = matEnergy[i][j];
                dEx += matEnergy[i][j][0];
                dEy += matEnergy[i][j][1];
            }
            arrEnergySumX[i] = dEx;
            arrEnergySumY[i] = dEy;
        }

        // Utility functions, maybe inline them later
        let energy = function(index) {
            return [arrEnergySumX[index] * arrEnergySumX[index] + arrEnergySumY[index] * arrEnergySumY[index], arrEnergySumX[index], arrEnergySumY[index]];
        };

        let highestEnergy = function() {
            let highEnergy = 0.0;
            let highEnergyId = 0;
            let highDEX = 0.0;
            let highDEY = 0.0;

            i = length;
            while (i--) {
                let [delta, dEX, dEY] = energy(i);

                if (delta > highEnergy && arrPositioned[i] === false) {
                    highEnergy = delta;
                    highEnergyId = i;
                    highDEX = dEX;
                    highDEY = dEY;
                }
            }

            return [highEnergyId, highEnergy, highDEX, highDEY];
        };

        let update = function(index, dEX, dEY) {
            let dxx = 0.0;
            let dyy = 0.0;
            let dxy = 0.0;
            let ux = arrPositionX[index];
            let uy = arrPositionY[index];
            let arrL = matLength[index];
            let arrK = matStrength[index];

            i = length;
            while (i--) {
                if (i === index) {
                    continue;
                }

                let vx = arrPositionX[i];
                let vy = arrPositionY[i];
                let l = arrL[i];
                let k = arrK[i];
                let m = (ux - vx) * (ux - vx);
                let denom = 1.0 / Math.pow(m + (uy - vy) * (uy - vy), 1.5);

                dxx += k * (1 - l * (uy - vy) * (uy - vy) * denom);
                dyy += k * (1 - l * m * denom);
                dxy += k * (l * (ux - vx) * (uy - vy) * denom);
            }

            // Prevent division by zero
            if (dxx === 0) {
                dxx = 0.1;
            }

            if (dyy === 0) {
                dyy = 0.1;
            }

            if (dxy === 0) {
                dxy = 0.1;
            }

            let denom = (dxy / dxx - dyy / dxy);
            let dy, dx;
            if (Math.abs(denom) < 1e-6) {
                // Degenerate case: fall back to simple gradient descent
                dx = -dEX * 0.1;
                dy = -dEY * 0.1;
            } else {
                dy = (dEX / dxx + dEY / dxy) / denom;
                dx = -(dxy * dy + dEX) / dxx;
            }

            // Clamp step size to prevent extreme jumps
            let stepLen = Math.sqrt(dx * dx + dy * dy);
            if (stepLen > bondLength) {
                let scale = bondLength / stepLen;
                dx *= scale;
                dy *= scale;
            }

            arrPositionX[index] += dx;
            arrPositionY[index] += dy;

            // Update the energies
            let arrE = matEnergy[index];
            dEX = 0.0;
            dEY = 0.0;

            ux = arrPositionX[index];
            uy = arrPositionY[index];

            i = length;
            while (i--) {
                if (index === i) {
                    continue;
                }
                let vx = arrPositionX[i];
                let vy = arrPositionY[i];
                // Store old energies
                let prevEx = arrE[i][0];
                let prevEy = arrE[i][1];
                let invDist = 1.0 / Math.sqrt((ux - vx) * (ux - vx) + (uy - vy) * (uy - vy));
                dx = arrK[i] * ((ux - vx) - arrL[i] * (ux - vx) * invDist);
                dy = arrK[i] * ((uy - vy) - arrL[i] * (uy - vy) * invDist);

                arrE[i] = [dx, dy];
                dEX += dx;
                dEY += dy;
                arrEnergySumX[i] += dx - prevEx;
                arrEnergySumY[i] += dy - prevEy;
            }
            arrEnergySumX[index] = dEX;
            arrEnergySumY[index] = dEY;
        };

        // Setting up variables for the while loops
        let maxEnergyId = 0;
        let dEX = 0.0;
        let dEY = 0.0;
        let delta = 0.0;
        let iteration = 0;
        let innerIteration = 0;

        while (maxEnergy > threshold && maxIteration > iteration) {
            iteration++;
            [maxEnergyId, maxEnergy, dEX, dEY] = highestEnergy();
            delta = maxEnergy;
            innerIteration = 0;
            while (delta > innerThreshold && maxInnerIteration > innerIteration) {
                innerIteration++;
                update(maxEnergyId, dEX, dEY);
                [delta, dEX, dEY] = energy(maxEnergyId);
            }
        }

        i = length;
        while (i--) {
            let index = vertexIds[i];
            let vertex = this.vertices[index];
            vertex.position.x = arrPositionX[i];
            vertex.position.y = arrPositionY[i];
            vertex.positioned = true;
            vertex.forcePositioned = true;
        }
    }

    /**
     * PRIVATE FUNCTION used by getBridges().
     */
    _bridgeDfs(u, visited, disc, low, parent, adj, outBridges) {
        visited[u] = true;
        disc[u] = low[u] = ++this._time;

        for (let i = 0; i < adj[u].length; i++) {
            let v = adj[u][i];

            if (!visited[v]) {
                parent[v] = u;

                this._bridgeDfs(v, visited, disc, low, parent, adj, outBridges);

                low[u] = Math.min(low[u], low[v]);

                // If low > disc, we have a bridge
                if (low[v] > disc[u]) {
                    outBridges.push([u, v]);
                }
            }
            else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }

    /**
     * Returns the connected components of the graph.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Set[]} Connected components as sets.
     */
    static getConnectedComponents(adjacencyMatrix) {
        let length = adjacencyMatrix.length;
        let visited = new Array(length);
        let components = [];

        visited.fill(false);

        for (let u = 0; u < length; u++) {
            if (!visited[u]) {
                let component = [];
                visited[u] = true;
                component.push(u);
                Graph._ccGetDfs(u, visited, adjacencyMatrix, component);
                if (component.length > 1) {
                    components.push(component);
                }
            }
        }

        return components;
    }

    /**
     * Returns the number of connected components for the graph.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Number} The number of connected components of the supplied graph.
     */
    static getConnectedComponentCount(adjacencyMatrix) {
        let length = adjacencyMatrix.length;
        let visited = new Array(length);
        let count = 0;

        visited.fill(false);

        for (let u = 0; u < length; u++) {
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
        for (let v = 0; v < adjacencyMatrix[u].length; v++) {
            let c = adjacencyMatrix[u][v];

            if (!c || visited[v] || u === v) {
                continue;
            }

            visited[v] = true;
            Graph._ccCountDfs(v, visited, adjacencyMatrix);
        }
    }

    /**
     * PRIVATE FUNCTION used by getConnectedComponents().
     */
    static _ccGetDfs(u, visited, adjacencyMatrix, component) {
        for (let v = 0; v < adjacencyMatrix[u].length; v++) {
            let c = adjacencyMatrix[u][v];

            if (!c || visited[v] || u === v) {
                continue;
            }

            visited[v] = true;
            component.push(v);
            Graph._ccGetDfs(v, visited, adjacencyMatrix, component);
        }
    }
}
