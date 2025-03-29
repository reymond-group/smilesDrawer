import * as esbuild from 'esbuild';

let result = await esbuild.build({
  entryPoints: ['app.js'],
  outfile: 'dist/smiles-drawer.js',
  bundle: true
})

// console.log(result)
