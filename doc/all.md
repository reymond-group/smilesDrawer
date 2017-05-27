[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

<a name="SmilesDrawer"></a>

## SmilesDrawer
The SmilesDrawer namespace.

**Kind**: global variable  

* [SmilesDrawer](#SmilesDrawer)
    * [.ArrayHelper](#SmilesDrawer.ArrayHelper)
        * [.clone(arr)](#SmilesDrawer.ArrayHelper.clone) ⇒ <code>array</code> &#124; <code>object</code>
        * [.print(arr)](#SmilesDrawer.ArrayHelper.print) ⇒ <code>string</code>
        * [.each(arr, callback)](#SmilesDrawer.ArrayHelper.each)
        * [.get(arr, property, value)](#SmilesDrawer.ArrayHelper.get) ⇒ <code>\*</code>
        * [.contains(arr, options)](#SmilesDrawer.ArrayHelper.contains) ⇒ <code>boolean</code>
        * [.intersection(arrA, arrB)](#SmilesDrawer.ArrayHelper.intersection) ⇒ <code>array</code>
        * [.unique(arr)](#SmilesDrawer.ArrayHelper.unique) ⇒ <code>array</code>
        * [.count(arr, value)](#SmilesDrawer.ArrayHelper.count) ⇒ <code>number</code>
        * [.toggle(arr, value)](#SmilesDrawer.ArrayHelper.toggle) ⇒ <code>array</code>
        * [.remove(arr, value)](#SmilesDrawer.ArrayHelper.remove) ⇒ <code>array</code>
        * [.removeUnique(arr, value)](#SmilesDrawer.ArrayHelper.removeUnique) ⇒ <code>array</code>
        * [.removeAll(arrA, arrB)](#SmilesDrawer.ArrayHelper.removeAll) ⇒ <code>array</code>
        * [.merge(arrA, arrB)](#SmilesDrawer.ArrayHelper.merge) ⇒ <code>array</code>
        * [.containsAll(arrA, arrB)](#SmilesDrawer.ArrayHelper.containsAll) ⇒ <code>boolean</code>
        * [.sortByAtomicNumberDesc(arr)](#SmilesDrawer.ArrayHelper.sortByAtomicNumberDesc) ⇒ <code>array</code>
        * [.deepCopy(arr)](#SmilesDrawer.ArrayHelper.deepCopy) ⇒ <code>array</code>
    * [.Atom](#SmilesDrawer.Atom)
        * [new SmilesDrawer.Atom(element, [bondType])](#new_SmilesDrawer.Atom_new)
        * _instance_
            * [.addNeighbouringElement(element)](#SmilesDrawer.Atom+addNeighbouringElement)
            * [.attachPseudoElement(element, previousElement, [hydrogenCount])](#SmilesDrawer.Atom+attachPseudoElement)
            * [.getAttachedPseudoElements()](#SmilesDrawer.Atom+getAttachedPseudoElements) ⇒ <code>object</code>
            * [.getAttachedPseudoElementsCount()](#SmilesDrawer.Atom+getAttachedPseudoElementsCount) ⇒ <code>number</code>
            * [.addAnchoredRing(ringId)](#SmilesDrawer.Atom+addAnchoredRing)
            * [.getRingbondCount()](#SmilesDrawer.Atom+getRingbondCount) ⇒ <code>number</code>
            * [.canRotate()](#SmilesDrawer.Atom+canRotate) ⇒ <code>boolean</code>
            * [.hasRingbonds()](#SmilesDrawer.Atom+hasRingbonds) ⇒ <code>boolean</code>
            * [.getMaxRingbond()](#SmilesDrawer.Atom+getMaxRingbond) ⇒ <code>number</code>
            * [.isInRing()](#SmilesDrawer.Atom+isInRing) ⇒ <code>boolean</code>
            * [.hasRing(ringId)](#SmilesDrawer.Atom+hasRing) ⇒ <code>boolean</code>
            * [.backupRings()](#SmilesDrawer.Atom+backupRings)
            * [.restoreRings()](#SmilesDrawer.Atom+restoreRings)
            * [.haveCommonRingbond(atomA, atomB)](#SmilesDrawer.Atom+haveCommonRingbond) ⇒ <code>boolean</code>
            * [.maxCommonRingbond(atomA, atomB)](#SmilesDrawer.Atom+maxCommonRingbond) ⇒ <code>number</code>
            * [.getOrder(center)](#SmilesDrawer.Atom+getOrder) ⇒ <code>number</code>
            * [.setOrder(The, The)](#SmilesDrawer.Atom+setOrder)
            * [.neighbouringElementsEqual(arr)](#SmilesDrawer.Atom+neighbouringElementsEqual) ⇒ <code>boolean</code>
            * [.getAtomicNumber()](#SmilesDrawer.Atom+getAtomicNumber) ⇒ <code>number</code>
        * _static_
            * [.sortByAtomicNumber(root, neighbours, vertices, rings)](#SmilesDrawer.Atom.sortByAtomicNumber) ⇒ <code>array</code>
            * [.hasDuplicateAtomicNumbers(sortedAtomicNumbers)](#SmilesDrawer.Atom.hasDuplicateAtomicNumbers) ⇒ <code>boolean</code>
            * [.getDuplicateAtomicNumbers(sortedAtomicNumbers)](#SmilesDrawer.Atom.getDuplicateAtomicNumbers) ⇒ <code>array</code>
    * [.CanvasWrapper](#SmilesDrawer.CanvasWrapper)
        * [new SmilesDrawer.CanvasWrapper(target, theme, options)](#new_SmilesDrawer.CanvasWrapper_new)
        * [.updateSize(width, height)](#SmilesDrawer.CanvasWrapper+updateSize)
        * [.setTheme(theme)](#SmilesDrawer.CanvasWrapper+setTheme)
        * [.scale(vertices)](#SmilesDrawer.CanvasWrapper+scale)
        * [.reset()](#SmilesDrawer.CanvasWrapper+reset)
        * [.getColor(key)](#SmilesDrawer.CanvasWrapper+getColor) ⇒ <code>string</code>
        * [.drawCircle(x, y, radius, color, [fill], [debug], [debugText])](#SmilesDrawer.CanvasWrapper+drawCircle)
        * [.drawLine(line)](#SmilesDrawer.CanvasWrapper+drawLine)
        * [.drawWedge(line, width)](#SmilesDrawer.CanvasWrapper+drawWedge)
        * [.drawDashedWedge(line, width)](#SmilesDrawer.CanvasWrapper+drawDashedWedge)
        * [.drawDebugText(x, y, text)](#SmilesDrawer.CanvasWrapper+drawDebugText)
        * [.drawBall(x, y, elementName, hydrogens)](#SmilesDrawer.CanvasWrapper+drawBall)
        * [.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, [pseudoElements])](#SmilesDrawer.CanvasWrapper+drawText)
        * [.drawDebugPoint(x, y, [debugText], [color])](#SmilesDrawer.CanvasWrapper+drawDebugPoint)
        * [.drawAromaticityRing(ring)](#SmilesDrawer.CanvasWrapper+drawAromaticityRing)
        * [.clear()](#SmilesDrawer.CanvasWrapper+clear)
    * [.Drawer](#SmilesDrawer.Drawer)
        * [new SmilesDrawer.Drawer(options)](#new_SmilesDrawer.Drawer_new)
        * [.extend()](#SmilesDrawer.Drawer+extend)
        * [.draw(data, target, themeName, infoOnly)](#SmilesDrawer.Drawer+draw)
        * [.edgeRingCount(edgeId)](#SmilesDrawer.Drawer+edgeRingCount) ⇒ <code>number</code>
        * [.getBridgedRings()](#SmilesDrawer.Drawer+getBridgedRings) ⇒ <code>array</code>
        * [.getFusedRings()](#SmilesDrawer.Drawer+getFusedRings) ⇒ <code>array</code>
        * [.getSpiros()](#SmilesDrawer.Drawer+getSpiros) ⇒ <code>array</code>
        * [.printRingInfo()](#SmilesDrawer.Drawer+printRingInfo) ⇒ <code>string</code>
        * [.getTotalOverlapScore()](#SmilesDrawer.Drawer+getTotalOverlapScore) ⇒ <code>number</code>
        * [.getRingCount()](#SmilesDrawer.Drawer+getRingCount) ⇒ <code>number</code>
        * [.hasBridgedRing()](#SmilesDrawer.Drawer+hasBridgedRing) ⇒ <code>boolean</code>
        * [.getHeavyAtomCount()](#SmilesDrawer.Drawer+getHeavyAtomCount) ⇒ <code>number</code>
        * [.getRingbondType(vertexA, vertexB)](#SmilesDrawer.Drawer+getRingbondType) ⇒ <code>string</code> &#124; <code>null</code>
        * [.initRings()](#SmilesDrawer.Drawer+initRings)
        * [.getBridgedRingRings(ringId)](#SmilesDrawer.Drawer+getBridgedRingRings) ⇒ <code>array</code>
        * [.isPartOfBridgedRing(ringId)](#SmilesDrawer.Drawer+isPartOfBridgedRing) ⇒ <code>boolean</code>
        * [.createBridgedRing(ringIds, sourceVertexId)](#SmilesDrawer.Drawer+createBridgedRing) ⇒ <code>Ring</code>
        * [.areVerticesInSameRing(vertexA, vertexB)](#SmilesDrawer.Drawer+areVerticesInSameRing) ⇒ <code>boolean</code>
        * [.getCommonRings(vertexA, vertexB)](#SmilesDrawer.Drawer+getCommonRings) ⇒ <code>array</code>
        * [.getSmallestCommonRing(vertexA, vertexB)](#SmilesDrawer.Drawer+getSmallestCommonRing) ⇒ <code>Ring</code> &#124; <code>null</code>
        * [.getLargestOrAromaticCommonRing(vertexA, vertexB)](#SmilesDrawer.Drawer+getLargestOrAromaticCommonRing) ⇒ <code>Ring</code> &#124; <code>null</code>
        * [.getVerticesAt(position, radius, excludeVertexId)](#SmilesDrawer.Drawer+getVerticesAt) ⇒ <code>array</code>
        * [.getClosestVertex(vertex)](#SmilesDrawer.Drawer+getClosestVertex) ⇒ <code>Vertex</code>
        * [.getClosestEndpointVertex(vertex)](#SmilesDrawer.Drawer+getClosestEndpointVertex) ⇒ <code>Vertex</code>
        * [.addRing(ring)](#SmilesDrawer.Drawer+addRing) ⇒ <code>number</code>
        * [.removeRing(ringId)](#SmilesDrawer.Drawer+removeRing)
        * [.getRing(ringId)](#SmilesDrawer.Drawer+getRing) ⇒ <code>Ring</code>
        * [.addRingConnection(ringConnection)](#SmilesDrawer.Drawer+addRingConnection) ⇒ <code>number</code>
        * [.removeRingConnection(ringConnectionId)](#SmilesDrawer.Drawer+removeRingConnection)
        * [.removeRingConnectionsBetween(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+removeRingConnectionsBetween)
        * [.getRingConnections(ringId, ringIds)](#SmilesDrawer.Drawer+getRingConnections) ⇒ <code>array</code>
        * [.isRingConnection(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+isRingConnection) ⇒ <code>boolean</code>
        * [.getOverlapScore()](#SmilesDrawer.Drawer+getOverlapScore) ⇒ <code>object</code>
        * [.chooseSide(vertexA, vertexB, sides)](#SmilesDrawer.Drawer+chooseSide) ⇒ <code>object</code>
        * [.areConnected(vertexIdA, vertexIdA)](#SmilesDrawer.Drawer+areConnected) ⇒ <code>boolean</code>
        * [.getEdgeWeight(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+getEdgeWeight) ⇒ <code>number</code> &#124; <code>null</code>
        * [.forceLayout(vertices, center, startVertexId, ring)](#SmilesDrawer.Drawer+forceLayout)
        * [.getSubringCenter(ring, vertex)](#SmilesDrawer.Drawer+getSubringCenter) ⇒ <code>Vector2</code>
        * [.drawEdges(debug)](#SmilesDrawer.Drawer+drawEdges)
        * [.drawVertices(debug)](#SmilesDrawer.Drawer+drawVertices)
        * [.position()](#SmilesDrawer.Drawer+position)
        * [.clearPositions()](#SmilesDrawer.Drawer+clearPositions)
        * [.restorePositions()](#SmilesDrawer.Drawer+restorePositions)
        * [.backupRingInformation()](#SmilesDrawer.Drawer+backupRingInformation)
        * [.restoreRingInformation()](#SmilesDrawer.Drawer+restoreRingInformation)
        * [.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])](#SmilesDrawer.Drawer+createRing)
        * [.rotateSubtree(vertexId, parentVertexId, angle, center)](#SmilesDrawer.Drawer+rotateSubtree)
        * [.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores)](#SmilesDrawer.Drawer+getSubtreeOverlapScore) ⇒ <code>number</code>
        * [.getCurrentCenterOfMass()](#SmilesDrawer.Drawer+getCurrentCenterOfMass) ⇒ <code>Vector2</code>
        * [.getCurrentCenterOfMassInNeigbourhood(vec, [r])](#SmilesDrawer.Drawer+getCurrentCenterOfMassInNeigbourhood) ⇒ <code>Vector2</code>
        * [.resolvePrimaryOverlaps()](#SmilesDrawer.Drawer+resolvePrimaryOverlaps)
        * [.resolveSecondaryOverlaps(scores)](#SmilesDrawer.Drawer+resolveSecondaryOverlaps)
        * [.createNextBond(vertex, previousVertex, ringOrAngle, dir)](#SmilesDrawer.Drawer+createNextBond)
        * [.getCommonRingbondNeighbour(vertex)](#SmilesDrawer.Drawer+getCommonRingbondNeighbour) ⇒ <code>number</code> &#124; <code>null</code>
        * [.isPointInRing(vec)](#SmilesDrawer.Drawer+isPointInRing) ⇒ <code>boolean</code>
        * [.isEdgeInRing(edge)](#SmilesDrawer.Drawer+isEdgeInRing) ⇒ <code>boolean</code>
        * [.isEdgeRotatable(edge)](#SmilesDrawer.Drawer+isEdgeRotatable) ⇒ <code>boolean</code>
        * [.isRingAromatic(ring)](#SmilesDrawer.Drawer+isRingAromatic) ⇒ <code>boolean</code>
        * [.isEdgeInAromaticRing(edge)](#SmilesDrawer.Drawer+isEdgeInAromaticRing) ⇒ <code>boolean</code>
        * [.getEdgeNormals(edge)](#SmilesDrawer.Drawer+getEdgeNormals) ⇒ <code>array</code>
        * [.getTreeDepth(vertexId, parentVertexId)](#SmilesDrawer.Drawer+getTreeDepth) ⇒ <code>number</code>
        * [.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst])](#SmilesDrawer.Drawer+traverseTree)
        * [.getBondCount(vertex)](#SmilesDrawer.Drawer+getBondCount) ⇒ <code>number</code>
        * [.getNonRingNeighbours(vertexId)](#SmilesDrawer.Drawer+getNonRingNeighbours) ⇒ <code>array</code>
        * [.initPseudoElements()](#SmilesDrawer.Drawer+initPseudoElements)
    * [.Edge](#SmilesDrawer.Edge)
        * [new SmilesDrawer.Edge(sourceId, targetId, weight)](#new_SmilesDrawer.Edge_new)
        * _instance_
            * [.getBondCount()](#SmilesDrawer.Edge+getBondCount) ⇒ <code>number</code>
        * _static_
            * [.bonds](#SmilesDrawer.Edge.bonds) ⇒ <code>object</code>
    * [.Graph](#SmilesDrawer.Graph)
        * [new SmilesDrawer.Graph(parseTree, [isomeric])](#new_SmilesDrawer.Graph_new)
        * _instance_
            * [._init(node, parentVertexId, isBranch)](#SmilesDrawer.Graph+_init)
            * [._initInfos()](#SmilesDrawer.Graph+_initInfos)
            * [.clear()](#SmilesDrawer.Graph+clear)
            * [.addVertex(vertex)](#SmilesDrawer.Graph+addVertex) ⇒ <code>number</code>
            * [.addEdge(edge)](#SmilesDrawer.Graph+addEdge) ⇒ <code>number</code>
            * [.getEdge(vertexIdA, vertexIdB)](#SmilesDrawer.Graph+getEdge) ⇒ <code>number</code> &#124; <code>null</code>
            * [.hasEdge(vertexIdA, vertexIdB)](#SmilesDrawer.Graph+hasEdge) ⇒ <code>number</code> &#124; <code>null</code>
            * [.getVertexList()](#SmilesDrawer.Graph+getVertexList) ⇒ <code>array</code>
            * [.getEdgeList()](#SmilesDrawer.Graph+getEdgeList) ⇒ <code>array</code>
            * [.getAdjacencyMatrix()](#SmilesDrawer.Graph+getAdjacencyMatrix) ⇒ <code>array</code>
            * [.getComponentsAdjacencyMatrix()](#SmilesDrawer.Graph+getComponentsAdjacencyMatrix) ⇒ <code>array</code>
            * [.getSubgraphAdjacencyMatrix(vertexIds)](#SmilesDrawer.Graph+getSubgraphAdjacencyMatrix) ⇒ <code>array</code>
            * [.getAdjacencyList()](#SmilesDrawer.Graph+getAdjacencyList) ⇒ <code>array</code>
            * [.getSubgraphAdjacencyList(vertexIds)](#SmilesDrawer.Graph+getSubgraphAdjacencyList) ⇒ <code>array</code>
            * [.getLargestCycleInSubgraph(startVertexId, vertexIds)](#SmilesDrawer.Graph+getLargestCycleInSubgraph)
            * [.getBridges()](#SmilesDrawer.Graph+getBridges) ⇒ <code>array</code>
            * [._bridgeDfs()](#SmilesDrawer.Graph+_bridgeDfs)
        * _static_
            * [.getConnectedComponentCount(adjacencyMatrix)](#SmilesDrawer.Graph.getConnectedComponentCount) ⇒ <code>Number</code>
            * [._ccCountDfs()](#SmilesDrawer.Graph._ccCountDfs)
    * [.Hanser](#SmilesDrawer.Hanser)
    * [.Line](#SmilesDrawer.Line)
        * [new SmilesDrawer.Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])](#new_SmilesDrawer.Line_new)
        * [.clone()](#SmilesDrawer.Line+clone) ⇒ <code>Line</code>
        * [.getLength()](#SmilesDrawer.Line+getLength) ⇒ <code>number</code>
        * [.getAngle()](#SmilesDrawer.Line+getAngle) ⇒ <code>number</code>
        * [.getRightVector()](#SmilesDrawer.Line+getRightVector) ⇒ <code>Vector2</code>
        * [.getLeftVector()](#SmilesDrawer.Line+getLeftVector) ⇒ <code>Vector2</code>
        * [.getRightElement()](#SmilesDrawer.Line+getRightElement) ⇒ <code>string</code>
        * [.getLeftElement()](#SmilesDrawer.Line+getLeftElement) ⇒ <code>string</code>
        * [.getRightChiral()](#SmilesDrawer.Line+getRightChiral) ⇒ <code>boolean</code>
        * [.getLeftChiral()](#SmilesDrawer.Line+getLeftChiral) ⇒ <code>boolean</code>
        * [.setRightVector(x, y)](#SmilesDrawer.Line+setRightVector) ⇒ <code>Line</code>
        * [.setLeftVector(x, y)](#SmilesDrawer.Line+setLeftVector) ⇒ <code>Line</code>
        * [.rotateToXAxis()](#SmilesDrawer.Line+rotateToXAxis) ⇒ <code>Line</code>
        * [.rotate(theta)](#SmilesDrawer.Line+rotate) ⇒ <code>Line</code>
        * [.shortenFrom(by)](#SmilesDrawer.Line+shortenFrom) ⇒ <code>Line</code>
        * [.shortenTo(by)](#SmilesDrawer.Line+shortenTo) ⇒ <code>Line</code>
        * [.shortenRight(by)](#SmilesDrawer.Line+shortenRight) ⇒ <code>Line</code>
        * [.shortenLeft(by)](#SmilesDrawer.Line+shortenLeft) ⇒ <code>Line</code>
        * [.shorten(by)](#SmilesDrawer.Line+shorten) ⇒ <code>Line</code>
        * [.getNormals()](#SmilesDrawer.Line+getNormals) ⇒ <code>array</code>
    * [.MathHelper](#SmilesDrawer.MathHelper)
        * [.round(value, decimals)](#SmilesDrawer.MathHelper.round) ⇒ <code>number</code>
        * [.meanAngle(arr)](#SmilesDrawer.MathHelper.meanAngle) ⇒ <code>number</code>
        * [.innerAngle(n)](#SmilesDrawer.MathHelper.innerAngle) ⇒ <code>number</code>
        * [.polyCircumradius(s, n)](#SmilesDrawer.MathHelper.polyCircumradius) ⇒ <code>number</code>
        * [.apothem(r, n)](#SmilesDrawer.MathHelper.apothem) ⇒ <code>number</code>
        * [.centralAngle(n)](#SmilesDrawer.MathHelper.centralAngle) ⇒ <code>number</code>
        * [.toDeg(rad)](#SmilesDrawer.MathHelper.toDeg) ⇒ <code>number</code>
        * [.toRad(deg)](#SmilesDrawer.MathHelper.toRad) ⇒ <code>number</code>
    * [.Ring](#SmilesDrawer.Ring)
        * [new SmilesDrawer.Ring(members)](#new_SmilesDrawer.Ring_new)
        * _instance_
            * [.clone()](#SmilesDrawer.Ring+clone) ⇒ <code>Ring</code>
            * [.allowsFlip()](#SmilesDrawer.Ring+allowsFlip) ⇒ <code>boolean</code>
            * [.setFlipped()](#SmilesDrawer.Ring+setFlipped)
            * [.getSize()](#SmilesDrawer.Ring+getSize) ⇒ <code>number</code>
            * [.getPolygon(vertices)](#SmilesDrawer.Ring+getPolygon) ⇒ <code>array</code>
            * [.getAngle()](#SmilesDrawer.Ring+getAngle) ⇒ <code>number</code>
            * [.eachMember(vertices, callback, startVertexId, previousVertexId)](#SmilesDrawer.Ring+eachMember)
            * [.getOrderedNeighbours(ringConnections)](#SmilesDrawer.Ring+getOrderedNeighbours) ⇒ <code>array</code>
            * [.isBenzeneLike(vertices)](#SmilesDrawer.Ring+isBenzeneLike) ⇒ <code>boolean</code>
            * [.getDoubleBondCount(vertices)](#SmilesDrawer.Ring+getDoubleBondCount) ⇒ <code>number</code>
            * [.contains(vertexId)](#SmilesDrawer.Ring+contains) ⇒ <code>boolean</code>
            * [.thisOrNeighboursContain(rings, vertexId)](#SmilesDrawer.Ring+thisOrNeighboursContain) ⇒ <code>boolean</code>
        * _static_
            * [.getRing(rings, id)](#SmilesDrawer.Ring.getRing) ⇒ <code>Ring</code>
    * [.RingConnection](#SmilesDrawer.RingConnection)
        * [new SmilesDrawer.RingConnection(firstRing, secondRing)](#new_SmilesDrawer.RingConnection_new)
        * _instance_
            * [.addVertex(vertexId)](#SmilesDrawer.RingConnection+addVertex)
            * [.isBridge()](#SmilesDrawer.RingConnection+isBridge) ⇒ <code>boolean</code>
            * [.updateOther(ringId, otherRingId)](#SmilesDrawer.RingConnection+updateOther)
        * _static_
            * [.isBridge(ringConnections, vertices, firstRingId, secondRingId)](#SmilesDrawer.RingConnection.isBridge) ⇒ <code>boolean</code>
            * [.getNeighbours(ringConnections, ringId)](#SmilesDrawer.RingConnection.getNeighbours) ⇒ <code>array</code>
            * [.getVertices(ringConnections, firstRingId, secondRingId)](#SmilesDrawer.RingConnection.getVertices) ⇒ <code>array</code>
    * [.SSSR](#SmilesDrawer.SSSR)
        * [.getRings(adjacencyMatrix)](#SmilesDrawer.SSSR.getRings) ⇒ <code>array</code>
        * [.matrixToString(matrix)](#SmilesDrawer.SSSR.matrixToString) ⇒ <code>string</code>
        * [.getPathIncludedDistanceMatrices(adjacencyMatrix)](#SmilesDrawer.SSSR.getPathIncludedDistanceMatrices) ⇒ <code>object</code>
        * [.getRingCandidates(d, pe1, pe2)](#SmilesDrawer.SSSR.getRingCandidates) ⇒ <code>array</code>
        * [.getSSSR(c, d, pe1, pe2, nsssr)](#SmilesDrawer.SSSR.getSSSR) ⇒ <code>array</code>
        * [.getEdgeCount(adjacencyMatrix)](#SmilesDrawer.SSSR.getEdgeCount) ⇒ <code>number</code>
        * [.getEdgeList(adjacencyMatrix)](#SmilesDrawer.SSSR.getEdgeList) ⇒ <code>array</code>
        * [.bondsToAtoms(bonds)](#SmilesDrawer.SSSR.bondsToAtoms) ⇒ <code>set</code>
        * [.pathSetsContain(pathSets, pathSet)](#SmilesDrawer.SSSR.pathSetsContain) ⇒ <code>boolean</code>
        * [.areSetsEqual(setA, setB)](#SmilesDrawer.SSSR.areSetsEqual) ⇒ <code>boolean</code>
        * [.isSupersetOf(setA, setB)](#SmilesDrawer.SSSR.isSupersetOf) ⇒ <code>boolean</code>
    * [.Vector2](#SmilesDrawer.Vector2)
        * [new SmilesDrawer.Vector2(x, y)](#new_SmilesDrawer.Vector2_new)
        * _instance_
            * [.clone()](#SmilesDrawer.Vector2+clone) ⇒ <code>Vector2</code>
            * [.toString()](#SmilesDrawer.Vector2+toString) ⇒ <code>string</code>
            * [.add(vec)](#SmilesDrawer.Vector2+add) ⇒ <code>Vector2</code>
            * [.subtract(vec)](#SmilesDrawer.Vector2+subtract) ⇒ <code>Vector2</code>
            * [.divide(scalar)](#SmilesDrawer.Vector2+divide) ⇒ <code>Vector2</code>
            * [.multiply(v)](#SmilesDrawer.Vector2+multiply) ⇒ <code>Vector2</code>
            * [.multiplyScalar(scalar)](#SmilesDrawer.Vector2+multiplyScalar) ⇒ <code>Vector2</code>
            * [.invert()](#SmilesDrawer.Vector2+invert) ⇒ <code>Vector2</code>
            * [.angle()](#SmilesDrawer.Vector2+angle) ⇒ <code>number</code>
            * [.distance(vec)](#SmilesDrawer.Vector2+distance) ⇒ <code>number</code>
            * [.distanceSq(vec)](#SmilesDrawer.Vector2+distanceSq) ⇒ <code>number</code>
            * [.clockwise(vec)](#SmilesDrawer.Vector2+clockwise) ⇒ <code>number</code>
            * [.rotate(angle)](#SmilesDrawer.Vector2+rotate) ⇒ <code>Vector2</code>
            * [.rotateAround(angle, vec)](#SmilesDrawer.Vector2+rotateAround) ⇒ <code>Vector2</code>
            * [.rotateTo(vec, center, [offsetAngle])](#SmilesDrawer.Vector2+rotateTo) ⇒ <code>Vector2</code>
            * [.rotateAwayFrom(vec, center, angle)](#SmilesDrawer.Vector2+rotateAwayFrom)
            * [.getRotateAwayFromAngle(vec, center, angle)](#SmilesDrawer.Vector2+getRotateAwayFromAngle) ⇒ <code>number</code>
            * [.getRotateTowardsAngle(vec, center, angle)](#SmilesDrawer.Vector2+getRotateTowardsAngle) ⇒ <code>number</code>
            * [.getRotateToAngle(vec, center)](#SmilesDrawer.Vector2+getRotateToAngle) ⇒ <code>number</code>
            * [.isInPolygon(polygon)](#SmilesDrawer.Vector2+isInPolygon) ⇒ <code>boolean</code>
            * [.length()](#SmilesDrawer.Vector2+length) ⇒ <code>number</code>
            * [.normalize()](#SmilesDrawer.Vector2+normalize) ⇒ <code>Vector2</code>
            * [.normalized()](#SmilesDrawer.Vector2+normalized) ⇒ <code>Vector2</code>
            * [.whichSide(vecA, vecB)](#SmilesDrawer.Vector2+whichSide) ⇒ <code>number</code>
            * [.sameSideAs(vecA, vecB, vecC)](#SmilesDrawer.Vector2+sameSideAs) ⇒ <code>boolean</code>
        * _static_
            * [.add(vecA, vecB)](#SmilesDrawer.Vector2.add) ⇒ <code>Vector2</code>
            * [.subtract(vecA, vecB)](#SmilesDrawer.Vector2.subtract) ⇒ <code>Vector2</code>
            * [.multiply(vecA, vecB)](#SmilesDrawer.Vector2.multiply) ⇒ <code>Vector2</code>
            * [.multiplyScalar(vec, scalar)](#SmilesDrawer.Vector2.multiplyScalar) ⇒ <code>Vector2</code>
            * [.midpoint(vecA, vecB)](#SmilesDrawer.Vector2.midpoint) ⇒ <code>Vector2</code>
            * [.normals(vecA, vecB)](#SmilesDrawer.Vector2.normals) ⇒ <code>array</code>
            * [.units(vecA, vecB)](#SmilesDrawer.Vector2.units) ⇒ <code>array</code>
            * [.divide(vecA, vecB)](#SmilesDrawer.Vector2.divide) ⇒ <code>Vector2</code>
            * [.dot(vecA, vecB)](#SmilesDrawer.Vector2.dot) ⇒ <code>number</code>
            * [.angle(vecA, vecB)](#SmilesDrawer.Vector2.angle) ⇒ <code>number</code>
            * [.threePointangle(vecA, vecB, vecC)](#SmilesDrawer.Vector2.threePointangle) ⇒ <code>number</code>
            * [.scalarProjection(vecA, vecB)](#SmilesDrawer.Vector2.scalarProjection) ⇒ <code>number</code>
    * [.Vertex](#SmilesDrawer.Vertex)
        * [new SmilesDrawer.Vertex(value, [x], [y])](#new_SmilesDrawer.Vertex_new)
        * [.setPosition(x, y)](#SmilesDrawer.Vertex+setPosition)
        * [.setPositionFromVector(v)](#SmilesDrawer.Vertex+setPositionFromVector)
        * [.addChild(vertexID)](#SmilesDrawer.Vertex+addChild)
        * [.setParentVertexId(parentVertexId)](#SmilesDrawer.Vertex+setParentVertexId)
        * [.isTerminal()](#SmilesDrawer.Vertex+isTerminal) ⇒ <code>boolean</code>
        * [.clone()](#SmilesDrawer.Vertex+clone) ⇒ <code>Vertex</code>
        * [.equals(vertex)](#SmilesDrawer.Vertex+equals) ⇒ <code>boolean</code>
        * [.getAngle([referenceVector], [returnAsDegrees])](#SmilesDrawer.Vertex+getAngle) ⇒ <code>number</code>
        * [.getTextDirection(vertices)](#SmilesDrawer.Vertex+getTextDirection) ⇒ <code>string</code>
        * [.getNeighbours([vertexId])](#SmilesDrawer.Vertex+getNeighbours) ⇒ <code>array</code>
        * [.getDrawnNeighbours(vertices)](#SmilesDrawer.Vertex+getDrawnNeighbours) ⇒ <code>array</code>
        * [.getNeighbourCount()](#SmilesDrawer.Vertex+getNeighbourCount) ⇒ <code>number</code>
        * [.getCommonNeighbours(vertex)](#SmilesDrawer.Vertex+getCommonNeighbours) ⇒ <code>array</code>
        * [.isNeighbour(vertexId)](#SmilesDrawer.Vertex+isNeighbour) ⇒ <code>boolean</code>
        * [.getSpanningTreeNeighbours([vertexId])](#SmilesDrawer.Vertex+getSpanningTreeNeighbours) ⇒ <code>array</code>
        * [.getNextInRing(vertices, ringId, previousVertexId)](#SmilesDrawer.Vertex+getNextInRing) ⇒ <code>number</code>
    * [.clean(smiles)](#SmilesDrawer.clean) ⇒ <code>string</code>
    * [.apply(options, [themeName])](#SmilesDrawer.apply)
    * [.parse(smiles, successCallback, errorCallback)](#SmilesDrawer.parse)

<a name="SmilesDrawer.ArrayHelper"></a>

### SmilesDrawer.ArrayHelper
A static class containing helper functions for array-related tasks.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.ArrayHelper](#SmilesDrawer.ArrayHelper)
    * [.clone(arr)](#SmilesDrawer.ArrayHelper.clone) ⇒ <code>array</code> &#124; <code>object</code>
    * [.print(arr)](#SmilesDrawer.ArrayHelper.print) ⇒ <code>string</code>
    * [.each(arr, callback)](#SmilesDrawer.ArrayHelper.each)
    * [.get(arr, property, value)](#SmilesDrawer.ArrayHelper.get) ⇒ <code>\*</code>
    * [.contains(arr, options)](#SmilesDrawer.ArrayHelper.contains) ⇒ <code>boolean</code>
    * [.intersection(arrA, arrB)](#SmilesDrawer.ArrayHelper.intersection) ⇒ <code>array</code>
    * [.unique(arr)](#SmilesDrawer.ArrayHelper.unique) ⇒ <code>array</code>
    * [.count(arr, value)](#SmilesDrawer.ArrayHelper.count) ⇒ <code>number</code>
    * [.toggle(arr, value)](#SmilesDrawer.ArrayHelper.toggle) ⇒ <code>array</code>
    * [.remove(arr, value)](#SmilesDrawer.ArrayHelper.remove) ⇒ <code>array</code>
    * [.removeUnique(arr, value)](#SmilesDrawer.ArrayHelper.removeUnique) ⇒ <code>array</code>
    * [.removeAll(arrA, arrB)](#SmilesDrawer.ArrayHelper.removeAll) ⇒ <code>array</code>
    * [.merge(arrA, arrB)](#SmilesDrawer.ArrayHelper.merge) ⇒ <code>array</code>
    * [.containsAll(arrA, arrB)](#SmilesDrawer.ArrayHelper.containsAll) ⇒ <code>boolean</code>
    * [.sortByAtomicNumberDesc(arr)](#SmilesDrawer.ArrayHelper.sortByAtomicNumberDesc) ⇒ <code>array</code>
    * [.deepCopy(arr)](#SmilesDrawer.ArrayHelper.deepCopy) ⇒ <code>array</code>

<a name="SmilesDrawer.ArrayHelper.clone"></a>

#### ArrayHelper.clone(arr) ⇒ <code>array</code> &#124; <code>object</code>
Clone an array or an object. If an object is passed, a shallow clone will be created.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> &#124; <code>object</code> - A clone of the array or object.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> &#124; <code>object</code> | The array or object to be cloned. |

<a name="SmilesDrawer.ArrayHelper.print"></a>

#### ArrayHelper.print(arr) ⇒ <code>string</code>
Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>string</code> - A string representation of the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.each"></a>

#### ArrayHelper.each(arr, callback)
Run a function for each element in the array. The element is supplied as an argument for the callback function

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| callback | <code>function</code> | The callback function that is called for each element. |

<a name="SmilesDrawer.ArrayHelper.get"></a>

#### ArrayHelper.get(arr, property, value) ⇒ <code>\*</code>
Return the array element from an array containing objects, where a property of the object is set to a given value.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>\*</code> - The array element matching the value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| property | <code>string</code> &#124; <code>number</code> | A property contained within an object in the array. |
| value | <code>string</code> &#124; <code>number</code> | The value of the property. |

<a name="SmilesDrawer.ArrayHelper.contains"></a>

#### ArrayHelper.contains(arr, options) ⇒ <code>boolean</code>
Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>boolean</code> - A boolean whether or not the array contains a value.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| options | <code>object</code> | See method description. |

<a name="SmilesDrawer.ArrayHelper.intersection"></a>

#### ArrayHelper.intersection(arrA, arrB) ⇒ <code>array</code>
Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - The intersecting vlaues.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>array</code> | An array. |
| arrB | <code>array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.unique"></a>

#### ArrayHelper.unique(arr) ⇒ <code>array</code>
Returns an array of unique elements contained in an array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - An array of unique elements contained within the array supplied as an argument.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.count"></a>

#### ArrayHelper.count(arr, value) ⇒ <code>number</code>
Count the number of occurences of a value in an array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>number</code> - The number of occurences of a value in the array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| value | <code>\*</code> | A value to be counted. |

<a name="SmilesDrawer.ArrayHelper.toggle"></a>

#### ArrayHelper.toggle(arr, value) ⇒ <code>array</code>
Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - The toggled array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| value | <code>\*</code> | A value to be toggled. |

<a name="SmilesDrawer.ArrayHelper.remove"></a>

#### ArrayHelper.remove(arr, value) ⇒ <code>array</code>
Remove a value from an array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - A new array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="SmilesDrawer.ArrayHelper.removeUnique"></a>

#### ArrayHelper.removeUnique(arr, value) ⇒ <code>array</code>
Remove a value from an array with unique values.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - An array with the element with a given value removed.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |
| value | <code>\*</code> | A value to be removed. |

<a name="SmilesDrawer.ArrayHelper.removeAll"></a>

#### ArrayHelper.removeAll(arrA, arrB) ⇒ <code>array</code>
Remove all elements contained in one array from another array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - The filtered array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>array</code> | The array to be filtered. |
| arrB | <code>array</code> | The array containing elements that will be removed from the other array. |

<a name="SmilesDrawer.ArrayHelper.merge"></a>

#### ArrayHelper.merge(arrA, arrB) ⇒ <code>array</code>
Merges two arrays and returns the result. The second array will be appended to the second array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - The merged array.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>array</code> | An array. |
| arrB | <code>array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.containsAll"></a>

#### ArrayHelper.containsAll(arrA, arrB) ⇒ <code>boolean</code>
Checks whether or not an array contains all the elements of another array, without regard to the order.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not both array contain the same elements.  

| Param | Type | Description |
| --- | --- | --- |
| arrA | <code>array</code> | An array. |
| arrB | <code>array</code> | An array. |

<a name="SmilesDrawer.ArrayHelper.sortByAtomicNumberDesc"></a>

#### ArrayHelper.sortByAtomicNumberDesc(arr) ⇒ <code>array</code>
Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - The sorted array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array of objects { atomicNumber: 6, vertexId: 2 }. |

<a name="SmilesDrawer.ArrayHelper.deepCopy"></a>

#### ArrayHelper.deepCopy(arr) ⇒ <code>array</code>
Copies a an n-dimensional array.

**Kind**: static method of <code>[ArrayHelper](#SmilesDrawer.ArrayHelper)</code>  
**Returns**: <code>array</code> - The copy.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | The array to be copied. |

<a name="SmilesDrawer.Atom"></a>

### SmilesDrawer.Atom
A class representing an atom

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.Atom](#SmilesDrawer.Atom)
    * [new SmilesDrawer.Atom(element, [bondType])](#new_SmilesDrawer.Atom_new)
    * _instance_
        * [.addNeighbouringElement(element)](#SmilesDrawer.Atom+addNeighbouringElement)
        * [.attachPseudoElement(element, previousElement, [hydrogenCount])](#SmilesDrawer.Atom+attachPseudoElement)
        * [.getAttachedPseudoElements()](#SmilesDrawer.Atom+getAttachedPseudoElements) ⇒ <code>object</code>
        * [.getAttachedPseudoElementsCount()](#SmilesDrawer.Atom+getAttachedPseudoElementsCount) ⇒ <code>number</code>
        * [.addAnchoredRing(ringId)](#SmilesDrawer.Atom+addAnchoredRing)
        * [.getRingbondCount()](#SmilesDrawer.Atom+getRingbondCount) ⇒ <code>number</code>
        * [.canRotate()](#SmilesDrawer.Atom+canRotate) ⇒ <code>boolean</code>
        * [.hasRingbonds()](#SmilesDrawer.Atom+hasRingbonds) ⇒ <code>boolean</code>
        * [.getMaxRingbond()](#SmilesDrawer.Atom+getMaxRingbond) ⇒ <code>number</code>
        * [.isInRing()](#SmilesDrawer.Atom+isInRing) ⇒ <code>boolean</code>
        * [.hasRing(ringId)](#SmilesDrawer.Atom+hasRing) ⇒ <code>boolean</code>
        * [.backupRings()](#SmilesDrawer.Atom+backupRings)
        * [.restoreRings()](#SmilesDrawer.Atom+restoreRings)
        * [.haveCommonRingbond(atomA, atomB)](#SmilesDrawer.Atom+haveCommonRingbond) ⇒ <code>boolean</code>
        * [.maxCommonRingbond(atomA, atomB)](#SmilesDrawer.Atom+maxCommonRingbond) ⇒ <code>number</code>
        * [.getOrder(center)](#SmilesDrawer.Atom+getOrder) ⇒ <code>number</code>
        * [.setOrder(The, The)](#SmilesDrawer.Atom+setOrder)
        * [.neighbouringElementsEqual(arr)](#SmilesDrawer.Atom+neighbouringElementsEqual) ⇒ <code>boolean</code>
        * [.getAtomicNumber()](#SmilesDrawer.Atom+getAtomicNumber) ⇒ <code>number</code>
    * _static_
        * [.sortByAtomicNumber(root, neighbours, vertices, rings)](#SmilesDrawer.Atom.sortByAtomicNumber) ⇒ <code>array</code>
        * [.hasDuplicateAtomicNumbers(sortedAtomicNumbers)](#SmilesDrawer.Atom.hasDuplicateAtomicNumbers) ⇒ <code>boolean</code>
        * [.getDuplicateAtomicNumbers(sortedAtomicNumbers)](#SmilesDrawer.Atom.getDuplicateAtomicNumbers) ⇒ <code>array</code>

<a name="new_SmilesDrawer.Atom_new"></a>

#### new SmilesDrawer.Atom(element, [bondType])
The constructor of the class Atom.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>string</code> |  | The one-letter code of the element. |
| [bondType] | <code>string</code> | <code>&quot;&#x27;-&#x27;&quot;</code> | The type of the bond associated with this atom. |

<a name="SmilesDrawer.Atom+addNeighbouringElement"></a>

#### atom.addNeighbouringElement(element)
Adds a neighbouring element to this atom.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>string</code> | A string representing an element. |

<a name="SmilesDrawer.Atom+attachPseudoElement"></a>

#### atom.attachPseudoElement(element, previousElement, [hydrogenCount])
Attaches a pseudo element (e.g. Ac) to the atom.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>string</code> |  | The element identifier (e.g. Br, C, ...). |
| previousElement | <code>string</code> |  | The element that is part of the main chain (not the terminals that are converted to the pseudo element or concatinated). |
| [hydrogenCount] | <code>number</code> | <code>0</code> | The number of hydrogens for the element. |

<a name="SmilesDrawer.Atom+getAttachedPseudoElements"></a>

#### atom.getAttachedPseudoElements() ⇒ <code>object</code>
Returns the attached pseudo elements sorted by hydrogen count (ascending).

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>object</code> - The sorted attached pseudo elements.  
<a name="SmilesDrawer.Atom+getAttachedPseudoElementsCount"></a>

#### atom.getAttachedPseudoElementsCount() ⇒ <code>number</code>
Returns the number of attached pseudo elements.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>number</code> - The number of attached pseudo elements.  
<a name="SmilesDrawer.Atom+addAnchoredRing"></a>

#### atom.addAnchoredRing(ringId)
Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.Atom+getRingbondCount"></a>

#### atom.getRingbondCount() ⇒ <code>number</code>
Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>number</code> - The number of ringbonds this atom is connected to.  
<a name="SmilesDrawer.Atom+canRotate"></a>

#### atom.canRotate() ⇒ <code>boolean</code>
Check whether or not this atom is rotatable. The atom is deemed rotatable if it is neither a member of a ring nor participating in a bond other than a single bond. TODO: Check the chemistry.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is rotatable.  
<a name="SmilesDrawer.Atom+hasRingbonds"></a>

#### atom.hasRingbonds() ⇒ <code>boolean</code>
Returns whether or not this atom participates in ringbonds (breaks in the ring in the MST).

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is associated with a ringbond.  
<a name="SmilesDrawer.Atom+getMaxRingbond"></a>

#### atom.getMaxRingbond() ⇒ <code>number</code>
Returns the id of the ringbond with the highest id.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>number</code> - The highest ringbond id associated with this atom.  
<a name="SmilesDrawer.Atom+isInRing"></a>

#### atom.isInRing() ⇒ <code>boolean</code>
Checks whether or not this atom is part of a ring.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is part of a ring.  
<a name="SmilesDrawer.Atom+hasRing"></a>

#### atom.hasRing(ringId) ⇒ <code>boolean</code>
Checks whether or not this atom is a member of a given ring.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this atom is a member of a given ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.Atom+backupRings"></a>

#### atom.backupRings()
Backs up the current rings.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
<a name="SmilesDrawer.Atom+restoreRings"></a>

#### atom.restoreRings()
Restores the most recent backed up rings.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
<a name="SmilesDrawer.Atom+haveCommonRingbond"></a>

#### atom.haveCommonRingbond(atomA, atomB) ⇒ <code>boolean</code>
Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not two atoms share a common ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| atomA | <code>Atom</code> | An atom. |
| atomB | <code>Atom</code> | An atom. |

<a name="SmilesDrawer.Atom+maxCommonRingbond"></a>

#### atom.maxCommonRingbond(atomA, atomB) ⇒ <code>number</code>
Get the highest numbered ringbond shared by two atoms. A ringbond is a break in a ring created when generating the spanning tree of a structure.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>number</code> - The number of the maximum ringbond shared by two atoms.  

| Param | Type | Description |
| --- | --- | --- |
| atomA | <code>Atom</code> | An atom. |
| atomB | <code>Atom</code> | An atom. |

<a name="SmilesDrawer.Atom+getOrder"></a>

#### atom.getOrder(center) ⇒ <code>number</code>
Returns the order of this atom given a central atom.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>number</code> - The order of this atom in respect to the center atom.  

| Param | Type | Description |
| --- | --- | --- |
| center | <code>number</code> | The id of the central atom in respect to which the order is defined. |

<a name="SmilesDrawer.Atom+setOrder"></a>

#### atom.setOrder(The, The)
Sets the order of this atom given a center. This is required since two atoms can have an order in respect to two different centers when connected by ringbonds.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | id of the central atom in respect to which the order is defined. |
| The | <code>number</code> | order of this atom. |

<a name="SmilesDrawer.Atom+neighbouringElementsEqual"></a>

#### atom.neighbouringElementsEqual(arr) ⇒ <code>boolean</code>
Check whether or not the neighbouring elements of this atom equal the supplied array.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the neighbours match the supplied array of elements.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array containing all the elements that are neighbouring this atom. E.g. ['C', 'O', 'O', 'N'] |

<a name="SmilesDrawer.Atom+getAtomicNumber"></a>

#### atom.getAtomicNumber() ⇒ <code>number</code>
Get the atomic number of this atom.

**Kind**: instance method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>number</code> - The atomic number of this atom.  
<a name="SmilesDrawer.Atom.sortByAtomicNumber"></a>

#### Atom.sortByAtomicNumber(root, neighbours, vertices, rings) ⇒ <code>array</code>
Sorts an array of vertices by their respecitve atomic number.

**Kind**: static method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>array</code> - The array sorted by atomic number.  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Vertex</code> | The central vertex |
| neighbours | <code>array</code> | An array of vertex ids. |
| vertices | <code>array</code> | An array containing the vertices associated with the current molecule. |
| rings | <code>array</code> | An array containing the rings associated with the current molecule. |

<a name="SmilesDrawer.Atom.hasDuplicateAtomicNumbers"></a>

#### Atom.hasDuplicateAtomicNumbers(sortedAtomicNumbers) ⇒ <code>boolean</code>
Checks wheter or not two atoms have the same atomic number

**Kind**: static method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not there are duplicate atomic numbers.  

| Param | Type | Description |
| --- | --- | --- |
| sortedAtomicNumbers | <code>array</code> | An array of objects { atomicNumber: 6, vertexId: 2 }. |

<a name="SmilesDrawer.Atom.getDuplicateAtomicNumbers"></a>

#### Atom.getDuplicateAtomicNumbers(sortedAtomicNumbers) ⇒ <code>array</code>
Returns sets of duplicate atomic numbers.

**Kind**: static method of <code>[Atom](#SmilesDrawer.Atom)</code>  
**Returns**: <code>array</code> - An array of arrays containing the indices of duplicate atomic numbers.  

| Param | Type | Description |
| --- | --- | --- |
| sortedAtomicNumbers | <code>array</code> | An array of objects { atomicNumber: 6, vertexId: 2 }. |

<a name="SmilesDrawer.CanvasWrapper"></a>

### SmilesDrawer.CanvasWrapper
A class wrapping a canvas element

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.CanvasWrapper](#SmilesDrawer.CanvasWrapper)
    * [new SmilesDrawer.CanvasWrapper(target, theme, options)](#new_SmilesDrawer.CanvasWrapper_new)
    * [.updateSize(width, height)](#SmilesDrawer.CanvasWrapper+updateSize)
    * [.setTheme(theme)](#SmilesDrawer.CanvasWrapper+setTheme)
    * [.scale(vertices)](#SmilesDrawer.CanvasWrapper+scale)
    * [.reset()](#SmilesDrawer.CanvasWrapper+reset)
    * [.getColor(key)](#SmilesDrawer.CanvasWrapper+getColor) ⇒ <code>string</code>
    * [.drawCircle(x, y, radius, color, [fill], [debug], [debugText])](#SmilesDrawer.CanvasWrapper+drawCircle)
    * [.drawLine(line)](#SmilesDrawer.CanvasWrapper+drawLine)
    * [.drawWedge(line, width)](#SmilesDrawer.CanvasWrapper+drawWedge)
    * [.drawDashedWedge(line, width)](#SmilesDrawer.CanvasWrapper+drawDashedWedge)
    * [.drawDebugText(x, y, text)](#SmilesDrawer.CanvasWrapper+drawDebugText)
    * [.drawBall(x, y, elementName, hydrogens)](#SmilesDrawer.CanvasWrapper+drawBall)
    * [.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, [pseudoElements])](#SmilesDrawer.CanvasWrapper+drawText)
    * [.drawDebugPoint(x, y, [debugText], [color])](#SmilesDrawer.CanvasWrapper+drawDebugPoint)
    * [.drawAromaticityRing(ring)](#SmilesDrawer.CanvasWrapper+drawAromaticityRing)
    * [.clear()](#SmilesDrawer.CanvasWrapper+clear)

<a name="new_SmilesDrawer.CanvasWrapper_new"></a>

#### new SmilesDrawer.CanvasWrapper(target, theme, options)
The constructor for the class CanvasWrapper.


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> &#124; <code>HTMLElement</code> | The canvas id or the canvas HTMLElement. |
| theme | <code>object</code> | A theme from the smiles drawer options. |
| options | <code>any</code> | The smiles drawer options object. |

<a name="SmilesDrawer.CanvasWrapper+updateSize"></a>

#### canvasWrapper.updateSize(width, height)
Update the width and height of the canvas

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type |
| --- | --- |
| width | <code>number</code> | 
| height | <code>number</code> | 

<a name="SmilesDrawer.CanvasWrapper+setTheme"></a>

#### canvasWrapper.setTheme(theme)
Sets a provided theme.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>object</code> | A theme from the smiles drawer options. |

<a name="SmilesDrawer.CanvasWrapper+scale"></a>

#### canvasWrapper.scale(vertices)
Scale the canvas based on vertex positions.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices containing the vertices associated with the current molecule. |

<a name="SmilesDrawer.CanvasWrapper+reset"></a>

#### canvasWrapper.reset()
Resets the transform of the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  
<a name="SmilesDrawer.CanvasWrapper+getColor"></a>

#### canvasWrapper.getColor(key) ⇒ <code>string</code>
Returns the hex code of a color associated with a key from the current theme.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  
**Returns**: <code>string</code> - A color hex value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The color key in the theme (e.g. C, N, BACKGROUND, ...). |

<a name="SmilesDrawer.CanvasWrapper+drawCircle"></a>

#### canvasWrapper.drawCircle(x, y, radius, color, [fill], [debug], [debugText])
Draws a circle to a canvas context.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | The x coordinate of the circles center. |
| y | <code>number</code> |  | The y coordinate of the circles center. |
| radius | <code>number</code> |  | The radius of the circle |
| color | <code>string</code> |  | A hex encoded color. |
| [fill] | <code>boolean</code> | <code>true</code> | Whether to fill or stroke the circle. |
| [debug] | <code>boolean</code> | <code>false</code> | Draw in debug mode. |
| [debugText] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | A debug message. |

<a name="SmilesDrawer.CanvasWrapper+drawLine"></a>

#### canvasWrapper.drawLine(line)
Draw a line to a canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>Line</code> | A line. |

<a name="SmilesDrawer.CanvasWrapper+drawWedge"></a>

#### canvasWrapper.drawWedge(line, width)
Draw a wedge on the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>Line</code> |  | A line. |
| width | <code>number</code> | <code>3</code> | The wedge width. |

<a name="SmilesDrawer.CanvasWrapper+drawDashedWedge"></a>

#### canvasWrapper.drawDashedWedge(line, width)
Draw a dashed wedge on the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>Line</code> |  | A line. |
| width | <code>number</code> | <code>6</code> | The wedge width. |

<a name="SmilesDrawer.CanvasWrapper+drawDebugText"></a>

#### canvasWrapper.drawDebugText(x, y, text)
Draws a debug text message at a given position

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x coordinate. |
| y | <code>number</code> | The y coordinate. |
| text | <code>string</code> | The debug text. |

<a name="SmilesDrawer.CanvasWrapper+drawBall"></a>

#### canvasWrapper.drawBall(x, y, elementName, hydrogens)
Draw a ball to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x position of the text. |
| y | <code>number</code> | The y position of the text. |
| elementName | <code>string</code> | The name of the element (single-letter). |
| hydrogens | <code>number</code> | The number of hydrogen atoms. |

<a name="SmilesDrawer.CanvasWrapper+drawText"></a>

#### canvasWrapper.drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope, [pseudoElements])
Draw a text to the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

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

<a name="SmilesDrawer.CanvasWrapper+drawDebugPoint"></a>

#### canvasWrapper.drawDebugPoint(x, y, [debugText], [color])
Draws a dubug dot at a given coordinate and adds text.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | The x coordinate. |
| y | <code>number</code> |  | The y coordindate. |
| [debugText] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | A string. |
| [color] | <code>string</code> | <code>&quot;&#x27;#f00&#x27;&quot;</code> | A color in hex form. |

<a name="SmilesDrawer.CanvasWrapper+drawAromaticityRing"></a>

#### canvasWrapper.drawAromaticityRing(ring)
Draws a ring inside a provided ring, indicating aromaticity.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A ring. |

<a name="SmilesDrawer.CanvasWrapper+clear"></a>

#### canvasWrapper.clear()
Clear the canvas.

**Kind**: instance method of <code>[CanvasWrapper](#SmilesDrawer.CanvasWrapper)</code>  
<a name="SmilesDrawer.Drawer"></a>

### SmilesDrawer.Drawer
The main class of the application representing the smiles drawer

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.Drawer](#SmilesDrawer.Drawer)
    * [new SmilesDrawer.Drawer(options)](#new_SmilesDrawer.Drawer_new)
    * [.extend()](#SmilesDrawer.Drawer+extend)
    * [.draw(data, target, themeName, infoOnly)](#SmilesDrawer.Drawer+draw)
    * [.edgeRingCount(edgeId)](#SmilesDrawer.Drawer+edgeRingCount) ⇒ <code>number</code>
    * [.getBridgedRings()](#SmilesDrawer.Drawer+getBridgedRings) ⇒ <code>array</code>
    * [.getFusedRings()](#SmilesDrawer.Drawer+getFusedRings) ⇒ <code>array</code>
    * [.getSpiros()](#SmilesDrawer.Drawer+getSpiros) ⇒ <code>array</code>
    * [.printRingInfo()](#SmilesDrawer.Drawer+printRingInfo) ⇒ <code>string</code>
    * [.getTotalOverlapScore()](#SmilesDrawer.Drawer+getTotalOverlapScore) ⇒ <code>number</code>
    * [.getRingCount()](#SmilesDrawer.Drawer+getRingCount) ⇒ <code>number</code>
    * [.hasBridgedRing()](#SmilesDrawer.Drawer+hasBridgedRing) ⇒ <code>boolean</code>
    * [.getHeavyAtomCount()](#SmilesDrawer.Drawer+getHeavyAtomCount) ⇒ <code>number</code>
    * [.getRingbondType(vertexA, vertexB)](#SmilesDrawer.Drawer+getRingbondType) ⇒ <code>string</code> &#124; <code>null</code>
    * [.initRings()](#SmilesDrawer.Drawer+initRings)
    * [.getBridgedRingRings(ringId)](#SmilesDrawer.Drawer+getBridgedRingRings) ⇒ <code>array</code>
    * [.isPartOfBridgedRing(ringId)](#SmilesDrawer.Drawer+isPartOfBridgedRing) ⇒ <code>boolean</code>
    * [.createBridgedRing(ringIds, sourceVertexId)](#SmilesDrawer.Drawer+createBridgedRing) ⇒ <code>Ring</code>
    * [.areVerticesInSameRing(vertexA, vertexB)](#SmilesDrawer.Drawer+areVerticesInSameRing) ⇒ <code>boolean</code>
    * [.getCommonRings(vertexA, vertexB)](#SmilesDrawer.Drawer+getCommonRings) ⇒ <code>array</code>
    * [.getSmallestCommonRing(vertexA, vertexB)](#SmilesDrawer.Drawer+getSmallestCommonRing) ⇒ <code>Ring</code> &#124; <code>null</code>
    * [.getLargestOrAromaticCommonRing(vertexA, vertexB)](#SmilesDrawer.Drawer+getLargestOrAromaticCommonRing) ⇒ <code>Ring</code> &#124; <code>null</code>
    * [.getVerticesAt(position, radius, excludeVertexId)](#SmilesDrawer.Drawer+getVerticesAt) ⇒ <code>array</code>
    * [.getClosestVertex(vertex)](#SmilesDrawer.Drawer+getClosestVertex) ⇒ <code>Vertex</code>
    * [.getClosestEndpointVertex(vertex)](#SmilesDrawer.Drawer+getClosestEndpointVertex) ⇒ <code>Vertex</code>
    * [.addRing(ring)](#SmilesDrawer.Drawer+addRing) ⇒ <code>number</code>
    * [.removeRing(ringId)](#SmilesDrawer.Drawer+removeRing)
    * [.getRing(ringId)](#SmilesDrawer.Drawer+getRing) ⇒ <code>Ring</code>
    * [.addRingConnection(ringConnection)](#SmilesDrawer.Drawer+addRingConnection) ⇒ <code>number</code>
    * [.removeRingConnection(ringConnectionId)](#SmilesDrawer.Drawer+removeRingConnection)
    * [.removeRingConnectionsBetween(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+removeRingConnectionsBetween)
    * [.getRingConnections(ringId, ringIds)](#SmilesDrawer.Drawer+getRingConnections) ⇒ <code>array</code>
    * [.isRingConnection(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+isRingConnection) ⇒ <code>boolean</code>
    * [.getOverlapScore()](#SmilesDrawer.Drawer+getOverlapScore) ⇒ <code>object</code>
    * [.chooseSide(vertexA, vertexB, sides)](#SmilesDrawer.Drawer+chooseSide) ⇒ <code>object</code>
    * [.areConnected(vertexIdA, vertexIdA)](#SmilesDrawer.Drawer+areConnected) ⇒ <code>boolean</code>
    * [.getEdgeWeight(vertexIdA, vertexIdB)](#SmilesDrawer.Drawer+getEdgeWeight) ⇒ <code>number</code> &#124; <code>null</code>
    * [.forceLayout(vertices, center, startVertexId, ring)](#SmilesDrawer.Drawer+forceLayout)
    * [.getSubringCenter(ring, vertex)](#SmilesDrawer.Drawer+getSubringCenter) ⇒ <code>Vector2</code>
    * [.drawEdges(debug)](#SmilesDrawer.Drawer+drawEdges)
    * [.drawVertices(debug)](#SmilesDrawer.Drawer+drawVertices)
    * [.position()](#SmilesDrawer.Drawer+position)
    * [.clearPositions()](#SmilesDrawer.Drawer+clearPositions)
    * [.restorePositions()](#SmilesDrawer.Drawer+restorePositions)
    * [.backupRingInformation()](#SmilesDrawer.Drawer+backupRingInformation)
    * [.restoreRingInformation()](#SmilesDrawer.Drawer+restoreRingInformation)
    * [.createRing(ring, [center], [startVertex], [previousVertex], [previousVertex])](#SmilesDrawer.Drawer+createRing)
    * [.rotateSubtree(vertexId, parentVertexId, angle, center)](#SmilesDrawer.Drawer+rotateSubtree)
    * [.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores)](#SmilesDrawer.Drawer+getSubtreeOverlapScore) ⇒ <code>number</code>
    * [.getCurrentCenterOfMass()](#SmilesDrawer.Drawer+getCurrentCenterOfMass) ⇒ <code>Vector2</code>
    * [.getCurrentCenterOfMassInNeigbourhood(vec, [r])](#SmilesDrawer.Drawer+getCurrentCenterOfMassInNeigbourhood) ⇒ <code>Vector2</code>
    * [.resolvePrimaryOverlaps()](#SmilesDrawer.Drawer+resolvePrimaryOverlaps)
    * [.resolveSecondaryOverlaps(scores)](#SmilesDrawer.Drawer+resolveSecondaryOverlaps)
    * [.createNextBond(vertex, previousVertex, ringOrAngle, dir)](#SmilesDrawer.Drawer+createNextBond)
    * [.getCommonRingbondNeighbour(vertex)](#SmilesDrawer.Drawer+getCommonRingbondNeighbour) ⇒ <code>number</code> &#124; <code>null</code>
    * [.isPointInRing(vec)](#SmilesDrawer.Drawer+isPointInRing) ⇒ <code>boolean</code>
    * [.isEdgeInRing(edge)](#SmilesDrawer.Drawer+isEdgeInRing) ⇒ <code>boolean</code>
    * [.isEdgeRotatable(edge)](#SmilesDrawer.Drawer+isEdgeRotatable) ⇒ <code>boolean</code>
    * [.isRingAromatic(ring)](#SmilesDrawer.Drawer+isRingAromatic) ⇒ <code>boolean</code>
    * [.isEdgeInAromaticRing(edge)](#SmilesDrawer.Drawer+isEdgeInAromaticRing) ⇒ <code>boolean</code>
    * [.getEdgeNormals(edge)](#SmilesDrawer.Drawer+getEdgeNormals) ⇒ <code>array</code>
    * [.getTreeDepth(vertexId, parentVertexId)](#SmilesDrawer.Drawer+getTreeDepth) ⇒ <code>number</code>
    * [.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst])](#SmilesDrawer.Drawer+traverseTree)
    * [.getBondCount(vertex)](#SmilesDrawer.Drawer+getBondCount) ⇒ <code>number</code>
    * [.getNonRingNeighbours(vertexId)](#SmilesDrawer.Drawer+getNonRingNeighbours) ⇒ <code>array</code>
    * [.initPseudoElements()](#SmilesDrawer.Drawer+initPseudoElements)

<a name="new_SmilesDrawer.Drawer_new"></a>

#### new SmilesDrawer.Drawer(options)
The constructor for the class SmilesDrawer.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | An object containing custom values for different options. It is merged with the default options. |

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
| data | <code>object</code> |  | The tree returned by the smiles parser. |
| target | <code>string</code> &#124; <code>HTMLElement</code> |  | The id of the HTML canvas element the structure is drawn to - or the element itself. |
| themeName | <code>string</code> | <code>&quot;&#x27;dark&#x27;&quot;</code> | The name of the theme to use. Built-in themes are 'light' and 'dark'. |
| infoOnly | <code>boolean</code> | <code>false</code> | Only output info on the molecule without drawing anything to the canvas. |

<a name="SmilesDrawer.Drawer+edgeRingCount"></a>

#### drawer.edgeRingCount(edgeId) ⇒ <code>number</code>
Returns the number of rings this edge is a part of.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The number of rings the provided edge is part of.  

| Param | Type | Description |
| --- | --- | --- |
| edgeId | <code>number</code> | The id of an edge. |

<a name="SmilesDrawer.Drawer+getBridgedRings"></a>

#### drawer.getBridgedRings() ⇒ <code>array</code>
Returns an array containing the bridged rings associated with this  molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array containing all bridged rings associated with this molecule.  
<a name="SmilesDrawer.Drawer+getFusedRings"></a>

#### drawer.getFusedRings() ⇒ <code>array</code>
Returns an array containing all fused rings associated with this molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array containing all fused rings associated with this molecule.  
<a name="SmilesDrawer.Drawer+getSpiros"></a>

#### drawer.getSpiros() ⇒ <code>array</code>
Returns an array containing all spiros associated with this molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array containing all spiros associated with this molecule.  
<a name="SmilesDrawer.Drawer+printRingInfo"></a>

#### drawer.printRingInfo() ⇒ <code>string</code>
Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings); Insiders Count (the number of vertices contained within a bridged ring)

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>string</code> - A string as described in the method description.  
<a name="SmilesDrawer.Drawer+getTotalOverlapScore"></a>

#### drawer.getTotalOverlapScore() ⇒ <code>number</code>
Returns the total overlap score of the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The overlap score.  
<a name="SmilesDrawer.Drawer+getRingCount"></a>

#### drawer.getRingCount() ⇒ <code>number</code>
Returns the ring count of the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The ring count.  
<a name="SmilesDrawer.Drawer+hasBridgedRing"></a>

#### drawer.hasBridgedRing() ⇒ <code>boolean</code>
Checks whether or not the current molecule  a bridged ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the current molecule  a bridged ring.  
<a name="SmilesDrawer.Drawer+getHeavyAtomCount"></a>

#### drawer.getHeavyAtomCount() ⇒ <code>number</code>
Returns the number of heavy atoms (non-hydrogen) in the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The heavy atom count.  
<a name="SmilesDrawer.Drawer+getRingbondType"></a>

#### drawer.getRingbondType(vertexA, vertexB) ⇒ <code>string</code> &#124; <code>null</code>
Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>string</code> &#124; <code>null</code> - Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="SmilesDrawer.Drawer+initRings"></a>

#### drawer.initRings()
Initializes rings and ringbonds for the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Drawer+getBridgedRingRings"></a>

#### drawer.getBridgedRingRings(ringId) ⇒ <code>array</code>
Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array containing all ring ids of rings part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.Drawer+isPartOfBridgedRing"></a>

#### drawer.isPartOfBridgedRing(ringId) ⇒ <code>boolean</code>
Checks whether or not a ring is part of a bridged ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.Drawer+createBridgedRing"></a>

#### drawer.createBridgedRing(ringIds, sourceVertexId) ⇒ <code>Ring</code>
Creates a bridged ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Ring</code> - The bridged ring.  

| Param | Type | Description |
| --- | --- | --- |
| ringIds | <code>array</code> | An array of ids of rings involved in the bridged ring. |
| sourceVertexId | <code>number</code> | The vertex id to start the bridged ring discovery from. |

<a name="SmilesDrawer.Drawer+areVerticesInSameRing"></a>

#### drawer.areVerticesInSameRing(vertexA, vertexB) ⇒ <code>boolean</code>
Checks whether or not two vertices are in the same ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the two vertices are in the same ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getCommonRings"></a>

#### drawer.getCommonRings(vertexA, vertexB) ⇒ <code>array</code>
Returns an array of ring ids shared by both vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array of ids of rings shared by the two vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getSmallestCommonRing"></a>

#### drawer.getSmallestCommonRing(vertexA, vertexB) ⇒ <code>Ring</code> &#124; <code>null</code>
Returns the smallest ring shared by the two vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Ring</code> &#124; <code>null</code> - If a smallest common ring exists, that ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getLargestOrAromaticCommonRing"></a>

#### drawer.getLargestOrAromaticCommonRing(vertexA, vertexB) ⇒ <code>Ring</code> &#124; <code>null</code>
Returns the aromatic or largest ring shared by the two vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Ring</code> &#124; <code>null</code> - If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getVerticesAt"></a>

#### drawer.getVerticesAt(position, radius, excludeVertexId) ⇒ <code>array</code>
Returns an array of vertices positioned at a specified location.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array containing vertex ids in a given location.  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>Vector2</code> | The position to search for vertices. |
| radius | <code>number</code> | The radius within to search. |
| excludeVertexId | <code>number</code> | A vertex id to be excluded from the search results. |

<a name="SmilesDrawer.Drawer+getClosestVertex"></a>

#### drawer.getClosestVertex(vertex) ⇒ <code>Vertex</code>
Returns the closest vertex (connected as well as unconnected).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Vertex</code> - The closest vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | The vertex of which to find the closest other vertex. |

<a name="SmilesDrawer.Drawer+getClosestEndpointVertex"></a>

#### drawer.getClosestEndpointVertex(vertex) ⇒ <code>Vertex</code>
Returns the closest vertex (connected as well as unconnected), which is an endpoint.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Vertex</code> - The closest endpoint vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | The vertex of which to find the closest other vertex. |

<a name="SmilesDrawer.Drawer+addRing"></a>

#### drawer.addRing(ring) ⇒ <code>number</code>
Add a ring to this representation of a molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The ring id of the new ring.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A new ring. |

<a name="SmilesDrawer.Drawer+removeRing"></a>

#### drawer.removeRing(ringId)
Removes a ring from the array of rings associated with the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.Drawer+getRing"></a>

#### drawer.getRing(ringId) ⇒ <code>Ring</code>
Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Ring</code> - A ring associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.Drawer+addRingConnection"></a>

#### drawer.addRingConnection(ringConnection) ⇒ <code>number</code>
Add a ring connection to this representation of a molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The ring connection id of the new ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnection | <code>RingConnection</code> | A new ringConnection. |

<a name="SmilesDrawer.Drawer+removeRingConnection"></a>

#### drawer.removeRingConnection(ringConnectionId)
Removes a ring connection from the array of rings connections associated with the current molecule.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringConnectionId | <code>number</code> | A ring connection id. |

<a name="SmilesDrawer.Drawer+removeRingConnectionsBetween"></a>

#### drawer.removeRingConnectionsBetween(vertexIdA, vertexIdB)
Removes all ring connections between two vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+getRingConnections"></a>

#### drawer.getRingConnections(ringId, ringIds) ⇒ <code>array</code>
Get the ring connections associated with a ring, the ring connections between two rings or the ring connections between one ring and multiple other rings.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array of ring connection ids.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ringId | <code>number</code> |  | A ring id. |
| ringIds | <code>number</code> &#124; <code>array</code> &#124; <code>null</code> | <code></code> | A ring id, an array of ring ids or null. |

<a name="SmilesDrawer.Drawer+isRingConnection"></a>

#### drawer.isRingConnection(vertexIdA, vertexIdB) ⇒ <code>boolean</code>
Check whether or not the two vertices specified span a bond which is a ring connection (fused rings).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - Returns a boolean indicating whether or not the two vertices specify a ringbond.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+getOverlapScore"></a>

#### drawer.getOverlapScore() ⇒ <code>object</code>
Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>object</code> - Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }  
<a name="SmilesDrawer.Drawer+chooseSide"></a>

#### drawer.chooseSide(vertexA, vertexB, sides) ⇒ <code>object</code>
When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
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
| vertexA | <code>Vertex</code> | A vertex. |
| vertexB | <code>Vertex</code> | A vertex. |
| sides | <code>array</code> | An array containing the two normals of the line spanned by the two provided vertices. |

<a name="SmilesDrawer.Drawer+areConnected"></a>

#### drawer.areConnected(vertexIdA, vertexIdA) ⇒ <code>boolean</code>
Checks whether or not two vertices are connected.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not two vertices are connected.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdA | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+getEdgeWeight"></a>

#### drawer.getEdgeWeight(vertexIdA, vertexIdB) ⇒ <code>number</code> &#124; <code>null</code>
Returns the weight of the edge between two given vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - The weight of the edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+forceLayout"></a>

#### drawer.forceLayout(vertices, center, startVertexId, ring)
Applies a force-based layout to a set of provided vertices.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array containing vertices to be placed using the force based layout. |
| center | <code>Vector2</code> | The center of the layout. |
| startVertexId | <code>number</code> | A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex. |
| ring | <code>Ring</code> | The bridged ring associated with this force-based layout. |

<a name="SmilesDrawer.Drawer+getSubringCenter"></a>

#### drawer.getSubringCenter(ring, vertex) ⇒ <code>Vector2</code>
Gets the center of a ring contained within a bridged ring and containing a given vertex.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Vector2</code> - The center of the subring that  the provided vertex.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A bridged ring. |
| vertex | <code>Vertex</code> | A vertex. |

<a name="SmilesDrawer.Drawer+drawEdges"></a>

#### drawer.drawEdges(debug)
Draw the actual edges as bonds to the canvas.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | A boolean indicating whether or not to draw debug helpers. |

<a name="SmilesDrawer.Drawer+drawVertices"></a>

#### drawer.drawVertices(debug)
Draws the vertices representing atoms to the canvas.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | A boolean indicating whether or not to draw debug messages to the canvas. |

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
| ring | <code>Ring</code> |  | The ring to position. |
| [center] | <code>Vector2</code> &#124; <code>null</code> | <code></code> | The center of the ring to be created. |
| [startVertex] | <code>Vertex</code> &#124; <code>null</code> | <code></code> | The first vertex to be positioned inside the ring. |
| [previousVertex] | <code>Vertex</code> &#124; <code>null</code> | <code></code> | The last vertex that was positioned. |
| [previousVertex] | <code>boolean</code> | <code>false</code> | A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it. |

<a name="SmilesDrawer.Drawer+rotateSubtree"></a>

#### drawer.rotateSubtree(vertexId, parentVertexId, angle, center)
Rotate an entire subtree by an angle around a center.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>number</code> | A vertex id in the previous direction of the subtree that is to rotate. |
| angle | <code>number</code> | An angle in randians. |
| center | <code>Vector2</code> | The rotational center. |

<a name="SmilesDrawer.Drawer+getSubtreeOverlapScore"></a>

#### drawer.getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) ⇒ <code>number</code>
Gets the overlap score of a subtree.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The overlap score of the subtree.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id (the root of the sub-tree). |
| parentVertexId | <code>number</code> | A vertex id in the previous direction of the subtree. |
| vertexOverlapScores | <code>Array</code> | An array containing the vertex overlap scores indexed by vertex id. |

<a name="SmilesDrawer.Drawer+getCurrentCenterOfMass"></a>

#### drawer.getCurrentCenterOfMass() ⇒ <code>Vector2</code>
Returns the current (positioned vertices so far) center of mass.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Vector2</code> - The current center of mass.  
<a name="SmilesDrawer.Drawer+getCurrentCenterOfMassInNeigbourhood"></a>

#### drawer.getCurrentCenterOfMassInNeigbourhood(vec, [r]) ⇒ <code>Vector2</code>
Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>Vector2</code> - The current center of mass.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>Vector2</code> |  | The point at which to look for neighbours. |
| [r] | <code>number</code> | <code>currentBondLength*2.0</code> | The radius of vertices to include. |

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
| scores | <code>array</code> | An array of objects sorted descending by score. An object is in the form of { id: 0, score: 22 }. |

<a name="SmilesDrawer.Drawer+createNextBond"></a>

#### drawer.createNextBond(vertex, previousVertex, ringOrAngle, dir)
Positiones the next vertex thus creating a bond.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | A vertex. |
| previousVertex | <code>Vertex</code> | The previous vertex which has been positioned. |
| ringOrAngle | <code>ring</code> &#124; <code>number</code> | Either a ring or a number. If the vertex is connected to a ring, it is positioned based on the ring center and thus the ring is supplied. If the vertex is not in a ring, an angle (in radians) is supplied. |
| dir | <code>number</code> | Either 1 or -1 to break ties (if no angle can be elucidated. |

<a name="SmilesDrawer.Drawer+getCommonRingbondNeighbour"></a>

#### drawer.getCommonRingbondNeighbour(vertex) ⇒ <code>number</code> &#124; <code>null</code>
Gets the vetex sharing the edge that is the common bond of two rings.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | A vertex. |

<a name="SmilesDrawer.Drawer+isPointInRing"></a>

#### drawer.isPointInRing(vec) ⇒ <code>boolean</code>
Check if a vector is inside any ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | A vector. |

<a name="SmilesDrawer.Drawer+isEdgeInRing"></a>

#### drawer.isEdgeInRing(edge) ⇒ <code>boolean</code>
Check whether or not an edge is part of a ring.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the edge is part of a ring.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | An edge. |

<a name="SmilesDrawer.Drawer+isEdgeRotatable"></a>

#### drawer.isEdgeRotatable(edge) ⇒ <code>boolean</code>
Check whether or not an edge is rotatable.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the edge is rotatable.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | An edge. |

<a name="SmilesDrawer.Drawer+isRingAromatic"></a>

#### drawer.isRingAromatic(ring) ⇒ <code>boolean</code>
Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not a ring is implicitly defined as aromatic.  

| Param | Type | Description |
| --- | --- | --- |
| ring | <code>Ring</code> | A ring. |

<a name="SmilesDrawer.Drawer+isEdgeInAromaticRing"></a>

#### drawer.isEdgeInAromaticRing(edge) ⇒ <code>boolean</code>
Checks whether or not an edge is part of an explicit aromatic ring (lower case smiles).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the vertex is part of an explicit aromatic ring.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | An edge. |

<a name="SmilesDrawer.Drawer+getEdgeNormals"></a>

#### drawer.getEdgeNormals(edge) ⇒ <code>array</code>
Get the normals of an edge.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array containing two vectors, representing the normals.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | An edge. |

<a name="SmilesDrawer.Drawer+getTreeDepth"></a>

#### drawer.getTreeDepth(vertexId, parentVertexId) ⇒ <code>number</code>
Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The depth of the sub-tree.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |
| parentVertexId | <code>number</code> | The id of a neighbouring vertex. |

<a name="SmilesDrawer.Drawer+traverseTree"></a>

#### drawer.traverseTree(vertexId, parentVertexId, callback, [maxDepth], [ignoreFirst])
Traverse a sub-tree in the graph.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vertexId | <code>number</code> |  | A vertex id. |
| parentVertexId | <code>number</code> |  | A neighbouring vertex. |
| callback | <code>function</code> |  | The callback function that is called with each visited as an argument. |
| [maxDepth] | <code>number</code> | <code></code> | The maximum depth of the recursion. If null, there is no limit. |
| [ignoreFirst] | <code>boolean</code> | <code>false</code> | Whether or not to ignore the starting vertex supplied as vertexId in the callback. |

<a name="SmilesDrawer.Drawer+getBondCount"></a>

#### drawer.getBondCount(vertex) ⇒ <code>number</code>
Gets the number of bonds of a vertex.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>number</code> - The number of bonds the vertex participates in.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | A vertex. |

<a name="SmilesDrawer.Drawer+getNonRingNeighbours"></a>

#### drawer.getNonRingNeighbours(vertexId) ⇒ <code>array</code>
Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
**Returns**: <code>array</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Drawer+initPseudoElements"></a>

#### drawer.initPseudoElements()
Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon sets
the involved atoms not to be displayed.

**Kind**: instance method of <code>[Drawer](#SmilesDrawer.Drawer)</code>  
<a name="SmilesDrawer.Edge"></a>

### SmilesDrawer.Edge
A class representing an edge

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.Edge](#SmilesDrawer.Edge)
    * [new SmilesDrawer.Edge(sourceId, targetId, weight)](#new_SmilesDrawer.Edge_new)
    * _instance_
        * [.getBondCount()](#SmilesDrawer.Edge+getBondCount) ⇒ <code>number</code>
    * _static_
        * [.bonds](#SmilesDrawer.Edge.bonds) ⇒ <code>object</code>

<a name="new_SmilesDrawer.Edge_new"></a>

#### new SmilesDrawer.Edge(sourceId, targetId, weight)
The constructor for the class Edge.


| Param | Type | Description |
| --- | --- | --- |
| sourceId | <code>number</code> | A vertex id. |
| targetId | <code>number</code> | A vertex id. |
| weight | <code>number</code> | The weight of the edge. |

<a name="SmilesDrawer.Edge+getBondCount"></a>

#### edge.getBondCount() ⇒ <code>number</code>
Returns the number of bonds associated with the bond type of this edge.

**Kind**: instance method of <code>[Edge](#SmilesDrawer.Edge)</code>  
**Returns**: <code>number</code> - The number of bonds associated with this edge.  
<a name="SmilesDrawer.Edge.bonds"></a>

#### Edge.bonds ⇒ <code>object</code>
An object mapping the bond type to the number of bonds.

**Kind**: static property of <code>[Edge](#SmilesDrawer.Edge)</code>  
**Returns**: <code>object</code> - The object containing the map.  
<a name="SmilesDrawer.Graph"></a>

### SmilesDrawer.Graph
**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.Graph](#SmilesDrawer.Graph)
    * [new SmilesDrawer.Graph(parseTree, [isomeric])](#new_SmilesDrawer.Graph_new)
    * _instance_
        * [._init(node, parentVertexId, isBranch)](#SmilesDrawer.Graph+_init)
        * [._initInfos()](#SmilesDrawer.Graph+_initInfos)
        * [.clear()](#SmilesDrawer.Graph+clear)
        * [.addVertex(vertex)](#SmilesDrawer.Graph+addVertex) ⇒ <code>number</code>
        * [.addEdge(edge)](#SmilesDrawer.Graph+addEdge) ⇒ <code>number</code>
        * [.getEdge(vertexIdA, vertexIdB)](#SmilesDrawer.Graph+getEdge) ⇒ <code>number</code> &#124; <code>null</code>
        * [.hasEdge(vertexIdA, vertexIdB)](#SmilesDrawer.Graph+hasEdge) ⇒ <code>number</code> &#124; <code>null</code>
        * [.getVertexList()](#SmilesDrawer.Graph+getVertexList) ⇒ <code>array</code>
        * [.getEdgeList()](#SmilesDrawer.Graph+getEdgeList) ⇒ <code>array</code>
        * [.getAdjacencyMatrix()](#SmilesDrawer.Graph+getAdjacencyMatrix) ⇒ <code>array</code>
        * [.getComponentsAdjacencyMatrix()](#SmilesDrawer.Graph+getComponentsAdjacencyMatrix) ⇒ <code>array</code>
        * [.getSubgraphAdjacencyMatrix(vertexIds)](#SmilesDrawer.Graph+getSubgraphAdjacencyMatrix) ⇒ <code>array</code>
        * [.getAdjacencyList()](#SmilesDrawer.Graph+getAdjacencyList) ⇒ <code>array</code>
        * [.getSubgraphAdjacencyList(vertexIds)](#SmilesDrawer.Graph+getSubgraphAdjacencyList) ⇒ <code>array</code>
        * [.getLargestCycleInSubgraph(startVertexId, vertexIds)](#SmilesDrawer.Graph+getLargestCycleInSubgraph)
        * [.getBridges()](#SmilesDrawer.Graph+getBridges) ⇒ <code>array</code>
        * [._bridgeDfs()](#SmilesDrawer.Graph+_bridgeDfs)
    * _static_
        * [.getConnectedComponentCount(adjacencyMatrix)](#SmilesDrawer.Graph.getConnectedComponentCount) ⇒ <code>Number</code>
        * [._ccCountDfs()](#SmilesDrawer.Graph._ccCountDfs)

<a name="new_SmilesDrawer.Graph_new"></a>

#### new SmilesDrawer.Graph(parseTree, [isomeric])
The constructor of the class Graph.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parseTree | <code>any</code> |  | A SMILES parse tree. |
| [isomeric] | <code>boolean</code> | <code>false</code> | A boolean specifying whether or not the SMILES is isomeric. |

<a name="SmilesDrawer.Graph+_init"></a>

#### graph._init(node, parentVertexId, isBranch)
PRIVATE FUNCTION. Initializing the graph from the parse tree.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>object</code> |  | The current node in the parse tree. |
| parentVertexId | <code>number</code> | <code></code> | The id of the previous vertex. |
| isBranch | <code>boolean</code> | <code>false</code> | Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C). |

<a name="SmilesDrawer.Graph+_initInfos"></a>

#### graph._initInfos()
PRIVATE FUNCTION. Initializes element counts etc.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Graph+clear"></a>

#### graph.clear()
Clears all the elements in this graph (edges and vertices).

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Graph+addVertex"></a>

#### graph.addVertex(vertex) ⇒ <code>number</code>
Add a vertex to the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>number</code> - The vertex id of the new vertex.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | A new vertex. |

<a name="SmilesDrawer.Graph+addEdge"></a>

#### graph.addEdge(edge) ⇒ <code>number</code>
Add an edge to the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>number</code> - The edge id of the new edge.  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>Edge</code> | A new edge. |

<a name="SmilesDrawer.Graph+getEdge"></a>

#### graph.getEdge(vertexIdA, vertexIdB) ⇒ <code>number</code> &#124; <code>null</code>
Returns the edge between two given vertices.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - The edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Graph+hasEdge"></a>

#### graph.hasEdge(vertexIdA, vertexIdB) ⇒ <code>number</code> &#124; <code>null</code>
Returns the edge between two given vertices.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - The edge or, if no edge can be found, null.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIdA | <code>number</code> | A vertex id. |
| vertexIdB | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Graph+getVertexList"></a>

#### graph.getVertexList() ⇒ <code>array</code>
Returns an array containing the vertex ids of this graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>array</code> - An array containing all vertex ids of this graph.  
<a name="SmilesDrawer.Graph+getEdgeList"></a>

#### graph.getEdgeList() ⇒ <code>array</code>
Returns an array containing source, target arrays of this graphs edges.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>array</code> - An array containing source, target arrays of this graphs edges.  
<a name="SmilesDrawer.Graph+getAdjacencyMatrix"></a>

#### graph.getAdjacencyMatrix() ⇒ <code>array</code>
Get the adjacency matrix of the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>array</code> - The adjancency matrix of the molecular graph.  
<a name="SmilesDrawer.Graph+getComponentsAdjacencyMatrix"></a>

#### graph.getComponentsAdjacencyMatrix() ⇒ <code>array</code>
Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>array</code> - The adjancency matrix of the molecular graph with all bridges removed.  
<a name="SmilesDrawer.Graph+getSubgraphAdjacencyMatrix"></a>

#### graph.getSubgraphAdjacencyMatrix(vertexIds) ⇒ <code>array</code>
Get the adjacency matrix of a subgraph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>array</code> - The adjancency matrix of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>array</code> | An array containing the vertex ids contained within the subgraph. |

<a name="SmilesDrawer.Graph+getAdjacencyList"></a>

#### graph.getAdjacencyList() ⇒ <code>array</code>
Get the adjacency list of the graph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>array</code> - The adjancency list of the graph.  
<a name="SmilesDrawer.Graph+getSubgraphAdjacencyList"></a>

#### graph.getSubgraphAdjacencyList(vertexIds) ⇒ <code>array</code>
Get the adjacency list of a subgraph.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>array</code> - The adjancency list of the subgraph.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIds | <code>array</code> | An array containing the vertex ids contained within the subgraph. |

<a name="SmilesDrawer.Graph+getLargestCycleInSubgraph"></a>

#### graph.getLargestCycleInSubgraph(startVertexId, vertexIds)
Get the path of the

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  

| Param | Type | Description |
| --- | --- | --- |
| startVertexId | <code>array</code> | The start vertex of the cycle. |
| vertexIds | <code>array</code> | An array containing the vertex ids contained within the subgraph. |

<a name="SmilesDrawer.Graph+getBridges"></a>

#### graph.getBridges() ⇒ <code>array</code>
Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>array</code> - An array containing the edge ids of the bridges.  
<a name="SmilesDrawer.Graph+_bridgeDfs"></a>

#### graph._bridgeDfs()
PRIVATE FUNCTION used by getBridges().

**Kind**: instance method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Graph.getConnectedComponentCount"></a>

#### Graph.getConnectedComponentCount(adjacencyMatrix) ⇒ <code>Number</code>
Returns the number of connected components for the grpah

**Kind**: static method of <code>[Graph](#SmilesDrawer.Graph)</code>  
**Returns**: <code>Number</code> - The number of connected components of the supplied graph.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>array</code> | An adjacency matrix. |

<a name="SmilesDrawer.Graph._ccCountDfs"></a>

#### Graph._ccCountDfs()
PRIVATE FUNCTION used by getConnectedComponentCount().

**Kind**: static method of <code>[Graph](#SmilesDrawer.Graph)</code>  
<a name="SmilesDrawer.Hanser"></a>

### SmilesDrawer.Hanser
A class encapsulating the functionality to find the rings in the graph using Hansers algorithm.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  
<a name="SmilesDrawer.Line"></a>

### SmilesDrawer.Line
A class representing a line

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.Line](#SmilesDrawer.Line)
    * [new SmilesDrawer.Line([from], [to], [elementFrom], [elementTo], [chiralFrom], [chiralTo])](#new_SmilesDrawer.Line_new)
    * [.clone()](#SmilesDrawer.Line+clone) ⇒ <code>Line</code>
    * [.getLength()](#SmilesDrawer.Line+getLength) ⇒ <code>number</code>
    * [.getAngle()](#SmilesDrawer.Line+getAngle) ⇒ <code>number</code>
    * [.getRightVector()](#SmilesDrawer.Line+getRightVector) ⇒ <code>Vector2</code>
    * [.getLeftVector()](#SmilesDrawer.Line+getLeftVector) ⇒ <code>Vector2</code>
    * [.getRightElement()](#SmilesDrawer.Line+getRightElement) ⇒ <code>string</code>
    * [.getLeftElement()](#SmilesDrawer.Line+getLeftElement) ⇒ <code>string</code>
    * [.getRightChiral()](#SmilesDrawer.Line+getRightChiral) ⇒ <code>boolean</code>
    * [.getLeftChiral()](#SmilesDrawer.Line+getLeftChiral) ⇒ <code>boolean</code>
    * [.setRightVector(x, y)](#SmilesDrawer.Line+setRightVector) ⇒ <code>Line</code>
    * [.setLeftVector(x, y)](#SmilesDrawer.Line+setLeftVector) ⇒ <code>Line</code>
    * [.rotateToXAxis()](#SmilesDrawer.Line+rotateToXAxis) ⇒ <code>Line</code>
    * [.rotate(theta)](#SmilesDrawer.Line+rotate) ⇒ <code>Line</code>
    * [.shortenFrom(by)](#SmilesDrawer.Line+shortenFrom) ⇒ <code>Line</code>
    * [.shortenTo(by)](#SmilesDrawer.Line+shortenTo) ⇒ <code>Line</code>
    * [.shortenRight(by)](#SmilesDrawer.Line+shortenRight) ⇒ <code>Line</code>
    * [.shortenLeft(by)](#SmilesDrawer.Line+shortenLeft) ⇒ <code>Line</code>
    * [.shorten(by)](#SmilesDrawer.Line+shorten) ⇒ <code>Line</code>
    * [.getNormals()](#SmilesDrawer.Line+getNormals) ⇒ <code>array</code>

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

#### line.clone() ⇒ <code>Line</code>
Clones this line and returns the clone.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - A clone of this line.  
<a name="SmilesDrawer.Line+getLength"></a>

#### line.getLength() ⇒ <code>number</code>
Returns the length of this line.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>number</code> - The length of this line.  
<a name="SmilesDrawer.Line+getAngle"></a>

#### line.getAngle() ⇒ <code>number</code>
Returns the angle of the line in relation to the coordinate system (the x-axis).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>number</code> - The angle in radians.  
<a name="SmilesDrawer.Line+getRightVector"></a>

#### line.getRightVector() ⇒ <code>Vector2</code>
Returns the right vector (the vector with the larger x value).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Vector2</code> - The right vector.  
<a name="SmilesDrawer.Line+getLeftVector"></a>

#### line.getLeftVector() ⇒ <code>Vector2</code>
Returns the left vector (the vector with the smaller x value).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Vector2</code> - The left vector.  
<a name="SmilesDrawer.Line+getRightElement"></a>

#### line.getRightElement() ⇒ <code>string</code>
Returns the element associated with the right vector (the vector with the larger x value).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>string</code> - The element associated with the right vector.  
<a name="SmilesDrawer.Line+getLeftElement"></a>

#### line.getLeftElement() ⇒ <code>string</code>
Returns the element associated with the left vector (the vector with the smaller x value).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>string</code> - The element associated with the left vector.  
<a name="SmilesDrawer.Line+getRightChiral"></a>

#### line.getRightChiral() ⇒ <code>boolean</code>
Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>boolean</code> - Whether or not the atom associated with the right vector is a chiral center.  
<a name="SmilesDrawer.Line+getLeftChiral"></a>

#### line.getLeftChiral() ⇒ <code>boolean</code>
Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>boolean</code> - Whether or not the atom  associated with the left vector is a chiral center.  
<a name="SmilesDrawer.Line+setRightVector"></a>

#### line.setRightVector(x, y) ⇒ <code>Line</code>
Set the value of the right vector.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |

<a name="SmilesDrawer.Line+setLeftVector"></a>

#### line.setLeftVector(x, y) ⇒ <code>Line</code>
Set the value of the left vector.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |

<a name="SmilesDrawer.Line+rotateToXAxis"></a>

#### line.rotateToXAxis() ⇒ <code>Line</code>
Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - This line.  
<a name="SmilesDrawer.Line+rotate"></a>

#### line.rotate(theta) ⇒ <code>Line</code>
Rotate the line by a given value (in radians). The center of rotation is the left vector.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| theta | <code>number</code> | The angle (in radians) to rotate the line. |

<a name="SmilesDrawer.Line+shortenFrom"></a>

#### line.shortenFrom(by) ⇒ <code>Line</code>
Shortens this line from the "from" direction by a given value (in pixels).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+shortenTo"></a>

#### line.shortenTo(by) ⇒ <code>Line</code>
Shortens this line from the "to" direction by a given value (in pixels).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+shortenRight"></a>

#### line.shortenRight(by) ⇒ <code>Line</code>
Shorten the right side.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+shortenLeft"></a>

#### line.shortenLeft(by) ⇒ <code>Line</code>
Shorten the left side.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+shorten"></a>

#### line.shorten(by) ⇒ <code>Line</code>
Shortens this line from both directions by a given value (in pixels).

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>Line</code> - This line.  

| Param | Type | Description |
| --- | --- | --- |
| by | <code>number</code> | The length in pixels to shorten the vector by. |

<a name="SmilesDrawer.Line+getNormals"></a>

#### line.getNormals() ⇒ <code>array</code>
Returns the normals of this line.

**Kind**: instance method of <code>[Line](#SmilesDrawer.Line)</code>  
**Returns**: <code>array</code> - An array containing the two normals as vertices.  
<a name="SmilesDrawer.MathHelper"></a>

### SmilesDrawer.MathHelper
A static class containing helper functions for math-related tasks.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.MathHelper](#SmilesDrawer.MathHelper)
    * [.round(value, decimals)](#SmilesDrawer.MathHelper.round) ⇒ <code>number</code>
    * [.meanAngle(arr)](#SmilesDrawer.MathHelper.meanAngle) ⇒ <code>number</code>
    * [.innerAngle(n)](#SmilesDrawer.MathHelper.innerAngle) ⇒ <code>number</code>
    * [.polyCircumradius(s, n)](#SmilesDrawer.MathHelper.polyCircumradius) ⇒ <code>number</code>
    * [.apothem(r, n)](#SmilesDrawer.MathHelper.apothem) ⇒ <code>number</code>
    * [.centralAngle(n)](#SmilesDrawer.MathHelper.centralAngle) ⇒ <code>number</code>
    * [.toDeg(rad)](#SmilesDrawer.MathHelper.toDeg) ⇒ <code>number</code>
    * [.toRad(deg)](#SmilesDrawer.MathHelper.toRad) ⇒ <code>number</code>

<a name="SmilesDrawer.MathHelper.round"></a>

#### MathHelper.round(value, decimals) ⇒ <code>number</code>
Rounds a value to a given number of decimals.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>number</code> - A number rounded to a given number of decimals.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | A number. |
| decimals | <code>number</code> | The number of decimals. |

<a name="SmilesDrawer.MathHelper.meanAngle"></a>

#### MathHelper.meanAngle(arr) ⇒ <code>number</code>
Returns the means of the angles contained in an array. In radians.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>number</code> - The mean angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array containing angles (in radians). |

<a name="SmilesDrawer.MathHelper.innerAngle"></a>

#### MathHelper.innerAngle(n) ⇒ <code>number</code>
Returns the inner angle of a n-sided regular polygon.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>number</code> - The inner angle of a given regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | Number of sides of a regular polygon. |

<a name="SmilesDrawer.MathHelper.polyCircumradius"></a>

#### MathHelper.polyCircumradius(s, n) ⇒ <code>number</code>
Returns the circumradius of a n-sided regular polygon with a given side-length.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>number</code> - The circumradius of the regular polygon.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The side length of the regular polygon. |
| n | <code>number</code> | The number of sides. |

<a name="SmilesDrawer.MathHelper.apothem"></a>

#### MathHelper.apothem(r, n) ⇒ <code>number</code>
Returns the apothem of a regular n-sided polygon based on its radius.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>number</code> - The apothem of a n-sided polygon based on its radius.  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>number</code> | The radius. |
| n | <code>number</code> | The number of edges of the regular polygon. |

<a name="SmilesDrawer.MathHelper.centralAngle"></a>

#### MathHelper.centralAngle(n) ⇒ <code>number</code>
The central angle of a n-sided regular polygon. In radians.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>number</code> - The central angle of the n-sided polygon in radians.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | The number of sides of the regular polygon. |

<a name="SmilesDrawer.MathHelper.toDeg"></a>

#### MathHelper.toDeg(rad) ⇒ <code>number</code>
Convertes radians to degrees.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>number</code> - The angle in degrees.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | An angle in radians. |

<a name="SmilesDrawer.MathHelper.toRad"></a>

#### MathHelper.toRad(deg) ⇒ <code>number</code>
Converts degrees to radians.

**Kind**: static method of <code>[MathHelper](#SmilesDrawer.MathHelper)</code>  
**Returns**: <code>number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| deg | <code>number</code> | An angle in degrees. |

<a name="SmilesDrawer.Ring"></a>

### SmilesDrawer.Ring
A class representing a ring

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.Ring](#SmilesDrawer.Ring)
    * [new SmilesDrawer.Ring(members)](#new_SmilesDrawer.Ring_new)
    * _instance_
        * [.clone()](#SmilesDrawer.Ring+clone) ⇒ <code>Ring</code>
        * [.allowsFlip()](#SmilesDrawer.Ring+allowsFlip) ⇒ <code>boolean</code>
        * [.setFlipped()](#SmilesDrawer.Ring+setFlipped)
        * [.getSize()](#SmilesDrawer.Ring+getSize) ⇒ <code>number</code>
        * [.getPolygon(vertices)](#SmilesDrawer.Ring+getPolygon) ⇒ <code>array</code>
        * [.getAngle()](#SmilesDrawer.Ring+getAngle) ⇒ <code>number</code>
        * [.eachMember(vertices, callback, startVertexId, previousVertexId)](#SmilesDrawer.Ring+eachMember)
        * [.getOrderedNeighbours(ringConnections)](#SmilesDrawer.Ring+getOrderedNeighbours) ⇒ <code>array</code>
        * [.isBenzeneLike(vertices)](#SmilesDrawer.Ring+isBenzeneLike) ⇒ <code>boolean</code>
        * [.getDoubleBondCount(vertices)](#SmilesDrawer.Ring+getDoubleBondCount) ⇒ <code>number</code>
        * [.contains(vertexId)](#SmilesDrawer.Ring+contains) ⇒ <code>boolean</code>
        * [.thisOrNeighboursContain(rings, vertexId)](#SmilesDrawer.Ring+thisOrNeighboursContain) ⇒ <code>boolean</code>
    * _static_
        * [.getRing(rings, id)](#SmilesDrawer.Ring.getRing) ⇒ <code>Ring</code>

<a name="new_SmilesDrawer.Ring_new"></a>

#### new SmilesDrawer.Ring(members)
The constructor for the class Ring.


| Param | Type | Description |
| --- | --- | --- |
| members | <code>array</code> | An array containing the vertex ids of the members of the ring to be created. |

<a name="SmilesDrawer.Ring+clone"></a>

#### ring.clone() ⇒ <code>Ring</code>
Clones this ring and returns the clone.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Ring</code> - A clone of this ring.  
<a name="SmilesDrawer.Ring+allowsFlip"></a>

#### ring.allowsFlip() ⇒ <code>boolean</code>
Returns a boolean indicating whether or not this ring is allowed to flip attached vertices (atoms) to the inside of the ring. Is only allowed for rings with more than 4 members. Can be disabling by setting the canFlip property of the ring to false.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>boolean</code> - Returns a boolean indicating whether or not vertices (atoms) attached to this ring can be flipped to the inside of the ring.  
<a name="SmilesDrawer.Ring+setFlipped"></a>

#### ring.setFlipped()
Sets the canFlip property of this ring to false if the ring has less than 8 members. If the ring has more than 8 members, the value of canFlip is not changed.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
<a name="SmilesDrawer.Ring+getSize"></a>

#### ring.getSize() ⇒ <code>number</code>
Returns the size (number of members) of this ring.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>number</code> - The size (number of members) of this ring.  
<a name="SmilesDrawer.Ring+getPolygon"></a>

#### ring.getPolygon(vertices) ⇒ <code>array</code>
Gets the polygon representation (an array of the ring-members positional vectors) of this ring.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>array</code> - An array of the positional vectors of the ring members.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices representing the current molecule. |

<a name="SmilesDrawer.Ring+getAngle"></a>

#### ring.getAngle() ⇒ <code>number</code>
Returns the angle of this ring in relation to the coordinate system.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>number</code> - The angle in radians.  
<a name="SmilesDrawer.Ring+eachMember"></a>

#### ring.eachMember(vertices, callback, startVertexId, previousVertexId)
Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | The vertices associated with the current molecule. |
| callback | <code>function</code> | A callback with the current vertex id as a parameter. |
| startVertexId | <code>number</code> | The vertex id of the start vertex. |
| previousVertexId | <code>number</code> | The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex). |

<a name="SmilesDrawer.Ring+getOrderedNeighbours"></a>

#### ring.getOrderedNeighbours(ringConnections) ⇒ <code>array</code>
Returns an array containing the neighbouring rings of this ring ordered by ring size.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>array</code> - An array of neighbouring rings sorted by ring size.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>array</code> | An array of ring connections associated with the current molecule. |

<a name="SmilesDrawer.Ring+isBenzeneLike"></a>

#### ring.isBenzeneLike(vertices) ⇒ <code>boolean</code>
Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring is an implicitly defined benzene-like.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices associated with the current molecule. |

<a name="SmilesDrawer.Ring+getDoubleBondCount"></a>

#### ring.getDoubleBondCount(vertices) ⇒ <code>number</code>
Get the number of double bonds inside this ring.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>number</code> - The number of double bonds inside this ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array of vertices associated with the current molecule. |

<a name="SmilesDrawer.Ring+contains"></a>

#### ring.contains(vertexId) ⇒ <code>boolean</code>
Checks whether or not this ring contains a member with a given vertex id.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring contains a member with the given vertex id.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Ring+thisOrNeighboursContain"></a>

#### ring.thisOrNeighboursContain(rings, vertexId) ⇒ <code>boolean</code>
Checks whether or not this ring or one of its neighbouring rings contains a member with a given vertex id.

**Kind**: instance method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring or one of its neighbouring rings contains a emember with the given vertex id.  

| Param | Type | Description |
| --- | --- | --- |
| rings | <code>array</code> | An array of rings associated with this molecule. |
| vertexId | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.Ring.getRing"></a>

#### Ring.getRing(rings, id) ⇒ <code>Ring</code>
Returns a ring based on a provided ring id.

**Kind**: static method of <code>[Ring](#SmilesDrawer.Ring)</code>  
**Returns**: <code>Ring</code> - A ring with a given id.  

| Param | Type | Description |
| --- | --- | --- |
| rings | <code>array</code> | An array of rings associated with the current molecule. |
| id | <code>number</code> | A ring id. |

<a name="SmilesDrawer.RingConnection"></a>

### SmilesDrawer.RingConnection
A class representing a ring connection

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.RingConnection](#SmilesDrawer.RingConnection)
    * [new SmilesDrawer.RingConnection(firstRing, secondRing)](#new_SmilesDrawer.RingConnection_new)
    * _instance_
        * [.addVertex(vertexId)](#SmilesDrawer.RingConnection+addVertex)
        * [.isBridge()](#SmilesDrawer.RingConnection+isBridge) ⇒ <code>boolean</code>
        * [.updateOther(ringId, otherRingId)](#SmilesDrawer.RingConnection+updateOther)
    * _static_
        * [.isBridge(ringConnections, vertices, firstRingId, secondRingId)](#SmilesDrawer.RingConnection.isBridge) ⇒ <code>boolean</code>
        * [.getNeighbours(ringConnections, ringId)](#SmilesDrawer.RingConnection.getNeighbours) ⇒ <code>array</code>
        * [.getVertices(ringConnections, firstRingId, secondRingId)](#SmilesDrawer.RingConnection.getVertices) ⇒ <code>array</code>

<a name="new_SmilesDrawer.RingConnection_new"></a>

#### new SmilesDrawer.RingConnection(firstRing, secondRing)
The constructor for the class RingConnection.


| Param | Type | Description |
| --- | --- | --- |
| firstRing | <code>Ring</code> | A ring. |
| secondRing | <code>Ring</code> | A ring. |

<a name="SmilesDrawer.RingConnection+addVertex"></a>

#### ringConnection.addVertex(vertexId)
Adding a vertex to the ring connection.

**Kind**: instance method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | A vertex id. |

<a name="SmilesDrawer.RingConnection+isBridge"></a>

#### ringConnection.isBridge() ⇒ <code>boolean</code>
Checks whether or not this ring connection is a bridge in a bridged ring.

**Kind**: instance method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this ring connection is a bridge.  

| Param | Type | Description |
| --- | --- | --- |
| . | <code>array</code> | vertices The array of vertices associated with the current molecule. |

<a name="SmilesDrawer.RingConnection+updateOther"></a>

#### ringConnection.updateOther(ringId, otherRingId)
Update the ring id of this ring connection that is not the ring id supplied as the second argument.

**Kind**: instance method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ringId | <code>number</code> | A ring id. The new ring id to be set. |
| otherRingId | <code>number</code> | A ring id. The id that is NOT to be updated. |

<a name="SmilesDrawer.RingConnection.isBridge"></a>

#### RingConnection.isBridge(ringConnections, vertices, firstRingId, secondRingId) ⇒ <code>boolean</code>
Checks whether or not two rings are connected by a bridged bond.

**Kind**: static method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not two rings ar connected by a bridged bond.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>array</code> | An array of ring connections containing the ring connections associated with the current molecule. |
| vertices | <code>array</code> | An array of vertices containing the vertices associated with the current molecule. |
| firstRingId | <code>number</code> | A ring id. |
| secondRingId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.RingConnection.getNeighbours"></a>

#### RingConnection.getNeighbours(ringConnections, ringId) ⇒ <code>array</code>
Retruns the neighbouring rings of a given ring.

**Kind**: static method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>array</code> - An array of ring ids of neighbouring rings.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>array</code> | An array of ring connections containing ring connections associated with the current molecule. |
| ringId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.RingConnection.getVertices"></a>

#### RingConnection.getVertices(ringConnections, firstRingId, secondRingId) ⇒ <code>array</code>
Returns an array of vertex ids associated with a given ring connection.

**Kind**: static method of <code>[RingConnection](#SmilesDrawer.RingConnection)</code>  
**Returns**: <code>array</code> - An array of vertex ids associated with the ring connection.  

| Param | Type | Description |
| --- | --- | --- |
| ringConnections | <code>array</code> | An array of ring connections containing ring connections associated with the current molecule. |
| firstRingId | <code>number</code> | A ring id. |
| secondRingId | <code>number</code> | A ring id. |

<a name="SmilesDrawer.SSSR"></a>

### SmilesDrawer.SSSR
A class encapsulating the functionality to find the smallest set of smallest rings in a graph.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.SSSR](#SmilesDrawer.SSSR)
    * [.getRings(adjacencyMatrix)](#SmilesDrawer.SSSR.getRings) ⇒ <code>array</code>
    * [.matrixToString(matrix)](#SmilesDrawer.SSSR.matrixToString) ⇒ <code>string</code>
    * [.getPathIncludedDistanceMatrices(adjacencyMatrix)](#SmilesDrawer.SSSR.getPathIncludedDistanceMatrices) ⇒ <code>object</code>
    * [.getRingCandidates(d, pe1, pe2)](#SmilesDrawer.SSSR.getRingCandidates) ⇒ <code>array</code>
    * [.getSSSR(c, d, pe1, pe2, nsssr)](#SmilesDrawer.SSSR.getSSSR) ⇒ <code>array</code>
    * [.getEdgeCount(adjacencyMatrix)](#SmilesDrawer.SSSR.getEdgeCount) ⇒ <code>number</code>
    * [.getEdgeList(adjacencyMatrix)](#SmilesDrawer.SSSR.getEdgeList) ⇒ <code>array</code>
    * [.bondsToAtoms(bonds)](#SmilesDrawer.SSSR.bondsToAtoms) ⇒ <code>set</code>
    * [.pathSetsContain(pathSets, pathSet)](#SmilesDrawer.SSSR.pathSetsContain) ⇒ <code>boolean</code>
    * [.areSetsEqual(setA, setB)](#SmilesDrawer.SSSR.areSetsEqual) ⇒ <code>boolean</code>
    * [.isSupersetOf(setA, setB)](#SmilesDrawer.SSSR.isSupersetOf) ⇒ <code>boolean</code>

<a name="SmilesDrawer.SSSR.getRings"></a>

#### SSSR.getRings(adjacencyMatrix) ⇒ <code>array</code>
Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>array</code> - An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>array</code> | A 2-dimensional array representing a graph. |

<a name="SmilesDrawer.SSSR.matrixToString"></a>

#### SSSR.matrixToString(matrix) ⇒ <code>string</code>
Creates a printable string from a matrix (2D array).

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>string</code> - A string representing the matrix.  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>array</code> | A 2D array. |

<a name="SmilesDrawer.SSSR.getPathIncludedDistanceMatrices"></a>

#### SSSR.getPathIncludedDistanceMatrices(adjacencyMatrix) ⇒ <code>object</code>
Returnes the two path-included distance matrices used to find the sssr.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>object</code> - The path-included distance matrices. { p1, p2 }  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>array</code> | An adjacency matrix. |

<a name="SmilesDrawer.SSSR.getRingCandidates"></a>

#### SSSR.getRingCandidates(d, pe1, pe2) ⇒ <code>array</code>
Get the ring candidates from the path-included distance matrices.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>array</code> - The ring candidates.  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>array</code> | The distance matrix. |
| pe1 | <code>array</code> | A matrix containing the shortest paths. |
| pe2 | <code>array</code> | A matrix containing the shortest paths + one vertex. |

<a name="SmilesDrawer.SSSR.getSSSR"></a>

#### SSSR.getSSSR(c, d, pe1, pe2, nsssr) ⇒ <code>array</code>
Searches the candidates for the smallest set of smallest rings.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>array</code> - The smallest set of smallest rings.  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>array</code> | The candidates. |
| d | <code>array</code> | The distance matrix. |
| pe1 | <code>array</code> | A matrix containing the shortest paths. |
| pe2 | <code>array</code> | A matrix containing the shortest paths + one vertex. |
| nsssr | <code>number</code> | The theoretical number of rings in the graph. |

<a name="SmilesDrawer.SSSR.getEdgeCount"></a>

#### SSSR.getEdgeCount(adjacencyMatrix) ⇒ <code>number</code>
Returns the number of edges in a graph defined by an adjacency matrix.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>number</code> - The number of edges in the graph defined by the adjacency matrix.  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>array</code> | An adjacency matrix. |

<a name="SmilesDrawer.SSSR.getEdgeList"></a>

#### SSSR.getEdgeList(adjacencyMatrix) ⇒ <code>array</code>
Returns an edge list constructed form an adjacency matrix.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>array</code> - An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]  

| Param | Type | Description |
| --- | --- | --- |
| adjacencyMatrix | <code>array</code> | An adjacency matrix. |

<a name="SmilesDrawer.SSSR.bondsToAtoms"></a>

#### SSSR.bondsToAtoms(bonds) ⇒ <code>set</code>
Return a set of vertex indices contained in an array of bonds.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>set</code> - An array of vertices.  

| Param | Type | Description |
| --- | --- | --- |
| bonds | <code>array</code> | An array of bonds. |

<a name="SmilesDrawer.SSSR.pathSetsContain"></a>

#### SSSR.pathSetsContain(pathSets, pathSet) ⇒ <code>boolean</code>
Checks whether or not a given path already exists in an array of paths.

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not a give path is contained within a set.  

| Param | Type | Description |
| --- | --- | --- |
| pathSets | <code>array</code> | An array of sets each representing a path. |
| pathSet | <code>set</code> | A set representing a path. |

<a name="SmilesDrawer.SSSR.areSetsEqual"></a>

#### SSSR.areSetsEqual(setA, setB) ⇒ <code>boolean</code>
Checks whether or not two sets are equal (contain the same elements).

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the two sets are equal.  

| Param | Type | Description |
| --- | --- | --- |
| setA | <code>set</code> | A set. |
| setB | <code>set</code> | A set. |

<a name="SmilesDrawer.SSSR.isSupersetOf"></a>

#### SSSR.isSupersetOf(setA, setB) ⇒ <code>boolean</code>
Checks whether or not a set (setA) is a superset of another set (setB).

**Kind**: static method of <code>[SSSR](#SmilesDrawer.SSSR)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not setB is a superset of setA.  

| Param | Type | Description |
| --- | --- | --- |
| setA | <code>Set</code> | A set. |
| setB | <code>Wet</code> | A set. |

<a name="SmilesDrawer.Vector2"></a>

### SmilesDrawer.Vector2
A class representing a 2D vector.

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.Vector2](#SmilesDrawer.Vector2)
    * [new SmilesDrawer.Vector2(x, y)](#new_SmilesDrawer.Vector2_new)
    * _instance_
        * [.clone()](#SmilesDrawer.Vector2+clone) ⇒ <code>Vector2</code>
        * [.toString()](#SmilesDrawer.Vector2+toString) ⇒ <code>string</code>
        * [.add(vec)](#SmilesDrawer.Vector2+add) ⇒ <code>Vector2</code>
        * [.subtract(vec)](#SmilesDrawer.Vector2+subtract) ⇒ <code>Vector2</code>
        * [.divide(scalar)](#SmilesDrawer.Vector2+divide) ⇒ <code>Vector2</code>
        * [.multiply(v)](#SmilesDrawer.Vector2+multiply) ⇒ <code>Vector2</code>
        * [.multiplyScalar(scalar)](#SmilesDrawer.Vector2+multiplyScalar) ⇒ <code>Vector2</code>
        * [.invert()](#SmilesDrawer.Vector2+invert) ⇒ <code>Vector2</code>
        * [.angle()](#SmilesDrawer.Vector2+angle) ⇒ <code>number</code>
        * [.distance(vec)](#SmilesDrawer.Vector2+distance) ⇒ <code>number</code>
        * [.distanceSq(vec)](#SmilesDrawer.Vector2+distanceSq) ⇒ <code>number</code>
        * [.clockwise(vec)](#SmilesDrawer.Vector2+clockwise) ⇒ <code>number</code>
        * [.rotate(angle)](#SmilesDrawer.Vector2+rotate) ⇒ <code>Vector2</code>
        * [.rotateAround(angle, vec)](#SmilesDrawer.Vector2+rotateAround) ⇒ <code>Vector2</code>
        * [.rotateTo(vec, center, [offsetAngle])](#SmilesDrawer.Vector2+rotateTo) ⇒ <code>Vector2</code>
        * [.rotateAwayFrom(vec, center, angle)](#SmilesDrawer.Vector2+rotateAwayFrom)
        * [.getRotateAwayFromAngle(vec, center, angle)](#SmilesDrawer.Vector2+getRotateAwayFromAngle) ⇒ <code>number</code>
        * [.getRotateTowardsAngle(vec, center, angle)](#SmilesDrawer.Vector2+getRotateTowardsAngle) ⇒ <code>number</code>
        * [.getRotateToAngle(vec, center)](#SmilesDrawer.Vector2+getRotateToAngle) ⇒ <code>number</code>
        * [.isInPolygon(polygon)](#SmilesDrawer.Vector2+isInPolygon) ⇒ <code>boolean</code>
        * [.length()](#SmilesDrawer.Vector2+length) ⇒ <code>number</code>
        * [.normalize()](#SmilesDrawer.Vector2+normalize) ⇒ <code>Vector2</code>
        * [.normalized()](#SmilesDrawer.Vector2+normalized) ⇒ <code>Vector2</code>
        * [.whichSide(vecA, vecB)](#SmilesDrawer.Vector2+whichSide) ⇒ <code>number</code>
        * [.sameSideAs(vecA, vecB, vecC)](#SmilesDrawer.Vector2+sameSideAs) ⇒ <code>boolean</code>
    * _static_
        * [.add(vecA, vecB)](#SmilesDrawer.Vector2.add) ⇒ <code>Vector2</code>
        * [.subtract(vecA, vecB)](#SmilesDrawer.Vector2.subtract) ⇒ <code>Vector2</code>
        * [.multiply(vecA, vecB)](#SmilesDrawer.Vector2.multiply) ⇒ <code>Vector2</code>
        * [.multiplyScalar(vec, scalar)](#SmilesDrawer.Vector2.multiplyScalar) ⇒ <code>Vector2</code>
        * [.midpoint(vecA, vecB)](#SmilesDrawer.Vector2.midpoint) ⇒ <code>Vector2</code>
        * [.normals(vecA, vecB)](#SmilesDrawer.Vector2.normals) ⇒ <code>array</code>
        * [.units(vecA, vecB)](#SmilesDrawer.Vector2.units) ⇒ <code>array</code>
        * [.divide(vecA, vecB)](#SmilesDrawer.Vector2.divide) ⇒ <code>Vector2</code>
        * [.dot(vecA, vecB)](#SmilesDrawer.Vector2.dot) ⇒ <code>number</code>
        * [.angle(vecA, vecB)](#SmilesDrawer.Vector2.angle) ⇒ <code>number</code>
        * [.threePointangle(vecA, vecB, vecC)](#SmilesDrawer.Vector2.threePointangle) ⇒ <code>number</code>
        * [.scalarProjection(vecA, vecB)](#SmilesDrawer.Vector2.scalarProjection) ⇒ <code>number</code>

<a name="new_SmilesDrawer.Vector2_new"></a>

#### new SmilesDrawer.Vector2(x, y)
The constructor of the class Vector2.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The initial x coordinate value. |
| y | <code>number</code> | The initial y coordinate value. |

<a name="SmilesDrawer.Vector2+clone"></a>

#### vector2.clone() ⇒ <code>Vector2</code>
Clones this vector and returns the clone.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - The clone of this vector.  
<a name="SmilesDrawer.Vector2+toString"></a>

#### vector2.toString() ⇒ <code>string</code>
Returns a string representation of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>string</code> - A string representation of this vector.  
<a name="SmilesDrawer.Vector2+add"></a>

#### vector2.add(vec) ⇒ <code>Vector2</code>
Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |

<a name="SmilesDrawer.Vector2+subtract"></a>

#### vector2.subtract(vec) ⇒ <code>Vector2</code>
Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |

<a name="SmilesDrawer.Vector2+divide"></a>

#### vector2.divide(scalar) ⇒ <code>Vector2</code>
Divide the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar. |

<a name="SmilesDrawer.Vector2+multiply"></a>

#### vector2.multiply(v) ⇒ <code>Vector2</code>
Multiply the x and y coordinate values of this vector by the values of another vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>Vector2</code> | A vector. |

<a name="SmilesDrawer.Vector2+multiplyScalar"></a>

#### vector2.multiplyScalar(scalar) ⇒ <code>Vector2</code>
Multiply the x and y coordinate values of this vector by a scalar.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar. |

<a name="SmilesDrawer.Vector2+invert"></a>

#### vector2.invert() ⇒ <code>Vector2</code>
Inverts this vector. Same as multiply(-1.0).

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  
<a name="SmilesDrawer.Vector2+angle"></a>

#### vector2.angle() ⇒ <code>number</code>
Returns the angle of this vector in relation to the coordinate system.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The angle in radians.  
<a name="SmilesDrawer.Vector2+distance"></a>

#### vector2.distance(vec) ⇒ <code>number</code>
Returns the euclidean distance between this vector and another vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The euclidean distance between the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | A vector. |

<a name="SmilesDrawer.Vector2+distanceSq"></a>

#### vector2.distanceSq(vec) ⇒ <code>number</code>
Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The squared euclidean distance of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |

<a name="SmilesDrawer.Vector2+clockwise"></a>

#### vector2.clockwise(vec) ⇒ <code>number</code>
Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |

<a name="SmilesDrawer.Vector2+rotate"></a>

#### vector2.rotate(angle) ⇒ <code>Vector2</code>
Rotates this vector by a given number of radians around the origin of the coordinate system.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle in radians to rotate the vector. |

<a name="SmilesDrawer.Vector2+rotateAround"></a>

#### vector2.rotateAround(angle, vec) ⇒ <code>Vector2</code>
Rotates this vector around another vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle in radians to rotate the vector. |
| vec | <code>Vector2</code> | The vector which is used as the rotational center. |

<a name="SmilesDrawer.Vector2+rotateTo"></a>

#### vector2.rotateTo(vec, center, [offsetAngle]) ⇒ <code>Vector2</code>
Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vec | <code>Vector2</code> |  | The vector to rotate this vector to. |
| center | <code>Vector2</code> |  | The rotational center. |
| [offsetAngle] | <code>number</code> | <code>0.0</code> | An additional amount of radians to rotate the vector. |

<a name="SmilesDrawer.Vector2+rotateAwayFrom"></a>

#### vector2.rotateAwayFrom(vec, center, angle)
Rotates the vector away from a specified vector around a center.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | The vector this one is rotated away from. |
| center | <code>Vector2</code> | The rotational center. |
| angle | <code>number</code> | The angle by which to rotate. |

<a name="SmilesDrawer.Vector2+getRotateAwayFromAngle"></a>

#### vector2.getRotateAwayFromAngle(vec, center, angle) ⇒ <code>number</code>
Returns the angle in radians used to rotate this vector away from a given vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | The vector this one is rotated away from. |
| center | <code>Vector2</code> | The rotational center. |
| angle | <code>number</code> | The angle by which to rotate. |

<a name="SmilesDrawer.Vector2+getRotateTowardsAngle"></a>

#### vector2.getRotateTowardsAngle(vec, center, angle) ⇒ <code>number</code>
Returns the angle in radians used to rotate this vector towards a given vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | The vector this one is rotated towards to. |
| center | <code>Vector2</code> | The rotational center. |
| angle | <code>number</code> | The angle by which to rotate. |

<a name="SmilesDrawer.Vector2+getRotateToAngle"></a>

#### vector2.getRotateToAngle(vec, center) ⇒ <code>number</code>
Gets the angles between this vector and another vector around a common center of rotation.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The angle between this vector and another vector around a center of rotation in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | Another vector. |
| center | <code>Vector2</code> | The center of rotation. |

<a name="SmilesDrawer.Vector2+isInPolygon"></a>

#### vector2.isInPolygon(polygon) ⇒ <code>boolean</code>
Checks whether a vector lies within a polygon spanned by a set of vectors.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this vector is within a polygon.  

| Param | Type | Description |
| --- | --- | --- |
| polygon | <code>array</code> | An array of vectors spanning the polygon. |

<a name="SmilesDrawer.Vector2+length"></a>

#### vector2.length() ⇒ <code>number</code>
Returns the length of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The length of this vector.  
<a name="SmilesDrawer.Vector2+normalize"></a>

#### vector2.normalize() ⇒ <code>Vector2</code>
Normalizes this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns itself.  
<a name="SmilesDrawer.Vector2+normalized"></a>

#### vector2.normalized() ⇒ <code>Vector2</code>
Returns a normalized copy of this vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - A normalized copy of this vector.  
<a name="SmilesDrawer.Vector2+whichSide"></a>

#### vector2.whichSide(vecA, vecB) ⇒ <code>number</code>
Calculates which side of a line spanned by two vectors this vector is.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - A number indicating the side of this vector, given a line spanned by two other vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |

<a name="SmilesDrawer.Vector2+sameSideAs"></a>

#### vector2.sameSideAs(vecA, vecB, vecC) ⇒ <code>boolean</code>
Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.

**Kind**: instance method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>boolean</code> - Returns a boolean indicating whether or not this vector is on the same side as another vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector spanning the line. |
| vecB | <code>Vector2</code> | A vector spanning the line. |
| vecC | <code>Vector2</code> | A vector to check whether or not it is on the same side as this vector. |

<a name="SmilesDrawer.Vector2.add"></a>

#### Vector2.add(vecA, vecB) ⇒ <code>Vector2</code>
Adds two vectors and returns the result as a new vector.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns the sum of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A summand. |
| vecB | <code>Vector2</code> | A summand. |

<a name="SmilesDrawer.Vector2.subtract"></a>

#### Vector2.subtract(vecA, vecB) ⇒ <code>Vector2</code>
Subtracts one vector from another and returns the result as a new vector.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns the difference of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | The minuend. |
| vecB | <code>Vector2</code> | The subtrahend. |

<a name="SmilesDrawer.Vector2.multiply"></a>

#### Vector2.multiply(vecA, vecB) ⇒ <code>Vector2</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |

<a name="SmilesDrawer.Vector2.multiplyScalar"></a>

#### Vector2.multiplyScalar(vec, scalar) ⇒ <code>Vector2</code>
Multiplies two vectors (value by value) and returns the result.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - Returns the product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vector2</code> | A vector. |
| scalar | <code>number</code> | A scalar. |

<a name="SmilesDrawer.Vector2.midpoint"></a>

#### Vector2.midpoint(vecA, vecB) ⇒ <code>Vector2</code>
Returns the midpoint of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - The midpoint of the line spanned by two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector spanning the line. |
| vecB | <code>Vector2</code> | A vector spanning the line. |

<a name="SmilesDrawer.Vector2.normals"></a>

#### Vector2.normals(vecA, vecB) ⇒ <code>array</code>
Returns the normals of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>array</code> - An array containing the two normals, each represented by a vector.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector spanning the line. |
| vecB | <code>Vector2</code> | A vector spanning the line. |

<a name="SmilesDrawer.Vector2.units"></a>

#### Vector2.units(vecA, vecB) ⇒ <code>array</code>
Returns the unit (normalized normal) vectors of a line spanned by two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>array</code> - An array containing the two unit vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector spanning the line. |
| vecB | <code>Vector2</code> | A vector spanning the line. |

<a name="SmilesDrawer.Vector2.divide"></a>

#### Vector2.divide(vecA, vecB) ⇒ <code>Vector2</code>
Divides a vector by another vector and returns the result as new vector.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>Vector2</code> - The fraction of the two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | The dividend. |
| vecB | <code>Vector2</code> | The divisor. |

<a name="SmilesDrawer.Vector2.dot"></a>

#### Vector2.dot(vecA, vecB) ⇒ <code>number</code>
Returns the dot product of two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The dot product of two vectors.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |

<a name="SmilesDrawer.Vector2.angle"></a>

#### Vector2.angle(vecA, vecB) ⇒ <code>number</code>
Returns the angle between two vectors.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The angle between two vectors in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |

<a name="SmilesDrawer.Vector2.threePointangle"></a>

#### Vector2.threePointangle(vecA, vecB, vecC) ⇒ <code>number</code>
Returns the angle between two vectors based on a third vector in between.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | A vector. |
| vecB | <code>Vector2</code> | A vector. |
| vecC | <code>Vector2</code> | A vector. |

<a name="SmilesDrawer.Vector2.scalarProjection"></a>

#### Vector2.scalarProjection(vecA, vecB) ⇒ <code>number</code>
Returns the scalar projection of a vector on another vector.

**Kind**: static method of <code>[Vector2](#SmilesDrawer.Vector2)</code>  
**Returns**: <code>number</code> - The scalar component.  

| Param | Type | Description |
| --- | --- | --- |
| vecA | <code>Vector2</code> | Thecreate jsdoc babel vector to be projected. |
| vecB | <code>Vector2</code> | The vector to be projection upon. |

<a name="SmilesDrawer.Vertex"></a>

### SmilesDrawer.Vertex
A class representing a vertex

**Kind**: static class of <code>[SmilesDrawer](#SmilesDrawer)</code>  

* [.Vertex](#SmilesDrawer.Vertex)
    * [new SmilesDrawer.Vertex(value, [x], [y])](#new_SmilesDrawer.Vertex_new)
    * [.setPosition(x, y)](#SmilesDrawer.Vertex+setPosition)
    * [.setPositionFromVector(v)](#SmilesDrawer.Vertex+setPositionFromVector)
    * [.addChild(vertexID)](#SmilesDrawer.Vertex+addChild)
    * [.setParentVertexId(parentVertexId)](#SmilesDrawer.Vertex+setParentVertexId)
    * [.isTerminal()](#SmilesDrawer.Vertex+isTerminal) ⇒ <code>boolean</code>
    * [.clone()](#SmilesDrawer.Vertex+clone) ⇒ <code>Vertex</code>
    * [.equals(vertex)](#SmilesDrawer.Vertex+equals) ⇒ <code>boolean</code>
    * [.getAngle([referenceVector], [returnAsDegrees])](#SmilesDrawer.Vertex+getAngle) ⇒ <code>number</code>
    * [.getTextDirection(vertices)](#SmilesDrawer.Vertex+getTextDirection) ⇒ <code>string</code>
    * [.getNeighbours([vertexId])](#SmilesDrawer.Vertex+getNeighbours) ⇒ <code>array</code>
    * [.getDrawnNeighbours(vertices)](#SmilesDrawer.Vertex+getDrawnNeighbours) ⇒ <code>array</code>
    * [.getNeighbourCount()](#SmilesDrawer.Vertex+getNeighbourCount) ⇒ <code>number</code>
    * [.getCommonNeighbours(vertex)](#SmilesDrawer.Vertex+getCommonNeighbours) ⇒ <code>array</code>
    * [.isNeighbour(vertexId)](#SmilesDrawer.Vertex+isNeighbour) ⇒ <code>boolean</code>
    * [.getSpanningTreeNeighbours([vertexId])](#SmilesDrawer.Vertex+getSpanningTreeNeighbours) ⇒ <code>array</code>
    * [.getNextInRing(vertices, ringId, previousVertexId)](#SmilesDrawer.Vertex+getNextInRing) ⇒ <code>number</code>

<a name="new_SmilesDrawer.Vertex_new"></a>

#### new SmilesDrawer.Vertex(value, [x], [y])
The constructor for the class Vertex.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>\*</code> |  | The value associated with this vertex. |
| [x] | <code>number</code> | <code>0</code> | The initial x coordinate of the positional vector of this vertex. |
| [y] | <code>number</code> | <code>0</code> | The initial y coordinate of the positional vector of this vertex. |

<a name="SmilesDrawer.Vertex+setPosition"></a>

#### vertex.setPosition(x, y)
Set the 2D coordinates of the vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x component of the coordinates. |
| y | <code>number</code> | The y component of the coordinates. |

<a name="SmilesDrawer.Vertex+setPositionFromVector"></a>

#### vertex.setPositionFromVector(v)
Set the 2D coordinates of the vertex from a Vector2.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>Vector2</code> | A 2D vector. |

<a name="SmilesDrawer.Vertex+addChild"></a>

#### vertex.addChild(vertexID)
Add a child vertex id to this vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vertexID | <code>number</code> | The id of a vertex to be added as a child to this vertex. |

<a name="SmilesDrawer.Vertex+setParentVertexId"></a>

#### vertex.setParentVertexId(parentVertexId)
Set the vertex id of the parent.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  

| Param | Type | Description |
| --- | --- | --- |
| parentVertexId | <code>number</code> | The parents vertex id. |

<a name="SmilesDrawer.Vertex+isTerminal"></a>

#### vertex.isTerminal() ⇒ <code>boolean</code>
Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not this vertex is terminal.  
<a name="SmilesDrawer.Vertex+clone"></a>

#### vertex.clone() ⇒ <code>Vertex</code>
Clones this vertex and returns the clone.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>Vertex</code> - A clone of this vertex.  
<a name="SmilesDrawer.Vertex+equals"></a>

#### vertex.equals(vertex) ⇒ <code>boolean</code>
Returns true if this vertex and the supplied vertex both have the same id, else returns false.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the two vertices have the same id.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | The vertex to check. |

<a name="SmilesDrawer.Vertex+getAngle"></a>

#### vertex.getAngle([referenceVector], [returnAsDegrees]) ⇒ <code>number</code>
Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>number</code> - The angle of this vertex.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [referenceVector] | <code>Vertex</code> | <code></code> | The refernece vector. |
| [returnAsDegrees] | <code>boolean</code> | <code>false</code> | If true, returns angle in degrees, else in radians. |

<a name="SmilesDrawer.Vertex+getTextDirection"></a>

#### vertex.getTextDirection(vertices) ⇒ <code>string</code>
Returns the suggested text direction when text is added at the position of this vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>string</code> - The suggested direction of the text.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | The array of vertices for the current molecule. |

<a name="SmilesDrawer.Vertex+getNeighbours"></a>

#### vertex.getNeighbours([vertexId]) ⇒ <code>array</code>
Returns an array of ids of neighbouring vertices.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>array</code> - An array containing the ids of neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>number</code> | <code></code> | If a value is supplied, the vertex with this id is excluded from the returned indices. |

<a name="SmilesDrawer.Vertex+getDrawnNeighbours"></a>

#### vertex.getDrawnNeighbours(vertices) ⇒ <code>array</code>
Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>array</code> - An array containing the ids of neighbouring vertices that will be drawn.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | An array containing the vertices associated with the current molecule. |

<a name="SmilesDrawer.Vertex+getNeighbourCount"></a>

#### vertex.getNeighbourCount() ⇒ <code>number</code>
Returns the number of neighbours of this vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>number</code> - The number of neighbours.  
<a name="SmilesDrawer.Vertex+getCommonNeighbours"></a>

#### vertex.getCommonNeighbours(vertex) ⇒ <code>array</code>
Gets the common neighbours of this and another vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>array</code> - An array containing common neighbours.  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>Vertex</code> | The vertex to check for common neighbours. |

<a name="SmilesDrawer.Vertex+isNeighbour"></a>

#### vertex.isNeighbour(vertexId) ⇒ <code>boolean</code>
Checks whether or not a vertex is a neighbour of this vertex.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>boolean</code> - A boolean indicating whether or not the two vertices are neighbours.  

| Param | Type | Description |
| --- | --- | --- |
| vertexId | <code>number</code> | The id of the vertex to check if it is a neighbour of this vertex. |

<a name="SmilesDrawer.Vertex+getSpanningTreeNeighbours"></a>

#### vertex.getSpanningTreeNeighbours([vertexId]) ⇒ <code>array</code>
Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>array</code> - An array containing the ids of the neighbouring vertices.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [vertexId] | <code>number</code> | <code></code> | If supplied, the vertex with this id is excluded from the array returned. |

<a name="SmilesDrawer.Vertex+getNextInRing"></a>

#### vertex.getNextInRing(vertices, ringId, previousVertexId) ⇒ <code>number</code>
Gets the next vertex in the ring in opposide direction to the supplied vertex id.

**Kind**: instance method of <code>[Vertex](#SmilesDrawer.Vertex)</code>  
**Returns**: <code>number</code> - The id of the next vertex in the ring.  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>array</code> | The array of vertices for the current molecule. |
| ringId | <code>number</code> | The id of the ring containing this vertex. |
| previousVertexId | <code>number</code> | The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex. |

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


* * *
