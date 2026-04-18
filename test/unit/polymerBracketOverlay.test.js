import {describe, expect, it} from 'vitest';
import {computePolymerBracketOverlayState} from '../../src/polymerBracketOverlay.js';

describe('polymerBracketOverlay', () => {
    describe('computePolymerBracketOverlayState', () => {
        it('returns disabled when polymerDisplayMode is not bracket-n', () => {
            const state = computePolymerBracketOverlayState({vertices: []}, {polymerDisplayMode: 'none'});
            expect(state.enabled).toBe(false);
            expect(state.wildcardVertexIds.size).toBe(0);
        });

        it('returns disabled when mode is bracket-n but there are no wildcard endpoints', () => {
            const state = computePolymerBracketOverlayState({vertices: []}, {polymerDisplayMode: 'bracket-n'});
            expect(state.enabled).toBe(false);
        });
    });
});
