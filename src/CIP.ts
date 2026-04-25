import Graph  from './Graph';
import Vertex from './Vertex';

/**
 * The result of comparing two CIPTrees.
 *
 * The number is a standard JavaScript comparison result: negative means the
 * thing on the left was smaller, positive means the thing on the right was
 * smaller, and zero means the two were equal.  The boolean provides extra
 * information in the case of a tie: if the tie involved any stereocenters, it
 * is set to true (this is used to mimic RDKit; see CIPTree.sortChildren()).
 */
type CIPComparison = [number, boolean];

/**
 * A lazily evaluated tree for determining CIP priority.
 *
 * This is optimized to delay recursion for as long as possible:
 * - Don't load children by default.  If a node might have children, initialize
 *   its children array to undefined.  Users who need the full list of children
 *   should call findChildren().
 * - When the children are initially loaded, only sort them based on their local
 *   attributes (this avoids recursion). Users who need the fully sorted list of
 *   children should call sortChildren() (after calling findChildren()).
 *
 * And a few minor optimizations to reduce copying / memory allocation:
 * - The visited map doesn't include the current node (so it can be shared among
 *   siblings) until the children are loaded.
 * - If a node has multiple copy or implicit children, a single instance is
 *   inserted into its children array multiple times.
 */
export class CIPTree {
    // Stupid linter doesn't understand TypeScript...
    /* eslint-disable @stylistic/key-spacing */
    graph:  Graph;
    vertex: Vertex | null;
    parent: Vertex | null;

    atomicNumber: number;
    atomicWeight: number;
    cloneDepth:   number | undefined;
    stereocenter: boolean;

    children: CIPTree[] | undefined;
    visited: Map<Vertex, number> | null;
    sorted: boolean;
    /* eslint-enable @stylistic/key-spacing */

    static build(graph: Graph, vertex: Vertex): CIPTree {
        const root = new CIPTree(graph, vertex, null, new Map());
        root.findChildren();
        root.sortChildren();
        return root;
    }

    /**
     * Perform a non-recursive comparison between two CIPTrees.
     *
     * This performs any priority determination that can be done without looking
     * at the children of the nodes in question.  Not all of the official CIP
     * rules are currently implemented, but those that are are sufficient for
     * the vast majority of molecules.
     *
     * @see https://iupac.qmul.ac.uk/BlueBook/P9.html
     */
    static compareAtoms(lhs: CIPTree, rhs: CIPTree): CIPComparison {
        // CIP Rule 1a: Higher atomic number precedes lower.
        if (lhs.atomicNumber !== rhs.atomicNumber) {
            return [rhs.atomicNumber - lhs.atomicNumber, false];
        }

        // CIP Rule 1b: Clones of rootier atoms precede clones of leafier atoms.
        if (lhs.cloneDepth && rhs.cloneDepth) {
            const cmp = lhs.cloneDepth - rhs.cloneDepth;
            if (cmp !== 0) return [cmp, false];
        }

        // CIP Rule 2: Higher atomic mass precedes lower.
        if (lhs.atomicWeight !== rhs.atomicWeight) {
            return [rhs.atomicWeight - lhs.atomicWeight, false];
        }

        // TODO: CIP Rule 3: seqcis/Z bonds precede seqtrans/E bonds precede other double bonds.

        // TODO: CIP Rule 4: See the Blue Book P-92.1.3.4
        // TODO: CIP Rule 4a: Chiral precedes pseudoasymmetric precedes nonstereogenic.
        // TODO: CIP Rule 4b: Like precedes unlike.

        // TODO: CIP Rule 5: See the Blue Book P-92.1.3.5

        return [0, lhs.stereocenter || rhs.stereocenter];
    }

    static compareTrees(lhs: CIPTree, rhs: CIPTree): CIPComparison {
        let cmp = this.compareAtoms(lhs, rhs);
        if (cmp[0] !== 0) return cmp;

        let lqueue = [lhs];
        let rqueue = [rhs];
        let stereo = false;

        while (lqueue.length !== 0) {
            for (let q = 0; q < lqueue.length; ++q) {
                const ls  = lqueue[q].findChildren();
                const rs  = rqueue[q].findChildren();
                const len = Math.max(ls.length, rs.length);

                for (let i = 0; i < len; ++i) {
                    if (i >= ls.length) return [+1, false];
                    if (i >= rs.length) return [-1, false];

                    cmp = this.compareAtoms(ls[i], rs[i]);
                    if (cmp[0] !== 0) return cmp;
                    stereo ||= cmp[1];
                }
            }

            lqueue = lqueue.flatMap(d => d.sortChildren());
            rqueue = rqueue.flatMap(d => d.sortChildren());
        }

        return [0, stereo];
    }

