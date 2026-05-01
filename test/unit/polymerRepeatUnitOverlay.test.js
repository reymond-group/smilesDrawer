import {describe, expect, it} from 'vitest';
import {computePolymerRepeatUnitOverlayState} from '../../src/polymerRepeatUnitOverlay.js';

describe('polymerRepeatUnitOverlay', () => {
    describe('computePolymerRepeatUnitOverlayState', () => {
        it('returns disabled when polymerRepeatUnitStyle is not bracket-n', () => {
            const state = computePolymerRepeatUnitOverlayState({vertices: []}, {polymerRepeatUnitStyle: 'none'});
            expect(state.enabled).toBe(false);
            expect(state.wildcardVertexIds.size).toBe(0);
        });

        it('returns disabled when mode is bracket-n but there are no wildcard endpoints', () => {
            const state = computePolymerRepeatUnitOverlayState({vertices: []}, {polymerRepeatUnitStyle: 'bracket-n'});
            expect(state.enabled).toBe(false);
        });
    });
});
