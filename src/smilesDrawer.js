function SmilesDrawer() {
    this.width = 800;
    this.height = 500;
    this.ringIdCounter = 0;
    this.ringConnectionIdCounter = 0;

    this.canvas;
    this.ctx;
    this.drawingWidth = 0.0;
    this.drawingHeight = 0.0;
    this.offsetX = 0.0;
    this.offsetY = 0.0;

    this.colors = {
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
        BACKGROUND: '#141414'
    }
}

SmilesDrawer.prototype.draw = function (data, targetId, infoOnly) {
    this.data = data;
    this.canvas = document.getElementById(targetId);
    this.ctx = this.canvas.getContext('2d');

    this.ringIdCounter = 0;
    this.ringConnectionIdCounter = 0;

    this.vertices = [];
    this.edges = [];
    this.rings = [];
    this.ringConnections = [];

    this.backupVertices = [];
    this.backupRings = [];

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight)

    this.createVertices(data, null);

    this.discoverRings();

    /*
    console.log(this.rings);
    console.log(this.ringConnections);
    console.log(this.vertices);
    */

    if (!infoOnly) {

        this.position();
        var overlapScore = this.getOverlapScore();

        var count = 0;
        while (overlapScore.total > this.settings.bondLength / 2.0 && count < 10) {
            // this.settings.defaultDir = -this.settings.defaultDir;
            this.clearPositions();
            this.position();

            var newOverlapScore = this.getOverlapScore();

            if (newOverlapScore.total < overlapScore.total) {
                overlapScore = newOverlapScore;
            } else {
                this.restorePositions();
            }

            // Restore default
            // this.settings.defaultDir = -this.settings.defaultDir;

            count++;
        }

        this.resolveSecondaryOverlaps(overlapScore.scores);

        // Figure out the final size of the image
        var max = { x: -Number.MAX_VALUE, y: -Number.MAX_VALUE };
        var min = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };

        for (var i = 0; i < this.vertices.length; i++) {
            var p = this.vertices[i].position;
            if(max.x < p.x) max.x = p.x;
            if(max.y < p.y) max.y = p.y;
            if(min.x > p.x) min.x = p.x;
            if(min.y > p.y) min.y = p.y;
        }

        // Add padding
        var padding = 20.0;
        max.x += padding;
        max.y += padding;
        min.x -= padding;
        min.y -= padding;

        this.drawingWidth = max.x - min.x;
        this.drawingHeight = max.y - min.y;

        var scaleX = this.canvas.offsetWidth / this.drawingWidth;
        var scaleY = this.canvas.offsetHeight / this.drawingHeight;

        var scale = (scaleX < scaleY) ? scaleX : scaleY;

        this.ctx.scale(scale, scale);

        this.offsetX = -min.x;
        this.offsetY = -min.y;

        // Do the actual drawing
        this.drawEdges();
        this.drawVertices(this.settings.debug);

        // Reset the canvas context (especially the scale)
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

SmilesDrawer.prototype.settings = {
    shortBondLength: 20, // 25,
    bondLength: 25, // 30,
    bondSpacing: 4,
    defaultDir: -1,
    debug: false
};

SmilesDrawer.prototype.getBridgedRings = function () {
    var tmp = [];

    for (var i = 0; i < this.rings.length; i++)
        if (this.rings[i].isBridged) tmp.push(this.rings[i]);

    return tmp;
}

SmilesDrawer.prototype.getFusedRings = function () {
    var tmp = [];

    for (var i = 0; i < this.rings.length; i++)
        if (this.rings[i].isFused) tmp.push(this.rings[i]);

    return tmp;
}

SmilesDrawer.prototype.getSpiros = function () {
    var tmp = [];

    for (var i = 0; i < this.rings.length; i++)
        if (this.rings[i].isSpiro) tmp.push(this.rings[i]);
    SmilesDrawer.prototype.ringIdCounter = 0;
    return tmp;
}

SmilesDrawer.prototype.printRingInfo = function (id) {
    var result = '';
    for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];
        result += id ? id + ';' : '';
        result += ring.members.length + ';';
        result += ring.neighbours.length + ';';
        result += ring.isSpiro ? 'true;' : 'false;'
        result += ring.isFused ? 'true;' : 'false;'
        result += ring.isBridged ? 'true;' : 'false;'
        result += ring.rings.length + ';';
        result += ring.insiders.length + ';';
        result += '\n';
    }

    return result;
}

SmilesDrawer.prototype.createVertices = function (node, parentId, branch) {
    // Create a new vertex object
    // console.log(node);
    var atom = new Atom(node.atom.element ? node.atom.element : node.atom);
    atom.bond = node.bond;
    atom.branchBond = node.branchBond;
    atom.ringbonds = node.ringbonds;
    atom.bracket = node.atom.element ? node.atom : null;


    var vertex = new Vertex(atom);
    var parent = this.vertices[parentId];

    vertex.parent = parentId;

    this.addVertex(vertex);

    // Add the id of this node to the parent as child
    if (parentId != null) {
        this.vertices[parentId].children.push(vertex.id);

        // In addition create a spanningTreeChildren property, which later will
        // not contain the children added through ringbonds
        this.vertices[parentId].spanningTreeChildren.push(vertex.id);

        // Add edge between this node and its parent
        var edge = new Edge(parentId, vertex.id, 1);
        if (branch) {
            edge.bond = vertex.value.branchBond;
        } else {
            edge.bond = this.vertices[parentId].value.bond;
        }

        var edgeId = this.addEdge(edge);
        vertex.edges.push(edgeId);
        parent.edges.push(edgeId);
    }


    for (var i = 0; i < node.branchCount; i++) {
        this.createVertices(node.branches[i], vertex.id, true);
    }

    if (node.hasNext) {
        this.createVertices(node.next, vertex.id);

        // Set the frist node to terminal as well
        if (parentId === null && atom.ringbonds.length == 0)
            atom.isTerminal = true;
    } else if (atom.ringbonds.length == 0) {
        atom.isTerminal = true;
    }
}

SmilesDrawer.prototype.matchRingBonds = function (vertexA, vertexB) {
    // Checks whether the two vertices are the ones connecting the ring
    // and what the bond type should be.
    if (vertexA.value.getRingbondCount() < 1 || vertexB.value.getRingbondCount() < 1)
        return null;

    for (var i = 0; i < vertexA.value.ringbonds.length; i++) {
        for (var j = 0; j < vertexB.value.ringbonds.length; j++) {
            // if(i != j) continue;
            if (vertexA.value.ringbonds[i].id == vertexB.value.ringbonds[j].id) {
                // If the bonds are equal, it doesn't matter which bond is returned.
                // if they are not equal, return the one that is not the default ("-")
                if (vertexA.value.ringbonds[i].bond == '-')
                    return vertexB.value.ringbonds[j].bond;
                else
                    return vertexA.value.ringbonds[i].bond;
            }
        }
    }

    return null;
}

SmilesDrawer.prototype.hasRingWithoutTarget = function (ringbond) {
    for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];
        if (ring.ringbond == ringbond && !ring.hasTarget()) return true;
    }

    return false;
}

SmilesDrawer.prototype.getRingWithoutTarget = function (ringbond) {
    for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];
        if (ring.ringbond == ringbond && !ring.hasTarget()) return ring;
    }
}

SmilesDrawer.prototype.discoverRings = function () {
    var openBonds = {};
    var that = this;
    var ringId = 0;

    for (var i = this.vertices.length - 1; i >= 0; i--) {
        var vertex = this.vertices[i];
        if (vertex.value.ringbonds.length === 0) continue;

        for (var r = 0; r < vertex.value.ringbonds.length; r++) {
            var ringbondId = vertex.value.ringbonds[r].id;
            if (openBonds[ringbondId] === undefined) {
                openBonds[ringbondId] = vertex.id;
            } else {
                var target = openBonds[ringbondId];
                var source = vertex.id;

                var edgeId = that.addEdge(new Edge(source, target, 1));
                that.vertices[source].children.push(target);
                that.vertices[target].children.push(source);

                that.vertices[source].edges.push(edgeId);
                that.vertices[target].edges.push(edgeId);

                var ring = new Ring(ringbondId, source, target);
                that.addRing(ring);

                // Annotate the ring (add ring members to ring and rings to vertices)
                var path = that.annotateRing(ring.id, ring.source, ring.target);

                for (var j = 0; j < path.length; j++) {
                    ring.members.push(path[j]);
                    that.vertices[path[j]].value.rings.push(ring.id);
                }
                openBonds[ringbondId] = undefined;
            }
        }
    }

    // Find connection between rings
    // Check for common vertices and create ring connections. This is a bit
    // ugly, but the ringcount is always fairly low (< 100)
    for (var i = 0; i < this.rings.length - 1; i++) {
        for (var j = i + 1; j < this.rings.length; j++) {
            var a = this.rings[i];
            var b = this.rings[j];

            var ringConnection = new RingConnection(a.id, b.id);

            for (var m = 0; m < a.members.length; m++) {
                for (var n = 0; n < b.members.length; n++) {
                    var c = a.members[m];
                    var d = b.members[n];

                    if (c === d) {
                        ringConnection.addVertex(c);
                    }
                }
            }

            // If there are no vertices in the ring connection, then there
            // is no ring connection
            if (ringConnection.vertices.length > 0) {
                this.addRingConnection(ringConnection);
            }
        }
    }

    // Add neighbours to the rings
    for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];
        ring.neighbours = RingConnection.getNeighbours(this.ringConnections, ring.id);
    }

    // Replace rings contained by a larger bridged ring with a bridged ring
    while (this.rings.length > 0) {
        // Gets stuck with this: C1C2CC3CCCC4C1C2C34 and C1C2C3CC123
        // somethings wrong with isPartOfBridgedRing
        var id = -1;
        for (var i = 0; i < this.rings.length; i++) {
            var ring = this.rings[i];

            if (this.isPartOfBridgedRing(ring.id)) {
                id = ring.id;
            }
        }

        if (id === -1) break;

        var ring = this.rings[id];

        var involvedRings = this.getBridgedRingRings(ring.id);

        this.createBridgedRing(involvedRings, ring.source);

        // Remove the rings
        for (var i = 0; i < involvedRings.length; i++) {
            this.removeRing(involvedRings[i]);
        }
    }
}

/**
 * Returns all rings that are connected by bridged bonds
 **/
SmilesDrawer.prototype.getBridgedRingRings = function (id) {
    var involvedRings = new Array();
    var that = this;

    var recurse = function (r) {
        var ring = that.rings[r];
        for (var i = 0; i < ring.neighbours.length; i++) {
            var n = ring.neighbours[i];
            if (involvedRings.indexOf(n) === -1 &&
                RingConnection.isBridge(that.ringConnections, r, n)) {
                involvedRings.push(n);
                recurse(n);
            }
        }
    };

    recurse(id);

    return ArrayHelper.unique(involvedRings);
}

SmilesDrawer.prototype.isPartOfBridgedRing = function (ring) {
    for (var i = 0; i < this.ringConnections.length; i++) {
        if (this.ringConnections[i].rings.contains(ring) &&
            this.ringConnections[i].isBridge()) {
            return true;
        }
    }

    return false;
}

