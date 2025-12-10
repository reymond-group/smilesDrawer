import * as esbuild from 'esbuild';
import * as params  from './params.mjs';

await esbuild.build(params.MINIFY);
