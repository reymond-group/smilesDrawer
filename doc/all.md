[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

## Classes

<dl>
<dt><a href="#Atom">Atom</a></dt>
<dd><p>A class representing an atom</p>
</dd>
<dt><a href="#Edge">Edge</a></dt>
<dd><p>A class representing an edge</p>
</dd>
<dt><a href="#Line">Line</a></dt>
<dd><p>A class representing a line</p>
</dd>
<dt><a href="#Pair">Pair</a></dt>
<dd><p>A class representing a pair</p>
</dd>
<dt><a href="#Ring">Ring</a></dt>
<dd><p>A class representing a ring</p>
</dd>
<dt><a href="#Vector2">Vector2</a></dt>
<dd><p>A class representing a 2D vector.</p>
</dd>
<dt><a href="#Vertex">Vertex</a></dt>
<dd><p>A class representing a vertex</p>
</dd>
</dl>

<a name="Atom"></a>

## Atom
A class representing an atom

**Kind**: global class  

* [Atom](#Atom)
    * [new Atom(element, [bondType])](#new_Atom_new)
    * [.addAnchoredRing(ringId)](#Atom+addAnchoredRing)
    * [.getRingbondCount()](#Atom+getRingbondCount) ⇒ <code>number</code>
    * [.canRotate()](#Atom+canRotate) ⇒ <code>boolean</code>
    * [.hasRingbonds()](#Atom+hasRingbonds) ⇒ <code>boolean</code>
    * [.getMaxRingbond()](#Atom+getMaxRingbond) ⇒ <code>number</code>
    * [.hasRing(ringId)](#Atom+hasRing) ⇒ <code>boolean</code>
    * [.haveCommonRingbond(atomA, atomB)](#Atom+haveCommonRingbond) ⇒ <code>boolean</code>
    * [.maxCommonRingbond(atomA, atomB)](#Atom+maxCommonRingbond) ⇒ <code>number</code>

<a name="new_Atom_new"></a>

### new Atom(element, [bondType])
The constructor of the class Atom.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>string</code> |  | The one-letter code of the element. |
| [bondType] | <code>string</code> | <code>&quot;&#x27;-&#x27;&quot;</code> | The type of the bond associated with this atom. |

<a name="Atom+addAnchoredRing"></a>

### atom.addAnchoredRing(ringId)
Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.

**Kind**: instance method of <code>[Atom](#Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="Atom+getRingbondCount"></a>

### atom.getRingbondCount() ⇒ <code>number</code>
Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>number</code> - The number of ringbonds this atom is connected to.  
<a name="Atom+canRotate"></a>

### atom.canRotate() ⇒ <code>boolean</code>
Check whether or not this atom is rotatable. The atom is deemed rotatable if it is neither a member of a ring nor participating in a bond other than a single bond. TODO: Check the chemistry.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is rotatable.  
<a name="Atom+hasRingbonds"></a>

### atom.hasRingbonds() ⇒ <code>boolean</code>
Returns whether or not this atom participates in ringbonds (breaks in the ring in the MST).

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is associated with a ringbond.  
<a name="Atom+getMaxRingbond"></a>

### atom.getMaxRingbond() ⇒ <code>number</code>
Returns the id of the ringbond with the highest id.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>number</code> - The highest ringbond id associated with this atom.  
<a name="Atom+hasRing"></a>

### atom.hasRing(ringId) ⇒ <code>boolean</code>
Checks whether or not this atom is a member of a given ring.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is a member of a given ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="Atom+haveCommonRingbond"></a>

### atom.haveCommonRingbond(atomA, atomB) ⇒ <code>boolean</code>
Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not two atoms share a common ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| atomA | <code>[Atom](#Atom)</code> | An atom. |
| atomB | <code>[Atom](#Atom)</code> | An atom. |

<a name="Atom+maxCommonRingbond"></a>

### atom.maxCommonRingbond(atomA, atomB) ⇒ <code>number</code>
Get the highest numbered ringbond shared by two atoms. A ringbond is a break in a ring created when generating the spanning tree of a structure.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>number</code> - The number of the maximum ringbond shared by two atoms.  

| Param | Type | Description |
| --- | --- | --- |
| atomA | <code>[Atom](#Atom)</code> | An atom. |
| atomB | <code>[Atom](#Atom)</code> | An atom. |

<a name="Edge"></a>

## Edge
A class representing an edge

**Kind**: global class  

* [Edge](#Edge)
    * [new Edge(sourceId, targetId, weight)](#new_Edge_new)
    * _instance_
        * [.getBondCount()](#Edge+getBondCount) ⇒ <code>number</code>
    * _static_
        * [.bonds](#Edge.bonds) ⇒ <code>object</code>

<a name="new_Edge_new"></a>

### new Edge(sourceId, targetId, weight)
The constructor for the class Edge.


| Param | Type | Description |
| --- | --- | --- |
| sourceId | <code>number</code> | A vertex id. |
| targetId | <code>number</code> | A vertex id. |
| weight | <code>number</code> | The weight of the edge. |

<a name="Edge+getBondCount"></a>

### edge.getBondCount() ⇒ <code>number</code>
Returns the number of bonds associated with the bond type of this edge.

**Kind**: instance method of <code>[Edge](#Edge)</code>  
**Returns**: <code>number</code> - The number of bonds associated with this edge.  
<a name="Edge.bonds"></a>

### Edge.bonds ⇒ <code>object</code>
An object mapping the bond type to the number of bonds.

**Kind**: static property of <code>[Edge](#Edge)</code>  
**Returns**: <code>object</code> - The object containing the map.  
<a name="Line"></a>

## Line
A class representing a line

**Kind**: global class  

* [Line](#Line)
    * [new Line([from], [to], [elementFrom], [elementTo])](#new_Line_new)
    * [.clone()](#Line+clone) ⇒ <code>[Line](#Line)</code>
    * [.getLength()](#Line+getLength) ⇒ <code>number</code>
    * [.getAngle()](#Line+getAngle) ⇒ <code>number</code>
    * [.getRightVector()](#Line+getRightVector) ⇒ <code>[Vector2](#Vector2)</code>
    * [.getLeftVector()](#Line+getLeftVector) ⇒ <code>[Vector2](#Vector2)</code>
    * [.getRightElement()](#Line+getRightElement) ⇒ <code>string</code>
    * [.getLeftElement()](#Line+getLeftElement) ⇒ <code>string</code>
    * [.setRightVector(x, y)](#Line+setRightVector) ⇒ <code>[Line](#Line)</code>
    * [.setLeftVector(x, y)](#Line+setLeftVector) ⇒ <code>[Line](#Line)</code>
    * [.rotateToXAxis()](#Line+rotateToXAxis) ⇒ <code>[Line](#Line)</code>
    * [.rotate(theta)](#Line+rotate) ⇒ <code>[Line](#Line)</code>
    * [.shortenFrom(by)](#Line+shortenFrom) ⇒ <code>[Line](#Line)</code>
    * [.shortenTo(by)](#Line+shortenTo) ⇒ <code>[Line](#Line)</code>
    * [.shorten(by)](#Line+shorten) ⇒ <code>[Line](#Line)</code>

<a name="new_Line_new"></a>

### new Line([from], [to], [elementFrom], [elementTo])
The constructor for the class Line.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [from] | <code>[Vector2](#Vector2)</code> | <code>new Vector2(0, 0)</code> | A vector marking the beginning of the line. |
| [to] | <code>[Vector2](#Vector2)</code> | <code>new Vector2(0, 0)</code> | A vector marking the end of the line. |
| [elementFrom] | <code>string</code> | <code>null</code> | A one-letter representation of the element associated with the vector marking the beginning of the line. |
| [elementTo] | <code>string</code> | <code>null</code> | A one-letter representation of the element associated with the vector marking the end of the line. |

<a name="Line+clone"></a>

### line.clone() ⇒ <code>[Line](#Line)</code>
Clones this line and returns the clone.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - A clone of this line.  
<a name="Line+getLength"></a>

### line.getLength() ⇒ <code>number</code>
Returns the length of this line.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>number</code> - The length of this line.  
<a name="Line+getAngle"></a>

### line.getAngle() ⇒ <code>number</code>
Returns the angle of the line in relation to the coordinate system (the x-axis).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>number</code> - The angle in radians.  
<a name="Line+getRightVector"></a>

### line.getRightVector() ⇒ <code>[Vector2](#Vector2)</code>
Returns the right vector (the vector with the larger x value).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The right vector.  
<a name="Line+getLeftVector"></a>

### line.getLeftVector() ⇒ <code>[Vector2](#Vector2)</code>
Returns the left vector (the vector with the smaller x value).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The left vector.  
<a name="Line+getRightElement"></a>

### line.getRightElement() ⇒ <code>string</code>
Returns the element associated with the right vector (the vector with the larger x value).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>string</code> - The element associated with the right vector.  
<a name="Line+getLeftElement"></a>

### line.getLeftElement() ⇒ <code>string</code>
Returns the element associated with the left vector (the vector with the smaller x value).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>string</code> - The element associated with the left vector.  
<a name="Line+setRightVector"></a>

### line.setRightVector(x, y) ⇒ <code>[Line](#Line)</code>
Set the value of the right vector.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |

<a name="Line+setLeftVector"></a>

### line.setLeftVector(x, y) ⇒ <code>[Line](#Line)</code>
Set the value of the left vector.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |

<a name="Line+rotateToXAxis"></a>

### line.rotateToXAxis() ⇒ <code>[Line](#Line)</code>
Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  
<a name="Line+rotate"></a>

### line.rotate(theta) ⇒ <code>[Line](#Line)</code>
Rotate the line by a given value (in radians). The center of rotation is the left vector.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| theta | <code>number</code> | The angle (in radians) to rotate the line. |

<a name="Line+shortenFrom"></a>

### line.shortenFrom(by) ⇒ <code>[Line](#Line)</code>
Shortens this line from the "from" direction by a given value (in pixels).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="Line+shortenTo"></a>

### line.shortenTo(by) ⇒ <code>[Line](#Line)</code>
Shortens this line from the "to" direction by a given value (in pixels).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="Line+shorten"></a>

### line.shorten(by) ⇒ <code>[Line](#Line)</code>
Shortens this line from both directions by a given value (in pixels).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="Pair"></a>

## Pair
A class representing a pair

**Kind**: global class  

* [Pair](#Pair)
    * [new Pair(first, second)](#new_Pair_new)
    * _instance_
        * [.getHash()](#Pair+getHash) ⇒ <code>number</code>
        * [.contains(item)](#Pair+contains) ⇒ <code>boolean</code>
    * _static_
        * [.createUniquePairs(array)](#Pair.createUniquePairs) ⇒ <code>array</code>

<a name="new_Pair_new"></a>

### new Pair(first, second)
The constructor for the class Pair.


| Param | Type | Description |
| --- | --- | --- |
| first | <code>\*</code> | The first element of the pair. |
| second | <code>\*</code> | The second element of the pair. |

<a name="Pair+getHash"></a>

### pair.getHash() ⇒ <code>number</code>
Returns a unique hash for this pair. Uses the cantor pairing function.

**Kind**: instance method of <code>[Pair](#Pair)</code>  
**Returns**: <code>number</code> - The hash.  
<a name="Pair+contains"></a>

### pair.contains(item) ⇒ <code>boolean</code>
Checks whether or not this pair contains an object. Uses '===' to compare.

**Kind**: instance method of <code>[Pair](#Pair)</code>  
**Returns**: <code>boolean</code> - A boolean representing whether or not this pair contains a given value.  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | An string or a number (current limitation). |

<a name="Pair.createUniquePairs"></a>

### Pair.createUniquePairs(array) ⇒ <code>array</code>
Creates unique paris from an array. The array must contain unique values.

**Kind**: static method of <code>[Pair](#Pair)</code>  
**Returns**: <code>array</code> - An array containing unique pairs created from the provided array.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>array</code> | An array containing unique values. |

<a name="Ring"></a>

## Ring
A class representing a ring

**Kind**: global class  

* [Ring](#Ring)
    * [new Ring(ringbond, sourceId, targetId)](#new_Ring_new)
    * _instance_
        * [.clone()](#Ring+clone) ⇒ <code>[Ring](#Ring)</code>
        * [.allowsFlip()](#Ring+allowsFlip) ⇒ <code>boolean</code>
        * [.setFlipped()](#Ring+setFlipped)
        * [.getSize()](#Ring+getSize) ⇒ <code>number</code>
        * [.getPolygon(vertices)](#Ring+getPolygon) ⇒ <code>array</code>
        * [.getAngle()](#Ring+getAngle) ⇒ <code>number</code>
        * [.eachMember(vertices, callback, startVertexId, previousVertexId)](#Ring+eachMember)
        * [.getOrderedNeighbours(ringConnections)](#Ring+getOrderedNeighbours) ⇒ <code>array</code>
        * [.isAromatic(vertices)](#Ring+isAromatic) ⇒ <code>boolean</code>
        * [.contains(vertexId)](#Ring+contains) ⇒ <code>boolean</code>
        * [.thisOrNeighboursContain(rings, vertexId)](#Ring+thisOrNeighboursContain) ⇒ <code>boolean</code>
        * [.hasSource()](#Ring+hasSource) ⇒ <code>boolean</code>
        * [.hasTarget()](#Ring+hasTarget) ⇒ <code>boolean</code>
        * [.hasSourceAndTarget()](#Ring+hasSourceAndTarget) ⇒ <code>boolean</code>
    * _static_
        * [.getRing(rings, id)](#Ring.getRing) ⇒ <code>[Ring](#Ring)</code>

<a name="new_Ring_new"></a>

### new Ring(ringbond, sourceId, targetId)
The constructor for the class Ring.


| Param | Type | Description |
| --- | --- | --- |
| ringbond | <code>number</code> | The id of the ring-bond shared by the source and target atom defined in the smiles string. |
| sourceId | <code>number</code> | The source vertex id. |
| targetId | <code>number</code> | The target vertex id. |

<a name="Ring+clone"></a>

### ring.clone() ⇒ <code>[Ring](#Ring)</code>
Clones this ring and returns the clone.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>[Ring](#Ring)</code> - A clone of this ring.  
<a name="Ring+allowsFlip"></a>

### ring.allowsFlip() ⇒ <code>boolean</code>
Returns a boolean indicating whether or not this ring is allowed to flip attached vertices (atoms) to the inside of the ring. Is only allowed for rings with more than 4 members. Can be disabling by setting the canFlip property of the ring to false.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - Returns a boolean indicating whether or not vertices (atoms) attached to this ring can be flipped to the inside of the ring.  
<a name="Ring+setFlipped"></a>

### ring.setFlipped()
Sets the canFlip property of this ring to false if the ring has less than 8 members. If the ring has more than 8 members, the value of canFlip is not changed.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
<a name="Ring+getSize"></a>

### ring.getSize() ⇒ <code>number</code>
Returns the size (number of members) of this ring.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>number</code> - The size (number of members) of this ring.  
<a name="Ring+getPolygon"></a>

### ring.getPolygon(vertices) ⇒ <code>array</code>
Gets the polygon representation (an array of the ring-members positional vectors) of this ring.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>array</code> - An array of the positional vectors of the ring members.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices representing the current molecule. |

<a name="Ring+getAngle"></a>

### ring.getAngle() ⇒ <code>number</code>
Returns the angle of this ring in relation to the coordinate system.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>number</code> - The angle in radians.  
<a name="Ring+eachMember"></a>

### ring.eachMember(vertices, callback, startVertexId, previousVertexId)
Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.

**Kind**: instance method of <code>[Ring](#Ring)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | The vertices associated with the current molecule. |
| callback | <code>function</code> | A callback with the current vertex id as a parameter. |
| startVertexId | <code>number</code> | The vertex id of the start vertex. |
| previousVertexId | <code>number</code> | The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex). |

<a name="Ring+getOrderedNeighbours"></a>

### ring.getOrderedNeighbours(ringConnections) ⇒ <code>array</code>
Returns an array containing the neighbouring rings of this ring ordered by ring size.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>array</code> - An array of neighbouring rings sorted by ring size.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>array</code> | An array of ring connections associated with the current molecule. |

<a name="Ring+isAromatic"></a>

### ring.isAromatic(vertices) ⇒ <code>boolean</code>
Check whether this ring is aromatic but has no explicit double-bonds defined (e.g. c1ccccc1).

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring is implicitly aromatic (using lowercase letters in smiles).  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices associated with the current molecule. |

<a name="Ring+contains"></a>

### ring.contains(vertexId) ⇒ <code>boolean</code>
Checks whether or not this ring contains a member with a given vertex id.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring contains a member with the given vertex id.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |

<a name="Ring+thisOrNeighboursContain"></a>

### ring.thisOrNeighboursContain(rings, vertexId) ⇒ <code>boolean</code>
Checks whether or not this ring or one of its neighbouring rings contains a member with a given vertex id.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring or one of its neighbouring rings contains a emember with the given vertex id.  

| Param | Type | Description |
| --- | --- | --- |
| rings | <code>array</code> | An array of rings associated with this molecule. |
| vertexId | <code>number</code> | A vertex id. |

<a name="Ring+hasSource"></a>

### ring.hasSource() ⇒ <code>boolean</code>
Checks whether or not this ring has a source defined.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring has a source defined.  
<a name="Ring+hasTarget"></a>

### ring.hasTarget() ⇒ <code>boolean</code>
Checks whether or not this ring has a target defined.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring has a target defined.  
<a name="Ring+hasSourceAndTarget"></a>

### ring.hasSourceAndTarget() ⇒ <code>boolean</code>
Checks whether or not this ring has a source and a target defined.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring has a source and a target defined.  
<a name="Ring.getRing"></a>

### Ring.getRing(rings, id) ⇒ <code>[Ring](#Ring)</code>
Returns a ring based on a provided ring id.

**Kind**: static method of <code>[Ring](#Ring)</code>  
**Returns**: <code>[Ring](#Ring)</code> - A ring with a given id.  

| Param | Type | Description |
| --- | --- | --- |
| rings | <code>array</code> | An array of rings associated with the current molecule. |
| id | <code>number</code> | A ring id. |

<a name="Vector2"></a>

## Vector2
A class representing a 2D vector.

**Kind**: global class  

* [Vector2](#Vector2)
    * [new Vector2(x, y)](#new_Vector2_new)
    * _instance_
        * [.set([x], [y])](#Vector2+set)
        * [.clone()](#Vector2+clone) ⇒ <code>[Vector2](#Vector2)</code>
        * [.toString()](#Vector2+toString) ⇒ <code>string</code>
        * [.add(vec)](#Vector2+add)
        * [.subtract(vec)](#Vector2+subtract)
        * [.divide(scalar)](#Vector2+divide)
        * [.multiply(scalar)](#Vector2+multiply)
        * [.invert()](#Vector2+invert)
        * [.angle()](#Vector2+angle) ⇒ <code>number</code>
        * [.distance(vec)](#Vector2+distance) ⇒ <code>number</code>
        * [.distanceSq(vec)](#Vector2+distanceSq) ⇒ <code>number</code>
        * [.clockwise(vec)](#Vector2+clockwise) ⇒ <code>number</code>
        * [.rotate(angle)](#Vector2+rotate)
        * [.rotateAround(angle, vec)](#Vector2+rotateAround)
        * [.rotateTo(vec, center, [offsetAngle])](#Vector2+rotateTo)
        * [.getRotateToAngle(vec, center)](#Vector2+getRotateToAngle) ⇒ <code>number</code>
        * [.isInPolygon(polygon)](#Vector2+isInPolygon) ⇒ <code>boolean</code>
        * [.length()](#Vector2+length) ⇒ <code>number</code>
        * [.normalize()](#Vector2+normalize)
        * [.normalized()](#Vector2+normalized) ⇒ <code>[Vector2](#Vector2)</code>
        * [.whichSide(vecA, vecB)](#Vector2+whichSide) ⇒ <code>number</code>
        * [.sameSideAs(vecA, vecB, vecC)](#Vector2+sameSideAs) ⇒ <code>boolean</code>
    * _static_
        * [.add(vecA, vecB)](#Vector2.add) ⇒ <code>[Vector2](#Vector2)</code>
        * [.subtract(vecA, vecB)](#Vector2.subtract) ⇒ <code>[Vector2](#Vector2)</code>
        * [.multiply(vecA, vecB)](#Vector2.multiply) ⇒ <code>[Vector2](#Vector2)</code>
        * [.midpoint(vecA, vecB)](#Vector2.midpoint) ⇒ <code>[Vector2](#Vector2)</code>
        * [.normals(vecA, vecB)](#Vector2.normals) ⇒ <code>array</code>
        * [.divide(vecA, vecB)](#Vector2.divide) ⇒ <code>[Vector2](#Vector2)</code>
        * [.dot(vecA, vecB)](#Vector2.dot) ⇒ <code>number</code>
        * [.angle(vecA, vecB)](#Vector2.angle) ⇒ <code>number</code>
        * [.scalarProjection(vecA, vecB)](#Vector2.scalarProjection) ⇒ <code>number</code>

<a name="new_Vector2_new"></a>

### new Vector2(x, y)
The constructor of the class Vector2.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The initial x coordinate value. |
| y | <code>number</code> | The initial y coordinate value. |

<a name="Vector2+set"></a>

### vector2.set([x], [y])
Sets the values of the x and y coordinates of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [x] | <code>number</code> | <code>0</code> | The value of the x coordinate. |
| [y] | <code>number</code> | <code>0</code> | The value of the y coordinate. |

<a name="Vector2+clone"></a>

### vector2.clone() ⇒ <code>[Vector2](#Vector2)</code>
Clones this vector and returns the clone.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The clone of this vector.  
<a name="Vector2+toString"></a>

### vector2.toString() ⇒ <code>string</code>
Returns a string representation of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>string</code> - A string representation of this vector.  
<a name="Vector2+add"></a>

### vector2.add(vec)
Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+subtract"></a>

### vector2.subtract(vec)
Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+divide"></a>

### vector2.divide(scalar)
Divide the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar. |

<a name="Vector2+multiply"></a>

### vector2.multiply(scalar)
Multiply the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar. |

<a name="Vector2+invert"></a>

### vector2.invert()
Inverts this vector. Same as multiply(-1.0).

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
<a name="Vector2+angle"></a>

### vector2.angle() ⇒ <code>number</code>
Returns the angle of this vector in relation to the coordinate system.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The angle in radians.  
<a name="Vector2+distance"></a>

### vector2.distance(vec) ⇒ <code>number</code>
Returns the euclidean distance between this vector and another vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The euclidean distance between the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2+distanceSq"></a>

### vector2.distanceSq(vec) ⇒ <code>number</code>
Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The squared euclidean distance of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+clockwise"></a>

### vector2.clockwise(vec) ⇒ <code>number</code>
Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+rotate"></a>

### vector2.rotate(angle)
Rotates this vector by a given number of radians around the origin of the coordinate system.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle in radians to rotate the vector. |

<a name="Vector2+rotateAround"></a>

### vector2.rotateAround(angle, vec)
Rotates this vector around another vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle in radians to rotate the vector. |
| vec | <code>[Vector2](#Vector2)</code> | The vector which is used as the rotational center. |

<a name="Vector2+rotateTo"></a>

### vector2.rotateTo(vec, center, [offsetAngle])
Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> |  | The vector to rotate this vector to. |
| center | <code>[Vector2](#Vector2)</code> |  | The rotational center. |
| [offsetAngle] | <code>number</code> | <code>0.0</code> | An additional amount of radians to rotate the vector. |

<a name="Vector2+getRotateToAngle"></a>

### vector2.getRotateToAngle(vec, center) ⇒ <code>number</code>
Gets the angles between this vector and another vector around a common center of rotation.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The angle between this vector and another vector around a center of rotation in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |
| center | <code>[Vector2](#Vector2)</code> | The center of rotation. |

<a name="Vector2+isInPolygon"></a>

### vector2.isInPolygon(polygon) ⇒ <code>boolean</code>
Checks whether a vector lies within a polygon spanned by a set of vectors.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this vector is within a polygon.  

| Param | Type | Description |
| --- | --- | --- |
| polygon | <code>array</code> | An array of vectors spanning the polygon. |

<a name="Vector2+length"></a>

### vector2.length() ⇒ <code>number</code>
Returns the length of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The length of this vector.  
<a name="Vector2+normalize"></a>

### vector2.normalize()
Normalizes this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
<a name="Vector2+normalized"></a>

### vector2.normalized() ⇒ <code>[Vector2](#Vector2)</code>
Returns a normalized copy of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - A normalized copy of this vector.  
<a name="Vector2+whichSide"></a>

### vector2.whichSide(vecA, vecB) ⇒ <code>number</code>
Calculates which side of a line spanned by two vectors this vector is.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - A number indicating the side of this vector, given a line spanned by two other vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2+sameSideAs"></a>

### vector2.sameSideAs(vecA, vecB, vecC) ⇒ <code>boolean</code>
Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>boolean</code> - Returns a boolean indicating whether or not this vector is on the same side as another vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector spanning the line. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector spanning the line. |
| vecC | <code>[Vector2](#Vector2)</code> | A vector to check whether or not it is on the same side as this vector. |

<a name="Vector2.add"></a>

### Vector2.add(vecA, vecB) ⇒ <code>[Vector2](#Vector2)</code>
Adds two vectors and returns the result as a new vector.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns the sum of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A summand. |
| vecB | <code>[Vector2](#Vector2)</code> | A summand. |

<a name="Vector2.subtract"></a>

### Vector2.subtract(vecA, vecB) ⇒ <code>[Vector2](#Vector2)</code>
Subtracts one vector from another and returns the result as a new vector.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns the difference of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | The minuend. |
| vecB | <code>[Vector2](#Vector2)</code> | The subtrahend. |

<a name="Vector2.multiply"></a>

### Vector2.multiply(vecA, vecB) ⇒ <code>[Vector2](#Vector2)</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A factor. |
| vecB | <code>[Vector2](#Vector2)</code> | A factor. |

<a name="Vector2.midpoint"></a>

### Vector2.midpoint(vecA, vecB) ⇒ <code>[Vector2](#Vector2)</code>
Returns the midpoint of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The midpoint of the line spanned by two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector spanning the line. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector spanning the line. |

<a name="Vector2.normals"></a>

### Vector2.normals(vecA, vecB) ⇒ <code>array</code>
Returns the normals of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>array</code> - An array containing the two normals, each represented by a vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector spanning the line. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector spanning the line. |

<a name="Vector2.divide"></a>

### Vector2.divide(vecA, vecB) ⇒ <code>[Vector2](#Vector2)</code>
Divides a vector by another vector and returns the result as new vector.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The fraction of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | The dividend. |
| vecB | <code>[Vector2](#Vector2)</code> | The divisor. |

<a name="Vector2.dot"></a>

### Vector2.dot(vecA, vecB) ⇒ <code>number</code>
Returns the dot product of two vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The dot product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2.angle"></a>

### Vector2.angle(vecA, vecB) ⇒ <code>number</code>
Returns the angle between two vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The angle between two vectors in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2.scalarProjection"></a>

### Vector2.scalarProjection(vecA, vecB) ⇒ <code>number</code>
Returns the scalar projection of a vector on another vector.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The scalar component.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | Thecreate jsdoc babel vector to be projected. |
| vecB | <code>[Vector2](#Vector2)</code> | The vector to be projection upon. |

<a name="Vertex"></a>

## Vertex
A class representing a vertex

**Kind**: global class  

* [Vertex](#Vertex)
    * [new Vertex(value, [x], [y])](#new_Vertex_new)
    * [.isTerminal()](#Vertex+isTerminal) ⇒ <code>boolean</code>
    * [.clone()](#Vertex+clone) ⇒ <code>[Vertex](#Vertex)</code>
    * [.equals(vertex)](#Vertex+equals) ⇒ <code>boolean</code>
    * [.getAngle([referenceVector], [returnAsDegrees])](#Vertex+getAngle) ⇒ <code>number</code>
    * [.getTextDirection(vertices)](#Vertex+getTextDirection) ⇒ <code>string</code>
    * [.getNeighbours([vertexId])](#Vertex+getNeighbours) ⇒ <code>array</code>
    * [.getCommonNeighbours(vertex)](#Vertex+getCommonNeighbours) ⇒ <code>array</code>
    * [.isNeighbour(vertexId)](#Vertex+isNeighbour) ⇒ <code>boolean</code>
    * [.getSpanningTreeNeighbours([vertexId])](#Vertex+getSpanningTreeNeighbours) ⇒ <code>array</code>
    * [.getNextInRing(vertices, ringId, previousVertexId)](#Vertex+getNextInRing) ⇒ <code>number</code>

<a name="new_Vertex_new"></a>

### new Vertex(value, [x], [y])
The constructor for the class Vertex.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>\*</code> |  | The value associated with this vertex. |
| [x] | <code>number</code> | <code>0</code> | The initial x coordinate of the positional vector of this vertex. |
| [y] | <code>number</code> | <code>0</code> | The initial y coordinate of the positional vector of this vertex. |

<a name="Vertex+isTerminal"></a>

### vertex.isTerminal() ⇒ <code>boolean</code>
Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this vertex is terminal.  
<a name="Vertex+clone"></a>

### vertex.clone() ⇒ <code>[Vertex](#Vertex)</code>
Clones this vertex and returns the clone.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>[Vertex](#Vertex)</code> - A clone of this vertex.  
<a name="Vertex+equals"></a>

### vertex.equals(vertex) ⇒ <code>boolean</code>
Returns true if this vertex and the supplied vertex both have the same id, else returns false.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the two vertices have the same id.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | The vertex to check. |

<a name="Vertex+getAngle"></a>

### vertex.getAngle([referenceVector], [returnAsDegrees]) ⇒ <code>number</code>
Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>number</code> - The angle of this vertex.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [referenceVector] | <code>[Vertex](#Vertex)</code> | <code></code> | The refernece vector. |
| [returnAsDegrees] | <code>boolean</code> | <code>false</code> | If true, returns angle in degrees, else in radians. |

<a name="Vertex+getTextDirection"></a>

### vertex.getTextDirection(vertices) ⇒ <code>string</code>
Returns the suggested text direction when text is added at the position of this vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>string</code> - The suggested direction of the text.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | The array of vertices for the current molecule. |

<a name="Vertex+getNeighbours"></a>

### vertex.getNeighbours([vertexId]) ⇒ <code>array</code>
Returns an array of ids of neighbouring vertices.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>array</code> - An array containing the ids of neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>number</code> | <code></code> | If a value is supplied, the vertex with this id is excluded from the returned indices. |

<a name="Vertex+getCommonNeighbours"></a>

### vertex.getCommonNeighbours(vertex) ⇒ <code>array</code>
Gets the common neighbours of this and another vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>array</code> - An array containing common neighbours.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | The vertex to check for common neighbours. |

<a name="Vertex+isNeighbour"></a>

### vertex.isNeighbour(vertexId) ⇒ <code>boolean</code>
Checks whether or not a vertex is a neighbour of this vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the two vertices are neighbours.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | The id of the vertex to check if it is a neighbour of this vertex. |

<a name="Vertex+getSpanningTreeNeighbours"></a>

### vertex.getSpanningTreeNeighbours([vertexId]) ⇒ <code>array</code>
Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>array</code> - An array containing the ids of the neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>number</code> | <code></code> | If supplied, the vertex with this id is excluded from the array returned. |

<a name="Vertex+getNextInRing"></a>

### vertex.getNextInRing(vertices, ringId, previousVertexId) ⇒ <code>number</code>
Gets the next vertex in the ring in opposide direction to the supplied vertex id.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>number</code> - The id of the next vertex in the ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | The array of vertices for the current molecule. |
| ringId | <code>number</code> | The id of the ring containing this vertex. |
| previousVertexId | <code>number</code> | The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex. |


* * *