SmilesDrawer.prototype.createBridgedRing = function (rings, start) {
    var bridgedRing = new Array();
    var vertices = new Array();
    var neighbours = new Array();
    var ringConnections = new Array();

    for (var i = 0; i < rings.length; i++) {
        var ring = this.getRing(rings[i]);
        for (var j = 0; j < ring.members.length; j++) {
            vertices.push(ring.members[j]);
        }
        for (var j = 0; j < ring.neighbours.length; j++) {
            neighbours.push(ring.neighbours[j]);
        }
    }

    // Remove duplicates
    vertices = ArrayHelper.unique(vertices);

    // A vertex is part of the bridged ring if it only belongs to
    // one of the rings (or to another ring
    // which is not part of the bridged ring).
    var leftovers = new Array();
    for (var i = 0; i < vertices.length; i++) {
        var vertex = this.vertices[vertices[i]];

        var intersection = ArrayHelper.intersection(rings, vertex.value.rings);
        if (vertex.value.rings.length == 1 || intersection.length == 1) {

            bridgedRing.push(vertex.id);
        } else {
            leftovers.push(vertex.id);
        }
    }

    // Vertices can also be part of multiple rings and lay on the bridged ring,
    // however, they have to have at least two neighbours that are not part of
    // two rings
    var tmp = new Array();
    var insideRing = new Array();
    for (var i = 0; i < leftovers.length; i++) {
        var vertex = this.vertices[leftovers[i]];

        if (ArrayHelper.intersection(vertex.getNeighbours(), bridgedRing).length > 1) {
            vertex.value.isBridgeNode = true;
            tmp.push(vertex.id);
        } else {
            vertex.value.isBridge = true;
            insideRing.push(vertex.id);
        }
    }

    // Merge the two arrays containing members of the bridged ring
    var ringMembers = ArrayHelper.merge(bridgedRing, tmp)

    // The neighbours of the rings in the bridged ring that are not connected by a
    // bridge are now the neighbours of the bridged ring
    neighbours = ArrayHelper.unique(neighbours);
    neighbours = ArrayHelper.removeAll(neighbours, rings);

    // The source vertex is the start vertex. The target vertex has to be a member
    // of the birdged ring and a neighbour of the start vertex
    var source = this.vertices[start];
    var sourceNeighbours = source.getNeighbours();
    var target = null;

    for (var i = 0; i < sourceNeighbours.length; i++) {
        var n = sourceNeighbours[i];
        if (ringMembers.indexOf(n) !== -1)
            target = n;
    }

    // Create the ring
    var ring = new Ring(-1, start, target);
    ring.isBridged = true;
    ring.members = ringMembers;
    ring.neighbours = neighbours;
    ring.insiders = insideRing;
    ring.rings = rings;
    this.addRing(ring);

    // Atoms inside the ring are no longer part of a ring but are now
    // associated with the bridged ring
    for (var i = 0; i < insideRing.length; i++) {
        var vertex = this.vertices[insideRing[i]];
        vertex.value.rings = new Array();
        vertex.value.bridgedRing = ring.id;
    }

    // Remove former rings from members of the bridged ring and add the bridged ring
    for (var i = 0; i < ringMembers.length; i++) {
        var vertex = this.vertices[ringMembers[i]];
        vertex.value.rings = ArrayHelper.removeAll(vertex.value.rings, rings);
        vertex.value.rings.push(ring.id);
    }

    // Remove all the ring connections no longer used
    for (var i = 0; i < rings.length; i++) {
        for (var j = i + 1; j < rings.length; j++) {
            this.removeRingConnectionBetween(rings[i], rings[j]);
        }
    }

    // Update the ring connections
    for (var i = 0; i < neighbours.length; i++) {
        var connections = this.getRingConnections(neighbours[i], rings);
        for (var j = 0; j < connections.length; j++) {
            this.getRingConnection(connections[j]).updateOther(ring.id, neighbours[i]);
        }
    }
    
    return ring;
}

SmilesDrawer.prototype.ringCounter = function (node, rings) {
    for (var i = 0; i < node.getRingbondCount(); i++) {
        var ring = node.ringbonds[i].id;
        if (!this.arrayContains(rings, {
                value: ring
            })) rings.push(ring);
    }

    for (var i = 0; i < node.branchCount; i++) {
        this.ringCounter(node.branches[i], rings);
    }

    if (node.hasNext) {
        this.ringCounter(node.next, rings);
    }

    return rings;
}

SmilesDrawer.prototype.annotateRing = function (ring, source, target) {
    var prev = this.dijkstra(source, target);

    // Backtrack from target to source
    var tmp = [];
    var path = [];
    var u = target;

    while (u != null) {
        tmp.push(u);
        u = prev[u];
    }

    // Reverse the backtrack path to get forward path
    for (var i = tmp.length - 1; i >= 0; i--) {
        path.push(tmp[i]);
    }

    return path;
}

SmilesDrawer.prototype.dijkstra = function (source, target) {
    // First initialize q which contains all the vertices
    // including their neighbours, their id and a visited boolean
    var prev = new Array(this.vertices.length);
    var dist = new Array(this.vertices.length);
    var visited = new Array(this.vertices.length);
    var neighbours = new Array(this.vertices.length);

    // Initialize arrays for the algorithm
    for (var i = 0; i < this.vertices.length; i++) {
        dist[i] = i == source ? 0 : Number.MAX_VALUE;
        prev[i] = null;
        visited[i] = false;
        neighbours[i] = this.vertices[i].getNeighbours();
    }

    // Dijkstras alogrithm
    while (ArrayHelper.count(visited, false) > 0) {
        var u = this.getMinDist(dist, visited);

        // if u is the target, we're done
        if (u == target)
            return prev;

        visited[u] = true; // this "removes" the node from q

        for (var i = 0; i < neighbours[u].length; i++) {
            var v = neighbours[u][i];
            var tmp = dist[u] + this.getEdgeWeight(u, v);

            // Do not move directly from the source to the target
            // this should never happen, so just continue
            if (u == source && v == target || u == target && v == source)
                continue;

            if (tmp < dist[v]) {
                dist[v] = tmp;
                prev[v] = u;
            }
        }
    }
}

SmilesDrawer.prototype.areVerticesInSameRing = function (vertexA, vertexB) {
    // This is a little bit lighter (without the array and push) than
    // getCommonRings().length > 0
    for (var i = 0; i < vertexA.value.rings.length; i++) {
        for (var j = 0; j < vertexB.value.rings.length; j++) {
            if (vertexA.value.rings[i] == vertexB.value.rings[j]) return true;
        }
    }

    return false;
}

SmilesDrawer.prototype.getCommonRings = function (vertexA, vertexB) {
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

SmilesDrawer.prototype.getSmallestCommonRing = function (vertexA, vertexB) {
    var commonRings = this.getCommonRings(vertexA, vertexB);
    var minSize = Number.MAX_VALUE;
    var smallestCommonRing = null;

    for (var i = 0; i < commonRings.length; i++) {
        var size = this.getRing(commonRings[i]).size();
        if (size < minSize) {
            minSize = size;
            smallestCommonRing = this.getRing(commonRings[i]);
        }
    }

    return smallestCommonRing;
}

SmilesDrawer.prototype.getLargestCommonRing = function (vertexA, vertexB) {
    var commonRings = this.getCommonRings(vertexA, vertexB);
    var maxSize = 0;
    var largestCommonRing = null;

    for (var i = 0; i < commonRings.length; i++) {
        var size = this.getRing(commonRings[i]).size();
        if (size > maxSize) {
            maxSize = size;
            largestCommonRing = this.getRing(commonRings[i]);
        }
    }

    return largestCommonRing;
}

SmilesDrawer.prototype.getMinDist = function (dist, visited) {
    var min = Number.MAX_VALUE;
    var v = null;

    for (var i = 0; i < dist.length; i++) {
        if (visited[i]) continue;
        if (dist[i] < min) {
            v = i;
            min = dist[v];
        }
    }

    return v;
}

SmilesDrawer.prototype.getEdgeWeight = function (a, b) {
    for (var i = 0; i < this.edges.length; i++) {
        var edge = this.edges[i];
        if (edge.source == a && edge.target == b || edge.target == a && edge.source == b) {
            return edge.weight;
        }
    }
}

SmilesDrawer.prototype.addVertex = function (vertex) {
    var id = this.vertices.length;
    vertex.id = id;
    this.vertices.push(vertex);
    return id;
}

SmilesDrawer.prototype.getVerticesAt = function (position, radius, exclude) {
    var locals = new Array();

    for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        if (vertex.id === exclude || !vertex.positioned) continue;

        var distance = position.distance(vertex.position);
        if (distance <= radius) {
            locals.push(vertex.id);
        }
    }

    return locals;
}

SmilesDrawer.prototype.getBranch = function (vertex, previous) {
    var vertices = new Array();
    var rings = new Array();

    var that = this;
    var recurse = function (v, p) {
        var vertex = that.vertices[v];
        for (var i = 0; i < vertex.value.rings.length; i++) {
            rings.push(vertex.value.rings[i]);
        }

        for (var i = 0; i < vertex.children.length; i++) {
            var child = vertex.children[i];
            if (child !== p && !ArrayHelper.contains(vertices, {
                    value: child
                })) {
                vertices.push(child);
                recurse(child, v);
            }
        }

        var parent = vertex.parent;
        if (parent !== p && parent !== null && !ArrayHelper.contains(vertices, {
                value: parent
            })) {
            vertices.push(parent);
            recurse(parent, v);
        }
    }

    vertices.push(vertex);
    recurse(vertex, previous);

    return {
        vertices: vertices,
        rings: ArrayHelper.unique(rings)
    };
}

SmilesDrawer.prototype.addEdge = function (edge) {
    var id = this.edges.length;
    edge.id = id;
    this.edges.push(edge);
    return id;
}

SmilesDrawer.prototype.addRing = function (ring) {
    ring.id = this.ringIdCounter++;
    this.rings.push(ring);
    return ring.id;
}

SmilesDrawer.prototype.removeRing = function (ring) {
    this.rings = this.rings.filter(function (item) {
        return item.id !== ring;
    });

    // Also remove ring connections involving this ring
    this.ringConnections = this.ringConnections.filter(function (item) {
        return item.rings.first !== ring && item.rings.second !== ring;
    });

    // Remove the ring as neighbour of other rings
    for (var i = 0; i < this.rings.length; i++) {
        var r = this.rings[i];
        r.neighbours = r.neighbours.filter(function (item) {
            return item !== ring;
        });
    }
}

SmilesDrawer.prototype.getRing = function (id) {
    for (var i = 0; i < this.rings.length; i++) {
        if (this.rings[i].id == id) return this.rings[i];
    }
}

SmilesDrawer.prototype.addRingConnection = function (ringConnection) {
    ringConnection.id = this.ringConnectionIdCounter++;
    this.ringConnections.push(ringConnection);
    return ringConnection.id;
}

SmilesDrawer.prototype.removeRingConnection = function (ringConnection) {
    this.ringConnections = this.ringConnections.filter(function (item) {
        return item.id !== ringConnection;
    });
}

SmilesDrawer.prototype.removeRingConnectionBetween = function (a, b) {
    var toRemove = new Array();
    for (var i = 0; i < this.ringConnections.length; i++) {
        var ringConnection = this.ringConnections[i];

        if (ringConnection.rings.first === a && ringConnection.rings.second === b ||
            ringConnection.rings.first === b && ringConnection.rings.second === a) {
            toRemove.push(ringConnection.id);
        }
    }

    for (var i = 0; i < toRemove.length; i++) {
        this.removeRingConnection(toRemove[i]);
    }
}


SmilesDrawer.prototype.getRingConnection = function (id) {
    for (var i = 0; i < this.ringConnections.length; i++) {
        if (this.ringConnections[i].id == id) return this.ringConnections[i];
    }
}

SmilesDrawer.prototype.getRingConnections = function (a, b) {
    var ringConnections = new Array();
    if (arguments.length === 1) {
        for (var i = 0; i < this.ringConnections.length; i++) {
            var ringConnection = this.ringConnections[i];
            if (ringConnection.rings.first === a || ringConnection.rings.second === a)
                ringConnections.push(ringConnection.id);
        }
    } else if (b.constructor !== Array) {
        for (var i = 0; i < this.ringConnections.length; i++) {
            var ringConnection = this.ringConnections[i];
            if (ringConnection.rings.first === a && ringConnection.rings.second === b ||
                ringConnection.rings.first === b && ringConnection.rings.second === a) {
                ringConnections.push(ringConnection.id);
            }
        }
    } else {
        for (var i = 0; i < this.ringConnections.length; i++) {
            for (var j = 0; j < b.length; j++) {
                var c = b[j];
                var ringConnection = this.ringConnections[i];
                if (ringConnection.rings.first === a && ringConnection.rings.second === c ||
                    ringConnection.rings.first === c && ringConnection.rings.second === a) {
                    ringConnections.push(ringConnection.id);
                }
            }
        }
    }
    return ringConnections;
}

