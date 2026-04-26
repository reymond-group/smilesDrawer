import {describe, it, expect} from 'vitest';
import Atom from '../../src/Atom.js';

describe('Atom', () => {
    describe('constructor', () => {
        it('should uppercase single-letter elements', () => {
            const atom = new Atom('c');
            expect(atom.element).toBe('C');
        });

        it('should preserve two-letter elements', () => {
            const atom = new Atom('Br');
            expect(atom.element).toBe('Br');
        });

        it('should detect aromatic atoms', () => {
            const aromatic = new Atom('c');
            expect(aromatic.isPartOfAromaticRing).toBe(true);

            const normal = new Atom('C');
            expect(normal.isPartOfAromaticRing).toBe(false);
        });

        it('should default to single bond type', () => {
            const atom = new Atom('C');
            expect(atom.bondType).toBe('-');
        });

        it('should accept custom bond type', () => {
            const atom = new Atom('C', '=');
            expect(atom.bondType).toBe('=');
        });

        it('should initialize with empty rings', () => {
            const atom = new Atom('C');
            expect(atom.rings).toEqual([]);
            expect(atom.ringbonds).toEqual([]);
        });
    });

    describe('isHeteroAtom', () => {
        it('C is not a heteroatom', () => {
            expect(new Atom('C').isHeteroAtom()).toBe(false);
        });

        it('H is not a heteroatom', () => {
            expect(new Atom('H').isHeteroAtom()).toBe(false);
        });

        it('N is a heteroatom', () => {
            expect(new Atom('N').isHeteroAtom()).toBe(true);
        });

        it('O is a heteroatom', () => {
            expect(new Atom('O').isHeteroAtom()).toBe(true);
        });

        it('S is a heteroatom', () => {
            expect(new Atom('S').isHeteroAtom()).toBe(true);
        });
    });

    describe('attachPseudoElement', () => {
        it('should attach and count pseudo elements', () => {
            const atom = new Atom('C');
            atom.attachPseudoElement('O', 'C', 0, 0);
            expect(atom.hasAttachedPseudoElements).toBe(true);
            expect(atom.getAttachedPseudoElementsCount()).toBe(1);
        });

        it('should increment count for duplicate pseudo elements', () => {
            const atom = new Atom('C');
            atom.attachPseudoElement('O', 'C', 0, 0);
            atom.attachPseudoElement('O', 'C', 0, 0);
            const pseudos = atom.getAttachedPseudoElements();
            const key = Object.keys(pseudos)[0];
            expect(pseudos[key].count).toBe(2);
        });

        it('should handle null hydrogenCount and charge', () => {
            const atom = new Atom('C');
            atom.attachPseudoElement('Br', 'C', null, null);
            expect(atom.getAttachedPseudoElementsCount()).toBe(1);
        });
    });

    describe('countImplicitHydrogens()', () => {
        it('should return the expected values for lone atoms in the "organic subset"', () => {
            expect(new Atom('B' ).countImplicitHydrogens()).toEqual(3);
            expect(new Atom('C' ).countImplicitHydrogens()).toEqual(4);
            expect(new Atom('N' ).countImplicitHydrogens()).toEqual(3);
            expect(new Atom('O' ).countImplicitHydrogens()).toEqual(2);
            expect(new Atom('F' ).countImplicitHydrogens()).toEqual(1);
            expect(new Atom('P' ).countImplicitHydrogens()).toEqual(3);
            expect(new Atom('S' ).countImplicitHydrogens()).toEqual(2);
            expect(new Atom('Cl').countImplicitHydrogens()).toEqual(1);
            expect(new Atom('Br').countImplicitHydrogens()).toEqual(1);
            expect(new Atom('I' ).countImplicitHydrogens()).toEqual(1);
        });

        it('should return smaller values for atoms with bonds', () => {
            const atom1 = new Atom('C');
            atom1.bondCount = 3;
            expect(atom1.countImplicitHydrogens()).toEqual(1);

            const atom2 = new Atom('O');
            atom2.bondCount = 2;
            expect(atom2.countImplicitHydrogens()).toEqual(0);
        });

        // TODO: This is a HACK and should eventually be reworked.
        it('should return smaller values for atoms in aromatic rings', () => {
            const atom1 = new Atom('C');
            atom1.bondCount = 2;
            atom1.isPartOfAromaticRing = true;
            expect(atom1.countImplicitHydrogens()).toEqual(1);

            const atom2 = new Atom('N');
            atom2.bondCount = 2;
            atom2.isPartOfAromaticRing = true;
            expect(atom2.countImplicitHydrogens()).toEqual(0);
        });

        it('should correctly handle atoms with multiple possible valences', () => {
            function test(element, bonds, hydrogens) {
                const atom = new Atom(element);
                atom.bondCount = bonds;
                expect(atom.countImplicitHydrogens()).toEqual(hydrogens);
            }

            test('N', 0, 3);
            test('N', 1, 2);
            test('N', 2, 1);
            test('N', 3, 0);
            test('N', 4, 1);
            test('N', 5, 0);

            test('S', 0, 2);
            test('S', 1, 1);
            test('S', 2, 0);
            test('S', 3, 1);
            test('S', 4, 0);
            test('S', 5, 1);
            test('S', 6, 0);

            test('P', 0, 3);
            test('P', 1, 2);
            test('P', 2, 1);
            test('P', 3, 0);
            test('P', 4, 1);
            test('P', 5, 0);
        });

        it('should return zero for atoms with more bonds than expected', () => {
            const atom1 = new Atom('O');
            atom1.bondCount = 42;
            expect(atom1.countImplicitHydrogens()).toEqual(0);

            const atom2 = new Atom('C');
            atom2.bondCount = 5;
            expect(atom2.countImplicitHydrogens()).toEqual(0);
        });

        it('should return zero for unknown and invalid atoms', () => {
            expect(new Atom('Be').countImplicitHydrogens()).toEqual(0);
            expect(new Atom('W' ).countImplicitHydrogens()).toEqual(0);
            expect(new Atom('Rb').countImplicitHydrogens()).toEqual(0);
            expect(new Atom('X' ).countImplicitHydrogens()).toEqual(0);
        });

        it('should return the user-specified value for non-chiral bracket atoms', () => {
            const atom = new Atom('C');
            atom.bracket = {hcount: 3};
            expect(atom.countImplicitHydrogens()).toEqual(3);
        });

        it('should return a calculated value for chiral bracket atoms', () => {
            const atom = new Atom('C');
            atom.bracket = {hcount: 1, chirality: '@'};
            atom.bondCount = 4; // Any H will be explicit in this case.
            expect(atom.countImplicitHydrogens()).toEqual(0);
        });
    });

    describe('neighbouringElements', () => {
        it('should track neighbours', () => {
            const atom = new Atom('C');
            atom.addNeighbouringElement('O');
            atom.addNeighbouringElement('N');
            expect(atom.neighbouringElements).toEqual(['O', 'N']);
        });

        it('neighbouringElementsEqual should compare sorted', () => {
            const atom = new Atom('C');
            atom.addNeighbouringElement('O');
            atom.addNeighbouringElement('N');
            expect(atom.neighbouringElementsEqual(['N', 'O'])).toBe(true);
            expect(atom.neighbouringElementsEqual(['O'])).toBe(false);
        });
    });

    describe('atomicNumbers', () => {
        it('should return correct atomic numbers', () => {
            expect(Atom.atomicNumbers['C']).toBe(6);
            expect(Atom.atomicNumbers['N']).toBe(7);
            expect(Atom.atomicNumbers['O']).toBe(8);
            expect(Atom.atomicNumbers['Fe']).toBe(26);
        });
    });

    describe('rings backup/restore', () => {
        it('should backup and restore rings', () => {
            const atom = new Atom('C');
            atom.rings = [1, 2, 3];
            atom.backupRings();
            atom.rings = [4, 5];
            atom.restoreRings();
            expect(atom.rings).toEqual([1, 2, 3]);
        });
    });
});
