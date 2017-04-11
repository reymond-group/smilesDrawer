var test = require("tape");
var a = require("../");

test("a.contains(arr, value)", function(t){
    var fixture = [ 1, 2, 3 ];
	var result = a.contains(fixture, 1);
	var wrong = a.contains(fixture, 4);
    t.strictEqual(result, true);
    t.strictEqual(wrong, false);
    t.end();
});

test("a(arr).contains(value)", function(t){
    var fixture = [ 1, 2, 3 ];
	var result = a(fixture).contains(1);
	var wrong = a(fixture).contains(4);
    t.strictEqual(result, true);
    t.strictEqual(wrong, false);
    t.end();
});
