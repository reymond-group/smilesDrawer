import * as esbuild from 'esbuild';
import * as fs      from 'node:fs';
import * as params  from './params.mjs';

await esbuild.build(params.BUNDLE);
await esbuild.build(params.MINIFY);
await esbuild.build(params.ESM);
await esbuild.build(params.ESM_MINIFY);

// Make sure the website is using the latest release!
fs.copyFileSync(params.MINIFY.outfile, 'docs/js/smiles-drawer.min.js');
