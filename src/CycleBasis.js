// @ts-check
//
// Vismara-based cycle perception for molecular graphs.
//
// Reference: P. Vismara, "Union of all the minimum cycle bases of a graph",
//            The Electronic Journal of Combinatorics, Vol. 4, No. 1, R9, 1997.
//
// CDK source is LGPL-2.1; this is a port of the algorithms.

const MAX_INT = 0x7FFFFFFF; // not reachable (for BFS) 

/**
 * 
 * @param {number} word 
 * @returns {number} number of bits
 */
function countBits(word){
        let count = 0;
        while (word !== 0){ 
            word = word & (word - 1);
            count++;
        }
        return count;
    }
/**
 * A fixed-size bit vector backed by Uint32Array.
 */
export default class BitSet {
    /**
     * @param {number} size Number of bits this set can hold.
     */
    constructor(size) {
        this.size = size;
        // wordIndex = i >>> 5; 
        const numWords = size ===0 ? 0: ((size - 1)>>>5) + 1;
        this.words = new Uint32Array(numWords);
    }

    /** @param {number} i */
    set(i) {
        // word | (1 <<< n) 
        // n = which bit inside the word (i &32)
        this.words[ i >>> 5] |= (1 << (i & 31));
    }

    /** @param {number} i @returns {boolean} */
    get(i) {
        // word & (1 <<< n)                             //return boolean 
        return (this.words[ i >>> 5] & (1 << (i & 31))) !== 0;
    }

    /** XOR between two BitSet
     * @param {BitSet} other  
     * @returns {BitSet} new bitset = this XOR other */
    xor(other) {
        // Needed for addition: Merge two cycles (cancel shared edges)
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++){
            result.words[i] = this.words[i] ^ other.words[i];
        };
        return result;
    }

    /** @param {BitSet} other @returns {BitSet} new bitset = this AND other */
    and(other) {
        // Needed to see what edges two cycles share
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++){
            result.words[i] = this.words[i] & other.words[i];
        };
        return result;
    }

    /** @param {BitSet} other @returns {BitSet} new bitset = this OR other */
    or(other) {
        // For checking what edges are covered by the basis so far
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++){
            result.words[i] = this.words[i] | other.words[i];
        };
        return result;
    }

    /** @param {BitSet} other Mutating OR: this |= other */
    orWith(other) {
        // Check what edges are covered by the basis so far 
        //orWith is a mutation union: A <- A u B; modifies A in place
        // Used in GreedyBasis to accumulate the basis's edge coverage without allocating a new BitSet each time.
        for (let i = 0; i < this.words.length; i++){
            this.words[i] |= other.words[i]
        };
    }

    /** @returns {BitSet} deep copy */
    clone() {
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++){
            result.words[i] = this.words[i]
        }
        return result
    }

    /** @returns {boolean} true iff no bits are set */
    isEmpty() {
        for (let i = 0; i < this.words.length; i++){
            if (this.words[i] !== 0) return false;
        }
        return true;
    }

    /** @returns {number} number of set bits (popcount) */
    cardinality() {
        let count = 0;
        // To check how long is a this cycle
        for (let i = 0; i < this.words.length; i++){
            count += countBits(this.words[i])
        }
        return count;
        }

    /** @returns {number} index of highest set bit + 1, or 0 if empty */
    length() {
       for (let i = this.words.length -1; i >=0; i--) {
        if (this.words[i] !==0){
            return i * 32 + (32 - Math.clz32(this.words[i]));
        }
       }
       return 0;
    }
}


/**
 * BFS shortest paths from a single source vertex, with vertex ordering
 * constraint for Vismara's algorithm.
 *
 * Routes are stored as a tree of {type, ...} objects for lazy path
 * reconstruction, following CDK's Source/SequentialRoute/Branch pattern.
 *
 * @param {number[][]} graph adjacency list
 * @param {number} start source vertex
 * @param {number} limit maximum BFS depth
 * @param {number[]} ordering vertex ordering (π)
 * @returns {{distTo: Int32Array, nPathsTo: Int32Array, precedes: boolean[], pathTo: function(number): number[], pathsTo: function(number): number[][], isPrecedingPathTo: function(number): boolean}}
 */