SmilesDrawer.prototype.getOverlapScore = function () {
    var total = 0.0;
    var overlapScores = new Float32Array(this.vertices.length);
    for (var i = 0; i < this.vertices.length; i++) overlapScores[i] = 0;

    for (var i = 0; i < this.vertices.length; i++) {
        for (var j = i + 1; j < this.vertices.length; j++) {
            var a = this.vertices[i];
            var b = this.vertices[j];

            var dist = Vector2.subtract(a.position, b.position).length();
            if (dist < this.settings.bondLength) {
                var weighted = this.settings.bondLength - dist;
                total += weighted;
                overlapScores[i] += weighted;
                overlapScores[j] += weighted;
            }
        }
    }

    var sortable = [];

    for (var i = 0; i < this.vertices.length; i++) {
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
        scores: sortable
    };
}

SmilesDrawer.prototype.getColor = function(key) {
    if(key in this.colors) return this.colors[key];
    return this.colors['C'];
}

SmilesDrawer.prototype.circle = function (radius, x, y, classes, fill, debug) {
    // Return empty line element for debugging, remove this check later, values should not be NaN
    if (isNaN(x) || isNaN(y))
        return;

    this.ctx.save();
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.arc(x + this.offsetX, y + this.offsetY, radius, 0, Math.PI * 2, true); 
    this.ctx.closePath();

    if(debug) {
        if(fill) {
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fill();
        }
        else {
            this.ctx.strokeStyle = '#ff0000';
            this.ctx.stroke();
        }
    }
    else {
        if(fill) {
        this.ctx.fillStyle = this.colors['C'];
        this.ctx.fill();
        }
        else {
            this.ctx.strokeStyle = this.colors['C'];
            this.ctx.stroke();
        }
    }
    
    
    this.ctx.restore();
}

SmilesDrawer.prototype.line = function (x1, y1, x2, y2, elementA, elementB, classes) {
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2))
        return;

    var line = new Line(new Vector2(x1, y1), new Vector2(x2, y2), elementA, elementB);
    // Add a shadow behind the line
    var shortLine = line.clone().shorten(6.0);

    var l = shortLine.getLeftVector().clone();
    var r = shortLine.getRightVector().clone();

    l.x += this.offsetX;
    l.y += this.offsetY;

    r.x += this.offsetX;
    r.y += this.offsetY;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(l.x, l.y);
    this.ctx.lineTo(r.x, r.y);
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowColor = this.colors['BACKGROUND'];
    this.ctx.shadowBlur = 6.0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.strokeStyle = this.colors['BACKGROUND'];
    this.ctx.stroke();
    this.ctx.restore();

    l = line.getLeftVector().clone();
    r = line.getRightVector().clone();

    l.x += this.offsetX;
    l.y += this.offsetY;

    r.x += this.offsetX;
    r.y += this.offsetY;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(l.x, l.y);
    this.ctx.lineTo(r.x, r.y);
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 1.5;
    var gradient = this.ctx.createLinearGradient(l.x, l.y, r.x, r.y);
    gradient.addColorStop(0.4, this.colors[line.getLeftElement().toUpperCase()] || this.colors['C']);
    gradient.addColorStop(0.6, this.colors[line.getRightElement().toUpperCase()] || this.colors['C']);
    this.ctx.strokeStyle = gradient;
    this.ctx.stroke();
    this.ctx.restore();
}

SmilesDrawer.prototype.debugText = function(x, y, text) {
    this.ctx.save();
    var font = '5px Arial';
    this.ctx.font = font;
    this.ctx.textAlign = 'start';
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillText(text, x + this.offsetX, y + this.offsetY);
    this.ctx.restore();
}

SmilesDrawer.prototype.text = function (x, y, element, classes, background, hydrogen, position, terminal, charge) {
    // Return empty line element for debugging, remove this check later, values should not be NaN
    if (isNaN(x) || isNaN(y))
        return;
    
    this.ctx.save();
    var fontLarge = '10px Arial';
    var fontSmall = '6px Arial';

    this.ctx.textAlign = 'start';
    this.ctx.textBaseline = 'top';

    // Charge
    var chargeWidth = 0;
    if(charge) {
        var chargeText = '+';
        if(charge === 2) chargeText = '2+';
        if(charge === -1) chargeText = '-';
        if(charge === -2) chargeText = '2-';

        this.ctx.font = fontSmall;
        chargeWidth = this.ctx.measureText(chargeText).width;
    }

    this.ctx.font = fontLarge;
    
    this.ctx.fillStyle = this.colors['BACKGROUND'];
    var dim = this.ctx.measureText(element);
    dim.totalWidth = dim.width + chargeWidth;
    dim.height = parseInt(fontLarge, 10);
    var r = (dim.totalWidth > dim.height) ? dim.totalWidth : dim.height;
    r /= 2.0;
    
    this.ctx.beginPath();
    this.ctx.arc(x + this.offsetX, y + this.offsetY + dim.height / 20.0, r + 1.0, 0, Math.PI*2, true); 
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.fillStyle = this.getColor(element.toUpperCase());
    this.ctx.fillText(element, x - dim.totalWidth / 2.0 + this.offsetX, y - dim.height / 2.0 + this.offsetY);

    if(charge) {
        this.ctx.font = fontSmall;
        this.ctx.fillText(chargeText, x - dim.totalWidth / 2.0 + dim.width + this.offsetX, y - dim.height / 2.0 + this.offsetY);
    }


    this.ctx.font = fontLarge;
    
    var hDim = this.ctx.measureText('H');
    hDim.height = parseInt(fontLarge, 10);


    if (hydrogen === 1) {
        var hx = x - dim.totalWidth / 2.0 + this.offsetX,
            hy = y - dim.height / 2.0 + this.offsetY;
        if (position === 'left') hx -= dim.totalWidth;
        if (position === 'right') hx += dim.totalWidth;
        if (position === 'up' && terminal) hx += dim.totalWidth;
        if (position === 'down' && terminal) hx += dim.totalWidth;
        if (position === 'up' && !terminal) hy -= dim.height;
        if (position === 'down' && !terminal) hy += dim.height;

        this.ctx.fillText('H', hx, hy);
    } else if (hydrogen > 1) {
        var hx = x - dim.totalWidth / 2.0 + this.offsetX,
            hy = y - dim.height / 2.0 + this.offsetY;

        this.ctx.font = fontSmall;
        var cDim = this.ctx.measureText(hydrogen);
        cDim.height = parseInt(fontSmall, 10);

        if (position === 'left') hx -= hDim.width + cDim.width;
        if (position === 'right') hx += dim.totalWidth;
        if (position === 'up' && terminal) hx += dim.totalWidth;
        if (position === 'down' && terminal) hx += dim.totalWidth;
        if (position === 'up' && !terminal) hy -= dim.height;
        if (position === 'down' && !terminal) hy += dim.height;

        this.ctx.font = fontLarge;
        this.ctx.fillText('H', hx, hy)

        this.ctx.font = fontSmall;
        this.ctx.fillText(hydrogen, hx + hDim.width, hy + hDim.height / 2.0);
    }

    this.ctx.restore();
}

SmilesDrawer.prototype.drawPoint = function (v, text) {
    this.circle(2, v.x, v.y, 'helper', true, true);

    if (text) {
        this.debugText(v.x, v.y, text, 'id', true);
    }
}

