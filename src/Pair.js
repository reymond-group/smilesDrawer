/** A class representing a pair */
class Pair {
    /**
     * The constructor for the class Pair.
     *
     * @param {*} first The first element of the pair.
     * @param {*} second The second element of the pair.
     */
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }

    /**
     * Returns a unique hash for this pair. Uses the cantor pairing function.
     *
     * @returns {number} The hash.
     */
    getHash() {
        // Cantor pairing function, which uniquely encodes
        // two natural numbers into one natural number
        // N x N -> N
        // however replace the last term to make to not take
        // the order into account
        return 0.5 * (this.first + this.second) * (this.first + this.second + 1) + (this.first + this.second);
    }

    /**
     * Checks whether or not this pair contains an object. Uses '===' to compare.
     *
     * @param {*} item An string or a number (current limitation).
     * @returns {boolean} A boolean representing whether or not this pair contains a given value.
     */
    contains(item) {
        return this.first === item || this.second === item;
    }

    /**
     * Creates unique paris from an array. The array must contain unique values.
     *
     * @static
     * @param {array} array An array containing unique values.
     * @returns {array} An array containing unique pairs created from the provided array.
     */
    static createUniquePairs(array) {
        // Each element in array has to be unique, else this wont work
        let pairs = [];

        for (let i = 0; i < array.length; i++) {
            let a = array[i];

            for (let j = i + 1; j < array.length; j++) {
                let b = array[j];
                
                pairs.push(new Pair(a, b))
            }
        }

        return pairs;
    }
}
