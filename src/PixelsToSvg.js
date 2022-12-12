// Adapted from https://codepen.io/shshaw/pen/XbxvNj by 

function convertImage(img) {
    "use strict";

    function each(obj, fn) {
        var length = obj.length,
            likeArray = (length === 0 || (length > 0 && (length - 1) in obj)),
            i = 0;

        if (likeArray) {
            for (; i < length; i++) { if (fn.call(obj[i], i, obj[i]) === false) { break; } }
        } else {
            for (i in obj) { if (fn.call(obj[i], i, obj[i]) === false) { break; } }
        }
    }

    function componentToHex(c) {
        var hex = parseInt(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function getColor(r, g, b, a) {
        a = parseInt(a);
        if (a === undefined || a === 255) { return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); }
        if (a === 0) { return false; }
        return 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')';
    }

    // Optimized for horizontal lines
    function makePathData(x, y, w) { return ('M' + x + ' ' + y + 'h' + w + ''); }
    function makePath(color, data) { return '<path stroke="' + color + '" d="' + data + '" />\n'; }

    function colorsToPaths(colors) {

        var output = "";

        // Loop through each color to build paths
        each(colors, function (color, values) {
            var orig = color;
            color = getColor.apply(null, color.split(','));

            if (color === false) { return; }

            var paths = [];
            var curPath;
            var w = 1;

            // Loops through each color's pixels to optimize paths
            each(values, function () {

                if (curPath && this[1] === curPath[1] && this[0] === (curPath[0] + w)) {
                    w++;
                } else {
                    if (curPath) {
                        paths.push(makePathData(curPath[0], curPath[1], w));
                        w = 1;
                    }
                    curPath = this;
                }

            });

            paths.push(makePathData(curPath[0], curPath[1], w)); // Finish last path
            output += makePath(color, paths.join(''));
        });

        return output;
    }

    var getColors = function (img) {
        var colors = {},
            data = img.data,
            len = data.length,
            w = img.width,
            h = img.height,
            x = 0,
            y = 0,
            i = 0,
            color;

        for (; i < len; i += 4) {
            if (data[i + 3] > 0) {
                color = data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3];
                colors[color] = colors[color] || [];
                x = (i / 4) % w;
                y = Math.floor((i / 4) / w);
                colors[color].push([x, y]);
            }
        }

        return colors;
    }

    let colors = getColors(img);
    let paths = colorsToPaths(colors);
    let output = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 ' + img.width + ' ' + img.height + '" shape-rendering="crispEdges"><g shape-rendering="crispEdges">' + paths + '</g></svg>';

    var dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = output;

    return dummyDiv.firstChild;

}

module.exports = convertImage