/** A static class containing helper functions for array-related tasks. */
class ArrayHelper {
    /**
     * Clone an array or an object. If an object is passed, a shallow clone will be created.
     *
     * @static
     * @param {array|object} arr The array or object to be cloned.
     * @returns {array|object} A clone of the array or object.
     */
    static clone(arr) {
        let out = Array.isArray(arr) ? [] : {};
        
        for (let key in arr) {
            let value = arr[key];
            
            if (typeof value.clone === 'function') {
                out[key] = value.clone();
            }
            else {
                out[key] = (typeof value === 'object') ? ArrayHelper.clone(value) : value;
            }
        }
        
        return out;
    }

    /**
     * Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.
     *
     * @static
     * @param {array} arr An array.
     * @returns {string} A string representation of the array.
     */
    static print(arr) {
        if (arr.length == 0) {
            return '';
        }

        let s = '(';

        for (let i = 0; i < arr.length; i++) {
            s += arr[i].id ? arr[i].id + ', ' : arr[i] + ', ';
        }

        s = s.substring(0, s.length - 2);

        return s + ')';
    }

    /**
     * Run a function for each element in the array. The element is supplied as an argument for the callback function
     *
     * @static
     * @param {array} arr An array.
     * @param {function} callback The callback function that is called for each element.
     */
    static each(arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            callback(arr[i]);
        }
    }

    /**
     * Return the array element from an array containing objects, where a property of the object is set to a given value.
     *
     * @static
     * @param {array} arr An array.
     * @param {string|number} property A property contained within an object in the array.
     * @param {string|number} value The value of the property.
     * @returns {*} The array element matching the value.
     */
    static get(arr, property, value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][property] == value) {
                return arr[i];
            }
        }
    }

    /**
     * Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.
     *
     * @static
     * @param {array} arr An array.
     * @param {object} options See method description.
     * @returns {boolean} A boolean whether or not the array contains a value.
     */
    static contains(arr, options) {
        if (!options.property && !options.func) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == options.value) {
                    return true;
                }
            }
        } else if (options.func) {
            for (let i = 0; i < arr.length; i++) {
                if (options.func(arr[i])) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][options.property] == options.value) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.
     *
     * @static
     * @param {array} arrA An array.
     * @param {array} arrB An array.
     * @returns {array} The intersecting vlaues.
     */
    static intersection(arrA, arrB) {
        let intersection = new Array();
        
        for (let i = 0; i < arrA.length; i++) {
            for (let j = 0; j < arrB.length; j++) {
                if (arrA[i] === arrB[j]) {
                    intersection.push(arrA[i]);
                }
            }
        }

        return intersection;
    }

    /**
     * Returns an array of unique elements contained in an array.
     *
     * @static
     * @param {array} arr An array.
     * @returns {array} An array of unique elements contained within the array supplied as an argument.
     */
    static unique(arr) {
        let contains = {};
        return arr.filter(function (i) {
            // using !== instead of hasOwnProperty (http://andrew.hedges.name/experiments/in/)
            return contains[i] !== undefined ? false : (contains[i] = true);
        });
    }

    /**
     * Count the number of occurences of a value in an array.
     *
     * @static
     * @param {array} arr An array.
     * @param {*} value A value to be counted.
     * @returns {number} The number of occurences of a value in the array.
     */
    static count(arr, value) {
        let count = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                count++;
            }
        }

        return count;
    }

    /**
     * Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.
     *
     * @static
     * @param {array} arr An array.
     * @param {*} value A value to be toggled.
     * @returns {array} The toggled array.
     */
    static toggle(arr, value) {
        let newArr = [];

        let removed = false;
        for (let i = 0; i < arr.length; i++) {
            // Do not copy value if it exists
            if (arr[i] !== value) {
                newArr.push(arr[i]);
            } else {
                // The element was not copied to the new array, which
                // means it was removed
                removed = true;
            }
        }

        // If the element was not removed, then it was not in the array
        // so add it
        if (!removed) {
            newArr.push(value);
        }

        return newArr;
    }

    /**
     * Remove a value from an array.
     *
     * @static
     * @param {array} arr An array.
     * @param {*} value A value to be removed.
     * @returns {array} A new array with the element with a given value removed.
     */
    static remove(arr, value) {
        let tmp = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== value) {
                tmp.push(arr[i]);
            }
        }

        return tmp;
    }

    /**
     * Remove all elements contained in one array from another array.
     *
     * @static
     * @param {array} arrA The array to be filtered.
     * @param {array} arrB The array containing elements that will be removed from the other array.
     * @returns {array} The filtered array.
     */
    static removeAll(arrA, arrB) {
        return arrA.filter(function (item) {
            return arrB.indexOf(item) === -1;
        });
    }

    /**
     * Merges two arrays and returns the result. The second array will be appended to the second array.
     *
     * @static
     * @param {array} arrA An array.
     * @param {array} arrB An array.
     * @returns {array} The merged array.
     */
    static merge(arrA, arrB) {
        let arr = new Array(arrA.length + arrB.length);

        for (let i = 0; i < arrA.length; i++) {
            arr[i] = arrA[i];
        }

        for (let i = 0; i < arrB.length; i++) {
            arr[arrA.length + i] = arrB[i];
        }

        return arr;
    }

    /**
     * Checks whether or not an array contains all the elements of another array, without regard to the order.
     *
     * @static
     * @param {array} arrA An array.
     * @param {array} arrB An array.
     * @returns {boolean} A boolean indicating whether or not both array contain the same elements.
     */
    static containsAll(arrA, arrB) {
        let containing = 0;
        for (let i = 0; i < arrA.length; i++) {
            for (let j = 0; j < arrB.length; j++) {
                if (arrA[i] === arrB[j]) {
                    containing++;
                }
            }
        }

        return containing === arrB.length;
    }
    
    /**
     * Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...
     *
     * @param {array} arr An array of objects { atomicNumber: 6, vertexId: 2 }.
     * @returns {array} The sorted array.
     */
    static sortByAtomicNumberDesc(arr) {
        let map = arr.map(function(e, i) {
            return { index: i, value: e.atomicNumber.split('.').map(Number) };
        });

        map.sort(function(a, b) {
            let min = Math.min(b.value.length, a.value.length);
            let i = 0;
            
            while(i < min && b.value[i] === a.value[i]) {
                i++;
            }

            return i === min ? b.value.length - a.value.length : b.value[i] - a.value[i];
        });

        return map.map(function(e) {
            return arr[e.index];
        });
    }

}
