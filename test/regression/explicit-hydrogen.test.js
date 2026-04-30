/**
 * Regression: explicit hydrogens on heteroatoms (e.g. [nH] in pyrrole)
 * must be rendered in the SVG output, in both aromatic and kekulized
 * forms. There have been past bugs where the H label disappeared.
 */
import {describe, it, expect} from 'vitest';
import {createJSDOM}          from '../helpers';

import Parser    from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';

function renderSVG(smiles) {
    const dom = createJSDOM();

    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dom.window.document.body.appendChild(svg);

    const tree = Parser.parse(smiles);
    const drawer = new SvgDrawer({isomeric: true});
    drawer.draw(tree, svg, 'light', false);

    return {svg, drawer};
}

// Returns the <text> elements whose combined tspan content matches `label`
// (e.g. "NH" or "HN"). Order-independent so it works regardless of which
// side of the atom the H is drawn on.
function findAtomLabel(svg, label) {
    const sorted = label.split('').sort().join('');
    return Array.from(svg.querySelectorAll('text')).filter(t => {
        const text = Array.from(t.querySelectorAll('tspan'))
            .map(s => s.textContent)
            .join('')
            .split('')
            .sort()
            .join('');
        return text === sorted;
    });
}

describe('Explicit hydrogens on heteroatoms', () => {
    const cases = [
        // [name, aromatic SMILES, kekulized SMILES, atom label]
        ['pyrrole',     'c1cc[nH]c1',         'C1=CC=CN1',          'NH'],
        ['indole',      'c1ccc2[nH]ccc2c1',   'C1=CC=C2NC=CC2=C1',  'NH'],
        ['imidazole',   'c1[nH]cnc1',         'C1=CN=CN1',          'NH'],
        ['pyrazole',    'c1cc[nH]n1',         'C1=CC=NN1',          'NH'],
    ];

    for (const [name, aromatic, kekulized, label] of cases) {
        it(`${name} (aromatic ${aromatic}) renders ${label}`, () => {
            const {svg} = renderSVG(aromatic);
            const labels = findAtomLabel(svg, label);
            expect(labels.length).toBeGreaterThan(0);
        });

        it(`${name} (kekulized ${kekulized}) renders ${label}`, () => {
            const {svg} = renderSVG(kekulized);
            const labels = findAtomLabel(svg, label);
            expect(labels.length).toBeGreaterThan(0);
        });
    }
});
