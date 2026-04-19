/**
 * Minimal SVG smoke checks for `showCarbons`: ensures modes change rendered
 * text content, not only mode resolution (see showCarbons-mode-resolution.test.js).
 *
 * Carbon counts in labels use Unicode subscripts (e.g. CH\u2082), not ASCII "CH2".
 */
import {afterEach, describe, expect, it} from 'vitest';
import {createJSDOM}                     from '../helpers';

import Parser    from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';

function getAtomLabels(smiles, drawerOptions) {
    const dom = createJSDOM();

    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'id', 'test-svg-showcarbons');
    dom.window.document.body.appendChild(svg);

    const tree = Parser.parse(smiles);
    expect(tree).toBeDefined();

    const drawer = new SvgDrawer({isomeric: true, ...drawerOptions});
    expect(() => drawer.draw(tree, svg, 'light', false)).not.toThrow();
    expect(drawer.preprocessor.graph.vertices.length).toBeGreaterThan(0);

    // Pad with spaces so that each label is clearly separate:
    const texts = Array.from(svg.querySelectorAll('text'));
    return ` ${texts.map(t => t.textContent).join(' ')} `;
}

describe('showCarbons rendering (SVG)', () => {
    it("with mode 'none', propane omits CH₂ / CH₃ style labels (no hydrogen subscripts)", () => {
        const html = getAtomLabels('CCC', {showCarbons: 'none'});
        expect(html).not.toMatch(/C/);
    });

    it("with mode 'default', propane doesn't show any explicit carbons", () => {
        const html = getAtomLabels('CCC', {showCarbons: 'default'});
        expect(html).not.toMatch(/C/);
    });

    it("with mode 'terminal' and 'terminalCarbons' set, propane shows CH₃ but not CH₂", () => {
        const html = getAtomLabels('CCC', {showCarbons: 'terminal', terminalCarbons: true});
        expect(html).toMatch(/CH₃/);
        expect(html).not.toMatch(/CH₂/);
    });

    it("with mode 'terminal', propane shows CH₃ but not CH₂", () => {
        const html = getAtomLabels('CCC', {showCarbons: 'terminal'});
        expect(html).toMatch(/CH₃/);
        expect(html).not.toMatch(/CH₂/);
    });

    it("with mode 'acyclic', propane shows both CH₃ and CH₂", () => {
        const html = getAtomLabels('CCC', {showCarbons: 'acyclic'});
        expect(html).toMatch(/CH₃/);
        expect(html).toMatch(/CH₂/);
    });

    it("with mode 'acyclic', toluene shows CH₃ but not CH₂ or CH", () => {
        const html = getAtomLabels('Cc1ccccc1', {showCarbons: 'acyclic'});
        expect(html).toMatch(/CH₃/);
        expect(html).not.toMatch(/CH₂/);
        expect(html).not.toMatch(/CH /);
    });

    it("with mode 'all', propane shows both CH₃ and CH₂", () => {
        const html = getAtomLabels('CCC', {showCarbons: 'all'});
        expect(html).toMatch(/CH₃/);
        expect(html).toMatch(/CH₂/);
    });

    it("with mode 'all', toluene shows both CH₃ and CH", () => {
        const html = getAtomLabels('Cc1ccccc1', {showCarbons: 'all'});
        expect(html).toMatch(/CH₃/);
        expect(html).toMatch(/CH /);
    });
});
