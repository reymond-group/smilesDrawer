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
