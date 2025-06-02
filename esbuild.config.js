// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['app.jsx'], // main JavaScript file
  bundle: true,
  minify: true, // Enable minification
  outfile: 'dist/bundle.min.js', // output file path
  sourcemap: true,
  target: 'es2017'
}).catch(() => process.exit(1));
