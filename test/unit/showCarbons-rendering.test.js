/**
 * Minimal SVG smoke checks for `showCarbons`: ensures modes change rendered
 * text content, not only mode resolution (see showCarbons-mode-resolution.test.js).
 *
 * Carbon counts in labels use Unicode subscripts (e.g. CH\u2082), not ASCII "CH2".
 */
import {afterEach, describe, expect, it} from 'vitest';
import {createJSDOM}                     from './helpers';

import Parser    from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';

function renderInnerHtml(smiles, drawerOptions) {
    const dom = createJSDOM();

    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'id', 'test-svg-showcarbons');
    dom.window.document.body.appendChild(svg);

    const tree = Parser.parse(smiles);
    expect(tree).toBeDefined();

    const drawer = new SvgDrawer({isomeric: true, ...drawerOptions});
    expect(() => drawer.draw(tree, svg, 'light', false)).not.toThrow();
    expect(drawer.preprocessor.graph.vertices.length).toBeGreaterThan(0);

    return svg.innerHTML;
}

describe('showCarbons rendering (SVG)', () => {
    it("with mode 'all', propane includes explicit hydrogen-count subscripts in labels", () => {
        const html = renderInnerHtml('CCC', {showCarbons: 'all'});
        expect(/\u2082|\u2083/.test(html)).toBe(true);
    });

    it("with mode 'none', propane omits CH\u2082 / CH\u2083 style labels (no hydrogen subscripts)", () => {
        const html = renderInnerHtml('CCC', {showCarbons: 'none'});
        expect(/\u2082|\u2083/.test(html)).toBe(false);
    });
});
