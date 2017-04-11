"use strict";
var test = require("tape");
var a = require("../");

test(".arrayify()", function(t){
    t.deepEqual(a.arrayify(null), []);
    t.deepEqual(a.arrayify(undefined), []);
    t.deepEqual(a.arrayify(0), [ 0 ]);
    t.deepEqual(a.arrayify([ 1, 2 ]), [ 1, 2 ]);
    
    function func(){
        t.deepEqual(a.arrayify(arguments), [ 1, 2, 3 ]);
    }
    func(1, 2, 3);

    t.end();
});
