'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** A static class containing helper functions for array-related tasks. */
var ArrayHelper = function () {
    function ArrayHelper() {
        _classCallCheck(this, ArrayHelper);
    }

    _createClass(ArrayHelper, null, [{
        key: 'clone',

        /**
         * Clone an array or an object. If an object is passed, a shallow clone will be created.
         *
         * @static
         * @param {array|object} arr The array or object to be cloned.
         * @returns {array|object} A clone of the array or object.
         */
        value: function clone(arr) {
            var out = Array.isArray(arr) ? [] : {};

            for (var key in arr) {
                var value = arr[key];

                if (typeof value.clone === 'function') {
                    out[key] = value.clone();
                } else {
                    out[key] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? ArrayHelper.clone(value) : value;
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

    }, {
        key: 'print',
        value: function print(arr) {
            if (arr.length == 0) {
                return '';
            }

            var s = '(';

            for (var i = 0; i < arr.length; i++) {
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

    }, {
        key: 'each',
        value: function each(arr, callback) {
            for (var i = 0; i < arr.length; i++) {
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

    }, {
        key: 'get',
        value: function get(arr, property, value) {
            for (var i = 0; i < arr.length; i++) {
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

    }, {
        key: 'contains',
        value: function contains(arr, options) {
            if (!options.property && !options.func) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == options.value) {
                        return true;
                    }
                }
            } else if (options.func) {
                for (var _i = 0; _i < arr.length; _i++) {
                    if (options.func(arr[_i])) {
                        return true;
                    }
                }
            } else {
                for (var _i2 = 0; _i2 < arr.length; _i2++) {
                    if (arr[_i2][options.property] == options.value) {
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

    }, {
        key: 'intersection',
        value: function intersection(arrA, arrB) {
            var intersection = new Array();

            for (var i = 0; i < arrA.length; i++) {
                for (var j = 0; j < arrB.length; j++) {
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

    }, {
        key: 'unique',
        value: function unique(arr) {
            var contains = {};
            return arr.filter(function (i) {
                // using !== instead of hasOwnProperty (http://andrew.hedges.name/experiments/in/)
                return contains[i] !== undefined ? false : contains[i] = true;
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

    }, {
        key: 'count',
        value: function count(arr, value) {
            var count = 0;

            for (var i = 0; i < arr.length; i++) {
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

    }, {
        key: 'toggle',
        value: function toggle(arr, value) {
            var newArr = [];

            var removed = false;
            for (var i = 0; i < arr.length; i++) {
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

    }, {
        key: 'remove',
        value: function remove(arr, value) {
            var tmp = [];

            for (var i = 0; i < arr.length; i++) {
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

    }, {
        key: 'removeAll',
        value: function removeAll(arrA, arrB) {
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

    }, {
        key: 'merge',
        value: function merge(arrA, arrB) {
            var arr = new Array(arrA.length + arrB.length);

            for (var i = 0; i < arrA.length; i++) {
                arr[i] = arrA[i];
            }

            for (var _i3 = 0; _i3 < arrB.length; _i3++) {
                arr[arrA.length + _i3] = arrB[_i3];
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

    }, {
        key: 'containsAll',
        value: function containsAll(arrA, arrB) {
            var containing = 0;
            for (var i = 0; i < arrA.length; i++) {
                for (var j = 0; j < arrB.length; j++) {
                    if (arrA[i] === arrB[j]) {
                        containing++;
                    }
                }
            }

            return containing === arrB.length;
        }
    }]);

    return ArrayHelper;
}();

/** A class representing an atom */


var Atom = function () {
    /**
     * The constructor of the class Atom.
     *
     * @param {string} element The one-letter code of the element.
     * @param {string} [bondType='-'] The type of the bond associated with this atom.
     */
    function Atom(element) {
        var bondType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

        _classCallCheck(this, Atom);

        this.element = element;
        this.explicit = false;
        this.ringbonds = new Array();
        this.rings = new Array();
        this.bondType = bondType;
        this.isTerminal = false;
        this.isBridge = false;
        this.isBridgeNode = false;
        this.bridgedRing = null;
        this.anchoredRings = new Array();
        this.bracket = null;
    }

    /**
     * Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.
     *
     * @param {number} ringId A ring id.
     */


    _createClass(Atom, [{
        key: 'addAnchoredRing',
        value: function addAnchoredRing(ringId) {
            if (!ArrayHelper.contains(this.anchoredRings, { value: ringId })) {
                this.anchoredRings.push(ringId);
            }
        }

        /**
         * Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.
         *
         * @returns {number} The number of ringbonds this atom is connected to.
         */

    }, {
        key: 'getRingbondCount',
        value: function getRingbondCount() {
            return this.ringbonds.length;
        }

        /**
         * Check whether or not this atom is rotatable. The atom is deemed rotatable if it is neither a member of a ring nor participating in a bond other than a single bond. TODO: Check the chemistry.
         *
         * @returns {boolean} A boolean indicating whether or not this atom is rotatable.
         */

    }, {
        key: 'canRotate',
        value: function canRotate() {
            return this.bondType === '-' && this.rings.length == 0;
        }

        /**
         * Returns whether or not this atom participates in ringbonds (breaks in the ring in the MST).
         *
         * @returns {boolean} A boolean indicating whether or not this atom is associated with a ringbond.
         */

    }, {
        key: 'hasRingbonds',
        value: function hasRingbonds() {
            return this.ringbonds.length > 0;
        }

        /**
         * Returns the id of the ringbond with the highest id.
         *
         * @returns {number} The highest ringbond id associated with this atom.
         */

    }, {
        key: 'getMaxRingbond',
        value: function getMaxRingbond() {
            var max = 0;
            for (var i = 0; i < this.ringbonds.length; i++) {
                if (this.ringbonds[i].id > max) {
                    max = this.ringbonds[i].id;
                }
            }

            return max;
        }

        /**
         * Checks whether or not this atom is a member of a given ring.
         *
         * @param {number} ringId A ring id.
         * @returns {boolean} A boolean indicating whether or not this atom is a member of a given ring.
         */

    }, {
        key: 'hasRing',
        value: function hasRing(ringId) {
            for (var i = 0; i < this.rings; i++) {
                if (ringId === this.rings[i]) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.
         *
         * @param {Atom} atomA An atom.
         * @param {Atom} atomB An atom.
         * @returns {boolean} A boolean indicating whether or not two atoms share a common ringbond.
         */

    }, {
        key: 'haveCommonRingbond',
        value: function haveCommonRingbond(atomA, atomB) {
            for (var i = 0; i < atomA.ringbonds.length; i++) {
                for (var j = 0; j < atomB.ringbonds.length; j++) {
                    if (atomA.ringbonds[i].id == atomB.ringbonds[j].id) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Get the highest numbered ringbond shared by two atoms. A ringbond is a break in a ring created when generating the spanning tree of a structure.
         *
         * @param {Atom} atomA An atom.
         * @param {Atom} atomB An atom.
         * @returns {number} The number of the maximum ringbond shared by two atoms.
         */

    }, {
        key: 'maxCommonRingbond',
        value: function maxCommonRingbond(atomA, atomB) {
            var commonMax = 0;
            var maxA = 0;
            var maxB = 0;

            for (var i = 0; i < atomA.ringbonds.length; i++) {
                if (atomA.ringbonds[i].id > maxA) {
                    maxA = atomA.ringbonds[i].id;
                }

                for (var j = 0; j < atomB.ringbonds.length; j++) {
                    if (atomB.ringbonds[j].id > maxB) {
                        maxB = atomB.ringbonds[j].id;
                    } else if (maxA == maxB) {
                        commonMax = maxA;
                    }
                }
            }

            return commonMax;
        }
    }]);

    return Atom;
}();

/** A class wrapping a canvas element */


var CanvasWrapper = function () {
    /**
     * The constructor for the class CanvasWrapper.
     *
     * @param {string} targetId The canvas id.
     * @param {object} theme A theme from the smiles drawer options.
     */
    function CanvasWrapper(targetId, theme) {
        _classCallCheck(this, CanvasWrapper);

        this.canvas = document.getElementById(targetId);
        this.ctx = this.canvas.getContext('2d');
        this.colors = theme;

        this.drawingWidth = 0.0;
        this.drawingHeight = 0.0;
        this.offsetX = 0.0;
        this.offsetY = 0.0;

        this.clear();
    }

    /**
     * Sets a provided theme.
     *
     * @param {object} theme A theme from the smiles drawer options.
     */


    _createClass(CanvasWrapper, [{
        key: 'setTheme',
        value: function setTheme(theme) {
            this.colors = theme;
        }

        /**
         * Scale the canvas based on vertex positions.
         *
         * @param {array} vertices An array of vertices containing the vertices associated with the current molecule.
         */

    }, {
        key: 'scale',
        value: function scale(vertices) {
            // Figure out the final size of the image
            var max = { x: -Number.MAX_VALUE, y: -Number.MAX_VALUE };
            var min = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };

            for (var i = 0; i < vertices.length; i++) {
                var p = vertices[i].position;
                if (max.x < p.x) max.x = p.x;
                if (max.y < p.y) max.y = p.y;
                if (min.x > p.x) min.x = p.x;
                if (min.y > p.y) min.y = p.y;
            }

            // Add padding
            var padding = 20.0;
            max.x += padding;
            max.y += padding;
            min.x -= padding;
            min.y -= padding;

            this.drawingWidth = max.x - min.x;
            this.drawingHeight = max.y - min.y;

            var scaleX = this.canvas.offsetWidth / this.drawingWidth;
            var scaleY = this.canvas.offsetHeight / this.drawingHeight;

            var scale = scaleX < scaleY ? scaleX : scaleY;

            this.ctx.scale(scale, scale);

            this.offsetX = -min.x;
            this.offsetY = -min.y;

            // Center
            if (scaleX < scaleY) {
                this.offsetY += this.canvas.offsetHeight / (2.0 * scale) - this.drawingHeight / 2.0;
            } else {
                this.offsetX += this.canvas.offsetWidth / (2.0 * scale) - this.drawingWidth / 2.0;
            }
        }

        /**
         * Resets the transform of the canvas.
         *
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

        /**
         * Returns the hex code of a color associated with a key from the current theme.
         *
         * @param {string} key The color key in the theme (e.g. C, N, BACKGROUND, ...).
         * @returns {string} A color hex value.
         */

    }, {
        key: 'getColor',
        value: function getColor(key) {
            key = key.toUpperCase();

            if (key in this.colors) {
                return this.colors[key];
            }

            return this.colors['C'];
        }

        /**
         * Draws a circle to a canvas context.
         * @param {number} x The x coordinate of the circles center.
         * @param {number} y The y coordinate of the circles center.
         * @param {number} radius The radius of the circle
         * @param {string} color A hex encoded color.
         * @param {boolean} [fill=true] Whether to fill or stroke the circle.
         * @param {boolean} [debug=false] Draw in debug mode.
         * @param {string} [debugText=''] A debug message.
         */

    }, {
        key: 'drawCircle',
        value: function drawCircle(x, y, radius, color) {
            var fill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var debug = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
            var debugText = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';

            if (isNaN(x) || isNaN(y)) {
                return;
            }

            var ctx = this.ctx;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;

            ctx.save();
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2, true);
            ctx.closePath();

            if (debug) {
                if (fill) {
                    ctx.fillStyle = '#f00';
                    ctx.fill();
                } else {
                    ctx.strokeStyle = '#f00';
                    ctx.stroke();
                }

                this.drawDebugText(x, y, debugText);
            } else {
                if (fill) {
                    ctx.fillStyle = color;
                    ctx.fill();
                } else {
                    ctx.strokeStyle = color;
                    ctx.stroke();
                }
            }

            ctx.restore();
        }

        /**
         * Draw a line to a canvas.
         *
         * @param {Line} line A line.
         */

    }, {
        key: 'drawLine',
        value: function drawLine(line) {
            if (isNaN(line.from.x) || isNaN(line.from.y) || isNaN(line.to.x) || isNaN(line.to.y)) {
                return;
            }

            var ctx = this.ctx;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;

            // Add a shadow behind the line
            var shortLine = line.clone().shorten(8.0);

            var l = shortLine.getLeftVector().clone();
            var r = shortLine.getRightVector().clone();

            l.x += offsetX;
            l.y += offsetY;

            r.x += offsetX;
            r.y += offsetY;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(l.x, l.y);
            ctx.lineTo(r.x, r.y);
            ctx.lineCap = 'round';
            ctx.lineWidth = 3.5;
            ctx.shadowColor = this.getColor('BACKGROUND');
            ctx.shadowBlur = 0.0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.strokeStyle = this.getColor('BACKGROUND');
            ctx.stroke();
            ctx.restore();

            l = line.getLeftVector().clone();
            r = line.getRightVector().clone();

            l.x += offsetX;
            l.y += offsetY;

            r.x += offsetX;
            r.y += offsetY;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(l.x, l.y);
            ctx.lineTo(r.x, r.y);
            ctx.lineCap = 'round';
            ctx.lineWidth = 1.5;

            var gradient = this.ctx.createLinearGradient(l.x, l.y, r.x, r.y);
            gradient.addColorStop(0.4, this.getColor(line.getLeftElement()) || this.getColor('C'));
            gradient.addColorStop(0.6, this.getColor(line.getRightElement()) || this.getColor('C'));

            ctx.strokeStyle = gradient;
            ctx.stroke();
            ctx.restore();
        }

        /**
         * Draws a debug text message at a given position
         *
         * @param {number} x The x coordinate.
         * @param {number} y The y coordinate.
         * @param {string} text The debug text.
         */

    }, {
        key: 'drawDebugText',
        value: function drawDebugText(x, y, text) {
            var ctx = this.ctx;
            ctx.save();

            ctx.font = '5px Droid Sans, sans-serif';
            ctx.textAlign = 'start';
            ctx.textBaseline = 'top';
            ctx.fillStyle = '#ff0000';
            ctx.fillText(text, x + this.offsetX, y + this.offsetY);
            ctx.restore();
        }

        /**
         * Draw a text to the canvas.
         *
         * @param {number} x The x position of the text.
         * @param {number} y The y position of the text.
         * @param {number} hydrogens The number of hydrogen atoms.
         * @param {string} direction The direction of the text in relation to the associated vertex.
         * @param {boolean} isTerminal A boolean indicating whether or not the vertex is terminal.
         * @param {string} charge The charge of the atom.
         */

    }, {
        key: 'drawText',
        value: function drawText(x, y, elementName, hydrogens, direction, isTerminal, charge) {
            // Return empty line element for debugging, remove this check later, values should not be NaN
            if (isNaN(x) || isNaN(y)) {
                return;
            }

            var ctx = this.ctx;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;

            ctx.save();

            var fontLarge = '10px Droid Sans, sans-serif';
            var fontSmall = '6px Droid Sans, sans-serif';

            ctx.textAlign = 'start';
            ctx.textBaseline = 'top';

            // Charge
            var chargeText = '+';
            var chargeWidth = 0;
            if (charge) {
                if (charge === 2) {
                    chargeText = '2+';
                } else if (charge === -1) {
                    chargeText = '-';
                } else if (charge === -2) {
                    chargeText = '2-';
                }

                ctx.font = fontSmall;
                chargeWidth = ctx.measureText(chargeText).width;
            }

            ctx.font = fontLarge;
            ctx.fillStyle = this.getColor(elementName);

            var dim = ctx.measureText(elementName);
            dim.totalWidth = dim.width + chargeWidth;
            dim.height = parseInt(fontLarge, 10);

            var r = dim.totalWidth > dim.height ? dim.totalWidth : dim.height;
            r /= 2.0;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY + dim.height / 20.0, r + 1.0, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';

            // Correct vertical text position
            // y -= 2;

            ctx.fillStyle = this.getColor(elementName);
            ctx.fillText(elementName, x - dim.totalWidth / 2.0 + offsetX, y - dim.height / 2.0 + offsetY);

            if (charge) {
                ctx.font = fontSmall;
                ctx.fillText(chargeText, x - dim.totalWidth / 2.0 + dim.width + offsetX, y - dim.height / 2.0 + offsetY);
            }

            ctx.font = fontLarge;

            var hDim = ctx.measureText('H');
            hDim.height = parseInt(fontLarge, 10);

            if (hydrogens === 1) {
                var hx = x - dim.totalWidth / 2.0 + offsetX;
                var hy = y - dim.height / 2.0 + offsetY;

                if (direction === 'left') {
                    hx -= dim.totalWidth;
                } else if (direction === 'right') {
                    hx += dim.totalWidth;
                } else if (direction === 'up' && isTerminal) {
                    hx += dim.totalWidth;
                } else if (direction === 'down' && isTerminal) {
                    hx += dim.totalWidth;
                } else if (direction === 'up' && !isTerminal) {
                    hy -= dim.height;
                } else if (direction === 'down' && !isTerminal) {
                    hy += dim.height;
                }

                ctx.fillText('H', hx, hy);
            } else if (hydrogens > 1) {
                var _hx = x - dim.totalWidth / 2.0 + offsetX;
                var _hy = y - dim.height / 2.0 + offsetY;

                ctx.font = fontSmall;
                var cDim = ctx.measureText(hydrogens);
                cDim.height = parseInt(fontSmall, 10);

                if (direction === 'left') {
                    _hx -= hDim.width + cDim.width;
                } else if (direction === 'right') {
                    _hx += dim.totalWidth;
                } else if (direction === 'up' && isTerminal) {
                    _hx += dim.totalWidth;
                } else if (direction === 'down' && isTerminal) {
                    _hx += dim.totalWidth;
                } else if (direction === 'up' && !isTerminal) {
                    _hy -= dim.height;
                } else if (direction === 'down' && !isTerminal) {
                    _hy += dim.height;
                }

                ctx.font = fontLarge;
                ctx.fillText('H', _hx, _hy);

                ctx.font = fontSmall;
                ctx.fillText(hydrogens, _hx + hDim.width, _hy + hDim.height / 2.0);
            }

            ctx.restore();
        }

        /**
         * Draws a dubug dot at a given coordinate and adds text.
         *
         * @param {number} x The x coordinate.
         * @param {number} y The y coordindate.
         * @param {string} [debugText=''] A string.
         * @param {string} [color='#f00'] A color in hex form.
         */

    }, {
        key: 'drawDebugPoint',
        value: function drawDebugPoint(x, y) {
            var debugText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#f00';

            this.drawCircle(x, y, 2, color, true, true, debugText);
        }

        /**
         * Draws a ring inside a provided ring, indicating aromaticity.
         *
         * @param {Ring} ring A ring.
         */

    }, {
        key: 'drawAromaticityRing',
        value: function drawAromaticityRing(ring) {
            var ctx = this.ctx;

            ctx.save();
            ctx.strokeStyle = this.getColor('C');
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(ring.center.x + this.offsetX, ring.center.y + this.offsetY, ring.radius - 10, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }

        /**
         * Clear the canvas.
         *
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        }
    }]);

    return CanvasWrapper;
}();

/** A class representing an edge */


var Edge = function () {
    /**
     * The constructor for the class Edge.
     *
     * @param {number} sourceId A vertex id.
     * @param {number} targetId A vertex id.
     * @param {number} weight The weight of the edge.
     */
    function Edge(sourceId, targetId, weight) {
        _classCallCheck(this, Edge);

        this.id = null;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.weight = weight;
        this.bondType = '-';
        this.isInAromaticRing = false;
        this.center = false;
    }

    /**
     * Returns the number of bonds associated with the bond type of this edge.
     *
     * @returns {number} The number of bonds associated with this edge.
     */


    _createClass(Edge, [{
        key: 'getBondCount',
        value: function getBondCount() {
            return Edge.bonds[this.bondType];
        }

        /**
         * An object mapping the bond type to the number of bonds.
         *
         * @returns {object} The object containing the map.
         */

    }], [{
        key: 'bonds',
        get: function get() {
            return {
                '-': 1,
                '/': 1,
                '\\': 1,
                '=': 2,
                '#': 3,
                '$': 4
            };
        }
    }]);

    return Edge;
}();

/** A class representing a line */


var Line = function () {
    /**
     * The constructor for the class Line.
     *
     * @param {Vector2} [from=new Vector2(0, 0)] A vector marking the beginning of the line.
     * @param {Vector2} [to=new Vector2(0, 0)] A vector marking the end of the line.
     * @param {string} [elementFrom=null] A one-letter representation of the element associated with the vector marking the beginning of the line.
     * @param {string} [elementTo=null] A one-letter representation of the element associated with the vector marking the end of the line.
     */
    function Line() {
        var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector2(0, 0);
        var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector(0, 0);
        var elementFrom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var elementTo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        _classCallCheck(this, Line);

        this.from = from;
        this.to = to;
        this.elementFrom = elementFrom;
        this.elementTo = elementTo;
    }

    /**
     * Clones this line and returns the clone.
     *
     * @returns {Line} A clone of this line.
     */


    _createClass(Line, [{
        key: 'clone',
        value: function clone() {
            return new Line(this.from.clone(), this.to.clone(), this.elementFrom, this.elementTo);
        }

        /**
         * Returns the length of this line.
         *
         * @returns {number} The length of this line.
         */

    }, {
        key: 'getLength',
        value: function getLength() {
            return Math.sqrt(Math.pow(this.to.x - this.from.x, 2) + Math.pow(this.to.y - this.from.y, 2));
        }

        /**
         * Returns the angle of the line in relation to the coordinate system (the x-axis).
         *
         * @returns {number} The angle in radians.
         */

    }, {
        key: 'getAngle',
        value: function getAngle() {
            // Get the angle between the line and the x-axis
            var diff = Vector2.subtract(this.getRightVector(), this.getLeftVector());
            return diff.angle();
        }

        /**
         * Returns the right vector (the vector with the larger x value).
         *
         * @returns {Vector2} The right vector.
         */

    }, {
        key: 'getRightVector',
        value: function getRightVector() {
            // Return the vector with the larger x value (the right one)
            if (this.from.x < this.to.x) {
                return this.to;
            } else {
                return this.from;
            }
        }

        /**
         * Returns the left vector (the vector with the smaller x value).
         *
         * @returns {Vector2} The left vector.
         */

    }, {
        key: 'getLeftVector',
        value: function getLeftVector() {
            // Return the vector with the smaller x value (the left one)
            if (this.from.x < this.to.x) {
                return this.from;
            } else {
                return this.to;
            }
        }

        /**
         * Returns the element associated with the right vector (the vector with the larger x value).
         *
         * @returns {string} The element associated with the right vector.
         */

    }, {
        key: 'getRightElement',
        value: function getRightElement() {
            if (this.from.x < this.to.x) {
                return this.elementTo;
            } else {
                return this.elementFrom;
            }
        }

        /**
         * Returns the element associated with the left vector (the vector with the smaller x value).
         *
         * @returns {string} The element associated with the left vector.
         */

    }, {
        key: 'getLeftElement',
        value: function getLeftElement() {
            if (this.from.x < this.to.x) {
                return this.elementFrom;
            } else {
                return this.elementTo;
            }
        }

        /**
         * Set the value of the right vector.
         *
         * @param {number} x The x value.
         * @param {number} y The y value.
         * @returns {Line} This line.
         */

    }, {
        key: 'setRightVector',
        value: function setRightVector(x, y) {
            if (this.from.x < this.to.x) {
                this.to.set(x, y);
            } else {
                this.from.set(x, y);
            }

            return this;
        }

        /**
         * Set the value of the left vector.
         *
         * @param {number} x The x value.
         * @param {number} y The y value.
         * @returns {Line} This line.
         */

    }, {
        key: 'setLeftVector',
        value: function setLeftVector(x, y) {
            if (this.from.x < this.to.x) {
                this.from.set(x, y);
            } else {
                this.to.set(x, y);
            }

            return this;
        }

        /**
         * Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.
         *
         * @returns {Line} This line.
         */

    }, {
        key: 'rotateToXAxis',
        value: function rotateToXAxis() {
            var left = this.getLeftVector();

            this.setRightVector(left.x + this.getLength(), left.y);

            return this;
        }

        /**
         * Rotate the line by a given value (in radians). The center of rotation is the left vector.
         *
         * @param {number} theta The angle (in radians) to rotate the line.
         * @returns {Line} This line.
         */

    }, {
        key: 'rotate',
        value: function rotate(theta) {
            var l = this.getLeftVector();
            var r = this.getRightVector();
            var x = Math.cos(theta) * (r.x - l.x) - Math.sin(theta) * (r.y - l.y) + l.x;
            var y = Math.sin(theta) * (r.x - l.x) - Math.cos(theta) * (r.y - l.y) + l.y;

            this.setRightVector(x, y);

            return this;
        }

        /**
         * Shortens this line from the "from" direction by a given value (in pixels).
         *
         * @param {number} by The length in pixels to shorten the vector by.
         * @returns {Line} This line.
         */

    }, {
        key: 'shortenFrom',
        value: function shortenFrom(by) {
            var f = Vector2.subtract(this.to, this.from);

            f.normalize();
            f.multiply(by);

            this.from.add(f);

            return this;
        }

        /**
         * Shortens this line from the "to" direction by a given value (in pixels).
         *
         * @param {number} by The length in pixels to shorten the vector by.
         * @returns {Line} This line.
         */

    }, {
        key: 'shortenTo',
        value: function shortenTo(by) {
            var f = Vector2.subtract(this.from, this.to);

            f.normalize();
            f.multiply(by);

            this.to.add(f);

            return this;
        }

        /**
         * Shortens this line from both directions by a given value (in pixels).
         *
         * @param {number} by The length in pixels to shorten the vector by.
         * @returns {Line} This line.
         */

    }, {
        key: 'shorten',
        value: function shorten(by) {
            var f = Vector2.subtract(this.from, this.to);

            f.normalize();
            f.multiply(by / 2.0);

            this.to.add(f);
            this.from.subtract(f);

            return this;
        }
    }]);

    return Line;
}();

/** A static class containing helper functions for math-related tasks. */


var MathHelper = function () {
    function MathHelper() {
        _classCallCheck(this, MathHelper);
    }

    _createClass(MathHelper, null, [{
        key: 'round',

        /**
         * Rounds a value to a given number of decimals.
         *
         * @static
         * @param {number} value A number.
         * @param {number} decimals The number of decimals.
         * @returns {number} A number rounded to a given number of decimals.
         */
        value: function round(value, decimals) {
            decimals = decimals ? decimals : 1;
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

        /**
         * Returns the means of the angles contained in an array. In radians.
         *
         * @static
         * @param {array} arr An array containing angles (in radians).
         * @returns {number} The mean angle in radians.
         */

    }, {
        key: 'meanAngle',
        value: function meanAngle(arr) {
            var sin = 0.0;
            var cos = 0.0;

            for (var i = 0; i < arr.length; i++) {
                sin += Math.sin(arr[i]);
                cos += Math.cos(arr[i]);
            }

            return Math.atan2(sin / arr.length, cos / arr.length);
        }

        /**
         * Returns the inner angle of a n-sided regular polygon.
         *
         * @static
         * @param {number} n Number of sides of a regular polygon.
         * @returns {number} The inner angle of a given regular polygon.
         */

    }, {
        key: 'innerAngle',
        value: function innerAngle(n) {
            return MathHelper.toRad((n - 2) * 180 / n);
        }

        /**
         * Returns the circumradius of a n-sided regular polygon with a given side-length.
         *
         * @static
         * @param {number} s The side length of the regular polygon.
         * @param {number} n The number of sides.
         * @returns {number} The circumradius of the regular polygon.
         */

    }, {
        key: 'polyCircumradius',
        value: function polyCircumradius(s, n) {
            return s / (2 * Math.sin(Math.PI / n));
        }

        /**
         * Returns the apothem of a regular n-sided polygon based on its radius.
         *
         * @static
         * @param {number} r The radius.
         * @param {number} n The number of edges of the regular polygon.
         * @returns {number} The apothem of a n-sided polygon based on its radius.
         */

    }, {
        key: 'apothem',
        value: function apothem(r, n) {
            return r * Math.cos(Math.PI / n);
        }

        /**
         * The central angle of a n-sided regular polygon. In radians.
         *
         * @static
         * @param {number} n The number of sides of the regular polygon.
         * @returns {number} The central angle of the n-sided polygon in radians.
         */

    }, {
        key: 'centralAngle',
        value: function centralAngle(n) {
            return MathHelper.toRad(360 / n);
        }

        /**
         * Convertes radians to degrees.
         *
         * @static
         * @param {number} rad An angle in radians.
         * @returns {number} The angle in degrees.
         */

    }, {
        key: 'toDeg',
        value: function toDeg(rad) {
            return rad * 180 / Math.PI;
        }

        /**
         * Converts degrees to radians.
         *
         * @static
         * @param {number} deg An angle in degrees.
         * @returns {number} The angle in radians.
         */

    }, {
        key: 'toRad',
        value: function toRad(deg) {
            return deg * Math.PI / 180;
        }
    }]);

    return MathHelper;
}();

/** A class representing a pair */


var Pair = function () {
    /**
     * The constructor for the class Pair.
     *
     * @param {*} first The first element of the pair.
     * @param {*} second The second element of the pair.
     */
    function Pair(first, second) {
        _classCallCheck(this, Pair);

        this.first = first;
        this.second = second;
    }

    /**
     * Returns a unique hash for this pair. Uses the cantor pairing function.
     *
     * @returns {number} The hash.
     */


    _createClass(Pair, [{
        key: 'getHash',
        value: function getHash() {
            // Cantor pairing function, which uniquely encodes
            // two natural numbers into one natural number
            // N x N -> N
            // however replace the last term to make to not take
            // the order into account
            return 0.5 * (this.first + this.second) * (this.first + this.second + 1) + (this.first + this.second);
        }

        /**
         * Checks whether or not this pair contains an object. Uses '===' to compare.
         *
         * @param {*} item An string or a number (current limitation).
         * @returns {boolean} A boolean representing whether or not this pair contains a given value.
         */

    }, {
        key: 'contains',
        value: function contains(item) {
            return this.first === item || this.second === item;
        }

        /**
         * Creates unique paris from an array. The array must contain unique values.
         *
         * @static
         * @param {array} array An array containing unique values.
         * @returns {array} An array containing unique pairs created from the provided array.
         */

    }], [{
        key: 'createUniquePairs',
        value: function createUniquePairs(array) {
            // Each element in array has to be unique, else this wont work
            var pairs = [];

            for (var i = 0; i < array.length; i++) {
                var a = array[i];

                for (var j = i + 1; j < array.length; j++) {
                    var b = array[j];

                    pairs.push(new Pair(a, b));
                }
            }

            return pairs;
        }
    }]);

    return Pair;
}();

/** A class representing a ring */


var Ring = function () {
    /**
     * The constructor for the class Ring.
     *
     * @param {number} ringbond The id of the ring-bond shared by the source and target atom defined in the smiles string.
     * @param {number} sourceId The source vertex id.
     * @param {number} targetId The target vertex id.
     */
    function Ring(ringbond, sourceId, targetId) {
        _classCallCheck(this, Ring);

        this.id = null;
        this.ringbond = ringbond;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.members = new Array();
        this.insiders = new Array();
        this.neighbours = new Array();
        this.positioned = false;
        this.center = new Vector2();
        this.rings = new Array();
        this.isBridged = false;
        this.template = null;
        this.isSpiro = false;
        this.isFused = false;
        this.radius = 0.0;
        this.centralAngle = 0.0;
        this.canFlip = true;
    }

    /**
     * Clones this ring and returns the clone.
     *
     * @returns {Ring} A clone of this ring.
     */


    _createClass(Ring, [{
        key: 'clone',
        value: function clone() {
            var clone = new Ring(this.ringbond, this.sourceId, this.target);

            clone.id = this.id;
            clone.members = ArrayHelper.clone(this.members);
            clone.insiders = ArrayHelper.clone(this.insiders);
            clone.neighbours = ArrayHelper.clone(this.neighbours);
            clone.positioned = this.positioned;
            clone.center = this.center.clone();
            clone.rings = ArrayHelper.clone(this.rings);
            clone.isBridged = this.isBridged;
            clone.template = this.template;
            clone.isSpiro = this.isSpiro;
            clone.isFused = this.isFused;
            clone.radius = this.radius;
            clone.centralAngle = this.centralAngle;
            clone.canFlip = this.canFlip;

            return clone;
        }

        /**
         * Returns a boolean indicating whether or not this ring is allowed to flip attached vertices (atoms) to the inside of the ring. Is only allowed for rings with more than 4 members. Can be disabling by setting the canFlip property of the ring to false.
         *
         * @returns {boolean} Returns a boolean indicating whether or not vertices (atoms) attached to this ring can be flipped to the inside of the ring.
         */

    }, {
        key: 'allowsFlip',
        value: function allowsFlip() {
            return this.canFlip && this.members.length > 4;
        }

        /**
         * Sets the canFlip property of this ring to false if the ring has less than 8 members. If the ring has more than 8 members, the value of canFlip is not changed.
         *
         */

    }, {
        key: 'setFlipped',
        value: function setFlipped() {
            if (this.members.length < 8) {
                this.canFlip = false;
            }
        }

        /**
         * Returns the size (number of members) of this ring.
         *
         * @returns {number} The size (number of members) of this ring.
         */

    }, {
        key: 'getSize',
        value: function getSize() {
            return this.members.length;
        }

        /**
         * Gets the polygon representation (an array of the ring-members positional vectors) of this ring.
         *
         * @param {array} vertices An array of vertices representing the current molecule.
         * @returns {array} An array of the positional vectors of the ring members.
         */

    }, {
        key: 'getPolygon',
        value: function getPolygon(vertices) {
            var polygon = [];

            for (var i = 0; i < this.members.length; i++) {
                polygon.push(vertices[this.members[i]].position);
            }

            return polygon;
        }

        /**
         * Returns the angle of this ring in relation to the coordinate system.
         *
         * @returns {number} The angle in radians.
         */

    }, {
        key: 'getAngle',
        value: function getAngle() {
            return Math.PI - this.centralAngle;
        }

        /**
         * Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.
         *
         * @param {array} vertices The vertices associated with the current molecule.
         * @param {function} callback A callback with the current vertex id as a parameter.
         * @param {number} startVertexId The vertex id of the start vertex.
         * @param {number} previousVertexId The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex).
         */

    }, {
        key: 'eachMember',
        value: function eachMember(vertices, callback, startVertexId, previousVertexId) {
            startVertexId = startVertexId || startVertexId === 0 ? startVertexId : this.members[0];
            var current = startVertexId;
            var max = 0;

            while (current != null && max < 100) {
                var prev = current;

                callback(prev);
                current = vertices[current].getNextInRing(vertices, this.id, previousVertexId);
                previousVertexId = prev;

                // Stop while loop when arriving back at the start vertex
                if (current == startVertexId) {
                    current = null;
                }

                // Currently, there can be rings where the start vertex is never
                // reached again (bridged rings)
                if (max == 99) {
                    console.log('Smiles-drawer was not able to loop over the members of this ring.', this);
                    throw 'Smiles-drawer was not able to loop over the members of this ring.';
                }

                max++;
            }
        }

        /**
         * Returns an array containing the neighbouring rings of this ring ordered by ring size.
         *
         * @param {array} ringConnections An array of ring connections associated with the current molecule.
         * @returns {array} An array of neighbouring rings sorted by ring size.
         */

    }, {
        key: 'getOrderedNeighbours',
        value: function getOrderedNeighbours(ringConnections) {
            var orderedNeighbours = [];

            for (var i = 0; i < this.neighbours.length; i++) {
                var vertices = RingConnection.getVertices(ringConnections, this.id, this.neighbours[i]);

                orderedNeighbours.push({
                    n: vertices.length,
                    neighbour: this.neighbours[i]
                });
            }

            orderedNeighbours.sort(function (a, b) {
                // Sort highest to lowest
                return b.n - a.n;
            });

            return orderedNeighbours;
        }

        /**
         * Check whether this ring is aromatic but has no explicit double-bonds defined (e.g. c1ccccc1).
         *
         * @param {array} vertices An array of vertices associated with the current molecule.
         * @returns {boolean} A boolean indicating whether or not this ring is implicitly aromatic (using lowercase letters in smiles).
         */

    }, {
        key: 'isAromatic',
        value: function isAromatic(vertices) {
            for (var i = 0; i < this.members.length; i++) {
                var e = vertices[this.members[i]].value.element.charAt(0);

                if (e == e.toUpperCase()) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Checks whether or not this ring contains a member with a given vertex id.
         *
         * @param {number} vertexId A vertex id.
         * @returns {boolean} A boolean indicating whether or not this ring contains a member with the given vertex id.
         */

    }, {
        key: 'contains',
        value: function contains(vertexId) {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i] == vertexId) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Checks whether or not this ring or one of its neighbouring rings contains a member with a given vertex id.
         *
         * @param {array} rings An array of rings associated with this molecule.
         * @param {number} vertexId A vertex id.
         * @returns {boolean} A boolean indicating whether or not this ring or one of its neighbouring rings contains a emember with the given vertex id.
         */

    }, {
        key: 'thisOrNeighboursContain',
        value: function thisOrNeighboursContain(rings, vertexId) {
            for (var i = 0; i < this.neighbours.length; i++) {
                if (Ring.getRing(rings, this.neighbours[i]).contains(vertexId)) {
                    return true;
                }
            }

            if (this.contains(vertexId)) {
                return true;
            }

            return false;
        }

        /**
         * Checks whether or not this ring has a source defined.
         *
         * @returns {boolean} A boolean indicating whether or not this ring has a source defined.
         */

    }, {
        key: 'hasSource',
        value: function hasSource() {
            return !(this.sourceId === undefined || this.sourceId === null);
        }

        /**
         * Checks whether or not this ring has a target defined.
         *
         * @returns {boolean} A boolean indicating whether or not this ring has a target defined.
         */

    }, {
        key: 'hasTarget',
        value: function hasTarget() {
            return !(this.targetId === undefined || this.targetId === null);
        }

        /**
         * Checks whether or not this ring has a source and a target defined.
         *
         * @returns {boolean} A boolean indicating whether or not this ring has a source and a target defined.
         */

    }, {
        key: 'hasSourceAndTarget',
        value: function hasSourceAndTarget() {
            return this.hasSource() && this.hasTarget();
        }

        /**
         * Returns a ring based on a provided ring id.
         *
         * @param {array} rings An array of rings associated with the current molecule.
         * @param {number} id A ring id.
         * @returns {Ring} A ring with a given id.
         */

    }], [{
        key: 'getRing',
        value: function getRing(rings, id) {
            for (var i = 0; i < rings.length; i++) {
                if (rings[i].id == id) {
                    return rings[i];
                }
            }
        }
    }]);

    return Ring;
}();

/** A class representing a ring connection */


var RingConnection = function () {
    /**
     * The constructor for the class RingConnection.
     *
     * @param {number} firstRing A ring.
     * @param {number} secondRing A ring.
     */
    function RingConnection(firstRing, secondRing) {
        _classCallCheck(this, RingConnection);

        this.id = null;
        this.rings = new Pair(firstRing.id, secondRing.id);
        this.vertices = [];

        for (var m = 0; m < firstRing.members.length; m++) {
            var c = firstRing.members[m];

            for (var n = 0; n < secondRing.members.length; n++) {
                var d = secondRing.members[n];

                if (c === d) {
                    this.addVertex(c);
                }
            }
        }
    }

    /**
     * Adding a vertex to the ring connection.
     *
     * @param {number} vertexId A vertex id.
     */


    _createClass(RingConnection, [{
        key: 'addVertex',
        value: function addVertex(vertexId) {
            if (!ArrayHelper.contains(this.vertices, { value: vertexId })) {
                this.vertices.push(vertexId);
            }
        }

        /**
         * Checks whether or not this ring connection is a bridge in a bridged ring.
         *
         * @param {array} vertices The array of vertices associated with the current molecule.
         * @returns {boolean} A boolean indicating whether or not this ring connection is a bridge.
         */

    }, {
        key: 'isBridge',
        value: function isBridge(vertices) {
            if (this.vertices.length > 2) {
                return true;
            }

            for (var i = 0; i < this.vertices.length; i++) {
                var vertexId = this.vertices[i];

                if (vertices[vertexId].value.rings.length > 2) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Update the ring id of this ring connection that is not the ring id supplied as the second argument.
         *
         * @param {number} ringId A ring id. The new ring id to be set.
         * @param {number} otherRingId A ring id. The id that is NOT to be updated.
         */

    }, {
        key: 'updateOther',
        value: function updateOther(ringId, otherRingId) {
            if (this.rings.first === otherRingId) {
                this.rings.second = ringId;
            } else {
                this.rings.first = ringId;
            }
        }

        /**
         * Checks whether or not two rings are connected by a bridged bond.
         *
         * @static
         * @param {array} ringConnections An array of ring connections containing the ring connections associated with the current molecule.
         * @param {array} vertices An array of vertices containing the vertices associated with the current molecule.
         * @param {number} firstRingId A ring id.
         * @param {number} secondRingId A ring id.
         * @returns {boolean} A boolean indicating whether or not two rings ar connected by a bridged bond.
         */

    }], [{
        key: 'isBridge',
        value: function isBridge(ringConnections, vertices, firstRingId, secondRingId) {
            var ringConnection = null;

            for (var i = 0; i < ringConnections.length; i++) {
                ringConnection = ringConnections[i];

                var rings = ringConnection.rings;

                if (rings.first === firstRingId && rings.second === secondRingId || rings.first === secondRingId && rings.second === firstRingId) {
                    return ringConnection.isBridge(vertices);
                }
            }

            return false;
        }

        /**
         * Retruns the neighbouring rings of a given ring.
         *
         * @static
         * @param {array} ringConnections An array of ring connections containing ring connections associated with the current molecule.
         * @param {number} ringId A ring id.
         * @returns {array} An array of ring ids of neighbouring rings.
         */

    }, {
        key: 'getNeighbours',
        value: function getNeighbours(ringConnections, ringId) {
            var neighbours = [];

            for (var i = 0; i < ringConnections.length; i++) {
                var pair = ringConnections[i].rings;

                if (pair.first === ringId) {
                    neighbours.push(pair.second);
                } else if (pair.second === ringId) {
                    neighbours.push(pair.first);
                }
            }

            return neighbours;
        }

        /**
         * Returns an array of vertex ids associated with a given ring connection.
         *
         * @static
         * @param {array} ringConnections An array of ring connections containing ring connections associated with the current molecule.
         * @param {number} firstRingId A ring id.
         * @param {number} secondRingId A ring id.
         * @returns {array} An array of vertex ids associated with the ring connection.
         */

    }, {
        key: 'getVertices',
        value: function getVertices(ringConnections, firstRingId, secondRingId) {
            for (var i = 0; i < ringConnections.length; i++) {
                var rc = ringConnections[i];

                if (rc.rings.first == firstRingId && rc.rings.second == secondRingId || rc.rings.first == secondRingId && rc.rings.second == firstRingId) {

                    return rc.vertices;
                }
            }
        }
    }]);

    return RingConnection;
}();

var smiles = function () {
    "use strict";

    /*
     * Generated by PEG.js 0.9.0.
     *
     * http://pegjs.org/
     */

    function peg$subclass(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
    }

    function peg$SyntaxError(message, expected, found, location) {
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, peg$SyntaxError);
        }
    }

    peg$subclass(peg$SyntaxError, Error);

    function peg$parse(input) {
        var options = arguments.length > 1 ? arguments[1] : {},
            parser = this,
            peg$FAILED = {},
            peg$startRuleFunctions = {
            chain: peg$parsechain
        },
            peg$startRuleFunction = peg$parsechain,
            peg$c0 = function peg$c0(s) {
            var branches = [];
            var rings = [];

            for (var i = 0; i < s[1].length; i++) {
                branches.push(s[1][i]);
            }

            for (var i = 0; i < s[2].length; i++) {
                var bond = s[2][i][0] ? s[2][i][0] : '-';
                rings.push({
                    'bond': bond,
                    'id': s[2][i][1]
                });
            }

            for (var i = 0; i < s[3].length; i++) {
                branches.push(s[3][i]);
            }

            for (var i = 0; i < s[6].length; i++) {
                branches.push(s[6][i]);
            }

            return {
                'atom': s[0],
                'isBracket': s[0].element ? true : false,
                'branches': branches,
                'branchCount': branches.length,
                'ringbonds': rings,
                'ringbondCount': rings.length,
                'bond': s[4] ? s[4] : '-',
                'next': s[5],
                'hasNext': s[5] ? true : false
            };

            return s;
        },
            peg$c1 = "(",
            peg$c2 = {
            type: "literal",
            value: "(",
            description: "\"(\""
        },
            peg$c3 = ")",
            peg$c4 = {
            type: "literal",
            value: ")",
            description: "\")\""
        },
            peg$c5 = function peg$c5(b) {
            var bond = b[1] ? b[1] : '-';
            b[2].branchBond = bond;
            return b[2];
        },
            peg$c6 = function peg$c6(a) {
            return a;
        },
            peg$c7 = /^[\-=#$:\/\\.]/,
            peg$c8 = {
            type: "class",
            value: "[-=#$:/\\\\.]",
            description: "[-=#$:/\\\\.]"
        },
            peg$c9 = function peg$c9(b) {
            return b;
        },
            peg$c10 = "[",
            peg$c11 = {
            type: "literal",
            value: "[",
            description: "\"[\""
        },
            peg$c12 = "se",
            peg$c13 = {
            type: "literal",
            value: "se",
            description: "\"se\""
        },
            peg$c14 = "as",
            peg$c15 = {
            type: "literal",
            value: "as",
            description: "\"as\""
        },
            peg$c16 = "]",
            peg$c17 = {
            type: "literal",
            value: "]",
            description: "\"]\""
        },
            peg$c18 = function peg$c18(b) {
            return {
                'isotope': b[1],
                'element': b[2],
                'chirality': b[3],
                'hcount': b[4],
                'charge': b[5],
                'class': b[6]
            };
        },
            peg$c19 = "B",
            peg$c20 = {
            type: "literal",
            value: "B",
            description: "\"B\""
        },
            peg$c21 = "r",
            peg$c22 = {
            type: "literal",
            value: "r",
            description: "\"r\""
        },
            peg$c23 = "C",
            peg$c24 = {
            type: "literal",
            value: "C",
            description: "\"C\""
        },
            peg$c25 = "l",
            peg$c26 = {
            type: "literal",
            value: "l",
            description: "\"l\""
        },
            peg$c27 = /^[NOPSFI]/,
            peg$c28 = {
            type: "class",
            value: "[NOPSFI]",
            description: "[NOPSFI]"
        },
            peg$c29 = function peg$c29(o) {
            if (o.length > 1) return o.join('');
            return o;
        },
            peg$c30 = /^[bcnops]/,
            peg$c31 = {
            type: "class",
            value: "[bcnops]",
            description: "[bcnops]"
        },
            peg$c32 = "*",
            peg$c33 = {
            type: "literal",
            value: "*",
            description: "\"*\""
        },
            peg$c34 = function peg$c34(w) {
            return w;
        },
            peg$c35 = /^[A-Z]/,
            peg$c36 = {
            type: "class",
            value: "[A-Z]",
            description: "[A-Z]"
        },
            peg$c37 = /^[a-z]/,
            peg$c38 = {
            type: "class",
            value: "[a-z]",
            description: "[a-z]"
        },
            peg$c39 = function peg$c39(e) {
            return e.join('');
        },
            peg$c40 = "%",
            peg$c41 = {
            type: "literal",
            value: "%",
            description: "\"%\""
        },
            peg$c42 = /^[1-9]/,
            peg$c43 = {
            type: "class",
            value: "[1-9]",
            description: "[1-9]"
        },
            peg$c44 = /^[0-9]/,
            peg$c45 = {
            type: "class",
            value: "[0-9]",
            description: "[0-9]"
        },
            peg$c46 = function peg$c46(r) {
            if (r.length == 1) return Number(r);
            return Number(r.join('').replace('%', ''));
        },
            peg$c47 = "@",
            peg$c48 = {
            type: "literal",
            value: "@",
            description: "\"@\""
        },
            peg$c49 = "TH",
            peg$c50 = {
            type: "literal",
            value: "TH",
            description: "\"TH\""
        },
            peg$c51 = /^[12]/,
            peg$c52 = {
            type: "class",
            value: "[12]",
            description: "[12]"
        },
            peg$c53 = "AL",
            peg$c54 = {
            type: "literal",
            value: "AL",
            description: "\"AL\""
        },
            peg$c55 = "SP",
            peg$c56 = {
            type: "literal",
            value: "SP",
            description: "\"SP\""
        },
            peg$c57 = /^[1-3]/,
            peg$c58 = {
            type: "class",
            value: "[1-3]",
            description: "[1-3]"
        },
            peg$c59 = "TB",
            peg$c60 = {
            type: "literal",
            value: "TB",
            description: "\"TB\""
        },
            peg$c61 = "OH",
            peg$c62 = {
            type: "literal",
            value: "OH",
            description: "\"OH\""
        },
            peg$c63 = function peg$c63(c) {
            if (!c[1]) return '@';
            if (c[1] == '@') return '@@';

            return c[1].join('').replace(',', '');
        },
            peg$c64 = function peg$c64(c) {
            return c;
        },
            peg$c65 = "+",
            peg$c66 = {
            type: "literal",
            value: "+",
            description: "\"+\""
        },
            peg$c67 = function peg$c67(c) {
            if (!c[1]) return 1;
            if (c[1] != '+') return Number(c[1].join(''));
            return 2;
        },
            peg$c68 = "-",
            peg$c69 = {
            type: "literal",
            value: "-",
            description: "\"-\""
        },
            peg$c70 = function peg$c70(c) {
            if (!c[1]) return -1;
            if (c[1] != '-') return -Number(c[1].join(''));
            return -2;
        },
            peg$c71 = "H",
            peg$c72 = {
            type: "literal",
            value: "H",
            description: "\"H\""
        },
            peg$c73 = function peg$c73(h) {
            if (h[1]) return Number(h[1]);
            return 1;
        },
            peg$c74 = ":",
            peg$c75 = {
            type: "literal",
            value: ":",
            description: "\":\""
        },
            peg$c76 = /^[0]/,
            peg$c77 = {
            type: "class",
            value: "[0]",
            description: "[0]"
        },
            peg$c78 = function peg$c78(c) {
            return Number(c[1][0] + c[1][1].join(''));
        },
            peg$c79 = function peg$c79(i) {
            return Number(i.join(''));
        },
            peg$currPos = 0,
            peg$savedPos = 0,
            peg$posDetailsCache = [{
            line: 1,
            column: 1,
            seenCR: false
        }],
            peg$maxFailPos = 0,
            peg$maxFailExpected = [],
            peg$silentFails = 0,
            peg$result;

        if ("startRule" in options) {
            if (!(options.startRule in peg$startRuleFunctions)) {
                throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
            }

            peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }

        function text() {
            return input.substring(peg$savedPos, peg$currPos);
        }

        function location() {
            return peg$computeLocation(peg$savedPos, peg$currPos);
        }

        function expected(description) {
            throw peg$buildException(null, [{
                type: "other",
                description: description
            }], input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
        }

        function error(message) {
            throw peg$buildException(message, null, input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
        }

        function peg$computePosDetails(pos) {
            var details = peg$posDetailsCache[pos],
                p,
                ch;

            if (details) {
                return details;
            } else {
                p = pos - 1;
                while (!peg$posDetailsCache[p]) {
                    p--;
                }

                details = peg$posDetailsCache[p];
                details = {
                    line: details.line,
                    column: details.column,
                    seenCR: details.seenCR
                };

                while (p < pos) {
                    ch = input.charAt(p);
                    if (ch === "\n") {
                        if (!details.seenCR) {
                            details.line++;
                        }
                        details.column = 1;
                        details.seenCR = false;
                    } else if (ch === "\r" || ch === '\u2028' || ch === '\u2029') {
                        details.line++;
                        details.column = 1;
                        details.seenCR = true;
                    } else {
                        details.column++;
                        details.seenCR = false;
                    }

                    p++;
                }

                peg$posDetailsCache[pos] = details;
                return details;
            }
        }

        function peg$computeLocation(startPos, endPos) {
            var startPosDetails = peg$computePosDetails(startPos),
                endPosDetails = peg$computePosDetails(endPos);

            return {
                start: {
                    offset: startPos,
                    line: startPosDetails.line,
                    column: startPosDetails.column
                },
                end: {
                    offset: endPos,
                    line: endPosDetails.line,
                    column: endPosDetails.column
                }
            };
        }

        function peg$fail(expected) {
            if (peg$currPos < peg$maxFailPos) {
                return;
            }

            if (peg$currPos > peg$maxFailPos) {
                peg$maxFailPos = peg$currPos;
                peg$maxFailExpected = [];
            }

            peg$maxFailExpected.push(expected);
        }

        function peg$buildException(message, expected, found, location) {
            function cleanupExpected(expected) {
                var i = 1;

                expected.sort(function (a, b) {
                    if (a.description < b.description) {
                        return -1;
                    } else if (a.description > b.description) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                while (i < expected.length) {
                    if (expected[i - 1] === expected[i]) {
                        expected.splice(i, 1);
                    } else {
                        i++;
                    }
                }
            }

            function buildMessage(expected, found) {
                function stringEscape(s) {
                    function hex(ch) {
                        return ch.charCodeAt(0).toString(16).toUpperCase();
                    }

                    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
                        return '\\x0' + hex(ch);
                    }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
                        return '\\x' + hex(ch);
                    }).replace(/[\u0100-\u0FFF]/g, function (ch) {
                        return '\\u0' + hex(ch);
                    }).replace(/[\u1000-\uFFFF]/g, function (ch) {
                        return '\\u' + hex(ch);
                    });
                }

                var expectedDescs = new Array(expected.length),
                    expectedDesc,
                    foundDesc,
                    i;

                for (i = 0; i < expected.length; i++) {
                    expectedDescs[i] = expected[i].description;
                }

                expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

                foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

                return "Expected " + expectedDesc + " but " + foundDesc + " found.";
            }

            if (expected !== null) {
                cleanupExpected(expected);
            }

            return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
        }

        function peg$parsechain() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = peg$parseatom();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsebranch();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsebranch();
                }
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$currPos;
                    s6 = peg$parsebond();
                    if (s6 === peg$FAILED) {
                        s6 = null;
                    }
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parsering();
                        if (s7 !== peg$FAILED) {
                            s6 = [s6, s7];
                            s5 = s6;
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$currPos;
                        s6 = peg$parsebond();
                        if (s6 === peg$FAILED) {
                            s6 = null;
                        }
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parsering();
                            if (s7 !== peg$FAILED) {
                                s6 = [s6, s7];
                                s5 = s6;
                            } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = [];
                        s6 = peg$parsebranch();
                        while (s6 !== peg$FAILED) {
                            s5.push(s6);
                            s6 = peg$parsebranch();
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsebond();
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsechain();
                                if (s7 === peg$FAILED) {
                                    s7 = null;
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = [];
                                    s9 = peg$parsebranch();
                                    while (s9 !== peg$FAILED) {
                                        s8.push(s9);
                                        s9 = peg$parsebranch();
                                    }
                                    if (s8 !== peg$FAILED) {
                                        s2 = [s2, s3, s4, s5, s6, s7, s8];
                                        s1 = s2;
                                    } else {
                                        peg$currPos = s1;
                                        s1 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s1;
                                    s1 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s1;
                                s1 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s1;
                            s1 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c0(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsebranch() {
            var s0, s1, s2, s3, s4, s5;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 40) {
                s2 = peg$c1;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c2);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsebond();
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsechain();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                            s5 = peg$c3;
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c4);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s2 = [s2, s3, s4, s5];
                            s1 = s2;
                        } else {
                            peg$currPos = s1;
                            s1 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c5(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseatom() {
            var s0, s1;

            s0 = peg$currPos;
            s1 = peg$parseorganicsymbol();
            if (s1 === peg$FAILED) {
                s1 = peg$parsearomaticsymbol();
                if (s1 === peg$FAILED) {
                    s1 = peg$parsebracketatom();
                    if (s1 === peg$FAILED) {
                        s1 = peg$parsewildcard();
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c6(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsebond() {
            var s0, s1;

            s0 = peg$currPos;
            if (peg$c7.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c9(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsebracketatom() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 91) {
                s2 = peg$c10;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c11);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseisotope();
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c12) {
                        s4 = peg$c12;
                        peg$currPos += 2;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c13);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c14) {
                            s4 = peg$c14;
                            peg$currPos += 2;
                        } else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c15);
                            }
                        }
                        if (s4 === peg$FAILED) {
                            s4 = peg$parsearomaticsymbol();
                            if (s4 === peg$FAILED) {
                                s4 = peg$parseelementsymbol();
                                if (s4 === peg$FAILED) {
                                    s4 = peg$parsewildcard();
                                }
                            }
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsechiral();
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsehcount();
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsecharge();
                                if (s7 === peg$FAILED) {
                                    s7 = null;
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parseclass();
                                    if (s8 === peg$FAILED) {
                                        s8 = null;
                                    }
                                    if (s8 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 93) {
                                            s9 = peg$c16;
                                            peg$currPos++;
                                        } else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c17);
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s2 = [s2, s3, s4, s5, s6, s7, s8, s9];
                                            s1 = s2;
                                        } else {
                                            peg$currPos = s1;
                                            s1 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s1;
                                        s1 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s1;
                                    s1 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s1;
                                s1 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s1;
                            s1 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c18(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseorganicsymbol() {
            var s0, s1, s2, s3;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 66) {
                s2 = peg$c19;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c20);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 114) {
                    s3 = peg$c21;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c22);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 === peg$FAILED) {
                s1 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 67) {
                    s2 = peg$c23;
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c24);
                    }
                }
                if (s2 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 108) {
                        s3 = peg$c25;
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c26);
                        }
                    }
                    if (s3 === peg$FAILED) {
                        s3 = null;
                    }
                    if (s3 !== peg$FAILED) {
                        s2 = [s2, s3];
                        s1 = s2;
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
                if (s1 === peg$FAILED) {
                    if (peg$c27.test(input.charAt(peg$currPos))) {
                        s1 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c28);
                        }
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c29(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsearomaticsymbol() {
            var s0, s1;

            s0 = peg$currPos;
            if (peg$c30.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c31);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c6(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsewildcard() {
            var s0, s1;

            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 42) {
                s1 = peg$c32;
                peg$currPos++;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c33);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c34(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseelementsymbol() {
            var s0, s1, s2, s3;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (peg$c35.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c36);
                }
            }
            if (s2 !== peg$FAILED) {
                if (peg$c37.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c38);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c39(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsering() {
            var s0, s1, s2, s3, s4;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 37) {
                s2 = peg$c40;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c41);
                }
            }
            if (s2 !== peg$FAILED) {
                if (peg$c42.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                    }
                }
                if (s3 !== peg$FAILED) {
                    if (peg$c44.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c45);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s2 = [s2, s3, s4];
                        s1 = s2;
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 === peg$FAILED) {
                if (peg$c44.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c46(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsechiral() {
            var s0, s1, s2, s3, s4, s5, s6;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 64) {
                s2 = peg$c47;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c48);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 64) {
                    s3 = peg$c47;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c48);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c49) {
                        s4 = peg$c49;
                        peg$currPos += 2;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c50);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        if (peg$c51.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c52);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                    if (s3 === peg$FAILED) {
                        s3 = peg$currPos;
                        if (input.substr(peg$currPos, 2) === peg$c53) {
                            s4 = peg$c53;
                            peg$currPos += 2;
                        } else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c54);
                            }
                        }
                        if (s4 !== peg$FAILED) {
                            if (peg$c51.test(input.charAt(peg$currPos))) {
                                s5 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else {
                                s5 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c52);
                                }
                            }
                            if (s5 !== peg$FAILED) {
                                s4 = [s4, s5];
                                s3 = s4;
                            } else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                        if (s3 === peg$FAILED) {
                            s3 = peg$currPos;
                            if (input.substr(peg$currPos, 2) === peg$c55) {
                                s4 = peg$c55;
                                peg$currPos += 2;
                            } else {
                                s4 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c56);
                                }
                            }
                            if (s4 !== peg$FAILED) {
                                if (peg$c57.test(input.charAt(peg$currPos))) {
                                    s5 = input.charAt(peg$currPos);
                                    peg$currPos++;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c58);
                                    }
                                }
                                if (s5 !== peg$FAILED) {
                                    s4 = [s4, s5];
                                    s3 = s4;
                                } else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                            if (s3 === peg$FAILED) {
                                s3 = peg$currPos;
                                if (input.substr(peg$currPos, 2) === peg$c59) {
                                    s4 = peg$c59;
                                    peg$currPos += 2;
                                } else {
                                    s4 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c60);
                                    }
                                }
                                if (s4 !== peg$FAILED) {
                                    if (peg$c42.test(input.charAt(peg$currPos))) {
                                        s5 = input.charAt(peg$currPos);
                                        peg$currPos++;
                                    } else {
                                        s5 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c43);
                                        }
                                    }
                                    if (s5 !== peg$FAILED) {
                                        if (peg$c44.test(input.charAt(peg$currPos))) {
                                            s6 = input.charAt(peg$currPos);
                                            peg$currPos++;
                                        } else {
                                            s6 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c45);
                                            }
                                        }
                                        if (s6 === peg$FAILED) {
                                            s6 = null;
                                        }
                                        if (s6 !== peg$FAILED) {
                                            s4 = [s4, s5, s6];
                                            s3 = s4;
                                        } else {
                                            peg$currPos = s3;
                                            s3 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s3;
                                        s3 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                                if (s3 === peg$FAILED) {
                                    s3 = peg$currPos;
                                    if (input.substr(peg$currPos, 2) === peg$c61) {
                                        s4 = peg$c61;
                                        peg$currPos += 2;
                                    } else {
                                        s4 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c62);
                                        }
                                    }
                                    if (s4 !== peg$FAILED) {
                                        if (peg$c42.test(input.charAt(peg$currPos))) {
                                            s5 = input.charAt(peg$currPos);
                                            peg$currPos++;
                                        } else {
                                            s5 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c43);
                                            }
                                        }
                                        if (s5 !== peg$FAILED) {
                                            if (peg$c44.test(input.charAt(peg$currPos))) {
                                                s6 = input.charAt(peg$currPos);
                                                peg$currPos++;
                                            } else {
                                                s6 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c45);
                                                }
                                            }
                                            if (s6 === peg$FAILED) {
                                                s6 = null;
                                            }
                                            if (s6 !== peg$FAILED) {
                                                s4 = [s4, s5, s6];
                                                s3 = s4;
                                            } else {
                                                peg$currPos = s3;
                                                s3 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s3;
                                            s3 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s3;
                                        s3 = peg$FAILED;
                                    }
                                }
                            }
                        }
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c63(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsecharge() {
            var s0, s1;

            s0 = peg$currPos;
            s1 = peg$parseposcharge();
            if (s1 === peg$FAILED) {
                s1 = peg$parsenegcharge();
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c64(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseposcharge() {
            var s0, s1, s2, s3, s4, s5;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 43) {
                s2 = peg$c65;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c66);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 43) {
                    s3 = peg$c65;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c66);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    if (peg$c42.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c43);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        if (peg$c44.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c45);
                            }
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c67(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsenegcharge() {
            var s0, s1, s2, s3, s4, s5;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 45) {
                s2 = peg$c68;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c69);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 45) {
                    s3 = peg$c68;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c69);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    if (peg$c42.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c43);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        if (peg$c44.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c45);
                            }
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c70(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsehcount() {
            var s0, s1, s2, s3;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 72) {
                s2 = peg$c71;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c72);
                }
            }
            if (s2 !== peg$FAILED) {
                if (peg$c44.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c73(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseclass() {
            var s0, s1, s2, s3, s4, s5, s6;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 58) {
                s2 = peg$c74;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c75);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                if (peg$c42.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                    }
                }
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    if (peg$c44.test(input.charAt(peg$currPos))) {
                        s6 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s6 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c45);
                        }
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        if (peg$c44.test(input.charAt(peg$currPos))) {
                            s6 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s6 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c45);
                            }
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    if (peg$c76.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c77);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c78(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseisotope() {
            var s0, s1, s2, s3, s4;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (peg$c42.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c43);
                }
            }
            if (s2 !== peg$FAILED) {
                if (peg$c44.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    if (peg$c44.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c45);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s2 = [s2, s3, s4];
                        s1 = s2;
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c79(s1);
            }
            s0 = s1;

            return s0;
        }

        peg$result = peg$startRuleFunction();

        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
            return peg$result;
        } else {
            if (peg$result !== peg$FAILED && peg$currPos < input.length) {
                peg$fail({
                    type: "end",
                    description: "end of input"
                });
            }

            throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
        }
    }

    return {
        SyntaxError: peg$SyntaxError,
        parse: peg$parse
    };
}();
/** The main class of the application representing the smiles drawer */

var SmilesDrawer = function () {
    /**
     * The constructor for the class SmilesDrawer.
     *
     * @param {object} options An object containing custom values for different options. It is merged with the default options.
     */
    function SmilesDrawer(options) {
        _classCallCheck(this, SmilesDrawer);

        this.ringIdCounter = 0;
        this.ringConnectionIdCounter = 0;
        this.canvasWrapper = null;
        this.direction = 1;
        this.totalOverlapScore = 0;

        this.maxBonds = {
            'c': 4,
            'C': 4,
            'n': 3,
            'N': 3,
            'o': 2,
            'O': 2
        };

        this.defaultOptions = {
            shortBondLength: 15, // 25,
            bondLength: 22, // 30,
            bondSpacing: 4,
            debug: false,
            drawingIterations: 10,
            themes: {
                dark: {
                    C: '#fff',
                    O: '#e74c3c',
                    N: '#3498db',
                    F: '#27ae60',
                    CL: '#16a085',
                    BR: '#d35400',
                    I: '#8e44ad',
                    P: '#d35400',
                    S: '#f1c40f',
                    B: '#e67e22',
                    SI: '#e67e22',
                    BACKGROUND: '#141414'
                },
                light: {
                    C: '#222',
                    O: '#e74c3c',
                    N: '#3498db',
                    F: '#27ae60',
                    CL: '#16a085',
                    BR: '#d35400',
                    I: '#8e44ad',
                    P: '#d35400',
                    S: '#f1c40f',
                    B: '#e67e22',
                    SI: '#e67e22',
                    BACKGROUND: '#fff'
                }
            }
        };

        this.opts = this.extend(true, this.defaultOptions, options);

        // Set the default theme.
        this.theme = this.opts.themes.dark;
    }

    /**
     * A helper method to extend the default options with user supplied ones.
     *
     */


    _createClass(SmilesDrawer, [{
        key: 'extend',
        value: function extend() {
            var that = this;
            var extended = {};
            var deep = false;
            var i = 0;
            var length = arguments.length;

            if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
                deep = arguments[0];
                i++;
            }

            var merge = function merge(obj) {
                for (var prop in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                            extended[prop] = that.extend(true, extended[prop], obj[prop]);
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            for (; i < length; i++) {
                var obj = arguments[i];
                merge(obj);
            }

            return extended;
        }
    }, {
        key: 'draw',


        /**
         * Draws the parsed smiles data to a canvas element.
         *
         * @param {object} data The tree returned by the smiles parser.
         * @param {string} targetId The id of the HTML canvas element the structure is drawn to.
         * @param {string} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
         * @param {boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
         */
        value: function draw(data, targetId) {
            var themeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'dark';
            var infoOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            this.data = data;
            this.canvasWrapper = new CanvasWrapper(targetId, this.opts.themes[themeName]);

            this.ringIdCounter = 0;
            this.ringConnectionIdCounter = 0;

            this.vertices = [];
            this.edges = [];
            this.rings = [];
            this.ringConnections = [];

            this.backupVertices = [];
            this.backupRings = [];

            this.initGraph(data);
            this.initRings();

            if (!infoOnly) {
                this.position();
                var overlapScore = this.getOverlapScore();
                var count = 0;
                var bridgedRingCount = this.getBridgedRings().length;

                // Only redraw if there are no bridged rings ...
                if (bridgedRingCount === 0) {
                    while (overlapScore.total > this.opts.bondLength / 10.0 && count < this.opts.drawingIterations) {
                        if (this.direction === 1) {
                            this.direction = -1;
                        } else if (this.direction === -1) {
                            this.direction = 0;
                        }

                        this.clearPositions();
                        this.position();

                        var newOverlapScore = this.getOverlapScore();

                        if (newOverlapScore.total < overlapScore.total) {
                            overlapScore = newOverlapScore;
                        } else {
                            this.restorePositions();
                        }

                        count++;
                    }
                }

                this.resolveSecondaryOverlaps(overlapScore.scores);
                this.totalOverlapScore = this.getOverlapScore().total;

                // Set the canvas to the appropriate size
                this.canvasWrapper.scale(this.vertices);

                // Do the actual drawing
                this.drawEdges(this.opts.debug);
                this.drawVertices(this.opts.debug);

                this.canvasWrapper.reset();
            }
        }

        /**
         * Returns the number of rings this edge is a part of.
         *
         * @param {number} edgeId The id of an edge.
         * @returns {number} The number of rings the provided edge is part of.
         */

    }, {
        key: 'edgeRingCount',
        value: function edgeRingCount(edgeId) {
            var edge = this.edges[edgeId];
            var a = this.vertices[edge.sourceId];
            var b = this.vertices[edge.targetId];

            return Math.min(a.value.rings.length, b.value.rings.length);
        }

        /**
         * Returns an array containing the bridged rings associated with this  molecule.
         *
         * @returns {array} An array containing all bridged rings associated with this molecule.
         */

    }, {
        key: 'getBridgedRings',
        value: function getBridgedRings() {
            var bridgedRings = [];

            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].isBridged) {
                    bridgedRings.push(this.rings[i]);
                }
            }

            return bridgedRings;
        }

        /**
         * Returns an array containing all fused rings associated with this molecule.
         *
         * @returns {array} An array containing all fused rings associated with this molecule.
         */

    }, {
        key: 'getFusedRings',
        value: function getFusedRings() {
            var fusedRings = [];

            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].isFused) {
                    fusedRings.push(this.rings[i]);
                }
            }

            return fusedRings;
        }

        /**
         * Returns an array containing all spiros associated with this molecule.
         *
         * @returns {array} An array containing all spiros associated with this molecule.
         */

    }, {
        key: 'getSpiros',
        value: function getSpiros() {
            var spiros = [];

            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].isSpiro) {
                    spiros.push(this.rings[i]);
                }
            }

            return spiros;
        }

        /**
         * Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings); Insiders Count (the number of vertices contained within a bridged ring)
         *
         * @returns {string} A string as described in the method description.
         */

    }, {
        key: 'printRingInfo',
        value: function printRingInfo() {
            var result = '';
            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];
                result += ring.id + ';';
                result += ring.members.length + ';';
                result += ring.neighbours.length + ';';
                result += ring.isSpiro ? 'true;' : 'false;';
                result += ring.isFused ? 'true;' : 'false;';
                result += ring.isBridged ? 'true;' : 'false;';
                result += ring.rings.length + ';';
                result += ring.insiders.length;
                result += '\n';
            }

            return result;
        }

        /**
         * Returns the total overlap score of the current molecule.
         *
         * @returns {number} The overlap score.
         */

    }, {
        key: 'getTotalOverlapScore',
        value: function getTotalOverlapScore() {
            return this.totalOverlapScore;
        }

        /**
         * Returns the ring count of the current molecule.
         *
         * @returns {number} The ring count.
         */

    }, {
        key: 'getRingCount',
        value: function getRingCount() {
            return this.rings.length;
        }

        /**
         * Checks whether or not the current molecule contains a bridged ring.
         *
         * @returns {boolean} A boolean indicating whether or not the current molecule contains a bridged ring.
         */

    }, {
        key: 'hasBridgedRing',
        value: function hasBridgedRing() {
            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].isBridged) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Returns the number of heavy atoms (non-hydrogen) in the current molecule.
         *
         * @returns {number} The heavy atom count.
         */

    }, {
        key: 'getHeavyAtomCount',
        value: function getHeavyAtomCount() {
            var hac = 0;

            for (var i = 0; i < this.vertices.length; i++) {
                if (this.vertices[i].value.element.toLowerCase() !== 'h') {
                    hac++;
                }
            }

            return hac;
        }

        /**
         * Initializes the graph (vertices and edges) based on the tree supplied by the smiles parser.
         *
         * @param {object} node The current node in the parse tree.
         * @param {number} parentVertexId=null The id of the previous vertex.
         * @param {boolean} isBranch=false Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C).
         */

    }, {
        key: 'initGraph',
        value: function initGraph(node) {
            var parentVertexId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var isBranch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            // Create a new vertex object
            var atom = new Atom(node.atom.element ? node.atom.element : node.atom, node.bond);
            atom.branchBond = node.branchBond;
            atom.ringbonds = node.ringbonds;
            atom.bracket = node.atom.element ? node.atom : null;

            var vertex = new Vertex(atom);
            var parentVertex = this.vertices[parentVertexId];

            vertex.parentVertexId = parentVertexId;

            this.addVertex(vertex);

            // Add the id of this node to the parent as child
            if (parentVertexId != null) {
                this.vertices[parentVertexId].children.push(vertex.id);

                // In addition create a spanningTreeChildren property, which later will
                // not contain the children added through ringbonds
                this.vertices[parentVertexId].spanningTreeChildren.push(vertex.id);

                // Add edge between this node and its parent
                var edge = new Edge(parentVertexId, vertex.id, 1);

                if (isBranch) {
                    edge.bondType = vertex.value.branchBond;
                } else {
                    edge.bondType = this.vertices[parentVertexId].value.bondType;
                }

                var edgeId = this.addEdge(edge);
                vertex.edges.push(edgeId);
                parentVertex.edges.push(edgeId);
            }

            for (var i = 0; i < node.branchCount; i++) {
                this.initGraph(node.branches[i], vertex.id, true);
            }

            if (node.hasNext) {
                this.initGraph(node.next, vertex.id);
            }
        }

        /**
         * Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.
         *
         * @param {Vertex} vertexA A vertex.
         * @param {Vertex} vertexB A vertex.
         * @returns {string|null} Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.
         */

    }, {
        key: 'getRingbondType',
        value: function getRingbondType(vertexA, vertexB) {
            // Checks whether the two vertices are the ones connecting the ring
            // and what the bond type should be.
            if (vertexA.value.getRingbondCount() < 1 || vertexB.value.getRingbondCount() < 1) {
                return null;
            }

            for (var i = 0; i < vertexA.value.ringbonds.length; i++) {
                for (var j = 0; j < vertexB.value.ringbonds.length; j++) {
                    // if(i != j) continue;
                    if (vertexA.value.ringbonds[i].id == vertexB.value.ringbonds[j].id) {
                        // If the bonds are equal, it doesn't matter which bond is returned.
                        // if they are not equal, return the one that is not the default ("-")
                        if (vertexA.value.ringbonds[i].bondType == '-') {
                            return vertexB.value.ringbonds[j].bond;
                        } else {
                            return vertexA.value.ringbonds[i].bond;
                        }
                    }
                }
            }

            return null;
        }

        /**
         * Initializes rings and ringbonds for the current molecule.
         *
         */

    }, {
        key: 'initRings',
        value: function initRings() {
            var that = this;
            var openBonds = {};
            var ringId = 0;

            for (var i = this.vertices.length - 1; i >= 0; i--) {
                var vertex = this.vertices[i];

                if (vertex.value.ringbonds.length === 0) {
                    continue;
                }

                for (var r = 0; r < vertex.value.ringbonds.length; r++) {
                    var ringbondId = vertex.value.ringbonds[r].id;

                    if (openBonds[ringbondId] === undefined) {
                        openBonds[ringbondId] = vertex.id;
                    } else {
                        var target = openBonds[ringbondId];
                        var source = vertex.id;
                        var edgeId = that.addEdge(new Edge(source, target, 1));

                        that.vertices[source].children.push(target);
                        that.vertices[target].children.push(source);

                        that.vertices[source].edges.push(edgeId);
                        that.vertices[target].edges.push(edgeId);

                        var ring = new Ring(ringbondId, source, target);
                        that.addRing(ring);

                        // Annotate the ring (add ring members to ring and rings to vertices)
                        var path = that.getRingVertices(ring.sourceId, ring.targetId);

                        for (var j = 0; j < path.length; j++) {
                            ring.members.push(path[j]);
                            that.vertices[path[j]].value.rings.push(ring.id);
                        }

                        openBonds[ringbondId] = undefined;
                    }
                }
            }

            // Find connection between rings
            // Check for common vertices and create ring connections. This is a bit
            // ugly, but the ringcount is always fairly low (< 100)
            for (var _i4 = 0; _i4 < this.rings.length - 1; _i4++) {
                for (var _j = _i4 + 1; _j < this.rings.length; _j++) {
                    var a = this.rings[_i4];
                    var b = this.rings[_j];

                    var ringConnection = new RingConnection(a, b);

                    // If there are no vertices in the ring connection, then there
                    // is no ring connection
                    if (ringConnection.vertices.length > 0) {
                        this.addRingConnection(ringConnection);
                    }
                }
            }

            // Add neighbours to the rings
            for (var _i5 = 0; _i5 < this.rings.length; _i5++) {
                var _ring = this.rings[_i5];
                _ring.neighbours = RingConnection.getNeighbours(this.ringConnections, _ring.id);
            }

            // Replace rings contained by a larger bridged ring with a bridged ring
            while (this.rings.length > 0) {
                var id = -1;
                for (var _i6 = 0; _i6 < this.rings.length; _i6++) {
                    var _ring3 = this.rings[_i6];

                    if (this.isPartOfBridgedRing(_ring3.id)) {
                        id = _ring3.id;
                    }
                }

                if (id === -1) {
                    break;
                }

                var _ring2 = this.getRing(id);
                var involvedRings = this.getBridgedRingRings(_ring2.id);

                this.createBridgedRing(involvedRings, _ring2.sourceId);

                // Remove the rings
                for (var _i7 = 0; _i7 < involvedRings.length; _i7++) {
                    this.removeRing(involvedRings[_i7]);
                }
            }
        }

        /**
         * Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.
         *
         * @param {number} ringId A ring id.
         * @returns {array} An array containing all ring ids of rings part of a bridged ring system.
         */

    }, {
        key: 'getBridgedRingRings',
        value: function getBridgedRingRings(ringId) {
            var involvedRings = new Array();
            var that = this;

            var recurse = function recurse(r) {
                var ring = that.getRing(r);
                involvedRings.push(r);

                for (var i = 0; i < ring.neighbours.length; i++) {
                    var n = ring.neighbours[i];

                    if (involvedRings.indexOf(n) === -1 && n !== r && RingConnection.isBridge(that.ringConnections, that.vertices, r, n)) {
                        recurse(n);
                    }
                }
            };

            recurse(ringId);

            return ArrayHelper.unique(involvedRings);
        }

        /**
         * Checks whether or not a ring is part of a bridged ring.
         *
         * @param {number} ringId A ring id.
         * @returns {boolean} A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.
         */

    }, {
        key: 'isPartOfBridgedRing',
        value: function isPartOfBridgedRing(ringId) {
            for (var i = 0; i < this.ringConnections.length; i++) {
                if (this.ringConnections[i].rings.contains(ringId) && this.ringConnections[i].isBridge(this.vertices)) {

                    return true;
                }
            }

            return false;
        }

        /**
         * Creates a bridged ring.
         *
         * @param {array} ringIds An array of ids of rings involved in the bridged ring.
         * @param {number} sourceVertexId The vertex id to start the bridged ring discovery from.
         * @returns {Ring} The bridged ring.
         */

    }, {
        key: 'createBridgedRing',
        value: function createBridgedRing(ringIds, sourceVertexId) {
            var bridgedRing = new Array();
            var vertices = new Array();
            var neighbours = new Array();
            var ringConnections = new Array();

            for (var i = 0; i < ringIds.length; i++) {
                var _ring4 = this.getRing(ringIds[i]);

                for (var j = 0; j < _ring4.members.length; j++) {
                    vertices.push(_ring4.members[j]);
                }

                for (var _j2 = 0; _j2 < _ring4.neighbours.length; _j2++) {
                    neighbours.push(_ring4.neighbours[_j2]);
                }
            }

            // Remove duplicates
            vertices = ArrayHelper.unique(vertices);

            // A vertex is part of the bridged ring if it only belongs to
            // one of the rings (or to another ring
            // which is not part of the bridged ring).
            var leftovers = new Array();

            for (var _i8 = 0; _i8 < vertices.length; _i8++) {
                var vertex = this.vertices[vertices[_i8]];
                var intersection = ArrayHelper.intersection(ringIds, vertex.value.rings);

                if (vertex.value.rings.length == 1 || intersection.length == 1) {
                    bridgedRing.push(vertex.id);
                } else {
                    leftovers.push(vertex.id);
                }
            }

            // Vertices can also be part of multiple rings and lay on the bridged ring,
            // however, they have to have at least two neighbours that are not part of
            // two rings
            var tmp = new Array();
            var insideRing = new Array();

            for (var _i9 = 0; _i9 < leftovers.length; _i9++) {
                var _vertex = this.vertices[leftovers[_i9]];
                var onRing = false;

                /*
                if (ArrayHelper.intersection(vertex.getNeighbours(), bridgedRing).length > 1) {
                    vertex.value.isBridgeNode = true;
                    tmp.push(vertex.id);
                } else {
                    vertex.value.isBridge = true;
                    insideRing.push(vertex.id);
                }
                */

                for (var _j3 = 0; _j3 < _vertex.edges.length; _j3++) {
                    if (this.edgeRingCount(_vertex.edges[_j3]) == 1) {
                        onRing = true;
                    }
                }

                if (onRing) {
                    _vertex.value.isBridgeNode = true;
                    tmp.push(_vertex.id);
                } else {
                    _vertex.value.isBridge = true;
                    insideRing.push(_vertex.id);
                }
            }

            // Merge the two arrays containing members of the bridged ring
            var ringMembers = ArrayHelper.merge(bridgedRing, tmp);

            // The neighbours of the rings in the bridged ring that are not connected by a
            // bridge are now the neighbours of the bridged ring
            neighbours = ArrayHelper.unique(neighbours);
            neighbours = ArrayHelper.removeAll(neighbours, ringIds);

            // The source vertex is the start vertex. The target vertex has to be a member
            // of the birdged ring and a neighbour of the start vertex
            var source = this.vertices[sourceVertexId];
            var sourceNeighbours = source.getNeighbours();
            var target = null;

            for (var _i10 = 0; _i10 < sourceNeighbours.length; _i10++) {
                var n = sourceNeighbours[_i10];

                if (ringMembers.indexOf(n) !== -1) {
                    target = n;
                }
            }

            // Create the ring
            var ring = new Ring(-1, sourceVertexId, target);

            ring.isBridged = true;
            ring.members = ringMembers;
            ring.neighbours = neighbours;
            ring.insiders = insideRing;

            for (var _i11 = 0; _i11 < ringIds.length; _i11++) {
                ring.rings.push(this.getRing(ringIds[_i11]).clone());
            }

            this.addRing(ring);

            // Atoms inside the ring are no longer part of a ring but are now
            // associated with the bridged ring
            for (var _i12 = 0; _i12 < insideRing.length; _i12++) {
                var _vertex2 = this.vertices[insideRing[_i12]];

                _vertex2.value.rings = new Array();
                _vertex2.value.bridgedRing = ring.id;
            }

            // Remove former rings from members of the bridged ring and add the bridged ring
            for (var _i13 = 0; _i13 < ringMembers.length; _i13++) {
                var _vertex3 = this.vertices[ringMembers[_i13]];

                _vertex3.value.rings = ArrayHelper.removeAll(_vertex3.value.rings, ringIds);
                _vertex3.value.rings.push(ring.id);
            }

            // Remove all the ring connections no longer used
            for (var _i14 = 0; _i14 < ringIds.length; _i14++) {
                for (var _j4 = _i14 + 1; _j4 < ringIds.length; _j4++) {
                    this.removeRingConnectionsBetween(ringIds[_i14], ringIds[_j4]);
                }
            }

            // Update the ring connections
            for (var _i15 = 0; _i15 < neighbours.length; _i15++) {
                var connections = this.getRingConnections(neighbours[_i15], ringIds);

                for (var _j5 = 0; _j5 < connections.length; _j5++) {
                    this.getRingConnection(connections[_j5]).updateOther(ring.id, neighbours[_i15]);
                }
            }

            return ring;
        }

        /**
         * Returns an array of vertices that are members of the ring specified by the source and target vertex ids. It is assumed that those two vertices share the ringbond (the break introduced when creating the smiles MST).
         *
         * @param {number} sourceId A vertex id.
         * @param {number} targetId A vertex id.
         * @returns {array} An array of vertex ids.
         */

    }, {
        key: 'getRingVertices',
        value: function getRingVertices(sourceId, targetId) {
            var prev = this.dijkstra(sourceId, targetId);

            // Backtrack from target to source
            var tmp = [];
            var path = [];
            var u = targetId;

            while (u != null) {
                tmp.push(u);
                u = prev[u];
            }

            // Reverse the backtrack path to get forward path
            for (var i = tmp.length - 1; i >= 0; i--) {
                path.push(tmp[i]);
            }

            return path;
        }

        /**
         * Dijkstras algorithm for finding the shortest path between two vertices.
         *
         * @param {number} sourceId The id of the source vertex.
         * @param {number} targetId The id of the target vertex.
         * @returns {array} The path (vertex ids) from the source to the target vertex.
         */

    }, {
        key: 'dijkstra',
        value: function dijkstra(sourceId, targetId) {
            // First initialize q which contains all the vertices
            // including their neighbours, their id and a visited boolean
            var prev = new Array(this.vertices.length);
            var dist = new Array(this.vertices.length);
            var visited = new Array(this.vertices.length);
            var neighbours = new Array(this.vertices.length);

            // Initialize arrays for the algorithm
            for (var i = 0; i < this.vertices.length; i++) {
                dist[i] = i == sourceId ? 0 : Number.MAX_VALUE;
                prev[i] = null;
                visited[i] = false;
                neighbours[i] = this.vertices[i].getNeighbours();
            }

            // Dijkstras alogrithm
            while (ArrayHelper.count(visited, false) > 0) {
                var u = this.getMinDist(dist, visited);

                // if u is the target, we're done
                if (u == targetId) {
                    return prev;
                }

                visited[u] = true; // this "removes" the node from q

                for (var _i16 = 0; _i16 < neighbours[u].length; _i16++) {
                    var v = neighbours[u][_i16];
                    var tmp = dist[u] + this.getEdgeWeight(u, v);

                    // Do not move directly from the source to the target
                    // this should never happen, so just continue
                    if (u == sourceId && v == targetId || u == targetId && v == sourceId) {
                        continue;
                    }

                    if (tmp < dist[v]) {
                        dist[v] = tmp;
                        prev[v] = u;
                    }
                }
            }
        }

        /**
         * Gets the minimal distance from an array containing distances.
         *
         * @param {array} dist An array of distances.
         * @param {array} visited An array indicated whether or not a vertex has been visited.
         * @returns {number} The id with the minimal distance.
         */

    }, {
        key: 'getMinDist',
        value: function getMinDist(dist, visited) {
            var min = Number.MAX_VALUE;
            var v = null;

            for (var i = 0; i < dist.length; i++) {
                if (visited[i]) {
                    continue;
                } else if (dist[i] < min) {
                    v = i;
                    min = dist[v];
                }
            }

            return v;
        }

        /**
         * Checks whether or not tow vertices are in the same ring.
         *
         * @param {Vertex} vertexA A vertex.
         * @param {Vertex} vertexB A vertex.
         * @returns {boolean} A boolean indicating whether or not the two vertices are in the same ring.
         */

    }, {
        key: 'areVerticesInSameRing',
        value: function areVerticesInSameRing(vertexA, vertexB) {
            // This is a little bit lighter (without the array and push) than
            // getCommonRings().length > 0
            for (var i = 0; i < vertexA.value.rings.length; i++) {
                for (var j = 0; j < vertexB.value.rings.length; j++) {
                    if (vertexA.value.rings[i] == vertexB.value.rings[j]) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Returns an array of ring ids shared by both vertices.
         *
         * @param {Vertex} vertexA A vertex.
         * @param {Vertex} vertexB A vertex.
         * @returns {array} An array of ids of rings shared by the two vertices.
         */

    }, {
        key: 'getCommonRings',
        value: function getCommonRings(vertexA, vertexB) {
            var commonRings = [];

            for (var i = 0; i < vertexA.value.rings.length; i++) {
                for (var j = 0; j < vertexB.value.rings.length; j++) {
                    if (vertexA.value.rings[i] == vertexB.value.rings[j]) {
                        commonRings.push(vertexA.value.rings[i]);
                    }
                }
            }

            return commonRings;
        }

        /**
         * Returns the smallest ring shared by the two vertices.
         *
         * @param {Vertex} vertexA A vertex.
         * @param {Vertex} vertexB A vertex.
         * @returns {Ring|null} If a smallest common ring exists, that ring, else null.
         */

    }, {
        key: 'getSmallestCommonRing',
        value: function getSmallestCommonRing(vertexA, vertexB) {
            var commonRings = this.getCommonRings(vertexA, vertexB);
            var minSize = Number.MAX_VALUE;
            var smallestCommonRing = null;

            for (var i = 0; i < commonRings.length; i++) {
                var size = this.getRing(commonRings[i]).getSize();

                if (size < minSize) {
                    minSize = size;
                    smallestCommonRing = this.getRing(commonRings[i]);
                }
            }

            return smallestCommonRing;
        }

        /**
         * Returns the largest ring shared by the two vertices.
         *
         * @param {Vertex} vertexA A vertex.
         * @param {Vertex} vertexB A vertex.
         * @returns {Ring|null} If a largest common ring exists, that ring, else null.
         */

    }, {
        key: 'getLargestCommonRing',
        value: function getLargestCommonRing(vertexA, vertexB) {
            var commonRings = this.getCommonRings(vertexA, vertexB);
            var maxSize = 0;
            var largestCommonRing = null;

            for (var i = 0; i < commonRings.length; i++) {
                var size = this.getRing(commonRings[i]).getSize();

                if (size > maxSize) {
                    maxSize = size;
                    largestCommonRing = this.getRing(commonRings[i]);
                }
            }

            return largestCommonRing;
        }

        /**
        * Returns an array of vertices positioned at a specified location.
        *
        * @param {Vector2} position The position to search for vertices.
        * @param {number} radius The radius within to search.
        * @param {number} excludeVertexId A vertex id to be excluded from the search results.
        * @returns {array} An array containing vertex ids in a given location.
        */

    }, {
        key: 'getVerticesAt',
        value: function getVerticesAt(position, radius, excludeVertexId) {
            var locals = new Array();

            for (var i = 0; i < this.vertices.length; i++) {
                var vertex = this.vertices[i];

                if (vertex.id === excludeVertexId || !vertex.positioned) {
                    continue;
                }

                var distance = position.distance(vertex.position);

                if (distance <= radius) {
                    locals.push(vertex.id);
                }
            }

            return locals;
        }

        /**
         * Returns the rings and vertices contained in a sub-graph.
         *
         * @param {number} vertexId The vertex id to start the sub-graph search from
         * @param {number} previousId The vertex id in the opposite of which the search will be started.
         * @returns {object} An object containing two arrays, one with the vertices in the subgraph and one with the rings in the subgraph.
         */

    }, {
        key: 'getBranch',
        value: function getBranch(vertexId, previousId) {
            var vertices = new Array();
            var rings = new Array();
            var that = this;

            var recurse = function recurse(v, p) {
                var vertex = that.vertices[v];

                for (var i = 0; i < vertex.value.rings.length; i++) {
                    rings.push(vertex.value.rings[i]);
                }

                for (var _i17 = 0; _i17 < vertex.children.length; _i17++) {
                    var child = vertex.children[_i17];

                    if (child !== p && !ArrayHelper.contains(vertices, { value: child })) {
                        vertices.push(child);
                        recurse(child, v);
                    }
                }

                var parentVertexId = vertex.parentVertexId;

                if (parentVertexId !== p && parentVertexId !== null && !ArrayHelper.contains(vertices, { value: parentVertexId })) {
                    vertices.push(parentVertexId);
                    recurse(parentVertexId, v);
                }
            };

            vertices.push(vertexId);
            recurse(vertexId, previousId);

            return {
                vertices: vertices,
                rings: ArrayHelper.unique(rings)
            };
        }

        /**
         * Add a vertex to this representation of a molcule.
         *
         * @param {Vertex} vertex A new vertex.
         * @returns {number} The vertex id of the new vertex.
         */

    }, {
        key: 'addVertex',
        value: function addVertex(vertex) {
            vertex.id = this.vertices.length;
            this.vertices.push(vertex);

            return vertex.id;
        }

        /**
         * Add an edge to this representation of a molecule.
         *
         * @param {Edge} edge A new edge.
         * @returns {number} The edge id of the new edge.
         */

    }, {
        key: 'addEdge',
        value: function addEdge(edge) {
            edge.id = this.edges.length;
            this.edges.push(edge);

            return edge.id;
        }

        /**
         * Add a ring to this representation of a molecule.
         *
         * @param {Ring} ring A new ring.
         * @returns {number} The ring id of the new ring.
         */

    }, {
        key: 'addRing',
        value: function addRing(ring) {
            ring.id = this.ringIdCounter++;
            this.rings.push(ring);

            return ring.id;
        }

        /**
         * Removes a ring from the array of rings associated with the current molecule.
         *
         * @param {number} ringId A ring id.
         */

    }, {
        key: 'removeRing',
        value: function removeRing(ringId) {
            this.rings = this.rings.filter(function (item) {
                return item.id !== ringId;
            });

            // Also remove ring connections involving this ring
            this.ringConnections = this.ringConnections.filter(function (item) {
                return item.rings.first !== ringId && item.rings.second !== ringId;
            });

            // Remove the ring as neighbour of other rings
            for (var i = 0; i < this.rings.length; i++) {
                var r = this.rings[i];
                r.neighbours = r.neighbours.filter(function (item) {
                    return item !== ringId;
                });
            }
        }

        /**
         * Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.
         *
         * @param {number} ringId A ring id.
         * @returns {Ring} A ring associated with the current molecule.
         */

    }, {
        key: 'getRing',
        value: function getRing(ringId) {
            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].id == ringId) {
                    return this.rings[i];
                }
            }
        }

        /**
         * Add a ring connection to this representation of a molecule.
         *
         * @param {RingConnection} ringConnection A new ringConnection.
         * @returns {number} The ring connection id of the new ring connection.
         */

    }, {
        key: 'addRingConnection',
        value: function addRingConnection(ringConnection) {
            ringConnection.id = this.ringConnectionIdCounter++;
            this.ringConnections.push(ringConnection);

            return ringConnection.id;
        }

        /**
         * Removes a ring connection from the array of rings connections associated with the current molecule.
         *
         * @param {number} ringConnectionId A ring connection id.
         */

    }, {
        key: 'removeRingConnection',
        value: function removeRingConnection(ringConnectionId) {
            this.ringConnections = this.ringConnections.filter(function (item) {
                return item.id !== ringConnectionId;
            });
        }

        /**
         * Removes all ring connections between two vertices.
         *
         * @param {number} vertexIdA A vertex id.
         * @param {number} vertexIdB A vertex id.
         */

    }, {
        key: 'removeRingConnectionsBetween',
        value: function removeRingConnectionsBetween(vertexIdA, vertexIdB) {
            var toRemove = new Array();
            for (var i = 0; i < this.ringConnections.length; i++) {
                var ringConnection = this.ringConnections[i];

                if (ringConnection.rings.first === vertexIdA && ringConnection.rings.second === vertexIdB || ringConnection.rings.first === vertexIdB && ringConnection.rings.second === vertexIdA) {
                    toRemove.push(ringConnection.id);
                }
            }

            for (var _i18 = 0; _i18 < toRemove.length; _i18++) {
                this.removeRingConnection(toRemove[_i18]);
            }
        }
    }, {
        key: 'getRingConnection',
        value: function getRingConnection(id) {
            for (var i = 0; i < this.ringConnections.length; i++) {
                if (this.ringConnections[i].id == id) {
                    return this.ringConnections[i];
                }
            }
        }

        /**
         * Get the ring connections associated with a ring, the ring connections between two rings or the ring connections between one ring and multiple other rings.
         *
         * @param {number} ringId A ring id.
         * @param {number|array|null} ringIds=null A ring id, an array of ring ids or null.
         * @returns {array} An array of ring connection ids.
         */

    }, {
        key: 'getRingConnections',
        value: function getRingConnections(ringId) {
            var ringIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var ringConnections = new Array();

            if (ringIds === null) {
                for (var i = 0; i < this.ringConnections.length; i++) {
                    var ringConnection = this.ringConnections[i];

                    if (ringConnection.rings.first === ringId || ringConnection.rings.second === ringId) {
                        ringConnections.push(ringConnection.id);
                    }
                }
            } else if (ringIds.constructor !== Array) {
                for (var _i19 = 0; _i19 < this.ringConnections.length; _i19++) {
                    var _ringConnection = this.ringConnections[_i19];

                    if (_ringConnection.rings.first === ringId && _ringConnection.rings.second === ringIds || _ringConnection.rings.first === ringIds && _ringConnection.rings.second === ringId) {
                        ringConnections.push(_ringConnection.id);
                    }
                }
            } else {
                for (var _i20 = 0; _i20 < this.ringConnections.length; _i20++) {
                    for (var j = 0; j < ringIds.length; j++) {
                        var id = ringIds[j];
                        var _ringConnection2 = this.ringConnections[_i20];

                        if (_ringConnection2.rings.first === ringId && _ringConnection2.rings.second === id || _ringConnection2.rings.first === id && _ringConnection2.rings.second === ringId) {
                            ringConnections.push(_ringConnection2.id);
                        }
                    }
                }
            }

            return ringConnections;
        }

        /**
         * Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.
         *
         * @returns {object} Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }
         */

    }, {
        key: 'getOverlapScore',
        value: function getOverlapScore() {
            var total = 0.0;
            var overlapScores = new Float32Array(this.vertices.length);

            for (var i = 0; i < this.vertices.length; i++) {
                overlapScores[i] = 0;
            }

            for (var _i21 = 0; _i21 < this.vertices.length; _i21++) {
                for (var j = _i21 + 1; j < this.vertices.length; j++) {
                    var a = this.vertices[_i21];
                    var b = this.vertices[j];

                    var dist = Vector2.subtract(a.position, b.position).length();

                    if (dist < this.opts.bondLength) {
                        var weighted = this.opts.bondLength - dist;
                        total += weighted;
                        overlapScores[_i21] += weighted;
                        overlapScores[j] += weighted;
                    }
                }
            }

            var sortable = [];

            for (var _i22 = 0; _i22 < this.vertices.length; _i22++) {
                sortable.push({
                    id: _i22,
                    score: overlapScores[_i22]
                });
            }

            sortable.sort(function (a, b) {
                return b.score - a.score;
            });

            return {
                total: total,
                scores: sortable
            };
        }

        /**
         * When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.
         *
         * @param {Vertex} vertexA A vertex.
         * @param {Vertex} vertexB A vertex.
         * @param {array} sides An array containing the two normals of the line spanned by the two provided vertices.
         * @returns {object} Returns an object containing the following information: {
                totalSideCount: Counts the sides of each vertex in the molecule, is an array [ a, b ],
                totalPosition: Same as position, but based on entire molecule,
                sideCount: Counts the sides of each neighbour, is an array [ a, b ],
                position: which side to position the second bond, is 0 or 1, represents the index in the normal array. This is based on only the neighbours
                anCount: the number of neighbours of vertexA,
                bnCount: the number of neighbours of vertexB
            }
         */

    }, {
        key: 'chooseSide',
        value: function chooseSide(vertexA, vertexB, sides) {
            // Check which side has more vertices
            // Get all the vertices connected to the both ends
            var an = vertexA.getNeighbours(vertexB.id);
            var bn = vertexB.getNeighbours(vertexA.id);
            var anCount = an.length;
            var bnCount = bn.length;

            // All vertices connected to the edge vertexA to vertexB
            var tn = ArrayHelper.merge(an, bn);

            // Only considering the connected vertices
            var sideCount = [0, 0];

            for (var i = 0; i < tn.length; i++) {
                var v = this.vertices[tn[i]].position;

                if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
                    sideCount[0]++;
                } else {
                    sideCount[1]++;
                }
            }

            // Considering all vertices in the graph, this is to resolve ties
            // from the above side counts
            var totalSideCount = [0, 0];

            for (var _i23 = 0; _i23 < this.vertices.length; _i23++) {
                var _v = this.vertices[_i23].position;

                if (_v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
                    totalSideCount[0]++;
                } else {
                    totalSideCount[1]++;
                }
            }

            return {
                totalSideCount: totalSideCount,
                totalPosition: totalSideCount[0] > totalSideCount[1] ? 0 : 1,
                sideCount: sideCount,
                position: sideCount[0] > sideCount[1] ? 0 : 1,
                anCount: anCount,
                bnCount: bnCount
            };
        }

        /**
         * Checks whether or not two vertices are connected.
         *
         * @param {number} vertexIdA A vertex id.
         * @param {number} vertexIdA A vertex id.
         * @returns {boolean} A boolean indicating whether or not two vertices are connected.
         */

    }, {
        key: 'areConnected',
        value: function areConnected(vertexIdA, vertexIdB) {
            for (var i = 0; i < this.edges.length; i++) {
                var edge = this.edges[i];

                if (edge.sourceId === vertexIdA && edge.targetId === vertexIdB || edge.sourceId === vertexIdB && edge.targetId === vertexIdA) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Returns the weight of the edge between two given vertices.
         *
         * @param {number} vertexIdA A vertex id.
         * @param {number} vertexIdB A vertex id.
         * @returns {number|null} The weight of the edge or, if no edge can be found, null.
         */

    }, {
        key: 'getEdgeWeight',
        value: function getEdgeWeight(vertexIdA, vertexIdB) {
            for (var i = 0; i < this.edges.length; i++) {
                var edge = this.edges[i];

                if (edge.sourceId == vertexIdA && edge.targetId == vertexIdB || edge.targetId == vertexIdA && edge.sourceId == vertexIdB) {
                    return edge.weight;
                }
            }

            return null;
        }

        /**
         * Returns the edge between two given vertices.
         *
         * @param {number} vertexIdA A vertex id.
         * @param {number} vertexIdB A vertex id.
         * @returns {number|null} The edge or, if no edge can be found, null.
         */

    }, {
        key: 'getEdge',
        value: function getEdge(vertexIdA, vertexIdB) {
            for (var i = 0; i < this.edges.length; i++) {
                var edge = this.edges[i];

                if (edge.sourceId == vertexIdA && edge.targetId == vertexIdB || edge.targetId == vertexIdA && edge.sourceId == vertexIdB) {
                    return edge;
                }
            }

            return null;
        }

        /**
         * Applies a force-based layout to a set of provided vertices.
         *
         * @param {array} vertices An array containing vertices to be placed using the force based layout.
         * @param {Vector2} center The center of the layout.
         * @param {number} startVertexId A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex.
         * @param {Ring} ring The bridged ring associated with this force-based layout.
         */

    }, {
        key: 'forceLayout',
        value: function forceLayout(vertices, center, startVertexId, ring) {
            // Constants
            var l = this.opts.bondLength;

            // On bridged bonds, add the remaining neighbours to the vertices
            // to be positioned using the force layout
            var tmp = [];

            for (var u = 0; u < vertices.length; u++) {
                var vertex = this.vertices[vertices[u]];

                if (!vertex.value.isBridge) {
                    continue;
                }

                var neighbours = vertex.getNeighbours();

                for (var i = 0; i < neighbours.length; i++) {
                    var neighbourId = neighbours[i];

                    if (!ArrayHelper.contains(vertices, { value: neighbourId })) {
                        tmp.push(neighbourId);
                    }
                }
            }

            vertices = ArrayHelper.merge(vertices, tmp);

            // Create adjencency matrix
            var totalLength = vertices.length + ring.rings.length;
            var vToId = new Array(vertices.length);
            var idToV = {};
            var adjMatrix = new Array(totalLength);
            var edges = new Array();

            for (var _i24 = 0; _i24 < totalLength; _i24++) {
                adjMatrix[_i24] = new Array(totalLength);

                for (var j = 0; j < totalLength; j++) {
                    adjMatrix[_i24][j] = 0;
                }
            }

            for (var _i25 = 0; _i25 < vertices.length; _i25++) {
                vToId[_i25] = this.vertices[vertices[_i25]].id;
                idToV[vToId[_i25]] = _i25;
            }

            for (var _i26 = 0; _i26 < vertices.length - 1; _i26++) {
                for (var _j6 = _i26; _j6 < vertices.length; _j6++) {
                    var edge = this.getEdge(vToId[_i26], this.vertices[vertices[_j6]].id);

                    if (edge !== null) {
                        adjMatrix[_i26][_j6] = l;
                        adjMatrix[_j6][_i26] = l;
                        edges.push([_i26, _j6]);
                    }
                }
            }

            for (var _i27 = 0; _i27 < ring.rings.length; _i27++) {
                var r = ring.rings[_i27];
                var index = vertices.length + _i27;

                for (var _j7 = 0; _j7 < r.members.length; _j7++) {
                    var id = idToV[r.members[_j7]];
                    var radius = MathHelper.polyCircumradius(l, r.getSize());

                    adjMatrix[id][index] = radius;
                    adjMatrix[index][id] = radius;
                }
            }

            for (var _i28 = 0; _i28 < edges.length; _i28++) {
                for (var _j8 = 0; _j8 < totalLength; _j8++) {
                    adjMatrix[_j8].push(0);
                }

                adjMatrix.push(new Array());

                for (var _j9 = 0; _j9 < totalLength + edges.length; _j9++) {
                    adjMatrix[totalLength + _i28].push(0);
                }
            }

            // Connect ring centers with edges 
            for (var _i29 = 0; _i29 < ring.rings.length; _i29++) {
                var ringIndex = vertices.length + _i29;
                var ringSize = ring.rings[_i29].getSize();

                for (var _j10 = 0; _j10 < edges.length; _j10++) {
                    var a = edges[_j10][0];

                    // If the vertex and the ring are connected, so must the edge be
                    if (adjMatrix[ringIndex][a] !== 0) {
                        var apothem = MathHelper.apothem(adjMatrix[ringIndex][a], ringSize);

                        adjMatrix[ringIndex][totalLength + _j10] = apothem;
                        adjMatrix[totalLength + _j10][ringIndex] = apothem;
                    }
                }
            }

            totalLength += edges.length;

            var forces = new Array(totalLength);
            var positions = new Array(totalLength);
            var positioned = new Array(totalLength);

            for (var _i30 = 0; _i30 < totalLength; _i30++) {
                forces[_i30] = new Vector2();
                positions[_i30] = new Vector2(center.x + Math.random() * l * 5, center.y + Math.random() * l * 5);
                positioned[_i30] = false;

                if (_i30 >= vertices.length) {
                    continue;
                }

                var _vertex4 = this.vertices[vToId[_i30]];

                if (_vertex4.positioned) {
                    positions[_i30].x = _vertex4.position.x;
                    positions[_i30].y = _vertex4.position.y;
                    if (ring.rings.length === 2) {
                        positioned[_i30] = true;
                    }
                }
            }

            var k = 8.0;
            var c = 0.01;
            var maxMove = 0.5;
            var maxDist = 2000.0;

            for (var n = 0; n < 1000; n++) {

                for (var _i31 = 0; _i31 < totalLength; _i31++) {
                    forces[_i31].set(0, 0);
                }

                // Set the positions of the edge midpoints
                for (var _i32 = 0; _i32 < edges.length; _i32++) {
                    var _index = totalLength - edges.length + _i32;
                    var _a = positions[edges[_i32][0]];
                    var b = positions[edges[_i32][1]];

                    positions[_index] = Vector2.midpoint(_a, b);
                }

                // Repulsive forces
                for (var _u = 0; _u < totalLength - 1; _u++) {
                    for (var v = _u + 1; v < totalLength; v++) {
                        var dx = positions[v].x - positions[_u].x;
                        var dy = positions[v].y - positions[_u].y;

                        if (dx === 0 || dy === 0) {
                            continue;
                        }

                        var dSq = dx * dx + dy * dy;

                        if (dSq < 0.01) {
                            dx = 0.1 * Math.random() + 0.1;
                            dy = 0.1 * Math.random() + 0.1;

                            dSq = dx * dx + dy * dy;
                        }

                        var d = Math.sqrt(dSq);

                        if (d > maxDist) continue;

                        var force = k * k / d;

                        if ((_u >= vertices.length && _u < totalLength - edges.length || v >= vertices.length && v < totalLength - edges.length) && adjMatrix[_u][v] > 0 && ring.rings.length > 2) {
                            force = k * k / Math.log(d);
                        }

                        var fx = force * dx / d;
                        var fy = force * dy / d;

                        if (!positioned[_u]) {
                            forces[_u].x -= fx;
                            forces[_u].y -= fy;
                        }

                        if (!positioned[v]) {
                            forces[v].x += fx;
                            forces[v].y += fy;
                        }
                    }
                }

                // Attractive forces
                for (var _u2 = 0; _u2 < totalLength - 1; _u2++) {
                    for (var _v2 = _u2 + 1; _v2 < totalLength; _v2++) {
                        if (adjMatrix[_u2][_v2] <= 0) {
                            continue;
                        }

                        var _dx = positions[_v2].x - positions[_u2].x;
                        var _dy = positions[_v2].y - positions[_u2].y;

                        if (_dx === 0 || _dy === 0) {
                            continue;
                        }

                        var _dSq = _dx * _dx + _dy * _dy;

                        if (_dSq < 0.01) {
                            _dx = 0.1 * Math.random() + 0.1;
                            _dy = 0.1 * Math.random() + 0.1;

                            _dSq = _dx * _dx + _dy * _dy;
                        }

                        var _d = Math.sqrt(_dSq);

                        if (_d > maxDist) {
                            _d = maxDist;
                            _dSq = _d * _d;
                        }

                        var _force = (_dSq - k * k) / k;

                        // force *= Math.log(1) * 0.1 + 1;


                        var dOptimal = adjMatrix[_u2][_v2];

                        if (_d < dOptimal) {
                            _force *= 0.1;
                        } else {
                            _force *= 1.5;
                        }

                        var _fx = _force * _dx / _d;
                        var _fy = _force * _dy / _d;

                        if (!positioned[_u2]) {
                            forces[_u2].x += _fx;
                            forces[_u2].y += _fy;
                        }

                        if (!positioned[_v2]) {
                            forces[_v2].x -= _fx;
                            forces[_v2].y -= _fy;
                        }
                    }
                }

                // Add the edge forces to the vertices
                for (var _i33 = 0; _i33 < edges.length; _i33++) {
                    var _index2 = vertices.length + ring.rings.length + _i33;
                    var _force2 = forces[_index2];

                    var _a2 = edges[_i33][0];
                    var _b = edges[_i33][1];

                    forces[_a2].x += _force2.x;
                    forces[_a2].y += _force2.y;

                    forces[_b].x += _force2.x;
                    forces[_b].y += _force2.y;
                }

                // Move the vertex
                for (var _u3 = 0; _u3 < totalLength; _u3++) {
                    if (positioned[_u3]) {
                        continue;
                    }

                    var _dx2 = c * forces[_u3].x;
                    var _dy2 = c * forces[_u3].y;

                    if (_dx2 > maxMove) _dx2 = maxMove;
                    if (_dx2 < -maxMove) _dx2 = -maxMove;
                    if (_dy2 > maxMove) _dy2 = maxMove;
                    if (_dy2 < -maxMove) _dy2 = -maxMove;

                    var _dSq2 = _dx2 * _dx2 + _dy2 * _dy2;

                    positions[_u3].x += _dx2;
                    positions[_u3].y += _dy2;
                }

                // Set the positions of the edge midpoints
            }

            for (var _i34 = 0; _i34 < totalLength; _i34++) {
                if (_i34 < vertices.length) {
                    if (!positioned[_i34]) {
                        this.vertices[vToId[_i34]].position = positions[_i34];
                        this.vertices[vToId[_i34]].positioned = true;
                    }
                } else if (_i34 < vertices.length + ring.rings.length) {
                    var _index3 = _i34 - vertices.length;
                    ring.rings[_index3].center = positions[_i34];
                }
            }

            /*
            for (let i = 0; i < totalLength; i++) {
                if (i < vertices.length) {
                    this.canvasWrapper.drawDebugText(positions[i].x, positions[i].y, 'v');
                } else if (i < vertices.length + ring.rings.length) { 
                    this.canvasWrapper.drawDebugText(positions[i].x, positions[i].y, 'c');
                } else {
                    this.canvasWrapper.drawDebugText(positions[i].x, positions[i].y, 'm');
                }
            }
            */

            for (var _u4 = 0; _u4 < vertices.length; _u4++) {
                var _vertex5 = this.vertices[vertices[_u4]];
                var parentVertex = this.vertices[_vertex5.parentVertexId];
                var _neighbours = _vertex5.getNeighbours();

                var angle = _vertex5.getAngle(null, true) - 60;
                for (var _i35 = 0; _i35 < _neighbours.length; _i35++) {
                    if (_vertex5.value.isBridge || parentVertex !== undefined && parentVertex.value.isBridge) {
                        this.createNextBond(this.vertices[_neighbours[_i35]], _vertex5, MathHelper.toRad(angle));
                    } else if (this.vertices[_neighbours[_i35]].value.rings.length === 0) {
                        // If there is a spiro, this will be handeled in create ring
                        // This here positiones the vertices going away from the outer ring
                        if (ring.rings.length > 2) {
                            center = this.getSubringCenter(ring, _vertex5);
                        }

                        this.createNextBond(this.vertices[_neighbours[_i35]], _vertex5, center);
                    }

                    angle += 120;
                }
            }
        }

        /**
         * Gets the center of a ring contained within a bridged ring and containing a given vertex.
         *
         * @param {Ring} ring A bridged ring.
         * @param {Vertex} vertex A vertex.
         * @returns {Vector2} The center of the subring that contains the provided vertex.
         */

    }, {
        key: 'getSubringCenter',
        value: function getSubringCenter(ring, vertex) {
            for (var i = 0; i < ring.rings.length; i++) {
                var subring = ring.rings[i];
                for (var j = 0; j < subring.members.length; j++) {
                    if (subring.members[j] === vertex.id) {
                        return subring.center;
                    }
                }
            }

            return ring.center;
        }

        /**
         * Draw the actual edges as bonds to the canvas.
         *
         * @param {boolean} debug A boolean indicating whether or not to draw debug helpers.
         */

    }, {
        key: 'drawEdges',
        value: function drawEdges(debug) {
            var _this = this;

            var that = this;

            var _loop = function _loop(i) {
                var edge = _this.edges[i];
                var vertexA = _this.vertices[edge.sourceId];
                var vertexB = _this.vertices[edge.targetId];
                var elementA = vertexA.value.element;
                var elementB = vertexB.value.element;
                var a = vertexA.position;
                var b = vertexB.position;
                var normals = _this.getEdgeNormals(edge);
                var gradient = 'gradient' + vertexA.value.element.toUpperCase() + vertexB.value.element.toUpperCase();

                // Create a point on each side of the line
                var sides = ArrayHelper.clone(normals);

                ArrayHelper.each(sides, function (v) {
                    v.multiply(10);
                    v.add(a);
                });

                if (edge.bondType === '=' || _this.getRingbondType(vertexA, vertexB) === '=') {
                    // Always draw double bonds inside the ring
                    var inRing = _this.areVerticesInSameRing(vertexA, vertexB);
                    var s = _this.chooseSide(vertexA, vertexB, sides);

                    if (inRing) {
                        // Always draw double bonds inside a ring
                        // if the bond is shared by two rings, it is drawn in the larger
                        // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
                        var lcr = _this.getLargestCommonRing(vertexA, vertexB);
                        var center = lcr.center;

                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        // Choose the normal that is on the same side as the center
                        var line = null;

                        if (center.sameSideAs(vertexA.position, vertexB.position, Vector2.add(a, normals[0]))) {
                            line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                        } else {
                            line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
                        }

                        line.shorten(_this.opts.bondLength - _this.opts.shortBondLength);

                        // The shortened edge
                        _this.canvasWrapper.drawLine(line);

                        // The normal edge
                        _this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                    } else if (edge.center) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing / 2.0);
                        });

                        var lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                        var lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

                        lineA.shorten(_this.opts.bondLength - _this.opts.shortBondLength);
                        lineB.shorten(_this.opts.bondLength - _this.opts.shortBondLength);

                        _this.canvasWrapper.drawLine(lineA);
                        _this.canvasWrapper.drawLine(lineB);
                    } else if (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
                        // Both lines are the same length here
                        // Add the spacing to the edges (which are of unit length)
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing / 2);
                        });

                        var _lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                        var _lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

                        _this.canvasWrapper.drawLine(_lineA);
                        _this.canvasWrapper.drawLine(_lineB);
                    } else if (s.sideCount[0] > s.sideCount[1]) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        var _line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);

                        _line.shorten(_this.opts.bondLength - _this.opts.shortBondLength);
                        _this.canvasWrapper.drawLine(_line);
                        _this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                    } else if (s.sideCount[0] < s.sideCount[1]) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        var _line2 = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

                        _line2.shorten(_this.opts.bondLength - _this.opts.shortBondLength);
                        _this.canvasWrapper.drawLine(_line2);
                        _this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                    } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        var _line3 = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);

                        _line3.shorten(_this.opts.bondLength - _this.opts.shortBondLength);
                        _this.canvasWrapper.drawLine(_line3);
                        _this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                    } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        var _line4 = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

                        _line4.shorten(_this.opts.bondLength - _this.opts.shortBondLength);
                        _this.canvasWrapper.drawLine(_line4);
                        _this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                    } else {}
                } else if (edge.bondType === '#') {
                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing / 1.5);
                    });

                    var _lineA2 = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
                    var _lineB2 = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

                    _lineA2.shorten(_this.opts.bondLength - _this.opts.shortBondLength);
                    _lineB2.shorten(_this.opts.bondLength - _this.opts.shortBondLength);

                    _this.canvasWrapper.drawLine(_lineA2);
                    _this.canvasWrapper.drawLine(_lineB2);

                    _this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                } else {
                    _this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
                }

                if (debug) {
                    var midpoint = Vector2.midpoint(a, b);
                    _this.canvasWrapper.drawDebugText(midpoint.x, midpoint.y, 'e: ' + i);
                }
            };

            for (var i = 0; i < this.edges.length; i++) {
                _loop(i);
            }

            // Draw ring for benzenes
            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];

                if (ring.isAromatic(this.vertices)) {
                    this.canvasWrapper.drawAromaticityRing(ring);
                }
            }
        }

        /**
         * Draws the vertices representing atoms to the canvas.
         *
         * @param {boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
         */

    }, {
        key: 'drawVertices',
        value: function drawVertices(debug) {
            for (var i = 0; i < this.vertices.length; i++) {
                var vertex = this.vertices[i];
                var atom = vertex.value;
                var charge = 0;
                var bondCount = this.getBondCount(vertex);
                var element = atom.element.length == 1 ? atom.element.toUpperCase() : atom.element;
                var hydrogens = this.maxBonds[element] - bondCount;
                var dir = vertex.getTextDirection(this.vertices);
                var isTerminal = vertex.isTerminal();
                var isCarbon = atom.element.toLowerCase() === 'c';

                if (atom.bracket) {
                    hydrogens = atom.bracket.hcount;
                    charge = atom.bracket.charge;
                }

                if (!isCarbon || atom.explicit || isTerminal) {
                    this.canvasWrapper.drawText(vertex.position.x, vertex.position.y, element, hydrogens, dir, isTerminal, charge);
                }

                if (debug) {
                    var value = 'v: ' + vertex.id + ' ' + ArrayHelper.print(atom.ringbonds);
                    this.canvasWrapper.drawDebugText(vertex.position.x, vertex.position.y, value);
                }
            }

            // Draw the ring centers for debug purposes
            if (this.opts.debug) {
                for (var _i36 = 0; _i36 < this.rings.length; _i36++) {
                    var center = this.rings[_i36].center;
                    this.canvasWrapper.drawDebugPoint(center.x, center.y, 'r: ' + this.rings[_i36].id);
                }
            }
        }

        /**
         * Position the vertices according to their bonds and properties.
         *
         */

    }, {
        key: 'position',
        value: function position() {
            var startVertex = 0;

            // If there is a bridged ring, alwas start with the bridged ring
            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].isBridged) {
                    startVertex = this.rings[i].members[i];
                }
            }

            this.createNextBond(this.vertices[startVertex]);

            // Atoms bonded to the same ring atom
            this.resolvePrimaryOverlaps();
        }

        /**
         * Reset the positions of rings and vertices. The previous positions will be backed up.
         *
         */

    }, {
        key: 'clearPositions',
        value: function clearPositions() {
            this.backupVertices = [];
            this.backupRings = [];

            for (var i = 0; i < this.vertices.length; i++) {
                var vertex = this.vertices[i];
                this.backupVertices.push(vertex.clone());
                vertex.positioned = false;
                vertex.position = new Vector2();
            }

            for (var _i37 = 0; _i37 < this.rings.length; _i37++) {
                var ring = this.rings[_i37];
                this.backupRings.push(ring.clone());
                ring.positioned = false;
                ring.center = new Vector2();
            }
        }

        /**
         * Restore the positions backed up during the last clearPositions() call.
         *
         */

    }, {
        key: 'restorePositions',
        value: function restorePositions() {
            for (var i = 0; i < this.backupVertices.length; i++) {
                this.vertices[i] = this.backupVertices[i];
            }

            for (var _i38 = 0; _i38 < this.backupRings.length; _i38++) {
                this.rings[_i38] = this.backupRings[_i38];
            }
        }

        // TODO: This needs some cleaning up

        /**
         * Creates a new ring, that is, positiones all the vertices inside a ring.
         *
         * @param {Ring} ring The ring to position.
         * @param {Vector2} center The center of the ring to be created.
         * @param {Vector|null} [startVector=null] The first vector to be positioned inside the ring.
         * @param {Vertex|null} [previousVertex=null] The last vertex that was positioned.
         */

    }, {
        key: 'createRing',
        value: function createRing(ring, center) {
            var _this2 = this;

            var startVector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var previousVertex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            if (ring.positioned) {
                return;
            }

            center = center ? center : new Vector2(0, 0);

            var orderedNeighbours = ring.getOrderedNeighbours(this.ringConnections);
            var startingAngle = startVector ? Vector2.subtract(startVector.position, center).angle() : 0;

            var radius = MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());
            ring.radius = radius;

            var angle = MathHelper.centralAngle(ring.getSize());
            ring.centralAngle = angle;

            var a = startingAngle;

            var that = this;
            ring.eachMember(this.vertices, function (v) {
                var vertex = that.vertices[v];

                if (!vertex.positioned) {
                    vertex.position.x = center.x + Math.cos(a) * radius;
                    vertex.position.y = center.y + Math.sin(a) * radius;
                }

                a += angle;

                if (!ring.isBridged || ring.rings.length < 3) {
                    vertex.positioned = true;
                }
            }, startVector ? startVector.id : null, previousVertex ? previousVertex.id : null);

            // If the ring is bridged, then draw the vertices inside the ring
            // using a force based approach
            if (ring.isBridged) {
                var allVertices = ArrayHelper.merge(ring.members, ring.insiders);
                this.forceLayout(allVertices, center, startVector.id, ring);
            }

            // Anchor the ring to one of it's members, so that the ring center will always
            // be tied to a single vertex when doing repositionings
            this.vertices[ring.members[0]].value.addAnchoredRing(ring.id);

            ring.positioned = true;
            ring.center = center;
            // Draw neighbours in decreasing order of connectivity
            for (var i = 0; i < orderedNeighbours.length; i++) {
                var neighbour = this.getRing(orderedNeighbours[i].neighbour);

                if (neighbour.positioned) {
                    continue;
                }

                var vertices = RingConnection.getVertices(this.ringConnections, ring.id, neighbour.id);

                if (vertices.length == 2) {
                    (function () {
                        // This ring is a fused ring
                        ring.isFused = true;
                        neighbour.isFused = true;

                        var vertexA = _this2.vertices[vertices[0]];
                        var vertexB = _this2.vertices[vertices[1]];

                        // Get middle between vertex A and B
                        var midpoint = Vector2.midpoint(vertexA.position, vertexB.position);

                        // Get the normals to the line between A and B
                        var normals = Vector2.normals(vertexA.position, vertexB.position);

                        // Normalize the normals
                        ArrayHelper.each(normals, function (v) {
                            v.normalize();
                        });

                        // Set length from middle of side to center (the apothem)
                        var r = MathHelper.polyCircumradius(_this2.opts.bondLength, neighbour.getSize());
                        var apothem = MathHelper.apothem(r, neighbour.getSize());

                        ArrayHelper.each(normals, function (v) {
                            v.multiply(apothem);
                        });

                        // Move normals to the middle of the line between a and b
                        ArrayHelper.each(normals, function (v) {
                            v.add(midpoint);
                        });

                        // Check if the center of the next ring lies within another ring and
                        // select the normal accordingly
                        var nextCenter = normals[0];

                        if (_this2.isPointInRing(nextCenter)) {
                            nextCenter = normals[1];
                        }

                        // Get the vertex (A or B) which is in clock-wise direction of the other
                        var posA = Vector2.subtract(vertexA.position, nextCenter);
                        var posB = Vector2.subtract(vertexB.position, nextCenter);

                        if (posA.clockwise(posB) === -1) {
                            _this2.createRing(neighbour, nextCenter, vertexA, vertexB);
                        } else {
                            _this2.createRing(neighbour, nextCenter, vertexB, vertexA);
                        }
                    })();
                } else if (vertices.length == 1) {
                    // This ring is a spiro
                    ring.isSpiro = true;
                    neighbour.isSpiro = true;

                    var _vertexA = this.vertices[vertices[0]];

                    // Get the vector pointing from the shared vertex to the new center
                    var nextCenter = Vector2.subtract(center, _vertexA.position);
                    nextCenter.invert();
                    nextCenter.normalize();

                    // Get the distance from the vertex to the center
                    var r = MathHelper.polyCircumradius(this.opts.bondLength, neighbour.getSize());
                    nextCenter.multiply(r);
                    nextCenter.add(_vertexA.position);
                    this.createRing(neighbour, nextCenter, _vertexA);
                }
            }

            // Next, draw atoms that are not part of a ring that are directly attached to this ring
            for (var _i39 = 0; _i39 < ring.members.length; _i39++) {
                var ringMember = this.vertices[ring.members[_i39]];
                var ringMemberNeighbours = ringMember.getNeighbours();

                // If there are multiple, the ovlerap will be resolved in the appropriate step
                for (var j = 0; j < ringMemberNeighbours.length; j++) {
                    if (ring.thisOrNeighboursContain(this.rings, ringMemberNeighbours[j])) {
                        continue;
                    }

                    var v = this.vertices[ringMemberNeighbours[j]];
                    this.createNextBond(v, ringMember, ring.center);
                }
            }
        }

        /**
         * Rotate an entire subtree by an angle around a center.
         *
         * @param {number} vertexId A vertex id (the root of the sub-tree).
         * @param {number} parentVertexId A vertex id in the previous direction of the subtree that is to rotate.
         * @param {number} angle An angle in randians.
         * @param {Vector2} center The rotational center.
         */

    }, {
        key: 'rotateSubtree',
        value: function rotateSubtree(vertexId, parentVertexId, angle, center) {
            var that = this;

            this.traverseTree(vertexId, parentVertexId, function (vertex) {
                vertex.position.rotateAround(angle, center);

                for (var i = 0; i < vertex.value.anchoredRings.length; i++) {
                    that.rings[vertex.value.anchoredRings[i]].center.rotateAround(angle, center);
                }
            });
        }

        /**
         * Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.
         *
         */

    }, {
        key: 'resolvePrimaryOverlaps',
        value: function resolvePrimaryOverlaps() {
            var overlaps = [];
            var sharedSideChains = []; // side chains attached to an atom shared by two rings
            var done = new Array(this.vertices.length);

            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];

                for (var j = 0; j < ring.members.length; j++) {
                    var vertex = this.vertices[ring.members[j]];

                    if (done[vertex.id]) {
                        continue;
                    }

                    done[vertex.id] = true;

                    // Look for rings where there are atoms with two bonds outside the ring (overlaps)
                    if (vertex.getNeighbours().length > 2) {
                        var rings = [];

                        for (var k = 0; k < vertex.value.rings.length; k++) {
                            rings.push(vertex.value.rings[k]);
                        }

                        overlaps.push({
                            common: vertex,
                            rings: rings,
                            vertices: this.getNonRingNeighbours(vertex.id)
                        });
                    }

                    // Side chains attached to an atom shared by two rings
                    if (vertex.value.rings.length == 2 && vertex.getNeighbours().length == 4) {
                        var nrn = this.getNonRingNeighbours(vertex.id)[0];

                        if (nrn && nrn.getNeighbours().length > 1) {
                            var other = this.getCommonRingbondNeighbour(vertex);
                            sharedSideChains.push({
                                common: vertex,
                                other: other,
                                vertex: nrn
                            });
                        }
                    }
                }
            }

            for (var _i40 = 0; _i40 < sharedSideChains.length; _i40++) {
                var chain = sharedSideChains[_i40];
                var angle = -chain.vertex.position.getRotateToAngle(chain.other.position, chain.common.position);
                this.rotateSubtree(chain.vertex.id, chain.common.id, angle + Math.PI, chain.common.position);
            }

            for (var _i41 = 0; _i41 < overlaps.length; _i41++) {
                var overlap = overlaps[_i41];

                if (overlap.vertices.length == 1) {
                    var _a3 = overlap.vertices[0];

                    if (_a3.getNeighbours().length == 1) {
                        _a3.flippable = true;
                        _a3.flipCenter = overlap.common.id;

                        for (var _j11 = 0; _j11 < overlap.rings.length; _j11++) {
                            _a3.flipRings.push(overlap.rings[_j11]);
                        }
                    }
                } else if (overlap.vertices.length == 2) {
                    var _angle = (2 * Math.PI - this.getRing(overlap.rings[0]).getAngle()) / 6.0;
                    var _a4 = overlap.vertices[0];
                    var _b2 = overlap.vertices[1];

                    _a4.backAngle -= _angle;
                    _b2.backAngle += _angle;

                    this.rotateSubtree(_a4.id, overlap.common.id, _angle, overlap.common.position);
                    this.rotateSubtree(_b2.id, overlap.common.id, -_angle, overlap.common.position);

                    if (_a4.getNeighbours().length == 1) {
                        _a4.flippable = true;
                        _a4.flipCenter = overlap.common.id;
                        _a4.flipNeighbour = _b2.id;

                        for (var _j12 = 0; _j12 < overlap.rings.length; _j12++) {
                            _a4.flipRings.push(overlap.rings[_j12]);
                        }
                    }
                    if (_b2.getNeighbours().length == 1) {
                        _b2.flippable = true;
                        _b2.flipCenter = overlap.common.id;
                        _b2.flipNeighbour = _a4.id;

                        for (var _j13 = 0; _j13 < overlap.rings.length; _j13++) {
                            _b2.flipRings.push(overlap.rings[_j13]);
                        }
                    }
                }
            }
        }

        /**
         * Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.
         *
         * @param {array} scores An array of objects sorted descending by score. An object is in the form of { id: 0, score: 22 }.
         */

    }, {
        key: 'resolveSecondaryOverlaps',
        value: function resolveSecondaryOverlaps(scores) {
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].score > this.opts.bondLength / 5) {
                    var vertex = this.vertices[scores[i].id];

                    if (vertex.flippable) {
                        // Rings that get concatenated in to a bridge one, will be undefined here ...
                        var _a5 = vertex.flipRings[0] ? this.rings[vertex.flipRings[0]] : null;
                        var _b3 = vertex.flipRings[1] ? this.rings[vertex.flipRings[1]] : null;
                        var flipCenter = this.vertices[vertex.flipCenter].position;

                        // Make a always the bigger ring than b
                        if (_a5 && _b3) {
                            var tmp = _a5.members.length > _b3.members.length ? _a5 : _b3;
                            _b3 = _a5.members.length < _b3.members.length ? _a5 : _b3;
                            _a5 = tmp;
                        }

                        if (_a5 && _a5.allowsFlip()) {
                            vertex.position.rotateTo(_a5.center, flipCenter);
                            _a5.setFlipped();

                            if (vertex.flipNeighbour !== null) {
                                // It's better to not straighten the other one, since it will possibly overlap
                                // var flipNeighbour = this.vertices[vertex.flipNeighbour];
                                // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                            }
                        } else if (_b3 && _b3.allowsFlip()) {
                            vertex.position.rotateTo(_b3.center, flipCenter);
                            _b3.setFlipped();

                            if (vertex.flipNeighbour !== null) {
                                // It's better to not straighten the other one, since it will possibly overlap
                                // var flipNeighbour = this.vertices[vertex.flipNeighbour];
                                // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                            }
                        }

                        // Only do a refresh of the remaining!
                        // recalculate scores (how expensive?)
                        // scores = this.getOverlapScore().scores;
                    }
                }
            }
        }

        /**
         * Positiones the next vertex thus creating a bond.
         *
         * @param {Vertex} vertex A vertex.
         * @param {Vertex} previousVertex The previous vertex which has been positioned.
         * @param {ring|number} ringOrAngle Either a ring or a number. If the vertex is connected to a ring, it is positioned based on the ring center and thus the ring is supplied. If the vertex is not in a ring, an angle (in radians) is supplied.
         * @param {number} dir Either 1 or -1 to break ties (if no angle can be elucidated.
         */

    }, {
        key: 'createNextBond',
        value: function createNextBond(vertex, previousVertex, ringOrAngle, dir) {
            if (vertex.positioned) {
                return;
            }

            // If the current node is the member of one ring, then point straight away
            // from the center of the ring. However, if the current node is a member of
            // two rings, point away from the middle of the centers of the two rings
            if (!previousVertex) {
                // Here, ringOrAngle is always an angle

                // Add a (dummy) previous position if there is no previous vertex defined
                // Since the first vertex is at (0, 0), create a vector at (bondLength, 0)
                // and rotate it by 90°
                var dummy = new Vector2(this.opts.bondLength, 0);
                dummy.rotate(MathHelper.toRad(-120));

                vertex.previousPosition = dummy;
                vertex.position = new Vector2(this.opts.bondLength, 0);
                vertex.angle = MathHelper.toRad(-120);
                vertex.positioned = true;
            } else if (previousVertex.value.rings.length == 0 && !vertex.value.isBridge) {
                // Here, ringOrAngle is always an angle

                // If the previous vertex was not part of a ring, draw a bond based
                // on the global angle of the previous bond
                var v = new Vector2(this.opts.bondLength, 0);
                v.rotate(ringOrAngle);
                v.add(previousVertex.position);

                vertex.position = v;
                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            } else if (previousVertex.value.isBridgeNode && vertex.value.isBridge) {
                // If the previous atom is in a bridged ring and this one is inside the ring
                var pos = Vector2.subtract(ringOrAngle, previousVertex.position);
                pos.normalize();

                // Unlike with the ring, do not multiply with radius but with bond length
                pos.multiply(this.opts.bondLength);
                vertex.position.add(previousVertex.position);
                vertex.position.add(pos);

                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            } else if (vertex.value.isBridge) {
                // The previous atom is in a bridged ring and this one is in it as well
                var _v3 = new Vector2(this.opts.bondLength, 0);
                _v3.rotate(ringOrAngle);
                _v3.add(previousVertex.position);

                vertex.position = _v3;
                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            } else if (previousVertex.value.rings.length == 1) {
                // Here, ringOrAngle is always a ring (THIS IS CURRENTLY NOT TRUE - WHY?)
                // Use the same approach es with rings that are connected at one vertex
                // and draw the atom in the opposite direction of the center.
                var _pos = Vector2.subtract(ringOrAngle, previousVertex.position);

                _pos.invert();
                _pos.normalize();
                // Unlike with the ring, do not multiply with radius but with bond length
                _pos.multiply(this.opts.bondLength);

                vertex.position.add(previousVertex.position);
                vertex.position.add(_pos);
                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            } else if (previousVertex.value.rings.length == 2) {
                // Here, ringOrAngle is always a ring
                var ringA = this.getRing(previousVertex.value.rings[0]);
                var ringB = this.getRing(previousVertex.value.rings[1]);

                // Project the current vertex onto the vector between the two centers to
                // get the direction
                var _a6 = Vector2.subtract(ringB.center, ringA.center);
                var _b4 = Vector2.subtract(previousVertex.position, ringA.center);
                var s = Vector2.scalarProjection(_b4, _a6);

                _a6.normalize();
                _a6.multiply(s);
                _a6.add(ringA.center);

                var _pos2 = Vector2.subtract(_a6, previousVertex.position);
                _pos2.invert();
                _pos2.normalize();
                _pos2.multiply(this.opts.bondLength);

                vertex.position.add(previousVertex.position);
                vertex.position.add(_pos2);
                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            }

            // Go to next vertex
            // If two rings are connected by a bond ...
            if (vertex.value.rings.length > 0) {
                var nextRing = this.getRing(vertex.value.rings[0]);
                var nextCenter = Vector2.subtract(vertex.previousPosition, vertex.position);
                nextCenter.invert();
                nextCenter.normalize();

                var r = MathHelper.polyCircumradius(this.opts.bondLength, nextRing.getSize());
                nextCenter.multiply(r);
                nextCenter.add(vertex.position);
                this.createRing(nextRing, nextCenter, vertex);
            } else {
                // Draw the non-ring vertices connected to this one        
                var neighbours = vertex.getNeighbours();

                if (previousVertex) {
                    neighbours = ArrayHelper.remove(neighbours, previousVertex.id);
                }

                var angle = vertex.getAngle();

                if (neighbours.length == 1) {
                    var nextVertex = this.vertices[neighbours[0]];

                    // Make a single chain always cis except when there's a tribble bond
                    if (vertex.value.bondType === '#' || previousVertex && previousVertex.value.bondType === '#' || vertex.value.bondType === '=' && previousVertex && previousVertex.value.bondType === '=') {
                        vertex.value.explicit = true;

                        var straightEdge1 = this.getEdge(vertex.id, previousVertex.id);
                        var straightEdge2 = this.getEdge(vertex.id, nextVertex.id);

                        straightEdge1.center = true;
                        straightEdge2.center = true;

                        nextVertex.angle = angle;
                        this.createNextBond(nextVertex, vertex, nextVertex.angle, -dir);
                    } else {
                        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

                        if (this.direction !== 0) {
                            plusOrMinus = this.direction;
                        }

                        if (!dir) {
                            dir = plusOrMinus;
                        }

                        nextVertex.angle = MathHelper.toRad(60) * dir;
                        this.createNextBond(nextVertex, vertex, angle + nextVertex.angle, -dir);
                    }
                } else if (neighbours.length == 2) {
                    // Check for the longer subtree - always go with cis for the longer subtree
                    var subTreeDepthA = this.getTreeDepth(neighbours[0], vertex.id);
                    var subTreeDepthB = this.getTreeDepth(neighbours[1], vertex.id);

                    var cis = 0;
                    var trans = 1;

                    if (subTreeDepthA > subTreeDepthB) {
                        cis = 1;
                        trans = 0;
                    }

                    if (vertex.position.clockwise(vertex.previousPosition) === 1) {
                        var cisVertex = this.vertices[neighbours[cis]];
                        var transVertex = this.vertices[neighbours[trans]];

                        transVertex.angle = MathHelper.toRad(60);
                        cisVertex.angle = -MathHelper.toRad(60);

                        this.createNextBond(transVertex, vertex, angle + transVertex.angle);
                        this.createNextBond(cisVertex, vertex, angle + cisVertex.angle);
                    } else {
                        var _cisVertex = this.vertices[neighbours[cis]];
                        var _transVertex = this.vertices[neighbours[trans]];

                        _transVertex.angle = -MathHelper.toRad(60);
                        _cisVertex.angle = MathHelper.toRad(60);

                        this.createNextBond(_cisVertex, vertex, angle + _cisVertex.angle);
                        this.createNextBond(_transVertex, vertex, angle + _transVertex.angle);
                    }
                } else if (neighbours.length == 3) {
                    // The vertex with the longest sub-tree should always go straight
                    var d1 = this.getTreeDepth(neighbours[0], vertex.id);
                    var d2 = this.getTreeDepth(neighbours[1], vertex.id);
                    var d3 = this.getTreeDepth(neighbours[2], vertex.id);

                    var _s = this.vertices[neighbours[0]];
                    var l = this.vertices[neighbours[1]];
                    var _r = this.vertices[neighbours[2]];

                    if (d2 > d1 && d2 > d3) {
                        _s = this.vertices[neighbours[1]];
                        l = this.vertices[neighbours[0]];
                        _r = this.vertices[neighbours[2]];
                    } else if (d3 > d1 && d3 > d2) {
                        _s = this.vertices[neighbours[2]];
                        l = this.vertices[neighbours[0]];
                        _r = this.vertices[neighbours[1]];
                    }

                    this.createNextBond(_s, vertex, angle);
                    this.createNextBond(l, vertex, angle + MathHelper.toRad(90));
                    this.createNextBond(_r, vertex, angle - MathHelper.toRad(90));
                } else if (neighbours.length == 4) {
                    // The vertex with the longest sub-tree should always go to the reflected opposide direction
                    var _d2 = this.getTreeDepth(neighbours[0], vertex.id);
                    var _d3 = this.getTreeDepth(neighbours[1], vertex.id);
                    var _d4 = this.getTreeDepth(neighbours[2], vertex.id);
                    var d4 = this.getTreeDepth(neighbours[3], vertex.id);

                    var w = this.vertices[neighbours[0]];
                    var x = this.vertices[neighbours[1]];
                    var y = this.vertices[neighbours[2]];
                    var z = this.vertices[neighbours[3]];

                    if (_d3 > _d2 && _d3 > _d4 && _d3 > d4) {
                        w = this.vertices[neighbours[1]];
                        x = this.vertices[neighbours[0]];
                        y = this.vertices[neighbours[2]];
                        z = this.vertices[neighbours[3]];
                    } else if (_d4 > _d2 && _d4 > _d3 && _d4 > d4) {
                        w = this.vertices[neighbours[2]];
                        x = this.vertices[neighbours[0]];
                        y = this.vertices[neighbours[1]];
                        z = this.vertices[neighbours[3]];
                    } else if (d4 > _d2 && d4 > _d3 && d4 > _d4) {
                        w = this.vertices[neighbours[3]];
                        x = this.vertices[neighbours[0]];
                        y = this.vertices[neighbours[1]];
                        z = this.vertices[neighbours[2]];
                    }

                    this.createNextBond(w, vertex, angle - MathHelper.toRad(36));
                    this.createNextBond(x, vertex, angle + MathHelper.toRad(36));
                    this.createNextBond(y, vertex, angle - MathHelper.toRad(108));
                    this.createNextBond(z, vertex, angle + MathHelper.toRad(108));
                }
            }
        }

        /**
         * Gets the vetex sharing the edge that is the common bond of two rings.
         *
         * @param {Vertex} vertex A vertex.
         * @returns {number|null} The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.
         */

    }, {
        key: 'getCommonRingbondNeighbour',
        value: function getCommonRingbondNeighbour(vertex) {
            var neighbours = vertex.getNeighbours();

            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = this.vertices[neighbours[i]];

                if (ArrayHelper.containsAll(neighbour.value.rings, vertex.value.rings)) {
                    return neighbour;
                }
            }

            return null;
        }

        /**
         * Check if a vector is inside any ring.
         *
         * @param {Vector2} vec A vector.
         * @returns {boolean} A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.
         */

    }, {
        key: 'isPointInRing',
        value: function isPointInRing(vec) {
            for (var i = 0; i < this.rings.length; i++) {
                var polygon = this.rings[i].getPolygon(this.vertices);

                if (vec.isInPolygon(polygon)) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Check whether or not an edge is part of a ring.
         *
         * @param {Edge} edge An edge.
         * @returns {boolean} A boolean indicating whether or not the edge is part of a ring.
         */

    }, {
        key: 'isEdgeInRing',
        value: function isEdgeInRing(edge) {
            var source = this.vertices[edge.sourceId];
            var target = this.vertices[edge.targetId];

            return this.areVerticesInSameRing(source, target);
        }

        /**
         * Check whether or not a ring is an explicity defined aromatic ring (lower case smiles).
         *
         * @param {Ring} ring A ring.
         * @returns {boolean} A boolean indicating whether or not a ring is explicitly defined as aromatic.
         */

    }, {
        key: 'isRingAromatic',
        value: function isRingAromatic(ring) {
            for (var i = 0; i < ring.members.length; i++) {
                if (!this.isVertexInAromaticRing(ring.members[i])) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Checks whether or not an edge is part of an explicit aromatic ring (lower case smiles).
         *
         * @param {Edge} edge An edge.
         * @returns {boolean} A boolean indicating whether or not the vertex is part of an explicit aromatic ring.
         */

    }, {
        key: 'isEdgeInAromaticRing',
        value: function isEdgeInAromaticRing(edge) {
            return this.isVertexInAromaticRing(edge.sourceId) && this.isVertexInAromaticRing(edge.targetId);
        }

        /**
         * Checks whether or not a vertex is part of an explicit aromatic ring (lower case smiles).
         *
         * @param {number} vertexId A vertex id.
         * @returns {boolean} A boolean indicating whether or not the vertex is part of an explicit aromatic ring.
         */

    }, {
        key: 'isVertexInAromaticRing',
        value: function isVertexInAromaticRing(vertexId) {
            var element = this.vertices[vertexId].value.element;

            return element == element.toLowerCase();
        }

        /**
         * Get the normals of an edge.
         *
         * @param {Edge} edge An edge.
         * @returns {array} An array containing two vectors, representing the normals.
         */

    }, {
        key: 'getEdgeNormals',
        value: function getEdgeNormals(edge) {
            var v1 = this.vertices[edge.sourceId].position;
            var v2 = this.vertices[edge.targetId].position;

            // Get the normals for the edge
            var normals = Vector2.normals(v1, v2);

            // Normalize the normals
            ArrayHelper.each(normals, function (v) {
                v.normalize();
            });

            return normals;
        }

        /**
         * Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.
         *
         * @param {number} vertexId A vertex id.
         * @param {number} parentVertexId The id of a neighbouring vertex.
         * @returns {number} The depth of the sub-tree.
         */

    }, {
        key: 'getTreeDepth',
        value: function getTreeDepth(vertexId, parentVertexId) {
            var neighbours = this.vertices[vertexId].getSpanningTreeNeighbours(parentVertexId);
            var max = 0;

            for (var i = 0; i < neighbours.length; i++) {
                var childId = neighbours[i];
                var d = this.getTreeDepth(childId, vertexId);

                if (d > max) {
                    max = d;
                }
            }

            return max + 1;
        }

        /**
         * Traverse a sub-tree in the graph.
         *
         * @param {number} vertexId A vertex id.
         * @param {number} parentVertexId A neighbouring vertex.
         * @param {function} callback The callback function that is called with each visited as an argument.
         */

    }, {
        key: 'traverseTree',
        value: function traverseTree(vertexId, parentVertexId, callback) {
            var vertex = this.vertices[vertexId];
            var neighbours = vertex.getSpanningTreeNeighbours(parentVertexId);

            callback(vertex);

            for (var i = 0; i < neighbours.length; i++) {
                this.traverseTree(neighbours[i], vertexId, callback);
            }
        }

        /**
         * Gets the number of bonds of a vertex.
         *
         * @param {Vertex} vertex A vertex.
         * @returns {number} The number of bonds the vertex participates in.
         */

    }, {
        key: 'getBondCount',
        value: function getBondCount(vertex) {
            var count = 0;

            for (var i = 0; i < vertex.edges.length; i++) {
                count += this.edges[vertex.edges[i]].getBondCount();
            }

            return count;
        }

        /**
         * Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).
         *
         * @param {number} vertexId A vertex id.
         * @returns {array} An array of vertices.
         */

    }, {
        key: 'getNonRingNeighbours',
        value: function getNonRingNeighbours(vertexId) {
            var nrneighbours = [];
            var vertex = this.vertices[vertexId];
            var neighbours = vertex.getNeighbours();

            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = this.vertices[neighbours[i]];
                var nIntersections = ArrayHelper.intersection(vertex.value.rings, neighbour.value.rings).length;

                if (nIntersections === 0 && neighbour.value.isBridge == false) {
                    nrneighbours.push(neighbour);
                }
            }

            return nrneighbours;
        }
    }]);

    return SmilesDrawer;
}();

