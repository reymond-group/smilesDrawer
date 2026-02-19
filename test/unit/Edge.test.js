import {describe, it, expect} from 'vitest';
import Edge from '../../src/Edge.js';

describe('Edge', () => {
    describe('constructor', () => {
        it('should store source and target ids', () => {
            const edge = new Edge(0, 1);
            expect(edge.sourceId).toBe(0);
            expect(edge.targetId).toBe(1);
        });

        it('should default weight to 1', () => {
            const edge = new Edge(0, 1);
            expect(edge.weight).toBe(1);
        });

        it('should accept custom weight', () => {
            const edge = new Edge(0, 1, 2);
            expect(edge.weight).toBe(2);
        });

        it('should default bondType to single bond', () => {
            const edge = new Edge(0, 1);
            expect(edge.bondType).toBe('-');
        });
    });

    describe('setBondType', () => {
        it('should set single bond', () => {
            const edge = new Edge(0, 1);
            edge.setBondType('-');
            expect(edge.bondType).toBe('-');
            expect(edge.weight).toBe(1);
        });

        it('should set double bond', () => {
            const edge = new Edge(0, 1);
            edge.setBondType('=');
            expect(edge.bondType).toBe('=');
            expect(edge.weight).toBe(2);
        });

        it('should set triple bond', () => {
            const edge = new Edge(0, 1);
            edge.setBondType('#');
            expect(edge.bondType).toBe('#');
            expect(edge.weight).toBe(3);
        });

        it('should set dot bond (weight 0)', () => {
            const edge = new Edge(0, 1);
            edge.setBondType('.');
            expect(edge.weight).toBe(0);
        });
    });

    describe('bonds map', () => {
        it('should have all expected bond types', () => {
            expect(Edge.bonds['.']).toBe(0);
            expect(Edge.bonds['-']).toBe(1);
            expect(Edge.bonds['/']).toBe(1);
            expect(Edge.bonds['\\']).toBe(1);
            expect(Edge.bonds['=']).toBe(2);
            expect(Edge.bonds['#']).toBe(3);
            expect(Edge.bonds['$']).toBe(4);
        });
    });
});
