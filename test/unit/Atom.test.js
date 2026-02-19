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

    describe('maxBonds', () => {
        it('should return correct max bonds', () => {
            expect(Atom.maxBonds['C']).toBe(4);
            expect(Atom.maxBonds['N']).toBe(3);
            expect(Atom.maxBonds['O']).toBe(2);
            expect(Atom.maxBonds['H']).toBe(1);
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
