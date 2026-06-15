import {describe, expect, it} from 'vitest';
import DrawerBase from '../../src/DrawerBase.js';

describe('showCarbons mode resolution (DrawerBase)', () => {
    describe('getEffectiveShowCarbonsMode', () => {
        it('maps default + terminalCarbons to terminal', () => {
            expect(DrawerBase.getEffectiveShowCarbonsMode({showCarbons: 'default', terminalCarbons: true})).toBe('terminal');
        });

        it('leaves default when terminalCarbons is false', () => {
            expect(DrawerBase.getEffectiveShowCarbonsMode({showCarbons: 'default', terminalCarbons: false})).toBe('default');
        });

        it('does not let terminalCarbons override explicit none', () => {
            expect(DrawerBase.getEffectiveShowCarbonsMode({showCarbons: 'none', terminalCarbons: true})).toBe('none');
        });

        it('treats unknown showCarbons as default then applies terminalCarbons', () => {
            expect(DrawerBase.getEffectiveShowCarbonsMode({showCarbons: 'typo', terminalCarbons: true})).toBe('terminal');
        });

        it('keeps explicit acyclic/all/terminal regardless of terminalCarbons', () => {
            expect(DrawerBase.getEffectiveShowCarbonsMode({showCarbons: 'acyclic', terminalCarbons: true})).toBe('acyclic');
            expect(DrawerBase.getEffectiveShowCarbonsMode({showCarbons: 'all', terminalCarbons: true})).toBe('all');
            expect(DrawerBase.getEffectiveShowCarbonsMode({showCarbons: 'terminal', terminalCarbons: false})).toBe('terminal');
        });

        it('treats missing showCarbons as default', () => {
            expect(DrawerBase.getEffectiveShowCarbonsMode({terminalCarbons: false})).toBe('default');
            expect(DrawerBase.getEffectiveShowCarbonsMode({terminalCarbons: true})).toBe('terminal');
        });
    });

    describe('constructor opts normalization', () => {
        it('normalizes invalid showCarbons on merged opts', () => {
            const d = new DrawerBase({showCarbons: 'not-a-mode'});
            expect(d.opts.showCarbons).toBe('default');
        });
    });
});
