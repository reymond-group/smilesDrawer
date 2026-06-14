import {describe, it, expect, beforeEach, vi} from 'vitest';
import {JSDOM} from 'jsdom';
import SmilesDrawer from '../../src/SmilesDrawer.js';

describe('SmilesDrawer', () => {
    beforeEach(() => {
        const dom = new JSDOM('<!DOCTYPE html><html><body><div id="target" data-smiles="C"></div></body></html>');
        global.document = dom.window.document;
        global.window = dom.window;
        global.HTMLElement = dom.window.HTMLElement;
        global.HTMLImageElement = dom.window.HTMLImageElement;
        global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
        global.SVGElement = dom.window.SVGElement;
    });

    it('should be instantiable', () => {
        const drawer = new SmilesDrawer();
        expect(drawer).toBeDefined();
    });

    it('should parse valid JSON options', () => {
        const element = document.createElement('div');
        element.setAttribute('data-smiles', 'C');
        element.setAttribute('data-smiles-options', '{"width": 500}');
        document.body.appendChild(element);

        const drawSpy = vi.spyOn(SmilesDrawer.prototype, 'draw');
        const drawer = new SmilesDrawer();
        drawer.apply('data-smiles');

        const instance = drawSpy.mock.instances[0];
        expect(instance.drawer.opts.width).toBe(500);
    });

    it('should parse JSON options with single quotes as fallback', () => {
        const element = document.createElement('div');
        element.setAttribute('data-smiles', 'C');
        element.setAttribute('data-smiles-options', "{'width': 500}");
        document.body.appendChild(element);

        const drawSpy = vi.spyOn(SmilesDrawer.prototype, 'draw');
        const drawer = new SmilesDrawer();
        drawer.apply('data-smiles');

        const instance = drawSpy.mock.instances[0];
        expect(instance.drawer.opts.width).toBe(500);
    });

    it('should parse valid JSON containing an apostrophe without corruption', () => {
        const element = document.createElement('div');
        element.setAttribute('data-smiles', 'C');
        element.setAttribute('data-smiles-options', '{"label": "John\'s"}');
        document.body.appendChild(element);

        const drawSpy = vi.spyOn(SmilesDrawer.prototype, 'draw');
        const drawer = new SmilesDrawer();
        drawer.apply('data-smiles');

        const instance = drawSpy.mock.instances[0];
        expect(instance.drawer.opts.label).toBe("John's");
    });
});