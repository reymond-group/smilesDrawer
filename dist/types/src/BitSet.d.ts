/**
 * A fixed-size bit vector backed by a Uint32Array.
 *
 * All binary operations (`xor`, `and`, `or`, `orWith`, `isSubsetOf`) require
 * both operands to have the same `size`. `_assertSameSize` throws on a mismatch,
 * so there is no silent truncation or zero-extension of the shorter operand.
 */
export default class BitSet {
    size: number;
    words: Uint32Array;
    /**
     * @param size Number of bits this set can hold.
     */
    constructor(size: number);
    set(i: number): void;
    get(i: number): boolean;
    /**
     * Throws unless `other` has the same bit length as `this`. We compare `size`
     * (bits) rather than `words.length` (32-bit chunks) because two BitSets can
     * share a word count while differing in bit length — e.g. size 33 and size 64
     * both round up to 2 words, but mixing them would still be a coordinate
     * mismatch in the cycle algorithm.
     *
     * @param op operation name, used in the error message
     */
    _assertSameSize(other: BitSet, op: string): void;
    /** @returns a new bitset = this XOR other (merge two cycles, cancelling shared edges). */
    xor(other: BitSet): BitSet;
    /** @returns a new bitset = this AND other (the edges shared by two cycles). */
    and(other: BitSet): BitSet;
    /** @returns a new bitset = this OR other (the edges covered by either). */
    or(other: BitSet): BitSet;
    /**
     * Mutating union: this |= other. Used to accumulate the basis's edge coverage
     * without allocating a new BitSet each time.
     */
    orWith(other: BitSet): void;
    /**
     * @returns true iff every bit set in `this` is also set in `other` (this ⊆ other).
     * Single pass with an early exit, no allocation.
     */
    isSubsetOf(other: BitSet): boolean;
    /** @returns a deep copy. */
    clone(): BitSet;
    /** @returns true iff no bits are set. */
    isEmpty(): boolean;
    /** @returns the number of set bits (population count). */
    popcount(): number;
    /**
     * @returns the count of leading zeros: the number of zero bits above the
     * highest set bit (mirrors `Math.clz32`). Returns `size` when no bit is set.
     * The "index of the highest set bit + 1" value is `size - clz()`.
     */
    clz(): number;
}
