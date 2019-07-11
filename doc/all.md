[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

## Classes

<dl>
<dt><a href="#ArrayHelper">ArrayHelper</a></dt>
<dd><p>A static class containing helper functions for array-related tasks.</p>
</dd>
<dt><a href="#Atom">Atom</a></dt>
<dd><p>A class representing an atom.</p>
</dd>
<dt><a href="#CanvasWrapper">CanvasWrapper</a></dt>
<dd><p>A class wrapping a canvas element.</p>
</dd>
<dt><a href="#Drawer">Drawer</a></dt>
<dd><p>The main class of the application representing the smiles drawer</p>
</dd>
<dt><a href="#Edge">Edge</a></dt>
<dd><p>A class representing an edge.</p>
</dd>
<dt><a href="#Graph">Graph</a></dt>
<dd><p>A class representing the molecular graph.</p>
</dd>
<dt><a href="#Line">Line</a></dt>
<dd><p>A class representing a line.</p>
</dd>
<dt><a href="#MathHelper">MathHelper</a></dt>
<dd><p>A static class containing helper functions for math-related tasks.</p>
</dd>
<dt><a href="#Ring">Ring</a></dt>
<dd><p>A class representing a ring.</p>
</dd>
<dt><a href="#RingConnection">RingConnection</a></dt>
<dd><p>A class representing a ring connection.</p>
</dd>
<dt><a href="#SSSR">SSSR</a></dt>
<dd><p>A class encapsulating the functionality to find the smallest set of smallest rings in a graph.</p>
</dd>
<dt><a href="#Vector2">Vector2</a></dt>
<dd><p>A class representing a 2D vector.</p>
</dd>
<dt><a href="#Vertex">Vertex</a></dt>
<dd><p>A class representing a vertex.</p>
</dd>
</dl>

<a name="ArrayHelper"></a>

## ArrayHelper
A static class containing helper functions for array-related tasks.

**Kind**: global class  

* [ArrayHelper](#ArrayHelper)
    * [.clone(arr)](#ArrayHelper.clone) ⇒ <code>\*</code>
    * [.equals(arrA, arrB)](#ArrayHelper.equals) ⇒ <code>Boolean</code>
    * [.print(arr)](#ArrayHelper.print) ⇒ <code>String</code>
    * [.each(arr, callback)](#ArrayHelper.each)
    * [.get(arr, property, value)](#ArrayHelper.get) ⇒ <code>\*</code>
    * [.contains(arr, options)](#ArrayHelper.contains) ⇒ <code>Boolean</code>
    * [.intersection(arrA, arrB)](#ArrayHelper.intersection) ⇒ <code>Array</code>
    * [.unique(arr)](#ArrayHelper.unique) ⇒ <code>Array</code>
    * [.count(arr, value)](#ArrayHelper.count) ⇒ <code>Number</code>
    * [.toggle(arr, value)](#ArrayHelper.toggle) ⇒ <code>Array</code>
    * [.remove(arr, value)](#ArrayHelper.remove) ⇒ <code>Array</code>
    * [.removeUnique(arr, value)](#ArrayHelper.removeUnique) ⇒ <code>Array</code>
    * [.removeAll(arrA, arrB)](#ArrayHelper.removeAll) ⇒ <code>Array</code>
    * [.merge(arrA, arrB)](#ArrayHelper.merge) ⇒ <code>Array</code>
    * [.containsAll(arrA, arrB)](#ArrayHelper.containsAll) ⇒ <code>Boolean</code>
    * [.sortByAtomicNumberDesc(arr)](#ArrayHelper.sortByAtomicNumberDesc) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code>
    * [.deepCopy(arr)](#ArrayHelper.deepCopy) ⇒ <code>Array</code>

<a name="ArrayHelper.clone"></a>

### ArrayHelper.clone(arr) ⇒ <code>\*</code>
Clone an array or an object. If an object is passed, a shallow clone will be created.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>\*</code> - A clone of the array or object.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>\*</code> | The array or object to be cloned. |

<a name="ArrayHelper.equals"></a>

### ArrayHelper.equals(arrA, arrB) ⇒ <code>Boolean</code>
Returns a boolean indicating whether or not the two arrays contain the same elements.Only supports 1d, non-nested arrays.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two arrays contain the same elements.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="ArrayHelper.print"></a>

### ArrayHelper.print(arr) ⇒ <code>String</code>
Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>String</code> - A string representation of the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code> | An array. |
| arr[].id | <code>\*</code> | If the array contains an object with the property 'id', the properties value is printed. Else, the array elements value is printend. |

<a name="ArrayHelper.each"></a>

### ArrayHelper.each(arr, callback)
Run a function for each element in the array. The element is supplied as an argument for the callback function

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| callback | <code>function</code> | The callback function that is called for each element. |

<a name="ArrayHelper.get"></a>

### ArrayHelper.get(arr, property, value) ⇒ <code>\*</code>
Return the array element from an array containing objects, where a property of the object is set to a given value.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>\*</code> - The array element matching the value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| property | <code>String</code> &#124; <code>Number</code> | A property contained within an object in the array. |
| value | <code>String</code> &#124; <code>Number</code> | The value of the property. |

<a name="ArrayHelper.contains"></a>

### ArrayHelper.contains(arr, options) ⇒ <code>Boolean</code>
Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Boolean</code> - A boolean whether or not the array contains a value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| options | <code>Object</code> | See method description. |
| options.value | <code>\*</code> | The value for which to check. |
| [options.property] | <code>String</code> | The property on which to check. |
| [options.func] | <code>function</code> | A custom property function. |

<a name="ArrayHelper.intersection"></a>

### ArrayHelper.intersection(arrA, arrB) ⇒ <code>Array</code>
Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Array</code> - The intersecting vlaues.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="ArrayHelper.unique"></a>

### ArrayHelper.unique(arr) ⇒ <code>Array</code>
Returns an array of unique elements contained in an array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Array</code> - An array of unique elements contained within the array supplied as an argument.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |

<a name="ArrayHelper.count"></a>

### ArrayHelper.count(arr, value) ⇒ <code>Number</code>
Count the number of occurences of a value in an array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Number</code> - The number of occurences of a value in the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be counted. |

<a name="ArrayHelper.toggle"></a>

### ArrayHelper.toggle(arr, value) ⇒ <code>Array</code>
Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Array</code> - The toggled array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be toggled. |

<a name="ArrayHelper.remove"></a>

### ArrayHelper.remove(arr, value) ⇒ <code>Array</code>
Remove a value from an array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Array</code> - A new array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="ArrayHelper.removeUnique"></a>

### ArrayHelper.removeUnique(arr, value) ⇒ <code>Array</code>
Remove a value from an array with unique values.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Array</code> - An array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="ArrayHelper.removeAll"></a>

### ArrayHelper.removeAll(arrA, arrB) ⇒ <code>Array</code>
Remove all elements contained in one array from another array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Array</code> - The filtered array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | The array to be filtered. |
| arrB | <code>Array</code> | The array containing elements that will be removed from the other array. |

<a name="ArrayHelper.merge"></a>

### ArrayHelper.merge(arrA, arrB) ⇒ <code>Array</code>
Merges two arrays and returns the result. The first array will be appended to the second array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Array</code> - The merged array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="ArrayHelper.containsAll"></a>

### ArrayHelper.containsAll(arrA, arrB) ⇒ <code>Boolean</code>
Checks whether or not an array contains all the elements of another array, without regard to the order.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not both array contain the same elements.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="ArrayHelper.sortByAtomicNumberDesc"></a>

### ArrayHelper.sortByAtomicNumberDesc(arr) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code>
Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code> - The array sorted by atomic number. Example of an array entry: { atomicNumber: 2, vertexId: 5 }.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code> | An array of vertex ids with their associated atomic numbers. |
| arr[].vertexId | <code>Number</code> | A vertex id. |
| arr[].atomicNumber | <code>String</code> | The atomic number associated with the vertex id. |

<a name="ArrayHelper.deepCopy"></a>

### ArrayHelper.deepCopy(arr) ⇒ <code>Array</code>
Copies a an n-dimensional array.

**Kind**: static method of <code>[ArrayHelper](#ArrayHelper)</code>  
**Returns**: <code>Array</code> - The copy.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array to be copied. |

<a name="Atom"></a>

## Atom
A class representing an atom.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| element | <code>String</code> | The element symbol of this atom. Single-letter symbols are always uppercase. Examples: H, C, F, Br, Si, ... |
| drawExplicit | <code>Boolean</code> | A boolean indicating whether or not this atom is drawn explicitly (for example, a carbon atom). This overrides the default behaviour. |
| ringbonds | <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code> | An array containing the ringbond ids and bond types as specified in the original SMILE. |
| branchBond | <code>String</code> | The branch bond as defined in the SMILES. |
| ringbonds[].id | <code>Number</code> | The ringbond id as defined in the SMILES. |
| ringbonds[].bondType | <code>String</code> | The bond type of the ringbond as defined in the SMILES. |
| rings | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | The ids of rings which contain this atom. |
| bondType | <code>String</code> | The bond type associated with this array. Examples: -, =, #, ... |
| isBridge | <code>Boolean</code> | A boolean indicating whether or not this atom is part of a bridge in a bridged ring (contained by the largest ring). |
| isBridgeNode | <code>Boolean</code> | A boolean indicating whether or not this atom is a bridge node (a member of the largest ring in a bridged ring which is connected to a bridge-atom). |
| originalRings | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | Used to back up rings when they are replaced by a bridged ring. |
| bridgedRing | <code>Number</code> | The id of the bridged ring if the atom is part of a bridged ring. |
| anchoredRings | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | The ids of the rings that are anchored to this atom. The centers of anchored rings are translated when this atom is translated. |
| bracket | <code>Object</code> | If this atom is defined as a bracket atom in the original SMILES, this object contains all the bracket information. Example: { hcount: {Number}, charge: ['--', '-', '+', '++'], isotope: {Number} }. |
| plane | <code>Number</code> | Specifies on which "plane" the atoms is in stereochemical deptictions (-1 back, 0 middle, 1 front). |
| attachedPseudoElements | <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code> | A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count. |
| attachedPseudoElement[].element | <code>String</code> | The element symbol. |
| attachedPseudoElement[].count | <code>Number</code> | The number of occurences that match the key. |
| attachedPseudoElement[].hyrogenCount | <code>Number</code> | The number of hydrogens attached to each atom matching the key. |
| hasAttachedPseudoElements | <code>Boolean</code> | A boolean indicating whether or not this attom will be drawn with an attached pseudo element or concatinated elements. |
| isDrawn | <code>Boolean</code> | A boolean indicating whether or not this atom is drawn. In contrast to drawExplicit, the bond is drawn neither. |
| isConnectedToRing | <code>Boolean</code> | A boolean indicating whether or not this atom is directly connected (but not a member of) a ring. |
| neighbouringElements | <code>[ &#x27;Array&#x27; ].&lt;String&gt;</code> | An array containing the element symbols of neighbouring atoms. |
| isPartOfAromaticRing | <code>Boolean</code> | A boolean indicating whether or not this atom is part of an explicitly defined aromatic ring. Example: c1ccccc1. |
| bondCount | <code>Number</code> | The number of bonds in which this atom is participating. |
| chirality | <code>String</code> | The chirality of this atom if it is a stereocenter (R or S). |
| priority | <code>Number</code> | The priority of this atom acording to the CIP rules, where 0 is the highest priority. |
| mainChain | <code>Boolean</code> | A boolean indicating whether or not this atom is part of the main chain (used for chirality). |
| hydrogenDirection | <code>String</code> | The direction of the hydrogen, either up or down. Only for stereocenters with and explicit hydrogen. |
| subtreeDepth | <code>Number</code> | The depth of the subtree coming from a stereocenter. |


* [Atom](#Atom)
    * [new Atom(element, [bondType])](#new_Atom_new)
    * _instance_
        * [.addNeighbouringElement(element)](#Atom+addNeighbouringElement)
        * [.attachPseudoElement(element, previousElement, [hydrogenCount], [charge])](#Atom+attachPseudoElement)
        * [.getAttachedPseudoElements()](#Atom+getAttachedPseudoElements) ⇒ <code>Object</code>
        * [.getAttachedPseudoElementsCount()](#Atom+getAttachedPseudoElementsCount) ⇒ <code>Number</code>
        * [.isHeteroAtom()](#Atom+isHeteroAtom) ⇒ <code>Boolean</code>
        * [.addAnchoredRing(ringId)](#Atom+addAnchoredRing)
        * [.getRingbondCount()](#Atom+getRingbondCount) ⇒ <code>Number</code>
        * [.backupRings()](#Atom+backupRings)
        * [.restoreRings()](#Atom+restoreRings)
        * [.haveCommonRingbond(atomA, atomB)](#Atom+haveCommonRingbond) ⇒ <code>Boolean</code>
        * [.neighbouringElementsEqual(arr)](#Atom+neighbouringElementsEqual) ⇒ <code>Boolean</code>
        * [.getAtomicNumber()](#Atom+getAtomicNumber) ⇒ <code>Number</code>
        * [.getMaxBonds()](#Atom+getMaxBonds) ⇒ <code>Number</code>
    * _static_
        * [.maxBonds](#Atom.maxBonds)
        * [.atomicNumbers](#Atom.atomicNumbers)
        * [.mass](#Atom.mass)

<a name="new_Atom_new"></a>

### new Atom(element, [bondType])
The constructor of the class Atom.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>String</code> |  | The one-letter code of the element. |
| [bondType] | <code>String</code> | <code>&#x27;-&#x27;</code> | The type of the bond associated with this atom. |

<a name="Atom+addNeighbouringElement"></a>

### atom.addNeighbouringElement(element)
Adds a neighbouring element to this atom.

**Kind**: instance method of <code>[Atom](#Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>String</code> | A string representing an element. |

<a name="Atom+attachPseudoElement"></a>

### atom.attachPseudoElement(element, previousElement, [hydrogenCount], [charge])
Attaches a pseudo element (e.g. Ac) to the atom.

**Kind**: instance method of <code>[Atom](#Atom)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>String</code> |  | The element identifier (e.g. Br, C, ...). |
| previousElement | <code>String</code> |  | The element that is part of the main chain (not the terminals that are converted to the pseudo element or concatinated). |
| [hydrogenCount] | <code>Number</code> | <code>0</code> | The number of hydrogens for the element. |
| [charge] | <code>Number</code> | <code>0</code> | The charge for the element. |

<a name="Atom+getAttachedPseudoElements"></a>

### atom.getAttachedPseudoElements() ⇒ <code>Object</code>
Returns the attached pseudo elements sorted by hydrogen count (ascending).

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>Object</code> - The sorted attached pseudo elements.  
<a name="Atom+getAttachedPseudoElementsCount"></a>

### atom.getAttachedPseudoElementsCount() ⇒ <code>Number</code>
Returns the number of attached pseudo elements.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>Number</code> - The number of attached pseudo elements.  
<a name="Atom+isHeteroAtom"></a>

### atom.isHeteroAtom() ⇒ <code>Boolean</code>
Returns whether this atom is a heteroatom (not C and not H).

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether this atom is a heteroatom.  
<a name="Atom+addAnchoredRing"></a>

### atom.addAnchoredRing(ringId)
Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.

**Kind**: instance method of <code>[Atom](#Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="Atom+getRingbondCount"></a>

### atom.getRingbondCount() ⇒ <code>Number</code>
Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>Number</code> - The number of ringbonds this atom is connected to.  
<a name="Atom+backupRings"></a>

### atom.backupRings()
Backs up the current rings.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
<a name="Atom+restoreRings"></a>

### atom.restoreRings()
Restores the most recent backed up rings.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
<a name="Atom+haveCommonRingbond"></a>

### atom.haveCommonRingbond(atomA, atomB) ⇒ <code>Boolean</code>
Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two atoms share a common ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| atomA | <code>[Atom](#Atom)</code> | An atom. |
| atomB | <code>[Atom](#Atom)</code> | An atom. |

<a name="Atom+neighbouringElementsEqual"></a>

### atom.neighbouringElementsEqual(arr) ⇒ <code>Boolean</code>
Check whether or not the neighbouring elements of this atom equal the supplied array.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the neighbours match the supplied array of elements.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>[ &#x27;Array&#x27; ].&lt;String&gt;</code> | An array containing all the elements that are neighbouring this atom. E.g. ['C', 'O', 'O', 'N'] |

<a name="Atom+getAtomicNumber"></a>

### atom.getAtomicNumber() ⇒ <code>Number</code>
Get the atomic number of this atom.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>Number</code> - The atomic number of this atom.  
<a name="Atom+getMaxBonds"></a>

### atom.getMaxBonds() ⇒ <code>Number</code>
Get the maximum number of bonds for this atom.

**Kind**: instance method of <code>[Atom](#Atom)</code>  
**Returns**: <code>Number</code> - The maximum number of bonds of this atom.  
<a name="Atom.maxBonds"></a>

### Atom.maxBonds
A map mapping element symbols to their maximum bonds.

**Kind**: static property of <code>[Atom](#Atom)</code>  
<a name="Atom.atomicNumbers"></a>

### Atom.atomicNumbers
A map mapping element symbols to the atomic number.

**Kind**: static property of <code>[Atom](#Atom)</code>  
<a name="Atom.mass"></a>

### Atom.mass
A map mapping element symbols to the atomic mass.

**Kind**: static property of <code>[Atom](#Atom)</code>  
<a name="CanvasWrapper"></a>

## CanvasWrapper
A class wrapping a canvas element.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| canvas | <code>HTMLElement</code> | The HTML element for the canvas associated with this CanvasWrapper instance. |
| ctx | <code>CanvasRenderingContext2D</code> | The CanvasRenderingContext2D of the canvas associated with this CanvasWrapper instance. |
| colors | <code>Object</code> | The colors object as defined in the SmilesDrawer options. |
| opts | <code>Object</code> | The SmilesDrawer options. |
| drawingWidth | <code>Number</code> | The width of the canvas. |
| drawingHeight | <code>Number</code> | The height of the canvas. |
| offsetX | <code>Number</code> | The horizontal offset required for centering the drawing. |
| offsetY | <code>Number</code> | The vertical offset required for centering the drawing. |
| fontLarge | <code>Number</code> | The large font size in pt. |
| fontSmall | <code>Number</code> | The small font size in pt. |


* [CanvasWrapper](#CanvasWrapper)
    * [new CanvasWrapper(target, theme, options)](#new_CanvasWrapper_new)
    * [.updateSize(width, height)](#CanvasWrapper+updateSize)
    * [.setTheme(theme)](#CanvasWrapper+setTheme)
    * [.scale(vertices)](#CanvasWrapper+scale)
    * [.reset()](#CanvasWrapper+reset)
    * [.getColor(key)](#CanvasWrapper+getColor) ⇒ <code>String</code>
    * [.drawCircle(x, y, radius, color, [fill], [debug], [debugText])](#CanvasWrapper+drawCircle)
    * [.drawLine(line, [dashed], [alpha])](#CanvasWrapper+drawLine)
    * [.drawWedge(line, width)](#CanvasWrapper+drawWedge)
    * [.drawDashedWedge(line)](#CanvasWrapper+drawDashedWedge)
    * [.drawDebugText(x, y, text)](#CanvasWrapper+drawDebugText)
    * [.drawBall(x, y, elementName)](#CanvasWrapper+drawBall)
    * [.drawPoint(x, y, elementName)](#CanvasWrapper+drawPoint)
    * [.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, attachedPseudoElement)](#CanvasWrapper+drawText)
    * [.getChargeText(charge)](#CanvasWrapper+getChargeText) ⇒ <code>String</code>
    * [.drawDebugPoint(x, y, [debugText], [color])](#CanvasWrapper+drawDebugPoint)
    * [.drawAromaticityRing(ring)](#CanvasWrapper+drawAromaticityRing)
    * [.clear()](#CanvasWrapper+clear)

<a name="new_CanvasWrapper_new"></a>

### new CanvasWrapper(target, theme, options)
The constructor for the class CanvasWrapper.


| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> &#124; <code>HTMLElement</code> | The canvas id or the canvas HTMLElement. |
| theme | <code>Object</code> | A theme from the smiles drawer options. |
| options | <code>Object</code> | The smiles drawer options object. |

<a name="CanvasWrapper+updateSize"></a>

### canvasWrapper.updateSize(width, height)
Update the width and height of the canvas

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type |
| --- | --- |
| width | <code>Number</code> | 
| height | <code>Number</code> | 

<a name="CanvasWrapper+setTheme"></a>

### canvasWrapper.setTheme(theme)
Sets a provided theme.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>Object</code> | A theme from the smiles drawer options. |

<a name="CanvasWrapper+scale"></a>

### canvasWrapper.scale(vertices)
Scale the canvas based on vertex positions.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | An array of vertices containing the vertices associated with the current molecule. |

<a name="CanvasWrapper+reset"></a>

### canvasWrapper.reset()
Resets the transform of the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  
<a name="CanvasWrapper+getColor"></a>

### canvasWrapper.getColor(key) ⇒ <code>String</code>
Returns the hex code of a color associated with a key from the current theme.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  
**Returns**: <code>String</code> - A color hex value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The color key in the theme (e.g. C, N, BACKGROUND, ...). |

<a name="CanvasWrapper+drawCircle"></a>

### canvasWrapper.drawCircle(x, y, radius, color, [fill], [debug], [debugText])
Draws a circle to a canvas context.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>Number</code> |  | The x coordinate of the circles center. |
| y | <code>Number</code> |  | The y coordinate of the circles center. |
| radius | <code>Number</code> |  | The radius of the circle |
| color | <code>String</code> |  | A hex encoded color. |
| [fill] | <code>Boolean</code> | <code>true</code> | Whether to fill or stroke the circle. |
| [debug] | <code>Boolean</code> | <code>false</code> | Draw in debug mode. |
| [debugText] | <code>String</code> | <code>&#x27;&#x27;</code> | A debug message. |

<a name="CanvasWrapper+drawLine"></a>

### canvasWrapper.drawLine(line, [dashed], [alpha])
Draw a line to a canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>[Line](#Line)</code> |  | A line. |
| [dashed] | <code>Boolean</code> | <code>false</code> | Whether or not the line is dashed. |
| [alpha] | <code>Number</code> | <code>1.0</code> | The alpha value of the color. |

<a name="CanvasWrapper+drawWedge"></a>

### canvasWrapper.drawWedge(line, width)
Draw a wedge on the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>[Line](#Line)</code> |  | A line. |
| width | <code>Number</code> | <code>1</code> | The wedge width. |

<a name="CanvasWrapper+drawDashedWedge"></a>

### canvasWrapper.drawDashedWedge(line)
Draw a dashed wedge on the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>[Line](#Line)</code> | A line. |

<a name="CanvasWrapper+drawDebugText"></a>

### canvasWrapper.drawDebugText(x, y, text)
Draws a debug text message at a given position

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x coordinate. |
| y | <code>Number</code> | The y coordinate. |
| text | <code>String</code> | The debug text. |

<a name="CanvasWrapper+drawBall"></a>

### canvasWrapper.drawBall(x, y, elementName)
Draw a ball to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x position of the text. |
| y | <code>Number</code> | The y position of the text. |
| elementName | <code>String</code> | The name of the element (single-letter). |

<a name="CanvasWrapper+drawPoint"></a>

### canvasWrapper.drawPoint(x, y, elementName)
Draw a point to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x position of the point. |
| y | <code>Number</code> | The y position of the point. |
| elementName | <code>String</code> | The name of the element (single-letter). |

<a name="CanvasWrapper+drawText"></a>

### canvasWrapper.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, attachedPseudoElement)
Draw a text to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x position of the text. |
| y | <code>Number</code> | The y position of the text. |
| elementName | <code>String</code> | The name of the element (single-letter). |
| hydrogens | <code>Number</code> | The number of hydrogen atoms. |
| direction | <code>String</code> | The direction of the text in relation to the associated vertex. |
| isTerminal | <code>Boolean</code> | A boolean indicating whether or not the vertex is terminal. |
| charge | <code>Number</code> | The charge of the atom. |
| isotope | <code>Number</code> | The isotope number. |
| attachedPseudoElement | <code>Object</code> | A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count. |
| attachedPseudoElement.element | <code>String</code> | The element symbol. |
| attachedPseudoElement.count | <code>Number</code> | The number of occurences that match the key. |
| attachedPseudoElement.hyrogenCount | <code>Number</code> | The number of hydrogens attached to each atom matching the key. |

<a name="CanvasWrapper+getChargeText"></a>

### canvasWrapper.getChargeText(charge) ⇒ <code>String</code>
Translate the integer indicating the charge to the appropriate text.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  
**Returns**: <code>String</code> - A string representing a charge.  

| Param | Type | Description |
| --- | --- | --- |
| charge | <code>Number</code> | The integer indicating the charge. |

<a name="CanvasWrapper+drawDebugPoint"></a>

### canvasWrapper.drawDebugPoint(x, y, [debugText], [color])
Draws a dubug dot at a given coordinate and adds text.

**Kind**: instance method of <code>[CanvasWrapper](#CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>Number</code> |  | The x coordinate. |
| y | <code>Number</code> |  | The y coordindate. |
| [debugText] | <code>String</code> | <code>&#x27;&#x27;</code> | A string. |
| [color] | <code>String</code> | <code>&#x27;#f00&#x27;</code> | A color in hex form. |

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
<a name="Drawer"></a>

## Drawer
The main class of the application representing the smiles drawer

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| graph | <code>[Graph](#Graph)</code> | The graph associated with this SmilesDrawer.Drawer instance. |
| ringIdCounter | <code>Number</code> | An internal counter to keep track of ring ids. |
| ringConnectionIdCounter | <code>Number</code> | An internal counter to keep track of ring connection ids. |
| canvasWrapper | <code>[CanvasWrapper](#CanvasWrapper)</code> | The CanvasWrapper associated with this SmilesDrawer.Drawer instance. |
| totalOverlapScore | <code>Number</code> | The current internal total overlap score. |
| defaultOptions | <code>Object</code> | The default options. |
| opts | <code>Object</code> | The merged options. |
| theme | <code>Object</code> | The current theme. |


* [Drawer](#Drawer)
    * [new Drawer(options)](#new_Drawer_new)
    * [.extend()](#Drawer+extend)
    * [.draw(data, target, themeName, infoOnly)](#Drawer+draw)
    * [.edgeRingCount(edgeId)](#Drawer+edgeRingCount) ⇒ <code>Number</code>
    * [.getBridgedRings()](#Drawer+getBridgedRings) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code>
    * [.getFusedRings()](#Drawer+getFusedRings) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code>
    * [.getSpiros()](#Drawer+getSpiros) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code>
    * [.printRingInfo()](#Drawer+printRingInfo) ⇒ <code>String</code>
    * [.rotateDrawing()](#Drawer+rotateDrawing)
    * [.getTotalOverlapScore()](#Drawer+getTotalOverlapScore) ⇒ <code>Number</code>
    * [.getRingCount()](#Drawer+getRingCount) ⇒ <code>Number</code>
    * [.hasBridgedRing()](#Drawer+hasBridgedRing) ⇒ <code>Boolean</code>
    * [.getHeavyAtomCount()](#Drawer+getHeavyAtomCount) ⇒ <code>Number</code>
    * [.getMolecularFormula()](#Drawer+getMolecularFormula) ⇒ <code>String</code>
    * [.getRingbondType(vertexA, vertexB)](#Drawer+getRingbondType) ⇒ <code>String</code> &#124; <code>null</code>
    * [.initRings()](#Drawer+initRings)
    * [.getBridgedRingRings(ringId)](#Drawer+getBridgedRingRings) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
    * [.isPartOfBridgedRing(ringId)](#Drawer+isPartOfBridgedRing) ⇒ <code>Boolean</code>
    * [.createBridgedRing(ringIds, sourceVertexId)](#Drawer+createBridgedRing) ⇒ <code>[Ring](#Ring)</code>
    * [.areVerticesInSameRing(vertexA, vertexB)](#Drawer+areVerticesInSameRing) ⇒ <code>Boolean</code>
    * [.getCommonRings(vertexA, vertexB)](#Drawer+getCommonRings) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
    * [.getLargestOrAromaticCommonRing(vertexA, vertexB)](#Drawer+getLargestOrAromaticCommonRing) ⇒ <code>[Ring](#Ring)</code> &#124; <code>null</code>
    * [.getVerticesAt(position, radius, excludeVertexId)](#Drawer+getVerticesAt) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
    * [.getClosestVertex(vertex)](#Drawer+getClosestVertex) ⇒ <code>[Vertex](#Vertex)</code>
    * [.addRing(ring)](#Drawer+addRing) ⇒ <code>Number</code>
    * [.removeRing(ringId)](#Drawer+removeRing)
    * [.getRing(ringId)](#Drawer+getRing) ⇒ <code>[Ring](#Ring)</code>
    * [.addRingConnection(ringConnection)](#Drawer+addRingConnection) ⇒ <code>Number</code>
    * [.removeRingConnection(ringConnectionId)](#Drawer+removeRingConnection)
    * [.removeRingConnectionsBetween(vertexIdA, vertexIdB)](#Drawer+removeRingConnectionsBetween)
    * [.getRingConnection(id)](#Drawer+getRingConnection) ⇒ <code>[RingConnection](#RingConnection)</code>
    * [.getRingConnections(ringId, ringIds)](#Drawer+getRingConnections) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
    * [.getOverlapScore()](#Drawer+getOverlapScore) ⇒ <code>Object</code>
    * [.chooseSide(vertexA, vertexB, sides)](#Drawer+chooseSide) ⇒ <code>Object</code>
    * [.setRingCenter(ring)](#Drawer+setRingCenter)
    * [.getSubringCenter(ring, vertex)](#Drawer+getSubringCenter) ⇒ <code>[Vector2](#Vector2)</code>
    * [.drawEdges(debug)](#Drawer+drawEdges)
    * [.drawEdge(edgeId, debug)](#Drawer+drawEdge)
    * [.drawVertices(debug)](#Drawer+drawVertices)
    * [.position()](#Drawer+position)
    * [.backupRingInformation()](#Drawer+backupRingInformation)
    * [.restoreRingInformation()](#Drawer+restoreRingInformation)
    * [.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])](#Drawer+createRing)
    * [.rotateSubtree(vertexId, parentVertexId, angle, center)](#Drawer+rotateSubtree)
    * [.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores)](#Drawer+getSubtreeOverlapScore) ⇒ <code>Object</code>
    * [.getCurrentCenterOfMass()](#Drawer+getCurrentCenterOfMass) ⇒ <code>[Vector2](#Vector2)</code>
    * [.getCurrentCenterOfMassInNeigbourhood(vec, [r])](#Drawer+getCurrentCenterOfMassInNeigbourhood) ⇒ <code>[Vector2](#Vector2)</code>
    * [.resolvePrimaryOverlaps()](#Drawer+resolvePrimaryOverlaps)
    * [.resolveSecondaryOverlaps(scores)](#Drawer+resolveSecondaryOverlaps)
    * [.getLastVertexWithAngle(vertexId)](#Drawer+getLastVertexWithAngle) ⇒ <code>[Vertex](#Vertex)</code>
    * [.createNextBond(vertex, [previousVertex], [angle], [originShortest], [skipPositioning])](#Drawer+createNextBond)
    * [.getCommonRingbondNeighbour(vertex)](#Drawer+getCommonRingbondNeighbour) ⇒ <code>Number</code> &#124; <code>null</code>
    * [.isPointInRing(vec)](#Drawer+isPointInRing) ⇒ <code>Boolean</code>
    * [.isEdgeInRing(edge)](#Drawer+isEdgeInRing) ⇒ <code>Boolean</code>
    * [.isEdgeRotatable(edge)](#Drawer+isEdgeRotatable) ⇒ <code>Boolean</code>
    * [.isRingAromatic(ring)](#Drawer+isRingAromatic) ⇒ <code>Boolean</code>
    * [.getEdgeNormals(edge)](#Drawer+getEdgeNormals) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code>
    * [.getNonRingNeighbours(vertexId)](#Drawer+getNonRingNeighbours) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code>
    * [.annotateStereochemistry()](#Drawer+annotateStereochemistry)
    * [.visitStereochemistry(vertexId, previousVertexId, visited, priority, maxDepth, depth)](#Drawer+visitStereochemistry)
    * [.initPseudoElements()](#Drawer+initPseudoElements)

<a name="new_Drawer_new"></a>

### new Drawer(options)
The constructor for the class SmilesDrawer.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing custom values for different options. It is merged with the default options. |

<a name="Drawer+extend"></a>

### drawer.extend()
A helper method to extend the default options with user supplied ones.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Drawer+draw"></a>

### drawer.draw(data, target, themeName, infoOnly)
Draws the parsed smiles data to a canvas element.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The tree returned by the smiles parser. |
| target | <code>String</code> &#124; <code>HTMLElement</code> |  | The id of the HTML canvas element the structure is drawn to - or the element itself. |
| themeName | <code>String</code> | <code>&#x27;dark&#x27;</code> | The name of the theme to use. Built-in themes are 'light' and 'dark'. |
| infoOnly | <code>Boolean</code> | <code>false</code> | Only output info on the molecule without drawing anything to the canvas. |

<a name="Drawer+edgeRingCount"></a>

### drawer.edgeRingCount(edgeId) ⇒ <code>Number</code>
Returns the number of rings this edge is a part of.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Number</code> - The number of rings the provided edge is part of.  

| Param | Type | Description |
| --- | --- | --- |
| edgeId | <code>Number</code> | The id of an edge. |

<a name="Drawer+getBridgedRings"></a>

### drawer.getBridgedRings() ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code>
Returns an array containing the bridged rings associated with this  molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code> - An array containing all bridged rings associated with this molecule.  
<a name="Drawer+getFusedRings"></a>

### drawer.getFusedRings() ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code>
Returns an array containing all fused rings associated with this molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code> - An array containing all fused rings associated with this molecule.  
<a name="Drawer+getSpiros"></a>

### drawer.getSpiros() ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code>
Returns an array containing all spiros associated with this molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code> - An array containing all spiros associated with this molecule.  
<a name="Drawer+printRingInfo"></a>

### drawer.printRingInfo() ⇒ <code>String</code>
Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings)

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>String</code> - A string as described in the method description.  
<a name="Drawer+rotateDrawing"></a>

### drawer.rotateDrawing()
Rotates the drawing to make the widest dimension horizontal.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Drawer+getTotalOverlapScore"></a>

### drawer.getTotalOverlapScore() ⇒ <code>Number</code>
Returns the total overlap score of the current molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Number</code> - The overlap score.  
<a name="Drawer+getRingCount"></a>

### drawer.getRingCount() ⇒ <code>Number</code>
Returns the ring count of the current molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Number</code> - The ring count.  
<a name="Drawer+hasBridgedRing"></a>

### drawer.hasBridgedRing() ⇒ <code>Boolean</code>
Checks whether or not the current molecule  a bridged ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the current molecule  a bridged ring.  
<a name="Drawer+getHeavyAtomCount"></a>

### drawer.getHeavyAtomCount() ⇒ <code>Number</code>
Returns the number of heavy atoms (non-hydrogen) in the current molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Number</code> - The heavy atom count.  
<a name="Drawer+getMolecularFormula"></a>

### drawer.getMolecularFormula() ⇒ <code>String</code>
Returns the molecular formula of the loaded molecule as a string.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>String</code> - The molecular formula.  
<a name="Drawer+getRingbondType"></a>

### drawer.getRingbondType(vertexA, vertexB) ⇒ <code>String</code> &#124; <code>null</code>
Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>String</code> &#124; <code>null</code> - Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="Drawer+initRings"></a>

### drawer.initRings()
Initializes rings and ringbonds for the current molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Drawer+getBridgedRingRings"></a>

### drawer.getBridgedRingRings(ringId) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array containing all ring ids of rings part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="Drawer+isPartOfBridgedRing"></a>

### drawer.isPartOfBridgedRing(ringId) ⇒ <code>Boolean</code>
Checks whether or not a ring is part of a bridged ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="Drawer+createBridgedRing"></a>

### drawer.createBridgedRing(ringIds, sourceVertexId) ⇒ <code>[Ring](#Ring)</code>
Creates a bridged ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[Ring](#Ring)</code> - The bridged ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringIds | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array of ids of rings involved in the bridged ring. |
| sourceVertexId | <code>Number</code> | The vertex id to start the bridged ring discovery from. |

<a name="Drawer+areVerticesInSameRing"></a>

### drawer.areVerticesInSameRing(vertexA, vertexB) ⇒ <code>Boolean</code>
Checks whether or not two vertices are in the same ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two vertices are in the same ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="Drawer+getCommonRings"></a>

### drawer.getCommonRings(vertexA, vertexB) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns an array of ring ids shared by both vertices.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array of ids of rings shared by the two vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="Drawer+getLargestOrAromaticCommonRing"></a>

### drawer.getLargestOrAromaticCommonRing(vertexA, vertexB) ⇒ <code>[Ring](#Ring)</code> &#124; <code>null</code>
Returns the aromatic or largest ring shared by the two vertices.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[Ring](#Ring)</code> &#124; <code>null</code> - If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="Drawer+getVerticesAt"></a>

### drawer.getVerticesAt(position, radius, excludeVertexId) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns an array of vertices positioned at a specified location.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array containing vertex ids in a given location.  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>[Vector2](#Vector2)</code> | The position to search for vertices. |
| radius | <code>Number</code> | The radius within to search. |
| excludeVertexId | <code>Number</code> | A vertex id to be excluded from the search results. |

<a name="Drawer+getClosestVertex"></a>

### drawer.getClosestVertex(vertex) ⇒ <code>[Vertex](#Vertex)</code>
Returns the closest vertex (connected as well as unconnected).

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[Vertex](#Vertex)</code> - The closest vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | The vertex of which to find the closest other vertex. |

<a name="Drawer+addRing"></a>

### drawer.addRing(ring) ⇒ <code>Number</code>
Add a ring to this representation of a molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Number</code> - The ring id of the new ring.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> | A new ring. |

<a name="Drawer+removeRing"></a>

### drawer.removeRing(ringId)
Removes a ring from the array of rings associated with the current molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="Drawer+getRing"></a>

### drawer.getRing(ringId) ⇒ <code>[Ring](#Ring)</code>
Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[Ring](#Ring)</code> - A ring associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="Drawer+addRingConnection"></a>

### drawer.addRingConnection(ringConnection) ⇒ <code>Number</code>
Add a ring connection to this representation of a molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Number</code> - The ring connection id of the new ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnection | <code>[RingConnection](#RingConnection)</code> | A new ringConnection. |

<a name="Drawer+removeRingConnection"></a>

### drawer.removeRingConnection(ringConnectionId)
Removes a ring connection from the array of rings connections associated with the current molecule.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringConnectionId | <code>Number</code> | A ring connection id. |

<a name="Drawer+removeRingConnectionsBetween"></a>

### drawer.removeRingConnectionsBetween(vertexIdA, vertexIdB)
Removes all ring connections between two vertices.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="Drawer+getRingConnection"></a>

### drawer.getRingConnection(id) ⇒ <code>[RingConnection](#RingConnection)</code>
Get a ring connection with a given id.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[RingConnection](#RingConnection)</code> - The ring connection with the specified id.  

| Param | Type |
| --- | --- |
| id | <code>Number</code> | 

<a name="Drawer+getRingConnections"></a>

### drawer.getRingConnections(ringId, ringIds) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Get the ring connections between a ring and a set of rings.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array of ring connection ids.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |
| ringIds | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array of ring ids. |

<a name="Drawer+getOverlapScore"></a>

### drawer.getOverlapScore() ⇒ <code>Object</code>
Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Object</code> - Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }  
<a name="Drawer+chooseSide"></a>

### drawer.chooseSide(vertexA, vertexB, sides) ⇒ <code>Object</code>
When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Object</code> - Returns an object containing the following information: {
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
| sides | <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code> | An array containing the two normals of the line spanned by the two provided vertices. |

<a name="Drawer+setRingCenter"></a>

### drawer.setRingCenter(ring)
Sets the center for a ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> | A ring. |

<a name="Drawer+getSubringCenter"></a>

### drawer.getSubringCenter(ring, vertex) ⇒ <code>[Vector2](#Vector2)</code>
Gets the center of a ring contained within a bridged ring and containing a given vertex.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The center of the subring that containing the vertex.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> | A bridged ring. |
| vertex | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="Drawer+drawEdges"></a>

### drawer.drawEdges(debug)
Draw the actual edges as bonds to the canvas.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug helpers. |

<a name="Drawer+drawEdge"></a>

### drawer.drawEdge(edgeId, debug)
Draw the an edge as a bonds to the canvas.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| edgeId | <code>Number</code> | An edge id. |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug helpers. |

<a name="Drawer+drawVertices"></a>

### drawer.drawVertices(debug)
Draws the vertices representing atoms to the canvas.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug messages to the canvas. |

<a name="Drawer+position"></a>

### drawer.position()
Position the vertices according to their bonds and properties.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Drawer+backupRingInformation"></a>

### drawer.backupRingInformation()
Stores the current information associated with rings.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Drawer+restoreRingInformation"></a>

### drawer.restoreRingInformation()
Restores the most recently backed up information associated with rings.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Drawer+createRing"></a>

### drawer.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])
Creates a new ring, that is, positiones all the vertices inside a ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> |  | The ring to position. |
| [center] | <code>[Vector2](#Vector2)</code> &#124; <code>null</code> | <code></code> | The center of the ring to be created. |
| [startVertex] | <code>[Vertex](#Vertex)</code> &#124; <code>null</code> | <code></code> | The first vertex to be positioned inside the ring. |
| [previousVertex] | <code>[Vertex](#Vertex)</code> &#124; <code>null</code> | <code></code> | The last vertex that was positioned. |
| [previousVertex] | <code>Boolean</code> | <code>false</code> | A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it. |

<a name="Drawer+rotateSubtree"></a>

### drawer.rotateSubtree(vertexId, parentVertexId, angle, center)
Rotate an entire subtree by an angle around a center.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>Number</code> | A vertex id in the previous direction of the subtree that is to rotate. |
| angle | <code>Number</code> | An angle in randians. |
| center | <code>[Vector2](#Vector2)</code> | The rotational center. |

<a name="Drawer+getSubtreeOverlapScore"></a>

### drawer.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) ⇒ <code>Object</code>
Gets the overlap score of a subtree.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Object</code> - An object containing the total overlap score and the center of mass of the subtree weighted by overlap score { value: 0.2, center: new Vector2() }.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>Number</code> | A vertex id in the previous direction of the subtree. |
| vertexOverlapScores | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the vertex overlap scores indexed by vertex id. |

<a name="Drawer+getCurrentCenterOfMass"></a>

### drawer.getCurrentCenterOfMass() ⇒ <code>[Vector2](#Vector2)</code>
Returns the current (positioned vertices so far) center of mass.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The current center of mass.  
<a name="Drawer+getCurrentCenterOfMassInNeigbourhood"></a>

### drawer.getCurrentCenterOfMassInNeigbourhood(vec, [r]) ⇒ <code>[Vector2](#Vector2)</code>
Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The current center of mass.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> |  | The point at which to look for neighbours. |
| [r] | <code>Number</code> | <code>currentBondLength*2.0</code> | The radius of vertices to include. |

<a name="Drawer+resolvePrimaryOverlaps"></a>

### drawer.resolvePrimaryOverlaps()
Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Drawer+resolveSecondaryOverlaps"></a>

### drawer.resolveSecondaryOverlaps(scores)
Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scores | <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code> | An array of objects sorted descending by score. |
| scores[].id | <code>Number</code> | A vertex id. |
| scores[].score | <code>Number</code> | The overlap score associated with the vertex id. |

<a name="Drawer+getLastVertexWithAngle"></a>

### drawer.getLastVertexWithAngle(vertexId) ⇒ <code>[Vertex](#Vertex)</code>
Get the last non-null or 0 angle vertex.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[Vertex](#Vertex)</code> - The last vertex with an angle that was not 0 or null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="Drawer+createNextBond"></a>

### drawer.createNextBond(vertex, [previousVertex], [angle], [originShortest], [skipPositioning])
Positiones the next vertex thus creating a bond.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> |  | A vertex. |
| [previousVertex] | <code>[Vertex](#Vertex)</code> | <code></code> | The previous vertex which has been positioned. |
| [angle] | <code>Number</code> | <code>0.0</code> | The (global) angle of the vertex. |
| [originShortest] | <code>Boolean</code> | <code>false</code> | Whether the origin is the shortest subtree in the branch. |
| [skipPositioning] | <code>Boolean</code> | <code>false</code> | Whether or not to skip positioning and just check the neighbours. |

<a name="Drawer+getCommonRingbondNeighbour"></a>

### drawer.getCommonRingbondNeighbour(vertex) ⇒ <code>Number</code> &#124; <code>null</code>
Gets the vetex sharing the edge that is the common bond of two rings.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Number</code> &#124; <code>null</code> - The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | A vertex. |

<a name="Drawer+isPointInRing"></a>

### drawer.isPointInRing(vec) ⇒ <code>Boolean</code>
Check if a vector is inside any ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Drawer+isEdgeInRing"></a>

### drawer.isEdgeInRing(edge) ⇒ <code>Boolean</code>
Check whether or not an edge is part of a ring.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the edge is part of a ring.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | An edge. |

<a name="Drawer+isEdgeRotatable"></a>

### drawer.isEdgeRotatable(edge) ⇒ <code>Boolean</code>
Check whether or not an edge is rotatable.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the edge is rotatable.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | An edge. |

<a name="Drawer+isRingAromatic"></a>

### drawer.isRingAromatic(ring) ⇒ <code>Boolean</code>
Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a ring is implicitly defined as aromatic.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#Ring)</code> | A ring. |

<a name="Drawer+getEdgeNormals"></a>

### drawer.getEdgeNormals(edge) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code>
Get the normals of an edge.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code> - An array containing two vectors, representing the normals.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | An edge. |

<a name="Drawer+getNonRingNeighbours"></a>

### drawer.getNonRingNeighbours(vertexId) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code>
Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
**Returns**: <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="Drawer+annotateStereochemistry"></a>

### drawer.annotateStereochemistry()
Annotaed stereochemistry information for visualization.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Drawer+visitStereochemistry"></a>

### drawer.visitStereochemistry(vertexId, previousVertexId, visited, priority, maxDepth, depth)
**Kind**: instance method of <code>[Drawer](#Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | The id of a vertex. |
| previousVertexId | <code>Number</code> &#124; <code>null</code> | The id of the parent vertex of the vertex. |
| visited | <code>Uint8Array</code> | An array containing the visited flag for all vertices in the graph. |
| priority | <code>Array</code> | An array of arrays storing the atomic numbers for each level. |
| maxDepth | <code>Number</code> | The maximum depth. |
| depth | <code>Number</code> | The current depth. |

<a name="Drawer+initPseudoElements"></a>

### drawer.initPseudoElements()
Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon setsthe involved atoms not to be displayed.

**Kind**: instance method of <code>[Drawer](#Drawer)</code>  
<a name="Edge"></a>

## Edge
A class representing an edge.

**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>Number</code> |  | The id of this edge. |
| sourceId | <code>Number</code> |  | The id of the source vertex. |
| targetId | <code>Number</code> |  | The id of the target vertex. |
| weight | <code>Number</code> |  | The weight of this edge. That is, the degree of the bond (single bond = 1, double bond = 2, etc). |
| bondType | <code>String</code> | <code>&#x27;-&#x27;</code> | The bond type of this edge. |
| isPartOfAromaticRing | <code>Boolean</code> | <code>false</code> | Whether or not this edge is part of an aromatic ring. |
| center | <code>Boolean</code> | <code>false</code> | Wheter or not the bond is centered. For example, this affects straight double bonds. |
| wedge | <code>String</code> | <code>&#x27;&#x27;</code> | Wedge direction. Either '', 'up' or 'down' |


* [Edge](#Edge)
    * [new Edge(sourceId, targetId, [weight])](#new_Edge_new)
    * _instance_
        * [.setBondType(bondType)](#Edge+setBondType)
    * _static_
        * [.bonds](#Edge.bonds) ⇒ <code>Object</code>

<a name="new_Edge_new"></a>

### new Edge(sourceId, targetId, [weight])
The constructor for the class Edge.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sourceId | <code>Number</code> |  | A vertex id. |
| targetId | <code>Number</code> |  | A vertex id. |
| [weight] | <code>Number</code> | <code>1</code> | The weight of the edge. |

<a name="Edge+setBondType"></a>

### edge.setBondType(bondType)
Set the bond type of this edge. This also sets the edge weight.

**Kind**: instance method of <code>[Edge](#Edge)</code>  

| Param | Type |
| --- | --- |
| bondType | <code>String</code> | 

<a name="Edge.bonds"></a>

### Edge.bonds ⇒ <code>Object</code>
An object mapping the bond type to the number of bonds.

**Kind**: static property of <code>[Edge](#Edge)</code>  
**Returns**: <code>Object</code> - The object containing the map.  
<a name="Graph"></a>

## Graph
A class representing the molecular graph.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | The vertices of the graph. |
| edges | <code>[[ &#x27;Array&#x27; ].&lt;Edge&gt;](#Edge)</code> | The edges of this graph. |
| vertexIdsToEdgeId | <code>Object</code> | A map mapping vertex ids to the edge between the two vertices. The key is defined as vertexAId + '_' + vertexBId. |
| isometric | <code>Boolean</code> | A boolean indicating whether or not the SMILES associated with this graph is isometric. |


* [Graph](#Graph)
    * [new Graph(parseTree, [isomeric])](#new_Graph_new)
    * _instance_
        * [._init(node, parentVertexId, isBranch)](#Graph+_init)
        * [.clear()](#Graph+clear)
        * [.addVertex(vertex)](#Graph+addVertex) ⇒ <code>Number</code>
        * [.addEdge(edge)](#Graph+addEdge) ⇒ <code>Number</code>
        * [.getEdge(vertexIdA, vertexIdB)](#Graph+getEdge) ⇒ <code>[Edge](#Edge)</code> &#124; <code>null</code>
        * [.getEdges(vertexId)](#Graph+getEdges) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
        * [.hasEdge(vertexIdA, vertexIdB)](#Graph+hasEdge) ⇒ <code>Boolean</code>
        * [.getVertexList()](#Graph+getVertexList) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
        * [.getEdgeList()](#Graph+getEdgeList) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
        * [.getAdjacencyMatrix()](#Graph+getAdjacencyMatrix) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
        * [.getComponentsAdjacencyMatrix()](#Graph+getComponentsAdjacencyMatrix) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
        * [.getSubgraphAdjacencyMatrix(vertexIds)](#Graph+getSubgraphAdjacencyMatrix) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
        * [.getDistanceMatrix()](#Graph+getDistanceMatrix) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
        * [.getSubgraphDistanceMatrix(vertexIds)](#Graph+getSubgraphDistanceMatrix) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
        * [.getAdjacencyList()](#Graph+getAdjacencyList) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
        * [.getSubgraphAdjacencyList(vertexIds)](#Graph+getSubgraphAdjacencyList) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
        * [.getBridges()](#Graph+getBridges) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
        * [.traverseBF(startVertexId, callback)](#Graph+traverseBF)
        * [.getTreeDepth(vertexId, parentVertexId)](#Graph+getTreeDepth) ⇒ <code>Number</code>
        * [.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst], [depth], [visited])](#Graph+traverseTree)
        * [.kkLayout(vertexIds, center, startVertexId, ring)](#Graph+kkLayout)
        * [._bridgeDfs()](#Graph+_bridgeDfs)
    * _static_
        * [.getConnectedComponents(adjacencyMatrix)](#Graph.getConnectedComponents) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Set&gt;</code>
        * [.getConnectedComponentCount(adjacencyMatrix)](#Graph.getConnectedComponentCount) ⇒ <code>Number</code>
        * [._ccCountDfs()](#Graph._ccCountDfs)
        * [._ccGetDfs()](#Graph._ccGetDfs)

<a name="new_Graph_new"></a>

### new Graph(parseTree, [isomeric])
The constructor of the class Graph.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parseTree | <code>Object</code> |  | A SMILES parse tree. |
| [isomeric] | <code>Boolean</code> | <code>false</code> | A boolean specifying whether or not the SMILES is isomeric. |

<a name="Graph+_init"></a>

### graph._init(node, parentVertexId, isBranch)
PRIVATE FUNCTION. Initializing the graph from the parse tree.

**Kind**: instance method of <code>[Graph](#Graph)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>Object</code> |  | The current node in the parse tree. |
| parentVertexId | <code>Number</code> | <code></code> | The id of the previous vertex. |
| isBranch | <code>Boolean</code> | <code>false</code> | Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C). |

<a name="Graph+clear"></a>

### graph.clear()
Clears all the elements in this graph (edges and vertices).

**Kind**: instance method of <code>[Graph](#Graph)</code>  
<a name="Graph+addVertex"></a>

### graph.addVertex(vertex) ⇒ <code>Number</code>
Add a vertex to the graph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>Number</code> - The vertex id of the new vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | A new vertex. |

<a name="Graph+addEdge"></a>

### graph.addEdge(edge) ⇒ <code>Number</code>
Add an edge to the graph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>Number</code> - The edge id of the new edge.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#Edge)</code> | A new edge. |

<a name="Graph+getEdge"></a>

### graph.getEdge(vertexIdA, vertexIdB) ⇒ <code>[Edge](#Edge)</code> &#124; <code>null</code>
Returns the edge between two given vertices.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[Edge](#Edge)</code> &#124; <code>null</code> - The edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="Graph+getEdges"></a>

### graph.getEdges(vertexId) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns the ids of edges connected to a vertex.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array containing the ids of edges connected to the vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="Graph+hasEdge"></a>

### graph.hasEdge(vertexIdA, vertexIdB) ⇒ <code>Boolean</code>
Check whether or not two vertices are connected by an edge.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two vertices are connected by an edge.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="Graph+getVertexList"></a>

### graph.getVertexList() ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns an array containing the vertex ids of this graph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array containing all vertex ids of this graph.  
<a name="Graph+getEdgeList"></a>

### graph.getEdgeList() ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Returns an array containing source, target arrays of this graphs edges.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - An array containing source, target arrays of this graphs edges. Example: [ [ 2, 5 ], [ 6, 9 ] ].  
<a name="Graph+getAdjacencyMatrix"></a>

### graph.getAdjacencyMatrix() ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Get the adjacency matrix of the graph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - The adjancency matrix of the molecular graph.  
<a name="Graph+getComponentsAdjacencyMatrix"></a>

### graph.getComponentsAdjacencyMatrix() ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - The adjancency matrix of the molecular graph with all bridges removed.  
<a name="Graph+getSubgraphAdjacencyMatrix"></a>

### graph.getSubgraphAdjacencyMatrix(vertexIds) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Get the adjacency matrix of a subgraph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - The adjancency matrix of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="Graph+getDistanceMatrix"></a>

### graph.getDistanceMatrix() ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Get the distance matrix of the graph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - The distance matrix of the graph.  
<a name="Graph+getSubgraphDistanceMatrix"></a>

### graph.getSubgraphDistanceMatrix(vertexIds) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Get the distance matrix of a subgraph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - The distance matrix of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="Graph+getAdjacencyList"></a>

### graph.getAdjacencyList() ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Get the adjacency list of the graph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - The adjancency list of the graph.  
<a name="Graph+getSubgraphAdjacencyList"></a>

### graph.getSubgraphAdjacencyList(vertexIds) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Get the adjacency list of a subgraph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - The adjancency list of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="Graph+getBridges"></a>

### graph.getBridges() ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array containing the edge ids of the bridges.  
<a name="Graph+traverseBF"></a>

### graph.traverseBF(startVertexId, callback)
Traverses the graph in breadth-first order.

**Kind**: instance method of <code>[Graph](#Graph)</code>  

| Param | Type | Description |
| --- | --- | --- |
| startVertexId | <code>Number</code> | The id of the starting vertex. |
| callback | <code>function</code> | The callback function to be called on every vertex. |

<a name="Graph+getTreeDepth"></a>

### graph.getTreeDepth(vertexId, parentVertexId) ⇒ <code>Number</code>
Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.

**Kind**: instance method of <code>[Graph](#Graph)</code>  
**Returns**: <code>Number</code> - The depth of the sub-tree.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |
| parentVertexId | <code>Number</code> | The id of a neighbouring vertex. |

<a name="Graph+traverseTree"></a>

### graph.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst], [depth], [visited])
Traverse a sub-tree in the graph.

**Kind**: instance method of <code>[Graph](#Graph)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vertexId | <code>Number</code> |  | A vertex id. |
| parentVertexId | <code>Number</code> |  | A neighbouring vertex. |
| callback | <code>function</code> |  | The callback function that is called with each visited as an argument. |
| [maxDepth] | <code>Number</code> | <code>Number.MAX_SAFE_INTEGER</code> | The maximum depth of the recursion. |
| [ignoreFirst] | <code>Boolean</code> | <code>false</code> | Whether or not to ignore the starting vertex supplied as vertexId in the callback. |
| [depth] | <code>Number</code> | <code>1</code> | The current depth in the tree. |
| [visited] | <code>Uint8Array</code> | <code></code> | An array holding a flag on whether or not a node has been visited. |

<a name="Graph+kkLayout"></a>

### graph.kkLayout(vertexIds, center, startVertexId, ring)
Positiones the (sub)graph using Kamada and Kawais algorithm for drawing general undirected graphs. https://pdfs.semanticscholar.org/b8d3/bca50ccc573c5cb99f7d201e8acce6618f04.pdfThere are undocumented layout parameters. They are undocumented for a reason, so be very careful.

**Kind**: instance method of <code>[Graph](#Graph)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing vertexIds to be placed using the force based layout. |
| center | <code>[Vector2](#Vector2)</code> | The center of the layout. |
| startVertexId | <code>Number</code> | A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex. |
| ring | <code>[Ring](#Ring)</code> | The bridged ring associated with this force-based layout. |

<a name="Graph+_bridgeDfs"></a>

### graph._bridgeDfs()
PRIVATE FUNCTION used by getBridges().

**Kind**: instance method of <code>[Graph](#Graph)</code>  
<a name="Graph.getConnectedComponents"></a>

### Graph.getConnectedComponents(adjacencyMatrix) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Set&gt;</code>
Returns the connected components of the graph.

**Kind**: static method of <code>[Graph](#Graph)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Set&gt;</code> - Connected components as sets.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | An adjacency matrix. |

<a name="Graph.getConnectedComponentCount"></a>

### Graph.getConnectedComponentCount(adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of connected components for the graph.

**Kind**: static method of <code>[Graph](#Graph)</code>  
**Returns**: <code>Number</code> - The number of connected components of the supplied graph.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | An adjacency matrix. |

<a name="Graph._ccCountDfs"></a>

### Graph._ccCountDfs()
PRIVATE FUNCTION used by getConnectedComponentCount().

**Kind**: static method of <code>[Graph](#Graph)</code>  
<a name="Graph._ccGetDfs"></a>

### Graph._ccGetDfs()
PRIVATE FUNCTION used by getConnectedComponents().

**Kind**: static method of <code>[Graph](#Graph)</code>  
<a name="Line"></a>

## Line
A class representing a line.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| from | <code>[Vector2](#Vector2)</code> | The Vector2 defining the start of the line. |
| to | <code>[Vector2](#Vector2)</code> | The Vector2 defining the end of the line. |
| elementFrom | <code>String</code> | The element symbol associated with the start of the line. |
| elementTo | <code>String</code> | The element symbol associated with the end of the line. |
| chiralFrom | <code>Boolean</code> | A boolean indicating whether or not the source atom is a chiral center. |
| chiralTo | <code>Boolean</code> | A boolean indicating whether or tno the target atom is a chiral center. |


* [Line](#Line)
    * [new Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])](#new_Line_new)
    * [.clone()](#Line+clone) ⇒ <code>[Line](#Line)</code>
    * [.getLength()](#Line+getLength) ⇒ <code>Number</code>
    * [.getAngle()](#Line+getAngle) ⇒ <code>Number</code>
    * [.getRightVector()](#Line+getRightVector) ⇒ <code>[Vector2](#Vector2)</code>
    * [.getLeftVector()](#Line+getLeftVector) ⇒ <code>[Vector2](#Vector2)</code>
    * [.getRightElement()](#Line+getRightElement) ⇒ <code>String</code>
    * [.getLeftElement()](#Line+getLeftElement) ⇒ <code>String</code>
    * [.getRightChiral()](#Line+getRightChiral) ⇒ <code>Boolean</code>
    * [.getLeftChiral()](#Line+getLeftChiral) ⇒ <code>Boolean</code>
    * [.setRightVector(x, y)](#Line+setRightVector) ⇒ <code>[Line](#Line)</code>
    * [.setLeftVector(x, y)](#Line+setLeftVector) ⇒ <code>[Line](#Line)</code>
    * [.rotateToXAxis()](#Line+rotateToXAxis) ⇒ <code>[Line](#Line)</code>
    * [.rotate(theta)](#Line+rotate) ⇒ <code>[Line](#Line)</code>
    * [.shortenFrom(by)](#Line+shortenFrom) ⇒ <code>[Line](#Line)</code>
    * [.shortenTo(by)](#Line+shortenTo) ⇒ <code>[Line](#Line)</code>
    * [.shortenRight(by)](#Line+shortenRight) ⇒ <code>[Line](#Line)</code>
    * [.shortenLeft(by)](#Line+shortenLeft) ⇒ <code>[Line](#Line)</code>
    * [.shorten(by)](#Line+shorten) ⇒ <code>[Line](#Line)</code>

<a name="new_Line_new"></a>

### new Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])
The constructor for the class Line.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [from] | <code>[Vector2](#Vector2)</code> | <code>new Vector2(0, 0)</code> | A vector marking the beginning of the line. |
| [to] | <code>[Vector2](#Vector2)</code> | <code>new Vector2(0, 0)</code> | A vector marking the end of the line. |
| [elementFrom] | <code>string</code> | <code>null</code> | A one-letter representation of the element associated with the vector marking the beginning of the line. |
| [elementTo] | <code>string</code> | <code>null</code> | A one-letter representation of the element associated with the vector marking the end of the line. |
| [chiralFrom] | <code>Boolean</code> | <code>false</code> | Whether or not the from atom is a chiral center. |
| [chiralTo] | <code>Boolean</code> | <code>false</code> | Whether or not the to atom is a chiral center. |

<a name="Line+clone"></a>

### line.clone() ⇒ <code>[Line](#Line)</code>
Clones this line and returns the clone.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - A clone of this line.  
<a name="Line+getLength"></a>

### line.getLength() ⇒ <code>Number</code>
Returns the length of this line.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>Number</code> - The length of this line.  
<a name="Line+getAngle"></a>

### line.getAngle() ⇒ <code>Number</code>
Returns the angle of the line in relation to the coordinate system (the x-axis).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>Number</code> - The angle in radians.  
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

### line.getRightElement() ⇒ <code>String</code>
Returns the element associated with the right vector (the vector with the larger x value).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>String</code> - The element associated with the right vector.  
<a name="Line+getLeftElement"></a>

### line.getLeftElement() ⇒ <code>String</code>
Returns the element associated with the left vector (the vector with the smaller x value).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>String</code> - The element associated with the left vector.  
<a name="Line+getRightChiral"></a>

### line.getRightChiral() ⇒ <code>Boolean</code>
Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>Boolean</code> - Whether or not the atom associated with the right vector is a chiral center.  
<a name="Line+getLeftChiral"></a>

### line.getLeftChiral() ⇒ <code>Boolean</code>
Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>Boolean</code> - Whether or not the atom  associated with the left vector is a chiral center.  
<a name="Line+setRightVector"></a>

### line.setRightVector(x, y) ⇒ <code>[Line](#Line)</code>
Set the value of the right vector.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x value. |
| y | <code>Number</code> | The y value. |

<a name="Line+setLeftVector"></a>

### line.setLeftVector(x, y) ⇒ <code>[Line](#Line)</code>
Set the value of the left vector.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x value. |
| y | <code>Number</code> | The y value. |

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
| theta | <code>Number</code> | The angle (in radians) to rotate the line. |

<a name="Line+shortenFrom"></a>

### line.shortenFrom(by) ⇒ <code>[Line](#Line)</code>
Shortens this line from the "from" direction by a given value (in pixels).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="Line+shortenTo"></a>

### line.shortenTo(by) ⇒ <code>[Line](#Line)</code>
Shortens this line from the "to" direction by a given value (in pixels).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="Line+shortenRight"></a>

### line.shortenRight(by) ⇒ <code>[Line](#Line)</code>
Shorten the right side.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="Line+shortenLeft"></a>

### line.shortenLeft(by) ⇒ <code>[Line](#Line)</code>
Shorten the left side.

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="Line+shorten"></a>

### line.shorten(by) ⇒ <code>[Line](#Line)</code>
Shortens this line from both directions by a given value (in pixels).

**Kind**: instance method of <code>[Line](#Line)</code>  
**Returns**: <code>[Line](#Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="MathHelper"></a>

## MathHelper
A static class containing helper functions for math-related tasks.

**Kind**: global class  

* [MathHelper](#MathHelper)
    * [.radFactor](#MathHelper.radFactor)
    * [.degFactor](#MathHelper.degFactor)
    * [.twoPI](#MathHelper.twoPI)
    * [.round(value, decimals)](#MathHelper.round) ⇒ <code>Number</code>
    * [.meanAngle(arr)](#MathHelper.meanAngle) ⇒ <code>Number</code>
    * [.innerAngle(n)](#MathHelper.innerAngle) ⇒ <code>Number</code>
    * [.polyCircumradius(s, n)](#MathHelper.polyCircumradius) ⇒ <code>Number</code>
    * [.apothem(r, n)](#MathHelper.apothem) ⇒ <code>Number</code>
    * [.centralAngle(n)](#MathHelper.centralAngle) ⇒ <code>Number</code>
    * [.toDeg(rad)](#MathHelper.toDeg) ⇒ <code>Number</code>
    * [.toRad(deg)](#MathHelper.toRad) ⇒ <code>Number</code>
    * [.parityOfPermutation(arr)](#MathHelper.parityOfPermutation) ⇒ <code>Number</code>

<a name="MathHelper.radFactor"></a>

### MathHelper.radFactor
The factor to convert degrees to radians.

**Kind**: static property of <code>[MathHelper](#MathHelper)</code>  
<a name="MathHelper.degFactor"></a>

### MathHelper.degFactor
The factor to convert radians to degrees.

**Kind**: static property of <code>[MathHelper](#MathHelper)</code>  
<a name="MathHelper.twoPI"></a>

### MathHelper.twoPI
Two times PI.

**Kind**: static property of <code>[MathHelper](#MathHelper)</code>  
<a name="MathHelper.round"></a>

### MathHelper.round(value, decimals) ⇒ <code>Number</code>
Rounds a value to a given number of decimals.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - A number rounded to a given number of decimals.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | A number. |
| decimals | <code>Number</code> | The number of decimals. |

<a name="MathHelper.meanAngle"></a>

### MathHelper.meanAngle(arr) ⇒ <code>Number</code>
Returns the means of the angles contained in an array. In radians.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - The mean angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing angles (in radians). |

<a name="MathHelper.innerAngle"></a>

### MathHelper.innerAngle(n) ⇒ <code>Number</code>
Returns the inner angle of a n-sided regular polygon.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - The inner angle of a given regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of sides of a regular polygon. |

<a name="MathHelper.polyCircumradius"></a>

### MathHelper.polyCircumradius(s, n) ⇒ <code>Number</code>
Returns the circumradius of a n-sided regular polygon with a given side-length.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - The circumradius of the regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>Number</code> | The side length of the regular polygon. |
| n | <code>Number</code> | The number of sides. |

<a name="MathHelper.apothem"></a>

### MathHelper.apothem(r, n) ⇒ <code>Number</code>
Returns the apothem of a regular n-sided polygon based on its radius.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - The apothem of a n-sided polygon based on its radius.  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>Number</code> | The radius. |
| n | <code>Number</code> | The number of edges of the regular polygon. |

<a name="MathHelper.centralAngle"></a>

### MathHelper.centralAngle(n) ⇒ <code>Number</code>
The central angle of a n-sided regular polygon. In radians.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - The central angle of the n-sided polygon in radians.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number of sides of the regular polygon. |

<a name="MathHelper.toDeg"></a>

### MathHelper.toDeg(rad) ⇒ <code>Number</code>
Convertes radians to degrees.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - The angle in degrees.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>Number</code> | An angle in radians. |

<a name="MathHelper.toRad"></a>

### MathHelper.toRad(deg) ⇒ <code>Number</code>
Converts degrees to radians.

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| deg | <code>Number</code> | An angle in degrees. |

<a name="MathHelper.parityOfPermutation"></a>

### MathHelper.parityOfPermutation(arr) ⇒ <code>Number</code>
Returns the parity of the permutation (1 or -1)

**Kind**: static method of <code>[MathHelper](#MathHelper)</code>  
**Returns**: <code>Number</code> - The parity of the permutation (1 or -1), where 1 means even and -1 means odd.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> &#124; <code>Uint8Array</code> | An array containing the permutation. |

<a name="Ring"></a>

## Ring
A class representing a ring.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The id of this ring. |
| members | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the vertex ids of the ring members. |
| edges | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the edge ids of the edges between the ring members. |
| insiders | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the vertex ids of the vertices contained within the ring if it is a bridged ring. |
| neighbours | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the ids of neighbouring rings. |
| positioned | <code>Boolean</code> | A boolean indicating whether or not this ring has been positioned. |
| center | <code>[Vector2](#Vector2)</code> | The center of this ring. |
| rings | <code>[[ &#x27;Array&#x27; ].&lt;Ring&gt;](#Ring)</code> | The rings contained within this ring if this ring is bridged. |
| isBridged | <code>Boolean</code> | A boolean whether or not this ring is bridged. |
| isPartOfBridged | <code>Boolean</code> | A boolean whether or not this ring is part of a bridge ring. |
| isSpiro | <code>Boolean</code> | A boolean whether or not this ring is part of a spiro. |
| isFused | <code>Boolean</code> | A boolean whether or not this ring is part of a fused ring. |
| centralAngle | <code>Number</code> | The central angle of this ring. |
| canFlip | <code>Boolean</code> | A boolean indicating whether or not this ring allows flipping of attached vertices to the inside of the ring. |


* [Ring](#Ring)
    * [new Ring(members)](#new_Ring_new)
    * [.clone()](#Ring+clone) ⇒ <code>[Ring](#Ring)</code>
    * [.getSize()](#Ring+getSize) ⇒ <code>Number</code>
    * [.getPolygon(vertices)](#Ring+getPolygon) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code>
    * [.getAngle()](#Ring+getAngle) ⇒ <code>Number</code>
    * [.eachMember(vertices, callback, startVertexId, previousVertexId)](#Ring+eachMember)
    * [.getOrderedNeighbours(ringConnections)](#Ring+getOrderedNeighbours) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code>
    * [.isBenzeneLike(vertices)](#Ring+isBenzeneLike) ⇒ <code>Boolean</code>
    * [.getDoubleBondCount(vertices)](#Ring+getDoubleBondCount) ⇒ <code>Number</code>
    * [.contains(vertexId)](#Ring+contains) ⇒ <code>Boolean</code>

<a name="new_Ring_new"></a>

### new Ring(members)
The constructor for the class Ring.


| Param | Type | Description |
| --- | --- | --- |
| members | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | An array containing the vertex ids of the members of the ring to be created. |

<a name="Ring+clone"></a>

### ring.clone() ⇒ <code>[Ring](#Ring)</code>
Clones this ring and returns the clone.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>[Ring](#Ring)</code> - A clone of this ring.  
<a name="Ring+getSize"></a>

### ring.getSize() ⇒ <code>Number</code>
Returns the size (number of members) of this ring.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>Number</code> - The size (number of members) of this ring.  
<a name="Ring+getPolygon"></a>

### ring.getPolygon(vertices) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code>
Gets the polygon representation (an array of the ring-members positional vectors) of this ring.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code> - An array of the positional vectors of the ring members.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | An array of vertices representing the current molecule. |

<a name="Ring+getAngle"></a>

### ring.getAngle() ⇒ <code>Number</code>
Returns the angle of this ring in relation to the coordinate system.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>Number</code> - The angle in radians.  
<a name="Ring+eachMember"></a>

### ring.eachMember(vertices, callback, startVertexId, previousVertexId)
Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.

**Kind**: instance method of <code>[Ring](#Ring)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | The vertices associated with the current molecule. |
| callback | <code>function</code> | A callback with the current vertex id as a parameter. |
| startVertexId | <code>Number</code> | The vertex id of the start vertex. |
| previousVertexId | <code>Number</code> | The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex). |

<a name="Ring+getOrderedNeighbours"></a>

### ring.getOrderedNeighbours(ringConnections) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code>
Returns an array containing the neighbouring rings of this ring ordered by ring size.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Object&gt;</code> - An array of neighbouring rings sorted by ring size. Example: { n: 5, neighbour: 1 }.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>[[ &#x27;Array&#x27; ].&lt;RingConnection&gt;](#RingConnection)</code> | An array of ring connections associated with the current molecule. |

<a name="Ring+isBenzeneLike"></a>

### ring.isBenzeneLike(vertices) ⇒ <code>Boolean</code>
Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring is an implicitly defined benzene-like.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | An array of vertices associated with the current molecule. |

<a name="Ring+getDoubleBondCount"></a>

### ring.getDoubleBondCount(vertices) ⇒ <code>Number</code>
Get the number of double bonds inside this ring.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>Number</code> - The number of double bonds inside this ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | An array of vertices associated with the current molecule. |

<a name="Ring+contains"></a>

### ring.contains(vertexId) ⇒ <code>Boolean</code>
Checks whether or not this ring contains a member with a given vertex id.

**Kind**: instance method of <code>[Ring](#Ring)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring contains a member with the given vertex id.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="RingConnection"></a>

## RingConnection
A class representing a ring connection.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The id of this ring connection. |
| firstRingId | <code>Number</code> | A ring id. |
| secondRingId | <code>Number</code> | A ring id. |
| vertices | <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code> | A set containing the vertex ids participating in the ring connection. |


* [RingConnection](#RingConnection)
    * [new RingConnection(firstRing, secondRing)](#new_RingConnection_new)
    * _instance_
        * [.addVertex(vertexId)](#RingConnection+addVertex)
        * [.updateOther(ringId, otherRingId)](#RingConnection+updateOther)
        * [.containsRing(ringId)](#RingConnection+containsRing) ⇒ <code>Boolean</code>
        * [.isBridge(vertices)](#RingConnection+isBridge) ⇒ <code>Boolean</code>
    * _static_
        * [.isBridge(ringConnections, vertices, firstRingId, secondRingId)](#RingConnection.isBridge) ⇒ <code>Boolean</code>
        * [.getNeighbours(ringConnections, ringId)](#RingConnection.getNeighbours) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
        * [.getVertices(ringConnections, firstRingId, secondRingId)](#RingConnection.getVertices) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>

<a name="new_RingConnection_new"></a>

### new RingConnection(firstRing, secondRing)
The constructor for the class RingConnection.


| Param | Type | Description |
| --- | --- | --- |
| firstRing | <code>[Ring](#Ring)</code> | A ring. |
| secondRing | <code>[Ring](#Ring)</code> | A ring. |

<a name="RingConnection+addVertex"></a>

### ringConnection.addVertex(vertexId)
Adding a vertex to the ring connection.

**Kind**: instance method of <code>[RingConnection](#RingConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="RingConnection+updateOther"></a>

### ringConnection.updateOther(ringId, otherRingId)
Update the ring id of this ring connection that is not the ring id supplied as the second argument.

**Kind**: instance method of <code>[RingConnection](#RingConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. The new ring id to be set. |
| otherRingId | <code>Number</code> | A ring id. The id that is NOT to be updated. |

<a name="RingConnection+containsRing"></a>

### ringConnection.containsRing(ringId) ⇒ <code>Boolean</code>
Returns a boolean indicating whether or not a ring with a given id is participating in this ring connection.

**Kind**: instance method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a ring with a given id participates in this ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="RingConnection+isBridge"></a>

### ringConnection.isBridge(vertices) ⇒ <code>Boolean</code>
Checks whether or not this ring connection is a bridge in a bridged ring.

**Kind**: instance method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring connection is a bridge.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | The array of vertices associated with the current molecule. |

<a name="RingConnection.isBridge"></a>

### RingConnection.isBridge(ringConnections, vertices, firstRingId, secondRingId) ⇒ <code>Boolean</code>
Checks whether or not two rings are connected by a bridged bond.

**Kind**: static method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two rings ar connected by a bridged bond.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>[[ &#x27;Array&#x27; ].&lt;RingConnection&gt;](#RingConnection)</code> | An array of ring connections containing the ring connections associated with the current molecule. |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | An array of vertices containing the vertices associated with the current molecule. |
| firstRingId | <code>Number</code> | A ring id. |
| secondRingId | <code>Number</code> | A ring id. |

<a name="RingConnection.getNeighbours"></a>

### RingConnection.getNeighbours(ringConnections, ringId) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Retruns the neighbouring rings of a given ring.

**Kind**: static method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array of ring ids of neighbouring rings.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>[[ &#x27;Array&#x27; ].&lt;RingConnection&gt;](#RingConnection)</code> | An array of ring connections containing ring connections associated with the current molecule. |
| ringId | <code>Number</code> | A ring id. |

<a name="RingConnection.getVertices"></a>

### RingConnection.getVertices(ringConnections, firstRingId, secondRingId) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns an array of vertex ids associated with a given ring connection.

**Kind**: static method of <code>[RingConnection](#RingConnection)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array of vertex ids associated with the ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>[[ &#x27;Array&#x27; ].&lt;RingConnection&gt;](#RingConnection)</code> | An array of ring connections containing ring connections associated with the current molecule. |
| firstRingId | <code>Number</code> | A ring id. |
| secondRingId | <code>Number</code> | A ring id. |

<a name="SSSR"></a>

## SSSR
A class encapsulating the functionality to find the smallest set of smallest rings in a graph.

**Kind**: global class  

* [SSSR](#SSSR)
    * [.getRings(graph, [experimental])](#SSSR.getRings) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
    * [.matrixToString(matrix)](#SSSR.matrixToString) ⇒ <code>String</code>
    * [.getPathIncludedDistanceMatrices(adjacencyMatrix)](#SSSR.getPathIncludedDistanceMatrices) ⇒ <code>Object</code>
    * [.getRingCandidates(d, pe, pe_prime)](#SSSR.getRingCandidates) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
    * [.getSSSR(c, d, adjacencyMatrix, pe, pe_prime, arrBondCount, arrRingCount, nsssr)](#SSSR.getSSSR) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Set&gt;</code>
    * [.getEdgeCount(adjacencyMatrix)](#SSSR.getEdgeCount) ⇒ <code>Number</code>
    * [.getEdgeList(adjacencyMatrix)](#SSSR.getEdgeList) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
    * [.bondsToAtoms(bonds)](#SSSR.bondsToAtoms) ⇒ <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code>
    * [.getBondCount(atoms, adjacencyMatrix)](#SSSR.getBondCount) ⇒ <code>Number</code>
    * [.pathSetsContain(pathSets, pathSet, bonds, allBonds, arrBondCount, arrRingCount)](#SSSR.pathSetsContain) ⇒ <code>Boolean</code>
    * [.areSetsEqual(setA, setB)](#SSSR.areSetsEqual) ⇒ <code>Boolean</code>
    * [.isSupersetOf(setA, setB)](#SSSR.isSupersetOf) ⇒ <code>Boolean</code>

<a name="SSSR.getRings"></a>

### SSSR.getRings(graph, [experimental]) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| graph | <code>[Graph](#Graph)</code> |  | A Graph object. |
| [experimental] | <code>Boolean</code> | <code>false</code> | Whether or not to use experimental SSSR. |

<a name="SSSR.matrixToString"></a>

### SSSR.matrixToString(matrix) ⇒ <code>String</code>
Creates a printable string from a matrix (2D array).

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>String</code> - A string representing the matrix.  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | A 2D array. |

<a name="SSSR.getPathIncludedDistanceMatrices"></a>

### SSSR.getPathIncludedDistanceMatrices(adjacencyMatrix) ⇒ <code>Object</code>
Returnes the two path-included distance matrices used to find the sssr.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>Object</code> - The path-included distance matrices. { p1, p2 }  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SSSR.getRingCandidates"></a>

### SSSR.getRingCandidates(d, pe, pe_prime) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Get the ring candidates from the path-included distance matrices.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - The ring candidates.  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | The distance matrix. |
| pe | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | A matrix containing the shortest paths. |
| pe_prime | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | A matrix containing the shortest paths + one vertex. |

<a name="SSSR.getSSSR"></a>

### SSSR.getSSSR(c, d, adjacencyMatrix, pe, pe_prime, arrBondCount, arrRingCount, nsssr) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Set&gt;</code>
Searches the candidates for the smallest set of smallest rings.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Set&gt;</code> - The smallest set of smallest rings.  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | The candidates. |
| d | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | The distance matrix. |
| adjacencyMatrix | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | An adjacency matrix. |
| pe | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | A matrix containing the shortest paths. |
| pe_prime | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | A matrix containing the shortest paths + one vertex. |
| arrBondCount | <code>Uint16Array</code> | A matrix containing the bond count of each vertex. |
| arrRingCount | <code>Uint16Array</code> | A matrix containing the number of rings associated with each vertex. |
| nsssr | <code>Number</code> | The theoretical number of rings in the graph. |

<a name="SSSR.getEdgeCount"></a>

### SSSR.getEdgeCount(adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of edges in a graph defined by an adjacency matrix.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>Number</code> - The number of edges in the graph defined by the adjacency matrix.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SSSR.getEdgeList"></a>

### SSSR.getEdgeList(adjacencyMatrix) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code>
Returns an edge list constructed form an adjacency matrix.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> - An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SSSR.bondsToAtoms"></a>

### SSSR.bondsToAtoms(bonds) ⇒ <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code>
Return a set of vertex indices contained in an array of bonds.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| bonds | <code>Array</code> | An array of bonds. A bond is defined as [ sourceVertexId, targetVertexId ]. |

<a name="SSSR.getBondCount"></a>

### SSSR.getBondCount(atoms, adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of bonds within a set of atoms.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>Number</code> - The number of bonds in a set of atoms.  

| Param | Type | Description |
| --- | --- | --- |
| atoms | <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code> | An array of atom ids. |
| adjacencyMatrix | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SSSR.pathSetsContain"></a>

### SSSR.pathSetsContain(pathSets, pathSet, bonds, allBonds, arrBondCount, arrRingCount) ⇒ <code>Boolean</code>
Checks whether or not a given path already exists in an array of paths.

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a give path is contained within a set.  

| Param | Type | Description |
| --- | --- | --- |
| pathSets | <code>[ &#x27;Array&#x27; ].&lt;Set&gt;</code> | An array of sets each representing a path. |
| pathSet | <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code> | A set representing a path. |
| bonds | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | The bonds associated with the current path. |
| allBonds | <code>[ &#x27;Array&#x27; ].&lt;Array&gt;</code> | All bonds currently associated with rings in the SSSR set. |
| arrBondCount | <code>Uint16Array</code> | A matrix containing the bond count of each vertex. |
| arrRingCount | <code>Uint16Array</code> | A matrix containing the number of rings associated with each vertex. |

<a name="SSSR.areSetsEqual"></a>

### SSSR.areSetsEqual(setA, setB) ⇒ <code>Boolean</code>
Checks whether or not two sets are equal (contain the same elements).

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two sets are equal.  

| Param | Type | Description |
| --- | --- | --- |
| setA | <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code> | A set. |
| setB | <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code> | A set. |

<a name="SSSR.isSupersetOf"></a>

### SSSR.isSupersetOf(setA, setB) ⇒ <code>Boolean</code>
Checks whether or not a set (setA) is a superset of another set (setB).

**Kind**: static method of <code>[SSSR](#SSSR)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not setB is a superset of setA.  

| Param | Type | Description |
| --- | --- | --- |
| setA | <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code> | A set. |
| setB | <code>[ &#x27;Set&#x27; ].&lt;Number&gt;</code> | A set. |

<a name="Vector2"></a>

## Vector2
A class representing a 2D vector.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x component of the vector. |
| y | <code>Number</code> | The y component of the vector. |


* [Vector2](#Vector2)
    * [new Vector2(x, y)](#new_Vector2_new)
    * _instance_
        * [.clone()](#Vector2+clone) ⇒ <code>[Vector2](#Vector2)</code>
        * [.toString()](#Vector2+toString) ⇒ <code>String</code>
        * [.add(vec)](#Vector2+add) ⇒ <code>[Vector2](#Vector2)</code>
        * [.subtract(vec)](#Vector2+subtract) ⇒ <code>[Vector2](#Vector2)</code>
        * [.divide(scalar)](#Vector2+divide) ⇒ <code>[Vector2](#Vector2)</code>
        * [.multiply(v)](#Vector2+multiply) ⇒ <code>[Vector2](#Vector2)</code>
        * [.multiplyScalar(scalar)](#Vector2+multiplyScalar) ⇒ <code>[Vector2](#Vector2)</code>
        * [.invert()](#Vector2+invert) ⇒ <code>[Vector2](#Vector2)</code>
        * [.angle()](#Vector2+angle) ⇒ <code>Number</code>
        * [.distance(vec)](#Vector2+distance) ⇒ <code>Number</code>
        * [.distanceSq(vec)](#Vector2+distanceSq) ⇒ <code>Number</code>
        * [.clockwise(vec)](#Vector2+clockwise) ⇒ <code>Number</code>
        * [.relativeClockwise(center, vec)](#Vector2+relativeClockwise) ⇒ <code>Number</code>
        * [.rotate(angle)](#Vector2+rotate) ⇒ <code>[Vector2](#Vector2)</code>
        * [.rotateAround(angle, vec)](#Vector2+rotateAround) ⇒ <code>[Vector2](#Vector2)</code>
        * [.rotateTo(vec, center, [offsetAngle])](#Vector2+rotateTo) ⇒ <code>[Vector2](#Vector2)</code>
        * [.rotateAwayFrom(vec, center, angle)](#Vector2+rotateAwayFrom)
        * [.getRotateAwayFromAngle(vec, center, angle)](#Vector2+getRotateAwayFromAngle) ⇒ <code>Number</code>
        * [.getRotateTowardsAngle(vec, center, angle)](#Vector2+getRotateTowardsAngle) ⇒ <code>Number</code>
        * [.getRotateToAngle(vec, center)](#Vector2+getRotateToAngle) ⇒ <code>Number</code>
        * [.isInPolygon(polygon)](#Vector2+isInPolygon) ⇒ <code>Boolean</code>
        * [.length()](#Vector2+length) ⇒ <code>Number</code>
        * [.lengthSq()](#Vector2+lengthSq) ⇒ <code>Number</code>
        * [.normalize()](#Vector2+normalize) ⇒ <code>[Vector2](#Vector2)</code>
        * [.normalized()](#Vector2+normalized) ⇒ <code>[Vector2](#Vector2)</code>
        * [.whichSide(vecA, vecB)](#Vector2+whichSide) ⇒ <code>Number</code>
        * [.sameSideAs(vecA, vecB, vecC)](#Vector2+sameSideAs) ⇒ <code>Boolean</code>
    * _static_
        * [.add(vecA, vecB)](#Vector2.add) ⇒ <code>[Vector2](#Vector2)</code>
        * [.subtract(vecA, vecB)](#Vector2.subtract) ⇒ <code>[Vector2](#Vector2)</code>
        * [.multiply(vecA, vecB)](#Vector2.multiply) ⇒ <code>[Vector2](#Vector2)</code>
        * [.multiplyScalar(vec, scalar)](#Vector2.multiplyScalar) ⇒ <code>[Vector2](#Vector2)</code>
        * [.midpoint(vecA, vecB)](#Vector2.midpoint) ⇒ <code>[Vector2](#Vector2)</code>
        * [.normals(vecA, vecB)](#Vector2.normals) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code>
        * [.units(vecA, vecB)](#Vector2.units) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code>
        * [.divide(vecA, vecB)](#Vector2.divide) ⇒ <code>[Vector2](#Vector2)</code>
        * [.divideScalar(vecA, s)](#Vector2.divideScalar) ⇒ <code>[Vector2](#Vector2)</code>
        * [.dot(vecA, vecB)](#Vector2.dot) ⇒ <code>Number</code>
        * [.angle(vecA, vecB)](#Vector2.angle) ⇒ <code>Number</code>
        * [.threePointangle(vecA, vecB, vecC)](#Vector2.threePointangle) ⇒ <code>Number</code>
        * [.scalarProjection(vecA, vecB)](#Vector2.scalarProjection) ⇒ <code>Number</code>
        * [.averageDirection(vecs)](#Vector2.averageDirection) ⇒ <code>[Vector2](#Vector2)</code>

<a name="new_Vector2_new"></a>

### new Vector2(x, y)
The constructor of the class Vector2.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> &#124; <code>[Vector2](#Vector2)</code> | The initial x coordinate value or, if the single argument, a Vector2 object. |
| y | <code>Number</code> | The initial y coordinate value. |

<a name="Vector2+clone"></a>

### vector2.clone() ⇒ <code>[Vector2](#Vector2)</code>
Clones this vector and returns the clone.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The clone of this vector.  
<a name="Vector2+toString"></a>

### vector2.toString() ⇒ <code>String</code>
Returns a string representation of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>String</code> - A string representation of this vector.  
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
| scalar | <code>Number</code> | The scalar. |

<a name="Vector2+multiply"></a>

### vector2.multiply(v) ⇒ <code>[Vector2](#Vector2)</code>
Multiply the x and y coordinate values of this vector by the values of another vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2+multiplyScalar"></a>

### vector2.multiplyScalar(scalar) ⇒ <code>[Vector2](#Vector2)</code>
Multiply the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>Number</code> | The scalar. |

<a name="Vector2+invert"></a>

### vector2.invert() ⇒ <code>[Vector2](#Vector2)</code>
Inverts this vector. Same as multiply(-1.0).

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  
<a name="Vector2+angle"></a>

### vector2.angle() ⇒ <code>Number</code>
Returns the angle of this vector in relation to the coordinate system.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The angle in radians.  
<a name="Vector2+distance"></a>

### vector2.distance(vec) ⇒ <code>Number</code>
Returns the euclidean distance between this vector and another vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The euclidean distance between the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2+distanceSq"></a>

### vector2.distanceSq(vec) ⇒ <code>Number</code>
Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The squared euclidean distance of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+clockwise"></a>

### vector2.clockwise(vec) ⇒ <code>Number</code>
Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+relativeClockwise"></a>

### vector2.relativeClockwise(center, vec) ⇒ <code>Number</code>
Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to an arbitrary third vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to an arbitrary third vector.  

| Param | Type | Description |
| --- | --- | --- |
| center | <code>[Vector2](#Vector2)</code> | The central vector. |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |

<a name="Vector2+rotate"></a>

### vector2.rotate(angle) ⇒ <code>[Vector2](#Vector2)</code>
Rotates this vector by a given number of radians around the origin of the coordinate system.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>Number</code> | The angle in radians to rotate the vector. |

<a name="Vector2+rotateAround"></a>

### vector2.rotateAround(angle, vec) ⇒ <code>[Vector2](#Vector2)</code>
Rotates this vector around another vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>Number</code> | The angle in radians to rotate the vector. |
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
| [offsetAngle] | <code>Number</code> | <code>0.0</code> | An additional amount of radians to rotate the vector. |

<a name="Vector2+rotateAwayFrom"></a>

### vector2.rotateAwayFrom(vec, center, angle)
Rotates the vector away from a specified vector around a center.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | The vector this one is rotated away from. |
| center | <code>[Vector2](#Vector2)</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="Vector2+getRotateAwayFromAngle"></a>

### vector2.getRotateAwayFromAngle(vec, center, angle) ⇒ <code>Number</code>
Returns the angle in radians used to rotate this vector away from a given vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | The vector this one is rotated away from. |
| center | <code>[Vector2](#Vector2)</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="Vector2+getRotateTowardsAngle"></a>

### vector2.getRotateTowardsAngle(vec, center, angle) ⇒ <code>Number</code>
Returns the angle in radians used to rotate this vector towards a given vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | The vector this one is rotated towards to. |
| center | <code>[Vector2](#Vector2)</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="Vector2+getRotateToAngle"></a>

### vector2.getRotateToAngle(vec, center) ⇒ <code>Number</code>
Gets the angles between this vector and another vector around a common center of rotation.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The angle between this vector and another vector around a center of rotation in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | Another vector. |
| center | <code>[Vector2](#Vector2)</code> | The center of rotation. |

<a name="Vector2+isInPolygon"></a>

### vector2.isInPolygon(polygon) ⇒ <code>Boolean</code>
Checks whether a vector lies within a polygon spanned by a set of vectors.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this vector is within a polygon.  

| Param | Type | Description |
| --- | --- | --- |
| polygon | <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code> | An array of vectors spanning the polygon. |

<a name="Vector2+length"></a>

### vector2.length() ⇒ <code>Number</code>
Returns the length of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The length of this vector.  
<a name="Vector2+lengthSq"></a>

### vector2.lengthSq() ⇒ <code>Number</code>
Returns the square of the length of this vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The square of the length of this vector.  
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

### vector2.whichSide(vecA, vecB) ⇒ <code>Number</code>
Calculates which side of a line spanned by two vectors this vector is.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - A number indicating the side of this vector, given a line spanned by two other vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2+sameSideAs"></a>

### vector2.sameSideAs(vecA, vecB, vecC) ⇒ <code>Boolean</code>
Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.

**Kind**: instance method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Boolean</code> - Returns a boolean indicating whether or not this vector is on the same side as another vector.  

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
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2.multiplyScalar"></a>

### Vector2.multiplyScalar(vec, scalar) ⇒ <code>[Vector2](#Vector2)</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#Vector2)</code> | A vector. |
| scalar | <code>Number</code> | A scalar. |

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

### Vector2.normals(vecA, vecB) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code>
Returns the normals of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code> - An array containing the two normals, each represented by a vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector spanning the line. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector spanning the line. |

<a name="Vector2.units"></a>

### Vector2.units(vecA, vecB) ⇒ <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code>
Returns the unit (normalized normal) vectors of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[[ &#x27;Array&#x27; ].&lt;Vector2&gt;](#Vector2)</code> - An array containing the two unit vectors.  

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

<a name="Vector2.divideScalar"></a>

### Vector2.divideScalar(vecA, s) ⇒ <code>[Vector2](#Vector2)</code>
Divides a vector by a scalar and returns the result as new vector.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The fraction of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | The dividend. |
| s | <code>Number</code> | The scalar. |

<a name="Vector2.dot"></a>

### Vector2.dot(vecA, vecB) ⇒ <code>Number</code>
Returns the dot product of two vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The dot product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2.angle"></a>

### Vector2.angle(vecA, vecB) ⇒ <code>Number</code>
Returns the angle between two vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The angle between two vectors in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2.threePointangle"></a>

### Vector2.threePointangle(vecA, vecB, vecC) ⇒ <code>Number</code>
Returns the angle between two vectors based on a third vector in between.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#Vector2)</code> | A (central) vector. |
| vecC | <code>[Vector2](#Vector2)</code> | A vector. |

<a name="Vector2.scalarProjection"></a>

### Vector2.scalarProjection(vecA, vecB) ⇒ <code>Number</code>
Returns the scalar projection of a vector on another vector.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>Number</code> - The scalar component.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#Vector2)</code> | The vector to be projected. |
| vecB | <code>[Vector2](#Vector2)</code> | The vector to be projection upon. |

<a name="Vector2.averageDirection"></a>

### Vector2.averageDirection(vecs) ⇒ <code>[Vector2](#Vector2)</code>
Returns the average vector (normalized) of the input vectors.

**Kind**: static method of <code>[Vector2](#Vector2)</code>  
**Returns**: <code>[Vector2](#Vector2)</code> - The resulting vector (normalized).  

| Param | Type | Description |
| --- | --- | --- |
| vecs | <code>Array</code> | An array containing vectors. |

<a name="Vertex"></a>

## Vertex
A class representing a vertex.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The id of this vertex. |
| value | <code>[Atom](#Atom)</code> | The atom associated with this vertex. |
| position | <code>[Vector2](#Vector2)</code> | The position of this vertex. |
| previousPosition | <code>[Vector2](#Vector2)</code> | The position of the previous vertex. |
| parentVertexId | <code>Number</code> &#124; <code>null</code> | The id of the previous vertex. |
| children | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | The ids of the children of this vertex. |
| spanningTreeChildren | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | The ids of the children of this vertex as defined in the spanning tree defined by the SMILES. |
| edges | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | The ids of edges associated with this vertex. |
| positioned | <code>Boolean</code> | A boolean indicating whether or not this vertex has been positioned. |
| angle | <code>Number</code> | The angle of this vertex. |
| dir | <code>Number</code> | The direction of this vertex. |
| neighbourCount | <code>Number</code> | The number of neighbouring vertices. |
| neighbours | <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> | The vertex ids of neighbouring vertices. |
| neighbouringElements | <code>[ &#x27;Array&#x27; ].&lt;String&gt;</code> | The element symbols associated with neighbouring vertices. |
| forcePositioned | <code>Boolean</code> | A boolean indicating whether or not this vertex was positioned using a force-based approach. |


* [Vertex](#Vertex)
    * [new Vertex(value, [x], [y])](#new_Vertex_new)
    * [.setPosition(x, y)](#Vertex+setPosition)
    * [.setPositionFromVector(v)](#Vertex+setPositionFromVector)
    * [.addChild(vertexId)](#Vertex+addChild)
    * [.addRingbondChild(vertexId, ringbondIndex)](#Vertex+addRingbondChild)
    * [.setParentVertexId(parentVertexId)](#Vertex+setParentVertexId)
    * [.isTerminal()](#Vertex+isTerminal) ⇒ <code>Boolean</code>
    * [.clone()](#Vertex+clone) ⇒ <code>[Vertex](#Vertex)</code>
    * [.equals(vertex)](#Vertex+equals) ⇒ <code>Boolean</code>
    * [.getAngle([referenceVector], [returnAsDegrees])](#Vertex+getAngle) ⇒ <code>Number</code>
    * [.getTextDirection(vertices)](#Vertex+getTextDirection) ⇒ <code>String</code>
    * [.getNeighbours([vertexId])](#Vertex+getNeighbours) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
    * [.getDrawnNeighbours(vertices)](#Vertex+getDrawnNeighbours) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
    * [.getNeighbourCount()](#Vertex+getNeighbourCount) ⇒ <code>Number</code>
    * [.getSpanningTreeNeighbours([vertexId])](#Vertex+getSpanningTreeNeighbours) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
    * [.getNextInRing(vertices, ringId, previousVertexId)](#Vertex+getNextInRing) ⇒ <code>Number</code>

<a name="new_Vertex_new"></a>

### new Vertex(value, [x], [y])
The constructor for the class Vertex.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>[Atom](#Atom)</code> |  | The value associated with this vertex. |
| [x] | <code>Number</code> | <code>0</code> | The initial x coordinate of the positional vector of this vertex. |
| [y] | <code>Number</code> | <code>0</code> | The initial y coordinate of the positional vector of this vertex. |

<a name="Vertex+setPosition"></a>

### vertex.setPosition(x, y)
Set the 2D coordinates of the vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x component of the coordinates. |
| y | <code>Number</code> | The y component of the coordinates. |

<a name="Vertex+setPositionFromVector"></a>

### vertex.setPositionFromVector(v)
Set the 2D coordinates of the vertex from a Vector2.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>[Vector2](#Vector2)</code> | A 2D vector. |

<a name="Vertex+addChild"></a>

### vertex.addChild(vertexId)
Add a child vertex id to this vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | The id of a vertex to be added as a child to this vertex. |

<a name="Vertex+addRingbondChild"></a>

### vertex.addRingbondChild(vertexId, ringbondIndex)
Add a child vertex id to this vertex as the second child of the neighbours array,except this vertex is the first vertex of the SMILE string, then it is added as the first.This is used to get the correct ordering of neighbours for parity calculations.If a hydrogen is implicitly attached to the chiral center, insert as the third child.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | The id of a vertex to be added as a child to this vertex. |
| ringbondIndex | <code>Number</code> | The index of the ringbond. |

<a name="Vertex+setParentVertexId"></a>

### vertex.setParentVertexId(parentVertexId)
Set the vertex id of the parent.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| parentVertexId | <code>Number</code> | The parents vertex id. |

<a name="Vertex+isTerminal"></a>

### vertex.isTerminal() ⇒ <code>Boolean</code>
Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this vertex is terminal.  
<a name="Vertex+clone"></a>

### vertex.clone() ⇒ <code>[Vertex](#Vertex)</code>
Clones this vertex and returns the clone.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>[Vertex](#Vertex)</code> - A clone of this vertex.  
<a name="Vertex+equals"></a>

### vertex.equals(vertex) ⇒ <code>Boolean</code>
Returns true if this vertex and the supplied vertex both have the same id, else returns false.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two vertices have the same id.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#Vertex)</code> | The vertex to check. |

<a name="Vertex+getAngle"></a>

### vertex.getAngle([referenceVector], [returnAsDegrees]) ⇒ <code>Number</code>
Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>Number</code> - The angle of this vertex.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [referenceVector] | <code>[Vector2](#Vector2)</code> | <code></code> | The reference vector. |
| [returnAsDegrees] | <code>Boolean</code> | <code>false</code> | If true, returns angle in degrees, else in radians. |

<a name="Vertex+getTextDirection"></a>

### vertex.getTextDirection(vertices) ⇒ <code>String</code>
Returns the suggested text direction when text is added at the position of this vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>String</code> - The suggested direction of the text.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | The array of vertices for the current molecule. |

<a name="Vertex+getNeighbours"></a>

### vertex.getNeighbours([vertexId]) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns an array of ids of neighbouring vertices.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array containing the ids of neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>Number</code> | <code></code> | If a value is supplied, the vertex with this id is excluded from the returned indices. |

<a name="Vertex+getDrawnNeighbours"></a>

### vertex.getDrawnNeighbours(vertices) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array containing the ids of neighbouring vertices that will be drawn.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | An array containing the vertices associated with the current molecule. |

<a name="Vertex+getNeighbourCount"></a>

### vertex.getNeighbourCount() ⇒ <code>Number</code>
Returns the number of neighbours of this vertex.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>Number</code> - The number of neighbours.  
<a name="Vertex+getSpanningTreeNeighbours"></a>

### vertex.getSpanningTreeNeighbours([vertexId]) ⇒ <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code>
Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;Number&gt;</code> - An array containing the ids of the neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>Number</code> | <code></code> | If supplied, the vertex with this id is excluded from the array returned. |

<a name="Vertex+getNextInRing"></a>

### vertex.getNextInRing(vertices, ringId, previousVertexId) ⇒ <code>Number</code>
Gets the next vertex in the ring in opposide direction to the supplied vertex id.

**Kind**: instance method of <code>[Vertex](#Vertex)</code>  
**Returns**: <code>Number</code> - The id of the next vertex in the ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[[ &#x27;Array&#x27; ].&lt;Vertex&gt;](#Vertex)</code> | The array of vertices for the current molecule. |
| ringId | <code>Number</code> | The id of the ring containing this vertex. |
| previousVertexId | <code>Number</code> | The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex. |


* * *
