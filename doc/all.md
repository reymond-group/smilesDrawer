[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

## Members

<dl>
<dt><a href="#maxBonds">maxBonds</a></dt>
<dd><p>A map mapping element symbols to their maximum bonds.</p>
</dd>
<dt><a href="#atomicNumbers">atomicNumbers</a></dt>
<dd><p>A map mapping element symbols to the atomic number.</p>
</dd>
<dt><a href="#mass">mass</a></dt>
<dd><p>A map mapping element symbols to the atomic mass.</p>
</dd>
<dt><a href="#bonds">bonds</a> ⇒ <code>Object</code></dt>
<dd><p>An object mapping the bond type to the number of bonds.</p>
</dd>
<dt><a href="#radFactor">radFactor</a></dt>
<dd><p>The factor to convert degrees to radians.</p>
</dd>
<dt><a href="#degFactor">degFactor</a></dt>
<dd><p>The factor to convert radians to degrees.</p>
</dd>
<dt><a href="#twoPI">twoPI</a></dt>
<dd><p>Two times PI.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#clone">clone(arr)</a> ⇒ <code>*</code></dt>
<dd><p>Clone an array or an object. If an object is passed, a shallow clone will be created.</p>
</dd>
<dt><a href="#print">print(arr)</a> ⇒ <code>String</code></dt>
<dd><p>Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.</p>
</dd>
<dt><a href="#each">each(arr, callback)</a></dt>
<dd><p>Run a function for each element in the array. The element is supplied as an argument for the callback function</p>
</dd>
<dt><a href="#get">get(arr, property, value)</a> ⇒ <code>*</code></dt>
<dd><p>Return the array element from an array containing objects, where a property of the object is set to a given value.</p>
</dd>
<dt><a href="#contains">contains(arr, options)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.</p>
</dd>
<dt><a href="#intersection">intersection(arrA, arrB)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.</p>
</dd>
<dt><a href="#unique">unique(arr)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array of unique elements contained in an array.</p>
</dd>
<dt><a href="#count">count(arr, value)</a> ⇒ <code>Number</code></dt>
<dd><p>Count the number of occurences of a value in an array.</p>
</dd>
<dt><a href="#toggle">toggle(arr, value)</a> ⇒ <code>Array</code></dt>
<dd><p>Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.</p>
</dd>
<dt><a href="#remove">remove(arr, value)</a> ⇒ <code>Array</code></dt>
<dd><p>Remove a value from an array.</p>
</dd>
<dt><a href="#removeUnique">removeUnique(arr, value)</a> ⇒ <code>Array</code></dt>
<dd><p>Remove a value from an array with unique values.</p>
</dd>
<dt><a href="#removeAll">removeAll(arrA, arrB)</a> ⇒ <code>Array</code></dt>
<dd><p>Remove all elements contained in one array from another array.</p>
</dd>
<dt><a href="#merge">merge(arrA, arrB)</a> ⇒ <code>Array</code></dt>
<dd><p>Merges two arrays and returns the result. The first array will be appended to the second array.</p>
</dd>
<dt><a href="#containsAll">containsAll(arrA, arrB)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not an array contains all the elements of another array, without regard to the order.</p>
</dd>
<dt><a href="#sortByAtomicNumberDesc">sortByAtomicNumberDesc(arr)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...</p>
</dd>
<dt><a href="#deepCopy">deepCopy(arr)</a> ⇒ <code>Array</code></dt>
<dd><p>Copies a an n-dimensional array.</p>
</dd>
<dt><a href="#addNeighbouringElement">addNeighbouringElement(element)</a></dt>
<dd><p>Adds a neighbouring element to this atom.</p>
</dd>
<dt><a href="#attachPseudoElement">attachPseudoElement(element, previousElement, [hydrogenCount], [charge])</a></dt>
<dd><p>Attaches a pseudo element (e.g. Ac) to the atom.</p>
</dd>
<dt><a href="#getAttachedPseudoElements">getAttachedPseudoElements()</a> ⇒ <code>Object</code></dt>
<dd><p>Returns the attached pseudo elements sorted by hydrogen count (ascending).</p>
</dd>
<dt><a href="#getAttachedPseudoElementsCount">getAttachedPseudoElementsCount()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of attached pseudo elements.</p>
</dd>
<dt><a href="#isHeteroAtom">isHeteroAtom()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns whether this atom is a heteroatom (not C and not H).</p>
</dd>
<dt><a href="#addAnchoredRing">addAnchoredRing(ringId)</a></dt>
<dd><p>Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.</p>
</dd>
<dt><a href="#getRingbondCount">getRingbondCount()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.</p>
</dd>
<dt><a href="#backupRings">backupRings()</a></dt>
<dd><p>Backs up the current rings.</p>
</dd>
<dt><a href="#restoreRings">restoreRings()</a></dt>
<dd><p>Restores the most recent backed up rings.</p>
</dd>
<dt><a href="#haveCommonRingbond">haveCommonRingbond(atomA, atomB)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.</p>
</dd>
<dt><a href="#neighbouringElementsEqual">neighbouringElementsEqual(arr)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check whether or not the neighbouring elements of this atom equal the supplied array.</p>
</dd>
<dt><a href="#getAtomicNumber">getAtomicNumber()</a> ⇒ <code>Number</code></dt>
<dd><p>Get the atomic number of this atom.</p>
</dd>
<dt><a href="#getMaxBonds">getMaxBonds()</a> ⇒ <code>Number</code></dt>
<dd><p>Get the maximum number of bonds for this atom.</p>
</dd>
<dt><a href="#updateSize">updateSize(width, height)</a></dt>
<dd><p>Update the width and height of the canvas</p>
</dd>
<dt><a href="#setTheme">setTheme(theme)</a></dt>
<dd><p>Sets a provided theme.</p>
</dd>
<dt><a href="#scale">scale(vertices)</a></dt>
<dd><p>Scale the canvas based on vertex positions.</p>
</dd>
<dt><a href="#reset">reset()</a></dt>
<dd><p>Resets the transform of the canvas.</p>
</dd>
<dt><a href="#getColor">getColor(key)</a> ⇒ <code>String</code></dt>
<dd><p>Returns the hex code of a color associated with a key from the current theme.</p>
</dd>
<dt><a href="#drawCircle">drawCircle(x, y, radius, color, [fill], [debug], [debugText])</a></dt>
<dd><p>Draws a circle to a canvas context.</p>
</dd>
<dt><a href="#drawLine">drawLine(line, [dashed], [alpha])</a></dt>
<dd><p>Draw a line to a canvas.</p>
</dd>
<dt><a href="#drawWedge">drawWedge(line, width)</a></dt>
<dd><p>Draw a wedge on the canvas.</p>
</dd>
<dt><a href="#drawDashedWedge">drawDashedWedge(line)</a></dt>
<dd><p>Draw a dashed wedge on the canvas.</p>
</dd>
<dt><a href="#drawDebugText">drawDebugText(x, y, text)</a></dt>
<dd><p>Draws a debug text message at a given position</p>
</dd>
<dt><a href="#drawBall">drawBall(x, y, elementName)</a></dt>
<dd><p>Draw a ball to the canvas.</p>
</dd>
<dt><a href="#drawPoint">drawPoint(x, y, elementName)</a></dt>
<dd><p>Draw a point to the canvas.</p>
</dd>
<dt><a href="#drawText">drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, attachedPseudoElements)</a></dt>
<dd><p>Draw a text to the canvas.</p>
</dd>
<dt><a href="#getChargeText">getChargeText(charge)</a> ⇒ <code>String</code></dt>
<dd><p>Translate the integer indicating the charge to the appropriate text.</p>
</dd>
<dt><a href="#drawDebugPoint">drawDebugPoint(x, y, [debugText], [color])</a></dt>
<dd><p>Draws a dubug dot at a given coordinate and adds text.</p>
</dd>
<dt><a href="#drawAromaticityRing">drawAromaticityRing(ring)</a></dt>
<dd><p>Draws a ring inside a provided ring, indicating aromaticity.</p>
</dd>
<dt><a href="#clear">clear()</a></dt>
<dd><p>Clear the canvas.</p>
</dd>
<dt><a href="#extend">extend()</a></dt>
<dd><p>A helper method to extend the default options with user supplied ones.</p>
</dd>
<dt><a href="#draw">draw(data, target, themeName, infoOnly)</a></dt>
<dd><p>Draws the parsed smiles data to a canvas element.</p>
</dd>
<dt><a href="#edgeRingCount">edgeRingCount(edgeId)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of rings this edge is a part of.</p>
</dd>
<dt><a href="#getBridgedRings">getBridgedRings()</a> ⇒ <code>Array.&lt;Ring&gt;</code></dt>
<dd><p>Returns an array containing the bridged rings associated with this  molecule.</p>
</dd>
<dt><a href="#getFusedRings">getFusedRings()</a> ⇒ <code>Array.&lt;Ring&gt;</code></dt>
<dd><p>Returns an array containing all fused rings associated with this molecule.</p>
</dd>
<dt><a href="#getSpiros">getSpiros()</a> ⇒ <code>Array.&lt;Ring&gt;</code></dt>
<dd><p>Returns an array containing all spiros associated with this molecule.</p>
</dd>
<dt><a href="#printRingInfo">printRingInfo()</a> ⇒ <code>String</code></dt>
<dd><p>Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings)</p>
</dd>
<dt><a href="#getTotalOverlapScore">getTotalOverlapScore()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the total overlap score of the current molecule.</p>
</dd>
<dt><a href="#getRingCount">getRingCount()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the ring count of the current molecule.</p>
</dd>
<dt><a href="#hasBridgedRing">hasBridgedRing()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not the current molecule  a bridged ring.</p>
</dd>
<dt><a href="#getHeavyAtomCount">getHeavyAtomCount()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of heavy atoms (non-hydrogen) in the current molecule.</p>
</dd>
<dt><a href="#getRingbondType">getRingbondType(vertexA, vertexB)</a> ⇒ <code>String</code> | <code>null</code></dt>
<dd><p>Returns the type of the ringbond (e.g. &#39;=&#39; for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.</p>
</dd>
<dt><a href="#initRings">initRings()</a></dt>
<dd><p>Initializes rings and ringbonds for the current molecule.</p>
</dd>
<dt><a href="#getBridgedRingRings">getBridgedRingRings(ringId)</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.</p>
</dd>
<dt><a href="#isPartOfBridgedRing">isPartOfBridgedRing(ringId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not a ring is part of a bridged ring.</p>
</dd>
<dt><a href="#createBridgedRing">createBridgedRing(ringIds, sourceVertexId)</a> ⇒ <code>Ring</code></dt>
<dd><p>Creates a bridged ring.</p>
</dd>
<dt><a href="#areVerticesInSameRing">areVerticesInSameRing(vertexA, vertexB)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not two vertices are in the same ring.</p>
</dd>
<dt><a href="#getCommonRings">getCommonRings(vertexA, vertexB)</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns an array of ring ids shared by both vertices.</p>
</dd>
<dt><a href="#getLargestOrAromaticCommonRing">getLargestOrAromaticCommonRing(vertexA, vertexB)</a> ⇒ <code>Ring</code> | <code>null</code></dt>
<dd><p>Returns the aromatic or largest ring shared by the two vertices.</p>
</dd>
<dt><a href="#getVerticesAt">getVerticesAt(position, radius, excludeVertexId)</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns an array of vertices positioned at a specified location.</p>
</dd>
<dt><a href="#getClosestVertex">getClosestVertex(vertex)</a> ⇒ <code>Vertex</code></dt>
<dd><p>Returns the closest vertex (connected as well as unconnected).</p>
</dd>
<dt><a href="#addRing">addRing(ring)</a> ⇒ <code>Number</code></dt>
<dd><p>Add a ring to this representation of a molecule.</p>
</dd>
<dt><a href="#removeRing">removeRing(ringId)</a></dt>
<dd><p>Removes a ring from the array of rings associated with the current molecule.</p>
</dd>
<dt><a href="#getRing">getRing(ringId)</a> ⇒ <code>Ring</code></dt>
<dd><p>Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.</p>
</dd>
<dt><a href="#addRingConnection">addRingConnection(ringConnection)</a> ⇒ <code>Number</code></dt>
<dd><p>Add a ring connection to this representation of a molecule.</p>
</dd>
<dt><a href="#removeRingConnection">removeRingConnection(ringConnectionId)</a></dt>
<dd><p>Removes a ring connection from the array of rings connections associated with the current molecule.</p>
</dd>
<dt><a href="#removeRingConnectionsBetween">removeRingConnectionsBetween(vertexIdA, vertexIdB)</a></dt>
<dd><p>Removes all ring connections between two vertices.</p>
</dd>
<dt><a href="#getRingConnection">getRingConnection(id)</a> ⇒ <code>RingConnection</code></dt>
<dd><p>Get a ring connection with a given id.</p>
</dd>
<dt><a href="#getRingConnections">getRingConnections(ringId, ringIds)</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Get the ring connections between a ring and a set of rings.</p>
</dd>
<dt><a href="#getOverlapScore">getOverlapScore()</a> ⇒ <code>Object</code></dt>
<dd><p>Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.</p>
</dd>
<dt><a href="#chooseSide">chooseSide(vertexA, vertexB, sides)</a> ⇒ <code>Object</code></dt>
<dd><p>When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.</p>
</dd>
<dt><a href="#setRingCenter">setRingCenter(ring)</a></dt>
<dd><p>Sets the center for a ring.</p>
</dd>
<dt><a href="#getSubringCenter">getSubringCenter(ring, vertex)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Gets the center of a ring contained within a bridged ring and containing a given vertex.</p>
</dd>
<dt><a href="#drawEdges">drawEdges(debug)</a></dt>
<dd><p>Draw the actual edges as bonds to the canvas.</p>
</dd>
<dt><a href="#drawEdge">drawEdge(edgeId, debug)</a></dt>
<dd><p>Draw the an edge as a bonds to the canvas.</p>
</dd>
<dt><a href="#drawVertices">drawVertices(debug)</a></dt>
<dd><p>Draws the vertices representing atoms to the canvas.</p>
</dd>
<dt><a href="#position">position()</a></dt>
<dd><p>Position the vertices according to their bonds and properties.</p>
</dd>
<dt><a href="#backupRingInformation">backupRingInformation()</a></dt>
<dd><p>Stores the current information associated with rings.</p>
</dd>
<dt><a href="#restoreRingInformation">restoreRingInformation()</a></dt>
<dd><p>Restores the most recently backed up information associated with rings.</p>
</dd>
<dt><a href="#createRing">createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])</a></dt>
<dd><p>Creates a new ring, that is, positiones all the vertices inside a ring.</p>
</dd>
<dt><a href="#rotateSubtree">rotateSubtree(vertexId, parentVertexId, angle, center)</a></dt>
<dd><p>Rotate an entire subtree by an angle around a center.</p>
</dd>
<dt><a href="#getSubtreeOverlapScore">getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the overlap score of a subtree.</p>
</dd>
<dt><a href="#getCurrentCenterOfMass">getCurrentCenterOfMass()</a> ⇒ <code>Vector2</code></dt>
<dd><p>Returns the current (positioned vertices so far) center of mass.</p>
</dd>
<dt><a href="#getCurrentCenterOfMassInNeigbourhood">getCurrentCenterOfMassInNeigbourhood(vec, [r])</a> ⇒ <code>Vector2</code></dt>
<dd><p>Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.</p>
</dd>
<dt><a href="#resolvePrimaryOverlaps">resolvePrimaryOverlaps()</a></dt>
<dd><p>Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.</p>
</dd>
<dt><a href="#resolveSecondaryOverlaps">resolveSecondaryOverlaps(scores)</a></dt>
<dd><p>Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.</p>
</dd>
<dt><a href="#createNextBond">createNextBond(vertex, [previousVertex], [previousAngle], [dir], [skipPositioning])</a></dt>
<dd><p>Positiones the next vertex thus creating a bond.</p>
</dd>
<dt><a href="#getCommonRingbondNeighbour">getCommonRingbondNeighbour(vertex)</a> ⇒ <code>Number</code> | <code>null</code></dt>
<dd><p>Gets the vetex sharing the edge that is the common bond of two rings.</p>
</dd>
<dt><a href="#isPointInRing">isPointInRing(vec)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if a vector is inside any ring.</p>
</dd>
<dt><a href="#isEdgeInRing">isEdgeInRing(edge)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check whether or not an edge is part of a ring.</p>
</dd>
<dt><a href="#isEdgeRotatable">isEdgeRotatable(edge)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check whether or not an edge is rotatable.</p>
</dd>
<dt><a href="#isRingAromatic">isRingAromatic(ring)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).</p>
</dd>
<dt><a href="#getEdgeNormals">getEdgeNormals(edge)</a> ⇒ <code>Array.&lt;Vector2&gt;</code></dt>
<dd><p>Get the normals of an edge.</p>
</dd>
<dt><a href="#getBondCount">getBondCount(vertex)</a> ⇒ <code>Number</code></dt>
<dd><p>Gets the number of bonds of a vertex.</p>
</dd>
<dt><a href="#getNonRingNeighbours">getNonRingNeighbours(vertexId)</a> ⇒ <code>Array.&lt;Vertex&gt;</code></dt>
<dd><p>Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).</p>
</dd>
<dt><a href="#annotateStereochemistry">annotateStereochemistry()</a></dt>
<dd><p>Annotaed stereochemistry information for visualization.</p>
</dd>
<dt><a href="#visitStereochemistry">visitStereochemistry(vertexId, previousVertexId, visited, priority, maxDepth, depth)</a></dt>
<dd></dd>
<dt><a href="#initPseudoElements">initPseudoElements()</a></dt>
<dd><p>Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon sets
the involved atoms not to be displayed.</p>
</dd>
<dt><a href="#setBondType">setBondType(bondType)</a></dt>
<dd><p>Set the bond type of this edge. This also sets the edge weight.</p>
</dd>
<dt><a href="#_init">_init(node, parentVertexId, isBranch)</a></dt>
<dd><p>PRIVATE FUNCTION. Initializing the graph from the parse tree.</p>
</dd>
<dt><a href="#_initInfos">_initInfos()</a></dt>
<dd><p>PRIVATE FUNCTION. Initializes element counts etc.</p>
</dd>
<dt><a href="#clear">clear()</a></dt>
<dd><p>Clears all the elements in this graph (edges and vertices).</p>
</dd>
<dt><a href="#addVertex">addVertex(vertex)</a> ⇒ <code>Number</code></dt>
<dd><p>Add a vertex to the graph.</p>
</dd>
<dt><a href="#addEdge">addEdge(edge)</a> ⇒ <code>Number</code></dt>
<dd><p>Add an edge to the graph.</p>
</dd>
<dt><a href="#getEdge">getEdge(vertexIdA, vertexIdB)</a> ⇒ <code>Edge</code> | <code>null</code></dt>
<dd><p>Returns the edge between two given vertices.</p>
</dd>
<dt><a href="#getEdges">getEdges(vertexId)</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns the ids of edges connected to a vertex.</p>
</dd>
<dt><a href="#hasEdge">hasEdge(vertexIdA, vertexIdB)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check whether or not two vertices are connected by an edge.</p>
</dd>
<dt><a href="#getVertexList">getVertexList()</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns an array containing the vertex ids of this graph.</p>
</dd>
<dt><a href="#getEdgeList">getEdgeList()</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Returns an array containing source, target arrays of this graphs edges.</p>
</dd>
<dt><a href="#getAdjacencyMatrix">getAdjacencyMatrix()</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Get the adjacency matrix of the graph.</p>
</dd>
<dt><a href="#getComponentsAdjacencyMatrix">getComponentsAdjacencyMatrix()</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.</p>
</dd>
<dt><a href="#getSubgraphAdjacencyMatrix">getSubgraphAdjacencyMatrix(vertexIds)</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Get the adjacency matrix of a subgraph.</p>
</dd>
<dt><a href="#getDistanceMatrix">getDistanceMatrix()</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Get the distance matrix of the graph.</p>
</dd>
<dt><a href="#getSubgraphDistanceMatrix">getSubgraphDistanceMatrix(vertexIds)</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Get the distance matrix of a subgraph.</p>
</dd>
<dt><a href="#getAdjacencyList">getAdjacencyList()</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Get the adjacency list of the graph.</p>
</dd>
<dt><a href="#getSubgraphAdjacencyList">getSubgraphAdjacencyList(vertexIds)</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Get the adjacency list of a subgraph.</p>
</dd>
<dt><a href="#getBridges">getBridges()</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.</p>
</dd>
<dt><a href="#traverseBF">traverseBF(startVertexId, callback)</a></dt>
<dd><p>Traverses the graph in breadth-first order.</p>
</dd>
<dt><a href="#getTreeDepth">getTreeDepth(vertexId, parentVertexId)</a> ⇒ <code>Number</code></dt>
<dd><p>Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.</p>
</dd>
<dt><a href="#traverseTree">traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst], [depth], [visited])</a></dt>
<dd><p>Traverse a sub-tree in the graph.</p>
</dd>
<dt><a href="#kkLayout">kkLayout(vertexIds, outAdditionallyPositioned, center, startVertexId, ring)</a></dt>
<dd><p>Positiones the (sub)graph using Kamada and Kawais algorithm for drawing general undirected graphs. <a href="https://pdfs.semanticscholar.org/b8d3/bca50ccc573c5cb99f7d201e8acce6618f04.pdf">https://pdfs.semanticscholar.org/b8d3/bca50ccc573c5cb99f7d201e8acce6618f04.pdf</a></p>
</dd>
<dt><a href="#_bridgeDfs">_bridgeDfs()</a></dt>
<dd><p>PRIVATE FUNCTION used by getBridges().</p>
</dd>
<dt><a href="#getConnectedComponents">getConnectedComponents(adjacencyMatrix)</a> ⇒ <code>Array.&lt;Set&gt;</code></dt>
<dd><p>Returns the connected components of the graph.</p>
</dd>
<dt><a href="#getConnectedComponentCount">getConnectedComponentCount(adjacencyMatrix)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of connected components for the graph.</p>
</dd>
<dt><a href="#_ccCountDfs">_ccCountDfs()</a></dt>
<dd><p>PRIVATE FUNCTION used by getConnectedComponentCount().</p>
</dd>
<dt><a href="#_ccGetDfs">_ccGetDfs()</a></dt>
<dd><p>PRIVATE FUNCTION used by getConnectedComponents().</p>
</dd>
<dt><a href="#clone">clone()</a> ⇒ <code>Line</code></dt>
<dd><p>Clones this line and returns the clone.</p>
</dd>
<dt><a href="#getLength">getLength()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the length of this line.</p>
</dd>
<dt><a href="#getAngle">getAngle()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the angle of the line in relation to the coordinate system (the x-axis).</p>
</dd>
<dt><a href="#getRightVector">getRightVector()</a> ⇒ <code>Vector2</code></dt>
<dd><p>Returns the right vector (the vector with the larger x value).</p>
</dd>
<dt><a href="#getLeftVector">getLeftVector()</a> ⇒ <code>Vector2</code></dt>
<dd><p>Returns the left vector (the vector with the smaller x value).</p>
</dd>
<dt><a href="#getRightElement">getRightElement()</a> ⇒ <code>String</code></dt>
<dd><p>Returns the element associated with the right vector (the vector with the larger x value).</p>
</dd>
<dt><a href="#getLeftElement">getLeftElement()</a> ⇒ <code>String</code></dt>
<dd><p>Returns the element associated with the left vector (the vector with the smaller x value).</p>
</dd>
<dt><a href="#getRightChiral">getRightChiral()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.</p>
</dd>
<dt><a href="#getLeftChiral">getLeftChiral()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.</p>
</dd>
<dt><a href="#setRightVector">setRightVector(x, y)</a> ⇒ <code>Line</code></dt>
<dd><p>Set the value of the right vector.</p>
</dd>
<dt><a href="#setLeftVector">setLeftVector(x, y)</a> ⇒ <code>Line</code></dt>
<dd><p>Set the value of the left vector.</p>
</dd>
<dt><a href="#rotateToXAxis">rotateToXAxis()</a> ⇒ <code>Line</code></dt>
<dd><p>Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.</p>
</dd>
<dt><a href="#rotate">rotate(theta)</a> ⇒ <code>Line</code></dt>
<dd><p>Rotate the line by a given value (in radians). The center of rotation is the left vector.</p>
</dd>
<dt><a href="#shortenFrom">shortenFrom(by)</a> ⇒ <code>Line</code></dt>
<dd><p>Shortens this line from the &quot;from&quot; direction by a given value (in pixels).</p>
</dd>
<dt><a href="#shortenTo">shortenTo(by)</a> ⇒ <code>Line</code></dt>
<dd><p>Shortens this line from the &quot;to&quot; direction by a given value (in pixels).</p>
</dd>
<dt><a href="#shortenRight">shortenRight(by)</a> ⇒ <code>Line</code></dt>
<dd><p>Shorten the right side.</p>
</dd>
<dt><a href="#shortenLeft">shortenLeft(by)</a> ⇒ <code>Line</code></dt>
<dd><p>Shorten the left side.</p>
</dd>
<dt><a href="#shorten">shorten(by)</a> ⇒ <code>Line</code></dt>
<dd><p>Shortens this line from both directions by a given value (in pixels).</p>
</dd>
<dt><a href="#round">round(value, decimals)</a> ⇒ <code>Number</code></dt>
<dd><p>Rounds a value to a given number of decimals.</p>
</dd>
<dt><a href="#meanAngle">meanAngle(arr)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the means of the angles contained in an array. In radians.</p>
</dd>
<dt><a href="#innerAngle">innerAngle(n)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the inner angle of a n-sided regular polygon.</p>
</dd>
<dt><a href="#polyCircumradius">polyCircumradius(s, n)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the circumradius of a n-sided regular polygon with a given side-length.</p>
</dd>
<dt><a href="#apothem">apothem(r, n)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the apothem of a regular n-sided polygon based on its radius.</p>
</dd>
<dt><a href="#centralAngle">centralAngle(n)</a> ⇒ <code>Number</code></dt>
<dd><p>The central angle of a n-sided regular polygon. In radians.</p>
</dd>
<dt><a href="#toDeg">toDeg(rad)</a> ⇒ <code>Number</code></dt>
<dd><p>Convertes radians to degrees.</p>
</dd>
<dt><a href="#toRad">toRad(deg)</a> ⇒ <code>Number</code></dt>
<dd><p>Converts degrees to radians.</p>
</dd>
<dt><a href="#parityOfPermutation">parityOfPermutation(arr)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the parity of the permutation (1 or -1)</p>
</dd>
<dt><a href="#clone">clone()</a> ⇒ <code>Ring</code></dt>
<dd><p>Clones this ring and returns the clone.</p>
</dd>
<dt><a href="#getSize">getSize()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the size (number of members) of this ring.</p>
</dd>
<dt><a href="#getPolygon">getPolygon(vertices)</a> ⇒ <code>Array.&lt;Vector2&gt;</code></dt>
<dd><p>Gets the polygon representation (an array of the ring-members positional vectors) of this ring.</p>
</dd>
<dt><a href="#getAngle">getAngle()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the angle of this ring in relation to the coordinate system.</p>
</dd>
<dt><a href="#eachMember">eachMember(vertices, callback, startVertexId, previousVertexId)</a></dt>
<dd><p>Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.</p>
</dd>
<dt><a href="#getOrderedNeighbours">getOrderedNeighbours(ringConnections)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Returns an array containing the neighbouring rings of this ring ordered by ring size.</p>
</dd>
<dt><a href="#isBenzeneLike">isBenzeneLike(vertices)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.</p>
</dd>
<dt><a href="#getDoubleBondCount">getDoubleBondCount(vertices)</a> ⇒ <code>Number</code></dt>
<dd><p>Get the number of double bonds inside this ring.</p>
</dd>
<dt><a href="#contains">contains(vertexId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not this ring contains a member with a given vertex id.</p>
</dd>
<dt><a href="#addVertex">addVertex(vertexId)</a></dt>
<dd><p>Adding a vertex to the ring connection.</p>
</dd>
<dt><a href="#updateOther">updateOther(ringId, otherRingId)</a></dt>
<dd><p>Update the ring id of this ring connection that is not the ring id supplied as the second argument.</p>
</dd>
<dt><a href="#containsRing">containsRing(ringId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns a boolean indicating whether or not a ring with a given id is participating in this ring connection.</p>
</dd>
<dt><a href="#isBridge">isBridge(vertices)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not this ring connection is a bridge in a bridged ring.</p>
</dd>
<dt><a href="#isBridge">isBridge(ringConnections, vertices, firstRingId, secondRingId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not two rings are connected by a bridged bond.</p>
</dd>
<dt><a href="#getNeighbours">getNeighbours(ringConnections, ringId)</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Retruns the neighbouring rings of a given ring.</p>
</dd>
<dt><a href="#getVertices">getVertices(ringConnections, firstRingId, secondRingId)</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns an array of vertex ids associated with a given ring connection.</p>
</dd>
<dt><a href="#getRings">getRings(graph)</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.</p>
</dd>
<dt><a href="#matrixToString">matrixToString(matrix)</a> ⇒ <code>String</code></dt>
<dd><p>Creates a printable string from a matrix (2D array).</p>
</dd>
<dt><a href="#getPathIncludedDistanceMatrices">getPathIncludedDistanceMatrices(adjacencyMatrix)</a> ⇒ <code>Object</code></dt>
<dd><p>Returnes the two path-included distance matrices used to find the sssr.</p>
</dd>
<dt><a href="#getRingCandidates">getRingCandidates(d, pe, pe_prime)</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Get the ring candidates from the path-included distance matrices.</p>
</dd>
<dt><a href="#getSSSR">getSSSR(c, d, adjacencyMatrix, pe, pe_prime, arrBondCount, arrRingCount, nsssr)</a> ⇒ <code>Array.&lt;Set&gt;</code></dt>
<dd><p>Searches the candidates for the smallest set of smallest rings.</p>
</dd>
<dt><a href="#getEdgeCount">getEdgeCount(adjacencyMatrix)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of edges in a graph defined by an adjacency matrix.</p>
</dd>
<dt><a href="#getEdgeList">getEdgeList(adjacencyMatrix)</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Returns an edge list constructed form an adjacency matrix.</p>
</dd>
<dt><a href="#bondsToAtoms">bondsToAtoms(bonds)</a> ⇒ <code>Set.&lt;Number&gt;</code></dt>
<dd><p>Return a set of vertex indices contained in an array of bonds.</p>
</dd>
<dt><a href="#getBondCount">getBondCount(atoms, adjacencyMatrix)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of bonds within a set of atoms.</p>
</dd>
<dt><a href="#pathSetsContain">pathSetsContain(pathSets, pathSet, bonds, allBonds, arrBondCount, arrRingCount)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not a given path already exists in an array of paths.</p>
</dd>
<dt><a href="#areSetsEqual">areSetsEqual(setA, setB)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not two sets are equal (contain the same elements).</p>
</dd>
<dt><a href="#isSupersetOf">isSupersetOf(setA, setB)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not a set (setA) is a superset of another set (setB).</p>
</dd>
<dt><a href="#clone">clone()</a> ⇒ <code>Vector2</code></dt>
<dd><p>Clones this vector and returns the clone.</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>String</code></dt>
<dd><p>Returns a string representation of this vector.</p>
</dd>
<dt><a href="#add">add(vec)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.</p>
</dd>
<dt><a href="#subtract">subtract(vec)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.</p>
</dd>
<dt><a href="#divide">divide(scalar)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Divide the x and y coordinate values of this vector by a scalar.</p>
</dd>
<dt><a href="#multiply">multiply(v)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Multiply the x and y coordinate values of this vector by the values of another vector.</p>
</dd>
<dt><a href="#multiplyScalar">multiplyScalar(scalar)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Multiply the x and y coordinate values of this vector by a scalar.</p>
</dd>
<dt><a href="#invert">invert()</a> ⇒ <code>Vector2</code></dt>
<dd><p>Inverts this vector. Same as multiply(-1.0).</p>
</dd>
<dt><a href="#angle">angle()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the angle of this vector in relation to the coordinate system.</p>
</dd>
<dt><a href="#distance">distance(vec)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the euclidean distance between this vector and another vector.</p>
</dd>
<dt><a href="#distanceSq">distanceSq(vec)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).</p>
</dd>
<dt><a href="#clockwise">clockwise(vec)</a> ⇒ <code>Number</code></dt>
<dd><p>Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.</p>
</dd>
<dt><a href="#relativeClockwise">relativeClockwise(center, vec)</a> ⇒ <code>Number</code></dt>
<dd><p>Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to an arbitrary third vector.</p>
</dd>
<dt><a href="#rotate">rotate(angle)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Rotates this vector by a given number of radians around the origin of the coordinate system.</p>
</dd>
<dt><a href="#rotateAround">rotateAround(angle, vec)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Rotates this vector around another vector.</p>
</dd>
<dt><a href="#rotateTo">rotateTo(vec, center, [offsetAngle])</a> ⇒ <code>Vector2</code></dt>
<dd><p>Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.</p>
</dd>
<dt><a href="#rotateAwayFrom">rotateAwayFrom(vec, center, angle)</a></dt>
<dd><p>Rotates the vector away from a specified vector around a center.</p>
</dd>
<dt><a href="#getRotateAwayFromAngle">getRotateAwayFromAngle(vec, center, angle)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the angle in radians used to rotate this vector away from a given vector.</p>
</dd>
<dt><a href="#getRotateTowardsAngle">getRotateTowardsAngle(vec, center, angle)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the angle in radians used to rotate this vector towards a given vector.</p>
</dd>
<dt><a href="#getRotateToAngle">getRotateToAngle(vec, center)</a> ⇒ <code>Number</code></dt>
<dd><p>Gets the angles between this vector and another vector around a common center of rotation.</p>
</dd>
<dt><a href="#isInPolygon">isInPolygon(polygon)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether a vector lies within a polygon spanned by a set of vectors.</p>
</dd>
<dt><a href="#length">length()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the length of this vector.</p>
</dd>
<dt><a href="#lengthSq">lengthSq()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the square of the length of this vector.</p>
</dd>
<dt><a href="#normalize">normalize()</a> ⇒ <code>Vector2</code></dt>
<dd><p>Normalizes this vector.</p>
</dd>
<dt><a href="#normalized">normalized()</a> ⇒ <code>Vector2</code></dt>
<dd><p>Returns a normalized copy of this vector.</p>
</dd>
<dt><a href="#whichSide">whichSide(vecA, vecB)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates which side of a line spanned by two vectors this vector is.</p>
</dd>
<dt><a href="#sameSideAs">sameSideAs(vecA, vecB, vecC)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.</p>
</dd>
<dt><a href="#add">add(vecA, vecB)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Adds two vectors and returns the result as a new vector.</p>
</dd>
<dt><a href="#subtract">subtract(vecA, vecB)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Subtracts one vector from another and returns the result as a new vector.</p>
</dd>
<dt><a href="#multiply">multiply(vecA, vecB)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Multiplies two vectors (value by value) and returns the result.</p>
</dd>
<dt><a href="#multiplyScalar">multiplyScalar(vec, scalar)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Multiplies two vectors (value by value) and returns the result.</p>
</dd>
<dt><a href="#midpoint">midpoint(vecA, vecB)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Returns the midpoint of a line spanned by two vectors.</p>
</dd>
<dt><a href="#normals">normals(vecA, vecB)</a> ⇒ <code>Array.&lt;Vector2&gt;</code></dt>
<dd><p>Returns the normals of a line spanned by two vectors.</p>
</dd>
<dt><a href="#units">units(vecA, vecB)</a> ⇒ <code>Array.&lt;Vector2&gt;</code></dt>
<dd><p>Returns the unit (normalized normal) vectors of a line spanned by two vectors.</p>
</dd>
<dt><a href="#divide">divide(vecA, vecB)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Divides a vector by another vector and returns the result as new vector.</p>
</dd>
<dt><a href="#divideScalar">divideScalar(vecA, s)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Divides a vector by a scalar and returns the result as new vector.</p>
</dd>
<dt><a href="#dot">dot(vecA, vecB)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the dot product of two vectors.</p>
</dd>
<dt><a href="#angle">angle(vecA, vecB)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the angle between two vectors.</p>
</dd>
<dt><a href="#threePointangle">threePointangle(vecA, vecB, vecC)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the angle between two vectors based on a third vector in between.</p>
</dd>
<dt><a href="#scalarProjection">scalarProjection(vecA, vecB)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the scalar projection of a vector on another vector.</p>
</dd>
<dt><a href="#averageDirection">averageDirection(vecs)</a> ⇒ <code>Vector2</code></dt>
<dd><p>Returns the average vector (normalized) of the input vectors.</p>
</dd>
<dt><a href="#setPosition">setPosition(x, y)</a></dt>
<dd><p>Set the 2D coordinates of the vertex.</p>
</dd>
<dt><a href="#setPositionFromVector">setPositionFromVector(v)</a></dt>
<dd><p>Set the 2D coordinates of the vertex from a Vector2.</p>
</dd>
<dt><a href="#addChild">addChild(vertexId)</a></dt>
<dd><p>Add a child vertex id to this vertex.</p>
</dd>
<dt><a href="#addRingbondChild">addRingbondChild(vertexId, ringbondIndex)</a></dt>
<dd><p>Add a child vertex id to this vertex as the second child of the neighbours array,
except this vertex is the first vertex of the SMILE string, then it is added as the first.
This is used to get the correct ordering of neighbours for parity calculations.
If a hydrogen is implicitly attached to the chiral center, insert as the third child.</p>
</dd>
<dt><a href="#setParentVertexId">setParentVertexId(parentVertexId)</a></dt>
<dd><p>Set the vertex id of the parent.</p>
</dd>
<dt><a href="#isTerminal">isTerminal()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.</p>
</dd>
<dt><a href="#clone">clone()</a> ⇒ <code>Vertex</code></dt>
<dd><p>Clones this vertex and returns the clone.</p>
</dd>
<dt><a href="#equals">equals(vertex)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns true if this vertex and the supplied vertex both have the same id, else returns false.</p>
</dd>
<dt><a href="#getAngle">getAngle([referenceVector], [returnAsDegrees])</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.</p>
</dd>
<dt><a href="#getTextDirection">getTextDirection(vertices)</a> ⇒ <code>String</code></dt>
<dd><p>Returns the suggested text direction when text is added at the position of this vertex.</p>
</dd>
<dt><a href="#getNeighbours">getNeighbours([vertexId])</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns an array of ids of neighbouring vertices.</p>
</dd>
<dt><a href="#getDrawnNeighbours">getDrawnNeighbours(vertices)</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).</p>
</dd>
<dt><a href="#getNeighbourCount">getNeighbourCount()</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of neighbours of this vertex.</p>
</dd>
<dt><a href="#getSpanningTreeNeighbours">getSpanningTreeNeighbours([vertexId])</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.</p>
</dd>
<dt><a href="#getNextInRing">getNextInRing(vertices, ringId, previousVertexId)</a> ⇒ <code>Number</code></dt>
<dd><p>Gets the next vertex in the ring in opposide direction to the supplied vertex id.</p>
</dd>
</dl>

<a name="maxBonds"></a>

## maxBonds
A map mapping element symbols to their maximum bonds.

**Kind**: global variable  
<a name="atomicNumbers"></a>

## atomicNumbers
A map mapping element symbols to the atomic number.

**Kind**: global variable  
<a name="mass"></a>

## mass
A map mapping element symbols to the atomic mass.

**Kind**: global variable  
<a name="bonds"></a>

## bonds ⇒ <code>Object</code>
An object mapping the bond type to the number of bonds.

**Kind**: global variable  
**Returns**: <code>Object</code> - The object containing the map.  
<a name="radFactor"></a>

## radFactor
The factor to convert degrees to radians.

**Kind**: global variable  
<a name="degFactor"></a>

## degFactor
The factor to convert radians to degrees.

**Kind**: global variable  
<a name="twoPI"></a>

## twoPI
Two times PI.

**Kind**: global variable  
<a name="clone"></a>

## clone(arr) ⇒ <code>\*</code>
Clone an array or an object. If an object is passed, a shallow clone will be created.

**Kind**: global function  
**Returns**: <code>\*</code> - A clone of the array or object.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>\*</code> | The array or object to be cloned. |

<a name="print"></a>

## print(arr) ⇒ <code>String</code>
Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.

**Kind**: global function  
**Returns**: <code>String</code> - A string representation of the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;Object&gt;</code> | An array. |
| arr[].id | <code>\*</code> | If the array contains an object with the property 'id', the properties value is printed. Else, the array elements value is printend. |

<a name="each"></a>

## each(arr, callback)
Run a function for each element in the array. The element is supplied as an argument for the callback function

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| callback | <code>function</code> | The callback function that is called for each element. |

<a name="get"></a>

## get(arr, property, value) ⇒ <code>\*</code>
Return the array element from an array containing objects, where a property of the object is set to a given value.

**Kind**: global function  
**Returns**: <code>\*</code> - The array element matching the value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| property | <code>String</code> &#124; <code>Number</code> | A property contained within an object in the array. |
| value | <code>String</code> &#124; <code>Number</code> | The value of the property. |

<a name="contains"></a>

## contains(arr, options) ⇒ <code>Boolean</code>
Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean whether or not the array contains a value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| options | <code>Object</code> | See method description. |
| options.value | <code>\*</code> | The value for which to check. |
| [options.property] | <code>String</code> | The property on which to check. |
| [options.func] | <code>function</code> | A custom property function. |

<a name="intersection"></a>

## intersection(arrA, arrB) ⇒ <code>Array</code>
Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.

**Kind**: global function  
**Returns**: <code>Array</code> - The intersecting vlaues.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="unique"></a>

## unique(arr) ⇒ <code>Array</code>
Returns an array of unique elements contained in an array.

**Kind**: global function  
**Returns**: <code>Array</code> - An array of unique elements contained within the array supplied as an argument.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |

<a name="count"></a>

## count(arr, value) ⇒ <code>Number</code>
Count the number of occurences of a value in an array.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of occurences of a value in the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be counted. |

<a name="toggle"></a>

## toggle(arr, value) ⇒ <code>Array</code>
Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.

**Kind**: global function  
**Returns**: <code>Array</code> - The toggled array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be toggled. |

<a name="remove"></a>

## remove(arr, value) ⇒ <code>Array</code>
Remove a value from an array.

**Kind**: global function  
**Returns**: <code>Array</code> - A new array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="removeUnique"></a>

## removeUnique(arr, value) ⇒ <code>Array</code>
Remove a value from an array with unique values.

**Kind**: global function  
**Returns**: <code>Array</code> - An array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="removeAll"></a>

## removeAll(arrA, arrB) ⇒ <code>Array</code>
Remove all elements contained in one array from another array.

**Kind**: global function  
**Returns**: <code>Array</code> - The filtered array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | The array to be filtered. |
| arrB | <code>Array</code> | The array containing elements that will be removed from the other array. |

<a name="merge"></a>

## merge(arrA, arrB) ⇒ <code>Array</code>
Merges two arrays and returns the result. The first array will be appended to the second array.

**Kind**: global function  
**Returns**: <code>Array</code> - The merged array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="containsAll"></a>

## containsAll(arrA, arrB) ⇒ <code>Boolean</code>
Checks whether or not an array contains all the elements of another array, without regard to the order.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not both array contain the same elements.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="sortByAtomicNumberDesc"></a>

## sortByAtomicNumberDesc(arr) ⇒ <code>Array.&lt;Object&gt;</code>
Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - The array sorted by atomic number. Example of an array entry: { atomicNumber: 2, vertexId: 5 }.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;Object&gt;</code> | An array of vertex ids with their associated atomic numbers. |
| arr[].vertexId | <code>Number</code> | A vertex id. |
| arr[].atomicNumber | <code>String</code> | The atomic number associated with the vertex id. |

<a name="deepCopy"></a>

## deepCopy(arr) ⇒ <code>Array</code>
Copies a an n-dimensional array.

**Kind**: global function  
**Returns**: <code>Array</code> - The copy.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array to be copied. |

<a name="addNeighbouringElement"></a>

## addNeighbouringElement(element)
Adds a neighbouring element to this atom.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>String</code> | A string representing an element. |

<a name="attachPseudoElement"></a>

## attachPseudoElement(element, previousElement, [hydrogenCount], [charge])
Attaches a pseudo element (e.g. Ac) to the atom.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>String</code> |  | The element identifier (e.g. Br, C, ...). |
| previousElement | <code>String</code> |  | The element that is part of the main chain (not the terminals that are converted to the pseudo element or concatinated). |
| [hydrogenCount] | <code>Number</code> | <code>0</code> | The number of hydrogens for the element. |
| [charge] | <code>Number</code> | <code>0</code> | The charge for the element. |

<a name="getAttachedPseudoElements"></a>

## getAttachedPseudoElements() ⇒ <code>Object</code>
Returns the attached pseudo elements sorted by hydrogen count (ascending).

**Kind**: global function  
**Returns**: <code>Object</code> - The sorted attached pseudo elements.  
<a name="getAttachedPseudoElementsCount"></a>

## getAttachedPseudoElementsCount() ⇒ <code>Number</code>
Returns the number of attached pseudo elements.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of attached pseudo elements.  
<a name="isHeteroAtom"></a>

## isHeteroAtom() ⇒ <code>Boolean</code>
Returns whether this atom is a heteroatom (not C and not H).

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether this atom is a heteroatom.  
<a name="addAnchoredRing"></a>

## addAnchoredRing(ringId)
Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="getRingbondCount"></a>

## getRingbondCount() ⇒ <code>Number</code>
Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of ringbonds this atom is connected to.  
<a name="backupRings"></a>

## backupRings()
Backs up the current rings.

**Kind**: global function  
<a name="restoreRings"></a>

## restoreRings()
Restores the most recent backed up rings.

**Kind**: global function  
<a name="haveCommonRingbond"></a>

## haveCommonRingbond(atomA, atomB) ⇒ <code>Boolean</code>
Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two atoms share a common ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| atomA | <code>Atom</code> | An atom. |
| atomB | <code>Atom</code> | An atom. |

<a name="neighbouringElementsEqual"></a>

## neighbouringElementsEqual(arr) ⇒ <code>Boolean</code>
Check whether or not the neighbouring elements of this atom equal the supplied array.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the neighbours match the supplied array of elements.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;String&gt;</code> | An array containing all the elements that are neighbouring this atom. E.g. ['C', 'O', 'O', 'N'] |

<a name="getAtomicNumber"></a>

## getAtomicNumber() ⇒ <code>Number</code>
Get the atomic number of this atom.

**Kind**: global function  
**Returns**: <code>Number</code> - The atomic number of this atom.  
<a name="getMaxBonds"></a>

## getMaxBonds() ⇒ <code>Number</code>
Get the maximum number of bonds for this atom.

**Kind**: global function  
**Returns**: <code>Number</code> - The maximum number of bonds of this atom.  
<a name="updateSize"></a>

## updateSize(width, height)
Update the width and height of the canvas

**Kind**: global function  

| Param | Type |
| --- | --- |
| width | <code>Number</code> | 
| height | <code>Number</code> | 

<a name="setTheme"></a>

## setTheme(theme)
Sets a provided theme.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>Object</code> | A theme from the smiles drawer options. |

<a name="scale"></a>

## scale(vertices)
Scale the canvas based on vertex positions.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | An array of vertices containing the vertices associated with the current molecule. |

<a name="reset"></a>

## reset()
Resets the transform of the canvas.

**Kind**: global function  
<a name="getColor"></a>

## getColor(key) ⇒ <code>String</code>
Returns the hex code of a color associated with a key from the current theme.

**Kind**: global function  
**Returns**: <code>String</code> - A color hex value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The color key in the theme (e.g. C, N, BACKGROUND, ...). |

<a name="drawCircle"></a>

## drawCircle(x, y, radius, color, [fill], [debug], [debugText])
Draws a circle to a canvas context.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>Number</code> |  | The x coordinate of the circles center. |
| y | <code>Number</code> |  | The y coordinate of the circles center. |
| radius | <code>Number</code> |  | The radius of the circle |
| color | <code>String</code> |  | A hex encoded color. |
| [fill] | <code>Boolean</code> | <code>true</code> | Whether to fill or stroke the circle. |
| [debug] | <code>Boolean</code> | <code>false</code> | Draw in debug mode. |
| [debugText] | <code>String</code> | <code>&#x27;&#x27;</code> | A debug message. |

<a name="drawLine"></a>

## drawLine(line, [dashed], [alpha])
Draw a line to a canvas.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>Line</code> |  | A line. |
| [dashed] | <code>Boolean</code> | <code>false</code> | Whether or not the line is dashed. |
| [alpha] | <code>Number</code> | <code>1.0</code> | The alpha value of the color. |

<a name="drawWedge"></a>

## drawWedge(line, width)
Draw a wedge on the canvas.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>Line</code> |  | A line. |
| width | <code>Number</code> | <code>1</code> | The wedge width. |

<a name="drawDashedWedge"></a>

## drawDashedWedge(line)
Draw a dashed wedge on the canvas.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>Line</code> | A line. |

<a name="drawDebugText"></a>

## drawDebugText(x, y, text)
Draws a debug text message at a given position

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x coordinate. |
| y | <code>Number</code> | The y coordinate. |
| text | <code>String</code> | The debug text. |

<a name="drawBall"></a>

## drawBall(x, y, elementName)
Draw a ball to the canvas.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x position of the text. |
| y | <code>Number</code> | The y position of the text. |
| elementName | <code>String</code> | The name of the element (single-letter). |

<a name="drawPoint"></a>

## drawPoint(x, y, elementName)
Draw a point to the canvas.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x position of the point. |
| y | <code>Number</code> | The y position of the point. |
| elementName | <code>String</code> | The name of the element (single-letter). |

<a name="drawText"></a>

## drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, attachedPseudoElements)
Draw a text to the canvas.

**Kind**: global function  

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
| attachedPseudoElements | <code>Array.&lt;Object&gt;</code> | A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count. |
| attachedPseudoElement[].element | <code>String</code> | The element symbol. |
| attachedPseudoElement[].count | <code>Number</code> | The number of occurences that match the key. |
| attachedPseudoElement[].hyrogenCount | <code>Number</code> | The number of hydrogens attached to each atom matching the key. |

<a name="getChargeText"></a>

## getChargeText(charge) ⇒ <code>String</code>
Translate the integer indicating the charge to the appropriate text.

**Kind**: global function  
**Returns**: <code>String</code> - A string representing a charge.  

| Param | Type | Description |
| --- | --- | --- |
| charge | <code>Number</code> | The integer indicating the charge. |

<a name="drawDebugPoint"></a>

## drawDebugPoint(x, y, [debugText], [color])
Draws a dubug dot at a given coordinate and adds text.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>Number</code> |  | The x coordinate. |
| y | <code>Number</code> |  | The y coordindate. |
| [debugText] | <code>String</code> | <code>&#x27;&#x27;</code> | A string. |
| [color] | <code>String</code> | <code>&#x27;#f00&#x27;</code> | A color in hex form. |

<a name="drawAromaticityRing"></a>

## drawAromaticityRing(ring)
Draws a ring inside a provided ring, indicating aromaticity.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A ring. |

<a name="clear"></a>

## clear()
Clear the canvas.

**Kind**: global function  
<a name="extend"></a>

## extend()
A helper method to extend the default options with user supplied ones.

**Kind**: global function  
<a name="draw"></a>

## draw(data, target, themeName, infoOnly)
Draws the parsed smiles data to a canvas element.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The tree returned by the smiles parser. |
| target | <code>String</code> &#124; <code>HTMLElement</code> |  | The id of the HTML canvas element the structure is drawn to - or the element itself. |
| themeName | <code>String</code> | <code>&#x27;dark&#x27;</code> | The name of the theme to use. Built-in themes are 'light' and 'dark'. |
| infoOnly | <code>Boolean</code> | <code>false</code> | Only output info on the molecule without drawing anything to the canvas. |

<a name="edgeRingCount"></a>

## edgeRingCount(edgeId) ⇒ <code>Number</code>
Returns the number of rings this edge is a part of.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of rings the provided edge is part of.  

| Param | Type | Description |
| --- | --- | --- |
| edgeId | <code>Number</code> | The id of an edge. |

<a name="getBridgedRings"></a>

## getBridgedRings() ⇒ <code>Array.&lt;Ring&gt;</code>
Returns an array containing the bridged rings associated with this  molecule.

**Kind**: global function  
**Returns**: <code>Array.&lt;Ring&gt;</code> - An array containing all bridged rings associated with this molecule.  
<a name="getFusedRings"></a>

## getFusedRings() ⇒ <code>Array.&lt;Ring&gt;</code>
Returns an array containing all fused rings associated with this molecule.

**Kind**: global function  
**Returns**: <code>Array.&lt;Ring&gt;</code> - An array containing all fused rings associated with this molecule.  
<a name="getSpiros"></a>

## getSpiros() ⇒ <code>Array.&lt;Ring&gt;</code>
Returns an array containing all spiros associated with this molecule.

**Kind**: global function  
**Returns**: <code>Array.&lt;Ring&gt;</code> - An array containing all spiros associated with this molecule.  
<a name="printRingInfo"></a>

## printRingInfo() ⇒ <code>String</code>
Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings)

