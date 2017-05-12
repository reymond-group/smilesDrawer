/** A class encapsulating the functionality to find the smallest set of smallest rings in a graph. */
class SSSR {
    /**
     * Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.
     * 
     * @param {array} adjacencyMatrix A 2-dimensional array representing a graph.
     * @returns {array} An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.
     */
    static getRings(adjacencyMatrix) {
        // Remove vertices that are not members of a ring
        let removed;

        do {
            removed = 0;

            for (let i = 0; i < adjacencyMatrix.length; i++) {
                let nNeighbours = adjacencyMatrix[i].reduce((a, b) => a + b, 0);
                
                if (nNeighbours === 1) {
                    adjacencyMatrix[i].fill(0);

                    for (let j = 0; j < adjacencyMatrix.length; j++) {
                        adjacencyMatrix[j][i] = 0;
                    }

                    removed++;
                }
            }            
        } while (removed > 0);

        // Update the adjacency matrix (remove rows and columns filled with 0s)
        
        // Keep this as a map of new indices to old indices
        let indices = [];
        let indicesToRemove = [];
        let updatedAdjacencyMatrix = [];

        // Only the rows are filtered here, the columns still have their original values
        for (let i = 0; i < adjacencyMatrix.length; i++) {
            if (adjacencyMatrix[i].indexOf(1) >= 0) {
                indices.push(i);
                updatedAdjacencyMatrix.push(adjacencyMatrix[i]);
            } else {
                indicesToRemove.push(i);
            }
        }

        // Remove the unused values from the adjacency matrix

        for (let i = 0; i < updatedAdjacencyMatrix.length; i++) {
            for (let j = indicesToRemove.length - 1; j >= 0; j--) {
                updatedAdjacencyMatrix[i].splice(indicesToRemove[j], 1);
            }
        }

        adjacencyMatrix = updatedAdjacencyMatrix;

        if (adjacencyMatrix.length === 0) {
            return null;
        }

        // Get the edge list and the theoretical number of rings in SSSR
        let nSssr = SSSR.getEdgeList(adjacencyMatrix).length - adjacencyMatrix.length + 1;

        if (nSssr === 0) {
            return null;
        }

        let {d, pe1, pe2} = SSSR.getPathIncludedDistanceMatrices(adjacencyMatrix);
        let c = SSSR.getRingCandidates(d, pe1, pe2);
        let sssr = SSSR.getSSSR(c, d, pe1, pe2, nSssr);
        let rings = new Array(sssr.length);

        for (let i = 0; i < sssr.length; i++) {
            rings[i] = new Array(sssr[i].length);
            
            let index = 0;

            for (let val of sssr[i]) {
                rings[i][index++] = indices[val];
            }
        }

        return rings;
    }

    /**
     * Creates a printable string from a matrix (2D array).
     * 
     * @param {array} matrix A 2D array.
     * @returns {string} A string representing the matrix.
     */
    static matrixToString(matrix) {
        let str = '';

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                str += matrix[i][j] + ' ';
            }

