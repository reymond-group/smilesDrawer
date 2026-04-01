# Drawing Reactions

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

- <http://reymond-group.github.io/smilesDrawer/docs/manual/live/reactions.html>


## Apply

You can draw reactions with an `apply()` method, but it's not the `apply()` from
the global `SmilesDrawer` object.  It's on `SmiDrawer` instead.  To use it, make
an `svg` with a `data-smiles` attribute that contains reaction SMILES:

```html
<svg data-smiles="[Pb]>>[Au]"></svg>
```

Then create a `SmiDrawer` and call its `apply()` function:

```js
const drawer = new SmilesDrawer.SmiDrawer();
drawer.apply();
```

See the function reference for more details:
- [`SmiDrawer.apply()`](entrypoints.md#smidrawerapply)


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
  "[Pb]>>[Au] __{textAboveArrow: 'MAGIC', textBelowArrow: '42°C'}__"
  ```


## Draw

You can also use the `SmiDrawer.draw()` function  to draw reactions dynamically,
one at a time. Create a `SmiDrawer` as above, then pass your reaction SMILES and
a render target to its `draw()` function. In this example, we pass the ID of the
element we want to draw to:

```js
const drawer = new SmilesDrawer.SmiDrawer();
drawer.draw('[Pb]>>[Au]', '#id-of-target');
```

See the function documentation for more details:
- [`SmiDrawer.draw()`](entrypoints.md#smidrawerdraw)

**Caution:**

- Drawing dimensions can only be set when drawing to a `canvas` or `img`, not to
  an `svg`.  The `width` and `height` are taken from `moleculeOptions`.
- Passing an  `HTMLCanvasElement`  as the `target` does not currently work.  But
  you _can_ pass in CSS that selects a canvas; this will work as expected.
- The arrow text hack from `SmiDrawer.apply()` works here, too.


## Parse then Draw

You can also parse your reaction SMILES first,  then pass the parsed reaction to
`ReactionDrawer.draw()`.  This lets you to pass any text you want shown above or
below the arrow as arguments to the function:

```js
SmilesDrawer.parseReaction('[Pb]>>[Au]', (result) => {
    const drawer = new SmilesDrawer.ReactionDrawer();
    drawer.draw(result, 'id-of-svg', 'light', null, 'MAGIC', '42°C');
}, (error) => {
    // Handle parse errors here!
});
```

See the function documentation for more details:
- [`SmilesDrawer.parseReaction()`](entrypoints.md#static-smilesdrawerparsereaction)
- [`ReactionDrawer.draw()`](entrypoints.md#reactiondrawerdraw)

**Caution:**

- There is currently no way to control the size of the drawing.
- The `ReactionDrawer.draw()` function can only draw to SVG elements.
- `SmilesDrawer.parseReaction()` only handles reactions, not single molecules.
- `SmilesDrawer.parseReaction()` function does not return the result.  To access
  the result, you must provide a success callback.


## See Also

- [Customizing Reactions](customization.md#reaction-options)
- [Reactions with Weights](reaction-weights.md)
- [Back to the Index](README.md)
