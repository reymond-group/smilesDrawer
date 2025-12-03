export const BUILD = {
    entryPoints: ['app.js'],
    outfile: 'dist/smiles-drawer.js',
    bundle: true
  }

export const MINIFY = {
  entryPoints: ['app.js'],
  outfile: 'dist/smiles-drawer.min.js',
  target: ['chrome65'],
  sourcemap: true,
  minify: true
}
