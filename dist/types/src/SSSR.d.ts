/** A class encapsulating the functionality to find the smallest set of smallest rings in a graph. */
export default class SSSR {
    /**
     * Returns an array containing arrays, each representing a ring from the
     * minimum cycle basis (MCB / SSSR) of the graph.
     *
     * @param {Graph} graph A Graph object.
     * @param {Boolean} [_experimental=false] Whether or not to use experimental SSSR (UNUSED).
     * @returns {Array[]} An array containing arrays, each representing a ring.
     */
    static getRings(graph: Graph, _experimental?: boolean): any[][];
    /**
     * Returns a layout-oriented ring set (relevant cycles).
     *
     * This is the union of all minimum cycle bases — a unique, complete set of
     * minimum-weight cycles that includes all symmetric faces. Use this for
     * depiction; use getRings() for chemistry (aromaticity, ring membership).
     *
     * @param {Graph} graph A Graph object.
     * @param {Boolean} [_experimental=false] Whether or not to use experimental SSSR (UNUSED).
     * @returns {Array[]} An array containing arrays, each representing a ring.
     */
    static getRingsForLayout(graph: Graph, _experimental?: boolean): any[][];
    /**
     * Internal ring finder shared by getRings and getRingsForLayout.
     *
     * @param {Graph} graph A Graph object.
     * @param {Boolean} forLayout If true, return relevant cycles; otherwise MCB.
     * @returns {Array[]} An array of rings (each ring is an array of vertex ids).
     */
    static _findRings(graph: Graph, forLayout: boolean): any[][];
    /**
     * Creates a printable string from a matrix (2D array).
     *
     * @param {Array[]} matrix A 2D array.
     * @returns {String} A string representing the matrix.
     */
    static matrixToString(matrix: any[][]): string;
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
}
import Graph from './Graph';
