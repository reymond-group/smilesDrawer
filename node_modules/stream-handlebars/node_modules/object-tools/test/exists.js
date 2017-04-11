var test = require("tape");
var o = require("../");

test("exists: primative", function(t){
    var object = { result: "clive", hater: true };
    t.deepEqual(o.exists(object, { result: "clive" }), true);
    t.deepEqual(o.exists(object, { hater: true }), true);
    t.deepEqual(o.exists(object, { result: "clive", hater: true }), true);
    t.deepEqual(o.exists(object, { ibe: true }), false);
    t.end();
});

test("not exists: primative", function(t){
    var object = { result: "clive", hater: true };
    t.deepEqual(o.exists(object, { "!result": "clive" }), false);
    t.deepEqual(o.exists(object, { "!result": "ian" }), true);
    t.deepEqual(o.exists(object, { "!result": "ian", "!hater": false }), true);
    t.end();
});

test("exists: regexp", function(t){
    var object = { result: "red-ish" };
    t.deepEqual(o.exists(object, { result: /red/ }), true);
    t.deepEqual(o.exists(object, { result: /black/ }), false);
    t.deepEqual(o.exists(object, { result: /blue/ }), false);
    t.end();
});

test("not exists: regexp", function(t){
    var object = { result: "red-ish" };
    t.deepEqual(o.exists(object, { "!result": /red/ }), false);
    t.deepEqual(o.exists(object, { "!result": /black/ }), true);
    t.deepEqual(o.exists(object, { "!result": /blue/ }), true);
    t.end();
});

test("undefined value with regexp", function(t){
    var object = { one: "somthing" };
    t.deepEqual(o.exists(object, { one: /.+/ }), true);
    t.deepEqual(o.exists(object, { two: /.+/ }), false);
    t.end();
});

test("object value with regexp", function(t){
    var object = { one: { a: "somthing"} };
    t.deepEqual(o.exists(object, { one: /.+/ }), false);
    t.end();
});

test("null value with regexp", function(t){
    var object = { one: null };
    t.deepEqual(o.exists(object, { one: /.+/ }), false);
    t.end();
});

test("boolean value with regexp", function(t){
    var object = { one: true };
    t.deepEqual(o.exists(object, { one: /true/ }), true);
    t.deepEqual(o.exists(object, { one: /addf/ }), false);
    t.end();
});

test("object deep exists, summary", function(t){
    var query = {
        presence: {
            _attributes: {
                to: "13279829@chat/jackpotjoy.mobile.42",
                "!type": "unavailable"
            },
            x: {
                _attributes: {
                    xmlns: "http://jabber.org/protocol/muc#user"
                },
                "!item": undefined,
                "!status": [ { "!_attributes": { "!code": "110" } } ]
            }
        }
    };

    var obj1 = {
        presence: {
            _attributes: {
                xmlns: "jabber:client",
                from: "sapphire@jackpotjoy.chat/lb-dev",
                to: "13279829@chat/jackpotjoy.mobile.42"
            },
            x: {
                _attributes: {
                    xmlns: "http://jabber.org/protocol/muc#user"
                },
                item: {
                    _attributes: {
                        jid: "13277347@chat/jackpotjoy.mobile.38",
                        affiliation: "none",
                        role: "participant"
                    }
                }
            }
        }
    };

    var obj2 = {
      "presence": {
        "_attributes": {
          "xmlns": "jabber:client",
          "to": "13279829@chat/jackpotjoy.mobile.42",
          "from": "sapphire@jackpotjoy.chat/Chatsupervisor2 HOST"
        },
        "priority": {
          "_text": "0"
        },
        "x": {
          "_attributes": {
            "xmlns": "http://jabber.org/protocol/muc#user"
          },
          "item": {
            "_attributes": {
              "jid": "chatsupervisor2_host_jackpotjoy@chat/jackpotjoy",
              "affiliation": "owner",
              "role": "moderator"
            }
          }
        }
      }
    };

    var obj3 = {
      "presence": {
        "_attributes": {
          "xmlns": "jabber:client",
          "from": "sapphire@jackpotjoy.chat/lb-dev5",
          "to": "13279829@chat/jackpotjoy.mobile.42"
        },
        "x": {
          "_attributes": {
            "xmlns": "http://jabber.org/protocol/muc#user"
          },
          "item": {
            "_attributes": {
              "jid": "13279829@chat/jackpotjoy.mobile.42",
              "affiliation": "none",
              "role": "visitor"
            }
          },
          "status": [
            {
              "_attributes": {
                "code": "110"
              }
            },
            {
              "_attributes": {
                "code": "100"
              }
            }
          ]
        }
      }
    };

    var obj4 = {
      "presence": {
        "_attributes": {
          "xmlns": "jabber:client",
          "from": "sapphire@jackpotjoy.chat/lb-dev5",
          "to": "13279829@chat/jackpotjoy.mobile.42"
        },
        "x": {
          "_attributes": {
            "xmlns": "http://jabber.org/protocol/muc#user"
          },
          "item": {
            "_attributes": {
              "jid": "13279829@chat/jackpotjoy.mobile.42",
              "affiliation": "none",
              "role": "visitor"
            }
          },
          "status": [
            {
              "_attributes": {
                "code": "100"
              }
            }
          ]
        }
      }
    };

    t.strictEqual(o.exists(obj1, query), true, "true obj1");
    t.strictEqual(o.exists(obj2, query), true, "true obj2");
    t.strictEqual(o.exists(obj3, query), false, "false in obj3");
    t.strictEqual(o.exists(obj4, query), true, "false in obj4");
    t.end();
});

test(".exists contains", function(t){
    t.strictEqual(o.exists({ numbers: [ { one: 1 }, { one: "eins" } ] }, { numbers: { one: 1 } }), false);
    t.strictEqual(o.exists({ numbers: [ { one: 1 }, { one: "eins" } ] }, { "+numbers": { one: 1 } }), true);
    t.strictEqual(o.exists({ numbers: { one: 1 } }, { "+numbers": { one: 1 } }), true);
    t.strictEqual(o.exists({ numbers: { one: 1 } }, { numbers: { one: 1 } }), true);
    t.end();
});

test(".exists test function", function(t){
    var fixture = {
        number: 5
    };
    t.strictEqual(o.exists(fixture, { number: function(n){ return n < 4; }}), false, "< 4");
    t.strictEqual(o.exists(fixture, { number: function(n){ return n < 10; }}), true, "< 10");
    t.strictEqual(o.exists(fixture, { "!number": function(n){ return n < 10; }}), false, "< 10");
    t.end();
});

test(".exists - querying a class instance", function(t){
    function Test(){ this.one = 1; }
    var fixture = {
        test: new Test()
    };
    var query = { test: {
        one: 1
    }};
    var result = o.exists(fixture, query);
    t.strictEqual(result, true);
    t.end();
});