**Kind**: global function  
**Returns**: <code>String</code> - A string as described in the method description.  
<a name="getTotalOverlapScore"></a>

## getTotalOverlapScore() ⇒ <code>Number</code>
Returns the total overlap score of the current molecule.

**Kind**: global function  
**Returns**: <code>Number</code> - The overlap score.  
<a name="getRingCount"></a>

## getRingCount() ⇒ <code>Number</code>
Returns the ring count of the current molecule.

**Kind**: global function  
**Returns**: <code>Number</code> - The ring count.  
<a name="hasBridgedRing"></a>

## hasBridgedRing() ⇒ <code>Boolean</code>
Checks whether or not the current molecule  a bridged ring.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the current molecule  a bridged ring.  
<a name="getHeavyAtomCount"></a>

## getHeavyAtomCount() ⇒ <code>Number</code>
Returns the number of heavy atoms (non-hydrogen) in the current molecule.

**Kind**: global function  
**Returns**: <code>Number</code> - The heavy atom count.  
<a name="getRingbondType"></a>

## getRingbondType(vertexA, vertexB) ⇒ <code>String</code> &#124; <code>null</code>
Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.

**Kind**: global function  
**Returns**: <code>String</code> &#124; <code>null</code> - Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="initRings"></a>

## initRings()
Initializes rings and ringbonds for the current molecule.

