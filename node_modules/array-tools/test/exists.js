var test = require("tape");
var a = require("../");

test("exists: query a recordset", function(t){
    var arr = [
        { result: false, number: 1 },
        { result: false, number: 2 }    
    ];
    t.equal(a.exists(arr, { result: true }), false);
    t.equal(a.exists(arr, { result: false }), true);
    t.equal(a.exists(arr, { result: false, number: 3 }), false);
    t.equal(a.exists(arr, { result: false, number: 2 }), true);
    t.end();
});

test("exists: search for scalar", function(t){
    var arr = [ 1, 2, "three" ];
    t.equal(a.exists(arr, 0), false);
    t.equal(a.exists(arr, 1), true);
    t.equal(a.exists(arr, "1"), false);
    t.equal(a.exists(arr, "three"), true);
    t.end();
});

test.skip("exists: search an object", function(t){
    var obj1 = {};
    var obj2 = {};
    var arr = [ obj1, {} ];
    t.equal(a.exists(arr, obj1), true);
    t.equal(a.exists(arr, obj2), false);
    t.end();
});
