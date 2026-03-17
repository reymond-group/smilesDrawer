# Entrypoints

**Caution:** If you are not an advanced user, this is not the page you want! See
the basic examples page instead for working code and better explanations:

- <https://github.com/reymond-group/smilesDrawer/tree/master/docs/examples/basic>

Okay...  If you're still here, you know what you're getting into.  As of version
2.2.1, SmilesDrawer contains a veritable maze  of twisty little entrypoints, all
slightly different. This is an attempt to catalogue all of those entrypoints and
provide a (brief!) guide to their arguments and how to use them.

Entrypoints are grouped by their purpose (`apply()`, `draw()`, or `parse()`) and
ordered  alphabetically by class.  Classes that are  exposed on the SmilesDrawer
namespace object are listed with a `SmilesDrawer` prefix;  other classes use the
bare class name.  Note that the class  defined in `src/SmilesDrawer.js` is named
`SmilesDrawer` internally, but attached to the namespace  and to the `window` as
`SmiDrawer`;  we use the name `SmilesDrawer.SmiDrawer` for this class.  The full
list of exposed classes is:

- `Drawer`
- `GaussDrawer`
- `Parser`
- `ReactionDrawer`
- `ReactionParser`
- `SmiDrawer`
- `SvgDrawer`

There are also a few static functions attached directly to the namespace.  These
are referred to as `SmilesDrawer.foo()` and so on.

...

Here be dragons.  Good luck!


## Apply

```js
SmilesDrawer.apply(
    options,
    selector  = "canvas[data-smiles]",
    themeName = "light",
    onError   = null
)
```

Uses `SmilesDrawer.Drawer().draw()`.
And thus only works on canvases.
No return value.


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

Same as constructor + instance apply (see below).


```js
new SmilesDrawer.SmiDrawer(moleculeOptions={}, reactionOptions={}).apply(
    attribute       = "data-smiles", // HTML attribute name
    theme           = "light",
    successCallback = null,
    errorCallback   = null
)
```

Calls `document.querySelectorAll("[" + attirbute + "]")` to find targets.
Allows `  __{json options}__` at the end of the SMILES string.
Calls `this.draw()`.


## Draw

```js
new SmilesDrawer.Drawer(options).draw(
    data,           // pre-parsed molecule
    target,         // canvas or the ID of a canvas
    themeName       = "light",
    infoOnly        = false,
    highlight_atoms = []
)
```

Uses an `SvgDrawer` internally.


```js
new DrawerBase(options).draw(
    data,       // pre-parsed molecule
    target,     // canvas or the ID of a canvas
    themeName = "light",
    infoOnly  = false
)
```

Uses a `CanvasWrapper` internally.
Not directly accessible.
Probably deprecated.


```js
new SmilesDrawer.GaussDrawer(...).draw()
```

This is not the function you're looking for.


```js
new SmilesDrawer.ReactionDrawer(reactionOptions, moleculeOptions).draw(
    reaction, // pre-parsed reaction
    target,   // svg, the ID of an svg, or null or "svg" to create a new one
    themeName = "light",
    weights   = null,
    textAbove = "{reagents}",
    textBelow = "",
    infoOnly  = false
)
```

Uses an `SvgDrawer` internally.


```js
new SmilesDrawer.SmiDrawer(moleculeOptions={}, reactionOptions={}).draw(
    smiles,         // smiles string (molecule OR reaction)
    target,         // null, "svg", "img", "canvas", img, svg, or CSS query
    theme           = "light",
    successCallback = null,
    errorCallback   = null,
    weights         = null
)
```

Calls `this.drawMolecule()` or `this.drawReaction()`.


```js
new SmilesDrawer.SmiDrawer(moleculeOptions={}, reactionOptions={}).drawMolecule(
    smiles, // smiles string (single molecule)
    target, // same as in SmiDrawer.draw()
    theme,
    weights,
    callback
)
```

Uses an `SvgDrawer` internally.
The callback is a success callback.


```js
new SmilesDrawer.SmiDrawer(moleculeOptions={}, reactionOptions={}).drawReaction(
    smiles, // smiles string (reaction)
    target, // same as in SmiDrawer.draw()
    theme,
    settings,
    weights,
    callback
)
```

Uses `ReactionDrawer` internally.
The callback is a success callback.


```js
new SmilesDrawer.SvgDrawer(options, clear=true).draw(
    data,             // pre-parsed molecule
    target,           // svg or the ID of an svg
    themeName         = "light",
    weights           = null,
    infoOnly          = false,
    highlight_atoms   = [],
    weightsNormalized = false
)
```

Actually does the drawing!
Uses an `SvgWrapper` internally.


```js
new SmilesDrawer.SvgDrawer(options, clear=true).drawCanvas(
    data,     // pre-parsed molecule
    target,   // canvas or the ID of a canvas
    themeName = "light",
    infoOnly  = false
)
```

Calls `this.draw()` on a temp SVG, then copies it to the canvas.


## Parse

```js
SmilesDrawer.parse(
    smiles,
    successCallback,
    errorCallback
)
````

Parses a single molecule.
Calls `Parser.parse()`.
No return value! Use the success callback.


```js
SmilesDrawer.parseReaction(
    reactionSmiles,
    successCallback,
    errorCallback
)
```

Parses a reaction.
Calls `ReactionParser.parse()`.
No return value! Use the success callback.


```js
SmilesDrawer.Parser.parse(smiles)
```

Parses a single molecule.


```js
new Reaction(smiles)
```

Parses a reaction.
Not directly accessible.


```js
SmilesDrawer.ReactionParser.parse(smiles)
```

Parses a reaction.
Calls `new Reaction(smiles)`.
