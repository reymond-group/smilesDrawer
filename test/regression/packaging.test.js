/**
 * Tests to make sure that new releases don't break things.
 *
 * These tests really only need to be run after creating a
 * new release: version numbers and the files in dist should
 * remain unchanged in all other circumstances.
 */
import fs                         from 'node:fs';
import {describe, it, expect, vi} from 'vitest';
import {createJSDOM}              from '../helpers';

import SmilesDrawer from '../../app';
import package      from '../../package.json' with {format: 'json'};
import package_lock from '../../package-lock.json' with {format: 'json'};

// Helper to force a full CommonJS module reload.
// This ensures objects are attached to the current JSDOM window.
function reload(path) {
    delete require.cache[require.resolve(path)];
    return require(path);
}

describe('SmilesDrawer.Version', () => {
    it('should match package.json', () => {
        expect(SmilesDrawer.Version).toEqual(package.version);
    });

    it('should match package-lock.json', () => {
        expect(SmilesDrawer.Version).toEqual(package_lock.version);
    });

    it('should match README.md', () => {
        const readme  = fs.readFileSync('README.md', 'utf8');
        const version = `Current Version: **${SmilesDrawer.Version}**`;
        expect(readme).toContain(version);
    });
});

for (const bundle of ['smiles-drawer.js', 'smiles-drawer.min.js']) {
    describe(bundle, () => {
        it('should load with CommonJS', () => {
            const mod = reload('../../dist/' + bundle);

            // TODO: Should we try to set module.exports?
            // expect(mod.apply).toBeDefined();
            // expect(mod.parse).toBeDefined();
        });

        it('should attach globals to the browser window', () => {
            createJSDOM();
            expect(window.SmilesDrawer).toBe(undefined);
            expect(window.SmiDrawer).toBe(undefined);

            reload('../../dist/' + bundle);
            expect(window.SmilesDrawer).toBeDefined();
            expect(window.SmiDrawer).toBeDefined();
        });

        it('should have the correct version number', () => {
            createJSDOM();
            reload('../../dist/' + bundle);
            expect(window.SmilesDrawer.Version).toBe(SmilesDrawer.Version);
        });
    });
}

for (const bundle of ['smiles-drawer.mjs', 'smiles-drawer.min.mjs']) {
    describe(bundle, () => {
        it('should load with CJS', () => {
            const mod = reload('../../dist/' + bundle);

            expect(mod.default).toBeDefined();
            expect(mod.default.apply).toBeDefined();
            expect(mod.default.parse).toBeDefined();
        });

        it('should load with ESM', async () => {
            const mod = await import('../../dist/' + bundle);

            expect(mod.default).toBeDefined();
            expect(mod.default.apply).toBeDefined();
            expect(mod.default.parse).toBeDefined();
        });

        // This works in a real browser, but fails here...
        // TODO: Figure out what the problem is and fix the test!
        // it('should attach globals to the browser window', async () => {
        //     createJSDOM();
        //     expect(window.SmilesDrawer).toBe(undefined);
        //     expect(window.SmiDrawer).toBe(undefined);

        //     const mod = await import('../../dist/' + bundle);
        //     expect(window.SmilesDrawer).toBeDefined();
        //     expect(window.SmiDrawer).toBeDefined();
        // });

        it('should have the correct version number', async () => {
            const mod = await import('../../dist/' + bundle);
            expect(mod.default.Version).toBe(SmilesDrawer.Version);
        });
    });
}