            str += '\n';
        }

        return str;
    }

    /**
     * Returnes the two path-included distance matrices used to find the sssr.
     * 
     * @param {array} adjacencyMatrix An adjacency matrix.
     * @returns {object} The path-included distance matrices. { p1, p2 }
     */
    static getPathIncludedDistanceMatrices(adjacencyMatrix) {
        let length = adjacencyMatrix.length;
        let d = Array(length);
        let pe1 = Array(length);
        let pe2 = Array(length);
        var l = 0;
        var m = 0;
        var n = 0;

        for (let i = 0; i < length; i++) {
            d[i] = Array(length);
            pe1[i] = Array(length);
            pe2[i] = Array(length);
            
            for (let j = 0; j < length; j++) {
                d[i][j] = (i === j || adjacencyMatrix[i][j] === 1) ? adjacencyMatrix[i][j] : Number.POSITIVE_INFINITY;

                if (d[i][j] === 1) {
                    pe1[i][j] = [[[i, j]]];
                } else {
                    pe1[i][j] = [];
                }

                pe2[i][j] = [];
            }
        }

        for (let k = 0; k < length; k++) {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length; j++) {
                    const previousPathLength = d[i][j];
                    const newPathLength = d[i][k] + d[k][j];

                    if (previousPathLength > newPathLength) {
                        if (previousPathLength === newPathLength + 1) {
                            pe2[i][j] = [pe1[i][j].length];
                            for (l = 0; l < pe1[i][j].length; l++) {
                                pe2[i][j][l] = [pe1[i][j][l].length];
                                for (m = 0; m < pe1[i][j][l].length; m++) {
                                    pe2[i][j][l][m] = [pe1[i][j][l][m].length];
                                    for (n = 0; n < pe1[i][j][l][m].length; n++) {
                                        pe2[i][j][l][m][n] = [pe1[i][j][l][m][0], pe1[i][j][l][m][1]];
                                    }
                                }
                            }
                        } else {
                            pe2[i][j] = [];
                        }

                        d[i][j] = newPathLength;
                        
                        pe1[i][j] = [[]];

                        for (l = 0; l < pe1[i][k][0].length; l++) {
                            pe1[i][j][0].push(pe1[i][k][0][l]);
                        }
                        for (l = 0; l < pe1[k][j][0].length; l++) {
                            pe1[i][j][0].push(pe1[k][j][0][l]);
                        }
                    } else if (previousPathLength === newPathLength) {
                        if (pe1[i][k].length && pe1[k][j].length) {
                            if (pe1[i][j].length) {
                                let tmp = [];

                                for (l = 0; l < pe1[i][k][0].length; l++) {
                                    tmp.push(pe1[i][k][0][l]);
                                }
                                for (l = 0; l < pe1[k][j][0].length; l++) {
                                    tmp.push(pe1[k][j][0][l]);
                                }

                                pe1[i][j].push(tmp);
                            } else {
                                let tmp = [];

                                for (l = 0; l < pe1[i][k][0].length; l++) {
                                    tmp.push(pe1[i][k][0][l]);
                                }
                                for (l = 0; l < pe1[k][j][0].length; l++) {
                                    tmp.push(pe1[k][j][0][l]);
                                }

                                pe1[i][j][0] = tmp
                            }
                        }
                    } else if (previousPathLength === newPathLength - 1) {
                        if (pe2[i][j].length) {
                            let tmp = [];

                            for (var l = 0; l < pe1[i][k][0].length; l++) {
                                tmp.push(pe1[i][k][0][l]);
                            }
                            for (var l = 0; l < pe1[k][j][0].length; l++) {
                                tmp.push(pe1[k][j][0][l]);
                            }

                            pe2[i][j].push(tmp);
                        } else {
                            let tmp = [];

                            for (var l = 0; l < pe1[i][k][0].length; l++) {
                                tmp.push(pe1[i][k][0][l]);
                            }
                            for (var l = 0; l < pe1[k][j][0].length; l++) {
                                tmp.push(pe1[k][j][0][l]);
                            }

                            pe2[i][j][0] = tmp;
                        }
                    }
                }
            }
        }

        return {
            d: d,
            pe1: pe1, 
            pe2: pe2 
        };
    }

    /**
     * Get the ring candidates from the path-included distance matrices.
     * 
     * @param {array} d The distance matrix.
     * @param {array} pe1 A matrix containing the shortest paths.
     * @param {array} pe2 A matrix containing the shortest paths + one vertex.
     * @returns {array} The ring candidates.
     */
    static getRingCandidates(d, pe1, pe2) {
        let length = d.length;
        let candidates = [];
        let c = 0;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (d[i][j] === 0 || (pe1[i][j].length === 1 && pe2[i][j] === 0)) {
                    continue;
                } else {
                    // c is the number of vertices in the cycle.
                    if (pe2[i][j].length !== 0) {
                        c = 2 * (d[i][j] + 0.5);
                    } else {
                        c = 2 * d[i][j];
                    }
                    
                    candidates.push([c, pe1[i][j], pe2[i][j]]);
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
     * @param {array} c The candidates.
     * @param {array} d The distance matrix.
     * @param {array} pe1 A matrix containing the shortest paths.
     * @param {array} pe2 A matrix containing the shortest paths + one vertex.
     * @param {number} nsssr The theoretical number of rings in the graph.
     * @returns {array} The smallest set of smallest rings.
     */
    static getSSSR(c, d, pe1, pe2, nsssr) {
        let cSssr = [];

        for (let i = 0; i < c.length; i++) {
            if (c[i][0] % 2 !== 0) {
                for (let j = 0; j < c[i][2].length; j++) {
                    let bonds = c[i][1][0].concat(c[i][2][j]);
                    let atoms = SSSR.bondsToAtoms(bonds);
                    
                    if (bonds.length === atoms.size && !SSSR.pathSetsContain(cSssr, atoms)) {
                        cSssr.push(atoms);
                    }

                    if (cSssr.length === nsssr) {
                        return cSssr;
                    }
                }
            } else {
                for (let j = 0; j < c[i][1].length - 1; j++) {
                    let bonds = c[i][1][j].concat(c[i][1][j + 1]);
                    let atoms = SSSR.bondsToAtoms(bonds);

                    if (bonds.length === atoms.size && !SSSR.pathSetsContain(cSssr, atoms)) {
                        cSssr.push(atoms);
                    }

                    if (cSssr.length === nsssr) {
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
     * @param {array} adjacencyMatrix An adjacency matrix.
     * @returns {number} The number of edges in the graph defined by the adjacency matrix.
     */
    static getEdgeCount(adjacencyMatrix) {
        let edgeCount = 0;
        let length = adjacencyMatrix.length;

        for (let i = 0; i < length - 1; i++) {
            for (let j = i + 1; j < length; j++) {
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
     * @param {array} adjacencyMatrix An adjacency matrix.
     * @returns {array} An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]
     */
    static getEdgeList(adjacencyMatrix) {
        let length = adjacencyMatrix.length;
        let edgeList = [];

        for (let i = 0; i < length - 1; i++) {
            for (let j = i + 1; j < length; j++) {
                if (adjacencyMatrix[i][j] === 1) {
                    edgeList.push([i,j]);
                } 
            }
        }

        return edgeList;
    }

    /**
     * Return a set of vertex indices contained in an array of bonds.
     * 
     * @param {array} bonds An array of bonds.
     * @returns {set} An array of vertices.
     */
    static bondsToAtoms(bonds) {
        let atoms = new Set();
        
        for (let i = 0; i < bonds.length; i++) {
            atoms.add(bonds[i][0]);
            atoms.add(bonds[i][1]);
        }

        return atoms;
    }

    /**
     * Checks whether or not a given path already exists in an array of paths.
     * 
     * @param {array} pathSets An array of sets each representing a path.
     * @param {set} pathSet A set representing a path.
     * @returns {boolean} A boolean indicating whether or not a give path is contained within a set.
     */
    static pathSetsContain(pathSets, pathSet) {
        for (let i = 0; i < pathSets.length; i++) {
            if (pathSets[i].size !== pathSet.size) {
                continue;
            }
            
            if (SSSR.areSetsEqual(pathSets[i], pathSet)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks whether or not two sets are equal (contain the same elements).
     * 
     * @param {set} setA A set.
     * @param {set} setB A set.
     * @returns {boolean} A boolean indicating whether or not the two sets are equal.
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
}