**Kind**: global function  
<a name="getBridgedRingRings"></a>

## getBridgedRingRings(ringId) ⇒ <code>Array.&lt;Number&gt;</code>
Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing all ring ids of rings part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="isPartOfBridgedRing"></a>

## isPartOfBridgedRing(ringId) ⇒ <code>Boolean</code>
Checks whether or not a ring is part of a bridged ring.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="createBridgedRing"></a>

## createBridgedRing(ringIds, sourceVertexId) ⇒ <code>Ring</code>
Creates a bridged ring.

**Kind**: global function  
**Returns**: <code>Ring</code> - The bridged ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringIds | <code>Array.&lt;Number&gt;</code> | An array of ids of rings involved in the bridged ring. |
| sourceVertexId | <code>Number</code> | The vertex id to start the bridged ring discovery from. |

<a name="areVerticesInSameRing"></a>

## areVerticesInSameRing(vertexA, vertexB) ⇒ <code>Boolean</code>
Checks whether or not two vertices are in the same ring.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two vertices are in the same ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="getCommonRings"></a>

## getCommonRings(vertexA, vertexB) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of ring ids shared by both vertices.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of ids of rings shared by the two vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="getLargestOrAromaticCommonRing"></a>

## getLargestOrAromaticCommonRing(vertexA, vertexB) ⇒ <code>Ring</code> &#124; <code>null</code>
Returns the aromatic or largest ring shared by the two vertices.

