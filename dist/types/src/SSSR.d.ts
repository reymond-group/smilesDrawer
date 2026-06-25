/** A class encapsulating the functionality to find the smallest set of smallest rings in a graph. */
export default class SSSR {
    /**
     * Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.
     *
     * @param {Graph} graph A Graph object.
     * @param {Boolean} [experimental=false] Whether or not to use experimental SSSR.
     * @returns {Array[]} An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.
     */
    static getRings(graph: Graph, experimental?: boolean): any[][];
    /**
     * Creates a printable string from a matrix (2D array).
     *
     * @param {Array[]} matrix A 2D array.
     * @returns {String} A string representing the matrix.
     */
    static matrixToString(matrix: any[][]): string;
    /**
     * Returnes the two path-included distance matrices used to find the sssr.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Object} The path-included distance matrices. { p1, p2 }
     */
    static getPathIncludedDistanceMatrices(adjacencyMatrix: any[][]): any;
    /**
     * Get the ring candidates from the path-included distance matrices.
     *
     * @param {Array[]} d The distance matrix.
     * @param {Array[]} pe A matrix containing the shortest paths.
     * @param {Array[]} pe_prime A matrix containing the shortest paths + one vertex.
     * @returns {Array[]} The ring candidates.
     */
    static getRingCandidates(d: any[][], pe: any[][], pe_prime: any[][]): any[][];
    /**
     * Searches the candidates for the smallest set of smallest rings.
     *
     * @param {Array[]} c The candidates.
     * @param {Array[]} d The distance matrix.
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @param {Array[]} pe A matrix containing the shortest paths.
     * @param {Array[]} pe_prime A matrix containing the shortest paths + one vertex.
     * @param {Uint16Array} arrBondCount A matrix containing the bond count of each vertex.
     * @param {Uint16Array} arrRingCount A matrix containing the number of rings associated with each vertex.
     * @param {Number} nsssr The theoretical number of rings in the graph.
     * @returns {Set[]} The smallest set of smallest rings.
     */
    static getSSSR(c: any[][], d: any[][], adjacencyMatrix: any[][], pe: any[][], pe_prime: any[][], arrBondCount: Uint16Array, arrRingCount: Uint16Array, nsssr: number): Set<any>[];
    /**
     * Returns the number of edges in a graph defined by an adjacency matrix.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Number} The number of edges in the graph defined by the adjacency matrix.
     */
    static getEdgeCount(adjacencyMatrix: any[][]): number;
    /**
     * Returns an edge list constructed form an adjacency matrix.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Array[]} An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]
     */
    static getEdgeList(adjacencyMatrix: any[][]): any[][];
    /**
     * Return a set of vertex indices contained in an array of bonds.
     *
     * @param {Array} bonds An array of bonds. A bond is defined as [ sourceVertexId, targetVertexId ].
     * @returns {Set<Number>} An array of vertices.
     */
    static bondsToAtoms(bonds: any[]): Set<number>;
    /**
    * Returns the number of bonds within a set of atoms.
    *
    * @param {Set<Number>} atoms An array of atom ids.
    * @param {Array[]} adjacencyMatrix An adjacency matrix.
    * @returns {Number} The number of bonds in a set of atoms.
    */
    static getBondCount(atoms: Set<number>, adjacencyMatrix: any[][]): number;
    /**
     * Checks whether or not a given path already exists in an array of paths.
     *
     * @param {Set[]} pathSets An array of sets each representing a path.
     * @param {Set<Number>} pathSet A set representing a path.
     * @param {Array[]} bonds The bonds associated with the current path.
     * @param {Array[]} allBonds All bonds currently associated with rings in the SSSR set.
     * @param {Uint16Array} arrBondCount A matrix containing the bond count of each vertex.
     * @param {Uint16Array} arrRingCount A matrix containing the number of rings associated with each vertex.
     * @returns {Boolean} A boolean indicating whether or not a give path is contained within a set.
     */
    static pathSetsContain(pathSets: Set<any>[], pathSet: Set<number>, bonds: any[][], allBonds: any[][], arrBondCount: Uint16Array, arrRingCount: Uint16Array): boolean;
    /**
     * Checks whether or not two sets are equal (contain the same elements).
     *
     * @param {Set<Number>} setA A set.
     * @param {Set<Number>} setB A set.
     * @returns {Boolean} A boolean indicating whether or not the two sets are equal.
     */
    static areSetsEqual(setA: Set<number>, setB: Set<number>): boolean;
    /**
     * Checks whether or not a set (setA) is a superset of another set (setB).
     *
     * @param {Set<Number>} setA A set.
     * @param {Set<Number>} setB A set.
     * @returns {Boolean} A boolean indicating whether or not setB is a superset of setA.
     */
    static isSupersetOf(setA: Set<number>, setB: Set<number>): boolean;
    /**
     * Find missing rings using BFS when the main SSSR algorithm falls short.
     * For each edge not covered by existing rings, find the shortest cycle
     * containing that edge.
     *
     * @static
     * @param {Array[]} adjacencyMatrix
     * @param {Set[]} existingRings The rings already found by the SSSR algorithm.
     * @param {Number} nSssr The expected number of rings.
     * @returns {Set[]} newly found rings
     */
    static findMissingRings(adjacencyMatrix: any[][], existingRings: Set<any>[], nSssr: number): Set<any>[];
    /**
     * BFS to find shortest path from u to v without using the direct u-v edge.
     * Returns the cycle as an array of vertex indices, or null if no path exists.
     *
     * @static
     * @param {Array[]} adjacencyMatrix The adjacency matrix.
     * @param {Number} u Source vertex.
     * @param {Number} v Target vertex.
     * @param {Number} length Number of vertices.
     * @returns {Number[]|null} The cycle vertices, or null.
     */
    static bfsShortestCycle(adjacencyMatrix: any[][], u: number, v: number, length: number): number[] | null;
}
import Graph from './Graph';
