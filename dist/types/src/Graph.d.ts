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
     * sensible. A visual example of having MDS+KK vs only KK difference is on dodecahedrane
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
     * on the same scale as the rest of the drawing.
     *
     * @param {Array[]} matDist Graph-distance matrix (shortest paths in bonds).
     * @param {number} n Number of vertices.
     * @param {number} bondLength Target bond length, used as the output scale.
     * @returns {{xs: Float32Array, ys: Float32Array}} 2D coordinates centred at 0.
     */
    static mdsLayout(matDist: any[][], n: number, bondLength: number): {
        xs: Float32Array;
        ys: Float32Array;
    };
    /**
     * Power iteration to find the dominant eigenvector of a symmetric matrix.
     * @param {Array[]} mat The matrix.
     * @param {number} n Size.
     * @param {number} maxIter Maximum iterations.
     * @returns {Float64Array} The normalized eigenvector.
     */
    static _powerIteration(mat: any[][], n: number, maxIter: number): Float64Array;
    /**
     * Rayleigh quotient: v^T * A * v (for normalized v).
     * @param {Array[]} mat The matrix.
     * @param {Float64Array} v Normalized eigenvector.
     * @param {number} n Size.
     * @returns {number} The eigenvalue estimate.
     */
    static _rayleigh(mat: any[][], v: Float64Array, n: number): number;
    /**
     * Returns the connected components of the graph.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {number[][]} Connected components as arrays of vertex ids.
     */
    static getConnectedComponents(adjacencyMatrix: any[][]): number[][];
    /**
     * Returns the number of connected components for the graph.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Number} The number of connected components of the supplied graph.
     */
    static getConnectedComponentCount(adjacencyMatrix: any[][]): number;
    /**
     * PRIVATE FUNCTION used by getConnectedComponentCount().
     */
    static _ccCountDfs(u: any, visited: any, adjacencyMatrix: any): void;
    /**
     * PRIVATE FUNCTION used by getConnectedComponents().
     */
    static _ccGetDfs(u: any, visited: any, adjacencyMatrix: any, component: any): void;
    /**
     * The constructor of the class Graph.
     *
     * @param {Object} parseTree A SMILES parse tree.
     * @param {Boolean} [isomeric=false] A boolean specifying whether or not the SMILES is isomeric.
     */
    constructor(parseTree: any, isomeric?: boolean);
    vertices: any[];
    edges: any[];
    atomIdxToVertexId: any[];
    vertexIdsToEdgeId: {};
    isomeric: boolean;
    _atomIdx: number;
    _time: number;
    /**
     * PRIVATE FUNCTION. Initializing the graph from the parse tree.
     *
     * @param {Object} node The current node in the parse tree.
     * @param {Number} _order UNUSED
     * @param {?Number} parentVertexId=null The id of the previous vertex.
     * @param {Boolean} isBranch=false Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C).
     */
    _init(node: any, _order?: number, parentVertexId?: number | null, isBranch?: boolean): void;
    /**
     * Clears all the elements in this graph (edges and vertices).
     */
    clear(): void;
    /**
     * Add a vertex to the graph.
     *
     * @param {Vertex} vertex A new vertex.
     * @returns {Number} The vertex id of the new vertex.
     */
    addVertex(vertex: Vertex): number;
    /**
     * Add an edge to the graph.
     *
     * @param {Edge} edge A new edge.
     * @returns {Number} The edge id of the new edge.
     */
    addEdge(edge: Edge): number;
    /**
     * Returns the edge between two given vertices.
     *
     * @param {Number} vertexIdA A vertex id.
     * @param {Number} vertexIdB A vertex id.
     * @returns {(Edge|null)} The edge or, if no edge can be found, null.
     */
    getEdge(vertexIdA: number, vertexIdB: number): (Edge | null);
    /**
     * Returns the ids of edges connected to a vertex.
     *
     * @param {Number} vertexId A vertex id.
     * @returns {Number[]} An array containing the ids of edges connected to the vertex.
     */
    getEdges(vertexId: number): number[];
    /**
     * Check whether or not two vertices are connected by an edge.
     *
     * @param {Number} vertexIdA A vertex id.
     * @param {Number} vertexIdB A vertex id.
     * @returns {Boolean} A boolean indicating whether or not two vertices are connected by an edge.
     */
    hasEdge(vertexIdA: number, vertexIdB: number): boolean;
    /**
     * Returns an array containing the vertex ids of this graph.
     *
     * @returns {Number[]} An array containing all vertex ids of this graph.
     */
    getVertexList(): number[];
    /**
     * Returns an array containing source, target arrays of this graphs edges.
     *
     * @returns {Array[]} An array containing source, target arrays of this graphs edges. Example: [ [ 2, 5 ], [ 6, 9 ] ].
     */
    getEdgeList(): any[][];
    /**
     * Get the adjacency matrix of the graph.
     *
     * @returns {Array[]} The adjancency matrix of the molecular graph.
     */
    getAdjacencyMatrix(): any[][];
    /**
     * Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.
     *
     * @returns {Array[]} The adjancency matrix of the molecular graph with all bridges removed.
     */
    getComponentsAdjacencyMatrix(): any[][];
    /**
     * Get the adjacency matrix of a subgraph.
     *
     * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
     * @returns {Array[]} The adjancency matrix of the subgraph.
     */
    getSubgraphAdjacencyMatrix(vertexIds: number[]): any[][];
    /**
     * Get the distance matrix of the graph.
     *
     * @returns {Array[]} The distance matrix of the graph.
     */
    getDistanceMatrix(): any[][];
    /**
     * Get the distance matrix of a subgraph.
     *
     * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
     * @returns {Array[]} The distance matrix of the subgraph.
     */
    getSubgraphDistanceMatrix(vertexIds: number[]): any[][];
    /**
     * Get the adjacency list of the graph.
     *
     * @returns {Array[]} The adjancency list of the graph.
     */
    getAdjacencyList(): any[][];
    /**
     * Get the adjacency list of a subgraph.
     *
     * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
     * @returns {Array[]} The adjancency list of the subgraph.
     */
    getSubgraphAdjacencyList(vertexIds: number[]): any[][];
    /**
     * Returns the perimeter order of a bridged ring after removing interior bridge atoms.
     * Falls back to the unsorted perimeter vertices when the remaining subgraph is not a simple cycle.
     *
     * @param {Number[]} vertexIds The bridged-ring vertex ids.
     * @param {Ring} ring The bridged ring.
     * @param {Number} startVertexId A preferred starting vertex id.
     * @returns {Number[]} The ordered perimeter vertex ids.
     */
    getBridgedRingPerimeter(vertexIds: number[], ring: Ring, startVertexId: number): number[];
    /**
     * Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.
     *
     * @returns {Number[]} An array containing the edge ids of the bridges.
     */
    getBridges(): number[];
    /**
     * Traverses the graph in breadth-first order.
     *
     * @param {Number} startVertexId The id of the starting vertex.
     * @param {Function} callback The callback function to be called on every vertex.
     */
    traverseBF(startVertexId: number, callback: Function): void;
    /**
     * Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.
     *
     * @param {Number} vertexId A vertex id.
     * @param {Number} parentVertexId The id of a neighbouring vertex.
     * @returns {Number} The depth of the sub-tree.
     */
    getTreeDepth(vertexId: number, parentVertexId: number): number;
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
    traverseTree(vertexId: number, parentVertexId: number, callback: Function, maxDepth?: number, ignoreFirst?: boolean, depth?: number, visited?: Uint8Array): void;
    kkLayout(vertexIds: any, center: any, startVertexId: any, ring: any, bondLength: any, threshold?: number, innerThreshold?: number, maxIteration?: number, maxInnerIteration?: number, maxEnergy?: number): void;
    /**
     * PRIVATE FUNCTION used by getBridges().
     */
    _bridgeDfs(u: any, visited: any, disc: any, low: any, parent: any, adj: any, outBridges: any): void;
}
import Vertex from './Vertex';
import Edge from './Edge';
import Ring from './Ring';
