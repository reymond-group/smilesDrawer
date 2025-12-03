import * as esbuild from 'esbuild';
import * as params  from './params.mjs';

let result = await esbuild.build(params.BUILD)
// console.log(result)
