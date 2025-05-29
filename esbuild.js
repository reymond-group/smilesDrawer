const esbuild = require('esbuild');
const glob = require('glob');

esbuild
    .build({
        stdin: { contents: '' },
        inject: glob.sync('src/**/*.js'),
        bundle: true,
        sourcemap: true,
        minify: true,
        outfile: 'dist/bundle.js',
    })
    .then(() => console.log("⚡ Javascript build complete! ⚡"))
    .catch(() => process.exit(1))
