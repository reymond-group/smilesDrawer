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
import {describe, it, expect} from 'vitest';
  import {computeOrdering, shortestPaths, computeInitialCycles} from '../../src/CycleBasis.js';
  import BitSet from '../../src/CycleBasis.js';

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
