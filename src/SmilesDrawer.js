/**
 * The SmilesDrawer namespace.
 * @typicalname SmilesDrawer
 */
let SmilesDrawer = {
    Version: '1.0.0'
};

/**
 * Cleans a SMILES string (removes non-valid characters)
 *
 * @static
 * @param {string} smiles A SMILES string.
 * @returns {string} The clean SMILES string.
 */
SmilesDrawer.clean = function(smiles) {
    return smiles.replace(/[^A-Za-z0-9@\.\+\-\?!\(\)\[\]\{\}/\\=#\$:\*]/g,'');
}

/**
 * Applies the smiles drawer draw function to each canvas element that has a smiles string in the data-smiles attribute.
 *
 * @static
 * @param {objects} options SmilesDrawer options.
 * @param {string} [themeName='light'] The theme to apply.
 */
SmilesDrawer.apply = function(options, themeName='light') {
    let smilesDrawer = new SmilesDrawer.Drawer(options);
    let elements = document.querySelectorAll('canvas[data-smiles]');

    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        let data = SmilesDrawer.parse(SmilesDrawer.clean(element.getAttribute('data-smiles')));

        smilesDrawer.draw(data, element, themeName, false);
    }

}

/**
 * Parses the entered smiles string.
 * 
 * @static
 * @param {string} smiles A SMILES string.
 * @param {Function} successCallback A callback that is called on success with the parse tree.
 * @param {Function} errorCallback A callback that is called with the error object on error.
 */
SmilesDrawer.parse = function(smiles, successCallback, errorCallback) {
    try {
        if (successCallback) {
            successCallback(SmilesDrawer.Parser.parse(smiles));
        }
    } catch (err) {
        if (errorCallback) {
            errorCallback(err);
        }
    }
}