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

/** The main class of the application representing the smiles drawer */


var SmilesDrawer = function () {
    /**
     * The constructor for the class SmilesDrawer.
     *
     * @param {object} options An object containing custom values for different options. It is merged with the default options.
     */
    function SmilesDrawer(options) {
        _classCallCheck(this, SmilesDrawer);

        this.width = 800;
        this.height = 500;
        this.ringIdCounter = 0;
        this.ringConnectionIdCounter = 0;

        this.canvas;
        this.ctx;
        this.drawingWidth = 0.0;
        this.drawingHeight = 0.0;
        this.offsetX = 0.0;
        this.offsetY = 0.0;

        this.maxBonds = {
            'c': 4,
            'C': 4,
            'n': 3,
            'N': 3,
            'o': 2,
            'O': 2
        };

        this.defaultOptions = {
            shortBondLength: 20, // 25,
            bondLength: 25, // 30,
            bondSpacing: 4,
            defaultDir: -1,
            debug: false,
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
            this.canvas = document.getElementById(targetId);
            this.ctx = this.canvas.getContext('2d');

            this.ringIdCounter = 0;
            this.ringConnectionIdCounter = 0;

            this.vertices = [];
            this.edges = [];
            this.rings = [];
            this.ringConnections = [];

            this.backupVertices = [];
            this.backupRings = [];

            this.colors = this.opts.themes[themeName];

            // Clear the canvas
            this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
            this.initGraph(data);
            this.initRings();

            if (!infoOnly) {
                this.position();
                var overlapScore = this.getOverlapScore();

                var count = 0;
                while (overlapScore.total > this.opts.bondLength / 2.0 && count < 10) {
                    // this.opts.defaultDir = -this.opts.defaultDir;
                    this.clearPositions();
                    this.position();

                    var newOverlapScore = this.getOverlapScore();

                    if (newOverlapScore.total < overlapScore.total) {
                        overlapScore = newOverlapScore;
                    } else {
                        this.restorePositions();
                    }

                    // Restore default
                    // this.opts.defaultDir = -this.opts.defaultDir;

                    count++;
                }

                this.resolveSecondaryOverlaps(overlapScore.scores);

                // Figure out the final size of the image
                var max = { x: -Number.MAX_VALUE, y: -Number.MAX_VALUE };
                var min = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };

                for (var i = 0; i < this.vertices.length; i++) {
                    var p = this.vertices[i].position;
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

                // Do the actual drawing
                this.drawEdges();
                this.drawVertices(this.opts.debug);

                // Reset the canvas context (especially the scale)
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
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
                        var path = that.annotateRing(ring.id, ring.sourceId, ring.targetId);

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
                    this.removeRingConnectionBetween(ringIds[_i14], ringIds[_j4]);
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
    }, {
        key: 'ringCounter',
        value: function ringCounter(node, rings) {
            for (var i = 0; i < node.getRingbondCount(); i++) {
                var ring = node.ringbonds[i].id;

                if (!this.arrayContains(rings, { value: ring })) {
                    rings.push(ring);
                }
            }

            for (var i = 0; i < node.branchCount; i++) {
                this.ringCounter(node.branches[i], rings);
            }

            if (node.hasNext) {
                this.ringCounter(node.next, rings);
            }

            return rings;
        }
    }, {
        key: 'annotateRing',
        value: function annotateRing(ring, sourceId, targetId) {
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

                for (var i = 0; i < neighbours[u].length; i++) {
                    var v = neighbours[u][i];
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
    }, {
        key: 'getEdgeWeight',
        value: function getEdgeWeight(a, b) {
            for (var i = 0; i < this.edges.length; i++) {
                var edge = this.edges[i];

                if (edge.sourceId == a && edge.targetId == b || edge.targetId == a && edge.sourceId == b) {
                    return edge.weight;
                }
            }
        }
    }, {
        key: 'addVertex',
        value: function addVertex(vertex) {
            vertex.id = this.vertices.length;
            this.vertices.push(vertex);
            return vertex.id;
        }
    }, {
        key: 'getVerticesAt',
        value: function getVerticesAt(position, radius, exclude) {
            var locals = new Array();

            for (var i = 0; i < this.vertices.length; i++) {
                var vertex = this.vertices[i];
                if (vertex.id === exclude || !vertex.positioned) {
                    continue;
                }

                var distance = position.distance(vertex.position);
                if (distance <= radius) {
                    locals.push(vertex.id);
                }
            }

            return locals;
        }
    }, {
        key: 'getBranch',
        value: function getBranch(vertex, previous) {
            var vertices = new Array();
            var rings = new Array();
            var that = this;

            var recurse = function recurse(v, p) {
                var vertex = that.vertices[v];
                for (var i = 0; i < vertex.value.rings.length; i++) {
                    rings.push(vertex.value.rings[i]);
                }

                for (var i = 0; i < vertex.children.length; i++) {
                    var child = vertex.children[i];
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

            vertices.push(vertex);
            recurse(vertex, previous);

            return {
                vertices: vertices,
                rings: ArrayHelper.unique(rings)
            };
        }
    }, {
        key: 'addEdge',
        value: function addEdge(edge) {
            edge.id = this.edges.length;
            this.edges.push(edge);
            return edge.id;
        }
    }, {
        key: 'addRing',
        value: function addRing(ring) {
            ring.id = this.ringIdCounter++;
            this.rings.push(ring);
            return ring.id;
        }
    }, {
        key: 'removeRing',
        value: function removeRing(ring) {
            this.rings = this.rings.filter(function (item) {
                return item.id !== ring;
            });

            // Also remove ring connections involving this ring
            this.ringConnections = this.ringConnections.filter(function (item) {
                return item.rings.first !== ring && item.rings.second !== ring;
            });

            // Remove the ring as neighbour of other rings
            for (var i = 0; i < this.rings.length; i++) {
                var r = this.rings[i];
                r.neighbours = r.neighbours.filter(function (item) {
                    return item !== ring;
                });
            }
        }
    }, {
        key: 'getRing',
        value: function getRing(id) {
            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].id == id) {
                    return this.rings[i];
                }
            }
        }
    }, {
        key: 'addRingConnection',
        value: function addRingConnection(ringConnection) {
            ringConnection.id = this.ringConnectionIdCounter++;
            this.ringConnections.push(ringConnection);
            return ringConnection.id;
        }
    }, {
        key: 'removeRingConnection',
        value: function removeRingConnection(ringConnection) {
            this.ringConnections = this.ringConnections.filter(function (item) {
                return item.id !== ringConnection;
            });
        }
    }, {
        key: 'removeRingConnectionBetween',
        value: function removeRingConnectionBetween(a, b) {
            var toRemove = new Array();
            for (var i = 0; i < this.ringConnections.length; i++) {
                var ringConnection = this.ringConnections[i];

                if (ringConnection.rings.first === a && ringConnection.rings.second === b || ringConnection.rings.first === b && ringConnection.rings.second === a) {
                    toRemove.push(ringConnection.id);
                }
            }

            for (var i = 0; i < toRemove.length; i++) {
                this.removeRingConnection(toRemove[i]);
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
    }, {
        key: 'getRingConnections',
        value: function getRingConnections(a, b) {
            var ringConnections = new Array();

            if (arguments.length === 1) {
                for (var i = 0; i < this.ringConnections.length; i++) {
                    var ringConnection = this.ringConnections[i];

                    if (ringConnection.rings.first === a || ringConnection.rings.second === a) {
                        ringConnections.push(ringConnection.id);
                    }
                }
            } else if (b.constructor !== Array) {
                for (var i = 0; i < this.ringConnections.length; i++) {
                    var ringConnection = this.ringConnections[i];

                    if (ringConnection.rings.first === a && ringConnection.rings.second === b || ringConnection.rings.first === b && ringConnection.rings.second === a) {
                        ringConnections.push(ringConnection.id);
                    }
                }
            } else {
                for (var i = 0; i < this.ringConnections.length; i++) {
                    for (var j = 0; j < b.length; j++) {
                        var c = b[j];
                        var ringConnection = this.ringConnections[i];

                        if (ringConnection.rings.first === a && ringConnection.rings.second === c || ringConnection.rings.first === c && ringConnection.rings.second === a) {
                            ringConnections.push(ringConnection.id);
                        }
                    }
                }
            }
            return ringConnections;
        }
    }, {
        key: 'getOverlapScore',
        value: function getOverlapScore() {
            var total = 0.0;
            var overlapScores = new Float32Array(this.vertices.length);

            for (var i = 0; i < this.vertices.length; i++) {
                overlapScores[i] = 0;
            }

            for (var i = 0; i < this.vertices.length; i++) {
                for (var j = i + 1; j < this.vertices.length; j++) {
                    var a = this.vertices[i];
                    var b = this.vertices[j];

                    var dist = Vector2.subtract(a.position, b.position).length();
                    if (dist < this.opts.bondLength) {
                        var weighted = this.opts.bondLength - dist;
                        total += weighted;
                        overlapScores[i] += weighted;
                        overlapScores[j] += weighted;
                    }
                }
            }

            var sortable = [];

            for (var i = 0; i < this.vertices.length; i++) {
                sortable.push({
                    id: i,
                    score: overlapScores[i]
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
    }, {
        key: 'getColor',
        value: function getColor(key) {
            if (key in this.colors) {
                return this.colors[key];
            }

            return this.colors['C'];
        }
    }, {
        key: 'circle',
        value: function circle(radius, x, y, classes, fill, debug) {
            // Return empty line element for debugging, remove this check later, values should not be NaN
            if (isNaN(x) || isNaN(y)) {
                return;
            }

            this.ctx.save();
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.arc(x + this.offsetX, y + this.offsetY, radius, 0, Math.PI * 2, true);
            this.ctx.closePath();

            if (debug) {
                if (fill) {
                    this.ctx.fillStyle = '#ff0000';
                    this.ctx.fill();
                } else {
                    this.ctx.strokeStyle = '#ff0000';
                    this.ctx.stroke();
                }
            } else {
                if (fill) {
                    this.ctx.fillStyle = this.colors['C'];
                    this.ctx.fill();
                } else {
                    this.ctx.strokeStyle = this.colors['C'];
                    this.ctx.stroke();
                }
            }

            this.ctx.restore();
        }
    }, {
        key: 'line',
        value: function line(x1, y1, x2, y2, elementA, elementB, classes) {
            if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
                return;
            }

            var line = new Line(new Vector2(x1, y1), new Vector2(x2, y2), elementA, elementB);
            // Add a shadow behind the line

            var shortLine = line.clone().shorten(8.0);

            var l = shortLine.getLeftVector().clone();
            var r = shortLine.getRightVector().clone();

            l.x += this.offsetX;
            l.y += this.offsetY;

            r.x += this.offsetX;
            r.y += this.offsetY;

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(l.x, l.y);
            this.ctx.lineTo(r.x, r.y);
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = 3.5;
            this.ctx.shadowColor = this.colors['BACKGROUND'];
            this.ctx.shadowBlur = 0.0;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.strokeStyle = this.colors['BACKGROUND'];
            this.ctx.stroke();
            this.ctx.restore();

            var l = line.getLeftVector().clone();
            var r = line.getRightVector().clone();

            l.x += this.offsetX;
            l.y += this.offsetY;

            r.x += this.offsetX;
            r.y += this.offsetY;

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(l.x, l.y);
            this.ctx.lineTo(r.x, r.y);
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = 1.5;
            var gradient = this.ctx.createLinearGradient(l.x, l.y, r.x, r.y);
            gradient.addColorStop(0.4, this.colors[line.getLeftElement().toUpperCase()] || this.colors['C']);
            gradient.addColorStop(0.6, this.colors[line.getRightElement().toUpperCase()] || this.colors['C']);
            this.ctx.strokeStyle = gradient;
            this.ctx.stroke();
            this.ctx.restore();
        }
    }, {
        key: 'debugText',
        value: function debugText(x, y, text) {
            this.ctx.save();
            var font = '5px Arial';
            this.ctx.font = font;
            this.ctx.textAlign = 'start';
            this.ctx.textBaseline = 'top';
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillText(text, x + this.offsetX, y + this.offsetY);
            this.ctx.restore();
        }
    }, {
        key: 'text',
        value: function text(x, y, element, classes, background, hydrogen, position, terminal, charge) {
            // Return empty line element for debugging, remove this check later, values should not be NaN
            if (isNaN(x) || isNaN(y)) {
                return;
            }

            this.ctx.save();
            var fontLarge = '10px Arial';
            var fontSmall = '6px Arial';

            this.ctx.textAlign = 'start';
            this.ctx.textBaseline = 'top';

            // Charge
            var chargeWidth = 0;
            if (charge) {
                var chargeText = '+';

                if (charge === 2) {
                    chargeText = '2+';
                } else if (charge === -1) {
                    chargeText = '-';
                } else if (charge === -2) {
                    chargeText = '2-';
                }

                this.ctx.font = fontSmall;
                chargeWidth = this.ctx.measureText(chargeText).width;
            }

            this.ctx.font = fontLarge;
            this.ctx.fillStyle = this.colors['BACKGROUND'];

            var dim = this.ctx.measureText(element);
            dim.totalWidth = dim.width + chargeWidth;
            dim.height = parseInt(fontLarge, 10);

            var r = dim.totalWidth > dim.height ? dim.totalWidth : dim.height;
            r /= 2.0;

            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.beginPath();
            this.ctx.arc(x + this.offsetX, y + this.offsetY + dim.height / 20.0, r + 1.0, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.globalCompositeOperation = 'source-over';

            // Correct vertical text position
            y -= 2;

            this.ctx.fillStyle = this.getColor(element.toUpperCase());
            this.ctx.fillText(element, x - dim.totalWidth / 2.0 + this.offsetX, y - dim.height / 2.0 + this.offsetY);

            if (charge) {
                this.ctx.font = fontSmall;
                this.ctx.fillText(chargeText, x - dim.totalWidth / 2.0 + dim.width + this.offsetX, y - dim.height / 2.0 + this.offsetY);
            }

            this.ctx.font = fontLarge;

            var hDim = this.ctx.measureText('H');
            hDim.height = parseInt(fontLarge, 10);

            if (hydrogen === 1) {
                var hx = x - dim.totalWidth / 2.0 + this.offsetX;
                var hy = y - dim.height / 2.0 + this.offsetY;

                if (position === 'left') {
                    hx -= dim.totalWidth;
                } else if (position === 'right') {
                    hx += dim.totalWidth;
                } else if (position === 'up' && terminal) {
                    hx += dim.totalWidth;
                } else if (position === 'down' && terminal) {
                    hx += dim.totalWidth;
                } else if (position === 'up' && !terminal) {
                    hy -= dim.height;
                } else if (position === 'down' && !terminal) {
                    hy += dim.height;
                }

                this.ctx.fillText('H', hx, hy);
            } else if (hydrogen > 1) {
                var hx = x - dim.totalWidth / 2.0 + this.offsetX;
                var hy = y - dim.height / 2.0 + this.offsetY;

                this.ctx.font = fontSmall;
                var cDim = this.ctx.measureText(hydrogen);
                cDim.height = parseInt(fontSmall, 10);

                if (position === 'left') {
                    hx -= hDim.width + cDim.width;
                } else if (position === 'right') {
                    hx += dim.totalWidth;
                } else if (position === 'up' && terminal) {
                    hx += dim.totalWidth;
                } else if (position === 'down' && terminal) {
                    hx += dim.totalWidth;
                } else if (position === 'up' && !terminal) {
                    hy -= dim.height;
                } else if (position === 'down' && !terminal) {
                    hy += dim.height;
                }

                this.ctx.font = fontLarge;
                this.ctx.fillText('H', hx, hy);

                this.ctx.font = fontSmall;
                this.ctx.fillText(hydrogen, hx + hDim.width, hy + hDim.height / 2.0);
            }

            this.ctx.restore();
        }
    }, {
        key: 'drawPoint',
        value: function drawPoint(v, text) {
            this.circle(2, v.x, v.y, 'helper', true, true);

            if (text) {
                this.debugText(v.x, v.y, text, 'id', true);
            }
        }
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

            for (var i = 0; i < this.vertices.length; i++) {
                var v = this.vertices[i].position;

                if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
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
    }, {
        key: 'connected',
        value: function connected(a, b) {
            for (var i = 0; i < this.edges.length; i++) {
                var edge = this.edges[i];

                if (edge.sourceId === a && edge.targetId === b || edge.sourceId === b && edge.targetId === a) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'forceLayout',
        value: function forceLayout(vertices, center, start, ring) {
            // Constants
            var l = this.opts.bondLength;
            var kr = 6000; // repulsive force
            var ks = 5; // spring
            var g = 0.5; // gravity (to center)

            if (ring.rings.length > 2) {
                kr = 1000;
                ks = 1.5;
                g = 0;
            }

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

            // this.vertices[start].positioned = false;

            // Place vertices randomly around center
            for (var _i16 = 0; _i16 < vertices.length; _i16++) {
                var _vertex4 = this.vertices[vertices[_i16]];

                if (!_vertex4.positioned) {
                    _vertex4.position.x = center.x + Math.random();
                    _vertex4.position.y = center.y + Math.random();
                }

                //if(ring.rings.length > 2 && ring.members.length > 6 && vertex.id !== start)
                //  vertex.positioned = false;
            }

            var forces = {};

            for (var _i17 = 0; _i17 < vertices.length; _i17++) {
                forces[vertices[_i17]] = new Vector2();
            }

            for (var n = 0; n < 1000; n++) {
                for (var _i18 = 0; _i18 < vertices.length; _i18++) {
                    forces[vertices[_i18]].set(0, 0);
                }

                // Repulsive forces
                for (var _u = 0; _u < vertices.length - 1; _u++) {
                    var vertexA = this.vertices[vertices[_u]];

                    for (var v = _u + 1; v < vertices.length; v++) {
                        var vertexB = this.vertices[vertices[v]];

                        var dx = vertexB.position.x - vertexA.position.x;
                        var dy = vertexB.position.y - vertexA.position.y;

                        if (dx === 0 || dy === 0) {
                            continue;
                        }

                        var dSq = dx * dx + dy * dy;
                        var d = Math.sqrt(dSq);

                        var force = kr / dSq;
                        var fx = force * dx / d;
                        var fy = force * dy / d;

                        if (!vertexA.positioned) {
                            forces[vertexA.id].x -= fx;
                            forces[vertexA.id].y -= fy;
                        }

                        if (!vertexB.positioned) {
                            forces[vertexB.id].x += fx;
                            forces[vertexB.id].y += fy;
                        }
                    }
                }

                // Repulsive forces ring centers
                if (ring.rings.length > 2) {
                    var ringCenters = new Array(ring.rings.length);

                    for (var _i19 = 0; _i19 < ring.rings.length; _i19++) {
                        ringCenters[_i19] = new Vector2();

                        for (var j = 0; j < ring.rings[_i19].members.length; j++) {
                            ringCenters[_i19].x += this.vertices[ring.rings[_i19].members[j]].position.x;
                            ringCenters[_i19].y += this.vertices[ring.rings[_i19].members[j]].position.y;
                        }

                        ringCenters[_i19].x /= ring.rings[_i19].members.length;
                        ringCenters[_i19].y /= ring.rings[_i19].members.length;

                        ring.rings[_i19].center.set(ringCenters[_i19].x, ringCenters[_i19].y);

                        for (var _u2 = 0; _u2 < ring.rings[_i19].members.length; _u2++) {
                            var _vertexA = this.vertices[ring.rings[_i19].members[_u2]];
                            var _dx = ringCenters[_i19].x - _vertexA.position.x;
                            var _dy = ringCenters[_i19].y - _vertexA.position.y;

                            if (_dx === 0 || _dy === 0) {
                                continue;
                            }

                            var _dSq = _dx * _dx + _dy * _dy;
                            var _d = Math.sqrt(_dSq);
                            var _force = kr / _dSq;

                            if (ring.rings[_i19].members.length === 5 || ring.rings[_i19].members.length === 6) {
                                _force *= 10;
                            }

                            var _fx = _force * _dx / _d;
                            var _fy = _force * _dy / _d;

                            if (!_vertexA.positioned) {
                                forces[_vertexA.id].x -= _fx;
                                forces[_vertexA.id].y -= _fy;
                            }
                        }
                    }
                }

                // Attractive forces
                for (var _u3 = 0; _u3 < vertices.length - 1; _u3++) {
                    var _vertexA2 = this.vertices[vertices[_u3]];

                    for (var _v = _u3 + 1; _v < vertices.length; _v++) {
                        var _vertexB = this.vertices[vertices[_v]];

                        if (!_vertexA2.isNeighbour(_vertexB.id)) {
                            continue;
                        }

                        var _dx2 = _vertexB.position.x - _vertexA2.position.x;
                        var _dy2 = _vertexB.position.y - _vertexA2.position.y;

                        if (_dx2 === 0 || _dy2 === 0) {
                            continue;
                        }

                        var _d2 = Math.sqrt(_dx2 * _dx2 + _dy2 * _dy2);

                        var _force2 = ks * (_d2 - l);

                        if (_d2 < l) {
                            _force2 *= 0.5;
                        } else {
                            _force2 *= 2.0;
                        }

                        var _fx2 = _force2 * _dx2 / _d2;
                        var _fy2 = _force2 * _dy2 / _d2;

                        if (!_vertexA2.positioned) {
                            forces[_vertexA2.id].x += _fx2;
                            forces[_vertexA2.id].y += _fy2;
                        }

                        if (!_vertexB.positioned) {
                            forces[_vertexB.id].x -= _fx2;
                            forces[_vertexB.id].y -= _fy2;
                        }
                    }
                }

                // Gravity

                for (var _u4 = 0; _u4 < vertices.length; _u4++) {
                    var _vertex5 = this.vertices[vertices[_u4]];
                    var _dx3 = center.x - _vertex5.position.x;
                    var _dy3 = center.y - _vertex5.position.y;

                    if (_dx3 === 0 || _dy3 === 0) {
                        continue;
                    }

                    var _d3 = Math.sqrt(_dx3 * _dx3 + _dy3 * _dy3);
                    var _force3 = g * (1 / _d3);
                    var _fx3 = _force3 * _dx3 / _d3;
                    var _fy3 = _force3 * _dy3 / _d3;

                    if (!_vertex5.positioned) {
                        forces[_vertex5.id].x += _fx3;
                        forces[_vertex5.id].y += _fy3;
                    }
                }

                // Move the vertex
                for (var _u5 = 0; _u5 < vertices.length; _u5++) {
                    var _vertex6 = this.vertices[vertices[_u5]];

                    if (_vertex6.positioned) {
                        continue;
                    }

                    var _dx4 = 0.1 * forces[_vertex6.id].x;
                    var _dy4 = 0.1 * forces[_vertex6.id].y;

                    var _dSq2 = _dx4 * _dx4 + _dy4 * _dy4;

                    // Avoid oscillations
                    if (_dSq2 > 500) {
                        var s = Math.sqrt(500 / _dSq2);
                        _dx4 = _dx4 * s;
                        _dy4 = _dy4 * s;
                    }

                    _vertex6.position.x += _dx4;
                    _vertex6.position.y += _dy4;
                }
            }

            for (var _u6 = 0; _u6 < vertices.length; _u6++) {
                this.vertices[vertices[_u6]].positioned = true;
            }

            for (var _u7 = 0; _u7 < vertices.length; _u7++) {
                var _vertex7 = this.vertices[vertices[_u7]];
                var parentVertex = this.vertices[_vertex7.parentVertexId];
                var _neighbours = _vertex7.getNeighbours();

                var angle = _vertex7.getAngle(null, true) - 60;
                for (var _i20 = 0; _i20 < _neighbours.length; _i20++) {
                    if (_vertex7.value.isBridge || parentVertex !== undefined && parentVertex.value.isBridge) {
                        console.log('angle', _neighbours[_i20]);
                        this.createBonds(this.vertices[_neighbours[_i20]], _vertex7, MathHelper.toRad(angle));
                    } else if (this.vertices[_neighbours[_i20]].value.rings.length === 0) {
                        // If there is a spiro, this will be handeled in create ring
                        // This here positiones the vertices going away from the outer ring
                        if (ring.rings.length > 2) {
                            center = this.getSubringCenter(ring, _vertex7);
                        }

                        this.createBonds(this.vertices[_neighbours[_i20]], _vertex7, center);
                    }

                    angle += 120;
                }
            }
        }
    }, {
        key: 'getSubringCenter',
        value: function getSubringCenter(ring, vertex) {
            for (var i = 0; i < ring.rings.length; i++) {
                var subring = ring.rings[i];
                for (var j = 0; j < subring.members.length; j++) {
                    if (subring.members[j] === vertex.id) {
                        console.log('returning subring center', subring.center);
                        return subring.center;
                    }
                }
            }

            return ring.center;
        }
    }, {
        key: 'drawEdges',
        value: function drawEdges(label) {
            var that = this;

            for (var i = 0; i < this.edges.length; i++) {
                var edge = this.edges[i];
                var vertexA = this.vertices[edge.sourceId];
                var vertexB = this.vertices[edge.targetId];
                var elementA = vertexA.value.element;
                var elementB = vertexB.value.element;
                var a = vertexA.position;
                var b = vertexB.position;
                var normals = this.getEdgeNormals(edge);
                var gradient = 'gradient' + vertexA.value.element.toUpperCase() + vertexB.value.element.toUpperCase();

                // Create a point on each side of the line
                var sides = ArrayHelper.clone(normals);
                ArrayHelper.each(sides, function (v) {
                    v.multiply(10);
                    v.add(a);
                });

                if (edge.bondType === '=' || this.getRingbondType(vertexA, vertexB) === '=') {
                    // Always draw double bonds inside the ring
                    var inRing = this.areVerticesInSameRing(vertexA, vertexB);
                    var s = this.chooseSide(vertexA, vertexB, sides);

                    if (inRing) {
                        // Always draw double bonds inside a ring
                        // if the bond is shared by two rings, it is drawn in the larger
                        // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
                        var lcr = this.getLargestCommonRing(vertexA, vertexB);
                        var center = lcr.center;

                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        // Choose the normal that is on the same side as the center
                        var line = null;
                        console.log('center', center);
                        if (center.sameSideAs(vertexA.position, vertexB.position, Vector2.add(a, normals[0]))) {
                            line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                        } else {
                            line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));
                        }

                        line.shorten(this.opts.bondLength - this.opts.shortBondLength);

                        // The shortened edge
                        this.line(line.from.x, line.from.y, line.to.x, line.to.y, elementA, elementB);

                        // The normal edge
                        this.line(a.x, a.y, b.x, b.y, elementA, elementB);
                    } else if (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
                        // Both lines are the same length here
                        // Add the spacing to the edges (which are of unit length)
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing / 2);
                        });

                        var line1 = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                        var line2 = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));

                        this.line(line1.from.x, line1.from.y, line1.to.x, line1.to.y, elementA, elementB);
                        this.line(line2.from.x, line2.from.y, line2.to.x, line2.to.y, elementA, elementB);
                    } else if (s.sideCount[0] > s.sideCount[1]) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        var line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                        line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        this.line(line.from.x, line.from.y, line.to.x, line.to.y, elementA, elementB);
                        this.line(a.x, a.y, b.x, b.y, elementA, elementB);
                    } else if (s.sideCount[0] < s.sideCount[1]) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        var line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));
                        line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        this.line(line.from.x, line.from.y, line.to.x, line.to.y, elementA, elementB);
                        this.line(a.x, a.y, b.x, b.y, elementA, elementB);
                    } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        var line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                        line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        this.line(line.from.x, line.from.y, line.to.x, line.to.y, elementA, elementB);
                        this.line(a.x, a.y, b.x, b.y, elementA, elementB);
                    } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
                        ArrayHelper.each(normals, function (v) {
                            v.multiply(that.opts.bondSpacing);
                        });

                        var line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));
                        line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        this.line(line.from.x, line.from.y, line.to.x, line.to.y, elementA, elementB);
                        this.line(a.x, a.y, b.x, b.y, elementA, elementB);
                    } else {}
                } else if (edge.bondType === '#') {
                    ArrayHelper.each(normals, function (v) {
                        v.multiply(that.opts.bondSpacing / 1.5);
                    });

                    var lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                    var lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));

                    lineA.shorten(this.opts.bondLength - this.opts.shortBondLength);
                    lineB.shorten(this.opts.bondLength - this.opts.shortBondLength);

                    this.line(lineA.from.x, lineA.from.y, lineA.to.x, lineA.to.y, elementA, elementB);
                    this.line(lineB.from.x, lineB.from.y, lineB.to.x, lineB.to.y, elementA, elementB);

                    this.line(a.x, a.y, b.x, b.y, elementA, elementB);
                } else {
                    this.line(a.x, a.y, b.x, b.y, elementA, elementB);
                }

                if (label) {
                    var midpoint = Vector2.midpoint(a, b);
                    this.debugText(midpoint.x, midpoint.y, 'id: ' + i);
                }
            }
        }
    }, {
        key: 'drawVertices',
        value: function drawVertices(label) {
            for (var i = 0; i < this.vertices.length; i++) {
                var vertex = this.vertices[i];
                var atom = vertex.value;
                var bondCount = this.getBondCount(vertex);

                var element = atom.element.length == 1 ? atom.element.toUpperCase() : atom.element;

                if (label) {
                    var value = vertex.id + ' ' + ArrayHelper.print(atom.ringbonds);
                    this.debugText(vertex.position.x, vertex.position.y, 'id: ' + value);
                }

                var hydrogens = this.maxBonds[element] - bondCount;

                if (atom.bracket) {
                    hydrogens = atom.bracket.hcount;
                }

                var charge = 0;

                if (atom.bracket) {
                    charge = atom.bracket.charge;
                }

                if (vertex.isTerminal()) {
                    var dir = vertex.getTextDirection(this.vertices);
                    this.text(vertex.position.x, vertex.position.y, element, 'element ' + atom.element.toLowerCase(), true, hydrogens, dir, true, charge);
                } else if (atom.element.toLowerCase() !== 'c') {
                    var dir = vertex.getTextDirection(this.vertices);
                    this.text(vertex.position.x, vertex.position.y, element, 'element ' + atom.element.toLowerCase(), true, hydrogens, dir, false, charge);
                }
            }

            // Draw the ring centers for debug purposes
            if (this.opts.debug) {
                for (var i = 0; i < this.rings.length; i++) {
                    this.drawPoint(this.rings[i].center, 'id: ' + this.rings[i].id);
                }
            }

            // Draw ring for benzenes
            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];

                if (ring.isAromatic(this.vertices)) {
                    this.ctx.save();
                    this.ctx.strokeStyle = this.colors['C'];
                    this.ctx.lineWidth = 1.5;
                    this.ctx.beginPath();
                    this.ctx.arc(ring.center.x + this.offsetX, ring.center.y + this.offsetY, ring.radius - 10, 0, Math.PI * 2, true);
                    this.ctx.closePath();
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
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

            this.createBonds(this.vertices[startVertex]);

            // Atoms bonded to the same ring atom
            this.resolvePrimaryOverlaps();
        }
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

            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];
                this.backupRings.push(ring.clone());
                ring.positioned = false;
                ring.center = new Vector2();
            }
        }
    }, {
        key: 'restorePositions',
        value: function restorePositions() {
            for (var i = 0; i < this.backupVertices.length; i++) {
                this.vertices[i] = this.backupVertices[i];
            }

            for (var i = 0; i < this.backupRings.length; i++) {
                this.rings[i] = this.backupRings[i];
            }
        }

        // TODO: This needs some cleaning up

    }, {
        key: 'createRing',
        value: function createRing(ring, center, start, previous) {
            var that = this;

            if (ring.positioned) {
                return;
            }

            var orderedNeighbours = ring.getOrderedNeighbours(this.ringConnections);

            center = center ? center : new Vector2(0, 0);
            var startingAngle = start ? Vector2.subtract(start.position, center).angle() : 0;

            var radius = MathHelper.polyCircumradius(that.opts.bondLength, ring.getSize());
            ring.radius = radius;

            var angle = MathHelper.centralAngle(ring.getSize());
            ring.centralAngle = angle;

            var a = startingAngle;
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
            }, start ? start.id : null, previous ? previous.id : null);

            // If the ring is bridged, then draw the vertices inside the ring
            // using a force based approach
            if (ring.isBridged) {
                var allVertices = ArrayHelper.merge(ring.members, ring.insiders);
                this.forceLayout(allVertices, center, start.id, ring);
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
                    // This ring is a fused ring
                    ring.isFused = true;
                    neighbour.isFused = true;

                    var vertexA = this.vertices[vertices[0]];
                    var vertexB = this.vertices[vertices[1]];

                    // Get middle between vertex A and B
                    var midpoint = Vector2.midpoint(vertexA.position, vertexB.position);

                    // Get the normals to the line between A and B
                    var normals = Vector2.normals(vertexA.position, vertexB.position);

                    // Normalize the normals
                    ArrayHelper.each(normals, function (v) {
                        v.normalize();
                    });

                    // Set length from middle of side to center (the apothem)
                    var r = MathHelper.polyCircumradius(that.opts.bondLength, neighbour.getSize());
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

                    if (this.isPointInRing(nextCenter)) {
                        nextCenter = normals[1];
                    }

                    // Get the vertex (A or B) which is in clock-wise direction of the other
                    var posA = Vector2.subtract(vertexA.position, nextCenter);
                    var posB = Vector2.subtract(vertexB.position, nextCenter);

                    if (posA.clockwise(posB) === -1) {
                        this.createRing(neighbour, nextCenter, vertexA, vertexB);
                    } else {
                        this.createRing(neighbour, nextCenter, vertexB, vertexA);
                    }
                } else if (vertices.length == 1) {
                    // This ring is a spiro
                    ring.isSpiro = true;
                    neighbour.isSpiro = true;

                    var vertexA = this.vertices[vertices[0]];

                    // Get the vector pointing from the shared vertex to the new center
                    var nextCenter = Vector2.subtract(center, vertexA.position);
                    nextCenter.invert();
                    nextCenter.normalize();

                    // Get the distance from the vertex to the center
                    var r = MathHelper.polyCircumradius(that.opts.bondLength, neighbour.getSize());
                    nextCenter.multiply(r);
                    nextCenter.add(vertexA.position);
                    this.createRing(neighbour, nextCenter, vertexA);
                }
            }

            // Next, draw atoms that are not part of a ring that are directly attached to this ring
            for (var i = 0; i < ring.members.length; i++) {
                var ringMember = this.vertices[ring.members[i]];
                var ringMemberNeighbours = ringMember.getNeighbours();

                // If there are multiple, the ovlerap will be resolved in the appropriate step
                for (var j = 0; j < ringMemberNeighbours.length; j++) {
                    if (ring.thisOrNeighboursContain(this.rings, ringMemberNeighbours[j])) {
                        continue;
                    }

                    var v = this.vertices[ringMemberNeighbours[j]];
                    this.createBonds(v, ringMember, ring.center);
                }
            }
        }
    }, {
        key: 'rotateSubtree',
        value: function rotateSubtree(vertexId, parentVertexId, angle, center) {
            var that = this;

            this.traverseTree(parentVertexId, vertexId, function (vertex) {
                vertex.position.rotateAround(angle, center);

                for (var i = 0; i < vertex.value.anchoredRings.length; i++) {
                    that.rings[vertex.value.anchoredRings[i]].center.rotateAround(angle, center);
                }
            });
        }
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

            for (var i = 0; i < sharedSideChains.length; i++) {
                var chain = sharedSideChains[i];
                var angle = -chain.vertex.position.getRotateToAngle(chain.other.position, chain.common.position);
                this.rotateSubtree(chain.vertex.id, chain.common.id, angle + Math.PI, chain.common.position);
            }

            for (var i = 0; i < overlaps.length; i++) {
                var overlap = overlaps[i];

                if (overlap.vertices.length == 1) {
                    var a = overlap.vertices[0];

                    if (a.getNeighbours().length == 1) {
                        a.flippable = true;
                        a.flipCenter = overlap.common.id;

                        for (var j = 0; j < overlap.rings.length; j++) {
                            a.flipRings.push(overlap.rings[j]);
                        }
                    }
                } else if (overlap.vertices.length == 2) {
                    var angle = (2 * Math.PI - this.getRing(overlap.rings[0]).getAngle()) / 6.0;
                    var a = overlap.vertices[0];
                    var b = overlap.vertices[1];
                    a.backAngle -= angle;
                    b.backAngle += angle;
                    this.rotateSubtree(a.id, overlap.common.id, angle, overlap.common.position);
                    this.rotateSubtree(b.id, overlap.common.id, -angle, overlap.common.position);

                    if (a.getNeighbours().length == 1) {
                        a.flippable = true;
                        a.flipCenter = overlap.common.id;
                        a.flipNeighbour = b.id;

                        for (var j = 0; j < overlap.rings.length; j++) {
                            a.flipRings.push(overlap.rings[j]);
                        }
                    }
                    if (b.getNeighbours().length == 1) {
                        b.flippable = true;
                        b.flipCenter = overlap.common.id;
                        b.flipNeighbour = a.id;

                        for (var j = 0; j < overlap.rings.length; j++) {
                            b.flipRings.push(overlap.rings[j]);
                        }
                    }
                }
            }
        }
    }, {
        key: 'resolveSecondaryOverlaps',
        value: function resolveSecondaryOverlaps(scores) {
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].score > this.opts.bondLength / 5) {
                    var vertex = this.vertices[scores[i].id];

                    if (vertex.flippable) {
                        // Rings that get concatenated in to a bridge one, will be undefined here ...
                        var a = vertex.flipRings[0] ? this.rings[vertex.flipRings[0]] : null;
                        var b = vertex.flipRings[1] ? this.rings[vertex.flipRings[1]] : null;
                        var flipCenter = this.vertices[vertex.flipCenter].position;

                        // Make a always the bigger ring than b
                        if (a && b) {
                            var tmp = a.members.length > b.members.length ? a : b;
                            b = a.members.length < b.members.length ? a : b;
                            a = tmp;
                        }

                        if (a && a.allowsFlip()) {
                            vertex.position.rotateTo(a.center, flipCenter);
                            a.setFlipped();

                            if (vertex.flipNeighbour !== null) {
                                // It's better to not straighten the other one, since it will possibly overlap
                                // var flipNeighbour = this.vertices[vertex.flipNeighbour];
                                // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                            }
                        } else if (b && b.allowsFlip()) {
                            vertex.position.rotateTo(b.center, flipCenter);
                            b.setFlipped();

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

        // Since javascript overloading is a pain, the attribute ringOrAngle is an angle or a ring
        // depending on the context of the caller

    }, {
        key: 'createBonds',
        value: function createBonds(vertex, previous, ringOrAngle, dir) {
            if (vertex.positioned) {
                return;
            }

            // If the current node is the member of one ring, then point straight away
            // from the center of the ring. However, if the current node is a member of
            // two rings, point away from the middle of the centers of the two rings
            if (!previous) {
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
            } else if (previous.value.rings.length == 0 && !vertex.value.isBridge) {
                // Here, ringOrAngle is always an angle

                // If the previous vertex was not part of a ring, draw a bond based
                // on the global angle of the previous bond
                var v = new Vector2(this.opts.bondLength, 0);
                v.rotate(ringOrAngle);
                v.add(previous.position);

                vertex.position = v;
                vertex.previousPosition = previous.position;
                vertex.positioned = true;
            } else if (previous.value.isBridgeNode && vertex.value.isBridge) {
                // If the previous atom is in a bridged ring and this one is inside the ring
                var targets = this.getTargets(vertex.id, previous.id, vertex.value.bridgedRing);

                var pos = Vector2.subtract(ringOrAngle, previous.position);
                pos.normalize();

                // Unlike with the ring, do not multiply with radius but with bond length
                pos.multiply(this.opts.bondLength);
                vertex.position.add(previous.position);
                vertex.position.add(pos);

                vertex.previousPosition = previous.position;
                vertex.positioned = true;
            } else if (vertex.value.isBridge) {
                // The previous atom is in a bridged ring and this one is in it as well
                var targets = this.getTargets(vertex.id, previous.id, vertex.value.bridgedRing);
                var v = new Vector2(this.opts.bondLength, 0);
                v.rotate(ringOrAngle);
                v.add(previous.position);

                vertex.position = v;
                vertex.previousPosition = previous.position;
                vertex.positioned = true;
            } else if (previous.value.rings.length == 1) {
                // Here, ringOrAngle is always a ring (THIS IS CURRENTLY NOT TRUE - WHY?)
                // Use the same approach es with rings that are connected at one vertex
                // and draw the atom in the opposite direction of the center.
                var pos = Vector2.subtract(ringOrAngle, previous.position);

                pos.invert();
                pos.normalize();
                // Unlike with the ring, do not multiply with radius but with bond length
                pos.multiply(this.opts.bondLength);

                vertex.position.add(previous.position);
                vertex.position.add(pos);
                vertex.previousPosition = previous.position;
                vertex.positioned = true;
            } else if (previous.value.rings.length == 2) {
                // Here, ringOrAngle is always a ring
                var ringA = this.getRing(previous.value.rings[0]);
                var ringB = this.getRing(previous.value.rings[1]);

                // Project the current vertex onto the vector between the two centers to
                // get the direction
                var a = Vector2.subtract(ringB.center, ringA.center);
                var b = Vector2.subtract(previous.position, ringA.center);
                var s = Vector2.scalarProjection(b, a);

                a.normalize();
                a.multiply(s);
                a.add(ringA.center);

                var pos = Vector2.subtract(a, previous.position);
                pos.invert();
                pos.normalize();
                pos.multiply(this.opts.bondLength);

                vertex.position.add(previous.position);
                vertex.position.add(pos);
                vertex.previousPosition = previous.position;
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

                if (previous) {
                    neighbours = ArrayHelper.remove(neighbours, previous.id);
                }

                var angle = vertex.getAngle();

                if (neighbours.length == 1) {
                    var nextVertex = this.vertices[neighbours[0]];

                    // Make a single chain always cis except when there's a tribble bond
                    if (vertex.value.bondType === '#' || previous && previous.value.bondType === '#') {
                        nextVertex.angle = angle;
                        this.createBonds(nextVertex, vertex, nextVertex.angle, -dir);
                    } else {
                        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

                        if (!dir) {
                            dir = plusOrMinus;
                        }

                        nextVertex.angle = MathHelper.toRad(60) * dir;
                        this.createBonds(nextVertex, vertex, angle + nextVertex.angle, -dir);
                    }
                } else if (neighbours.length == 2) {
                    // Check for the longer subtree - always go with cis for the longer subtree
                    var subTreeDepthA = this.getTreeDepth(vertex.id, neighbours[0]);
                    var subTreeDepthB = this.getTreeDepth(vertex.id, neighbours[1]);

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

                        this.createBonds(transVertex, vertex, angle + transVertex.angle);
                        this.createBonds(cisVertex, vertex, angle + cisVertex.angle);
                    } else {
                        var cisVertex = this.vertices[neighbours[cis]];
                        var transVertex = this.vertices[neighbours[trans]];

                        transVertex.angle = -MathHelper.toRad(60);
                        cisVertex.angle = MathHelper.toRad(60);

                        this.createBonds(cisVertex, vertex, angle + cisVertex.angle);
                        this.createBonds(transVertex, vertex, angle + transVertex.angle);
                    }
                } else if (neighbours.length == 3) {
                    // The vertex with the longest sub-tree should always go straight
                    var d1 = this.getTreeDepth(vertex.id, neighbours[0]);
                    var d2 = this.getTreeDepth(vertex.id, neighbours[1]);
                    var d3 = this.getTreeDepth(vertex.id, neighbours[2]);

                    var s = this.vertices[neighbours[0]];
                    var l = this.vertices[neighbours[1]];
                    var r = this.vertices[neighbours[2]];

                    if (d2 > d1 && d2 > d3) {
                        s = this.vertices[neighbours[1]];
                        l = this.vertices[neighbours[0]];
                        r = this.vertices[neighbours[2]];
                    } else if (d3 > d1 && d3 > d2) {
                        s = this.vertices[neighbours[2]];
                        l = this.vertices[neighbours[0]];
                        r = this.vertices[neighbours[1]];
                    }

                    this.createBonds(s, vertex, angle);
                    this.createBonds(l, vertex, angle + MathHelper.toRad(90));
                    this.createBonds(r, vertex, angle - MathHelper.toRad(90));
                } else if (neighbours.length == 4) {
                    // The vertex with the longest sub-tree should always go to the reflected opposide direction
                    var d1 = this.getTreeDepth(vertex.id, neighbours[0]);
                    var d2 = this.getTreeDepth(vertex.id, neighbours[1]);
                    var d3 = this.getTreeDepth(vertex.id, neighbours[2]);
                    var d4 = this.getTreeDepth(vertex.id, neighbours[3]);

                    var w = this.vertices[neighbours[0]];
                    var x = this.vertices[neighbours[1]];
                    var y = this.vertices[neighbours[2]];
                    var z = this.vertices[neighbours[3]];

                    if (d2 > d1 && d2 > d3 && d2 > d4) {
                        w = this.vertices[neighbours[1]];
                        x = this.vertices[neighbours[0]];
                        y = this.vertices[neighbours[2]];
                        z = this.vertices[neighbours[3]];
                    } else if (d3 > d1 && d3 > d2 && d3 > d4) {
                        w = this.vertices[neighbours[2]];
                        x = this.vertices[neighbours[0]];
                        y = this.vertices[neighbours[1]];
                        z = this.vertices[neighbours[3]];
                    } else if (d4 > d1 && d4 > d2 && d4 > d3) {
                        w = this.vertices[neighbours[3]];
                        x = this.vertices[neighbours[0]];
                        y = this.vertices[neighbours[1]];
                        z = this.vertices[neighbours[2]];
                    }

                    this.createBonds(w, vertex, angle - MathHelper.toRad(36));
                    this.createBonds(x, vertex, angle + MathHelper.toRad(36));
                    this.createBonds(y, vertex, angle - MathHelper.toRad(108));
                    this.createBonds(z, vertex, angle + MathHelper.toRad(108));
                }
            }
        }

        /**
        * Inside a bridged ring, find the target atoms of the ring further atoms have to
        * connect to.
        **/

    }, {
        key: 'getTargets',
        value: function getTargets(vertex, previous, ring) {
            var that = this;
            var targets = new Array();

            // TODO: This recursion can go into a loop if there is a "ring" inside a bridged ring
            var recurse = function recurse(v, p) {
                var neighbours = that.vertices[v].getNeighbours();

                for (var i = 0; i < neighbours.length; i++) {
                    var neighbour = that.vertices[neighbours[i]];

                    if (neighbour.id === p) {
                        continue;
                    } else if (neighbour.value.isBridge) {
                        recurse(neighbour.id, v);
                    } else if (neighbour.value.hasRing(ring)) {
                        targets.push(neighbour.id);
                    }
                }
            };

            recurse(vertex, previous);
            return targets;
        }

        // Gets the vertex sharing the edge that is the common bond of two rings

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
        }
    }, {
        key: 'isPointInRing',
        value: function isPointInRing(v) {
            for (var i = 0; i < this.rings.length; i++) {
                var polygon = this.rings[i].getPolygon(this.vertices);

                if (v.isInPolygon(polygon)) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: 'isEdgeInRing',
        value: function isEdgeInRing(edge) {
            var source = this.vertices[edge.sourceId];
            var target = this.vertices[edge.targetId];

            return this.areVerticesInSameRing(source, target);
        }
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
    }, {
        key: 'isEdgeInAromaticRing',
        value: function isEdgeInAromaticRing(edge) {
            return this.isVertexInAromaticRing(edge.sourceId) && this.isVertexInAromaticRing(edge.targetId);
        }
    }, {
        key: 'isVertexInAromaticRing',
        value: function isVertexInAromaticRing(vertex) {
            var element = this.vertices[vertex].value.element;

            return element == element.toLowerCase();
        }
    }, {
        key: 'getEdgeNormals',
        value: function getEdgeNormals(edge) {
            var a = this.vertices[edge.sourceId].position;
            var b = this.vertices[edge.targetId].position;

            // Get the normals for the edge
            var normals = Vector2.normals(a, b);

            // Normalize the normals
            ArrayHelper.each(normals, function (v) {
                v.normalize();
            });

            return normals;
        }
    }, {
        key: 'getNormals',
        value: function getNormals(a, b) {
            var a = a.position;
            var b = b.position;

            // Get the normals for the edge
            var normals = Vector2.normals(a, b);

            // Normalize the normals
            ArrayHelper.each(normals, function (v) {
                v.normalize();
            });

            return normals;
        }
    }, {
        key: 'getTreeDepth',
        value: function getTreeDepth(parentVertexId, vertexId) {
            var neighbours = this.vertices[vertexId].getSpanningTreeNeighbours(parentVertexId);
            var max = 0;

            for (var i = 0; i < neighbours.length; i++) {
                var childId = neighbours[i];
                var d = this.getTreeDepth(vertexId, childId);

                if (d > max) {
                    max = d;
                }
            }

            return max + 1;
        }
    }, {
        key: 'traverseTree',
        value: function traverseTree(parentVertexId, vertexId, callback) {
            var vertex = this.vertices[vertexId];
            var neighbours = vertex.getSpanningTreeNeighbours(parentVertexId);

            callback(vertex);

            for (var i = 0; i < neighbours.length; i++) {
                this.traverseTree(vertexId, neighbours[i], callback);
            }
        }
    }, {
        key: 'getMaxDepth',
        value: function getMaxDepth(v, previous, depth) {
            depth = depth ? depth : 0;

            var neighbours = v.getNeighbours();
            var max = 0;

            for (var i = 0; i < neighbours.length; i++) {
                if (neighbours[i] == previous.id) {
                    continue;
                }

                var next = this.vertices[neighbours[i]];
                var d = 0;

                // If there is a ring, make it very expensive and stop recursion
                if (next.value.getRingbondCount() > 0) {
                    d = 100;
                } else {
                    d = this.getMaxDepth(this.vertices[neighbours[i]], v, depth + 1);
                }

                if (d > max) {
                    max = d;
                }
            }

            return max;
        }
    }, {
        key: 'getBondCount',
        value: function getBondCount(vertex) {
            var count = 0;

            for (var i = 0; i < vertex.edges.length; i++) {
                count += this.edges[vertex.edges[i]].getBondCount();
            }

            return count;
        }
    }, {
        key: 'getNonRingNeighbours',
        value: function getNonRingNeighbours(v) {
            var nrneighbours = [];
            var vertex = this.vertices[v];
            var neighbours = vertex.getNeighbours();

            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = this.vertices[neighbours[i]];
                var lenIntersections = ArrayHelper.intersection(vertex.value.rings, neighbour.value.rings).length;

                if (lenIntersections === 0 && neighbour.value.isBridge == false) {
                    nrneighbours.push(neighbour);
                }
            }

            return nrneighbours;
        }
    }]);

    return SmilesDrawer;
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