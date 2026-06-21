import {describe, it, expect, vi} from 'vitest';
import {createJSDOM}              from '../helpers';

import SmilesDrawer from '../../src/SmilesDrawer.js';

describe('SmilesDrawer', () => {
    it('should be instantiable', () => {
        const drawer = new SmilesDrawer();
        expect(drawer).toBeDefined();
    });

    it('should parse valid JSON options', () => {
        createJSDOM();

        // Canvases are kinda broken in JSDOM...
        const element = document.createElement('img');
        element.setAttribute('data-smiles', 'C');
        element.setAttribute('data-smiles-options', '{"width": 1234}');
        document.body.appendChild(element);

        const drawSpy = vi.spyOn(SmilesDrawer.prototype, 'draw');
        drawSpy.mockClear();
        const drawer = new SmilesDrawer();
        drawer.apply('data-smiles');

        const instance = drawSpy.mock.instances[0];
        expect(instance.drawer.opts.width).toBe(1234);
    });

    it('should parse JSON options with single quotes as fallback', () => {
        createJSDOM();

        const element = document.createElement('img');
        element.setAttribute('data-smiles', 'C');
        element.setAttribute('data-smiles-options', "{'width': 1234}");
        document.body.appendChild(element);

        const drawSpy = vi.spyOn(SmilesDrawer.prototype, 'draw');
        drawSpy.mockClear();
        const drawer = new SmilesDrawer();
        drawer.apply('data-smiles');

        const instance = drawSpy.mock.instances[0];
        expect(instance.drawer.opts.width).toBe(1234);
    });

    it('should parse valid JSON containing an apostrophe without corruption', () => {
        createJSDOM();

        const element = document.createElement('img');
        element.setAttribute('data-smiles', 'C');
        element.setAttribute('data-smiles-options', '{"label": "John\'s"}');
        document.body.appendChild(element);

        const drawSpy = vi.spyOn(SmilesDrawer.prototype, 'draw');
        drawSpy.mockClear();
        const drawer = new SmilesDrawer();
        drawer.apply('data-smiles');

        const instance = drawSpy.mock.instances[0];
        expect(instance.drawer.opts.label).toBe("John's");
    });
});