"use strict";
var util = require("util");
var Transform = require("stream").Transform;
var handlebarsMain = require("handlebars");
var o = require("object-tools");

/**
Extends handlebars with a streaming interface for .compile().

@module stream-handlebars
@example
var handlebars = require("stream-handlebars");
var fs = require("fs");

var template = "<p>\{{paragraph}}</p>"

// it's just regular handlebars..
handlebars.registerPartial("whatever", "the partial content");

// ..with the addition of a streaming interface for .compile()
var compileStream = handlebars.createCompileStream(template);

// the template is compiled using the piped-in JSON as context
fs.createReadStream("./template-data.json", "utf8")
    .pipe(compileStream)
    .pipe(process.stdout);
*/

/**
The regular [handlebars](http://handlebarsjs.com) module.
@namespace
@extends {external:handlebars}
@alias module:stream-handlebars
*/
var handlebars = Object.create(handlebarsMain);

/**
a stream wrapper for the [handlebars.compile](http://handlebarsjs.com/reference.html) function
@param {string} - required template
@param [options] {object} - options passed to both Transform() and .compile()
@param [options.objectMode] {object} - set to true if you wish you pass in the data as an object
@param [options.data] {object} - default data object
@return {external:Transform}
*/
handlebars.createCompileStream = function(template, options){
    return new CompileStream(template, options);
};

function CompileStream(template, options){
    Transform.call(this, options);

    this.buf = new Buffer(0);
    this.options = options || {};
    this.template = template;
}
util.inherits(CompileStream, Transform);

CompileStream.prototype._transform = function(chunk, enc, done){
    if (chunk){
        if (this._writableState.objectMode){
            this.buf = chunk;
        } else {
            this.buf = Buffer.concat([ this.buf, chunk ]);
        }
    }
    done();
};

CompileStream.prototype._flush = function(){
    var data;
    if (this._writableState.objectMode){
        data = this.buf;
    } else {
        try {
            data = JSON.parse(this.buf);
        } catch(err){
            err.message = util.format("[%s] %s", err.message, this.buf.toString());
            return this.emit("error", err);
        }
    }
    try {
        if (Array.isArray(data)){
            for (var prop in this.options.data){
                data[prop] = this.options.data[prop];
            }
        } else {
            data = o.extend(this.options.data, data);
        }
        var result = handlebars.compile(this.template, this.options)(data);
        this.push(result);
        this.push(null);
    } catch(err){
        return this.emit("error", err);
    }
};

module.exports = handlebars;

/**
@external Transform
@see https://nodejs.org/api/stream.html#stream_class_stream_transform
*/

/**
@external handlebars
@see http://handlebarsjs.com
*/
