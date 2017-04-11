var test = require("tape"),
    a = require("../");

test("spliceWhile", function(t){
    var array = [ "one", "one", "two", "three" ];
    t.deepEqual(a.spliceWhile(array, 0, /one/), [ "one", "one" ]);
    t.deepEqual(array, [ "two", "three" ]);
    t.end();
});
