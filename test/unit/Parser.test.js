import {describe, it, expect} from 'vitest';
import Parser from '../../src/Parser.js';

describe('Parser', () => {
    describe('simple molecules', () => {
        it('should parse methane (C)', () => {
            const tree = Parser.parse('C');
            expect(tree.atom).toBe('C');
        });

        it('should parse ethane (CC)', () => {
            const tree = Parser.parse('CC');
            expect(tree.atom).toBe('C');
            expect(tree.hasNext).toBe(true);
        });

        it('should parse methanol (CO)', () => {
            const tree = Parser.parse('CO');
            expect(tree.atom).toBe('C');
        });

        it('should parse water (O)', () => {
            const tree = Parser.parse('O');
            expect(tree.atom).toBe('O');
        });

        it('should parse ethene (C=C)', () => {
            const tree = Parser.parse('C=C');
            expect(tree.atom).toBe('C');
        });

        it('should parse ethyne (C#C)', () => {
            const tree = Parser.parse('C#C');
            expect(tree.atom).toBe('C');
        });
    });

    describe('branching', () => {
        it('should parse propane with branch CC(C)C', () => {
            const tree = Parser.parse('CC(C)C');
            expect(tree.atom).toBe('C');
        });

        it('should parse acetic acid CC(=O)O', () => {
            const tree = Parser.parse('CC(=O)O');
            expect(tree.atom).toBe('C');
        });
    });

    describe('rings', () => {
        it('should parse cyclohexane C1CCCCC1', () => {
            const tree = Parser.parse('C1CCCCC1');
            expect(tree.atom).toBe('C');
            expect(tree.ringbonds.length).toBeGreaterThan(0);
        });

        it('should parse benzene c1ccccc1', () => {
            const tree = Parser.parse('c1ccccc1');
            expect(tree.atom).toBe('c');
        });

        it('should parse naphthalene c1ccc2ccccc2c1', () => {
            const tree = Parser.parse('c1ccc2ccccc2c1');
            expect(tree.atom).toBe('c');
        });
    });

    describe('bracket atoms', () => {
        it('should parse [Na+]', () => {
            const tree = Parser.parse('[Na+]');
            expect(tree.atom.element).toBe('Na');
            expect(tree.atom.charge).toBe(1);
        });

        it('should parse [Cl-]', () => {
            const tree = Parser.parse('[Cl-]');
            expect(tree.atom.element).toBe('Cl');
            expect(tree.atom.charge).toBe(-1);
        });

        it('should parse [NH4+]', () => {
            const tree = Parser.parse('[NH4+]');
            expect(tree.atom.element).toBe('N');
            expect(tree.atom.hcount).toBe(4);
            expect(tree.atom.charge).toBe(1);
        });

        it('should parse isotopes like [13C]', () => {
            const tree = Parser.parse('[13C]');
            expect(tree.atom.element).toBe('C');
            expect(tree.atom.isotope).toBe(13);
        });
    });

    describe('stereochemistry', () => {
        it('should parse @ chirality', () => {
            const tree = Parser.parse('[C@H](F)(Cl)Br');
            expect(tree.atom.chirality).toBe('@');
        });

        it('should parse @@ chirality', () => {
            const tree = Parser.parse('[C@@H](F)(Cl)Br');
            expect(tree.atom.chirality).toBe('@@');
        });

        it('should parse E/Z bond stereo /', () => {
            const tree = Parser.parse('F/C=C/F');
            expect(tree.atom).toBe('F');
        });

        it('should parse E/Z bond stereo \\', () => {
            const tree = Parser.parse('F\\C=C\\F');
            expect(tree.atom).toBe('F');
        });
    });

    describe('disconnected structures', () => {
        it('should parse [Na+].[Cl-]', () => {
            const tree = Parser.parse('[Na+].[Cl-]');
            expect(tree.atom.element).toBe('Na');
        });
    });

    describe('error handling', () => {
        it('should throw on invalid SMILES', () => {
            expect(() => Parser.parse('')).toThrow();
        });

        it('should throw on unmatched parenthesis', () => {
            expect(() => Parser.parse('CC(C')).toThrow();
        });

        it('should not throw on unmatched ring closure (parser accepts it)', () => {
            // Note: The PEG parser does not validate ring closure matching;
            // unmatched ring closures are caught later during graph construction.
            expect(() => Parser.parse('C1CC')).not.toThrow();
        });
    });

    describe('complex molecules', () => {
        it('should parse aspirin CC(=O)Oc1ccccc1C(=O)O', () => {
            const tree = Parser.parse('CC(=O)Oc1ccccc1C(=O)O');
            expect(tree.atom).toBe('C');
        });

        it('should parse caffeine Cn1cnc2c1c(=O)n(c(=O)n2C)C', () => {
            const tree = Parser.parse('Cn1cnc2c1c(=O)n(c(=O)n2C)C');
            expect(tree.atom).toBe('C');
        });

        it('should parse glucose OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O', () => {
            const tree = Parser.parse('OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O');
            expect(tree.atom).toBe('O');
        });
    });
});
