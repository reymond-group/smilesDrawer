/**
 * Compare SmilesDrawer's molecular formulae against RDKit reference.
 * This is mostly useful for testing implicit hydrogen counting.
 *
 * The reference.json file is generated with RDKit in generate.py.
 */
import {describe, it, expect} from 'vitest';
import {createJSDOM}          from '../helpers';

import Parser    from '../../src/Parser.js';
import SvgDrawer from '../../src/SvgDrawer.js';

import reference from './reference.json' with {type: 'json'};

function renderAndGetFormula(smiles) {
    const dom = createJSDOM();

    const tree = Parser.parse(smiles);
    const drawer = new SvgDrawer();
    drawer.draw(tree, null);

    const pp = drawer.preprocessor;
    return pp.getMolecularFormula();
}

describe('Chemical Formulae: SmilesDrawer vs RDKit', () => {
    for (const test of reference.tests) {
        it(`generates the correct formula for ${test.name}`, () => {
            const formula = renderAndGetFormula(test.smiles);
            expect(formula).toEqual(test.formula);
        });
    }
});