    /**
     * Create a new CIP tree node.
     *
     * This function signature is a mess - don't call it unless you absolutely
     * know what you're getting into!  Fortunately, you shouldn't have to.
     *
     * There are three types of CIP node:
     * - Real nodes correspond to real atoms in the graph.  Any atom can appear
     *   in at most one real node; further appearances use clone nodes (below).
     *   Real nodes can have children.
     * - Clone nodes refer to real nodes that have already appeared in the tree.
     *   They hold the same atom as the real node, but they never have children,
     *   even though the real node might.
     * - Implicit nodes correspond to atoms that don't appear in the graph. They
     *   hold things like implicit hydrogens or "aromatic" phantom atoms.
     *
     * To create a new "real" node:
     * - Pass the vertex in the `vertex` argument.
     * - Pass the visited map in the `magic` argument.
     * - The visited map should map previously seen vertices to their depths in
     *   the CIP tree (the root is at depth 1, its children are at depth 2, and
     *   so on).  This map should NOT contain a depth for this node.
     *
     * To create a new "clone" node:
     * - Pass the vertex in the `vertex` argument.
     * - Pass the depth of the real node being cloned in the `magic` argument.
     *
     * To create a new "implicit" node:
     * - Pass the atomic number of the implicit atom in the `vertex` argument.
     * - Don't pass anything in the `magic` argument.
     *
     * @param graph  - The graph layout that contains the vertices we care about.
     * @param vertex - The vertex at this node, or the atomic number of an implicit atom.
     * @param parent - The previous vertex in the CIP tree, or null if this is the root.
     * @param magic  - A map of visited vertices to their depths, or the depth of a clone node.
     *
     * TODO: Eventually, this logic should work at the molecule level (on atoms
     * and bonds) rather than at the layout level (on vertices and edges).
     */
    constructor(graph: Graph, vertex: Vertex | number, parent: Vertex | null, magic?: Map<Vertex, number> | number) {
        this.graph  = graph;
        this.parent = parent;

        if (vertex instanceof Vertex) {
            this.vertex       = vertex;
            this.atomicNumber = vertex.value.getAtomicNumber();
            this.atomicWeight = 0; // TODO!
            this.stereocenter = !!(vertex.value.bracket && vertex.value.bracket.chirality);
        }
        else {
            this.vertex       = null;
            this.atomicNumber = vertex;
            this.atomicWeight = 0; // TODO!
            this.stereocenter = false;
        }

        if (magic instanceof Map) {
            this.cloneDepth = undefined;
            this.visited    = magic;
            this.children   = undefined;
            this.sorted     = false;
        }
        else {
            this.cloneDepth = magic;
            this.visited    = null;
            this.children   = [];
            this.sorted     = true;

            // Only real nodes should contribute to stereo ties!
            // This prevents a copy of an actually-not-chiral root node from
            // incorrectly causing a stereo tie (e.g. C1CC[C@]2(CC1)CCCC2).
            this.stereocenter = false;

            // TODO: For full robustness, we may need a way to prevent OTHER (non-root)
            // not-actually-stereocenters from reporting false stereo ties...
        }
    }

