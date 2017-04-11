var test = require("tape"),
    a = require("../");

test(".pick", function(t){
    var data = [
        { one: "un", two: "deux", three: "trois" },
        { two: "two", one: "one" },
        { four: "quattro" },
        { two: "zwei" }
    ];
    
    t.deepEqual(a.pick(data, "one"), [
        { one: "un" },
        { one: "one" }
    ]);

    t.deepEqual(a.pick(data, "one", "two"), [
        { one: "un", two: "deux" },
        { two: "two", one: "one" },
        { two: "zwei" },
    ]);

    t.end();
});