SmilesDrawer.prototype.chooseSide = function (vertexA, vertexB, sides) {
    // Check which side has more vertices
    // Get all the vertices connected to the both ends
    var an = vertexA.getNeighbours(vertexB.id);
    var bn = vertexB.getNeighbours(vertexA.id);
    var anCount = an.length;
    var bnCount = bn.length;

    // All vertices connected to the edge vertexA to vertexB
    var tn = ArrayHelper.merge(an, bn);

    // Only considering the connected vertices
    var sideCount = [0, 0];
    for (var i = 0; i < tn.length; i++) {
        var v = this.vertices[tn[i]].position;
        if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
            sideCount[0]++;
        } else {
            sideCount[1]++;
        }
    }

    // Considering all vertices in the graph, this is to resolve ties
    // from the above side counts
    var totalSideCount = [0, 0];
    for (var i = 0; i < this.vertices.length; i++) {
        var v = this.vertices[i].position;
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

SmilesDrawer.prototype.forceLayout = function (vertices, center, start) {
    // Constants
    var l = this.settings.bondLength;
    var kr = 6000; // repulsive force
    var ks = 1; // spring
    var g = 0.05; // gravity (to center)

    // Place vertices randomly around center
    for (var i = 0; i < vertices.length; i++) {
        var vertex = this.vertices[vertices[i]];
        if (!vertex.positioned) {
            vertex.position.x = center.x + Math.random();
            vertex.position.y = center.y + Math.random();
        } else if (vertex.id !== start) {
            // vertex.positioned = false;
        }
    }

    // Loop
    var forces = {};
    for (var i = 0; i < vertices.length; i++) {
        forces[vertices[i]] = new Vector2();
    }

    for (var n = 0; n < 200; n++) {
        for (var i = 0; i < vertices.length; i++)
            forces[vertices[i]].set(0, 0);

        // Repulsive forces
        for (var u = 0; u < vertices.length - 1; u++) {
            var vertexA = this.vertices[vertices[u]];
            for (var v = u + 1; v < vertices.length; v++) {
                var vertexB = this.vertices[vertices[v]];

                var dx = vertexB.position.x - vertexA.position.x;
                var dy = vertexB.position.y - vertexA.position.y;

                if (dx === 0 || dy === 0) continue;

                var dSq = dx * dx + dy * dy;
                var d = Math.sqrt(dSq);

                var force = kr / dSq;
                var fx = force * dx / d;
                var fy = force * dy / d;

                if (!vertexA.positioned) {
                    forces[vertexA.id].x -= fx;
                    forces[vertexA.id].y -= fy;
                }

                if (!vertexB.positioned) {
                    forces[vertexB.id].x += fx;
                    forces[vertexB.id].y += fy;
                }
            }
        }

        // Attractive forces;

        for (var u = 0; u < vertices.length - 1; u++) {
            var vertexA = this.vertices[vertices[u]];
            for (var v = u + 1; v < vertices.length; v++) {
                var vertexB = this.vertices[vertices[v]];
                if (!vertexA.isNeighbour(vertexB.id)) continue;

                var dx = vertexB.position.x - vertexA.position.x;
                var dy = vertexB.position.y - vertexA.position.y;

                if (dx === 0 || dy === 0) continue;

                var d = Math.sqrt(dx * dx + dy * dy);

                var force = ks * (d - l);
                var fx = force * dx / d;
                var fy = force * dy / d;

                if (!vertexA.positioned) {
                    forces[vertexA.id].x += fx;
                    forces[vertexA.id].y += fy;
                }

                if (!vertexB.positioned) {
                    forces[vertexB.id].x -= fx;
                    forces[vertexB.id].y -= fy;
                }
            }
        }

        // Gravity

        for (var u = 0; u < vertices.length; u++) {
            var vertex = this.vertices[vertices[u]];

            var dx = center.x - vertex.position.x;
            var dy = center.y - vertex.position.y;

            if (dx === 0 || dy === 0) continue;

            var d = Math.sqrt(dx * dx + dy * dy);

            var force = g * d;
            var fx = force * dx / d;
            var fy = force * dy / d;

            if (!vertexA.positioned) {
                forces[vertex.id].x += fx;
                forces[vertex.id].y += fy;
            }
        }

        // Angle forces
        /*
                for(var u = 0; u < vertices.length; u++) {
                    var vertex = this.vertices[vertices[u]];
                    var neighbours = vertex.getNeighbours();
                    if(neighbours.length === 2) {

                        var vertexA = this.vertices[neighbours[0]];
                        var vertexB = this.vertices[neighbours[1]];

                        // The angle between the two vertices / atoms should be
                        // 120°, if it is less, add repulsive force, if it is more
                        // add attractive force

                        var ax = vertex.position.x - vertexA.position.x;
                        var ay = vertex.position.y - vertexA.position.y;

                        var bx = vertex.position.x - vertexB.position.x;
                        var by = vertex.position.y - vertexB.position.y;

                        var cx = vertexA.position.x - vertexB.position.x;
                        var cy = vertexA.position.y - vertexB.position.y;

                        var aSq = ax * ax + ay * ay;
                        var bSq = bx * bx + by * by;
                        var cSq = cx * cx + cy * cy;

                        var angle = Math.acos((aSq + bSq - cSq) / (2.0 * Math.sqrt(aSq) * Math.sqrt(bSq)));
                        // angle = MathHelper.Geom.toDeg(angle);
                        var angleDelta = angle - 2.1; // if negative, angle to small -> repell
                        var absAngleDelta = Math.abs(angleDelta);

                        // The force vector is now a normal to the edge a or b
                        var normalsA = this.getNormals(vertex, vertexA);
                        var normalsB = this.getNormals(vertex, vertexB);


                        // This array cloning is slow as fuck
                        var sidesA = ArrayHelper.clone(normalsA);
                        ArrayHelper.each(sidesA, function(v) {
                            v.add(vertexA.position)
                        });

                        var sidesB = ArrayHelper.clone(normalsB);
                        ArrayHelper.each(sidesB, function(v) {
                            v.add(vertexB.position)
                        });

                        var forceA = normalsA[0];
                        var forceB = normalsB[0];

                        if(angleDelta < 0) {
                            // Repell -> get the normal that points away from the other vertex
                            if(vertexB.position.sameSideAs(vertex.position, vertexA.position, sidesA[0]))
                                forceA = normalsA[1];

                            if(vertexA.position.sameSideAs(vertex.position, vertexB.position, sidesB[0]))
                                forceB = normalsB[1];
                        }
                        else {
                            // Attract
                            if(!vertexB.position.sameSideAs(vertex.position, vertexA.position, sidesA[0]))
                                forceA = normalsA[1];

                            if(!vertexA.position.sameSideAs(vertex.position, vertexB.position, sidesB[0]))
                                forceB = normalsB[1];
                        }


                        forceA.multiply(absAngleDelta * 60);
                        forceB.multiply(absAngleDelta * 60);


                        if(!vertexA.positioned) {
                            forces[vertexA.id].x += forceA.x;
                            forces[vertexA.id].y += forceA.y;
                        }

                        if(!vertexB.positioned) {
                            forces[vertexB.id].x += forceB.x;
                            forces[vertexB.id].y += forceB.y;
                        }

                    }
                }
        */
        // Move the vertex
        for (var u = 0; u < vertices.length; u++) {
            var vertex = this.vertices[vertices[u]];
            if (vertex.positioned) continue;

            var dx = 0.1 * forces[vertex.id].x;
            var dy = 0.1 * forces[vertex.id].y;

            var dSq = dx * dx + dy * dy;

            // Avoid oscillations
            if (dSq > 500) {
                s = Math.sqrt(500 / dSq);
                dx = dx * s;
                dy = dy * s;
            }

            vertex.position.x += dx;
            vertex.position.y += dy;
        }
    }

    for (var u = 0; u < vertices.length; u++) {
        this.vertices[vertices[u]].positioned = true;
    }

    for (var u = 0; u < vertices.length; u++) {
        var vertex = this.vertices[vertices[u]];
        var neighbours = vertex.getNeighbours();
        for (var i = 0; i < neighbours.length; i++) {
            if(vertex.value.isBridge)
                this.createBonds(this.vertices[neighbours[i]], vertex, MathHelper.Geom.toRad(60));
            else
                this.createBonds(this.vertices[neighbours[i]], vertex, center);
        }
    }
}

SmilesDrawer.prototype.drawEdges = function (label) {
    var that = this;
    for (var i = 0; i < this.edges.length; i++) {
        var edge = this.edges[i];
        var vertexA = this.vertices[edge.source];
        var vertexB = this.vertices[edge.target];
        var elementA = vertexA.value.element;
        var elementB = vertexB.value.element;
        var a = vertexA.position;
        var b = vertexB.position;
        var normals = this.getEdgeNormals(edge);
        var gradient = 'gradient' + vertexA.value.element.toUpperCase() + vertexB.value.element.toUpperCase();

        // Create a point on each side of the line
        var sides = ArrayHelper.clone(normals);
        ArrayHelper.each(sides, function (v) {
            v.multiply(10);
            v.add(a)
        });

        if (edge.bond == '=' || this.matchRingBonds(vertexA, vertexB) == '=') {
            // Always draw double bonds inside the ring
            var inRing = this.areVerticesInSameRing(vertexA, vertexB);
            var s = this.chooseSide(vertexA, vertexB, sides);

            if (inRing) {
                // Always draw double bonds inside a ring
                // if the bond is shared by two rings, it is drawn in the larger
                // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
                var lcr = this.getLargestCommonRing(vertexA, vertexB);
                var center = lcr.center;

                ArrayHelper.each(normals, function (v) {
                    v.multiply(that.settings.bondSpacing)
                });

                // Choose the normal that is on the same side as the center
                var line = null;
                if (center.sameSideAs(vertexA.position, vertexB.position, Vector2.add(a, normals[0]))) {
                    line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                } else {
                    line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));
                }

                line.shorten(this.settings.bondLength - this.settings.shortBondLength);

                // The shortened edge
                this.line(line.a.x, line.a.y, line.b.x, line.b.y, elementA, elementB);

                // The normal edge
                this.line(a.x, a.y, b.x, b.y, elementA, elementB);
            } else if (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
                // Both lines are the same length here
                // Add the spacing to the edges (which are of unit length)
                ArrayHelper.each(normals, function (v) {
                    v.multiply(that.settings.bondSpacing / 2)
                });

                var line1 = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                var line2 = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));

                this.line(line1.a.x, line1.a.y, line1.b.x, line1.b.y, elementA, elementB);
                this.line(line2.a.x, line2.a.y, line2.b.x, line2.b.y, elementA, elementB);
            } else if (s.sideCount[0] > s.sideCount[1]) {
                ArrayHelper.each(normals, function (v) {
                    v.multiply(that.settings.bondSpacing)
                });

                var line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                line.shorten(this.settings.bondLength - this.settings.shortBondLength);
                this.line(line.a.x, line.a.y, line.b.x, line.b.y, elementA, elementB);
                this.line(a.x, a.y, b.x, b.y, elementA, elementB);
            } else if (s.sideCount[0] < s.sideCount[1]) {
                ArrayHelper.each(normals, function (v) {
                    v.multiply(that.settings.bondSpacing)
                });

                var line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));
                line.shorten(this.settings.bondLength - this.settings.shortBondLength);
                this.line(line.a.x, line.a.y, line.b.x, line.b.y, elementA, elementB);
                this.line(a.x, a.y, b.x, b.y, elementA, elementB);
            } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
                ArrayHelper.each(normals, function (v) {
                    v.multiply(that.settings.bondSpacing)
                });

                var line = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
                line.shorten(this.settings.bondLength - this.settings.shortBondLength);
                this.line(line.a.x, line.a.y, line.b.x, line.b.y, elementA, elementB);
                this.line(a.x, a.y, b.x, b.y, elementA, elementB);
            } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
                ArrayHelper.each(normals, function (v) {
                    v.multiply(that.settings.bondSpacing)
                });

                var line = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));
                line.shorten(this.settings.bondLength - this.settings.shortBondLength);
                this.line(line.a.x, line.a.y, line.b.x, line.b.y, elementA, elementB);
                this.line(a.x, a.y, b.x, b.y, elementA, elementB);
            } else {

            }
        } 
        else if(edge.bond === '#') {
            ArrayHelper.each(normals, function (v) {
                v.multiply(that.settings.bondSpacing / 1.5)
            });

            var lineA = new Line(Vector2.add(a, normals[0]), Vector2.add(b, normals[0]));
            var lineB = new Line(Vector2.add(a, normals[1]), Vector2.add(b, normals[1]));

            lineA.shorten(this.settings.bondLength - this.settings.shortBondLength);
            lineB.shorten(this.settings.bondLength - this.settings.shortBondLength);

            this.line(lineA.a.x, lineA.a.y, lineA.b.x, lineA.b.y, elementA, elementB);
            this.line(lineB.a.x, lineB.a.y, lineB.b.x, lineB.b.y, elementA, elementB);

            this.line(a.x, a.y, b.x, b.y, elementA, elementB);
        } else {
            this.line(a.x, a.y, b.x, b.y, elementA, elementB);
        }

        if (label) {
            var midpoint = Vector2.midpoint(a, b);
            this.debugText(midpoint.x, midpoint.y, 'id: ' + i);
        }
    }
}

SmilesDrawer.maxBonds = {
    'c': 4,
    'C': 4,
    'n': 3,
    'N': 3,
    'o': 2,
    'O': 2
}

SmilesDrawer.prototype.drawVertices = function (label) {
    for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        var atom = vertex.value;
        var bondCount = this.getBondCount(vertex);

        var element = atom.element.length == 1 ? atom.element.toUpperCase() : atom.element;

        if (label) {
            var value = vertex.id + ' ' + ArrayHelper.print(atom.ringbonds);
            this.debugText(vertex.position.x, vertex.position.y, 'id: ' + value);
        }

        var hydrogens = SmilesDrawer.maxBonds[element] - bondCount;
        if(atom.bracket) hydrogens = atom.bracket.hcount;

        var charge = 0;
        if(atom.bracket) charge = atom.bracket.charge;

        if (atom.isTerminal && !label) {
            var dir = vertex.getTextDirection(this.vertices);
            this.text(vertex.position.x, vertex.position.y, element, 'element ' + atom.element.toLowerCase(), true, hydrogens, dir, true, charge);
        } else if (atom.element.toLowerCase() !== 'c' && !label) {
            var dir = vertex.getTextDirection(this.vertices);
            this.text(vertex.position.x, vertex.position.y, element, 'element ' + atom.element.toLowerCase(), true, hydrogens, dir, false, charge);
        }
    }

    // Draw the ring centers for debug purposes
    if (this.settings.debug) {
        for (var i = 0; i < this.rings.length; i++) {
            this.drawPoint(this.rings[i].center, 'id: ' + this.rings[i].id);
        }
    }

    // Draw ring for benzenes
    for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];
        if (ring.isBenzene(this.vertices)) {
            this.ctx.save();
            this.ctx.strokeStyle = this.colors['C'];
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.arc(ring.center.x + this.offsetX, ring.center.y + this.offsetY, ring.radius - 10, 0, Math.PI * 2, true); 
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.restore();
        }
    }
}

SmilesDrawer.prototype.position = function () {
    // If there is a ring, always start drawing from the ring
    var startVertex = 0;

    /*
    if(this.rings.length > 0) {
        startVertex = this.rings[0].members[0];
    }*/

    this.createBonds(this.vertices[startVertex]);

    // Atoms bonded to the same ring atom
    this.resolvePrimaryOverlaps();
}

SmilesDrawer.prototype.clearPositions = function () {
    this.backupVertices = [];
    this.backupRings = [];

    for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        this.backupVertices.push(vertex.clone());
        vertex.positioned = false;
        vertex.position = new Vector2();
    }

    for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];
        this.backupRings.push(ring.clone());
        ring.positioned = false;
        ring.center = new Vector2();
    }
}

SmilesDrawer.prototype.restorePositions = function () {
    for (var i = 0; i < this.backupVertices.length; i++) {
        this.vertices[i] = this.backupVertices[i];
    }

    for (var i = 0; i < this.backupRings.length; i++) {
        this.rings[i] = this.backupRings[i];
    }
}

