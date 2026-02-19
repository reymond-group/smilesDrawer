import {describe, it, expect} from 'vitest';
import Parser from '../../src/Parser.js';
import Graph from '../../src/Graph.js';

/**
 * Regression tests: a curated set of SMILES strings that must parse and
 * build a graph without throwing. If a future change causes any of these
 * to fail, something broke.
 */

function assertParsesAndBuildsGraph(smiles) {
    const tree = Parser.parse(smiles);
    expect(tree).toBeDefined();
    const graph = new Graph(tree, true);
    expect(graph.vertices.length).toBeGreaterThan(0);
}

describe('Regression: SMILES parsing must not throw', () => {
    // ── Simple organics ──────────────────────────────────────────────
    describe('simple molecules', () => {
        const simple = [
            ['methane', 'C'],
            ['ethane', 'CC'],
            ['ethene', 'C=C'],
            ['ethyne', 'C#C'],
            ['methanol', 'CO'],
            ['water', 'O'],
            ['ammonia', 'N'],
            ['hydrogen sulfide', 'S'],
            ['hydrogen fluoride', 'F'],
            ['hydrogen chloride', 'Cl'],
            ['hydrogen bromide', 'Br'],
            ['hydrogen iodide', 'I'],
            ['acetic acid', 'CC(=O)O'],
            ['formaldehyde', 'C=O'],
            ['formic acid', 'OC=O'],
        ];

        for (const [name, smiles] of simple) {
            it(`${name}: ${smiles}`, () => assertParsesAndBuildsGraph(smiles));
        }
    });

    // ── Rings ────────────────────────────────────────────────────────
    describe('ring systems', () => {
        const rings = [
            ['cyclopropane', 'C1CC1'],
            ['cyclobutane', 'C1CCC1'],
            ['cyclopentane', 'C1CCCC1'],
            ['cyclohexane', 'C1CCCCC1'],
            ['benzene (aromatic)', 'c1ccccc1'],
            ['benzene (kekule)', 'C1=CC=CC=C1'],
            ['naphthalene', 'c1ccc2ccccc2c1'],
            ['anthracene', 'c1ccc2cc3ccccc3cc2c1'],
            ['pyridine', 'c1ccncc1'],
            ['pyrrole', 'c1cc[nH]c1'],
            ['furan', 'c1ccoc1'],
            ['thiophene', 'c1ccsc1'],
            ['imidazole', 'c1cnc[nH]1'],
            ['indole', 'c1ccc2[nH]ccc2c1'],
            ['cubane', 'C12C3C4C1C5C3C4C25'],
            ['adamantane', 'C1C2CC3CC1CC(C2)C3'],
            ['spiro[4.5]decane', 'C1CCC2(CC1)CCCCC2'],
        ];

        for (const [name, smiles] of rings) {
            it(`${name}: ${smiles}`, () => assertParsesAndBuildsGraph(smiles));
        }
    });

    // ── Charged and bracket atoms ────────────────────────────────────
    describe('charged and bracket atoms', () => {
        const charged = [
            ['sodium cation', '[Na+]'],
            ['chloride anion', '[Cl-]'],
            ['ammonium', '[NH4+]'],
            ['sulfate', '[O-]S(=O)(=O)[O-]'],
            ['hydroxide', '[OH-]'],
            ['hydronium', '[OH3+]'],
            ['calcium 2+', '[Ca+2]'],
            ['iron 3+', '[Fe+3]'],
        ];

        for (const [name, smiles] of charged) {
            it(`${name}: ${smiles}`, () => assertParsesAndBuildsGraph(smiles));
        }
    });

    // ── Stereochemistry ──────────────────────────────────────────────
    describe('stereochemistry', () => {
        const stereo = [
            ['L-alanine', 'N[C@@H](C)C(=O)O'],
            ['D-alanine', 'N[C@H](C)C(=O)O'],
            ['E-2-butene', 'C/C=C/C'],
            ['Z-2-butene', 'C/C=C\\C'],
            ['cholesterol', 'C([C@@H]1CC2=CC(O)CC[C@@]2(C)[C@H]1[C@H]1CC[C@@]2([C@@H]1CC1=C)[C@H](C)CC[C@H]2C)C'],
        ];

        for (const [name, smiles] of stereo) {
            it(`${name}: ${smiles}`, () => assertParsesAndBuildsGraph(smiles));
        }
    });

    // ── Drugs / complex molecules ────────────────────────────────────
    describe('drugs and complex molecules', () => {
        const drugs = [
            ['aspirin', 'CC(=O)Oc1ccccc1C(=O)O'],
            ['caffeine', 'Cn1cnc2c1c(=O)n(c(=O)n2C)C'],
            ['ibuprofen', 'CC(C)Cc1ccc(cc1)C(C)C(=O)O'],
            ['paracetamol', 'CC(=O)Nc1ccc(O)cc1'],
            ['penicillin G', 'CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)Cc1ccccc1)C(=O)O)C'],
            ['vancomycin (partial)', 'CC(O)C(NC(=O)C1CC(=O)N1)C(=O)NCC(=O)O'],
            ['glucose', 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O'],
            ['sucrose', 'OC[C@H]1OC(O[C@@]2(CO)OC[C@@H](O)[C@@H]2O)[C@H](O)[C@@H](O)[C@@H]1O'],
            ['adenine', 'c1nc2c(n1)c(=O)[nH]c(n2)N'],
            ['nicotine', 'CN1CCC[C@H]1c1cccnc1'],
        ];

        for (const [name, smiles] of drugs) {
            it(`${name}: ${smiles}`, () => assertParsesAndBuildsGraph(smiles));
        }
    });

    // ── Disconnected / salts ─────────────────────────────────────────
    describe('disconnected structures and salts', () => {
        const disconnected = [
            ['NaCl', '[Na+].[Cl-]'],
            ['CaCl2', '[Ca+2].[Cl-].[Cl-]'],
            ['ethanol + water', 'CCO.O'],
        ];

        for (const [name, smiles] of disconnected) {
            it(`${name}: ${smiles}`, () => assertParsesAndBuildsGraph(smiles));
        }
    });

    // ── Edge cases ───────────────────────────────────────────────────
    describe('edge cases', () => {
        const edge = [
            ['single atom', 'C'],
            ['single heavy atom in brackets', '[Fe]'],
            ['isotope', '[13C]'],
            ['multi-digit ring', 'C%10CCCCCCCCCCC%10'],
            ['wildcard atom', '*'],
            ['boron', 'B'],
            ['phosphorus', 'P'],
            ['silicon in brackets', '[Si]'],
            ['quadruple bond', 'C$C'],
        ];

        for (const [name, smiles] of edge) {
            it(`${name}: ${smiles}`, () => assertParsesAndBuildsGraph(smiles));
        }
    });

    // ── GitHub issue molecules ───────────────────────────────────────
    describe('molecules from GitHub issues', () => {
        const issues = [
            // #230 - Methanol rendering
            ['issue #230 methanol', 'CO'],
            // #162 - Connected benzene rings (was rendered as large circle)
            ['issue #162 biphenyl', 'c1ccc(-c2ccccc2)cc1'],
            ['issue #162 polyphenyl chain', 'C(C1=CC=CC=C1)1=CC=C(C2C=CC(C3C=CC(C4C=CC(C5C=CC=CC=5)=CC=4)=CC=3)=CC=2)C=C1'],
            // #174 - Kekule vs aromatic
            ['issue #174 kekule benzene', 'C1=CC=CC=C1'],
            // #170 - Some SMILES draw wrongly
            ['issue #170 test', 'c1ccc2c(c1)ccc1ccccc12'],
            // #188 - Fused naphthalene moieties
            ['issue #188 fused rings', 'O(C(c1cccc2c1cccc2)c3cccc4ccccc34)C(C(C)Sc5ccc(cc5)Br)=O'],
            // #217 - Stereochemistry
            ['issue #217 stereo', 'C/C(=C\\C(=O)OC)/C1=CC=C(C=C1)C(C)(F)F'],
            // #209 - Charges on pseudo-elements
            ['issue #209 pseudo charges', 'CCS(=O)(=O)[O-]'],
            // #220 - Many neighbors
            ['issue #220 6-neighbors', 'N(C)(C)(C)(C)(C)(C)'],
            ['issue #220 8-neighbors', 'N(C)(C)(C)(C)(C)(C)(C)(C)'],
            // Bridged bicyclic (oxanorbornane) — was rendering with extreme coordinates
            ['bridged bicyclic oxanorbornane', 'CC1C(=O)NCCN1C(=O)C1(CNC(=O)[C@@H]2[C@H]3CCOC[C@H]32)CC=CC1'],
            // Classic bridged rings
            ['norbornane', 'C1CC2CC1CC2'],
            ['camphor', 'CC1(C)C2CCC1(C)C(=O)C2'],
        ];

        for (const [name, smiles] of issues) {
            it(`${name}: ${smiles}`, () => assertParsesAndBuildsGraph(smiles));
        }
    });
});
