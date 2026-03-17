# Basic Examples

The easiest ways to use SmilesDrawer are to use `apply()` to display some static
molecules, or to use `draw()` to draw individual molecules dynamically.  You can
also  `parse()` a SMILES string  and then `draw()` the result,  but this is more
complicated; it's better to use `apply()` or `draw()` directly.

You can find live examples of these approaches at the links below.  The code for
these examples is in the HTML files in this folder.

- Apply: <https://reymond-group.github.io/smilesDrawer/docs/examples/basic/apply.html>
- Draw:  <https://reymond-group.github.io/smilesDrawer/docs/examples/basic/draw.html>
- Parse: <https://reymond-group.github.io/smilesDrawer/docs/examples/basic/parse.html>

For more information about each method, read on.


### Apply

This is the simplest way to use SmilesDrawer.  Use it when:

- You have a static set of molecules you want to draw.
- All the SMILES strings are known when the page loads.
- All the drawings should be the same size.

For each molecule you want to draw, add a `canvas` element to your HTML. Set its
`data-smiles` attribute to the SMILES of the molecule it should display:

```html
<canvas data-smiles="c1ccc2c(c1)C(=O)/C(=C\3/C(=O)c4ccccc4N3)/N2"></canvas>
```

Once the page has  fully loaded,  call  `SmilesDrawer.apply()`.  You'll probably
want to pass an options object as the first argument, as this is how you control
the size of the drawings (the default is 500 by 500).

```html
  <!-- ... -->
    <script type="text/javascript">
      const options = {width: 300, height: 200};
      SmilesDrawer.apply(options);
    </script>
  </body>
</html>
```

The `SmilesDrawer.apply()` function takes up to four arguments, all optional:

- `options`   - An options object.
- `selector`  - The CSS selector used to find drawable elements (defaults to `"canvas[data-smiles]"`).
- `themeName` - The name of the theme used when drawing (defaults to `"light"`).
- `onError`   - A function to be called in case of error (none by default).

**Caution:**

- This function can currently only draw to `canvas` elements.
- This function currently only works with single molecules, not reactions.
- The original dimensions of the canvases are overwritten by those in `options`.


### Draw

You can also use the  `SmiDrawer.draw()`  function to draw molecules.  Use it if
you need more control over your drawings, or if any of the following apply:

- You need to draw molecules with different sizes or styles.
- You don't know all of your SMILES strings when the page loads.
- You want to update your drawings dynamically.
- You want to draw reactions.
- You want to draw atom weights (highlighting).

To use it, first create a `SmiDrawer` object (you can pass reaction options as a
second argument to the constructor if needed). Then use its `draw()` function to
read a smiles string and draw it to an HTML element.  In this example, we select
the render target by its ID; see below for other options.

```js
const options = {width: 300, height: 200};
const drawer  = new SmilesDrawer.SmiDrawer(options);
drawer.draw('Oc2c1ccccc1[nH]c2', '#indoxyl');
```

The `SmiDrawer` constructor takes two arguments, both optional:

- `moleculeOptions` - A standard SmilesDrawer options object (defaults to `{}`).
- `reactionOptions` - A reaction options object (defaults to `{}`).

The `SmiDrawer.draw()` function takes at least two and up to six arguments:

- `smiles`          - The SMILES string of a molecule _or_ a reaction.
- `target`          - The render target.  This can be one of many things:
    - Pass `null` to create a new SVG element.
    - Pass `"svg"`, `"canvas"`, or `"img"` to create a new element of that type.
    - Pass an `SVGElement` or an `HTMLImageElement` to draw to an existing element.
    - Pass a CSS selector string that matches the element(s) to render to.
- `theme`           - Optional.  The theme to use when drawing (defaults to `"light"`).
- `successCallback` - Optional.  Called on the target element after each successful render.
- `errorCallback`   - Optional.  Called on the exception in case of failure.
- `weights`         - Optional.  Used for atom highlighting.

**Caution:**

- The original dimensions of the target are overwritten by those in `options`.
- This function cannot currently accept an `HTMLCanvasElement`  as a target.  To
  draw to an existing canvas, give it an ID and pass in CSS to select it.
- Note that the options object is passed to the constructor. If you want to draw
  molecules of different sizes, you'll need to create multiple `SmiDrawer`s, one
  for each size (fortunately, this is cheap).
- This function doesn't return anything,  and can draw to multiple elements when
  passed a CSS selector as a target.  If you need to access the element that was
  drawn to, you have to do this in the success callback.


### Parse then Draw

It's also possible to parse a SMILES string first, and then pass it to a drawing
function. You'll need to use a different drawer object in this case, though. For
example, to parse and then draw to a canvas, use a `Drawer`:

