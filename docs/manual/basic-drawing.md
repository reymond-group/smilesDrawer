# Basic Drawing

The easiest ways to use SmilesDrawer are to use `apply()` to display some static
molecules, or to use `draw()` to draw individual molecules dynamically.  You can
also  `parse()` a SMILES string  and then `draw()` the result,  but this is more
complicated; it's better to use `apply()` or `draw()` directly.

You can find live examples of these approaches at the links below.  The code for
these examples is in the `live` folder.

- Apply: <https://reymond-group.github.io/smilesDrawer/manual/live/basic-apply.html>
- Draw:  <https://reymond-group.github.io/smilesDrawer/manual/live/basic-draw.html>
- Parse: <https://reymond-group.github.io/smilesDrawer/manual/live/basic-parse.html>
- Code:  <https://github.com/reymond-group/smilesDrawer/tree/master/docs/manual/live>

For more information about each method, read on.


## Apply

This is the simplest way to use SmilesDrawer.  Use it when:

- You have a static set of molecules you want to draw.
- All the SMILES strings are known when the page loads.
- All the drawings should be the same size.

For each molecule you want to draw, add a `canvas` element to your HTML. Set its
`data-smiles` attribute to the SMILES of the molecule it should display:

```html
<canvas data-smiles="c1ccc2c(c1)C(=O)/C(=C\3/C(=O)c4ccccc4N3)/N2"></canvas>
```

Once the page  has fully loaded,  call  `SmilesDrawer.apply()`.  Pass an options
object as the first argument to control the size of the drawings (the default is
500 by 500).

```js
const options = {width: 300, height: 200};
SmilesDrawer.apply(options);
```

See the function documentation for more details:
- [`SmilesDrawer.apply()`](entrypoints.md#static-smilesdrawer-apply)

There are several ways  to make sure  your JavaScript doesn't run until  all the
`canvas` elements you want to draw to have loaded.  Try one of these:

- Add the `defer` attribute to your `script` element.
- Put your `script` element at the bottom of the `body` element.
- Use an event handler to call `apply()` on `load` or on `DOMContentLoaded`.

**Caution:**

- The original dimensions of the canvases are overwritten by those in `options`.
- `SmilesDrawer.apply()`  can currently only draw to `canvas` elements.  See the
  documentation for `SmiDrawer.apply()` for a more powerful alternative.


## Draw

You can also use the  `SmiDrawer.draw()`  function to draw molecules.  Use it if
you need more control over your drawings, or if any of the following apply:

- You need to draw molecules with different sizes or styles.
- You don't know all of your SMILES strings when the page loads.
- You want to update your drawings dynamically.

To use it, first create a `SmiDrawer` object (you can pass reaction options as a
second argument to the constructor if needed). Then use its `draw()` function to
read a smiles string and draw it to an HTML element.  In this example, we select
the render target by its ID (`indoxyl`):

```js
const options = {width: 300, height: 200};
const drawer  = new SmilesDrawer.SmiDrawer(options);
drawer.draw('Oc2c1ccccc1[nH]c2', '#indoxyl');
```

The second argument to  `SmiDrawer.draw()`  is the render target,  and it can be
many things.  See the function documentation for more details:
- [`SmiDrawer.draw()`](entrypoints.md#smidrawer-draw)

**Caution:**

- The original dimensions of the target are overwritten by those in `options`.
- This function cannot currently accept an `HTMLCanvasElement`  as a target.  To
  draw to an existing canvas, pass in CSS that selects it.
- Note that the options object is passed to the constructor. If you want to draw
  molecules of different sizes, you'll need to create multiple `SmiDrawer`s, one
  for each size (fortunately, this is cheap).
- This function doesn't return anything,  and can draw to multiple elements when
  passed a CSS selector as a target.  If you need to access the element that was
  drawn to, you have to provide a success callback.


## Parse then Draw

It's also possible to parse a SMILES string first, and then pass the result to a
drawing function.  You'll need  to use a  different drawer object  in this case,
though.  For example, to parse and then draw to a canvas, use a `Drawer`:

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

See the function documentation for more details:
- [`SmilesDrawer.parse()`](entrypoints.md#static-smilesdrawer-parse)
- [`Drawer.draw()`](entrypoints.md#drawer-draw)
- [`SvgDrawer.draw()`](entrypoints.md#svgdrawer-draw)

**Caution:**

- `SmilesDrawer.parse()` doesn't return its result.  You can only access the
  result through the success callback.
- There is currently no way to parse and then draw to an `HTMLImageElement`.


## See Also

- [Customization](customization.md)
- [Drawing Reactions](reactions.md)
- [Back to the Index](README.md)
