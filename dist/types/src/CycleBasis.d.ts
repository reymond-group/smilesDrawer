import BitSet from './BitSet';
/** A cycle: a closed vertex path together with its edge-set bit vector. */
type Cycle = {
    path: number[];
    edgeVector: BitSet;
};
/** Distances from a BFS source plus lazy path reconstructors (see shortestPaths). */
export interface ShortestPaths {
    distTo: Int32Array;
    nPathsTo: Int32Array;
    precedes: boolean[];
    pathTo(end: number): number[];
    pathsTo(end: number): number[][];
    isPrecedingPathTo(end: number): boolean;
}
/**
 * BFS shortest paths from a single source vertex, with the vertex-ordering
 * constraint for Vismara's algorithm.
 *
 * Routes are stored as a tree of Route nodes for lazy path reconstruction
 * (source root / sequential step / branch).
 *
 * @param graph adjacency list
 * @param start source vertex
 * @param limit maximum BFS depth
 * @param ordering vertex ordering (π)
 */
export declare function shortestPaths(graph: number[][], start: number, limit: number, ordering: number[]): ShortestPaths;
/**
 * Compute vertex ordering by degree (ascending), using counting sort.
 * π(x) < π(y) => deg(x) ≤ deg(y).
 *
 *
 * @param graph adjacency list
 * @returns ordering[v] = rank of vertex v
 */
export declare function computeOrdering(graph: number[][]): number[];
/**
 * Compute the initial cycle set C'_I using Vismara's algorithm (Algorithm 1).
 *
 * @param graph adjacency list
 */
export declare function computeInitialCycles(graph: number[][]): {
    cycles: Map<number, Cycle[]>;
    edgeIndex: Map<string, number>;
    nEdges: number;
};
export declare class BitMatrix {
    _n: number;
    _max: number;
    _rows: BitSet[];
    _indices: Int32Array;
    _m: number;
    /**
     * @param columns number of columns (edges)
     * @param maxRows maximum number of rows (cycles)
     */
    constructor(columns: number, maxRows: number);
    /** @param row a cycle's edge vector */
    add(row: BitSet): void;
    /**
     * Swap rows i and j, tracking original indices.
     * @param i row index
     * @param j row index
     */
    swap(i: number, j: number): void;
    /**
     * Find current position of original row j.
     * @param j original row index
     */
    _rowIndex(j: number): number;
    /**
     * Check if the row originally added at index j was eliminated to zero.
     * @param j original row index
     */
    eliminated(j: number): boolean;
    /**
     * Gaussian elimination over GF(2). Returns the rank.
     */
    eliminate(): number;
    /**
     * @param x column index
     * @param y row index
     * @returns rank
     */
    _eliminate(x: number, y: number): number;
}
export declare class GreedyBasis {
    _members: Cycle[];
    _edgesOfBasis: BitSet;
    _nEdges: number;
    /**
     * @param nEdges number of edges in the graph
     */
    constructor(nEdges: number);
    /** @param cycle a cycle to add to the basis */
    add(cycle: Cycle): void;
    members(): Cycle[];
    size(): number;
    /**
     * Check whether all edges of the cycle are already covered by the basis.
     * @param cycle candidate cycle
     */
    isSubsetOfBasis(cycle: Cycle): boolean;
    /**
     * Full independence check via GF(2) Gaussian elimination.
     * @param candidate candidate cycle
     */
    isIndependent(candidate: Cycle): boolean;
}
/**
 * Compute the Minimum Cycle Basis (MCB a.k.a SSSR) of a graph.
 * Returns exactly E - V + 1 linearly independent cycles per connected component.
 *
 * This is Horton's algorithm (1987) which extracts a cycle basis from an inital set of cycles (C_I)
 * which we get from Algorithm 1 (computeInitialCycles)
 * @param adjList adjacency list (adjList[v] = array of neighbor vertex indices)
 * @returns array of cycles, each cycle is a closed vertex path [v0, v1, ..., vn, v0]
 */
export declare function minimumCycleBasis(adjList: number[][]): number[][];
/**
 * Compute the Relevant Cycles of a graph: i.e. the union of all possible MCBs.
 * This set is unique and contains all minimum-weight cycles needed for
 * unambiguous depiction of symmetric ring systems.
 *
 * @param adjList adjacency list
 * @returns array of cycles, each cycle is a closed vertex path [v0, v1, ..., vn, v0]
 */
export declare function relevantCycles(adjList: number[][]): number[][];
/**
 * Convert an adjacency matrix to an adjacency list.
 *
 * @param matrix square adjacency matrix
 * @returns adjacency list
 */
export declare function matrixToAdjList(matrix: number[][]): number[][];
export {};
