// @ts-check
import Graph from './Graph';

/** A class encapsulating the functionality to find the smallest set of smallest rings in a graph. */
export default class SSSR {
    /**
     * Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.
     *
     * @param {Graph} graph A Graph object.
     * @param {Boolean} [experimental=false] Whether or not to use experimental SSSR.
     * @returns {Array[]} An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.
     */
    static getRings(graph, experimental = false) {
        let adjacencyMatrix = graph.getComponentsAdjacencyMatrix();
        if (adjacencyMatrix.length === 0) {
            return [];
        }

        let connectedComponents = Graph.getConnectedComponents(adjacencyMatrix);
        let rings = [];

        for (let i = 0; i < connectedComponents.length; i++) {
            let connectedComponent = connectedComponents[i];
            let ccAdjacencyMatrix = graph.getSubgraphAdjacencyMatrix([...connectedComponent]);

            let arrBondCount = new Uint16Array(ccAdjacencyMatrix.length);
            let arrRingCount = new Uint16Array(ccAdjacencyMatrix.length);

            for (let j = 0; j < ccAdjacencyMatrix.length; j++) {
                arrRingCount[j] = 0;
                arrBondCount[j] = 0;

                for (let k = 0; k < ccAdjacencyMatrix[j].length; k++) {
                    arrBondCount[j] += ccAdjacencyMatrix[j][k];
                }
            }

            // Get the edge number and the theoretical number of rings in SSSR
            let nEdges = 0;

            for (let j = 0; j < ccAdjacencyMatrix.length; j++) {
                for (let k = j + 1; k < ccAdjacencyMatrix.length; k++) {
                    nEdges += ccAdjacencyMatrix[j][k];
                }
            }

            let nSssr = nEdges - ccAdjacencyMatrix.length + 1;

            // If all vertices have 3 incident edges, calculate with different formula (see Euler)
            let allThree = true;
            for (let j = 0; j < arrBondCount.length; j++) {
                if (arrBondCount[j] !== 3) {
                    allThree = false;
                }
            }

            if (allThree) {
                nSssr = 2.0 + nEdges - ccAdjacencyMatrix.length;
            }

            // All vertices are part of one ring if theres only one ring.
            if (nSssr === 1) {
                rings.push([...connectedComponent]);
                continue;
            }

            if (experimental) {
                nSssr = 999;
            }

            let {d, pe, pe_prime} = SSSR.getPathIncludedDistanceMatrices(ccAdjacencyMatrix);
            let c = SSSR.getRingCandidates(d, pe, pe_prime);
            let sssr = SSSR.getSSSR(c, d, ccAdjacencyMatrix, pe, pe_prime, arrBondCount, arrRingCount, nSssr);

            // If the SSSR algorithm found fewer rings than expected,
            // supplement with BFS-based ring finding for missing cycles.
            if (sssr.length < nSssr) {
                let missing = SSSR.findMissingRings(ccAdjacencyMatrix, sssr, nSssr);
                for (let j = 0; j < missing.length; j++) {
                    sssr.push(missing[j]);
                }
            }

            for (let j = 0; j < sssr.length; j++) {
                let ring = Array(sssr[j].size);
                let index = 0;

                for (let val of sssr[j]) {
                    // Get the original id of the vertex back
                    ring[index++] = connectedComponent[val];
                }

                rings.push(ring);
            }
        }

        // So, for some reason, this would return three rings for C1CCCC2CC1CCCC2, which is wrong
        // As I don't have time to fix this properly, it will stay in. I'm sorry next person who works
        // on it. At that point it might be best to reimplement the whole SSSR thing...

        // The error is SSSR would compute the correct expected ring count but actually return fewer rings 
        // than expected. Fix is add BFS post SSSR to recover via findMissingRings() -which is probably a better fix 
        // than rewriting SSSR entirely at least for now-, it finds uncovered edges and use shortest cycle (BFS) to fill 
        // the missing rings. 
        
        return rings;
    }

    /**
     * Creates a printable string from a matrix (2D array).
     *
     * @param {Array[]} matrix A 2D array.
     * @returns {String} A string representing the matrix.
     */
    static matrixToString(matrix) {
        let str = '';

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                str += matrix[i][j] + ' ';
            }

