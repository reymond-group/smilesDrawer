import {describe, it, expect} from 'vitest';
import MathHelper from '../../src/MathHelper.js';

describe('MathHelper', () => {
    describe('round', () => {
        it('should round to given decimals', () => {
            expect(MathHelper.round(3.14159, 2)).toBe(3.14);
            expect(MathHelper.round(3.14159, 4)).toBe(3.1416);
        });

        it('should round to nearest integer when decimals is 0 or falsy', () => {
            expect(MathHelper.round(3.7)).toBe(4);
            expect(MathHelper.round(3.2)).toBe(3);
        });
    });

    describe('angle conversions', () => {
        it('toRad should convert degrees to radians', () => {
            expect(MathHelper.toRad(180)).toBeCloseTo(Math.PI);
            expect(MathHelper.toRad(90)).toBeCloseTo(Math.PI / 2);
            expect(MathHelper.toRad(360)).toBeCloseTo(2 * Math.PI);
        });

        it('toDeg should convert radians to degrees', () => {
            expect(MathHelper.toDeg(Math.PI)).toBeCloseTo(180);
            expect(MathHelper.toDeg(Math.PI / 2)).toBeCloseTo(90);
        });

        it('roundtrip toRad -> toDeg should preserve value', () => {
            expect(MathHelper.toDeg(MathHelper.toRad(45))).toBeCloseTo(45);
        });
    });

    describe('polygon geometry', () => {
        it('innerAngle of equilateral triangle = 60 deg', () => {
            expect(MathHelper.toDeg(MathHelper.innerAngle(3))).toBeCloseTo(60);
        });

        it('innerAngle of square = 90 deg', () => {
            expect(MathHelper.toDeg(MathHelper.innerAngle(4))).toBeCloseTo(90);
        });

        it('innerAngle of hexagon = 120 deg', () => {
            expect(MathHelper.toDeg(MathHelper.innerAngle(6))).toBeCloseTo(120);
        });

        it('centralAngle of hexagon = 60 deg', () => {
            expect(MathHelper.toDeg(MathHelper.centralAngle(6))).toBeCloseTo(60);
        });

        it('polyCircumradius for unit-side hexagon', () => {
            // For a regular hexagon with side 1, circumradius = 1
            expect(MathHelper.polyCircumradius(1, 6)).toBeCloseTo(1);
        });
    });

    describe('meanAngle', () => {
        it('should return 0 for [0]', () => {
            expect(MathHelper.meanAngle([0])).toBeCloseTo(0);
        });

        it('should handle opposite angles wrapping', () => {
            // Mean of 0 and PI should be PI/2
            expect(MathHelper.meanAngle([0, Math.PI / 2])).toBeCloseTo(Math.PI / 4);
        });
    });

    describe('parityOfPermutation', () => {
        it('identity permutation has parity 1 (even)', () => {
            expect(MathHelper.parityOfPermutation([0, 1, 2])).toBe(1);
        });

        it('single swap has parity -1 (odd)', () => {
            expect(MathHelper.parityOfPermutation([1, 0, 2])).toBe(-1);
        });

        it('cyclic permutation of length 3 has parity 1 (even)', () => {
            expect(MathHelper.parityOfPermutation([1, 2, 0])).toBe(1);
        });
    });
});
