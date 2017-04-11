var test = require("tape"),
    a = require("../");

test("without (array)", function(t){
    var array = [ 1,2,3,4 ];
    t.deepEqual(a.without(array, [ 2, 3 ]), [ 1, 4 ]);
    t.end();
});
