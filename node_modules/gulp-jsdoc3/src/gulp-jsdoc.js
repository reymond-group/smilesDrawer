import map from 'map-stream';
import tmp from 'tmp';
import fs from 'fs';
import path from 'path';
import gutil from 'gulp-util';
import Promise from 'bluebird';
let os = require('os').type();

let debug = require('debug')('gulp-jsdoc3');

/**
 * @callback gulpDoneCallback
 */

/**
 * A wrapper around jsdoc cli.
 *
 * This function collects all filenames. Then runs:
 * ```jsdoc -c config -t node_modules/ink-docstrap/template gulpFile1 gulpFile2```
 * @example
 * gulp.src(['README.md', 'src/*.js']), {read: false}).pipe(
 *     jsdoc(options, cb)
 * );
 *
 * @param {Object} [config=require('./jsdocConfig.json')]
 * @param {gulpDoneCallback} done
 * @returns {*|SignalBinding}
 */
export function jsdoc(config, done) {
    let files = [];
    let jsdocConfig;

    // User just passed callback
    if (arguments.length === 1 && typeof config === 'function') {
        done = config;
        config = undefined;
    }

    // Prevent some errors
    if (typeof done !== 'function') {
        done = function () {
        };
    }

    jsdocConfig = config || require('./jsdocConfig.json');

    debug('Config:\n' + JSON.stringify(jsdocConfig, undefined, 2));

    return map(function (file, callback) {
        files.push(file.path);
        callback(null, file);
    }).on('end', function () {
        // We use a promise to prevent multiple dones (normal cause error then close)
        new Promise(function (resolve, reject) {
            // We clone the config file so as to not affect the original
            let jsdocConfigClone = JSON.parse(JSON.stringify(jsdocConfig));
            // If the user has specified a source.include key, we append the
            // gulp.src files to it.
            if (jsdocConfigClone.source && jsdocConfigClone.source.include) {
                jsdocConfigClone.source.include =
                    jsdocConfigClone.source.include.concat(files);
            } else {
                jsdocConfigClone = Object.assign(jsdocConfigClone,
                    { source: { include: files } });
            }

            if (jsdocConfigClone.source.include.length === 0) {
                const errMsg = 'JSDoc Error: no files found to process';
                gutil.log(gutil.colors.red(errMsg));
                gutil.beep();
                reject(new Error(errMsg));
                return;
            }

            const tmpobj = tmp.fileSync();
            debug('Documenting files: ' + jsdocConfigClone.source.include.join(' '));
            fs.writeFile(tmpobj.name, JSON.stringify(jsdocConfigClone), 'utf8', function (err) {
                // We couldn't write the temp file
                /* istanbul ignore next */
                if (err) {
                    reject(err);
                    return;
                }

                const spawn = require('child_process').spawn,
                    cmd = require.resolve('jsdoc/jsdoc.js'), // Needed to handle npm3 - find the binary anywhere
                    inkdocstrap = path.dirname(require.resolve('ink-docstrap'));

                let args = ['-c', tmpobj.name];

                // Config + ink-docstrap if user did not specify their own layout or template
                if (!(jsdocConfigClone.opts &&
                    jsdocConfigClone.opts.template) && !(jsdocConfigClone.templates &&
                    jsdocConfigClone.templates.default &&
                    jsdocConfigClone.templates.default.layoutFile)) {
                    args = args.concat(['-t', inkdocstrap]);
                }

                debug(cmd + ' ' + args.join(' '));

                const child = os === 'Windows_NT'
                    ? spawn(process.execPath, [cmd].concat(args), {cwd: process.cwd()})
                    : spawn(cmd, args, {cwd: process.cwd()}); // unix
                child.stdout.setEncoding('utf8');
                child.stderr.setEncoding('utf8');
                /* istanbul ignore next */
                child.stdout.on('data', function (data) {
                    gutil.log(data);
                });
                /* istanbul ignore next */
                child.stderr.on('data', function (data) {
                    gutil.log(gutil.colors.red(data));
                    gutil.beep();
                });
                child.on('close', function (code) {
                    if (code === 0) {
                        gutil.log('Documented ' + jsdocConfigClone.source.include.length + ' files!');
                        resolve();
                    } else {
                        gutil.log(gutil.colors.red('JSDoc returned with error code: ' + code));
                        gutil.beep();
                        reject(new Error('JSDoc closed with error code: ' + code));
                    }
                });
                child.on('error', function (error) {
                    gutil.log(gutil.colors.red('JSDoc Error: ' + error));
                    gutil.beep();
                    reject(new Error(error));
                });
            });
        }).asCallback(done);
    });
}
