/**
 * R/S stereochemistry regression tests.
 *
 * Verifies that the expected (usually the shortest) branch
 * around an R/S chiral center gets a drawn with a wedge.
 */
import {describe, it, expect, vi} from 'vitest';
import {createJSDOM}              from '../helpers';

import Parser    from '../../src/Parser';
import SvgDrawer from '../../src/SvgDrawer';
import Vector2   from '../../src/Vector2';

const expectWedges = vi.defineHelper((graph, centerId, wedgeIds) => {
    const center = graph.vertices[centerId];
    for (const nid of center.neighbours) {
        const text = `(${centerId} -> ${nid})`;
        const edge = graph.getEdge(centerId, nid);
        if (wedgeIds.includes(nid)) {
            expect(edge.wedge, `Edge ${text} should be a wedge`).toBeOneOf(['up', 'down']);
        }
        else {
            // Empty string or undefined or...
            expect(edge.wedge, `Edge ${text} should NOT be a wedge`).toBeFalsy();
        }
    }
});

function render(smiles, options) {
    const dom = createJSDOM();

    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'id', 'test-svg');
    dom.window.document.body.appendChild(svg);

    const tree = Parser.parse(smiles);
    const drawer = new SvgDrawer(options);
    drawer.draw(tree, svg, 'light', false);
    return drawer.preprocessor;
}

/**
 * Calculates the winding of several points around a center point.
 *
 * WARNING: This operates in SVG coordinates, not standard Cartesian coordinates!
 * This means that increasing Y values move lower in space (lower on the screen),
 * So the result is the opposite of what a mathematician would expect.
 *
 * @param {Point}   center - The center point.
 * @param {Point[]} points - At least three points to calculate winding from.
 * @returns -1 if the points wind clockwise, or 1 if they wind counterclockwise.
 */
function winding(center, points) {
    const len = points.length;
    if (len < 3) {
        throw new Error('Three or more points are needed to determine winding.')
    }

    const angles = points.map((point, i) => {
        return [i, Vector2.subtract(point, center).angle()];
    }).sort((a, b) => {
        return a[1] - b[1];
    });

    let wind = undefined;
    let prev = angles[len - 1];
    for (let i = 0; i < len; ++i) {
        const curr = angles[i];
        const w    = (curr[0] - prev[0] + len) % len;
        if (wind !== undefined && w !== wind) {
            throw new Error('Inconsistent winding!');
        }
        if (w !== 1 && w !== len - 1) {
            throw new Error('Inconsistent winding!');
        }

        prev = curr;
        wind = w;
    }

    // wind == 1        =>  clockwise
    // wind == len - 1  =>  counterclockwise
    return (wind > 1) ? 1 : -1;
}

function getWinding(graph, cid, nids) {
    const center = graph.vertices[cid].position;
    const points = nids.map(nid => graph.vertices[nid].position);
    return winding(center, points);
}

describe('winding()', () => {
    //  Yes, this is a test for a test helper function...
    it('should throw when given two or fewer points', () => {
        expect(() => winding(new Vector2(0, 0), [
            new Vector2(1, 0),
            new Vector2(0, 1),
        ])).toThrow();
    });

    it('should return -1 when the winding is clockwise', () => {
        // Computer graphics use an inverted Y axis!
        expect(winding(new Vector2(0, 0), [
            new Vector2(1, 0),
            new Vector2(0, 1),
            new Vector2(-1, 0),
            new Vector2(0, -1),
        ])).toBe(-1);
    });

    it('should return +1 when the winding is counterclockwise', () => {
        // Computer graphics use an inverted Y axis!
        expect(winding(new Vector2(0, 0), [
            new Vector2(1, 0),
            new Vector2(0, -1),
            new Vector2(-1, 0),
            new Vector2(0, 1),
        ])).toBe(+1);
    });

    it('should throw when the winding is invalid', () => {
        expect(() => winding(new Vector2(0, 0), [
            new Vector2(1, 0),
            new Vector2(-1, 0),
            new Vector2(0, -1),
            new Vector2(0, 1),
        ])).toThrow();
    });
});

