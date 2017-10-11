[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

<a name="SmilesDrawer"></a>

## SmilesDrawer
The SmilesDrawer namespace.

**Kind**: global variable  

* [SmilesDrawer](#SmilesDrawer)
    * [.ArrayHelper](#SmilesDrawer.ArrayHelper)
        * [.clone(arr)](#SmilesDrawer.ArrayHelper.clone) ⇒ <code>\*</code>
        * [.print(arr)](#SmilesDrawer.ArrayHelper.print) ⇒ <code>String</code>
        * [.each(arr, callback)](#SmilesDrawer.ArrayHelper.each)
        * [.get(arr, property, value)](#SmilesDrawer.ArrayHelper.get) ⇒ <code>\*</code>
        * [.contains(arr, options)](#SmilesDrawer.ArrayHelper.contains) ⇒ <code>Boolean</code>
        * [.intersection(arrA, arrB)](#SmilesDrawer.ArrayHelper.intersection) ⇒ <code>Array</code>
        * [.unique(arr)](#SmilesDrawer.ArrayHelper.unique) ⇒ <code>Array</code>
        * [.count(arr, value)](#SmilesDrawer.ArrayHelper.count) ⇒ <code>Number</code>
        * [.toggle(arr, value)](#SmilesDrawer.ArrayHelper.toggle) ⇒ <code>Array</code>
        * [.remove(arr, value)](#SmilesDrawer.ArrayHelper.remove) ⇒ <code>Array</code>
        * [.removeUnique(arr, value)](#SmilesDrawer.ArrayHelper.removeUnique) ⇒ <code>Array</code>
        * [.removeAll(arrA, arrB)](#SmilesDrawer.ArrayHelper.removeAll) ⇒ <code>Array</code>
        * [.merge(arrA, arrB)](#SmilesDrawer.ArrayHelper.merge) ⇒ <code>Array</code>
        * [.containsAll(arrA, arrB)](#SmilesDrawer.ArrayHelper.containsAll) ⇒ <code>Boolean</code>
        * [.sortByAtomicNumberDesc(arr)](#SmilesDrawer.ArrayHelper.sortByAtomicNumberDesc) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.deepCopy(arr)](#SmilesDrawer.ArrayHelper.deepCopy) ⇒ <code>Array</code>
    * [.Atom](#SmilesDrawer.Atom)
        * [new SmilesDrawer.Atom(element, [bondType])](#new_SmilesDrawer.Atom_new)
        * _instance_
            * [.addNeighbouringElement(element)](#SmilesDrawer.Atom+addNeighbouringElement)
            * [.attachPseudoElement(element, previousElement, [hydrogenCount])](#SmilesDrawer.Atom+attachPseudoElement)
            * [.getAttachedPseudoElements()](#SmilesDrawer.Atom+getAttachedPseudoElements) ⇒ <code>Object</code>
            * [.getAttachedPseudoElementsCount()](#SmilesDrawer.Atom+getAttachedPseudoElementsCount) ⇒ <code>Number</code>
            * [.addAnchoredRing(ringId)](#SmilesDrawer.Atom+addAnchoredRing)
            * [.getRingbondCount()](#SmilesDrawer.Atom+getRingbondCount) ⇒ <code>Number</code>
            * [.canRotate()](#SmilesDrawer.Atom+canRotate) ⇒ <code>Boolean</code>
            * [.hasRingbonds()](#SmilesDrawer.Atom+hasRingbonds) ⇒ <code>Boolean</code>
            * [.getMaxRingbond()](#SmilesDrawer.Atom+getMaxRingbond) ⇒ <code>Number</code>
            * [.isInRing()](#SmilesDrawer.Atom+isInRing) ⇒ <code>Boolean</code>
            * [.hasRing(ringId)](#SmilesDrawer.Atom+hasRing) ⇒ <code>Boolean</code>
            * [.backupRings()](#SmilesDrawer.Atom+backupRings)
            * [.restoreRings()](#SmilesDrawer.Atom+restoreRings)
            * [.haveCommonRingbond(atomA, atomB)](#SmilesDrawer.Atom+haveCommonRingbond) ⇒ <code>Boolean</code>
            * [.maxCommonRingbond(atomA, atomB)](#SmilesDrawer.Atom+maxCommonRingbond) ⇒ <code>Number</code>
            * [.getOrder(center)](#SmilesDrawer.Atom+getOrder) ⇒ <code>Number</code>
            * [.setOrder(center, order)](#SmilesDrawer.Atom+setOrder)
            * [.neighbouringElementsEqual(arr)](#SmilesDrawer.Atom+neighbouringElementsEqual) ⇒ <code>Boolean</code>
            * [.getAtomicNumber()](#SmilesDrawer.Atom+getAtomicNumber) ⇒ <code>Number</code>
        * _static_
            * [.maxBonds](#SmilesDrawer.Atom.maxBonds)
            * [.atomicNumbers](#SmilesDrawer.Atom.atomicNumbers)
            * [.sortByAtomicNumber(root, neighbours, vertices, rings)](#SmilesDrawer.Atom.sortByAtomicNumber) ⇒ <code>Array.&lt;Object&gt;</code>
            * [.hasDuplicateAtomicNumbers(sortedAtomicNumbers)](#SmilesDrawer.Atom.hasDuplicateAtomicNumbers) ⇒ <code>Boolean</code>
            * [.getDuplicateAtomicNumbers(sortedAtomicNumbers)](#SmilesDrawer.Atom.getDuplicateAtomicNumbers) ⇒ <code>Array.&lt;Array&gt;</code>
    * [.CanvasWrapper](#SmilesDrawer.CanvasWrapper)
        * [new SmilesDrawer.CanvasWrapper(target, theme, options)](#new_SmilesDrawer.CanvasWrapper_new)
        * [.updateSize(width, height)](#SmilesDrawer.CanvasWrapper+updateSize)
        * [.setTheme(theme)](#SmilesDrawer.CanvasWrapper+setTheme)
        * [.scale(vertices)](#SmilesDrawer.CanvasWrapper+scale)
        * [.reset()](#SmilesDrawer.CanvasWrapper+reset)
        * [.getColor(key)](#SmilesDrawer.CanvasWrapper+getColor) ⇒ <code>String</code>
        * [.drawCircle(x, y, radius, color, [fill], [debug], [debugText])](#SmilesDrawer.CanvasWrapper+drawCircle)
        * [.drawLine(line, [thickness], [dashed], [alpha])](#SmilesDrawer.CanvasWrapper+drawLine)
        * [.drawWedge(line, width)](#SmilesDrawer.CanvasWrapper+drawWedge)
        * [.drawDashedWedge(line, width)](#SmilesDrawer.CanvasWrapper+drawDashedWedge)
        * [.drawDebugText(x, y, text)](#SmilesDrawer.CanvasWrapper+drawDebugText)
        * [.drawBall(x, y, elementName)](#SmilesDrawer.CanvasWrapper+drawBall)
        * [.drawPoint(x, y, elementName)](#SmilesDrawer.CanvasWrapper+drawPoint)
        * [.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, attachedPseudoElements)](#SmilesDrawer.CanvasWrapper+drawText)
        * [.drawDebugPoint(x, y, [debugText], [color])](#SmilesDrawer.CanvasWrapper+drawDebugPoint)
        * [.drawAromaticityRing(ring)](#SmilesDrawer.CanvasWrapper+drawAromaticityRing)
        * [.clear()](#SmilesDrawer.CanvasWrapper+clear)
    * [.Drawer](#SmilesDrawer.Drawer)
        * [new SmilesDrawer.Drawer(options)](#new_SmilesDrawer.Drawer_new)
        * [.extend()](#SmilesDrawer.Drawer+extend)
        * [.draw(data, target, themeName, infoOnly)](#SmilesDrawer.Drawer+draw)
        * [.edgeRingCount(edgeId)](#SmilesDrawer.Drawer+edgeRingCount) ⇒ <code>Number</code>
        * [.getBridgedRings()](#SmilesDrawer.Drawer+getBridgedRings) ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
        * [.getFusedRings()](#SmilesDrawer.Drawer+getFusedRings) ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
        * [.getSpiros()](#SmilesDrawer.Drawer+getSpiros) ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
        * [.printRingInfo()](#SmilesDrawer.Drawer+printRingInfo) ⇒ <code>String</code>
        * [.getTotalOverlapScore()](#SmilesDrawer.Drawer+getTotalOverlapScore) ⇒ <code>Number</code>
        * [.getRingCount()](#SmilesDrawer.Drawer+getRingCount) ⇒ <code>Number</code>
        * [.hasBridgedRing()](#SmilesDrawer.Drawer+hasBridgedRing) ⇒ <code>Boolean</code>
        * [.getHeavyAtomCount()](#SmilesDrawer.Drawer+getHeavyAtomCount) ⇒ <code>Number</code>
        * [.getRingbondType(vertexA, vertexB)](#SmilesDrawer.Drawer+getRingbondType) ⇒ <code>String</code> &#124; <code>null</code>
        * [.initRings()](#SmilesDrawer.Drawer+initRings)
        * [.getBridgedRingRings(ringId)](#SmilesDrawer.Drawer+getBridgedRingRings) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.isPartOfBridgedRing(ringId)](#SmilesDrawer.Drawer+isPartOfBridgedRing) ⇒ <code>Boolean</code>
        * [.createBridgedRing(ringIds, sourceVertexId)](#SmilesDrawer.Drawer+createBridgedRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
        * [.areVerticesInSameRing(vertexA, vertexB)](#SmilesDrawer.Drawer+areVerticesInSameRing) ⇒ <code>Boolean</code>
        * [.getCommonRings(vertexA, vertexB)](#SmilesDrawer.Drawer+getCommonRings) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.getSmallestCommonRing(vertexA, vertexB)](#SmilesDrawer.Drawer+getSmallestCommonRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>null</code>
        * [.getLargestOrAromaticCommonRing(vertexA, vertexB)](#SmilesDrawer.Drawer+getLargestOrAromaticCommonRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>null</code>
        * [.getVerticesAt(position, radius, excludeVertexId)](#SmilesDrawer.Drawer+getVerticesAt) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.getClosestVertex(vertex)](#SmilesDrawer.Drawer+getClosestVertex) ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
        * [.getClosestEndpointVertex(vertex)](#SmilesDrawer.Drawer+getClosestEndpointVertex) ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
        * [.addRing(ring)](#SmilesDrawer.Drawer+addRing) ⇒ <code>Number</code>
        * [.removeRing(ringId)](#SmilesDrawer.Drawer+removeRing)
        * [.getRing(ringId)](#SmilesDrawer.Drawer+getRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
        * [.addRingConnection(ringConnection)](#SmilesDrawer.Drawer+addRingConnection) ⇒ <code>Number</code>
        * [.removeRingConnection(ringConnectionId)](#SmilesDrawer.Drawer+removeRingConnection)
        * [.removeRingConnectionsBetween(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+removeRingConnectionsBetween)
        * [.getRingConnection(id)](#SmilesDrawer.Drawer+getRingConnection) ⇒ <code>[RingConnection](#SmilesDrawer.RingConnection)</code>
        * [.getRingConnections(ringId, [ringIds])](#SmilesDrawer.Drawer+getRingConnections) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.isRingConnection(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+isRingConnection) ⇒ <code>Boolean</code>
        * [.getOverlapScore()](#SmilesDrawer.Drawer+getOverlapScore) ⇒ <code>Object</code>
        * [.chooseSide(vertexA, vertexB, sides)](#SmilesDrawer.Drawer+chooseSide) ⇒ <code>Object</code>
        * [.areConnected(vertexIdA, vertexIdA)](#SmilesDrawer.Drawer+areConnected) ⇒ <code>Boolean</code>
        * [.getEdgeWeight(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+getEdgeWeight) ⇒ <code>Number</code> &#124; <code>null</code>
        * [.setRingCenter(ring)](#SmilesDrawer.Drawer+setRingCenter)
        * [.getSubringCenter(ring, vertex)](#SmilesDrawer.Drawer+getSubringCenter) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.drawEdges(debug)](#SmilesDrawer.Drawer+drawEdges)
        * [.drawEdge(edgeId, debug)](#SmilesDrawer.Drawer+drawEdge)
        * [.drawVertices(debug)](#SmilesDrawer.Drawer+drawVertices)
        * [.position()](#SmilesDrawer.Drawer+position)
        * [.clearPositions()](#SmilesDrawer.Drawer+clearPositions)
        * [.restorePositions()](#SmilesDrawer.Drawer+restorePositions)
        * [.backupRingInformation()](#SmilesDrawer.Drawer+backupRingInformation)
        * [.restoreRingInformation()](#SmilesDrawer.Drawer+restoreRingInformation)
        * [.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])](#SmilesDrawer.Drawer+createRing)
        * [.rotateSubtree(vertexId, parentVertexId, angle, center)](#SmilesDrawer.Drawer+rotateSubtree)
        * [.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores)](#SmilesDrawer.Drawer+getSubtreeOverlapScore) ⇒ <code>Object</code>
        * [.getCurrentCenterOfMass()](#SmilesDrawer.Drawer+getCurrentCenterOfMass) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.getCurrentCenterOfMassInNeigbourhood(vec, [r])](#SmilesDrawer.Drawer+getCurrentCenterOfMassInNeigbourhood) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.resolvePrimaryOverlaps()](#SmilesDrawer.Drawer+resolvePrimaryOverlaps)
        * [.resolveSecondaryOverlaps(scores)](#SmilesDrawer.Drawer+resolveSecondaryOverlaps)
        * [.createNextBond(vertex, previousVertex, ringOrAngle, dir)](#SmilesDrawer.Drawer+createNextBond)
        * [.getCommonRingbondNeighbour(vertex)](#SmilesDrawer.Drawer+getCommonRingbondNeighbour) ⇒ <code>Number</code> &#124; <code>null</code>
        * [.isPointInRing(vec)](#SmilesDrawer.Drawer+isPointInRing) ⇒ <code>Boolean</code>
        * [.isEdgeInRing(edge)](#SmilesDrawer.Drawer+isEdgeInRing) ⇒ <code>Boolean</code>
        * [.isEdgeRotatable(edge)](#SmilesDrawer.Drawer+isEdgeRotatable) ⇒ <code>Boolean</code>
        * [.isRingAromatic(ring)](#SmilesDrawer.Drawer+isRingAromatic) ⇒ <code>Boolean</code>
        * [.getEdgeNormals(edge)](#SmilesDrawer.Drawer+getEdgeNormals) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
        * [.getTreeDepth(vertexId, parentVertexId)](#SmilesDrawer.Drawer+getTreeDepth) ⇒ <code>Number</code>
        * [.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst])](#SmilesDrawer.Drawer+traverseTree)
        * [.getBondCount(vertex)](#SmilesDrawer.Drawer+getBondCount) ⇒ <code>Number</code>
        * [.getNonRingNeighbours(vertexId)](#SmilesDrawer.Drawer+getNonRingNeighbours) ⇒ <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code>
        * [.initPseudoElements()](#SmilesDrawer.Drawer+initPseudoElements)
    * [.Edge](#SmilesDrawer.Edge)
        * [new SmilesDrawer.Edge(sourceId, targetId, [weight])](#new_SmilesDrawer.Edge_new)
        * _instance_
            * [.getBondCount()](#SmilesDrawer.Edge+getBondCount) ⇒ <code>Number</code>
        * _static_
            * [.bonds](#SmilesDrawer.Edge.bonds) ⇒ <code>Object</code>
    * [.Graph](#SmilesDrawer.Graph)
        * [new SmilesDrawer.Graph(parseTree, [isomeric])](#new_SmilesDrawer.Graph_new)
        * _instance_
            * [._init(node, parentVertexId, isBranch)](#SmilesDrawer.Graph+_init)
            * [._initInfos()](#SmilesDrawer.Graph+_initInfos)
            * [.clear()](#SmilesDrawer.Graph+clear)
            * [.addVertex(vertex)](#SmilesDrawer.Graph+addVertex) ⇒ <code>Number</code>
            * [.addEdge(edge)](#SmilesDrawer.Graph+addEdge) ⇒ <code>Number</code>
            * [.getEdge(vertexIdA, vertexIdB)](#SmilesDrawer.Graph+getEdge) ⇒ <code>Number</code> &#124; <code>null</code>
            * [.getEdges(vertexId)](#SmilesDrawer.Graph+getEdges) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.hasEdge(vertexIdA, vertexIdB)](#SmilesDrawer.Graph+hasEdge) ⇒ <code>Number</code> &#124; <code>null</code>
            * [.getVertexList()](#SmilesDrawer.Graph+getVertexList) ⇒ <code>Array.&lt;Number&gt;</code>
            * [.getEdgeList()](#SmilesDrawer.Graph+getEdgeList) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.getAdjacencyMatrix()](#SmilesDrawer.Graph+getAdjacencyMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.getComponentsAdjacencyMatrix()](#SmilesDrawer.Graph+getComponentsAdjacencyMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.getSubgraphAdjacencyMatrix(vertexIds)](#SmilesDrawer.Graph+getSubgraphAdjacencyMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.getDistanceMatrix()](#SmilesDrawer.Graph+getDistanceMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.getSubgraphDistanceMatrix(vertexIds)](#SmilesDrawer.Graph+getSubgraphDistanceMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.getAdjacencyList()](#SmilesDrawer.Graph+getAdjacencyList) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.getSubgraphAdjacencyList(vertexIds)](#SmilesDrawer.Graph+getSubgraphAdjacencyList) ⇒ <code>Array.&lt;Array&gt;</code>
            * [.getBridges()](#SmilesDrawer.Graph+getBridges) ⇒ <code>Array.&lt;Number&gt;</code>
            * [.traverseBF(startVertexId, callback)](#SmilesDrawer.Graph+traverseBF)
            * [.kkLayout(vertexIds, center, startVertexId, ring)](#SmilesDrawer.Graph+kkLayout)
            * [._bridgeDfs()](#SmilesDrawer.Graph+_bridgeDfs)
        * _static_
            * [.getConnectedComponents(adjacencyMatrix)](#SmilesDrawer.Graph.getConnectedComponents) ⇒ <code>Array.&lt;Set&gt;</code>
            * [.getConnectedComponentCount(adjacencyMatrix)](#SmilesDrawer.Graph.getConnectedComponentCount) ⇒ <code>Number</code>
            * [._ccCountDfs()](#SmilesDrawer.Graph._ccCountDfs)
            * [._ccGetDfs()](#SmilesDrawer.Graph._ccGetDfs)
    * [.Line](#SmilesDrawer.Line)
        * [new SmilesDrawer.Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])](#new_SmilesDrawer.Line_new)
        * [.clone()](#SmilesDrawer.Line+clone) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.getLength()](#SmilesDrawer.Line+getLength) ⇒ <code>Number</code>
        * [.getAngle()](#SmilesDrawer.Line+getAngle) ⇒ <code>Number</code>
        * [.getRightVector()](#SmilesDrawer.Line+getRightVector) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.getLeftVector()](#SmilesDrawer.Line+getLeftVector) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.getRightElement()](#SmilesDrawer.Line+getRightElement) ⇒ <code>String</code>
        * [.getLeftElement()](#SmilesDrawer.Line+getLeftElement) ⇒ <code>String</code>
        * [.getRightChiral()](#SmilesDrawer.Line+getRightChiral) ⇒ <code>Boolean</code>
        * [.getLeftChiral()](#SmilesDrawer.Line+getLeftChiral) ⇒ <code>Boolean</code>
        * [.setRightVector(x, y)](#SmilesDrawer.Line+setRightVector) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.setLeftVector(x, y)](#SmilesDrawer.Line+setLeftVector) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.rotateToXAxis()](#SmilesDrawer.Line+rotateToXAxis) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.rotate(theta)](#SmilesDrawer.Line+rotate) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.shortenFrom(by)](#SmilesDrawer.Line+shortenFrom) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.shortenTo(by)](#SmilesDrawer.Line+shortenTo) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.shortenRight(by)](#SmilesDrawer.Line+shortenRight) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.shortenLeft(by)](#SmilesDrawer.Line+shortenLeft) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.shorten(by)](#SmilesDrawer.Line+shorten) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
        * [.getNormals()](#SmilesDrawer.Line+getNormals) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
    * [.MathHelper](#SmilesDrawer.MathHelper)
        * [.radFactor](#SmilesDrawer.MathHelper.radFactor)
        * [.degFactor](#SmilesDrawer.MathHelper.degFactor)
        * [.twoPI](#SmilesDrawer.MathHelper.twoPI)
        * [.round(value, decimals)](#SmilesDrawer.MathHelper.round) ⇒ <code>Number</code>
        * [.meanAngle(arr)](#SmilesDrawer.MathHelper.meanAngle) ⇒ <code>Number</code>
        * [.innerAngle(n)](#SmilesDrawer.MathHelper.innerAngle) ⇒ <code>Number</code>
        * [.polyCircumradius(s, n)](#SmilesDrawer.MathHelper.polyCircumradius) ⇒ <code>Number</code>
        * [.apothem(r, n)](#SmilesDrawer.MathHelper.apothem) ⇒ <code>Number</code>
        * [.centralAngle(n)](#SmilesDrawer.MathHelper.centralAngle) ⇒ <code>Number</code>
        * [.toDeg(rad)](#SmilesDrawer.MathHelper.toDeg) ⇒ <code>Number</code>
        * [.toRad(deg)](#SmilesDrawer.MathHelper.toRad) ⇒ <code>Number</code>
    * [.Ring](#SmilesDrawer.Ring)
        * [new SmilesDrawer.Ring(members)](#new_SmilesDrawer.Ring_new)
        * _instance_
            * [.clone()](#SmilesDrawer.Ring+clone) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
            * [.allowsFlip()](#SmilesDrawer.Ring+allowsFlip) ⇒ <code>Boolean</code>
            * [.setFlipped()](#SmilesDrawer.Ring+setFlipped)
            * [.getSize()](#SmilesDrawer.Ring+getSize) ⇒ <code>Number</code>
            * [.getPolygon(vertices)](#SmilesDrawer.Ring+getPolygon) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
            * [.getAngle()](#SmilesDrawer.Ring+getAngle) ⇒ <code>Number</code>
            * [.eachMember(vertices, callback, startVertexId, previousVertexId)](#SmilesDrawer.Ring+eachMember)
            * [.getOrderedNeighbours(ringConnections)](#SmilesDrawer.Ring+getOrderedNeighbours) ⇒ <code>Array.&lt;Object&gt;</code>
            * [.isBenzeneLike(vertices)](#SmilesDrawer.Ring+isBenzeneLike) ⇒ <code>Boolean</code>
            * [.getDoubleBondCount(vertices)](#SmilesDrawer.Ring+getDoubleBondCount) ⇒ <code>Number</code>
            * [.contains(vertexId)](#SmilesDrawer.Ring+contains) ⇒ <code>Boolean</code>
            * [.thisOrNeighboursContain(rings, vertexId)](#SmilesDrawer.Ring+thisOrNeighboursContain) ⇒ <code>Boolean</code>
        * _static_
            * [.getRing(rings, id)](#SmilesDrawer.Ring.getRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
    * [.RingConnection](#SmilesDrawer.RingConnection)
        * [new SmilesDrawer.RingConnection(firstRing, secondRing)](#new_SmilesDrawer.RingConnection_new)
        * _instance_
            * [.addVertex(vertexId)](#SmilesDrawer.RingConnection+addVertex)
            * [.isBridge()](#SmilesDrawer.RingConnection+isBridge) ⇒ <code>Boolean</code>
            * [.updateOther(ringId, otherRingId)](#SmilesDrawer.RingConnection+updateOther)
            * [.containsRing(ringId)](#SmilesDrawer.RingConnection+containsRing) ⇒ <code>Boolean</code>
        * _static_
            * [.isBridge(ringConnections, vertices, firstRingId, secondRingId)](#SmilesDrawer.RingConnection.isBridge) ⇒ <code>Boolean</code>
            * [.getNeighbours(ringConnections, ringId)](#SmilesDrawer.RingConnection.getNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
            * [.getVertices(ringConnections, firstRingId, secondRingId)](#SmilesDrawer.RingConnection.getVertices) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.SSSR](#SmilesDrawer.SSSR)
        * [.getRings(graph)](#SmilesDrawer.SSSR.getRings) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.matrixToString(matrix)](#SmilesDrawer.SSSR.matrixToString) ⇒ <code>String</code>
        * [.getPathIncludedDistanceMatrices(adjacencyMatrix)](#SmilesDrawer.SSSR.getPathIncludedDistanceMatrices) ⇒ <code>Object</code>
        * [.getRingCandidates(d, pe1, pe2)](#SmilesDrawer.SSSR.getRingCandidates) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getSSSR(c, d, adjacencyMatrix, pe1, pe2, nsssr)](#SmilesDrawer.SSSR.getSSSR) ⇒ <code>Array.&lt;Set&gt;</code>
        * [.getEdgeCount(adjacencyMatrix)](#SmilesDrawer.SSSR.getEdgeCount) ⇒ <code>Number</code>
        * [.getEdgeList(adjacencyMatrix)](#SmilesDrawer.SSSR.getEdgeList) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.bondsToAtoms(bonds)](#SmilesDrawer.SSSR.bondsToAtoms) ⇒ <code>Set.&lt;Number&gt;</code>
        * [.getBondCount(atoms, adjacencyMatrix)](#SmilesDrawer.SSSR.getBondCount) ⇒ <code>Number</code>
        * [.pathSetsContain(pathSets, pathSet, bonds, allBonds)](#SmilesDrawer.SSSR.pathSetsContain) ⇒ <code>Boolean</code>
        * [.areSetsEqual(setA, setB)](#SmilesDrawer.SSSR.areSetsEqual) ⇒ <code>Boolean</code>
        * [.isSupersetOf(setA, setB)](#SmilesDrawer.SSSR.isSupersetOf) ⇒ <code>Boolean</code>
    * [.Vector2](#SmilesDrawer.Vector2)
        * [new SmilesDrawer.Vector2(x, y)](#new_SmilesDrawer.Vector2_new)
        * _instance_
            * [.clone()](#SmilesDrawer.Vector2+clone) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.toString()](#SmilesDrawer.Vector2+toString) ⇒ <code>String</code>
            * [.add(vec)](#SmilesDrawer.Vector2+add) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.subtract(vec)](#SmilesDrawer.Vector2+subtract) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.divide(scalar)](#SmilesDrawer.Vector2+divide) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.multiply(v)](#SmilesDrawer.Vector2+multiply) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.multiplyScalar(scalar)](#SmilesDrawer.Vector2+multiplyScalar) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.invert()](#SmilesDrawer.Vector2+invert) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.angle()](#SmilesDrawer.Vector2+angle) ⇒ <code>Number</code>
            * [.distance(vec)](#SmilesDrawer.Vector2+distance) ⇒ <code>Number</code>
            * [.distanceSq(vec)](#SmilesDrawer.Vector2+distanceSq) ⇒ <code>Number</code>
            * [.clockwise(vec)](#SmilesDrawer.Vector2+clockwise) ⇒ <code>Number</code>
            * [.rotate(angle)](#SmilesDrawer.Vector2+rotate) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.rotateAround(angle, vec)](#SmilesDrawer.Vector2+rotateAround) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.rotateTo(vec, center, [offsetAngle])](#SmilesDrawer.Vector2+rotateTo) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.rotateAwayFrom(vec, center, angle)](#SmilesDrawer.Vector2+rotateAwayFrom)
            * [.getRotateAwayFromAngle(vec, center, angle)](#SmilesDrawer.Vector2+getRotateAwayFromAngle) ⇒ <code>Number</code>
            * [.getRotateTowardsAngle(vec, center, angle)](#SmilesDrawer.Vector2+getRotateTowardsAngle) ⇒ <code>Number</code>
            * [.getRotateToAngle(vec, center)](#SmilesDrawer.Vector2+getRotateToAngle) ⇒ <code>Number</code>
            * [.isInPolygon(polygon)](#SmilesDrawer.Vector2+isInPolygon) ⇒ <code>Boolean</code>
            * [.length()](#SmilesDrawer.Vector2+length) ⇒ <code>Number</code>
            * [.normalize()](#SmilesDrawer.Vector2+normalize) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.normalized()](#SmilesDrawer.Vector2+normalized) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.whichSide(vecA, vecB)](#SmilesDrawer.Vector2+whichSide) ⇒ <code>Number</code>
            * [.sameSideAs(vecA, vecB, vecC)](#SmilesDrawer.Vector2+sameSideAs) ⇒ <code>Boolean</code>
        * _static_
            * [.add(vecA, vecB)](#SmilesDrawer.Vector2.add) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.subtract(vecA, vecB)](#SmilesDrawer.Vector2.subtract) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.multiply(vecA, vecB)](#SmilesDrawer.Vector2.multiply) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.multiplyScalar(vec, scalar)](#SmilesDrawer.Vector2.multiplyScalar) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.midpoint(vecA, vecB)](#SmilesDrawer.Vector2.midpoint) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.normals(vecA, vecB)](#SmilesDrawer.Vector2.normals) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
            * [.units(vecA, vecB)](#SmilesDrawer.Vector2.units) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
            * [.divide(vecA, vecB)](#SmilesDrawer.Vector2.divide) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
            * [.dot(vecA, vecB)](#SmilesDrawer.Vector2.dot) ⇒ <code>Number</code>
            * [.angle(vecA, vecB)](#SmilesDrawer.Vector2.angle) ⇒ <code>Number</code>
            * [.threePointangle(vecA, vecB, vecC)](#SmilesDrawer.Vector2.threePointangle) ⇒ <code>Number</code>
            * [.scalarProjection(vecA, vecB)](#SmilesDrawer.Vector2.scalarProjection) ⇒ <code>Number</code>
    * [.Vertex](#SmilesDrawer.Vertex)
        * [new SmilesDrawer.Vertex(value, [x], [y])](#new_SmilesDrawer.Vertex_new)
        * [.setPosition(x, y)](#SmilesDrawer.Vertex+setPosition)
        * [.setPositionFromVector(v)](#SmilesDrawer.Vertex+setPositionFromVector)
        * [.addChild(vertexID)](#SmilesDrawer.Vertex+addChild)
        * [.setParentVertexId(parentVertexId)](#SmilesDrawer.Vertex+setParentVertexId)
        * [.isTerminal()](#SmilesDrawer.Vertex+isTerminal) ⇒ <code>Boolean</code>
        * [.clone()](#SmilesDrawer.Vertex+clone) ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
        * [.equals(vertex)](#SmilesDrawer.Vertex+equals) ⇒ <code>Boolean</code>
        * [.getAngle([referenceVector], [returnAsDegrees])](#SmilesDrawer.Vertex+getAngle) ⇒ <code>Number</code>
        * [.getTextDirection(vertices)](#SmilesDrawer.Vertex+getTextDirection) ⇒ <code>String</code>
        * [.getNeighbours([vertexId])](#SmilesDrawer.Vertex+getNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.getDrawnNeighbours(vertices)](#SmilesDrawer.Vertex+getDrawnNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.getNeighbourCount()](#SmilesDrawer.Vertex+getNeighbourCount) ⇒ <code>Number</code>
        * [.getCommonNeighbours(vertex)](#SmilesDrawer.Vertex+getCommonNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.isNeighbour(vertexId)](#SmilesDrawer.Vertex+isNeighbour) ⇒ <code>Boolean</code>
        * [.getSpanningTreeNeighbours([vertexId])](#SmilesDrawer.Vertex+getSpanningTreeNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.getNextInRing(vertices, ringId, previousVertexId)](#SmilesDrawer.Vertex+getNextInRing) ⇒ <code>Number</code>
    * [.clean(smiles)](#SmilesDrawer.clean) ⇒ <code>String</code>
    * [.apply(options, [selector], [themeName], [onError])](#SmilesDrawer.apply)
    * [.parse(smiles, successCallback, errorCallback)](#SmilesDrawer.parse)

<a name="SmilesDrawer.ArrayHelper"></a>

### SmilesDrawer.ArrayHelper
A static class containing helper functions for array-related tasks.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.ArrayHelper](#SmilesDrawer.ArrayHelper)
    * [.clone(arr)](#SmilesDrawer.ArrayHelper.clone) ⇒ <code>\*</code>
    * [.print(arr)](#SmilesDrawer.ArrayHelper.print) ⇒ <code>String</code>
    * [.each(arr, callback)](#SmilesDrawer.ArrayHelper.each)
    * [.get(arr, property, value)](#SmilesDrawer.ArrayHelper.get) ⇒ <code>\*</code>
    * [.contains(arr, options)](#SmilesDrawer.ArrayHelper.contains) ⇒ <code>Boolean</code>
    * [.intersection(arrA, arrB)](#SmilesDrawer.ArrayHelper.intersection) ⇒ <code>Array</code>
    * [.unique(arr)](#SmilesDrawer.ArrayHelper.unique) ⇒ <code>Array</code>
    * [.count(arr, value)](#SmilesDrawer.ArrayHelper.count) ⇒ <code>Number</code>
    * [.toggle(arr, value)](#SmilesDrawer.ArrayHelper.toggle) ⇒ <code>Array</code>
    * [.remove(arr, value)](#SmilesDrawer.ArrayHelper.remove) ⇒ <code>Array</code>
    * [.removeUnique(arr, value)](#SmilesDrawer.ArrayHelper.removeUnique) ⇒ <code>Array</code>
    * [.removeAll(arrA, arrB)](#SmilesDrawer.ArrayHelper.removeAll) ⇒ <code>Array</code>
    * [.merge(arrA, arrB)](#SmilesDrawer.ArrayHelper.merge) ⇒ <code>Array</code>
    * [.containsAll(arrA, arrB)](#SmilesDrawer.ArrayHelper.containsAll) ⇒ <code>Boolean</code>
    * [.sortByAtomicNumberDesc(arr)](#SmilesDrawer.ArrayHelper.sortByAtomicNumberDesc) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.deepCopy(arr)](#SmilesDrawer.ArrayHelper.deepCopy) ⇒ <code>Array</code>

<a name="SmilesDrawer.ArrayHelper.clone"></a>

#### ArrayHelper.clone(arr) ⇒ <code>\*</code>
Clone an array or an object. If an object is passed, a shallow clone will be created.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>\*</code> - A clone of the array or object.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>\*</code> | The array or object to be cloned. |

<a name="SmilesDrawer.ArrayHelper.print"></a>

#### ArrayHelper.print(arr) ⇒ <code>String</code>
Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>String</code> - A string representation of the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;Object&gt;</code> | An array. |
| arr[].id | <code>\*</code> | If the array contains an object with the property 'id', the properties value is printed. Else, the array elements value is printend. |

<a name="SmilesDrawer.ArrayHelper.each"></a>

#### ArrayHelper.each(arr, callback)
Run a function for each element in the array. The element is supplied as an argument for the callback function

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| callback | <code>function</code> | The callback function that is called for each element. |

<a name="SmilesDrawer.ArrayHelper.get"></a>

#### ArrayHelper.get(arr, property, value) ⇒ <code>\*</code>
Return the array element from an array containing objects, where a property of the object is set to a given value.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>\*</code> - The array element matching the value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| property | <code>String</code> &#124; <code>Number</code> | A property contained within an object in the array. |
| value | <code>String</code> &#124; <code>Number</code> | The value of the property. |

<a name="SmilesDrawer.ArrayHelper.contains"></a>

#### ArrayHelper.contains(arr, options) ⇒ <code>Boolean</code>
Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Boolean</code> - A boolean whether or not the array contains a value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| options | <code>Object</code> | See method description. |
| options.property | <code>String</code> | The property on which to check. |
| options.value | <code>\*</code> | The value for which to check. |
| [options.func] | <code>function</code> | A custom property function. |

<a name="SmilesDrawer.ArrayHelper.intersection"></a>

#### ArrayHelper.intersection(arrA, arrB) ⇒ <code>Array</code>
Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array</code> - The intersecting vlaues.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.unique"></a>

#### ArrayHelper.unique(arr) ⇒ <code>Array</code>
Returns an array of unique elements contained in an array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array</code> - An array of unique elements contained within the array supplied as an argument.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.count"></a>

#### ArrayHelper.count(arr, value) ⇒ <code>Number</code>
Count the number of occurences of a value in an array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Number</code> - The number of occurences of a value in the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be counted. |

<a name="SmilesDrawer.ArrayHelper.toggle"></a>

#### ArrayHelper.toggle(arr, value) ⇒ <code>Array</code>
Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array</code> - The toggled array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be toggled. |

<a name="SmilesDrawer.ArrayHelper.remove"></a>

#### ArrayHelper.remove(arr, value) ⇒ <code>Array</code>
Remove a value from an array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array</code> - A new array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="SmilesDrawer.ArrayHelper.removeUnique"></a>

#### ArrayHelper.removeUnique(arr, value) ⇒ <code>Array</code>
Remove a value from an array with unique values.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array</code> - An array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="SmilesDrawer.ArrayHelper.removeAll"></a>

#### ArrayHelper.removeAll(arrA, arrB) ⇒ <code>Array</code>
Remove all elements contained in one array from another array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array</code> - The filtered array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | The array to be filtered. |
| arrB | <code>Array</code> | The array containing elements that will be removed from the other array. |

<a name="SmilesDrawer.ArrayHelper.merge"></a>

#### ArrayHelper.merge(arrA, arrB) ⇒ <code>Array</code>
Merges two arrays and returns the result. The first array will be appended to the second array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array</code> - The merged array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.containsAll"></a>

#### ArrayHelper.containsAll(arrA, arrB) ⇒ <code>Boolean</code>
Checks whether or not an array contains all the elements of another array, without regard to the order.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not both array contain the same elements.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>Array</code> | An array. |
| arrB | <code>Array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.sortByAtomicNumberDesc"></a>

#### ArrayHelper.sortByAtomicNumberDesc(arr) ⇒ <code>Array.&lt;Object&gt;</code>
Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - The array sorted by atomic number. Example of an array entry: { atomicNumber: 2, vertexId: 5 }.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;Object&gt;</code> | An array of vertex ids with their associated atomic numbers. |
| arr[].vertexId | <code>Number</code> | A vertex id. |
| arr[].atomicNumber | <code>Number</code> | The atomic number associated with the vertex id. |

<a name="SmilesDrawer.ArrayHelper.deepCopy"></a>

#### ArrayHelper.deepCopy(arr) ⇒ <code>Array</code>
Copies a an n-dimensional array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>Array</code> - The copy.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array to be copied. |

<a name="SmilesDrawer.Atom"></a>

### SmilesDrawer.Atom
A class representing an atom.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| element | <code>String</code> | The element symbol of this atom. Single-letter symbols are always uppercase. Examples: H, C, F, Br, Si, ... |
| drawExplicit | <code>Boolean</code> | A boolean indicating whether or not this atom is drawn explicitly (for example, a carbon atom). This overrides the default behaviour. |
| ringbonds | <code>Array.&lt;Object&gt;</code> | An array containing the ringbond ids and bond types as specified in the original SMILE. |
| ringbonds[].id | <code>Number</code> | The ringbond id as defined in the SMILES. |
| ringbonds[].bondType | <code>String</code> | The bond type of the ringbond as defined in the SMILES. |
| rings | <code>Array.&lt;Number&gt;</code> | The ids of rings which contain this atom. |
| bondType | <code>String</code> | The bond type associated with this array. Examples: -, =, #, ... |
| isBridge | <code>Boolean</code> | A boolean indicating whether or not this atom is part of a bridge in a bridged ring (contained by the largest ring). |
| isBridgeNode | <code>Boolean</code> | A boolean indicating whether or not this atom is a bridge node (a member of the largest ring in a bridged ring which is connected to a bridge-atom). |
| originalRings | <code>Array.&lt;Number&gt;</code> | Used to back up rings when they are replaced by a bridged ring. |
| bridgedRing | <code>Number</code> | The id of the bridged ring if the atom is part of a bridged ring. |
| anchoredRings | <code>Array.&lt;Number&gt;</code> | The ids of the rings that are anchored to this atom. The centers of anchored rings are translated when this atom is translated. |
| bracket | <code>Object</code> | If this atom is defined as a bracket atom in the original SMILES, this object contains all the bracket information. Example: { hcount: {Number}, charge: ['--', '-', '+', '++'], isotope: {Number} }. |
| chiral | <code>Number</code> | EXPERIMENTAL: Specifies chirality. |
| attachedPseudoElements | <code>Array.&lt;Object&gt;</code> | A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count. |
| attachedPseudoElement[].element | <code>String</code> | The element symbol. |
| attachedPseudoElement[].count | <code>Number</code> | The number of occurences that match the key. |
| attachedPseudoElement[].hyrogenCount | <code>Number</code> | The number of hydrogens attached to each atom matching the key. |
| hasAttachedPseudoElements | <code>Boolean</code> | A boolean indicating whether or not this attom will be drawn with an attached pseudo element or concatinated elements. |
| isDrawn | <code>Boolean</code> | A boolean indicating whether or not this atom is drawn. In contrast to drawExplicit, the bond is drawn neither. |
| isConnectedToRing | <code>Boolean</code> | A boolean indicating whether or not this atom is directly connected (but not a member of) a ring. |
| neighbouringElements | <code>Array.&lt;String&gt;</code> | An array containing the element symbols of neighbouring atoms. |
| isPartOfAromaticRing | <code>Boolean</code> | A boolean indicating whether or not this atom is part of an explicitly defined aromatic ring. Example: c1ccccc1. |
| bondCount | <code>Number</code> | The number of bonds in which this atom is participating. |


* [.Atom](#SmilesDrawer.Atom)
    * [new SmilesDrawer.Atom(element, [bondType])](#new_SmilesDrawer.Atom_new)
    * _instance_
        * [.addNeighbouringElement(element)](#SmilesDrawer.Atom+addNeighbouringElement)
        * [.attachPseudoElement(element, previousElement, [hydrogenCount])](#SmilesDrawer.Atom+attachPseudoElement)
        * [.getAttachedPseudoElements()](#SmilesDrawer.Atom+getAttachedPseudoElements) ⇒ <code>Object</code>
        * [.getAttachedPseudoElementsCount()](#SmilesDrawer.Atom+getAttachedPseudoElementsCount) ⇒ <code>Number</code>
        * [.addAnchoredRing(ringId)](#SmilesDrawer.Atom+addAnchoredRing)
        * [.getRingbondCount()](#SmilesDrawer.Atom+getRingbondCount) ⇒ <code>Number</code>
        * [.canRotate()](#SmilesDrawer.Atom+canRotate) ⇒ <code>Boolean</code>
        * [.hasRingbonds()](#SmilesDrawer.Atom+hasRingbonds) ⇒ <code>Boolean</code>
        * [.getMaxRingbond()](#SmilesDrawer.Atom+getMaxRingbond) ⇒ <code>Number</code>
        * [.isInRing()](#SmilesDrawer.Atom+isInRing) ⇒ <code>Boolean</code>
        * [.hasRing(ringId)](#SmilesDrawer.Atom+hasRing) ⇒ <code>Boolean</code>
        * [.backupRings()](#SmilesDrawer.Atom+backupRings)
        * [.restoreRings()](#SmilesDrawer.Atom+restoreRings)
        * [.haveCommonRingbond(atomA, atomB)](#SmilesDrawer.Atom+haveCommonRingbond) ⇒ <code>Boolean</code>
        * [.maxCommonRingbond(atomA, atomB)](#SmilesDrawer.Atom+maxCommonRingbond) ⇒ <code>Number</code>
        * [.getOrder(center)](#SmilesDrawer.Atom+getOrder) ⇒ <code>Number</code>
        * [.setOrder(center, order)](#SmilesDrawer.Atom+setOrder)
        * [.neighbouringElementsEqual(arr)](#SmilesDrawer.Atom+neighbouringElementsEqual) ⇒ <code>Boolean</code>
        * [.getAtomicNumber()](#SmilesDrawer.Atom+getAtomicNumber) ⇒ <code>Number</code>
    * _static_
        * [.maxBonds](#SmilesDrawer.Atom.maxBonds)
        * [.atomicNumbers](#SmilesDrawer.Atom.atomicNumbers)
        * [.sortByAtomicNumber(root, neighbours, vertices, rings)](#SmilesDrawer.Atom.sortByAtomicNumber) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.hasDuplicateAtomicNumbers(sortedAtomicNumbers)](#SmilesDrawer.Atom.hasDuplicateAtomicNumbers) ⇒ <code>Boolean</code>
        * [.getDuplicateAtomicNumbers(sortedAtomicNumbers)](#SmilesDrawer.Atom.getDuplicateAtomicNumbers) ⇒ <code>Array.&lt;Array&gt;</code>

<a name="new_SmilesDrawer.Atom_new"></a>

#### new SmilesDrawer.Atom(element, [bondType])
The constructor of the class Atom.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>String</code> |  | The one-letter code of the element. |
| [bondType] | <code>String</code> | <code>&#x27;-&#x27;</code> | The type of the bond associated with this atom. |

<a name="SmilesDrawer.Atom+addNeighbouringElement"></a>

#### atom.addNeighbouringElement(element)
Adds a neighbouring element to this atom.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>String</code> | A string representing an element. |

<a name="SmilesDrawer.Atom+attachPseudoElement"></a>

#### atom.attachPseudoElement(element, previousElement, [hydrogenCount])
Attaches a pseudo element (e.g. Ac) to the atom.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>String</code> |  | The element identifier (e.g. Br, C, ...). |
| previousElement | <code>String</code> |  | The element that is part of the main chain (not the terminals that are converted to the pseudo element or concatinated). |
| [hydrogenCount] | <code>Number</code> | <code>0</code> | The number of hydrogens for the element. |

<a name="SmilesDrawer.Atom+getAttachedPseudoElements"></a>

#### atom.getAttachedPseudoElements() ⇒ <code>Object</code>
Returns the attached pseudo elements sorted by hydrogen count (ascending).

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Object</code> - The sorted attached pseudo elements.  
<a name="SmilesDrawer.Atom+getAttachedPseudoElementsCount"></a>

#### atom.getAttachedPseudoElementsCount() ⇒ <code>Number</code>
Returns the number of attached pseudo elements.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Number</code> - The number of attached pseudo elements.  
<a name="SmilesDrawer.Atom+addAnchoredRing"></a>

#### atom.addAnchoredRing(ringId)
Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.Atom+getRingbondCount"></a>

#### atom.getRingbondCount() ⇒ <code>Number</code>
Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Number</code> - The number of ringbonds this atom is connected to.  
<a name="SmilesDrawer.Atom+canRotate"></a>

#### atom.canRotate() ⇒ <code>Boolean</code>
Check whether or not this atom is rotatable. The atom is deemed rotatable if it is neither a member of a ring nor participating in a bond other than a single bond. TODO: Check the chemistry.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this atom is rotatable.  
<a name="SmilesDrawer.Atom+hasRingbonds"></a>

#### atom.hasRingbonds() ⇒ <code>Boolean</code>
Returns whether or not this atom participates in ringbonds (breaks in the ring in the MST).

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this atom is associated with a ringbond.  
<a name="SmilesDrawer.Atom+getMaxRingbond"></a>

#### atom.getMaxRingbond() ⇒ <code>Number</code>
Returns the id of the ringbond with the highest id.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Number</code> - The highest ringbond id associated with this atom.  
<a name="SmilesDrawer.Atom+isInRing"></a>

#### atom.isInRing() ⇒ <code>Boolean</code>
Checks whether or not this atom is part of a ring.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this atom is part of a ring.  
<a name="SmilesDrawer.Atom+hasRing"></a>

#### atom.hasRing(ringId) ⇒ <code>Boolean</code>
Checks whether or not this atom is a member of a given ring.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this atom is a member of a given ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.Atom+backupRings"></a>

#### atom.backupRings()
Backs up the current rings.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
<a name="SmilesDrawer.Atom+restoreRings"></a>

#### atom.restoreRings()
Restores the most recent backed up rings.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
<a name="SmilesDrawer.Atom+haveCommonRingbond"></a>

#### atom.haveCommonRingbond(atomA, atomB) ⇒ <code>Boolean</code>
Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two atoms share a common ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| atomA | <code>[Atom](#SmilesDrawer.Atom)</code> | An atom. |
| atomB | <code>[Atom](#SmilesDrawer.Atom)</code> | An atom. |

<a name="SmilesDrawer.Atom+maxCommonRingbond"></a>

#### atom.maxCommonRingbond(atomA, atomB) ⇒ <code>Number</code>
Get the highest numbered ringbond shared by two atoms. A ringbond is a break in a ring created when generating the spanning tree of a structure.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Number</code> - The number of the maximum ringbond shared by two atoms.  

| Param | Type | Description |
| --- | --- | --- |
| atomA | <code>[Atom](#SmilesDrawer.Atom)</code> | An atom. |
| atomB | <code>[Atom](#SmilesDrawer.Atom)</code> | An atom. |

<a name="SmilesDrawer.Atom+getOrder"></a>

#### atom.getOrder(center) ⇒ <code>Number</code>
Returns the order of this atom given a central atom.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Number</code> - The order of this atom in respect to the center atom.  

| Param | Type | Description |
| --- | --- | --- |
| center | <code>Number</code> | The id of the central atom in respect to which the order is defined. |

<a name="SmilesDrawer.Atom+setOrder"></a>

#### atom.setOrder(center, order)
Sets the order of this atom given a center. This is required since two atoms can have an order in respect to two different centers when connected by ringbonds.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| center | <code>Number</code> | The id of the central atom in respect to which the order is defined. |
| order | <code>Number</code> | The order of this atom. |

<a name="SmilesDrawer.Atom+neighbouringElementsEqual"></a>

#### atom.neighbouringElementsEqual(arr) ⇒ <code>Boolean</code>
Check whether or not the neighbouring elements of this atom equal the supplied array.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the neighbours match the supplied array of elements.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;String&gt;</code> | An array containing all the elements that are neighbouring this atom. E.g. ['C', 'O', 'O', 'N'] |

<a name="SmilesDrawer.Atom+getAtomicNumber"></a>

#### atom.getAtomicNumber() ⇒ <code>Number</code>
Get the atomic number of this atom.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Number</code> - The atomic number of this atom.  
<a name="SmilesDrawer.Atom.maxBonds"></a>

#### Atom.maxBonds
A map mapping element symbols to their maximum bonds.

**Kind**: static property of <code>[Atom](#SmilesDrawer.Atom)</code>  
<a name="SmilesDrawer.Atom.atomicNumbers"></a>

#### Atom.atomicNumbers
A map mapping element symbols to the atomic number.

**Kind**: static property of <code>[Atom](#SmilesDrawer.Atom)</code>  
<a name="SmilesDrawer.Atom.sortByAtomicNumber"></a>

#### Atom.sortByAtomicNumber(root, neighbours, vertices, rings) ⇒ <code>Array.&lt;Object&gt;</code>
Sorts an array of vertices by their respecitve atomic number.

**Kind**: static method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - The array sorted by atomic number. Example of an array entry: { atomicNumber: 2, vertexId: 5 }.  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>[Vertex](#SmilesDrawer.Vertex)</code> | The central vertex |
| neighbours | <code>Array.&lt;Number&gt;</code> | An array of vertex ids. |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | An array containing the vertices associated with the current molecule. |
| rings | <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code> | An array containing the rings associated with the current molecule. |

<a name="SmilesDrawer.Atom.hasDuplicateAtomicNumbers"></a>

#### Atom.hasDuplicateAtomicNumbers(sortedAtomicNumbers) ⇒ <code>Boolean</code>
Checks wheter or not two atoms have the same atomic number

**Kind**: static method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not there are duplicate atomic numbers.  

| Param | Type | Description |
| --- | --- | --- |
| sortedAtomicNumbers | <code>Array.&lt;Object&gt;</code> | An array of vertex ids with their associated atomic numbers. |
| sortedAtomicNumbers[].vertexId | <code>Number</code> | A vertex id. |
| sortedAtomicNumbers[].atomicNumber | <code>Number</code> | The atomic number associated with the vertex id. |

<a name="SmilesDrawer.Atom.getDuplicateAtomicNumbers"></a>

#### Atom.getDuplicateAtomicNumbers(sortedAtomicNumbers) ⇒ <code>Array.&lt;Array&gt;</code>
Returns sets of duplicate atomic numbers.

**Kind**: static method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - An array of arrays containing the indices of duplicate atomic numbers.  

| Param | Type | Description |
| --- | --- | --- |
| sortedAtomicNumbers | <code>Array.&lt;Object&gt;</code> | An array of vertex ids with their associated atomic numbers. |
| sortedAtomicNumbers[].vertexId | <code>Number</code> | A vertex id. |
| sortedAtomicNumbers[].atomicNumber | <code>Number</code> | The atomic number associated with the vertex id. |

<a name="SmilesDrawer.CanvasWrapper"></a>

### SmilesDrawer.CanvasWrapper
A class wrapping a canvas element.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
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


* [.CanvasWrapper](#SmilesDrawer.CanvasWrapper)
    * [new SmilesDrawer.CanvasWrapper(target, theme, options)](#new_SmilesDrawer.CanvasWrapper_new)
    * [.updateSize(width, height)](#SmilesDrawer.CanvasWrapper+updateSize)
    * [.setTheme(theme)](#SmilesDrawer.CanvasWrapper+setTheme)
    * [.scale(vertices)](#SmilesDrawer.CanvasWrapper+scale)
    * [.reset()](#SmilesDrawer.CanvasWrapper+reset)
    * [.getColor(key)](#SmilesDrawer.CanvasWrapper+getColor) ⇒ <code>String</code>
    * [.drawCircle(x, y, radius, color, [fill], [debug], [debugText])](#SmilesDrawer.CanvasWrapper+drawCircle)
    * [.drawLine(line, [thickness], [dashed], [alpha])](#SmilesDrawer.CanvasWrapper+drawLine)
    * [.drawWedge(line, width)](#SmilesDrawer.CanvasWrapper+drawWedge)
    * [.drawDashedWedge(line, width)](#SmilesDrawer.CanvasWrapper+drawDashedWedge)
    * [.drawDebugText(x, y, text)](#SmilesDrawer.CanvasWrapper+drawDebugText)
    * [.drawBall(x, y, elementName)](#SmilesDrawer.CanvasWrapper+drawBall)
    * [.drawPoint(x, y, elementName)](#SmilesDrawer.CanvasWrapper+drawPoint)
    * [.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, attachedPseudoElements)](#SmilesDrawer.CanvasWrapper+drawText)
    * [.drawDebugPoint(x, y, [debugText], [color])](#SmilesDrawer.CanvasWrapper+drawDebugPoint)
    * [.drawAromaticityRing(ring)](#SmilesDrawer.CanvasWrapper+drawAromaticityRing)
    * [.clear()](#SmilesDrawer.CanvasWrapper+clear)

<a name="new_SmilesDrawer.CanvasWrapper_new"></a>

#### new SmilesDrawer.CanvasWrapper(target, theme, options)
The constructor for the class CanvasWrapper.


| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> &#124; <code>HTMLElement</code> | The canvas id or the canvas HTMLElement. |
| theme | <code>Object</code> | A theme from the smiles drawer options. |
| options | <code>Object</code> | The smiles drawer options object. |

<a name="SmilesDrawer.CanvasWrapper+updateSize"></a>

#### canvasWrapper.updateSize(width, height)
Update the width and height of the canvas

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type |
| --- | --- |
| width | <code>Number</code> | 
| height | <code>Number</code> | 

<a name="SmilesDrawer.CanvasWrapper+setTheme"></a>

#### canvasWrapper.setTheme(theme)
Sets a provided theme.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>Object</code> | A theme from the smiles drawer options. |

<a name="SmilesDrawer.CanvasWrapper+scale"></a>

#### canvasWrapper.scale(vertices)
Scale the canvas based on vertex positions.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | An array of vertices containing the vertices associated with the current molecule. |

<a name="SmilesDrawer.CanvasWrapper+reset"></a>

#### canvasWrapper.reset()
Resets the transform of the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  
<a name="SmilesDrawer.CanvasWrapper+getColor"></a>

#### canvasWrapper.getColor(key) ⇒ <code>String</code>
Returns the hex code of a color associated with a key from the current theme.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  
**Returns**: <code>String</code> - A color hex value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The color key in the theme (e.g. C, N, BACKGROUND, ...). |

<a name="SmilesDrawer.CanvasWrapper+drawCircle"></a>

#### canvasWrapper.drawCircle(x, y, radius, color, [fill], [debug], [debugText])
Draws a circle to a canvas context.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>Number</code> |  | The x coordinate of the circles center. |
| y | <code>Number</code> |  | The y coordinate of the circles center. |
| radius | <code>Number</code> |  | The radius of the circle |
| color | <code>String</code> |  | A hex encoded color. |
| [fill] | <code>Boolean</code> | <code>true</code> | Whether to fill or stroke the circle. |
| [debug] | <code>Boolean</code> | <code>false</code> | Draw in debug mode. |
| [debugText] | <code>String</code> | <code>&#x27;&#x27;</code> | A debug message. |

<a name="SmilesDrawer.CanvasWrapper+drawLine"></a>

#### canvasWrapper.drawLine(line, [thickness], [dashed], [alpha])
Draw a line to a canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>[Line](#SmilesDrawer.Line)</code> |  | A line. |
| [thickness] | <code>Number</code> | <code>1.5</code> | The thickness of the line. |
| [dashed] | <code>Boolean</code> | <code>false</code> | Whether or not the line is dashed. |
| [alpha] | <code>Number</code> | <code>1.0</code> | The alpha value of the color. |

<a name="SmilesDrawer.CanvasWrapper+drawWedge"></a>

#### canvasWrapper.drawWedge(line, width)
Draw a wedge on the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>[Line](#SmilesDrawer.Line)</code> |  | A line. |
| width | <code>Number</code> | <code>3</code> | The wedge width. |

<a name="SmilesDrawer.CanvasWrapper+drawDashedWedge"></a>

#### canvasWrapper.drawDashedWedge(line, width)
Draw a dashed wedge on the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>[Line](#SmilesDrawer.Line)</code> |  | A line. |
| width | <code>Number</code> | <code>6</code> | The wedge width. |

<a name="SmilesDrawer.CanvasWrapper+drawDebugText"></a>

#### canvasWrapper.drawDebugText(x, y, text)
Draws a debug text message at a given position

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x coordinate. |
| y | <code>Number</code> | The y coordinate. |
| text | <code>String</code> | The debug text. |

<a name="SmilesDrawer.CanvasWrapper+drawBall"></a>

#### canvasWrapper.drawBall(x, y, elementName)
Draw a ball to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x position of the text. |
| y | <code>Number</code> | The y position of the text. |
| elementName | <code>String</code> | The name of the element (single-letter). |

<a name="SmilesDrawer.CanvasWrapper+drawPoint"></a>

#### canvasWrapper.drawPoint(x, y, elementName)
Draw a point to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x position of the point. |
| y | <code>Number</code> | The y position of the point. |
| elementName | <code>String</code> | The name of the element (single-letter). |

<a name="SmilesDrawer.CanvasWrapper+drawText"></a>

#### canvasWrapper.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, attachedPseudoElements)
Draw a text to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x position of the text. |
| y | <code>Number</code> | The y position of the text. |
| elementName | <code>String</code> | The name of the element (single-letter). |
| hydrogens | <code>Number</code> | The number of hydrogen atoms. |
| direction | <code>String</code> | The direction of the text in relation to the associated vertex. |
| isTerminal | <code>Boolean</code> | A boolean indicating whether or not the vertex is terminal. |
| charge | <code>String</code> | The charge of the atom. |
| isotope | <code>Number</code> | The isotope number. |
| attachedPseudoElements | <code>Array.&lt;Object&gt;</code> | A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count. |
| attachedPseudoElement[].element | <code>String</code> | The element symbol. |
| attachedPseudoElement[].count | <code>Number</code> | The number of occurences that match the key. |
| attachedPseudoElement[].hyrogenCount | <code>Number</code> | The number of hydrogens attached to each atom matching the key. |

<a name="SmilesDrawer.CanvasWrapper+drawDebugPoint"></a>

#### canvasWrapper.drawDebugPoint(x, y, [debugText], [color])
Draws a dubug dot at a given coordinate and adds text.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>Number</code> |  | The x coordinate. |
| y | <code>Number</code> |  | The y coordindate. |
| [debugText] | <code>String</code> | <code>&#x27;&#x27;</code> | A string. |
| [color] | <code>String</code> | <code>&#x27;#f00&#x27;</code> | A color in hex form. |

<a name="SmilesDrawer.CanvasWrapper+drawAromaticityRing"></a>

#### canvasWrapper.drawAromaticityRing(ring)
Draws a ring inside a provided ring, indicating aromaticity.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#SmilesDrawer.Ring)</code> | A ring. |

<a name="SmilesDrawer.CanvasWrapper+clear"></a>

#### canvasWrapper.clear()
Clear the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  
<a name="SmilesDrawer.Drawer"></a>

### SmilesDrawer.Drawer
The main class of the application representing the smiles drawer

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| graph | <code>[Graph](#SmilesDrawer.Graph)</code> | The graph associated with this SmilesDrawer.Drawer instance. |
| ringIdCounter | <code>Number</code> | An internal counter to keep track of ring ids. |
| ringConnectionIdCounter | <code>Number</code> | An internal counter to keep track of ring connection ids. |
| canvasWrapper | <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code> | The SmilesDrawer.CanvasWrapper associated with this SmilesDrawer.Drawer instance. |
| totalOverlapScore | <code>Number</code> | The current internal total overlap score. |
| defaultOptions | <code>Object</code> | The default options. |
| opts | <code>Object</code> | The merged options. |
| theme | <code>Object</code> | The current theme. |


* [.Drawer](#SmilesDrawer.Drawer)
    * [new SmilesDrawer.Drawer(options)](#new_SmilesDrawer.Drawer_new)
    * [.extend()](#SmilesDrawer.Drawer+extend)
    * [.draw(data, target, themeName, infoOnly)](#SmilesDrawer.Drawer+draw)
    * [.edgeRingCount(edgeId)](#SmilesDrawer.Drawer+edgeRingCount) ⇒ <code>Number</code>
    * [.getBridgedRings()](#SmilesDrawer.Drawer+getBridgedRings) ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
    * [.getFusedRings()](#SmilesDrawer.Drawer+getFusedRings) ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
    * [.getSpiros()](#SmilesDrawer.Drawer+getSpiros) ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
    * [.printRingInfo()](#SmilesDrawer.Drawer+printRingInfo) ⇒ <code>String</code>
    * [.getTotalOverlapScore()](#SmilesDrawer.Drawer+getTotalOverlapScore) ⇒ <code>Number</code>
    * [.getRingCount()](#SmilesDrawer.Drawer+getRingCount) ⇒ <code>Number</code>
    * [.hasBridgedRing()](#SmilesDrawer.Drawer+hasBridgedRing) ⇒ <code>Boolean</code>
    * [.getHeavyAtomCount()](#SmilesDrawer.Drawer+getHeavyAtomCount) ⇒ <code>Number</code>
    * [.getRingbondType(vertexA, vertexB)](#SmilesDrawer.Drawer+getRingbondType) ⇒ <code>String</code> &#124; <code>null</code>
    * [.initRings()](#SmilesDrawer.Drawer+initRings)
    * [.getBridgedRingRings(ringId)](#SmilesDrawer.Drawer+getBridgedRingRings) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.isPartOfBridgedRing(ringId)](#SmilesDrawer.Drawer+isPartOfBridgedRing) ⇒ <code>Boolean</code>
    * [.createBridgedRing(ringIds, sourceVertexId)](#SmilesDrawer.Drawer+createBridgedRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
    * [.areVerticesInSameRing(vertexA, vertexB)](#SmilesDrawer.Drawer+areVerticesInSameRing) ⇒ <code>Boolean</code>
    * [.getCommonRings(vertexA, vertexB)](#SmilesDrawer.Drawer+getCommonRings) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.getSmallestCommonRing(vertexA, vertexB)](#SmilesDrawer.Drawer+getSmallestCommonRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>null</code>
    * [.getLargestOrAromaticCommonRing(vertexA, vertexB)](#SmilesDrawer.Drawer+getLargestOrAromaticCommonRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>null</code>
    * [.getVerticesAt(position, radius, excludeVertexId)](#SmilesDrawer.Drawer+getVerticesAt) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.getClosestVertex(vertex)](#SmilesDrawer.Drawer+getClosestVertex) ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
    * [.getClosestEndpointVertex(vertex)](#SmilesDrawer.Drawer+getClosestEndpointVertex) ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
    * [.addRing(ring)](#SmilesDrawer.Drawer+addRing) ⇒ <code>Number</code>
    * [.removeRing(ringId)](#SmilesDrawer.Drawer+removeRing)
    * [.getRing(ringId)](#SmilesDrawer.Drawer+getRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
    * [.addRingConnection(ringConnection)](#SmilesDrawer.Drawer+addRingConnection) ⇒ <code>Number</code>
    * [.removeRingConnection(ringConnectionId)](#SmilesDrawer.Drawer+removeRingConnection)
    * [.removeRingConnectionsBetween(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+removeRingConnectionsBetween)
    * [.getRingConnection(id)](#SmilesDrawer.Drawer+getRingConnection) ⇒ <code>[RingConnection](#SmilesDrawer.RingConnection)</code>
    * [.getRingConnections(ringId, [ringIds])](#SmilesDrawer.Drawer+getRingConnections) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.isRingConnection(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+isRingConnection) ⇒ <code>Boolean</code>
    * [.getOverlapScore()](#SmilesDrawer.Drawer+getOverlapScore) ⇒ <code>Object</code>
    * [.chooseSide(vertexA, vertexB, sides)](#SmilesDrawer.Drawer+chooseSide) ⇒ <code>Object</code>
    * [.areConnected(vertexIdA, vertexIdA)](#SmilesDrawer.Drawer+areConnected) ⇒ <code>Boolean</code>
    * [.getEdgeWeight(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+getEdgeWeight) ⇒ <code>Number</code> &#124; <code>null</code>
    * [.setRingCenter(ring)](#SmilesDrawer.Drawer+setRingCenter)
    * [.getSubringCenter(ring, vertex)](#SmilesDrawer.Drawer+getSubringCenter) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
    * [.drawEdges(debug)](#SmilesDrawer.Drawer+drawEdges)
    * [.drawEdge(edgeId, debug)](#SmilesDrawer.Drawer+drawEdge)
    * [.drawVertices(debug)](#SmilesDrawer.Drawer+drawVertices)
    * [.position()](#SmilesDrawer.Drawer+position)
    * [.clearPositions()](#SmilesDrawer.Drawer+clearPositions)
    * [.restorePositions()](#SmilesDrawer.Drawer+restorePositions)
    * [.backupRingInformation()](#SmilesDrawer.Drawer+backupRingInformation)
    * [.restoreRingInformation()](#SmilesDrawer.Drawer+restoreRingInformation)
    * [.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])](#SmilesDrawer.Drawer+createRing)
    * [.rotateSubtree(vertexId, parentVertexId, angle, center)](#SmilesDrawer.Drawer+rotateSubtree)
    * [.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores)](#SmilesDrawer.Drawer+getSubtreeOverlapScore) ⇒ <code>Object</code>
    * [.getCurrentCenterOfMass()](#SmilesDrawer.Drawer+getCurrentCenterOfMass) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
    * [.getCurrentCenterOfMassInNeigbourhood(vec, [r])](#SmilesDrawer.Drawer+getCurrentCenterOfMassInNeigbourhood) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
    * [.resolvePrimaryOverlaps()](#SmilesDrawer.Drawer+resolvePrimaryOverlaps)
    * [.resolveSecondaryOverlaps(scores)](#SmilesDrawer.Drawer+resolveSecondaryOverlaps)
    * [.createNextBond(vertex, previousVertex, ringOrAngle, dir)](#SmilesDrawer.Drawer+createNextBond)
    * [.getCommonRingbondNeighbour(vertex)](#SmilesDrawer.Drawer+getCommonRingbondNeighbour) ⇒ <code>Number</code> &#124; <code>null</code>
    * [.isPointInRing(vec)](#SmilesDrawer.Drawer+isPointInRing) ⇒ <code>Boolean</code>
    * [.isEdgeInRing(edge)](#SmilesDrawer.Drawer+isEdgeInRing) ⇒ <code>Boolean</code>
    * [.isEdgeRotatable(edge)](#SmilesDrawer.Drawer+isEdgeRotatable) ⇒ <code>Boolean</code>
    * [.isRingAromatic(ring)](#SmilesDrawer.Drawer+isRingAromatic) ⇒ <code>Boolean</code>
    * [.getEdgeNormals(edge)](#SmilesDrawer.Drawer+getEdgeNormals) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
    * [.getTreeDepth(vertexId, parentVertexId)](#SmilesDrawer.Drawer+getTreeDepth) ⇒ <code>Number</code>
    * [.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst])](#SmilesDrawer.Drawer+traverseTree)
    * [.getBondCount(vertex)](#SmilesDrawer.Drawer+getBondCount) ⇒ <code>Number</code>
    * [.getNonRingNeighbours(vertexId)](#SmilesDrawer.Drawer+getNonRingNeighbours) ⇒ <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code>
    * [.initPseudoElements()](#SmilesDrawer.Drawer+initPseudoElements)

<a name="new_SmilesDrawer.Drawer_new"></a>

#### new SmilesDrawer.Drawer(options)
The constructor for the class SmilesDrawer.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing custom values for different options. It is merged with the default options. |

<a name="SmilesDrawer.Drawer+extend"></a>

#### drawer.extend()
A helper method to extend the default options with user supplied ones.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+draw"></a>

#### drawer.draw(data, target, themeName, infoOnly)
Draws the parsed smiles data to a canvas element.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The tree returned by the smiles parser. |
| target | <code>String</code> &#124; <code>HTMLElement</code> |  | The id of the HTML canvas element the structure is drawn to - or the element itself. |
| themeName | <code>String</code> | <code>&#x27;dark&#x27;</code> | The name of the theme to use. Built-in themes are 'light' and 'dark'. |
| infoOnly | <code>Boolean</code> | <code>false</code> | Only output info on the molecule without drawing anything to the canvas. |

<a name="SmilesDrawer.Drawer+edgeRingCount"></a>

#### drawer.edgeRingCount(edgeId) ⇒ <code>Number</code>
Returns the number of rings this edge is a part of.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> - The number of rings the provided edge is part of.  

| Param | Type | Description |
| --- | --- | --- |
| edgeId | <code>Number</code> | The id of an edge. |

<a name="SmilesDrawer.Drawer+getBridgedRings"></a>

#### drawer.getBridgedRings() ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
Returns an array containing the bridged rings associated with this  molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code> - An array containing all bridged rings associated with this molecule.  
<a name="SmilesDrawer.Drawer+getFusedRings"></a>

#### drawer.getFusedRings() ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
Returns an array containing all fused rings associated with this molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code> - An array containing all fused rings associated with this molecule.  
<a name="SmilesDrawer.Drawer+getSpiros"></a>

#### drawer.getSpiros() ⇒ <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code>
Returns an array containing all spiros associated with this molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code> - An array containing all spiros associated with this molecule.  
<a name="SmilesDrawer.Drawer+printRingInfo"></a>

#### drawer.printRingInfo() ⇒ <code>String</code>
Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings)

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>String</code> - A string as described in the method description.  
<a name="SmilesDrawer.Drawer+getTotalOverlapScore"></a>

#### drawer.getTotalOverlapScore() ⇒ <code>Number</code>
Returns the total overlap score of the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> - The overlap score.  
<a name="SmilesDrawer.Drawer+getRingCount"></a>

#### drawer.getRingCount() ⇒ <code>Number</code>
Returns the ring count of the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> - The ring count.  
<a name="SmilesDrawer.Drawer+hasBridgedRing"></a>

#### drawer.hasBridgedRing() ⇒ <code>Boolean</code>
Checks whether or not the current molecule  a bridged ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the current molecule  a bridged ring.  
<a name="SmilesDrawer.Drawer+getHeavyAtomCount"></a>

#### drawer.getHeavyAtomCount() ⇒ <code>Number</code>
Returns the number of heavy atoms (non-hydrogen) in the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> - The heavy atom count.  
<a name="SmilesDrawer.Drawer+getRingbondType"></a>

#### drawer.getRingbondType(vertexA, vertexB) ⇒ <code>String</code> &#124; <code>null</code>
Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>String</code> &#124; <code>null</code> - Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |

<a name="SmilesDrawer.Drawer+initRings"></a>

#### drawer.initRings()
Initializes rings and ringbonds for the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+getBridgedRingRings"></a>

#### drawer.getBridgedRingRings(ringId) ⇒ <code>Array.&lt;Number&gt;</code>
Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing all ring ids of rings part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.Drawer+isPartOfBridgedRing"></a>

#### drawer.isPartOfBridgedRing(ringId) ⇒ <code>Boolean</code>
Checks whether or not a ring is part of a bridged ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.Drawer+createBridgedRing"></a>

#### drawer.createBridgedRing(ringIds, sourceVertexId) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
Creates a bridged ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Ring](#SmilesDrawer.Ring)</code> - The bridged ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringIds | <code>Array.&lt;Number&gt;</code> | An array of ids of rings involved in the bridged ring. |
| sourceVertexId | <code>Number</code> | The vertex id to start the bridged ring discovery from. |

<a name="SmilesDrawer.Drawer+areVerticesInSameRing"></a>

#### drawer.areVerticesInSameRing(vertexA, vertexB) ⇒ <code>Boolean</code>
Checks whether or not two vertices are in the same ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two vertices are in the same ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getCommonRings"></a>

#### drawer.getCommonRings(vertexA, vertexB) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of ring ids shared by both vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of ids of rings shared by the two vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getSmallestCommonRing"></a>

#### drawer.getSmallestCommonRing(vertexA, vertexB) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>null</code>
Returns the smallest ring shared by the two vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>null</code> - If a smallest common ring exists, that ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getLargestOrAromaticCommonRing"></a>

#### drawer.getLargestOrAromaticCommonRing(vertexA, vertexB) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>null</code>
Returns the aromatic or largest ring shared by the two vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>null</code> - If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getVerticesAt"></a>

#### drawer.getVerticesAt(position, radius, excludeVertexId) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of vertices positioned at a specified location.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing vertex ids in a given location.  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The position to search for vertices. |
| radius | <code>Number</code> | The radius within to search. |
| excludeVertexId | <code>Number</code> | A vertex id to be excluded from the search results. |

<a name="SmilesDrawer.Drawer+getClosestVertex"></a>

#### drawer.getClosestVertex(vertex) ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
Returns the closest vertex (connected as well as unconnected).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Vertex](#SmilesDrawer.Vertex)</code> - The closest vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | The vertex of which to find the closest other vertex. |

<a name="SmilesDrawer.Drawer+getClosestEndpointVertex"></a>

#### drawer.getClosestEndpointVertex(vertex) ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
Returns the closest vertex (connected as well as unconnected), which is an endpoint.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Vertex](#SmilesDrawer.Vertex)</code> - The closest endpoint vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | The vertex of which to find the closest other vertex. |

<a name="SmilesDrawer.Drawer+addRing"></a>

#### drawer.addRing(ring) ⇒ <code>Number</code>
Add a ring to this representation of a molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> - The ring id of the new ring.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#SmilesDrawer.Ring)</code> | A new ring. |

<a name="SmilesDrawer.Drawer+removeRing"></a>

#### drawer.removeRing(ringId)
Removes a ring from the array of rings associated with the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.Drawer+getRing"></a>

#### drawer.getRing(ringId) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Ring](#SmilesDrawer.Ring)</code> - A ring associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.Drawer+addRingConnection"></a>

#### drawer.addRingConnection(ringConnection) ⇒ <code>Number</code>
Add a ring connection to this representation of a molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> - The ring connection id of the new ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnection | <code>[RingConnection](#SmilesDrawer.RingConnection)</code> | A new ringConnection. |

<a name="SmilesDrawer.Drawer+removeRingConnection"></a>

#### drawer.removeRingConnection(ringConnectionId)
Removes a ring connection from the array of rings connections associated with the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringConnectionId | <code>Number</code> | A ring connection id. |

<a name="SmilesDrawer.Drawer+removeRingConnectionsBetween"></a>

#### drawer.removeRingConnectionsBetween(vertexIdA, vertexIdB)
Removes all ring connections between two vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+getRingConnection"></a>

#### drawer.getRingConnection(id) ⇒ <code>[RingConnection](#SmilesDrawer.RingConnection)</code>
Get a ring connection with a given id.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[RingConnection](#SmilesDrawer.RingConnection)</code> - The ring connection with the specified id.  

| Param | Type |
| --- | --- |
| id | <code>Number</code> | 

<a name="SmilesDrawer.Drawer+getRingConnections"></a>

#### drawer.getRingConnections(ringId, [ringIds]) ⇒ <code>Array.&lt;Number&gt;</code>
Get the ring connections associated with a ring, the ring connections between two rings or the ring connections between one ring and multiple other rings.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of ring connection ids.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ringId | <code>Number</code> |  | A ring id. |
| [ringIds] | <code>Number</code> &#124; <code>Array.&lt;Number&gt;</code> &#124; <code>null</code> | <code></code> | A ring id, an array of ring ids or null. |

<a name="SmilesDrawer.Drawer+isRingConnection"></a>

#### drawer.isRingConnection(vertexIdA, vertexIdB) ⇒ <code>Boolean</code>
Check whether or not the two vertices specified span a bond which is a ring connection (fused rings).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - Returns a boolean indicating whether or not the two vertices specify a ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+getOverlapScore"></a>

#### drawer.getOverlapScore() ⇒ <code>Object</code>
Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Object</code> - Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }  
<a name="SmilesDrawer.Drawer+chooseSide"></a>

#### drawer.chooseSide(vertexA, vertexB, sides) ⇒ <code>Object</code>
When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
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
| vertexA | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |
| vertexB | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |
| sides | <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code> | An array containing the two normals of the line spanned by the two provided vertices. |

<a name="SmilesDrawer.Drawer+areConnected"></a>

#### drawer.areConnected(vertexIdA, vertexIdA) ⇒ <code>Boolean</code>
Checks whether or not two vertices are connected.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two vertices are connected.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdA | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+getEdgeWeight"></a>

#### drawer.getEdgeWeight(vertexIdA, vertexIdB) ⇒ <code>Number</code> &#124; <code>null</code>
Returns the weight of the edge between two given vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> &#124; <code>null</code> - The weight of the edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+setRingCenter"></a>

#### drawer.setRingCenter(ring)
Returns the weight of the edge between two given vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#SmilesDrawer.Ring)</code> | A ring. |

<a name="SmilesDrawer.Drawer+getSubringCenter"></a>

#### drawer.getSubringCenter(ring, vertex) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Gets the center of a ring contained within a bridged ring and containing a given vertex.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - The center of the subring that containing the vertex.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#SmilesDrawer.Ring)</code> | A bridged ring. |
| vertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |

<a name="SmilesDrawer.Drawer+drawEdges"></a>

#### drawer.drawEdges(debug)
Draw the actual edges as bonds to the canvas.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug helpers. |

<a name="SmilesDrawer.Drawer+drawEdge"></a>

#### drawer.drawEdge(edgeId, debug)
Draw the an edge as a bonds to the canvas.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| edgeId | <code>Number</code> | An edge id. |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug helpers. |

<a name="SmilesDrawer.Drawer+drawVertices"></a>

#### drawer.drawVertices(debug)
Draws the vertices representing atoms to the canvas.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>Boolean</code> | A boolean indicating whether or not to draw debug messages to the canvas. |

<a name="SmilesDrawer.Drawer+position"></a>

#### drawer.position()
Position the vertices according to their bonds and properties.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+clearPositions"></a>

#### drawer.clearPositions()
Reset the positions of rings and vertices. The previous positions will be backed up.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+restorePositions"></a>

#### drawer.restorePositions()
Restore the positions backed up during the last clearPositions() call.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+backupRingInformation"></a>

#### drawer.backupRingInformation()
Stores the current information associated with rings.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+restoreRingInformation"></a>

#### drawer.restoreRingInformation()
Restores the most recently backed up information associated with rings.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+createRing"></a>

#### drawer.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])
Creates a new ring, that is, positiones all the vertices inside a ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ring | <code>[Ring](#SmilesDrawer.Ring)</code> |  | The ring to position. |
| [center] | <code>[Vector2](#SmilesDrawer.Vector2)</code> &#124; <code>null</code> | <code></code> | The center of the ring to be created. |
| [startVertex] | <code>[Vertex](#SmilesDrawer.Vertex)</code> &#124; <code>null</code> | <code></code> | The first vertex to be positioned inside the ring. |
| [previousVertex] | <code>[Vertex](#SmilesDrawer.Vertex)</code> &#124; <code>null</code> | <code></code> | The last vertex that was positioned. |
| [previousVertex] | <code>Boolean</code> | <code>false</code> | A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it. |

<a name="SmilesDrawer.Drawer+rotateSubtree"></a>

#### drawer.rotateSubtree(vertexId, parentVertexId, angle, center)
Rotate an entire subtree by an angle around a center.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>Number</code> | A vertex id in the previous direction of the subtree that is to rotate. |
| angle | <code>Number</code> | An angle in randians. |
| center | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The rotational center. |

<a name="SmilesDrawer.Drawer+getSubtreeOverlapScore"></a>

#### drawer.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) ⇒ <code>Object</code>
Gets the overlap score of a subtree.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Object</code> - An object containing the total overlap score and the center of mass of the subtree weighted by overlap score { value: 0.2, center: new SmilesDrawer.Vector2() }.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>Number</code> | A vertex id in the previous direction of the subtree. |
| vertexOverlapScores | <code>Array.&lt;Number&gt;</code> | An array containing the vertex overlap scores indexed by vertex id. |

<a name="SmilesDrawer.Drawer+getCurrentCenterOfMass"></a>

#### drawer.getCurrentCenterOfMass() ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Returns the current (positioned vertices so far) center of mass.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - The current center of mass.  
<a name="SmilesDrawer.Drawer+getCurrentCenterOfMassInNeigbourhood"></a>

#### drawer.getCurrentCenterOfMassInNeigbourhood(vec, [r]) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - The current center of mass.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> |  | The point at which to look for neighbours. |
| [r] | <code>Number</code> | <code>currentBondLength*2.0</code> | The radius of vertices to include. |

<a name="SmilesDrawer.Drawer+resolvePrimaryOverlaps"></a>

#### drawer.resolvePrimaryOverlaps()
Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+resolveSecondaryOverlaps"></a>

#### drawer.resolveSecondaryOverlaps(scores)
Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scores | <code>Array.&lt;Object&gt;</code> | An array of objects sorted descending by score. |
| scores[].id | <code>Number</code> | A vertex id. |
| scores[].score | <code>Number</code> | The overlap score associated with the vertex id. |

<a name="SmilesDrawer.Drawer+createNextBond"></a>

#### drawer.createNextBond(vertex, previousVertex, ringOrAngle, dir)
Positiones the next vertex thus creating a bond.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |
| previousVertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | The previous vertex which has been positioned. |
| ringOrAngle | <code>[Ring](#SmilesDrawer.Ring)</code> &#124; <code>Number</code> | Either a ring or a number. If the vertex is connected to a ring, it is positioned based on the ring center and thus the ring is supplied. If the vertex is not in a ring, an angle (in radians) is supplied. |
| dir | <code>Number</code> | Either 1 or -1 to break ties (if no angle can be elucidated). |

<a name="SmilesDrawer.Drawer+getCommonRingbondNeighbour"></a>

#### drawer.getCommonRingbondNeighbour(vertex) ⇒ <code>Number</code> &#124; <code>null</code>
Gets the vetex sharing the edge that is the common bond of two rings.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> &#124; <code>null</code> - The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |

<a name="SmilesDrawer.Drawer+isPointInRing"></a>

#### drawer.isPointInRing(vec) ⇒ <code>Boolean</code>
Check if a vector is inside any ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |

<a name="SmilesDrawer.Drawer+isEdgeInRing"></a>

#### drawer.isEdgeInRing(edge) ⇒ <code>Boolean</code>
Check whether or not an edge is part of a ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the edge is part of a ring.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#SmilesDrawer.Edge)</code> | An edge. |

<a name="SmilesDrawer.Drawer+isEdgeRotatable"></a>

#### drawer.isEdgeRotatable(edge) ⇒ <code>Boolean</code>
Check whether or not an edge is rotatable.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the edge is rotatable.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#SmilesDrawer.Edge)</code> | An edge. |

<a name="SmilesDrawer.Drawer+isRingAromatic"></a>

#### drawer.isRingAromatic(ring) ⇒ <code>Boolean</code>
Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a ring is implicitly defined as aromatic.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>[Ring](#SmilesDrawer.Ring)</code> | A ring. |

<a name="SmilesDrawer.Drawer+getEdgeNormals"></a>

#### drawer.getEdgeNormals(edge) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
Get the normals of an edge.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code> - An array containing two vectors, representing the normals.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#SmilesDrawer.Edge)</code> | An edge. |

<a name="SmilesDrawer.Drawer+getTreeDepth"></a>

#### drawer.getTreeDepth(vertexId, parentVertexId) ⇒ <code>Number</code>
Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> - The depth of the sub-tree.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |
| parentVertexId | <code>Number</code> | The id of a neighbouring vertex. |

<a name="SmilesDrawer.Drawer+traverseTree"></a>

#### drawer.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst])
Traverse a sub-tree in the graph.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vertexId | <code>Number</code> |  | A vertex id. |
| parentVertexId | <code>Number</code> |  | A neighbouring vertex. |
| callback | <code>function</code> |  | The callback function that is called with each visited as an argument. |
| [maxDepth] | <code>Number</code> | <code></code> | The maximum depth of the recursion. If null, there is no limit. |
| [ignoreFirst] | <code>Boolean</code> | <code>false</code> | Whether or not to ignore the starting vertex supplied as vertexId in the callback. |

<a name="SmilesDrawer.Drawer+getBondCount"></a>

#### drawer.getBondCount(vertex) ⇒ <code>Number</code>
Gets the number of bonds of a vertex.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Number</code> - The number of bonds the vertex participates in.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getNonRingNeighbours"></a>

#### drawer.getNonRingNeighbours(vertexId) ⇒ <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code>
Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+initPseudoElements"></a>

#### drawer.initPseudoElements()
Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon setsthe involved atoms not to be displayed.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Edge"></a>

### SmilesDrawer.Edge
A class representing an edge.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>Number</code> |  | The id of this edge. |
| sourceId | <code>Number</code> |  | The id of the source vertex. |
| targetId | <code>Number</code> |  | The id of the target vertex. |
| weight | <code>Number</code> |  | The weight of this edge. |
| bondType | <code>String</code> | <code>&#x27;-&#x27;</code> | The bond type of this edge. |
| isPartOfAromaticRing | <code>Boolean</code> | <code>false</code> | Whether or not this edge is part of an aromatic ring. |
| center | <code>Boolean</code> | <code>false</code> | Wheter or not the bond is centered. For example, this affects straight double bonds. |
| chiral | <code>String</code> | <code>&#x27;&#x27;</code> | Chirality information. |


* [.Edge](#SmilesDrawer.Edge)
    * [new SmilesDrawer.Edge(sourceId, targetId, [weight])](#new_SmilesDrawer.Edge_new)
    * _instance_
        * [.getBondCount()](#SmilesDrawer.Edge+getBondCount) ⇒ <code>Number</code>
    * _static_
        * [.bonds](#SmilesDrawer.Edge.bonds) ⇒ <code>Object</code>

<a name="new_SmilesDrawer.Edge_new"></a>

#### new SmilesDrawer.Edge(sourceId, targetId, [weight])
The constructor for the class Edge.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sourceId | <code>Number</code> |  | A vertex id. |
| targetId | <code>Number</code> |  | A vertex id. |
| [weight] | <code>Number</code> | <code>1</code> | The weight of the edge. |

<a name="SmilesDrawer.Edge+getBondCount"></a>

#### edge.getBondCount() ⇒ <code>Number</code>
Returns the number of bonds associated with the bond type of this edge.

**Kind**: instance method of <code>[Edge](#SmilesDrawer.Edge)</code>  
**Returns**: <code>Number</code> - The number of bonds associated with this edge.  
<a name="SmilesDrawer.Edge.bonds"></a>

#### Edge.bonds ⇒ <code>Object</code>
An object mapping the bond type to the number of bonds.

**Kind**: static property of <code>[Edge](#SmilesDrawer.Edge)</code>  
**Returns**: <code>Object</code> - The object containing the map.  
<a name="SmilesDrawer.Graph"></a>

### SmilesDrawer.Graph
A class representing the molecular graph.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | The vertices of the graph. |
| edges | <code>[Array.&lt;Edge&gt;](#SmilesDrawer.Edge)</code> | The edges of this graph. |
| vertexIdsToEdgeId | <code>Object</code> | A map mapping vertex ids to the edge between the two vertices. The key is defined as vertexAId + '_' + vertexBId. |
| elementCount | <code>Object</code> | A map associating element symbols with the number of occurences in this graph. |
| isometric | <code>Boolean</code> | A boolean indicating whether or not the SMILES associated with this graph is isometric. |


* [.Graph](#SmilesDrawer.Graph)
    * [new SmilesDrawer.Graph(parseTree, [isomeric])](#new_SmilesDrawer.Graph_new)
    * _instance_
        * [._init(node, parentVertexId, isBranch)](#SmilesDrawer.Graph+_init)
        * [._initInfos()](#SmilesDrawer.Graph+_initInfos)
        * [.clear()](#SmilesDrawer.Graph+clear)
        * [.addVertex(vertex)](#SmilesDrawer.Graph+addVertex) ⇒ <code>Number</code>
        * [.addEdge(edge)](#SmilesDrawer.Graph+addEdge) ⇒ <code>Number</code>
        * [.getEdge(vertexIdA, vertexIdB)](#SmilesDrawer.Graph+getEdge) ⇒ <code>Number</code> &#124; <code>null</code>
        * [.getEdges(vertexId)](#SmilesDrawer.Graph+getEdges) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.hasEdge(vertexIdA, vertexIdB)](#SmilesDrawer.Graph+hasEdge) ⇒ <code>Number</code> &#124; <code>null</code>
        * [.getVertexList()](#SmilesDrawer.Graph+getVertexList) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.getEdgeList()](#SmilesDrawer.Graph+getEdgeList) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getAdjacencyMatrix()](#SmilesDrawer.Graph+getAdjacencyMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getComponentsAdjacencyMatrix()](#SmilesDrawer.Graph+getComponentsAdjacencyMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getSubgraphAdjacencyMatrix(vertexIds)](#SmilesDrawer.Graph+getSubgraphAdjacencyMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getDistanceMatrix()](#SmilesDrawer.Graph+getDistanceMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getSubgraphDistanceMatrix(vertexIds)](#SmilesDrawer.Graph+getSubgraphDistanceMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getAdjacencyList()](#SmilesDrawer.Graph+getAdjacencyList) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getSubgraphAdjacencyList(vertexIds)](#SmilesDrawer.Graph+getSubgraphAdjacencyList) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.getBridges()](#SmilesDrawer.Graph+getBridges) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.traverseBF(startVertexId, callback)](#SmilesDrawer.Graph+traverseBF)
        * [.kkLayout(vertexIds, center, startVertexId, ring)](#SmilesDrawer.Graph+kkLayout)
        * [._bridgeDfs()](#SmilesDrawer.Graph+_bridgeDfs)
    * _static_
        * [.getConnectedComponents(adjacencyMatrix)](#SmilesDrawer.Graph.getConnectedComponents) ⇒ <code>Array.&lt;Set&gt;</code>
        * [.getConnectedComponentCount(adjacencyMatrix)](#SmilesDrawer.Graph.getConnectedComponentCount) ⇒ <code>Number</code>
        * [._ccCountDfs()](#SmilesDrawer.Graph._ccCountDfs)
        * [._ccGetDfs()](#SmilesDrawer.Graph._ccGetDfs)

<a name="new_SmilesDrawer.Graph_new"></a>

#### new SmilesDrawer.Graph(parseTree, [isomeric])
The constructor of the class Graph.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parseTree | <code>Object</code> |  | A SMILES parse tree. |
| [isomeric] | <code>Boolean</code> | <code>false</code> | A boolean specifying whether or not the SMILES is isomeric. |

<a name="SmilesDrawer.Graph+_init"></a>

#### graph._init(node, parentVertexId, isBranch)
PRIVATE FUNCTION. Initializing the graph from the parse tree.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>Object</code> |  | The current node in the parse tree. |
| parentVertexId | <code>Number</code> | <code></code> | The id of the previous vertex. |
| isBranch | <code>Boolean</code> | <code>false</code> | Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C). |

<a name="SmilesDrawer.Graph+_initInfos"></a>

#### graph._initInfos()
PRIVATE FUNCTION. Initializes element counts etc.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Graph+clear"></a>

#### graph.clear()
Clears all the elements in this graph (edges and vertices).

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Graph+addVertex"></a>

#### graph.addVertex(vertex) ⇒ <code>Number</code>
Add a vertex to the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Number</code> - The vertex id of the new vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | A new vertex. |

<a name="SmilesDrawer.Graph+addEdge"></a>

#### graph.addEdge(edge) ⇒ <code>Number</code>
Add an edge to the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Number</code> - The edge id of the new edge.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>[Edge](#SmilesDrawer.Edge)</code> | A new edge. |

<a name="SmilesDrawer.Graph+getEdge"></a>

#### graph.getEdge(vertexIdA, vertexIdB) ⇒ <code>Number</code> &#124; <code>null</code>
Returns the edge between two given vertices.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Number</code> &#124; <code>null</code> - The edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Graph+getEdges"></a>

#### graph.getEdges(vertexId) ⇒ <code>Array.&lt;Array&gt;</code>
Returns the ids of edges connected to a vertex.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - An array containing the ids of edges connected to the vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Graph+hasEdge"></a>

#### graph.hasEdge(vertexIdA, vertexIdB) ⇒ <code>Number</code> &#124; <code>null</code>
Returns the edge between two given vertices.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Number</code> &#124; <code>null</code> - The edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>Number</code> | A vertex id. |
| vertexIdB | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Graph+getVertexList"></a>

#### graph.getVertexList() ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array containing the vertex ids of this graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing all vertex ids of this graph.  
<a name="SmilesDrawer.Graph+getEdgeList"></a>

#### graph.getEdgeList() ⇒ <code>Array.&lt;Array&gt;</code>
Returns an array containing source, target arrays of this graphs edges.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - An array containing source, target arrays of this graphs edges. Example: [ [ 2, 5 ], [ 6, 9 ] ].  
<a name="SmilesDrawer.Graph+getAdjacencyMatrix"></a>

#### graph.getAdjacencyMatrix() ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency matrix of the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency matrix of the molecular graph.  
<a name="SmilesDrawer.Graph+getComponentsAdjacencyMatrix"></a>

#### graph.getComponentsAdjacencyMatrix() ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency matrix of the molecular graph with all bridges removed.  
<a name="SmilesDrawer.Graph+getSubgraphAdjacencyMatrix"></a>

#### graph.getSubgraphAdjacencyMatrix(vertexIds) ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency matrix of a subgraph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency matrix of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="SmilesDrawer.Graph+getDistanceMatrix"></a>

#### graph.getDistanceMatrix() ⇒ <code>Array.&lt;Array&gt;</code>
Get the distance matrix of the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - The distance matrix of the graph.  
<a name="SmilesDrawer.Graph+getSubgraphDistanceMatrix"></a>

#### graph.getSubgraphDistanceMatrix(vertexIds) ⇒ <code>Array.&lt;Array&gt;</code>
Get the distance matrix of a subgraph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - The distance matrix of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="SmilesDrawer.Graph+getAdjacencyList"></a>

#### graph.getAdjacencyList() ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency list of the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency list of the graph.  
<a name="SmilesDrawer.Graph+getSubgraphAdjacencyList"></a>

#### graph.getSubgraphAdjacencyList(vertexIds) ⇒ <code>Array.&lt;Array&gt;</code>
Get the adjacency list of a subgraph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - The adjancency list of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids contained within the subgraph. |

<a name="SmilesDrawer.Graph+getBridges"></a>

#### graph.getBridges() ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the edge ids of the bridges.  
<a name="SmilesDrawer.Graph+traverseBF"></a>

#### graph.traverseBF(startVertexId, callback)
Traverses the graph in breadth-first order.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  

| Param | Type | Description |
| --- | --- | --- |
| startVertexId | <code>Number</code> | The id of the starting vertex. |
| callback | <code>function</code> | The callback function to be called on every vertex. |

<a name="SmilesDrawer.Graph+kkLayout"></a>

#### graph.kkLayout(vertexIds, center, startVertexId, ring)
Positiones the (sub)graph using Kamada and Kawais algorithm for drawing general undirected graphs. https://pdfs.semanticscholar.org/b8d3/bca50ccc573c5cb99f7d201e8acce6618f04.pdf

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>Array.&lt;Number&gt;</code> | An array containing vertexIds to be placed using the force based layout. |
| center | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The center of the layout. |
| startVertexId | <code>Number</code> | A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex. |
| ring | <code>[Ring](#SmilesDrawer.Ring)</code> | The bridged ring associated with this force-based layout. |

<a name="SmilesDrawer.Graph+_bridgeDfs"></a>

#### graph._bridgeDfs()
PRIVATE FUNCTION used by getBridges().

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Graph.getConnectedComponents"></a>

#### Graph.getConnectedComponents(adjacencyMatrix) ⇒ <code>Array.&lt;Set&gt;</code>
Returns the connected components of the graph.

**Kind**: static method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Array.&lt;Set&gt;</code> - Connected components as sets.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SmilesDrawer.Graph.getConnectedComponentCount"></a>

#### Graph.getConnectedComponentCount(adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of connected components for the graph.

**Kind**: static method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Number</code> - The number of connected components of the supplied graph.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SmilesDrawer.Graph._ccCountDfs"></a>

#### Graph._ccCountDfs()
PRIVATE FUNCTION used by getConnectedComponentCount().

**Kind**: static method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Graph._ccGetDfs"></a>

#### Graph._ccGetDfs()
PRIVATE FUNCTION used by getConnectedComponents().

**Kind**: static method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Line"></a>

### SmilesDrawer.Line
A class representing a line.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| from | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The SmilesDrawer.Vector2 defining the start of the line. |
| to | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The SmilesDrawer.Vector2 defining the end of the line. |
| elementFrom | <code>String</code> | The element symbol associated with the start of the line. |
| elementTo | <code>String</code> | The element symbol associated with the end of the line. |
| chiralFrom | <code>Boolean</code> | A boolean indicating whether or not the source atom is a chiral center. |
| chiralTo | <code>Boolean</code> | A boolean indicating whether or tno the target atom is a chiral center. |


* [.Line](#SmilesDrawer.Line)
    * [new SmilesDrawer.Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])](#new_SmilesDrawer.Line_new)
    * [.clone()](#SmilesDrawer.Line+clone) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.getLength()](#SmilesDrawer.Line+getLength) ⇒ <code>Number</code>
    * [.getAngle()](#SmilesDrawer.Line+getAngle) ⇒ <code>Number</code>
    * [.getRightVector()](#SmilesDrawer.Line+getRightVector) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
    * [.getLeftVector()](#SmilesDrawer.Line+getLeftVector) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
    * [.getRightElement()](#SmilesDrawer.Line+getRightElement) ⇒ <code>String</code>
    * [.getLeftElement()](#SmilesDrawer.Line+getLeftElement) ⇒ <code>String</code>
    * [.getRightChiral()](#SmilesDrawer.Line+getRightChiral) ⇒ <code>Boolean</code>
    * [.getLeftChiral()](#SmilesDrawer.Line+getLeftChiral) ⇒ <code>Boolean</code>
    * [.setRightVector(x, y)](#SmilesDrawer.Line+setRightVector) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.setLeftVector(x, y)](#SmilesDrawer.Line+setLeftVector) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.rotateToXAxis()](#SmilesDrawer.Line+rotateToXAxis) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.rotate(theta)](#SmilesDrawer.Line+rotate) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.shortenFrom(by)](#SmilesDrawer.Line+shortenFrom) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.shortenTo(by)](#SmilesDrawer.Line+shortenTo) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.shortenRight(by)](#SmilesDrawer.Line+shortenRight) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.shortenLeft(by)](#SmilesDrawer.Line+shortenLeft) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.shorten(by)](#SmilesDrawer.Line+shorten) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
    * [.getNormals()](#SmilesDrawer.Line+getNormals) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>

<a name="new_SmilesDrawer.Line_new"></a>

#### new SmilesDrawer.Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])
The constructor for the class Line.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [from] | <code>Vector2</code> | <code>new Vector2(0, 0)</code> | A vector marking the beginning of the line. |
| [to] | <code>Vector2</code> | <code>new Vector2(0, 0)</code> | A vector marking the end of the line. |
| [elementFrom] | <code>string</code> | <code>null</code> | A one-letter representation of the element associated with the vector marking the beginning of the line. |
| [elementTo] | <code>string</code> | <code>null</code> | A one-letter representation of the element associated with the vector marking the end of the line. |
| [chiralFrom] | <code>boolean</code> | <code>false</code> | Whether or not the from atom is a chiral center. |
| [chiralTo] | <code>boolean</code> | <code>false</code> | Whether or not the to atom is a chiral center. |

<a name="SmilesDrawer.Line+clone"></a>

#### line.clone() ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Clones this line and returns the clone.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - A clone of this line.  
<a name="SmilesDrawer.Line+getLength"></a>

#### line.getLength() ⇒ <code>Number</code>
Returns the length of this line.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Number</code> - The length of this line.  
<a name="SmilesDrawer.Line+getAngle"></a>

#### line.getAngle() ⇒ <code>Number</code>
Returns the angle of the line in relation to the coordinate system (the x-axis).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Number</code> - The angle in radians.  
<a name="SmilesDrawer.Line+getRightVector"></a>

#### line.getRightVector() ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Returns the right vector (the vector with the larger x value).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - The right vector.  
<a name="SmilesDrawer.Line+getLeftVector"></a>

#### line.getLeftVector() ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Returns the left vector (the vector with the smaller x value).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - The left vector.  
<a name="SmilesDrawer.Line+getRightElement"></a>

#### line.getRightElement() ⇒ <code>String</code>
Returns the element associated with the right vector (the vector with the larger x value).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>String</code> - The element associated with the right vector.  
<a name="SmilesDrawer.Line+getLeftElement"></a>

#### line.getLeftElement() ⇒ <code>String</code>
Returns the element associated with the left vector (the vector with the smaller x value).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>String</code> - The element associated with the left vector.  
<a name="SmilesDrawer.Line+getRightChiral"></a>

#### line.getRightChiral() ⇒ <code>Boolean</code>
Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Boolean</code> - Whether or not the atom associated with the right vector is a chiral center.  
<a name="SmilesDrawer.Line+getLeftChiral"></a>

#### line.getLeftChiral() ⇒ <code>Boolean</code>
Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Boolean</code> - Whether or not the atom  associated with the left vector is a chiral center.  
<a name="SmilesDrawer.Line+setRightVector"></a>

#### line.setRightVector(x, y) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Set the value of the right vector.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x value. |
| y | <code>Number</code> | The y value. |

<a name="SmilesDrawer.Line+setLeftVector"></a>

#### line.setLeftVector(x, y) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Set the value of the left vector.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x value. |
| y | <code>Number</code> | The y value. |

<a name="SmilesDrawer.Line+rotateToXAxis"></a>

#### line.rotateToXAxis() ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - This line.  
<a name="SmilesDrawer.Line+rotate"></a>

#### line.rotate(theta) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Rotate the line by a given value (in radians). The center of rotation is the left vector.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| theta | <code>Number</code> | The angle (in radians) to rotate the line. |

<a name="SmilesDrawer.Line+shortenFrom"></a>

#### line.shortenFrom(by) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Shortens this line from the "from" direction by a given value (in pixels).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+shortenTo"></a>

#### line.shortenTo(by) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Shortens this line from the "to" direction by a given value (in pixels).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+shortenRight"></a>

#### line.shortenRight(by) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Shorten the right side.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+shortenLeft"></a>

#### line.shortenLeft(by) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Shorten the left side.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+shorten"></a>

#### line.shorten(by) ⇒ <code>[Line](#SmilesDrawer.Line)</code>
Shortens this line from both directions by a given value (in pixels).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Line](#SmilesDrawer.Line)</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>Number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+getNormals"></a>

#### line.getNormals() ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
Returns the normals of this line.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code> - An array containing the two normals as vertices.  
<a name="SmilesDrawer.MathHelper"></a>

### SmilesDrawer.MathHelper
A static class containing helper functions for math-related tasks.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.MathHelper](#SmilesDrawer.MathHelper)
    * [.radFactor](#SmilesDrawer.MathHelper.radFactor)
    * [.degFactor](#SmilesDrawer.MathHelper.degFactor)
    * [.twoPI](#SmilesDrawer.MathHelper.twoPI)
    * [.round(value, decimals)](#SmilesDrawer.MathHelper.round) ⇒ <code>Number</code>
    * [.meanAngle(arr)](#SmilesDrawer.MathHelper.meanAngle) ⇒ <code>Number</code>
    * [.innerAngle(n)](#SmilesDrawer.MathHelper.innerAngle) ⇒ <code>Number</code>
    * [.polyCircumradius(s, n)](#SmilesDrawer.MathHelper.polyCircumradius) ⇒ <code>Number</code>
    * [.apothem(r, n)](#SmilesDrawer.MathHelper.apothem) ⇒ <code>Number</code>
    * [.centralAngle(n)](#SmilesDrawer.MathHelper.centralAngle) ⇒ <code>Number</code>
    * [.toDeg(rad)](#SmilesDrawer.MathHelper.toDeg) ⇒ <code>Number</code>
    * [.toRad(deg)](#SmilesDrawer.MathHelper.toRad) ⇒ <code>Number</code>

<a name="SmilesDrawer.MathHelper.radFactor"></a>

#### MathHelper.radFactor
The factor to convert degrees to radians.

**Kind**: static property of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
<a name="SmilesDrawer.MathHelper.degFactor"></a>

#### MathHelper.degFactor
The factor to convert radians to degrees.

**Kind**: static property of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
<a name="SmilesDrawer.MathHelper.twoPI"></a>

#### MathHelper.twoPI
Two times PI.

**Kind**: static property of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
<a name="SmilesDrawer.MathHelper.round"></a>

#### MathHelper.round(value, decimals) ⇒ <code>Number</code>
Rounds a value to a given number of decimals.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>Number</code> - A number rounded to a given number of decimals.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | A number. |
| decimals | <code>Number</code> | The number of decimals. |

<a name="SmilesDrawer.MathHelper.meanAngle"></a>

#### MathHelper.meanAngle(arr) ⇒ <code>Number</code>
Returns the means of the angles contained in an array. In radians.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>Number</code> - The mean angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;Number&gt;</code> | An array containing angles (in radians). |

<a name="SmilesDrawer.MathHelper.innerAngle"></a>

#### MathHelper.innerAngle(n) ⇒ <code>Number</code>
Returns the inner angle of a n-sided regular polygon.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>Number</code> - The inner angle of a given regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of sides of a regular polygon. |

<a name="SmilesDrawer.MathHelper.polyCircumradius"></a>

#### MathHelper.polyCircumradius(s, n) ⇒ <code>Number</code>
Returns the circumradius of a n-sided regular polygon with a given side-length.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>Number</code> - The circumradius of the regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>Number</code> | The side length of the regular polygon. |
| n | <code>Number</code> | The number of sides. |

<a name="SmilesDrawer.MathHelper.apothem"></a>

#### MathHelper.apothem(r, n) ⇒ <code>Number</code>
Returns the apothem of a regular n-sided polygon based on its radius.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>Number</code> - The apothem of a n-sided polygon based on its radius.  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>Number</code> | The radius. |
| n | <code>Number</code> | The number of edges of the regular polygon. |

<a name="SmilesDrawer.MathHelper.centralAngle"></a>

#### MathHelper.centralAngle(n) ⇒ <code>Number</code>
The central angle of a n-sided regular polygon. In radians.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>Number</code> - The central angle of the n-sided polygon in radians.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number of sides of the regular polygon. |

<a name="SmilesDrawer.MathHelper.toDeg"></a>

#### MathHelper.toDeg(rad) ⇒ <code>Number</code>
Convertes radians to degrees.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>Number</code> - The angle in degrees.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>Number</code> | An angle in radians. |

<a name="SmilesDrawer.MathHelper.toRad"></a>

#### MathHelper.toRad(deg) ⇒ <code>Number</code>
Converts degrees to radians.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| deg | <code>Number</code> | An angle in degrees. |

<a name="SmilesDrawer.Ring"></a>

### SmilesDrawer.Ring
A class representing a ring.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The id of this ring. |
| members | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids of the ring members. |
| edges | <code>Array.&lt;Number&gt;</code> | An array containing the edge ids of the edges between the ring members. |
| insiders | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids of the vertices contained within the ring if it is a bridged ring. |
| neighbours | <code>Array.&lt;Number&gt;</code> | An array containing the ids of neighbouring rings. |
| positioned | <code>Boolean</code> | A boolean indicating whether or not this ring has been positioned. |
| center | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The center of this ring. |
| rings | <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code> | The rings contained within this ring if this ring is bridged. |
| isBridged | <code>Boolean</code> | A boolean whether or not this ring is bridged. |
| isPartOfBridged | <code>Boolean</code> | A boolean whether or not this ring is part of a bridge ring. |
| isSpiro | <code>Boolean</code> | A boolean whether or not this ring is part of a spiro. |
| isFused | <code>Boolean</code> | A boolean whether or not this ring is part of a fused ring. |
| centralAngle | <code>Number</code> | The central angle of this ring. |
| canFlip | <code>Boolean</code> | A boolean indicating whether or not this ring allows flipping of attached vertices to the inside of the ring. |


* [.Ring](#SmilesDrawer.Ring)
    * [new SmilesDrawer.Ring(members)](#new_SmilesDrawer.Ring_new)
    * _instance_
        * [.clone()](#SmilesDrawer.Ring+clone) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
        * [.allowsFlip()](#SmilesDrawer.Ring+allowsFlip) ⇒ <code>Boolean</code>
        * [.setFlipped()](#SmilesDrawer.Ring+setFlipped)
        * [.getSize()](#SmilesDrawer.Ring+getSize) ⇒ <code>Number</code>
        * [.getPolygon(vertices)](#SmilesDrawer.Ring+getPolygon) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
        * [.getAngle()](#SmilesDrawer.Ring+getAngle) ⇒ <code>Number</code>
        * [.eachMember(vertices, callback, startVertexId, previousVertexId)](#SmilesDrawer.Ring+eachMember)
        * [.getOrderedNeighbours(ringConnections)](#SmilesDrawer.Ring+getOrderedNeighbours) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.isBenzeneLike(vertices)](#SmilesDrawer.Ring+isBenzeneLike) ⇒ <code>Boolean</code>
        * [.getDoubleBondCount(vertices)](#SmilesDrawer.Ring+getDoubleBondCount) ⇒ <code>Number</code>
        * [.contains(vertexId)](#SmilesDrawer.Ring+contains) ⇒ <code>Boolean</code>
        * [.thisOrNeighboursContain(rings, vertexId)](#SmilesDrawer.Ring+thisOrNeighboursContain) ⇒ <code>Boolean</code>
    * _static_
        * [.getRing(rings, id)](#SmilesDrawer.Ring.getRing) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>

<a name="new_SmilesDrawer.Ring_new"></a>

#### new SmilesDrawer.Ring(members)
The constructor for the class Ring.


| Param | Type | Description |
| --- | --- | --- |
| members | <code>Array.&lt;Number&gt;</code> | An array containing the vertex ids of the members of the ring to be created. |

<a name="SmilesDrawer.Ring+clone"></a>

#### ring.clone() ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
Clones this ring and returns the clone.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>[Ring](#SmilesDrawer.Ring)</code> - A clone of this ring.  
<a name="SmilesDrawer.Ring+allowsFlip"></a>

#### ring.allowsFlip() ⇒ <code>Boolean</code>
Returns a boolean indicating whether or not this ring is allowed to flip attached vertices (atoms) to the inside of the ring. Is only allowed for rings with more than 4 members. Can be disabling by setting the canFlip property of the ring to false.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Boolean</code> - Returns a boolean indicating whether or not vertices (atoms) attached to this ring can be flipped to the inside of the ring.  
<a name="SmilesDrawer.Ring+setFlipped"></a>

#### ring.setFlipped()
Sets the canFlip property of this ring to false if the ring has less than 8 members. If the ring has more than 8 members, the value of canFlip is not changed.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
<a name="SmilesDrawer.Ring+getSize"></a>

#### ring.getSize() ⇒ <code>Number</code>
Returns the size (number of members) of this ring.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Number</code> - The size (number of members) of this ring.  
<a name="SmilesDrawer.Ring+getPolygon"></a>

#### ring.getPolygon(vertices) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
Gets the polygon representation (an array of the ring-members positional vectors) of this ring.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code> - An array of the positional vectors of the ring members.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | An array of vertices representing the current molecule. |

<a name="SmilesDrawer.Ring+getAngle"></a>

#### ring.getAngle() ⇒ <code>Number</code>
Returns the angle of this ring in relation to the coordinate system.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Number</code> - The angle in radians.  
<a name="SmilesDrawer.Ring+eachMember"></a>

#### ring.eachMember(vertices, callback, startVertexId, previousVertexId)
Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | The vertices associated with the current molecule. |
| callback | <code>function</code> | A callback with the current vertex id as a parameter. |
| startVertexId | <code>Number</code> | The vertex id of the start vertex. |
| previousVertexId | <code>Number</code> | The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex). |

<a name="SmilesDrawer.Ring+getOrderedNeighbours"></a>

#### ring.getOrderedNeighbours(ringConnections) ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array containing the neighbouring rings of this ring ordered by ring size.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - An array of neighbouring rings sorted by ring size. Example: { n: 5, neighbour: 1 }.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>[Array.&lt;RingConnection&gt;](#SmilesDrawer.RingConnection)</code> | An array of ring connections associated with the current molecule. |

<a name="SmilesDrawer.Ring+isBenzeneLike"></a>

#### ring.isBenzeneLike(vertices) ⇒ <code>Boolean</code>
Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring is an implicitly defined benzene-like.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | An array of vertices associated with the current molecule. |

<a name="SmilesDrawer.Ring+getDoubleBondCount"></a>

#### ring.getDoubleBondCount(vertices) ⇒ <code>Number</code>
Get the number of double bonds inside this ring.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Number</code> - The number of double bonds inside this ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | An array of vertices associated with the current molecule. |

<a name="SmilesDrawer.Ring+contains"></a>

#### ring.contains(vertexId) ⇒ <code>Boolean</code>
Checks whether or not this ring contains a member with a given vertex id.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring contains a member with the given vertex id.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Ring+thisOrNeighboursContain"></a>

#### ring.thisOrNeighboursContain(rings, vertexId) ⇒ <code>Boolean</code>
Checks whether or not this ring or one of its neighbouring rings contains a member with a given vertex id.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring or one of its neighbouring rings contains a emember with the given vertex id.  

| Param | Type | Description |
| --- | --- | --- |
| rings | <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code> | An array of rings associated with this molecule. |
| vertexId | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.Ring.getRing"></a>

#### Ring.getRing(rings, id) ⇒ <code>[Ring](#SmilesDrawer.Ring)</code>
Returns a ring based on a provided ring id.

**Kind**: static method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>[Ring](#SmilesDrawer.Ring)</code> - A ring with a given id.  

| Param | Type | Description |
| --- | --- | --- |
| rings | <code>[Array.&lt;Ring&gt;](#SmilesDrawer.Ring)</code> | An array of rings associated with the current molecule. |
| id | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.RingConnection"></a>

### SmilesDrawer.RingConnection
A class representing a ring connection.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The id of this ring connection. |
| firstRingId | <code>Number</code> | A ring id. |
| secondRingId | <code>Number</code> | A ring id. |
| vertices | <code>Set.&lt;Number&gt;</code> | A set containing the vertex ids participating in the ring connection. |


* [.RingConnection](#SmilesDrawer.RingConnection)
    * [new SmilesDrawer.RingConnection(firstRing, secondRing)](#new_SmilesDrawer.RingConnection_new)
    * _instance_
        * [.addVertex(vertexId)](#SmilesDrawer.RingConnection+addVertex)
        * [.isBridge()](#SmilesDrawer.RingConnection+isBridge) ⇒ <code>Boolean</code>
        * [.updateOther(ringId, otherRingId)](#SmilesDrawer.RingConnection+updateOther)
        * [.containsRing(ringId)](#SmilesDrawer.RingConnection+containsRing) ⇒ <code>Boolean</code>
    * _static_
        * [.isBridge(ringConnections, vertices, firstRingId, secondRingId)](#SmilesDrawer.RingConnection.isBridge) ⇒ <code>Boolean</code>
        * [.getNeighbours(ringConnections, ringId)](#SmilesDrawer.RingConnection.getNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
        * [.getVertices(ringConnections, firstRingId, secondRingId)](#SmilesDrawer.RingConnection.getVertices) ⇒ <code>Array.&lt;Number&gt;</code>

<a name="new_SmilesDrawer.RingConnection_new"></a>

#### new SmilesDrawer.RingConnection(firstRing, secondRing)
The constructor for the class RingConnection.


| Param | Type | Description |
| --- | --- | --- |
| firstRing | <code>[Ring](#SmilesDrawer.Ring)</code> | A ring. |
| secondRing | <code>[Ring](#SmilesDrawer.Ring)</code> | A ring. |

<a name="SmilesDrawer.RingConnection+addVertex"></a>

#### ringConnection.addVertex(vertexId)
Adding a vertex to the ring connection.

**Kind**: instance method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | A vertex id. |

<a name="SmilesDrawer.RingConnection+isBridge"></a>

#### ringConnection.isBridge() ⇒ <code>Boolean</code>
Checks whether or not this ring connection is a bridge in a bridged ring.

**Kind**: instance method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this ring connection is a bridge.  

| Param | Type | Description |
| --- | --- | --- |
| . | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | vertices The array of vertices associated with the current molecule. |

<a name="SmilesDrawer.RingConnection+updateOther"></a>

#### ringConnection.updateOther(ringId, otherRingId)
Update the ring id of this ring connection that is not the ring id supplied as the second argument.

**Kind**: instance method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. The new ring id to be set. |
| otherRingId | <code>Number</code> | A ring id. The id that is NOT to be updated. |

<a name="SmilesDrawer.RingConnection+containsRing"></a>

#### ringConnection.containsRing(ringId) ⇒ <code>Boolean</code>
Returns a boolean indicating whether or not a ring with a given id is participating in this ring connection.

**Kind**: instance method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a ring with a given id participates in this ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.RingConnection.isBridge"></a>

#### RingConnection.isBridge(ringConnections, vertices, firstRingId, secondRingId) ⇒ <code>Boolean</code>
Checks whether or not two rings are connected by a bridged bond.

**Kind**: static method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not two rings ar connected by a bridged bond.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>[Array.&lt;RingConnection&gt;](#SmilesDrawer.RingConnection)</code> | An array of ring connections containing the ring connections associated with the current molecule. |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | An array of vertices containing the vertices associated with the current molecule. |
| firstRingId | <code>Number</code> | A ring id. |
| secondRingId | <code>Nmber</code> | A ring id. |

<a name="SmilesDrawer.RingConnection.getNeighbours"></a>

#### RingConnection.getNeighbours(ringConnections, ringId) ⇒ <code>Array.&lt;Number&gt;</code>
Retruns the neighbouring rings of a given ring.

**Kind**: static method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of ring ids of neighbouring rings.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>[Array.&lt;RingConnection&gt;](#SmilesDrawer.RingConnection)</code> | An array of ring connections containing ring connections associated with the current molecule. |
| ringId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.RingConnection.getVertices"></a>

#### RingConnection.getVertices(ringConnections, firstRingId, secondRingId) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of vertex ids associated with a given ring connection.

**Kind**: static method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of vertex ids associated with the ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>[Array.&lt;RingConnection&gt;](#SmilesDrawer.RingConnection)</code> | An array of ring connections containing ring connections associated with the current molecule. |
| firstRingId | <code>Number</code> | A ring id. |
| secondRingId | <code>Number</code> | A ring id. |

<a name="SmilesDrawer.SSSR"></a>

### SmilesDrawer.SSSR
A class encapsulating the functionality to find the smallest set of smallest rings in a graph.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.SSSR](#SmilesDrawer.SSSR)
    * [.getRings(graph)](#SmilesDrawer.SSSR.getRings) ⇒ <code>Array.&lt;Array&gt;</code>
    * [.matrixToString(matrix)](#SmilesDrawer.SSSR.matrixToString) ⇒ <code>String</code>
    * [.getPathIncludedDistanceMatrices(adjacencyMatrix)](#SmilesDrawer.SSSR.getPathIncludedDistanceMatrices) ⇒ <code>Object</code>
    * [.getRingCandidates(d, pe1, pe2)](#SmilesDrawer.SSSR.getRingCandidates) ⇒ <code>Array.&lt;Array&gt;</code>
    * [.getSSSR(c, d, adjacencyMatrix, pe1, pe2, nsssr)](#SmilesDrawer.SSSR.getSSSR) ⇒ <code>Array.&lt;Set&gt;</code>
    * [.getEdgeCount(adjacencyMatrix)](#SmilesDrawer.SSSR.getEdgeCount) ⇒ <code>Number</code>
    * [.getEdgeList(adjacencyMatrix)](#SmilesDrawer.SSSR.getEdgeList) ⇒ <code>Array.&lt;Array&gt;</code>
    * [.bondsToAtoms(bonds)](#SmilesDrawer.SSSR.bondsToAtoms) ⇒ <code>Set.&lt;Number&gt;</code>
    * [.getBondCount(atoms, adjacencyMatrix)](#SmilesDrawer.SSSR.getBondCount) ⇒ <code>Number</code>
    * [.pathSetsContain(pathSets, pathSet, bonds, allBonds)](#SmilesDrawer.SSSR.pathSetsContain) ⇒ <code>Boolean</code>
    * [.areSetsEqual(setA, setB)](#SmilesDrawer.SSSR.areSetsEqual) ⇒ <code>Boolean</code>
    * [.isSupersetOf(setA, setB)](#SmilesDrawer.SSSR.isSupersetOf) ⇒ <code>Boolean</code>

<a name="SmilesDrawer.SSSR.getRings"></a>

#### SSSR.getRings(graph) ⇒ <code>Array.&lt;Array&gt;</code>
Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.  

| Param | Type | Description |
| --- | --- | --- |
| graph | <code>[Graph](#SmilesDrawer.Graph)</code> | A SmilesDrawer.Graph object. |

<a name="SmilesDrawer.SSSR.matrixToString"></a>

#### SSSR.matrixToString(matrix) ⇒ <code>String</code>
Creates a printable string from a matrix (2D array).

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>String</code> - A string representing the matrix.  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Array.&lt;Array&gt;</code> | A 2D array. |

<a name="SmilesDrawer.SSSR.getPathIncludedDistanceMatrices"></a>

#### SSSR.getPathIncludedDistanceMatrices(adjacencyMatrix) ⇒ <code>Object</code>
Returnes the two path-included distance matrices used to find the sssr.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Object</code> - The path-included distance matrices. { p1, p2 }  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SmilesDrawer.SSSR.getRingCandidates"></a>

#### SSSR.getRingCandidates(d, pe1, pe2) ⇒ <code>Array.&lt;Array&gt;</code>
Get the ring candidates from the path-included distance matrices.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - The ring candidates.  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>Array.&lt;Array&gt;</code> | The distance matrix. |
| pe1 | <code>Array.&lt;Array&gt;</code> | A matrix containing the shortest paths. |
| pe2 | <code>Array.&lt;Array&gt;</code> | A matrix containing the shortest paths + one vertex. |

<a name="SmilesDrawer.SSSR.getSSSR"></a>

#### SSSR.getSSSR(c, d, adjacencyMatrix, pe1, pe2, nsssr) ⇒ <code>Array.&lt;Set&gt;</code>
Searches the candidates for the smallest set of smallest rings.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Array.&lt;Set&gt;</code> - The smallest set of smallest rings.  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>Array.&lt;Array&gt;</code> | The candidates. |
| d | <code>Array.&lt;Array&gt;</code> | The distance matrix. |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |
| pe1 | <code>Array.&lt;Array&gt;</code> | A matrix containing the shortest paths. |
| pe2 | <code>Array.&lt;Array&gt;</code> | A matrix containing the shortest paths + one vertex. |
| nsssr | <code>Number</code> | The theoretical number of rings in the graph. |

<a name="SmilesDrawer.SSSR.getEdgeCount"></a>

#### SSSR.getEdgeCount(adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of edges in a graph defined by an adjacency matrix.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Number</code> - The number of edges in the graph defined by the adjacency matrix.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SmilesDrawer.SSSR.getEdgeList"></a>

#### SSSR.getEdgeList(adjacencyMatrix) ⇒ <code>Array.&lt;Array&gt;</code>
Returns an edge list constructed form an adjacency matrix.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SmilesDrawer.SSSR.bondsToAtoms"></a>

#### SSSR.bondsToAtoms(bonds) ⇒ <code>Set.&lt;Number&gt;</code>
Return a set of vertex indices contained in an array of bonds.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Set.&lt;Number&gt;</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| bonds | <code>Array</code> | An array of bonds. A bond is defined as [ sourceVertexId, targetVertexId ]. |

<a name="SmilesDrawer.SSSR.getBondCount"></a>

#### SSSR.getBondCount(atoms, adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of bonds within a set of atoms.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Number</code> - The number of bonds in a set of atoms.  

| Param | Type | Description |
| --- | --- | --- |
| atoms | <code>Set.&lt;Number&gt;</code> | An array of atom ids. |
| adjacencyMatrix | <code>Array.&lt;Array&gt;</code> | An adjacency matrix. |

<a name="SmilesDrawer.SSSR.pathSetsContain"></a>

#### SSSR.pathSetsContain(pathSets, pathSet, bonds, allBonds) ⇒ <code>Boolean</code>
Checks whether or not a given path already exists in an array of paths.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not a give path is contained within a set.  

| Param | Type | Description |
| --- | --- | --- |
| pathSets | <code>Array.&lt;Set&gt;</code> | An array of sets each representing a path. |
| pathSet | <code>Set.&lt;Number&gt;</code> | A set representing a path. |
| bonds | <code>Array.&lt;Array&gt;</code> | The bonds associated with the current path. |
| allBonds | <code>Array.&lt;Array&gt;</code> | All bonds currently associated with rings in the SSSR set. |

<a name="SmilesDrawer.SSSR.areSetsEqual"></a>

#### SSSR.areSetsEqual(setA, setB) ⇒ <code>Boolean</code>
Checks whether or not two sets are equal (contain the same elements).

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two sets are equal.  

| Param | Type | Description |
| --- | --- | --- |
| setA | <code>Set.&lt;Number&gt;</code> | A set. |
| setB | <code>Set.&lt;Number&gt;</code> | A set. |

<a name="SmilesDrawer.SSSR.isSupersetOf"></a>

#### SSSR.isSupersetOf(setA, setB) ⇒ <code>Boolean</code>
Checks whether or not a set (setA) is a superset of another set (setB).

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not setB is a superset of setA.  

| Param | Type | Description |
| --- | --- | --- |
| setA | <code>Set.&lt;Number&gt;</code> | A set. |
| setB | <code>Set.&lt;Number&gt;</code> | A set. |

<a name="SmilesDrawer.Vector2"></a>

### SmilesDrawer.Vector2
A class representing a 2D vector.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x component of the vector. |
| y | <code>Number</code> | The y component of the vector. |


* [.Vector2](#SmilesDrawer.Vector2)
    * [new SmilesDrawer.Vector2(x, y)](#new_SmilesDrawer.Vector2_new)
    * _instance_
        * [.clone()](#SmilesDrawer.Vector2+clone) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.toString()](#SmilesDrawer.Vector2+toString) ⇒ <code>String</code>
        * [.add(vec)](#SmilesDrawer.Vector2+add) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.subtract(vec)](#SmilesDrawer.Vector2+subtract) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.divide(scalar)](#SmilesDrawer.Vector2+divide) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.multiply(v)](#SmilesDrawer.Vector2+multiply) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.multiplyScalar(scalar)](#SmilesDrawer.Vector2+multiplyScalar) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.invert()](#SmilesDrawer.Vector2+invert) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.angle()](#SmilesDrawer.Vector2+angle) ⇒ <code>Number</code>
        * [.distance(vec)](#SmilesDrawer.Vector2+distance) ⇒ <code>Number</code>
        * [.distanceSq(vec)](#SmilesDrawer.Vector2+distanceSq) ⇒ <code>Number</code>
        * [.clockwise(vec)](#SmilesDrawer.Vector2+clockwise) ⇒ <code>Number</code>
        * [.rotate(angle)](#SmilesDrawer.Vector2+rotate) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.rotateAround(angle, vec)](#SmilesDrawer.Vector2+rotateAround) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.rotateTo(vec, center, [offsetAngle])](#SmilesDrawer.Vector2+rotateTo) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.rotateAwayFrom(vec, center, angle)](#SmilesDrawer.Vector2+rotateAwayFrom)
        * [.getRotateAwayFromAngle(vec, center, angle)](#SmilesDrawer.Vector2+getRotateAwayFromAngle) ⇒ <code>Number</code>
        * [.getRotateTowardsAngle(vec, center, angle)](#SmilesDrawer.Vector2+getRotateTowardsAngle) ⇒ <code>Number</code>
        * [.getRotateToAngle(vec, center)](#SmilesDrawer.Vector2+getRotateToAngle) ⇒ <code>Number</code>
        * [.isInPolygon(polygon)](#SmilesDrawer.Vector2+isInPolygon) ⇒ <code>Boolean</code>
        * [.length()](#SmilesDrawer.Vector2+length) ⇒ <code>Number</code>
        * [.normalize()](#SmilesDrawer.Vector2+normalize) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.normalized()](#SmilesDrawer.Vector2+normalized) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.whichSide(vecA, vecB)](#SmilesDrawer.Vector2+whichSide) ⇒ <code>Number</code>
        * [.sameSideAs(vecA, vecB, vecC)](#SmilesDrawer.Vector2+sameSideAs) ⇒ <code>Boolean</code>
    * _static_
        * [.add(vecA, vecB)](#SmilesDrawer.Vector2.add) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.subtract(vecA, vecB)](#SmilesDrawer.Vector2.subtract) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.multiply(vecA, vecB)](#SmilesDrawer.Vector2.multiply) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.multiplyScalar(vec, scalar)](#SmilesDrawer.Vector2.multiplyScalar) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.midpoint(vecA, vecB)](#SmilesDrawer.Vector2.midpoint) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.normals(vecA, vecB)](#SmilesDrawer.Vector2.normals) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
        * [.units(vecA, vecB)](#SmilesDrawer.Vector2.units) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
        * [.divide(vecA, vecB)](#SmilesDrawer.Vector2.divide) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
        * [.dot(vecA, vecB)](#SmilesDrawer.Vector2.dot) ⇒ <code>Number</code>
        * [.angle(vecA, vecB)](#SmilesDrawer.Vector2.angle) ⇒ <code>Number</code>
        * [.threePointangle(vecA, vecB, vecC)](#SmilesDrawer.Vector2.threePointangle) ⇒ <code>Number</code>
        * [.scalarProjection(vecA, vecB)](#SmilesDrawer.Vector2.scalarProjection) ⇒ <code>Number</code>

<a name="new_SmilesDrawer.Vector2_new"></a>

#### new SmilesDrawer.Vector2(x, y)
The constructor of the class Vector2.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The initial x coordinate value. |
| y | <code>Number</code> | The initial y coordinate value. |

<a name="SmilesDrawer.Vector2+clone"></a>

#### vector2.clone() ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Clones this vector and returns the clone.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - The clone of this vector.  
<a name="SmilesDrawer.Vector2+toString"></a>

#### vector2.toString() ⇒ <code>String</code>
Returns a string representation of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>String</code> - A string representation of this vector.  
<a name="SmilesDrawer.Vector2+add"></a>

#### vector2.add(vec) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | Another vector. |

<a name="SmilesDrawer.Vector2+subtract"></a>

#### vector2.subtract(vec) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | Another vector. |

<a name="SmilesDrawer.Vector2+divide"></a>

#### vector2.divide(scalar) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Divide the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>Number</code> | The scalar. |

<a name="SmilesDrawer.Vector2+multiply"></a>

#### vector2.multiply(v) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Multiply the x and y coordinate values of this vector by the values of another vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |

<a name="SmilesDrawer.Vector2+multiplyScalar"></a>

#### vector2.multiplyScalar(scalar) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Multiply the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>Number</code> | The scalar. |

<a name="SmilesDrawer.Vector2+invert"></a>

#### vector2.invert() ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Inverts this vector. Same as multiply(-1.0).

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  
<a name="SmilesDrawer.Vector2+angle"></a>

#### vector2.angle() ⇒ <code>Number</code>
Returns the angle of this vector in relation to the coordinate system.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The angle in radians.  
<a name="SmilesDrawer.Vector2+distance"></a>

#### vector2.distance(vec) ⇒ <code>Number</code>
Returns the euclidean distance between this vector and another vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The euclidean distance between the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |

<a name="SmilesDrawer.Vector2+distanceSq"></a>

#### vector2.distanceSq(vec) ⇒ <code>Number</code>
Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The squared euclidean distance of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | Another vector. |

<a name="SmilesDrawer.Vector2+clockwise"></a>

#### vector2.clockwise(vec) ⇒ <code>Number</code>
Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | Another vector. |

<a name="SmilesDrawer.Vector2+rotate"></a>

#### vector2.rotate(angle) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Rotates this vector by a given number of radians around the origin of the coordinate system.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>Number</code> | The angle in radians to rotate the vector. |

<a name="SmilesDrawer.Vector2+rotateAround"></a>

#### vector2.rotateAround(angle, vec) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Rotates this vector around another vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>Number</code> | The angle in radians to rotate the vector. |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The vector which is used as the rotational center. |

<a name="SmilesDrawer.Vector2+rotateTo"></a>

#### vector2.rotateTo(vec, center, [offsetAngle]) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> |  | The vector to rotate this vector to. |
| center | <code>[Vector2](#SmilesDrawer.Vector2)</code> |  | The rotational center. |
| [offsetAngle] | <code>Number</code> | <code>0.0</code> | An additional amount of radians to rotate the vector. |

<a name="SmilesDrawer.Vector2+rotateAwayFrom"></a>

#### vector2.rotateAwayFrom(vec, center, angle)
Rotates the vector away from a specified vector around a center.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The vector this one is rotated away from. |
| center | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="SmilesDrawer.Vector2+getRotateAwayFromAngle"></a>

#### vector2.getRotateAwayFromAngle(vec, center, angle) ⇒ <code>Number</code>
Returns the angle in radians used to rotate this vector away from a given vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The vector this one is rotated away from. |
| center | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="SmilesDrawer.Vector2+getRotateTowardsAngle"></a>

#### vector2.getRotateTowardsAngle(vec, center, angle) ⇒ <code>Number</code>
Returns the angle in radians used to rotate this vector towards a given vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The vector this one is rotated towards to. |
| center | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The rotational center. |
| angle | <code>Number</code> | The angle by which to rotate. |

<a name="SmilesDrawer.Vector2+getRotateToAngle"></a>

#### vector2.getRotateToAngle(vec, center) ⇒ <code>Number</code>
Gets the angles between this vector and another vector around a common center of rotation.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The angle between this vector and another vector around a center of rotation in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | Another vector. |
| center | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The center of rotation. |

<a name="SmilesDrawer.Vector2+isInPolygon"></a>

#### vector2.isInPolygon(polygon) ⇒ <code>Boolean</code>
Checks whether a vector lies within a polygon spanned by a set of vectors.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this vector is within a polygon.  

| Param | Type | Description |
| --- | --- | --- |
| polygon | <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code> | An array of vectors spanning the polygon. |

<a name="SmilesDrawer.Vector2+length"></a>

#### vector2.length() ⇒ <code>Number</code>
Returns the length of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The length of this vector.  
<a name="SmilesDrawer.Vector2+normalize"></a>

#### vector2.normalize() ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Normalizes this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns itself.  
<a name="SmilesDrawer.Vector2+normalized"></a>

#### vector2.normalized() ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Returns a normalized copy of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - A normalized copy of this vector.  
<a name="SmilesDrawer.Vector2+whichSide"></a>

#### vector2.whichSide(vecA, vecB) ⇒ <code>Number</code>
Calculates which side of a line spanned by two vectors this vector is.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - A number indicating the side of this vector, given a line spanned by two other vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |

<a name="SmilesDrawer.Vector2+sameSideAs"></a>

#### vector2.sameSideAs(vecA, vecB, vecC) ⇒ <code>Boolean</code>
Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Boolean</code> - Returns a boolean indicating whether or not this vector is on the same side as another vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector spanning the line. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector spanning the line. |
| vecC | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector to check whether or not it is on the same side as this vector. |

<a name="SmilesDrawer.Vector2.add"></a>

#### Vector2.add(vecA, vecB) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Adds two vectors and returns the result as a new vector.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns the sum of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A summand. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A summand. |

<a name="SmilesDrawer.Vector2.subtract"></a>

#### Vector2.subtract(vecA, vecB) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Subtracts one vector from another and returns the result as a new vector.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns the difference of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The minuend. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The subtrahend. |

<a name="SmilesDrawer.Vector2.multiply"></a>

#### Vector2.multiply(vecA, vecB) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |

<a name="SmilesDrawer.Vector2.multiplyScalar"></a>

#### Vector2.multiplyScalar(vec, scalar) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |
| scalar | <code>Number</code> | A scalar. |

<a name="SmilesDrawer.Vector2.midpoint"></a>

#### Vector2.midpoint(vecA, vecB) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Returns the midpoint of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - The midpoint of the line spanned by two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector spanning the line. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector spanning the line. |

<a name="SmilesDrawer.Vector2.normals"></a>

#### Vector2.normals(vecA, vecB) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
Returns the normals of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code> - An array containing the two normals, each represented by a vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector spanning the line. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector spanning the line. |

<a name="SmilesDrawer.Vector2.units"></a>

#### Vector2.units(vecA, vecB) ⇒ <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code>
Returns the unit (normalized normal) vectors of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Array.&lt;Vector2&gt;](#SmilesDrawer.Vector2)</code> - An array containing the two unit vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector spanning the line. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector spanning the line. |

<a name="SmilesDrawer.Vector2.divide"></a>

#### Vector2.divide(vecA, vecB) ⇒ <code>[Vector2](#SmilesDrawer.Vector2)</code>
Divides a vector by another vector and returns the result as new vector.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>[Vector2](#SmilesDrawer.Vector2)</code> - The fraction of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The dividend. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The divisor. |

<a name="SmilesDrawer.Vector2.dot"></a>

#### Vector2.dot(vecA, vecB) ⇒ <code>Number</code>
Returns the dot product of two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The dot product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |

<a name="SmilesDrawer.Vector2.angle"></a>

#### Vector2.angle(vecA, vecB) ⇒ <code>Number</code>
Returns the angle between two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The angle between two vectors in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |

<a name="SmilesDrawer.Vector2.threePointangle"></a>

#### Vector2.threePointangle(vecA, vecB, vecC) ⇒ <code>Number</code>
Returns the angle between two vectors based on a third vector in between.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |
| vecC | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A vector. |

<a name="SmilesDrawer.Vector2.scalarProjection"></a>

#### Vector2.scalarProjection(vecA, vecB) ⇒ <code>Number</code>
Returns the scalar projection of a vector on another vector.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Number</code> - The scalar component.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>[Vector2](#SmilesDrawer.Vector2)</code> | Thecreate jsdoc babel vector to be projected. |
| vecB | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The vector to be projection upon. |

<a name="SmilesDrawer.Vertex"></a>

### SmilesDrawer.Vertex
A class representing a vertex.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The id of this vertex. |
| value | <code>Atom</code> | The atom associated with this vertex. |
| position | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The position of this vertex. |
| previousPosition | <code>[Vector2](#SmilesDrawer.Vector2)</code> | The position of the previous vertex. |
| parentVertexId | <code>Number</code> &#124; <code>null</code> | The id of the previous vertex. |
| children | <code>Array.&lt;Number&gt;</code> | The ids of the children of this vertex. |
| spanningTreeChildren | <code>Array.&lt;Number&gt;</code> | The ids of the children of this vertex as defined in the spanning tree defined by the SMILES. |
| edges | <code>Array.&lt;Number&gt;</code> | The ids of edges associated with this vertex. |
| positioned | <code>Boolean</code> | A boolean indicating whether or not this vertex has been positioned. |
| angle | <code>Number</code> | The angle of this vertex. |
| globalAngle | <code>Number</code> | The global angle of this vertex. |
| dir | <code>Number</code> | The direction of this vertex. |
| backAngle | <code>Number</code> | The back angle associated with this vertex. |
| flippable | <code>Boolean</code> | A boolean indicating whether or not this vertex can be flipped into a ring. |
| flipCenter | <code>Number</code> &#124; <code>null</code> | The id of the vertex on which this one can be flipped. |
| flipNeighbour | <code>Number</code> &#124; <code>null</code> | The id of the vertex which caused this vertex to be flipped. |
| flipRings | <code>Array.&lt;Number&gt;</code> | An array of ring ids which specify candidates for this vertex to be flipped into. |
| neighbourCount | <code>Number</code> | The number of neighbouring vertices. |
| neighbours | <code>Array.&lt;Number&gt;</code> | The vertex ids of neighbouring vertices. |
| neighbouringElements | <code>Array.&lt;String&gt;</code> | The element symbols associated with neighbouring vertices. |


* [.Vertex](#SmilesDrawer.Vertex)
    * [new SmilesDrawer.Vertex(value, [x], [y])](#new_SmilesDrawer.Vertex_new)
    * [.setPosition(x, y)](#SmilesDrawer.Vertex+setPosition)
    * [.setPositionFromVector(v)](#SmilesDrawer.Vertex+setPositionFromVector)
    * [.addChild(vertexID)](#SmilesDrawer.Vertex+addChild)
    * [.setParentVertexId(parentVertexId)](#SmilesDrawer.Vertex+setParentVertexId)
    * [.isTerminal()](#SmilesDrawer.Vertex+isTerminal) ⇒ <code>Boolean</code>
    * [.clone()](#SmilesDrawer.Vertex+clone) ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
    * [.equals(vertex)](#SmilesDrawer.Vertex+equals) ⇒ <code>Boolean</code>
    * [.getAngle([referenceVector], [returnAsDegrees])](#SmilesDrawer.Vertex+getAngle) ⇒ <code>Number</code>
    * [.getTextDirection(vertices)](#SmilesDrawer.Vertex+getTextDirection) ⇒ <code>String</code>
    * [.getNeighbours([vertexId])](#SmilesDrawer.Vertex+getNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.getDrawnNeighbours(vertices)](#SmilesDrawer.Vertex+getDrawnNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.getNeighbourCount()](#SmilesDrawer.Vertex+getNeighbourCount) ⇒ <code>Number</code>
    * [.getCommonNeighbours(vertex)](#SmilesDrawer.Vertex+getCommonNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.isNeighbour(vertexId)](#SmilesDrawer.Vertex+isNeighbour) ⇒ <code>Boolean</code>
    * [.getSpanningTreeNeighbours([vertexId])](#SmilesDrawer.Vertex+getSpanningTreeNeighbours) ⇒ <code>Array.&lt;Number&gt;</code>
    * [.getNextInRing(vertices, ringId, previousVertexId)](#SmilesDrawer.Vertex+getNextInRing) ⇒ <code>Number</code>

<a name="new_SmilesDrawer.Vertex_new"></a>

#### new SmilesDrawer.Vertex(value, [x], [y])
The constructor for the class Vertex.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>\*</code> |  | The value associated with this vertex. |
| [x] | <code>Number</code> | <code>0</code> | The initial x coordinate of the positional vector of this vertex. |
| [y] | <code>Number</code> | <code>0</code> | The initial y coordinate of the positional vector of this vertex. |

<a name="SmilesDrawer.Vertex+setPosition"></a>

#### vertex.setPosition(x, y)
Set the 2D coordinates of the vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x component of the coordinates. |
| y | <code>Number</code> | The y component of the coordinates. |

<a name="SmilesDrawer.Vertex+setPositionFromVector"></a>

#### vertex.setPositionFromVector(v)
Set the 2D coordinates of the vertex from a Vector2.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>[Vector2](#SmilesDrawer.Vector2)</code> | A 2D vector. |

<a name="SmilesDrawer.Vertex+addChild"></a>

#### vertex.addChild(vertexID)
Add a child vertex id to this vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexID | <code>Number</code> | The id of a vertex to be added as a child to this vertex. |

<a name="SmilesDrawer.Vertex+setParentVertexId"></a>

#### vertex.setParentVertexId(parentVertexId)
Set the vertex id of the parent.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| parentVertexId | <code>Number</code> | The parents vertex id. |

<a name="SmilesDrawer.Vertex+isTerminal"></a>

#### vertex.isTerminal() ⇒ <code>Boolean</code>
Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not this vertex is terminal.  
<a name="SmilesDrawer.Vertex+clone"></a>

#### vertex.clone() ⇒ <code>[Vertex](#SmilesDrawer.Vertex)</code>
Clones this vertex and returns the clone.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>[Vertex](#SmilesDrawer.Vertex)</code> - A clone of this vertex.  
<a name="SmilesDrawer.Vertex+equals"></a>

#### vertex.equals(vertex) ⇒ <code>Boolean</code>
Returns true if this vertex and the supplied vertex both have the same id, else returns false.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two vertices have the same id.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>[Vertex](#SmilesDrawer.Vertex)</code> | The vertex to check. |

<a name="SmilesDrawer.Vertex+getAngle"></a>

#### vertex.getAngle([referenceVector], [returnAsDegrees]) ⇒ <code>Number</code>
Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Number</code> - The angle of this vertex.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [referenceVector] | <code>[Vertex](#SmilesDrawer.Vertex)</code> | <code></code> | The refernece vector. |
| [returnAsDegrees] | <code>Boolean</code> | <code>false</code> | If true, returns angle in degrees, else in radians. |

<a name="SmilesDrawer.Vertex+getTextDirection"></a>

#### vertex.getTextDirection(vertices) ⇒ <code>String</code>
Returns the suggested text direction when text is added at the position of this vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>String</code> - The suggested direction of the text.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | The array of vertices for the current molecule. |

<a name="SmilesDrawer.Vertex+getNeighbours"></a>

#### vertex.getNeighbours([vertexId]) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of ids of neighbouring vertices.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the ids of neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>Number</code> | <code></code> | If a value is supplied, the vertex with this id is excluded from the returned indices. |

<a name="SmilesDrawer.Vertex+getDrawnNeighbours"></a>

#### vertex.getDrawnNeighbours(vertices) ⇒ <code>Array.&lt;Number&gt;</code>
Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the ids of neighbouring vertices that will be drawn.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | An array containing the vertices associated with the current molecule. |

<a name="SmilesDrawer.Vertex+getNeighbourCount"></a>

#### vertex.getNeighbourCount() ⇒ <code>Number</code>
Returns the number of neighbours of this vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Number</code> - The number of neighbours.  
<a name="SmilesDrawer.Vertex+getCommonNeighbours"></a>

#### vertex.getCommonNeighbours(vertex) ⇒ <code>Array.&lt;Number&gt;</code>
Gets the common neighbours of this and another vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the ids of common neighbours.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | The vertex to check for common neighbours. |

<a name="SmilesDrawer.Vertex+isNeighbour"></a>

#### vertex.isNeighbour(vertexId) ⇒ <code>Boolean</code>
Checks whether or not a vertex is a neighbour of this vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Boolean</code> - A boolean indicating whether or not the two vertices are neighbours.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>Number</code> | The id of the vertex to check if it is a neighbour of this vertex. |

<a name="SmilesDrawer.Vertex+getSpanningTreeNeighbours"></a>

#### vertex.getSpanningTreeNeighbours([vertexId]) ⇒ <code>Array.&lt;Number&gt;</code>
Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array containing the ids of the neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>Number</code> | <code></code> | If supplied, the vertex with this id is excluded from the array returned. |

<a name="SmilesDrawer.Vertex+getNextInRing"></a>

#### vertex.getNextInRing(vertices, ringId, previousVertexId) ⇒ <code>Number</code>
Gets the next vertex in the ring in opposide direction to the supplied vertex id.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Number</code> - The id of the next vertex in the ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>[Array.&lt;Vertex&gt;](#SmilesDrawer.Vertex)</code> | The array of vertices for the current molecule. |
| ringId | <code>Number</code> | The id of the ring containing this vertex. |
| previousVertexId | <code>Number</code> | The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex. |

<a name="SmilesDrawer.clean"></a>

### SmilesDrawer.clean(smiles) ⇒ <code>String</code>
Cleans a SMILES string (removes non-valid characters)

**Kind**: static method of <code>[SmilesDrawer](#SmilesDrawer)</code>  
**Returns**: <code>String</code> - The clean SMILES string.  

| Param | Type | Description |
| --- | --- | --- |
| smiles | <code>String</code> | A SMILES string. |

<a name="SmilesDrawer.apply"></a>

### SmilesDrawer.apply(options, [selector], [themeName], [onError])
Applies the smiles drawer draw function to each canvas element that has a smiles string in the data-smiles attribute.

**Kind**: static method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | SmilesDrawer options. |
| [selector] | <code>String</code> | <code>&#x27;canvas[data-smiles]&#x27;</code> | Selectors for the draw areas (canvas elements). |
| [themeName] | <code>String</code> | <code>&#x27;light&#x27;</code> | The theme to apply. |
| [onError] | <code>function</code> | <code>&#x27;null&#x27;</code> | A callback function providing an error object. |

<a name="SmilesDrawer.parse"></a>

### SmilesDrawer.parse(smiles, successCallback, errorCallback)
Parses the entered smiles string.

**Kind**: static method of <code>[SmilesDrawer](#SmilesDrawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| smiles | <code>String</code> | A SMILES string. |
| successCallback | <code>function</code> | A callback that is called on success with the parse tree. |
| errorCallback | <code>function</code> | A callback that is called with the error object on error. |


* * *
