var test = require("tape"),
    o = require("../");

test(".omit(obj, string[])", function(t){
    var input = { one: 1, two: 2, three: 3, four: 4 };
    var clone = o.omit(input, [ "two", "four" ]);
    t.deepEqual(clone, { one: 1, three: 3 });
    t.end();
});
