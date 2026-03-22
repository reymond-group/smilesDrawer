# Advanced SmilesDrawer Usage

**Table of Contents**

- [Reactions](#reactions)
- [Weights](#weights)
- [Reaction Weights](#reaction-weights)
- [Highlighting](#highlighting)



## Reactions

SmilesDrawer  can parse and draw  reaction SMILES.  A reaction SMILES string has
three sections, separated by  greater-than signs: `REACTANTS>REAGENTS>PRODUCTS`.
Each section contains regular SMILES strings, separated by periods. For example:

```txt
c1ccccc1I.c1ccccc1I>[Cu]>c1ccccc1c2ccccc2
```

When drawing reactions,  SmilesDrawer draws the reactants and products on either
side of a reaction arrow, and writes the chemical formulae  of the reagents over
arrow.  Like with drawing molecules, there are three ways to draw reactions with
increasing complexity: `apply()`, `draw()`, and `parse()` then `draw()`.

For a live example of all three methods, see:

- <http://reymond-group.github.io/smilesDrawer/docs/advanced/reactions.html>


### Apply

You can draw reactions with an `apply()` method, but it's not the `apply()` from
the global `SmilesDrawer` object.  It's on `SmiDrawer` instead.  To use it, make
an `svg` with a `data-smiles` attribute that contains reaction SMILES:

```html
<svg data-smiles="[Pb]>>[Au]"></svg>
```

Then create an `SmiDrawer` and call its `apply()` function:

```js
const drawer = new SmilesDrawer.SmiDrawer();
drawer.apply();
```

The `SmiDrawer` constructor takes two arguments, both optional:

-  `moleculeOptions` - Molecule options (defaults to `{}`).
-  `reactionOptions` - Reaction options (defaults to `{}`).


The `SmiDrawer.apply()` function takes up to four arguments, all optional:

- `attribute`       - HTML attribute used for finding targets (defaults to `"data-smiles"`).
- `theme`           - Theme to use when drawing (defaults to `"light"`).
- `successCallback` - Called on each target after drawing (no default).
- `errorCallback`   - Called on the exception in case of error (no default).


There is also a static `SmiDrawer.apply()` function that lets you do this in one
line.  It takes six arguments, all optional:  the constructor arguments followed
by the `apply()` arguments.


**Caution:**

- A bug currently prevents this function from drawing to `canvas` elements.
- Drawing dimensions can only be set when drawing to a `canvas` or `img`, not to
  an `svg`.  The `width` and `height` are set in `moleculeOptions`.
- This function  uses `document.querySelectorAll("[" + attribute + "]")` to find
  targets to draw to.  There is no way to provide a different selector.
- There is currently a hack to provide text to put  above and below the reaction
  arrow as part of the SMILES string:  Put a space after the SMILES string, then
  two underscores;  append JSON that includes the keys  `textAboveArrow`  and/or
  `textBelowArrow`; then add two more underscores.  All apostrophes (`'`) in the
  JSON will be converted to double quotes (`"`) before parsing.  Example:
  ```js
  "[Pb]>>[Au] __{textAboveArrow: 'MAGIC', textBelowArrow: '42°C'}__"
  ```


### Draw

You can also use the `SmiDrawer.draw()` function  to draw reactions dynamically,
one at a time. Create a `SmiDrawer` as above, then pass your reaction SMILES and
a render target to its `draw()` function.  In this example, we pass the ID of an
`svg` element:

```js
const drawer = new SmilesDrawer.SmiDrawer();
drawer.draw('[Pb]>>[Au]', '#render-target');
```

The `SmiDrawer.draw()`  function requires two arguments,  and accepts up to six.
The first argument can be a regular SMILES string or reaction SMILES.

- `smiles`          - Required.  The SMILES string to parse and draw.
- `target`          - Required.  The target to draw to (see below).
- `theme`           - Theme to use when drawing (defaults to `"light"`).
- `successCallback` - Called on each target after drawing (no default).
- `errorCallback`   - Called on the exception in case of error (no default).
- `weights`         - Used for atom highlighting (no default).

The `target` parameter can be one of many things:

- `null` to create a new `SVGElement`.
- `"svg"`, `"canvas"`, or `"img"` to create a new element of that type.
- An existing `HTMLImageElement`.
- An existing `SVGElement`.
- A CSS query string to draw to all matching elements.

**Caution:**

- Drawing dimensions can only be set when drawing to a `canvas` or `img`, not to
  an `svg`.  The `width` and `height` are set in `moleculeOptions`.
- Passing an  `HTMLCanvasElement`  as the `target` does not currently work.  But
  you _can_ pass in CSS that selects a canvas, and this will work as expected.
- The arrow text hack from the `apply()` function works with `draw()`, too.


### Parse then Draw

You can also parse your reaction SMILES first, and then pass the parsed reaction
to a `ReactionDrawer` for drawing.  This allows you to pass arrow text as an
argument to the function:

```js
SmilesDrawer.parseReaction('[Pb]>>[Au]', (result) => {
    const drawer = new SmilesDrawer.ReactionDrawer();
    drawer.draw(result, 'render-target', 'light', null, 'MAGIC', '42°C');
}, (error) => {
    // Handle parse errors here!
});
```

The `SmilesDrawer.parseReaction()` function takes two or three arguments:

- `smiles`          - The reaction SMILES string to parse.
- `successCallback` - Called on the result of parsing, if successful.
- `errorCallback`   - Optional.  Called on the exception in case of failure.


The `ReactionDrawer` constructor takes two optional arguments (note the order):

-  `reactionOptions` - Reaction options (defaults to `{}`).
-  `moleculeOptions` - Molecule options (defaults to `{}`).


The `ReactionDrawer.draw()` function

- `reaction`  - The parsed reaction to render.
- `target`    - An `SVGElement` or the ID of an `SVGElement`.
- `themeName` - Theme to use when drawing (defaults to `"light"`).
- `weights`   - Used for atom highlighting (defaults to `null`).
- `textAbove` - Text to put above the arrow (defaults to the magic string `"{reagents}"`).
- `textBelow` - Text to put below the arrow (defaults to `""`).
- `infoOnly`  - If `true`, don't render (defaults to `false`).


**Caution:**

- There is currently no way to control the size of the drawing.
- The `ReactionDrawer.draw()` function can only draw to SVG elements.
- `SmilesDrawer.parseReaction()` only handles reactions, not single molecules.
- `SmilesDrawer.parseReaction()` function does not return the result.  To access
  the result, you must provide a success callback.



## Weights

You can render  red and green patches  around your molecules  by assigning atoms
"weights." Atoms with a positive weight draw with a green background by default,
and atoms with a negative weight draw with a red(ish) background. The higher the
weight,  the darker the background;  atoms with weight zero  don't get a colored
background.

Weights are provided as  an array of numbers.  The first weight  in the array is
for the first _heavy_ atom in the SMILES string, and so on; hydrogens do not get
weights!  By default, SmilesDrawer normalizes all weights to the range `[-1, 1]`
by dividing by the maximum absolute value.

Like most drawing tasks in SmilesDrawer,  drawing a molecule with weights can be
done with `apply()`, with `draw()`, or with `parse()` then `draw()`.  For a live
example of all three methods, see:

- <http://reymond-group.github.io/smilesDrawer/docs/advanced/weights.html>


**Caution:**

- Drawing weights currently adds a white background to your molecule, regardless
  of the color scheme you have chosen.  Put your images on a white background to
  hide this.
- The current rendering mechanism uses lots and lots of  SVG `rect`s to simulate
  pixels inside the SVG. This can result in  artifacts when transferring the SVG
  to an `img` or `canvas`; for best results, draw weighted molecules in `svg`s.


### Apply

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


### Draw

To `draw()` weights, create a `SmiDrawer` and call its `draw()` function.  The
weights are passed as an array of numbers.

```js
const drawer = new SmilesDrawer.SmiDrawer(options);
drawer.draw('CCCCCCN', '#id-of-target', 'light', null, null, [-3, -2, -1, 0, 1, 2, 3]);
```


### Parse then Draw

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



## Reaction Weights

You can also add weights to molecules in reactions.

For a live example of all three methods, see:

- <http://reymond-group.github.io/smilesDrawer/docs/advanced/reaction-weights.html>


**Caution:**

- There doesn't seem to be any way to show weights for reagents, as these aren't
  rendered as molecules (they only appear as formulae over the reaction arrow).


### Apply

To add weights to a reaction, add at least one of these attributes:

- `data-smiles-reactant-weights`
- `data-smiles-reagent-weights`  (Unused? See above.)
- `data-smiles-product-weights`

If the category  (reactants, reagents, or products)  has more than one molecule,
separate the weights for  each molecule  with semicolons.  Within each molecule,
separate the weights for each heavy atom with commas.

```html
<canvas
  data-smiles="CF.FC#N>>CC#N.FF"
  data-smiles-reactant-weights="1,0;0,-1,0"
  data-smiles-product-weights="1,-1,0;0,0"
></canvas>
```

The call `SmiDrawer.apply()` as you would to `apply()` an unweighted reaction.


### Draw

You can also pass weights to  `SmiDrawer.draw()`:  pass them as an object with a
key  for each category.  Values in this object are  arrays of arrays:  the outer
array has one inner array for each  molecule,  and an inner array has one weight
for each heavy atom.

```js
const weights = {
  reactants: [[1, 0], [0, -1, 0]],
  reagents:  [], // Could also be omitted.
  products:  [[1, -1, 0], [0, 0]]
};

const drawer = new SmilesDrawer.SmiDrawer(options);
drawer.draw('CF.FC#N>>CC#N.FF', '#id-of-target', 'light', null, null, weights);
```


### Parse then Draw

You can also  parse your reaction in advance,  and then pass  the reaction and a
weights object to `ReactionDrawer.draw()`:

```js
SmilesDrawer.parseReaction('CF.FC#N>>CC#N.FF', (result) => {
  const drawer = new ReactionDrawer();
  drawer.draw(result, '#id-of-svg', 'light', weights);
});
```

**Caution:**

- This method can currently only draw to SVG elements.



## Highlighting

SmilesDrawer also allows you to highlight atoms by class.  This uses a different
mechanism  than the weights drawer,  and draws  a colored circle under the atoms
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
const colors = [[1, '#ff8'], [2, '#8f8']];
```

Finally, parse your SMILES string and pass the result to a `draw()` function. To
draw to a canvas, pass your color map as the fifth argument to `Drawer.draw()`:

```js
SmilesDrawer.parse(smiles, (result) => {
  const drawer = new SmilesDrawer.Drawer();
  drawer.draw(result, 'id-of-canvas', 'light', false, colors);
});
```

To draw to an SVG, pass it as the sixth argument to `SvgDrawer.draw()`:

```js
SmilesDrawer.parse(smiles, (result) => {
  const drawer = new SmilesDrawer.SvgDrawer();
  drawer.draw(result, 'id-of-svg', 'light', null, false, colors);
});
```

For a live example of both methods, see:

- <http://reymond-group.github.io/smilesDrawer/docs/advanced/highlights.html>


**Caution:**

- The functions above are currently the only two that support atom highlighting.
- There is currently no way to highlight atoms in reactions.



## Arcana

For a complete tour of the many entrypoints of SmilesDrawer - including the
unreachable, the obscure, and the probably deprecated - see:

- <https://github.com/reymond-group/smilesDrawer/tree/master/docs/arcana/entrypoints.md>
