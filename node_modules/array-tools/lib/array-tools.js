"use strict";

/* set module.exports above the requires: necessary to avoid circular reference issues with object-tools */
module.exports = ArrayTools;

var t = require("typical");
var o = require("object-tools");
var util = require("util");

/**
@module
@typicalname a
*/
ArrayTools.pluck = pluck;
ArrayTools.pick = pick;
ArrayTools.commonSequence = commonSequence;
ArrayTools.arrayify = arrayify;
ArrayTools.exists = exists;
ArrayTools.without = without;
ArrayTools.union = union;
ArrayTools.where = where;
ArrayTools.findWhere = findWhere;
ArrayTools.unique = unique;
ArrayTools.spliceWhile = spliceWhile;
ArrayTools.extract = extract;
ArrayTools.flatten = flatten;
ArrayTools.sortBy = sortBy;
ArrayTools.last = last;
ArrayTools.remove = remove;
ArrayTools.contains = contains;

function ArrayTools(input){
    if (!(this instanceof ArrayTools)) return new ArrayTools(input);
	this._data = input;
}

ArrayTools.prototype.val = function(){
    return this._data;
};

/* Array methods which return the chainable */
["filter", "reverse", "sort", "concat", "slice", "every", "some", "map"].forEach(function(method){
    ArrayTools.prototype[method] = function(){
        this._data = Array.prototype[method].apply(this._data, arguments);
        return this;
    };
});

/* Array method chain terminators, return a scalar */
["join"].forEach(function(method){
    ArrayTools.prototype[method] = function(){
        return Array.prototype[method].apply(this._data, arguments);
    };
});


/* array-tools methods which return the chainable */
["pluck", "pick", "arrayify", "where", "without", "unique", "spliceWhile", "extract", "flatten", "sortBy"].forEach(function(method){
    ArrayTools.prototype[method] = function(){
        var args = arrayify(arguments);
        args.unshift(this._data);
        this._data = ArrayTools[method].apply(null, args);
        return this;
    };
});

/* array-tools method chain terminators, return a scalar or non-array */
["exists", "findWhere", "last", "remove", "contains"].forEach(function(method){
    ArrayTools.prototype[method] = function(){
        var args = arrayify(arguments);
		args.unshift(this._data);
		return ArrayTools[method].apply(null, args);
    };
});

/**
Takes any input and guarantees an array back.

- converts array-like objects (e.g. `arguments`) to a real array
- converts `null` or `undefined` to an empty array
- converts any another other, singular value into an array containing that value
- ignores input which is already an array

@param {*} - the input value to convert to an array
@returns {Array}
@category chainable
@static
@example
> a.arrayify(null)
[]

> a.arrayify(0)
[ 0 ]

> a.arrayify([ 1, 2 ])
[ 1, 2 ]

> function f(){ return a.arrayify(arguments); }
> f(1,2,3)
[ 1, 2, 3 ]
*/
function arrayify(any){
    if (any === null || any === undefined){
        return [];
    } else if (t.isArrayLike(any)){
        return Array.prototype.slice.call(any);
    } else {
        return Array.isArray(any) ? any : [ any ];
    }
}

/**
Query a recordset, at any depth.. 

@param {object[]} - the recordset to query
@param {query} - the query definition
@returns {Array}
@category chainable
@static
@example
> data = [
    { name: "Dana", age: 30 },
    { name: "Yana", age: 20 },
    { name: "Zhana", age: 10 }
]

> // match on an exact value
> a.where(data, { age: 10 })
[ { name: 'Zhana', age: 10 } ]

> // match records which satisfy the function testing the value of the `age` field
> a.where(data, { age: function(ageValue){ return ageValue > 10; }  })
[ { name: 'Dana', age: 30 }, { name: 'Yana', age: 20 } ]

> // match if NOT the value
> a.where(data, { "!age": 10 })
[ { name: 'Dana', age: 30 }, { name: 'Yana', age: 20 } ]

> // match on regular expression
> a.where(data, { name: /ana/ })
[ { name: 'Dana', age: 30 },
  { name: 'Yana', age: 20 },
  { name: 'Zhana', age: 10 } ]

> // you can perform deep queries 
> deepData = [
    { name: "Dana", favourite: { colour: "light red" } },
    { name: "Yana", favourite: { colour: "dark red" } },
    { name: "Zhana", favourite: { colour: [ "white", "red" ] } }
]

> // match values of `person.favourite.colour` which match the regex `/red/`
> a.where(deepData, { favourite: { colour: /red/ } })
[ { name: 'Dana', favourite: { colour: 'light red' } },
  { name: 'Yana', favourite: { colour: 'dark red' } } ]

> // if there are one or more values for colour (i.e. the field may contain a singular
> // or array of values) then search inside arrays too 
> a.where(deepData, { favourite: { "+colour": /red/ } })
[ { name: 'Dana', favourite: { colour: 'light red' } },
  { name: 'Yana', favourite: { colour: 'dark red' } },
  { name: 'Zhana', favourite: { colour: [ "white", "red" ] } } ]
*/
function where(arrayOfObjects, query){
    return arrayify(arrayOfObjects).filter(function(item){
        return o.exists(item, query);
    });
}

