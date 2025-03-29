import * as esbuild from 'esbuild';

let context = await esbuild.context({
  entryPoints: ['app.js'],
  outfile: 'dist/smiles-drawer.js',
  bundle: true
})

await context.watch()