            str += '\n';
        }

        return str;
    }

    /**
     * Returnes the two path-included distance matrices used to find the sssr.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Object} The path-included distance matrices. { p1, p2 }
     */
    static getPathIncludedDistanceMatrices(adjacencyMatrix) {
        let length = adjacencyMatrix.length;
        let d = Array(length);
        let pe = Array(length);
        let pe_prime = Array(length);

        // Dummy initializations to set the TypeScript type:
        var i = 0;
        var j = 0;
        var k = 0;

        var l = 0;
        var m = 0;
        var n = 0;

        i = length;
        while (i--) {
            d[i] = Array(length);
            pe[i] = Array(length);
            pe_prime[i] = Array(length);

            j = length;
            while (j--) {
                d[i][j] = (i === j || adjacencyMatrix[i][j] === 1) ? adjacencyMatrix[i][j] : Number.POSITIVE_INFINITY;

                if (d[i][j] === 1) {
                    pe[i][j] = [[[i, j]]];
                }
                else {
                    pe[i][j] = [];
                }

                pe_prime[i][j] = [];
            }
        }

        k = length;
        while (k--) {
            i = length;
            while (i--) {
                j = length;
                while (j--) {
                    const previousPathLength = d[i][j];
                    const newPathLength = d[i][k] + d[k][j];

                    if (previousPathLength > newPathLength) {
                        if (previousPathLength === newPathLength + 1) {
                            pe_prime[i][j] = [pe[i][j].length];
                            l = pe[i][j].length;
                            while (l--) {
                                pe_prime[i][j][l] = [pe[i][j][l].length];
                                m = pe[i][j][l].length;
                                while (m--) {
                                    pe_prime[i][j][l][m] = [pe[i][j][l][m].length];
                                    n = pe[i][j][l][m].length;
                                    while (n--) {
                                        pe_prime[i][j][l][m][n] = [pe[i][j][l][m][0], pe[i][j][l][m][1]];
                                    }
                                }
                            }
                        }
                        else {
                            pe_prime[i][j] = [];
                        }

                        d[i][j] = newPathLength;

                        pe[i][j] = [[]];

                        l = pe[i][k][0].length;
                        while (l--) {
                            pe[i][j][0].push(pe[i][k][0][l]);
                        }

                        l = pe[k][j][0].length;
                        while (l--) {
                            pe[i][j][0].push(pe[k][j][0][l]);
                        }
                    }
                    else if (previousPathLength === newPathLength) {
                        if (pe[i][k].length && pe[k][j].length) {
                            if (pe[i][j].length) {
                                let tmp = [];

                                l = pe[i][k][0].length;
                                while (l--) {
                                    tmp.push(pe[i][k][0][l]);
                                }

                                l = pe[k][j][0].length;
                                while (l--) {
                                    tmp.push(pe[k][j][0][l]);
                                }

                                pe[i][j].push(tmp);
                            }
                            else {
                                let tmp = [];
                                l = pe[i][k][0].length;
                                while (l--) {
                                    tmp.push(pe[i][k][0][l]);
                                }

                                l = pe[k][j][0].length;
                                while (l--) {
                                    tmp.push(pe[k][j][0][l]);
                                }

                                pe[i][j][0] = tmp;
                            }
                        }
                    }
                    else if (previousPathLength === newPathLength - 1) {
                        if (pe_prime[i][j].length) {
                            let tmp = [];

                            l = pe[i][k][0].length;
                            while (l--) {
                                tmp.push(pe[i][k][0][l]);
                            }

                            l = pe[k][j][0].length;
                            while (l--) {
                                tmp.push(pe[k][j][0][l]);
                            }

                            pe_prime[i][j].push(tmp);
                        }
                        else {
                            let tmp = [];

                            l = pe[i][k][0].length;
                            while (l--) {
                                tmp.push(pe[i][k][0][l]);
                            }

                            l = pe[k][j][0].length;
                            while (l--) {
                                tmp.push(pe[k][j][0][l]);
                            }

                            pe_prime[i][j][0] = tmp;
                        }
                    }
                }
            }
        }

        return {
            d:        d,
            pe:       pe,
            pe_prime: pe_prime,
        };
    }

    /**
     * Get the ring candidates from the path-included distance matrices.
     *
     * @param {Array[]} d The distance matrix.
     * @param {Array[]} pe A matrix containing the shortest paths.
     * @param {Array[]} pe_prime A matrix containing the shortest paths + one vertex.
     * @returns {Array[]} The ring candidates.
     */
    static getRingCandidates(d, pe, pe_prime) {
        let length = d.length;
        let candidates = [];
        let c = 0;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (d[i][j] === 0 || (pe[i][j].length === 1 && pe_prime[i][j] === 0)) {
                    continue;
                }
                else {
                    // c is the number of vertices in the cycle.
                    if (pe_prime[i][j].length !== 0) {
                        c = 2 * (d[i][j] + 0.5);
                    }
                    else {
                        c = 2 * d[i][j];
                    }

                    if (c !== Infinity) {
                        candidates.push([c, pe[i][j], pe_prime[i][j]]);
                    }
                }
            }
        }

        // Candidates have to be sorted by c
        candidates.sort(function(a, b) {
            return a[0] - b[0];
        });

        return candidates;
    }

    /**
     * Searches the candidates for the smallest set of smallest rings.
     *
     * @param {Array[]} c The candidates.
     * @param {Array[]} d The distance matrix.
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @param {Array[]} pe A matrix containing the shortest paths.
     * @param {Array[]} pe_prime A matrix containing the shortest paths + one vertex.
     * @param {Uint16Array} arrBondCount A matrix containing the bond count of each vertex.
     * @param {Uint16Array} arrRingCount A matrix containing the number of rings associated with each vertex.
     * @param {Number} nsssr The theoretical number of rings in the graph.
     * @returns {Set[]} The smallest set of smallest rings.
     */
    static getSSSR(c, d, adjacencyMatrix, pe, pe_prime, arrBondCount, arrRingCount, nsssr) {
        let cSssr = [];
        let allBonds = [];

        for (let i = 0; i < c.length; i++) {
            if (c[i][0] % 2 !== 0) {
                for (let j = 0; j < c[i][2].length; j++) {
                    let bonds = c[i][1][0].concat(c[i][2][j]);
                    // Some bonds are added twice, resulting in [[u, v], [u, v]] instead of [u, v].
                    // TODO: This is a workaround, fix later. Probably should be a set rather than an array, however the computational overhead
                    //       is probably bigger compared to leaving it like this.
                    for (let k = 0; k < bonds.length; k++) {
                        if (bonds[k][0].constructor === Array) bonds[k] = bonds[k][0];
                    }

                    let atoms = SSSR.bondsToAtoms(bonds);

                    if (SSSR.getBondCount(atoms, adjacencyMatrix) === atoms.size && !SSSR.pathSetsContain(cSssr, atoms, bonds, allBonds, arrBondCount, arrRingCount)) {
                        cSssr.push(atoms);
                        allBonds = allBonds.concat(bonds);
                    }

                    if (cSssr.length > nsssr) {
                        return cSssr;
                    }
                }
            }
            else {
                for (let j = 0; j < c[i][1].length - 1; j++) {
                    let bonds = c[i][1][j].concat(c[i][1][j + 1]);
                    // Some bonds are added twice, resulting in [[u, v], [u, v]] instead of [u, v].
                    // TODO: This is a workaround, fix later. Probably should be a set rather than an array, however the computational overhead
                    //       is probably bigger compared to leaving it like this.
                    for (let k = 0; k < bonds.length; k++) {
                        if (bonds[k][0].constructor === Array) bonds[k] = bonds[k][0];
                    }

                    let atoms = SSSR.bondsToAtoms(bonds);

                    if (SSSR.getBondCount(atoms, adjacencyMatrix) === atoms.size && !SSSR.pathSetsContain(cSssr, atoms, bonds, allBonds, arrBondCount, arrRingCount)) {
                        cSssr.push(atoms);
                        allBonds = allBonds.concat(bonds);
                    }

                    if (cSssr.length > nsssr) {
                        return cSssr;
                    }
                }
            }
        }

        return cSssr;
    }

    /**
     * Returns the number of edges in a graph defined by an adjacency matrix.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Number} The number of edges in the graph defined by the adjacency matrix.
     */
    static getEdgeCount(adjacencyMatrix) {
        let edgeCount = 0;
        let length = adjacencyMatrix.length;

        var i = length - 1;
        while (i--) {
            var j = length;
            while (j--) {
                if (adjacencyMatrix[i][j] === 1) {
                    edgeCount++;
                }
            }
        }

        return edgeCount;
    }

    /**
     * Returns an edge list constructed form an adjacency matrix.
     *
     * @param {Array[]} adjacencyMatrix An adjacency matrix.
     * @returns {Array[]} An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]
     */
    static getEdgeList(adjacencyMatrix) {
        let length = adjacencyMatrix.length;
        let edgeList = [];

        var i = length - 1;
        while (i--) {
            var j = length;
            while (j--) {
                if (adjacencyMatrix[i][j] === 1) {
                    edgeList.push([i, j]);
                }
            }
        }

        return edgeList;
    }

    /**
     * Return a set of vertex indices contained in an array of bonds.
     *
     * @param {Array} bonds An array of bonds. A bond is defined as [ sourceVertexId, targetVertexId ].
     * @returns {Set<Number>} An array of vertices.
     */
    static bondsToAtoms(bonds) {
        let atoms = new Set();

        var i = bonds.length;
        while (i--) {
            atoms.add(bonds[i][0]);
            atoms.add(bonds[i][1]);
        }
        return atoms;
    }

    /**
    * Returns the number of bonds within a set of atoms.
    *
    * @param {Set<Number>} atoms An array of atom ids.
    * @param {Array[]} adjacencyMatrix An adjacency matrix.
    * @returns {Number} The number of bonds in a set of atoms.
    */
    static getBondCount(atoms, adjacencyMatrix) {
        let count = 0;
        for (let u of atoms) {
            for (let v of atoms) {
                if (u === v) {
                    continue;
                }
                count += adjacencyMatrix[u][v];
            }
        }

        return count / 2;
    }

    /**
     * Checks whether or not a given path already exists in an array of paths.
     *
     * @param {Set[]} pathSets An array of sets each representing a path.
     * @param {Set<Number>} pathSet A set representing a path.
     * @param {Array[]} bonds The bonds associated with the current path.
     * @param {Array[]} allBonds All bonds currently associated with rings in the SSSR set.
     * @param {Uint16Array} arrBondCount A matrix containing the bond count of each vertex.
     * @param {Uint16Array} arrRingCount A matrix containing the number of rings associated with each vertex.
     * @returns {Boolean} A boolean indicating whether or not a give path is contained within a set.
     */
    static pathSetsContain(pathSets, pathSet, bonds, allBonds, arrBondCount, arrRingCount) {
        var i = pathSets.length;
        while (i--) {
            if (SSSR.isSupersetOf(pathSet, pathSets[i])) {
                return true;
            }

            if (pathSets[i].size !== pathSet.size) {
                continue;
            }

            if (SSSR.areSetsEqual(pathSets[i], pathSet)) {
                return true;
            }
        }

        // Check if the edges from the candidate are already all contained within the paths of the set of paths.
        // TODO: For some reason, this does not replace the isSupersetOf method above -> why?
        let count = 0;
        let allContained = false;
        i = bonds.length;
        while (i--) {
            var j = allBonds.length;
            while (j--) {
                if ((bonds[i][0] === allBonds[j][0] && bonds[i][1] === allBonds[j][1])
                    || (bonds[i][1] === allBonds[j][0] && bonds[i][0] === allBonds[j][1])
                ) {
                    count++;
                }

                if (count === bonds.length) {
                    allContained = true;
                }
            }
        }

        // If all the bonds and thus vertices are already contained within other rings
        // check if there's one vertex with ringCount < bondCount
        let specialCase = false;
        if (allContained) {
            for (let element of pathSet) {
                if (arrRingCount[element] < arrBondCount[element]) {
                    specialCase = true;
                    break;
                }
            }
        }

        if (allContained && !specialCase) {
            return true;
        }

        // Update the ring counts for the vertices
        for (let element of pathSet) {
            arrRingCount[element]++;
        }

        return false;
    }

    /**
     * Checks whether or not two sets are equal (contain the same elements).
     *
     * @param {Set<Number>} setA A set.
     * @param {Set<Number>} setB A set.
     * @returns {Boolean} A boolean indicating whether or not the two sets are equal.
     */
    static areSetsEqual(setA, setB) {
        if (setA.size !== setB.size) {
            return false;
        }

        for (let element of setA) {
            if (!setB.has(element)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Checks whether or not a set (setA) is a superset of another set (setB).
     *
     * @param {Set<Number>} setA A set.
     * @param {Set<Number>} setB A set.
     * @returns {Boolean} A boolean indicating whether or not setB is a superset of setA.
     */
    static isSupersetOf(setA, setB) {
        for (let element of setB) {
            if (!setA.has(element)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Find missing rings using BFS when the main SSSR algorithm falls short.
     * For each edge not covered by existing rings, find the shortest cycle
     * containing that edge.
     *
     * @static
     * @param {Array[]} adjacencyMatrix 
     * @param {Set[]} existingRings The rings already found by the SSSR algorithm.
     * @param {Number} nSssr The expected number of rings.
     * @returns {Set[]} newly found rings 
     */
    static findMissingRings(adjacencyMatrix, existingRings, nSssr) {
        let length = adjacencyMatrix.length;
        let newRings = [];

        // Collect edges already covered by existing rings
        let coveredEdges = new Set();
        for (let ring of existingRings) {
            let members = [...ring];
            for (let k = 0; k < members.length; k++) {
                for (let l = k + 1; l < members.length; l++) {
                    if (adjacencyMatrix[members[k]][members[l]] === 1) {
                        let a = Math.min(members[k], members[l]);
                        let b = Math.max(members[k], members[l]);
                        coveredEdges.add(a + ',' + b);
                    }
                }
            }
        }

        // For each edge not in any existing ring, find shortest cycle through it
        for (let u = 0; u < length; u++) {
            for (let v = u + 1; v < length; v++) {
                if (adjacencyMatrix[u][v] !== 1) continue;

                let edgeKey = u + ',' + v;
                if (coveredEdges.has(edgeKey)) continue;

                // BFS from u to v without using edge u-v directly
                let cycle = SSSR.bfsShortestCycle(adjacencyMatrix, u, v, length);
                if (cycle !== null) {
                    let ringSet = new Set(cycle);

                    // Check it's not a duplicate of existing rings
                    let isDuplicate = false;
                    for (let existing of existingRings) {
                        if (SSSR.areSetsEqual(ringSet, existing)) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    for (let nr of newRings) {
                        if (SSSR.areSetsEqual(ringSet, nr)) {
                            isDuplicate = true;
                            break;
                        }
                    }

                    if (!isDuplicate) {
                        newRings.push(ringSet);
                        // Mark this ring's edges as covered
                        let members = [...ringSet];
                        for (let k = 0; k < members.length; k++) {
                            for (let l = k + 1; l < members.length; l++) {
                                if (adjacencyMatrix[members[k]][members[l]] === 1) {
                                    let a = Math.min(members[k], members[l]);
                                    let b = Math.max(members[k], members[l]);
                                    coveredEdges.add(a + ',' + b);
                                }
                            }
                        }

                        if (existingRings.length + newRings.length >= nSssr) {
                            return newRings;
                        }
                    }
                }
            }
        }

        return newRings;
    }

    /**
     * BFS to find shortest path from u to v without using the direct u-v edge.
     * Returns the cycle as an array of vertex indices, or null if no path exists.
     *
     * @static
     * @param {Array[]} adjacencyMatrix The adjacency matrix.
     * @param {Number} u Source vertex.
     * @param {Number} v Target vertex.
     * @param {Number} length Number of vertices.
     * @returns {Number[]|null} The cycle vertices, or null.
     */
    static bfsShortestCycle(adjacencyMatrix, u, v, length) {
        let visited = new Array(length).fill(false);
        let parent = new Array(length).fill(-1);
        let queue = [u];
        visited[u] = true;

        while (queue.length > 0) {
            let current = queue.shift();

            for (let neighbor = 0; neighbor < length; neighbor++) {
                if (adjacencyMatrix[current][neighbor] !== 1) continue;

                // Skip the direct u-v edge
                if (current === u && neighbor === v) continue;
                if (current === v && neighbor === u) continue;

                if (neighbor === v) {
                    // Found the path, reconstruct
                    let path = [v];
                    let node = current;
                    while (node !== -1) {
                        path.push(node);
                        node = parent[node];
                    }
                    return path;
                }

                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    parent[neighbor] = current;
                    queue.push(neighbor);
                }
            }
        }

        return null;
    }
}
