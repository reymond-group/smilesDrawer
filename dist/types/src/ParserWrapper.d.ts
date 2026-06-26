import Graph from './Graph';
export default class ParserWrapper {
    static SyntaxError: Error;
    static parse(smiles: string): Graph;
}
