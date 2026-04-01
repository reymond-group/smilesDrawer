# Atom Weights

You can render  red and green patches  around your molecules  by assigning atoms
"weights." Atoms with a positive weight draw with a green background by default,
and atoms with a negative weight draw with a red(ish) background. The higher the
weight,  the darker the background;  atoms with weight zero  don't get a colored
background.

Weights are provided as  an array of numbers.  The first weight  in the array is
for the first _heavy_ atom in the SMILES string, and so on; hydrogens do not get
weights.

Like most drawing tasks in SmilesDrawer,  drawing a molecule with weights can be
done with `apply()`, with `draw()`, or with `parse()` then `draw()`.  For a live
example of all three methods, see:

- <http://reymond-group.github.io/smilesDrawer/manual/live/weights.html>


**Caution:**

- Drawing weights currently adds a white background to your molecule, regardless
  of the color scheme you have chosen.  Put your images on a white background to
  hide this.
- The current rendering mechanism uses lots and lots of SVG elements to simulate
  pixels inside the SVG. This can result in  artifacts when transferring the SVG
  to an `img` or `canvas`; for best results, draw weighted molecules as `svg`s.


## Apply

To `apply()` weights, add the `data-smiles-weights` attribute to your canvas (or
`svg` or `img`). The value of this attribute is a string containing one floating
point number for each  **heavy** atom in your molecule, separated by commas. The
first heavy atom in the SMILES string gets the first weight, and so on.

```html
<canvas data-smiles="N[C@H](O)C" data-smiles-weights="-2,0,-1,1"></canvas>
```

Then create a `SmiDrawer` and call its `apply()` function:

```js
const options = {width: 300, height: 200};
const drawer  = new SmilesDrawer.SmiDrawer(options);
drawer.apply();
```


## Draw

To `draw()` weights, create a `SmiDrawer` and call its `draw()` function.  The
weights are passed as an array of numbers.

```js
const drawer = new SmilesDrawer.SmiDrawer(options);
drawer.draw('CCCCCCN', '#id-of-target', 'light', null, null, [-3, -2, -1, 0, 1, 2, 3]);
```


## Parse then Draw

First, `parse()` your molecule as usual. Then, to draw to an SVG element, create
an `SvgDrawer` and call its `draw()` function:

```js
SmilesDrawer.parse('CCCCCCCCN', (result) => {
    const drawer = new SmilesDrawer.SvgDrawer(options);
    drawer.draw(result, 'id-of-svg', 'light', [-4, -3, -2, -1, 0, 1, 2, 3, 4]);
}
```

To draw to a canvas, use `SvgDrawer.drawCanvas()` instead:

```js
SmilesDrawer.parse('CCCCCCCCN', (result) => {
    const drawer = new SmilesDrawer.SvgDrawer(options);
    drawer.drawCanvas(result, 'id-of-canvas', 'light', [-4, -3, -2, -1, 0, 1, 2, 3, 4]);
}
```

**Caution:**

- There is currently no way to parse then draw weights to an `img`.


## Function Reference

- [`SmiDrawer.apply()`](entrypoints.md#smidrawer-apply)
- [`SmiDrawer.draw()`](entrypoints.md#smidrawer-draw)
- [`SvgDrawer.draw()`](entrypoints.md#svgdrawer-draw)
- [`SvgDrawer.draw()`](entrypoints.md#svgdrawer-drawcanvas)


## See Also

- [Drawing Weighted Reactions](reaction-weights.md)
- [Back to the Index](README.md)
