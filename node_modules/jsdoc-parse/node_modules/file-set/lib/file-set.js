"use strict";
var fs = require("fs");
var glob = require("glob");
var Glob = glob.Glob;
var a = require("array-tools");
var path = require("path");

/**
Exports a contructor taking a list of file patterns as input, returning a `file-set` instance containing the expanded patterns split into separate lists of `files`, `dirs` and `notExisting`.
@module
@example
```js
var fileSet = require("file-set");
```
@typicalname FileSet
*/
module.exports = FileSet;

/**
@class
@classdesc Expands file patterns, returning the matched and unmatched files and directories
@param {string | string[]} - A pattern, or array of patterns to expand
@alias module:file-set
*/
function FileSet(patternList){
	if (!(this instanceof FileSet)) return new FileSet(patternList);

    /**
	The full list of unique paths found, and not found.
	@type {string[]}
	*/
    this.list = [];
    /**
	The existing files found
	@type {string[]}
	*/
    this.files = [];
    /**
	The existing directories found
	@type {string[]}
	*/
    this.dirs = [];
    /**
	Paths which were not found
	@type {string[]}
	*/
    this.notExisting = [];

    this.add(patternList);
}
/**
add file patterns to the set
@param files {string|string[]} - A pattern, or array of patterns to expand
*/
FileSet.prototype.add = function(files){
    var self = this,
        nonExistingFiles = [];

    files = a.arrayify(files);
    files.forEach(function(file){
        try {
            var stat = fs.statSync(file),
                fileSetItem = { path: file };

            if (!a.exists(self.list, fileSetItem)){
                if (stat.isFile()){
                    fileSetItem.type = FileSet.eFileType.FILE;
                    self.files.push(file);
                }
                if (stat.isDirectory()){
                    fileSetItem.type = FileSet.eFileType.DIR;
                    self.dirs.push(file);
                }
                self.list.push(fileSetItem);
            }
        } catch(err){
            if (err.code === "ENOENT"){
                nonExistingFiles.push(file);
            } else {
                throw err;
            }
        }
    });

    nonExistingFiles.forEach(function(file){
        file = path.normalize(file);
        var glob = new Glob(file, { sync: true, stat: true });
        if (glob.found.length){
            glob.found.forEach(function(file){
                if (!a.exists(self.list, { path: file })){
                    if (glob.cache[file] instanceof Array) glob.cache[file] = 2;
                    if (glob.cache[file] === "FILE") glob.cache[file] = 1;
                    if (glob.cache[file] === "DIR") glob.cache[file] = 2;
                    var fileSetItem = { path: file, type: glob.cache[file] };
                    self.list.push(fileSetItem);

                    if (fileSetItem.type === 1) self.files.push(file);
                    if (fileSetItem.type === 2) self.dirs.push(file);
                }
            });
        } else {
            self.list.push({ path: file, type: FileSet.eFileType.NOEXIST });
            self.notExisting.push(file);
        }
    });
};

/**
Enum for the `type` value of each record in `fileSet.list`
@readonly
@enum {number}
*/
FileSet.eFileType = {
    /**
    when a file doesn't exist
    */
    NOEXIST: 0,
    /**
    It's a file
    */
    FILE: 1,
    DIR: 2
};
