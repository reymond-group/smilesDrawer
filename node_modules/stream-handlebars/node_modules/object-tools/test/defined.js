var test = require("tape"),
    o = require("../");

test("defined", function(t){
    var obj = { 
        one: 1,
        two: undefined,
        three: undefined,
        four: 4
    };
    t.deepEqual(o.defined(obj), { 
        one: 1,
        four: 4
    });
    t.end();
});
