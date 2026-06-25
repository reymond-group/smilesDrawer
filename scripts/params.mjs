export const BASE = {
    entryPoints: ['app.ts'],
    target:      ['chrome65'],
    sourcemap:   true,
    bundle:      true,
};

// Targets for local development and custom builds:
export const DEV_BUNDLE = Object.assign({}, BASE, {
    outfile: 'dist/smiles-drawer.dev.js',
});

export const DEV_MINIFY = Object.assign({}, BASE, {
    outfile: 'dist/smiles-drawer.dev.min.js',
    minify:  true,
});

// Targets for the official builds:
// The IIFE bundles (default format) assign the SmilesDrawer globals for
// direct <script> / CDN usage. The ESM bundles expose the `default` export
// so `import SmilesDrawer from 'smiles-drawer'` works in bundlers and Node.
export const BUNDLE = Object.assign({}, BASE, {
    outfile: 'dist/smiles-drawer.js',
});

export const MINIFY = Object.assign({}, BASE, {
    outfile: 'dist/smiles-drawer.min.js',
    minify:  true,
});

export const ESM = Object.assign({}, BASE, {
    outfile: 'dist/smiles-drawer.mjs',
    format:  'esm',
});

export const ESM_MINIFY = Object.assign({}, BASE, {
    outfile: 'dist/smiles-drawer.min.mjs',
    format:  'esm',
    minify:  true,
});
