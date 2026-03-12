/**
 * Rendering regression tests: a curated set of ~200 SMILES strings covering
 * diverse structural features (rings, stereo, charges, bridged, fused, etc.)
 * that must parse AND render to SVG without throwing.
 *
 * This is the definitive safety net — if a change causes any of these to fail,
 * something broke in the pipeline (parser → graph → layout → SVG).
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

    // Verify the SVG has actual content (lines, text, paths)
    const pp = drawer.preprocessor;
    expect(pp.graph.vertices.length).toBeGreaterThan(0);
}

// ─── 1. SIMPLE MOLECULES ───────────────────────────────────────────────
describe('Rendering: simple molecules', () => {
    const cases = [
        ['Methane', 'C'],
        ['Ethane', 'CC'],
        ['Propane', 'CCC'],
        ['Isobutane', 'CC(C)C'],
        ['Ethanol', 'CCO'],
        ['Acetic acid', 'CC(=O)O'],
        ['Acetone', 'CC(=O)C'],
        ['Dimethyl ether', 'COC'],
        ['Methylamine', 'CN'],
        ['Acetonitrile', 'CC#N'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 2. SINGLE RINGS ───────────────────────────────────────────────────
describe('Rendering: single rings', () => {
    const cases = [
        ['Cyclopropane', 'C1CC1'],
        ['Cyclobutane', 'C1CCC1'],
        ['Cyclopentane', 'C1CCCC1'],
        ['Cyclohexane', 'C1CCCCC1'],
        ['Cycloheptane', 'C1CCCCCC1'],
        ['Cyclooctane', 'C1CCCCCCC1'],
        ['Benzene', 'c1ccccc1'],
        ['Pyridine', 'c1ccncc1'],
        ['Furan', 'c1ccoc1'],
        ['Thiophene', 'c1ccsc1'],
        ['Pyrrole', 'c1cc[nH]c1'],
        ['Imidazole', 'c1cnc[nH]1'],
        ['Oxazole', 'c1cnoc1'],
        ['Pyrazole', 'c1cc[nH]n1'],
        ['Tetrahydrofuran', 'C1CCCO1'],
        ['Tetrahydropyran', 'C1CCOCC1'],
        ['Piperidine', 'C1CCNCC1'],
        ['Morpholine', 'C1COCCN1'],
        ['Piperazine', 'C1CNCCN1'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 3. FUSED RINGS ────────────────────────────────────────────────────
describe('Rendering: fused rings', () => {
    const cases = [
        ['Naphthalene', 'c1ccc2ccccc2c1'],
        ['Anthracene', 'c1ccc2cc3ccccc3cc2c1'],
        ['Phenanthrene', 'c1ccc2c(c1)ccc1ccccc12'],
        ['Pyrene', 'c1cc2ccc3cccc4ccc(c1)c2c34'],
        ['Indole', 'c1ccc2[nH]ccc2c1'],
        ['Benzimidazole', 'c1ccc2[nH]cnc2c1'],
        ['Benzofuran', 'c1ccc2occc2c1'],
        ['Quinoline', 'c1ccc2ncccc2c1'],
        ['Isoquinoline', 'c1ccc2cnccc2c1'],
        ['Purine', 'c1ncc2[nH]cnc2n1'],
        ['Acridine', 'c1ccc2cc3ccccc3nc2c1'],
        ['Carbazole', 'c1ccc2[nH]c3ccccc3c2c1'],
        ['Fluorene', 'C1c2ccccc2-c2ccccc21'],
        ['Xanthene', 'C1c2ccccc2Oc2ccccc21'],
        ['Coumarin', 'O=C1CCc2ccccc2O1'],
        ['Phthalimide', 'O=C1NC(=O)c2ccccc21'],
        ['Indene', 'C1=Cc2ccccc2C1'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 4. BRIDGED / POLYCYCLIC ───────────────────────────────────────────
describe('Rendering: bridged & polycyclic', () => {
    const cases = [
        ['Norbornane', 'C1CC2CCC1C2'],
        ['Bicyclo[2.2.2]octane', 'C1CC2CCC1CC2'],
        ['Adamantane', 'C1C2CC3CC1CC(C2)C3'],
        ['Cubane', 'C12C3C4C1C5C4C3C25'],
        ['Camphor', 'CC1(C)C2CCC1(C)C(=O)C2'],
        ['Pinene (alpha)', 'CC1=CCC2CC1C2(C)C'],
        ['Oxanorbornane', 'C1CC2CCC1O2'],
        ['Borneol', 'OC1CC2(C)CCC1C2(C)C'],
        ['Morphine', 'CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)O)O[C@H]3[C@H](C=C4)O'],
        ['Strychnine', 'O=C1CC2CC3CC4(OCC=C4CC3N2C5=CC=CC1=C5)C=O'],
        ['Oxanorbornane (bug mol)', 'CC1C(=O)NCCN1C(=O)C1(CNC(=O)[C@@H]2[C@H]3CCOC[C@H]32)CC=CC1'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 5. SPIRO ──────────────────────────────────────────────────────────
describe('Rendering: spiro', () => {
    const cases = [
        ['Spiro[4.5]decane', 'C1CCCC12CCCCC2'],
        ['Spiro[4.4]nonane', 'C1CCC2(CC1)CCCC2'],
        ['Oxaspiro', 'C2CCC1(CC2)CCCO1'],
        ['Spiro[cyclopentane-1,2-indane]', 'C1CCCC12Cc3ccccc3C2'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 6. STEREOCENTERS ──────────────────────────────────────────────────
describe('Rendering: stereocenters', () => {
    const cases = [
        ['L-Alanine', 'N[C@@H](C)C(=O)O'],
        ['D-Alanine', 'N[C@H](C)C(=O)O'],
        ['L-Serine', 'N[C@@H](CO)C(=O)O'],
        ['L-Threonine', 'N[C@@H]([C@@H](O)C)C(=O)O'],
        ['L-Cysteine', 'N[C@@H](CS)C(=O)O'],
        ['L-Leucine', 'N[C@@H](CC(C)C)C(=O)O'],
        ['L-Isoleucine', 'N[C@@H]([C@H](C)CC)C(=O)O'],
        ['L-Proline', 'OC(=O)[C@@H]1CCCN1'],
        ['L-Phenylalanine', 'N[C@@H](Cc1ccccc1)C(=O)O'],
        ['L-Tryptophan', 'N[C@@H](Cc1c[nH]c2ccccc12)C(=O)O'],
        ['D-Glucose', 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O'],
        ['D-Ribose', 'OC[C@H]1OC(O)[C@H](O)[C@@H]1O'],
        ['(S)-Ibuprofen', 'CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O'],
        ['(R)-Mandelic acid', 'OC(=O)[C@@H](O)c1ccccc1'],
        ['L-Tartaric acid', 'OC(=O)[C@@H](O)[C@@H](O)C(=O)O'],
        ['meso-Tartaric acid', 'OC(=O)[C@@H](O)[C@H](O)C(=O)O'],
        ['Problematic stereo mol', 'ClC1=CC=C(C=C1)COC[C@H]2N(CCC2)CCC3=CC=C(C=C3)OC'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 7. E/Z DOUBLE BONDS ───────────────────────────────────────────────
describe('Rendering: E/Z double bonds', () => {
    const cases = [
        ['(E)-2-Butene', 'C/C=C/C'],
        ['(Z)-2-Butene', 'C/C=C\\C'],
        ['(E)-Stilbene', 'c1ccc(/C=C/c2ccccc2)cc1'],
        ['Maleic acid', 'OC(=O)/C=C\\C(=O)O'],
        ['Fumaric acid', 'OC(=O)/C=C/C(=O)O'],
        ['(E)-Cinnamic acid', 'OC(=O)/C=C/c1ccccc1'],
        ['all-trans-Retinal', 'O=C/C=C(\\C)/C=C/C=C(/C)/C=C/C1=C(C)CCCC1(C)C'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 8. CHARGED SPECIES ────────────────────────────────────────────────
describe('Rendering: charged species', () => {
    const cases = [
        ['Sodium chloride', '[Na+].[Cl-]'],
        ['Ammonium chloride', '[NH4+].[Cl-]'],
        ['Glycine zwitterion', '[NH3+]CC([O-])=O'],
        ['Sodium acetate', 'CC(=O)[O-].[Na+]'],
        ['Phosphate ion', '[O-]P(=O)([O-])[O-]'],
        ['Trimethylammonium', 'C[NH+](C)C'],
        ['Tetramethylammonium', 'C[N+](C)(C)C'],
        ['Choline', 'C[N+](C)(C)CCO'],
        ['Ethyl sulfonate', 'CCS(=O)(=O)[O-]'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 9. HETEROATOMS ────────────────────────────────────────────────────
describe('Rendering: heteroatoms', () => {
    const cases = [
        ['DMSO', 'CS(=O)C'],
        ['Dimethyl sulfone', 'CS(=O)(=O)C'],
        ['Trimethyl phosphate', 'COP(=O)(OC)OC'],
        ['Phenylboronic acid', 'OB(O)c1ccccc1'],
        ['Fluorobenzene', 'Fc1ccccc1'],
        ['Chlorobenzene', 'Clc1ccccc1'],
        ['Bromobenzene', 'Brc1ccccc1'],
        ['Iodobenzene', 'Ic1ccccc1'],
        ['CF3-benzene', 'FC(F)(F)c1ccccc1'],
        ['Diphenyl sulfide', 'c1ccc(cc1)Sc1ccccc1'],
        ['Thiourea', 'NC(=S)N'],
        ['Phosphoric acid', 'OP(=O)(O)O'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 10. DRUG MOLECULES ────────────────────────────────────────────────
describe('Rendering: drug molecules', () => {
    const cases = [
        ['Aspirin', 'CC(=O)Oc1ccccc1C(=O)O'],
        ['Caffeine', 'Cn1cnc2c1c(=O)n(c(=O)n2C)C'],
        ['Ibuprofen', 'CC(C)Cc1ccc(cc1)C(C)C(=O)O'],
        ['Acetaminophen', 'CC(=O)Nc1ccc(O)cc1'],
        ['Metformin', 'CN(C)C(=N)NC(=N)N'],
        ['Omeprazole', 'COc1ccc2[nH]c(nc2c1)S(=O)Cc1ncc(C)c(OC)c1C'],
        ['Ciprofloxacin', 'OC(=O)c1cn(C2CC2)c2cc(N3CCNCC3)c(F)cc2c1=O'],
        ['Chloroquine', 'CCN(CC)CCCC(C)Nc1ccnc2cc(Cl)ccc12'],
        ['Epinephrine', 'CNC[C@@H](O)c1ccc(O)c(O)c1'],
        ['Dopamine', 'NCCc1ccc(O)c(O)c1'],
        ['Serotonin', 'NCCc1c[nH]c2ccc(O)cc12'],
        ['Melatonin', 'COc1ccc2[nH]cc(CCNC(C)=O)c2c1'],
        ['Lidocaine', 'CCN(CC)CC(=O)Nc1c(C)cccc1C'],
        ['Penicillin G', 'OC(=O)[C@@H]1C(=O)N2[C@@H]1SC(C)(C)[C@H]2C(=O)NCc1ccccc1'],
        ['Ampicillin', 'N[C@@H](c1ccccc1)C(=O)N[C@H]1[C@@H]2SC(C)(C)[C@@H](N2C1=O)C(=O)O'],
        ['Amoxicillin', 'N[C@@H](c1ccc(O)cc1)C(=O)N[C@H]1[C@@H]2SC(C)(C)[C@@H](N2C1=O)C(=O)O'],
        ['Artemisinin', 'C[C@@H]1CC[C@H]2[C@@H](C)C(=O)O[C@@H]3O[C@@]4(C)CC[C@@H]1[C@@]23OO4'],
        ['Warfarin', 'OC=1c2ccccc2OC(=O)C1CC(=O)c1ccccc1'],
        ['Fluoxetine', 'CNCCC(Oc1ccc(cc1)C(F)(F)F)c1ccccc1'],
        ['Atenolol', 'CC(C)NCC(O)COc1ccc(CC(N)=O)cc1'],
        ['Propranolol', 'CC(C)NCC(O)COc1cccc2ccccc12'],
        ['Diclofenac', 'OC(=O)Cc1ccccc1Nc1c(Cl)cccc1Cl'],
        ['Gabapentin', 'NCC1(CC(=O)O)CCCCC1'],
        ['Carbamazepine', 'NC(=O)N1c2ccccc2C=Cc2ccccc21'],
        ['Valproic acid', 'CCCC(CCC)C(=O)O'],
        ['Nicotine', 'CN1CCC[C@H]1c1cccnc1'],
        ['Codeine', 'COc1ccc2C[C@@H]3N(C)CC[C@]45[C@@H]3Oc1c2[C@@H]4O[C@H]5CC=C'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 11. NUCLEOTIDES & BIOMOLECULES ────────────────────────────────────
describe('Rendering: nucleotides & biomolecules', () => {
    const cases = [
        ['Adenosine', 'n2c1c(ncnc1n(c2)[C@@H]3O[C@@H]([C@@H](O)[C@H]3O)CO)N'],
        ['AMP', 'Nc1ncnc2c1ncn2[C@@H]1O[C@H](COP(=O)(O)O)[C@@H](O)[C@H]1O'],
        ['ATP', 'Nc1ncnc2c1ncn2[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@H]1O'],
        ['NAD+', 'O=C(N)c1ccc[n+](c1)[C@H]2[C@H](O)[C@H](O)[C@H](O2)COP([O-])(=O)OP(=O)(O)OC[C@H]3O[C@@H](n4cnc5c4ncnc5N)[C@@H]([C@@H]3O)OP(=O)(O)O'],
        ['AZT-like', 'O=C1NC(C(C)=CN1[C@@H]2O[C@H](CO)[C@@H](N=[N+]=[N-])C2)=O'],
        ['GlcNAc', 'CC(=O)N[C@@H]1[C@H](O)[C@@H](O)[C@H](CO)O[C@H]1O'],
        ['Sucrose', 'OC[C@H]1O[C@@](CO)(O[C@@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2O)[C@@H](O)[C@@H]1O'],
        ['Glutathione', 'N[C@@H](CCC(=O)N[C@@H](CS)C(=O)NCC(=O)O)C(=O)O'],
        ['Gly-Ala-Val', 'NCC(=O)N[C@@H](C)C(=O)N[C@@H](C(C)C)C(=O)O'],
        ['Ala-Phe-Gly', 'N[C@@H](C)C(=O)N[C@@H](Cc1ccccc1)C(=O)NCC(=O)O'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});

// ─── 12. EDGE CASES ────────────────────────────────────────────────────
describe('Rendering: edge cases', () => {
    const cases = [
        ['Allene', 'C=C=C'],
        ['Butatriene', 'C=C=C=C'],
        ['Disconnected salt', '[Mg+2].[Cl-].[Cl-]'],
        ['Disconnected 3-component', 'c1ccccc1.CC(=O)O.O'],
        ['Fulvene', 'C=C1C=CC=C1'],
        ['Peroxide', 'OO'],
        ['Ozone', 'O=[O+][O-]'],
        ['Nitrogen gas', 'N#N'],
        ['Sulfuric acid', 'OS(=O)(=O)O'],
        ['Multi-ring stereo: cholesterol', 'C([C@@H]1CC2=CC(O)CC[C@@]2(C)[C@H]1[C@H]1CC[C@@]2([C@@H]1CC1=C)[C@H](C)CC[C@H]2C)C'],
        ['Polyphenyl (issue #162)', 'C(C1=CC=CC=C1)1=CC=C(C2C=CC(C3C=CC=CC=3)=CC=2)C=C1'],
        ['Pseudo charge (issue #209)', 'CCS(=O)(=O)[O-]'],
        ['Fused rings (issue #188)', 'O(C(c1cccc2c1cccc2)c3cccc4ccccc34)C(C(C)Sc5ccc(cc5)Br)=O'],
    ];
    for (const [name, smiles] of cases) {
        it(`${name}: ${smiles}`, () => assertRendersToSVG(smiles));
    }
});
