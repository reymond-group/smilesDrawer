# Entrypoints

**Caution:**  If you just want to draw some molecules,  this is not a good place
to start!  Try one of these pages instead:

- [Drawing Molecules](basic-drawing.md)
- [Drawing Reactions](reactions.md)
- [Documentation Index](README.md)


This is a catalog of the many  (many!) entrypoints of SmilesDrawer -- the public
API,  if you will.  These functions  are all slightly different;  the purpose of
this guide is to explain those differences  by giving a brief description of how
to use each one, as well as any quirks or known bugs.

Entrypoints are grouped by their purpose (`apply()`, `draw()`, or `parse()`) and
then ordered  alphabetically:  first by class,  then by function name.  Argument
names and default values are taken directly from the source code.

A few notes on the naming conventions used here:

- `SmilesDrawer` refers to the SmilesDrawer namespace, defined in `app.js`.
- `SmiDrawer` refers to the drawer class defined in `src/SmilesDrawer.js`.
- Arguments named `options` or `moleculeOptions` accept molecule options objects
  as described in the [Options](customization.md#options) guide.  Arguments that
  accept  [Reaction Options](customization.md#reaction-options) are always named
  `reactionOptions`.



## Apply

The `apply()` functions are one-shot rendering functions. They find all the HTML
elements that match a CSS query, read the `data-smiles` attribute from each one,
and render that molecule to the element.

`SmilesDrawer.apply()` is the normal entrypoint, but `SmiDrawer.apply()` is much
more powerful; it will likely become the default in a future version.

**Caution:**

- An  `apply()`  function should only be called _after_ all of the HTML elements
  it draws to have loaded: it will only draw to pre-existing elements.
- It's better  not to use  `apply()`  to update existing drawings,  as this will
  (likely needlessly) update _all_ the drawings that match the selector.  Prefer
  using `draw()` to update individual drawings instead.


### `static SmilesDrawer.apply()`

```js
SmilesDrawer.apply(
    options,
    selector  = "canvas[data-smiles]",
    themeName = "light",
    onError   = null
)
```

Only supports single molecules; no reactions.
Uses `SmilesDrawer.Drawer().draw()` internally, and thus only works on canvases.
No return value.

This function only uses a single magic HTML attribute:
- `data-smiles`


### `static SmiDrawer.apply()`

```js
SmilesDrawer.SmiDrawer.apply(
    moleculeOptions = {},
    reactionOptions = {},
    attribute       = "data-smiles", // HTML attribute name
    theme           = "light",
    successCallback = null,
    errorCallback   = null
)
```

Shorthand for constructing a new `SmiDrawer` and calling its `apply()` function.
See the docs for the instance method (directly below) for details.
No return value.


### `SmiDrawer.apply()`

```js
new SmilesDrawer.SmiDrawer(moleculeOptions={}, reactionOptions={}).apply(
    attribute       = "data-smiles", // HTML attribute name
    theme           = "light",
    successCallback = null,
    errorCallback   = null
)
```

Calls `document.querySelectorAll("[" + attirbute + "]")` to find targets.
Calls `element.getAttribute(attribute)` to get SMILES strings.
Supports both single molecules and reactions.
Allows ` __{textAboveArrow: 'xxx', textBelowArrow: 'yyy'}__` at the end of the SMILES string (this is only useful for reactions).
Calls `this.draw()` internally.
No return value.

This function supports several magic HTML attributes:
- `data-smiles`                  (overridden by the `attribute` argument)
- `data-smiles-theme`            (theme name)
- `data-smiles-options`          (JSON, but `'` is converted to `"`)
- `data-smiles-reaction-options` (JSON, but `'` is converted to `"`)
- `data-smiles-weights`          (used for single molecules)
- `data-smiles-reactant-weights` (used for reactions)
- `data-smiles-reagent-weights`  (unused?)
- `data-smiles-product-weights`  (used for reactions)

**Caution:**

- A bug currently prevents this function from drawing to `canvas` elements.
- Drawing dimensions can only be set when drawing to a `canvas` or `img`, not to
  an `svg`.  The `width` and `height` are set in `moleculeOptions`.
- This function  uses `document.querySelectorAll("[" + attribute + "]")` to find
  targets to draw to.  There is no way to provide a different selector.
- There is currently a hack to provide text to put  above and below the reaction
  arrow as part of the SMILES string:  Put a space after the SMILES string, then
  two underscores;  append JSON that includes the keys  `textAboveArrow`  and/or
  `textBelowArrow`; then add two more underscores.  Any apostrophes (`'`) in the
  JSON will be converted to double quotes (`"`) before parsing.  Example:
  ```js
  "[Pb]>>[Au] __{'textAboveArrow': 'as above', 'textBelowArrow': 'so below'}__"
  ```



## Draw

The `draw()` functions take two main arguments: something to draw, and somewhere
to draw it to. `SmiDrawer.draw()` is the recommended entrypoint; it accepts both
single-molecule SMILES strings _and_ reaction SMILES strings, and it can draw to
the widest range of elements.

Most other `draw()` functions expect  a pre-parsed molecule/reaction,  so you'll
need to use a `parse()` function (see the next section) before calling those.


### `Drawer.draw()`

```js
new SmilesDrawer.Drawer(options).draw(
    data,           // pre-parsed molecule
    target,         // a canvas or the ID of a canvas
    themeName       = "light",
    infoOnly        = false,
    highlight_atoms = []
)
```

Uses an `SvgDrawer` internally.
No return value.


### `DrawerBase.draw()`

```js
new DrawerBase(options).draw(
    data,       // pre-parsed molecule
    target,     // a canvas or the ID of a canvas
    themeName = "light",
    infoOnly  = false
)
```

Not directly accessible, and probably deprecated.
Uses a `CanvasWrapper` internally.
No return value.


### `GaussDrawer.draw()`

```js
new SmilesDrawer.GaussDrawer(...stuff).draw()
```

This is not the function you're looking for.


### `ReactionDrawer.draw()`

```js
new SmilesDrawer.ReactionDrawer(reactionOptions, moleculeOptions).draw(
    reaction, // pre-parsed reaction
    target,   // an svg, the ID of an svg, or null or "svg" to create a new one
    themeName = "light",
    weights   = null,
    textAbove = "{reagents}",
    textBelow = "",
    infoOnly  = false
)
```

Draws a reaction.
Note the order of the constructor arguments.
Uses an `SvgDrawer` internally.
Returns the SVG.

**Caution:**

- There is currently no way to control the size of the drawing.


### `SmiDrawer.draw()`

```js
new SmilesDrawer.SmiDrawer(moleculeOptions={}, reactionOptions={}).draw(
    smiles,         // smiles string (molecule OR reaction)
    target,         // see below
    theme           = "light",
    successCallback = null,
    errorCallback   = null,
    weights         = null
)
```

Calls `this.drawReaction()` if there are any `>`s in `smiles`, or `this.drawMolecule()` if not.
Allows `  __{textAboveArrow: 'xxx', textBelowArrow: 'yyy'}__` at the end of the SMILES string (only useful for reactions).
No return value.

The `target` argument can be one of many things:
- Pass `null` to draw to a new SVG.
- Pass `"svg"`, `"canvas"`, or `"img"` to draw to a new element of that type.
- Pass an `SVGSVGElement` or an `HTMLImageElement` to draw to an existing element.
- Pass some other string to call `document.querySelectorAll(target)` and draw to all results.

**Caution:**

- Drawing dimensions are only set when drawing to a `canvas` or `img`, not to an
  `svg`.  The `width` and `height` are taken from `moleculeOptions`.
- Passing an  `HTMLCanvasElement`  as `target` does not currently work.  But you
  _can_ pass in CSS that selects a canvas; this will work as expected.
- The arrow text hack described under `SmiDrawer.apply()` works here, too.


### `SmiDrawer.drawMolecule()`

```js
new SmilesDrawer.SmiDrawer(moleculeOptions={}, reactionOptions={}).drawMolecule(
    smiles,  // smiles string (molecule)
    target,  // same as in SmiDrawer.draw()
    theme,   // theme name
    weights, // used for atom highlighting
    callback // success callback
)
```

There are no default arguments; this is typically called by `SmiDrawer.draw()`.
Uses an `SvgDrawer` internally.
No return value.


### `SmiDrawer.drawReaction()`

```js
new SmilesDrawer.SmiDrawer(moleculeOptions={}, reactionOptions={}).drawReaction(
    smiles,   // smiles string (reaction)
    target,   // same as in SmiDrawer.draw()
    theme,    // theme name
    settings, // {textAboveArrow: "xxx", textBelowArrow: "yyy"}
    weights,  // used for atom highlighting
    callback  // success callback
)
```

There are no default arguments; this is typically called by `SmiDrawer.draw()`.
Uses a `ReactionDrawer` internally.
No return value.


### `SvgDrawer.draw()`

```js
new SmilesDrawer.SvgDrawer(options, clear=true).draw(
    data,             // pre-parsed molecule
    target,           // an svg or the ID of an svg
    themeName         = "light",
    weights           = null,
    infoOnly          = false,
    highlight_atoms   = [],
    weightsNormalized = false
)
```

Actually does the drawing!
Uses an `SvgWrapper` internally.
Returns the SVG.


### `SvgDrawer.drawCanvas()`

```js
new SmilesDrawer.SvgDrawer(options, clear=true).drawCanvas(
    data,     // pre-parsed molecule
    target,   // a canvas or the ID of a canvas
    themeName = "light",
    infoOnly  = false // actually weights!?
)
```

Calls `this.draw()` on a temporary SVG, then copies it to the target canvas.
Note that `infoOnly` is actually passed as the `weights` argument to `draw()`!
Returns the canvas.



## Parse

The `parse()` functions take SMILES strings and create "parse trees" or reaction
objects.  The recommended entrypoints  (the static functions on  `SmilesDrawer`)
only expose their results through a callback function.


### `static SmilesDrawer.parse()`

```js
SmilesDrawer.parse(
    smiles,
    successCallback,
    errorCallback
)
````

Parses a single molecule, but does _not_ return the result; use the success callback.
Calls `Parser.parse()` internally.


### `static SmilesDrawer.parseReaction()`

```js
SmilesDrawer.parseReaction(
    reactionSmiles,
    successCallback,
    errorCallback
)
```

Parses a reaction, but does _not_ return the result; use the success callback.
Calls `ReactionParser.parse()` internally.


### `static Parser.parse()`

```js
SmilesDrawer.Parser.parse(smiles)
```

Parses a single molecule and returns the result.
Prefer `SmilesDrawer.parse()`.


### `new Reaction()`

```js
new Reaction(smiles)
```

Parses reaction SMILES and "returns" a reaction object.
Not directly accessible.


### `static RactionParser.parse()`

```js
SmilesDrawer.ReactionParser.parse(smiles)
```

Parses reaction SMILES and returns the result.
Calls `new Reaction(smiles)` internally.
Prefer `SmilesDrawer.parseReaction()`.



## See Also

- [The Source (Code) of Truth](https://github.com/reymond-group/smilesDrawer/tree/master/src)
- [Back to the Index](README.md)
