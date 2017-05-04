[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

## Classes

<dl>
<dt><a href="#ArrayHelper">ArrayHelper</a></dt>
<dd><p>A static class containing helper functions for array-related tasks.</p>
</dd>
<dt><a href="#Atom">Atom</a></dt>
<dd><p>A class representing an atom</p>
</dd>
<dt><a href="#CanvasWrapper">CanvasWrapper</a></dt>
<dd><p>A class wrapping a canvas element</p>
</dd>
<dt><a href="#Edge">Edge</a></dt>
<dd><p>A class representing an edge</p>
</dd>
<dt><a href="#Line">Line</a></dt>
<dd><p>A class representing a line</p>
</dd>
<dt><a href="#MathHelper">MathHelper</a></dt>
<dd><p>A static class containing helper functions for math-related tasks.</p>
</dd>
<dt><a href="#Pair">Pair</a></dt>
<dd><p>A class representing a pair</p>
</dd>
<dt><a href="#Ring">Ring</a></dt>
<dd><p>A class representing a ring</p>
</dd>
<dt><a href="#RingConnection">RingConnection</a></dt>
<dd><p>A class representing a ring connection</p>
</dd>
<dt><a href="#SmilesDrawer">SmilesDrawer</a></dt>
<dd><p>The main class of the application representing the smiles drawer</p>
</dd>
<dt><a href="#Vector2">Vector2</a></dt>
<dd><p>A class representing a 2D vector.</p>
</dd>
<dt><a href="#Vertex">Vertex</a></dt>
<dd><p>A class representing a vertex</p>
</dd>
</dl>

<a name="ArrayHelper"></a>

## ArrayHelper
A static class containing helper functions for array-related tasks.

**Kind**: global class  

* [ArrayHelper](#ArrayHelper)
    * [.clone(arr)](#ArrayHelper.clone) ⇒ <code>array</code> &#124; <code>object</code>
    * [.print(arr)](#ArrayHelper.print) ⇒ <code>string</code>
    * [.each(arr, callback)](#ArrayHelper.each)
    * [.get(arr, property, value)](#ArrayHelper.get) ⇒ <code>\*</code>
    * [.contains(arr, options)](#ArrayHelper.contains) ⇒ <code>boolean</code>
    * [.intersection(arrA, arrB)](#ArrayHelper.intersection) ⇒ <code>array</code>
    * [.unique(arr)](#ArrayHelper.unique) ⇒ <code>array</code>
    * [.count(arr, value)](#ArrayHelper.count) ⇒ <code>number</code>
    * [.toggle(arr, value)](#ArrayHelper.toggle) ⇒ <code>array</code>
    * [.remove(arr, value)](#ArrayHelper.remove) ⇒ <code>array</code>
    * [.removeUnique(arr, value)](#ArrayHelper.removeUnique) ⇒ <code>array</code>
    * [.removeAll(arrA, arrB)](#ArrayHelper.removeAll) ⇒ <code>array</code>
    * [.merge(arrA, arrB)](#ArrayHelper.merge) ⇒ <code>array</code>
    * [.containsAll(arrA, arrB)](#ArrayHelper.containsAll) ⇒ <code>boolean</code>
    * [.sortByAtomicNumberDesc(arr)](#ArrayHelper.sortByAtomicNumberDesc) ⇒ <code>array</code>

<a name="ArrayHelper.clone"></a>

### ArrayHelper.clone(arr) ⇒ <code>array</code> &#124; <code>object</code>
Clone an array or an object. If an object is passed, a shallow clone will be created.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> &#124; <code>object</code> - A clone of the array or object.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> &#124; <code>object</code> | The array or object to be cloned. |

<a name="ArrayHelper.print"></a>

### ArrayHelper.print(arr) ⇒ <code>string</code>
Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>string</code> - A string representation of the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |

<a name="ArrayHelper.each"></a>

### ArrayHelper.each(arr, callback)
Run a function for each element in the array. The element is supplied as an argument for the callback function

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| callback | <code>function</code> | The callback function that is called for each element. |

<a name="ArrayHelper.get"></a>

### ArrayHelper.get(arr, property, value) ⇒ <code>\*</code>
Return the array element from an array containing objects, where a property of the object is set to a given value.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>\*</code> - The array element matching the value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| property | <code>string</code> &#124; <code>number</code> | A property contained within an object in the array. |
| value | <code>string</code> &#124; <code>number</code> | The value of the property. |

<a name="ArrayHelper.contains"></a>

### ArrayHelper.contains(arr, options) ⇒ <code>boolean</code>
Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>boolean</code> - A boolean whether or not the array contains a value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| options | <code>object</code> | See method description. |

<a name="ArrayHelper.intersection"></a>

### ArrayHelper.intersection(arrA, arrB) ⇒ <code>array</code>
Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> - The intersecting vlaues.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>array</code> | An array. |
| arrB | <code>array</code> | An array. |

<a name="ArrayHelper.unique"></a>

### ArrayHelper.unique(arr) ⇒ <code>array</code>
Returns an array of unique elements contained in an array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> - An array of unique elements contained within the array supplied as an argument.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |

<a name="ArrayHelper.count"></a>

### ArrayHelper.count(arr, value) ⇒ <code>number</code>
Count the number of occurences of a value in an array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>number</code> - The number of occurences of a value in the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| value | <code>\*</code> | A value to be counted. |

<a name="ArrayHelper.toggle"></a>

### ArrayHelper.toggle(arr, value) ⇒ <code>array</code>
Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> - The toggled array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| value | <code>\*</code> | A value to be toggled. |

<a name="ArrayHelper.remove"></a>

### ArrayHelper.remove(arr, value) ⇒ <code>array</code>
Remove a value from an array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> - A new array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="ArrayHelper.removeUnique"></a>

### ArrayHelper.removeUnique(arr, value) ⇒ <code>array</code>
Remove a value from an array with unique values.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> - An array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="ArrayHelper.removeAll"></a>

### ArrayHelper.removeAll(arrA, arrB) ⇒ <code>array</code>
Remove all elements contained in one array from another array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> - The filtered array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>array</code> | The array to be filtered. |
| arrB | <code>array</code> | The array containing elements that will be removed from the other array. |

<a name="ArrayHelper.merge"></a>

### ArrayHelper.merge(arrA, arrB) ⇒ <code>array</code>
Merges two arrays and returns the result. The second array will be appended to the second array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> - The merged array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>array</code> | An array. |
| arrB | <code>array</code> | An array. |

<a name="ArrayHelper.containsAll"></a>

### ArrayHelper.containsAll(arrA, arrB) ⇒ <code>boolean</code>
Checks whether or not an array contains all the elements of another array, without regard to the order.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not both array contain the same elements.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>array</code> | An array. |
| arrB | <code>array</code> | An array. |

<a name="ArrayHelper.sortByAtomicNumberDesc"></a>

### ArrayHelper.sortByAtomicNumberDesc(arr) ⇒ <code>array</code>
Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>array</code> - The sorted array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array of objects { atomicNumber: 6, vertexId: 2 }. |

<a name="Atom"></a>

## Atom
A class representing an atom

**Kind**: global class  

* [Atom](#Atom)
    * [new Atom(element, [bondType])](#new_Atom_new)
    * _instance_
        * [.attachPseudoElement(element, previousElement, [hydrogenCount])](#Atom+attachPseudoElement)
        * [.getAttachedPseudoElements()](#Atom+getAttachedPseudoElements) ⇒ <code>object</code>
        * [.addAnchoredRing(ringId)](#Atom+addAnchoredRing)
        * [.getRingbondCount()](#Atom+getRingbondCount) ⇒ <code>number</code>
        * [.canRotate()](#Atom+canRotate) ⇒ <code>boolean</code>
        * [.hasRingbonds()](#Atom+hasRingbonds) ⇒ <code>boolean</code>
        * [.getMaxRingbond()](#Atom+getMaxRingbond) ⇒ <code>number</code>
        * [.isInRing()](#Atom+isInRing) ⇒ <code>boolean</code>
        * [.hasRing(ringId)](#Atom+hasRing) ⇒ <code>boolean</code>
        * [.backupRings()](#Atom+backupRings)
        * [.restoreRings()](#Atom+restoreRings)
        * [.haveCommonRingbond(atomA, atomB)](#Atom+haveCommonRingbond) ⇒ <code>boolean</code>
        * [.maxCommonRingbond(atomA, atomB)](#Atom+maxCommonRingbond) ⇒ <code>number</code>
        * [.getOrder(center)](#Atom+getOrder) ⇒ <code>number</code>
        * [.setOrder(The, The)](#Atom+setOrder)
        * [.getAtomicNumber()](#Atom+getAtomicNumber) ⇒ <code>number</code>
    * _static_
        * [.sortByAtomicNumber(root, neighbours, vertices, rings)](#Atom.sortByAtomicNumber) ⇒ <code>array</code>
        * [.hasDuplicateAtomicNumbers(sortedAtomicNumbers)](#Atom.hasDuplicateAtomicNumbers) ⇒ <code>boolean</code>
        * [.getDuplicateAtomicNumbers(sortedAtomicNumbers)](#Atom.getDuplicateAtomicNumbers) ⇒ <code>array</code>

<a name="new_Atom_new"></a>

### new Atom(element, [bondType])
The constructor of the class Atom.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>string</code> |  | The one-letter code of the element. |
| [bondType] | <code>string</code> | <code>&quot;&#x27;-&#x27;&quot;</code> | The type of the bond associated with this atom. |

<a name="Atom+attachPseudoElement"></a>

### atom.attachPseudoElement(element, previousElement, [hydrogenCount])
Attaches a pseudo element (e.g. Ac) to the atom.

**Kind**: instance method of <code>[Atom](#Atom)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>string</code> |  | The element identifier (e.g. Br, C, ...). |
| previousElement | <code>string</code> |  | The element that is part of the main chain (not the terminals that are converted to the pseudo element or concatinated). |
| [hydrogenCount] | <code>number</code> | <code>0</code> | The number of hydrogens for the element. |

<a name="Atom+getAttachedPseudoElements"></a>

### atom.getAttachedPseudoElements() ⇒ <code>object</code>
Returns the attached pseudo elements sorted by hydrogen count (ascending).

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>object</code> - The sorted attached pseudo elements.  
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
<a name="Atom+isInRing"></a>

### atom.isInRing() ⇒ <code>boolean</code>
Checks whether or not this atom is part of a ring.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is part of a ring.  
<a name="Atom+hasRing"></a>

### atom.hasRing(ringId) ⇒ <code>boolean</code>
Checks whether or not this atom is a member of a given ring.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is a member of a given ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="Atom+backupRings"></a>

### atom.backupRings()
Backs up the current rings.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
<a name="Atom+restoreRings"></a>

### atom.restoreRings()
Restores the most recent backed up rings.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
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

<a name="Atom+getOrder"></a>

### atom.getOrder(center) ⇒ <code>number</code>
Returns the order of this atom given a central atom.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>number</code> - The order of this atom in respect to the center atom.  

| Param | Type | Description |
| --- | --- | --- |
| center | <code>number</code> | The id of the central atom in respect to which the order is defined. |

<a name="Atom+setOrder"></a>

### atom.setOrder(The, The)
Sets the order of this atom given a center. This is required since two atoms can have an order in respect to two different centers when connected by ringbonds.

**Kind**: instance method of <code>[Atom](#Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | id of the central atom in respect to which the order is defined. |
| The | <code>number</code> | order of this atom. |

<a name="Atom+getAtomicNumber"></a>

### atom.getAtomicNumber() ⇒ <code>number</code>
Get the atomic number of this atom.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>number</code> - The atomic number of this atom.  
<a name="Atom.sortByAtomicNumber"></a>

### Atom.sortByAtomicNumber(root, neighbours, vertices, rings) ⇒ <code>array</code>
Sorts an array of vertices by their respecitve atomic number.

**Kind**: static method of <code>[Atom](#Atom)</code>  
**Returns**: <code>array</code> - The array sorted by atomic number.  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>[Vertex](#Vertex)</code> | The central vertex |
| neighbours | <code>array</code> | An array of vertex ids. |
| vertices | <code>array</code> | An array containing the vertices associated with the current molecule. |
| rings | <code>array</code> | An array containing the rings associated with the current molecule. |

<a name="Atom.hasDuplicateAtomicNumbers"></a>

### Atom.hasDuplicateAtomicNumbers(sortedAtomicNumbers) ⇒ <code>boolean</code>
Checks wheter or not two atoms have the same atomic number

**Kind**: static method of <code>[Atom](#Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not there are duplicate atomic numbers.  

| Param | Type | Description |
| --- | --- | --- |
| sortedAtomicNumbers | <code>array</code> | An array of objects { atomicNumber: 6, vertexId: 2 }. |

<a name="Atom.getDuplicateAtomicNumbers"></a>

### Atom.getDuplicateAtomicNumbers(sortedAtomicNumbers) ⇒ <code>array</code>
Returns sets of duplicate atomic numbers.

**Kind**: static method of <code>[Atom](#Atom)</code>  
**Returns**: <code>array</code> - An array of arrays containing the indices of duplicate atomic numbers.  

| Param | Type | Description |
| --- | --- | --- |
| sortedAtomicNumbers | <code>array</code> | An array of objects { atomicNumber: 6, vertexId: 2 }. |

<a name="CanvasWrapper"></a>

## CanvasWrapper
A class wrapping a canvas element

**Kind**: global class  

* [CanvasWrapper](#CanvasWrapper)
    * [new CanvasWrapper(target, theme, options)](#new_CanvasWrapper_new)
    * [.updateSize(width, height)](#CanvasWrapper+updateSize)
    * [.setTheme(theme)](#CanvasWrapper+setTheme)
    * [.scale(vertices)](#CanvasWrapper+scale)
    * [.reset()](#CanvasWrapper+reset)
    * [.getColor(key)](#CanvasWrapper+getColor) ⇒ <code>string</code>
    * [.drawCircle(x, y, radius, color, [fill], [debug], [debugText])](#CanvasWrapper+drawCircle)
    * [.drawLine(line)](#CanvasWrapper+drawLine)
    * [.drawWedge(line, width)](#CanvasWrapper+drawWedge)
    * [.drawDashedWedge(line, width)](#CanvasWrapper+drawDashedWedge)
    * [.drawDebugText(x, y, text)](#CanvasWrapper+drawDebugText)
    * [.drawBall(x, y, elementName, hydrogens)](#CanvasWrapper+drawBall)
    * [.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, [pseudoElements])](#CanvasWrapper+drawText)
    * [.drawDebugPoint(x, y, [debugText], [color])](#CanvasWrapper+drawDebugPoint)
    * [.drawAromaticityRing(ring)](#CanvasWrapper+drawAromaticityRing)
    * [.clear()](#CanvasWrapper+clear)

<a name="new_CanvasWrapper_new"></a>

### new CanvasWrapper(target, theme, options)
The constructor for the class CanvasWrapper.


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> &#124; <code>HTMLElement</code> | The canvas id or the canvas HTMLElement. |
| theme | <code>object</code> | A theme from the smiles drawer options. |
| options | <code>any</code> | The smiles drawer options object. |

<a name="CanvasWrapper+updateSize"></a>

### canvasWrapper.updateSize(width, height)
Update the width and height of the canvas

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type |
| --- | --- |
| width | <code>number</code> | 
| height | <code>number</code> | 

<a name="CanvasWrapper+setTheme"></a>

### canvasWrapper.setTheme(theme)
Sets a provided theme.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>object</code> | A theme from the smiles drawer options. |

<a name="CanvasWrapper+scale"></a>

### canvasWrapper.scale(vertices)
Scale the canvas based on vertex positions.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices containing the vertices associated with the current molecule. |

<a name="CanvasWrapper+reset"></a>

### canvasWrapper.reset()
Resets the transform of the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  
<a name="CanvasWrapper+getColor"></a>

### canvasWrapper.getColor(key) ⇒ <code>string</code>
Returns the hex code of a color associated with a key from the current theme.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  
**Returns**: <code>string</code> - A color hex value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The color key in the theme (e.g. C, N, BACKGROUND, ...). |

<a name="CanvasWrapper+drawCircle"></a>

### canvasWrapper.drawCircle(x, y, radius, color, [fill], [debug], [debugText])
Draws a circle to a canvas context.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | The x coordinate of the circles center. |
| y | <code>number</code> |  | The y coordinate of the circles center. |
| radius | <code>number</code> |  | The radius of the circle |
| color | <code>string</code> |  | A hex encoded color. |
| [fill] | <code>boolean</code> | <code>true</code> | Whether to fill or stroke the circle. |
| [debug] | <code>boolean</code> | <code>false</code> | Draw in debug mode. |
| [debugText] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | A debug message. |

<a name="CanvasWrapper+drawLine"></a>

### canvasWrapper.drawLine(line)
Draw a line to a canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>[Line](#Line)</code> | A line. |

<a name="CanvasWrapper+drawWedge"></a>

### canvasWrapper.drawWedge(line, width)
Draw a wedge on the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>[Line](#Line)</code> |  | A line. |
| width | <code>number</code> | <code>3</code> | The wedge width. |

<a name="CanvasWrapper+drawDashedWedge"></a>

### canvasWrapper.drawDashedWedge(line, width)
Draw a dashed wedge on the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>[Line](#Line)</code> |  | A line. |
| width | <code>number</code> | <code>6</code> | The wedge width. |

<a name="CanvasWrapper+drawDebugText"></a>

### canvasWrapper.drawDebugText(x, y, text)
Draws a debug text message at a given position

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x coordinate. |
| y | <code>number</code> | The y coordinate. |
| text | <code>string</code> | The debug text. |

<a name="CanvasWrapper+drawBall"></a>

### canvasWrapper.drawBall(x, y, elementName, hydrogens)
Draw a ball to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x position of the text. |
| y | <code>number</code> | The y position of the text. |
| elementName | <code>string</code> | The name of the element (single-letter). |
| hydrogens | <code>number</code> | The number of hydrogen atoms. |

<a name="CanvasWrapper+drawText"></a>

### canvasWrapper.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, [pseudoElements])
Draw a text to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | The x position of the text. |
| y | <code>number</code> |  | The y position of the text. |
| elementName | <code>string</code> |  | The name of the element (single-letter). |
| hydrogens | <code>number</code> |  | The number of hydrogen atoms. |
| direction | <code>string</code> |  | The direction of the text in relation to the associated vertex. |
| isTerminal | <code>boolean</code> |  | A boolean indicating whether or not the vertex is terminal. |
| charge | <code>string</code> |  | The charge of the atom. |
| isotope | <code>number</code> |  | The isotope number. |
| [pseudoElements] | <code>object</code> | <code>{}</code> | An object containing pseudo elements or shortcut elements and their count. E.g. { 'F': 3 }, { 'O': 2, 'H': 1 }. |

<a name="CanvasWrapper+drawDebugPoint"></a>

### canvasWrapper.drawDebugPoint(x, y, [debugText], [color])
Draws a dubug dot at a given coordinate and adds text.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | The x coordinate. |
| y | <code>number</code> |  | The y coordindate. |
| [debugText] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | A string. |
| [color] | <code>string</code> | <code>&quot;&#x27;#f00&#x27;&quot;</code> | A color in hex form. |

<a name="CanvasWrapper+drawAromaticityRing"></a>

### canvasWrapper.drawAromaticityRing(ring)
Draws a ring inside a provided ring, indicating aromaticity.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> | A ring. |

<a name="CanvasWrapper+clear"></a>

### canvasWrapper.clear()
Clear the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  
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
    * [new Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])](#new_Line_new)
    * [.clone()](#Line+clone) ⇒ <code>[Line](#Line)</code>
    * [.getLength()](#Line+getLength) ⇒ <code>number</code>
    * [.getAngle()](#Line+getAngle) ⇒ <code>number</code>
    * [.getRightVector()](#Line+getRightVector) ⇒ <code>[Vector2](#Vector2)</code>
    * [.getLeftVector()](#Line+getLeftVector) ⇒ <code>[Vector2](#Vector2)</code>
    * [.getRightElement()](#Line+getRightElement) ⇒ <code>string</code>
    * [.getLeftElement()](#Line+getLeftElement) ⇒ <code>string</code>
    * [.getRightChiral()](#Line+getRightChiral) ⇒ <code>boolean</code>
    * [.getLeftChiral()](#Line+getLeftChiral) ⇒ <code>boolean</code>
    * [.setRightVector(x, y)](#Line+setRightVector) ⇒ <code>[Line](#Line)</code>
    * [.setLeftVector(x, y)](#Line+setLeftVector) ⇒ <code>[Line](#Line)</code>
    * [.rotateToXAxis()](#Line+rotateToXAxis) ⇒ <code>[Line](#Line)</code>
    * [.rotate(theta)](#Line+rotate) ⇒ <code>[Line](#Line)</code>
    * [.shortenFrom(by)](#Line+shortenFrom) ⇒ <code>[Line](#Line)</code>
    * [.shortenTo(by)](#Line+shortenTo) ⇒ <code>[Line](#Line)</code>
    * [.shortenRight(by)](#Line+shortenRight) ⇒ <code>[Line](#Line)</code>
    * [.shortenLeft(by)](#Line+shortenLeft) ⇒ <code>[Line](#Line)</code>
    * [.shorten(by)](#Line+shorten) ⇒ <code>[Line](#Line)</code>
    * [.getNormals()](#Line+getNormals) ⇒ <code>array</code>

<a name="new_Line_new"></a>

### new Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])
The constructor for the class Line.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [from] | <code>[Vector2](#Vector2)</code> | <code>new Vector2(0, 0)</code> | A vector marking the beginning of the line. |
| [to] | <code>[Vector2](#Vector2)</code> | <code>new Vector2(0, 0)</code> | A vector marking the end of the line. |
| [elementFrom] | <code>string</code> | <code>null</code> | A one-letter representation of the element associated with the vector marking the beginning of the line. |
| [elementTo] | <code>string</code> | <code>null</code> | A one-letter representation of the element associated with the vector marking the end of the line. |
| [chiralFrom] | <code>boolean</code> | <code>false</code> | Whether or not the from atom is a chiral center. |
| [chiralTo] | <code>boolean</code> | <code>false</code> | Whether or not the to atom is a chiral center. |

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
<a name="Line+getRightChiral"></a>

### line.getRightChiral() ⇒ <code>boolean</code>
Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>boolean</code> - Whether or not the atom associated with the right vector is a chiral center.  
<a name="Line+getLeftChiral"></a>

### line.getLeftChiral() ⇒ <code>boolean</code>
Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>boolean</code> - Whether or not the atom  associated with the left vector is a chiral center.  
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

<a name="Line+shortenRight"></a>

### line.shortenRight(by) ⇒ <code>[Line](#Line)</code>
Shorten the right side.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="Line+shortenLeft"></a>

### line.shortenLeft(by) ⇒ <code>[Line](#Line)</code>
Shorten the left side.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - Returns itself.  

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

<a name="Line+getNormals"></a>

### line.getNormals() ⇒ <code>array</code>
Returns the normals of this line.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>array</code> - An array containing the two normals as vertices.  
<a name="MathHelper"></a>

## MathHelper
A static class containing helper functions for math-related tasks.

**Kind**: global class  

* [MathHelper](#MathHelper)
    * [.round(value, decimals)](#MathHelper.round) ⇒ <code>number</code>
    * [.meanAngle(arr)](#MathHelper.meanAngle) ⇒ <code>number</code>
    * [.innerAngle(n)](#MathHelper.innerAngle) ⇒ <code>number</code>
    * [.polyCircumradius(s, n)](#MathHelper.polyCircumradius) ⇒ <code>number</code>
    * [.apothem(r, n)](#MathHelper.apothem) ⇒ <code>number</code>
    * [.centralAngle(n)](#MathHelper.centralAngle) ⇒ <code>number</code>
    * [.toDeg(rad)](#MathHelper.toDeg) ⇒ <code>number</code>
    * [.toRad(deg)](#MathHelper.toRad) ⇒ <code>number</code>

<a name="MathHelper.round"></a>

### MathHelper.round(value, decimals) ⇒ <code>number</code>
Rounds a value to a given number of decimals.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>number</code> - A number rounded to a given number of decimals.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | A number. |
| decimals | <code>number</code> | The number of decimals. |

<a name="MathHelper.meanAngle"></a>

### MathHelper.meanAngle(arr) ⇒ <code>number</code>
Returns the means of the angles contained in an array. In radians.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>number</code> - The mean angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array containing angles (in radians). |

<a name="MathHelper.innerAngle"></a>

### MathHelper.innerAngle(n) ⇒ <code>number</code>
Returns the inner angle of a n-sided regular polygon.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>number</code> - The inner angle of a given regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | Number of sides of a regular polygon. |

<a name="MathHelper.polyCircumradius"></a>

### MathHelper.polyCircumradius(s, n) ⇒ <code>number</code>
Returns the circumradius of a n-sided regular polygon with a given side-length.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>number</code> - The circumradius of the regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The side length of the regular polygon. |
| n | <code>number</code> | The number of sides. |

<a name="MathHelper.apothem"></a>

### MathHelper.apothem(r, n) ⇒ <code>number</code>
Returns the apothem of a regular n-sided polygon based on its radius.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>number</code> - The apothem of a n-sided polygon based on its radius.  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>number</code> | The radius. |
| n | <code>number</code> | The number of edges of the regular polygon. |

<a name="MathHelper.centralAngle"></a>

### MathHelper.centralAngle(n) ⇒ <code>number</code>
The central angle of a n-sided regular polygon. In radians.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>number</code> - The central angle of the n-sided polygon in radians.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | The number of sides of the regular polygon. |

<a name="MathHelper.toDeg"></a>

### MathHelper.toDeg(rad) ⇒ <code>number</code>
Convertes radians to degrees.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>number</code> - The angle in degrees.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | An angle in radians. |

<a name="MathHelper.toRad"></a>

### MathHelper.toRad(deg) ⇒ <code>number</code>
Converts degrees to radians.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| deg | <code>number</code> | An angle in degrees. |

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
        * [.isBenzeneLike(vertices)](#Ring+isBenzeneLike) ⇒ <code>boolean</code>
        * [.getDoubleBondCount(vertices)](#Ring+getDoubleBondCount) ⇒ <code>number</code>
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
Check whether this ring is explicitly aromatic (e.g. c1ccccc1).

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring is explicitly aromatic (using lowercase letters in smiles).  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices associated with the current molecule. |

<a name="Ring+isBenzeneLike"></a>

### ring.isBenzeneLike(vertices) ⇒ <code>boolean</code>
Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring is an implicitly defined benzene-like.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices associated with the current molecule. |

<a name="Ring+getDoubleBondCount"></a>

### ring.getDoubleBondCount(vertices) ⇒ <code>number</code>
Get the number of double bonds inside this ring.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>number</code> - The number of double bonds inside this ring.  

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

<a name="RingConnection"></a>

## RingConnection
A class representing a ring connection

**Kind**: global class  

* [RingConnection](#RingConnection)
    * [new RingConnection(firstRing, secondRing)](#new_RingConnection_new)
    * _instance_
        * [.addVertex(vertexId)](#RingConnection+addVertex)
        * [.isBridge(vertices)](#RingConnection+isBridge) ⇒ <code>boolean</code>
        * [.updateOther(ringId, otherRingId)](#RingConnection+updateOther)
    * _static_
        * [.isBridge(ringConnections, vertices, firstRingId, secondRingId)](#RingConnection.isBridge) ⇒ <code>boolean</code>
        * [.getNeighbours(ringConnections, ringId)](#RingConnection.getNeighbours) ⇒ <code>array</code>
        * [.getVertices(ringConnections, firstRingId, secondRingId)](#RingConnection.getVertices) ⇒ <code>array</code>

<a name="new_RingConnection_new"></a>

### new RingConnection(firstRing, secondRing)
The constructor for the class RingConnection.


| Param | Type | Description |
| --- | --- | --- |
| firstRing | <code>number</code> | A ring. |
| secondRing | <code>number</code> | A ring. |

<a name="RingConnection+addVertex"></a>

### ringConnection.addVertex(vertexId)
Adding a vertex to the ring connection.

**Kind**: instance method of <code>[RingConnection](#RingConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |

<a name="RingConnection+isBridge"></a>

### ringConnection.isBridge(vertices) ⇒ <code>boolean</code>
Checks whether or not this ring connection is a bridge in a bridged ring.

**Kind**: instance method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring connection is a bridge.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | The array of vertices associated with the current molecule. |

<a name="RingConnection+updateOther"></a>

### ringConnection.updateOther(ringId, otherRingId)
Update the ring id of this ring connection that is not the ring id supplied as the second argument.

**Kind**: instance method of <code>[RingConnection](#RingConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. The new ring id to be set. |
| otherRingId | <code>number</code> | A ring id. The id that is NOT to be updated. |

<a name="RingConnection.isBridge"></a>

### RingConnection.isBridge(ringConnections, vertices, firstRingId, secondRingId) ⇒ <code>boolean</code>
Checks whether or not two rings are connected by a bridged bond.

**Kind**: static method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not two rings ar connected by a bridged bond.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>array</code> | An array of ring connections containing the ring connections associated with the current molecule. |
| vertices | <code>array</code> | An array of vertices containing the vertices associated with the current molecule. |
| firstRingId | <code>number</code> | A ring id. |
| secondRingId | <code>number</code> | A ring id. |

<a name="RingConnection.getNeighbours"></a>

### RingConnection.getNeighbours(ringConnections, ringId) ⇒ <code>array</code>
Retruns the neighbouring rings of a given ring.

**Kind**: static method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>array</code> - An array of ring ids of neighbouring rings.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>array</code> | An array of ring connections containing ring connections associated with the current molecule. |
| ringId | <code>number</code> | A ring id. |

<a name="RingConnection.getVertices"></a>

### RingConnection.getVertices(ringConnections, firstRingId, secondRingId) ⇒ <code>array</code>
Returns an array of vertex ids associated with a given ring connection.

**Kind**: static method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>array</code> - An array of vertex ids associated with the ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>array</code> | An array of ring connections containing ring connections associated with the current molecule. |
| firstRingId | <code>number</code> | A ring id. |
| secondRingId | <code>number</code> | A ring id. |

<a name="SmilesDrawer"></a>

## SmilesDrawer
The main class of the application representing the smiles drawer

**Kind**: global class  

* [SmilesDrawer](#SmilesDrawer)
    * [new SmilesDrawer(options)](#new_SmilesDrawer_new)
    * _instance_
        * [.extend()](#SmilesDrawer+extend)
        * [.draw(data, target, themeName, infoOnly)](#SmilesDrawer+draw)
        * [.edgeRingCount(edgeId)](#SmilesDrawer+edgeRingCount) ⇒ <code>number</code>
        * [.getBridgedRings()](#SmilesDrawer+getBridgedRings) ⇒ <code>array</code>
        * [.getFusedRings()](#SmilesDrawer+getFusedRings) ⇒ <code>array</code>
        * [.getSpiros()](#SmilesDrawer+getSpiros) ⇒ <code>array</code>
        * [.printRingInfo()](#SmilesDrawer+printRingInfo) ⇒ <code>string</code>
        * [.getTotalOverlapScore()](#SmilesDrawer+getTotalOverlapScore) ⇒ <code>number</code>
        * [.getRingCount()](#SmilesDrawer+getRingCount) ⇒ <code>number</code>
        * [.hasBridgedRing()](#SmilesDrawer+hasBridgedRing) ⇒ <code>boolean</code>
        * [.getHeavyAtomCount()](#SmilesDrawer+getHeavyAtomCount) ⇒ <code>number</code>
        * [.initGraph(node, parentVertexId, isBranch)](#SmilesDrawer+initGraph)
        * [.getRingbondType(vertexA, vertexB)](#SmilesDrawer+getRingbondType) ⇒ <code>string</code> &#124; <code>null</code>
        * [.initRings()](#SmilesDrawer+initRings)
        * [.getBridgedRingRings(ringId)](#SmilesDrawer+getBridgedRingRings) ⇒ <code>array</code>
        * [.isPartOfBridgedRing(ringId)](#SmilesDrawer+isPartOfBridgedRing) ⇒ <code>boolean</code>
        * [.createBridgedRing(ringIds, sourceVertexId)](#SmilesDrawer+createBridgedRing) ⇒ <code>[Ring](#Ring)</code>
        * [.getRingVertices(sourceId, targetId)](#SmilesDrawer+getRingVertices) ⇒ <code>array</code>
        * [.dijkstra(sourceId, targetId)](#SmilesDrawer+dijkstra) ⇒ <code>array</code>
        * [.getMinDist(dist, visited)](#SmilesDrawer+getMinDist) ⇒ <code>number</code>
        * [.areVerticesInSameRing(vertexA, vertexB)](#SmilesDrawer+areVerticesInSameRing) ⇒ <code>boolean</code>
        * [.getCommonRings(vertexA, vertexB)](#SmilesDrawer+getCommonRings) ⇒ <code>array</code>
        * [.getSmallestCommonRing(vertexA, vertexB)](#SmilesDrawer+getSmallestCommonRing) ⇒ <code>[Ring](#Ring)</code> &#124; <code>null</code>
        * [.getLargestCommonRing(vertexA, vertexB)](#SmilesDrawer+getLargestCommonRing) ⇒ <code>[Ring](#Ring)</code> &#124; <code>null</code>
        * [.getLargestOrAromaticCommonRing(vertexA, vertexB)](#SmilesDrawer+getLargestOrAromaticCommonRing) ⇒ <code>[Ring](#Ring)</code> &#124; <code>null</code>
        * [.getVerticesAt(position, radius, excludeVertexId)](#SmilesDrawer+getVerticesAt) ⇒ <code>array</code>
        * [.getClosestVertex(vertex)](#SmilesDrawer+getClosestVertex) ⇒ <code>[Vertex](#Vertex)</code>
        * [.getClosestEndpointVertex(vertex)](#SmilesDrawer+getClosestEndpointVertex) ⇒ <code>[Vertex](#Vertex)</code>
        * [.getBranch(vertexId, previousId)](#SmilesDrawer+getBranch) ⇒ <code>object</code>
        * [.addVertex(vertex)](#SmilesDrawer+addVertex) ⇒ <code>number</code>
        * [.addEdge(edge)](#SmilesDrawer+addEdge) ⇒ <code>number</code>
        * [.addRing(ring)](#SmilesDrawer+addRing) ⇒ <code>number</code>
        * [.removeRing(ringId)](#SmilesDrawer+removeRing)
        * [.getRing(ringId)](#SmilesDrawer+getRing) ⇒ <code>[Ring](#Ring)</code>
        * [.addRingConnection(ringConnection)](#SmilesDrawer+addRingConnection) ⇒ <code>number</code>
        * [.removeRingConnection(ringConnectionId)](#SmilesDrawer+removeRingConnection)
        * [.removeRingConnectionsBetween(vertexIdA, vertexIdB)](#SmilesDrawer+removeRingConnectionsBetween)
        * [.getRingConnections(ringId, ringIds)](#SmilesDrawer+getRingConnections) ⇒ <code>array</code>
        * [.isRingConnection(vertexIdA, vertexIdB)](#SmilesDrawer+isRingConnection) ⇒ <code>boolean</code>
        * [.getOverlapScore()](#SmilesDrawer+getOverlapScore) ⇒ <code>object</code>
        * [.chooseSide(vertexA, vertexB, sides)](#SmilesDrawer+chooseSide) ⇒ <code>object</code>
        * [.areConnected(vertexIdA, vertexIdA)](#SmilesDrawer+areConnected) ⇒ <code>boolean</code>
        * [.getEdgeWeight(vertexIdA, vertexIdB)](#SmilesDrawer+getEdgeWeight) ⇒ <code>number</code> &#124; <code>null</code>
        * [.getEdge(vertexIdA, vertexIdB)](#SmilesDrawer+getEdge) ⇒ <code>number</code> &#124; <code>null</code>
        * [.forceLayout(vertices, center, startVertexId, ring)](#SmilesDrawer+forceLayout)
        * [.getSubringCenter(ring, vertex)](#SmilesDrawer+getSubringCenter) ⇒ <code>[Vector2](#Vector2)</code>
        * [.drawEdges(debug)](#SmilesDrawer+drawEdges)
        * [.drawVertices(debug)](#SmilesDrawer+drawVertices)
        * [.position()](#SmilesDrawer+position)
        * [.clearPositions()](#SmilesDrawer+clearPositions)
        * [.restorePositions()](#SmilesDrawer+restorePositions)
        * [.backupRingInformation()](#SmilesDrawer+backupRingInformation)
        * [.restoreRingInformation()](#SmilesDrawer+restoreRingInformation)
        * [.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])](#SmilesDrawer+createRing)
        * [.rotateSubtree(vertexId, parentVertexId, angle, center)](#SmilesDrawer+rotateSubtree)
        * [.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores)](#SmilesDrawer+getSubtreeOverlapScore) ⇒ <code>number</code>
        * [.getCurrentCenterOfMass()](#SmilesDrawer+getCurrentCenterOfMass) ⇒ <code>[Vector2](#Vector2)</code>
        * [.getCurrentCenterOfMassInNeigbourhood(vec, [r])](#SmilesDrawer+getCurrentCenterOfMassInNeigbourhood) ⇒ <code>[Vector2](#Vector2)</code>
        * [.resolvePrimaryOverlaps()](#SmilesDrawer+resolvePrimaryOverlaps)
        * [.resolveSecondaryOverlaps(scores)](#SmilesDrawer+resolveSecondaryOverlaps)
        * [.createNextBond(vertex, previousVertex, ringOrAngle, dir)](#SmilesDrawer+createNextBond)
        * [.getCommonRingbondNeighbour(vertex)](#SmilesDrawer+getCommonRingbondNeighbour) ⇒ <code>number</code> &#124; <code>null</code>
        * [.isPointInRing(vec)](#SmilesDrawer+isPointInRing) ⇒ <code>boolean</code>
        * [.isEdgeInRing(edge)](#SmilesDrawer+isEdgeInRing) ⇒ <code>boolean</code>
        * [.isEdgeRotatable(edge)](#SmilesDrawer+isEdgeRotatable) ⇒ <code>boolean</code>
        * [.isRingAromatic(ring)](#SmilesDrawer+isRingAromatic) ⇒ <code>boolean</code>
        * [.isEdgeInAromaticRing(edge)](#SmilesDrawer+isEdgeInAromaticRing) ⇒ <code>boolean</code>
        * [.isVertexInAromaticRing(vertexId)](#SmilesDrawer+isVertexInAromaticRing) ⇒ <code>boolean</code>
        * [.getEdgeNormals(edge)](#SmilesDrawer+getEdgeNormals) ⇒ <code>array</code>
        * [.getTreeDepth(vertexId, parentVertexId)](#SmilesDrawer+getTreeDepth) ⇒ <code>number</code>
        * [.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst])](#SmilesDrawer+traverseTree)
        * [.getBondCount(vertex)](#SmilesDrawer+getBondCount) ⇒ <code>number</code>
        * [.getNonRingNeighbours(vertexId)](#SmilesDrawer+getNonRingNeighbours) ⇒ <code>array</code>
        * [.initPseudoElements()](#SmilesDrawer+initPseudoElements)
    * _static_
        * [.clean(smiles)](#SmilesDrawer.clean) ⇒ <code>string</code>
        * [.apply(options, [themeName])](#SmilesDrawer.apply)
        * [.parse(smiles, successCallback, errorCallback)](#SmilesDrawer.parse)

<a name="new_SmilesDrawer_new"></a>

### new SmilesDrawer(options)
The constructor for the class SmilesDrawer.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | An object containing custom values for different options. It is merged with the default options. |

<a name="SmilesDrawer+extend"></a>

### smilesDrawer.extend()
A helper method to extend the default options with user supplied ones.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer+draw"></a>

### smilesDrawer.draw(data, target, themeName, infoOnly)
Draws the parsed smiles data to a canvas element.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>object</code> |  | The tree returned by the smiles parser. |
| target | <code>string</code> &#124; <code>HTMLElement</code> |  | The id of the HTML canvas element the structure is drawn to - or the element itself. |
| themeName | <code>string</code> | <code>&quot;&#x27;dark&#x27;&quot;</code> | The name of the theme to use. Built-in themes are 'light' and 'dark'. |
| infoOnly | <code>boolean</code> | <code>false</code> | Only output info on the molecule without drawing anything to the canvas. |

<a name="SmilesDrawer+edgeRingCount"></a>

### smilesDrawer.edgeRingCount(edgeId) ⇒ <code>number</code>
Returns the number of rings this edge is a part of.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The number of rings the provided edge is part of.  

| Param | Type | Description |
| --- | --- | --- |
| edgeId | <code>number</code> | The id of an edge. |

<a name="SmilesDrawer+getBridgedRings"></a>

### smilesDrawer.getBridgedRings() ⇒ <code>array</code>
Returns an array containing the bridged rings associated with this  molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array containing all bridged rings associated with this molecule.  
<a name="SmilesDrawer+getFusedRings"></a>

### smilesDrawer.getFusedRings() ⇒ <code>array</code>
Returns an array containing all fused rings associated with this molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array containing all fused rings associated with this molecule.  
<a name="SmilesDrawer+getSpiros"></a>

### smilesDrawer.getSpiros() ⇒ <code>array</code>
Returns an array containing all spiros associated with this molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array containing all spiros associated with this molecule.  
<a name="SmilesDrawer+printRingInfo"></a>

### smilesDrawer.printRingInfo() ⇒ <code>string</code>
Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings); Insiders Count (the number of vertices contained within a bridged ring)

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>string</code> - A string as described in the method description.  
<a name="SmilesDrawer+getTotalOverlapScore"></a>

### smilesDrawer.getTotalOverlapScore() ⇒ <code>number</code>
Returns the total overlap score of the current molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The overlap score.  
<a name="SmilesDrawer+getRingCount"></a>

### smilesDrawer.getRingCount() ⇒ <code>number</code>
Returns the ring count of the current molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The ring count.  
<a name="SmilesDrawer+hasBridgedRing"></a>

### smilesDrawer.hasBridgedRing() ⇒ <code>boolean</code>
Checks whether or not the current molecule contains a bridged ring.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the current molecule contains a bridged ring.  
<a name="SmilesDrawer+getHeavyAtomCount"></a>

### smilesDrawer.getHeavyAtomCount() ⇒ <code>number</code>
Returns the number of heavy atoms (non-hydrogen) in the current molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The heavy atom count.  
<a name="SmilesDrawer+initGraph"></a>

### smilesDrawer.initGraph(node, parentVertexId, isBranch)
Initializes the graph (vertices and edges) based on the tree supplied by the smiles parser.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>object</code> |  | The current node in the parse tree. |
| parentVertexId | <code>number</code> | <code></code> | The id of the previous vertex. |
| isBranch | <code>boolean</code> | <code>false</code> | Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C). |

<a name="SmilesDrawer+getRingbondType"></a>

### smilesDrawer.getRingbondType(vertexA, vertexB) ⇒ <code>string</code> &#124; <code>null</code>
Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>string</code> &#124; <code>null</code> - Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+initRings"></a>

### smilesDrawer.initRings()
Initializes rings and ringbonds for the current molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer+getBridgedRingRings"></a>

### smilesDrawer.getBridgedRingRings(ringId) ⇒ <code>array</code>
Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array containing all ring ids of rings part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer+isPartOfBridgedRing"></a>

### smilesDrawer.isPartOfBridgedRing(ringId) ⇒ <code>boolean</code>
Checks whether or not a ring is part of a bridged ring.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer+createBridgedRing"></a>

### smilesDrawer.createBridgedRing(ringIds, sourceVertexId) ⇒ <code>[Ring](#Ring)</code>
Creates a bridged ring.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Ring](#Ring)</code> - The bridged ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringIds | <code>array</code> | An array of ids of rings involved in the bridged ring. |
| sourceVertexId | <code>number</code> | The vertex id to start the bridged ring discovery from. |

<a name="SmilesDrawer+getRingVertices"></a>

### smilesDrawer.getRingVertices(sourceId, targetId) ⇒ <code>array</code>
Returns an array of vertices that are members of the ring specified by the source and target vertex ids. It is assumed that those two vertices share the ringbond (the break introduced when creating the smiles MST).

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array of vertex ids.  

| Param | Type | Description |
| --- | --- | --- |
| sourceId | <code>number</code> | A vertex id. |
| targetId | <code>number</code> | A vertex id. |

<a name="SmilesDrawer+dijkstra"></a>

### smilesDrawer.dijkstra(sourceId, targetId) ⇒ <code>array</code>
Dijkstras algorithm for finding the shortest path between two vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - The path (vertex ids) from the source to the target vertex.  

| Param | Type | Description |
| --- | --- | --- |
| sourceId | <code>number</code> | The id of the source vertex. |
| targetId | <code>number</code> | The id of the target vertex. |

<a name="SmilesDrawer+getMinDist"></a>

### smilesDrawer.getMinDist(dist, visited) ⇒ <code>number</code>
Gets the minimal distance from an array containing distances.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The id with the minimal distance.  

| Param | Type | Description |
| --- | --- | --- |
| dist | <code>array</code> | An array of distances. |
| visited | <code>array</code> | An array indicated whether or not a vertex has been visited. |

<a name="SmilesDrawer+areVerticesInSameRing"></a>

### smilesDrawer.areVerticesInSameRing(vertexA, vertexB) ⇒ <code>boolean</code>
Checks whether or not two vertices are in the same ring.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the two vertices are in the same ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+getCommonRings"></a>

### smilesDrawer.getCommonRings(vertexA, vertexB) ⇒ <code>array</code>
Returns an array of ring ids shared by both vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array of ids of rings shared by the two vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+getSmallestCommonRing"></a>

### smilesDrawer.getSmallestCommonRing(vertexA, vertexB) ⇒ <code>[Ring](#Ring)</code> &#124; <code>null</code>
Returns the smallest ring shared by the two vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Ring](#Ring)</code> &#124; <code>null</code> - If a smallest common ring exists, that ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+getLargestCommonRing"></a>

### smilesDrawer.getLargestCommonRing(vertexA, vertexB) ⇒ <code>[Ring](#Ring)</code> &#124; <code>null</code>
Returns the largest ring shared by the two vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Ring](#Ring)</code> &#124; <code>null</code> - If a largest common ring exists, that ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+getLargestOrAromaticCommonRing"></a>

### smilesDrawer.getLargestOrAromaticCommonRing(vertexA, vertexB) ⇒ <code>[Ring](#Ring)</code> &#124; <code>null</code>
Returns the aromatic or largest ring shared by the two vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Ring](#Ring)</code> &#124; <code>null</code> - If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+getVerticesAt"></a>

### smilesDrawer.getVerticesAt(position, radius, excludeVertexId) ⇒ <code>array</code>
Returns an array of vertices positioned at a specified location.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array containing vertex ids in a given location.  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>[Vector2](#Vector2)</code> | The position to search for vertices. |
| radius | <code>number</code> | The radius within to search. |
| excludeVertexId | <code>number</code> | A vertex id to be excluded from the search results. |

<a name="SmilesDrawer+getClosestVertex"></a>

### smilesDrawer.getClosestVertex(vertex) ⇒ <code>[Vertex](#Vertex)</code>
Returns the closest vertex (connected as well as unconnected).

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Vertex](#Vertex)</code> - The closest vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | The vertex of which to find the closest other vertex. |

<a name="SmilesDrawer+getClosestEndpointVertex"></a>

### smilesDrawer.getClosestEndpointVertex(vertex) ⇒ <code>[Vertex](#Vertex)</code>
Returns the closest vertex (connected as well as unconnected), which is an endpoint.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Vertex](#Vertex)</code> - The closest endpoint vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | The vertex of which to find the closest other vertex. |

<a name="SmilesDrawer+getBranch"></a>

### smilesDrawer.getBranch(vertexId, previousId) ⇒ <code>object</code>
Returns the rings and vertices contained in a sub-graph.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>object</code> - An object containing two arrays, one with the vertices in the subgraph and one with the rings in the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | The vertex id to start the sub-graph search from |
| previousId | <code>number</code> | The vertex id in the opposite of which the search will be started. |

<a name="SmilesDrawer+addVertex"></a>

### smilesDrawer.addVertex(vertex) ⇒ <code>number</code>
Add a vertex to this representation of a molcule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The vertex id of the new vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | A new vertex. |

<a name="SmilesDrawer+addEdge"></a>

### smilesDrawer.addEdge(edge) ⇒ <code>number</code>
Add an edge to this representation of a molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The edge id of the new edge.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | A new edge. |

<a name="SmilesDrawer+addRing"></a>

### smilesDrawer.addRing(ring) ⇒ <code>number</code>
Add a ring to this representation of a molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The ring id of the new ring.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> | A new ring. |

<a name="SmilesDrawer+removeRing"></a>

### smilesDrawer.removeRing(ringId)
Removes a ring from the array of rings associated with the current molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer+getRing"></a>

### smilesDrawer.getRing(ringId) ⇒ <code>[Ring](#Ring)</code>
Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Ring](#Ring)</code> - A ring associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer+addRingConnection"></a>

### smilesDrawer.addRingConnection(ringConnection) ⇒ <code>number</code>
Add a ring connection to this representation of a molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The ring connection id of the new ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnection | <code>[RingConnection](#RingConnection)</code> | A new ringConnection. |

<a name="SmilesDrawer+removeRingConnection"></a>

### smilesDrawer.removeRingConnection(ringConnectionId)
Removes a ring connection from the array of rings connections associated with the current molecule.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringConnectionId | <code>number</code> | A ring connection id. |

<a name="SmilesDrawer+removeRingConnectionsBetween"></a>

### smilesDrawer.removeRingConnectionsBetween(vertexIdA, vertexIdB)
Removes all ring connections between two vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer+getRingConnections"></a>

### smilesDrawer.getRingConnections(ringId, ringIds) ⇒ <code>array</code>
Get the ring connections associated with a ring, the ring connections between two rings or the ring connections between one ring and multiple other rings.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array of ring connection ids.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ringId | <code>number</code> |  | A ring id. |
| ringIds | <code>number</code> &#124; <code>array</code> &#124; <code>null</code> | <code></code> | A ring id, an array of ring ids or null. |

<a name="SmilesDrawer+isRingConnection"></a>

### smilesDrawer.isRingConnection(vertexIdA, vertexIdB) ⇒ <code>boolean</code>
Check whether or not the two vertices specified span a bond which is a ring connection (fused rings).

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - Returns a boolean indicating whether or not the two vertices specify a ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer+getOverlapScore"></a>

### smilesDrawer.getOverlapScore() ⇒ <code>object</code>
Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>object</code> - Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }  
<a name="SmilesDrawer+chooseSide"></a>

### smilesDrawer.chooseSide(vertexA, vertexB, sides) ⇒ <code>object</code>
When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>object</code> - Returns an object containing the following information: {
            totalSideCount: Counts the sides of each vertex in the molecule, is an array [ a, b ],
            totalPosition: Same as position, but based on entire molecule,
            sideCount: Counts the sides of each neighbour, is an array [ a, b ],
            position: which side to position the second bond, is 0 or 1, represents the index in the normal array. This is based on only the neighbours
            anCount: the number of neighbours of vertexA,
            bnCount: the number of neighbours of vertexB
        }  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |
| sides | <code>array</code> | An array containing the two normals of the line spanned by the two provided vertices. |

<a name="SmilesDrawer+areConnected"></a>

### smilesDrawer.areConnected(vertexIdA, vertexIdA) ⇒ <code>boolean</code>
Checks whether or not two vertices are connected.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not two vertices are connected.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdA | <code>number</code> | A vertex id. |

<a name="SmilesDrawer+getEdgeWeight"></a>

### smilesDrawer.getEdgeWeight(vertexIdA, vertexIdB) ⇒ <code>number</code> &#124; <code>null</code>
Returns the weight of the edge between two given vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - The weight of the edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer+getEdge"></a>

### smilesDrawer.getEdge(vertexIdA, vertexIdB) ⇒ <code>number</code> &#124; <code>null</code>
Returns the edge between two given vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - The edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer+forceLayout"></a>

### smilesDrawer.forceLayout(vertices, center, startVertexId, ring)
Applies a force-based layout to a set of provided vertices.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array containing vertices to be placed using the force based layout. |
| center | <code>[Vector2](#Vector2)</code> | The center of the layout. |
| startVertexId | <code>number</code> | A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex. |
| ring | <code>[Ring](#Ring)</code> | The bridged ring associated with this force-based layout. |

<a name="SmilesDrawer+getSubringCenter"></a>

### smilesDrawer.getSubringCenter(ring, vertex) ⇒ <code>[Vector2](#Vector2)</code>
Gets the center of a ring contained within a bridged ring and containing a given vertex.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The center of the subring that contains the provided vertex.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> | A bridged ring. |
| vertex | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+drawEdges"></a>

### smilesDrawer.drawEdges(debug)
Draw the actual edges as bonds to the canvas.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | A boolean indicating whether or not to draw debug helpers. |

<a name="SmilesDrawer+drawVertices"></a>

### smilesDrawer.drawVertices(debug)
Draws the vertices representing atoms to the canvas.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | A boolean indicating whether or not to draw debug messages to the canvas. |

<a name="SmilesDrawer+position"></a>

### smilesDrawer.position()
Position the vertices according to their bonds and properties.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer+clearPositions"></a>

### smilesDrawer.clearPositions()
Reset the positions of rings and vertices. The previous positions will be backed up.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer+restorePositions"></a>

### smilesDrawer.restorePositions()
Restore the positions backed up during the last clearPositions() call.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer+backupRingInformation"></a>

### smilesDrawer.backupRingInformation()
Stores the current information associated with rings.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer+restoreRingInformation"></a>

### smilesDrawer.restoreRingInformation()
Restores the most recently backed up information associated with rings.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer+createRing"></a>

### smilesDrawer.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])
Creates a new ring, that is, positiones all the vertices inside a ring.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> |  | The ring to position. |
| [center] | <code>[Vector2](#Vector2)</code> &#124; <code>null</code> | <code></code> | The center of the ring to be created. |
| [startVertex] | <code>[Vertex](#Vertex)</code> &#124; <code>null</code> | <code></code> | The first vertex to be positioned inside the ring. |
| [previousVertex] | <code>[Vertex](#Vertex)</code> &#124; <code>null</code> | <code></code> | The last vertex that was positioned. |
| [previousVertex] | <code>boolean</code> | <code>false</code> | A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it. |

<a name="SmilesDrawer+rotateSubtree"></a>

### smilesDrawer.rotateSubtree(vertexId, parentVertexId, angle, center)
Rotate an entire subtree by an angle around a center.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>number</code> | A vertex id in the previous direction of the subtree that is to rotate. |
| angle | <code>number</code> | An angle in randians. |
| center | <code>[Vector2](#Vector2)</code> | The rotational center. |

<a name="SmilesDrawer+getSubtreeOverlapScore"></a>

### smilesDrawer.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) ⇒ <code>number</code>
Gets the overlap score of a subtree.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The overlap score of the subtree.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>number</code> | A vertex id in the previous direction of the subtree. |
| vertexOverlapScores | <code>Array</code> | An array containing the vertex overlap scores indexed by vertex id. |

<a name="SmilesDrawer+getCurrentCenterOfMass"></a>

### smilesDrawer.getCurrentCenterOfMass() ⇒ <code>[Vector2](#Vector2)</code>
Returns the current (positioned vertices so far) center of mass.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The current center of mass.  
<a name="SmilesDrawer+getCurrentCenterOfMassInNeigbourhood"></a>

### smilesDrawer.getCurrentCenterOfMassInNeigbourhood(vec, [r]) ⇒ <code>[Vector2](#Vector2)</code>
Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The current center of mass.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> |  | The point at which to look for neighbours. |
| [r] | <code>number</code> | <code>currentBondLength*2.0</code> | The radius of vertices to include. |

<a name="SmilesDrawer+resolvePrimaryOverlaps"></a>

### smilesDrawer.resolvePrimaryOverlaps()
Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer+resolveSecondaryOverlaps"></a>

### smilesDrawer.resolveSecondaryOverlaps(scores)
Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scores | <code>array</code> | An array of objects sorted descending by score. An object is in the form of { id: 0, score: 22 }. |

<a name="SmilesDrawer+createNextBond"></a>

### smilesDrawer.createNextBond(vertex, previousVertex, ringOrAngle, dir)
Positiones the next vertex thus creating a bond.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | A vertex. |
| previousVertex | <code>[Vertex](#Vertex)</code> | The previous vertex which has been positioned. |
| ringOrAngle | <code>ring</code> &#124; <code>number</code> | Either a ring or a number. If the vertex is connected to a ring, it is positioned based on the ring center and thus the ring is supplied. If the vertex is not in a ring, an angle (in radians) is supplied. |
| dir | <code>number</code> | Either 1 or -1 to break ties (if no angle can be elucidated. |

<a name="SmilesDrawer+getCommonRingbondNeighbour"></a>

### smilesDrawer.getCommonRingbondNeighbour(vertex) ⇒ <code>number</code> &#124; <code>null</code>
Gets the vetex sharing the edge that is the common bond of two rings.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+isPointInRing"></a>

### smilesDrawer.isPointInRing(vec) ⇒ <code>boolean</code>
Check if a vector is inside any ring.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="SmilesDrawer+isEdgeInRing"></a>

### smilesDrawer.isEdgeInRing(edge) ⇒ <code>boolean</code>
Check whether or not an edge is part of a ring.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the edge is part of a ring.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | An edge. |

<a name="SmilesDrawer+isEdgeRotatable"></a>

### smilesDrawer.isEdgeRotatable(edge) ⇒ <code>boolean</code>
Check whether or not an edge is rotatable.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the edge is rotatable.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | An edge. |

<a name="SmilesDrawer+isRingAromatic"></a>

### smilesDrawer.isRingAromatic(ring) ⇒ <code>boolean</code>
Check whether or not a ring is an explicity defined aromatic ring (lower case smiles).

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not a ring is explicitly defined as aromatic.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> | A ring. |

<a name="SmilesDrawer+isEdgeInAromaticRing"></a>

### smilesDrawer.isEdgeInAromaticRing(edge) ⇒ <code>boolean</code>
Checks whether or not an edge is part of an explicit aromatic ring (lower case smiles).

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the vertex is part of an explicit aromatic ring.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | An edge. |

<a name="SmilesDrawer+isVertexInAromaticRing"></a>

### smilesDrawer.isVertexInAromaticRing(vertexId) ⇒ <code>boolean</code>
Checks whether or not a vertex is part of an explicit aromatic ring (lower case smiles).

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the vertex is part of an explicit aromatic ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |

<a name="SmilesDrawer+getEdgeNormals"></a>

### smilesDrawer.getEdgeNormals(edge) ⇒ <code>array</code>
Get the normals of an edge.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array containing two vectors, representing the normals.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | An edge. |

<a name="SmilesDrawer+getTreeDepth"></a>

### smilesDrawer.getTreeDepth(vertexId, parentVertexId) ⇒ <code>number</code>
Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The depth of the sub-tree.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |
| parentVertexId | <code>number</code> | The id of a neighbouring vertex. |

<a name="SmilesDrawer+traverseTree"></a>

### smilesDrawer.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst])
Traverse a sub-tree in the graph.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vertexId | <code>number</code> |  | A vertex id. |
| parentVertexId | <code>number</code> |  | A neighbouring vertex. |
| callback | <code>function</code> |  | The callback function that is called with each visited as an argument. |
| [maxDepth] | <code>number</code> | <code></code> | The maximum depth of the recursion. If null, there is no limit. |
| [ignoreFirst] | <code>boolean</code> | <code>false</code> | Whether or not to ignore the starting vertex supplied as vertexId in the callback. |

<a name="SmilesDrawer+getBondCount"></a>

### smilesDrawer.getBondCount(vertex) ⇒ <code>number</code>
Gets the number of bonds of a vertex.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>number</code> - The number of bonds the vertex participates in.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="SmilesDrawer+getNonRingNeighbours"></a>

### smilesDrawer.getNonRingNeighbours(vertexId) ⇒ <code>array</code>
Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>array</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |

<a name="SmilesDrawer+initPseudoElements"></a>

### smilesDrawer.initPseudoElements()
Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon setsthe involved atoms not to be displayed.

**Kind**: instance method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer.clean"></a>

### SmilesDrawer.clean(smiles) ⇒ <code>string</code>
Cleans a SMILES string (removes non-valid characters)

**Kind**: static method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>string</code> - The clean SMILES string.  

| Param | Type | Description |
| --- | --- | --- |
| smiles | <code>string</code> | A SMILES string. |

<a name="SmilesDrawer.apply"></a>

### SmilesDrawer.apply(options, [themeName])
Applies the smiles drawer draw function to each canvas element that has a smiles string in the data-smiles attribute.

**Kind**: static method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>objects</code> |  | SmilesDrawer options. |
| [themeName] | <code>string</code> | <code>&quot;&#x27;light&#x27;&quot;</code> | The theme to apply. |

<a name="SmilesDrawer.parse"></a>

### SmilesDrawer.parse(smiles, successCallback, errorCallback)
Parses the entered smiles string.

**Kind**: static method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| smiles | <code>string</code> | A SMILES string. |
| successCallback | <code>function</code> | A callback that is called on success with the parse tree. |
| errorCallback | <code>function</code> | A callback that is called with the error object on error. |

<a name="Vector2"></a>

## Vector2
A class representing a 2D vector.

**Kind**: global class  

* [Vector2](#Vector2)
    * [new Vector2(x, y)](#new_Vector2_new)
    * _instance_
        * [.set([x], [y])](#Vector2+set) ⇒ <code>[Vector2](#Vector2)</code>
        * [.clone()](#Vector2+clone) ⇒ <code>[Vector2](#Vector2)</code>
        * [.toString()](#Vector2+toString) ⇒ <code>string</code>
        * [.add(vec)](#Vector2+add) ⇒ <code>[Vector2](#Vector2)</code>
        * [.subtract(vec)](#Vector2+subtract) ⇒ <code>[Vector2](#Vector2)</code>
        * [.divide(scalar)](#Vector2+divide) ⇒ <code>[Vector2](#Vector2)</code>
        * [.multiply(scalar)](#Vector2+multiply) ⇒ <code>[Vector2](#Vector2)</code>
        * [.invert()](#Vector2+invert) ⇒ <code>[Vector2](#Vector2)</code>
        * [.angle()](#Vector2+angle) ⇒ <code>number</code>
        * [.distance(vec)](#Vector2+distance) ⇒ <code>number</code>
        * [.distanceSq(vec)](#Vector2+distanceSq) ⇒ <code>number</code>
        * [.clockwise(vec)](#Vector2+clockwise) ⇒ <code>number</code>
        * [.rotate(angle)](#Vector2+rotate) ⇒ <code>[Vector2](#Vector2)</code>
        * [.rotateAround(angle, vec)](#Vector2+rotateAround) ⇒ <code>[Vector2](#Vector2)</code>
        * [.rotateTo(vec, center, [offsetAngle])](#Vector2+rotateTo) ⇒ <code>[Vector2](#Vector2)</code>
        * [.rotateAwayFrom(vec, center, angle)](#Vector2+rotateAwayFrom)
        * [.getRotateAwayFromAngle(vec, center, angle)](#Vector2+getRotateAwayFromAngle) ⇒ <code>number</code>
        * [.getRotateTowardsAngle(vec, center, angle)](#Vector2+getRotateTowardsAngle) ⇒ <code>number</code>
        * [.getRotateToAngle(vec, center)](#Vector2+getRotateToAngle) ⇒ <code>number</code>
        * [.isInPolygon(polygon)](#Vector2+isInPolygon) ⇒ <code>boolean</code>
        * [.length()](#Vector2+length) ⇒ <code>number</code>
        * [.normalize()](#Vector2+normalize) ⇒ <code>[Vector2](#Vector2)</code>
        * [.normalized()](#Vector2+normalized) ⇒ <code>[Vector2](#Vector2)</code>
        * [.whichSide(vecA, vecB)](#Vector2+whichSide) ⇒ <code>number</code>
        * [.sameSideAs(vecA, vecB, vecC)](#Vector2+sameSideAs) ⇒ <code>boolean</code>
    * _static_
        * [.add(vecA, vecB)](#Vector2.add) ⇒ <code>[Vector2](#Vector2)</code>
        * [.subtract(vecA, vecB)](#Vector2.subtract) ⇒ <code>[Vector2](#Vector2)</code>
        * [.multiply(vecA, vecB)](#Vector2.multiply) ⇒ <code>[Vector2](#Vector2)</code>
        * [.multiplyScalar(vec, scalar)](#Vector2.multiplyScalar) ⇒ <code>[Vector2](#Vector2)</code>
        * [.midpoint(vecA, vecB)](#Vector2.midpoint) ⇒ <code>[Vector2](#Vector2)</code>
        * [.normals(vecA, vecB)](#Vector2.normals) ⇒ <code>array</code>
        * [.divide(vecA, vecB)](#Vector2.divide) ⇒ <code>[Vector2](#Vector2)</code>
        * [.dot(vecA, vecB)](#Vector2.dot) ⇒ <code>number</code>
        * [.angle(vecA, vecB)](#Vector2.angle) ⇒ <code>number</code>
        * [.threePointangle(vecA, vecB, vecC)](#Vector2.threePointangle) ⇒ <code>number</code>
        * [.scalarProjection(vecA, vecB)](#Vector2.scalarProjection) ⇒ <code>number</code>

<a name="new_Vector2_new"></a>

### new Vector2(x, y)
The constructor of the class Vector2.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The initial x coordinate value. |
| y | <code>number</code> | The initial y coordinate value. |

<a name="Vector2+set"></a>

### vector2.set([x], [y]) ⇒ <code>[Vector2](#Vector2)</code>
Sets the values of the x and y coordinates of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

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

### vector2.add(vec) ⇒ <code>[Vector2](#Vector2)</code>
Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+subtract"></a>

### vector2.subtract(vec) ⇒ <code>[Vector2](#Vector2)</code>
Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+divide"></a>

### vector2.divide(scalar) ⇒ <code>[Vector2](#Vector2)</code>
Divide the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar. |

<a name="Vector2+multiply"></a>

### vector2.multiply(scalar) ⇒ <code>[Vector2](#Vector2)</code>
Multiply the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar. |

<a name="Vector2+invert"></a>

### vector2.invert() ⇒ <code>[Vector2](#Vector2)</code>
Inverts this vector. Same as multiply(-1.0).

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  
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

### vector2.rotate(angle) ⇒ <code>[Vector2](#Vector2)</code>
Rotates this vector by a given number of radians around the origin of the coordinate system.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle in radians to rotate the vector. |

<a name="Vector2+rotateAround"></a>

### vector2.rotateAround(angle, vec) ⇒ <code>[Vector2](#Vector2)</code>
Rotates this vector around another vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle in radians to rotate the vector. |
| vec | <code>[Vector2](#Vector2)</code> | The vector which is used as the rotational center. |

<a name="Vector2+rotateTo"></a>

### vector2.rotateTo(vec, center, [offsetAngle]) ⇒ <code>[Vector2](#Vector2)</code>
Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> |  | The vector to rotate this vector to. |
| center | <code>[Vector2](#Vector2)</code> |  | The rotational center. |
| [offsetAngle] | <code>number</code> | <code>0.0</code> | An additional amount of radians to rotate the vector. |

<a name="Vector2+rotateAwayFrom"></a>

### vector2.rotateAwayFrom(vec, center, angle)
Rotates the vector away from a specified vector around a center.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | The vector this one is rotated away from. |
| center | <code>[Vector2](#Vector2)</code> | The rotational center. |
| angle | <code>number</code> | The angle by which to rotate. |

<a name="Vector2+getRotateAwayFromAngle"></a>

### vector2.getRotateAwayFromAngle(vec, center, angle) ⇒ <code>number</code>
Returns the angle in radians used to rotate this vector away from a given vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | The vector this one is rotated away from. |
| center | <code>[Vector2](#Vector2)</code> | The rotational center. |
| angle | <code>number</code> | The angle by which to rotate. |

<a name="Vector2+getRotateTowardsAngle"></a>

### vector2.getRotateTowardsAngle(vec, center, angle) ⇒ <code>number</code>
Returns the angle in radians used to rotate this vector towards a given vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | The vector this one is rotated towards to. |
| center | <code>[Vector2](#Vector2)</code> | The rotational center. |
| angle | <code>number</code> | The angle by which to rotate. |

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

### vector2.normalize() ⇒ <code>[Vector2](#Vector2)</code>
Normalizes this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  
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

<a name="Vector2.multiplyScalar"></a>

### Vector2.multiplyScalar(vec, scalar) ⇒ <code>[Vector2](#Vector2)</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | A factor. |
| scalar | <code>number</code> | A scalar factor. |

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

<a name="Vector2.threePointangle"></a>

### Vector2.threePointangle(vecA, vecB, vecC) ⇒ <code>number</code>
Returns the angle between two vectors based on a third vector in between.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector. |
| vecC | <code>[Vector2](#Vector2)</code> | A vector. |

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
    * [.setPosition(x, y)](#Vertex+setPosition)
    * [.setPositionFromVector(v)](#Vertex+setPositionFromVector)
    * [.addChild(vertexID)](#Vertex+addChild)
    * [.setParentVertexId(parentVertexId)](#Vertex+setParentVertexId)
    * [.isTerminal()](#Vertex+isTerminal) ⇒ <code>boolean</code>
    * [.clone()](#Vertex+clone) ⇒ <code>[Vertex](#Vertex)</code>
    * [.equals(vertex)](#Vertex+equals) ⇒ <code>boolean</code>
    * [.getAngle([referenceVector], [returnAsDegrees])](#Vertex+getAngle) ⇒ <code>number</code>
    * [.getTextDirection(vertices)](#Vertex+getTextDirection) ⇒ <code>string</code>
    * [.getNeighbours([vertexId])](#Vertex+getNeighbours) ⇒ <code>array</code>
    * [.getDrawnNeighbours(vertices)](#Vertex+getDrawnNeighbours) ⇒ <code>array</code>
    * [.getNeighbourCount()](#Vertex+getNeighbourCount) ⇒ <code>number</code>
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

<a name="Vertex+setPosition"></a>

### vertex.setPosition(x, y)
Set the 2D coordinates of the vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x component of the coordinates. |
| y | <code>number</code> | The y component of the coordinates. |

<a name="Vertex+setPositionFromVector"></a>

### vertex.setPositionFromVector(v)
Set the 2D coordinates of the vertex from a Vector2.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>[Vector2](#Vector2)</code> | A 2D vector. |

<a name="Vertex+addChild"></a>

### vertex.addChild(vertexID)
Add a child vertex id to this vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexID | <code>number</code> | The id of a vertex to be added as a child to this vertex. |

<a name="Vertex+setParentVertexId"></a>

### vertex.setParentVertexId(parentVertexId)
Set the vertex id of the parent.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| parentVertexId | <code>number</code> | The parents vertex id. |

<a name="Vertex+isTerminal"></a>

### vertex.isTerminal() ⇒ <code>boolean</code>
Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.

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

<a name="Vertex+getDrawnNeighbours"></a>

### vertex.getDrawnNeighbours(vertices) ⇒ <code>array</code>
Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>array</code> - An array containing the ids of neighbouring vertices that will be drawn.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array containing the vertices associated with the current molecule. |

<a name="Vertex+getNeighbourCount"></a>

### vertex.getNeighbourCount() ⇒ <code>number</code>
Returns the number of neighbours of this vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>number</code> - The number of neighbours.  
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
