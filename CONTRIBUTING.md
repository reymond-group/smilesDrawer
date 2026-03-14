# Developing SmilesDrawer

### Getting the Code

You'll need [Git](https://git-scm.com) and  [Node.js](https://nodejs.org) before
you can get started, so install them if you don't have them already.

To get the code,  use Git to clone  the SmilesDrawer repository from GitHub.  If
you're planning to contribute code to the official repo, fork the repo on GitHub
and clone your fork instead.

Then go into the directory that was just created and install all the development
dependencies with NPM (which comes as part of Node.js):

```sh
npm install
```

You'll need to run this command again if the dependencies get updated (these are
listed in `package.json`).


### Building the Package

SmilesDrawer "compiles" to a JavaScript bundle, which can be found in the `dist`
folder.

When doing development work on SmilesDrawer,  you'll use a special bundle called
`dist/smiles-drawer.dev.js`. This file isn't checked into Git, but it is used by
all the HTML files in the `test` directory.  To (re)create it, run:

```sh
npm run build
```

To have the build system watch for changes in the background and rebuild the dev
bundle whenever you save a file, run `watch` instead:

```sh
npm run watch
```

To use your custom version of SmilesDrawer, copy `dist/smiles-drawer.dev.js` out
to wherever you need it.  Alternatively, you can use `npm run minify` to build a
minified version at `dist/smiles-drawer.dev.min.js`.


### Testing Your Changes

There are some visual tests in the `test/visual` folder.  These aren't automated
at the moment,  but you can open them in your browser and inspect them visually.
Each test should have a description of the expected behaviour, and an indication
of whether or not it has been passing historically.

There are also automated tests.  To run these, run:

```sh
npm run test
```

If you contribute a new feature, please add tests for it as well!



## Contributing

The best way to contribute to SmilesDrawer is to make a pull request to the repo
on GitHub.  If you're making a big change or adding a feature,  it's a good idea
to open a GitHub issue first to ask for feedback.


### Code Quality Checks

_Note: Code cleanup is still in progress, so expect to see some errors for now!_

Your code should pass all automated quality checks before it can be merged.  You
can run these locally via NPM:

```sh
npm run typecheck
npm run lint
```

The code should have no type errors and no lint errors.  Lint warnings are okay,
though fewer is obviously better. Some warnings will be upgraded to errors as we
make progress on cleaning up the code.


## Cutting a Release

Regular contributors should not do this!  This is for the maintainers to do when
they decide it's time to release a new version of SmilesDrawer.

1. Make a new branch to contain your version update.
2. Update the version number in `package.json` and `app.js`.  It may also appear
   in  `README.md` or other documentation.  Use `grep` with the `-r` (recursive)
   flag to make sure you've found them all.
3. Rebuild the official bundles by running `npm run release`.
4. Commit your changes and push them to GitHub.  Make a pull request.
5. Once the pull request is merged, create a "release" on GitHub. Tag the latest
   commit  (the one that was created by the merge)  as `vX.Y.Z`, where `X`, `Y`,
   and `Z` are the major, minor, and patch version numbers (e.g. `v1.2.3`).
6. Publish the package to NPM.  This is currently blocked, but should be handled
   automatically once GitHub Actions is set up correctly.
