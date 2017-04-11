var test = require("tape");
var a = require("../");

test(".union(array, array)", function(t){
    var arr1 = [1,2,3],
        arr2 = [3,4,5];
    t.deepEqual(a.union(arr1, arr2), [1,2,3,4,5]);
    t.end();
});

test(".union(arrayOfObjects, arrayOfObjects, idKey)", function(t){
    var arr1 = [ { id: 1 }, { id: 2 }, { id: 3 }],
        arr2 = [ { id: 3 }, { id: 4 }, { id: 5 }];
    t.deepEqual(a.union(arr1, arr2), [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 } ]);

    arr1 = [ { id: 1 }, { id: 2 }, { id: 3 }];
    arr2 = [ { id: 3, blah: true }, { id: 4 }, { id: 5 }];
    t.deepEqual(a.union(arr1, arr2, "id"), [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 } ]);

    t.end();
});
