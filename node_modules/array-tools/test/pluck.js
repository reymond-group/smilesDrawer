var test = require("tape");
var a = require("../");

test(".pluck", function(t){
    var data = [
        {one: 1, two: 2},
        {two: "two"},
        {one: "one", two: "zwei"},
    ];
    
    t.deepEqual(a.pluck(data, "one"), [ 1, "one" ]);
    t.deepEqual(a.pluck(data, "two"), [ 2, "two", "zwei" ]);
    t.deepEqual(a.pluck(data, "one", "two"), [ 1, "two", "one" ]);

    t.end();
});

test(".pluck expression (e.g. \"item.prop\")", function(t){
    var data = [
        {one: { inside: "yep" }},
        {one: { inside: "again" }},
        {one: "not here" },
        {one: { or: "or here" }}
    ];
    
    t.deepEqual(a.pluck(data, "one.inside"), [ "yep", "again" ]);

    t.end();
});