/** A class representing a 2D vector. */


var Vector2 = function () {
    /**
     * The constructor of the class Vector2.
     *
     * @param {number} x The initial x coordinate value.
     * @param {number} y The initial y coordinate value.
     */
    function Vector2(x, y) {
        _classCallCheck(this, Vector2);

        if (arguments.length == 0) {
            this.x = 0;
            this.y = 0;
        } else if (arguments.length == 1) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * Sets the values of the x and y coordinates of this vector.
     *
     * @param {number} [x=0] The value of the x coordinate.
     * @param {number} [y=0] The value of the y coordinate.
     */


    _createClass(Vector2, [{
        key: 'set',
        value: function set() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.x = x;
            this.y = y;
        }

        /**
         * Clones this vector and returns the clone.
         *
         * @returns {Vector2} The clone of this vector.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new Vector2(this.x, this.y);
        }

        /**
         * Returns a string representation of this vector.
         *
         * @returns {string} A string representation of this vector.
         */

    }, {
        key: 'toString',
        value: function toString() {
            return '(' + this.x + ',' + this.y + ')';
        }

        /**
         * Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.
         *
         * @param {Vector2} vec Another vector.
         */

    }, {
        key: 'add',
        value: function add(vec) {
            this.x += vec.x;
            this.y += vec.y;
        }

        /**
         * Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.
         *
         * @param {Vector2} vec Another vector.
         */

    }, {
        key: 'subtract',
        value: function subtract(vec) {
            this.x -= vec.x;
            this.y -= vec.y;
        }

        /**
         * Divide the x and y coordinate values of this vector by a scalar.
         *
         * @param {number} scalar The scalar.
         */

    }, {
        key: 'divide',
        value: function divide(scalar) {
            this.x /= scalar;
            this.y /= scalar;
        }

        /**
         * Multiply the x and y coordinate values of this vector by a scalar.
         *
         * @param {number} scalar The scalar.
         */

    }, {
        key: 'multiply',
        value: function multiply(scalar) {
            this.x *= scalar;
            this.y *= scalar;
        }

        /**
         * Inverts this vector. Same as multiply(-1.0).
         *
         */

    }, {
        key: 'invert',
        value: function invert() {
            this.x = -this.x;
            this.y = -this.y;
        }

        /**
         * Returns the angle of this vector in relation to the coordinate system.
         *
         * @returns {number} The angle in radians.
         */

    }, {
        key: 'angle',
        value: function angle() {
            return Math.atan2(this.y, this.x);
        }

        /**
         * Returns the euclidean distance between this vector and another vector.
         *
         * @param {Vector2} vec A vector.
         * @returns {number} The euclidean distance between the two vectors.
         */

    }, {
        key: 'distance',
        value: function distance(vec) {
            return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y));
        }

        /**
         * Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).
         *
         * @param {Vector2} vec Another vector.
         * @returns {number} The squared euclidean distance of the two vectors.
         */

    }, {
        key: 'distanceSq',
        value: function distanceSq(vec) {
            return (vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y);
        }

        /**
         * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.
         *
         * @param {Vector2} vec Another vector.
         * @returns {number} Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.
         */

    }, {
        key: 'clockwise',
        value: function clockwise(vec) {
            var a = this.y * vec.x;
            var b = this.x * vec.y;

            if (a > b) {
                return -1;
            } else if (a === b) {
                return 0;
            }

            return 1;
        }

        /**
         * Rotates this vector by a given number of radians around the origin of the coordinate system.
         *
         * @param {number} angle The angle in radians to rotate the vector.
         */

    }, {
        key: 'rotate',
        value: function rotate(angle) {
            var tmp = new Vector2();

            tmp.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
            tmp.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);

            this.x = tmp.x;
            this.y = tmp.y;
        }

        /**
         * Rotates this vector around another vector.
         *
         * @param {number} angle The angle in radians to rotate the vector.
         * @param {Vector2} vec The vector which is used as the rotational center.
         */

    }, {
        key: 'rotateAround',
        value: function rotateAround(angle, vec) {
            var s = Math.sin(angle);
            var c = Math.cos(angle);

            this.x -= vec.x;
            this.y -= vec.y;

            var x = this.x * c - this.y * s;
            var y = this.x * s + this.y * c;

            this.x = x + vec.x;
            this.y = y + vec.y;
        }

        /**
         * Rotate a vector around a given center to the same angle as another vector, keeps the distance to the center.
         *
         */

        /**
         * Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.
         *
         * @param {Vector2} vec The vector to rotate this vector to.
         * @param {Vector2} center The rotational center.
         * @param {number} [offsetAngle=0.0] An additional amount of radians to rotate the vector.
         */

    }, {
        key: 'rotateTo',
        value: function rotateTo(vec, center) {
            var offsetAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;

            var a = Vector2.subtract(this, center);
            var b = Vector2.subtract(vec, center);
            var angle = Vector2.angle(b, a);

            this.rotateAround(angle + offsetAngle, center);
        }

        /**
         * Gets the angles between this vector and another vector around a common center of rotation.
         *
         * @param {Vector2} vec Another vector.
         * @param {Vector2} center The center of rotation.
         * @returns {number} The angle between this vector and another vector around a center of rotation in radians.
         */

    }, {
        key: 'getRotateToAngle',
        value: function getRotateToAngle(vec, center) {
            var a = Vector2.subtract(this, center);
            var b = Vector2.subtract(vec, center);
            var angle = Vector2.angle(b, a);

            return angle;
        }

        /**
         * Checks whether a vector lies within a polygon spanned by a set of vectors.
         *
         * @param {array} polygon An array of vectors spanning the polygon.
         * @returns {boolean} A boolean indicating whether or not this vector is within a polygon.
         */

    }, {
        key: 'isInPolygon',
        value: function isInPolygon(polygon) {
            var inside = false;

            // Its not always a given, that the polygon is convex (-> sugars)
            for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                if (polygon[i].y > this.y != polygon[j].y > this.y && this.x < (polygon[j].x - polygon[i].x) * (this.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
                    inside = !inside;
                }
            }

            return inside;
        }

        /**
         * Returns the length of this vector.
         *
         * @returns {number} The length of this vector.
         */

    }, {
        key: 'length',
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * Normalizes this vector.
         *
         */

    }, {
        key: 'normalize',
        value: function normalize() {
            this.divide(this.length());
        }

        /**
         * Returns a normalized copy of this vector.
         *
         * @returns {Vector2} A normalized copy of this vector.
         */

    }, {
        key: 'normalized',
        value: function normalized() {
            return Vector2.divide(this, this.length());
        }

        /**
         * Calculates which side of a line spanned by two vectors this vector is.
         *
         * @param {Vector2} vecA A vector.
         * @param {Vector2} vecB A vector.
         * @returns {number} A number indicating the side of this vector, given a line spanned by two other vectors.
         */

    }, {
        key: 'whichSide',
        value: function whichSide(vecA, vecB) {
            return (this.x - vecA.x) * (vecB.y - vecA.y) - (this.y - vecA.y) * (vecB.x - vecA.x);
        }

        /**
         * Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.
         *
         * @param {Vector2} vecA A vector spanning the line.
         * @param {Vector2} vecB A vector spanning the line.
         * @param {Vector2} vecC A vector to check whether or not it is on the same side as this vector.
         * @returns {boolean} Returns a boolean indicating whether or not this vector is on the same side as another vector.
         */

    }, {
        key: 'sameSideAs',
        value: function sameSideAs(vecA, vecB, vecC) {
            var d = this.whichSide(vecA, vecB);
            var dRef = vecC.whichSide(vecA, vecB);

            return d < 0 && dRef < 0 || d == 0 && dRef == 0 || d > 0 && dRef > 0;
        }

        /**
         * Adds two vectors and returns the result as a new vector.
         *
         * @static
         * @param {Vector2} vecA A summand.
         * @param {Vector2} vecB A summand.
         * @returns {Vector2} Returns the sum of two vectors.
         */

    }], [{
        key: 'add',
        value: function add(vecA, vecB) {
            return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
        }

        /**
         * Subtracts one vector from another and returns the result as a new vector.
         *
         * @static
         * @param {Vector2} vecA The minuend.
         * @param {Vector2} vecB The subtrahend.
         * @returns {Vector2} Returns the difference of two vectors.
         */

    }, {
        key: 'subtract',
        value: function subtract(vecA, vecB) {
            return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
        }

        /**
         * Multiplies two vectors (value by value) and returns the result.
         *
         * @static
         * @param {Vector2} vecA A factor.
         * @param {Vector2} vecB A factor.
         * @returns {Vector2} Returns the product of two vectors.
         */

    }, {
        key: 'multiply',
        value: function multiply(vecA, vecB) {
            if (vecB.x && vecB.y) {
                return new Vector2(vecA.x * vecB.x, vecA.y * vecB.y);
            }

            return new Vector2(vecA.x * vecB, vecA.y * vecB);
        }

        /**
         * Returns the midpoint of a line spanned by two vectors.
         *
         * @static
         * @param {Vector2} vecA A vector spanning the line.
         * @param {Vector2} vecB A vector spanning the line.
         * @returns {Vector2} The midpoint of the line spanned by two vectors.
         */

    }, {
        key: 'midpoint',
        value: function midpoint(vecA, vecB) {
            return new Vector2((vecA.x + vecB.x) / 2, (vecA.y + vecB.y) / 2);
        }

        /**
         * Returns the normals of a line spanned by two vectors.
         *
         * @static
         * @param {Vector2} vecA A vector spanning the line.
         * @param {Vector2} vecB A vector spanning the line.
         * @returns {array} An array containing the two normals, each represented by a vector.
         */

    }, {
        key: 'normals',
        value: function normals(vecA, vecB) {
            var delta = Vector2.subtract(vecB, vecA);

            return [new Vector2(-delta.y, delta.x), new Vector2(delta.y, -delta.x)];
        }

        /**
         * Divides a vector by another vector and returns the result as new vector.
         *
         * @static
         * @param {Vector2} vecA The dividend.
         * @param {Vector2} vecB The divisor.
         * @returns {Vector2} The fraction of the two vectors.
         */

    }, {
        key: 'divide',
        value: function divide(vecA, vecB) {
            if (vecB.x && vecB.y) {
                return new Vector2(vecA.x / vecB.x, vecA.y / vecB.y);
            }

            return new Vector2(vecA.x / vecB, vecA.y / vecB);
        }

        /**
         * Returns the dot product of two vectors.
         *
         * @static
         * @param {Vector2} vecA A vector.
         * @param {Vector2} vecB A vector.
         * @returns {number} The dot product of two vectors.
         */

    }, {
        key: 'dot',
        value: function dot(vecA, vecB) {
            return vecA.x * vecB.x + vecA.y * vecB.y;
        }

        /**
         * Returns the angle between two vectors.
         *
         * @static
         * @param {Vector2} vecA A vector.
         * @param {Vector2} vecB A vector.
         * @returns {number} The angle between two vectors in radians.
         */

    }, {
        key: 'angle',
        value: function angle(vecA, vecB) {
            var dot = Vector2.dot(vecA, vecB);

            return Math.acos(dot / (vecA.length() * vecB.length()));
        }

        /**
         * Returns the scalar projection of a vector on another vector.
         *
         * @static
         * @param {Vector2} vecA Thecreate jsdoc babel vector to be projected.
         * @param {Vector2} vecB The vector to be projection upon.
         * @returns {number} The scalar component.
         */

    }, {
        key: 'scalarProjection',
        value: function scalarProjection(vecA, vecB) {
            var unit = vecB.normalized();

            return Vector2.dot(vecA, unit);
        }
    }]);

    return Vector2;
}();