export function shortestPaths(graph, start, limit, ordering) {
    let n = graph.length;
    let distTo = new Int32Array(n).fill(MAX_INT);
    let precedes = new Array(n).fill(false);
    let routeTo = new Array(n).fill(null);
    let nPathsTo = new Int32Array(n);

    distTo[start] = 0;
    precedes[start] = true;
    nPathsTo[start] = 1;
    routeTo[start] = {type: 'source', vertex: start};

    let queue = [start];
    let qLen = 1; // qLen method is faster than queue.shift() method (O(n))

    for (let i = 0; i < qLen; i++) {
        let v = queue[i];
        let dist = distTo[v] + 1;
        if (dist > limit) continue;

        // iterate through v neighbors
        for (let k = 0; k < graph[v].length; k++) {
            let w = graph[v][k];

            if (dist < distTo[w]) { // if shortest path append
                distTo[w] = dist;
                // each seq stores v (which vertex), dist (vertex distance from start), parent (route)
                routeTo[w] = {type: 'seq',
                    parent: routeTo[v],  // point at route to v and not v itself. necessary to walk backwards through the tree
                    vertex: w, dist: dist};
                // Definition 4: check Vismara paper (is there a shortest path passing
                // only through vertices with π < π(r)?)
                precedes[w] = precedes[v] && ordering[w] < ordering[start];
                nPathsTo[w] = nPathsTo[v];
                queue[qLen++] = w;
            }
            else if (dist === distTo[w]) { // if same dist (alterantive path), keep this is part of Vismara algorithm
                // if respects pi priority  skip ties whose new path violates the π constraint
                if (!(precedes[v] && ordering[w] < ordering[start])) continue;

                let newSeq = {type: 'seq', parent: routeTo[v], vertex: w, dist: dist};

                if (precedes[w]) {
                    // merge: w already had a low-π witness; record this as an alternative
                    routeTo[w] = {type: 'branch', left: routeTo[w], right: newSeq};
                    nPathsTo[w] += nPathsTo[v];
                }
                else {
                    // upgrade: this is the first low-π witness reaching w (we know because precedes was False)
                    precedes[w] = true;
                    routeTo[w] = newSeq;
                    nPathsTo[w] = nPathsTo[v];
                }
            }
        }
    }
   /**
     * Walk a route tree backwards to one shortest path.
     * @param {any} route
     * @param {number} n
     * @returns {number[]}
     */
    function routeToPath(route, n) { 
        if (!route) return []; 
        let path = new Array(n);
        let cur = route;
        while (cur){ 
            if (cur.type === 'source'){
                path[0] = cur.vertex;
                break;
            }
            else if (cur.type === 'seq'){
                path[cur.dist] = cur.vertex;
                cur = cur.parent;
            }
            else{
                // branch: use left as first path
                cur = cur.left;
            }
        }
        return path;
    }
    
    /**
     * Walk a route tree backwards to all shortest paths (cartesian over branches).
     * @param {any} route
     * @param {number} n
     * @returns {number[][]}
     */
    function routeToPaths(route, n) {
        if (!route) return [];
        if (route.type === 'source') {
            let path = new Array(n);
            path[0] = route.vertex;
            return [path];
        }
        else if (route.type === 'seq') {
            let parentPaths = routeToPaths(route.parent, n);
            for (let j = 0; j < parentPaths.length; j++) {
                parentPaths[j][route.dist] = route.vertex;
            }
            return parentPaths;
        }
        else {
            // branch
            let leftPaths = routeToPaths(route.left, n);
            let rightPaths = routeToPaths(route.right, n);
            let combined = new Array(leftPaths.length + rightPaths.length);
            for (let j = 0; j < leftPaths.length; j++) combined[j] = leftPaths[j];
            for (let j = 0; j < rightPaths.length; j++) combined[leftPaths.length + j] = rightPaths[j];
            return combined;
        }
    }

    return {
        distTo:   distTo,
        nPathsTo: nPathsTo,
        precedes: precedes,
        pathTo(end) {
            if (end < 0 || end >= n || !routeTo[end]) return [];
            return routeToPath(routeTo[end], distTo[end] + 1);
        },
        pathsTo(end) {
            if (end < 0 || end >= n || !routeTo[end]) return [];
            return routeToPaths(routeTo[end], distTo[end] + 1);
        },
        isPrecedingPathTo(end) {
            return end >= 0 && end < n && precedes[end];
        }
    };

}

/**
 * Compute vertex ordering by degree (ascending), using counting sort.
 * π(x) < π(y) => deg(x) ≤ deg(y).
 * 
 *
 * @param {number[][]} graph adjacency list
 * @returns {number[]} ordering[v] = rank of vertex v
 */
export function computeOrdering(graph) {
    let n = graph.length;
    let maxDeg = 0; 
    let order = new Array(n);

    // get max degree
    for (let i =0; i < n; i++){
        if (graph[i].length > maxDeg) maxDeg = graph[i].length;
    }
    // create buckets (one per degree)
    const buckets = new Array(maxDeg + 1);
    for (let d=0; d <= maxDeg; d++) buckets[d] = []

    // populate buckets
    for (let v = 0; v < n; v++){
        buckets[graph[v].length].push(v)
    }
    let rank = 0;
    // rank 
    for (let d = 0; d <= maxDeg; d++){
        for (const v of buckets[d])
            order[v] = rank++;

    }
    return order;
}
// An example of what computeOrdering is supposed to be doing: 
// let this graph be the example
//     0
//    / \
//   1───2
//   |   |
//   3───4

// graph = [[1,2], [0,2,3], [0,1,4], [1,4], [2,3]] adjacency list 
// degrees: [2, 3, 3, 2, 2] (i.e number of bonds)
// ordering = [0, 3, 4, 1, 2]  (output: rank (π))
// first assign rank to the ones with lower degree (0, 3 and 4)
// then assign rank by index number  (lower first) 0 -> 0; 3 -> 1; 4 -> 2
// follow with vertex with higher degree (vertex 1 and 2)
// assign rank again by index order (1 -> 3; 2 -> 4)
// result vertex 0,1,2,3,4 get rank (0, 3, 4, 1, 2)
