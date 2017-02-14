class MathHelper {
    static round(value, decimals) {
        decimals = decimals ? decimals : 1;
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    static meanAngle(arr) {
        var sin = 0;
        var cos = 0;
        for (var i = 0; i < arr.length; i++) {
            sin += Math.sin(arr[i]);
            cos += Math.cos(arr[i]);
        }

        return Math.atan2(sin / arr.length, cos / arr.length);
    }

    static innerAngle(n) {
        return MathHelper.toRad((n - 2) * 180 / n);
    }

    static polyCircumradius(s, n) {
        return s / (2 * Math.sin(Math.PI / n));
    }

    static apothem(r, n) {
        return r * Math.cos(Math.PI / n);
    }

    static centralAngle(n) {
        return MathHelper.toRad(360 / n);
    }

    static toDeg(x) {
        return x * 180 / Math.PI;
    }

    static toRad(x) {
        return x * Math.PI / 180;
    }
}
