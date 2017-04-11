var test = require("tape");
var s = require("../");

test("escapeRegExp", function(t){
    t.equal(s.escapeRegExp("(.*)"), "\\(\\.\\*\\)");
    t.end();
});

test("escapeRegExp", function(t){
    t.equal(s.fill("a", 10), "aaaaaaaaaa");
    // t.equal(s.fill("ab", 10), "ababababab"); // only works this way on 0.11, not 0.10
    t.end();
});

test("escapeRegExp", function(t){
    t.equal(s.padRight("clive", 1), "clive");
    t.equal(s.padRight("clive", 1, "-"), "clive");
    t.equal(s.padRight("clive", 10, "-"), "clive-----");    
    t.end();
});

test("repeat", function(t){
    t.equal(s.repeat("ab", 3), "ababab");
    t.end();
});

test("clipLeft", function(t){
    t.equal(s.clipLeft("abcdefghijkl", 5), "...kl");
    t.end();
});
test("clipLeft small", function(t){
    t.equal(s.clipLeft("abcdefghijkl", 25), "abcdefghijkl");
    t.end();
});
test("clipLeft equal", function(t){
    t.equal(s.clipLeft("abcde", 5), "abcde");
    t.end();
});