// TODO: This needs some cleaning up
SmilesDrawer.prototype.createRing = function (ring, center, start, previous) {
    if (ring.positioned) return;
    var orderedNeighbours = ring.getOrderedNeighbours(this.ringConnections);

    center = center ? center : new Vector2(0, 0);
    var startingAngle = start ? Vector2.subtract(start.position, center).angle() : 0;

    var that = this;
    var radius = MathHelper.Geom.polyCircumradius(that.settings.bondLength, ring.size());
    ring.radius = radius;
    var angle = MathHelper.Geom.centralAngle(ring.size());
    ring.centralAngle = angle;

    var a = startingAngle;
    ring.eachMember(this.vertices, function (v) {
        var vertex = that.vertices[v];
        if (!vertex.positioned) {
            vertex.position.x = center.x + Math.cos(a) * radius;
            vertex.position.y = center.y + Math.sin(a) * radius;
        }

        a += angle;
        vertex.positioned = true;
    }, (start) ? start.id : null, (previous) ? previous.id : null);

    // If the ring is bridged, then draw the vertices inside the ring
    // using a force based approach
    if (ring.isBridged) {
        var allVertices = ArrayHelper.merge(ring.members, ring.insiders);

        this.forceLayout(allVertices, center, start.id);
    }

    // Anchor the ring to one of it's members, so that the ring center will always
    // be tied to a single vertex when doing repositionings
    this.vertices[ring.members[0]].value.addAnchoredRing(ring);

    ring.positioned = true;
    ring.center = center;

    // Draw neighbours in decreasing order of connectivity
    for (var i = 0; i < orderedNeighbours.length; i++) {
        var neighbour = this.getRing(orderedNeighbours[i].neighbour);
        if (neighbour.positioned) continue;

        var vertices = RingConnection.getVertices(this.ringConnections, ring.id, neighbour.id);

        if (vertices.length == 2) {
            // This ring is a fused ring
            ring.isFused = true;
            neighbour.isFused = true;

            var vertexA = this.vertices[vertices[0]];
            var vertexB = this.vertices[vertices[1]];

            // Get middle between vertex A and B
            var midpoint = Vector2.midpoint(vertexA.position, vertexB.position);

            // Get the normals to the line between A and B
            var normals = Vector2.normals(vertexA.position, vertexB.position);

            // Normalize the normals
            ArrayHelper.each(normals, function (v) {
                v.normalize()
            });

            // Set length from middle of side to center (the apothem)
            var r = MathHelper.Geom.polyCircumradius(that.settings.bondLength, neighbour.size());
            var apothem = MathHelper.Geom.apothem(r, neighbour.size());
            ArrayHelper.each(normals, function (v) {
                v.multiply(apothem)
            });

            // Move normals to the middle of the line between a and b
            ArrayHelper.each(normals, function (v) {
                v.add(midpoint)
            });

            // Check if the center of the next ring lies within another ring and
            // select the normal accordingly
            var nextCenter = normals[0];
            if (this.isPointInRing(nextCenter)) nextCenter = normals[1];

            // Get the vertex (A or B) which is in clock-wise direction of the other
            var posA = Vector2.subtract(vertexA.position, nextCenter);
            var posB = Vector2.subtract(vertexB.position, nextCenter);

            if (posA.clockwise(posB) === -1)
                this.createRing(neighbour, nextCenter, vertexA, vertexB);
            else
                this.createRing(neighbour, nextCenter, vertexB, vertexA);
        } else if (vertices.length == 1) {
            // This ring is a spiro
            ring.isSpiro = true;
            neighbour.isSpiro = true;

            var vertexA = this.vertices[vertices[0]];
            // Get the vector pointing from the shared vertex to the new center
            var nextCenter = Vector2.subtract(center, vertexA.position);
            nextCenter.invert();
            nextCenter.normalize();

            // Get the distance from the vertex to the center
            var r = MathHelper.Geom.polyCircumradius(that.settings.bondLength, neighbour.size());
            nextCenter.multiply(r);
            nextCenter.add(vertexA.position);
            this.createRing(neighbour, nextCenter, vertexA);
        }
    }

    // Next, draw atoms that are not part of a ring that are directly attached to this ring
    for (var i = 0; i < ring.members.length; i++) {
        var ringMember = this.vertices[ring.members[i]];
        var ringMemberNeighbours = ringMember.getNeighbours();

        // If there are multiple, the ovlerap will be resolved in the appropriate step
        for (var j = 0; j < ringMemberNeighbours.length; j++) {
            if (ring.thisOrNeighboursContain(this.rings, ringMemberNeighbours[j])) continue;
            var v = this.vertices[ringMemberNeighbours[j]];
            this.createBonds(v, ringMember, ring.center);
        }
    }
}

SmilesDrawer.prototype.rotateSubtree = function (v, parent, angle, center) {
    var that = this;
    this.traverseTree(parent, v, function (vertex) {
        vertex.position.rotateAround(angle, center);

        for (var i = 0; i < vertex.value.anchoredRings.length; i++) {
            that.rings[vertex.value.anchoredRings[i]].center.rotateAround(angle, center);
        }
    });
}

SmilesDrawer.prototype.resolvePrimaryOverlaps = function () {
    var overlaps = [];
    var sharedSideChains = []; // side chains attached to an atom shared by two rings
    var done = new Array(this.vertices.length);

    for (var i = 0; i < this.rings.length; i++) {
        var ring = this.rings[i];
        for (var j = 0; j < ring.members.length; j++) {
            var vertex = this.vertices[ring.members[j]];

            if (done[vertex.id]) continue;
            done[vertex.id] = true;

            // Look for rings where there are atoms with two bonds outside the ring (overlaps)
            if (vertex.getNeighbours().length > 2) {
                var rings = [];
                for (var k = 0; k < vertex.value.rings.length; k++) rings.push(vertex.value.rings[k]);
                overlaps.push({
                    common: vertex,
                    rings: rings,
                    vertices: this.getNonRingNeighbours(vertex.id)
                });
            }

            // Side chains attached to an atom shared by two rings
            if (vertex.value.rings.length == 2 && vertex.getNeighbours().length == 4) {
                var nrn = this.getNonRingNeighbours(vertex.id)[0];
                if (nrn && nrn.getNeighbours().length > 1) {
                    var other = this.getCommonRingbondNeighbour(vertex);
                    sharedSideChains.push({
                        common: vertex,
                        other: other,
                        vertex: nrn
                    });
                }
            }
        }
    }

    for (var i = 0; i < sharedSideChains.length; i++) {
        var chain = sharedSideChains[i];
        var angle = -chain.vertex.position.getRotateToAngle(chain.other.position, chain.common.position);
        this.rotateSubtree(chain.vertex.id, chain.common.id, angle + Math.PI, chain.common.position);
    }

    for (var i = 0; i < overlaps.length; i++) {
        var overlap = overlaps[i];
        
        if (overlap.vertices.length == 1) {
            var a = overlap.vertices[0];
            if (a.getNeighbours().length == 1) {
                a.flippable = true;
                a.flipCenter = overlap.common.id;

                for (var j = 0; j < overlap.rings.length; j++) a.flipRings.push(overlap.rings[j]);
            }
        } else if (overlap.vertices.length == 2) {
            var angle = (2 * Math.PI - this.rings[overlap.rings[0]].getAngle()) / 6.0;
            var a = overlap.vertices[0];
            var b = overlap.vertices[1];
            a.backAngle -= angle;
            b.backAngle += angle;
            this.rotateSubtree(a.id, overlap.common.id, angle, overlap.common.position);
            this.rotateSubtree(b.id, overlap.common.id, -angle, overlap.common.position);

            if (a.getNeighbours().length == 1) {
                a.flippable = true;
                a.flipCenter = overlap.common.id;
                a.flipNeighbour = b.id;
                for (var j = 0; j < overlap.rings.length; j++) a.flipRings.push(overlap.rings[j]);
            }
            if (b.getNeighbours().length == 1) {
                b.flippable = true;
                b.flipCenter = overlap.common.id;
                b.flipNeighbour = a.id;
                for (var j = 0; j < overlap.rings.length; j++) b.flipRings.push(overlap.rings[j]);
            }
        }
    }
}

