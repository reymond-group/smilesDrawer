import {afterEach, describe, expect, it} from 'vitest';
import {JSDOM} from 'jsdom';
import Parser from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';
import SvgWrapper from '../../src/SvgWrapper.js';

let restoreGetContext = null;

function setupDom() {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
    return dom;
}

function disableCanvasContext(dom) {
    const proto = dom.window.HTMLCanvasElement.prototype;
    const original = proto.getContext;
    proto.getContext = () => null;
    restoreGetContext = () => {
        proto.getContext = original;
    };
}

afterEach(() => {
    if (restoreGetContext) {
        restoreGetContext();
        restoreGetContext = null;
    }
});

describe('SvgWrapper', () => {
    it('falls back to estimated text size when canvas is unavailable', () => {
        const dom = setupDom();
        disableCanvasContext(dom);

        const dims = SvgWrapper.measureText('CH3', 11, 'Helvetica');

        expect(dims.width).toBeGreaterThan(0);
        expect(dims.height).toBeGreaterThan(0);
    });

    it('renders SVG without canvas text metrics support', () => {
        const dom = setupDom();
        disableCanvasContext(dom);

        const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'id', 'test-svg');
        dom.window.document.body.appendChild(svg);

        const tree = Parser.parse('N[C@@H](C)C(=O)O');
        const drawer = new SvgDrawer({isomeric: true});

        expect(() => drawer.draw(tree, svg, 'light', false)).not.toThrow();
        expect(drawer.preprocessor.graph.vertices.length).toBeGreaterThan(0);
    });
});
