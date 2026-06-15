/**
 * E/Z double bond stereochemistry regression tests.
 *
 * Verifies that substituents around E/Z double bonds are placed on the
 * correct side of the double bond axis.
 *
 * Geometry check: for double bond A=B with substituent S1 on A and S2 on B,
 *   cross(B-A, S1-A) and cross(B-A, S2-B):
 *     - same sign = same side = Z (cis)
 *     - opposite signs = opposite sides = E (trans)
 */
import {describe, it, expect, test} from 'vitest';
import {createJSDOM}                from '../helpers';

import Parser    from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';

function render(smiles) {
    const dom = createJSDOM();

    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'id', 'test-svg');
    dom.window.document.body.appendChild(svg);

    const tree = Parser.parse(smiles);
    const drawer = new SvgDrawer({isomeric: true});
    drawer.draw(tree, svg, 'light', false);
    return drawer.preprocessor;
}

/**
 * Determine the visual E/Z around a double bond from rendered positions.
 * @param {object} pp - the preprocessor after rendering
 * @param {number} idA - vertex id of double-bond carbon A
 * @param {number} idB - vertex id of double-bond carbon B
 * @param {number} idS1 - vertex id of substituent on A
 * @param {number} idS2 - vertex id of substituent on B
 * @returns {'E'|'Z'} the visual configuration
 */
function getVisualEZ(pp, idA, idB, idS1, idS2) {
    const posA = pp.graph.vertices[idA].position;
    const posB = pp.graph.vertices[idB].position;
    const posS1 = pp.graph.vertices[idS1].position;
    const posS2 = pp.graph.vertices[idS2].position;
    const dx = posB.x - posA.x;
    const dy = posB.y - posA.y;
    const cross1 = dx * (posS1.y - posA.y) - dy * (posS1.x - posA.x);
    const cross2 = dx * (posS2.y - posB.y) - dy * (posS2.x - posB.x);
    return (cross1 * cross2 > 0) ? 'Z' : 'E';
}

/**
 * Find the first C=C double bond (not C=O etc.) where neither carbon is in a ring.
 */
function findNonRingDoubleBond(graph) {
    for (let i = 0; i < graph.edges.length; i++) {
        const e = graph.edges[i];
        if (e.bondType !== '=') continue;
        const vS = graph.vertices[e.sourceId];
        const vT = graph.vertices[e.targetId];
        if (vS.value.element === 'C' && vT.value.element === 'C' &&
            vS.value.rings.length === 0 && vT.value.rings.length === 0) {
            return {a: e.sourceId, b: e.targetId};
        }
    }
    return null;
}

