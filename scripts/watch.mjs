import * as esbuild from 'esbuild';
import * as params  from './params.mjs';

let context = await esbuild.context(params.DEV_BUNDLE);
await context.watch();
