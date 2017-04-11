"use strict";
var a = require("array-tools");
var util = require("util");

exports.where = where;
exports.findWhere = findWhere;
exports.join = join;
exports.pluck = pluck;
exports.map = map;
exports.sort = sort;
exports.filter = filter;
exports.slice = slice;
exports.sizeBetween = sizeBetween;

function where(arrayOfObjects, options){
    Object.keys(options.hash).forEach(function(key){
        if (/^-/.test(key)){
            var newKey = key.replace(/^-/, "!");
            options.hash[newKey] = options.hash[key];
            delete options.hash[key];
        }
    });
    return Array.isArray(arrayOfObjects) && a.where(arrayOfObjects, options.hash);
}

function findWhere(arrayOfObjects, options){
    return Array.isArray(arrayOfObjects) && a.where(arrayOfObjects, options.hash)[0];
}

function join(array, delimiter){
    return Array.isArray(array) && array.join(delimiter);
}

function pluck(arrayOfObjects, property){
    return Array.isArray(arrayOfObjects) && a.pluck(arrayOfObjects, property);
}

function map(array, iteratorBody){
    var iterator = new Function("value", "index", "array", iteratorBody);
    return Array.isArray(array) && array.map(iterator);
}

function sort(array, negativeTest, positiveTest){
    var f = "if (%s) { return -1; } else if (%s) { return 1; } else { return 0; }"
	if (Array.isArray(array) && array.length){
        if (negativeTest && positiveTest){
            return array.sort(new Function("a", "b", util.format(f, negativeTest, positiveTest)));
        } else {
            return array.sort();
        }
	} else {
		return array;
	}
}

function filter(array, iteratorBody){
    var iterator = new Function("value", "index", "array", iteratorBody);
    return Array.isArray(array) && array.map(iterator);
}

function slice(array, begin, end){
    if (typeof end === "object") end = undefined;
    if (typeof begin === "object") begin = undefined;
    return array.slice(begin, end);
}

function sizeBetween(array, min){
    return Array.isArray(array) && array.length >= min;
}
