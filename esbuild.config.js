// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['app.jsx'], // Your main JavaScript file
  bundle: true,
  minify: true, // Enable minification
  outfile: 'dist/bundle.js', // Specify the output file path
  sourcemap: true,
  target: 'es2017'
}).catch(() => process.exit(1));
