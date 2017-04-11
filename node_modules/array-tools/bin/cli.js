#!/usr/bin/env node
"use strict";

var a = require("../");

process.argv.splice(0, 2);

var input = new Buffer(0);
var method = process.argv.shift();
var args = process.argv.slice(0);

process.stdin.on("readable", function(){
    var chunk = this.read();
    if (chunk) input = Buffer.concat([ input, chunk ]);
});
process.stdin.on("end", function(){
    var array = JSON.parse(input);
    args.unshift(array);
    if (method){
        var result = a[method].apply(null, args);
        console.log(JSON.stringify(result, null, "  "))
    }
});
