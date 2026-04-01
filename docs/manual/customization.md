# Customization

Almost everything in SmilesDrawer is customizable. You can control the colors of
atoms using Themes,  and you can control  just about everything else - including
the width  and height of your drawings - by providing  an Options object.  A few
additional options are controlled by a separate Reaction Options object.


## Options

Options are passed to  the static `apply()` functions and to the constructors of
the drawer classes. Pass options in a JavaScript object with keys taken from the
table below.  Any missing values will be filled in with the defaults:

```js
const drawer = new SmilesDrawer.SmiDrawer({width: 300, height: 200});
```

Note that  `width` and `height`  are options!  If you want to create drawings of
different sizes, you'll need to instantiate a new drawer for each size.

You can experiment with different values in the Playground:

- <https://reymond-group.github.io/smilesDrawer/tools/playground.html>


| Option                        | Default     | Description
| ----------------------------- | ----------- | --------------
| **Image Dimensions**
| `width`                       | `500`       | Drawing width
| `height`                      | `500`       | Drawing height
| `padding`                     | `10`        | Drawing padding
| **Atom Visualization**
| `atomVisualization`           | `"default"` | Atom visualization: `"default"`, `"balls"`, or `"none"`
| `fontSizeLarge`               | `11`        | Large font size (in `pt`, for elements)
| `fontSizeSmall`               | `3`         | Small font size (in `pt`, for numbers; currently unused)
| `compactDrawing`              | `true`      | Draw concatenated terminals and pseudo-elements
| `terminalCarbons`             | `false`     | Show terminal carbons (CH₃)
| `explicitHydrogens`           | `true`      | Show explicit hydrogens
| **Bond Visualization**
| `bondThickness`               | `1.0`       | Bond thickness
| `bondLength`                  | `30.0`      | Bond length
| `shortBondLength`             | `0.8`       | Short bond length (e.g. double bonds) as a percent of `bondLength`
| `bondSpacing`                 | `5.1`       | Spacing between double bonds
| `isomeric`                    | `true`      | Draw stereochemistry if available
| **Advanced**
| `overlapSensitivity`          | `0.42`      | Sensitivity to atom overlaps
| `overlapResolutionIterations` | `1`         | Number of overlap resolution iterations
| `experimentalSSSR`            | `false`     | Use improved(?) ring system detection
| `debug`                       | `false`     | Draw debug labels
| `themes`                      | see below   | Custom color schemes

A few common issues can be fixed by adjusting these options:

- If you want to see a full structure, but are seeing too much abbreviation (for
  example,  if you don't want  carboxyl groups  to render as the string `COOH`),
  set `compactDrawing` to `false`.
- If you are seeing  hydrogens  that you don't want  (typically at stereocenters
  like `[C@@H]`), set `explicitHydrogens` to `false`.
- If you have problems drawing large ring systems - including extra-long bonds -
  try setting `experimentalSSSR` to `true`.

For the complete list of options,  including the  undocumented  and the possibly
deprecated, see the `DrawerBase` constructor in `src/DrawerBase.js`. Use at your
own risk!


## Themes

Themes  control the colors of different types of atoms.  SmilesDrawer comes with
several built-in themes.  You can see all of these in the Theme Gallery:

- <https://reymond-group.github.io/smilesDrawer/tools/theme-gallery.html>

SmilesDrawer uses the `light` theme by default.  To use a different theme,  pass
its name as  the appropriate argument  (usually the third)  to your `apply()` or
`draw()` function.  For example,  using `SmilesDrawer.apply()`  and applying the
`matrix` theme:

```js
SmilesDrawer.apply(options, "canvas[data-smiles]", "matrix");
```

Or using `SmiDrawer.draw()` with the `solarized` theme:

```js
const drawer = new SmilesDrawer.SmiDrawer(options);
drawer.draw(smiles, target, "solarized");
```

If you use the  `SmiDrawer.apply()` function,  you can also specify a theme name
in a `data-smiles-theme` attribute on the HTML elements you draw to.


### Custom Themes

To use custom color schemes, pass them in the `themes` option when `apply()`ing
or creating your  drawer object  (see the Options section, above).  The `themes`
option should be an object whose keys are theme names and whose values are color
maps.  A color map is another object,  whose keys are (mostly) atom names in all
upper case, and whose values are CSS colors:

```js
const options = {
    // ...
    themes: {
        "my-theme": {
            FOREGROUND: "#222222",
            BACKGROUND: "#ffffff",

            C:  "#222222",
            O:  "#e74c3c",
            N:  "#3498db",
            F:  "#27ae60",
            CL: "#16a085",
            BR: "#d35400",
            I:  "#8e44ad",
            P:  "#d35400",
            S:  "#f1c40f",
            B:  "#e67e22",
            SI: "#e67e22",
            H:  "#666666",
        }
    }
};
```

Then pass the name of  your custom theme  (`"my-theme"` in the example above) to
your `apply()` or `draw()` function,  just like you would  when using a built-in
theme.

You can experiment with your own color schemes in the Playground:

- <https://reymond-group.github.io/smilesDrawer/tools/playground.html>


**Caution:**
- The `BACKGROUND` and `FOREGROUND` keys are placeholders, and are not currently
  used.  The current version of SmilesDrawer uses the color for carbon (`C`) for
  all miscellaneous drawing  (unknown atoms, reaction arrows, etc.) and draws on
  a transparent background.  This will change in future versions.
- The Theme Gallery and the Playground contain extra logic to set the background
  color  before drawing a molecule.  This is _not_ currently built-in behaviour;
  you'll need to implement something similar yourself to get the same effect.


## Reaction Options

When drawing reactions,  SmilesDrawer uses an  additional set of options.  These
are  passed as a separate options object  from the one described  in the Options
section above.  For clarity,  we'll refer to the  standard  options as "molecule
options" and to the reaction-specific options as "reaction options."

Note that the `plus`, `arrow`, and `weights` options are nested objects.

| Option              | Default                          | Description
| ------------------- | -------------------------------- | -----------
| `fontSize`          | *                                | Numeric font size (in `pt`)
| `fontFamily`        | `"Arial, Helvetica, sans-serif"` | CSS `font-family` string
| `spacing`           | `10`                             | Horizontal space between graphics
| `plus.size`         | `9`                              | Size of the plus sign between molecules
| `plus.thickness`    | `1.0`                            | Thickness of the plus sign
| `arrow.length`      | *                                | Length of the reaction arrow
| `arrow.headSize`    | `6.0`                            | Size of the head of the reaction arrow
| `arrow.thickness`   | `1.0`                            | Thickness of the reaction arrow
| `arrow.margin`      | `3`                              | Vertical space between arrow and any text
| `weights.normalize` | `false`                          | Normalize weights to the range `[-1, 1]`

A few of the default values change based on the molecule options that are passed
to the  same constructor (all classes that accept  reaction options  also accept
regular molecule options):

- `fontSize` defaults to 80% of `fontSizeLarge` from the molecule options.
- `arrow.length` defaults to 400% of `bondLength` from the molecule options.

For the  official definitions of the reaction options,  see the `ReactionDrawer`
constructor in `src/ReactionDrawer.js`.


## See Also

- [Drawing Molecules](basic-drawing.md)
- [Drawing Reactions](reactions.md)
- [Back to the Index](README.md)