**Kind**: global function  
**Returns**: <code>Ring</code> &#124; <code>null</code> - If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="getVerticesAt"></a>

## getVerticesAt(position, radius, excludeVertexId) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of vertices positioned at a specified location.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing vertex ids in a given location.  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>Vector2</code> | The position to search for vertices. |
| radius | <code>Number</code> | The radius within to search. |
| excludeVertexId | <code>Number</code> | A vertex id to be excluded from the search results. |

<a name="getClosestVertex"></a>

## getClosestVertex(vertex) ⇒ <code>Vertex</code>
Returns the closest vertex (connected as well as unconnected).

**Kind**: global function  
**Returns**: <code>Vertex</code> - The closest vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | The vertex of which to find the closest other vertex. |

<a name="addRing"></a>

## addRing(ring) ⇒ <code>Number</code>
Add a ring to this representation of a molecule.

**Kind**: global function  
**Returns**: <code>Number</code> - The ring id of the new ring.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A new ring. |

<a name="removeRing"></a>

## removeRing(ringId)
Removes a ring from the array of rings associated with the current molecule.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="getRing"></a>

## getRing(ringId) ⇒ <code>Ring</code>
Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.

**Kind**: global function  
**Returns**: <code>Ring</code> - A ring associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="addRingConnection"></a>