SmilesDrawer.prototype.resolveSecondaryOverlaps = function (scores) {
    for (var i = 0; i < scores.length; i++) {
        if (scores[i].score > this.settings.bondLength / 5) {
            var vertex = this.vertices[scores[i].id];

            if (vertex.flippable) {
                // Rings that get concatenated in to a bridge one, will be undefined here ...
                var a = vertex.flipRings[0] ? this.rings[vertex.flipRings[0]] : null;
                var b = vertex.flipRings[1] ? this.rings[vertex.flipRings[1]] : null;
                var flipCenter = this.vertices[vertex.flipCenter].position;

                // Make a always the bigger ring than b
                if (a && b) {
                    var tmp = (a.members.length > b.members.length) ? a : b;
                    b = (a.members.length < b.members.length) ? a : b;
                    a = tmp;
                }

                if (a && a.allowsFlip()) {
                    vertex.position.rotateTo(a.center, flipCenter);
                    a.flipped();
                    if (vertex.flipNeighbour !== null) {
                        // It's better to not straighten the other one, since it will possibly overlap
                        // var flipNeighbour = this.vertices[vertex.flipNeighbour];
                        // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                    }
                } else if (b && b.allowsFlip()) {
                    vertex.position.rotateTo(b.center, flipCenter);
                    b.flipped();
                    if (vertex.flipNeighbour !== null) {
                        // It's better to not straighten the other one, since it will possibly overlap
                        // var flipNeighbour = this.vertices[vertex.flipNeighbour];
                        // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                    }
                }

                // Only do a refresh of the remaining!
                // recalculate scores (how expensive?)
                // scores = this.getOverlapScore().scores;
            }
        }
    }
}

// Since javascript overloading is a pain, the attribute ringOrAngle is an angle or a ring
// depending on the context of the caller
SmilesDrawer.prototype.createBonds = function (vertex, previous, ringOrAngle, dir) {
    if (vertex.positioned) return;

    // If the current node is the member of one ring, then point straight away
    // from the center of the ring. However, if the current node is a member of
    // two rings, point away from the middle of the centers of the two rings
    if (!previous) {
        // Here, ringOrAngle is always an angle

        // Add a (dummy) previous position if there is no previous vertex defined
        // Since the first vertex is at (0, 0), create a vector at (bondLength, 0)
        // and rotate it by 90°
        var dummy = new Vector2(this.settings.bondLength, 0);
        dummy.rotate(MathHelper.Geom.toRad(-120));

        vertex.previousPosition = dummy;
        vertex.position = new Vector2(this.settings.bondLength, 0);
        vertex.angle = MathHelper.Geom.toRad(-120);
        vertex.positioned = true;
    } else if (previous.value.rings.length == 0 && !vertex.value.isBridge) {
        // Here, ringOrAngle is always an angle

        // If the previous vertex was not part of a ring, draw a bond based
        // on the global angle of the previous bond
        var v = new Vector2(this.settings.bondLength, 0);
        v.rotate(ringOrAngle);
        v.add(previous.position);
        vertex.position = v;

        vertex.previousPosition = previous.position;
        vertex.positioned = true;
    } else if (previous.value.isBridgeNode && vertex.value.isBridge) {
        // If the previous atom is in a bridged ring and this one is inside the ring
        var targets = this.getTargets(vertex.id, previous.id, vertex.value.bridgedRing);

        var pos = Vector2.subtract(ringOrAngle, previous.position);
        pos.normalize();

        // Unlike with the ring, do not multiply with radius but with bond length
        pos.multiply(this.settings.bondLength);
        vertex.position.add(previous.position);
        vertex.position.add(pos);

        vertex.previousPosition = previous.position;
        vertex.positioned = true;
    } else if (vertex.value.isBridge) {
        // The previous atom is in a bridged ring and this one is in it as well
        var targets = this.getTargets(vertex.id, previous.id, vertex.value.bridgedRing);

        var v = new Vector2(this.settings.bondLength, 0);
        v.rotate(ringOrAngle);
        v.add(previous.position);
        vertex.position = v;

        vertex.previousPosition = previous.position;
        vertex.positioned = true;
    } else if (previous.value.rings.length == 1) {
        // Here, ringOrAngle is always a ring (THIS IS CURRENTLY NOT TRUE - WHY?)
        // Use the same approach es with rings that are connected at one vertex
        // and draw the atom in the opposite direction of the center.
        var pos = Vector2.subtract(ringOrAngle, previous.position);

        pos.invert();
        pos.normalize();

        // Unlike with the ring, do not multiply with radius but with bond length
        pos.multiply(this.settings.bondLength);
        vertex.position.add(previous.position);
        vertex.position.add(pos);
        vertex.previousPosition = previous.position;
        vertex.positioned = true;
    } else if (previous.value.rings.length == 2) {
        // Here, ringOrAngle is always a ring
        var ringA = this.getRing(previous.value.rings[0]);
        var ringB = this.getRing(previous.value.rings[1]);

        // Project the current vertex onto the vector between the two centers to
        // get the direction
        var a = Vector2.subtract(ringB.center, ringA.center);
        var b = Vector2.subtract(previous.position, ringA.center);
        var s = Vector2.scalarProjection(b, a);
        a.normalize();
        a.multiply(s);
        a.add(ringA.center);

        var pos = Vector2.subtract(a, previous.position);
        pos.invert();
        pos.normalize();
        pos.multiply(this.settings.bondLength);
        vertex.position.add(previous.position);
        vertex.position.add(pos);

        vertex.previousPosition = previous.position;
        vertex.positioned = true;
    }

    // Go to next vertex
    // If two rings are connected by a bond ...
    if (Ring.contains(this.rings, vertex.id)) {
        var nextRing = this.getRing(vertex.value.rings[0]);
        var nextCenter = Vector2.subtract(vertex.previousPosition, vertex.position);
        nextCenter.invert();
        nextCenter.normalize();

        var r = MathHelper.Geom.polyCircumradius(this.settings.bondLength, nextRing.size());
        nextCenter.multiply(r);
        nextCenter.add(vertex.position);

        this.createRing(nextRing, nextCenter, vertex);
    } else {
        // Draw the non-ring vertices connected to this one        
        var neighbours = vertex.getNeighbours();
        if (previous) neighbours = ArrayHelper.remove(neighbours, previous.id);


        var angle = vertex.getAngle();

        if (neighbours.length == 1) {
            var nextVertex = this.vertices[neighbours[0]];

            // Make a single chain always cis except when there's a tribble bond
            if(vertex.value.bond === '#' || (previous && previous.value.bond === '#')) {
                nextVertex.angle = angle;
                this.createBonds(nextVertex, vertex, nextVertex.angle, -dir);
            }
            else {
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                if (!dir) dir = plusOrMinus;
                nextVertex.angle = MathHelper.Geom.toRad(60) * dir;
                this.createBonds(nextVertex, vertex, angle + nextVertex.angle, -dir);
            }
        } else if (neighbours.length == 2) {
            // Check for the longer subtree - always go with cis for the longer subtree
            var subTreeDepthA = this.getTreeDepth(vertex.id, neighbours[0]);
            var subTreeDepthB = this.getTreeDepth(vertex.id, neighbours[1]);

            var cis = 0;
            var trans = 1;

            if (subTreeDepthA > subTreeDepthB) {
                cis = 1;
                trans = 0;
            }

            if (vertex.position.clockwise(vertex.previousPosition) === 1) {
                var cisVertex = this.vertices[neighbours[cis]];
                var transVertex = this.vertices[neighbours[trans]];

                transVertex.angle = MathHelper.Geom.toRad(60);
                cisVertex.angle = -MathHelper.Geom.toRad(60);

                this.createBonds(transVertex, vertex, angle + transVertex.angle);
                this.createBonds(cisVertex, vertex, angle + cisVertex.angle);
            } else {
                var cisVertex = this.vertices[neighbours[cis]];
                var transVertex = this.vertices[neighbours[trans]];

                transVertex.angle = -MathHelper.Geom.toRad(60);
                cisVertex.angle = MathHelper.Geom.toRad(60);

                this.createBonds(cisVertex, vertex, angle + cisVertex.angle);
                this.createBonds(transVertex, vertex, angle + transVertex.angle);
            }
        } else if (neighbours.length == 3) {
            // The vertex with the longest sub-tree should always go straight
            var d1 = this.getTreeDepth(vertex.id, neighbours[0]);
            var d2 = this.getTreeDepth(vertex.id, neighbours[1]);
            var d3 = this.getTreeDepth(vertex.id, neighbours[2]);
            
            var s = this.vertices[neighbours[0]];
            var l = this.vertices[neighbours[1]];
            var r = this.vertices[neighbours[2]];

            if(d2 > d1 && d2 > d3) {
                s = this.vertices[neighbours[1]];
                l = this.vertices[neighbours[0]];
                r = this.vertices[neighbours[2]];
            }
            else if(d3 > d1 && d3 > d2) {
                s = this.vertices[neighbours[2]];
                l = this.vertices[neighbours[0]];
                r = this.vertices[neighbours[1]];
            }
            
            this.createBonds(s, vertex, angle);
            this.createBonds(l, vertex, angle + MathHelper.Geom.toRad(90));
            this.createBonds(r, vertex, angle - MathHelper.Geom.toRad(90));
        }
    }
}

/**
 * Inside a bridged ring, find the target atoms of the ring further atoms have to
 * connect to.
 **/
SmilesDrawer.prototype.getTargets = function (vertex, previous, ring) {
    var that = this;
    var targets = new Array();

    // TODO: This recursion can go into a loop if there is a "ring" inside a bridged ring
    var recurse = function (v, p) {
        var neighbours = that.vertices[v].getNeighbours();

        for (var i = 0; i < neighbours.length; i++) {
            var neighbour = that.vertices[neighbours[i]];
            if (neighbour.id === p) continue;
            if (neighbour.value.isBridge) {
                recurse(neighbour.id, v);
            } else if (neighbour.value.hasRing(ring)) {
                targets.push(neighbour.id);
            }
        }
    };

    recurse(vertex, previous);
    return targets;
}

// Gets the vertex sharing the edge that is the common bond of two rings
SmilesDrawer.prototype.getCommonRingbondNeighbour = function (vertex) {
    var neighbours = vertex.getNeighbours();
    for (var i = 0; i < neighbours.length; i++) {
        var neighbour = this.vertices[neighbours[i]];
        if (ArrayHelper.containsAll(neighbour.value.rings, vertex.value.rings)) return neighbour;
    }
}

SmilesDrawer.prototype.isPointInRing = function (v) {
    for (var i = 0; i < this.rings.length; i++) {
        var polygon = this.rings[i].getPolygon(this.vertices);
        if (v.isInPolygon(polygon)) return true;
    }

    return false;
}

SmilesDrawer.prototype.isEdgeInRing = function (edge) {
    var source = this.vertices[edge.source];
    var target = this.vertices[edge.target];

    return this.areVerticesInSameRing(source, target);
}

SmilesDrawer.prototype.isRingAromatic = function (ring) {
    for (var i = 0; i < ring.members.length; i++) {
        if (!this.isVertexInAromaticRing(ring.members[i])) {
            return false;
        }
    }

    return true;
}

SmilesDrawer.prototype.isEdgeInAromaticRing = function (edge) {
    return this.isVertexInAromaticRing(edge.source) &&
        this.isVertexInAromaticRing(edge.target);
}

SmilesDrawer.prototype.isVertexInAromaticRing = function (vertex) {
    var element = this.vertices[vertex].value.element;
    return element == element.toLowerCase()
}

SmilesDrawer.prototype.getEdgeNormals = function (edge) {
    var a = this.vertices[edge.source].position;
    var b = this.vertices[edge.target].position;

    // Get the normals for the edge
    var normals = Vector2.normals(a, b);

    // Normalize the normals
    ArrayHelper.each(normals, function (v) {
        v.normalize()
    });

    return normals;
}

SmilesDrawer.prototype.getNormals = function (a, b) {
    var a = a.position;
    var b = b.position;

    // Get the normals for the edge
    var normals = Vector2.normals(a, b);

    // Normalize the normals
    ArrayHelper.each(normals, function (v) {
        v.normalize()
    });

    return normals;
}

SmilesDrawer.prototype.getTreeDepth = function (parent, v) {
    var neighbours = this.vertices[v].getSpanningTreeNeighbours(parent);
    var max = 0;

    for (var i = 0; i < neighbours.length; i++) {
        var childId = neighbours[i];
        var d = this.getTreeDepth(v, childId);
        if (d > max) max = d;
    }

    return max + 1;
}

SmilesDrawer.prototype.traverseTree = function (parent, v, callback) {
    var vertex = this.vertices[v];
    var neighbours = vertex.getSpanningTreeNeighbours(parent);

    callback(vertex);

    for (var i = 0; i < neighbours.length; i++) {
        this.traverseTree(v, neighbours[i], callback);
    }
}

SmilesDrawer.prototype.getMaxDepth = function (v, previous, depth) {
    depth = depth ? depth : 0;

    var neighbours = v.getNeighbours();
    var max = 0;

    for (var i = 0; i < neighbours.length; i++) {
        if (neighbours[i] == previous.id) continue;
        var next = this.vertices[neighbours[i]];
        var d = 0;
        // If there is a ring, make it very expensive and stop recursion
        if (next.value.getRingbondCount() > 0) {
            d = 100;
        } else {
            d = this.getMaxDepth(this.vertices[neighbours[i]], v, depth + 1);
        }

        if (d > max)
            max = d;
    }

    return max;
}

SmilesDrawer.prototype.getBondCount = function (vertex) {
    var count = 0;

    for (var i = 0; i < vertex.edges.length; i++) {
        count += this.edges[vertex.edges[i]].getBondCount();
    }

    return count;
}

SmilesDrawer.prototype.getNonRingNeighbours = function (v) {
    var nrneighbours = [];
    var vertex = this.vertices[v];
    var neighbours = vertex.getNeighbours();

    for (var i = 0; i < neighbours.length; i++) {
        var neighbour = this.vertices[neighbours[i]];
        if (ArrayHelper.intersection(vertex.value.rings, neighbour.value.rings).length == 0 && neighbour.value.isBridge == false) {
            nrneighbours.push(neighbour);
        }
    }

    return nrneighbours;
}


function Pair(first, second) {
    this.first = first;
    this.second = second;
}

Pair.prototype.getHash = function () {
    // Cantor pairing function, which uniquely encodes
    // two natural numbers into one natural number
    // N x N -> N
    // however replace the last term to make to not take
    // the order into account
    return 0.5 * (this.first + this.second) * (this.first + this.second + 1) + (this.first + this.second);
}

Pair.prototype.contains = function (item) {
    return this.first === item || this.second === item;
}

Pair.createUniquePairs = function (array) {
    // Each element in array has to be unique, else this wont work
    var pairs = [];

    for (var i = 0; i < array.length; i++) {
        var a = array[i];

        for (var j = i + 1; j < array.length; j++) {
            var b = array[j];
            pairs.push(new Pair(a, b))
        }
    }

    return pairs;
}


function Vertex(value, x, y) {
    this.id = null;
    this.value = value;
    this.position = new Vector2(x ? x : 0, y ? y : 0);
    this.previousPosition = new Vector2(0, 0);
    this.parent = null;
    this.children = [];
    this.spanningTreeChildren = [];
    this.edges = [];
    this.positioned = false;
    this.angle = 0.0;
    this.backAngle = 0.0;
    this.flippable = false; // can be flipped into a ring
    this.flipCenter = null;
    this.flipNeighbour = null;
    this.flipRings = new Array();
}

Vertex.prototype.clone = function () {
    var clone = new Vertex(this.value, this.position.x, this.position.y);
    clone.id = this.id;
    clone.previousPosition = new Vector2(this.previousPosition.x, this.previousPosition.y);
    clone.parent = this.parent;
    clone.children = ArrayHelper.clone(this.children);
    clone.spanningTreeChildren = ArrayHelper.clone(this.spanningTreeChildren);
    clone.edges = ArrayHelper.clone(this.edges);
    clone.positioned = this.positioned;
    clone.angle = this.angle;
    clone.backAngle = this.backAngle;
    clone.flippable = this.flippable;
    clone.flipCenter = this.flipCenter;
    clone.flipRings = ArrayHelper.clone(this.flipRings);
    return clone;
}

Vertex.prototype.equals = function (v) {
    return this.id == v.id;
}

Vertex.prototype.getAngle = function (v, deg) {
    var u = null;
    if (!v)
        u = Vector2.subtract(this.position, this.previousPosition);
    else
        u = Vector2.subtract(this.position, v);

    if (deg) return MathHelper.Geom.toDeg(u.angle());

    return u.angle();
}

/**
 * Returns the direction in which there is no bond in order to place the text.
 */
Vertex.prototype.getTextDirection = function (vertices) {
    var neighbours = this.getNeighbours();
    var angles = [];
    for (var i = 0; i < neighbours.length; i++) {
        angles.push(this.getAngle(vertices[neighbours[i]].position));
    }

    var textAngle = MathHelper.Geom.meanAngle(angles);

    // Round to 0, 90, 180 or 270 degree
    var halfPi = Math.PI / 2.0;
    textAngle = Math.round(Math.round(textAngle / halfPi) * halfPi, 3);

    if (textAngle == 2) return 'down';
    if (textAngle == -2) return 'up';
    if (textAngle === 0 || textAngle === -0) return 'right'; // is checking for -0 necessary?
    if (textAngle == 3 || textAngle == -3) return 'left';
}

/**
 * If a vertex id is supplied, it is excluded.
 */
Vertex.prototype.getNeighbours = function (v) {
    var neighbours = [];

    for (var i = 0; i < this.children.length; i++) {
        if (v === undefined || v != this.children[i])
            neighbours.push(this.children[i]);
    }

    if (this.parent != null) {
        if (v === undefined || v != this.parent)
            neighbours.push(this.parent);
    }

    return neighbours;
}

Vertex.prototype.getCommonNeighbours = function (v) {
    // There can only be one common neighbour of a Vertex
    // outside of a ring
    var commonNeighbours = new Array();
    var neighboursA = this.getNeighbours();
    var neighboursB = v.getNeighbours();

    for (var i = 0; i < neighboursA.length; i++) {
        for (var j = 0; j < neighboursB.length; j++) {
            if (neighboursA[i] === neighboursB[j]) {
                commonNeighbours.push(neighboursA[i]);
            }
        }
    }

    return commonNeighbours;
}

Vertex.prototype.isNeighbour = function (v) {
    for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] === v) return true;
    }

    return this.parent === v;
}

