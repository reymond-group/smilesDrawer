var test = require("tape");
var a = require("../");

test("chaining: .pluck", function(t){
    var data = [
        {one: 1, two: 2},
        {two: "two"},
        {one: "one", two: "zwei"},
    ];
    t.deepEqual(
        a(data).pluck("one").val(),
        [ 1, "one" ]
    );
    t.deepEqual(
        a(data).pluck("two").val(), 
        [ 2, "two", "zwei" ]
    );
    t.deepEqual(
        a(data).pluck("one", "two").val(), 
        [ 1, "two", "one" ]
    );
    t.end();
});

test("chaining: .pluck then Array.prototype.filter", function(t){
    var data = [
        {one: 1, two: 2},
        {one: 1, two: 3},
        {one: 2, two: 5},
        {two: "two"},
        {one: "one", two: "zwei"},
    ];
    var expected = [ 1, 1, 2 ];
    var result = a(data)
        .pluck("one")
        .filter(function(item){
            return typeof item === "number";
        })
        .val();
    t.deepEqual(result, expected);
    t.end();
});

test("chaining: .pluck then a.exists", function(t){
    var data = [
        {one: 1, two: 2},
        {one: 1, two: 3},
        {one: 2, two: 5},
        {two: "two"},
        {one: "one", two: "zwei"},
    ];
    var result = a(data)
        .pluck("one")
        .exists(1);
    t.strictEqual(result, true);
    var result2 = a(data)
        .pluck("one")
        .exists(23);
    t.strictEqual(result2, false);
    t.end();
});

test("chaining: .map then .unique", function(t){
    var data = [
        {one: 1, two: 2},
        {one: 1, two: 3},
        {one: 2, two: 5},
        {one: 2, two: 6},
        {two: "two"},
        {one: "one", two: "zwei"},
    ];
    var result = a(data)
        .map(function(item){ return item.one; })
        .unique()
        .val();
    t.deepEqual(result, [ 1, 2, undefined, "one" ]);
    t.end();
});

test("chaining: .pluck then .join", function(t){
    var data = [
        {one: 1, two: 2},
        {one: 1, two: 3},
        {one: 2, two: 5},
        {two: "two"},
        {one: "one", two: "zwei"},
    ];
    var result = a(data)
        .pluck("one")
        .join(",");
    t.strictEqual(result, "1,1,2,one");
    t.end();
});