/**
Plucks the value of the specified property from each object in the input array

@param arrayOfObjects {object[]} - The input recordset
@param property {...string} - Up to three property names - the first one found will be returned.
@returns {Array}
@category chainable
@static
@example
> var data = [
    { a: "Lionel", b: "Roger" },
    { a: "Luis", b: "Craig" },
    { b: "Peter" },
]

> a.pluck(data, "a")
[ 'Lionel', 'Luis' ]

> a.pluck(data, "a", "b")
[ 'Lionel', 'Luis', 'Peter' ]
*/
function pluck(arrayOfObjects, property, property2, property3){
    if (!Array.isArray(arrayOfObjects)) throw new Error(".pluck() input must be an array");

    return arrayOfObjects
        .filter(function(obj){
            var one = eval("obj." + property);
            var two = eval("obj." + property2);
            var three = eval("obj." + property3);
            return one || two || three;
        })
        .map(function(obj){
            var one = eval("obj." + property);
            var two = eval("obj." + property2);
            var three = eval("obj." + property3);
            return one || two || three;
        });
}

/**
return a copy of the input `arrayOfObjects` containing objects having only the cherry-picked properties
@param arrayOfObjects {object[]} - the input
@param property {...string} - the properties to include in the result
@return {object[]}
@category chainable
@example
> data = [
    { name: "Dana", age: 30 },
    { name: "Yana", age: 20 },
    { name: "Zhana", age: 10 }
]

> a.pick(data, "name")
[ { name: 'Dana' }, { name: 'Yana' }, { name: 'Zhana' } ]

> a.pick(data, "name", "age")
[ { name: 'Dana', age: 30 },
  { name: 'Yana', age: 20 },
  { name: 'Zhana', age: 10 } ]
@alias module:array-tools.pick
*/
function pick(){
    var args = arrayify(arguments);
    var arrayOfObjects = args.shift();
    var properties = args;

    if (!Array.isArray(arrayOfObjects)) throw new Error(".pick() input must be an array");

    return arrayOfObjects
        .filter(function(obj){
            return properties.some(function(prop){
                return obj[prop] !== undefined;
            });
        })
        .map(function(obj){
            var output = {};
            properties.forEach(function(prop){
                if (obj[prop] !== undefined){
                    output[prop] = obj[prop];
                }
            });
            return output;
        });
}

/**
returns true if a value, or nested object value exists in an array
@param {Array} - the array to search
@param {*} - the value to search for
@returns {boolean}
@category not chainable
@static
@example
> a.exists([ 1, 2, 3 ], 2)
true

> a.exists([ { result: false }, { result: false } ], { result: true })
false

> a.exists([ { result: true }, { result: false } ], { result: true })
true

> a.exists([ { result: true }, { result: true } ], { result: true })
true
*/
function exists(array, value){
    if (t.isPlainObject(value)){
        var query = value;
        var found = false;
        var index = 0;
        var item;

        while(!found && (item = array[index++])){
            found = o.exists(item, query);
        }
        return found;
    } else {
        return array.indexOf(value) > -1;
    }
}

