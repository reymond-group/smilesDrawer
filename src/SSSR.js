// SSSR.js is the adapter layer between DrawerBase and CycleBasis (Vismara's algortihm) instead of 
// a full implementation on its own (previously was Floyd-Warshall algorihtm). 

// In short, CycleBasis.js takes an adjacency list indexed for one connected component and returns 
// cycles as closed vertex paths [v0, v1, ..., vn, V0]. 
// This is essentially a shim and could probably be dropped. Since DrawerBase calls SSSR.getRings
// in a dozen places keeping this is probably more stable for now and thus avoiding changing those callers
// TODO: Remove complete SSSR.js and adapt DrawerBase

// To understand why we need both getRings(MCB) and getRingsForLayout(Relevant Cycles) check 
// `CycleBasis.js`

// @ts-check
import Graph from './Graph';
import {minimumCycleBasis, relevantCycles, matrixToAdjList} from './CycleBasis';

/** A class encapsulating the functionality to find the smallest set of smallest rings in a graph. */
export default class SSSR {
    /**
     * Returns an array containing arrays, each representing a ring from the
     * minimum cycle basis (MCB / SSSR) of the graph.
     *
     * @param {Graph} graph A Graph object.
     * @param {Boolean} [experimental=false] Whether or not to use experimental SSSR.
     * @returns {Array[]} An array containing arrays, each representing a ring.
     */
    static getRings(graph, experimental = false) {
        return SSSR._findRings(graph, false);
    }

    /**
     * Returns a layout-oriented ring set (relevant cycles).
     *
     * This is the union of all minimum cycle bases — a unique, complete set of
     * minimum-weight cycles that includes all symmetric faces. Use this for
     * depiction; use getRings() for chemistry (aromaticity, ring membership).
     *
     * @param {Graph} graph A Graph object.
     * @param {Boolean} [experimental=false] Whether or not to use experimental SSSR.
     * @returns {Array[]} An array containing arrays, each representing a ring.
     */
    static getRingsForLayout(graph, experimental = false) {
        return SSSR._findRings(graph, true);
    }

    /**
     * Internal ring finder shared by getRings and getRingsForLayout.
     *
     * @param {Graph} graph A Graph object.
     * @param {Boolean} forLayout If true, return relevant cycles; otherwise MCB.
     * @returns {Array[]} An array of rings (each ring is an array of vertex ids).
     */
    static _findRings(graph, forLayout) {

        // Get the adjacency matrix of the graph with all bridges removed 
        // this returns one set per connected component (e.g. 1 for benzene and 2 for [Na+].[Cl-])
        let adjacencyMatrix = graph.getComponentsAdjacencyMatrix();
        if (adjacencyMatrix.length === 0) {
            return [];
        }

        // Note: We get the matrix and not a list because that's what Graph.js exposes
        // if (or when) we rewrite Graph we could change it as this code is 
        // essentially transforming matrix -> list 
        let connectedComponents = Graph.getConnectedComponents(adjacencyMatrix);
        let rings = [];

        for (let i = 0; i < connectedComponents.length; i++) {
            let connectedComponent = connectedComponents[i];
            // extracts kxk submatrix for just the k vertices in i component 
            // the index will be local (0 to N) and not global vertex IDs 
            // this becomes relevant later on because DrawerBase cosumes global vertex Ids
            let ccAdjacencyMatrix = graph.getSubgraphAdjacencyMatrix([...connectedComponent]);

            // Convert adjacency matrix to adjacency list for Vismara algorithm
            // (neighbor list per vertex)
            let adjList = matrixToAdjList(ccAdjacencyMatrix);

            // Run the appropriate cycle finder
            let cyclePaths = forLayout
                ? relevantCycles(adjList)
                : minimumCycleBasis(adjList); 

            // Convert closed paths to vertex ID arrays, mapping local
            // component indices back to global vertex IDs (DrawerBase needs it)
            for (let j = 0; j < cyclePaths.length; j++) {
                let path = cyclePaths[j];
                // path is closed: [v0, v1, ..., vn, v0]. Extract unique vertices.
                // path is closed because Vismara needs it 
                let ring = [];
                for (let k = 0; k < path.length - 1; k++) {
                    ring.push(connectedComponent[path[k]]);
                }
                rings.push(ring);
            }
        }

        return rings;
    }

    /**
     * Creates a printable string from a matrix (2D array).
     *
     * @param {Array[]} matrix A 2D array.
     * @returns {String} A string representing the matrix.
     */
    static matrixToString(matrix) {
        let str = '';

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                str += matrix[i][j] + ' ';
            }

            str += '\n';
        }

        return str;
    }

    /**
     * Checks whether or not two sets are equal (contain the same elements).
     *
     * @param {Set<Number>} setA A set.
     * @param {Set<Number>} setB A set.
     * @returns {Boolean} A boolean indicating whether or not the two sets are equal.
     */
    static areSetsEqual(setA, setB) {
        if (setA.size !== setB.size) {
            return false;
        }

        for (let element of setA) {
            if (!setB.has(element)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Checks whether or not a set (setA) is a superset of another set (setB).
     *
     * @param {Set<Number>} setA A set.
     * @param {Set<Number>} setB A set.
     * @returns {Boolean} A boolean indicating whether or not setB is a superset of setA.
     */
    static isSupersetOf(setA, setB) {
        for (let element of setB) {
            if (!setA.has(element)) {
                return false;
            }
        }

        return true;
    }
}
