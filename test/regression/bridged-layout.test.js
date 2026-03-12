import {describe, it, expect} from 'vitest';
import {JSDOM} from 'jsdom';
import Parser from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';
import Vector2 from '../../src/Vector2.js';

function setupDOM() {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window;

    return dom;
}

function averagePosition(vertices) {
    let center = new Vector2(0, 0);

    for (let i = 0; i < vertices.length; i++) {
        center.add(vertices[i].position);
    }

    return center.divide(vertices.length);
}

function expectBridgeAtomInside(smiles) {
    const dom = setupDOM();
    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dom.window.document.body.appendChild(svg);

    const tree = Parser.parse(smiles);
    const drawer = new SvgDrawer({isomeric: true});
    drawer.draw(tree, svg, 'light', false);

    const vertices = drawer.preprocessor.graph.vertices;
    const bridgeAtom = vertices.find((vertex) => vertex.value.isBridge);

    expect(bridgeAtom).toBeDefined();

    const bridgeNodes = bridgeAtom.neighbours
        .map((id) => vertices[id])
        .filter((vertex) => vertex.value.isBridgeNode);

    expect(bridgeNodes.length).toBeGreaterThan(1);

    const centroid = averagePosition(vertices);
    const bridgeDistance = bridgeAtom.position.distance(centroid);

    for (let i = 0; i < bridgeNodes.length; i++) {
        expect(bridgeDistance).toBeLessThan(bridgeNodes[i].position.distance(centroid));
    }
}

describe('Bridged ring layout', () => {
    it('keeps the bridge atom inside for C1CC2CC1CC2', () => {
        expectBridgeAtomInside('C1CC2CC1CC2');
    });

    it('keeps the bridge atom inside for C1CC2CCC1C2', () => {
        expectBridgeAtomInside('C1CC2CCC1C2');
    });
});
