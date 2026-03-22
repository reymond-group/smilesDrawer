type Drawable = HTMLCanvasElement | HTMLImageElement | OffscreenCanvas | SVGSVGElement;

type Nullable<T> = T | null | undefined;

type Constructor<T> = new (...args: unknown[]) => T;

export default class DomHelper {
    static create(type: string, width?: number, height?: number): Drawable {
        if (type === 'svg') {
            return this.createSvg(width, height);
        }
        if (type === 'canvas') {
            return this.createCanvas(width, height);
        }
        if (type === 'img') {
            return this.createImg(width, height);
        }
        if (type === 'offscreen-canvas') {
            return this.createOffscreenCanvas(width, height);
        }

        throw Error(`Unable to create a ${type}.`);
    }

    static createCanvas(width?: number, height?: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        if (width != null && height != null) {
            canvas.setAttribute('width',  width.toString());
            canvas.setAttribute('height', height.toString());
        }

        return canvas;
    }

    static createImg(width?: number, height?: number): HTMLImageElement {
        const img = document.createElement('img');
        if (width != null && height != null) {
            img.setAttribute('width',  width.toString());
            img.setAttribute('height', height.toString());
        }

        return img;
    }

    static createOffscreenCanvas(width: number, height: number): OffscreenCanvas {
        // This will throw if width or height are not numbers.
        return new OffscreenCanvas(width, height);
    }

    static createSvg(width?: number, height?: number): SVGSVGElement {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns',       'http://www.w3.org/2000/svg');
        svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

        if (width != null && height != null) {
            svg.setAttributeNS(null, 'width',  width.toString());
            svg.setAttributeNS(null, 'height', height.toString());
        }

        return svg;
    }

    static dataUrlToCanvas(url: string, canvas: Nullable<HTMLCanvasElement>, width: number, height: number): Promise<HTMLCanvasElement> {
        return this.dataUrlToImg(url, null, width, height).then((img) => {
            canvas ||= this.createCanvas();
            canvas.width  = width;
            canvas.height = height;

            const context = canvas.getContext('2d');
            context.imageSmoothingEnabled = false;
            context.drawImage(img, 0, 0, width, height);
            return canvas;
        });
    }

    static dataUrlToImg(url: string, img: Nullable<HTMLImageElement>, width: number, height: number): Promise<HTMLImageElement> {
        img = img || this.createImg();

        return new Promise((resolve, reject) => {
            img.onload  = ()    => resolve(img);
            img.onerror = error => reject(error);

            img.width  = width;
            img.height = height;
            img.src    = url;
        });
    }

    static dataUrlToOffscreenCanvas(url: string, canvas: Nullable<OffscreenCanvas>, width: number, height: number): Promise<OffscreenCanvas> {
        return this.dataUrlToImg(url, null, width, height).then((img) => {
            canvas ||= this.createOffscreenCanvas(width, height);
            canvas.width  = width;
            canvas.height = height;

            const context = canvas.getContext('2d');
            context.imageSmoothingEnabled = false;
            context.drawImage(img, 0, 0, width, height);
            return canvas;
        });
    }

    static getDimensions(svg: SVGSVGElement): [number, number] {
        return [
            svg.width.baseVal.value,
            svg.height.baseVal.value,
        ];
    }

    static getDrawable<T extends Drawable>(target: unknown, t: Constructor<T>): T {
        let element = undefined;

        if (target instanceof String) {
            element = document.getElementById(target.valueOf());
        }
        else if (typeof target === 'string') {
            element = document.getElementById(target);
        }
        else {
            element = target;
        }

        if (element instanceof t) {
            return element;
        }
        else {
            throw Error(`Expected a ${t.name} or the ID of a ${t.name}!`);
        }
    }

    static svgTo(svg: SVGSVGElement, target: string | Drawable): Promise<Drawable> {
        if (typeof target === 'string') {
            const [w, h] = this.getDimensions(svg);
            target = this.create(target, w, h);
        }

        if (target instanceof HTMLCanvasElement) {
            return this.svgToCanvas(svg, target);
        }
        if (target instanceof HTMLImageElement) {
            return this.svgToImg(svg, target);
        }
        if (target instanceof OffscreenCanvas) {
            return this.svgToOffscreenCanvas(svg, target);
        }
        if (target instanceof SVGSVGElement) {
            return this.svgToSvg(svg, target);
        }

        const type = (target as object).constructor.name;
        throw Error(`Can't draw an SVG to a ${type}.`);
    }

    static svgToCanvas(svg: SVGSVGElement, canvas?: HTMLCanvasElement): Promise<HTMLCanvasElement> {
        const url    = this.svgToDataUrl(svg);
        const [w, h] = this.getDimensions(svg);
        return this.dataUrlToCanvas(url, canvas, w, h);
    }

    static svgToDataUrl(svg: SVGSVGElement): string {
        const data = encodeURIComponent(this.svgToXml(svg));
        return 'data:image/svg+xml;charset-utf-8,' + data;
    }

    static svgToImg(svg: SVGSVGElement, img?: HTMLImageElement): Promise<HTMLImageElement> {
        const url    = this.svgToDataUrl(svg);
        const [w, h] = this.getDimensions(svg);
        return this.dataUrlToImg(url, img, w, h);
    }

    static svgToOffscreenCanvas(svg: SVGSVGElement, canvas?: OffscreenCanvas): Promise<OffscreenCanvas> {
        const url    = this.svgToDataUrl(svg);
        const [w, h] = this.getDimensions(svg);
        return this.dataUrlToOffscreenCanvas(url, canvas, w, h);
    }

    static svgToSvg(svg: SVGSVGElement, other?: SVGSVGElement): Promise<SVGSVGElement> {
        other ||= this.createSvg();

        while (other.firstChild) {
            other.firstChild.remove();
        }

        other.setAttributeNS(null, 'width',   svg.width.baseVal.valueAsString);
        other.setAttributeNS(null, 'height',  svg.height.baseVal.valueAsString);
        other.setAttributeNS(null, 'viewBox', svg.getAttributeNS(null, 'viewBox'));
        other.setAttributeNS(null, 'style',   svg.getAttributeNS(null, 'style'));

        for (let i = 0; i < svg.children.length; ++i) {
            const newchild = svg.children[i].cloneNode(true);
            other.appendChild(newchild);
        }

        return Promise.resolve(other);
    }

    static svgToXml(svg: SVGSVGElement): string {
        return new XMLSerializer().serializeToString(svg);
    }
}
