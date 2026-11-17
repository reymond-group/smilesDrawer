import Graph from './Graph';
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
export declare class CIPTree {
    graph: Graph;
    vertex: Vertex | null;
    parent: Vertex | null;
    atomicNumber: number;
    atomicWeight: number;
    cloneDepth: number | undefined;
    stereocenter: boolean;
    children: CIPTree[] | undefined;
    visited: Map<Vertex, number> | null;
    sorted: boolean;
    static build(graph: Graph, vertex: Vertex): CIPTree;
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
    static compareAtoms(lhs: CIPTree, rhs: CIPTree): CIPComparison;
    static compareTrees(lhs: CIPTree, rhs: CIPTree): CIPComparison;
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
    constructor(graph: Graph, vertex: Vertex | number, parent: Vertex | null, magic?: Map<Vertex, number> | number);
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
    findChildren(): CIPTree[];
    /**
     * Count the number of nodes in the (sub)tree rooted at this node.
     *
     * @returns The number of nodes in the tree.
     */
    size(): number;
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
    sortChildren(): CIPTree[];
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
    static getOrderArray(graph: Graph, vertex: Vertex): Array<number> | undefined;
}
export {};
