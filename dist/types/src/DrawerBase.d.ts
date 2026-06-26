/**
 * The main class of the application representing the smiles drawer
 *
 * @property {Graph} graph The graph associated with this SmilesDrawer.Drawer instance.
 * @property {Number} ringIdCounter An internal counter to keep track of ring ids.
 * @property {Number} ringConnectionIdCounter An internal counter to keep track of ring connection ids.
 * @property {CanvasWrapper} canvasWrapper The CanvasWrapper associated with this SmilesDrawer.Drawer instance.
 * @property {Number} totalOverlapScore The current internal total overlap score.
 * @property {Object} defaultOptions The default options.
 * @property {Object} opts The merged options.
 * @property {Object} theme The current theme.
 */
export default class DrawerBase {
    /**
     * Resolves carbon label display mode, including legacy `terminalCarbons` when `showCarbons` is `'default'`.
     *
     * @param {Object} opts Merged drawer options.
     * @returns {'none'|'default'|'terminal'|'acyclic'|'all'}
     */
    static getEffectiveShowCarbonsMode(opts: any): "none" | "default" | "terminal" | "acyclic" | "all";
    /**
     * Inverts an E/Z bond marker; leaves other bonds unchanged.
     *
     * @param {?string} bond - The bond marker to invert.
     * @returns The bond marker, inverted if it was an E/Z bond.
     */
    static flipEZ(bond: string | null): string;
    /**
     * Gets the bond type of a ringbond given the bond markers at either end.
     *
     * This is necessary because some code elsewhere (Graph?) sets these markers
     * to '-' if they aren't specified.  This returns the first bond that differs
     * from the default.  It flips E/Z specification of the reverse bond (if any)
     * to make sure the stereochemistry is correct.
     *
     * @param {?string} fwd - The forward bond marker.
     * @param {?string} rev - The reverse bond marker.
     * @returns A bond marker, with correct E/Z stereochemistry.
     */
    static getRingbondType(fwd: string | null, rev: string | null): string;
    /**
     * The constructor for the class SmilesDrawer.
     *
     * @param {Object} options An object containing custom values for different options. It is merged with the default options.
     */
    constructor(options: any);
    graph: Graph;
    doubleBondConfigCount: number;
    doubleBondConfig: string;
    ringIdCounter: number;
    ringConnectionIdCounter: number;
    canvasWrapper: CanvasWrapper;
    totalOverlapScore: number;
    defaultOptions: {
        width: number;
        height: number;
        scale: number;
        bondThickness: number;
        bondLength: number;
        shortBondLength: number;
        bondSpacing: number;
        atomVisualization: string;
        isomeric: boolean;
        debug: boolean;
        terminalCarbons: boolean;
        showCarbons: string;
        explicitHydrogens: boolean;
        overlapSensitivity: number;
        overlapResolutionIterations: number;
        compactDrawing: boolean;
        fontFamily: string;
        fontSizeLarge: number;
        fontSizeSmall: number;
        padding: number;
        experimentalSSSR: boolean;
        experimentalWeights: boolean;
        kkThreshold: number;
        kkInnerThreshold: number;
        kkMaxIteration: number;
        kkMaxInnerIteration: number;
        kkMaxEnergy: number;
        weights: {
            colormap: any;
            additionalPadding: number;
            sigma: number;
            interval: number;
            opacity: number;
        };
        themes: {
            dark: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            light: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            oldschool: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            solarized: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            'solarized-dark': {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            matrix: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            github: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            carbon: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            cyberpunk: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            gruvbox: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            'gruvbox-dark': {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
            custom: {
                FOREGROUND: string;
                BACKGROUND: string;
                C: string;
                O: string;
                N: string;
                F: string;
                CL: string;
                BR: string;
                I: string;
                P: string;
                S: string;
                B: string;
                SI: string;
                H: string;
            };
        };
    };
    opts: {};
    theme: any;
    /**
     * Draws the parsed smiles data to a canvas element.
     *
     * @param {Object} data The tree returned by the smiles parser.
     * @param {(String|HTMLCanvasElement)} target The id of the HTML canvas element the structure is drawn to - or the element itself.
     * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
     * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
     */
    draw(data: any, target: (string | HTMLCanvasElement), themeName?: string, infoOnly?: boolean): void;
    themeManager: ThemeManager;
    /**
     * Returns the number of rings this edge is a part of.
     *
     * @param {Number} edgeId The id of an edge.
     * @returns {Number} The number of rings the provided edge is part of.
     */
    edgeRingCount(edgeId: number): number;
    /**
     * Returns an array containing the bridged rings associated with this  molecule.
     *
     * @returns {Ring[]} An array containing all bridged rings associated with this molecule.
     */
    getBridgedRings(): Ring[];
    /**
     * Returns an array containing all fused rings associated with this molecule.
     *
     * @returns {Ring[]} An array containing all fused rings associated with this molecule.
     */
    getFusedRings(): Ring[];
    /**
     * Returns an array containing all spiros associated with this molecule.
     *
     * @returns {Ring[]} An array containing all spiros associated with this molecule.
     */
    getSpiros(): Ring[];
    /**
     * Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings)
     *
     * @returns {String} A string as described in the method description.
     */
    printRingInfo(): string;
    /**
     * Rotates the drawing to make the widest dimension horizontal.
     */
    rotateDrawing(): void;
    /**
     * Returns the total overlap score of the current molecule.
     *
     * @returns {Number} The overlap score.
     */
    getTotalOverlapScore(): number;
    /**
     * Returns the ring count of the current molecule.
     *
     * @returns {Number} The ring count.
     */
    getRingCount(): number;
    /**
     * Checks whether or not the current molecule  a bridged ring.
     *
     * @returns {Boolean} A boolean indicating whether or not the current molecule  a bridged ring.
     */
    hasBridgedRing(): boolean;
    /**
     * Returns the number of heavy atoms (non-hydrogen) in the current molecule.
     *
     * @returns {Number} The heavy atom count.
     */
    getHeavyAtomCount(): number;
    /**
     * Returns the molecular formula of the loaded molecule as a string.
     *
     * @returns {String} The molecular formula.
     */
    getMolecularFormula(data?: any): string;
    /**
     * Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {(String|null)} Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.
     */
    getRingbondType(vertexA: Vertex, vertexB: Vertex): (string | null);
    initDraw(data: any, themeName: any, infoOnly: any, highlight_atoms: any): void;
    data: any;
    infoOnly: any;
    rings: any;
    ringConnections: any;
    originalRings: any[];
    originalRingConnections: any[];
    bridgedRing: boolean;
    highlight_atoms: any;
    processGraph(): void;
    /**
     * Initializes rings and ringbonds for the current molecule.
     */
    initRings(): void;
    initHydrogens(): void;
    /**
     * Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.
     *
     * @param {Number} ringId A ring id.
     * @returns {Number[]} An array containing all ring ids of rings part of a bridged ring system.
     */
    getBridgedRingRings(ringId: number): number[];
    /**
     * Checks whether or not a ring is part of a bridged ring.
     *
     * @param {Number} ringId A ring id.
     * @returns {Boolean} A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.
     */
    isPartOfBridgedRing(ringId: number): boolean;
    /**
     * Detect cage-like fused ring systems and route them through bridged-ring
     * layout.
     *
     * logic:
     * Check one fused ring component at a time. Rings are fused when they
     * share two or more atoms.
     *  A cage should have several rings fused on three or more sides.
     * Every atom in the cage skeleton should have three neighbours inside
     * the same fused component.
     * Most ring edges should be shared by two rings. A small boundary is
     *allowed because the SSSR can miss one face of a cage (see cubane example)
     * This rejects polycyclic aromatic hydrocarbons (PAHs) which are an exception to the rule
     *  check https://en.wikipedia.org/wiki/Polycyclic_aromatic_hydrocarbon
     * PAHs have outer atoms with only two neighbours inside the fused system.
     */
    markCageRingSystems(): void;
    /**
     * Check whether a fused ring component looks like a closed cage.
     *
     * @param {Number[]} ringIds Ring ids in one fused component.
     * @param {Map<Number, Number>} fusedCount Number of fused neighbours per ring.
     * @returns {Boolean} Whether this component should use bridged-ring layout.
     */
    isCageRingComponent(ringIds: number[], fusedCount: Map<number, number>): boolean;
    /**
     * Collect simple graph stats for a fused ring component.
     *
     * @param {Number[]} ringIds Ring ids in one fused component.
     * @returns {Object} Ring-system atom and edge stats.
     */
    getRingSystemStats(ringIds: number[]): any;
    /**
     * Creates a bridged ring.
     *
     * @param {Number[]} ringIds An array of ids of rings involved in the bridged ring.
     * @param {Number} _sourceVertexId The vertex id to start the bridged ring discovery from (UNUSED).
     * @returns {Ring} The bridged ring.
     */
    createBridgedRing(ringIds: number[], _sourceVertexId: number): Ring;
    /**
     * Checks whether or not two vertices are in the same ring.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {Boolean} A boolean indicating whether or not the two vertices are in the same ring.
     */
    areVerticesInSameRing(vertexA: Vertex, vertexB: Vertex): boolean;
    /**
     * Returns an array of ring ids shared by both vertices.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {Number[]} An array of ids of rings shared by the two vertices.
     */
    getCommonRings(vertexA: Vertex, vertexB: Vertex): number[];
    /**
     * Returns the aromatic or largest ring shared by the two vertices.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @returns {(Ring|null)} If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.
     */
    getLargestOrAromaticCommonRing(vertexA: Vertex, vertexB: Vertex): (Ring | null);
    /**
     * Returns an array of vertices positioned at a specified location.
     *
     * @param {Vector2} position The position to search for vertices.
     * @param {Number} radius The radius within to search.
     * @param {Number} excludeVertexId A vertex id to be excluded from the search results.
     * @returns {Number[]} An array containing vertex ids in a given location.
     */
    getVerticesAt(position: Vector2, radius: number, excludeVertexId: number): number[];
    /**
     * Returns the closest vertex (connected as well as unconnected).
     *
     * @param {Vertex} vertex The vertex of which to find the closest other vertex.
     * @returns {Vertex} The closest vertex.
     */
    getClosestVertex(vertex: Vertex): Vertex;
    /**
     * Add a ring to this representation of a molecule.
     *
     * @param {Ring} ring A new ring.
     * @returns {Number} The ring id of the new ring.
     */
    addRing(ring: Ring): number;
    /**
     * Removes a ring from the array of rings associated with the current molecule.
     *
     * @param {Number} ringId A ring id.
     */
    removeRing(ringId: number): void;
    /**
     * Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.
     *
     * @param {Number} ringId A ring id.
     * @returns {Ring} A ring associated with the current molecule.
     */
    getRing(ringId: number): Ring;
    /**
     * Add a ring connection to this representation of a molecule.
     *
     * @param {RingConnection} ringConnection A new ringConnection.
     * @returns {Number} The ring connection id of the new ring connection.
     */
    addRingConnection(ringConnection: RingConnection): number;
    /**
     * Removes a ring connection from the array of rings connections associated with the current molecule.
     *
     * @param {Number} ringConnectionId A ring connection id.
     */
    removeRingConnection(ringConnectionId: number): void;
    /**
     * Removes all ring connections between two vertices.
     *
     * @param {Number} vertexIdA A vertex id.
     * @param {Number} vertexIdB A vertex id.
     */
    removeRingConnectionsBetween(vertexIdA: number, vertexIdB: number): void;
    /**
     * Get a ring connection with a given id.
     *
     * @param {Number} id
     * @returns {RingConnection} The ring connection with the specified id.
     */
    getRingConnection(id: number): RingConnection;
    /**
     * Get the ring connections between a ring and a set of rings.
     *
     * @param {Number} ringId A ring id.
     * @param {Number[]} ringIds An array of ring ids.
     * @returns {Number[]} An array of ring connection ids.
     */
    getRingConnections(ringId: number, ringIds: number[]): number[];
    /**
     * Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.
     *
     * @returns {Object} Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }
     */
    getOverlapScore(): any;
    /**
     * When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.
     *
     * @param {Vertex} vertexA A vertex.
     * @param {Vertex} vertexB A vertex.
     * @param {Vector2[]} sides An array containing the two normals of the line spanned by the two provided vertices.
     * @returns {Object} Returns an object containing the following information: {
          totalSideCount: Counts the sides of each vertex in the molecule, is an array [ a, b ],
          totalPosition: Same as position, but based on entire molecule,
          sideCount: Counts the sides of each neighbour, is an array [ a, b ],
          position: which side to position the second bond, is 0 or 1, represents the index in the normal array. This is based on only the neighbours
          anCount: the number of neighbours of vertexA,
          bnCount: the number of neighbours of vertexB
      }
     */
    chooseSide(vertexA: Vertex, vertexB: Vertex, sides: Vector2[]): any;
    /**
     * Sets the center for a ring.
     *
     * @param {Ring} ring A ring.
     */
    setRingCenter(ring: Ring): void;
    /**
     * Gets the center of a ring contained within a bridged ring and containing a given vertex.
     *
     * @param {Ring} ring A bridged ring.
     * @param {Vertex} vertex A vertex.
     * @returns {Vector2} The center of the subring that containing the vertex.
     */
    getSubringCenter(ring: Ring, vertex: Vertex): Vector2;
    /**
     * Draw the actual edges as bonds to the canvas.
     *
     * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
     */
    drawEdges(debug: boolean): void;
    /**
     * Draw the an edge as a bonds to the canvas.
     *
     * @param {Number} edgeId An edge id.
     * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
     */
    drawEdge(edgeId: number, debug: boolean): void;
    /**
     * Draws the vertices representing atoms to the canvas.
     *
     * @param {Boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
     */
    drawVertices(debug: boolean): void;
    /**
     * Position the vertices according to their bonds and properties.
     */
    position(): void;
    /**
     * Stores the current information associated with rings.
     */
    backupRingInformation(): void;
    /**
     * Restores the most recently backed up information associated with rings.
     */
    restoreRingInformation(): void;
    /**
     * Creates a new ring, that is, positiones all the vertices inside a ring.
     *
     * @param {Ring} ring The ring to position.
     * @param {(Vector2|null)} [center=null] The center of the ring to be created.
     * @param {(Vertex|null)} [startVertex=null] The first vertex to be positioned inside the ring.
     * @param {(Vertex|null)} [previousVertex=null] The last vertex that was positioned.
     * @param {Boolean} [previousVertex=false] A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it.
     */
    createRing(ring: Ring, center?: (Vector2 | null), startVertex?: (Vertex | null), previousVertex?: (Vertex | null)): void;
    /**
     * Post-processing fix for E/Z double bond stereochemistry.
     * After position(), checks all stereo double bonds and corrects any
     * where the visual geometry doesn't match the SMILES encoding.
     *
     * The SMILES edge source→target preserves reading order, so we can
     * determine the intended side for each substituent independent of
     * the graph traversal order used during position().
     */
    fixDoubleBondStereo(): void;
    /**
     * Rotate an entire subtree by an angle around a center.
     *
     * @param {Number} vertexId A vertex id (the root of the sub-tree).
     * @param {Number} parentVertexId A vertex id in the previous direction of the subtree that is to rotate.
     * @param {Number} angle An angle in radians.
     * @param {Vector2} center The rotational center.
     */
    rotateSubtree(vertexId: number, parentVertexId: number, angle: number, center: Vector2): void;
    /**
     * Gets the overlap score of a subtree.
     *
     * @param {Number} vertexId A vertex id (the root of the sub-tree).
     * @param {Number} parentVertexId A vertex id in the previous direction of the subtree.
     * @param {Number[]} vertexOverlapScores An array containing the vertex overlap scores indexed by vertex id.
     * @returns {Object} An object containing the total overlap score and the center of mass of the subtree weighted by overlap score { value: 0.2, center: new Vector2() }.
     */
    getSubtreeOverlapScore(vertexId: number, parentVertexId: number, vertexOverlapScores: number[]): any;
    /**
     * Returns the current (positioned vertices so far) center of mass.
     *
     * @returns {Vector2} The current center of mass.
     */
    getCurrentCenterOfMass(): Vector2;
    /**
     * Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.
     *
     * @param {Vector2} vec The point at which to look for neighbours.
     * @param {Number} [r=currentBondLength*2.0] The radius of vertices to include.
     * @returns {Vector2} The current center of mass.
     */
    getCurrentCenterOfMassInNeigbourhood(vec: Vector2, r?: number): Vector2;
    /**
     * Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.
     */
    resolvePrimaryOverlaps(): void;
    /**
     * Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.
     *
     * @param {Object[]} scores An array of objects sorted descending by score.
     * @param {Number} scores[].id A vertex id.
     * @param {Number} scores[].score The overlap score associated with the vertex id.
     */
    resolveSecondaryOverlaps(scores: {
        id: number;
        score: number;
    }): void;
    /**
     * Get the last non-null or 0 angle.
     * @param {Number} vertexId A vertex id.
     * @returns {Number} The last angle that was not 0 or null.
     */
    getLastAngle(vertexId: number): number;
    /**
     * Positiones the next vertex thus creating a bond.
     *
     * @param {Vertex} vertex A vertex.
     * @param {Vertex} [previousVertex=null] The previous vertex which has been positioned.
     * @param {Number} [angle=0.0] The (global) angle of the vertex.
     * @param {Boolean} [originShortest=false] Whether the origin is the shortest subtree in the branch.
     * @param {Boolean} [skipPositioning=false] Whether or not to skip positioning and just check the neighbours.
     */
    createNextBond(vertex: Vertex, previousVertex?: Vertex, angle?: number, originShortest?: boolean, skipPositioning?: boolean): void;
    /**
     * Gets the vetex sharing the edge that is the common bond of two rings.
     *
     * @param {Vertex} vertex A vertex.
     * @returns {(Number|null)} The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.
     */
    getCommonRingbondNeighbour(vertex: Vertex): (number | null);
    /**
     * Check if a vector is inside any ring.
     *
     * @param {Vector2} vec A vector.
     * @returns {Boolean} A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.
     */
    isPointInRing(vec: Vector2): boolean;
    /**
     * Check whether or not an edge is part of a ring.
     *
     * @param {Edge} edge An edge.
     * @returns {Boolean} A boolean indicating whether or not the edge is part of a ring.
     */
    isEdgeInRing(edge: Edge): boolean;
    /**
     * Check whether or not an edge is rotatable.
     *
     * @param {Edge} edge An edge.
     * @returns {Boolean} A boolean indicating whether or not the edge is rotatable.
     */
    isEdgeRotatable(edge: Edge): boolean;
    /**
     * Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).
     *
     * @param {Ring} ring A ring.
     * @returns {Boolean} A boolean indicating whether or not a ring is implicitly defined as aromatic.
     */
    isRingAromatic(ring: Ring): boolean;
    /**
     * Check whether the ring's 2D projection is close enough to a regular
     * polygon that the aromatic-circle indicator will sit correctly inside
     * it. Used to decide whether an aromatic ring that has been absorbed
     * into a bridged super-ring can still use a circle, or needs the
     * dashed-bond fallback.
     *
     * Heuristic: every vertex of a regular N-gon is the same distance
     * from the centre. We accept the ring as regular when the longest
     * radius is no more than `tolerance` times the shortest.
     *
     * @param {Ring}   ring             A ring.
     * @param {Number} [tolerance=1.15] Max acceptable max/min radius ratio.
     * @returns {Boolean}
     */
    isRingRegularPolygon(ring: Ring, tolerance?: number): boolean;
    /**
     * Get the normals of an edge.
     *
     * @param {Edge} edge An edge.
     * @returns {Vector2[]} An array containing two vectors, representing the normals.
     */
    getEdgeNormals(edge: Edge): Vector2[];
    /**
     * Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).
     *
     * @param {Number} vertexId A vertex id.
     * @returns {Vertex[]} An array of vertices.
     */
    getNonRingNeighbours(vertexId: number): Vertex[];
    /**
     * Returns the minimum distance between any pair of non-bonded drawn atoms.
     *
     * @returns {Number} The minimum non-bonded distance.
     */
    getMinimumNonBondedDistance(): number;
    /**
     * Returns the number of external ring connections, counting bonds from ring members
     * to atoms outside the ring.
     *
     * @param {Number} ringId A ring id.
     * @returns {Number} The number of external connections.
     */
    getRingExternalConnectionCount(ringId: number): number;
    /**
     * Try rigid rotations for ring systems attached through a rotatable bond after the
     * main overlap passes have settled. This catches ring-on-ring stacking that is only
     * obvious in the final geometry.
     */
    resolveRigidRingOverlaps(): void;
    /**
     * Annotated stereochemistry information for visualization.
     */
    annotateStereochemistry(): void;
    /**
     * Compute the correct wedge direction ('up' or 'down') for a bond from
     * a stereocenter to a given neighbor, using the 3D determinant approach.
     *
     * The signed area of the triangle formed by the other 3 neighbors (in CIP
     * order) determines the spatial orientation. Combined with the CIP rank
     * parity of the wedged atom, this gives the correct solid/dashed assignment.
     *
     * @param {Vertex} vertex The stereocenter vertex.
     * @param {Number} wedgeTargetId The vertex id of the neighbor being wedged.
     * @param {number[] | Uint8Array} order CIP priority order (index→original neighbor index).
     * @param {Number[]} neighbours The neighbor vertex ids.
     * @param {String} rs 'R' or 'S' designation.
     * @returns {String} 'up' (solid wedge) or 'down' (dashed wedge).
     */
    _computeWedgeDirection(vertex: Vertex, wedgeTargetId: number, order: number[] | Uint8Array, neighbours: number[], rs: string): string;
    /**
     * Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon sets
     * the involved atoms not to be displayed.
     */
    initPseudoElements(): void;
}
import Graph from './Graph';
import CanvasWrapper from './CanvasWrapper';
import ThemeManager from './ThemeManager';
import Ring from './Ring';
import Vertex from './Vertex';
import Vector2 from './Vector2';
import RingConnection from './RingConnection';
import Edge from './Edge';
