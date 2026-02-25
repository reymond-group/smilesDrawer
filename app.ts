import Drawer         from './src/Drawer';
import GaussDrawer    from './src/GaussDrawer';
import Graph          from './src/Graph';
import Parser         from './src/Parser';
import Reaction       from './src/Reaction';
import ReactionDrawer from './src/ReactionDrawer';
import ReactionParser from './src/ReactionParser';
import SmiDrawer      from './src/SmilesDrawer';
import SvgDrawer      from './src/SvgDrawer';

/**
 * The SmilesDrawer namespace.
 * @typicalname SmilesDrawer
 */
class SmilesDrawerNS {
    static Version = '2.2.0';

    static Drawer         = Drawer;
    static GaussDrawer    = GaussDrawer;
    static Parser         = Parser;
    static ReactionDrawer = ReactionDrawer;
    static ReactionParser = ReactionParser;
    static SmiDrawer      = SmiDrawer;
    static SvgDrawer      = SvgDrawer;

    /**
    * Cleans a SMILES string (removes non-valid characters)
    *
    * @param smiles - A SMILES string.
    * @returns The clean SMILES string.
    */
    static clean(smiles: string): string {
        return smiles.replace(/[^A-Za-z0-9@.+\-?!()[\]{}/\\=#$:*]/g, '');
    }

    /**
    * Applies the smiles drawer draw function to each canvas element that has a smiles string in the data-smiles attribute.
    *
    * @param options   - SmilesDrawer options.
    * @param selector  - A CSS selector that identifies drawable elements (default "canvas[data-smiles]").
    * @param themeName - The theme to apply (default "light").
    * @param onError   - An optional callback function that takes an error object (default null).
    */
    static apply(options: object, selector: string = 'canvas[data-smiles]', themeName: string = 'light', onError: (e: Error) => void = null): void {
        const smilesDrawer = new Drawer(options);
        const elements = document.querySelectorAll(selector);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            SmilesDrawerNS.parse(element.getAttribute('data-smiles'), function(tree) {
                smilesDrawer.draw(tree, element, themeName, false);
            }, function(err) {
                if (onError) {
                    onError(err);
                }
            });
        }
    };

    /**
    * Parses a SMILES string.
    *
    * @param smiles          - A SMILES string.
    * @param successCallback - A callback that is called on success with the parse tree.
    * @param errorCallback   - A callback that is called with the error object on error.
    */
    static parse(smiles: string, successCallback: (g: Graph) => void, errorCallback: (e: Error) => void): void {
        try {
            if (successCallback) {
                successCallback(Parser.parse(smiles));
            }
        }
        catch (err) {
            if (errorCallback) {
                errorCallback(err);
            }
        }
    }

    /**
    * Parses a reaction SMILES string.
    *
    * @param reactionSmiles  - A reaction SMILES string.
    * @param successCallback - A callback that is called on success with the parse tree.
    * @param errorCallback   - A callback that is called with the error object on error.
    */
    static parseReaction(reactionSmiles: string, successCallback: (r: Reaction) => void, errorCallback: (e: Error) => void): void {
        try {
            if (successCallback) {
                successCallback(ReactionParser.parse(reactionSmiles));
            }
        }
        catch (err) {
            if (errorCallback) {
                errorCallback(err);
            }
        }
    }
}

// Here be dragons (polyfills)
if (!Array.prototype.fill) {
    function fill(value, start?: number, end?: number) {
        // Steps 1-2.
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        const O = Object(this);

        // Steps 3-5.
        const len = O.length >>> 0;

        // Steps 6-7.
        // const start = arguments[1];
        const relativeStart = (start || 0) >> 0;

        // Step 8.
        let k = relativeStart < 0
            ? Math.max(len + relativeStart, 0)
            : Math.min(relativeStart, len);

        // Steps 9-10.
        // const end = arguments[2];
        const relativeEnd = end === undefined ? len : (end || 0) >> 0;

        // Step 11.
        const final = relativeEnd < 0
            ? Math.max(len + relativeEnd, 0)
            : Math.min(relativeEnd, len);

        // Step 12.
        while (k < final) {
            O[k] = value;
            k++;
        }

        // Step 13.
        return O;
    };

    Object.defineProperty(Array.prototype, 'fill', {
        value:    fill,
        writable: false,
    });
}

// If we're in a browser window, add the SmilesDrawer globals
// TypeScript tricks from https://stackoverflow.com/a/12709880
declare global {
    interface Window {
        SmilesDrawer: typeof SmilesDrawerNS
        SmiDrawer:    typeof SmiDrawer
    }
}

if (typeof window !== 'undefined' && window.document && window.document.createElement) {
    window.SmilesDrawer = SmilesDrawerNS;
    window.SmiDrawer    = SmiDrawer;
}

// Finally - export time!
export default SmilesDrawerNS;
