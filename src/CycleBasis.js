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
 *
 * SIZE NOTE 
 * -------------
 * All binary operations (`xor`, `and`, `or`, `orWith`) assume that `this` and
 * `other` have the same `size` (and therefore the same `words.length`).
 *
 * Within Vismara's cycle-perception pipeline this invariant always holds: every
 * BitSet is allocated with `size = nEdges` for the graph being processed, so
 * cycle vectors and basis-coverage vectors live in the same coordinate system.
 *
 * Mixing BitSets of different sizes will silently drop bits (xor / or / orWith
 * iterate `this.words.length` only) or, for `and`, treat the missing high
 * words as zero. 
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

    /**
     * Enforces the SIZE NOTE contract above: every binary op must be called
     * with a same-size BitSet. We compare `size` (bits) rather than
     * `words.length` (32-bit chunks) because two BitSets can share a word
     * count while differing in bit length — e.g. size 33 and size 64 both
     * round up to 2 words, but mixing them would still be a coordinate
     * mismatch in the cycle algorithm.
     *
     * @param {BitSet} other
     * @param {string} op operation name, used in the error message
     */
    _assertSameSize(other, op) {
        if (this.size !== other.size) {
            throw new Error(
                'BitSet.' + op + ': size mismatch (' + this.size + ' vs ' + other.size + '). ' +
                'See SIZE NOTE in BitSet doc — operands must share the same bit length.'
            );
        }
    }

    /** XOR between two BitSet
     * @param {BitSet} other
     * @returns {BitSet} new bitset = this XOR other */
    xor(other) {
        // Needed for addition: Merge two cycles (cancel shared edges)
        this._assertSameSize(other, 'xor');
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++){
            result.words[i] = this.words[i] ^ other.words[i];
        };
        return result;
    }

    /** @param {BitSet} other @returns {BitSet} new bitset = this AND other */
    and(other) {
        // Needed to see what edges two cycles share
        this._assertSameSize(other, 'and');
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++){
            result.words[i] = this.words[i] & other.words[i];
        };
        return result;
    }

    /** @param {BitSet} other @returns {BitSet} new bitset = this OR other */
    or(other) {
        // For checking what edges are covered by the basis so far
        this._assertSameSize(other, 'or');
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
        this._assertSameSize(other, 'orWith');
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
 * Check if two paths from a common root only intersect at the root.
 * Paths are BFS shortest paths so vertex at index i is at distance i.
 * Used in Vismara;s Algorithm 1 Line 8 
 * @param {number[]} p first path
 * @param {number[]} q second path
 * @returns {boolean}
 */
function singletonIntersect(p, q) {
    let n = p.length;
    for (let i = 1; i < n; i++) {
        if (p[i] === q[i]) return false;
    }
    return true;
}


/**
 * Join two paths end-on-end for an odd cycle: pathToY forward, pathToZ reversed.
 * pathToY = [r, ..., y], pathToZ = [r, ..., z]
 * result = [r, ..., y, z, ..., r_neighbor] (closed by adjacency y-z)
 *
 * @param {number[]} pathToY
 * @param {number[]} pathToZ
 * @returns {number[]}
 */
function joinOdd(pathToY, pathToZ) {
    let path = new Array(pathToY.length + pathToZ.length);
    for (let i = 0; i < pathToY.length; i++) {
        path[i] = pathToY[i];
    }
    let j = path.length - 1;
    for (let i = 0; i < pathToZ.length; i++) {
        path[j--] = pathToZ[i];
    }
    return path;
}

/**
 * Join two paths through a vertex y for an even cycle.
 * pathToP = [r, ..., p], pathToQ = [r, ..., q]
 * result = [r, ..., p, y, q, ..., r_neighbor]
 *
 * @param {number[]} pathToP
 * @param {number} y
 * @param {number[]} pathToQ
 * @returns {number[]}
 */
function joinEven(pathToP, y, pathToQ) {
    let path = new Array(pathToP.length + 1 + pathToQ.length);
    for (let i = 0; i < pathToP.length; i++) {
        path[i] = pathToP[i];
    }
    path[pathToP.length] = y;
    let j = path.length - 1;
    for (let i = 0; i < pathToQ.length; i++) {
        path[j--] = pathToQ[i];
    }
    return path;
}

/**
 * translates a vertex-path representation of a cycle into a bit-vector representation 
 * over the edge set, which is the form Gaussian elimination needs
 *
 * @param {number[]} path vertex path where path[0] connects to path[last]
 * @param {Map<string,number>} edgeIndex edge index map
 * @param {number} nEdges total number of edges
 * @returns {BitSet}
 */
function pathToEdgeVector(path, edgeIndex, nEdges) {
    let bs = new BitSet(nEdges);
    let len = path.length - 1;
    for (let i = 0; i < len; i++) {
        let u = path[i], v = path[i + 1];

        //normalize key = (u < v) ? "u,v" : "v,u" because edges are undirected, 
        // so the algorithm might traverse (0, 9) or (9, 0) depending on which way around 
        // the cycle you walk.
        //   Normalizing to lower-vertex-first guarantees both encodings hit the same bit
        let key = (u < v) ? u + ',' + v : v + ',' + u;
        bs.set(/** @type {number} */ (edgeIndex.get(key))); 
    // Input:  path = [9, 0, 1, 2, 3, 4, 9]    closed cycle, first==last
    // edgeIndex = { "0,1":0, "1,2":1, "2,3":2, "3,4":3, ... }
    // nEdges = 11

    //   Process:
    //     bs = empty BitSet of length 11
    //     len = path.length - 1 = 6   (number of edges)
    //     iterate i = 0..5:
    //       i=0: u=9, v=0 → key "0,9"  → set bit edgeIndex["0,9"]
    //       i=1: u=0, v=1 → key "0,1"  → set bit edgeIndex["0,1"]
    //       ...
    //       i=5: u=4, v=9 → key "4,9"  → set bit edgeIndex["4,9"]

    }
    return bs;
}

/**
 * Index all edges in the graph. Each undirected edge (u,v) with u < v
 * gets a unique integer index.
 *
 * @param {number[][]} graph adjacency list
 * @returns {{toIndex: Map<string,number>, count: number}}
 */
function indexEdges(graph) {
    let toIndex = new Map();
    let n = graph.length;

    for (let v = 0; v < n; v++) {
        for (let k = 0; k < graph[v].length; k++) {
            let w = graph[v][k];
            if (w > v) {
                let key = v + ',' + w;
                if (!toIndex.has(key)) {
                    toIndex.set(key, toIndex.size);
                }
            }
        }
    }

    return {toIndex, count: toIndex.size};
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
//   1--─2
//   |   |
//   3--─4

// graph = [[1,2], [0,2,3], [0,1,4], [1,4], [2,3]] adjacency list 
// degrees: [2, 3, 3, 2, 2] (i.e number of bonds)
// ordering = [0, 3, 4, 1, 2]  (output: rank (π))
// first assign rank to the ones with lower degree (0, 3 and 4)
// then assign rank by index number  (lower first) 0 -> 0; 3 -> 1; 4 -> 2
// follow with vertex with higher degree (vertex 1 and 2)
// assign rank again by index order (1 -> 3; 2 -> 4)
// result vertex 0,1,2,3,4 get rank (0, 3, 4, 1, 2)


/**
 * Compute the initial cycle set C'_I using Vismara's algorithm (Algorithm 1).
 *
 * @param {number[][]} graph adjacency list
 * @returns {{cycles: Map<number, Array<{path: number[], edgeVector: BitSet}>>, edgeIndex: Map<string,number>, nEdges: number}}
 */
export function computeInitialCycles(graph) {
    let n = graph.length;
    let ordering = computeOrdering(graph); //assign pi rank
    
    let s = new Array(n) // Set 'S' for collecting vertices adjacent to y 
    // with distance to (z) + 1 ==== dist (y) (line 4)

    // cycles grouped by length
    /**
     * @type {Map<number, Array<{path: number[], edgeVector: BitSet}>>} 
     */
    let cycles = new Map();
    
    let {toIndex: edgeIndex, count: nEdges} = indexEdges(graph);

    let vertices = new Array(n);
    for (let v = 0; v < n; v++) {
        vertices[ordering[v]] = v;
    }
    
    /** @param {any} path  */
    function addCycle(path) {
        let edgeVector = pathToEdgeVector(path, edgeIndex, nEdges);
        let len = path.length - 1; // number of edges = cycle length
        let group = cycles.get(len);
        if (!group){
            group = [];
            cycles.set(len, group);
        }
        group.push({path, edgeVector});
    }

    
    let first = 2; // smllest cycle is 3 vertices, we can skip first 2 ordered vertices

    for (let i = first; i< n; i++){ // for all vertices 
        let r = vertices[i];
        //compute Vr (subset of shortest paths from vertex to r)
        // limit to n/2 is simply because the shortest path for any relevant cycle
        // can be at most n/2  (Vismara Lemma 2)
        let paths = shortestPaths(graph, r, Math.floor(n / 2), ordering);


        // for all y /in Vr do: 
        for (let j= 0; j < i; j++){
            let y = vertices[j];
            if (!paths.isPrecedingPathTo(y)) continue; // only those respecting pi order

            let sizeOfS = 0;

            // for all z in Vr...
            for (let k =0; k < graph[y].length; k++){
                let z = graph[y][k]; //...such that z is adjacent to y (i.e. neighbor)
                if (!paths.isPrecedingPathTo(z)) continue;
                
                // if d(r,z) + d(z,y) = d(r,y) (line 6)
                // here we write d(z,y) instead of w(z,y) because weight is always 1 for our case
                let distToZ = paths.distTo[z];
                let distToY = paths.distTo[y];
                // d(z,y) = 1 because they are adjacent

                if (distToZ + 1 === distToY){
                    s[sizeOfS++] = z;
                }
                //elseif d(r, z) != d(r, y) + d(z, y) and π(z) < π(y) and P(r, y) ∩ P(r, z) = {r}
                // Line 8 
                else if (distToZ === distToY && ordering[z] < ordering[y]) {
                    let pathToY = paths.pathTo(y);
                    let pathToZ = paths.pathTo(z);
                    if (singletonIntersect(pathToZ, pathToY)) {
                        addCycle(joinOdd(pathToY, pathToZ));
                    }
                }
            } 

            // Check pairs in s for even cycles
            for (let k = 0; k < sizeOfS; k++) {
                for (let l = k + 1; l < sizeOfS; l++) {
                    let pathToP = paths.pathTo(s[k]);
                    let pathToQ = paths.pathTo(s[l]);
                    if (singletonIntersect(pathToP, pathToQ)) {
                        addCycle(joinEven(pathToP, y, pathToQ));
                    }
                }
            }
        }
    }

    return {cycles, edgeIndex, nEdges};
}


// BitMatrix (GF(2) elimination) 
// GF(2) is essentially the same as the Gauss-Jordan over the real numbers from linear algebra
// The algorithm can be summarize as
//   for each column x = 0, 1, 2, ... (the pivot column):
//       find the first row at-or-below current row y whose bit x is 1
//       if none: move to next column, same y
//       else:    swap that row up to position y (it's the pivot row)
//                for every row below y that has bit x set:  row ^= pivot_row
//                y += 1   (move to next row)

// BitMatrix helps to keep independence between cycle basis. Let's say we already have 
// two bases c1 and c2 and now Vismara hands a candidate cycle c3 
// question becomes if we should add c3 to the basis. Only if it's linearly independent of {c1, c2}. 
// again, very similar to linear algebra with vector basis
// to see what cycle basis are check vismara page 5
//

// For example for graph formed by two fused triangles
//   0 --- 1
//   | \   | 
//   |   \ | 
//   2  -- 3
//  edges: e0=(0,1), e1=(0,2), e2=(0,3), e3=(1,3), e4=(2,3)
// The bit matrix is 
//                     e0 e1 e2 e3 e4   original index
//   row 0 (c1):        1  0  1  1  0   j=0
//   row 1 (c2):        0  1  1  0  1   j=1
//   row 2 (c3):        1  1  0  1  1   j=2
// rank=2 and by GF(2) elimination we realize c3 is dependent 

export class BitMatrix {
    /**
     * @param {number} columns
     * @param {number} maxRows
     */
    constructor(columns, maxRows) {
        this._n = columns;
        this._max = maxRows;
        /** @type {BitSet[]} */
        this._rows = new Array(maxRows);
        this._indices = new Int32Array(maxRows);
        this._m = 0;
    }

    /** @param {BitSet} row */
    add(row) {
        this._rows[this._m] = row;
        // we need _indices to keep track after swaping rows
        // otherwise we cannot track if our added basis is eliminiated
        // or not
        this._indices[this._m] = this._m;
        this._m++;
    }

    /**
     * Swap rows i and j, tracking original indices.
     * @param {number} i
     * @param {number} j
     */
    swap(i, j) {
        let tmpRow = this._rows[i];
        let tmpIdx = this._indices[i];
        this._rows[i] = this._rows[j];
        this._indices[i] = this._indices[j];
        this._rows[j] = tmpRow;
        this._indices[j] = tmpIdx;
    }

    /**
     * Find current position of original row j.
     * @param {number} j
     * @returns {number}
     */
    _rowIndex(j) {
        for (let i = 0; i < this._m; i++) {
            if (this._indices[i] === j) return i;
        }
        return -1;
    }

    /**
     * Check if the row originally added at index j was eliminated to zero.
     * @param {number} j
     * @returns {boolean}
     */
    eliminated(j) {
        return this._rows[this._rowIndex(j)].isEmpty();
    }

    /**
     * Gaussian elimination over GF(2). Returns the rank.
     * @returns {number}
     */
    eliminate() {
        return this._eliminate(0, 0);
    }

    /**
     * @param {number} x column index
     * @param {number} y row index
     * @returns {number} rank
     */
    _eliminate(x, y) {
        while (x < this._n && y < this._m) {
            // Find first row >= y with bit x set
            let i = -1;
            for (let j = y; j < this._m; j++) {
                if (this._rows[j].get(x)) {
                    i = j;
                    break;
                }
            }

            if (i < 0) return this._eliminate(x + 1, y);

            if (i !== y) this.swap(i, y);

            // XOR row y into all rows below that have bit x set
            for (let j = y + 1; j < this._m; j++) {
                if (this._rows[j].get(x)) {
                    this._rows[j] = this._rows[j].xor(this._rows[y]);
                }
            }

            y++;
        }
        return y;
    }
}


// sort cycles by lenght, ascending
// for each cycle c (in that order):
//  if c is independent of the basis so far: 
    //    add c 
    // if basis is full (E - V + 1):
    //    stop 
export class GreedyBasis{
    /**
     * @param {number} nEdges number of edges in the graph 
     */
    constructor(nEdges){
        /** @type {Array<{path: number[], edgeVector: BitSet}>} */
        this._members = [];
        this._edgesOfBasis = new BitSet(nEdges);
        this._nEdges = nEdges;
    }

    /** @param {{path: number[], edgeVector: BitSet}} cycle */
    add(cycle) {
        this._members.push(cycle);
        // Add what edges are covered by the basis so far
        this._edgesOfBasis.orWith(cycle.edgeVector) // orWith is a union 
    }

    /** @returns {Array<{path: number[], edgeVector: BitSet}>} */
    members() {
        return this._members;
    }

    /** @returns {number} */
    size() {
        return this._members.length;
    }

    /**
     * check if all edges of the cycle already in the basis
     * @param {{path: number[], edgeVector: BitSet}} cycle
     * @returns {boolean}
     */
    isSubsetOfBasis(cycle) {

        // this is an optimized way of checking if c.edges is a subset of edgesOfBasis
        // and makes the BitSet class worth it
        // naive would iterate every bit of c.edgeVector and verify it's set in _edgesOfBasis
        // but we can use cardinality identity | A n B |  = |A| iff A ⊆ B
        
        let intersection = this._edgesOfBasis.and(cycle.edgeVector).cardinality()
        return intersection === cycle.edgeVector.cardinality();

        // Example;
        //  _edgesOfBasis  =  1 1 1 1 0   (basis covers e0, e1, e2, e3)
        //   candidate c    =  1 0 1 0 1   (uses e0, e2, e4)
        //   intersection   =  1 0 1 0 0   cardinality 2 !== c.cardinality (3)
        // therefore c is not subset of basis
        }

    /**
     * Full independence check via GF(2) Gaussian elimination.
     * @param {{path: number[], edgeVector: BitSet}} candidate
     * @returns {boolean}
     */
    isIndependent(candidate){
        //cheap path
        // if the candidate has any edge outside union, it cannot possibly be
        // a XOR  (addition) of basis cycles (because XOR can never invent an edge that none of the basis has)
        // So it's independent - faster than doing the full GF(2) eliminitatino which requires building the matrix etc.

        if (this._members.length ===0 || !this.isSubsetOfBasis(candidate)){
            return true;
        }

        // expensive path, check via GF(2) 
        let matrix = new BitMatrix(this._nEdges, this._members.length + 1);
        for (let i = 0; i < this._members.length; i++){
            matrix.add(this._members[i].edgeVector.clone());
        }
        matrix.add(candidate.edgeVector.clone())
        matrix.eliminate()
        // After eliminate(), check whether the row originally added at index members.length got removed 
        // If it did, candidate is dependent. If not, independent.

        return !matrix.eliminated(this._members.length) // check last row 
        // it is important to add candidate last because that way we now its index is members length!
    }
}

// ----------- Public API ----------
// Compute Minicum Cycle Basis and RelevantCycle 
// To understand why we need both see end of this file

/**
 * Compute the Minimum Cycle Basis (MCB a.k.a SSSR) of a graph.
 * Returns exactly E - V + 1 linearly independent cycles per connected component.
 *
 * This is Horton's algorithm (1987) which extracts a cycle basis from an inital set of cycles (C_I)
 * which we get from Algorithm 1 (computeInitialCycles)
 * @param {number[][]} adjList adjacency list (adjList[v] = array of neighbor vertex indices)
 * @returns {number[][]} array of cycles, each cycle is a closed vertex path [v0, v1, ..., vn, v0]
 */
export function minimumCycleBasis(adjList) {
    // MCB ("smallest set of smallest rings", SSSR):
    // give me ANY linearly independent set of nSssr = E - V + 1 cycles,
    // picked greedily by length. arbitrary ties are broken by input order.

    let n = adjList.length;
    if (n < 3) return []; // minimum cycle is 3

    let {cycles: initialCycles, nEdges} = computeInitialCycles(adjList);
    let basis = new GreedyBasis(nEdges);

    // Compute the expected number of independent cycles
    let nSssr = nEdges - n + 1;    
    // TODO: patch nSssr for disconnected graphs
    // this assumes connected graph, 
    // for a graph with C connected components its nEdges - n + C
    
    // sort initialCycles by lengths in ascending order (shortest cycles first)
    let sortedCycles = [...initialCycles.keys()].sort((a,b) => a - b);

    for (let li = 0; li < sortedCycles.length; li++){

        let group = initialCycles.get(sortedCycles[li]);
        
        // @ts-ignore
        for (let ci = 0; ci < group.length; ci++) {
            if (basis.size() >= nSssr) 
                break;
            // @ts-ignore
            if (basis.isIndependent(group[ci])) {
                // @ts-ignore
                basis.add(group[ci]);
            }
        }
    }

    return basis.members().map(c => c.path);
}


/**
 * Compute the Relevant Cycles of a graph: i.e. the union of all possible MCBs.
 * This set is unique and contains all minimum-weight cycles needed for
 * unambiguous depiction of symmetric ring systems.
 *
 * @param {number[][]} adjList adjacency list
 * @returns {number[][]} array of cycles, each cycle is a closed vertex path [v0, v1, ..., vn, v0]
 */
export function relevantCycles(adjList) {
    // RC ("relevant cycles"):
    // give me the UNION of all MCBs i.e. every cycle that some MCB
    // could legitimately have chosen. always unique, always a superset
    // of any single MCB.

    let n = adjList.length;
    if (n < 3) return []; // minimum cycle is 3

    let {cycles: initialCycles, nEdges} = computeInitialCycles(adjList);
    let basis = new GreedyBasis(nEdges);

    // accumulate the relevant cycles separately;
    let relevant = [];

    // sort initialCycles by lengths in ascending order (shortest cycles first).
    // RC, like MCB, is greedy in length 
    let sortedCycles = [...initialCycles.keys()].sort((a,b) => a - b);

    // process one length class at a time. the key invariant: when we test a
    // cycle C of length L, the basis must contain ONLY cycles strictly shorter
    // than L. that is what makes "independent" mean "not a sum of strictly
    // shorter cycles"  which is the definition of relevant. see vismara
    for (let li = 0; li < sortedCycles.length; li++) {
        let group = initialCycles.get(sortedCycles[li]);

        // pending = the cycles of THIS length that turn out to be relevant.
        // we collect them all before touching the basis, because we do NOT
        // want adding the first relevant cycle of length L to disqualify a
        // sibling cycle of the same length L. equal-length cycles can be
        // pairwise dependent on each other modulo shorter cycles, and RC
        // keeps them all (this is exactly where RC differs from MCB 
        // MCB picks one while RC keeps both).
        let pending = [];

        // @ts-ignore bc group is always defined here (key came from .keys())
        for (let ci = 0; ci < group.length; ci++) {
            // independence is checked against the basis as it stands right
            // now, which only contains cycles of length < L. so this is
            // really asking: "is C expressible as a XOR-sum of strictly
            // shorter cycles?" if not C is relevant.
            // note: NO early-exit on basis.size() here. unlike MCB we don't
            // know the final size of RC up front (it can exceed nSssr), and
            // stopping early would silently drop relevant cycles.
            if (basis.isIndependent(group[ci])) {
                pending.push(group[ci]);
                relevant.push(group[ci].path);
            }
        }

        // bulk-commit AFTER the length class is fully scanned. now the basis
        // grows by all relevant cycles of length L at once, so that the next
        // length class (L+1) sees them as "shorter". any subsequent same-length
        // dependencies among them are irrelevant and we already decided they
        // were all relevant against the strictly-shorter basis, which is the
        // only check that matters for RC.
        for (let ci = 0; ci < pending.length; ci++) {
            basis.add(pending[ci]);
        }
    }

    return relevant;
}



/**
 * Convert an adjacency matrix to an adjacency list.
 *
 * @param {number[][]} matrix square adjacency matrix
 * @returns {number[][]} adjacency list
 */
export function matrixToAdjList(matrix) {
    let n = matrix.length;
    let adj = new Array(n);
    for (let i = 0; i < n; i++) {
        adj[i] = [];
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) adj[i].push(j);
        }
    }
    return adj;
}

