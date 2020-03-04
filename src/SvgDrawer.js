// we use the drawer to do all the preprocessing. then we take over the drawing
// portion to output to svg
const ArrayHelper = require('./ArrayHelper');
const Atom = require('./Atom');
const Drawer = require('./Drawer');
const Graph = require('./Graph');
const Line = require('./Line');
const SvgWrapper = require('./SvgWrapper');
const ThemeManager = require('./ThemeManager');
const Vector2 = require('./Vector2');

class SvgDrawer {
  constructor(options) {
    this.preprocessor = new Drawer(options);
  }

  /**
   * Draws the parsed smiles data to an svg element.
   *
   * @param {Object} data The tree returned by the smiles parser.
   * @param {(String|HTMLElement)} target The id of the HTML svg element the structure is drawn to - or the element itself.
   * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
   * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.

   * @returns {Oject} The dimensions of the drawing in { width, height }
   */
  draw(data, target, themeName = 'light', infoOnly = false) {
    let preprocessor = this.preprocessor;

    preprocessor.initDraw(data, themeName, infoOnly);

    if (!infoOnly) {
      this.themeManager = new ThemeManager(this.preprocessor.opts.themes, themeName);
      this.svgWrapper = new SvgWrapper(this.themeManager, target, this.preprocessor.opts);
    }

    preprocessor.processGraph();

    // Set the canvas to the appropriate size
    this.svgWrapper.determineDimensions(preprocessor.graph.vertices);

    // Do the actual drawing
    this.drawEdges(preprocessor.opts.debug);
    this.drawVertices(preprocessor.opts.debug);

    if (preprocessor.opts.debug) {
      console.debug("SvgDrawer -> draw -> Graph:", preprocessor.graph);
      console.debug("SvgDrawer -> draw -> Rings:", preprocessor.rings);
      console.debug("SvgDrawer -> draw -> RingConnections", preprocessor.ringConnections);
    }

    return this.svgWrapper.constructSvg();
  }