describe('R/S visual chirality', () => {
    it('prefers to put wedges towards atoms not in the same ring', () => {
        let pp = render('C[C@H]1CCCC(C)C1', {explicitHydrogens: false});
        expectWedges(pp.graph, 1, [0]);

        pp = render('C1CC[C@H](C)CC1C', {explicitHydrogens: false});
        expectWedges(pp.graph, 3, [5]);
    });

    it('prefers to put wedges towards heteroatoms', () => {
        let pp = render('C=N[C@](CN)(C)CC');
        expectWedges(pp.graph, 2, [1]);

        pp = render('C#C[C@](C)(B)CC');
        expectWedges(pp.graph, 2, [4]);

        pp = render('C#C[C@](CF)(C)OCC');
        expectWedges(pp.graph, 2, [6]);
    });

    it('prefers to put wedges towards the shortest subtree', () => {
        // This was a bug (no GitHub issue) as of v2.3.0.
        // The old code used atom.subtreeDepth without recalculating it from
        // the chiral center, so it got whatever had been cached earlier.
        let pp = render('C[C@](CC)(CCC)CCCC');
        expectWedges(pp.graph, 1, [0]);

        pp = render('CC[C@](C)(CCC)CCCC');
        expectWedges(pp.graph, 2, [3]);

        pp = render('CCC[C@](CC)(C)CCCC');
        expectWedges(pp.graph, 3, [6]);

        pp = render('CCC[C@](CC)(CCCC)C');
        expectWedges(pp.graph, 3, [10]);
    });

    it('adds hidden hydrogens back when necessary', () => {
        // In particular, when all other neighbors are stereocenters or in the same ring.
        let pp = render('[C@H]12CCCC[C@H]1CCCC2', {explicitHydrogens: false});
        expect(pp.graph.vertices[1].value.isDrawn).toBe(true);
        expect(pp.graph.vertices[7].value.isDrawn).toBe(true);
        expectWedges(pp.graph, 0, [1]);
        expectWedges(pp.graph, 6, [7]);
    });

    it('shows R/S stereochemistry when hydrogens are explicit', () => {
        // https://github.com/reymond-group/smilesDrawer/pull/287#pullrequestreview-4273681678
        let pp = render('[C@@H](CC)(CCC)CCCC', {explicitHydrogens: true});
        let cw = getWinding(pp.graph, 0, [2, 4, 7]) < 0;
        expect.soft(pp.graph.getEdge(0, 1).wedge).toBe(cw ? 'up' : 'down'); // H

        pp = render('CC[C@@H](CCC)CCCC', {explicitHydrogens: true});
        cw = getWinding(pp.graph, 2, [1, 4, 7]) < 0;
        expect.soft(pp.graph.getEdge(2, 3).wedge).toBe(cw ? 'down' : 'up'); // H

        pp = render('CC[C@H](CCC(C)C)CCCC', {explicitHydrogens: true});
        cw = getWinding(pp.graph, 2, [1, 9, 4]) < 0;
        expect.soft(pp.graph.getEdge(2, 3).wedge).toBe(cw ? 'down' : 'up'); // H
    });

    it('shows R/S stereochemistry when explicit hydrogens are hidden', () => {
        // https://github.com/reymond-group/smilesDrawer/pull/287#pullrequestreview-4273681678
        let pp = render('[C@@H](CC)(CCC)CCCC', {explicitHydrogens: false});
        let cw = getWinding(pp.graph, 0, [2, 4, 7]) < 0;
        expect.soft(pp.graph.getEdge(0, 2).wedge).toBe(cw ? 'down' : 'up');

        pp = render('CC[C@@H](CCC)CCCC', {explicitHydrogens: false});
        cw = getWinding(pp.graph, 2, [1, 4, 7]) < 0;
        expect.soft(pp.graph.getEdge(2, 1).wedge).toBe(cw ? 'up' : 'down');

        pp = render('CC[C@H](CCC(C)C)CCCC', {explicitHydrogens: false});
        cw = getWinding(pp.graph, 2, [1, 9, 4]) < 0;
        expect.soft(pp.graph.getEdge(2, 1).wedge).toBe(cw ? 'up' : 'down');
    });
});