/**
returns the first item from `arrayOfObjects` where key/value pairs
from `query` are matched identically
@param {object[]} - the array to search
@param {object} - an object containing the key/value pairs you want to match
@returns {object}
@category not chainable
@example
> dudes = [{ name: "Jim", age: 8}, { name: "Clive", age: 8}, { name: "Hater", age: 9}]
[ { name: 'Jim', age: 8 },
  { name: 'Clive', age: 8 },
  { name: 'Hater', age: 9 } ]

> a.findWhere(dudes, { age: 8})
{ name: 'Jim', age: 8 }
@alias module:array-tools.findWhere
*/
function findWhere(arrayOfObjects, query){
    var result = where(arrayOfObjects, query);
    return result.length ? result[0] : null;
}


/**
Returns the input minus the specified values.
@param {Array} - the input array
@param {*} - a single, or array of values to omit
@returns {Array}
@category chainable
@example
> a.without([ 1, 2, 3 ], 2)
[ 1, 3 ]

> a.without([ 1, 2, 3 ], [ 2, 3 ])
[ 1 ]
@alias module:array-tools.without
*/
function without(array, toRemove){
    toRemove = arrayify(toRemove);
    return array.filter(function(item){
        return !exists(toRemove, item);
    });
}

/**
merge two arrays into a single array of unique values
@param {Array} - First array
@param {Array} - Second array
@param {string} - the unique ID property name
@returns {Array}
@category chainable
@example
> var array1 = [ 1, 2 ], array2 = [ 2, 3 ];
> a.union(array1, array2)
[ 1, 2, 3 ]

> var array1 = [ { id: 1 }, { id: 2 } ], array2 = [ { id: 2 }, { id: 3 } ];
> a.union(array1, array2)
[ { id: 1 }, { id: 2 }, { id: 3 } ]

> var array2 = [ { id: 2, blah: true }, { id: 3 } ]
> a.union(array1, array2)
[ { id: 1 },
  { id: 2 },
  { id: 2, blah: true },
  { id: 3 } ]
> a.union(array1, array2, "id")
[ { id: 1 }, { id: 2 }, { id: 3 } ]
@alias module:array-tools.union
*/
function union(array1, array2, idKey){
    var result = o.clone(array1);
    array2.forEach(function(item){
        if (idKey){
            var query = {};
            query[idKey] = item[idKey];
            if (!findWhere(result, query)){
                result.push(item);
            }
        } else if (!exists(result, item)){
            result.push(item);
        };
    });
    return result;
}

/**
Returns the initial elements which both input arrays have in common
@param {Array} - first array to compare
@param {Array} - second array to compare
@returns {Array}
@category chainable
@example
> a.commonSequence([1,2,3], [1,2,4])
[ 1, 2 ]
@alias module:array-tools.commonSequence
*/
function commonSequence(a, b){
    var result = [];
    for (var i = 0; i < Math.min(a.length, b.length); i++){
        if (a[i] === b[i]){
            result.push(a[i]);
        } else {
            break;
        }
    }
    return result;
}

/**
returns an array of unique values
@param {Array} - input array
@returns {Array}
@category chainable
@example
> n = [1,6,6,7,1]
[ 1, 6, 6, 7, 1 ]

> a.unique(n)
[ 1, 6, 7 ]
@alias module:array-tools.unique
*/
function unique(array){
    return array.reduce(function(prev, curr){
        if (prev.indexOf(curr) === -1) prev.push(curr);
        return prev;
    }, []);
}

/**
splice from `index` until `test` fails
@param {Array} - the input array
@param {number} - the position to begin splicing from
@param {RegExp} - the test to continue splicing while true
@param ...elementN {*} - the elements to add to the array
@returns {Array}
@category chainable
@example
> letters = ["a", "a", "b"]
[ 'a', 'a', 'b' ]

> a.spliceWhile(letters, 0, /a/, "x")
[ 'a', 'a' ]

> letters
[ 'x', 'b' ]
@alias module:array-tools.spliceWhile
*/
function spliceWhile(array, index, test){
    for (var i = 0; i < array.length; i++){
        if (!test.test(array[i])) break;
    }
    var spliceArgs = [ index, i ];
    spliceArgs = spliceArgs.concat(arrayify(arguments).slice(3));
    return array.splice.apply(array, spliceArgs);
}