describe('E/Z double bond visual geometry', () => {
    it('F/C=C/F is E (trans)', () => {
        const pp = render('F/C=C/F');
        expect(getVisualEZ(pp, 1, 2, 0, 3)).toBe('E');
    });

    it('F/C=C\\F is Z (cis)', () => {
        const pp = render('F/C=C\\F');
        expect(getVisualEZ(pp, 1, 2, 0, 3)).toBe('Z');
    });

    it('Cl/C=C/Cl is E (trans)', () => {
        const pp = render('Cl/C=C/Cl');
        expect(getVisualEZ(pp, 1, 2, 0, 3)).toBe('E');
    });

    it('Cl/C=C\\Cl is Z (cis)', () => {
        const pp = render('Cl/C=C\\Cl');
        expect(getVisualEZ(pp, 1, 2, 0, 3)).toBe('Z');
    });

    // Branched double bond with ring substituent
    it('C/C(=C\\C(=O)OC)/C1=CC=C(C=C1)C(C)(F)F has correct E geometry', () => {
        // https://github.com/reymond-group/smilesDrawer/issues/217
        const pp = render('C/C(=C\\C(=O)OC)/C1=CC=C(C=C1)C(C)(F)F');
        const db = findNonRingDoubleBond(pp.graph);
        expect(db).not.toBeNull();

        const neighborsA = pp.graph.vertices[db.a].getNeighbours().filter(n => n !== db.b);
        const neighborsB = pp.graph.vertices[db.b].getNeighbours().filter(n => n !== db.a);

        // Find stereo-bonded neighbors
        let methylId = -1, phenylId = -1, esterId = -1;
        for (const nid of neighborsA) {
            const e = pp.graph.getEdge(db.a, nid);
            if (e && e.bondType === '/') {
                if (pp.graph.vertices[nid].value.rings.length > 0) {
                    phenylId = nid;
                }
                else {
                    methylId = nid;
                }
            }
        }
        for (const nid of neighborsB) {
            const e = pp.graph.getEdge(db.b, nid);
            if (e && e.bondType === '\\') {
                esterId = nid;
            }
        }

        // methyl and ester: / then \ = different directions = Z (same side)
        if (methylId !== -1 && esterId !== -1) {
            expect(getVisualEZ(pp, db.a, db.b, methylId, esterId)).toBe('Z');
        }
        // phenyl and ester: / then \ but phenyl's / is from branch point = E (opposite sides)
        if (phenylId !== -1 && esterId !== -1) {
            expect(getVisualEZ(pp, db.a, db.b, phenylId, esterId)).toBe('E');
        }
    });

    // Ring-connected double bond
    it('C/C=C/1\\CCC[C@@]2(C1CC2)C has correct geometry', () => {
        // https://github.com/reymond-group/smilesDrawer/issues/217
        const pp = render('C/C=C/1\\CCC[C@@]2(C1CC2)C');
        // Double bond: atom 1 = atom 2
        // atom 0 (methyl) on atom 1's side, atoms 3 and 7 on atom 2's side
        const graph = pp.graph;
        let dbA = -1, dbB = -1;
        for (let i = 0; i < graph.edges.length; i++) {
            const e = graph.edges[i];
            if (e.bondType === '=') {
                dbA = e.sourceId;
                dbB = e.targetId;
                break;
            }
        }
        expect(dbA).not.toBe(-1);

        const neighborsB = graph.vertices[dbB].getNeighbours().filter(n => n !== dbA);

        // Find the \ neighbor on B side (should be Z with methyl)
        for (const nb of neighborsB) {
            const e = graph.getEdge(dbB, nb);
            if (e && e.bondType === '\\') {
                // methyl(0) vs \-bonded neighbor: / then \ = Z
                expect(getVisualEZ(pp, dbA, dbB, 0, nb)).toBe('Z');
            }
        }
    });

    it('CID 153456993 renders with the correct stereochemistry', () => {
        // https://github.com/reymond-group/smilesDrawer/issues/217
        // https://github.com/reymond-group/smilesDrawer/issues/276
        const pp = render('C1=CC(=CC=C1CS)/C=C\\2/C(=O)N(C(=O)S2)CC(=O)O');
        expect(getVisualEZ(pp, 8, 9, 2, 10)).toBe('E');
        expect(getVisualEZ(pp, 8, 9, 2, 15)).toBe('Z');
    });

    it('CID 102485436 renders with the correct stereochemistry', () => {
        // https://github.com/reymond-group/smilesDrawer/issues/217
        const pp = render('CN(C)CCCN/C(=C\\C(=O)C1=CC=CC=C1)/C2=CC=CC=C2');
        expect(getVisualEZ(pp, 7, 8, 9,  6)).toBe('Z');
        expect(getVisualEZ(pp, 7, 8, 9, 17)).toBe('E');
    });

    it('CID 173497121 renders with the correct stereochemistry', () => {
        // https://github.com/reymond-group/smilesDrawer/issues/217
        // https://github.com/reymond-group/smilesDrawer/issues/276
        const pp = render('CC(/C(=C(/C(C)OC1=CC=C(C=C1)O)\\O)/C(O)OC)O');
        expect(getVisualEZ(pp, 2, 3,  4,  1)).toBe('E');
        expect(getVisualEZ(pp, 2, 3,  4, 15)).toBe('Z');
        expect(getVisualEZ(pp, 2, 3, 14,  1)).toBe('Z');
        expect(getVisualEZ(pp, 2, 3, 14, 15)).toBe('E');
    });

    it('should handle E/Z double bonds between rings', () => {
        // https://github.com/reymond-group/smilesDrawer/issues/247
        let pp = render('N1CCCC/C1=C2/CCCCN2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('E');

        pp = render('N1CCCC/C1=C2\\CCCCN2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('Z');

        pp = render('N1CCCC\\C1=C2/CCCCN2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('Z');

        pp = render('N1CCCC\\C1=C2\\CCCCN2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('E');
    });

    it('should handle E/Z markers at forward links', () => {
        // https://github.com/reymond-group/smilesDrawer/issues/280
        let pp = render('N1CCCC/C1=C/2CCCCN2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('Z');

        pp = render('N1CCCC/C1=C\\2CCCCN2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('E');

        pp = render('N1CCCC\\C1=C/2CCCCN2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('E');

        pp = render('N1CCCC\\C1=C\\2CCCCN2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('Z');
    });

    it('should handle E/Z markers at backward links', () => {
        // https://github.com/reymond-group/smilesDrawer/issues/280
        let pp = render('N1CCCC/C1=C2CCCCN/2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('E');

        pp = render('N1CCCC/C1=C2CCCCN\\2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('Z');

        pp = render('N1CCCC\\C1=C2CCCCN/2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('Z');

        pp = render('N1CCCC\\C1=C2CCCCN\\2');
        expect(getVisualEZ(pp, 5, 6, 0, 11)).toBe('E');
    });
});
