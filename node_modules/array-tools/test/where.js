var test = require("tape");
var a = require("../");

test("where", function(t){
    var arr = [
        { result: false, number: 1 },
        { result: false, number: 2 }
    ];
    t.deepEqual(a.where(arr, { result: true }), []);
    t.deepEqual(a.where(arr, { result: false }), [
        { result: false, number: 1 },
        { result: false, number: 2 }
    ]);
    t.deepEqual(a.where(arr, { result: false, number: 3 }), []);
    t.deepEqual(a.where(arr, { result: false, number: 2 }), [
        { result: false, number: 2 }
    ]);
    t.end();
});

test("where, regex", function(t){
    var arr = [
        { flag: false, something: "aa" },
        { something: "bb" }
    ];
    var result = [
        { something: "bb" }
    ];
    t.deepEqual(a.where(arr, { flag: undefined, something: /.+/ }), result);
    t.end();
});

test("where, regex 2", function(t){
    var arr = [
        { flag: false },
        { something: "bb" }
    ];
    var result = [
        { something: "bb" }
    ];
    t.deepEqual(a.where(arr, { something: /.+/ }), result);
    t.end();
});

test(".where deep query", function(t){
    var arr = [
        { one: { number: 1, letter: "a" } },
        { one: { number: 2, letter: "b" } },
        { one: { number: 3, letter: "b" } }
    ];
    t.deepEqual(a.where(arr, { one: { letter: "b" } }), [
        { one: { number: 2, letter: "b" } },
        { one: { number: 3, letter: "b" } }
    ]);
    t.deepEqual(a.where(arr, { one: { number: 2, letter: "b" } }), [
        { one: { number: 2, letter: "b" } }
    ]);
    t.deepEqual(a.where(arr, { one: { number: 1, letter: "a" } }), [
        { one: { number: 1, letter: "a" } }
    ]);
    t.end();
});
