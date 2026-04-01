# Reaction Weights

You can add weights to atoms in reactions just like you can with atoms in single
molecules. This works with `apply()`, `draw()`, and `parse()` then `draw()`, and
gives your molecules the same red and/or green glow.

For a live example of all three methods, see:

- <http://reymond-group.github.io/smilesDrawer/manual/live/reaction-weights.html>


**Caution:**

- There doesn't seem to be any way  to show weights for reagents.  The parameter
  exists,  but reagents  aren't rendered  as molecules  (they appear as formulae
  over the reaction arrow).
- Drawing weights currently adds white backgrounds to your molecules, regardless
  of the color scheme you have chosen.  Put your images on a white background to
  hide this.
- The current rendering mechanism uses lots and lots of SVG elements to simulate
  pixels inside the SVG.  This can result in artifacts when transferring the SVG
  to an `img` or `canvas`; for best results, draw weighted reactions as `svg`s.


## Apply

To add weights to a reaction, add at least one of these attributes:

- `data-smiles-reactant-weights`
- `data-smiles-reagent-weights`
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


## Draw

You can also pass weights to  `SmiDrawer.draw()`:  pass them as an object with a
key  for each category.  Values in this object are  arrays of arrays:  the outer
array has one inner array for each molecule, and each inner array has one weight
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


## Parse then Draw

You can also  parse your reaction in advance,  and then pass  the reaction and a
weights object to `ReactionDrawer.draw()`:

```js
SmilesDrawer.parseReaction('CF.FC#N>>CC#N.FF', (result) => {
    const drawer = new ReactionDrawer(reaction_options, molecule_options);
    drawer.draw(result, '#id-of-svg', 'light', weights);
}, (error) => {
    // Handle parse errors here!
});
```

**Caution:**

- This method can currently only draw to SVG elements.


## Function Reference

- [`SmiDrawer.apply()`](entrypoints.md#smidrawer-apply)
- [`SmiDrawer.draw()`](entrypoints.md#smidrawer-draw)
- [`ReactionDrawer.draw()`](entrypoints.md#reactiondrawer-draw)


## See Also

- [Drawing Weighted Molecules](weights.md)
- [Drawing Unweighted Reactions](reactions.md)
- [Back to the Index](README.md)