## addRingConnection(ringConnection) ⇒ <code>Number</code>
Add a ring connection to this representation of a molecule.

**Kind**: global function  
**Returns**: <code>Number</code> - The ring connection id of the new ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnection | <code>RingConnection</code> | A new ringConnection. |

<a name="removeRingConnection"></a>

## removeRingConnection(ringConnectionId)
Removes a ring connection from the array of rings connections associated with the current molecule.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ringConnectionId | <code>Number</code> | A ring connection id. |

<a name="removeRingConnectionsBetween"></a>

## removeRingConnectionsBetween(vertexIdA, vertexIdB)
Removes all ring connections between two vertices.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="getRingConnection"></a>

## getRingConnection(id) ⇒ <code>RingConnection</code>
Get a ring connection with a given id.

**Kind**: global function  
**Returns**: <code>RingConnection</code> - The ring connection with the specified id.  

| Param | Type |
| --- | --- |
| id | <code>Number</code> | 

<a name="getRingConnections"></a>

## getRingConnections(ringId, ringIds) ⇒ <code>Array.&lt;Number&gt;</code>
Get the ring connections between a ring and a set of rings.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of ring connection ids.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |
| ringIds | <code>Array.&lt;Number&gt;</code> | An array of ring ids. |

<a name="getOverlapScore"></a>

## getOverlapScore() ⇒ <code>Object</code>
Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.

**Kind**: global function  
**Returns**: <code>Object</code> - Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }  
<a name="chooseSide"></a>

## chooseSide(vertexA, vertexB, sides) ⇒ <code>Object</code>
When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.

**Kind**: global function  
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
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |
| sides | <code>Array.&lt;Vector2&gt;</code> | An array containing the two normals of the line spanned by the two provided vertices. |

<a name="setRingCenter"></a>

## setRingCenter(ring)
Sets the center for a ring.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A ring. |

<a name="getSubringCenter"></a>

## getSubringCenter(ring, vertex) ⇒ <code>Vector2</code>
Gets the center of a ring contained within a bridged ring and containing a given vertex.

**Kind**: global function  
**Returns**: <code>Vector2</code> - The center of the subring that containing the vertex.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A bridged ring. |
| vertex | <code>Vertex</code> | A vertex. |

<a name="drawEdges"></a>

## drawEdges(debug)
Draw the actual edges as bonds to the canvas.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug helpers. |

<a name="drawEdge"></a>

## drawEdge(edgeId, debug)
Draw the an edge as a bonds to the canvas.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| edgeId | <code>Number</code> | An edge id. |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug helpers. |

<a name="drawVertices"></a>

## drawVertices(debug)
Draws the vertices representing atoms to the canvas.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug messages to the canvas. |

<a name="position"></a>

## position()
Position the vertices according to their bonds and properties.

**Kind**: global function  
<a name="backupRingInformation"></a>

## backupRingInformation()
Stores the current information associated with rings.

**Kind**: global function  
<a name="restoreRingInformation"></a>

## restoreRingInformation()
Restores the most recently backed up information associated with rings.

**Kind**: global function  
<a name="createRing"></a>

## createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])
Creates a new ring, that is, positiones all the vertices inside a ring.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ring | <code>Ring</code> |  | The ring to position. |
| [center] | <code>Vector2</code> &#124; <code>null</code> | <code></code> | The center of the ring to be created. |
| [startVertex] | <code>Vertex</code> &#124; <code>null</code> | <code></code> | The first vertex to be positioned inside the ring. |
| [previousVertex] | <code>Vertex</code> &#124; <code>null</code> | <code></code> | The last vertex that was positioned. |
| [previousVertex] | <code>Boolean</code> | <code>false</code> | A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it. |

<a name="rotateSubtree"></a>

## rotateSubtree(vertexId, parentVertexId, angle, center)
Rotate an entire subtree by an angle around a center.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>Number</code> | A vertex id in the previous direction of the subtree that is to rotate. |
| angle | <code>Number</code> | An angle in randians. |
| center | <code>Vector2</code> | The rotational center. |

<a name="getSubtreeOverlapScore"></a>

## getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) ⇒ <code>Object</code>
Gets the overlap score of a subtree.

**Kind**: global function  
**Returns**: <code>Object</code> - An object containing the total overlap score and the center of mass of the subtree weighted by overlap score { value: 0.2, center: new Vector2() }.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>Number</code> | A vertex id in the previous direction of the subtree. |
| vertexOverlapScores | <code>Array.&lt;Number&gt;</code> | An array containing the vertex overlap scores indexed by vertex id. |

<a name="getCurrentCenterOfMass"></a>

## getCurrentCenterOfMass() ⇒ <code>Vector2</code>
Returns the current (positioned vertices so far) center of mass.

**Kind**: global function  
**Returns**: <code>Vector2</code> - The current center of mass.  
<a name="getCurrentCenterOfMassInNeigbourhood"></a>

## getCurrentCenterOfMassInNeigbourhood(vec, [r]) ⇒ <code>Vector2</code>
Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.

**Kind**: global function  
**Returns**: <code>Vector2</code> - The current center of mass.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>Vector2</code> |  | The point at which to look for neighbours. |
| [r] | <code>Number</code> | <code>currentBondLength*2.0</code> | The radius of vertices to include. |

<a name="resolvePrimaryOverlaps"></a>

## resolvePrimaryOverlaps()
Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.

**Kind**: global function  
<a name="resolveSecondaryOverlaps"></a>

## resolveSecondaryOverlaps(scores)
Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| scores | <code>Array.&lt;Object&gt;</code> | An array of objects sorted descending by score. |
| scores[].id | <code>Number</code> | A vertex id. |
| scores[].score | <code>Number</code> | The overlap score associated with the vertex id. |

<a name="createNextBond"></a>

## createNextBond(vertex, [previousVertex], [previousAngle], [dir], [skipPositioning])
Positiones the next vertex thus creating a bond.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vertex | <code>Vertex</code> |  | A vertex. |
| [previousVertex] | <code>Vertex</code> | <code></code> | The previous vertex which has been positioned. |
| [previousAngle] | <code>Number</code> | <code>0.0</code> | The global angle of the previous vertex. |
| [dir] | <code>Number</code> | <code></code> | Either 1 or -1 to break ties (if no angle can be elucidated). |
| [skipPositioning] | <code>Boolean</code> | <code>false</code> | Whether or not to skip positioning and just check the neighbours. |

