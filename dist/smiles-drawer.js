(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Drawer = require('./src/Drawer.js');

var _Drawer2 = _interopRequireDefault(_Drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The SmilesDrawer namespace.
 * @typicalname SmilesDrawer
 */
var SmilesDrawer = {
    Version: '1.0.0'
};

/**
* Cleans a SMILES string (removes non-valid characters)
*
* @static
* @param {String} smiles A SMILES string.
* @returns {String} The clean SMILES string.
*/
//@ts-check
SmilesDrawer.clean = function (smiles) {
    return smiles.replace(/[^A-Za-z0-9@\.\+\-\?!\(\)\[\]\{\}/\\=#\$:\*]/g, '');
};

/**
* Applies the smiles drawer draw function to each canvas element that has a smiles string in the data-smiles attribute.
*
* @static
* @param {Object} options SmilesDrawer options.
* @param {String} [selector='canvas[data-smiles]'] Selectors for the draw areas (canvas elements).
* @param {String} [themeName='light'] The theme to apply.
* @param {Function} [onError='null'] A callback function providing an error object.
*/
SmilesDrawer.apply = function (options) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'canvas[data-smiles]';
    var themeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'light';
    var onError = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var smilesDrawer = new _Drawer2.default(options);
    var elements = document.querySelectorAll(selector);

    var _loop = function _loop() {
        var element = elements[i];

        SmilesDrawer.parse(element.getAttribute('data-smiles'), function (tree) {
            smilesDrawer.draw(tree, element, themeName, false);
        }, function (err) {
            if (onError) {
                onError(err);
            }
        });
    };

    for (var i = 0; i < elements.length; i++) {
        _loop();
    }
};

/**
* Parses the entered smiles string.
* 
* @static
* @param {String} smiles A SMILES string.
* @param {Function} successCallback A callback that is called on success with the parse tree.
* @param {Function} errorCallback A callback that is called with the error object on error.
*/
SmilesDrawer.parse = function (smiles, successCallback, errorCallback) {
    try {
        if (successCallback) {
            successCallback(SmilesDrawer.Parser.parse(smiles));
        }
    } catch (err) {
        if (errorCallback) {
            errorCallback(err);
        }
    }
};

// There be dragons (polyfills)

if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function value(_value) {

            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            var O = Object(this);

            // Steps 3-5.
            var len = O.length >>> 0;

            // Steps 6-7.
            var start = arguments[1];
            var relativeStart = start >> 0;

            // Step 8.
            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

            // Steps 9-10.
            var end = arguments[2];
            var relativeEnd = end === undefined ? len : end >> 0;

            // Step 11.
            var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
                O[k] = _value;
                k++;
            }

            // Step 13.
            return O;
        }
    });
}

},{"./src/Drawer.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //@ts-check


var _MathHelper = require('./MathHelper');

var _MathHelper2 = _interopRequireDefault(_MathHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * The main class of the application representing the smiles drawer 
 * 
 * @property {SmilesDrawer.Graph} graph The graph associated with this SmilesDrawer.Drawer instance.
 * @property {Number} ringIdCounter An internal counter to keep track of ring ids.
 * @property {Number} ringConnectionIdCounter An internal counter to keep track of ring connection ids.
 * @property {SmilesDrawer.CanvasWrapper} canvasWrapper The SmilesDrawer.CanvasWrapper associated with this SmilesDrawer.Drawer instance.
 * @property {Number} totalOverlapScore The current internal total overlap score.
 * @property {Object} defaultOptions The default options.
 * @property {Object} opts The merged options.
 * @property {Object} theme The current theme.
 */
var Drawer = function () {
  /**
   * The constructor for the class SmilesDrawer.
   *
   * @param {Object} options An object containing custom values for different options. It is merged with the default options.
   */
  function Drawer(options) {
    _classCallCheck(this, Drawer);

    this.graph = null;
    this.ringIdCounter = 0;
    this.ringConnectionIdCounter = 0;
    this.canvasWrapper = null;
    this.totalOverlapScore = 0;

    this.defaultOptions = {
      width: 500,
      height: 500,
      bondThickness: 0.6, // TODO: Add to doc
      bondLength: 14.4,
      shortBondLength: 0.85 * 14.4,
      bondSpacing: 0.18 * 14.4,
      atomVisualization: 'default',
      isomeric: false,
      debug: false,
      terminalCarbons: false,
      explicitHydrogens: true, // TODO: Add to doc
      compactDrawing: true,
      fontSizeLarge: 6,
      fontSizeSmall: 4,
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
          H: '#fff',
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
          H: '#222',
          BACKGROUND: '#fff'
        }
      }
    };

    this.opts = this.extend(true, this.defaultOptions, options);
    this.opts.halfBondSpacing = this.opts.bondSpacing / 2.0;
    this.opts.bondLengthSq = this.opts.bondLength * this.opts.bondLength;
    this.opts.halfFontSizeLarge = this.opts.fontSizeLarge / 2.0;
    this.opts.quarterFontSizeLarge = this.opts.fontSizeLarge / 4.0;
    this.opts.fifthFontSizeSmall = this.opts.fontSizeSmall / 5.0;

    // Set the default theme.
    this.theme = this.opts.themes.dark;
  }

  /**
   * A helper method to extend the default options with user supplied ones.
   */


  _createClass(Drawer, [{
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
     * @param {Object} data The tree returned by the smiles parser.
     * @param {String|HTMLElement} target The id of the HTML canvas element the structure is drawn to - or the element itself.
     * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
     * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
     */
    value: function draw(data, target) {
      var themeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'light';
      var infoOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      this.data = data;
      this.canvasWrapper = new SmilesDrawer.CanvasWrapper(target, this.opts.themes[themeName], this.opts);
      this.infoOnly = infoOnly;

      this.ringIdCounter = 0;
      this.ringConnectionIdCounter = 0;

      this.graph = new SmilesDrawer.Graph(data, this.opts.isomeric);
      this.rings = [];
      this.ringConnections = [];

      this.originalRings = [];
      this.originalRingConnections = [];

      this.bridgedRing = false;

      this.initRings();
      this.annotateStereochemistry();

      if (!this.opts.explicitHydrogens) {
        for (var i = 0; i < this.graph.vertices.length; i++) {
          if (this.graph.vertices[i].value.element === 'H') {
            this.graph.vertices[i].value.isDrawn = false;
          }
        }
      }

      if (this.opts.isomeric) {
        this.annotateStereochemistry();
      }

      if (!this.infoOnly) {
        this.position();

        // Restore the ring information (removes bridged rings and replaces them with the original, multiple, rings)
        this.restoreRingInformation();

        // Atoms bonded to the same ring atom
        this.resolvePrimaryOverlaps();

        var overlapScore = this.getOverlapScore();

        this.totalOverlapScore = this.getOverlapScore().total;

        for (var i = 0; i < this.graph.edges.length; i++) {
          var edge = this.graph.edges[i];

          if (this.isEdgeRotatable(edge)) {
            var subTreeDepthA = this.getTreeDepth(edge.sourceId, edge.targetId);
            var subTreeDepthB = this.getTreeDepth(edge.targetId, edge.sourceId);

            // Only rotate the shorter subtree
            var a = edge.targetId;
            var b = edge.sourceId;

            if (subTreeDepthA > subTreeDepthB) {
              a = edge.sourceId;
              b = edge.targetId;
            }

            var subTreeOverlap = this.getSubtreeOverlapScore(b, a, overlapScore.vertexScores);

            if (subTreeOverlap.value > 1.0) {
              var vertexA = this.graph.vertices[a];
              var vertexB = this.graph.vertices[b];
              var neighbours = vertexB.getNeighbours(a);

              if (neighbours.length === 1) {
                var neighbour = this.graph.vertices[neighbours[0]];
                var angle = neighbour.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, _MathHelper2.default.toRad(120));

                this.rotateSubtree(neighbour.id, vertexB.id, angle, vertexB.position);

                // If the new overlap is bigger, undo change
                var newTotalOverlapScore = this.getOverlapScore().total;

                if (newTotalOverlapScore > this.totalOverlapScore) {
                  this.rotateSubtree(neighbour.id, vertexB.id, -angle, vertexB.position);
                } else {
                  this.totalOverlapScore = newTotalOverlapScore;
                }
              } else if (neighbours.length == 2) {
                // Switch places / sides
                // If vertex a is in a ring, do nothing
                if (vertexB.value.rings.length + vertexA.value.rings.length > 0) {
                  continue;
                }

                var neighbourA = this.graph.vertices[neighbours[0]];
                var neighbourB = this.graph.vertices[neighbours[1]];

                var angleA = neighbourA.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, _MathHelper2.default.toRad(120));
                var angleB = neighbourB.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, _MathHelper2.default.toRad(120));

                this.rotateSubtree(neighbourA.id, vertexB.id, angleA, vertexB.position);
                this.rotateSubtree(neighbourB.id, vertexB.id, angleB, vertexB.position);

                var _newTotalOverlapScore = this.getOverlapScore().total;

                if (_newTotalOverlapScore > this.totalOverlapScore) {
                  this.rotateSubtree(neighbourA.id, vertexB.id, -angleA, vertexB.position);
                  this.rotateSubtree(neighbourB.id, vertexB.id, -angleB, vertexB.position);
                } else {
                  this.totalOverlapScore = _newTotalOverlapScore;
                }
              }

              overlapScore = this.getOverlapScore();
            }
          }
        }

        this.resolveSecondaryOverlaps(overlapScore.scores);

        // Set the canvas to the appropriate size
        this.canvasWrapper.scale(this.graph.vertices);

        // Initialize pseudo elements or shortcuts
        if (this.opts.compactDrawing && this.opts.atomVisualization === 'default') {
          this.initPseudoElements();
        }

        // Do the actual drawing
        this.drawEdges(this.opts.debug);
        this.drawVertices(this.opts.debug);
        this.canvasWrapper.reset();
      }
    }

    /**
     * Returns the number of rings this edge is a part of.
     *
     * @param {Number} edgeId The id of an edge.
     * @returns {Number} The number of rings the provided edge is part of.
     */

  }, {
    key: 'edgeRingCount',
    value: function edgeRingCount(edgeId) {
      var edge = this.graph.edges[edgeId];
      var a = this.graph.vertices[edge.sourceId];
      var b = this.graph.vertices[edge.targetId];

      return Math.min(a.value.rings.length, b.value.rings.length);
    }

    /**
     * Returns an array containing the bridged rings associated with this  molecule.
     *
     * @returns {SmilesDrawer.Ring[]} An array containing all bridged rings associated with this molecule.
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
     * @returns {SmilesDrawer.Ring[]} An array containing all fused rings associated with this molecule.
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
     * @returns {SmilesDrawer.Ring[]} An array containing all spiros associated with this molecule.
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
     * Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings)
     *
     * @returns {String} A string as described in the method description.
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
        result += '\n';
      }

      return result;
    }

    /**
     * Returns the total overlap score of the current molecule.
     *
     * @returns {Number} The overlap score.
     */

  }, {
    key: 'getTotalOverlapScore',
    value: function getTotalOverlapScore() {
      return this.totalOverlapScore;
    }

    /**
     * Returns the ring count of the current molecule.
     *
     * @returns {Number} The ring count.
     */

  }, {
    key: 'getRingCount',
    value: function getRingCount() {
      return this.rings.length;
    }

    /**
     * Checks whether or not the current molecule  a bridged ring.
     *
     * @returns {Boolean} A boolean indicating whether or not the current molecule  a bridged ring.
     */

  }, {
    key: 'hasBridgedRing',
    value: function hasBridgedRing() {
      return this.bridgedRing;
    }

    /**
     * Returns the number of heavy atoms (non-hydrogen) in the current molecule.
     *
     * @returns {Number} The heavy atom count.
     */

  }, {
    key: 'getHeavyAtomCount',
    value: function getHeavyAtomCount() {
      var hac = 0;

      for (var i = 0; i < this.graph.vertices.length; i++) {
        if (this.graph.vertices[i].value.element !== 'H') {
          hac++;
        }
      }

      return hac;
    }

    /**
     * Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.
     *
     * @param {SmilesDrawer.Vertex} vertexA A vertex.
     * @param {SmilesDrawer.Vertex} vertexB A vertex.
     * @returns {String|null} Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.
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
          if (vertexA.value.ringbonds[i].id === vertexB.value.ringbonds[j].id) {
            // If the bonds are equal, it doesn't matter which bond is returned.
            // if they are not equal, return the one that is not the default ("-")
            if (vertexA.value.ringbonds[i].bondType === '-') {
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
     */

  }, {
    key: 'initRings',
    value: function initRings() {
      var openBonds = new Map();

      // Close the open ring bonds (spanning tree -> graph)
      for (var i = this.graph.vertices.length - 1; i >= 0; i--) {
        var vertex = this.graph.vertices[i];

        if (vertex.value.ringbonds.length === 0) {
          continue;
        }

        for (var j = 0; j < vertex.value.ringbonds.length; j++) {
          var ringbondId = vertex.value.ringbonds[j].id;

          // If the other ringbond id has not been discovered,
          // add it to the open bonds map and continue.
          // if the other ringbond id has already been discovered,
          // create a bond between the two atoms.
          if (!openBonds.has(ringbondId)) {
            openBonds.set(ringbondId, vertex.id);
          } else {
            var sourceVertexId = vertex.id;
            var targetVertexId = openBonds.get(ringbondId);
            var edgeId = this.graph.addEdge(new SmilesDrawer.Edge(sourceVertexId, targetVertexId, 1));
            var targetVertex = this.graph.vertices[targetVertexId];

            vertex.addChild(targetVertexId);
            vertex.value.addNeighbouringElement(targetVertex.value.element);
            targetVertex.addChild(sourceVertexId);
            targetVertex.value.addNeighbouringElement(vertex.value.element);
            vertex.edges.push(edgeId);
            targetVertex.edges.push(edgeId);

            openBonds.delete(ringbondId);
          }
        }
      }

      // Get the rings in the graph (the SSSR)
      var rings = SmilesDrawer.SSSR.getRings(this.graph);

      if (rings === null) {
        return;
      }

      for (var i = 0; i < rings.length; i++) {
        var ringVertices = [].concat(_toConsumableArray(rings[i]));
        var ringId = this.addRing(new SmilesDrawer.Ring(ringVertices));

        // Add the ring to the atoms
        for (var j = 0; j < ringVertices.length; j++) {
          this.graph.vertices[ringVertices[j]].value.rings.push(ringId);
        }
      }

      // Find connection between rings
      // Check for common vertices and create ring connections. This is a bit
      // ugly, but the ringcount is always fairly low (< 100)
      for (var i = 0; i < this.rings.length - 1; i++) {
        for (var j = i + 1; j < this.rings.length; j++) {
          var a = this.rings[i];
          var b = this.rings[j];
          var ringConnection = new SmilesDrawer.RingConnection(a, b);

          // If there are no vertices in the ring connection, then there
          // is no ring connection
          if (ringConnection.vertices.size > 0) {
            this.addRingConnection(ringConnection);
          }
        }
      }

      // Add neighbours to the rings
      for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];
        ring.neighbours = SmilesDrawer.RingConnection.getNeighbours(this.ringConnections, ring.id);
      }

      // Anchor the ring to one of it's members, so that the ring center will always
      // be tied to a single vertex when doing repositionings
      for (var i = 0; i < this.rings.length; i++) {
        var _ring = this.rings[i];
        this.graph.vertices[_ring.members[0]].value.addAnchoredRing(_ring.id);
      }

      // Backup the ring information to restore after placing the bridged ring.
      // This is needed in order to identify aromatic rings and stuff like this in
      // rings that are member of the superring.
      this.backupRingInformation();

      // Replace rings contained by a larger bridged ring with a bridged ring
      while (this.rings.length > 0) {
        var id = -1;
        for (var i = 0; i < this.rings.length; i++) {
          var _ring3 = this.rings[i];

          if (this.isPartOfBridgedRing(_ring3.id) && !_ring3.isBridged) {
            id = _ring3.id;
          }
        }

        if (id === -1) {
          break;
        }

        var _ring2 = this.getRing(id);

        var involvedRings = this.getBridgedRingRings(_ring2.id);

        this.bridgedRing = true;
        this.createBridgedRing(involvedRings, _ring2.members[0]);

        // Remove the rings
        for (var i = 0; i < involvedRings.length; i++) {
          this.removeRing(involvedRings[i]);
        }
      }
    }

    /**
     * Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.
     *
     * @param {Number} ringId A ring id.
     * @returns {Number[]} An array containing all ring ids of rings part of a bridged ring system.
     */

  }, {
    key: 'getBridgedRingRings',
    value: function getBridgedRingRings(ringId) {
      var involvedRings = [];
      var that = this;

      var recurse = function recurse(r) {
        var ring = that.getRing(r);

        involvedRings.push(r);

        for (var i = 0; i < ring.neighbours.length; i++) {
          var n = ring.neighbours[i];

          if (involvedRings.indexOf(n) === -1 && n !== r && SmilesDrawer.RingConnection.isBridge(that.ringConnections, that.graph.vertices, r, n)) {
            recurse(n);
          }
        }
      };

      recurse(ringId);

      return SmilesDrawer.ArrayHelper.unique(involvedRings);
    }

    /**
     * Checks whether or not a ring is part of a bridged ring.
     *
     * @param {Number} ringId A ring id.
     * @returns {Boolean} A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.
     */

  }, {
    key: 'isPartOfBridgedRing',
    value: function isPartOfBridgedRing(ringId) {
      for (var i = 0; i < this.ringConnections.length; i++) {
        if (this.ringConnections[i].containsRing(ringId) && this.ringConnections[i].isBridge(this.graph.vertices)) {
          return true;
        }
      }

      return false;
    }

    /**
     * Creates a bridged ring.
     *
     * @param {Number[]} ringIds An array of ids of rings involved in the bridged ring.
     * @param {Number} sourceVertexId The vertex id to start the bridged ring discovery from.
     * @returns {SmilesDrawer.Ring} The bridged ring.
     */

  }, {
    key: 'createBridgedRing',
    value: function createBridgedRing(ringIds, sourceVertexId) {
      var ringMembers = new Set();
      var vertices = new Set();
      var neighbours = new Set();

      for (var i = 0; i < ringIds.length; i++) {
        var _ring4 = this.getRing(ringIds[i]);
        _ring4.isPartOfBridged = true;

        for (var j = 0; j < _ring4.members.length; j++) {
          vertices.add(_ring4.members[j]);
        }

        for (var j = 0; j < _ring4.neighbours.length; j++) {
          var id = _ring4.neighbours[j];

          if (ringIds.indexOf(id) === -1) {
            neighbours.add(_ring4.neighbours[j]);
          }
        }
      }

      // A vertex is part of the bridged ring if it only belongs to
      // one of the rings (or to another ring
      // which is not part of the bridged ring).
      var leftovers = new Set();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = vertices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _id = _step.value;

          var _vertex = this.graph.vertices[_id];
          var intersection = SmilesDrawer.ArrayHelper.intersection(ringIds, _vertex.value.rings);

          if (_vertex.value.rings.length === 1 || intersection.length === 1) {
            ringMembers.add(_vertex.id);
          } else {
            leftovers.add(_vertex.id);
          }
        }

        // Vertices can also be part of multiple rings and lay on the bridged ring,
        // however, they have to have at least two neighbours that are not part of
        // two rings
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var tmp = [];
      var insideRing = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = leftovers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _id2 = _step2.value;

          var _vertex2 = this.graph.vertices[_id2];
          var onRing = false;

          for (var _j = 0; _j < _vertex2.edges.length; _j++) {
            if (this.edgeRingCount(_vertex2.edges[_j]) === 1) {
              onRing = true;
            }
          }

          if (onRing) {
            _vertex2.value.isBridgeNode = true;
            ringMembers.add(_vertex2.id);
          } else {
            _vertex2.value.isBridge = true;
            ringMembers.add(_vertex2.id);
          }
        }

        // Create the ring
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var ring = new SmilesDrawer.Ring([].concat(_toConsumableArray(ringMembers)));

      ring.isBridged = true;
      ring.neighbours = [].concat(_toConsumableArray(neighbours));

      for (var i = 0; i < ringIds.length; i++) {
        ring.rings.push(this.getRing(ringIds[i]).clone());
      }

      this.addRing(ring);

      for (var i = 0; i < ring.members.length; i++) {
        this.graph.vertices[ring.members[i]].value.bridgedRing = ring.id;
      }

      // Atoms inside the ring are no longer part of a ring but are now
      // associated with the bridged ring
      for (var i = 0; i < insideRing.length; i++) {
        var vertex = this.graph.vertices[insideRing[i]];
        vertex.value.rings = Array();
      }

      // Remove former rings from members of the bridged ring and add the bridged ring
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = ringMembers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _id3 = _step3.value;

          var _vertex3 = this.graph.vertices[_id3];
          _vertex3.value.rings = SmilesDrawer.ArrayHelper.removeAll(_vertex3.value.rings, ringIds);
          _vertex3.value.rings.push(ring.id);
        }

        // Remove all the ring connections no longer used
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      for (var i = 0; i < ringIds.length; i++) {
        for (var j = i + 1; j < ringIds.length; j++) {
          this.removeRingConnectionsBetween(ringIds[i], ringIds[j]);
        }
      }

      // Update the ring connections and add this ring to the neighbours neighbours
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = neighbours[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _id4 = _step4.value;

          var connections = this.getRingConnections(_id4, ringIds);

          for (var j = 0; j < connections.length; j++) {
            this.getRingConnection(connections[j]).updateOther(ring.id, _id4);
          }

          this.getRing(_id4).neighbours.push(ring.id);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return ring;
    }

    /**
     * Checks whether or not two vertices are in the same ring.
     *
     * @param {SmilesDrawer.Vertex} vertexA A vertex.
     * @param {SmilesDrawer.Vertex} vertexB A vertex.
     * @returns {Boolean} A boolean indicating whether or not the two vertices are in the same ring.
     */

  }, {
    key: 'areVerticesInSameRing',
    value: function areVerticesInSameRing(vertexA, vertexB) {
      // This is a little bit lighter (without the array and push) than
      // getCommonRings().length > 0
      for (var i = 0; i < vertexA.value.rings.length; i++) {
        for (var j = 0; j < vertexB.value.rings.length; j++) {
          if (vertexA.value.rings[i] === vertexB.value.rings[j]) {
            return true;
          }
        }
      }

      return false;
    }

    /**
     * Returns an array of ring ids shared by both vertices.
     *
     * @param {SmilesDrawer.Vertex} vertexA A vertex.
     * @param {SmilesDrawer.Vertex} vertexB A vertex.
     * @returns {Number[]} An array of ids of rings shared by the two vertices.
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
     * Returns the aromatic or largest ring shared by the two vertices.
     *
     * @param {SmilesDrawer.Vertex} vertexA A vertex.
     * @param {SmilesDrawer.Vertex} vertexB A vertex.
     * @returns {SmilesDrawer.Ring|null} If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.
     */

  }, {
    key: 'getLargestOrAromaticCommonRing',
    value: function getLargestOrAromaticCommonRing(vertexA, vertexB) {
      var commonRings = this.getCommonRings(vertexA, vertexB);
      var maxSize = 0;
      var largestCommonRing = null;

      for (var i = 0; i < commonRings.length; i++) {
        var ring = this.getRing(commonRings[i]);
        var size = ring.getSize();

        if (ring.isBenzeneLike(this.graph.vertices)) {
          return ring;
        } else if (size > maxSize) {
          maxSize = size;
          largestCommonRing = ring;
        }
      }

      return largestCommonRing;
    }

    /**
     * Returns an array of vertices positioned at a specified location.
     *
     * @param {SmilesDrawer.Vector2} position The position to search for vertices.
     * @param {Number} radius The radius within to search.
     * @param {Number} excludeVertexId A vertex id to be excluded from the search results.
     * @returns {Number[]} An array containing vertex ids in a given location.
     */

  }, {
    key: 'getVerticesAt',
    value: function getVerticesAt(position, radius, excludeVertexId) {
      var locals = [];

      for (var i = 0; i < this.graph.vertices.length; i++) {
        var vertex = this.graph.vertices[i];

        if (vertex.id === excludeVertexId || !vertex.positioned) {
          continue;
        }

        var distance = position.distanceSq(vertex.position);

        if (distance <= radius * radius) {
          locals.push(vertex.id);
        }
      }

      return locals;
    }

    /**
     * Returns the closest vertex (connected as well as unconnected).
     *
     * @param {SmilesDrawer.Vertex} vertex The vertex of which to find the closest other vertex.
     * @returns {SmilesDrawer.Vertex} The closest vertex.
     */

  }, {
    key: 'getClosestVertex',
    value: function getClosestVertex(vertex) {
      var minDist = 99999;
      var minVertex = null;

      for (var i = 0; i < this.graph.vertices.length; i++) {
        var v = this.graph.vertices[i];

        if (v.id === vertex.id) {
          continue;
        }

        var distSq = vertex.position.distanceSq(v.position);

        if (distSq < minDist) {
          minDist = distSq;
          minVertex = v;
        }
      }

      return minVertex;
    }

    /**
     * Add a ring to this representation of a molecule.
     *
     * @param {SmilesDrawer.Ring} ring A new ring.
     * @returns {Number} The ring id of the new ring.
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
     * @param {Number} ringId A ring id.
     */

  }, {
    key: 'removeRing',
    value: function removeRing(ringId) {
      this.rings = this.rings.filter(function (item) {
        return item.id !== ringId;
      });

      // Also remove ring connections involving this ring
      this.ringConnections = this.ringConnections.filter(function (item) {
        return item.firstRingId !== ringId && item.secondRingId !== ringId;
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
     * @param {Number} ringId A ring id.
     * @returns {SmilesDrawer.Ring} A ring associated with the current molecule.
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
     * @param {SmilesDrawer.RingConnection} ringConnection A new ringConnection.
     * @returns {Number} The ring connection id of the new ring connection.
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
     * @param {Number} ringConnectionId A ring connection id.
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
     * @param {Number} vertexIdA A vertex id.
     * @param {Number} vertexIdB A vertex id.
     */

  }, {
    key: 'removeRingConnectionsBetween',
    value: function removeRingConnectionsBetween(vertexIdA, vertexIdB) {
      var toRemove = [];
      for (var i = 0; i < this.ringConnections.length; i++) {
        var ringConnection = this.ringConnections[i];

        if (ringConnection.firstRingId === vertexIdA && ringConnection.secondRingId === vertexIdB || ringConnection.firstRingId === vertexIdB && ringConnection.secondRingId === vertexIdA) {
          toRemove.push(ringConnection.id);
        }
      }

      for (var i = 0; i < toRemove.length; i++) {
        this.removeRingConnection(toRemove[i]);
      }
    }

    /**
     * Get a ring connection with a given id.
     * 
     * @param {Number} id 
     * @returns {SmilesDrawer.RingConnection} The ring connection with the specified id.
     */

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
     * Get the ring connections between a ring and a set of rings.
     *
     * @param {Number} ringId A ring id.
     * @param {Number[]} ringIds An array of ring ids.
     * @returns {Number[]} An array of ring connection ids.
     */

  }, {
    key: 'getRingConnections',
    value: function getRingConnections(ringId, ringIds) {
      var ringConnections = [];

      for (var i = 0; i < this.ringConnections.length; i++) {
        var rc = this.ringConnections[i];

        for (var j = 0; j < ringIds.length; j++) {
          var id = ringIds[j];

          if (rc.firstRingId === ringId && rc.secondRingId === id || rc.firstRingId === id && rc.secondRingId === ringId) {
            ringConnections.push(rc.id);
          }
        }
      }

      return ringConnections;
    }

    /**
     * Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.
     *
     * @returns {Object} Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }
     */

  }, {
    key: 'getOverlapScore',
    value: function getOverlapScore() {
      var total = 0.0;
      var overlapScores = new Float32Array(this.graph.vertices.length);

      for (var i = 0; i < this.graph.vertices.length; i++) {
        overlapScores[i] = 0;
      }

      for (var i = 0; i < this.graph.vertices.length; i++) {
        var j = this.graph.vertices.length;
        while (--j > i) {
          var a = this.graph.vertices[i];
          var b = this.graph.vertices[j];

          if (!a.value.isDrawn || !b.value.isDrawn) {
            continue;
          }

          var dist = SmilesDrawer.Vector2.subtract(a.position, b.position).lengthSq();

          if (dist < this.opts.bondLengthSq) {
            var weighted = (this.opts.bondLength - Math.sqrt(dist)) / this.opts.bondLength;
            total += weighted;
            overlapScores[i] += weighted;
            overlapScores[j] += weighted;
          }
        }
      }

      var sortable = [];

      for (var i = 0; i < this.graph.vertices.length; i++) {
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
        scores: sortable,
        vertexScores: overlapScores
      };
    }

    /**
     * When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.
     *
     * @param {SmilesDrawer.Vertex} vertexA A vertex.
     * @param {SmilesDrawer.Vertex} vertexB A vertex.
     * @param {SmilesDrawer.Vector2[]} sides An array containing the two normals of the line spanned by the two provided vertices.
     * @returns {Object} Returns an object containing the following information: {
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
      var tn = SmilesDrawer.ArrayHelper.merge(an, bn);

      // Only considering the connected vertices
      var sideCount = [0, 0];

      for (var i = 0; i < tn.length; i++) {
        var v = this.graph.vertices[tn[i]].position;

        if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
          sideCount[0]++;
        } else {
          sideCount[1]++;
        }
      }

      // Considering all vertices in the graph, this is to resolve ties
      // from the above side counts
      var totalSideCount = [0, 0];

      for (var i = 0; i < this.graph.vertices.length; i++) {
        var _v = this.graph.vertices[i].position;

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
     * Sets the center for a ring.
     *
     * @param {SmilesDrawer.Ring} ring A ring.
     */

  }, {
    key: 'setRingCenter',
    value: function setRingCenter(ring) {
      var ringSize = ring.getSize();
      var total = new SmilesDrawer.Vector2();

      for (var i = 0; i < ringSize; i++) {
        total.add(this.graph.vertices[ring.members[i]].position);
      }

      ring.center = total.divide(ringSize);
    }

    /**
     * Gets the center of a ring contained within a bridged ring and containing a given vertex.
     *
     * @param {SmilesDrawer.Ring} ring A bridged ring.
     * @param {SmilesDrawer.Vertex} vertex A vertex.
     * @returns {SmilesDrawer.Vector2} The center of the subring that containing the vertex.
     */

  }, {
    key: 'getSubringCenter',
    value: function getSubringCenter(ring, vertex) {
      var rings = vertex.value.originalRings;
      var center = ring.center;
      var smallest = Number.MAX_VALUE;

      // Always get the smallest ring.
      var i = rings.length;
      for (var i = 0; i < rings.length; i++) {
        for (var j = 0; j < ring.rings.length; j++) {
          if (rings[i] === ring.rings[j].id) {
            if (ring.rings[j].getSize() < smallest) {
              center = ring.rings[j].center;
              smallest = ring.rings[j].getSize();
            }
          }
        }
      }

      return center;
    }

    /**
     * Draw the actual edges as bonds to the canvas.
     *
     * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
     */

  }, {
    key: 'drawEdges',
    value: function drawEdges(debug) {
      var that = this;
      var drawn = Array(this.graph.edges.length);
      drawn.fill(false);

      this.graph.traverseBF(0, function (vertex) {
        var edges = that.graph.getEdges(vertex.id);
        for (var i = 0; i < edges.length; i++) {
          var edgeId = edges[i];
          if (!drawn[edgeId]) {
            drawn[edgeId] = true;
            that.drawEdge(edgeId, debug);
          }
        }
      });

      // Draw ring for implicitly defined aromatic rings
      if (!this.bridgedRing) {
        for (var i = 0; i < this.rings.length; i++) {
          var ring = this.rings[i];

          if (this.isRingAromatic(ring)) {
            this.canvasWrapper.drawAromaticityRing(ring);
          }
        }
      }
    }

    /**
     * Draw the an edge as a bonds to the canvas.
     *
     * @param {Number} edgeId An edge id.
     * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
     */

  }, {
    key: 'drawEdge',
    value: function drawEdge(edgeId, debug) {
      var that = this;
      var edge = this.graph.edges[edgeId];
      var vertexA = this.graph.vertices[edge.sourceId];
      var vertexB = this.graph.vertices[edge.targetId];
      var elementA = vertexA.value.element;
      var elementB = vertexB.value.element;

      if ((!vertexA.value.isDrawn || !vertexB.value.isDrawn) && this.opts.atomVisualization === 'default') {
        return;
      }

      var a = vertexA.position;
      var b = vertexB.position;
      var normals = this.getEdgeNormals(edge);

      // Create a point on each side of the line
      var sides = SmilesDrawer.ArrayHelper.clone(normals);

      sides[0].multiplyScalar(10).add(a);
      sides[1].multiplyScalar(10).add(a);

      if (edge.bondType === '=' || this.getRingbondType(vertexA, vertexB) === '=' || edge.isPartOfAromaticRing && this.bridgedRing) {
        // Always draw double bonds inside the ring
        var inRing = this.areVerticesInSameRing(vertexA, vertexB);
        var s = this.chooseSide(vertexA, vertexB, sides);

        if (inRing) {
          // Always draw double bonds inside a ring
          // if the bond is shared by two rings, it is drawn in the larger
          // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
          var lcr = this.getLargestOrAromaticCommonRing(vertexA, vertexB);
          var center = lcr.center;

          normals[0].multiplyScalar(that.opts.bondSpacing);
          normals[1].multiplyScalar(that.opts.bondSpacing);

          // Choose the normal that is on the same side as the center
          var line = null;

          if (center.sameSideAs(vertexA.position, vertexB.position, SmilesDrawer.Vector2.add(a, normals[0]))) {
            line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
          } else {
            line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);
          }

          line.shorten(this.opts.bondLength - this.opts.shortBondLength);

          // The shortened edge
          if (edge.isPartOfAromaticRing) {
            this.canvasWrapper.drawLine(line, true);
          } else {
            this.canvasWrapper.drawLine(line);
          }

          // The normal edge
          this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
        } else if (edge.center) {
          normals[0].multiplyScalar(that.opts.halfBondSpacing);
          normals[1].multiplyScalar(that.opts.halfBondSpacing);

          var lineA = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
          var lineB = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

          this.canvasWrapper.drawLine(lineA);
          this.canvasWrapper.drawLine(lineB);
        } else if (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
          // Both lines are the same length here
          // Add the spacing to the edges (which are of unit length)
          normals[0].multiplyScalar(that.opts.halfBondSpacing);
          normals[1].multiplyScalar(that.opts.halfBondSpacing);

          var _lineA = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
          var _lineB = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

          this.canvasWrapper.drawLine(_lineA);
          this.canvasWrapper.drawLine(_lineB);
        } else if (s.sideCount[0] > s.sideCount[1]) {
          normals[0].multiplyScalar(that.opts.bondSpacing);
          normals[1].multiplyScalar(that.opts.bondSpacing);

          var _line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);

          _line.shorten(this.opts.bondLength - this.opts.shortBondLength);
          this.canvasWrapper.drawLine(_line);
          this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
        } else if (s.sideCount[0] < s.sideCount[1]) {
          normals[0].multiplyScalar(that.opts.bondSpacing);
          normals[1].multiplyScalar(that.opts.bondSpacing);

          var _line2 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

          _line2.shorten(this.opts.bondLength - this.opts.shortBondLength);
          this.canvasWrapper.drawLine(_line2);
          this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
        } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
          normals[0].multiplyScalar(that.opts.bondSpacing);
          normals[1].multiplyScalar(that.opts.bondSpacing);

          var _line3 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);

          _line3.shorten(this.opts.bondLength - this.opts.shortBondLength);
          this.canvasWrapper.drawLine(_line3);
          this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
        } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
          normals[0].multiplyScalar(that.opts.bondSpacing);
          normals[1].multiplyScalar(that.opts.bondSpacing);

          var _line4 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

          _line4.shorten(this.opts.bondLength - this.opts.shortBondLength);
          this.canvasWrapper.drawLine(_line4);
          this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
        } else {}
      } else if (edge.bondType === '#') {
        normals[0].multiplyScalar(that.opts.bondSpacing / 1.5);
        normals[1].multiplyScalar(that.opts.bondSpacing / 1.5);

        var _lineA2 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
        var _lineB2 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

        this.canvasWrapper.drawLine(_lineA2);
        this.canvasWrapper.drawLine(_lineB2);

        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
      } else if (edge.bondType === '.') {
        // TODO: Something... maybe... version 2?
      } else {
        var isChiralCenterA = vertexA.value.bracket && vertexA.value.bracket.chirality;
        var isChiralCenterB = vertexB.value.bracket && vertexB.value.bracket.chirality;

        if (edge.chiral === 'up') {
          this.canvasWrapper.drawWedge(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
        } else if (edge.chiral === 'down') {
          this.canvasWrapper.drawDashedWedge(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
        } else {
          this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
        }
      }

      if (debug) {
        var midpoint = SmilesDrawer.Vector2.midpoint(a, b);
        this.canvasWrapper.drawDebugText(midpoint.x, midpoint.y, 'e: ' + edgeId);
      }
    }

    /**
     * Draws the vertices representing atoms to the canvas.
     *
     * @param {Boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
     */

  }, {
    key: 'drawVertices',
    value: function drawVertices(debug) {
      var i = this.graph.vertices.length;
      for (var i = 0; i < this.graph.vertices.length; i++) {
        var vertex = this.graph.vertices[i];
        var atom = vertex.value;
        var charge = 0;
        var isotope = 0;
        var bondCount = this.getBondCount(vertex);
        var element = atom.element;
        var hydrogens = SmilesDrawer.Atom.maxBonds[element] - bondCount;
        var dir = vertex.getTextDirection(this.graph.vertices);
        var isTerminal = this.opts.terminalCarbons || element !== 'C' || atom.hasAttachedPseudoElements ? vertex.isTerminal() : false;
        var isCarbon = atom.element === 'C';

        if (atom.bracket) {
          hydrogens = atom.bracket.hcount;
          charge = atom.bracket.charge;
          isotope = atom.bracket.isotope;
        }

        if (this.opts.atomVisualization === 'allballs') {
          this.canvasWrapper.drawBall(vertex.position.x, vertex.position.y, element);
        } else if (atom.isDrawn && (!isCarbon || atom.drawExplicit || isTerminal || atom.hasAttachedPseudoElements)) {
          if (this.opts.atomVisualization === 'default') {
            this.canvasWrapper.drawText(vertex.position.x, vertex.position.y, element, hydrogens, dir, isTerminal, charge, isotope, atom.getAttachedPseudoElements());
          } else if (this.opts.atomVisualization === 'balls') {
            this.canvasWrapper.drawBall(vertex.position.x, vertex.position.y, element);
          }
        } else if (vertex.getNeighbourCount() === 2 && vertex.forcePositioned == true) {
          // If there is a carbon which bonds are in a straight line, draw a dot
          var a = this.graph.vertices[vertex.neighbours[0]].position;
          var b = this.graph.vertices[vertex.neighbours[1]].position;
          var angle = SmilesDrawer.Vector2.threePointangle(vertex.position, a, b);

          if (Math.abs(Math.PI - angle) < 0.1) {
            this.canvasWrapper.drawPoint(vertex.position.x, vertex.position.y, element);
          }
        }

        if (debug) {
          var value = 'v: ' + vertex.id + ' ' + SmilesDrawer.ArrayHelper.print(atom.ringbonds);
          this.canvasWrapper.drawDebugText(vertex.position.x, vertex.position.y, value);
        }
      }

      // Draw the ring centers for debug purposes
      if (this.opts.debug) {
        for (var i = 0; i < this.rings.length; i++) {
          var center = this.rings[i].center;
          this.canvasWrapper.drawDebugPoint(center.x, center.y, 'r: ' + this.rings[i].id);
        }
      }
    }

    /**
     * Position the vertices according to their bonds and properties.
     */

  }, {
    key: 'position',
    value: function position() {
      var startVertex = null;

      // Always start drawing at a bridged ring if there is one
      // If not, start with a ring
      // else, start with 0
      for (var i = 0; i < this.graph.vertices.length; i++) {
        if (this.graph.vertices[i].value.bridgedRing !== null) {
          startVertex = this.graph.vertices[i];
          break;
        }
      }

      for (var i = 0; i < this.rings.length; i++) {
        if (this.rings[i].isBridged) {
          startVertex = this.graph.vertices[this.rings[i].members[0]];
        }
      }

      if (this.rings.length > 0 && startVertex === null) {
        startVertex = this.graph.vertices[this.rings[0].members[0]];
      }

      if (startVertex === null) {
        startVertex = this.graph.vertices[0];
      }

      this.createNextBond(startVertex);
    }

    /**
     * Stores the current information associated with rings.
     */

  }, {
    key: 'backupRingInformation',
    value: function backupRingInformation() {
      this.originalRings = [];
      this.originalRingConnections = [];

      for (var i = 0; i < this.rings.length; i++) {
        this.originalRings.push(this.rings[i]);
      }

      for (var i = 0; i < this.ringConnections.length; i++) {
        this.originalRingConnections.push(this.ringConnections[i]);
      }

      for (var i = 0; i < this.graph.vertices.length; i++) {
        this.graph.vertices[i].value.backupRings();
      }
    }

    /**
     * Restores the most recently backed up information associated with rings.
     */

  }, {
    key: 'restoreRingInformation',
    value: function restoreRingInformation() {
      // Get the subring centers from the bridged rings
      var bridgedRings = this.getBridgedRings();

      this.rings = [];
      this.ringConnections = [];

      for (var i = 0; i < bridgedRings.length; i++) {
        var bridgedRing = bridgedRings[i];

        for (var j = 0; j < bridgedRing.rings.length; j++) {
          var ring = bridgedRing.rings[j];
          this.originalRings[ring.id].center = ring.center;
        }
      }

      for (var i = 0; i < this.originalRings.length; i++) {
        this.rings.push(this.originalRings[i]);
      }

      for (var i = 0; i < this.originalRingConnections.length; i++) {
        this.ringConnections.push(this.originalRingConnections[i]);
      }

      for (var i = 0; i < this.graph.vertices.length; i++) {
        this.graph.vertices[i].value.restoreRings();
      }
    }

    // TODO: This needs some cleaning up

    /**
     * Creates a new ring, that is, positiones all the vertices inside a ring.
     *
     * @param {SmilesDrawer.Ring} ring The ring to position.
     * @param {SmilesDrawer.Vector2|null} [center=null] The center of the ring to be created.
     * @param {SmilesDrawer.Vertex|null} [startVertex=null] The first vertex to be positioned inside the ring.
     * @param {SmilesDrawer.Vertex|null} [previousVertex=null] The last vertex that was positioned.
     * @param {Boolean} [previousVertex=false] A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it.
     */

  }, {
    key: 'createRing',
    value: function createRing(ring) {
      var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var startVertex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var previousVertex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (ring.positioned) {
        return;
      }

      center = center ? center : new SmilesDrawer.Vector2(0, 0);

      var orderedNeighbours = ring.getOrderedNeighbours(this.ringConnections);
      var startingAngle = startVertex ? SmilesDrawer.Vector2.subtract(startVertex.position, center).angle() : 0;

      var radius = _MathHelper2.default.polyCircumradius(this.opts.bondLength, ring.getSize());
      var angle = _MathHelper2.default.centralAngle(ring.getSize());

      ring.centralAngle = angle;

      var a = startingAngle;
      var that = this;
      var startVertexId = startVertex ? startVertex.id : null;

      if (ring.members.indexOf(startVertexId) === -1) {
        if (startVertex) {
          startVertex.positioned = false;
        }

        startVertexId = ring.members[0];
      }

      // For bridged rings, vertices directly connected to the ring are also positioned.
      var positioned = Array();

      // If the ring is bridged, then draw the vertices inside the ring
      // using a force based approach
      if (ring.isBridged) {
        this.graph.kkLayout(ring.members.slice(), positioned, center, startVertex.id, ring, this.opts.bondLength);
        ring.positioned = true;

        // Update the center of the bridged ring
        this.setRingCenter(ring);
        center = ring.center;

        // Setting the centers for the subrings
        for (var i = 0; i < ring.rings.length; i++) {
          this.setRingCenter(ring.rings[i]);
        }
      } else {
        ring.eachMember(this.graph.vertices, function (v) {
          var vertex = that.graph.vertices[v];

          if (!vertex.positioned) {
            vertex.setPosition(center.x + Math.cos(a) * radius, center.y + Math.sin(a) * radius);
          }

          a += angle;

          if (!ring.isBridged || ring.rings.length < 3) {
            vertex.positioned = true;
          }
        }, startVertexId, previousVertex ? previousVertex.id : null);
      }

      ring.positioned = true;
      ring.center = center;

      // Draw neighbours in decreasing order of connectivity
      for (var i = 0; i < orderedNeighbours.length; i++) {
        var neighbour = this.getRing(orderedNeighbours[i].neighbour);

        if (neighbour.positioned) {
          continue;
        }

        var vertices = SmilesDrawer.RingConnection.getVertices(this.ringConnections, ring.id, neighbour.id);

        if (vertices.length === 2) {
          // This ring is a fused ring
          ring.isFused = true;
          neighbour.isFused = true;

          var vertexA = this.graph.vertices[vertices[0]];
          var vertexB = this.graph.vertices[vertices[1]];

          // Get middle between vertex A and B
          var midpoint = SmilesDrawer.Vector2.midpoint(vertexA.position, vertexB.position);

          // Get the normals to the line between A and B
          var normals = SmilesDrawer.Vector2.normals(vertexA.position, vertexB.position);

          // Normalize the normals
          normals[0].normalize();
          normals[1].normalize();

          // Set length from middle of side to center (the apothem)
          var r = _MathHelper2.default.polyCircumradius(this.opts.bondLength, neighbour.getSize());
          var apothem = _MathHelper2.default.apothem(r, neighbour.getSize());

          normals[0].multiplyScalar(apothem).add(midpoint);
          normals[1].multiplyScalar(apothem).add(midpoint);

          // Pick the normal which results in a larger distance to the previous center
          // Also check whether it's inside another ring
          var nextCenter = normals[0];
          if (SmilesDrawer.Vector2.subtract(center, normals[1]).lengthSq() > SmilesDrawer.Vector2.subtract(center, normals[0]).lengthSq()) {
            nextCenter = normals[1];
          }

          // Get the vertex (A or B) which is in clock-wise direction of the other
          var posA = SmilesDrawer.Vector2.subtract(vertexA.position, nextCenter);
          var posB = SmilesDrawer.Vector2.subtract(vertexB.position, nextCenter);

          if (posA.clockwise(posB) === -1) {
            if (!neighbour.positioned) {
              this.createRing(neighbour, nextCenter, vertexA, vertexB);
            }
          } else {
            if (!neighbour.positioned) {
              this.createRing(neighbour, nextCenter, vertexB, vertexA);
            }
          }
        } else if (vertices.length === 1) {
          // This ring is a spiro
          ring.isSpiro = true;
          neighbour.isSpiro = true;

          var _vertexA = this.graph.vertices[vertices[0]];

          // Get the vector pointing from the shared vertex to the new centpositioner
          var _nextCenter = SmilesDrawer.Vector2.subtract(center, _vertexA.position);

          _nextCenter.invert();
          _nextCenter.normalize();

          // Get the distance from the vertex to the center
          var _r = _MathHelper2.default.polyCircumradius(this.opts.bondLength, neighbour.getSize());

          _nextCenter.multiplyScalar(_r);
          _nextCenter.add(_vertexA.position);

          if (!neighbour.positioned) {
            this.createRing(neighbour, _nextCenter, _vertexA);
          }
        }
      }

      // Next, draw atoms that are not part of a ring that are directly attached to this ring
      for (var i = 0; i < ring.members.length; i++) {
        var ringMember = this.graph.vertices[ring.members[i]];
        var ringMemberNeighbours = ringMember.getNeighbours();

        // If there are multiple, the ovlerap will be resolved in the appropriate step
        for (var j = 0; j < ringMemberNeighbours.length; j++) {
          var v = this.graph.vertices[ringMemberNeighbours[j]];

          if (v.positioned) {
            continue;
          }

          v.value.isConnectedToRing = true;
          this.createNextBond(v, ringMember, this.getSubringCenter(ring, ringMember));
        }
      }

      for (var i = 0; i < positioned.length; i++) {
        var u = this.graph.vertices[positioned[i][1]]; // this is the ring vertex
        var _v2 = this.graph.vertices[positioned[i][0]]; // this is the vertex attached to the ring vertex
        _v2.previousPosition = u.position;
        this.createNextBond(_v2, u, 0, 0, true);
      }
    }

    /**
     * Rotate an entire subtree by an angle around a center.
     *
     * @param {Number} vertexId A vertex id (the root of the sub-tree).
     * @param {Number} parentVertexId A vertex id in the previous direction of the subtree that is to rotate.
     * @param {Number} angle An angle in randians.
     * @param {SmilesDrawer.Vector2} center The rotational center.
     */

  }, {
    key: 'rotateSubtree',
    value: function rotateSubtree(vertexId, parentVertexId, angle, center) {
      var that = this;

      this.traverseTree(vertexId, parentVertexId, function (vertex) {
        vertex.position.rotateAround(angle, center);

        for (var i = 0; i < vertex.value.anchoredRings.length; i++) {
          var ring = that.rings[vertex.value.anchoredRings[i]];

          if (ring) {
            ring.center.rotateAround(angle, center);
          }
        }
      });
    }

    /**
     * Gets the overlap score of a subtree.
     *
     * @param {Number} vertexId A vertex id (the root of the sub-tree).
     * @param {Number} parentVertexId A vertex id in the previous direction of the subtree.
     * @param {Number[]} vertexOverlapScores An array containing the vertex overlap scores indexed by vertex id.
     * @returns {Object} An object containing the total overlap score and the center of mass of the subtree weighted by overlap score { value: 0.2, center: new SmilesDrawer.Vector2() }.
     */

  }, {
    key: 'getSubtreeOverlapScore',
    value: function getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) {
      var that = this;
      var score = 0;
      var center = new SmilesDrawer.Vector2();

      this.traverseTree(vertexId, parentVertexId, function (vertex) {
        var s = vertexOverlapScores[vertex.id];
        score += s;

        var position = that.graph.vertices[vertex.id].position.clone();
        position.multiplyScalar(s);
        center.add(position);
      });

      center.divide(score);

      return {
        value: score,
        center: center
      };
    }

    /**
     * Returns the current (positioned vertices so far) center of mass.
     * 
     * @returns {SmilesDrawer.Vector2} The current center of mass.
     */

  }, {
    key: 'getCurrentCenterOfMass',
    value: function getCurrentCenterOfMass() {
      var total = new SmilesDrawer.Vector2();
      var count = 0;

      for (var i = 0; i < this.graph.vertices.length; i++) {
        var vertex = this.graph.vertices[i];

        if (vertex.positioned) {
          total.add(vertex.position);
          count++;
        }
      }

      return total.divide(count);
    }

    /**
     * Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.
     *
     * @param {SmilesDrawer.Vector2} vec The point at which to look for neighbours.
     * @param {Number} [r=currentBondLength*2.0] The radius of vertices to include.
     * @returns {SmilesDrawer.Vector2} The current center of mass.
     */

  }, {
    key: 'getCurrentCenterOfMassInNeigbourhood',
    value: function getCurrentCenterOfMassInNeigbourhood(vec) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.opts.bondLength * 2.0;

      var total = new SmilesDrawer.Vector2();
      var count = 0;
      var rSq = r * r;

      for (var i = 0; i < this.graph.vertices.length; i++) {
        var vertex = this.graph.vertices[i];

        if (vertex.positioned && vec.distanceSq(vertex.position) < rSq) {
          total.add(vertex.position);
          count++;
        }
      }

      return total.divide(count);
    }

    /**
     * Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.
     */

  }, {
    key: 'resolvePrimaryOverlaps',
    value: function resolvePrimaryOverlaps() {
      var overlaps = [];
      var done = Array(this.graph.vertices.length);

      // Looking for overlaps created by two bonds coming out of a ring atom, which both point straight
      // away from the ring and are thus perfectly overlapping.
      for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];

        for (var j = 0; j < ring.members.length; j++) {
          var vertex = this.graph.vertices[ring.members[j]];

          if (done[vertex.id]) {
            continue;
          }

          done[vertex.id] = true;

          // Look for rings where there are atoms with two bonds outside the ring (overlaps)
          var nonRingNeighbours = this.getNonRingNeighbours(vertex.id);

          if (nonRingNeighbours.length > 1) {
            var rings = [];

            for (var k = 0; k < vertex.value.rings.length; k++) {
              rings.push(vertex.value.rings[k]);
            }

            overlaps.push({
              common: vertex,
              rings: rings,
              vertices: nonRingNeighbours
            });
          }
        }
      }

      for (var i = 0; i < overlaps.length; i++) {
        var overlap = overlaps[i];

        if (overlap.vertices.length === 2) {
          var a = overlap.vertices[0];
          var b = overlap.vertices[1];

          if (!a.value.isDrawn || !b.value.isDrawn) {
            continue;
          }

          var angle = (2 * Math.PI - this.getRing(overlap.rings[0]).getAngle()) / 6.0;

          this.rotateSubtree(a.id, overlap.common.id, angle, overlap.common.position);
          this.rotateSubtree(b.id, overlap.common.id, -angle, overlap.common.position);

          // Decide which way to rotate the vertices depending on the effect it has on the overlap score
          var overlapScore = this.getOverlapScore();
          var subTreeOverlapA = this.getSubtreeOverlapScore(a.id, overlap.common.id, overlapScore.vertexScores);
          var subTreeOverlapB = this.getSubtreeOverlapScore(b.id, overlap.common.id, overlapScore.vertexScores);
          var total = subTreeOverlapA.value + subTreeOverlapB.value;

          this.rotateSubtree(a.id, overlap.common.id, -2.0 * angle, overlap.common.position);
          this.rotateSubtree(b.id, overlap.common.id, 2.0 * angle, overlap.common.position);

          overlapScore = this.getOverlapScore();
          subTreeOverlapA = this.getSubtreeOverlapScore(a.id, overlap.common.id, overlapScore.vertexScores);
          subTreeOverlapB = this.getSubtreeOverlapScore(b.id, overlap.common.id, overlapScore.vertexScores);

          if (subTreeOverlapA.value + subTreeOverlapB.value > total) {
            this.rotateSubtree(a.id, overlap.common.id, 2.0 * angle, overlap.common.position);
            this.rotateSubtree(b.id, overlap.common.id, -2.0 * angle, overlap.common.position);
          }
        }
      }
    }

    /**
     * Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.
     *
     * @param {Object[]} scores An array of objects sorted descending by score.
     * @param {Number} scores[].id A vertex id.
     * @param {Number} scores[].score The overlap score associated with the vertex id.
     */

  }, {
    key: 'resolveSecondaryOverlaps',
    value: function resolveSecondaryOverlaps(scores) {
      for (var i = 0; i < scores.length; i++) {
        if (scores[i].score > this.opts.bondLength / (4.0 * this.opts.bondLength)) {
          var vertex = this.graph.vertices[scores[i].id];

          if (vertex.isTerminal()) {
            var closest = this.getClosestVertex(vertex);

            if (closest) {
              // If one of the vertices is the first one, the previous vertex is not the central vertex but the dummy
              // so take the next rather than the previous, which is vertex 1
              var closestPosition = null;

              if (closest.isTerminal()) {
                closestPosition = closest.id === 0 ? this.graph.vertices[1].position : closest.previousPosition;
              } else {
                closestPosition = closest.id === 0 ? this.graph.vertices[1].position : closest.position;
              }

              var vertexPreviousPosition = vertex.id === 0 ? this.graph.vertices[1].position : vertex.previousPosition;

              vertex.position.rotateAwayFrom(closestPosition, vertexPreviousPosition, _MathHelper2.default.toRad(20));
            }
          }
        }
      }
    }

    /**
     * Positiones the next vertex thus creating a bond.
     *
     * @param {SmilesDrawer.Vertex} vertex A vertex.
     * @param {SmilesDrawer.Vertex} previousVertex The previous vertex which has been positioned.
     * @param {SmilesDrawer.Ring|Number} ringOrAngle Either a ring or a number. If the vertex is connected to a ring, it is positioned based on the ring center and thus the ring is supplied. If the vertex is not in a ring, an angle (in radians) is supplied.
     * @param {Number} dir Either 1 or -1 to break ties (if no angle can be elucidated).
     * @param {Boolean} [skipPositioning=false] Whether or not to skip positioning and just check the neighbours.
     */

  }, {
    key: 'createNextBond',
    value: function createNextBond(vertex, previousVertex, ringOrAngle, dir) {
      var skipPositioning = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (vertex.positioned && !skipPositioning) {
        return;
      }

      // If the current node is the member of one ring, then point straight away
      // from the center of the ring. However, if the current node is a member of
      // two rings, point away from the middle of the centers of the two rings
      if (!skipPositioning) {
        if (!previousVertex) {
          // Here, ringOrAngle is always an angle

          // Add a (dummy) previous position if there is no previous vertex defined
          // Since the first vertex is at (0, 0), create a vector at (bondLength, 0)
          // and rotate it by 90°


          var dummy = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
          dummy.rotate(_MathHelper2.default.toRad(-120));

          vertex.previousPosition = dummy;
          vertex.setPosition(this.opts.bondLength, 0);
          vertex.angle = _MathHelper2.default.toRad(-120);
          vertex.globalAngle = vertex.angle;

          // Do not position the vertex if it belongs to a bridged ring that is positioned using a layout algorithm.
          if (vertex.value.bridgedRing === null) {
            vertex.positioned = true;
          }
        } else if (previousVertex.value.originalRings.length === 1) {
          var vecs = Array();
          var neighbours = previousVertex.getNeighbours();

          for (var i = 0; i < neighbours.length; i++) {
            var neighbour = this.graph.vertices[neighbours[i]];

            if (neighbour.positioned && neighbour.value.originalRings.length > 0) {
              vecs.push(SmilesDrawer.Vector2.subtract(neighbour.position, previousVertex.position));
            }
          }

          var avg = SmilesDrawer.Vector2.averageDirection(vecs);
          vertex.setPositionFromVector(avg.invert().multiplyScalar(this.opts.bondLength).add(previousVertex.position));
          vertex.previousPosition = previousVertex.position;
          vertex.positioned = true;
        } else if (previousVertex.value.originalRings.length > 1) {
          var _vecs = Array();
          var _neighbours = previousVertex.getNeighbours();

          for (var i = 0; i < _neighbours.length; i++) {
            var _neighbour = this.graph.vertices[_neighbours[i]];

            if (_neighbour.positioned && _neighbour.value.originalRings.length > 1) {
              _vecs.push(SmilesDrawer.Vector2.subtract(_neighbour.position, previousVertex.position));
            }
          }

          var _avg = SmilesDrawer.Vector2.averageDirection(_vecs);
          _avg.invert().multiplyScalar(this.opts.bondLength).add(previousVertex.position);

          // Invert if too close to another of the averaged vertices (resolve situations like: CC1CC2NCC3(N)CC1(C)C23CC#C)
          for (var i = 0; i < _neighbours.length; i++) {
            var _neighbour2 = this.graph.vertices[_neighbours[i]];

            if (!_neighbour2.positioned) {
              continue;
            }

            if (SmilesDrawer.Vector2.threePointangle(_avg, previousVertex.position, _neighbour2.position) > 3.1) {
              _avg.rotateAround(Math.PI, previousVertex.position);
              break;
            }
          }

          vertex.previousPosition = previousVertex.position;
          vertex.setPositionFromVector(_avg);
          vertex.positioned = true;
        } else {
          // Here, ringOrAngle is always an angle

          // If the previous vertex was not part of a ring, draw a bond based
          // on the global angle of the previous bond
          var v = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
          v.rotate(ringOrAngle);
          v.add(previousVertex.position);

          vertex.globalAngle = ringOrAngle;
          vertex.setPositionFromVector(v);
          vertex.previousPosition = previousVertex.position;
          vertex.positioned = true;
        }
      }

      // Go to next vertex
      // If two rings are connected by a bond ...
      if (vertex.value.bridgedRing !== null) {
        var nextRing = this.getRing(vertex.value.bridgedRing);
        var nextCenter = SmilesDrawer.Vector2.subtract(vertex.previousPosition, vertex.position);

        nextCenter.invert();
        nextCenter.normalize();

        var r = _MathHelper2.default.polyCircumradius(this.opts.bondLength, nextRing.members.length);
        nextCenter.multiplyScalar(r);
        nextCenter.add(vertex.position);

        if (!nextRing.positioned) {
          this.createRing(nextRing, nextCenter, vertex);
        }
      } else if (vertex.value.rings.length > 0) {
        var _nextRing = this.getRing(vertex.value.rings[0]);
        var _nextCenter2 = SmilesDrawer.Vector2.subtract(vertex.previousPosition, vertex.position);

        _nextCenter2.invert();
        _nextCenter2.normalize();

        var _r2 = _MathHelper2.default.polyCircumradius(this.opts.bondLength, _nextRing.getSize());

        _nextCenter2.multiplyScalar(_r2);
        _nextCenter2.add(vertex.position);

        if (!_nextRing.positioned) {
          this.createRing(_nextRing, _nextCenter2, vertex);
        }
      } else {
        // Draw the non-ring vertices connected to this one        
        var _neighbours2 = vertex.getNeighbours();

        if (previousVertex) {
          _neighbours2 = SmilesDrawer.ArrayHelper.remove(_neighbours2, previousVertex.id);
        }

        var angle = vertex.getAngle();

        if (_neighbours2.length === 1) {
          var nextVertex = this.graph.vertices[_neighbours2[0]];

          // Make a single chain always cis except when there's a tribble (yes, this is a Star Trek reference) bond
          // or if there are successive double bonds
          if (vertex.value.bondType === '#' || previousVertex && previousVertex.value.bondType === '#' || vertex.value.bondType === '=' && previousVertex && previousVertex.value.bondType === '=') {
            vertex.value.drawExplicit = false;

            if (previousVertex) {
              var straightEdge1 = this.graph.getEdge(vertex.id, previousVertex.id);
              straightEdge1.center = true;
            }

            var straightEdge2 = this.graph.getEdge(vertex.id, nextVertex.id);
            straightEdge2.center = true;

            nextVertex.drawExplicit = true;
            nextVertex.globalAngle = angle;
            nextVertex.angle = 0.0;
            this.createNextBond(nextVertex, vertex, nextVertex.globalAngle, -dir);
          } else if (previousVertex && previousVertex.value.rings.length > 0) {
            // If coming out of a ring, always draw away from the center of mass
            var proposedAngleA = _MathHelper2.default.toRad(60);
            var proposedAngleB = -proposedAngleA;

            var proposedVectorA = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
            var proposedVectorB = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

            proposedVectorA.rotate(proposedAngleA).add(vertex.position);
            proposedVectorB.rotate(proposedAngleB).add(vertex.position);

            // let centerOfMass = this.getCurrentCenterOfMassInNeigbourhood(vertex.position, 100);
            var centerOfMass = this.getCurrentCenterOfMass();
            var distanceA = proposedVectorA.distanceSq(centerOfMass);
            var distanceB = proposedVectorB.distanceSq(centerOfMass);

            nextVertex.angle = distanceA < distanceB ? proposedAngleB : proposedAngleA;

            if (nextVertex.angle > 0) {
              dir = -1;
            } else {
              dir = 1;
            }

            nextVertex.globalAngle = angle + nextVertex.angle;
            this.createNextBond(nextVertex, vertex, nextVertex.globalAngle, dir);
          } else {
            if (!dir) {
              var _proposedAngleA = _MathHelper2.default.toRad(60);
              var _proposedAngleB = -_proposedAngleA;

              var _proposedVectorA = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
              var _proposedVectorB = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

              _proposedVectorA.rotate(_proposedAngleA).add(vertex.position);
              _proposedVectorB.rotate(_proposedAngleB).add(vertex.position);

              var _centerOfMass = this.getCurrentCenterOfMass();
              var _distanceA = _proposedVectorA.distanceSq(_centerOfMass);
              var _distanceB = _proposedVectorB.distanceSq(_centerOfMass);

              nextVertex.angle = _distanceA < _distanceB ? _proposedAngleB : _proposedAngleA;

              if (nextVertex.angle > 0) {
                dir = -1;
              } else {
                dir = 1;
              }
            } else {
              nextVertex.angle = _MathHelper2.default.toRad(60) * dir;
              dir = -dir;
            }

            nextVertex.globalAngle = angle + nextVertex.angle;
            this.createNextBond(nextVertex, vertex, nextVertex.globalAngle, dir);
          }
        } else if (_neighbours2.length === 2) {
          // Check for the longer subtree - always go with cis for the longer subtree
          var subTreeDepthA = this.getTreeDepth(_neighbours2[0], vertex.id);
          var subTreeDepthB = this.getTreeDepth(_neighbours2[1], vertex.id);

          // Also get the subtree for the previous direction (this is important when
          // the previous vertex is the shortest path)
          var subTreeDepthC = this.getTreeDepth(previousVertex ? previousVertex.id : null, vertex.id);

          var cis = 0;
          var trans = 1;

          if (subTreeDepthA > subTreeDepthB) {
            cis = 1;
            trans = 0;
          }

          var cisVertex = this.graph.vertices[_neighbours2[cis]];
          var transVertex = this.graph.vertices[_neighbours2[trans]];

          // If the origin tree is the shortest, set both vertices to trans
          if (subTreeDepthC < subTreeDepthA && subTreeDepthC < subTreeDepthB) {
            if (vertex.position.clockwise(vertex.previousPosition) === 1) {
              transVertex.angle = _MathHelper2.default.toRad(60);
              cisVertex.angle = -_MathHelper2.default.toRad(60);
              transVertex.globalAngle = angle + transVertex.angle;
              cisVertex.globalAngle = angle + cisVertex.angle;

              this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
              this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, dir);
            } else {
              transVertex.angle = -_MathHelper2.default.toRad(60);
              cisVertex.angle = _MathHelper2.default.toRad(60);
              transVertex.globalAngle = angle + transVertex.angle;
              cisVertex.globalAngle = angle + cisVertex.angle;

              this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, dir);
              this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
            }
          } else {
            if (vertex.position.clockwise(vertex.previousPosition) === 1) {
              transVertex.angle = _MathHelper2.default.toRad(60);
              cisVertex.angle = -_MathHelper2.default.toRad(60);
              transVertex.globalAngle = angle + transVertex.angle;
              cisVertex.globalAngle = angle + cisVertex.angle;

              this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
              this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, -dir);
            } else {
              transVertex.angle = -_MathHelper2.default.toRad(60);
              cisVertex.angle = _MathHelper2.default.toRad(60);
              transVertex.globalAngle = angle + transVertex.angle;
              cisVertex.globalAngle = angle + cisVertex.angle;

              this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, -dir);
              this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
            }
          }
        } else if (_neighbours2.length === 3) {
          // The vertex with the longest sub-tree should always go straight
          var d1 = this.getTreeDepth(_neighbours2[0], vertex.id);
          var d2 = this.getTreeDepth(_neighbours2[1], vertex.id);
          var d3 = this.getTreeDepth(_neighbours2[2], vertex.id);

          var s = this.graph.vertices[_neighbours2[0]];
          var l = this.graph.vertices[_neighbours2[1]];
          var _r3 = this.graph.vertices[_neighbours2[2]];

          if (d2 > d1 && d2 > d3) {
            s = this.graph.vertices[_neighbours2[1]];
            l = this.graph.vertices[_neighbours2[0]];
            _r3 = this.graph.vertices[_neighbours2[2]];
          } else if (d3 > d1 && d3 > d2) {
            s = this.graph.vertices[_neighbours2[2]];
            l = this.graph.vertices[_neighbours2[0]];
            _r3 = this.graph.vertices[_neighbours2[1]];
          }

          if (this.getTreeDepth(l.id, vertex.id) === 1 && this.getTreeDepth(_r3.id, vertex.id) === 1 && this.getTreeDepth(s.id, vertex.id) > 1) {

            if (!dir) {
              var _proposedAngleA2 = _MathHelper2.default.toRad(60);
              var _proposedAngleB2 = -_proposedAngleA2;

              var _proposedVectorA2 = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
              var _proposedVectorB2 = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

              _proposedVectorA2.rotate(_proposedAngleA2).add(vertex.position);
              _proposedVectorB2.rotate(_proposedAngleB2).add(vertex.position);

              // let centerOfMass = this.getCurrentCenterOfMassInNeigbourhood(vertex.position, 100);
              var _centerOfMass2 = this.getCurrentCenterOfMass();
              var _distanceA2 = _proposedVectorA2.distanceSq(_centerOfMass2);
              var _distanceB2 = _proposedVectorB2.distanceSq(_centerOfMass2);

              s.angle = _distanceA2 < _distanceB2 ? _proposedAngleB2 : _proposedAngleA2;

              if (s.angle > 0) {
                dir = -1;
              } else {
                dir = 1;
              }
            } else {
              s.angle = _MathHelper2.default.toRad(60) * dir;
              dir = -dir;
            }

            s.globalAngle = angle + s.angle;

            this.createNextBond(s, vertex, s.globalAngle, -dir);

            // If it's chiral, the order changes - for anticlockwise, switch the draw order around
            // to keep the drawing the same
            if (vertex.value.bracket && vertex.value.bracket.chirality === '@@') {
              _r3.angle = _MathHelper2.default.toRad(30) * dir;
              l.angle = _MathHelper2.default.toRad(90) * dir;

              _r3.globalAngle = angle + _r3.angle;
              l.globalAngle = angle + l.angle;

              this.createNextBond(_r3, vertex, _r3.globalAngle);
              this.createNextBond(l, vertex, l.globalAngle);
            } else {
              l.angle = _MathHelper2.default.toRad(30) * dir;
              _r3.angle = _MathHelper2.default.toRad(90) * dir;

              l.globalAngle = angle + l.angle;
              _r3.globalAngle = angle + _r3.angle;

              this.createNextBond(l, vertex, l.globalAngle);
              this.createNextBond(_r3, vertex, _r3.globalAngle);
            }
          } else {
            s.angle = 0.0;
            l.angle = _MathHelper2.default.toRad(90);
            _r3.angle = -_MathHelper2.default.toRad(90);

            s.globalAngle = angle + s.angle;
            l.globalAngle = angle + l.angle;
            _r3.globalAngle = angle + _r3.angle;

            this.createNextBond(s, vertex, s.globalAngle);
            this.createNextBond(l, vertex, l.globalAngle);
            this.createNextBond(_r3, vertex, _r3.globalAngle);
          }
        } else if (_neighbours2.length === 4) {
          // The vertex with the longest sub-tree should always go to the reflected opposide direction
          var _d = this.getTreeDepth(_neighbours2[0], vertex.id);
          var _d2 = this.getTreeDepth(_neighbours2[1], vertex.id);
          var _d3 = this.getTreeDepth(_neighbours2[2], vertex.id);
          var d4 = this.getTreeDepth(_neighbours2[3], vertex.id);

          var w = this.graph.vertices[_neighbours2[0]];
          var x = this.graph.vertices[_neighbours2[1]];
          var y = this.graph.vertices[_neighbours2[2]];
          var z = this.graph.vertices[_neighbours2[3]];

          if (_d2 > _d && _d2 > _d3 && _d2 > d4) {
            w = this.graph.vertices[_neighbours2[1]];
            x = this.graph.vertices[_neighbours2[0]];
            y = this.graph.vertices[_neighbours2[2]];
            z = this.graph.vertices[_neighbours2[3]];
          } else if (_d3 > _d && _d3 > _d2 && _d3 > d4) {
            w = this.graph.vertices[_neighbours2[2]];
            x = this.graph.vertices[_neighbours2[0]];
            y = this.graph.vertices[_neighbours2[1]];
            z = this.graph.vertices[_neighbours2[3]];
          } else if (d4 > _d && d4 > _d2 && d4 > _d3) {
            w = this.graph.vertices[_neighbours2[3]];
            x = this.graph.vertices[_neighbours2[0]];
            y = this.graph.vertices[_neighbours2[1]];
            z = this.graph.vertices[_neighbours2[2]];
          }

          w.angle = -_MathHelper2.default.toRad(36);
          x.angle = _MathHelper2.default.toRad(36);
          y.angle = -_MathHelper2.default.toRad(108);
          z.angle = _MathHelper2.default.toRad(108);

          w.globalAngle = angle + w.angle;
          x.globalAngle = angle + x.angle;
          y.globalAngle = angle + y.angle;
          z.globalAngle = angle + z.angle;

          this.createNextBond(w, vertex, w.globalAngle);
          this.createNextBond(x, vertex, x.globalAngle);
          this.createNextBond(y, vertex, y.globalAngle);
          this.createNextBond(z, vertex, z.globalAngle);
        }
      }
    }

    /**
     * Gets the vetex sharing the edge that is the common bond of two rings.
     *
     * @param {SmilesDrawer.Vertex} vertex A vertex.
     * @returns {Number|null} The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.
     */

  }, {
    key: 'getCommonRingbondNeighbour',
    value: function getCommonRingbondNeighbour(vertex) {
      var neighbours = vertex.getNeighbours();

      for (var i = 0; i < neighbours.length; i++) {
        var neighbour = this.graph.vertices[neighbours[i]];

        if (SmilesDrawer.ArrayHelper.All(neighbour.value.rings, vertex.value.rings)) {
          return neighbour;
        }
      }

      return null;
    }

    /**
     * Check if a vector is inside any ring.
     *
     * @param {SmilesDrawer.Vector2} vec A vector.
     * @returns {Boolean} A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.
     */

  }, {
    key: 'isPointInRing',
    value: function isPointInRing(vec) {
      for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];

        if (!ring.positioned) {
          continue;
        }

        var radius = _MathHelper2.default.polyCircumradius(this.opts.bondLength, ring.getSize());
        var radiusSq = radius * radius;

        if (vec.distanceSq(ring.center) < radiusSq) {
          return true;
        }
      }

      return false;
    }

    /**
     * Check whether or not an edge is part of a ring.
     *
     * @param {SmilesDrawer.Edge} edge An edge.
     * @returns {Boolean} A boolean indicating whether or not the edge is part of a ring.
     */

  }, {
    key: 'isEdgeInRing',
    value: function isEdgeInRing(edge) {
      var source = this.graph.vertices[edge.sourceId];
      var target = this.graph.vertices[edge.targetId];

      return this.areVerticesInSameRing(source, target);
    }

    /**
     * Check whether or not an edge is rotatable.
     *
     * @param {SmilesDrawer.Edge} edge An edge.
     * @returns {Boolean} A boolean indicating whether or not the edge is rotatable.
     */

  }, {
    key: 'isEdgeRotatable',
    value: function isEdgeRotatable(edge) {
      var vertexA = this.graph.vertices[edge.sourceId];
      var vertexB = this.graph.vertices[edge.targetId];

      // Only single bonds are rotatable
      if (edge.bondType !== '-') {
        return false;
      }

      // Do not rotate edges that have a further single bond to each side
      // If the bond is terminal, it doesn't make sense to rotate it
      if (vertexA.getNeighbourCount() + vertexB.getNeighbourCount() < 5) {
        return false;
      }

      // Ringbonds are not rotatable
      if (vertexA.value.rings.length > 0 && vertexB.value.rings.length > 0 && this.areVerticesInSameRing(vertexA, vertexB)) {
        return false;
      }

      return true;
    }

    /**
     * Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).
     *
     * @param {SmilesDrawer.Ring} ring A ring.
     * @returns {Boolean} A boolean indicating whether or not a ring is implicitly defined as aromatic.
     */

  }, {
    key: 'isRingAromatic',
    value: function isRingAromatic(ring) {
      for (var i = 0; i < ring.members.length; i++) {
        var vertex = this.graph.vertices[ring.members[i]];

        if (!vertex.value.isPartOfAromaticRing) {
          return false;
        }
      }

      return true;
    }

    /**
     * Get the normals of an edge.
     *
     * @param {SmilesDrawer.Edge} edge An edge.
     * @returns {SmilesDrawer.Vector2[]} An array containing two vectors, representing the normals.
     */

  }, {
    key: 'getEdgeNormals',
    value: function getEdgeNormals(edge) {
      var v1 = this.graph.vertices[edge.sourceId].position;
      var v2 = this.graph.vertices[edge.targetId].position;

      // Get the normalized normals for the edge
      var normals = SmilesDrawer.Vector2.units(v1, v2);

      return normals;
    }

    /**
     * Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.
     *
     * @param {Number} vertexId A vertex id.
     * @param {Number} parentVertexId The id of a neighbouring vertex.
     * @returns {Number} The depth of the sub-tree.
     */

  }, {
    key: 'getTreeDepth',
    value: function getTreeDepth(vertexId, parentVertexId) {
      if (vertexId === null || parentVertexId === null) {
        return 0;
      }

      var neighbours = this.graph.vertices[vertexId].getSpanningTreeNeighbours(parentVertexId);
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
     * @param {Number} vertexId A vertex id.
     * @param {Number} parentVertexId A neighbouring vertex.
     * @param {Function} callback The callback function that is called with each visited as an argument.
     * @param {Number} [maxDepth=null] The maximum depth of the recursion. If null, there is no limit.
     * @param {Boolean} [ignoreFirst=false] Whether or not to ignore the starting vertex supplied as vertexId in the callback.
     */

  }, {
    key: 'traverseTree',
    value: function traverseTree(vertexId, parentVertexId, callback) {
      var maxDepth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var ignoreFirst = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var depth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
      var visited = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];

      if (maxDepth !== null && depth > maxDepth + 1) {
        return;
      }

      for (var j = 0; j < visited.length; j++) {
        if (visited[j] === vertexId) {
          return;
        }
      }

      visited.push(vertexId);

      var vertex = this.graph.vertices[vertexId];
      var neighbours = vertex.getNeighbours(parentVertexId);

      if (!ignoreFirst || depth > 1) {
        callback(vertex);
      }

      for (var i = 0; i < neighbours.length; i++) {
        this.traverseTree(neighbours[i], vertexId, callback, maxDepth, ignoreFirst, depth + 1, visited);
      }
    }

    /**
     * Gets the number of bonds of a vertex.
     *
     * @param {SmilesDrawer.Vertex} vertex A vertex.
     * @returns {Number} The number of bonds the vertex participates in.
     */

  }, {
    key: 'getBondCount',
    value: function getBondCount(vertex) {
      var count = 0;

      for (var i = 0; i < vertex.edges.length; i++) {
        count += this.graph.edges[vertex.edges[i]].getBondCount();
      }

      return count;
    }

    /**
     * Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).
     *
     * @param {Number} vertexId A vertex id.
     * @returns {SmilesDrawer.Vertex[]} An array of vertices.
     */

  }, {
    key: 'getNonRingNeighbours',
    value: function getNonRingNeighbours(vertexId) {
      var nrneighbours = [];
      var vertex = this.graph.vertices[vertexId];
      var neighbours = vertex.getNeighbours();

      for (var i = 0; i < neighbours.length; i++) {
        var neighbour = this.graph.vertices[neighbours[i]];
        var nIntersections = SmilesDrawer.ArrayHelper.intersection(vertex.value.rings, neighbour.value.rings).length;

        if (nIntersections === 0 && neighbour.value.isBridge == false) {
          nrneighbours.push(neighbour);
        }
      }

      return nrneighbours;
    }
  }, {
    key: 'annotateStereochemistry',
    value: function annotateStereochemistry() {
      var _this = this;

      var maxDepth = 10;
      // For each stereo-center

      var _loop = function _loop() {
        var vertex = _this.graph.vertices[i];

        if (!vertex.value.bracket || !vertex.value.bracket.chirality) {
          return 'continue';
        }

        var neighbours = vertex.getNeighbours();
        neighbours.sort();
        var nNeighbours = neighbours.length;
        var priorities = Array(nNeighbours);

        for (j = 0; j < nNeighbours; j++) {
          var visited = new Uint8Array(_this.graph.vertices.length);
          var priority = new Uint16Array(maxDepth * 2.0 + 1);
          visited[vertex.id] = 1;
          _this.visitStereochemistry(neighbours[j], visited, priority, maxDepth, 0);

          // Break ties by the position in the smiles string as per specification
          priority[maxDepth * 2.0] = neighbours[j];
          priorities[j] = [j, priority];
        }

        priorities.sort(function (a, b) {
          for (var j = 0; j < nNeighbours; j++) {
            if (a[1][j] > b[1][j]) {
              return -1;
            } else if (a[1][j] < b[1][j]) {
              return 1;
            }
          }

          return 0;
        });

        var order = new Uint8Array(nNeighbours);
        for (j = 0; j < nNeighbours; j++) {
          order[j] = priorities[j][0];
        }

        console.log(order);
        console.log(vertex.id, _MathHelper2.default.parityOfPermutation(order));
      };

      for (var i = 0; i < this.graph.vertices.length; i++) {
        var j;
        var j;

        var _ret = _loop();

        if (_ret === 'continue') continue;
      }
    }
  }, {
    key: 'visitStereochemistry',
    value: function visitStereochemistry(vertexId, visited, priority, maxDepth, depth) {
      visited[vertexId] = 1;
      var atomicNumber = this.graph.vertices[vertexId].value.getAtomicNumber();

      priority[maxDepth + depth] += atomicNumber;
      priority[depth] = Math.max(priority[depth], atomicNumber);

      var neighbours = this.graph.vertices[vertexId].getNeighbours();

      for (var i = 0; i < neighbours.length; i++) {
        if (visited[neighbours[i]] !== 1 && depth < maxDepth - 1) {
          this.visitStereochemistry(neighbours[i], visited, priority, maxDepth, depth + 1);
        }
      }
    }

    /**
     * Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon sets
     * the involved atoms not to be displayed.
     */

  }, {
    key: 'initPseudoElements',
    value: function initPseudoElements() {
      for (var i = 0; i < this.graph.vertices.length; i++) {
        var _vertex4 = this.graph.vertices[i];
        var neighbourIds = _vertex4.getNeighbours();
        var _neighbours3 = [];

        for (var j = 0; j < neighbourIds.length; j++) {
          _neighbours3.push(this.graph.vertices[neighbourIds[j]]);
        }

        // Ignore atoms that have less than 3 neighbours, except if
        // the vertex is connected to a ring and has two neighbours
        if (_vertex4.getNeighbourCount() < 3 || _vertex4.value.rings.length > 0) {
          continue;
        }

        // Continue if there are less than two heteroatoms
        // or if a neighbour has more than 1 neighbour
        var heteroAtomCount = 0;
        var ctn = 0;

        for (var j = 0; j < _neighbours3.length; j++) {
          var neighbour = _neighbours3[j];
          var neighbouringElement = neighbour.value.element;
          var neighbourCount = neighbour.getNeighbourCount();

          if (neighbouringElement !== 'C' && neighbouringElement !== 'H' && neighbourCount === 1) {
            heteroAtomCount++;
          }

          if (neighbourCount > 1) {
            ctn++;
          }
        }

        if (ctn > 1 || heteroAtomCount < 2) {
          continue;
        }

        // Get the previous atom (the one which is not terminal)
        var previous = null;

        for (var j = 0; j < _neighbours3.length; j++) {
          var _neighbour3 = _neighbours3[j];

          if (_neighbour3.getNeighbourCount() > 1) {
            previous = _neighbour3;
          }
        }

        for (var j = 0; j < _neighbours3.length; j++) {
          var _neighbour4 = _neighbours3[j];

          if (_neighbour4.getNeighbourCount() > 1) {
            continue;
          }

          _neighbour4.value.isDrawn = false;

          var hydrogens = SmilesDrawer.Atom.maxBonds[_neighbour4.value.element] - this.getBondCount(_neighbour4);

          if (_neighbour4.value.bracket) {
            hydrogens = _neighbour4.value.bracket.hcount;
          }

          _vertex4.value.attachPseudoElement(_neighbour4.value.element, previous ? previous.value.element : null, hydrogens);
        }
      }

      // The second pass
      for (var i = 0; i < this.graph.vertices.length; i++) {
        var _vertex5 = this.graph.vertices[i];
        var atom = _vertex5.value;
        var element = atom.element;

        if (element === 'C' || element === 'H' || !atom.isDrawn) {
          continue;
        }

        var _neighbourIds = _vertex5.getNeighbours();
        var _neighbours4 = [];

        for (var j = 0; j < _neighbourIds.length; j++) {
          _neighbours4.push(this.graph.vertices[_neighbourIds[j]]);
        }

        for (var j = 0; j < _neighbours4.length; j++) {
          var _neighbour5 = _neighbours4[j].value;

          if (!_neighbour5.hasAttachedPseudoElements || _neighbour5.getAttachedPseudoElementsCount() !== 2) {
            continue;
          }

          var pseudoElements = _neighbour5.getAttachedPseudoElements();

          if (pseudoElements.hasOwnProperty('0O') && pseudoElements.hasOwnProperty('3C')) {
            _neighbour5.isDrawn = false;
            _vertex5.value.attachPseudoElement('Ac', '', 0);
          }
        }
      }
    }
  }]);

  return Drawer;
}();

