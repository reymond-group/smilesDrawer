import {JSDOM} from 'jsdom';

export function createJSDOM(options) {
    options ||= {};

    const dom = new JSDOM(options.html || '<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window   = dom.window;

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