<a name="getCommonRingbondNeighbour"></a>

## getCommonRingbondNeighbour(vertex) ⇒ <code>Number</code> &#124; <code>null</code>
Gets the vetex sharing the edge that is the common bond of two rings.

**Kind**: global function  
**Returns**: <code>Number</code> &#124; <code>null</code> - The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | A vertex. |

<a name="isPointInRing"></a>

## isPointInRing(vec) ⇒ <code>Boolean</code>
Check if a vector is inside any ring.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | A vector. |

<a name="isEdgeInRing"></a>

## isEdgeInRing(edge) ⇒ <code>Boolean</code>
Check whether or not an edge is part of a ring.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the edge is part of a ring.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | An edge. |

<a name="isEdgeRotatable"></a>

## isEdgeRotatable(edge) ⇒ <code>Boolean</code>
Check whether or not an edge is rotatable.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the edge is rotatable.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | An edge. |

<a name="isRingAromatic"></a>

## isRingAromatic(ring) ⇒ <code>Boolean</code>
Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a ring is implicitly defined as aromatic.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A ring. |

<a name="getEdgeNormals"></a>

## getEdgeNormals(edge) ⇒ <code>Array.&lt;Vector2&gt;</code>
Get the normals of an edge.

**Kind**: global function  
**Returns**: <code>Array.&lt;Vector2&gt;</code> - An array containing two vectors, representing the normals.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | An edge. |

<a name="getBondCount"></a>

## getBondCount(vertex) ⇒ <code>Number</code>
Gets the number of bonds of a vertex.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of bonds the vertex participates in.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | A vertex. |

<a name="getNonRingNeighbours"></a>

## getNonRingNeighbours(vertexId) ⇒ <code>Array.&lt;Vertex&gt;</code>
Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).

**Kind**: global function  
**Returns**: <code>Array.&lt;Vertex&gt;</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="annotateStereochemistry"></a>

## annotateStereochemistry()
Annotaed stereochemistry information for visualization.

**Kind**: global function  
<a name="visitStereochemistry"></a>

## visitStereochemistry(vertexId, previousVertexId, visited, priority, maxDepth, depth)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | The id of a vertex. |
| previousVertexId | <code>Number</code> &#124; <code>null</code> | The id of the parent vertex of the vertex. |
| visited | <code>Uint8Array</code> | An array containing the visited flag for all vertices in the graph. |
| priority | <code>Array</code> | An array of arrays storing the atomic numbers for each level. |
| maxDepth | <code>Number</code> | The maximum depth. |
| depth | <code>Number</code> | The current depth. |

<a name="initPseudoElements"></a>

## initPseudoElements()
Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon setsthe involved atoms not to be displayed.

**Kind**: global function  
<a name="setBondType"></a>

## setBondType(bondType)
Set the bond type of this edge. This also sets the edge weight.

**Kind**: global function  

| Param | Type |
| --- | --- |
| bondType | <code>String</code> | 

<a name="_init"></a>

## _init(node, parentVertexId, isBranch)
PRIVATE FUNCTION. Initializing the graph from the parse tree.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>Object</code> |  | The current node in the parse tree. |
| parentVertexId | <code>Number</code> | <code></code> | The id of the previous vertex. |
| isBranch | <code>Boolean</code> | <code>false</code> | Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C). |

<a name="_initInfos"></a>

## _initInfos()
PRIVATE FUNCTION. Initializes element counts etc.

**Kind**: global function  
<a name="clear"></a>

## clear()
Clears all the elements in this graph (edges and vertices).

**Kind**: global function  
<a name="addVertex"></a>

## addVertex(vertex) ⇒ <code>Number</code>
Add a vertex to the graph.

**Kind**: global function  
**Returns**: <code>Number</code> - The vertex id of the new vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | A new vertex. |

<a name="addEdge"></a>

## addEdge(edge) ⇒ <code>Number</code>
Add an edge to the graph.

**Kind**: global function  
**Returns**: <code>Number</code> - The edge id of the new edge.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | A new edge. |

<a name="getEdge"></a>

## getEdge(vertexIdA, vertexIdB) ⇒ <code>Edge</code> &#124; <code>null</code>
Returns the edge between two given vertices.

**Kind**: global function  
**Returns**: <code>Edge</code> &#124; <code>null</code> - The edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="getEdges"></a>

## getEdges(vertexId) ⇒ <code>Array.&lt;Number&gt;</code>
Returns the ids of edges connected to a vertex.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the ids of edges connected to the vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="hasEdge"></a>

## hasEdge(vertexIdA, vertexIdB) ⇒ <code>Boolean</code>
Check whether or not two vertices are connected by an edge.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two vertices are connected by an edge.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="getVertexList"></a>

## getVertexList() ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array containing the vertex ids of this graph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing all vertex ids of this graph.  
<a name="getEdgeList"></a>

## getEdgeList() ⇒ <code>Array.&lt;Array&gt;</code>
Returns an array containing source, target arrays of this graphs edges.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - An array containing source, target arrays of this graphs edges. Example: [ [ 2, 5 ], [ 6, 9 ] ].  
<a name="getAdjacencyMatrix"></a>

## getAdjacencyMatrix() ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency matrix of the graph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency matrix of the molecular graph.  
<a name="getComponentsAdjacencyMatrix"></a>

## getComponentsAdjacencyMatrix() ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency matrix of the molecular graph with all bridges removed.  
<a name="getSubgraphAdjacencyMatrix"></a>

## getSubgraphAdjacencyMatrix(vertexIds) ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency matrix of a subgraph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency matrix of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="getDistanceMatrix"></a>

## getDistanceMatrix() ⇒ <code>Array.&lt;Array&gt;</code>
Get the distance matrix of the graph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The distance matrix of the graph.  
<a name="getSubgraphDistanceMatrix"></a>

## getSubgraphDistanceMatrix(vertexIds) ⇒ <code>Array.&lt;Array&gt;</code>
Get the distance matrix of a subgraph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The distance matrix of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="getAdjacencyList"></a>

## getAdjacencyList() ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency list of the graph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency list of the graph.  
<a name="getSubgraphAdjacencyList"></a>

## getSubgraphAdjacencyList(vertexIds) ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency list of a subgraph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency list of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="getBridges"></a>

## getBridges() ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the edge ids of the bridges.  
<a name="traverseBF"></a>

## traverseBF(startVertexId, callback)
Traverses the graph in breadth-first order.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| startVertexId | <code>Number</code> | The id of the starting vertex. |
| callback | <code>function</code> | The callback function to be called on every vertex. |

<a name="getTreeDepth"></a>

## getTreeDepth(vertexId, parentVertexId) ⇒ <code>Number</code>
Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.

**Kind**: global function  
**Returns**: <code>Number</code> - The depth of the sub-tree.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |
| parentVertexId | <code>Number</code> | The id of a neighbouring vertex. |

<a name="traverseTree"></a>

## traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst], [depth], [visited])
Traverse a sub-tree in the graph.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vertexId | <code>Number</code> |  | A vertex id. |
| parentVertexId | <code>Number</code> |  | A neighbouring vertex. |
| callback | <code>function</code> |  | The callback function that is called with each visited as an argument. |
| [maxDepth] | <code>Number</code> | <code>Number.MAX_SAFE_INTEGER</code> | The maximum depth of the recursion. |
| [ignoreFirst] | <code>Boolean</code> | <code>false</code> | Whether or not to ignore the starting vertex supplied as vertexId in the callback. |
| [depth] | <code>Number</code> | <code>1</code> | The current depth in the tree. |
| [visited] | <code>Uint8Array</code> | <code></code> | An array holding a flag on whether or not a node has been visited. |

<a name="kkLayout"></a>

## kkLayout(vertexIds, outAdditionallyPositioned, center, startVertexId, ring)
Positiones the (sub)graph using Kamada and Kawais algorithm for drawing general undirected graphs. https://pdfs.semanticscholar.org/b8d3/bca50ccc573c5cb99f7d201e8acce6618f04.pdf

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>Array.&lt;Number&gt;</code> | An array containing vertexIds to be placed using the force based layout. |
| outAdditionallyPositioned | <code>Array.&lt;Array&gt;</code> | Vertices connected to the bridged ring which were also positioned. Include the ring vertex id they are attached to in the form: [ [ vertexId, ringVertexId ] ]. |
| center | <code>Vector2</code> | The center of the layout. |
| startVertexId | <code>Number</code> | A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex. |
| ring | <code>Ring</code> | The bridged ring associated with this force-based layout. |

<a name="_bridgeDfs"></a>

## _bridgeDfs()
PRIVATE FUNCTION used by getBridges().

**Kind**: global function  
<a name="getConnectedComponents"></a>

## getConnectedComponents(adjacencyMatrix) ⇒ <code>Array.&lt;Set&gt;</code>
Returns the connected components of the graph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Set&gt;</code> - Connected components as sets.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="getConnectedComponentCount"></a>

## getConnectedComponentCount(adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of connected components for the graph.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of connected components of the supplied graph.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="_ccCountDfs"></a>

## _ccCountDfs()
PRIVATE FUNCTION used by getConnectedComponentCount().

**Kind**: global function  
<a name="_ccGetDfs"></a>

## _ccGetDfs()
PRIVATE FUNCTION used by getConnectedComponents().

**Kind**: global function  
<a name="clone"></a>

## clone() ⇒ <code>Line</code>
Clones this line and returns the clone.

**Kind**: global function  
**Returns**: <code>Line</code> - A clone of this line.  
<a name="getLength"></a>

## getLength() ⇒ <code>Number</code>
Returns the length of this line.

**Kind**: global function  
**Returns**: <code>Number</code> - The length of this line.  
<a name="getAngle"></a>

## getAngle() ⇒ <code>Number</code>
Returns the angle of the line in relation to the coordinate system (the x-axis).

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in radians.  
<a name="getRightVector"></a>

## getRightVector() ⇒ <code>Vector2</code>
Returns the right vector (the vector with the larger x value).

**Kind**: global function  
**Returns**: <code>Vector2</code> - The right vector.  
<a name="getLeftVector"></a>

## getLeftVector() ⇒ <code>Vector2</code>
Returns the left vector (the vector with the smaller x value).

**Kind**: global function  
**Returns**: <code>Vector2</code> - The left vector.  
<a name="getRightElement"></a>

## getRightElement() ⇒ <code>String</code>
Returns the element associated with the right vector (the vector with the larger x value).

**Kind**: global function  
**Returns**: <code>String</code> - The element associated with the right vector.  
<a name="getLeftElement"></a>

## getLeftElement() ⇒ <code>String</code>
Returns the element associated with the left vector (the vector with the smaller x value).

**Kind**: global function  
**Returns**: <code>String</code> - The element associated with the left vector.  
<a name="getRightChiral"></a>

## getRightChiral() ⇒ <code>Boolean</code>
Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.

**Kind**: global function  
**Returns**: <code>Boolean</code> - Whether or not the atom associated with the right vector is a chiral center.  
<a name="getLeftChiral"></a>

## getLeftChiral() ⇒ <code>Boolean</code>
Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.

**Kind**: global function  
**Returns**: <code>Boolean</code> - Whether or not the atom  associated with the left vector is a chiral center.  
<a name="setRightVector"></a>

## setRightVector(x, y) ⇒ <code>Line</code>
Set the value of the right vector.

**Kind**: global function  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x value. |
| y | <code>Number</code> | The y value. |

<a name="setLeftVector"></a>

## setLeftVector(x, y) ⇒ <code>Line</code>
Set the value of the left vector.

**Kind**: global function  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x value. |
| y | <code>Number</code> | The y value. |

<a name="rotateToXAxis"></a>

## rotateToXAxis() ⇒ <code>Line</code>
Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.

**Kind**: global function  
**Returns**: <code>Line</code> - This line.  
<a name="rotate"></a>

## rotate(theta) ⇒ <code>Line</code>
Rotate the line by a given value (in radians). The center of rotation is the left vector.

**Kind**: global function  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| theta | <code>Number</code> | The angle (in radians) to rotate the line. |

<a name="shortenFrom"></a>

## shortenFrom(by) ⇒ <code>Line</code>
Shortens this line from the "from" direction by a given value (in pixels).

**Kind**: global function  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="shortenTo"></a>

## shortenTo(by) ⇒ <code>Line</code>
Shortens this line from the "to" direction by a given value (in pixels).

**Kind**: global function  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="shortenRight"></a>

## shortenRight(by) ⇒ <code>Line</code>
Shorten the right side.

**Kind**: global function  
**Returns**: <code>Line</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="shortenLeft"></a>

## shortenLeft(by) ⇒ <code>Line</code>
Shorten the left side.

**Kind**: global function  
**Returns**: <code>Line</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="shorten"></a>

