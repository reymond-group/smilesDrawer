![NPM Package](https://img.shields.io/npm/v/smiles-drawer)

# SmilesDrawer 2.0

No server, no images, no templates - just SMILES 😊

Current Version: **2.2.1**

<table style="width: 100%; table-layout: fixed">
    <tbody>
        <tr>
            <td><a href="https://smilesdrawer.rocks">Molecules</a></td>
            <td><a href="https://smilesdrawer.rocks">Reactions & Highlights</a></td>
        </tr>
        <tr>
            <td><a href="https://smilesdrawer.rocks"><img src="https://github.com/reymond-group/smilesDrawer/raw/master/readme/main.png"></img></a></td>
            <td><a href="https://smilesdrawer.rocks"><img src="https://github.com/reymond-group/smilesDrawer/raw/master/readme/rxn_highlight.png"></img></a></td>
        </tr>
        <tr>
            <td><a href="https://smilesdrawer.surge.sh/use.html">Learn & Copy-Paste</a></td>
            <td><a href="https://smilesdrawer.surge.sh/playground.html">Style & Customize</a></td>
        </tr>
        <tr>
            <td><a href="https://smilesdrawer.surge.sh/use.html"><img src="https://github.com/reymond-group/smilesDrawer/raw/master/readme/learn.png"></img></a></td>
            <td><a href="https://smilesdrawer.surge.sh/playground.html"><img src="https://github.com/reymond-group/smilesDrawer/raw/master/readme/style.png"></img></a></td>
        </tr>
    </tbody>
</table>


## Getting Started

### "Installation"

The latest version of SmilesDrawer can be found in the `dist` folder on GitHub:\
<https://github.com/reymond-group/smilesDrawer/tree/master/dist>

SmilesDrawer is also available as `smiles-drawer` on NPM,  so you can install it
with your favorite JavaScript package manager (`npm`, `yarn`, etc.):\
<https://www.npmjs.com/package/smiles-drawer>

The code on NPM is also available through various CDNs, including:

- **UNPKG**     <https://unpkg.com/smiles-drawer@2/dist/smiles-drawer.min.js>
- **jsDelivr**  <https://cdn.jsdelivr.net/npm/smiles-drawer@2/dist/smiles-drawer.min.js>
- **ESM.sh**    <https://esm.sh/smiles-drawer@2/dist/smiles-drawer.min.js>

If you'd rather build your own version of SmilesDrawer - or if you're interested
in contributing - see `CONTRIBUTING.md`.


### Simple Drawing

If you just want to  display some molecules,  create some `canvas` elements with
the `data-smiles` attribute set, then call `SmilesDrawer.apply()`:

```html
<html>
    <head>
        <script type="text/javascript" src="path/to/smiles-drawer.js"></script>
    </head>
    <body>
        <canvas data-smiles="Cn1cnc2c1C(=O)N(C(=O)N2C)C"></canvas>
        <canvas data-smiles="c1(C=O)cc(OC)c(O)cc1"></canvas>
        <script type="text/javascript">
            SmilesDrawer.apply()
        </script>
    </body>
</html>
```

The `SmilesDrawer.apply()` function takes up to four arguments, all optional:

- `options`   - An options object (see the Options section below).
- `selector`  - A CSS selector for finding HTML elements (defaults to `"canvas[data-smiles]"`).
- `themeName` - The name of the theme used when drawing (defaults to `"light"`).
- `onError`   - A function to be called in case of error (none by default).


### Dynamic Drawing

To draw a single molecule to a  specific HTML element,  create a `SmiDrawer` and
use  its `draw()` function.  This can be used to update a molecule when an input
changes:

```html
<html>
    <head>
        <script type="text/javascript" src="path/to/smiles-drawer.js"></script>
    </head>
    <body>
        <input  id="input" value="O=C(O)CNCP(=O)(O)O" />
        <canvas id="output"></canvas>
        <script type="text/javascript">
            function render(smiles, target) {
                const options = {width: 300, height: 200}
                const drawer  = new SmilesDrawer.SmiDrawer(options)
                drawer.draw(smiles, target)
            }

            const input = document.getElementById('input')
            input.addEventListener('input', function(event) {
                // Re-render when the user enters a new SMILES string:
                render(input.value, '#output')
            })

            // Initial render for when the page loads:
            render(input.value, '#output')
        </script>
    </body>
</html>
```

The `SmiDrawer.draw()` function takes at least two and up to six arguments:

- `smiles`          - Required.  The SMILES string to parse and render.
- `target`          - Required.  The render target.  This can be many things:
    - Pass `null` to create a new SVG element.
    - Pass `"svg"`, `"canvas"`, or `"img"` to create a new element of that type.
    - Pass an `SVGElement` or an `HTMLImageElement` to draw to an existing element.
    - Pass a CSS selector string that matches the element(s) to render to.
- `theme`           - The name of the theme used when drawing (defaults to `"light"`).
- `successCallback` - Called on the target element after each successful render.
- `errorCallback`   - Called on the exception in case of failure.
- `weights`         - Very optional.  Used for atom highlighting.


### More Examples

For more examples  - including examples in various frameworks, like React -  see
the [examples](TODO) page in the online documentation.


## Customizing SmilesDrawer

### Options

Options are passed to the `SmilesDrawer.apply()` function and to the `SmiDrawer`
constructor.  Note that `width` and `height`  are included in these options:  if
you want to create drawings of different sizes, you'll need to instantiate a new
`SmiDrawer` for each size.

The most useful options  are listed below.  To experiment with these,  go to the
[playground](TODO) page in the online documentation.  For the full list, see the
`DrawerBase` constructor in `src/DrawerBase.js`.

| Option                        | Default     | Description
| ----------------------------- | ----------- | --------------
| **Image Dimensions**
| `width`                       | `500`       | Drawing width
| `height`                      | `500`       | Drawing height
| `padding`                     | `10`        | Drawing padding
| **Atom Visualization**
| `atomVisualization`           | `"default"` | Atom visualization: `"default"`, `"balls"`, or `"none"`
| `fontSizeLarge`               | `11`        | Large font size (in `pt`, for elements)
| `fontSizeSmall`               | `3`         | Small font size (in `pt`, for numbers)
| `compactDrawing`              | `true`      | Draw concatenated terminals and pseudo-elements
| `terminalCarbons`             | `false`     | Show terminal carbons (CH3)
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
| `themes`                      | see below   | Color themes


A few common issues can be fixed by adjusting these options:

- If you want to see a full structure, but are seeing too much abbreviation (for
  example, `COOH` renders as a single string), set `compactDrawing` to `false`.
- If you are seeing  hydrogens  that you don't need  (typically at stereocenters
  like `[C@@H]`), set `explicitHydrogens` to `false`.
