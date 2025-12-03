import * as esbuild from 'esbuild'
import * as params  from './params.mjs';

let result = await esbuild.build(params.MINIFY)
// console.log(result)
