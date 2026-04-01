# Atom Highlighting

SmilesDrawer  allows you to  highlight atoms  by class.  This  uses  a different
mechanism  than the  weights drawer,  and draws  colored circles under the atoms
you want to highlight.

This only works with a "parse then draw" approach. To use it, your SMILES string
must have "classes" attached to some atoms.  In this example, one carbon has the
class `1`, and another carbon and the nitrogen have the class `2`:

```js
const smiles = 'CCCC[CH2:1][CH2:2]CC[NH2:2]';
```

Then make an array of pairs.  The first item in each pair should be a class (an
integer), and the second item should be the CSS color used to highlight atoms of
that class.  In this example, class `1` is yellow and class `2` is green:

```js
const highlights = [[1, '#ff8'], [2, '#8f8']];
```

Finally, parse your SMILES string and pass the result to a `draw()` function. To
draw to a canvas, pass your color map as the fifth argument to `Drawer.draw()`:

```js
SmilesDrawer.parse(smiles, (result) => {
  const drawer = new SmilesDrawer.Drawer();
  drawer.draw(result, 'id-of-canvas', 'light', false, highlights);
});
```

To draw to an SVG, pass it as the sixth argument to `SvgDrawer.draw()`:

```js
SmilesDrawer.parse(smiles, (result) => {
  const drawer = new SmilesDrawer.SvgDrawer();
  drawer.draw(result, 'id-of-svg', 'light', null, false, highlights);
});
```

For a live example of both methods, see:

- <http://reymond-group.github.io/smilesDrawer/manual/live/atom-highlighting.html>


**Caution:**

- The functions above are currently the only two that support atom highlighting.
- There is currently no way to highlight atoms in reactions.


## Function Reference

- [SmilesDrawer.parse()](entrypoints.md#static-smilesdrawer-parse)
- [Drawer.draw()](entrypoints.md#drawer-draw)
- [SvgDrawer.draw()](entrypoints.md#svgdrawer-draw)


## See Also

- Nothing else to see here...
- [Back to the Index](README.md)
