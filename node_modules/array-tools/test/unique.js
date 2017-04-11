var test = require("tape"),
    w = require("../");

test("unique", function(t){
    var arr = [1,3,8,3,1,2,1,9,3,3];
    t.deepEqual(w.unique(arr), [ 1, 3, 8, 2, 9 ]);
    t.end();
});
