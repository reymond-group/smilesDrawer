class Atom {
    constructor(element, bond) {
        this.element = element;
        this.ringbonds = new Array();
        this.rings = new Array();
        this.bond = '-';
        this.isTerminal = false;
        this.isBridge = false;
        this.isBridgeNode = false;
        this.bridgedRing = null;
        this.anchoredRings = new Array();
        this.bracket = null;
    }

    addAnchoredRing(ring) {
        if (!ArrayHelper.contains(this.anchoredRings, {
            value: ring.id
        }))
        this.anchoredRings.push(ring.id);
    }

    getRingbondCount() {
        return this.ringbonds.length;
    }

    canRotate() {
        return this.bond == '-' && this.rings.length == 0;
    }

    hasRingbonds() {
        return this.ringbonds.length > 0;
    }

    getMaxRingbond() {
        var max = 0;
        for (var i = 0; i < this.ringbonds.length; i++)
            if (this.ringbonds[i].id > max) max = this.ringbonds[i].id

                return max;
    }

    hasRing(ring) {
        for (var i = 0; i < this.rings; i++) {
            if (ring === this.rings[i]) return true;
        }

        return false;
    }

    haveCommonRingbond(a, b) {
        for (var i = 0; i < a.ringbonds.length; i++) {
            for (var j = 0; j < b.ringbonds.length; j++) {
                if (a.ringbonds[i].id == b.ringbonds[j].id) return true;
            }
        }

        return false;
    }

    maxCommonRingbond(a, b) {
        var commonMax = 0;
        var maxA = 0;
        var maxB = 0;

        for (var i = 0; i < a.ringbonds.length; i++) {
            if (a.ringbonds[i].id > maxA) maxA = a.ringbonds[i].id;

            for (var j = 0; j < b.ringbonds.length; j++) {
                if (b.ringbonds[j].id > maxB) maxB = b.ringbonds[j].id;

                if (maxA == maxB) commonMax = maxA;
            }
        }

        return commonMax;
    }
}
