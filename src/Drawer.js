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
SmilesDrawer.Drawer = class Drawer {
  /**
   * The constructor for the class SmilesDrawer.
   *
   * @param {Object} options An object containing custom values for different options. It is merged with the default options.
   */
  constructor(options) {
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
      explicitHydrogens: false, // TODO: Add to doc
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

    // Set the default theme.
    this.theme = this.opts.themes.dark;
  }

  /**
   * A helper method to extend the default options with user supplied ones.
   */
  extend() {
    let that = this;
    let extended = {};
    let deep = false;
    let i = 0;
    let length = arguments.length;

    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }

    let merge = function (obj) {
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
      let obj = arguments[i];
      merge(obj);
    }

    return extended;
  };


  /**
   * Draws the parsed smiles data to a canvas element.
   *
   * @param {Object} data The tree returned by the smiles parser.
   * @param {String|HTMLElement} target The id of the HTML canvas element the structure is drawn to - or the element itself.
   * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
   * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
   */
  draw(data, target, themeName = 'light', infoOnly = false) {
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

    if (!this.explicitHydrogens) {
      for (var i = 0; i < this.graph.vertices.length; i++) {
        if (this.graph.vertices[i].value.element === 'H') {
          this.graph.vertices[i].value.isDrawn = false;
        }
      }
    }

    if (this.opts.isomeric) {
      this.annotateChirality();
    }

    if (!this.infoOnly) {
      this.position();

      // Restore the ring information (removes bridged rings and replaces them with the original, multiple, rings)
      this.restoreRingInformation();

      // Atoms bonded to the same ring atom
      this.resolvePrimaryOverlaps();

      let overlapScore = this.getOverlapScore();

      this.totalOverlapScore = this.getOverlapScore().total;

      for (var i = 0; i < this.graph.edges.length; i++) {
        let edge = this.graph.edges[i];

        if (this.isEdgeRotatable(edge)) {
          let subTreeDepthA = this.getTreeDepth(edge.sourceId, edge.targetId);
          let subTreeDepthB = this.getTreeDepth(edge.targetId, edge.sourceId);

          // Only rotate the shorter subtree
          let a = edge.targetId;
          let b = edge.sourceId;

          if (subTreeDepthA > subTreeDepthB) {
            a = edge.sourceId;
            b = edge.targetId;
          }

          let subTreeOverlap = this.getSubtreeOverlapScore(b, a, overlapScore.vertexScores);

          if (subTreeOverlap.value > 1.0) {
            let vertexA = this.graph.vertices[a];
            let vertexB = this.graph.vertices[b];
            let neighbours = vertexB.getNeighbours(a);

            if (neighbours.length === 1) {
              let neighbour = this.graph.vertices[neighbours[0]];
              let angle = neighbour.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, SmilesDrawer.MathHelper.toRad(120));

              this.rotateSubtree(neighbour.id, vertexB.id, angle, vertexB.position);

              // If the new overlap is bigger, undo change
              let newTotalOverlapScore = this.getOverlapScore().total;

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

              let neighbourA = this.graph.vertices[neighbours[0]];
              let neighbourB = this.graph.vertices[neighbours[1]];

              let angleA = neighbourA.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, SmilesDrawer.MathHelper.toRad(120));
              let angleB = neighbourB.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, SmilesDrawer.MathHelper.toRad(120));

              this.rotateSubtree(neighbourA.id, vertexB.id, angleA, vertexB.position);
              this.rotateSubtree(neighbourB.id, vertexB.id, angleB, vertexB.position);

              let newTotalOverlapScore = this.getOverlapScore().total;

              if (newTotalOverlapScore > this.totalOverlapScore) {
                this.rotateSubtree(neighbourA.id, vertexB.id, -angleA, vertexB.position);
                this.rotateSubtree(neighbourB.id, vertexB.id, -angleB, vertexB.position);
              } else {
                this.totalOverlapScore = newTotalOverlapScore;
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
  edgeRingCount(edgeId) {
    let edge = this.graph.edges[edgeId];
    let a = this.graph.vertices[edge.sourceId];
    let b = this.graph.vertices[edge.targetId];

    return Math.min(a.value.rings.length, b.value.rings.length);
  }

  /**
   * Returns an array containing the bridged rings associated with this  molecule.
   *
   * @returns {SmilesDrawer.Ring[]} An array containing all bridged rings associated with this molecule.
   */
  getBridgedRings() {
    let bridgedRings = [];

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
  getFusedRings() {
    let fusedRings = [];

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
  getSpiros() {
    let spiros = [];

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
  printRingInfo() {
    let result = '';
    for (var i = 0; i < this.rings.length; i++) {
      const ring = this.rings[i];

      result += ring.id + ';';
      result += ring.members.length + ';';
      result += ring.neighbours.length + ';';
      result += ring.isSpiro ? 'true;' : 'false;'
      result += ring.isFused ? 'true;' : 'false;'
      result += ring.isBridged ? 'true;' : 'false;'
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
  getTotalOverlapScore() {
    return this.totalOverlapScore;
  }

  /**
   * Returns the ring count of the current molecule.
   *
   * @returns {Number} The ring count.
   */
  getRingCount() {
    return this.rings.length;
  }

  /**
   * Checks whether or not the current molecule  a bridged ring.
   *
   * @returns {Boolean} A boolean indicating whether or not the current molecule  a bridged ring.
   */
  hasBridgedRing() {
    return this.bridgedRing;
  }

  /**
   * Returns the number of heavy atoms (non-hydrogen) in the current molecule.
   *
   * @returns {Number} The heavy atom count.
   */
  getHeavyAtomCount() {
    let hac = 0;

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
  getRingbondType(vertexA, vertexB) {
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
  initRings() {
    let openBonds = new Map();

    // Close the open ring bonds (spanning tree -> graph)
    for (var i = this.graph.vertices.length - 1; i >= 0; i--) {
      let vertex = this.graph.vertices[i];

      if (vertex.value.ringbonds.length === 0) {
        continue;
      }

      for (var j = 0; j < vertex.value.ringbonds.length; j++) {
        let ringbondId = vertex.value.ringbonds[j].id;

        // If the other ringbond id has not been discovered,
        // add it to the open bonds map and continue.
        // if the other ringbond id has already been discovered,
        // create a bond between the two atoms.
        if (!openBonds.has(ringbondId)) {
          openBonds.set(ringbondId, vertex.id);
        } else {
          let sourceVertexId = vertex.id;
          let targetVertexId = openBonds.get(ringbondId);
          let edgeId = this.graph.addEdge(new SmilesDrawer.Edge(sourceVertexId, targetVertexId, 1));
          let targetVertex = this.graph.vertices[targetVertexId];

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
    let rings = SmilesDrawer.SSSR.getRings(this.graph);

    if (rings === null) {
      return;
    }

    for (var i = 0; i < rings.length; i++) {
      let ringVertices = [...rings[i]];
      let ringId = this.addRing(new SmilesDrawer.Ring(ringVertices));

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
        let a = this.rings[i];
        let b = this.rings[j];
        let ringConnection = new SmilesDrawer.RingConnection(a, b);

        // If there are no vertices in the ring connection, then there
        // is no ring connection
        if (ringConnection.vertices.size > 0) {
          this.addRingConnection(ringConnection);
        }
      }
    }

    // Add neighbours to the rings
    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];
      ring.neighbours = SmilesDrawer.RingConnection.getNeighbours(this.ringConnections, ring.id);
    }

    // Anchor the ring to one of it's members, so that the ring center will always
    // be tied to a single vertex when doing repositionings
    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];
      this.graph.vertices[ring.members[0]].value.addAnchoredRing(ring.id);
    }

    // Backup the ring information to restore after placing the bridged ring.
    // This is needed in order to identify aromatic rings and stuff like this in
    // rings that are member of the superring.
    this.backupRingInformation();


    // Replace rings contained by a larger bridged ring with a bridged ring
    while (this.rings.length > 0) {
      let id = -1;
      for (var i = 0; i < this.rings.length; i++) {
        let ring = this.rings[i];

        if (this.isPartOfBridgedRing(ring.id) && !ring.isBridged) {
          id = ring.id;
        }
      }

      if (id === -1) {
        break;
      }

      let ring = this.getRing(id);

      let involvedRings = this.getBridgedRingRings(ring.id);

      this.bridgedRing = true;
      this.createBridgedRing(involvedRings, ring.members[0]);

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
  getBridgedRingRings(ringId) {
    let involvedRings = [];
    let that = this;

    let recurse = function (r) {
      let ring = that.getRing(r);

      involvedRings.push(r);

      for (var i = 0; i < ring.neighbours.length; i++) {
        let n = ring.neighbours[i];

        if (involvedRings.indexOf(n) === -1 &&
          n !== r &&
          SmilesDrawer.RingConnection.isBridge(that.ringConnections, that.graph.vertices, r, n)) {
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
  isPartOfBridgedRing(ringId) {
    for (var i = 0; i < this.ringConnections.length; i++) {
      if (this.ringConnections[i].containsRing(ringId) &&
        this.ringConnections[i].isBridge(this.graph.vertices)) {
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
  createBridgedRing(ringIds, sourceVertexId) {
    let bridgedRing = [];
    let vertices = [];
    let neighbours = [];

    for (var i = 0; i < ringIds.length; i++) {
      let ring = this.getRing(ringIds[i]);
      ring.isPartOfBridged = true;

      for (var j = 0; j < ring.members.length; j++) {
        vertices.push(ring.members[j]);
      }

      for (var j = 0; j < ring.neighbours.length; j++) {
        neighbours.push(ring.neighbours[j]);
      }
    }

    // Remove duplicates
    vertices = SmilesDrawer.ArrayHelper.unique(vertices);

    // A vertex is part of the bridged ring if it only belongs to
    // one of the rings (or to another ring
    // which is not part of the bridged ring).
    let leftovers = [];

    for (var i = 0; i < vertices.length; i++) {
      let vertex = this.graph.vertices[vertices[i]];
      let intersection = SmilesDrawer.ArrayHelper.intersection(ringIds, vertex.value.rings);

      if (vertex.value.rings.length === 1 || intersection.length === 1) {
        bridgedRing.push(vertex.id);
      } else {
        leftovers.push(vertex.id);
      }
    }

    // Vertices can also be part of multiple rings and lay on the bridged ring,
    // however, they have to have at least two neighbours that are not part of
    // two rings
    let tmp = [];
    let insideRing = [];

    for (var i = 0; i < leftovers.length; i++) {
      let vertex = this.graph.vertices[leftovers[i]];
      let onRing = false;

      for (let j = 0; j < vertex.edges.length; j++) {
        if (this.edgeRingCount(vertex.edges[j]) === 1) {
          onRing = true;
        }
      }

      if (onRing) {
        vertex.value.isBridgeNode = true;
        tmp.push(vertex.id);
      } else {
        vertex.value.isBridge = true;
        insideRing.push(vertex.id);
      }
    }

    // Merge the two arrays containing members of the bridged ring
    let ringMembers = SmilesDrawer.ArrayHelper.merge(bridgedRing, tmp)
    ringMembers = SmilesDrawer.ArrayHelper.merge(ringMembers, insideRing);

    // The neighbours of the rings in the bridged ring that are not connected by a
    // bridge are now the neighbours of the bridged ring
    neighbours = SmilesDrawer.ArrayHelper.unique(neighbours);
    neighbours = SmilesDrawer.ArrayHelper.removeAll(neighbours, ringIds);

    // Create the ring
    let ring = new SmilesDrawer.Ring(ringMembers);

    ring.isBridged = true;
    ring.neighbours = neighbours;

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
      let vertex = this.graph.vertices[insideRing[i]];

      vertex.value.rings = [];
    }

    // Remove former rings from members of the bridged ring and add the bridged ring
    for (var i = 0; i < ringMembers.length; i++) {
      let vertex = this.graph.vertices[ringMembers[i]];

      vertex.value.rings = SmilesDrawer.ArrayHelper.removeAll(vertex.value.rings, ringIds);
      vertex.value.rings.push(ring.id);
    }

    // Remove all the ring connections no longer used
    for (var i = 0; i < ringIds.length; i++) {
      for (var j = i + 1; j < ringIds.length; j++) {
        this.removeRingConnectionsBetween(ringIds[i], ringIds[j]);
      }
    }

    // Update the ring connections and add this ring to the neighbours neighbours
    for (var i = 0; i < neighbours.length; i++) {
      let connections = this.getRingConnections(neighbours[i], ringIds);

      for (var j = 0; j < connections.length; j++) {
        this.getRingConnection(connections[j]).updateOther(ring.id, neighbours[i]);
      }

      this.getRing(neighbours[i]).neighbours.push(ring.id);
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
  areVerticesInSameRing(vertexA, vertexB) {
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
  getCommonRings(vertexA, vertexB) {
    let commonRings = [];

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
   * @param {SmilesDrawer.Vertex} vertexA A vertex.
   * @param {SmilesDrawer.Vertex} vertexB A vertex.
   * @returns {SmilesDrawer.Ring|null} If a smallest common ring exists, that ring, else null.
   */
  getSmallestCommonRing(vertexA, vertexB) {
    let commonRings = this.getCommonRings(vertexA, vertexB);
    let minSize = Number.MAX_VALUE;
    let smallestCommonRing = null;

    for (var i = 0; i < commonRings.length; i++) {
      let size = this.getRing(commonRings[i]).getSize();

      if (size < minSize) {
        minSize = size;
        smallestCommonRing = this.getRing(commonRings[i]);
      }
    }

    return smallestCommonRing;
  }

  /**
   * Returns the aromatic or largest ring shared by the two vertices.
   *
   * @param {SmilesDrawer.Vertex} vertexA A vertex.
   * @param {SmilesDrawer.Vertex} vertexB A vertex.
   * @returns {SmilesDrawer.Ring|null} If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.
   */
  getLargestOrAromaticCommonRing(vertexA, vertexB) {
    let commonRings = this.getCommonRings(vertexA, vertexB);
    let maxSize = 0;
    let largestCommonRing = null;

    for (var i = 0; i < commonRings.length; i++) {
      let ring = this.getRing(commonRings[i]);
      let size = ring.getSize();

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
  getVerticesAt(position, radius, excludeVertexId) {
    let locals = [];

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

      if (vertex.id === excludeVertexId || !vertex.positioned) {
        continue;
      }

      let distance = position.distance(vertex.position);

      if (distance <= radius) {
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
  getClosestVertex(vertex) {
    let minDist = 99999;
    let minVertex = null;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let v = this.graph.vertices[i];

      if (v.id === vertex.id) {
        continue;
      }

      let distSq = vertex.position.distanceSq(v.position);

      if (distSq < minDist) {
        minDist = distSq;
        minVertex = v;
      }
    }

    return minVertex;
  }

  /**
   * Returns the closest vertex (connected as well as unconnected), which is an endpoint.
   *
   * @param {SmilesDrawer.Vertex} vertex The vertex of which to find the closest other vertex.
   * @returns {SmilesDrawer.Vertex} The closest endpoint vertex.
   */
  getClosestEndpointVertex(vertex) {
    let minDist = 99999;
    let minVertex = null;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let v = this.graph.vertices[i];

      if (v.id === vertex.id || v.getNeighbourCount() > 1) {
        continue;
      }

      let distSq = vertex.position.distanceSq(v.position);

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
  addRing(ring) {
    ring.id = this.ringIdCounter++;
    this.rings.push(ring);

    return ring.id;
  }

  /**
   * Removes a ring from the array of rings associated with the current molecule.
   *
   * @param {Number} ringId A ring id.
   */
  removeRing(ringId) {
    this.rings = this.rings.filter(function (item) {
      return item.id !== ringId;
    });

    // Also remove ring connections involving this ring
    this.ringConnections = this.ringConnections.filter(function (item) {
      return item.firstRingId !== ringId && item.secondRingId !== ringId;
    });

    // Remove the ring as neighbour of other rings
    for (var i = 0; i < this.rings.length; i++) {
      let r = this.rings[i];
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
  getRing(ringId) {
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
  addRingConnection(ringConnection) {
    ringConnection.id = this.ringConnectionIdCounter++;
    this.ringConnections.push(ringConnection);

    return ringConnection.id;
  }

  /**
   * Removes a ring connection from the array of rings connections associated with the current molecule.
   *
   * @param {Number} ringConnectionId A ring connection id.
   */
  removeRingConnection(ringConnectionId) {
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
  removeRingConnectionsBetween(vertexIdA, vertexIdB) {
    let toRemove = [];
    for (var i = 0; i < this.ringConnections.length; i++) {
      let ringConnection = this.ringConnections[i];

      if (ringConnection.firstRingId === vertexIdA && ringConnection.secondRingId === vertexIdB ||
        ringConnection.firstRingId === vertexIdB && ringConnection.secondRingId === vertexIdA) {
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
  getRingConnection(id) {
    for (var i = 0; i < this.ringConnections.length; i++) {
      if (this.ringConnections[i].id == id) {
        return this.ringConnections[i];
      }
    }
  }

  /**
   * Get the ring connections associated with a ring, the ring connections between two rings or the ring connections between one ring and multiple other rings.
   *
   * @param {Number} ringId A ring id.
   * @param {Number|Number[]|null} [ringIds=null] A ring id, an array of ring ids or null.
   * @returns {Number[]} An array of ring connection ids.
   */
  getRingConnections(ringId, ringIds = null) {
    let ringConnections = [];

    if (ringIds === null) {
      for (var i = 0; i < this.ringConnections.length; i++) {
        let ringConnection = this.ringConnections[i];

        if (ringConnection.firstRingId === ringId || ringConnection.secondRingId === ringId) {
          ringConnections.push(ringConnection.id);
        }
      }
    } else if (ringIds.constructor !== Array) {
      for (var i = 0; i < this.ringConnections.length; i++) {
        let ringConnection = this.ringConnections[i];

        if (ringConnection.firstRingId === ringId && ringConnection.secondRingId === ringIds ||
          ringConnection.firstRingId === ringIds && ringConnection.secondRingId === ringId) {
          ringConnections.push(ringConnection.id);
        }
      }
    } else {
      for (var i = 0; i < this.ringConnections.length; i++) {
        for (var j = 0; j < ringIds.length; j++) {
          let id = ringIds[j];
          let ringConnection = this.ringConnections[i];

          if (ringConnection.firstRingId === ringId && ringConnection.secondRingId === id ||
            ringConnection.firstRingId === id && ringConnection.secondRingId === ringId) {
            ringConnections.push(ringConnection.id);
          }
        }
      }
    }

    return ringConnections;
  }

  /**
   * Check whether or not the two vertices specified span a bond which is a ring connection (fused rings).
   * 
   * @param {Number} vertexIdA A vertex id.
   * @param {Number} vertexIdB A vertex id.
   * @returns {Boolean} Returns a boolean indicating whether or not the two vertices specify a ringbond.
   */
  isRingConnection(vertexIdA, vertexIdB) {
    for (var i = 0; i < this.ringConnections.length; i++) {
      let ringConnection = this.ringConnections[i];

      if (ringConnection.vertices.size !== 2) {
        continue;
      }

      if (ringConnection.vertices.has(vertexIdA) && ringConnection.vertices.has(vertexIdB)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.
   *
   * @returns {Object} Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }
   */
  getOverlapScore() {
    let total = 0.0;
    let overlapScores = new Float32Array(this.graph.vertices.length);

    for (var i = 0; i < this.graph.vertices.length; i++) {
      overlapScores[i] = 0;
    }

    for (var i = 0; i < this.graph.vertices.length; i++) {
      for (var j = i + 1; j < this.graph.vertices.length; j++) {
        let a = this.graph.vertices[i];
        let b = this.graph.vertices[j];

        let dist = SmilesDrawer.Vector2.subtract(a.position, b.position).length();

        if (dist < this.opts.bondLength) {
          let weighted = (this.opts.bondLength - dist) / this.opts.bondLength;
          total += weighted;
          overlapScores[i] += weighted;
          overlapScores[j] += weighted;
        }
      }
    }

    let sortable = [];

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
  chooseSide(vertexA, vertexB, sides) {
    // Check which side has more vertices
    // Get all the vertices connected to the both ends
    let an = vertexA.getNeighbours(vertexB.id);
    let bn = vertexB.getNeighbours(vertexA.id);
    let anCount = an.length;
    let bnCount = bn.length;

    // All vertices connected to the edge vertexA to vertexB
    let tn = SmilesDrawer.ArrayHelper.merge(an, bn);

    // Only considering the connected vertices
    let sideCount = [0, 0];

    for (var i = 0; i < tn.length; i++) {
      let v = this.graph.vertices[tn[i]].position;

      if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
        sideCount[0]++;
      } else {
        sideCount[1]++;
      }
    }

    // Considering all vertices in the graph, this is to resolve ties
    // from the above side counts
    let totalSideCount = [0, 0];

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let v = this.graph.vertices[i].position;

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

  /**
   * Checks whether or not two vertices are connected.
   *
   * @param {Number} vertexIdA A vertex id.
   * @param {Number} vertexIdA A vertex id.
   * @returns {Boolean} A boolean indicating whether or not two vertices are connected.
   */
  areConnected(vertexIdA, vertexIdB) {
    for (var i = 0; i < this.graph.edges.length; i++) {
      let edge = this.graph.edges[i];

      if (edge.sourceId === vertexIdA && edge.targetId === vertexIdB ||
        edge.sourceId === vertexIdB && edge.targetId === vertexIdA) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the weight of the edge between two given vertices.
   *
   * @param {Number} vertexIdA A vertex id.
   * @param {Number} vertexIdB A vertex id.
   * @returns {Number|null} The weight of the edge or, if no edge can be found, null.
   */
  getEdgeWeight(vertexIdA, vertexIdB) {
    for (var i = 0; i < this.graph.edges.length; i++) {
      let edge = this.graph.edges[i];

      if (edge.sourceId == vertexIdA && edge.targetId == vertexIdB ||
        edge.targetId == vertexIdA && edge.sourceId == vertexIdB) {
        return edge.weight;
      }
    }

    return null;
  }

  /**
   * Returns the weight of the edge between two given vertices.
   *
   * @param {SmilesDrawer.Ring} ring A ring.
   */
  setRingCenter(ring) {
    let ringSize = ring.getSize();
    let total = new SmilesDrawer.Vector2();

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
  getSubringCenter(ring, vertex) {
    let rings = vertex.value.originalRings;
    let center = ring.center;
    let smallest = Number.MAX_VALUE;

    // Always get the smallest ring.
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
  drawEdges(debug) {
    let that = this;
    let drawn = Array(this.graph.edges.length);
    drawn.fill(false);

    this.graph.traverseBF(0, function (vertex) {
      let edges = that.graph.getEdges(vertex.id);
      for (var i = 0; i < edges.length; i++) {
        let edgeId = edges[i];
        if (!drawn[edgeId]) {
          drawn[edgeId] = true;
          that.drawEdge(edgeId, debug);
        }
      }
    });

    // Draw ring for implicitly defined aromatic rings
    if (!this.bridgedRing) {
      for (var i = 0; i < this.rings.length; i++) {
        let ring = this.rings[i];

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
  drawEdge(edgeId, debug) {
    let that = this;
    let edge = this.graph.edges[edgeId];
    let vertexA = this.graph.vertices[edge.sourceId];
    let vertexB = this.graph.vertices[edge.targetId];
    let elementA = vertexA.value.element;
    let elementB = vertexB.value.element;

    if ((!vertexA.value.isDrawn || !vertexB.value.isDrawn) && this.opts.atomVisualization === 'default') {
      return;
    }

    let a = vertexA.position;
    let b = vertexB.position;
    let normals = this.getEdgeNormals(edge);

    // Create a point on each side of the line
    let sides = SmilesDrawer.ArrayHelper.clone(normals);

    sides[0].multiplyScalar(10).add(a);
    sides[1].multiplyScalar(10).add(a);

    if (edge.bondType === '=' || this.getRingbondType(vertexA, vertexB) === '=' ||
      (edge.isPartOfAromaticRing && this.bridgedRing)) {
      // Always draw double bonds inside the ring
      let inRing = this.areVerticesInSameRing(vertexA, vertexB);
      let s = this.chooseSide(vertexA, vertexB, sides);

      if (inRing) {
        // Always draw double bonds inside a ring
        // if the bond is shared by two rings, it is drawn in the larger
        // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
        let lcr = this.getLargestOrAromaticCommonRing(vertexA, vertexB);
        let center = lcr.center;

        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.multiplyScalar(that.opts.bondSpacing);
        });

        // Choose the normal that is on the same side as the center
        let line = null;

        if (center.sameSideAs(vertexA.position, vertexB.position, SmilesDrawer.Vector2.add(a, normals[0]))) {
          line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
        } else {
          line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);
        }

        line.shorten(this.opts.bondLength - this.opts.shortBondLength);

        // The shortened edge
        if (edge.isPartOfAromaticRing) {
          this.canvasWrapper.drawLine(line, true, 0.25);
        } else {
          this.canvasWrapper.drawLine(line);
        }

        // The normal edge
        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
      } else if (edge.center) {
        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.multiplyScalar(that.opts.bondSpacing / 2.0)
        });

        let lineA = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
        let lineB = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

        this.canvasWrapper.drawLine(lineA);
        this.canvasWrapper.drawLine(lineB);
      } else if (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
        // Both lines are the same length here
        // Add the spacing to the edges (which are of unit length)
        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.multiplyScalar(that.opts.bondSpacing / 2)
        });

        let lineA = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
        let lineB = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

        this.canvasWrapper.drawLine(lineA);
        this.canvasWrapper.drawLine(lineB);
      } else if (s.sideCount[0] > s.sideCount[1]) {
        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.multiplyScalar(that.opts.bondSpacing)
        });

        let line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);

        line.shorten(this.opts.bondLength - this.opts.shortBondLength);
        this.canvasWrapper.drawLine(line);
        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
      } else if (s.sideCount[0] < s.sideCount[1]) {
        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.multiplyScalar(that.opts.bondSpacing)
        });

        let line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

        line.shorten(this.opts.bondLength - this.opts.shortBondLength);
        this.canvasWrapper.drawLine(line);
        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
      } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.multiplyScalar(that.opts.bondSpacing)
        });

        let line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);

        line.shorten(this.opts.bondLength - this.opts.shortBondLength);
        this.canvasWrapper.drawLine(line);
        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
      } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.multiplyScalar(that.opts.bondSpacing)
        });

        let line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

        line.shorten(this.opts.bondLength - this.opts.shortBondLength);
        this.canvasWrapper.drawLine(line);
        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
      } else {

      }
    } else if (edge.bondType === '#') {
      SmilesDrawer.ArrayHelper.each(normals, function (v) {
        v.multiplyScalar(that.opts.bondSpacing / 1.5)
      });

      let lineA = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
      let lineB = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

      this.canvasWrapper.drawLine(lineA);
      this.canvasWrapper.drawLine(lineB);

      this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
    } else if (edge.bondType === '.') {
      // TODO: Something... maybe... version 2?
    } else {
      let isChiralCenterA = vertexA.value.bracket && vertexA.value.bracket.chirality;
      let isChiralCenterB = vertexB.value.bracket && vertexB.value.bracket.chirality;

      if (edge.chiral === 'up') {
        this.canvasWrapper.drawWedge(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      } else if (edge.chiral === 'down') {
        this.canvasWrapper.drawDashedWedge(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      } else {
        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      }
    }

    if (debug) {
      let midpoint = SmilesDrawer.Vector2.midpoint(a, b);
      this.canvasWrapper.drawDebugText(midpoint.x, midpoint.y, 'e: ' + edgeId);
    }
  }

  /**
   * Draws the vertices representing atoms to the canvas.
   *
   * @param {Boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
   */
  drawVertices(debug) {
    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];
      let atom = vertex.value;
      let charge = 0;
      let isotope = 0;
      let bondCount = this.getBondCount(vertex);
      let element = atom.element;
      let hydrogens = SmilesDrawer.Atom.maxBonds[element] - bondCount;
      let dir = vertex.getTextDirection(this.graph.vertices);
      let isTerminal = this.opts.terminalCarbons || element !== 'C' || atom.hasAttachedPseudoElements ? vertex.isTerminal() : false;
      let isCarbon = atom.element === 'C';

      if (atom.bracket) {
        hydrogens = atom.bracket.hcount;
        charge = atom.bracket.charge;
        isotope = atom.bracket.isotope;
      }

      if (this.opts.atomVisualization === 'allballs') {
        this.canvasWrapper.drawBall(vertex.position.x, vertex.position.y, element);
      } else if (atom.isDrawn && (!isCarbon || atom.drawExplicit || isTerminal || atom.hasAttachedPseudoElements)) {
        if (this.opts.atomVisualization === 'default') {
          this.canvasWrapper.drawText(vertex.position.x, vertex.position.y,
            element, hydrogens, dir, isTerminal, charge, isotope, atom.getAttachedPseudoElements());
        } else if (this.opts.atomVisualization === 'balls') {
          this.canvasWrapper.drawBall(vertex.position.x, vertex.position.y, element);
        }
      } else if (vertex.getNeighbourCount() === 2) {
        // If there is a carbon which bonds are in a straight line, draw a dot
        let a = this.graph.vertices[vertex.neighbours[0]].position;
        let b = this.graph.vertices[vertex.neighbours[1]].position;
        let angle = SmilesDrawer.Vector2.threePointangle(vertex.position, a, b);

        if (Math.abs(Math.PI - angle) < 0.1) {
          this.canvasWrapper.drawPoint(vertex.position.x, vertex.position.y, element);
        }
      }

      if (debug) {
        let value = 'v: ' + vertex.id + ' ' + SmilesDrawer.ArrayHelper.print(atom.ringbonds);
        this.canvasWrapper.drawDebugText(vertex.position.x, vertex.position.y, value);
      }
    }

    // Draw the ring centers for debug purposes
    if (this.opts.debug) {
      for (var i = 0; i < this.rings.length; i++) {
        let center = this.rings[i].center;
        this.canvasWrapper.drawDebugPoint(center.x, center.y, 'r: ' + this.rings[i].id);
      }
    }
  }

  /**
   * Position the vertices according to their bonds and properties.
   */
  position() {
    let startVertex = null;

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
   * Reset the positions of rings and vertices. The previous positions will be backed up.
   */
  clearPositions() {
    this.vertexPositionsBackup = [];
    this.ringPositionsBackup = [];

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

      this.vertexPositionsBackup.push(vertex.position.clone());
      vertex.positioned = false;
      vertex.setPositionFromVector(new SmilesDrawer.Vector2());
    }

    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];

      this.ringPositionsBackup.push(ring.center.clone());
      ring.positioned = false;
      ring.center = new SmilesDrawer.Vector2();
    }
  }

  /**
   * Restore the positions backed up during the last clearPositions() call.
   */
  restorePositions() {
    for (var i = 0; i < this.vertexPositionsBackup.length; i++) {
      this.graph.vertices[i].setPositionFromVector(this.vertexPositionsBackup[i]);
      this.graph.vertices[i].positioned = true;
    }

    for (var i = 0; i < this.ringPositionsBackup.length; i++) {
      this.rings[i].center = this.ringPositionsBackup[i];
      this.rings[i].positioned = true;
    }
  }

  /**
   * Stores the current information associated with rings.
   */
  backupRingInformation() {
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
  restoreRingInformation() {
    // Get the subring centers from the bridged rings
    let bridgedRings = this.getBridgedRings();

    this.rings = [];
    this.ringConnections = [];

    for (var i = 0; i < bridgedRings.length; i++) {
      let bridgedRing = bridgedRings[i];

      for (var j = 0; j < bridgedRing.rings.length; j++) {
        let ring = bridgedRing.rings[j];
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
  createRing(ring, center = null, startVertex = null, previousVertex = null) {
    if (ring.positioned) {
      return;
    }

    center = center ? center : new SmilesDrawer.Vector2(0, 0);

    let orderedNeighbours = ring.getOrderedNeighbours(this.ringConnections);
    let startingAngle = startVertex ? SmilesDrawer.Vector2.subtract(startVertex.position, center).angle() : 0;

    let radius = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());
    let angle = SmilesDrawer.MathHelper.centralAngle(ring.getSize());

    ring.centralAngle = angle;

    let a = startingAngle;
    let that = this;
    let startVertexId = (startVertex) ? startVertex.id : null;

    if (ring.members.indexOf(startVertexId) === -1) {
      if (startVertex) {
        startVertex.positioned = false;
      }

      startVertexId = ring.members[0];
    }

    // If the ring is bridged, then draw the vertices inside the ring
    // using a force based approach
    if (ring.isBridged) {
      this.graph.kkLayout(ring.members, center, startVertex.id, ring, this.opts.bondLength);
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
        let vertex = that.graph.vertices[v];

        if (!vertex.positioned) {
          vertex.setPosition(center.x + Math.cos(a) * radius, center.y + Math.sin(a) * radius);
        }

        a += angle;

        if (!ring.isBridged || ring.rings.length < 3) {
          vertex.positioned = true;
        }
      }, startVertexId, (previousVertex) ? previousVertex.id : null);
    }

    ring.positioned = true;
    ring.center = center;

    // Draw neighbours in decreasing order of connectivity
    for (var i = 0; i < orderedNeighbours.length; i++) {
      let neighbour = this.getRing(orderedNeighbours[i].neighbour);

      if (neighbour.positioned) {
        continue;
      }

      let vertices = SmilesDrawer.RingConnection.getVertices(this.ringConnections, ring.id, neighbour.id);

      if (vertices.length === 2) {
        // This ring is a fused ring
        ring.isFused = true;
        neighbour.isFused = true;

        let vertexA = this.graph.vertices[vertices[0]];
        let vertexB = this.graph.vertices[vertices[1]];

        // Get middle between vertex A and B
        let midpoint = SmilesDrawer.Vector2.midpoint(vertexA.position, vertexB.position);

        // Get the normals to the line between A and B
        let normals = SmilesDrawer.Vector2.normals(vertexA.position, vertexB.position);

        // Normalize the normals
        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.normalize()
        });

        // Set length from middle of side to center (the apothem)
        let r = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, neighbour.getSize());
        let apothem = SmilesDrawer.MathHelper.apothem(r, neighbour.getSize());

        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.multiplyScalar(apothem)
        });

        // Move normals to the middle of the line between a and b
        SmilesDrawer.ArrayHelper.each(normals, function (v) {
          v.add(midpoint)
        });

        // Pick the normal which results in a larger distance to the previous center
        // Also check whether it's inside another ring
        let nextCenter = normals[0];
        if (SmilesDrawer.Vector2.subtract(center, normals[1]).length() > SmilesDrawer.Vector2.subtract(center, normals[0]).length()) {
          nextCenter = normals[1];
        }

        // Get the vertex (A or B) which is in clock-wise direction of the other
        let posA = SmilesDrawer.Vector2.subtract(vertexA.position, nextCenter);
        let posB = SmilesDrawer.Vector2.subtract(vertexB.position, nextCenter);

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

        let vertexA = this.graph.vertices[vertices[0]];

        // Get the vector pointing from the shared vertex to the new centpositioner
        let nextCenter = SmilesDrawer.Vector2.subtract(center, vertexA.position);

        nextCenter.invert();
        nextCenter.normalize();

        // Get the distance from the vertex to the center
        let r = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, neighbour.getSize());

        nextCenter.multiplyScalar(r);
        nextCenter.add(vertexA.position);

        if (!neighbour.positioned) {
          this.createRing(neighbour, nextCenter, vertexA);
        }
      }
    }

    // Next, draw atoms that are not part of a ring that are directly attached to this ring
    for (var i = 0; i < ring.members.length; i++) {
      let ringMember = this.graph.vertices[ring.members[i]];
      let ringMemberNeighbours = ringMember.getNeighbours();

      // If there are multiple, the ovlerap will be resolved in the appropriate step
      for (var j = 0; j < ringMemberNeighbours.length; j++) {
        let v = this.graph.vertices[ringMemberNeighbours[j]];

        if (v.positioned) {
          continue;
        }

        v.value.isConnectedToRing = true;
        this.createNextBond(v, ringMember, this.getSubringCenter(ring, ringMember));
      }
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
  rotateSubtree(vertexId, parentVertexId, angle, center) {
    let that = this;

    this.traverseTree(vertexId, parentVertexId, function (vertex) {
      vertex.position.rotateAround(angle, center);

      for (var i = 0; i < vertex.value.anchoredRings.length; i++) {
        let ring = that.rings[vertex.value.anchoredRings[i]];

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
  getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) {
    let that = this;
    let score = 0;
    let center = new SmilesDrawer.Vector2();

    this.traverseTree(vertexId, parentVertexId, function (vertex) {
      let s = vertexOverlapScores[vertex.id];
      score += s;

      let position = that.graph.vertices[vertex.id].position.clone();
      position.multiplyScalar(s)
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
  getCurrentCenterOfMass() {
    let total = new SmilesDrawer.Vector2();
    let count = 0;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

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
  getCurrentCenterOfMassInNeigbourhood(vec, r = this.opts.bondLength * 2.0) {
    let total = new SmilesDrawer.Vector2();
    let count = 0;
    let rSq = r * r;

    for (var i = 0; i < this.graph.vertices.length; i++) {
      let vertex = this.graph.vertices[i];

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
  resolvePrimaryOverlaps() {
    let overlaps = [];
    let done = Array(this.graph.vertices.length);

    // Looking for overlaps created by two bonds coming out of a ring atom, which both point straight
    // away from the ring and are thus perfectly overlapping.
    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];

      for (var j = 0; j < ring.members.length; j++) {
        let vertex = this.graph.vertices[ring.members[j]];

        if (done[vertex.id]) {
          continue;
        }

        done[vertex.id] = true;

        // Look for rings where there are atoms with two bonds outside the ring (overlaps)
        let nonRingNeighbours = this.getNonRingNeighbours(vertex.id);

        if (nonRingNeighbours.length > 1) {
          let rings = [];

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
      let overlap = overlaps[i];
    
      if (overlap.vertices.length === 2) {
        let a = overlap.vertices[0];
        let b = overlap.vertices[1];

        if (!a.value.isDrawn || !b.value.isDrawn) {
            continue;
        }

        let angle = (2 * Math.PI - this.getRing(overlap.rings[0]).getAngle()) / 6.0;

        this.rotateSubtree(a.id, overlap.common.id, angle, overlap.common.position);
        this.rotateSubtree(b.id, overlap.common.id, -angle, overlap.common.position);

        // Decide which way to rotate the vertices depending on the effect it has on the overlap score
        let overlapScore = this.getOverlapScore();        
        let subTreeOverlapA = this.getSubtreeOverlapScore(a.id, overlap.common.id, overlapScore.vertexScores);
        let subTreeOverlapB = this.getSubtreeOverlapScore(b.id, overlap.common.id, overlapScore.vertexScores);
        let total = subTreeOverlapA.value + subTreeOverlapB.value;

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
  resolveSecondaryOverlaps(scores) {
    for (var i = 0; i < scores.length; i++) {
      if (scores[i].score > this.opts.bondLength / (4.0 * this.opts.bondLength)) {
        let vertex = this.graph.vertices[scores[i].id];

        if (vertex.isTerminal()) {
          let closest = this.getClosestVertex(vertex);

          if (closest) {
            // If one of the vertices is the first one, the previous vertex is not the central vertex but the dummy
            // so take the next rather than the previous, which is vertex 1
            let closestPosition = null;

            if (closest.isTerminal()) {
              closestPosition = closest.id === 0 ? this.graph.vertices[1].position : closest.previousPosition
            } else {
              closestPosition = closest.id === 0 ? this.graph.vertices[1].position : closest.position
            }

            let vertexPreviousPosition = vertex.id === 0 ? this.graph.vertices[1].position : vertex.previousPosition;

            vertex.position.rotateAwayFrom(closestPosition, vertexPreviousPosition, SmilesDrawer.MathHelper.toRad(20));
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
   */
  createNextBond(vertex, previousVertex, ringOrAngle, dir) {
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


      let dummy = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
      dummy.rotate(SmilesDrawer.MathHelper.toRad(-120));

      vertex.previousPosition = dummy;
      vertex.setPosition(this.opts.bondLength, 0);
      vertex.angle = SmilesDrawer.MathHelper.toRad(-120);
      vertex.globalAngle = vertex.angle;

      // Do not position the vertex if it belongs to a bridged ring that is positioned using a layout algorithm.
      if (vertex.value.bridgedRing === null) {
        vertex.positioned = true;
      }
    } else if (previousVertex.value.originalRings.length === 1) {
      let vecs = Array()
      let neighbours = previousVertex.getNeighbours();

      for (var i = 0; i < neighbours.length; i++) {
        let neighbour = this.graph.vertices[neighbours[i]];

        if (neighbour.positioned && neighbour.value.originalRings.length > 0) {
          vecs.push(SmilesDrawer.Vector2.subtract(neighbour.position, previousVertex.position));
        }
      }

      let avg = SmilesDrawer.Vector2.averageDirection(vecs);
      vertex.setPositionFromVector(avg.invert().multiplyScalar(this.opts.bondLength).add(previousVertex.position));
      vertex.previousPosition = previousVertex.position;
      vertex.positioned = true;
    } else if (previousVertex.value.originalRings.length > 1) {
      let vecs = Array()
      let neighbours = previousVertex.getNeighbours();
      
      for (var i = 0; i < neighbours.length; i++) {
        let neighbour = this.graph.vertices[neighbours[i]];
        
        if (neighbour.positioned && neighbour.value.originalRings.length > 1) {
          vecs.push(SmilesDrawer.Vector2.subtract(neighbour.position, previousVertex.position));
        }
      }

      let avg = SmilesDrawer.Vector2.averageDirection(vecs);
      avg.invert().multiplyScalar(this.opts.bondLength).add(previousVertex.position);

      // Invert if too close to another of the averaged vertices (resolve situations like: CC1CC2NCC3(N)CC1(C)C23CC#C)
      for (var i = 0; i < neighbours.length; i++) {
        let neighbour = this.graph.vertices[neighbours[i]];

        if (!neighbour.positioned) {
          continue;
        }

        if (SmilesDrawer.Vector2.threePointangle(avg, previousVertex.position, neighbour.position) > 3.1) {
          avg.rotateAround(Math.PI, previousVertex.position);
          break;
        }
      }

      vertex.previousPosition = previousVertex.position;
      vertex.setPositionFromVector(avg);
      vertex.positioned = true;
    } else {
      // Here, ringOrAngle is always an angle

      // If the previous vertex was not part of a ring, draw a bond based
      // on the global angle of the previous bond
      let v = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
      v.rotate(ringOrAngle);
      v.add(previousVertex.position);

      vertex.globalAngle = ringOrAngle;
      vertex.setPositionFromVector(v);
      vertex.previousPosition = previousVertex.position;
      vertex.positioned = true;
    }

    // Go to next vertex
    // If two rings are connected by a bond ...
    if (vertex.value.bridgedRing !== null) {
      let nextRing = this.getRing(vertex.value.bridgedRing);
      let nextCenter = SmilesDrawer.Vector2.subtract(vertex.previousPosition, vertex.position);

      nextCenter.invert();
      nextCenter.normalize();

      let r = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, nextRing.members.length);
      nextCenter.multiplyScalar(r);
      nextCenter.add(vertex.position);


      if (!nextRing.positioned) {
        this.createRing(nextRing, nextCenter, vertex);
      }
    } else if (vertex.value.rings.length > 0) {
      let nextRing = this.getRing(vertex.value.rings[0]);
      let nextCenter = SmilesDrawer.Vector2.subtract(vertex.previousPosition, vertex.position);

      nextCenter.invert();
      nextCenter.normalize();

      let r = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, nextRing.getSize());

      nextCenter.multiplyScalar(r);
      nextCenter.add(vertex.position);

      if (!nextRing.positioned) {
        this.createRing(nextRing, nextCenter, vertex);
      }
    } else {
      // Draw the non-ring vertices connected to this one        
      let neighbours = vertex.getNeighbours();

      if (previousVertex) {
        neighbours = SmilesDrawer.ArrayHelper.remove(neighbours, previousVertex.id);
      }

      let angle = vertex.getAngle();

      if (neighbours.length === 1) {
        let nextVertex = this.graph.vertices[neighbours[0]];

        // Make a single chain always cis except when there's a tribble (yes, this is a Star Trek reference) bond
        // or if there are successive double bonds
        if ((vertex.value.bondType === '#' || (previousVertex && previousVertex.value.bondType === '#')) ||
          vertex.value.bondType === '=' && previousVertex && previousVertex.value.bondType === '=') {
          vertex.value.drawExplicit = true;

          if (previousVertex) {
            let straightEdge1 = this.graph.getEdge(vertex.id, previousVertex.id);
            straightEdge1.center = true;
          }

          let straightEdge2 = this.graph.getEdge(vertex.id, nextVertex.id);
          straightEdge2.center = true;

          nextVertex.drawExplicit = true;
          nextVertex.globalAngle = angle;
          nextVertex.angle = 0.0;
          this.createNextBond(nextVertex, vertex, nextVertex.globalAngle, -dir);
        } else if (previousVertex && previousVertex.value.rings.length > 0) {
          // If coming out of a ring, always draw away from the center of mass
          let proposedAngleA = SmilesDrawer.MathHelper.toRad(60);
          let proposedAngleB = -proposedAngleA;

          let proposedVectorA = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
          let proposedVectorB = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

          proposedVectorA.rotate(proposedAngleA).add(vertex.position);
          proposedVectorB.rotate(proposedAngleB).add(vertex.position);

          // let centerOfMass = this.getCurrentCenterOfMassInNeigbourhood(vertex.position, 100);
          let centerOfMass = this.getCurrentCenterOfMass();
          let distanceA = proposedVectorA.distance(centerOfMass);
          let distanceB = proposedVectorB.distance(centerOfMass);

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
            let proposedAngleA = SmilesDrawer.MathHelper.toRad(60);
            let proposedAngleB = -proposedAngleA;

            let proposedVectorA = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
            let proposedVectorB = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

            proposedVectorA.rotate(proposedAngleA).add(vertex.position);
            proposedVectorB.rotate(proposedAngleB).add(vertex.position);

            let centerOfMass = this.getCurrentCenterOfMass();
            let distanceA = proposedVectorA.distance(centerOfMass);
            let distanceB = proposedVectorB.distance(centerOfMass);

            nextVertex.angle = distanceA < distanceB ? proposedAngleB : proposedAngleA;

            if (nextVertex.angle > 0) {
              dir = -1;
            } else {
              dir = 1;
            }
          } else {
            nextVertex.angle = SmilesDrawer.MathHelper.toRad(60) * dir;
            dir = -dir;
          }

          nextVertex.globalAngle = angle + nextVertex.angle;
          this.createNextBond(nextVertex, vertex, nextVertex.globalAngle, dir);
        }
      } else if (neighbours.length === 2) {
        // Check for the longer subtree - always go with cis for the longer subtree
        let subTreeDepthA = this.getTreeDepth(neighbours[0], vertex.id);
        let subTreeDepthB = this.getTreeDepth(neighbours[1], vertex.id);

        // Also get the subtree for the previous direction (this is important when
        // the previous vertex is the shortest path)
        let subTreeDepthC = this.getTreeDepth(previousVertex ? previousVertex.id : null, vertex.id);

        let cis = 0;
        let trans = 1;

        if (subTreeDepthA > subTreeDepthB) {
          cis = 1;
          trans = 0;
        }

        let cisVertex = this.graph.vertices[neighbours[cis]];
        let transVertex = this.graph.vertices[neighbours[trans]];

        // If the origin tree is the shortest, set both vertices to trans
        if (subTreeDepthC < subTreeDepthA && subTreeDepthC < subTreeDepthB) {
          if (vertex.position.clockwise(vertex.previousPosition) === 1) {
            transVertex.angle = SmilesDrawer.MathHelper.toRad(60);
            cisVertex.angle = -SmilesDrawer.MathHelper.toRad(60);
            transVertex.globalAngle = angle + transVertex.angle;
            cisVertex.globalAngle = angle + cisVertex.angle;

            this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
            this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, dir);
          } else {
            transVertex.angle = -SmilesDrawer.MathHelper.toRad(60);
            cisVertex.angle = SmilesDrawer.MathHelper.toRad(60);
            transVertex.globalAngle = angle + transVertex.angle;
            cisVertex.globalAngle = angle + cisVertex.angle;

            this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, dir);
            this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
          }
        } else {
          if (vertex.position.clockwise(vertex.previousPosition) === 1) {
            transVertex.angle = SmilesDrawer.MathHelper.toRad(60);
            cisVertex.angle = -SmilesDrawer.MathHelper.toRad(60);
            transVertex.globalAngle = angle + transVertex.angle;
            cisVertex.globalAngle = angle + cisVertex.angle;

            this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
            this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, -dir);
          } else {
            transVertex.angle = -SmilesDrawer.MathHelper.toRad(60);
            cisVertex.angle = SmilesDrawer.MathHelper.toRad(60);
            transVertex.globalAngle = angle + transVertex.angle;
            cisVertex.globalAngle = angle + cisVertex.angle;

            this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, -dir);
            this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
          }
        }
      } else if (neighbours.length === 3) {
        // The vertex with the longest sub-tree should always go straight
        let d1 = this.getTreeDepth(neighbours[0], vertex.id);
        let d2 = this.getTreeDepth(neighbours[1], vertex.id);
        let d3 = this.getTreeDepth(neighbours[2], vertex.id);

        let s = this.graph.vertices[neighbours[0]];
        let l = this.graph.vertices[neighbours[1]];
        let r = this.graph.vertices[neighbours[2]];

        if (d2 > d1 && d2 > d3) {
          s = this.graph.vertices[neighbours[1]];
          l = this.graph.vertices[neighbours[0]];
          r = this.graph.vertices[neighbours[2]];
        } else if (d3 > d1 && d3 > d2) {
          s = this.graph.vertices[neighbours[2]];
          l = this.graph.vertices[neighbours[0]];
          r = this.graph.vertices[neighbours[1]];
        }

        if (this.getTreeDepth(l.id, vertex.id) === 1 &&
          this.getTreeDepth(r.id, vertex.id) === 1 &&
          this.getTreeDepth(s.id, vertex.id) > 1) {

          if (!dir) {
            let proposedAngleA = SmilesDrawer.MathHelper.toRad(60);
            let proposedAngleB = -proposedAngleA;

            let proposedVectorA = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
            let proposedVectorB = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

            proposedVectorA.rotate(proposedAngleA).add(vertex.position);
            proposedVectorB.rotate(proposedAngleB).add(vertex.position);

            // let centerOfMass = this.getCurrentCenterOfMassInNeigbourhood(vertex.position, 100);
            let centerOfMass = this.getCurrentCenterOfMass();
            let distanceA = proposedVectorA.distance(centerOfMass);
            let distanceB = proposedVectorB.distance(centerOfMass);

            s.angle = distanceA < distanceB ? proposedAngleB : proposedAngleA;

            if (s.angle > 0) {
              dir = -1;
            } else {
              dir = 1;
            }
          } else {
            s.angle = SmilesDrawer.MathHelper.toRad(60) * dir;
            dir = -dir;
          }

          s.globalAngle = angle + s.angle;

          this.createNextBond(s, vertex, s.globalAngle, -dir);

          // If it's chiral, the order changes - for anticlockwise, switch the draw order around
          // to keep the drawing the same
          if (vertex.value.bracket && vertex.value.bracket.chirality === '@@') {
            r.angle = SmilesDrawer.MathHelper.toRad(30) * dir;
            l.angle = SmilesDrawer.MathHelper.toRad(90) * dir;

            r.globalAngle = angle + r.angle;
            l.globalAngle = angle + l.angle;

            this.createNextBond(r, vertex, r.globalAngle);
            this.createNextBond(l, vertex, l.globalAngle);
          } else {
            l.angle = SmilesDrawer.MathHelper.toRad(30) * dir;
            r.angle = SmilesDrawer.MathHelper.toRad(90) * dir;

            l.globalAngle = angle + l.angle;
            r.globalAngle = angle + r.angle;

            this.createNextBond(l, vertex, l.globalAngle);
            this.createNextBond(r, vertex, r.globalAngle);
          }
        } else {
          s.angle = 0.0;
          l.angle = SmilesDrawer.MathHelper.toRad(90);
          r.angle = -SmilesDrawer.MathHelper.toRad(90);

          s.globalAngle = angle + s.angle;
          l.globalAngle = angle + l.angle;
          r.globalAngle = angle + r.angle;

          this.createNextBond(s, vertex, s.globalAngle);
          this.createNextBond(l, vertex, l.globalAngle);
          this.createNextBond(r, vertex, r.globalAngle);
        }
      } else if (neighbours.length === 4) {
        // The vertex with the longest sub-tree should always go to the reflected opposide direction
        let d1 = this.getTreeDepth(neighbours[0], vertex.id);
        let d2 = this.getTreeDepth(neighbours[1], vertex.id);
        let d3 = this.getTreeDepth(neighbours[2], vertex.id);
        let d4 = this.getTreeDepth(neighbours[3], vertex.id);

        let w = this.graph.vertices[neighbours[0]];
        let x = this.graph.vertices[neighbours[1]];
        let y = this.graph.vertices[neighbours[2]];
        let z = this.graph.vertices[neighbours[3]];

        if (d2 > d1 && d2 > d3 && d2 > d4) {
          w = this.graph.vertices[neighbours[1]];
          x = this.graph.vertices[neighbours[0]];
          y = this.graph.vertices[neighbours[2]];
          z = this.graph.vertices[neighbours[3]];
        } else if (d3 > d1 && d3 > d2 && d3 > d4) {
          w = this.graph.vertices[neighbours[2]];
          x = this.graph.vertices[neighbours[0]];
          y = this.graph.vertices[neighbours[1]];
          z = this.graph.vertices[neighbours[3]];
        } else if (d4 > d1 && d4 > d2 && d4 > d3) {
          w = this.graph.vertices[neighbours[3]];
          x = this.graph.vertices[neighbours[0]];
          y = this.graph.vertices[neighbours[1]];
          z = this.graph.vertices[neighbours[2]];
        }

        w.angle = -SmilesDrawer.MathHelper.toRad(36);
        x.angle = SmilesDrawer.MathHelper.toRad(36);
        y.angle = -SmilesDrawer.MathHelper.toRad(108);
        z.angle = SmilesDrawer.MathHelper.toRad(108);

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
  getCommonRingbondNeighbour(vertex) {
    let neighbours = vertex.getNeighbours();

    for (var i = 0; i < neighbours.length; i++) {
      let neighbour = this.graph.vertices[neighbours[i]];

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
  isPointInRing(vec) {
    for (var i = 0; i < this.rings.length; i++) {
      let ring = this.rings[i];

      if (!ring.positioned) {
        continue;
      }

      let radius = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());
      let radiusSq = radius * radius;

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
  isEdgeInRing(edge) {
    let source = this.graph.vertices[edge.sourceId];
    let target = this.graph.vertices[edge.targetId];

    return this.areVerticesInSameRing(source, target);
  }

  /**
   * Check whether or not an edge is rotatable.
   *
   * @param {SmilesDrawer.Edge} edge An edge.
   * @returns {Boolean} A boolean indicating whether or not the edge is rotatable.
   */
  isEdgeRotatable(edge) {
    let vertexA = this.graph.vertices[edge.sourceId];
    let vertexB = this.graph.vertices[edge.targetId];

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
    if (vertexA.value.rings.length > 0 && vertexB.value.rings.length > 0 &&
      this.areVerticesInSameRing(vertexA, vertexB)) {
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
  isRingAromatic(ring) {
    for (var i = 0; i < ring.members.length; i++) {
      let vertex = this.graph.vertices[ring.members[i]];

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
  getEdgeNormals(edge) {
    let v1 = this.graph.vertices[edge.sourceId].position;
    let v2 = this.graph.vertices[edge.targetId].position;

    // Get the normalized normals for the edge
    let normals = SmilesDrawer.Vector2.units(v1, v2);

    return normals;
  }

  /**
   * Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.
   *
   * @param {Number} vertexId A vertex id.
   * @param {Number} parentVertexId The id of a neighbouring vertex.
   * @returns {Number} The depth of the sub-tree.
   */
  getTreeDepth(vertexId, parentVertexId) {
    if (vertexId === null || parentVertexId === null) {
      return 0;
    }

    let neighbours = this.graph.vertices[vertexId].getSpanningTreeNeighbours(parentVertexId);
    let max = 0;

    for (var i = 0; i < neighbours.length; i++) {
      let childId = neighbours[i];
      let d = this.getTreeDepth(childId, vertexId);

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
  traverseTree(vertexId, parentVertexId, callback, maxDepth = null, ignoreFirst = false, depth = 1, visited = []) {
    if (maxDepth !== null && depth > maxDepth + 1) {
      return;
    }

    for (var j = 0; j < visited.length; j++) {
      if (visited[j] === vertexId) {
        return;
      }
    }

    visited.push(vertexId);

    let vertex = this.graph.vertices[vertexId];
    let neighbours = vertex.getNeighbours(parentVertexId);

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
  getBondCount(vertex) {
    let count = 0;

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
  getNonRingNeighbours(vertexId) {
    let nrneighbours = [];
    let vertex = this.graph.vertices[vertexId];
    let neighbours = vertex.getNeighbours();

    for (var i = 0; i < neighbours.length; i++) {
      let neighbour = this.graph.vertices[neighbours[i]];
      let nIntersections = SmilesDrawer.ArrayHelper.intersection(vertex.value.rings, neighbour.value.rings).length;

      if (nIntersections === 0 && neighbour.value.isBridge == false) {
        nrneighbours.push(neighbour);
      }
    }

    return nrneighbours;
  }

  annotateChirality() {

  }

  /**
   * Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon sets
   * the involved atoms not to be displayed.
   */
  initPseudoElements() {
    for (var i = 0; i < this.graph.vertices.length; i++) {
      const vertex = this.graph.vertices[i];
      const neighbourIds = vertex.getNeighbours();
      let neighbours = [];

      for (var j = 0; j < neighbourIds.length; j++) {
        neighbours.push(this.graph.vertices[neighbourIds[j]]);
      }

      // Ignore atoms that have less than 3 neighbours, except if
      // the vertex is connected to a ring and has two neighbours
      if (vertex.getNeighbourCount() < 3 || vertex.value.rings.length > 0) {
        continue;
      }

      // Continue if there are less than two heteroatoms
      // or if a neighbour has more than 1 neighbour
      let heteroAtomCount = 0;
      let ctn = 0;

      for (var j = 0; j < neighbours.length; j++) {
        let neighbour = neighbours[j];
        let neighbouringElement = neighbour.value.element;
        let neighbourCount = neighbour.getNeighbourCount();

        if (neighbouringElement !== 'C' && neighbouringElement !== 'H' &&
          neighbourCount === 1) {
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
      let previous = null;

      for (var j = 0; j < neighbours.length; j++) {
        let neighbour = neighbours[j];

        if (neighbour.getNeighbourCount() > 1) {
          previous = neighbour;
        }
      }

      for (var j = 0; j < neighbours.length; j++) {
        let neighbour = neighbours[j];

        if (neighbour.getNeighbourCount() > 1) {
          continue;
        }

        neighbour.value.isDrawn = false;

        let hydrogens = SmilesDrawer.Atom.maxBonds[neighbour.value.element] - this.getBondCount(neighbour);

        if (neighbour.value.bracket) {
          hydrogens = neighbour.value.bracket.hcount;
        }

        vertex.value.attachPseudoElement(neighbour.value.element, previous ? previous.value.element : null, hydrogens);
      }
    }

    // The second pass
    for (var i = 0; i < this.graph.vertices.length; i++) {
      const vertex = this.graph.vertices[i];
      const atom = vertex.value;
      const element = atom.element;

      if (element === 'C' || element === 'H' || !atom.isDrawn) {
        continue;
      }

      const neighbourIds = vertex.getNeighbours();
      let neighbours = [];

      for (var j = 0; j < neighbourIds.length; j++) {
        neighbours.push(this.graph.vertices[neighbourIds[j]]);
      }

      for (var j = 0; j < neighbours.length; j++) {
        let neighbour = neighbours[j].value;

        if (!neighbour.hasAttachedPseudoElements || neighbour.getAttachedPseudoElementsCount() !== 2) {
          continue;
        }

        const pseudoElements = neighbour.getAttachedPseudoElements();

        if (pseudoElements.hasOwnProperty('0O') && pseudoElements.hasOwnProperty('3C')) {
          neighbour.isDrawn = false;
          vertex.value.attachPseudoElement('Ac', '', 0);
        }
      }
    }
  }
}