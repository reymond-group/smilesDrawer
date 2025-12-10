import * as esbuild from 'esbuild';
import * as params  from './params.mjs';

let context = await esbuild.context(params.BUILD);
await context.watch();
