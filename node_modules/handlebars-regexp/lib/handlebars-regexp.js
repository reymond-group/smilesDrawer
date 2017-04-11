"use strict";

exports["regexp-test"] = function(value, regex){
    var re = new RegExp(regex);
    return re.test(value);
};
