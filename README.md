![NPM Package](https://img.shields.io/npm/v/smiles-drawer)

# SmilesDrawer 2.0

No server, no images, no templates - just SMILES 😊

Current Version: **2.2.1**

<table style="width: 100%; table-layout: fixed">
    <tbody>
        <tr>
            <td><a href="https://reymond-group.github.io/smilesDrawer/manual/basic-drawing.md">Draw Molecules</a></td>
            <td><a href="https://reymond-group.github.io/smilesDrawer/manual/customization.md">Use Custom Styles</a></td>
            <td><a href="https://reymond-group.github.io/smilesDrawer/manual/atom-weights.md">Highlight Atoms</a></td>
        </tr>
        <tr>
            <td><img src="https://github.com/reymond-group/smilesDrawer/raw/master/docs/images/caffeine.png"></td></td>
            <td><img src="https://github.com/reymond-group/smilesDrawer/raw/master/docs/images/customize.png"></td>
            <td><img src="https://github.com/reymond-group/smilesDrawer/raw/master/docs/images/weights.png"></td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://reymond-group.github.io/smilesDrawer/manual/reactions.md">Draw Reactions</a></td>
        </tr>
        <tr>
            <td colspan="3"><img src="https://github.com/reymond-group/smilesDrawer/raw/master/docs/images/reaction.png"></td></td>
        </tr>
    </tbody>
</table>


## Getting Started

### "Installation"

The latest version of SmilesDrawer can be found in the `dist` folder on GitHub:\
<https://github.com/reymond-group/smilesDrawer/tree/master/dist>

SmilesDrawer is available as `smiles-drawer` on [NPM](https://www.npmjs.com/package/smiles-drawer).
You can install it with your favorite JavaScript package manager (`npm`, `pnpm`,
`yarn`, etc.).

The code on NPM is also available through various CDNs, including:

- **UNPKG**     <https://unpkg.com/smiles-drawer@2/dist/smiles-drawer.min.js>
- **jsDelivr**  <https://cdn.jsdelivr.net/npm/smiles-drawer@2/dist/smiles-drawer.min.js>
- **ESM.sh**    <https://esm.sh/smiles-drawer@2/dist/smiles-drawer.min.js>

If you'd rather build your own version of SmilesDrawer - or if you're interested
in contributing - see `CONTRIBUTING.md`.


### Simple Drawing

If you just want to  display some molecules,  create some `canvas` elements with
the `data-smiles` attribute set,  then call `SmilesDrawer.apply()`.  Control the
size of the drawings with an options object.

```html
<html>
    <head>
        <script type="text/javascript" src="path/to/smiles-drawer.min.js"></script>
    </head>
    <body>
        <canvas data-smiles="Cn1cnc2c1C(=O)N(C(=O)N2C)C"></canvas>
        <canvas data-smiles="c1(C=O)cc(OC)c(O)cc1"></canvas>
        <script type="text/javascript">
            SmilesDrawer.apply({width: 300, height: 200})
        </script>
    </body>
</html>
```

### Dynamic Drawing

To draw a single molecule to a  specific HTML element,  create a `SmiDrawer` and
use  its `draw()` function.  This can be used to update a molecule when an input
changes:

```html
<html>
    <head>
        <script type="text/javascript" src="path/to/smiles-drawer.min.js"></script>
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

### More Examples

- See  [Basic Drawing](docs/manual/basic-drawing.md) for more information on the
  functions used above.

- See [Drawing Reactions](docs/manual/reactions.md) for how to draw reactions.

- See  [SmilesDrawer in Other Frameworks](docs/frameworks) for examples of using
  SmilesDrawer in various JavaScript frameworks.

- See the [Documentation Index](docs/manual#readme) for many other topics.



## Customizing SmilesDrawer

### Options

Options are passed to the `SmilesDrawer.apply()` function and to the `SmiDrawer`
constructor.  Note that `width` and `height`  are included in these options:  if
you want to create drawings of different sizes, you'll need to instantiate a new
`SmiDrawer` for each size.

The most useful options are listed below,  but almost everything in SmilesDrawer
is customizable: see [Customization](docs/manual/customization.md)  for the full
list of options.

| Option                        | Default     | Description
| ----------------------------- | ----------- | --------------
| `width`                       | `500`       | Drawing width
| `height`                      | `500`       | Drawing height
| `atomVisualization`           | `"default"` | Atom visualization: `"default"`, `"balls"`, or `"none"`
| `compactDrawing`              | `true`      | Draw concatenated terminals and pseudo-elements
| `terminalCarbons`             | `false`     | Show terminal carbons (CH3)
| `explicitHydrogens`           | `true`      | Show explicit hydrogens

You can also experiment with options in the SmilesDrawer Playground:

- <https://reymond-group.github.io/smilesDrawer/tools/playground.html>


### Themes

Themes let you control the colors of atoms.  SmilesDrawer uses the `light` theme
by default,  but it comes with many other themes built in.  You can see these in
the Theme Gallery:

- <https://reymond-group.github.io/smilesDrawer/tools/theme-gallery.html>

To use a built-in theme, pass its name when drawing.  For example, to use the
`matrix` theme with `SmilesDrawer.apply()`:

```js
SmilesDrawer.apply(options, "canvas[data-smiles]", "matrix");
```

Or to use the `gruvbox` theme with `SmiDrawer.draw()`:

```js
const drawer = new SmilesDrawer.SmiDrawer(options);
drawer.draw(smiles, target, "gruvbox");
```

For more information on themes - including how to create custom themes with your
own  colors - see the  [Themes](docs/manual/customization.md#themes)  section of
the Customization guide.


## Further Reading

For more detailed documentation, see the [SmilesDrawer Manual](docs/manual#readme).


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


### Thank you for contributing!

- SRI International's CSE group (for the excellent SVG support).
- And all our [contributors](https://github.com/reymond-group/smilesDrawer/graphs/contributors) on GitHub!
