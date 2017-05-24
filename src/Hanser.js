/** A class encapsulating the functionality to find the rings in the graph using Hansers algorithm. */
class Hanser {
    constructor(vertices, edges) {
        this.vertices = vertices;
        this.edges = edges;
        this.cycles = [];
        this.paths = {};
        this.pathIdCounter = 0;

        this.getRings();
        this.removeBridgedRings();
    }

    getRings(vertices, edges) {
        for (var i = this.edges.length - 1; i >= 0; i--) {
            this.paths[this.pathIdCounter] = {
                id: this.pathIdCounter++, 
                nodes: [this.edges[i][0], this.edges[i][1]],
                source: this.edges[i][0],
                target: this.edges[i][1],
                isConnected: false
            };

            this.pathIdCounter++;
        }

        for (var i = this.vertices.length - 1; i >= 0; i--) {
            this.remove(i);
        }
    }

    remove(vertexId) {
        let paths = this.getPaths(vertexId);

        for (var i = 0; i < paths.length; i++) {
            for (var j = i + 1; j < paths.length; j++) {
                let path = this.splice(paths[i], paths[j]);
                if (path) {
                    if (path.isConnected) {
                        path.nodes.pop();
                        this.cycles.push(new Set(path.nodes));
                        delete this.paths[path.id];
                    } else {
                        this.paths[path.id] = path;
                    }
                }
            }
            
            delete this.paths[paths[i].id];
        }
    }

    getPaths(vertexId) {
        let paths = [];

        for (var i in this.paths) {
            let value = this.paths[i];

            if (value.source === vertexId || value.target === vertexId) {
                paths.push(value);
            }
        }

        return paths;
    }

    splice(next, previous) {
        let intersection = null;
        let nodes = next.nodes.concat();

        if (next.source === previous.source || next.source === previous.target) {
            intersection = next.source;
        } else {
            intersection = next.target;
        }

        if (intersection === next.source) {
            nodes = nodes.reverse();
        }

        if (intersection === previous.source) {
            for (var i = 1; i < previous.nodes.length; i++) {
                nodes.push(previous.nodes[i]);
            }
        } else {
            for (var i = previous.nodes.length - 2; i >= 0; i--) {
                nodes.push(previous.nodes[i]);
            }
        }

        // If the path contains duplicate vertex ids, skip.
        if (!this.valid(nodes)) {
            return;
        }

        return {
            id: this.pathIdCounter++, 
            nodes: nodes,
            source: nodes[0],
            target: nodes[nodes.length - 1],
            isConnected: nodes.length > 2 && nodes[0] === nodes[nodes.length - 1]
        }
    }

    valid(nodes) {
        for (var i = 1; i < nodes.length; i++) {
            for (var j = 1; j < nodes.length; j++) {
                if (i === j) {
                    continue;
                }

                if (nodes[i] === nodes[j]) {
                    return false;
                }
            }
        }

        return true;
    }

    removeBridgedRings() {
        if (this.cycles.length < 2) {
            return;
        }

        let vertexRings = new Array(this.vertices.length);

        for (var i = 0; i < this.vertices.length; i++) {
            vertexRings[i] = new Set();

            for (var j = 0; j < this.cycles.length; j++) {
                if (this.cycles[j].has(i)) {
                    vertexRings[i].add(j);
                } 
            }
        }

        // Return if there are no bridged rings (no vertices with ringcount > 2)
        for (var i = 0; i < vertexRings.length; i++) {
            if (vertexRings[i].size > 2) {
                return;
            }
        }

        console.log('vertexRings', vertexRings);
    }
}