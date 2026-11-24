import {describe, it, expect, vi} from 'vitest';
import {createJSDOM}              from '../helpers';

import SmilesDrawer from '../../src/SmilesDrawer.js';

describe('SmilesDrawer', () => {
    it('should be instantiable', () => {
        const drawer = new SmilesDrawer();
        expect(drawer).toBeDefined();
    });

    it('draws molecules to a canvas element target', () => {
        createJSDOM();

        const canvas = document.createElement('canvas');
        const drawer = new SmilesDrawer();
        const conversion = vi.spyOn(drawer, 'svgToCanvas').mockImplementation((svg, target) => target);
        const successCallback = vi.fn();
        const errorCallback = vi.fn();

        drawer.draw('C', canvas, 'light', successCallback, errorCallback);

        expect(errorCallback.mock.calls.length).toBe(0);
        expect(conversion.mock.calls.length).toBe(1);
        expect(conversion.mock.calls[0][1] === canvas).toBe(true);
        expect(successCallback.mock.calls.length).toBe(1);
        expect(successCallback.mock.calls[0][0] === canvas).toBe(true);
    });

    it('draws reactions to a canvas element target', () => {
        createJSDOM();

        const canvas = document.createElement('canvas');
        const drawer = new SmilesDrawer();
        const conversion = vi.spyOn(drawer, 'svgToCanvas').mockImplementation((svg, target) => target);
        const successCallback = vi.fn();
        const errorCallback = vi.fn();

        drawer.draw('[Pb]>>[Au]', canvas, 'light', successCallback, errorCallback);

        expect(errorCallback.mock.calls.length).toBe(0);
        expect(conversion.mock.calls.length).toBe(1);
        expect(conversion.mock.calls[0][1] === canvas).toBe(true);
        expect(successCallback.mock.calls.length).toBe(1);
        expect(successCallback.mock.calls[0][0] === canvas).toBe(true);
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