import {describe, it, expect} from 'vitest';
import {createJSDOM}          from '../helpers';

import Parser    from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';

import reference from './reference.json' with {type: 'json'};

const INVERSION_BASELINE_IDS = [
    'Codeine:v19',
    'Estradiol:v4',
    'Lovastatin:v18',
    'Simvastatin:v18',
    'alpha-Pinene:v4',
    'alpha-Pinene:v7',
].sort();

function subtractSorted(a, b) {
    const bSet = new Set(b);
    return a.filter(value => !bSet.has(value)).sort();
}

function render(smiles) {
    const dom = createJSDOM();

    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'id', 'test-svg');
    dom.window.document.body.appendChild(svg);

    const tree = Parser.parse(smiles);
    const drawer = new SvgDrawer({isomeric: true});
    drawer.draw(tree, svg, 'light', false);

    return drawer.preprocessor;
}

describe('Stereochemistry inversion baseline', () => {
    it('keeps parity inversion trigger IDs stable', () => {
        const actualIds = [];

        for (const [smiles, ref] of Object.entries(reference)) {
            const pp = render(smiles);

            for (let i = 0; i < pp.graph.vertices.length; i++) {
                const vertex = pp.graph.vertices[i];
                if (!vertex.value.isStereoCenter) {
                    continue;
                }

                const neighbours = vertex.getNeighbours();
                if (pp._shouldInvertStereoParity(vertex, neighbours)) {
                    actualIds.push(`${ref.name}:v${vertex.id}`);
                }
            }
        }

        actualIds.sort();

        const unexpectedIds = subtractSorted(actualIds, INVERSION_BASELINE_IDS);
        const missingIds = subtractSorted(INVERSION_BASELINE_IDS, actualIds);

        if (unexpectedIds.length > 0) {
            console.log(`Unexpected inversion IDs: ${unexpectedIds.join(', ')}`);
        }

        if (missingIds.length > 0) {
            console.log(`Missing inversion IDs: ${missingIds.join(', ')}`);
        }

        expect(unexpectedIds.length).toBe(0);
        expect(missingIds.length).toBe(0);
    });
});
