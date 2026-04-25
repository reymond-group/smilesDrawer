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
  import {computeOrdering, shortestPaths} from '../../src/CycleBasis.js';
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