exports.default = Drawer;

},{"./MathHelper":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * A static class containing helper functions for math-related tasks. 
 */
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
         * @param {Number} value A number.
         * @param {Number} decimals The number of decimals.
         * @returns {Number} A number rounded to a given number of decimals.
         */
        value: function round(value, decimals) {
            decimals = decimals ? decimals : 1;
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

        /**
         * Returns the means of the angles contained in an array. In radians.
         *
         * @static
         * @param {Number[]} arr An array containing angles (in radians).
         * @returns {Number} The mean angle in radians.
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
         * @param {Number} n Number of sides of a regular polygon.
         * @returns {Number} The inner angle of a given regular polygon.
         */

    }, {
        key: 'innerAngle',
        value: function innerAngle(n) {
            return SmilesDrawer.MathHelper.toRad((n - 2) * 180 / n);
        }

        /**
         * Returns the circumradius of a n-sided regular polygon with a given side-length.
         *
         * @static
         * @param {Number} s The side length of the regular polygon.
         * @param {Number} n The number of sides.
         * @returns {Number} The circumradius of the regular polygon.
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
         * @param {Number} r The radius.
         * @param {Number} n The number of edges of the regular polygon.
         * @returns {Number} The apothem of a n-sided polygon based on its radius.
         */

    }, {
        key: 'apothem',
        value: function apothem(r, n) {
            return r * Math.cos(Math.PI / n);
        }
    }, {
        key: 'apothemFromSideLength',
        value: function apothemFromSideLength(s, n) {
            var r = SmilesDrawer.MathHelper.polyCircumradius(s, n);

            return SmilesDrawer.MathHelper.apothem(r, n);
        }

        /**
         * The central angle of a n-sided regular polygon. In radians.
         *
         * @static
         * @param {Number} n The number of sides of the regular polygon.
         * @returns {Number} The central angle of the n-sided polygon in radians.
         */

    }, {
        key: 'centralAngle',
        value: function centralAngle(n) {
            return SmilesDrawer.MathHelper.toRad(360 / n);
        }

        /**
         * Convertes radians to degrees.
         *
         * @static
         * @param {Number} rad An angle in radians.
         * @returns {Number} The angle in degrees.
         */

    }, {
        key: 'toDeg',
        value: function toDeg(rad) {
            return rad * SmilesDrawer.MathHelper.degFactor;
        }

        /**
         * Converts degrees to radians.
         *
         * @static
         * @param {Number} deg An angle in degrees.
         * @returns {Number} The angle in radians.
         */

    }, {
        key: 'toRad',
        value: function toRad(deg) {
            return deg * SmilesDrawer.MathHelper.radFactor;
        }

        /**
         * Returns the parity of the permutation (1 or -1)
         * @param {Array} arr An array containing the permutation.
         * @returns {Number} The parity of the permutation (1 or -1), where 1 means even and -1 means odd.
         */

    }, {
        key: 'parityOfPermutation',
        value: function parityOfPermutation(arr) {
            var visited = new Uint8Array(arr.length);
            var evenLengthCycleCount = 0;

            var traverseCycle = function traverseCycle(i) {
                var cycleLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                if (visited[i] === 1) {
                    return cycleLength;
                }

                cycleLength++;

                visited[i] = 1;
                return traverseCycle(arr[i], cycleLength);
            };

            for (var i = 0; i < arr.length; i++) {
                if (visited[i] === 1) {
                    continue;
                }

                var cycleLength = traverseCycle(i);
                evenLengthCycleCount += 1 - cycleLength % 2;
            }

            return evenLengthCycleCount % 2 ? -1 : 1;
        }
    }]);

    return MathHelper;
}();

/** The factor to convert degrees to radians. */


exports.default = MathHelper;
SmilesDrawer.MathHelper.radFactor = Math.PI / 180;

/** The factor to convert radians to degrees. */
SmilesDrawer.MathHelper.degFactor = 180 / Math.PI;

/** Two times PI. */
SmilesDrawer.MathHelper.twoPI = 2 * Math.PI;

},{}]},{},[1])

