import {describe, it, expect} from 'vitest';

import DrawerBase     from '../../src/DrawerBase.js';
import Ring           from '../../src/Ring.js';
import RingConnection from '../../src/RingConnection.js';

function makeRing(id, members) {
    let ring = new Ring(members);
    ring.id = id;
    return ring;
}

function makeDrawer(ringMembers, edgePairs) {
    let drawer = new DrawerBase({});
    drawer.rings = ringMembers.map((members, index) => makeRing(index, members));
    drawer.ringConnections = [];
    drawer.graph = {
        edges: edgePairs.map(([sourceId, targetId]) => ({sourceId, targetId})),
    };

    for (let i = 0; i < drawer.rings.length - 1; i++) {
        for (let j = i + 1; j < drawer.rings.length; j++) {
            let ringConnection = new RingConnection(drawer.rings[i], drawer.rings[j]);
            if (ringConnection.vertices.size > 0) {
                drawer.ringConnections.push(ringConnection);
            }
        }
    }

    return drawer;
}

function makeSquareGridDrawer() {
    let rings = [];
    let edges = [];
    let vertexId = (x, y) => y * 4 + x;

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            rings.push([
                vertexId(x, y),
                vertexId(x + 1, y),
                vertexId(x + 1, y + 1),
                vertexId(x, y + 1),
            ]);
        }
    }

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 3; x++) {
            edges.push([vertexId(x, y), vertexId(x + 1, y)]);
        }
    }

    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 3; y++) {
            edges.push([vertexId(x, y), vertexId(x, y + 1)]);
        }
    }

    return makeDrawer(rings, edges);
}

describe('cage ring system detection', () => {
    it('forces fused cube faces to use bridged-ring layout', () => {
        let drawer = makeDrawer(
            [
                [4, 5, 6, 7],
                [0, 1, 2, 3],
                [0, 1, 5, 4],
                [3, 2, 6, 7],
                [0, 3, 7, 4],
            ],
            [
                [0, 1], [1, 2], [2, 3], [3, 0],
                [4, 5], [5, 6], [6, 7], [7, 4],
                [0, 4], [1, 5], [2, 6], [3, 7],
            ]
        );

        drawer.markCageRingSystems();

        expect(drawer.ringConnections.some(rc => rc.isForcedBridge)).toBe(true);
        expect(drawer.ringConnections.every(rc => rc.vertices.size < 2 || rc.isForcedBridge)).toBe(true);
    });

    it('does not force a flat fused ring grid', () => {
        let drawer = makeSquareGridDrawer();

        drawer.markCageRingSystems();

        expect(drawer.ringConnections.every(rc => !rc.isForcedBridge)).toBe(true);
    });
});
