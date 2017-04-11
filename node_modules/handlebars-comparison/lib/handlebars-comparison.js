"use strict";
var a = require("array-tools");

/**
Javascript comparison operator helpers for handlebars.
@module
*/
exports.equal = equal; 
exports["equal-some"] = equalSome; 
exports["equal-every"] = equalEvery; 
exports.gt = gt; 
exports.lt = lt; 

function equal(arg1, arg2){
    return arg1 === arg2;
}

function equalSome(){
    var args = a.arrayify(arguments);
    var input = args.shift();
    args.pop();
    return args.some(function(item){
        return item === input;
    });
}

function equalEvery(){
    var args = a.arrayify(arguments);
    var input = args.shift();
    args.pop();
    return args.every(function(item){
        return item === input;
    });
}

function gt(arg1, arg2){
    return arg1 > arg2;
}

function lt(arg1, arg2){
    return arg1 < arg2;
}
