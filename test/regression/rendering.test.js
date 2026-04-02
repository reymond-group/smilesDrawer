/**
 * Rendering smoke test: molecules that exercise the full pipeline
 * (parser -> graph -> layout -> SVG) and cover structural motifs that
 * have caused bugs or are otherwise tricky.
 *
 * If a new bug is found, SMILES cna be added here before fixing it.
 */
import {describe, it, expect} from 'vitest';
import {JSDOM} from 'jsdom';
import Parser from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';

let dom;
function setupDOM() {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
}

function assertRendersToSVG(smiles) {
    setupDOM();
    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'id', 'test-svg');
    dom.window.document.body.appendChild(svg);

    const tree = Parser.parse(smiles);
    expect(tree).toBeDefined();

    const drawer = new SvgDrawer({isomeric: true});
    drawer.draw(tree, svg, 'light', false);

    const pp = drawer.preprocessor;
    expect(pp.graph.vertices.length).toBeGreaterThan(0);
}

// Basic structural motifs one representative per category
describe('Rendering: structural motifs', () => {
    const cases = [
        ['chain', 'CC(=O)O'],
        ['triple bond', 'CC#N'],
        ['single ring', 'c1ccccc1'],
        ['fused rings', 'c1ccc2ccccc2c1'],
        ['spiro', 'C1CCCC12CCCCC2'],
        ['bridged (norbornane)', 'C1CC2CCC1C2'],
        ['bridged (adamantane)', 'C1C2CC3CC1CC(C2)C3'],
        ['E/Z', 'C/C=C/C'],
        ['stereocenter', 'N[C@@H](C)C(=O)O'],
        ['charged', '[NH3+]CC([O-])=O'],
        ['disconnected', '[Na+].[Cl-]'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// Molecules that triggered bugs fixed in this PR or referenced in GitHub issues
describe('Rendering: regression cases', () => {
    const cases = [
        // Bridged-ring layout distortion (fixed: fused rings adjacent to bridged systems)
        ['morphine', 'CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)O)O[C@H]3[C@H](C=C4)O'],
        ['oxanorbornane (bug mol)', 'CC1C(=O)NCCN1C(=O)C1(CNC(=O)[C@@H]2[C@H]3CCOC[C@H]32)CC=CC1'],

        // E/Z double bond rendering (fixed: post-layout reflection)
        ['(E)-stilbene', 'c1ccc(/C=C/c2ccccc2)cc1'],
        ['maleic acid (Z)', 'OC(=O)/C=C\\C(=O)O'],
        ['fumaric acid (E)', 'OC(=O)/C=C/C(=O)O'],
        ['all-trans-retinal', 'O=C/C=C(\\C)/C=C/C=C(/C)/C=C/C1=C(C)CCCC1(C)C'],

        // SSSR over-count (fixed: off-by-one in getSSSR)
        ['camphor', 'CC1(C)C2CCC1(C)C(=O)C2'],

        // Stereo wedge direction
        ['(S)-ibuprofen', 'CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O'],
        ['problematic stereo mol', 'ClC1=CC=C(C=C1)COC[C@H]2N(CCC2)CCC3=CC=C(C=C3)OC'],

        // GitHub issues
        ['polyphenyl (#162)', 'C(C1=CC=CC=C1)1=CC=C(C2C=CC(C3C=CC=CC=3)=CC=2)C=C1'],
        ['pseudo charge (#209)', 'CCS(=O)(=O)[O-]'],
        ['fused rings (#188)', 'O(C(c1cccc2c1cccc2)c3cccc4ccccc34)C(C(C)Sc5ccc(cc5)Br)=O'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// Complex molecules 
describe('Rendering: complex molecules', () => {
    const cases = [
        ['strychnine', 'O=C1CC2CC3CC4(OCC=C4CC3N2C5=CC=CC1=C5)C=O'],
        ['ATP', 'Nc1ncnc2c1ncn2[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@H]1O'],
        ['penicillin G', 'OC(=O)[C@@H]1C(=O)N2[C@@H]1SC(C)(C)[C@H]2C(=O)NCc1ccccc1'],
        ['artemisinin', 'C[C@@H]1CC[C@H]2[C@@H](C)C(=O)O[C@@H]3O[C@@]4(C)CC[C@@H]1[C@@]23OO4'],
        ['codeine', 'COc1ccc2C[C@@H]3N(C)CC[C@]45[C@@H]3Oc1c2[C@@H]4O[C@H]5CC=C'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});
