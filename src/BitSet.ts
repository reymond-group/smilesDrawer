// A fixed-size bit vector backed by a Uint32Array.
//
// Used by the Vismara cycle-perception pipeline (see CycleBasis), where every
// BitSet represents a subset of the graph's edge set: cycle vectors and
// basis-coverage vectors all live in the same coordinate system (size = nEdges),
// so GF(2) addition is just an XOR of the word arrays.

/**
 * A fixed-size bit vector backed by a Uint32Array.
 *
 * All binary operations (`xor`, `and`, `or`, `orWith`, `isSubsetOf`) require
 * both operands to have the same `size`. `_assertSameSize` throws on a mismatch,
 * so there is no silent truncation or zero-extension of the shorter operand.
 */
export default class BitSet {
    size:  number;
    words: Uint32Array;

    /**
     * @param size Number of bits this set can hold.
     */
    constructor(size: number) {
        this.size = size;
        // wordIndex = i >>> 5
        const numWords = size === 0 ? 0 : ((size - 1) >>> 5) + 1;
        this.words = new Uint32Array(numWords);
    }

    set(i: number): void {
        // word |= (1 << n), where n = the bit position within the word (i & 31)
        this.words[i >>> 5] |= (1 << (i & 31));
    }

    get(i: number): boolean {
        return (this.words[i >>> 5] & (1 << (i & 31))) !== 0;
    }

    /**
     * Throws unless `other` has the same bit length as `this`. We compare `size`
     * (bits) rather than `words.length` (32-bit chunks) because two BitSets can
     * share a word count while differing in bit length — e.g. size 33 and size 64
     * both round up to 2 words, but mixing them would still be a coordinate
     * mismatch in the cycle algorithm.
     *
     * @param op operation name, used in the error message
     */
    _assertSameSize(other: BitSet, op: string): void {
        if (this.size !== other.size) {
            throw new Error(
                'BitSet.' + op + ': size mismatch (' + this.size + ' vs ' + other.size + '). '
                + 'Operands must share the same bit length.'
            );
        }
    }

    /** @returns a new bitset = this XOR other (merge two cycles, cancelling shared edges). */
    xor(other: BitSet): BitSet {
        this._assertSameSize(other, 'xor');
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++) {
            result.words[i] = this.words[i] ^ other.words[i];
        }
        return result;
    }

    /** @returns a new bitset = this AND other (the edges shared by two cycles). */
    and(other: BitSet): BitSet {
        this._assertSameSize(other, 'and');
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++) {
            result.words[i] = this.words[i] & other.words[i];
        }
        return result;
    }

    /** @returns a new bitset = this OR other (the edges covered by either). */
    or(other: BitSet): BitSet {
        this._assertSameSize(other, 'or');
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++) {
            result.words[i] = this.words[i] | other.words[i];
        }
        return result;
    }

    /**
     * Mutating union: this |= other. Used to accumulate the basis's edge coverage
     * without allocating a new BitSet each time.
     */
    orWith(other: BitSet): void {
        this._assertSameSize(other, 'orWith');
        for (let i = 0; i < this.words.length; i++) {
            this.words[i] |= other.words[i];
        }
    }

    /**
     * @returns true iff every bit set in `this` is also set in `other` (this ⊆ other).
     * Single pass with an early exit, no allocation.
     */
    isSubsetOf(other: BitSet): boolean {
        this._assertSameSize(other, 'isSubsetOf');
        for (let i = 0; i < this.words.length; i++) {
            // A bit set in `this` but not in `other` breaks the subset.
            // We test `this & ~other` instead of comparing `this & other` to
            // `this`: JS `&` returns a *signed* int32 (negative once bit 31 is
            // set), while a Uint32Array read is unsigned, so that comparison
            // would wrongly report a non-subset for any word with bit 31/63/...
            // set. Comparing against 0 sidesteps the signedness entirely.
            if ((this.words[i] & ~other.words[i]) !== 0) {
                return false;
            }
        }
        return true;
    }

    /** @returns a deep copy. */
    clone(): BitSet {
        const result = new BitSet(this.size);
        for (let i = 0; i < this.words.length; i++) {
            result.words[i] = this.words[i];
        }
        return result;
    }

    /** @returns true iff no bits are set. */
    isEmpty(): boolean {
        for (let i = 0; i < this.words.length; i++) {
            if (this.words[i] !== 0) {
                return false;
            }
        }
        return true;
    }

    /** @returns the number of set bits (population count). */
    popcount(): number {
        let count = 0;
        for (let i = 0; i < this.words.length; i++) {
            // Brian Kernighan's bit count: clearing the lowest set bit each step
            // runs once per set bit. Kept inline because this is a hot loop.
            let word = this.words[i];
            while (word !== 0) {
                word &= (word - 1);
                count++;
            }
        }
        return count;
    }

    /**
     * @returns the count of leading zeros: the number of zero bits above the
     * highest set bit (mirrors `Math.clz32`). Returns `size` when no bit is set.
     * The "index of the highest set bit + 1" value is `size - clz()`.
     */
    clz(): number {
        for (let i = this.words.length - 1; i >= 0; i--) {
            if (this.words[i] !== 0) {
                const highestSetBit = i * 32 + (31 - Math.clz32(this.words[i]));
                return this.size - 1 - highestSetBit;
            }
        }
        return this.size;
    }
}
