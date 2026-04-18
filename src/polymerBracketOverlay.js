// @ts-check
import Line    from './Line';
import Vector2 from './Vector2';

/**
 * @typedef {{ enabled: boolean, wildcardVertexIds: Set<number> }} PolymerBracketOverlayState
 */

/**
 * Decide whether the strict repeat-endpoint `bracket-n` overlay applies, and which wildcard vertices it hides.
 * Pure function: no SVG or theme side effects.
 *
 * @param {{ vertices: Array<{ id: number, value: object, neighbours: number[], parentVertexId: number|null, getNeighbourCount: () => number }> }} graph
 * @param {{ polymerDisplayMode?: string }} opts
 * @returns {PolymerBracketOverlayState}
 */
export function computePolymerBracketOverlayState(graph, opts) {
    const empty = () => ({enabled: false, wildcardVertexIds: new Set()});

    if (opts.polymerDisplayMode !== 'bracket-n') {
        return empty();
    }

    const wildcardVertices = graph.vertices.filter((vertex) => vertex.value.element === '*');
    if (wildcardVertices.length !== 2) {
        return empty();
    }

    // Require SMILES to start with * and end the main chain with * (polymer repeat syntax).
    // Do not use global min/max of smilesOrder: that field is branch-local in Graph._init and
    // fails for e.g. *CC(=O)O* where a branch O has a higher order than the tail *.
    const rootWildcards = wildcardVertices.filter((vertex) => vertex.parentVertexId === null);
    const tailWildcards = wildcardVertices.filter((vertex) => !vertex.value.smilesHasNext);
    if (rootWildcards.length !== 1 || tailWildcards.length !== 1) {
        return empty();
    }
    if (rootWildcards[0].id === tailWildcards[0].id) {
        return empty();
    }

    const wildcardIds = new Set(wildcardVertices.map((vertex) => vertex.id));

    for (const wildcard of wildcardVertices) {
        if (wildcard.getNeighbourCount() !== 1) {
            return empty();
        }

        if (wildcard.value.rings && wildcard.value.rings.length > 0) {
            return empty();
        }

        const attachedId = wildcard.neighbours[0];
        const attached = graph.vertices[attachedId];
        if (!attached || attached.value.element === '*') {
            return empty();
        }
    }

    return {enabled: true, wildcardVertexIds: wildcardIds};
}

/**
 * Draw display-only `[ ]n` brackets and repeat count `n` when overlay state is enabled.
 *
 * @param {*} svgWrapper SvgWrapper instance (mutates min/max bounds, pushes SVG primitives).
 * @param {{ vertices: Array<{ value: { isDrawn?: boolean }, position: { x: number, y: number }, id: number }> }} graph
 * @param {PolymerBracketOverlayState} state
 * @param {{ bondLength: number, fontSizeLarge: number }} opts
 */
export function drawPolymerBracketOverlay(svgWrapper, graph, state, opts) {
    if (!state.enabled) {
        return;
    }

    const vertices = graph.vertices.filter((vertex) => {
        if (!vertex.value.isDrawn) return false;
        if (state.wildcardVertexIds.has(vertex.id)) return false;
        return true;
    });
    if (vertices.length < 2) {
        return;
    }

    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;

    for (const vertex of vertices) {
        minX = Math.min(minX, vertex.position.x);
        maxX = Math.max(maxX, vertex.position.x);
        minY = Math.min(minY, vertex.position.y);
        maxY = Math.max(maxY, vertex.position.y);
    }

    const labelPadding = opts.fontSizeLarge * 2.2;
    const padX = opts.bondLength * 1.1 + labelPadding;
    const padY = opts.bondLength * 0.5;
    const leftX = minX - padX;
    const rightX = maxX + padX;
    const topY = minY - padY;
    const bottomY = maxY + padY;
    const arm = opts.bondLength * 0.35;

    svgWrapper.minX = Math.min(svgWrapper.minX, leftX - arm * 1.2);
    svgWrapper.maxX = Math.max(svgWrapper.maxX, rightX + arm * 2.2);
    svgWrapper.minY = Math.min(svgWrapper.minY, topY - arm * 0.8);
    svgWrapper.maxY = Math.max(svgWrapper.maxY, bottomY + arm * 1.8);

    const bracketLines = [
        [new Vector2(leftX, topY), new Vector2(leftX + arm, topY)],
        [new Vector2(leftX, topY), new Vector2(leftX, bottomY)],
        [new Vector2(leftX, bottomY), new Vector2(leftX + arm, bottomY)],
        [new Vector2(rightX - arm, topY), new Vector2(rightX, topY)],
        [new Vector2(rightX, topY), new Vector2(rightX, bottomY)],
        [new Vector2(rightX - arm, bottomY), new Vector2(rightX, bottomY)],
    ];

    for (const [start, end] of bracketLines) {
        svgWrapper.drawLine(new Line(start, end, 'C', 'C'), false, null, 'square');
    }

    svgWrapper.drawAnnotationText(rightX + arm * 0.6, bottomY + arm * 0.9, 'n', 'start');
}
