import Reaction from './Reaction';

export default class ReactionParser {
    /**
     * Parses a reaction SMILES string and creates a Reaction object.
     *
     * The SMILES string should be in the form REAGENTS>CATALYSTS>PRODUCTS,
     * with the molecules in each category separated by periods.  The actual
     * implementation can be found in the Reaction constructor.
     *
     * @param reactionSmiles - A reaction SMILES.
     * @returns A reaction object.
     */
    static parse(reactionSmiles: string): Reaction {
        return new Reaction(reactionSmiles);
    }
}