// Why are MCB (SSSR) and RC necessary 
// They differ only when two or more equal-length cycles are pairwise
// dependent on each other but jointly independent of all strictly-shorter
// cycles. MCB picks one (whichever the input order happened to put first);
// RC keeps all of them.
//
// example: cubane (C8H8) which has 8 vertices, 12 edges, nSssr = 12 - 8 + 1 = 5
//
//        7 ----- 6
//       /|      /|
//      4 ----─ 5 |
//      | │     │ |
//      | 3  --─│─2          six 4-membered faces:
//      |/      │/              top:    {4,5,6,7}
//      0 ---- 1                bottom: {0,1,2,3}
//                              front:  {0,1,5,4}
//                              back:   {3,2,6,7}
//                              left:   {0,3,7,4}
//                              right:  {1,2,6,5}
//
//   MCB(cubane) = 5 of the 6 faces (the 6th = XOR of the others).
//                 which 5? whichever 5 the greedy loop encountered first
//                 not chemically meaningful.
//   RC(cubane)  = all 6 faces. depicts the cube symmetrically.
//
// Why we need BOTH in a drawing pipeline:
//
//   - MCB is the right input for layout/coordinate generation. The cycle
//     space has dimension nSssr; trying to lay out 6 faces of a cube as if
//     they were independent over-constrains the embedder. You want exactly
//     a basis, no more.
//
//   - RC is the right input for *perception* (aromaticity, ring membership,
//     "is atom X in a ring of size 4?"). An MCB can omit a chemically real
//     ring just because it happened to be the dependent one. RC never does.
//     Drawing cubane with only 5 faces visible would be wrong; perceiving
//     atom 0 as "in three 4-rings" requires RC, not MCB.
//
// Equality cases (MCB == RC):
//   - Naphthalene: two 6-rings sharing an edge. Independent over GF(2),
//     nothing dependent at equal length -> MCB = RC = {ring1, ring2}.
//   - Norbornane: two 5-rings + one 6-ring. The 6-ring IS the XOR of the
//     two 5-rings, but it's strictly longer, so RC excludes it ("not a
//     sum of strictly shorter cycles" fails - it IS such a sum, just at
//     greater length). MCB = RC = the two 5-rings.
//
// Inequality cases (MCB ⊊ RC):
//   - Cubane (above): MCB has 5, RC has 6.
//   - Bicyclo[2.2.2]octane (DABCO skeleton): three 6-rings sharing two
//     bridgeheads. nSssr = 2. MCB picks any 2; RC keeps all 3.
//   - K4 (tetrahedron): four 3-faces, nSssr = 3. MCB picks any 3; RC = 4.
//
// Rule of thumb: if the molecule has a symmetric polycyclic system
// (cage, fused-bridged), MCB ≠ RC and you need RC to depict it faithfully.
//
