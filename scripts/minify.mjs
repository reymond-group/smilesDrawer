import * as esbuild from 'esbuild'

let result = await esbuild.build({
  entryPoints: ['dist/smiles-drawer.js'],
  outfile: 'dist/smiles-drawer.min.js',
  target: ['chrome65'],
  sourcemap: true,
  minify: true
})

// console.log(result)