/**
 * Returns the neighbours without the ones defined over ringbonds
 */
Vertex.prototype.getSpanningTreeNeighbours = function (v) {
    var neighbours = [];

    for (var i = 0; i < this.spanningTreeChildren.length; i++) {
        if (v === undefined || v != this.spanningTreeChildren[i])
            neighbours.push(this.spanningTreeChildren[i]);
    }

    if (this.parent != null) {
        if (v === undefined || v != this.parent)
            neighbours.push(this.parent);
    }

    return neighbours;
}

Vertex.prototype.getNextInRing = function (vertices, ring, previous) {
    var neighbours = this.getNeighbours();

    for (var i = 0; i < neighbours.length; i++) {
        if (ArrayHelper.contains(vertices[neighbours[i]].value.rings, {
                value: ring
            }) && neighbours[i] != previous)
            return neighbours[i];
    }

    return null;
}


function Edge(source, target, weight) {
    this.id = null;
    this.source = source;
    this.target = target;
    this.weight = weight;
    this.bond = '-';
    this.isInAromaticRing = false;
}

Edge.bonds = {
    '-': 1,
    '/': 1,
    '\\': 1,
    '=': 2,
    '#': 3,
    '$': 4
}

Edge.prototype.getBondCount = function () {
    return Edge.bonds[this.bond];
}


function Atom(element, bond) {
    this.element = element;
    this.ringbonds = new Array();
    this.rings = new Array();
    this.bond = '-';
    this.isTerminal = false;
    this.isBridge = false;
    this.isBridgeNode = false;
    this.bridgedRing = null;
    this.anchoredRings = new Array();
    this.bracket = null;
}

Atom.prototype.addAnchoredRing = function (ring) {
    if (!ArrayHelper.contains(this.anchoredRings, {
            value: ring.id
        }))
        this.anchoredRings.push(ring.id);
}

Atom.prototype.getRingbondCount = function () {
    return this.ringbonds.length;
}

Atom.prototype.canRotate = function () {
    return this.bond == '-' && this.rings.length == 0;
}

Atom.prototype.hasRingbonds = function () {
    return this.ringbonds.length > 0;
}

Atom.prototype.getMaxRingbond = function () {
    var max = 0;
    for (var i = 0; i < this.ringbonds.length; i++)
        if (this.ringbonds[i].id > max) max = this.ringbonds[i].id

    return max;
}

Atom.prototype.hasRing = function (ring) {
    for (var i = 0; i < this.rings; i++) {
        if (ring === this.rings[i]) return true;
    }

    return false;
}

Atom.haveCommonRingbond = function (a, b) {
    for (var i = 0; i < a.ringbonds.length; i++) {
        for (var j = 0; j < b.ringbonds.length; j++) {
            if (a.ringbonds[i].id == b.ringbonds[j].id) return true;
        }
    }

    return false;
}

Atom.maxCommonRingbond = function (a, b) {
    var commonMax = 0;
    var maxA = 0;
    var maxB = 0;

    for (var i = 0; i < a.ringbonds.length; i++) {
        if (a.ringbonds[i].id > maxA) maxA = a.ringbonds[i].id;

        for (var j = 0; j < b.ringbonds.length; j++) {
            if (b.ringbonds[j].id > maxB) maxB = b.ringbonds[j].id;

            if (maxA == maxB) commonMax = maxA;
        }
    }

    return commonMax;
}


function Ring(ringbond, source, target) {
    this.id = null;
    this.ringbond = ringbond;
    this.source = source;
    this.target = target;
    this.members = new Array();
    this.insiders = new Array();
    this.neighbours = new Array();
    this.positioned = false;
    this.center = new Vector2();
    this.rings = new Array();
    this.isBridged = false;
    this.template = null;
    this.isSpiro = false;
    this.isFused = false;
    this.radius = 0.0;
    this.centralAngle = 0.0;
    this.flip = true;
}

Ring.prototype.clone = function () {
    var clone = new Ring(this.ringbond, this.source, this.target);

    clone.id = this.id;
    clone.members = ArrayHelper.clone(this.members);
    clone.insiders = ArrayHelper.clone(this.insiders);
    clone.neighbours = ArrayHelper.clone(this.neighbours);
    clone.positioned = this.positioned;
    clone.center = ArrayHelper.clone(this.center);
    clone.rings = ArrayHelper.clone(this.rings);
    clone.isBridged = this.isBridged;
    clone.template = this.template;
    clone.isSpiro = this.isSpiro;
    clone.isFused = this.isFused;
    clone.radius = this.radius;
    clone.centralAngle = this.centralAngle;
    clone.flip = this.flip;

    return clone;
}

Ring.prototype.allowsFlip = function () {
    return this.flip && this.members.length > 4;
}

Ring.prototype.flipped = function () {
    if (this.members.length < 8) this.flip = false;
}

Ring.prototype.size = function () {
    return this.members.length;
}

Ring.prototype.getPolygon = function (vertices) {
    var polygon = [];

    for (var i = 0; i < this.members.length; i++) {
        polygon.push(vertices[this.members[i]].position);
    }

    return polygon;
}

Ring.prototype.getAngle = function () {
    return Math.PI - this.centralAngle;
}

Ring.prototype.eachMember = function (vertices, func, start, previous) {
    var start = start || start === 0 ? start : this.members[0];
    var current = start;
    var max = 0;

    while (current != null && max < 100) {
        var prev = current;
        func(prev);

        current = vertices[current].getNextInRing(vertices, this.id, previous);
        previous = prev;
        if (current == start) {
            current = null;
        }
        if (max == 99) console.log('crap');
        max++;
    }
}

Ring.prototype.getOrderedNeighbours = function (ringConnections) {
    var orderedNeighbours = [];
    for (var i = 0; i < this.neighbours.length; i++) {
        var vertices = RingConnection.getVertices(ringConnections, this.id, this.neighbours[i]);
        orderedNeighbours.push({
            n: vertices.length,
            neighbour: this.neighbours[i]
        });
    }

    orderedNeighbours.sort(function (a, b) {
        // Sort highest to lowest
        return b.n - a.n;
    });

    return orderedNeighbours;
}

Ring.prototype.isBenzene = function (vertices) {
    for (var i = 0; i < this.members.length; i++) {
        var e = vertices[this.members[i]].value.element.charAt(0);

        if (e == e.toUpperCase()) {
            return false;
        }
    }

    return true;
}

Ring.prototype.contains = function (vertex) {
    for (var i = 0; i < this.members.length; i++) {
        if (this.members[i] == vertex) return true;
    }

    return false;
}

Ring.prototype.thisOrNeighboursContain = function (rings, vertex) {
    for (var i = 0; i < this.neighbours.length; i++) {
        if (Ring.getRing(rings, this.neighbours[i])
            .contains(vertex)) return true;
    }

    if (this.contains(vertex)) return true;

    return false;
}

Ring.prototype.hasSource = function () {
    return !(this.source === undefined || this.source === null);
}

Ring.prototype.hasTarget = function () {
    return !(this.target === undefined || this.target === null);
}

Ring.prototype.hasSourceAndTarget = function () {
    return this.hasSource() && this.hasTarget();
}

Ring.getRing = function (rings, id) {
    for (var i = 0; i < rings.length; i++) {
        if (rings[i].id == id) return rings[i];
    }
}

Ring.contains = function (rings, vertex) {
    for (var i = 0; i < rings.length; i++) {
        if (rings[i].contains(vertex)) return true;
    }

    return false;
}

function RingConnection(firstRing, secondRing) {
    this.id = null;
    this.rings = new Pair(firstRing, secondRing);
    this.vertices = [];
}

RingConnection.prototype.addVertex = function (vertex) {
    if (!ArrayHelper.contains(this.vertices, {
            value: vertex
        }))
        this.vertices.push(vertex);
}

RingConnection.prototype.isBridge = function () {
    return this.vertices.length > 2;
}

/**
 * Updates the value other than the one supplied as the second parameter
 */
RingConnection.prototype.updateOther = function (update, other) {
    if (this.rings.first === other)
        this.rings.second = update;
    else
        this.rings.first = update;
}

RingConnection.isBridge = function (ringConnections, firstRing, secondRing) {
    var ringConnection = null;
    for (var i = 0; i < ringConnections.length; i++) {
        ringConnection = ringConnections[i];
        var rings = ringConnection.rings;
        if (rings.first === firstRing && rings.second === secondRing ||
            rings.first === secondRing && rings.second === firstRing)
            return ringConnection.isBridge();
    }
}

RingConnection.getNeighbours = function (array, id) {
    var neighbours = [];

    for (var i = 0; i < array.length; i++) {
        var pair = array[i].rings;
        if (pair.first == id) {
            neighbours.push(pair.second);
        } else if (pair.second == id) {
            neighbours.push(pair.first);
        }
    }

    return neighbours;
}