- If you have problems drawing large ring systems - including extra-long bonds -
  try setting `experimentalSSSR` to `true`.


### Themes

Themes let you control the colors of atoms. An initial set of possible themes is
passed as part of the `options` object; when drawing, you can pass the name of a
theme to use it.  SmilesDrawer uses the `"light"` theme by default.

To see all the built-in themes, go to [examples](TODO).  You can make your own
theme in the [playground](TODO).

To use custom colors, pass your own theme in the `options` object, then pass its
name when you draw your molecules (or you can name it `light` so it gets used by
default).

```js
const options = {
    // ...
    themes: {
        'my-theme': {
            FOREGROUND: '#222222',
            BACKGROUND: '#ffffff',

            C:  '#222222',
            O:  '#e74c3c',
            N:  '#3498db',
            F:  '#27ae60',
            CL: '#16a085',
            BR: '#d35400',
            I:  '#8e44ad',
            P:  '#d35400',
            S:  '#f1c40f',
            B:  '#e67e22',
            SI: '#e67e22',
            H:  '#666666',
        }
    }
}

// Example using the apply() function:
SmilesDrawer.apply(options, 'canvas[data-smiles]', 'my-theme')

// Example using a targeted draw() call:
const drawer = new SmilesDrawer.SmiDrawer(options)
drawer.draw(smiles, target, 'my-theme')
```

Some possible gotchas:

- Unknown atoms draw with the color for carbon.
- Atom names are currently all upper case.
- The background is not currently drawn.


## Please Cite

If you use this project in your research,  please cite the original paper, which
was published in the Journal of Chemical Information and Modeling:
[10.1021/acs.jcim.7b00425](https://dx.doi.org/10.1021/acs.jcim.7b00425)

<details>
<summary>Show BibTeX</summary>

```tex
@article{doi:10.1021/acs.jcim.7b00425,
    author  = {Probst, Daniel and Reymond, Jean-Louis},
    title   = {SmilesDrawer: Parsing and Drawing SMILES-Encoded Molecular Structures Using Client-Side JavaScript},
    journal = {Journal of Chemical Information and Modeling},
    volume  = {58},
    number  = {1},
    pages   = {1-7},
    year    = {2018},
    doi     = {10.1021/acs.jcim.7b00425},
    note    = {PMID: 29257869},
    URL     = {https://doi.org/10.1021/acs.jcim.7b00425},
    eprint  = {https://doi.org/10.1021/acs.jcim.7b00425}
}
```
</details>

<details>
<summary>Show RIS</summary>

```ris
TY  - JOUR
T1  - SmilesDrawer: Parsing and Drawing SMILES-Encoded Molecular Structures Using Client-Side JavaScript
AU  - Probst, Daniel
AU  - Reymond, Jean-Louis
Y1  - 2018/01/22
PY  - 2018
DA  - 2018/01/22
N1  - doi: 10.1021/acs.jcim.7b00425
DO  - 10.1021/acs.jcim.7b00425
T2  - Journal of Chemical Information and Modeling
JF  - Journal of Chemical Information and Modeling
JO  - J. Chem. Inf. Model.
SP  - 1
EP  - 7
VL  - 58
IS  - 1
PB  - American Chemical Society
SN  - 1549-9596
M3  - doi: 10.1021/acs.jcim.7b00425
UR  - https://doi.org/10.1021/acs.jcim.7b00425
ER  - 
```
</details>


### Thank You!

Thank you for contributing:
- SRI International's CSE group (for the excellent SVG support).
- And all our [contributors](https://github.com/reymond-group/smilesDrawer/graphs/contributors) on GitHub!
