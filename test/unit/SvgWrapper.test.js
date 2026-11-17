import {afterEach, describe, expect, it} from 'vitest';
import {createJSDOM}                     from '../helpers';

import Parser     from '../../src/Parser.js';
import SvgDrawer  from '../../src/SvgDrawer.js';
import SvgWrapper from '../../src/SvgWrapper.js';

describe('SvgWrapper', () => {
    it('falls back to estimated text size when canvas is unavailable', () => {
        const dom = createJSDOM();

        const dims = SvgWrapper.measureText('CH3', 11, 'Helvetica');

        expect(dims.width).toBeGreaterThan(0);
        expect(dims.height).toBeGreaterThan(0);
    });

    it('renders SVG without canvas text metrics support', () => {
        const dom = createJSDOM();

        const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'id', 'test-svg');
        dom.window.document.body.appendChild(svg);

        const tree = Parser.parse('N[C@@H](C)C(=O)O');
        const drawer = new SvgDrawer({isomeric: true});

        expect(() => drawer.draw(tree, svg, 'light', false)).not.toThrow();
        expect(drawer.preprocessor.graph.vertices.length).toBeGreaterThan(0);
    });

    it('includes every text part in the viewBox', () => {
        const dom = createJSDOM();

        const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'id', 'test-svg');
        dom.window.document.body.appendChild(svg);

        const tree = Parser.parse('[NH4+]');
        const drawer = new SvgDrawer({isomeric: true});
        drawer.draw(tree, svg, 'light', null);

        const parts = Array.from(svg.querySelectorAll('text tspan'));
        expect(parts.length).toBeGreaterThan(0);

        const vertex = drawer.preprocessor.graph.vertices[0];
        const firstElementWidth = SvgWrapper.measureText(
            vertex.value.element,
            drawer.opts.fontSizeLarge,
            drawer.opts.fontFamily
        ).width;
        const textWidth = parts.reduce((sum, part) =>
            sum + SvgWrapper.measureText(
                part.textContent,
                drawer.opts.fontSizeLarge,
                drawer.opts.fontFamily
            ).width, 0);
        const viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
        const textStart = vertex.position.x - firstElementWidth / 2.0;

        expect(viewBox[0] + viewBox[2]).toBeGreaterThanOrEqual(textStart + textWidth - 0.01);
    });
});
