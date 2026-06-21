//
// Vismara-based cycle perception for molecular graphs.
//
// Reference: P. Vismara, "Union of all the minimum cycle bases of a graph",
//            The Electronic Journal of Combinatorics, Vol. 4, No. 1, R9, 1997.
// This is an independent implementation written directly from Vismara's paper.

import BitSet from './BitSet';

const MAX_INT = 0x7FFFFFFF; // not reachable (for BFS)

/** A cycle: a closed vertex path together with its edge-set bit vector. */
type Cycle = {path: number[], edgeVector: BitSet};

/**
 * A node in a BFS route tree, used to reconstruct shortest paths lazily: a
 * `source` root, a `seq` step that points back at its parent, or a `branch`
 * recording two equally-short alternative routes to the same vertex.
 */
type SourceRoute = {type: 'source', vertex: number};
type SeqRoute = {type: 'seq', parent: Route, vertex: number, dist: number};
type BranchRoute = {type: 'branch', left: Route, right: Route};
type Route = SourceRoute | SeqRoute | BranchRoute;

/** Distances from a BFS source plus lazy path reconstructors (see shortestPaths). */
export interface ShortestPaths {
    distTo:   Int32Array
    nPathsTo: Int32Array
    precedes: boolean[]
    pathTo(end: number): number[]
    pathsTo(end: number): number[][]
    isPrecedingPathTo(end: number): boolean
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
export function shortestPaths(graph: number[][], start: number, limit: number, ordering: number[]): ShortestPaths {
    const n = graph.length;
    const distTo = new Int32Array(n).fill(MAX_INT);
    const precedes = new Array(n).fill(false);
    const routeTo: (Route | null)[] = new Array(n).fill(null);
    const nPathsTo = new Int32Array(n);

    distTo[start] = 0;
    precedes[start] = true;
    nPathsTo[start] = 1;
    routeTo[start] = {type: 'source', vertex: start};

    const queue = [start];
    let qLen = 1; // qLen method is faster than queue.shift() method (O(n))

    for (let i = 0; i < qLen; i++) {
        const v = queue[i];
        const dist = distTo[v] + 1;
        if (dist > limit) continue;

        // iterate through v neighbors
        for (let k = 0; k < graph[v].length; k++) {
            const w = graph[v][k];

            if (dist < distTo[w]) { // if shortest path append
                distTo[w] = dist;
                // each seq stores v (which vertex), dist (vertex distance from start), parent (route)
                routeTo[w] = {type:   'seq',
                    parent: routeTo[v]!,  // point at route to v and not v itself. necessary to walk backwards through the tree
                    vertex: w, dist:   dist};
                // Definition 4: check Vismara paper (is there a shortest path passing
                // only through vertices with π < π(r)?)
                precedes[w] = precedes[v] && ordering[w] < ordering[start];
                nPathsTo[w] = nPathsTo[v];
                queue[qLen++] = w;
            }
            else if (dist === distTo[w]) { // if same dist (alterantive path), keep this is part of Vismara algorithm
                // if respects pi priority  skip ties whose new path violates the π constraint
                if (!(precedes[v] && ordering[w] < ordering[start])) continue;

                const newSeq: Route = {type: 'seq', parent: routeTo[v]!, vertex: w, dist: dist};

                if (precedes[w]) {
                    // merge: w already had a low-π witness; record this as an alternative
                    routeTo[w] = {type: 'branch', left: routeTo[w]!, right: newSeq};
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
     * @param route route-tree node
     * @param len length of the path to allocate
     */
    function routeToPath(route: Route, len: number): number[] {
        if (!route) return [];
        const path = new Array(len);
        let cur: Route = route;
        while (cur) {
            if (cur.type === 'source') {
                path[0] = cur.vertex;
                break;
            }
            else if (cur.type === 'seq') {
                path[cur.dist] = cur.vertex;
                cur = cur.parent;
            }
            else {
                // branch: use left as first path
                cur = cur.left;
            }
        }
        return path;
    }

    /**
     * Walk a route tree backwards to all shortest paths (cartesian over branches).
     * @param route route-tree node
     * @param len length of each path to allocate
     */
    function routeToPaths(route: Route, len: number): number[][] {
        if (!route) return [];
        if (route.type === 'source') {
            const path = new Array(len);
            path[0] = route.vertex;
            return [path];
        }
        else if (route.type === 'seq') {
            const parentPaths = routeToPaths(route.parent, len);
            for (let j = 0; j < parentPaths.length; j++) {
                parentPaths[j][route.dist] = route.vertex;
            }
            return parentPaths;
        }
        else {
            // branch
            const leftPaths = routeToPaths(route.left, len);
            const rightPaths = routeToPaths(route.right, len);
            const combined = new Array(leftPaths.length + rightPaths.length);
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
            return routeToPath(routeTo[end]!, distTo[end] + 1);
        },
        pathsTo(end) {
            if (end < 0 || end >= n || !routeTo[end]) return [];
            return routeToPaths(routeTo[end]!, distTo[end] + 1);
        },
        isPrecedingPathTo(end) {
            return end >= 0 && end < n && precedes[end];
        },
    };
}

/**
 * Check if two paths from a common root only intersect at the root.
 * Paths are BFS shortest paths so vertex at index i is at distance i.
 * Used in Vismara;s Algorithm 1 Line 8
 * @param p first path
 * @param q second path
 */
function singletonIntersect(p: number[], q: number[]): boolean {
    const n = p.length;
    for (let i = 1; i < n; i++) {
        if (p[i] === q[i]) return false;
    }
    return true;
}

/**
 * Join two paths end-on-end for an odd cycle: pathToY forward, pathToZ reversed.
 * pathToY = [r, ..., y], pathToZ = [r, ..., z]
 * result = [r, ..., y, z, ..., r_neighbor] (closed by adjacency y-z)
 */
function joinOdd(pathToY: number[], pathToZ: number[]): number[] {
    const path = new Array(pathToY.length + pathToZ.length);
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
 */
function joinEven(pathToP: number[], y: number, pathToQ: number[]): number[] {
    const path = new Array(pathToP.length + 1 + pathToQ.length);
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
 * @param path vertex path where path[0] connects to path[last]
 * @param edgeIndex edge index map
 * @param nEdges total number of edges
 */
function pathToEdgeVector(path: number[], edgeIndex: Map<string, number>, nEdges: number): BitSet {
    const bs = new BitSet(nEdges);
    const len = path.length - 1;
    for (let i = 0; i < len; i++) {
        const u = path[i], v = path[i + 1];

        // normalize key = (u < v) ? "u,v" : "v,u" because edges are undirected,
        // so the algorithm might traverse (0, 9) or (9, 0) depending on which way around
        // the cycle you walk.
        //   Normalizing to lower-vertex-first guarantees both encodings hit the same bit
        const key = (u < v) ? u + ',' + v : v + ',' + u;
        bs.set(edgeIndex.get(key)!);
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
 * @param graph adjacency list
 */
function indexEdges(graph: number[][]): {toIndex: Map<string, number>, count: number} {
    const toIndex = new Map<string, number>();
    const n = graph.length;

    for (let v = 0; v < n; v++) {
        for (let k = 0; k < graph[v].length; k++) {
            const w = graph[v][k];
            if (w > v) {
                const key = v + ',' + w;
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
 * @param graph adjacency list
 * @returns ordering[v] = rank of vertex v
 */
export function computeOrdering(graph: number[][]): number[] {
    const n = graph.length;
    let maxDeg = 0;
    const order = new Array(n);

    // get max degree
    for (let i = 0; i < n; i++) {
        if (graph[i].length > maxDeg) maxDeg = graph[i].length;
    }
    // create buckets (one per degree)
    const buckets = new Array(maxDeg + 1);
    for (let d = 0; d <= maxDeg; d++) buckets[d] = [];

    // populate buckets
    for (let v = 0; v < n; v++) {
        buckets[graph[v].length].push(v);
    }
    let rank = 0;
    // rank
    for (let d = 0; d <= maxDeg; d++) {
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
 * @param graph adjacency list
 */
export function computeInitialCycles(graph: number[][]): {cycles: Map<number, Cycle[]>, edgeIndex: Map<string, number>, nEdges: number} {
    const n = graph.length;
    const ordering = computeOrdering(graph); // assign pi rank

    const s = new Array(n); // Set 'S' for collecting vertices adjacent to y
    // with distance to (z) + 1 ==== dist (y) (line 4)

    // cycles grouped by length
    const cycles = new Map<number, Cycle[]>();

    const {toIndex: edgeIndex, count: nEdges} = indexEdges(graph);

    const vertices = new Array(n);
    for (let v = 0; v < n; v++) {
        vertices[ordering[v]] = v;
    }

    function addCycle(path: number[]) {
        const edgeVector = pathToEdgeVector(path, edgeIndex, nEdges);
        const len = path.length - 1; // number of edges = cycle length
        let group = cycles.get(len);
        if (!group) {
            group = [];
            cycles.set(len, group);
        }
        group.push({path, edgeVector});
    }

    const first = 2; // smllest cycle is 3 vertices, we can skip first 2 ordered vertices

    for (let i = first; i < n; i++) { // for all vertices
        const r = vertices[i];
        // compute Vr (subset of shortest paths from vertex to r)
        // limit to n/2 is simply because the shortest path for any relevant cycle
        // can be at most n/2  (Vismara Lemma 2)
        const paths = shortestPaths(graph, r, Math.floor(n / 2), ordering);

        // for all y /in Vr do:
        for (let j = 0; j < i; j++) {
            const y = vertices[j];
            if (!paths.isPrecedingPathTo(y)) continue; // only those respecting pi order

            let sizeOfS = 0;

            // for all z in Vr...
            for (let k = 0; k < graph[y].length; k++) {
                const z = graph[y][k]; // ...such that z is adjacent to y (i.e. neighbor)
                if (!paths.isPrecedingPathTo(z)) continue;

                // if d(r,z) + d(z,y) = d(r,y) (line 6)
                // here we write d(z,y) instead of w(z,y) because weight is always 1 for our case
                const distToZ = paths.distTo[z];
                const distToY = paths.distTo[y];
                // d(z,y) = 1 because they are adjacent

                if (distToZ + 1 === distToY) {
                    s[sizeOfS++] = z;
                }
                // elseif d(r, z) != d(r, y) + d(z, y) and π(z) < π(y) and P(r, y) ∩ P(r, z) = {r}
                // Line 8
                else if (distToZ === distToY && ordering[z] < ordering[y]) {
                    const pathToY = paths.pathTo(y);
                    const pathToZ = paths.pathTo(z);
                    if (singletonIntersect(pathToZ, pathToY)) {
                        addCycle(joinOdd(pathToY, pathToZ));
                    }
                }
            }

            // Check pairs in s for even cycles
            for (let k = 0; k < sizeOfS; k++) {
                for (let l = k + 1; l < sizeOfS; l++) {
                    const pathToP = paths.pathTo(s[k]);
                    const pathToQ = paths.pathTo(s[l]);
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
    _n:       number;
    _max:     number;
    _rows:    BitSet[];
    _indices: Int32Array;
    _m:       number;

    /**
     * @param columns number of columns (edges)
     * @param maxRows maximum number of rows (cycles)
     */
    constructor(columns: number, maxRows: number) {
        this._n = columns;
        this._max = maxRows;
        this._rows = new Array(maxRows);
        this._indices = new Int32Array(maxRows);
        this._m = 0;
    }

    /** @param row a cycle's edge vector */
    add(row: BitSet) {
        this._rows[this._m] = row;
        // we need _indices to keep track after swaping rows
        // otherwise we cannot track if our added basis is eliminiated
        // or not
        this._indices[this._m] = this._m;
        this._m++;
    }

    /**
     * Swap rows i and j, tracking original indices.
     * @param i row index
     * @param j row index
     */
    swap(i: number, j: number) {
        const tmpRow = this._rows[i];
        const tmpIdx = this._indices[i];
        this._rows[i] = this._rows[j];
        this._indices[i] = this._indices[j];
        this._rows[j] = tmpRow;
        this._indices[j] = tmpIdx;
    }

    /**
     * Find current position of original row j.
     * @param j original row index
     */
    _rowIndex(j: number): number {
        for (let i = 0; i < this._m; i++) {
            if (this._indices[i] === j) return i;
        }
        return -1;
    }

    /**
     * Check if the row originally added at index j was eliminated to zero.
     * @param j original row index
     */
    eliminated(j: number): boolean {
        return this._rows[this._rowIndex(j)].isEmpty();
    }

    /**
     * Gaussian elimination over GF(2). Returns the rank.
     */
    eliminate(): number {
        return this._eliminate(0, 0);
    }

    /**
     * @param x column index
     * @param y row index
     * @returns rank
     */
    _eliminate(x: number, y: number): number {
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
export class GreedyBasis {
    _members:      Cycle[];
    _edgesOfBasis: BitSet;
    _nEdges:       number;

    /**
     * @param nEdges number of edges in the graph
     */
    constructor(nEdges: number) {
        this._members = [];
        this._edgesOfBasis = new BitSet(nEdges);
        this._nEdges = nEdges;
    }

    /** @param cycle a cycle to add to the basis */
    add(cycle: Cycle) {
        this._members.push(cycle);
        // Add what edges are covered by the basis so far
        this._edgesOfBasis.orWith(cycle.edgeVector); // orWith is a union
    }

    members(): Cycle[] {
        return this._members;
    }

    size(): number {
        return this._members.length;
    }

    /**
     * Check whether all edges of the cycle are already covered by the basis.
     * @param cycle candidate cycle
     */
    isSubsetOfBasis(cycle: Cycle): boolean {
        // c.edges subset of edgesOfBasis? single pass with early-exit, no allocation.
        return cycle.edgeVector.isSubsetOf(this._edgesOfBasis);
    }

    /**
     * Full independence check via GF(2) Gaussian elimination.
     * @param candidate candidate cycle
     */
    isIndependent(candidate: Cycle): boolean {
        // cheap path
        // if the candidate has any edge outside union, it cannot possibly be
        // a XOR  (addition) of basis cycles (because XOR can never invent an edge that none of the basis has)
        // So it's independent - faster than doing the full GF(2) eliminitatino which requires building the matrix etc.

        if (this._members.length === 0 || !this.isSubsetOfBasis(candidate)) {
            return true;
        }

        // expensive path, check via GF(2)
        const matrix = new BitMatrix(this._nEdges, this._members.length + 1);
        for (let i = 0; i < this._members.length; i++) {
            matrix.add(this._members[i].edgeVector.clone());
        }
        matrix.add(candidate.edgeVector.clone());
        matrix.eliminate();
        // After eliminate(), check whether the row originally added at index members.length got removed
        // If it did, candidate is dependent. If not, independent.

        return !matrix.eliminated(this._members.length); // check last row
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
 * @param adjList adjacency list (adjList[v] = array of neighbor vertex indices)
 * @returns array of cycles, each cycle is a closed vertex path [v0, v1, ..., vn, v0]
 */
export function minimumCycleBasis(adjList: number[][]): number[][] {
    // MCB ("smallest set of smallest rings", SSSR):
    // give me ANY linearly independent set of nSssr = E - V + 1 cycles,
    // picked greedily by length. arbitrary ties are broken by input order.

    const n = adjList.length;
    if (n < 3) return []; // minimum cycle is 3

    const {cycles: initialCycles, nEdges} = computeInitialCycles(adjList);
    const basis = new GreedyBasis(nEdges);

    // Compute the expected number of independent cycles
    const nSssr = nEdges - n + 1;
    // patching nSssr for disconnected graphs (is done in SSSR.js)
    // this assumes connected graph,
    // for a graph with C connected components its nEdges - n + C

    // sort initialCycles by lengths in ascending order (shortest cycles first)
    const sortedCycles = [...initialCycles.keys()].sort((a, b) => a - b);

    for (let li = 0; li < sortedCycles.length; li++) {
        const group = initialCycles.get(sortedCycles[li])!;

        for (let ci = 0; ci < group.length; ci++) {
            if (basis.size() >= nSssr)
                break;
            if (basis.isIndependent(group[ci])) {
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
 * @param adjList adjacency list
 * @returns array of cycles, each cycle is a closed vertex path [v0, v1, ..., vn, v0]
 */
export function relevantCycles(adjList: number[][]): number[][] {
    // RC ("relevant cycles"):
    // give me the UNION of all MCBs i.e. every cycle that some MCB
    // could legitimately have chosen. always unique, always a superset
    // of any single MCB.

    const n = adjList.length;
    if (n < 3) return []; // minimum cycle is 3

    const {cycles: initialCycles, nEdges} = computeInitialCycles(adjList);
    const basis = new GreedyBasis(nEdges);

    // accumulate the relevant cycles separately;
    const relevant: number[][] = [];

    // sort initialCycles by lengths in ascending order (shortest cycles first).
    // RC, like MCB, is greedy in length
    const sortedCycles = [...initialCycles.keys()].sort((a, b) => a - b);

    // process one length class at a time. the key invariant: when we test a
    // cycle C of length L, the basis must contain ONLY cycles strictly shorter
    // than L. that is what makes "independent" mean "not a sum of strictly
    // shorter cycles"  which is the definition of relevant. see vismara
    for (let li = 0; li < sortedCycles.length; li++) {
        const group = initialCycles.get(sortedCycles[li])!;

        // pending = the cycles of THIS length that turn out to be relevant.
        // we collect them all before touching the basis, because we do NOT
        // want adding the first relevant cycle of length L to disqualify a
        // sibling cycle of the same length L. equal-length cycles can be
        // pairwise dependent on each other modulo shorter cycles, and RC
        // keeps them all (this is exactly where RC differs from MCB
        // MCB picks one while RC keeps both).
        const pending: Cycle[] = [];

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
 * @param matrix square adjacency matrix
 * @returns adjacency list
 */
export function matrixToAdjList(matrix: number[][]): number[][] {
    const n = matrix.length;
    const adj: number[][] = new Array(n);
    for (let i = 0; i < n; i++) {
        adj[i] = [];
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) adj[i].push(j);
        }
    }
    return adj;
}
