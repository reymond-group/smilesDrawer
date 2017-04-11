var a = require("array-tools");
var s = require("string-tools");

exports["string-concat"] = function(){
    var args = a.arrayify(arguments).slice(0, -1);
    return args.join("");
};

exports["string-replace"] = function(input, find, replace){
    if (!input) return "";
    return input.replace(find, replace);
};

exports["string-padRight"] = function(input, width, padWith){
    if (!input) return "";
    if (typeof padWith === "object") padWith = undefined;
    if (input) return s.padRight(input, width, padWith);
};

exports["string-clipLeft"] = function(input, width, prefix){
    if (!input) return "";
    if (typeof prefix === "object") prefix = undefined;
    return s.clipLeft(input, width, prefix);
};

exports["string-repeat"] = function(string, times){
    return s.repeat(string, times);
};

exports["string-split"] = function(input, separator){
    return input.split(separator);
};
