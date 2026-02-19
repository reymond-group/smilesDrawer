import {describe, it, expect} from 'vitest';
import Vector2 from '../../src/Vector2.js';

describe('Vector2', () => {
    describe('constructor', () => {
        it('should default to (0, 0)', () => {
            const v = new Vector2();
            expect(v.x).toBe(0);
            expect(v.y).toBe(0);
        });

        it('should set x and y from arguments', () => {
            const v = new Vector2(3, 4);
            expect(v.x).toBe(3);
            expect(v.y).toBe(4);
        });

        it('should copy from another Vector2', () => {
            const a = new Vector2(5, 7);
            const b = new Vector2(a);
            expect(b.x).toBe(5);
            expect(b.y).toBe(7);
        });
    });

    describe('clone', () => {
        it('should return a new vector with same values', () => {
            const v = new Vector2(1, 2);
            const c = v.clone();
            expect(c.x).toBe(1);
            expect(c.y).toBe(2);
            expect(c).not.toBe(v);
        });
    });

    describe('arithmetic (mutating)', () => {
        it('add() should add in-place and return this', () => {
            const a = new Vector2(1, 2);
            const b = new Vector2(3, 4);
            const result = a.add(b);
            expect(a.x).toBe(4);
            expect(a.y).toBe(6);
            expect(result).toBe(a);
        });

        it('subtract() should subtract in-place', () => {
            const a = new Vector2(5, 7);
            a.subtract(new Vector2(2, 3));
            expect(a.x).toBe(3);
            expect(a.y).toBe(4);
        });

        it('multiplyScalar() should scale both components', () => {
            const v = new Vector2(3, 4);
            v.multiplyScalar(2);
            expect(v.x).toBe(6);
            expect(v.y).toBe(8);
        });

        it('divide() should divide both components', () => {
            const v = new Vector2(6, 8);
            v.divide(2);
            expect(v.x).toBe(3);
            expect(v.y).toBe(4);
        });

        it('invert() should negate both components', () => {
            const v = new Vector2(3, -4);
            v.invert();
            expect(v.x).toBe(-3);
            expect(v.y).toBe(4);
        });
    });

    describe('geometric properties', () => {
        it('length() should return Euclidean length', () => {
            const v = new Vector2(3, 4);
            expect(v.length()).toBe(5);
        });

        it('lengthSq() should return squared length', () => {
            const v = new Vector2(3, 4);
            expect(v.lengthSq()).toBe(25);
        });

        it('angle() should return atan2(y, x)', () => {
            const v = new Vector2(1, 0);
            expect(v.angle()).toBe(0);
            const v2 = new Vector2(0, 1);
            expect(v2.angle()).toBeCloseTo(Math.PI / 2);
        });

        it('distance() should return distance between two vectors', () => {
            const a = new Vector2(0, 0);
            const b = new Vector2(3, 4);
            expect(a.distance(b)).toBe(5);
        });

        it('distanceSq() should return squared distance', () => {
            const a = new Vector2(0, 0);
            const b = new Vector2(3, 4);
            expect(a.distanceSq(b)).toBe(25);
        });
    });

    describe('normalize', () => {
        it('should produce unit vector', () => {
            const v = new Vector2(3, 4);
            v.normalize();
            expect(v.length()).toBeCloseTo(1);
            expect(v.x).toBeCloseTo(0.6);
            expect(v.y).toBeCloseTo(0.8);
        });
    });

    describe('rotation', () => {
        it('rotate() by PI/2 should swap and negate', () => {
            const v = new Vector2(1, 0);
            v.rotate(Math.PI / 2);
            expect(v.x).toBeCloseTo(0);
            expect(v.y).toBeCloseTo(1);
        });

        it('rotateAround() should rotate around a center', () => {
            const v = new Vector2(2, 0);
            const center = new Vector2(1, 0);
            v.rotateAround(Math.PI, center);
            expect(v.x).toBeCloseTo(0);
            expect(v.y).toBeCloseTo(0);
        });
    });

    describe('static methods', () => {
        it('add() should return new vector', () => {
            const result = Vector2.add(new Vector2(1, 2), new Vector2(3, 4));
            expect(result.x).toBe(4);
            expect(result.y).toBe(6);
        });

        it('subtract() should return new vector', () => {
            const result = Vector2.subtract(new Vector2(5, 7), new Vector2(2, 3));
            expect(result.x).toBe(3);
            expect(result.y).toBe(4);
        });

        it('midpoint() should return center', () => {
            const mid = Vector2.midpoint(new Vector2(0, 0), new Vector2(4, 6));
            expect(mid.x).toBe(2);
            expect(mid.y).toBe(3);
        });

        it('dot() should compute dot product', () => {
            expect(Vector2.dot(new Vector2(1, 0), new Vector2(0, 1))).toBe(0);
            expect(Vector2.dot(new Vector2(2, 3), new Vector2(4, 5))).toBe(23);
        });

        it('angle() should return angle between vectors', () => {
            const a = new Vector2(1, 0);
            const b = new Vector2(0, 1);
            expect(Vector2.angle(a, b)).toBeCloseTo(Math.PI / 2);
        });

        it('normals() should return perpendicular vectors', () => {
            const [n1, n2] = Vector2.normals(new Vector2(0, 0), new Vector2(1, 0));
            expect(n1.x).toBeCloseTo(0);
            expect(n1.y).toBe(1);
            expect(n2.x).toBeCloseTo(0);
            expect(n2.y).toBe(-1);
        });
    });

    describe('isInPolygon', () => {
        it('should detect point inside a square', () => {
            const square = [
                new Vector2(0, 0),
                new Vector2(4, 0),
                new Vector2(4, 4),
                new Vector2(0, 4),
            ];
            expect(new Vector2(2, 2).isInPolygon(square)).toBe(true);
            expect(new Vector2(5, 5).isInPolygon(square)).toBe(false);
        });
    });
});