    /**
     * Load the children of this CIPTree.
     *
     * This function is only called when needed; by default, CIPTrees just have
     * a placeholder indicating that they might have children.  This function
     * does not perform a full CIP sort on the children once they're loaded; it
     * only performs a non-recursive sort using CIPTree.compareAtoms().
     *
     * @returns The partially sorted list of children.
     */
    findChildren(): CIPTree[] {
        if (this.children === undefined) {
            this.children = [];

            const mydepth = this.visited.size + 1;
            const visited = new Map(this.visited);
            visited.set(this.vertex, mydepth);
            this.visited = null;

            for (const index of this.vertex.neighbours) {
                let links = this.graph.getEdge(this.vertex.id, index).weight;
                if (!links) continue;

                const neighbour = this.graph.vertices[index];
                let   depth     = visited.get(neighbour);

                if (Object.is(neighbour, this.parent)) {
                    // Add one less link.
                    links -= 1;
                }
                else if (depth === undefined) {
                    // Add one real edge and one less link.
                    const child = new CIPTree(this.graph, neighbour, this.vertex, visited);
                    this.children.push(child);
                    depth  = mydepth + 1;
                    links -= 1;
                }
                else {
                    // Add all links.
                }

                if (links > 0) {
                    const child = new CIPTree(this.graph, neighbour, this.vertex, depth);
                    while (links-- > 0) this.children.push(child);
                }
            }

            if (this.vertex.value.isPartOfAromaticRing) {
                // This is a HACK to get aromatic rings ordered correctly.
                // TODO: Fix it!  The actual fix is still pretty hacky, though...
                // See P-92.1.4.4 in the Blue Book.
                const child = new CIPTree(this.graph, 6, this.vertex);
                this.children.push(child);
            }

            let hydrogens = this.vertex.value.countImplicitHydrogens();
            if (hydrogens > 0) {
                const child = new CIPTree(this.graph, 1, this.vertex);
                while (hydrogens-- > 0) this.children.push(child);
            }

            // Sort as well as possible without fetching children recursively.
            this.children.sort((a, b) => CIPTree.compareAtoms(a, b)[0]);
        }

        return this.children;
    }

    /**
     * Count the number of nodes in the (sub)tree rooted at this node.
     *
     * @returns The number of nodes in the tree.
     */
    size(): number {
        if (this.children !== undefined) {
            return this.children.reduce((sum, child) => sum + child.size(), 1);
        }

        return 1;
    }

    /**
     * Perform a full recursive sort on this node's children.
     *
     * The children must already be loaded, or this will crash.  This function
     * is normally called by CIPTree.compareTrees(), which is designed to make
     * sure that isn't a problem.  If you call this function manually, make
     * sure to call findChildren() first.
     *
     * @returns The fully sorted list of children.
     */
    sortChildren(): CIPTree[] {
        if (!this.sorted) {
            this.children.sort((a, b) => {
                const [cmp, stereo] = CIPTree.compareTrees(a, b);

                // This matches RDKit for unresolved stereo-containing ties.
                // Keep original tie direction for @@, but invert it for @.
                if (stereo && this.stereocenter) {
                    if (this.vertex.value.bracket.chirality === '@') {
                        return b.vertex.id - a.vertex.id;
                    }
                    else {
                        return a.vertex.id - b.vertex.id;
                    }
                }

                return cmp;
            });

            this.sorted = true;
        }

        return this.children;
    }
}

/**
 * A namespace to hold the public CIP API.
 *
 * For more information on the Cahn-Ingold-Prelog priority system, see the links
 * below.  The Yale links give the best introduction; the Blue Book contains the
 * official specification.
 *
 * @see https://iupac.qmul.ac.uk/BlueBook/P9.html
 * @see https://en.wikipedia.org/wiki/Cahn%E2%80%93Ingold%E2%80%93Prelog_priority_rules
 * @see https://ursula.chem.yale.edu/~chem220/chem220js/STUDYAIDS/isomers/CIP%20rules%20NEW.html
 * @see https://ursula.chem.yale.edu/~chem220/chem220js/STUDYAIDS/isomers/RS14272/pinene.html
 */
export default class CIP {
    static getOrderArray(graph: Graph, vertex: Vertex): Uint8Array | undefined {
        const root = CIPTree.build(graph, vertex);

        // If there are any non-stereo ties, this isn't a stereocenter!
        // TODO: Could we detect this quicker?
        for (let i = 1; i < root.children.length; ++i) {
            const cmp = CIPTree.compareTrees(root.children[i - 1], root.children[i]);
            if (cmp[0] === 0 && !cmp[1]) return undefined;
        }

        // Build the ordering array expected by DrawerBase._computeWedgeDirection().
        const nNeighbours = vertex.neighbours.length;
        const order = new Uint8Array(nNeighbours);
        for (let i = 0; i < nNeighbours; ++i) {
            const vid = root.children[i].vertex.id;
            order[i] = vertex.neighbours.findIndex(nid => nid === vid);
        }

        return order;
    }
}
