import {JSDOM} from 'jsdom';

export function createJSDOM(options) {
    options ||= {};

    const dom = new JSDOM(options.html || '<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window   = dom.window;

    // Add the global types that we understand and can draw to:
    global.HTMLImageElement  = dom.window.HTMLImageElement;
    global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
    global.OffscreenCanvas   = dom.window.HTMLCanvasElement; // HACK! Not supported by JSDOM.
    global.SVGElement        = dom.window.SVGElement;        // TODO: Use SVGSVGElement.

    if (options.patchCanvasGetContext !== false) {
        // Suppress the bajillion copies of this warning message that get written to stderr:
        // Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
        const proto    = dom.window.HTMLCanvasElement.prototype;
        const original = proto.getContext;

        proto.getContext = () => null;
        proto.restoreGetContext = () => {
            proto.getContext = original;
        };
    }

    return dom;
}
