// An example of what computeOrdering is supposed to be doing: 
// let this graph be the example
//     0
//    / \
//   1----─2
//   |   |
//   3----─4

// graph = [[1,2], [0,2,3], [0,1,4], [1,4], [2,3]] adjacency list 
// degrees: [2, 3, 3, 2, 2] (i.e number of bonds)
// ordering = [0, 3, 4, 1, 2]  (output: rank (π))
// first assign rank to the ones with lower degree (0, 3 and 4)
// then assign rank by index number  (lower first) 0 -> 0; 3 -> 1; 4 -> 2
// follow with vertex with higher degree (vertex 1 and 2)
// assign rank again by index order (1 -> 3; 2 -> 4)
// result vertex 0,1,2,3,4 get rank (0, 3, 4, 1, 2)
import {describe, it, expect} from 'vitest';
  import {computeOrdering, shortestPaths, computeInitialCycles, BitMatrix, GreedyBasis, minimumCycleBasis, relevantCycles} from '../../src/CycleBasis.js';
  import BitSet from '../../src/CycleBasis.js';

  // Small helper: build a BitSet of the given size with the listed bits set.
  function bits(size, indices) {
      let b = new BitSet(size);
      for (let i of indices) b.set(i);
      return b;
  }
  // Small helper: build a {path, edgeVector} cycle object for GreedyBasis.
  function cycle(nEdges, edgeIndices, path = []) {
      return {path, edgeVector: bits(nEdges, edgeIndices)};
  }

  describe('computeOrdering', () => {
      it('single edge', () => {
          expect(computeOrdering([[1], [0]])).toEqual([0, 1]);
      });
      it('path of 4', () => {
          expect(computeOrdering([[1], [0,2], [1,3], [2]])).toEqual([0, 2, 3, 1]);
      });
      it('triangle (all tied)', () => {
          expect(computeOrdering([[1,2], [0,2], [0,1]])).toEqual([0, 1, 2]);
      });
      it('T-shape', () => {
          expect(computeOrdering([[1], [0,2,3], [1], [1]])).toEqual([0, 3, 1, 2]);
      });
      it('kite', () => {
          expect(computeOrdering([[1,2], [0,2,3], [0,1,4], [1,4], [2,3]]))
              .toEqual([0, 3, 4, 1, 2]);
      });
  });

  // BitSet 
  // These exercise the operations Vismara's pipeline relies on: set/get for
  // edge-vector construction, xor for GF(2) addition (symmetric difference of
  // cycles), and cardinality for "edges in this cycle" counts.

  describe('BitSet', () => {
      it('constructor with size 0 allocates no words (no 512 MB trap)', () => {
          let b = new BitSet(0);
          expect(b.size).toBe(0);
          expect(b.words.length).toBe(0);
      });

      it('set / get round-trips across word boundary', () => {
          let b = new BitSet(64);
          b.set(0); b.set(31); b.set(32); b.set(63);
          expect(b.get(0)).toBe(true);
          expect(b.get(31)).toBe(true);
          expect(b.get(32)).toBe(true);
          expect(b.get(63)).toBe(true);
          expect(b.get(1)).toBe(false);
          expect(b.get(30)).toBe(false);
          expect(b.get(33)).toBe(false);
      });

      it('xor cancels shared bits (A xor A = empty)', () => {
          let a = new BitSet(11);
          a.set(2); a.set(5); a.set(9);
          let r = a.xor(a);
          expect(r.isEmpty()).toBe(true);
          expect(r.cardinality()).toBe(0);
      });

      it('xor of two cycles = symmetric difference (cycle-space addition)', () => {
          // Two triangles sharing edge bit 0:
          // A = {0, 1, 2}, B = {0, 3, 4}  ->   A xor B = {1, 2, 3, 4}
          let a = new BitSet(5);
          a.set(0); a.set(1); a.set(2);
          let b = new BitSet(5);
          b.set(0); b.set(3); b.set(4);
          let r = a.xor(b);
          expect(r.get(0)).toBe(false);
          expect(r.get(1)).toBe(true);
          expect(r.get(2)).toBe(true);
          expect(r.get(3)).toBe(true);
          expect(r.get(4)).toBe(true);
          expect(r.cardinality()).toBe(4);
      });

      it('and isolates the shared edges between two cycles', () => {
          let a = new BitSet(5);
          a.set(0); a.set(1); a.set(2);
          let b = new BitSet(5);
          b.set(0); b.set(2); b.set(4);
          let r = a.and(b);
          expect(r.get(0)).toBe(true);
          expect(r.get(1)).toBe(false);
          expect(r.get(2)).toBe(true);
          expect(r.cardinality()).toBe(2);
      });

      it('orWith mutates in place; or returns a fresh set', () => {
          let a = new BitSet(8);
          a.set(0); a.set(2);
          let b = new BitSet(8);
          b.set(2); b.set(7);

          let fresh = a.or(b);
          expect(fresh.cardinality()).toBe(3);
          // a unchanged by `or`
          expect(a.cardinality()).toBe(2);

          a.orWith(b);
          expect(a.cardinality()).toBe(3);
          expect(a.get(7)).toBe(true);
      });

      it('clone is a deep copy (mutation does not leak)', () => {
          let a = new BitSet(8);
          a.set(3);
          let c = a.clone();
          c.set(5);
          expect(a.get(5)).toBe(false);
          expect(c.get(5)).toBe(true);
          expect(c.get(3)).toBe(true);
      });

      it('cardinality counts set bits (Brian Kernighan loop)', () => {
          let b = new BitSet(64);
          for (let i = 0; i < 64; i += 2) b.set(i);
          expect(b.cardinality()).toBe(32);
      });

      it('isEmpty / length on empty and on highest-bit-only', () => {
          let e = new BitSet(64);
          expect(e.isEmpty()).toBe(true);
          expect(e.length()).toBe(0);

          let b = new BitSet(64);
          b.set(40);
          expect(b.isEmpty()).toBe(false);
          expect(b.length()).toBe(41); // highest set bit + 1
      });

      it('binary ops throw on size mismatch (SIZE NOTE contract enforced)', () => {
          // Two BitSets with different bit lengths but identical word counts:
          // both round up to 2 words, yet mixing them is still a coordinate
          // mismatch. The assertion compares bit length, not word count.
          let a = new BitSet(33);
          let b = new BitSet(64);

          expect(() => a.xor(b)).toThrow(/size mismatch/);
          expect(() => a.and(b)).toThrow(/size mismatch/);
          expect(() => a.or(b)).toThrow(/size mismatch/);
          expect(() => a.orWith(b)).toThrow(/size mismatch/);

          // And the obvious case: clearly-different sizes also throw.
          let small = new BitSet(8);
          let big = new BitSet(16);
          expect(() => small.xor(big)).toThrow(/BitSet\.xor/);
      });
  });

  // shortestPaths 
  // Verifies that Vismara's V_r (Definition 4) is correctly captured by
  // `isPrecedingPathTo`, and that distTo / pathTo agree with hand-computed
  // distances on small molecular graphs.

  describe('shortestPaths', () => {
      it('cyclohexane: BFS distances and antipode has two shortest paths', () => {
          // 0–1–2–3–4–5–0 (6-ring), identity ordering
          let g = [[1,5],[0,2],[1,3],[2,4],[3,5],[4,0]];
          let order = computeOrdering(g); // identity (all degree 2)
          // Use r = 5 (the highest π-rank). From vertex 0 the π-preceding
          // branch in `shortestPaths` never fires (nothing has a smaller rank),
          // so alternate shortest paths are intentionally not collected.
          // From r = 5, both halves of the ring use preceding vertices.
          let p = shortestPaths(g, 5, 6, order);
          expect(Array.from(p.distTo)).toEqual([1, 2, 3, 2, 1, 0]);
          // Vertex 2 is the antipode — two equal-length π-respecting paths from 5
          expect(p.nPathsTo[2]).toBe(2);
          let allPaths = p.pathsTo(2);
          expect(allPaths.length).toBe(2);
          // Both paths start at 5 and end at 2
          for (let path of allPaths) {
              expect(path[0]).toBe(5);
              expect(path[path.length - 1]).toBe(2);
              expect(path.length).toBe(4);
          }
      });

      it('isPrecedingPathTo: V_4 in naphthalene excludes 0 and 8', () => {
              // Naphthalene drawn as two fused 6-rings sharing edge (4,9):
              //  1 - 2
              // /    \
              // 0     3
              // |     |
              // 9 --- 4
              // |     |
              // 8     5
              //  \   /
              //   7-6
          let g = [
              [1, 9],     // 0
              [0, 2],     // 1
              [1, 3],     // 2
              [2, 4],     // 3
              [3, 5, 9],  // 4   degree 3
              [4, 6],     // 5
              [5, 7],     // 6
              [6, 8],     // 7
              [7, 9],     // 8
              [0, 4, 8],  // 9   degree 3
          ];
          let order = computeOrdering(g);
          // Vertices 4 and 9 are the only degree-3 vertices, so they receive
          // the highest π-ranks (8 and 9 respectively).
          expect(order[4]).toBeGreaterThanOrEqual(8);
          expect(order[9]).toBeGreaterThanOrEqual(8);

          let p = shortestPaths(g, 4, 5, order);
          // V_4 = {1,2,3,5,6,7}; vertices 0 and 8 are reachable in G only via
          // the bridgehead 9, which does NOT precede 4 in π.
          expect(p.isPrecedingPathTo(0)).toBe(false);
          expect(p.isPrecedingPathTo(8)).toBe(false);
          // The π-respecting members of V_4
          for (let v of [1, 2, 3, 5, 6, 7]) {
              expect(p.isPrecedingPathTo(v)).toBe(true);
          }
      });
  });

  // computeInitialCycles (Vismara Algorithm 1)
  // Smoke tests on three molecules that exercise distinct branches of the
  // algorithm:
  //   - cyclopentane  -> 1 ODD cycle (line 9)
  //   - cyclohexane   -> 1 EVEN cycle (line 13)
  //   - naphthalene   -> 2 EVEN cycles, both emitted from the π-greatest vertex

  describe('computeInitialCycles', () => {
      it('cyclopentane emits exactly one length-5 odd cycle', () => {
          // 0–1–2–3–4–0  (5-ring)
          let g = [[1,4],[0,2],[1,3],[2,4],[0,3]];
          let {cycles, nEdges} = computeInitialCycles(g);
          expect(nEdges).toBe(5);
          // Only key in the map should be 5 (cycle length)
          expect([...cycles.keys()]).toEqual([5]);
          let group = /** @type {NonNullable<ReturnType<typeof cycles.get>>} */ (cycles.get(5));
          expect(group.length).toBe(1);
          // The cycle's edge-vector should mark all 5 edges
          expect(group[0].edgeVector.cardinality()).toBe(5);
          // Closed-path convention: first === last
          let path = group[0].path;
          expect(path[0]).toBe(path[path.length - 1]);
          expect(path.length).toBe(6); // 5 edges = 6 vertices including duplicate
      });

      it('cyclohexane emits exactly one length-6 even cycle', () => {
          // 0–1–2–3–4–5–0  (6-ring)
          let g = [[1,5],[0,2],[1,3],[2,4],[3,5],[4,0]];
          let {cycles, nEdges} = computeInitialCycles(g);
          expect(nEdges).toBe(6);
          expect([...cycles.keys()]).toEqual([6]);
          let group = /** @type {NonNullable<ReturnType<typeof cycles.get>>} */ (cycles.get(6));
          expect(group.length).toBe(1);
          expect(group[0].edgeVector.cardinality()).toBe(6);
      });

      it('naphthalene emits exactly two length-6 even cycles (and no perimeter)', () => {
          // Same naphthalene adjacency as the shortestPaths test
          let g = [
              [1, 9], [0, 2], [1, 3], [2, 4],
              [3, 5, 9], [4, 6], [5, 7], [6, 8],
              [7, 9], [0, 4, 8],
          ];
          let {cycles, nEdges} = computeInitialCycles(g);
          expect(nEdges).toBe(11);
          // The two 6-rings are the only relevant cycles; the 10-edge perimeter
          // is the *sum* of the two rings (not a shortest cycle), so Vismara
          // does NOT emit it as a prototype.
          expect([...cycles.keys()]).toEqual([6]);
          let group = /** @type {NonNullable<ReturnType<typeof cycles.get>>} */ (cycles.get(6));
          expect(group.length).toBe(2);
          for (let c of group) {
              expect(c.edgeVector.cardinality()).toBe(6);
              // Each ring uses 6 distinct vertices + duplicated endpoint
              expect(c.path.length).toBe(7);
              expect(c.path[0]).toBe(c.path[6]);
          }
          // The two rings must use DIFFERENT edge sets (they share only the
          // bridge edge 4-9, so XOR should give the 10-edge perimeter).
          let xor = group[0].edgeVector.xor(group[1].edgeVector);
          expect(xor.cardinality()).toBe(10);
      });
  });

  // BitMatrix
  // GF(2) Gaussian elimination over BitSet rows. The fused-triangles graph
  //
  //     0 ----─ 1
  //     │ \   │
  //     │  \  │
  //     2 ---- 3
  //   edges: e0=(0,1), e1=(0,2), e2=(0,3), e3=(1,3), e4=(2,3)
  //
  // gives three cycles whose edge bitvectors satisfy c1 ^ c2 = c3:
  //   c1 = triangle 0-1-3-0   → 1 0 1 1 0
  //   c2 = triangle 0-2-3-0   → 0 1 1 0 1
  //   c3 = outer 0-1-3-2-0    → 1 1 0 1 1   (= c1 ^ c2)
  // We use these throughout the BitMatrix and GreedyBasis tests below.

  describe('BitMatrix', () => {
      it('empty matrix → rank 0', () => {
          let m = new BitMatrix(5, 0);
          expect(m.eliminate()).toBe(0);
      });

      it('single nonzero row is its own pivot (rank 1, not eliminated)', () => {
          let m = new BitMatrix(5, 1);
          m.add(bits(5, [0, 2]));
          expect(m.eliminate()).toBe(1);
          expect(m.eliminated(0)).toBe(false);
      });

      it('single all-zero row contributes no pivot (rank 0, eliminated)', () => {
          let m = new BitMatrix(5, 1);
          m.add(new BitSet(5));
          expect(m.eliminate()).toBe(0);
          expect(m.eliminated(0)).toBe(true);
      });

      it('two identical rows → rank 1, the LATER-added row is eliminated', () => {
          let m = new BitMatrix(5, 2);
          m.add(bits(5, [0, 1, 2]));
          m.add(bits(5, [0, 1, 2]));
          expect(m.eliminate()).toBe(1);
          expect(m.eliminated(0)).toBe(false);
          expect(m.eliminated(1)).toBe(true);
      });

      it('two independent rows → rank 2, neither eliminated', () => {
          let m = new BitMatrix(5, 2);
          m.add(bits(5, [0, 1]));
          m.add(bits(5, [2, 3]));
          expect(m.eliminate()).toBe(2);
          expect(m.eliminated(0)).toBe(false);
          expect(m.eliminated(1)).toBe(false);
      });

      it('pivot column needs a row swap (first row has zero in column 0)', () => {
          // row 0: 0 1 1 0 0     row 1: 1 0 1 0 0
          // pivot search at x=0,y=0 must skip row 0 and pick row 1, then swap.
          let m = new BitMatrix(5, 2);
          m.add(bits(5, [1, 2]));
          m.add(bits(5, [0, 2]));
          expect(m.eliminate()).toBe(2);
          expect(m.eliminated(0)).toBe(false);
          expect(m.eliminated(1)).toBe(false);
      });

      it('fused triangles in order [c1, c2, c3]: rank 2, c3 is the eliminated row', () => {
          let m = new BitMatrix(5, 3);
          m.add(bits(5, [0, 2, 3]));   // c1, j=0
          m.add(bits(5, [1, 2, 4]));   // c2, j=1
          m.add(bits(5, [0, 1, 3, 4]));// c3 = c1 ^ c2, j=2
          expect(m.eliminate()).toBe(2);
          expect(m.eliminated(0)).toBe(false);
          expect(m.eliminated(1)).toBe(false);
          expect(m.eliminated(2)).toBe(true);
      });

      it('fused triangles in order [c3, c1, c2]: rank 2, but it is c2 (j=2) that gets eliminated', () => {
          // The dependent row is whichever was added LAST among a dependent
          // set, because XOR-into-rows-below only ever combines into later
          // rows. This is the property GreedyBasis relies on.
          let m = new BitMatrix(5, 3);
          m.add(bits(5, [0, 1, 3, 4]));// c3, j=0
          m.add(bits(5, [0, 2, 3]));   // c1, j=1
          m.add(bits(5, [1, 2, 4]));   // c2, j=2
          expect(m.eliminate()).toBe(2);
          expect(m.eliminated(0)).toBe(false);
          expect(m.eliminated(1)).toBe(false);
          expect(m.eliminated(2)).toBe(true);
      });

      it('three identical rows: only the first survives, j=1 and j=2 are eliminated', () => {
          // Stresses that _indices keeps the original-row labels straight even
          // when multiple rows collapse to zero.
          let m = new BitMatrix(5, 3);
          m.add(bits(5, [0, 2]));
          m.add(bits(5, [0, 2]));
          m.add(bits(5, [0, 2]));
          expect(m.eliminate()).toBe(1);
          expect(m.eliminated(0)).toBe(false);
          expect(m.eliminated(1)).toBe(true);
          expect(m.eliminated(2)).toBe(true);
      });

      it('swap() preserves the original-index labels', () => {
          // After swap, _rowIndex must still find each original j correctly.
          let m = new BitMatrix(5, 2);
          let r0 = bits(5, [0, 1]);
          let r1 = bits(5, [2, 3]);
          m.add(r0);
          m.add(r1);
          m.swap(0, 1);
          // The row originally at j=0 is now at position 1, and vice versa.
          expect(m._rowIndex(0)).toBe(1);
          expect(m._rowIndex(1)).toBe(0);
          // And eliminated() still answers correctly (neither row is empty).
          expect(m.eliminated(0)).toBe(false);
          expect(m.eliminated(1)).toBe(false);
      });
  });

  // GreedyBasis
  // The driver-facing data structure: accepted cycles + the running OR of
  // their edge vectors (for the cheap-path subset check) + the GF(2)
  // elimination check (for the expensive path).

  describe('GreedyBasis', () => {
      it('empty basis: any cycle is independent (cheap path on empty members)', () => {
          let b = new GreedyBasis(5);
          expect(b.size()).toBe(0);
          expect(b.isIndependent(cycle(5, [0, 2, 3]))).toBe(true);
      });

      it('add() updates size, members, and the running edge union', () => {
          let b = new GreedyBasis(5);
          let c1 = cycle(5, [0, 2, 3]);
          b.add(c1);
          expect(b.size()).toBe(1);
          expect(b.members()[0]).toBe(c1);
          // The running union is queryable via isSubsetOfBasis: c1 itself is
          // trivially a subset of the basis-edge-union after adding it.
          expect(b.isSubsetOfBasis(c1)).toBe(true);
      });

      it('isSubsetOfBasis: true only when every edge is in the basis union', () => {
          let b = new GreedyBasis(5);
          b.add(cycle(5, [0, 2, 3]));     // basis edges: {0, 2, 3}

          // Same edges → subset
          expect(b.isSubsetOfBasis(cycle(5, [0, 2, 3]))).toBe(true);
          // Strict subset of the basis edges → still subset
          expect(b.isSubsetOfBasis(cycle(5, [0, 3]))).toBe(true);
          // Has edge 4 (not in basis) → NOT a subset
          expect(b.isSubsetOfBasis(cycle(5, [0, 2, 4]))).toBe(false);
          // Disjoint edge sets → NOT a subset
          expect(b.isSubsetOfBasis(cycle(5, [1, 4]))).toBe(false);
      });

      it('cheap path: cycle with a brand-new edge is independent without running GF(2)', () => {
          // We can't observe "without GF(2)" directly, but we can verify the
          // logical invariant: a cycle whose edges are not a subset of the
          // basis-edge-union must be independent.
          let b = new GreedyBasis(5);
          b.add(cycle(5, [0, 2, 3]));     // basis edges: {0, 2, 3}
          let candidate = cycle(5, [1, 4]); // edges {1, 4} disjoint from basis
          expect(b.isSubsetOfBasis(candidate)).toBe(false);
          expect(b.isIndependent(candidate)).toBe(true);
      });

      it('fused triangles: c1 and c2 are independent, then c3 = c1 ^ c2 is dependent', () => {
          let b = new GreedyBasis(5);
          let c1 = cycle(5, [0, 2, 3]);    // 1 0 1 1 0
          let c2 = cycle(5, [1, 2, 4]);    // 0 1 1 0 1
          let c3 = cycle(5, [0, 1, 3, 4]); // 1 1 0 1 1   = c1 ^ c2

          expect(b.isIndependent(c1)).toBe(true);
          b.add(c1);
          expect(b.isIndependent(c2)).toBe(true);
          b.add(c2);
          // c3's edges are all already in the basis edge union (e0..e4 all
          // present after adding c1 and c2), so this must take the EXPENSIVE
          // path through GF(2) elimination — which correctly rejects it.
          expect(b.isSubsetOfBasis(c3)).toBe(true);
          expect(b.isIndependent(c3)).toBe(false);
      });

      it('order does not matter: adding {c2, c1} also makes c3 dependent', () => {
          let b = new GreedyBasis(5);
          b.add(cycle(5, [1, 2, 4]));      // c2 first
          b.add(cycle(5, [0, 2, 3]));      // c1 second
          let c3 = cycle(5, [0, 1, 3, 4]);
          expect(b.isIndependent(c3)).toBe(false);
      });

      it('adding the same cycle twice: the duplicate is dependent', () => {
          let b = new GreedyBasis(5);
          let c = cycle(5, [0, 2, 3]);
          b.add(c);
          // A different object but the same edge vector
          let same = cycle(5, [0, 2, 3]);
          expect(b.isIndependent(same)).toBe(false);
      });

      it('three-cycle cubelike: dependent triple where any one is XOR of the other two', () => {
          // a = {0,1}, b = {1,2}, c = {0,2}.  a ^ b ^ c = empty.
          // After {a, b}, c is dependent (= a ^ b).
          let b = new GreedyBasis(3);
          b.add(cycle(3, [0, 1]));
          b.add(cycle(3, [1, 2]));
          let c = cycle(3, [0, 2]);
          expect(b.isSubsetOfBasis(c)).toBe(true); // edges {0,2} all covered
          expect(b.isIndependent(c)).toBe(false);
      });

      it('basis grows correctly under a driver-style loop', () => {
          // Mirrors the real minimumCycleBasis driver: shortest-first, add
          // each independent candidate, stop at nSssr = E - V + 1.
          let basis = new GreedyBasis(5);
          let nSssr = 2;
          let candidates = [
              cycle(5, [0, 2, 3]),     // c1, length 3
              cycle(5, [1, 2, 4]),     // c2, length 3
              cycle(5, [0, 1, 3, 4]),  // c3, length 4 — dependent on {c1, c2}
          ];
          for (let c of candidates) {
              if (basis.size() >= nSssr) break;
              if (basis.isIndependent(c)) basis.add(c);
          }
          expect(basis.size()).toBe(2);
          expect(basis.members()[0].edgeVector.cardinality()).toBe(3);
          expect(basis.members()[1].edgeVector.cardinality()).toBe(3);
      });
  });

  // ----------------------------------------------------------------------------------------------------------------------------------------------------─
  // Fixtures for public API tests
  //
  // We assert MCB by INVARIANT (count + cycle lengths) since multiple valid
  // bases exist for any non-trivial graph; only RC is unique by definition.
  // ----------------------------------------------------------------------------------------------------------------------------------------------------─

  // triangle: 3 vertices, 3 edges, nSssr = 1
  const TRIANGLE = [[1,2], [0,2], [0,1]];

  // naphthalene-like: two 6-rings sharing edge 0-1, nSssr = 2
  //   2-3-4-1-0-5  and  6-7-8-1-0-9
  const NAPHTHALENE = [
      [1,5,9],   // 0
      [0,4,8],   // 1
      [3,5],     // 2
      [2,4],     // 3
      [1,3],     // 4
      [0,2],     // 5
      [7,9],     // 6
      [6,8],     // 7
      [1,7],     // 8
      [0,6],     // 9
  ];

  // norbornane (bicyclo[2.2.1]heptane): bridgeheads 0,1; bridges of len 2,2,1
  // V=7 E=8 nSssr=2. Two 5-rings; 6-ring is XOR of them but excluded from RC
  // because it is a longer sum.
  const NORBORNANE = [
      [2,4,6], // 0
      [3,5,6], // 1
      [0,3],   // 2
      [1,2],   // 3
      [0,5],   // 4
      [1,4],   // 5
      [0,1],   // 6
  ];

  // cubane: V=8 E=12 nSssr=5; six 4-membered faces, one is XOR of the others
  const CUBANE = [
      [1,3,4],   // 0
      [0,2,5],   // 1
      [1,3,6],   // 2
      [0,2,7],   // 3
      [0,5,7],   // 4
      [1,4,6],   // 5
      [2,5,7],   // 6
      [3,4,6],   // 7
  ];

  // bicyclo[2.2.2]octane: two bridgeheads (0,1) connected by three 2-atom
  // bridges. V=8 E=9 nSssr=2. Three 6-rings, all pairwise dependent.
  const BICYCLO222 = [
      [2,4,6], // 0
      [3,5,7], // 1
      [0,3],   // 2
      [1,2],   // 3
      [0,5],   // 4
      [1,4],   // 5
      [0,7],   // 6
      [1,6],   // 7
  ];

  // K4 (complete graph on 4 vertices): V=4 E=6 nSssr=3; four 3-faces
  const K4 = [[1,2,3], [0,2,3], [0,1,3], [0,1,2]];

  // helper: count edges in an adjacency list (each edge appears twice)
  function edgeCount(adj) {
      let e = 0;
      for (let v = 0; v < adj.length; v++) e += adj[v].length;
      return e / 2;
  }

  // helper: build the multiset of cycle lengths from a result array.
  // Each path is [v0, ..., vn, v0], so length = path.length - 1.
  function lengthsOf(cycles) {
      return cycles.map(p => p.length - 1).sort((a,b) => a - b);
  }

  describe('minimumCycleBasis', () => {
      it('returns [] for empty graph', () => {
          expect(minimumCycleBasis([])).toEqual([]);
      });

      it('returns [] for n < 3 (single edge)', () => {
          expect(minimumCycleBasis([[1], [0]])).toEqual([]);
      });

      it('returns [] for an acyclic path', () => {
          // 0 - 1 - 2 - 3, no cycles
          expect(minimumCycleBasis([[1], [0,2], [1,3], [2]])).toEqual([]);
      });

      it('triangle: 1 cycle of length 3', () => {
          let mcb = minimumCycleBasis(TRIANGLE);
          expect(mcb).toHaveLength(1);
          expect(lengthsOf(mcb)).toEqual([3]);
      });

      it('naphthalene: 2 cycles of length 6', () => {
          let mcb = minimumCycleBasis(NAPHTHALENE);
          expect(mcb).toHaveLength(2);
          expect(lengthsOf(mcb)).toEqual([6, 6]);
      });

      it('norbornane: 2 cycles, both length 5 (not the 6-ring)', () => {
          let mcb = minimumCycleBasis(NORBORNANE);
          expect(mcb).toHaveLength(2);
          expect(lengthsOf(mcb)).toEqual([5, 5]);
      });

      it('cubane: 5 cycles, all length 4', () => {
          let mcb = minimumCycleBasis(CUBANE);
          expect(mcb).toHaveLength(5);
          expect(lengthsOf(mcb)).toEqual([4, 4, 4, 4, 4]);
      });

      it('bicyclo[2.2.2]octane: 2 cycles, both length 6', () => {
          let mcb = minimumCycleBasis(BICYCLO222);
          expect(mcb).toHaveLength(2);
          expect(lengthsOf(mcb)).toEqual([6, 6]);
      });

      it('K4: 3 triangles', () => {
          let mcb = minimumCycleBasis(K4);
          expect(mcb).toHaveLength(3);
          expect(lengthsOf(mcb)).toEqual([3, 3, 3]);
      });

      it('cyclomatic invariant: |MCB| === E - V + 1 (connected graphs)', () => {
          for (let g of [TRIANGLE, NAPHTHALENE, NORBORNANE, CUBANE, BICYCLO222, K4]) {
              let nSssr = edgeCount(g) - g.length + 1;
              expect(minimumCycleBasis(g)).toHaveLength(nSssr);
          }
      });

      it('every returned path is closed (path[0] === path[-1])', () => {
          for (let g of [TRIANGLE, NAPHTHALENE, CUBANE, K4]) {
              for (let p of minimumCycleBasis(g)) {
                  expect(p[0]).toBe(p[p.length - 1]);
              }
          }
      });
  });

  describe('relevantCycles', () => {
      it('returns [] for empty graph', () => {
          expect(relevantCycles([])).toEqual([]);
      });

      it('returns [] for n < 3 (single edge)', () => {
          expect(relevantCycles([[1], [0]])).toEqual([]);
      });

      it('returns [] for an acyclic path', () => {
          expect(relevantCycles([[1], [0,2], [1,3], [2]])).toEqual([]);
      });

      // Equality cases: nothing dependent at equal length, so RC == MCB.
      it('triangle: RC == MCB == 1 cycle', () => {
          expect(relevantCycles(TRIANGLE)).toHaveLength(1);
      });

      it('naphthalene: RC == MCB == 2 cycles of length 6', () => {
          let rc = relevantCycles(NAPHTHALENE);
          expect(rc).toHaveLength(2);
          expect(lengthsOf(rc)).toEqual([6, 6]);
      });

      it('norbornane: RC == MCB == 2 (the 6-ring is excluded — it is a longer XOR-sum)', () => {
          let rc = relevantCycles(NORBORNANE);
          expect(rc).toHaveLength(2);
          expect(lengthsOf(rc)).toEqual([5, 5]);
      });

      // Strict inequality cases: equal-length cycles pairwise dependent.
      it('cubane: RC has 6 four-rings (one more than MCB)', () => {
          let rc = relevantCycles(CUBANE);
          expect(rc).toHaveLength(6);
          expect(lengthsOf(rc)).toEqual([4, 4, 4, 4, 4, 4]);
      });

      it('bicyclo[2.2.2]octane: RC has 3 six-rings (one more than MCB)', () => {
          let rc = relevantCycles(BICYCLO222);
          expect(rc).toHaveLength(3);
          expect(lengthsOf(rc)).toEqual([6, 6, 6]);
      });

      it('K4: RC has 4 triangles (one more than MCB)', () => {
          let rc = relevantCycles(K4);
          expect(rc).toHaveLength(4);
          expect(lengthsOf(rc)).toEqual([3, 3, 3, 3]);
      });

      it('determinism: two calls return the same paths in the same order', () => {
          // RC is unique as a SET; this implementation also produces the same
          // ordering on repeated calls (no Math.random, no Set iteration).
          for (let g of [CUBANE, BICYCLO222, K4]) {
              expect(relevantCycles(g)).toEqual(relevantCycles(g));
          }
      });

      it('RC is a superset of MCB by cardinality (|RC| >= |MCB|)', () => {
          for (let g of [TRIANGLE, NAPHTHALENE, NORBORNANE, CUBANE, BICYCLO222, K4]) {
              expect(relevantCycles(g).length).toBeGreaterThanOrEqual(minimumCycleBasis(g).length);
          }
      });

      it('every returned path is closed (path[0] === path[-1])', () => {
          for (let g of [TRIANGLE, CUBANE, K4]) {
              for (let p of relevantCycles(g)) {
                  expect(p[0]).toBe(p[p.length - 1]);
              }
          }
      });
  });
