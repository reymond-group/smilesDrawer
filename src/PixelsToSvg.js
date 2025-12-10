// Adapted from https://codepen.io/shshaw/pen/XbxvNj by

export default function convertImage(img) {
    'use strict';

    function each(obj, fn) {
        let length = obj.length,
            likeArray = (length === 0 || (length > 0 && (length - 1) in obj));

        if (likeArray) {
            for (let i = 0; i < length; i++) {
                if (fn.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
        else {
            for (const i in obj) {
                if (fn.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
    }

    function componentToHex(c) {
        let hex = parseInt(c).toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }

    function getColor(r, g, b, a) {
        a = parseInt(a);
        if (a === undefined || a === 255) {
            return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        if (a === 0) {
            return false;
        }

        return 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')';
    }

    // Optimized for horizontal lines
    function makePathData(x, y, w) {
        return ('M' + x + ' ' + y + 'h' + w + '');
    }

    function makePath(color, data) {
        return '<path stroke="' + color + '" d="' + data + '" />\n';
    }

    function colorsToPaths(colors) {
        let output = '';

        // Loop through each color to build paths
        each(colors, function(color, values) {
            color = getColor.apply(null, color.split(','));

            if (color === false) {
                return;
            }

            let paths = [];
            let curPath;
            let w = 1;

            // Loops through each color's pixels to optimize paths
            each(values, function(index, value) {
                if (curPath && value[1] === curPath[1] && value[0] === (curPath[0] + w)) {
                    w++;
                }
                else {
                    if (curPath) {
                        paths.push(makePathData(curPath[0], curPath[1], w));
                        w = 1;
                    }
                    curPath = value;
                }
            });

            paths.push(makePathData(curPath[0], curPath[1], w)); // Finish last path
            output += makePath(color, paths.join(''));
        });

        return output;
    }

    function getColors(image) {
        let colors = {},
            data = image.data,
            len = data.length,
            w = image.width,
            x = 0,
            y = 0,
            color;

        for (let i = 0; i < len; i += 4) {
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

    let dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = output;

    return dummyDiv.firstChild;
}
