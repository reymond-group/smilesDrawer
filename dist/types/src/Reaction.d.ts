export default class Reaction {
    /**
     * The constructor for the class Reaction.
     *
     * @param {string} reactionSmiles A reaction SMILES.
     */
    constructor(reactionSmiles: string);
    reactantsSmiles: any[];
    reagentsSmiles: any[];
    productsSmiles: any[];
    reactantsWeights: any[];
    reagentsWeights: any[];
    productsWeights: any[];
    reactants: any[];
    reagents: any[];
    products: any[];
}
