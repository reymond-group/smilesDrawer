class Pair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }

    getHash() {
        // Cantor pairing function, which uniquely encodes
        // two natural numbers into one natural number
        // N x N -> N
        // however replace the last term to make to not take
        // the order into account
        return 0.5 * (this.first + this.second) * (this.first + this.second + 1) + (this.first + this.second);
    }

    contains(item) {
        return this.first === item || this.second === item;
    }

    static createUniquePairs(array) {
        // Each element in array has to be unique, else this wont work
        var pairs = [];

        for (var i = 0; i < array.length; i++) {
            var a = array[i];

            for (var j = i + 1; j < array.length; j++) {
                var b = array[j];
                pairs.push(new Pair(a, b))
            }
        }

        return pairs;
    }
}
