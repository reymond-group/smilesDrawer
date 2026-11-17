import * as esbuild from 'esbuild';
import * as fs      from 'node:fs';
import * as params  from './params.mjs';

// Regular JavaScript
await esbuild.build(Object.assign({}, params.BASE, {
    outfile: 'dist/smiles-drawer.js',
    format:  'iife',
    minify:  false,
}));

// Minified JavaScript
await esbuild.build(Object.assign({}, params.BASE, {
    outfile: 'dist/smiles-drawer.min.js',
    format:  'iife',
    minify:  true,
}));

// Regular JavaScript Module
await esbuild.build(Object.assign({}, params.BASE, {
    outfile: 'dist/smiles-drawer.mjs',
    format:  'esm',
    minify:  false,
}));

// Minified JavaScript Module
await esbuild.build(Object.assign({}, params.BASE, {
    outfile: 'dist/smiles-drawer.min.mjs',
    format:  'esm',
    minify:  true,
}));

// Make sure the website is using the latest release!
fs.copyFileSync('dist/smiles-drawer.min.js', 'docs/js/smiles-drawer.min.js');
