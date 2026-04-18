/**
 * Generate readme/polymer/*.svg for README / PR figures.
 * Excluded from CI: not part of `npm run test:unit` (see package.json).
 * Run: npm run figures:pr
 */
import {describe, it, expect} from 'vitest';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {JSDOM} from 'jsdom';
import Parser from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
/** Polymer figures live under readme/polymer/ (readme/ already holds README assets). */
const outDir = join(__dirname, '../../readme/polymer');

function setupDOM() {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
    return dom;
}

function renderSvg(smiles, options = {}) {
    const dom = setupDOM();
    const svg = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dom.window.document.body.appendChild(svg);
    const tree = Parser.parse(smiles);
    expect(tree).toBeDefined();
    const drawer = new SvgDrawer({
        isomeric:          true,
        width:             440,
        height:            280,
        bondLength:        22,
        explicitHydrogens: false,
        terminalCarbons:   false,
        ...options,
    });
    drawer.draw(tree, svg, 'light', false);
    return sanitizeSvgForStandaloneFile(svg.outerHTML);
}

/**
 * jsdom serializes `<svg>` without `xmlns`; Chrome then opens `file://` as a generic XML tree
 * ("no style information…"). Force SVG namespace + dimensions on the **root** `<svg>` only.
 * @param {string} html
 */
function sanitizeSvgForStandaloneFile(html) {
    return html.replace(/<svg(\b[^>]*?)>/, (full, attrs) => {
        let a = attrs;
        if (!/\sxmlns\s*=/.test(a)) {
            a = ` xmlns="http://www.w3.org/2000/svg"${a}`;
        }
        if (!/\swidth\s*=/.test(a)) {
            a = ` width="440" height="280"${a}`;
        }
        return `<svg${a}>`;
    });
}

describe('PR figure generator', () => {
    /** Regenerate readme/polymer/*.svg; run via npm run figures:pr only. */
    it('writes readme/polymer/*.svg', () => {
        mkdirSync(outDir, {recursive: true});

        const figures = [
            ['fig01-pmma-none.svg', '[*]CC(C(=O)OC)[*]', {polymerDisplayMode: 'none'}],
            ['fig02-pmma-bracket-n.svg', '[*]CC(C(=O)OC)[*]', {polymerDisplayMode: 'bracket-n'}],
            ['fig03-ester-bracket-n.svg', '*CC(=O)O*', {polymerDisplayMode: 'bracket-n'}],
            ['fig04-internal-wildcards.svg', 'C[*]CC[*]', {polymerDisplayMode: 'bracket-n'}],
        ];

        for (const [name, smiles, opts] of figures) {
            const body = renderSvg(smiles, opts);
            const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<!-- SMILES: ${smiles} options: ${JSON.stringify(opts)} -->\n${body}\n`;
            writeFileSync(join(outDir, name), xml, 'utf8');
        }
    });
});
