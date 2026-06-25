import Drawer from './src/Drawer';
import GaussDrawer from './src/GaussDrawer';
import Graph from './src/Graph';
import Parser from './src/ParserWrapper';
import Reaction from './src/Reaction';
import ReactionDrawer from './src/ReactionDrawer';
import ReactionParser from './src/ReactionParser';
import SmiDrawer from './src/SmilesDrawer';
import SvgDrawer from './src/SvgDrawer';
/**
 * The SmilesDrawer namespace.
 * @typicalname SmilesDrawer
 */
export default class SmilesDrawerNS {
    static Version: string;
    static Drawer: typeof Drawer;
    static GaussDrawer: typeof GaussDrawer;
    static Parser: typeof Parser;
    static ReactionDrawer: typeof ReactionDrawer;
    static ReactionParser: typeof ReactionParser;
    static SmiDrawer: typeof SmiDrawer;
    static SvgDrawer: typeof SvgDrawer;
    /**
    * Cleans a SMILES string (by removing all non-valid characters)
    *
    * @param smiles - A SMILES string.
    * @returns The clean SMILES string.
    */
    static clean(smiles: string): string;
    /**
    * Applies the smiles drawer draw function to each canvas element that has a smiles string in the data-smiles attribute.
    *
    * @param options   - SmilesDrawer options.
    * @param selector  - A CSS selector that identifies drawable elements (default "canvas[data-smiles]").
    * @param themeName - The theme to apply (default "light").
    * @param onError   - An optional callback function that takes an error object (default null).
    */
    static apply(options: object, selector?: string, themeName?: string, onError?: (e: Error) => void): void;
    /**
    * Parses a SMILES string.
    *
    * @param smiles          - A SMILES string.
    * @param successCallback - A callback that is called on success with the parse tree.
    * @param errorCallback   - A callback that is called with the error object on error.
    */
    static parse(smiles: string, successCallback: (g: Graph) => void, errorCallback?: (e: Error) => void): void;
    /**
    * Parses a reaction SMILES string.
    *
    * @param reactionSmiles  - A reaction SMILES string.
    * @param successCallback - A callback that is called on success with the parse tree.
    * @param errorCallback   - A callback that is called with the error object on error.
    */
    static parseReaction(reactionSmiles: string, successCallback: (r: Reaction) => void, errorCallback?: (e: Error) => void): void;
}
declare global {
    interface Window {
        SmilesDrawer: typeof SmilesDrawerNS;
        SmiDrawer: typeof SmiDrawer;
    }
}
