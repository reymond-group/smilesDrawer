/** A class representing an atom */
class Atom {
    /**
     * The constructor of the class Atom.
     *
     * @param {string} element The one-letter code of the element.
     * @param {string} [bondType='-'] The type of the bond associated with this atom.
     */
    constructor(element, bondType = '-') {
        this.element = element;
        this.ringbonds = new Array();
        this.rings = new Array();
        this.bondType = bondType;
        this.isTerminal = false;
        this.isBridge = false;
        this.isBridgeNode = false;
        this.bridgedRing = null;
        this.anchoredRings = new Array();
        this.bracket = null;
    }

    /**
     * Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.
     *
     * @param {number} ringId A ring id.
     */
    addAnchoredRing(ringId) {
        if (!ArrayHelper.contains(this.anchoredRings, { value: ringId })) {
            this.anchoredRings.push(ringId);
        }
    }

    /**
     * Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.
     *
     * @returns {number} The number of ringbonds this atom is connected to.
     */
    getRingbondCount() {
        return this.ringbonds.length;
    }

    /**
     * Check whether or not this atom is rotatable. The atom is deemed rotatable if it is neither a member of a ring nor participating in a bond other than a single bond. TODO: Check the chemistry.
     *
     * @returns {boolean} A boolean indicating whether or not this atom is rotatable.
     */
    canRotate() {
        return this.bondType === '-' && this.rings.length == 0;
    }

    /**
     * Returns whether or not this atom participates in ringbonds (breaks in the ring in the MST).
     *
     * @returns {boolean} A boolean indicating whether or not this atom is associated with a ringbond.
     */
    hasRingbonds() {
        return this.ringbonds.length > 0;
    }

    /**
     * Returns the id of the ringbond with the highest id.
     *
     * @returns {number} The highest ringbond id associated with this atom.
     */
    getMaxRingbond() {
        let max = 0;
        for (let i = 0; i < this.ringbonds.length; i++) {
            if (this.ringbonds[i].id > max) {
                max = this.ringbonds[i].id
            }
        }
 
        return max;
    }

    /**
     * Checks whether or not this atom is a member of a given ring.
     *
     * @param {number} ringId A ring id.
     * @returns {boolean} A boolean indicating whether or not this atom is a member of a given ring.
     */
    hasRing(ringId) {
        for (let i = 0; i < this.rings; i++) {
            if (ringId === this.rings[i]) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.
     *
     * @param {Atom} atomA An atom.
     * @param {Atom} atomB An atom.
     * @returns {boolean} A boolean indicating whether or not two atoms share a common ringbond.
     */
    haveCommonRingbond(atomA, atomB) {
        for (let i = 0; i < atomA.ringbonds.length; i++) {
            for (let j = 0; j < atomB.ringbonds.length; j++) {
                if (atomA.ringbonds[i].id == atomB.ringbonds[j].id) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Get the highest numbered ringbond shared by two atoms. A ringbond is a break in a ring created when generating the spanning tree of a structure.
     *
     * @param {Atom} atomA An atom.
     * @param {Atom} atomB An atom.
     * @returns {number} The number of the maximum ringbond shared by two atoms.
     */
    maxCommonRingbond(atomA, atomB) {
        let commonMax = 0;
        let maxA = 0;
        let maxB = 0;

        for (let i = 0; i < atomA.ringbonds.length; i++) {
            if (atomA.ringbonds[i].id > maxA) {
                maxA = atomA.ringbonds[i].id;
            }

            for (let j = 0; j < atomB.ringbonds.length; j++) {
                if (atomB.ringbonds[j].id > maxB) {
                    maxB = atomB.ringbonds[j].id;
                } else if (maxA == maxB) {
                    commonMax = maxA;
                }
            }
        }

        return commonMax;
    }
}