## shorten(by) ⇒ <code>Line</code>
Shortens this line from both directions by a given value (in pixels).

**Kind**: global function  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="round"></a>

## round(value, decimals) ⇒ <code>Number</code>
Rounds a value to a given number of decimals.

**Kind**: global function  
**Returns**: <code>Number</code> - A number rounded to a given number of decimals.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | A number. |
| decimals | <code>Number</code> | The number of decimals. |

<a name="meanAngle"></a>

## meanAngle(arr) ⇒ <code>Number</code>
Returns the means of the angles contained in an array. In radians.

**Kind**: global function  
**Returns**: <code>Number</code> - The mean angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;Number&gt;</code> | An array containing angles (in radians). |

<a name="innerAngle"></a>

## innerAngle(n) ⇒ <code>Number</code>
Returns the inner angle of a n-sided regular polygon.

**Kind**: global function  
**Returns**: <code>Number</code> - The inner angle of a given regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of sides of a regular polygon. |

<a name="polyCircumradius"></a>

## polyCircumradius(s, n) ⇒ <code>Number</code>
Returns the circumradius of a n-sided regular polygon with a given side-length.

**Kind**: global function  
**Returns**: <code>Number</code> - The circumradius of the regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>Number</code> | The side length of the regular polygon. |
| n | <code>Number</code> | The number of sides. |

<a name="apothem"></a>

## apothem(r, n) ⇒ <code>Number</code>
Returns the apothem of a regular n-sided polygon based on its radius.

**Kind**: global function  
**Returns**: <code>Number</code> - The apothem of a n-sided polygon based on its radius.  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>Number</code> | The radius. |
| n | <code>Number</code> | The number of edges of the regular polygon. |

<a name="centralAngle"></a>

## centralAngle(n) ⇒ <code>Number</code>
The central angle of a n-sided regular polygon. In radians.

**Kind**: global function  
**Returns**: <code>Number</code> - The central angle of the n-sided polygon in radians.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number of sides of the regular polygon. |

<a name="toDeg"></a>

## toDeg(rad) ⇒ <code>Number</code>
Convertes radians to degrees.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in degrees.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>Number</code> | An angle in radians. |

<a name="toRad"></a>

## toRad(deg) ⇒ <code>Number</code>
Converts degrees to radians.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| deg | <code>Number</code> | An angle in degrees. |

<a name="parityOfPermutation"></a>

## parityOfPermutation(arr) ⇒ <code>Number</code>
Returns the parity of the permutation (1 or -1)

**Kind**: global function  
**Returns**: <code>Number</code> - The parity of the permutation (1 or -1), where 1 means even and -1 means odd.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> &#124; <code>Uint8Array</code> | An array containing the permutation. |

<a name="clone"></a>

## clone() ⇒ <code>Ring</code>
Clones this ring and returns the clone.

**Kind**: global function  
**Returns**: <code>Ring</code> - A clone of this ring.  
<a name="getSize"></a>

## getSize() ⇒ <code>Number</code>
Returns the size (number of members) of this ring.

**Kind**: global function  
**Returns**: <code>Number</code> - The size (number of members) of this ring.  
<a name="getPolygon"></a>

## getPolygon(vertices) ⇒ <code>Array.&lt;Vector2&gt;</code>
Gets the polygon representation (an array of the ring-members positional vectors) of this ring.

**Kind**: global function  
**Returns**: <code>Array.&lt;Vector2&gt;</code> - An array of the positional vectors of the ring members.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | An array of vertices representing the current molecule. |

<a name="getAngle"></a>

## getAngle() ⇒ <code>Number</code>
Returns the angle of this ring in relation to the coordinate system.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in radians.  
<a name="eachMember"></a>

## eachMember(vertices, callback, startVertexId, previousVertexId)
Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | The vertices associated with the current molecule. |
| callback | <code>function</code> | A callback with the current vertex id as a parameter. |
| startVertexId | <code>Number</code> | The vertex id of the start vertex. |
| previousVertexId | <code>Number</code> | The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex). |

<a name="getOrderedNeighbours"></a>

## getOrderedNeighbours(ringConnections) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array containing the neighbouring rings of this ring ordered by ring size.

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - An array of neighbouring rings sorted by ring size. Example: { n: 5, neighbour: 1 }.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>Array.&lt;RingConnection&gt;</code> | An array of ring connections associated with the current molecule. |

<a name="isBenzeneLike"></a>

## isBenzeneLike(vertices) ⇒ <code>Boolean</code>
Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring is an implicitly defined benzene-like.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | An array of vertices associated with the current molecule. |

<a name="getDoubleBondCount"></a>

## getDoubleBondCount(vertices) ⇒ <code>Number</code>
Get the number of double bonds inside this ring.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of double bonds inside this ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | An array of vertices associated with the current molecule. |

<a name="contains"></a>

## contains(vertexId) ⇒ <code>Boolean</code>
Checks whether or not this ring contains a member with a given vertex id.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring contains a member with the given vertex id.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="addVertex"></a>

## addVertex(vertexId)
Adding a vertex to the ring connection.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="updateOther"></a>

## updateOther(ringId, otherRingId)
Update the ring id of this ring connection that is not the ring id supplied as the second argument.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. The new ring id to be set. |
| otherRingId | <code>Number</code> | A ring id. The id that is NOT to be updated. |

<a name="containsRing"></a>

## containsRing(ringId) ⇒ <code>Boolean</code>
Returns a boolean indicating whether or not a ring with a given id is participating in this ring connection.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a ring with a given id participates in this ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="isBridge"></a>

## isBridge(vertices) ⇒ <code>Boolean</code>
Checks whether or not this ring connection is a bridge in a bridged ring.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring connection is a bridge.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | The array of vertices associated with the current molecule. |

<a name="isBridge"></a>

## isBridge(ringConnections, vertices, firstRingId, secondRingId) ⇒ <code>Boolean</code>
Checks whether or not two rings are connected by a bridged bond.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two rings ar connected by a bridged bond.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>Array.&lt;RingConnection&gt;</code> | An array of ring connections containing the ring connections associated with the current molecule. |
| vertices | <code>Array.&lt;Vertex&gt;</code> | An array of vertices containing the vertices associated with the current molecule. |
| firstRingId | <code>Number</code> | A ring id. |
| secondRingId | <code>Number</code> | A ring id. |

<a name="getNeighbours"></a>

## getNeighbours(ringConnections, ringId) ⇒ <code>Array.&lt;Number&gt;</code>
Retruns the neighbouring rings of a given ring.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of ring ids of neighbouring rings.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>Array.&lt;RingConnection&gt;</code> | An array of ring connections containing ring connections associated with the current molecule. |
| ringId | <code>Number</code> | A ring id. |

<a name="getVertices"></a>

## getVertices(ringConnections, firstRingId, secondRingId) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of vertex ids associated with a given ring connection.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of vertex ids associated with the ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>Array.&lt;RingConnection&gt;</code> | An array of ring connections containing ring connections associated with the current molecule. |
| firstRingId | <code>Number</code> | A ring id. |
| secondRingId | <code>Number</code> | A ring id. |

<a name="getRings"></a>

## getRings(graph) ⇒ <code>Array.&lt;Array&gt;</code>
Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.  

| Param | Type | Description |
| --- | --- | --- |
| graph | <code>Graph</code> | A Graph object. |

<a name="matrixToString"></a>

## matrixToString(matrix) ⇒ <code>String</code>
Creates a printable string from a matrix (2D array).

**Kind**: global function  
**Returns**: <code>String</code> - A string representing the matrix.  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Array.&lt;Array&gt;</code> | A 2D array. |

<a name="getPathIncludedDistanceMatrices"></a>

## getPathIncludedDistanceMatrices(adjacencyMatrix) ⇒ <code>Object</code>
Returnes the two path-included distance matrices used to find the sssr.

**Kind**: global function  
**Returns**: <code>Object</code> - The path-included distance matrices. { p1, p2 }  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="getRingCandidates"></a>

## getRingCandidates(d, pe, pe_prime) ⇒ <code>Array.&lt;Array&gt;</code>
Get the ring candidates from the path-included distance matrices.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The ring candidates.  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>Array.&lt;Array&gt;</code> | The distance matrix. |
| pe | <code>Array.&lt;Array&gt;</code> | A matrix containing the shortest paths. |
| pe_prime | <code>Array.&lt;Array&gt;</code> | A matrix containing the shortest paths + one vertex. |

<a name="getSSSR"></a>

## getSSSR(c, d, adjacencyMatrix, pe, pe_prime, arrBondCount, arrRingCount, nsssr) ⇒ <code>Array.&lt;Set&gt;</code>
Searches the candidates for the smallest set of smallest rings.

**Kind**: global function  
**Returns**: <code>Array.&lt;Set&gt;</code> - The smallest set of smallest rings.  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>Array.&lt;Array&gt;</code> | The candidates. |
| d | <code>Array.&lt;Array&gt;</code> | The distance matrix. |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |
| pe | <code>Array.&lt;Array&gt;</code> | A matrix containing the shortest paths. |
| pe_prime | <code>Array.&lt;Array&gt;</code> | A matrix containing the shortest paths + one vertex. |
| arrBondCount | <code>Array.&lt;Number&gt;</code> | A matrix containing the bond count of each vertex. |
| arrRingCount | <code>Array.&lt;Number&gt;</code> | A matrix containing the number of rings associated with each vertex. |
| nsssr | <code>Number</code> | The theoretical number of rings in the graph. |

<a name="getEdgeCount"></a>

## getEdgeCount(adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of edges in a graph defined by an adjacency matrix.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of edges in the graph defined by the adjacency matrix.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="getEdgeList"></a>

## getEdgeList(adjacencyMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
Returns an edge list constructed form an adjacency matrix.

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="bondsToAtoms"></a>

## bondsToAtoms(bonds) ⇒ <code>Set.&lt;Number&gt;</code>
Return a set of vertex indices contained in an array of bonds.

**Kind**: global function  
**Returns**: <code>Set.&lt;Number&gt;</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| bonds | <code>Array</code> | An array of bonds. A bond is defined as [ sourceVertexId, targetVertexId ]. |

<a name="getBondCount"></a>

## getBondCount(atoms, adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of bonds within a set of atoms.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of bonds in a set of atoms.  

| Param | Type | Description |
| --- | --- | --- |
| atoms | <code>Set.&lt;Number&gt;</code> | An array of atom ids. |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="pathSetsContain"></a>

## pathSetsContain(pathSets, pathSet, bonds, allBonds, arrBondCount, arrRingCount) ⇒ <code>Boolean</code>
Checks whether or not a given path already exists in an array of paths.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a give path is contained within a set.  

| Param | Type | Description |
| --- | --- | --- |
| pathSets | <code>Array.&lt;Set&gt;</code> | An array of sets each representing a path. |
| pathSet | <code>Set.&lt;Number&gt;</code> | A set representing a path. |
| bonds | <code>Array.&lt;Array&gt;</code> | The bonds associated with the current path. |
| allBonds | <code>Array.&lt;Array&gt;</code> | All bonds currently associated with rings in the SSSR set. |
| arrBondCount | <code>Array.&lt;Number&gt;</code> | A matrix containing the bond count of each vertex. |
| arrRingCount | <code>Array.&lt;Number&gt;</code> | A matrix containing the number of rings associated with each vertex. |

<a name="areSetsEqual"></a>

## areSetsEqual(setA, setB) ⇒ <code>Boolean</code>
Checks whether or not two sets are equal (contain the same elements).

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two sets are equal.  

| Param | Type | Description |
| --- | --- | --- |
| setA | <code>Set.&lt;Number&gt;</code> | A set. |
| setB | <code>Set.&lt;Number&gt;</code> | A set. |

<a name="isSupersetOf"></a>

## isSupersetOf(setA, setB) ⇒ <code>Boolean</code>
Checks whether or not a set (setA) is a superset of another set (setB).

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not setB is a superset of setA.  

| Param | Type | Description |
| --- | --- | --- |
| setA | <code>Set.&lt;Number&gt;</code> | A set. |
| setB | <code>Set.&lt;Number&gt;</code> | A set. |

<a name="clone"></a>

## clone() ⇒ <code>Vector2</code>
Clones this vector and returns the clone.

**Kind**: global function  
**Returns**: <code>Vector2</code> - The clone of this vector.  
<a name="toString"></a>

## toString() ⇒ <code>String</code>
Returns a string representation of this vector.

**Kind**: global function  
**Returns**: <code>String</code> - A string representation of this vector.  
<a name="add"></a>

## add(vec) ⇒ <code>Vector2</code>
Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |

<a name="subtract"></a>

## subtract(vec) ⇒ <code>Vector2</code>
Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |

<a name="divide"></a>

## divide(scalar) ⇒ <code>Vector2</code>
Divide the x and y coordinate values of this vector by a scalar.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>Number</code> | The scalar. |