/** A class representing a vertex */


var Vertex = function () {
    /**
     * The constructor for the class Vertex.
     *
     * @param {*} value The value associated with this vertex.
     * @param {number} [x=0] The initial x coordinate of the positional vector of this vertex.
     * @param {number} [y=0] The initial y coordinate of the positional vector of this vertex.
     */
    function Vertex(value) {
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Vertex);

        this.id = null;
        this.value = value;
        this.position = new Vector2(x ? x : 0, y ? y : 0);
        this.previousPosition = new Vector2(0, 0);
        this.parentVertexId = null;
        this.children = [];
        this.spanningTreeChildren = [];
        this.edges = [];
        this.positioned = false;
        this.angle = 0.0;
        this.backAngle = 0.0;
        this.flippable = false; // can be flipped into a ring
        this.flipCenter = null;
        this.flipNeighbour = null;
        this.flipRings = new Array();
    }

    /**
     * Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false.
     *
     * @returns {boolean} A boolean indicating whether or not this vertex is terminal.
     */


    _createClass(Vertex, [{
        key: 'isTerminal',
        value: function isTerminal() {
            return this.parentVertexId === null && this.children.length < 2 || this.children.length === 0;
        }

        /**
         * Clones this vertex and returns the clone.
         *
         * @returns {Vertex} A clone of this vertex.
         */

    }, {
        key: 'clone',
        value: function clone() {
            var clone = new Vertex(this.value, this.position.x, this.position.y);
            clone.id = this.id;
            clone.previousPosition = new Vector2(this.previousPosition.x, this.previousPosition.y);
            clone.parentVertexId = this.parentVertexId;
            clone.children = ArrayHelper.clone(this.children);
            clone.spanningTreeChildren = ArrayHelper.clone(this.spanningTreeChildren);
            clone.edges = ArrayHelper.clone(this.edges);
            clone.positioned = this.positioned;
            clone.angle = this.angle;
            clone.backAngle = this.backAngle;
            clone.flippable = this.flippable;
            clone.flipCenter = this.flipCenter;
            clone.flipRings = ArrayHelper.clone(this.flipRings);
            return clone;
        }

        /**
         * Returns true if this vertex and the supplied vertex both have the same id, else returns false.
         *
         * @param {Vertex} - The vertex to check.
         * @returns {boolean} A boolean indicating whether or not the two vertices have the same id.
         */

    }, {
        key: 'equals',
        value: function equals(vertex) {
            return this.id === vertex.id;
        }

        /**
         * Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.
         *
         * @param {Vertex} [referenceVector=null] - The refernece vector.
         * @param {boolean} [returnAsDegrees=false] - If true, returns angle in degrees, else in radians.
         * @returns {number} The angle of this vertex.
         */

    }, {
        key: 'getAngle',
        value: function getAngle() {
            var referenceVector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var returnAsDegrees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var u = null;

            if (!referenceVector) {
                u = Vector2.subtract(this.position, this.previousPosition);
            } else {
                u = Vector2.subtract(this.position, referenceVector);
            }

            if (returnAsDegrees) {
                return MathHelper.toDeg(u.angle());
            }

            return u.angle();
        }

        /**
         * Returns the suggested text direction when text is added at the position of this vertex.
         *
         * @param {array} vertices The array of vertices for the current molecule.
         * @returns {string} The suggested direction of the text.
         */

    }, {
        key: 'getTextDirection',
        value: function getTextDirection(vertices) {
            var neighbours = this.getNeighbours();
            var angles = [];

            for (var i = 0; i < neighbours.length; i++) {
                angles.push(this.getAngle(vertices[neighbours[i]].position));
            }

            var textAngle = MathHelper.meanAngle(angles);

            // Round to 0, 90, 180 or 270 degree
            var halfPi = Math.PI / 2.0;
            textAngle = Math.round(Math.round(textAngle / halfPi) * halfPi, 3);

            if (textAngle == 2) {
                return 'down';
            } else if (textAngle == -2) {
                return 'up';
            } else if (textAngle === 0 || textAngle === -0) {
                return 'right'; // is checking for -0 necessary?
            } else if (textAngle == 3 || textAngle == -3) {
                return 'left';
            } else {
                return 'down'; // default to down
            }
        }

        /**
         * Returns an array of ids of neighbouring vertices.
         *
         * @param {number} [vertexId=null] If a value is supplied, the vertex with this id is excluded from the returned indices.
         * @returns {array} An array containing the ids of neighbouring vertices.
         */

    }, {
        key: 'getNeighbours',
        value: function getNeighbours() {
            var vertexId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var neighbours = [];

            for (var i = 0; i < this.children.length; i++) {
                if (vertexId === undefined || vertexId != this.children[i]) {
                    neighbours.push(this.children[i]);
                }
            }

            if (this.parentVertexId != null) {
                if (vertexId === undefined || vertexId != this.parentVertexId) {
                    neighbours.push(this.parentVertexId);
                }
            }

            return neighbours;
        }

        /**
         * Gets the common neighbours of this and another vertex.
         *
         * @param {Vertex} vertex The vertex to check for common neighbours.
         * @returns {array} An array containing common neighbours.
         */

    }, {
        key: 'getCommonNeighbours',
        value: function getCommonNeighbours(vertex) {
            // There can only be one common neighbour of a Vertex
            // outside of a ring
            var commonNeighbours = new Array();
            var neighboursA = this.getNeighbours();
            var neighboursB = vertex.getNeighbours();

            for (var i = 0; i < neighboursA.length; i++) {
                for (var j = 0; j < neighboursB.length; j++) {
                    if (neighboursA[i] === neighboursB[j]) {
                        commonNeighbours.push(neighboursA[i]);
                    }
                }
            }

            return commonNeighbours;
        }

        /**
         * Checks whether or not a vertex is a neighbour of this vertex.
         *
         * @param {number} vertexId The id of the vertex to check if it is a neighbour of this vertex.
         * @returns {boolean} A boolean indicating whether or not the two vertices are neighbours.
         */

    }, {
        key: 'isNeighbour',
        value: function isNeighbour(vertexId) {
            if (this.parentVertexId === vertexId) {
                return true;
            }

            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i] === vertexId) {
                    return true;
                }
            }
        }

        /**
         * Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.
         *
         * @param {number} [vertexId=null] If supplied, the vertex with this id is excluded from the array returned.
         * @returns {array} An array containing the ids of the neighbouring vertices.
         */

    }, {
        key: 'getSpanningTreeNeighbours',
        value: function getSpanningTreeNeighbours() {
            var vertexId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var neighbours = [];

            for (var i = 0; i < this.spanningTreeChildren.length; i++) {
                if (vertexId === undefined || vertexId != this.spanningTreeChildren[i]) {
                    neighbours.push(this.spanningTreeChildren[i]);
                }
            }

            if (this.parentVertexId != null) {
                if (vertexId === undefined || vertexId != this.parentVertexId) {
                    neighbours.push(this.parentVertexId);
                }
            }

            return neighbours;
        }

        /**
         * Gets the next vertex in the ring in opposide direction to the supplied vertex id.
         *
         * @param {array} vertices The array of vertices for the current molecule.
         * @param {number} ringId The id of the ring containing this vertex.
         * @param {number} previousVertexId The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex.
         * @returns {number} The id of the next vertex in the ring.
         */

    }, {
        key: 'getNextInRing',
        value: function getNextInRing(vertices, ringId, previousVertexId) {
            var neighbours = this.getNeighbours();

            for (var i = 0; i < neighbours.length; i++) {
                if (ArrayHelper.contains(vertices[neighbours[i]].value.rings, { value: ringId }) && neighbours[i] != previousVertexId) {
                    return neighbours[i];
                }
            }

            return null;
        }
    }]);

    return Vertex;
}();