```js
const options = {width: 300, height: 200};
const drawer  = new SmilesDrawer.Drawer(options);
SmilesDrawer.parse(smiles, (result) => {
    drawer.draw(result, canvas);
}, (error) => {
    // Handle parse errors here!
});
```

To draw to an SVG instead, use an `SvgDrawer`:

```js
const options = {width: 300, height: 200};
const drawer  = new SmilesDrawer.SvgDrawer(options);
SmilesDrawer.parse(smiles, (result) => {
    drawer.draw(result, svg);
}, (error) => {
    // Handle parse errors here!
});
```

The `SmilesDrawer.parse()` function takes at least two and up to three arguments:

- `smiles`          - The SMILES string to parse.
- `successCallback` - Called on the result of parsing, if successful.
- `errorCallback`   - Optional.  Called on the exception in case of failure.

The `Drawer.draw()` function takes at least two arguments, and up to five:

- `data`            - The parse tree of a single molecule, as returned by `SmilesDrawer.parse()`.
- `target`          - An `HTMLCanvasElement` or the ID of an `HTMLCanvasElement`.
- `themeName`       - Optional.  The theme to use when drawing (defaults to `"light"`).
- `infoOnly`        - Optional.  Set to `true` to skip drawing (defaults to `false`).
- `highlight_atoms` - Optional.  Atoms to highlight (defaults to `[]`, or no highlighting).

The `SvgDrawer.draw()` function takes at least two arguments, and up to five:

- `data`            - The parse tree of a single molecule, as returned by `SmilesDrawer.parse()`.
- `target`          - An `SVGElement` or the ID of an `SVGElement`.
- `themeName`       - Optional.  The theme to use when drawing (defaults to `"light"`).
- `infoOnly`        - Optional.  Set to `true` to skip drawing (defaults to `false`).
- `highlight_atoms` - Optional.  Atoms to highlight (defaults to `[]`, or no highlighting).


**Caution:**

- `SmilesDrawer.parse()` only handles individual molecules.  To parse reactions,
  use `SmilesDrawer.parseReaction()` (see below).
- `SmilesDrawer.parse()` doesn't return its result.  You can only access the
  result through the success callback.
- There is currently no way to parse and then draw to an `HTMLImageElement`.


### Parse then Draw for Reactions

It's also possible  to parse and then draw reactions,  but you currently have to
use different functions.  Use `SmilesDrawer.parseReaction()` to parse,  and then
pass the result to a `ReactionDrawer` for drawing:

```js
// Reaction options control the plus signs, arrow, etc.
const reaction_options = {};
// Molecule options are for individual molecules in the reaction:
const molecule_options = {width: 100, height: 100};
const drawer = new SmilesDrawer.ReactionDrawer(reaction_options, molecule_options);
SmilesDrawer.parseReaction(smiles, (result) => {
    drawer.draw(result, svg);
}, (error) => {
    // Handle parse errors here!
    console.warn(error);
});
```

The `SmilesDrawer.parseReaction()` function takes two or three arguments:

- `smiles`          - The reaction SMILES string to parse.
- `successCallback` - Called on the result of parsing, if successful.
- `errorCallback`   - Optional.  Called on the exception in case of failure.

The `ReactionDrawer` constructor takes two arguments, both optional:

- `reactionOptions` - A reaction options object (defaults to `{}`).
- `moleculeOptions` - A SmilesDrawer options object (defaults to `{}`).

The `RectionDrawer.draw()` function takes at least two arguments:

- `reaction`  - A parsed reaction, as returned by `SmilesDrawer.parseReaction()`.
- `target`    - An `SVGElement`, the ID of an `SVGElement`, or `null` or `"svg"` to create a new `SVGElement`.
- `themeName` - Optional.  The theme to use when drawing (defaults to `"light"`).
- `weights`   - Optional.  Atom weights to use for highlighting (defaults to `null`, or no highlighting).
- `textAbove` - Optional.  Text to display above the reaction arrow (defaults to `"{reagents}"`, which will display the chemical formulae of the reagents).
- `textBelow` - Optional.  Text to display below the reaction arrow (defaults to `""`).
- `infoOnly`  - Optional.  Set to `true` to skip drawing (defaults to `false`).

**Caution:**

- You can currently only draw reactions to SVG elements.
- `SmilesDrawer.parseReaction()` only handles reactions, not single molecules.
- `SmilesDrawer.parseReaction()` doesn't return its result.  You can only access
  the result through the success callback.


## Advanced

For a complete tour of the many entrypoints of SmilesDrawer - including the
unreachable, the obscure, and the possibly deprecated - see:

- <https://github.com/reymond-group/smilesDrawer/tree/master/docs/entrypoints.md>