RingConnection.getVertices = function (ringConnections, firstRing, secondRing) {
    for (var i = 0; i < ringConnections.length; i++) {
        var rc = ringConnections[i];
        if (rc.rings.first == firstRing && rc.rings.second == secondRing ||
            rc.rings.first == secondRing && rc.rings.second == firstRing) {
            return rc.vertices;
        }
    }
}


function Vector2(x, y) {
    if (arguments.length == 0) {
        this.x = 0;
        this.y = 0;
    } else if (arguments.length == 1) {
        this.x = x.x;
        this.y = x.y;
    } else {
        this.x = x;
        this.y = y;
    }
}

Vector2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
}

Vector2.prototype.clone = function() {
    return new Vector2(this.x, this.y);
}

Vector2.prototype.toString = function () {
    return '(' + this.x + ',' + this.y + ')';
}

Vector2.add = function (v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
}

Vector2.prototype.add = function (v) {
    this.x += v.x;
    this.y += v.y;
}

Vector2.subtract = function (v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
}

Vector2.prototype.subtract = function (v) {
    this.x -= v.x;
    this.y -= v.y;
}

Vector2.multiply = function (v1, v2) {
    if (v2.x && v2.y)
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    else
        return new Vector2(v1.x * v2, v1.y * v2);
}

Vector2.midpoint = function (v1, v2) {
    return new Vector2((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
}

Vector2.normals = function (v1, v2) {
    var delta = Vector2.subtract(v2, v1);

    return [
        new Vector2(-delta.y, delta.x),
        new Vector2(delta.y, -delta.x)
    ];
}

Vector2.prototype.multiply = function (s) {
    this.x *= s;
    this.y *= s;
}

Vector2.divide = function (v1, v2) {
    if (v2.x && v2.y)
        return new Vector2(v1.x / v2.x, v1.y / v2.y);
    else
        return new Vector2(v1.x / v2, v1.y / v2);
}

Vector2.prototype.divide = function (s) {
    this.x /= s;
    this.y /= s;
}

Vector2.prototype.invert = function () {
    this.x = -this.x;
    this.y = -this.y;
}

Vector2.dot = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

Vector2.angle = function (v1, v2) {
    var dot = Vector2.dot(v1, v2);
    return Math.acos(dot / (v1.length() * v2.length()));
}

Vector2.prototype.angle = function () {
    // It's atan2(y, x);
    return Math.atan2(this.y, this.x);
}

Vector2.prototype.distance = function (v) {
    return Math.sqrt((v.x - this.x) * (v.x - this.x) + (v.y - this.y) * (v.y - this.y));
}

Vector2.prototype.distanceSq = function (v) {
    return (v.x - this.x) * (v.x - this.x) + (v.y - this.y) * (v.y - this.y);
}

Vector2.prototype.clockwise = function (v) {
    var a = this.y * v.x;
    var b = this.x * v.y;
    if (a > b) return -1;
    if (a === b) return 0;
    return 1;
}

Vector2.prototype.rotate = function (angle) {
    var tmp = new Vector2();
    tmp.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    tmp.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = tmp.x;
    this.y = tmp.y;
}

Vector2.prototype.rotateAround = function (angle, v) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);

    this.x -= v.x;
    this.y -= v.y;

    var x = this.x * c - this.y * s;
    var y = this.x * s + this.y * c;

    this.x = x + v.x;
    this.y = y + v.y;
}

Vector2.prototype.rotateTo = function (v, center, offsetAngle) {
    offsetAngle = offsetAngle ? offsetAngle : 0.0;

    var a = Vector2.subtract(this, center);
    var b = Vector2.subtract(v, center);
    var angle = Vector2.angle(b, a);

    this.rotateAround(angle + offsetAngle, center);
}

Vector2.prototype.getRotateToAngle = function (v, center) {
    var a = Vector2.subtract(this, center);
    var b = Vector2.subtract(v, center);
    var angle = Vector2.angle(b, a);

    return angle;
}

Vector2.prototype.isInPolygon = function (polygon) {
    var inside = false;

    // Its not always a given, that the polygon is convex (-> sugars)
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        if (((polygon[i].y > this.y) != (polygon[j].y > this.y)) &&
            (this.x < (polygon[j].x - polygon[i].x) * (this.y - polygon[i].y) /
                (polygon[j].y - polygon[i].y) + polygon[i].x)) {
            inside = !inside;
        }
    }


    return inside;
}

Vector2.prototype.length = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

Vector2.prototype.normalize = function () {
    this.divide(this.length());
}

Vector2.prototype.normalized = function () {
    return Vector2.divide(this, this.length());
}

Vector2.scalarProjection = function (v1, v2) {
    var unit = v2.normalized();
    return Vector2.dot(v1, unit);
}

Vector2.prototype.whichSide = function (v1, v2) {
    return (this.x - v1.x) * (v2.y - v1.y) - (this.y - v1.y) * (v2.x - v1.x);
}

Vector2.prototype.sameSideAs = function (v1, v2, v3) {
    var d = this.whichSide(v1, v2);
    var dRef = v3.whichSide(v1, v2);

    return d < 0 && dRef < 0 || d == 0 && dRef == 0 || d > 0 && dRef > 0;
}

function Line(a, b, elementA, elementB) {
    this.a = a ? a : new Vector2(0, 0);
    this.b = b ? b : new Vector2(0, 0);

    this.elementA = elementA;
    this.elementB = elementB;
}

Line.prototype.clone = function() {
    return new Line(this.a.clone(), this.b.clone(), this.elementA, this.elementB);
}

Line.prototype.getLength = function () {
    return Math.sqrt(Math.pow(this.b.x - this.a.x, 2) + Math.pow(this.b.y - this.a.y, 2));
}


Line.prototype.getAngle = function () {
    // Get the angle between the line and the x-axis
    var diff = Vector2.subtract(this.getRightVector(), this.getLeftVector());
    return diff.angle();
}

Line.prototype.getRightVector = function () {
    // Return the vector with the larger x value (the right one)
    if (this.a.x < this.b.x)
        return this.b;
    else
        return this.a;
}

Line.prototype.getLeftVector = function () {
    // Return the vector with the smaller x value (the left one)
    if (this.a.x < this.b.x)
        return this.a;
    else
        return this.b;
}

Line.prototype.getRightElement = function () {
    if (this.a.x < this.b.x)
        return this.elementB;
    else
        return this.elementA;
}

Line.prototype.getLeftElement = function () {
    if (this.a.x < this.b.x)
        return this.elementA;
    else
        return this.elementB;
}

Line.prototype.setRightVector = function (x, y) {
    if (this.a.x < this.b.x)
        this.b.set(x, y);
    else
        this.a.set(x, y);
}

Line.prototype.rotateToXAxis = function () {
    var left = this.getLeftVector();
    this.setRightVector(left.x + this.getLength(), left.y);
}

Line.prototype.rotate = function (theta) {
    var l = this.getLeftVector();
    var r = this.getRightVector();
    var x = Math.cos(theta) * (r.x - l.x) - Math.sin(theta) * (r.y - l.y) + l.x;
    var y = Math.sin(theta) * (r.x - l.x) - Math.cos(theta) * (r.y - l.y) + l.y;
    this.setRightVector(x, y);

    return this;
}

Line.prototype.shortenA = function (by) {
    var f = Vector2.subtract(this.b, this.a);
    f.normalize();
    f.multiply(by);
    this.a.add(f);

    return this;
}

Line.prototype.shortenB = function (by) {
    var f = Vector2.subtract(this.a, this.b);
    f.normalize();
    f.multiply(by);
    this.b.add(f);

    return this;
}

Line.prototype.shorten = function (by) {
    var f = Vector2.subtract(this.a, this.b);
    f.normalize();
    f.multiply(by / 2.0);
    this.b.add(f);
    this.a.subtract(f);

    return this;
}

function ArrayHelper() {

}

ArrayHelper.clone = function (array) {
    var out = Array.isArray(array) ? [] : {};
    for (var key in array) {
        var value = array[key];
        out[key] = (typeof value === 'object') ? ArrayHelper.clone(value) : value;
    }
    return out;
}

ArrayHelper.print = function (array) {
    if (array.length == 0) return '';

    var s = '(';

    for (var i = 0; i < array.length; i++) {
        s += array[i].id + ', ';
    }

    s = s.substring(0, s.length - 2);

    return s + ')';
}

ArrayHelper.each = function (array, func) {
    for (var i = 0; i < array.length; i++) {
        func(array[i]);
    }
}

ArrayHelper.get = function (array, property, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][property] == value) return array[i];
    }
}

ArrayHelper.contains = function (array, options) {
    if (!options.property && !options.func) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == options.value) return true;
        }
    } else if (options.func) {
        for (var i = 0; i < array.length; i++) {
            if (options.func(array[i])) return true;
        }
    } else {
        for (var i = 0; i < array.length; i++) {
            if (array[i][options.property] == options.value) return true;
        }
    }

    return false;
}

ArrayHelper.intersection = function (arrA, arrB) {
    var intersection = new Array();
    for (var i = 0; i < arrA.length; i++) {
        for (var j = 0; j < arrB.length; j++) {
            if (arrA[i] == arrB[j]) intersection.push(arrA[i]);
        }
    }

    return intersection;
}

ArrayHelper.unique = function (arr) {
    var contains = {};
    return arr.filter(function (i) {
        // using !== instead of hasOwnProperty (http://andrew.hedges.name/experiments/in/)
        return contains[i] !== undefined ? false : (contains[i] = true);
    });
}

ArrayHelper.count = function (array, value) {
    var count = 0;

    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) count++;
    }

    return count;
}

ArrayHelper.toggle = function (array, value) {
    var newArray = [];

    var removed = false;
    for (var i = 0; i < array.length; i++) {
        // Do not copy value if it exists
        if (!(array[i] == value)) {
            newArray.push(array[i]);
        } else {
            // The element was not copied to the new array, which
            // means it was removed
            removed = true;
        }
    }

    // If the element was not removed, then it was not in the array
    // so add it
    if (!removed) {
        newArray.push(value);
    }

    return newArray;
}

ArrayHelper.remove = function (array, item) {
    var tmp = [];

    for (var i = 0; i < array.length; i++) {
        if (array[i] != item) tmp.push(array[i]);
    }

    return tmp;
}

ArrayHelper.removeAll = function (array1, array2) {
    return array1.filter(function (item) {
        return array2.indexOf(item) === -1;
    });
}

ArrayHelper.merge = function (array1, array2) {
    var array = new Array(array1.length + array2.length);

    for (var i = 0; i < array1.length; i++) {
        array[i] = array1[i];
    }

    for (var i = 0; i < array2.length; i++) {
        array[array1.length + i] = array2[i];
    }

    return array;
}

ArrayHelper.containsAll = function (array1, array2) {
    var containing = 0;
    for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j]) containing++;
        }
    }
    return containing == array2.length;
}

function MathHelper() {

}

MathHelper.round = function (value, decimals) {
    decimals = decimals ? decimals : 1;
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

MathHelper.Geom = function () {

}

MathHelper.Geom.meanAngle = function (arr) {
    var sin = 0,
        cos = 0;
    for (var i = 0; i < arr.length; i++) {
        sin += Math.sin(arr[i]);
        cos += Math.cos(arr[i]);
    }

    return Math.atan2(sin / arr.length, cos / arr.length);
}

MathHelper.Geom.innerAngle = function (n) {
    return MathHelper.Geom.toRad((n - 2) * 180 / n);
}

MathHelper.Geom.polyCircumradius = function (s, n) {
    return s / (2 * Math.sin(Math.PI / n));
}

MathHelper.Geom.apothem = function (r, n) {
    return r * Math.cos(Math.PI / n);
}

MathHelper.Geom.centralAngle = function (n) {
    return MathHelper.Geom.toRad(360 / n);
}

MathHelper.Geom.toDeg = function (x) {
    return x * 180 / Math.PI;
}

MathHelper.Geom.toRad = function (x) {
    return x * Math.PI / 180;
}