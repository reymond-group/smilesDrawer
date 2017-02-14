class Edge {
    constructor(source, target, weight) {
        this.id = null;
        this.source = source;
        this.target = target;
        this.weight = weight;
        this.bond = '-';
        this.isInAromaticRing = false;
    }

    static get bonds() {
        return {
            '-': 1,
            '/': 1,
            '\\': 1,
            '=': 2,
            '#': 3,
            '$': 4
        }
    }

    getBondCount() {
        return Edge.bonds[this.bond];
    }
}

