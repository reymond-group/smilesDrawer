# Polymer `bracket-n` figures (SVG)

Static renders for the root **README** and maintainer review. Regenerate from repo root:

```bash
npm run figures:pr
```

Source: `test/manual/generate-pr-figures.test.js`.

| File | SMILES | Mode |
|------|--------|------|
| `fig01-pmma-none.svg` | `[*]CC(C(=O)OC)[*]` | `none` |
| `fig02-pmma-bracket-n.svg` | `[*]CC(C(=O)OC)[*]` | `bracket-n` |
| `fig03-ester-bracket-n.svg` | `*CC(=O)O*` | `bracket-n` |
| `fig04-internal-wildcards.svg` | `C[*]CC[*]` | `bracket-n` (overlay off) |
