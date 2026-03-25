import {beforeEach, describe, expect, it, vi} from 'vitest';
import DomHelper from '../../src/DomHelper';

vi.mock(import('../../src/DomHelper'), {spy: true});

// A 16x16 square PNG gradient.  Red increases as 0x00, 0x11, 0x22, ..., 0xff along the X axis, and green does the same along the Y axis.
const RG_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASUlEQVQ4T2NkYGD4LwgkyMWMQJ0UGqBEqQHGlBrgQqkBoZQakEapAeWUGtBBqQEzKTVgFaUG7KbUgDOUGnCXUgPeUWrAf8oMAAAPoifpFu9pEQAAAABJRU5ErkJggg=='

// Similar to the above, but with solid quadrants: NW=black, NE=red, SE=yellow, SW=green.
const RG_SVG = new DOMParser().parseFromString(`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="2 2 4 4" width="16" height="16">
    <rect fill="#000" x="0" y="0" width="4" height="4" />
    <rect fill="#f00" x="4" y="0" width="4" height="4" />
    <rect fill="#0f0" x="0" y="4" width="4" height="4" />
    <rect fill="#ff0" x="4" y="4" width="4" height="4" />
</svg>
`, 'image/svg+xml').documentElement;

describe('DomHelper', () => {
    describe('create()', () => {
        it('should create canvases', () => {
            const result = DomHelper.create('canvas');
            expect(result).toBeInstanceOf(HTMLCanvasElement);
        });

        it('should create canvases with specific dimensions', () => {
            const result = DomHelper.create('canvas', 123, 234);
            expect(result).toBeInstanceOf(HTMLCanvasElement);
            expect(result.width).toBe(123);
            expect(result.height).toBe(234);
        });


        it('should create images', () => {
            const result = DomHelper.create('img');
            expect(result).toBeInstanceOf(HTMLImageElement);
        });

        it('should create images with specific dimensions', () => {
            const result = DomHelper.create('img', 123, 234);
            expect(result).toBeInstanceOf(HTMLImageElement);
            expect(result.width).toBe(123);
            expect(result.height).toBe(234);
        });


        it('should not create offscreen canvases without dimensions', () => {
            expect(() => {
                DomHelper.create('offscreen-canvas');
            }).toThrow();
        });

        it('should create offscreen canvases with specific dimensions', () => {
            const result = DomHelper.create('offscreen-canvas', 123, 234);
            expect(result).toBeInstanceOf(OffscreenCanvas);
            expect(result.width).toBe(123);
            expect(result.height).toBe(234);
        });


        it('should create svgs', () => {
            const result = DomHelper.create('svg');
            expect(result).toBeInstanceOf(SVGSVGElement);
        });

        it('should create svgs with specific dimensions', () => {
            const result = DomHelper.create('svg', 123, 234);
            expect(result).toBeInstanceOf(SVGSVGElement);

            const [w, h] = DomHelper.getDimensions(result);
            expect(w).toBe(123);
            expect(h).toBe(234);
        });


        it('should throw an exception for unsupported types', () => {
            expect(() => {
                DomHelper.create('chaos');
            }).toThrow();
        });
    });

    describe('createCanvas()', () => {
        it('should create canvases', () => {
            const result = DomHelper.createCanvas();
            expect(result).toBeInstanceOf(HTMLCanvasElement);
        });

        it('should create canvases with specific dimensions', () => {
            const result = DomHelper.createCanvas(123, 234);
            expect(result.width).toBe(123);
            expect(result.height).toBe(234);
        });
    });

    describe('createImg()', () => {
        it('should create images', () => {
            const result = DomHelper.createImg();
            expect(result).toBeInstanceOf(HTMLImageElement);
        });

        it('should create images with specific dimensions', () => {
            const result = DomHelper.createImg(123, 234);
            expect(result.width).toBe(123);
            expect(result.height).toBe(234);
        });
    });

    describe('createOffscreenCanvas()', () => {
        it('should not create offscreen canvases without dimensions', () => {
            expect(() => {
                DomHelper.createOffscreenCanvas();
            }).toThrow();
        });

        it('should create offscreen canvases with specific dimensions', () => {
            const result = DomHelper.createOffscreenCanvas(123, 234);
            expect(result).toBeInstanceOf(OffscreenCanvas);
            expect(result.width).toBe(123);
            expect(result.height).toBe(234);
        });
    });

    describe('createSvg()', () => {
        it('should create svgs', () => {
            const result = DomHelper.createSvg();
            expect(result).toBeInstanceOf(SVGSVGElement);
        });

        it('should create svgs with specific dimensions', () => {
            const result = DomHelper.createSvg(123, 234);
            expect(result).toBeInstanceOf(SVGSVGElement);

            const [w, h] = DomHelper.getDimensions(result);
            expect(w).toBe(123);
            expect(h).toBe(234);
        });
    });

    describe('dataUrlToCanvas()', () => {
        it('should draw to an existing canvas if provided', async () => {
            const canvas = DomHelper.createCanvas(10, 10);
            const result = await DomHelper.dataUrlToCanvas(RG_PNG, canvas, 16, 16);
            expect(result).toBe(canvas);
        });

        it('should create a new canvas if none was provided', async () => {
            const result = await DomHelper.dataUrlToCanvas(RG_PNG, null, 10, 10);
            expect(result).toBeInstanceOf(HTMLCanvasElement);
        });

        it('should update the dimensions of the canvas', async () => {
            const canvas = DomHelper.createCanvas(10, 10);
            const result = await DomHelper.dataUrlToCanvas(RG_PNG, canvas, 16, 16);
            expect(canvas.width).toBe(16);
            expect(canvas.height).toBe(16);
        });

        it('should draw the data url to the canvas', async () => {
            const canvas  = await DomHelper.dataUrlToCanvas(RG_PNG, null, 16, 16);
            const context = canvas.getContext('2d');

            // Spread these to convert Uint8ClampedArray => Array:
            let pixels = context.getImageData(0, 0, 1, 1);
            expect([...pixels.data]).toEqual([0, 0, 0, 255]);

            pixels = context.getImageData(0, 15, 1, 1);
            expect([...pixels.data]).toEqual([0, 255, 0, 255]);

            pixels = context.getImageData(15, 0, 1, 1);
            expect([...pixels.data]).toEqual([255, 0, 0, 255]);

            pixels = context.getImageData(15, 15, 1, 1);
            expect([...pixels.data]).toEqual([255, 255, 0, 255]);
        });
    });

    describe('dataUrlToImg()', () => {
        it('should draw to an existing image if provided', async () => {
            const image  = DomHelper.createImg(10, 10);
            const result = await DomHelper.dataUrlToImg(RG_PNG, image, 16, 16);
            expect(result).toBe(image);
        });

        it('should create a new image if none was provided', async () => {
            const result = await DomHelper.dataUrlToImg(RG_PNG, null, 10, 10);
            expect(result).toBeInstanceOf(HTMLImageElement);
        });

        it('should update the attributes of the image', async () => {
            const image  = DomHelper.createImg(10, 10);
            const result = await DomHelper.dataUrlToImg(RG_PNG, image, 16, 16);
            expect(image.width).toBe(16);
            expect(image.height).toBe(16);
            expect(image.src).toEqual(RG_PNG);
        });
    });

    describe('dataUrlToOffscreenCanvas()', () => {
        it('should draw to an existing offscreen canvas if provided', async () => {
            const canvas = DomHelper.createOffscreenCanvas(16, 16);
            const result = await DomHelper.dataUrlToOffscreenCanvas(RG_PNG, canvas, 16, 16);
            expect(result).toBe(canvas);
        });

        it('should create a new offscreen canvas if none was provided', async () => {
            const result = await DomHelper.dataUrlToOffscreenCanvas(RG_PNG, null, 16, 16);
            expect(result).toBeInstanceOf(OffscreenCanvas);
        });

        it('should update the dimensions of the offscreen canvas', async () => {
            const canvas = DomHelper.createOffscreenCanvas(10, 10);
            const result = await DomHelper.dataUrlToOffscreenCanvas(RG_PNG, canvas, 16, 16);
            expect(canvas.width).toBe(16);
            expect(canvas.height).toBe(16);
        });

        it('should draw the data url to the offscreen canvas', async () => {
            const canvas  = await DomHelper.dataUrlToOffscreenCanvas(RG_PNG, null, 16, 16);
            const context = canvas.getContext('2d');

            // Spread these to convert Uint8ClampedArray => Array:
            let pixels = context.getImageData(0, 0, 1, 1);
            expect([...pixels.data]).toEqual([0, 0, 0, 255]);

            pixels = context.getImageData(0, 15, 1, 1);
            expect([...pixels.data]).toEqual([0, 255, 0, 255]);

            pixels = context.getImageData(15, 0, 1, 1);
            expect([...pixels.data]).toEqual([255, 0, 0, 255]);

            pixels = context.getImageData(15, 15, 1, 1);
            expect([...pixels.data]).toEqual([255, 255, 0, 255]);
        });
    });

    describe('getDimensions()', () => {
        it('should get the dimensions of an svg', () => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttributeNS(null, 'width',  123);
            svg.setAttributeNS(null, 'height', 234);

            const dims = DomHelper.getDimensions(svg);
            expect(dims).toEqual([123, 234]);
        });
    });

    describe('getDrawable()', () => {
        beforeEach(() => {
            // Clear and load a base HTML structure for each test
            document.body.innerHTML = `<div>
                <svg id="svg-id"></svg>
                <canvas id="canvas-id"></canvas>
                <p id="other-id"></p>
            </div>`;
        });

        it('should pass through drawable elements unchanged', () => {
            const canvas = DomHelper.createCanvas();
            const result = DomHelper.getDrawable(canvas, HTMLCanvasElement);
            expect(result).toBe(canvas);
        });

        it('should get elements by id when passed a string', () => {
            const result = DomHelper.getDrawable('canvas-id', HTMLCanvasElement);
            expect(result).toBeInstanceOf(HTMLCanvasElement);
        });

        it('should get elements by id when passed a String', () => {
            const result = DomHelper.getDrawable(new String('svg-id'), SVGSVGElement);
            expect(result).toBeInstanceOf(SVGSVGElement);
        });

        it('should throw if it finds the wrong type of element', () => {
            expect(() => {
                DomHelper.getDrawable(new String('svg-id'), HTMLCanvasElement);
            }).toThrow();
        });
    });

    describe('svgTo()', () => {
        it('should copy an svg to an existing canvas', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const canvas = document.createElement('canvas');
            const result = await DomHelper.svgTo(svg, canvas);

            expect(result).toBe(canvas);
            expect(DomHelper.svgToCanvas).toHaveBeenCalledWith(svg, canvas);
        });

        it('should copy an svg to a new canvas when passed "canvas"', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const canvas = await DomHelper.svgTo(svg, 'canvas');

            expect(canvas).toBeInstanceOf(HTMLCanvasElement);
            expect(DomHelper.createCanvas).toHaveBeenCalledWith(123, 234);
            expect(DomHelper.svgToCanvas).toHaveBeenCalledWith(svg, canvas);
        });


        it('should copy an svg to an existing image', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const image  = document.createElement('img');
            const result = await DomHelper.svgTo(svg, image);

            expect(result).toBe(image);
            expect(DomHelper.svgToImg).toHaveBeenCalledWith(svg, image);
        });

        it('should copy an svg to a new image when passed "img"', async () => {
            const svg   = DomHelper.createSvg(123, 234);
            const image = await DomHelper.svgTo(svg, 'img');

            expect(image).toBeInstanceOf(HTMLImageElement);
            expect(DomHelper.createImg).toHaveBeenCalledWith(123, 234);
            expect(DomHelper.svgToImg).toHaveBeenCalledWith(svg, image);
        });


        it('should copy an svg to an existing offscreen canvas', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const canvas = new OffscreenCanvas(100, 200);
            const result = await DomHelper.svgTo(svg, canvas);

            expect(result).toBe(canvas);
            expect(DomHelper.svgToOffscreenCanvas).toHaveBeenCalledWith(svg, canvas);
        });

        it('should copy an svg to a new offscreen canvas when passed "offscreen-canvas"', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const canvas = await DomHelper.svgTo(svg, 'offscreen-canvas');

            expect(canvas).toBeInstanceOf(OffscreenCanvas);
            expect(DomHelper.createOffscreenCanvas).toHaveBeenCalledWith(123, 234);
            expect(DomHelper.svgToOffscreenCanvas).toHaveBeenCalledWith(svg, canvas);
        });


        it('should copy an svg to an existing svg', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const copy   = DomHelper.createSvg(100, 200);
            const result = await DomHelper.svgTo(svg, copy);

            expect(result).toBe(copy);
            expect(DomHelper.svgToSvg).toHaveBeenCalledWith(svg, copy);
        });

        it('should copy an svg to a new svg when passed "svg"', async () => {
            const svg  = DomHelper.createSvg(123, 234);
            const copy = await DomHelper.svgTo(svg, 'svg');

            expect(copy).toBeInstanceOf(SVGSVGElement);
            expect(DomHelper.createSvg).toHaveBeenCalledWith(123, 234);
            expect(DomHelper.svgToSvg).toHaveBeenCalledWith(svg, copy);
        });


        it('should throw when passed an invalid target', () => {
            expect(() => {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                DomHelper.svgTo(svg, new URL('https://example.com'));
            }).toThrow();
        });
    });

    describe('svgToCanvas()', () => {
        it('should create a new canvas if one is not provided', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const result = await DomHelper.svgToCanvas(svg);

            expect(result).toBeInstanceOf(HTMLCanvasElement);
        });

        it('should use an existing canvas if one is provided', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const canvas = DomHelper.createCanvas(100, 200);
            const result = await DomHelper.svgToCanvas(svg, canvas);

            expect(result).toBe(canvas);
        });

        it('should set the width and height of the canvas', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const canvas = DomHelper.createCanvas(100, 200);
            const result = await DomHelper.svgToCanvas(svg, canvas);

            expect(canvas.width).toBe(123);
            expect(canvas.height).toBe(234);
        });

        it('should copy image data from the svg to the canvas', async () => {
            const canvas  = await DomHelper.svgToCanvas(RG_SVG);
            const context = canvas.getContext('2d');

            // Spread these to convert Uint8ClampedArray => Array:
            let pixels = context.getImageData(0, 0, 1, 1);
            expect([...pixels.data]).toEqual([0, 0, 0, 255]);

            pixels = context.getImageData(0, 15, 1, 1);
            expect([...pixels.data]).toEqual([0, 255, 0, 255]);

            pixels = context.getImageData(15, 0, 1, 1);
            expect([...pixels.data]).toEqual([255, 0, 0, 255]);

            pixels = context.getImageData(15, 15, 1, 1);
            expect([...pixels.data]).toEqual([255, 255, 0, 255]);
        });
    });

    describe('svgToDataUrl()', () => {
        it('should include a mime type and encoding prefix', () => {
            const result = DomHelper.svgToDataUrl(RG_SVG);
            const prefix = result.slice(0, 33);

            expect(prefix).toEqual('data:image/svg+xml;charset-utf-8,');
        });

        it('should encode the svg structure', async () => {
            // This is hard to test, so just draw it and look at pixels.
            const result  = DomHelper.svgToDataUrl(RG_SVG);
            const canvas  = await DomHelper.dataUrlToCanvas(result, null, 16, 16);
            const context = canvas.getContext('2d');

            // Spread these to convert Uint8ClampedArray => Array:
            let pixels = context.getImageData(0, 0, 1, 1);
            expect([...pixels.data]).toEqual([0, 0, 0, 255]);

            pixels = context.getImageData(0, 15, 1, 1);
            expect([...pixels.data]).toEqual([0, 255, 0, 255]);

            pixels = context.getImageData(15, 0, 1, 1);
            expect([...pixels.data]).toEqual([255, 0, 0, 255]);

            pixels = context.getImageData(15, 15, 1, 1);
            expect([...pixels.data]).toEqual([255, 255, 0, 255]);
        });
    });

    describe('svgToImg()', () => {
        it('should create a new image if one is not provided', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const result = await DomHelper.svgToImg(svg);

            expect(result).toBeInstanceOf(HTMLImageElement);
        });

        it('should use an existing image if one is provided', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const image  = DomHelper.createImg(100, 200);
            const result = await DomHelper.svgToImg(svg, image);

            expect(result).toBe(image);
        });

        it('should set the width and height of the image', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const image  = DomHelper.createImg(100, 200);
            const result = await DomHelper.svgToImg(svg, image);

            expect(image.width).toBe(123);
            expect(image.height).toBe(234);
        });
    });

    describe('svgToOffscreenCanvas()', () => {
        it('should create a new offscreen canvas if one is not provided', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const result = await DomHelper.svgToOffscreenCanvas(svg);

            expect(result).toBeInstanceOf(OffscreenCanvas);
        });

        it('should use an existing offscreen canvas if one is provided', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const canvas = DomHelper.createOffscreenCanvas(100, 200);
            const result = await DomHelper.svgToOffscreenCanvas(svg, canvas);

            expect(result).toBe(canvas);
        });

        it('should set the width and height of the offscreen canvas', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const canvas = DomHelper.createOffscreenCanvas(100, 200);
            const result = await DomHelper.svgToOffscreenCanvas(svg, canvas);

            expect(canvas.width).toBe(123);
            expect(canvas.height).toBe(234);
        });

        it('should copy image data from the svg to the offscreen canvas', async () => {
            const canvas  = await DomHelper.svgToOffscreenCanvas(RG_SVG);
            const context = canvas.getContext('2d');

            // Spread these to convert Uint8ClampedArray => Array:
            let pixels = context.getImageData(0, 0, 1, 1);
            expect([...pixels.data]).toEqual([0, 0, 0, 255]);

            pixels = context.getImageData(0, 15, 1, 1);
            expect([...pixels.data]).toEqual([0, 255, 0, 255]);

            pixels = context.getImageData(15, 0, 1, 1);
            expect([...pixels.data]).toEqual([255, 0, 0, 255]);

            pixels = context.getImageData(15, 15, 1, 1);
            expect([...pixels.data]).toEqual([255, 255, 0, 255]);
        });
    });

    describe('svgToSvg()', () => {
        it('should create a new svg if one is not provided', async () => {
            const svg    = DomHelper.createSvg(123, 234);
            const result = await DomHelper.svgToSvg(svg);

            expect(result).toBeInstanceOf(SVGSVGElement);
            expect(result).not.toBe(svg);
        });

        it('should remove existing children from the target', async () => {
            const src = DomHelper.createSvg(100, 200);
            const dst = DomHelper.createSvg(100, 200);

            const circle = document.createElementNS(null, 'circle');
            circle.setAttributeNS(null, 'cx',    '70');
            circle.setAttributeNS(null, 'cy',   '130');
            circle.setAttributeNS(null, 'radius', '5');
            dst.append(circle);

            await DomHelper.svgToSvg(src, dst);
            expect(dst.children.length).toBe(0);
        });

        it('should copy nodes from one svg to another', async () => {
            const svg = DomHelper.createSvg(100, 200);

            const circle = document.createElementNS(null, 'circle');
            circle.setAttributeNS(null, 'cx',    '70');
            circle.setAttributeNS(null, 'cy',   '130');
            circle.setAttributeNS(null, 'radius', '5');
            svg.append(circle);

            const copy = await DomHelper.svgToSvg(svg);
            // Slightly different than the XML because HTML doesn't like namespaces or self-closing tags.
            expect(copy.innerHTML).toEqual('<circle cx="70" cy="130" radius="5"></circle>');
        });

        it('should copy attributes from one svg to the other', async () => {
            const source = DomHelper.createSvg(123, 234);
            source.setAttributeNS(null, 'viewBox', '0 0 100 200');
            source.setAttributeNS(null, 'style',   'width:123; height:234;');

            const target = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const result = await DomHelper.svgToSvg(source, target);

            expect(result.getAttributeNS(null, 'width')).toEqual('123');
            expect(result.getAttributeNS(null, 'height')).toEqual('234');
            expect(result.getAttributeNS(null, 'viewBox')).toEqual('0 0 100 200');
            expect(result.getAttributeNS(null, 'style')).toEqual('width:123; height:234;');
        });
    });

    describe('svgToXml()', () => {
        it('should return the expected xml', () => {
            const svg = DomHelper.createSvg(100, 200);

            const circle = document.createElementNS(null, 'circle');
            circle.setAttributeNS(null, 'cx',    '70');
            circle.setAttributeNS(null, 'cy',   '130');
            circle.setAttributeNS(null, 'radius', '5');
            svg.append(circle);

            const xml = DomHelper.svgToXml(svg);
            // This uses an XMLSerializer, which adds the necessary namespaces, etc.
            expect(xml).toEqual('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="200"><circle xmlns="" cx="70" cy="130" radius="5"/></svg>');
        });
    });
});
