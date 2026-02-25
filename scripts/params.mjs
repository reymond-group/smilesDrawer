export const BUILD = {
    entryPoints: ['app.ts'],
    outfile:     'dist/smiles-drawer.js',
    sourcemap:   true,
    bundle:      true,
};

export const MINIFY = {
    entryPoints: ['app.ts'],
    outfile:     'dist/smiles-drawer.min.js',
    target:      ['chrome65'],
    sourcemap:   true,
    bundle:      true,
    minify:      true,
};