/**
Removes items from `array` which satisfy the query. Modifies the input array, returns the extracted.
@param {Array} - the input array, modified directly
@param {function | object} - Per item in the array, if either the function returns truthy or the exists query is satisfied, the item is extracted
@returns {Array} the extracted items.
@category chainable
@alias module:array-tools.extract
*/
function extract(array, query){
    var result = [];
    var toSplice = [];
    arrayify(array).forEach(function(item, index){
        if (t.isPlainObject(query)){
            if(o.exists(item, query)){
                result.push(item);
                toSplice.push(index);
            }
        } else {
            if (query(item)){
                result.push(item);
                toSplice.push(index);
            }
        }
    });
    for (var i = 0; i < toSplice.length; i++){
        array.splice(toSplice[i] - i, 1);
    }
    return result;
}

/**
flatten an array of arrays into a single array
@static
@since 1.4.0
@param {Array} - the input array
@returns {Array}
@category chainable
@example
> numbers = [ 1, 2, [ 3, 4 ], 5 ]
> a.flatten(numbers)
[ 1, 2, 3, 4, 5 ]
*/
function flatten(array){
    return arrayify(array).reduce(function(prev, curr){
        return prev.concat(curr);
    }, []);
}

/**
Sort an array of objects by one or more fields
@static
@param {object[]} - input array
@param {string|string[]} - column name(s) to sort by
@param {object} - specific sort orders, per columns
@returns {Array}
@category chainable
@since 1.5.0
@example
>  var fixture = [
    { a: 4, b: 1, c: 1},
    { a: 4, b: 3, c: 1},
    { a: 2, b: 2, c: 3},
    { a: 2, b: 2, c: 2},
    { a: 1, b: 3, c: 4},
    { a: 1, b: 1, c: 4},
    { a: 1, b: 2, c: 4},
    { a: 3, b: 3, c: 3},
    { a: 4, b: 3, c: 1}
];
> a.sortBy(fixture, ["a", "b", "c"])
[ { a: 1, b: 1, c: 4 },
  { a: 1, b: 2, c: 4 },
  { a: 1, b: 3, c: 4 },
  { a: 2, b: 2, c: 2 },
  { a: 2, b: 2, c: 3 },
  { a: 3, b: 3, c: 3 },
  { a: 4, b: 1, c: 1 },
  { a: 4, b: 3, c: 1 },
  { a: 4, b: 3, c: 1 } ]
*/
function sortBy(arrayOfObjects, columns, customOrder){
    return arrayOfObjects.sort(sortByFunc(arrayify(columns), customOrder));
}

function  sortByFunc(properties, customOrder){
    var props = properties.slice(0);
    var property = props.shift();
    return function tryIt(a, b){
        var result;
        var x = a[property];
        var y = b[property];

        if (typeof x === "undefined" && typeof y !== "undefined"){
            result = -1;
        } else if (typeof x !== "undefined" && typeof y === "undefined"){
            result = 1;
        } else if (typeof x === "undefined" && typeof y === "undefined"){
            result = 0;
        } else if (customOrder && customOrder[property]){
            result = customOrder[property].indexOf(x) - customOrder[property].indexOf(y);
        } else {
            result = x < y ? -1 : x > y ? 1 : 0;
        }

        if (result === 0){
            if (props.length){
                property = props.shift();
                return tryIt(a, b);
            } else {
                return 0;
            }
        } else {
            props = properties.slice(0);
            property = props.shift();
            return result;
        }
        return 0;
    };
}

/**
Return the last item in an array.
@param {Array} - the input array
@category not chainable
@return {*}
@static
@since 1.7.0
*/
function last(arr){
    return arr[arr.length - 1];
}

/**
@param {Array} - the input array
@param {*} - the item to remove
@category not chainable
@return {*}
@static
@since 1.8.0
*/
function remove(arr, toRemove){
	return arr.splice(arr.indexOf(toRemove), 1)[0];
}

/**
Searches the array for the exact value supplied (strict equality). To query for value existance using an expression or function, use {@link module:array-tools.exists}.

@param {Array} - the input array
@param {*} - the value to look for
@category not chainable
@return boolean
@static
@since 1.8.0
*/
function contains(arr, value){
	return arr.indexOf(value) > -1;
}