<a name="multiply"></a>

## multiply(v) ⇒ <code>Vector2</code>
Multiply the x and y coordinate values of this vector by the values of another vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>Vector2</code> | A vector. |

<a name="multiplyScalar"></a>

## multiplyScalar(scalar) ⇒ <code>Vector2</code>
Multiply the x and y coordinate values of this vector by a scalar.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>Number</code> | The scalar. |

<a name="invert"></a>

## invert() ⇒ <code>Vector2</code>
Inverts this vector. Same as multiply(-1.0).

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  
<a name="angle"></a>

## angle() ⇒ <code>Number</code>
Returns the angle of this vector in relation to the coordinate system.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in radians.  
<a name="distance"></a>

## distance(vec) ⇒ <code>Number</code>
Returns the euclidean distance between this vector and another vector.

**Kind**: global function  
**Returns**: <code>Number</code> - The euclidean distance between the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | A vector. |

<a name="distanceSq"></a>

## distanceSq(vec) ⇒ <code>Number</code>
Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).

**Kind**: global function  
**Returns**: <code>Number</code> - The squared euclidean distance of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |

<a name="clockwise"></a>

## clockwise(vec) ⇒ <code>Number</code>
Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.

**Kind**: global function  
**Returns**: <code>Number</code> - Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |

<a name="relativeClockwise"></a>

## relativeClockwise(center, vec) ⇒ <code>Number</code>
Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to an arbitrary third vector.

**Kind**: global function  
**Returns**: <code>Number</code> - Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to an arbitrary third vector.  

| Param | Type | Description |
| --- | --- | --- |
| center | <code>Vector2</code> | The central vector. |
| vec | <code>Vector2</code> | Another vector. |

<a name="rotate"></a>

## rotate(angle) ⇒ <code>Vector2</code>
Rotates this vector by a given number of radians around the origin of the coordinate system.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>Number</code> | The angle in radians to rotate the vector. |

<a name="rotateAround"></a>

## rotateAround(angle, vec) ⇒ <code>Vector2</code>
Rotates this vector around another vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>Number</code> | The angle in radians to rotate the vector. |
| vec | <code>Vector2</code> | The vector which is used as the rotational center. |

<a name="rotateTo"></a>

## rotateTo(vec, center, [offsetAngle]) ⇒ <code>Vector2</code>
Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>Vector2</code> |  | The vector to rotate this vector to. |
| center | <code>Vector2</code> |  | The rotational center. |
| [offsetAngle] | <code>Number</code> | <code>0.0</code> | An additional amount of radians to rotate the vector. |

<a name="rotateAwayFrom"></a>

## rotateAwayFrom(vec, center, angle)
Rotates the vector away from a specified vector around a center.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | The vector this one is rotated away from. |
| center | <code>Vector2</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="getRotateAwayFromAngle"></a>

## getRotateAwayFromAngle(vec, center, angle) ⇒ <code>Number</code>
Returns the angle in radians used to rotate this vector away from a given vector.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | The vector this one is rotated away from. |
| center | <code>Vector2</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="getRotateTowardsAngle"></a>

## getRotateTowardsAngle(vec, center, angle) ⇒ <code>Number</code>
Returns the angle in radians used to rotate this vector towards a given vector.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | The vector this one is rotated towards to. |
| center | <code>Vector2</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="getRotateToAngle"></a>

## getRotateToAngle(vec, center) ⇒ <code>Number</code>
Gets the angles between this vector and another vector around a common center of rotation.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle between this vector and another vector around a center of rotation in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |
| center | <code>Vector2</code> | The center of rotation. |

<a name="isInPolygon"></a>

## isInPolygon(polygon) ⇒ <code>Boolean</code>
Checks whether a vector lies within a polygon spanned by a set of vectors.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this vector is within a polygon.  

| Param | Type | Description |
| --- | --- | --- |
| polygon | <code>Array.&lt;Vector2&gt;</code> | An array of vectors spanning the polygon. |

<a name="length"></a>

## length() ⇒ <code>Number</code>
Returns the length of this vector.

**Kind**: global function  
**Returns**: <code>Number</code> - The length of this vector.  
<a name="lengthSq"></a>

## lengthSq() ⇒ <code>Number</code>
Returns the square of the length of this vector.

**Kind**: global function  
**Returns**: <code>Number</code> - The square of the length of this vector.  
<a name="normalize"></a>

## normalize() ⇒ <code>Vector2</code>
Normalizes this vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns itself.  
<a name="normalized"></a>

## normalized() ⇒ <code>Vector2</code>
Returns a normalized copy of this vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - A normalized copy of this vector.  
<a name="whichSide"></a>

## whichSide(vecA, vecB) ⇒ <code>Number</code>
Calculates which side of a line spanned by two vectors this vector is.

**Kind**: global function  
**Returns**: <code>Number</code> - A number indicating the side of this vector, given a line spanned by two other vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |

<a name="sameSideAs"></a>

## sameSideAs(vecA, vecB, vecC) ⇒ <code>Boolean</code>
Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.

**Kind**: global function  
**Returns**: <code>Boolean</code> - Returns a boolean indicating whether or not this vector is on the same side as another vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector spanning the line. |
| vecB | <code>Vector2</code> | A vector spanning the line. |
| vecC | <code>Vector2</code> | A vector to check whether or not it is on the same side as this vector. |

<a name="add"></a>

## add(vecA, vecB) ⇒ <code>Vector2</code>
Adds two vectors and returns the result as a new vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns the sum of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A summand. |
| vecB | <code>Vector2</code> | A summand. |

<a name="subtract"></a>

## subtract(vecA, vecB) ⇒ <code>Vector2</code>
Subtracts one vector from another and returns the result as a new vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns the difference of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | The minuend. |
| vecB | <code>Vector2</code> | The subtrahend. |

<a name="multiply"></a>

## multiply(vecA, vecB) ⇒ <code>Vector2</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |

<a name="multiplyScalar"></a>

## multiplyScalar(vec, scalar) ⇒ <code>Vector2</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: global function  
**Returns**: <code>Vector2</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | A vector. |
| scalar | <code>Number</code> | A scalar. |

<a name="midpoint"></a>

## midpoint(vecA, vecB) ⇒ <code>Vector2</code>
Returns the midpoint of a line spanned by two vectors.

**Kind**: global function  
**Returns**: <code>Vector2</code> - The midpoint of the line spanned by two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector spanning the line. |
| vecB | <code>Vector2</code> | A vector spanning the line. |

<a name="normals"></a>

## normals(vecA, vecB) ⇒ <code>Array.&lt;Vector2&gt;</code>
Returns the normals of a line spanned by two vectors.

**Kind**: global function  
**Returns**: <code>Array.&lt;Vector2&gt;</code> - An array containing the two normals, each represented by a vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector spanning the line. |
| vecB | <code>Vector2</code> | A vector spanning the line. |

<a name="units"></a>

## units(vecA, vecB) ⇒ <code>Array.&lt;Vector2&gt;</code>
Returns the unit (normalized normal) vectors of a line spanned by two vectors.

**Kind**: global function  
**Returns**: <code>Array.&lt;Vector2&gt;</code> - An array containing the two unit vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector spanning the line. |
| vecB | <code>Vector2</code> | A vector spanning the line. |

<a name="divide"></a>

## divide(vecA, vecB) ⇒ <code>Vector2</code>
Divides a vector by another vector and returns the result as new vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - The fraction of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | The dividend. |
| vecB | <code>Vector2</code> | The divisor. |

<a name="divideScalar"></a>

## divideScalar(vecA, s) ⇒ <code>Vector2</code>
Divides a vector by a scalar and returns the result as new vector.

**Kind**: global function  
**Returns**: <code>Vector2</code> - The fraction of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | The dividend. |
| s | <code>Number</code> | The scalar. |

<a name="dot"></a>

## dot(vecA, vecB) ⇒ <code>Number</code>
Returns the dot product of two vectors.

**Kind**: global function  
**Returns**: <code>Number</code> - The dot product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |

<a name="angle"></a>

## angle(vecA, vecB) ⇒ <code>Number</code>
Returns the angle between two vectors.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle between two vectors in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |

<a name="threePointangle"></a>

## threePointangle(vecA, vecB, vecC) ⇒ <code>Number</code>
Returns the angle between two vectors based on a third vector in between.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A (central) vector. |
| vecC | <code>Vector2</code> | A vector. |

<a name="scalarProjection"></a>

## scalarProjection(vecA, vecB) ⇒ <code>Number</code>
Returns the scalar projection of a vector on another vector.

**Kind**: global function  
**Returns**: <code>Number</code> - The scalar component.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | The vector to be projected. |
| vecB | <code>Vector2</code> | The vector to be projection upon. |

<a name="averageDirection"></a>

## averageDirection(vecs) ⇒ <code>Vector2</code>
Returns the average vector (normalized) of the input vectors.

**Kind**: global function  
**Returns**: <code>Vector2</code> - The resulting vector (normalized).  

| Param | Type | Description |
| --- | --- | --- |
| vecs | <code>Array</code> | An array containing vectors. |

<a name="setPosition"></a>

## setPosition(x, y)
Set the 2D coordinates of the vertex.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x component of the coordinates. |
| y | <code>Number</code> | The y component of the coordinates. |

<a name="setPositionFromVector"></a>

## setPositionFromVector(v)
Set the 2D coordinates of the vertex from a Vector2.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>Vector2</code> | A 2D vector. |

<a name="addChild"></a>

## addChild(vertexId)
Add a child vertex id to this vertex.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | The id of a vertex to be added as a child to this vertex. |

<a name="addRingbondChild"></a>

## addRingbondChild(vertexId, ringbondIndex)
Add a child vertex id to this vertex as the second child of the neighbours array,except this vertex is the first vertex of the SMILE string, then it is added as the first.This is used to get the correct ordering of neighbours for parity calculations.If a hydrogen is implicitly attached to the chiral center, insert as the third child.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | The id of a vertex to be added as a child to this vertex. |
| ringbondIndex | <code>Number</code> | The index of the ringbond. |

<a name="setParentVertexId"></a>

## setParentVertexId(parentVertexId)
Set the vertex id of the parent.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| parentVertexId | <code>Number</code> | The parents vertex id. |

<a name="isTerminal"></a>

## isTerminal() ⇒ <code>Boolean</code>
Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this vertex is terminal.  
<a name="clone"></a>

## clone() ⇒ <code>Vertex</code>
Clones this vertex and returns the clone.

**Kind**: global function  
**Returns**: <code>Vertex</code> - A clone of this vertex.  
<a name="equals"></a>

## equals(vertex) ⇒ <code>Boolean</code>
Returns true if this vertex and the supplied vertex both have the same id, else returns false.

**Kind**: global function  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two vertices have the same id.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | The vertex to check. |

<a name="getAngle"></a>

## getAngle([referenceVector], [returnAsDegrees]) ⇒ <code>Number</code>
Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.

**Kind**: global function  
**Returns**: <code>Number</code> - The angle of this vertex.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [referenceVector] | <code>Vector2</code> | <code></code> | The reference vector. |
| [returnAsDegrees] | <code>Boolean</code> | <code>false</code> | If true, returns angle in degrees, else in radians. |

<a name="getTextDirection"></a>

## getTextDirection(vertices) ⇒ <code>String</code>
Returns the suggested text direction when text is added at the position of this vertex.

**Kind**: global function  
**Returns**: <code>String</code> - The suggested direction of the text.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | The array of vertices for the current molecule. |

<a name="getNeighbours"></a>

## getNeighbours([vertexId]) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of ids of neighbouring vertices.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the ids of neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>Number</code> | <code></code> | If a value is supplied, the vertex with this id is excluded from the returned indices. |

<a name="getDrawnNeighbours"></a>

## getDrawnNeighbours(vertices) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the ids of neighbouring vertices that will be drawn.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | An array containing the vertices associated with the current molecule. |

<a name="getNeighbourCount"></a>

## getNeighbourCount() ⇒ <code>Number</code>
Returns the number of neighbours of this vertex.

**Kind**: global function  
**Returns**: <code>Number</code> - The number of neighbours.  
<a name="getSpanningTreeNeighbours"></a>

## getSpanningTreeNeighbours([vertexId]) ⇒ <code>Array.&lt;Number&gt;</code>
Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the ids of the neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>Number</code> | <code></code> | If supplied, the vertex with this id is excluded from the array returned. |

<a name="getNextInRing"></a>

## getNextInRing(vertices, ringId, previousVertexId) ⇒ <code>Number</code>
Gets the next vertex in the ring in opposide direction to the supplied vertex id.

**Kind**: global function  
**Returns**: <code>Number</code> - The id of the next vertex in the ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> | The array of vertices for the current molecule. |
| ringId | <code>Number</code> | The id of the ring containing this vertex. |
| previousVertexId | <code>Number</code> | The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex. |


* * *
