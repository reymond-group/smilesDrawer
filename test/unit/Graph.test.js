import {describe, it, expect} from 'vitest';
import Parser from '../../src/Parser.js';
import Graph from '../../src/Graph.js';

describe('Graph', () => {
    function graphFromSmiles(smiles) {
        return new Graph(Parser.parse(smiles), true);
    }

    describe('construction from SMILES', () => {
        it('should build graph for methane (C)', () => {
            const g = graphFromSmiles('C');
            expect(g.vertices.length).toBe(1);
            expect(g.edges.length).toBe(0);
        });

        it('should build graph for ethane (CC)', () => {
            const g = graphFromSmiles('CC');
            expect(g.vertices.length).toBe(2);
            expect(g.edges.length).toBe(1);
        });

        it('should build graph for propane (CCC)', () => {
            const g = graphFromSmiles('CCC');
            expect(g.vertices.length).toBe(3);
            expect(g.edges.length).toBe(2);
        });

        it('should build graph for branched molecule CC(C)C', () => {
            const g = graphFromSmiles('CC(C)C');
            expect(g.vertices.length).toBe(4);
            expect(g.edges.length).toBe(3);
        });

        it('should build graph for cyclohexane C1CCCCC1', () => {
            const g = graphFromSmiles('C1CCCCC1');
            expect(g.vertices.length).toBe(6);
            // Ring closure adds the 6th edge via ringbonds, but
            // the spanning tree only has 5 edges initially; the 6th
            // is added during ring closure processing.
            expect(g.edges.length).toBe(5);
        });

        it('should build graph for benzene c1ccccc1', () => {
            const g = graphFromSmiles('c1ccccc1');
            expect(g.vertices.length).toBe(6);
            expect(g.edges.length).toBe(5);
        });
    });

    describe('bond types', () => {
        it('should create double bond edges for C=C', () => {
            const g = graphFromSmiles('C=C');
            expect(g.edges.length).toBe(1);
            expect(g.edges[0].weight).toBe(2);
        });

        it('should create triple bond edges for C#C', () => {
            const g = graphFromSmiles('C#C');
            expect(g.edges.length).toBe(1);
            expect(g.edges[0].weight).toBe(3);
        });
    });

    describe('bracket atoms', () => {
        it('should handle charged atoms [Na+]', () => {
            const g = graphFromSmiles('[Na+]');
            expect(g.vertices.length).toBe(1);
            expect(g.vertices[0].value.bracket.charge).toBe(1);
        });

        it('should handle hydrogens [NH3]', () => {
            const g = graphFromSmiles('[NH3]');
            expect(g.vertices[0].value.bracket.hcount).toBe(3);
        });
    });

    describe('element types', () => {
        it('should correctly identify aromatic atoms', () => {
            const g = graphFromSmiles('c1ccccc1');
            for (const vertex of g.vertices) {
                expect(vertex.value.isPartOfAromaticRing).toBe(true);
            }
        });

        it('non-aromatic atoms should not be flagged', () => {
            const g = graphFromSmiles('CCCCCC');
            for (const vertex of g.vertices) {
                expect(vertex.value.isPartOfAromaticRing).toBe(false);
            }
        });
    });

    describe('disconnected structures', () => {
        it('should handle dot-separated components [Na+].[Cl-]', () => {
            const g = graphFromSmiles('[Na+].[Cl-]');
            expect(g.vertices.length).toBe(2);
            // Dot bond creates an edge with weight 0
            const dotEdges = g.edges.filter(e => e.weight === 0);
            expect(dotEdges.length).toBe(1);
        });
    });

    describe('complex molecules', () => {
        it('should parse aspirin without errors', () => {
            const g = graphFromSmiles('CC(=O)Oc1ccccc1C(=O)O');
            expect(g.vertices.length).toBeGreaterThan(0);
            expect(g.edges.length).toBeGreaterThan(0);
        });

        it('should parse caffeine without errors', () => {
            const g = graphFromSmiles('Cn1cnc2c1c(=O)n(c(=O)n2C)C');
            expect(g.vertices.length).toBeGreaterThan(0);
        });

        it('should parse ibuprofen without errors', () => {
            const g = graphFromSmiles('CC(C)Cc1ccc(cc1)C(C)C(=O)O');
            expect(g.vertices.length).toBeGreaterThan(0);
        });
    });
});