  /**
   * Draws a ring inside a provided ring, indicating aromaticity.
   *
   * @param {Ring} ring A ring.
   */
  drawAromaticityRing(ring) {
    let ctx = this.ctx;
    let radius = MathHelper.apothemFromSideLength(this.opts.bondLength, ring.getSize());

    ctx.save();
    ctx.strokeStyle = this.getColor('C');
    ctx.lineWidth = this.opts.bondThickness;
    ctx.beginPath();
    ctx.arc(ring.center.x + this.offsetX, ring.center.y + this.offsetY,
      radius - this.opts.bondSpacing, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  /**
   * Draw the actual edges as bonds.
   *
   * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
   */
  drawEdges(debug) {
    let preprocessor = this.preprocessor,
      graph = preprocessor.graph,
      rings = preprocessor.rings,
      drawn = Array(this.preprocessor.graph.edges.length);

    drawn.fill(false);

    graph.traverseBF(0, vertex => {
      let edges = graph.getEdges(vertex.id);
      for (var i = 0; i < edges.length; i++) {
        let edgeId = edges[i];
        if (!drawn[edgeId]) {
          drawn[edgeId] = true;
          this.drawEdge(edgeId, debug);
        }
      }
    });

    // Draw ring for implicitly defined aromatic rings
    if (!this.bridgedRing) {
      for (var i = 0; i < rings.length; i++) {
        let ring = rings[i];

        if (preprocessor.isRingAromatic(ring)) {
          this.drawAromaticityRing(ring);
        }
      }
    }
  }

  /**
   * Draw the an edge as a bond.
   *
   * @param {Number} edgeId An edge id.
   * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
   */
  drawEdge(edgeId, debug) {
    let preprocessor = this.preprocessor,
      opts = preprocessor.opts,
      svgWrapper = this.svgWrapper,
      edge = preprocessor.graph.edges[edgeId],
      vertexA = preprocessor.graph.vertices[edge.sourceId],
      vertexB = preprocessor.graph.vertices[edge.targetId],
      elementA = vertexA.value.element,
      elementB = vertexB.value.element;

    if ((!vertexA.value.isDrawn || !vertexB.value.isDrawn) && preprocessor.opts.atomVisualization === 'default') {
      return;
    }

    let a = vertexA.position,
      b = vertexB.position,
      normals = preprocessor.getEdgeNormals(edge),
      // Create a point on each side of the line
      sides = ArrayHelper.clone(normals);

    sides[0].multiplyScalar(10).add(a);
    sides[1].multiplyScalar(10).add(a);

    if (edge.bondType === '=' || preprocessor.getRingbondType(vertexA, vertexB) === '=' ||
      (edge.isPartOfAromaticRing && preprocessor.bridgedRing)) {
      // Always draw double bonds inside the ring
      let inRing = preprocessor.areVerticesInSameRing(vertexA, vertexB);
      let s = preprocessor.chooseSide(vertexA, vertexB, sides);

      if (inRing) {
        // Always draw double bonds inside a ring
        // if the bond is shared by two rings, it is drawn in the larger
        // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
        let lcr = preprocessor.getLargestOrAromaticCommonRing(vertexA, vertexB);
        let center = lcr.center;

        normals[0].multiplyScalar(opts.bondSpacing);
        normals[1].multiplyScalar(opts.bondSpacing);

        // Choose the normal that is on the same side as the center
        let line = null;

        if (center.sameSideAs(vertexA.position, vertexB.position, Vector2.add(a, normals[0]))) {
          line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
        } else {
          line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);
        }

        line.shorten(opts.bondLength - opts.shortBondLength * opts.bondLength);

        // The shortened edge
        if (edge.isPartOfAromaticRing) {
          // preprocessor.canvasWrapper.drawLine(line, true);
          svgWrapper.drawLine(line, true);
        } else {
          // preprocessor.canvasWrapper.drawLine(line);
          svgWrapper.drawLine(line);
        }

        svgWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else if ((edge.center || vertexA.isTerminal() && vertexB.isTerminal()) ||
        (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1)) {
        this.multiplyNormals(normals, opts.halfBondSpacing);

        let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB),
          lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

        svgWrapper.drawLine(lineA);
        svgWrapper.drawLine(lineB);
      } else if ((s.sideCount[0] > s.sideCount[1]) ||
        (s.totalSideCount[0] > s.totalSideCount[1])) {
        this.multiplyNormals(normals, opts.bondSpacing);

        let line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);

        line.shorten(opts.bondLength - opts.shortBondLength * opts.bondLength);

        svgWrapper.drawLine(line);
        svgWrapper.drawLine(new Line(a, b, elementA, elementB));
      } else if ((s.sideCount[0] < s.sideCount[1]) ||
        (s.totalSideCount[0] <= s.totalSideCount[1])) {
        this.multiplyNormals(normals, opts.bondSpacing);

        let line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

        line.shorten(opts.bondLength - opts.shortBondLength * opts.bondLength);
        svgWrapper.drawLine(line);
        svgWrapper.drawLine(new Line(a, b, elementA, elementB));
      }
    } else if (edge.bondType === '#') {
      normals[0].multiplyScalar(opts.bondSpacing / 1.5);
      normals[1].multiplyScalar(opts.bondSpacing / 1.5);

      let lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]), elementA, elementB);
      let lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]), elementA, elementB);

      svgWrapper.drawLine(lineA);
      svgWrapper.drawLine(lineB);
      svgWrapper.drawLine(new Line(a, b, elementA, elementB));
    } else if (edge.bondType === '.') {
      // TODO: Something... maybe... version 2?
    } else {
      let isChiralCenterA = vertexA.value.isStereoCenter;
      let isChiralCenterB = vertexB.value.isStereoCenter;

      if (edge.wedge === 'up') {
        svgWrapper.drawWedge(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      } else if (edge.wedge === 'down') {
        svgWrapper.drawDashedWedge(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      } else {
        svgWrapper.drawLine(new Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
      }
    }

    if (debug) {
      let midpoint = Vector2.midpoint(a, b);
      svgWrapper.drawDebugText(midpoint.x, midpoint.y, 'e: ' + edgeId);
    }
  }

  /**
   * Draws the vertices representing atoms to the canvas.
   *
   * @param {Boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
   */
  drawVertices(debug) {
    let preprocessor = this.preprocessor,
      opts = preprocessor.opts,
      graph = preprocessor.graph,
      rings = preprocessor.rings,
      svgWrapper = this.svgWrapper;

    var i = graph.vertices.length;
    for (var i = 0; i < graph.vertices.length; i++) {
      let vertex = graph.vertices[i];
      let atom = vertex.value;
      let charge = 0;
      let isotope = 0;
      let bondCount = vertex.value.bondCount;
      let element = atom.element;
      let hydrogens = Atom.maxBonds[element] - bondCount;
      let dir = vertex.getTextDirection(graph.vertices);
      let isTerminal = opts.terminalCarbons || element !== 'C' || atom.hasAttachedPseudoElements ? vertex.isTerminal() : false;
      let isCarbon = atom.element === 'C';

      // This is a HACK to remove all hydrogens from nitrogens in aromatic rings, as this
      // should be the most common state. This has to be fixed by kekulization
      if (atom.element === 'N' && atom.isPartOfAromaticRing) {
        hydrogens = 0;
      }

      if (atom.bracket) {
        hydrogens = atom.bracket.hcount;
        charge = atom.bracket.charge;
        isotope = atom.bracket.isotope;
      }

      if (opts.atomVisualization === 'allballs') {
        svgWrapper.drawBall(vertex.position.x, vertex.position.y, element);
      } else if ((atom.isDrawn && (!isCarbon || atom.drawExplicit || isTerminal || atom.hasAttachedPseudoElements)) || graph.vertices.length === 1) {
        if (opts.atomVisualization === 'default') {
          svgWrapper.drawText(vertex.position.x, vertex.position.y,
            element, hydrogens, dir, isTerminal, charge, isotope, atom.getAttachedPseudoElements());
        } else if (opts.atomVisualization === 'balls') {
          svgWrapper.drawBall(vertex.position.x, vertex.position.y, element);
        }
      } else if (vertex.getNeighbourCount() === 2 && vertex.forcePositioned == true) {
        // If there is a carbon which bonds are in a straight line, draw a dot
        let a = graph.vertices[vertex.neighbours[0]].position;
        let b = graph.vertices[vertex.neighbours[1]].position;
        let angle = Vector2.threePointangle(vertex.position, a, b);

        if (Math.abs(Math.PI - angle) < 0.1) {
          svgWrapper.drawPoint(vertex.position.x, vertex.position.y, element);
        }
      }

      if (debug) {
        let value = 'v: ' + vertex.id + ' ' + ArrayHelper.print(atom.ringbonds);
        svgWrapper.drawDebugText(vertex.position.x, vertex.position.y, value);
      } else {
        svgWrapper.drawDebugText(vertex.position.x, vertex.position.y, vertex.value.chirality);
      }
    }

    // Draw the ring centers for debug purposes
    if (opts.debug) {
      for (var i = 0; i < rings.length; i++) {
        let center = rings[i].center;
        svgWrapper.drawDebugPoint(center.x, center.y, 'r: ' + rings[i].id);
      }
    }
  }

  /**
   * Returns the total overlap score of the current molecule.
   *
   * @returns {Number} The overlap score.
   */
  getTotalOverlapScore() {
    return this.preprocessor.getTotalOverlapScore();
  }

  /**
   * Returns the molecular formula of the loaded molecule as a string.
   *
   * @returns {String} The molecular formula.
   */
  getMolecularFormula() {
    return this.preprocessor.getMolecularFormula();
  }

  /**
   * @param {Array} normals list of normals to multiply
   * @param {Number} spacing value to multiply normals by
   */
  multiplyNormals(normals, spacing) {
    normals[0].multiplyScalar(spacing);
    normals[1].multiplyScalar(spacing);
  }
}

module.exports = SvgDrawer;
