class ArrayHelper {
    static clone(array) {
        var out = Array.isArray(array) ? [] : {};
        for (var key in array) {
            var value = array[key];
            if (typeof value.clone === 'function') {
                out[key] = value.clone();
            }
            else {
                out[key] = (typeof value === 'object') ? ArrayHelper.clone(value) : value;
            }
        }
        return out;
    }

    static print(array) {
        if (array.length == 0) return '';

        var s = '(';

        for (var i = 0; i < array.length; i++) {
            s += array[i].id + ', ';
        }

        s = s.substring(0, s.length - 2);

        return s + ')';
    }

    static each(array, func) {
        for (var i = 0; i < array.length; i++) {
            func(array[i]);
        }
    }

    static get(array, property, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] == value) return array[i];
        }
    }

    static contains(array, options) {
        if (!options.property && !options.func) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == options.value) return true;
            }
        } else if (options.func) {
            for (var i = 0; i < array.length; i++) {
                if (options.func(array[i])) return true;
            }
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i][options.property] == options.value) return true;
            }
        }

        return false;
    }

    static intersection(arrA, arrB) {
        var intersection = new Array();
        for (var i = 0; i < arrA.length; i++) {
            for (var j = 0; j < arrB.length; j++) {
                if (arrA[i] == arrB[j]) intersection.push(arrA[i]);
            }
        }

        return intersection;
    }

    static unique(arr) {
        var contains = {};
        return arr.filter(function (i) {
            // using !== instead of hasOwnProperty (http://andrew.hedges.name/experiments/in/)
            return contains[i] !== undefined ? false : (contains[i] = true);
        });
    }

    static count(array, value) {
        var count = 0;

        for (var i = 0; i < array.length; i++) {
            if (array[i] == value) count++;
        }

        return count;
    }

    static toggle(array, value) {
        var newArray = [];

        var removed = false;
        for (var i = 0; i < array.length; i++) {
            // Do not copy value if it exists
            if (!(array[i] == value)) {
                newArray.push(array[i]);
            } else {
                // The element was not copied to the new array, which
                // means it was removed
                removed = true;
            }
        }

        // If the element was not removed, then it was not in the array
        // so add it
        if (!removed) {
            newArray.push(value);
        }

        return newArray;
    }

    static remove(array, item) {
        var tmp = [];

        for (var i = 0; i < array.length; i++) {
            if (array[i] != item) tmp.push(array[i]);
        }

        return tmp;
    }

    static removeAll(array1, array2) {
        return array1.filter(function (item) {
            return array2.indexOf(item) === -1;
        });
    }

    static merge(array1, array2) {
        var array = new Array(array1.length + array2.length);

        for (var i = 0; i < array1.length; i++) {
            array[i] = array1[i];
        }

        for (var i = 0; i < array2.length; i++) {
            array[array1.length + i] = array2[i];
        }

        return array;
    }

    static containsAll(array1, array2) {
        var containing = 0;
        for (var i = 0; i < array1.length; i++) {
            for (var j = 0; j < array2.length; j++) {
                if (array1[i] === array2[j]) containing++;
            }
        }
        return containing == array2.length;
    }
}
