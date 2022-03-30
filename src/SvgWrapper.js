const {
  getChargeText
} = require('./UtilityFunctions');

const Line = require('./Line');
const Vector2 = require('./Vector2');
const MathHelper = require('./MathHelper');

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class SvgWrapper {
  constructor(themeManager, target, options) {
    if (typeof target === 'string' || target instanceof String) {
      this.svg = document.getElementById(target);
    } else {
      this.svg = target;
    }
    this.container = null;
    this.opts = options;
    this.uid = makeid(5);
    this.gradientId = 0;

    // maintain a list of line elements and their corresponding gradients
    // maintain a list of vertex elements
    this.paths = [];
    this.vertices = [];
    this.gradients = [];

    // maintain the offset for drawing purposes
    this.offsetX = 0.0;
    this.offsetY = 0.0;

    // maintain the dimensions
    this.drawingWidth = 0;
    this.drawingHeight = 0;
    this.halfBondThickness = this.opts.bondThickness / 2.0;

    // for managing color schemes
    this.themeManager = themeManager;

    // create the mask
    this.maskElements = [];

    let mask = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    mask.setAttributeNS(null, 'x', 0);
    mask.setAttributeNS(null, 'y', 0);
    mask.setAttributeNS(null, 'width', '100%');
    mask.setAttributeNS(null, 'height', '100%');
    mask.setAttributeNS(null, 'fill', 'white');

    this.maskElements.push(mask);

    // clear the svg element
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }

    // Create styles here as text measurement is done before constructSvg
    let style = document.createElementNS('http://www.w3.org/2000/svg', 'style');

    // create the css styles
    style.appendChild(document.createTextNode(`
                .element {
                    font: ${this.opts.fontSizeLarge}pt Helvetica, Arial, sans-serif;
                }
                .sub {
                    font: ${this.opts.fontSizeSmall}pt Helvetica, Arial, sans-serif;
                }
            `));

    if (this.svg) {
      this.svg.appendChild(style);
    } else {
      this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      container.appendChild(style);
    }
  }

  constructSvg() {
    // TODO: add the defs element to put gradients in
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
      masks = document.createElementNS('http://www.w3.org/2000/svg', 'mask'),
      paths = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
      vertices = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
      pathChildNodes = this.paths;

    // give the mask an id
    masks.setAttributeNS(null, 'id', this.uid + '-text-mask');

    for (let path of pathChildNodes) {
      paths.appendChild(path);
    }
    for (let vertex of this.vertices) {
      vertices.appendChild(vertex);
    }
    for (let mask of this.maskElements) {
      masks.appendChild(mask);
    }
    for (let gradient of this.gradients) {
      defs.appendChild(gradient);
    }

    paths.setAttributeNS(null, 'mask', 'url(#' + this.uid + '-text-mask)');

    if (this.svg) {
      this.svg.appendChild(defs);
      this.svg.appendChild(masks);
      this.svg.appendChild(paths);
      this.svg.appendChild(vertices);
    } else {
      this.container.appendChild(defs);
      this.container.appendChild(masks);
      this.container.appendChild(paths);
      this.container.appendChild(vertices);
      return this.container;
    }
  }

  /**
   * Create a linear gradient to apply to a line
   *
   * @param {Line} line the line to apply the gradiation to.
   */
  createGradient(line) {
    // create the gradient and add it
    let gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient'),
      gradientUrl = this.uid + `-line-${this.gradientId++}`,
      l = line.getLeftVector(),
      r = line.getRightVector(),
      fromX = l.x + this.offsetX,
      fromY = l.y + this.offsetY,
      toX = r.x + this.offsetX,
      toY = r.y + this.offsetY;

    gradient.setAttributeNS(null, 'id', gradientUrl);
    gradient.setAttributeNS(null, 'gradientUnits', 'userSpaceOnUse');
    gradient.setAttributeNS(null, 'x1', fromX);
    gradient.setAttributeNS(null, 'y1', fromY);
    gradient.setAttributeNS(null, 'x2', toX);
    gradient.setAttributeNS(null, 'y2', toY);

    let firstStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    firstStop.setAttributeNS(null, 'stop-color', this.themeManager.getColor(line.getLeftElement()) || this.themeManager.getColor('C'));
    firstStop.setAttributeNS(null, 'offset', '20%');

    let secondStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    secondStop.setAttributeNS(null, 'stop-color', this.themeManager.getColor(line.getRightElement() || this.themeManager.getColor('C')));
    secondStop.setAttributeNS(null, 'offset', '100%');

    gradient.appendChild(firstStop);
    gradient.appendChild(secondStop);

    this.gradients.push(gradient);

    return gradientUrl;
  }

  /**
   * Create a tspan element for sub or super scripts that styles the text
   * appropriately as one of those text types.
   *
   * @param {String} text the actual text
   * @param {String} shift the type of text, either 'sub', or 'super'
   */
  createSubSuperScripts(text, shift) {
    let elem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    elem.setAttributeNS(null, 'baseline-shift', shift);
    elem.appendChild(document.createTextNode(text));
    elem.setAttributeNS(null, 'class', 'sub');

    return elem;
  }

  createUnicodeSubscript(n) {
    let result = '';

    n.toString().split('').forEach(d => {
      result += ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'][parseInt(d)];
    });

    return result
  }

  createUnicodeSuperscript(n) {
    let result = '';

    n.toString().split('').forEach(d => {
      result += ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][parseInt(d)];
    });

    return result
  }

  createUnicodeCharge(n) {
    if (n === 1) {
      return '⁺';
    }

    if (n === -1) {
      return '⁻';
    }

    if (n > 1) {
      return this.createUnicodeSuperscript(n) + '⁺';
    }

    if (n < -1) {
      return this.createUnicodeSuperscript(n) + '⁻';
    }

    return ''
  }

  /**
   * Determine drawing dimensiosn based on vertex positions.
   *
   * @param {Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
   */
  determineDimensions(vertices) {
    // Figure out the final size of the image
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;

    for (var i = 0; i < vertices.length; i++) {
      if (!vertices[i].value.isDrawn) {
        continue;
      }

      let p = vertices[i].position;

      if (maxX < p.x) maxX = p.x;
      if (maxY < p.y) maxY = p.y;
      if (minX > p.x) minX = p.x;
      if (minY > p.y) minY = p.y;
    }

    // Add padding
    let padding = this.opts.padding;
    maxX += padding;
    maxY += padding;
    minX -= padding;
    minY -= padding;

    this.drawingWidth = maxX - minX;
    this.drawingHeight = maxY - minY;

    let viewBoxDim = Math.round(this.drawingWidth > this.drawingHeight ? this.drawingWidth : this.drawingHeight);
    this.svg.setAttributeNS(null, 'viewBox', `0 0 ${viewBoxDim} ${viewBoxDim}`);

    let w = this.svg.clientWidth > 0 ? this.svg.clientWidth : this.svg.viewBox.baseVal.width;
    let h = this.svg.clientHeight > 0 ? this.svg.clientHeight : this.svg.viewBox.baseVal.height;

    let scaleX = w / this.drawingWidth;
    let scaleY = h / this.drawingHeight;

    let scale = (scaleX < scaleY) ? scaleX : scaleY;

    this.offsetX = -minX;
    this.offsetY = -minY;

    // Center
    if (scaleX < scaleY) {
      this.offsetY += h / (2.0 * scale) - this.drawingHeight / 2.0;
    } else {
      this.offsetX += w / (2.0 * scale) - this.drawingWidth / 2.0;
    }
  }

  /**
   * Draw an svg ellipse as a ball.
   *
   * @param {Number} x The x position of the text.
   * @param {Number} y The y position of the text.
   * @param {String} elementName The name of the element (single-letter).
   */
  drawBall(x, y, elementName) {
    let ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ball.setAttributeNS(null, 'cx', x + this.offsetX);
    ball.setAttributeNS(null, 'cy', y + this.offsetY);
    ball.setAttributeNS(null, 'r', this.opts.bondLength / 4.5);
    ball.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));

    this.vertices.push(ball);
  }

  /**
   * Draw a dashed wedge on the canvas.
   *
   * @param {Line} line A line.
   */
  drawDashedWedge(line) {
    if (isNaN(line.from.x) || isNaN(line.from.y) ||
      isNaN(line.to.x) || isNaN(line.to.y)) {
      return;
    }

    let offsetX = this.offsetX,
      offsetY = this.offsetY,
      l = line.getLeftVector().clone(),
      r = line.getRightVector().clone(),
      normals = Vector2.normals(l, r);

    normals[0].normalize();
    normals[1].normalize();

    let isRightChiralCenter = line.getRightChiral(),
      start,
      end;

    if (isRightChiralCenter) {
      start = r;
      end = l;
    } else {
      start = l;
      end = r;
    }

    let dir = Vector2.subtract(end, start).normalize(),
      length = line.getLength(),
      step = 1.25 / (length / (this.opts.bondThickness * 3.0)),
      changed = false;

    let gradient = this.createGradient(line);

    for (let t = 0.0; t < 1.0; t += step) {
      let to = Vector2.multiplyScalar(dir, t * length),
        startDash = Vector2.add(start, to),
        width = 1.5 * t,
        dashOffset = Vector2.multiplyScalar(normals[0], width);

      startDash.subtract(dashOffset);
      let endDash = startDash.clone();
      endDash.add(Vector2.multiplyScalar(dashOffset, 2.0));

      this.drawLine(new Line(startDash, endDash), null, gradient);
    }
  }

  /**
   * Draws a debug dot at a given coordinate and adds text.
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordindate.
   * @param {String} [debugText=''] A string.
   * @param {String} [color='#f00'] A color in hex form.
   */
  drawDebugPoint(x, y, debugText = '', color = '#f00') {
    let point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttributeNS(null, 'cx', x + this.offsetX);
    point.setAttributeNS(null, 'cy', y + this.offsetY);
    point.setAttributeNS(null, 'r', '2');
    point.setAttributeNS(null, 'fill', '#f00');
    this.vertices.push(point);
    this.drawDebugText(x, y, debugText);
  }

  /**
   * Draws a debug text message at a given position
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordinate.
   * @param {String} text The debug text.
   */
  drawDebugText(x, y, text) {
    let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttributeNS(null, 'x', x + this.offsetX);
    textElem.setAttributeNS(null, 'y', y + this.offsetY);
    textElem.setAttributeNS(null, 'class', 'debug');
    textElem.setAttributeNS(null, 'fill', '#ff0000');
    textElem.setAttributeNS(null, 'style', `
                font: 5px Droid Sans, sans-serif;
            `);
    textElem.appendChild(document.createTextNode(text));

    this.vertices.push(textElem);
  }


  /**
   * Draws a ring.
   *
   * @param {x} x The x coordinate of the ring.
   * @param {y} r The y coordinate of the ring.
   * @param {s} s The size of the ring.
   */
  drawRing(x, y, s) {
    let circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let radius = MathHelper.apothemFromSideLength(this.opts.bondLength, s);
    circleElem.setAttributeNS(null, 'cx', x + this.offsetX);
    circleElem.setAttributeNS(null, 'cy', y + this.offsetY);
    circleElem.setAttributeNS(null, 'r', radius - this.opts.bondSpacing);
    circleElem.setAttributeNS(null, 'stroke', this.themeManager.getColor('C'));
    circleElem.setAttributeNS(null, 'stroke-width', this.opts.bondThickness * 1.5);
    circleElem.setAttributeNS(null, 'fill', 'none');
    this.paths.push(circleElem);
  }


  /**
   * Draws a line.
   *
   * @param {Line} line A line.
   * @param {Boolean} dashed defaults to false.
   * @param {String} gradient gradient url. Defaults to null.
   */
  drawLine(line, dashed = false, gradient = null) {
    let opts = this.opts,
      stylesArr = [
        ['stroke-width', this.opts.bondThickness],
        ['stroke-linecap', 'round'],
        ['stroke-dasharray', dashed ? '5, 5' : 'none'],
      ],
      l = line.getLeftVector(),
      r = line.getRightVector(),
      fromX = l.x + this.offsetX,
      fromY = l.y + this.offsetY,
      toX = r.x + this.offsetX,
      toY = r.y + this.offsetY;

    let styles = stylesArr.map(sub => sub.join(':')).join(';'),
      lineElem = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    lineElem.setAttributeNS(null, 'x1', fromX);
    lineElem.setAttributeNS(null, 'y1', fromY);
    lineElem.setAttributeNS(null, 'x2', toX);
    lineElem.setAttributeNS(null, 'y2', toY);
    lineElem.setAttributeNS(null, 'style', styles);
    this.paths.push(lineElem);

    if (gradient == null) {
      gradient = this.createGradient(line, fromX, fromY, toX, toY);
    }
    lineElem.setAttributeNS(null, 'stroke', `url('#${gradient}')`);
  }

  /**
   * Draw a point.
   *
   * @param {Number} x The x position of the point.
   * @param {Number} y The y position of the point.
   * @param {String} elementName The name of the element (single-letter).
   */
  drawPoint(x, y, elementName) {
    let ctx = this.ctx;
    let offsetX = this.offsetX;
    let offsetY = this.offsetY;

    // first create a mask
    let mask = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    mask.setAttributeNS(null, 'cx', x + offsetX);
    mask.setAttributeNS(null, 'cy', y + offsetY);
    mask.setAttributeNS(null, 'r', '1.5');
    mask.setAttributeNS(null, 'fill', 'black');
    this.maskElements.push(mask);

    // now create the point
    let point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttributeNS(null, 'cx', x + offsetX);
    point.setAttributeNS(null, 'cy', y + offsetY);
    point.setAttributeNS(null, 'r', '0.75');
    point.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));
    this.vertices.push(point);
  }

  /**
   * Draw a text to the canvas.
   *
   * @param {Number} x The x position of the text.
   * @param {Number} y The y position of the text.
   * @param {String} elementName The name of the element (single-letter).
   * @param {Number} hydrogens The number of hydrogen atoms.
   * @param {String} direction The direction of the text in relation to the associated vertex.
   * @param {Boolean} isTerminal A boolean indicating whether or not the vertex is terminal.
   * @param {Number} charge The charge of the atom.
   * @param {Number} isotope The isotope number.
   * @param {Object} attachedPseudoElement A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count.
   * @param {String} attachedPseudoElement.element The element symbol.
   * @param {Number} attachedPseudoElement.count The number of occurences that match the key.
   * @param {Number} attachedPseudoElement.hyrogenCount The number of hydrogens attached to each atom matching the key.
   */
  drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, attachedPseudoElement = {}) {
    let text = [];
    let display = elementName;

    if (charge !== 0 && charge !== null) {
      display += this.createUnicodeCharge(charge);
    }

    if (isotope !== 0 && isotope !== null) {
      display = this.createUnicodeSuperscript(isotope) + display;
    }

    text.push([display, elementName]);

    if (hydrogens === 1) {
      text.push(['H', 'H'])
    } else if (hydrogens > 1) {
      text.push(['H' + this.createUnicodeSubscript(hydrogens), 'H'])
    }

    // TODO: Better handle exceptions
    // Exception for nitro (draw nitro as NO2 instead of N+O-O)
    if (charge === 1 && elementName === 'N' && attachedPseudoElement.hasOwnProperty('0O') &&
      attachedPseudoElement.hasOwnProperty('0O-1')) {
      attachedPseudoElement = { '0O': { element: 'O', count: 2, hydrogenCount: 0, previousElement: 'C', charge: '' } }
      charge = 0;
    }

    for (let key in attachedPseudoElement) {
      if (!attachedPseudoElement.hasOwnProperty(key)) {
        continue;
      }

      let pe = attachedPseudoElement[key];
      let display = pe.element;

      if (pe.count > 1) {
        display += this.createUnicodeSubscript(pe.count);
      }

      if (pe.charge !== '') {
        display += this.createUnicodeCharge(charge);
      }

      text.push([pe.element, pe.element]);

      if (pe.hydrogenCount === 1) {
        text.push(['H', 'H'])
      } else if (pe.hydrogenCount > 1) {
        text.push(['H' + this.createUnicodeSubscript(pe.hydrogenCount), 'H'])
      }
    }

    this.write(text, direction, x, y);

    // for (let key in attachedPseudoElement) {
    //   if (!attachedPseudoElement.hasOwnProperty(key)) {
    //     continue;
    //   }

    //   let element = attachedPseudoElement[key].element,
    //     elementCount = attachedPseudoElement[key].count,
    //     hydrogenCount = attachedPseudoElement[key].hydrogenCount,
    //     elementCharge = attachedPseudoElement[key].charge,
    //     pseudoElementElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

    //   pseudoElementElem.setAttributeNS(null, 'style', 'unicode-bidi: plaintext;');
    //   pseudoElementElem.appendChild(document.createTextNode(element));
    //   pseudoElementElem.setAttributeNS(null, 'fill', this.themeManager.getColor(element));

    //   if (elementCharge !== 0) {
    //     let elementChargeElem = this.createSubSuperScripts(getChargeText(elementCharge), 'super');
    //     pseudoElementElem.appendChild(elementChargeElem);
    //   }

    //   if (hydrogenCount > 0) {
    //     let pseudoHydrogenElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

    //     pseudoHydrogenElem.setAttributeNS(null, 'style', 'unicode-bidi: plaintext;');
    //     pseudoHydrogenElem.appendChild(document.createTextNode('H'));
    //     pseudoElementElem.appendChild(pseudoHydrogenElem);

    //     if (hydrogenCount > 1) {
    //       let hydrogenCountElem = this.createSubSuperScripts(hydrogenCount, 'sub');
    //       pseudoHydrogenElem.appendChild(hydrogenCountElem);
    //     }
    //   }

    //   if (elementCount > 1) {
    //     let elementCountElem = this.createSubSuperScripts(elementCount, 'sub');
    //     pseudoElementElem.appendChild(elementCountElem);
    //   }

    //   textElem.appendChild(pseudoElementElem);
    // }

    // this.vertices.push(textElem);
  }

  /**
   * @param {Line} line the line object to create the wedge from
   */
  drawWedge(line) {
    let offsetX = this.offsetX,
      offsetY = this.offsetY,
      l = line.getLeftVector().clone(),
      r = line.getRightVector().clone();

    l.x += offsetX;
    l.y += offsetY;

    r.x += offsetX;
    r.y += offsetY;

    let normals = Vector2.normals(l, r);

    normals[0].normalize();
    normals[1].normalize();

    let isRightChiralCenter = line.getRightChiral();

    let start = l,
      end = r;

    if (isRightChiralCenter) {
      start = r;
      end = l;
    }

    let t = Vector2.add(start, Vector2.multiplyScalar(normals[0], this.halfBondThickness)),
      u = Vector2.add(end, Vector2.multiplyScalar(normals[0], 1.5 + this.halfBondThickness)),
      v = Vector2.add(end, Vector2.multiplyScalar(normals[1], 1.5 + this.halfBondThickness)),
      w = Vector2.add(start, Vector2.multiplyScalar(normals[1], this.halfBondThickness));

    let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'),
      gradient = this.createGradient(line, l.x, l.y, r.x, r.y);
    polygon.setAttributeNS(null, 'points', `${t.x},${t.y} ${u.x},${u.y} ${v.x},${v.y} ${w.x},${w.y}`);
    polygon.setAttributeNS(null, 'fill', `url('#${gradient}')`);
    this.paths.push(polygon);
  }

  write(text, direction, x, y) {
    x += this.offsetX;
    y += this.offsetY;

    let cx = x;
    let cy = y;

    // Measure element name only, without charge or isotope
    let bbox = this.measureText(text[0][1], 'element');
    let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttributeNS(null, 'class', 'element');
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    textElem.setAttributeNS(null, 'fill', '#ffffff');

    if (direction === 'left' || direction === 'up') {
      text = text.reverse();
    }

    if (direction === 'right' || direction === 'down' || direction === 'up') {
      x -= bbox.width / 2.0;
    }

    if (direction === 'left') {
      x += bbox.width / 2.0;
    }

    if (direction === 'down') {
      y -= bbox.height / 2.0;
    }

    text.forEach(part => {
      const display = part[0];
      const elementName = part[1];
      let tspanElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspanElem.setAttributeNS(null, 'fill', this.themeManager.getColor(elementName));
      tspanElem.textContent = display;

      if (direction === 'down' || direction === 'up') {
        tspanElem.setAttributeNS(null, 'dy', '0.9em');
        tspanElem.setAttributeNS(null, 'x', '0px');
      }

      textElem.appendChild(tspanElem);
    })


    if (direction === 'left' || direction === 'right') {
      textElem.setAttributeNS(null, 'dominant-baseline', 'central');
    }

    // This is hacky and relies on dy setting above
    if (direction === 'down') {
      textElem.setAttributeNS(null, 'dominant-baseline', 'alphabetic');
    }

    if (direction === 'up') {
      textElem.setAttributeNS(null, 'dominant-baseline', 'mathematical');
    }

    if (direction === 'left') {
      textElem.setAttributeNS(null, 'text-anchor', 'end');
    }

    g.appendChild(textElem)

    if (direction === 'up') {
      let gbbox = this.measureElement(g);
      y -= gbbox.height;
    }

    g.setAttributeNS(null, 'style', `transform: translateX(${x}px) translateY(${y}px)`);

    let maskRadius = 3.5;
    if (text[0][1].length > 1) {
      maskRadius = 5.0;
    }

    let mask = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    mask.setAttributeNS(null, 'cx', cx);
    mask.setAttributeNS(null, 'cy', cy);
    mask.setAttributeNS(null, 'r', maskRadius);
    mask.setAttributeNS(null, 'fill', 'black');
    this.maskElements.push(mask);

    this.vertices.push(g);
  }

  measureText(text, className) {
    let textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttributeNS(null, 'class', className);
    textElem.setAttributeNS(null, 'x', -9999);
    textElem.textContent = text;
    this.svg.appendChild(textElem);

    let bbox = textElem.getBBox();
    this.svg.removeChild(textElem);

    return bbox;
  }

  measureElement(element) {
    this.svg.appendChild(element);
    let bbox = element.getBBox();
    this.svg.removeChild(element);

    return bbox;
  }

  /**
   * 
   * @param {HTMLCanvasElement} canvas The canvas element to draw the svg to.
   */
  toCanvas(canvas) {
    if (typeof canvas === 'string' || canvas instanceof String) {
      canvas = document.getElementById(canvas);
    }

    var ctx = canvas.getContext('2d');
    var image = new Image();

    image.onload = function load() {
      canvas.height = image.height;
      canvas.width = image.width;
      ctx.drawImage(image, 0, 0);
    };

    image.src = 'data:image/svg+xml;charset-utf-8,' + encodeURIComponent(this.svg.outerHTML);
  }
}

module.exports = SvgWrapper;
