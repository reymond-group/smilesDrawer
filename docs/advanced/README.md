# Advanced SmilesDrawer Usage

- [Reactions](#reactions)
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


<!-- ## Atom Highlighting -->

<!-- ## Reaction Highlighting -->

