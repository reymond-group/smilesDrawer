![Smiles Drawer](https://github.com/reymond-group/smilesDrawer/blob/master/logo.png?raw=true)
# Smiles Drawer
### Building Smiles Drawer
If you decide not to use the ready-to-go scripts in `dist`, you can (edit and) build the project by running:
```
npm install
gulp
```

### Getting Started
To get a simple input box which lets the user enter a SMILES and then display it in a canvas, the following minimal example is sufficient.
In order to have nice consistent font rendering you have to include the droid sans font from google fonts.
```
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Smiles Drawer Example</title>
        <meta name="description" content="A minimal smiles drawer example.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <link href="https://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet">
    </head>
    <body>
        <input id="example-input" name="example-input" />
        <canvas id="example-canvas" width="500" height="500"></canvas>

        <script src="/dist/smiles-drawer.min.js"></script>
        <script>
            let input = document.getElementById('example-input');
            let options = {};
            
            // Initialize the drawer
            let smilesDrawer = new SmilesDrawer(options);
            
            input.addEventListener('input', function() {
                // Parse the input
                let data = smiles.parse(input.value);

                // Draw to the canvas
                smilesDrawer.draw(data, 'example-canvas', 'light', false);
            });
        </script>
    </body>
</html>
```
See the example folder for a more complete example.
### Options
The options are supplied to the constructor as shown in the example above.
```
let options = { ... };
let smilesDrawer = new SmilesDrawer(options);
```
The following options are available:

| Option | Identifier | Data Type | Default Value |
|---|---|---|---|
| Bond length | bondLength | number | 25 |
| Short bond length (e.g. double bonds in rings) | shortBondLength  | number | 20 |
| Bond spacing (e.g. space between double bonds | bondSpacing | number | 4 |
| Debug (draw debug information to canvas | debug | boolean | false |
| Color themes | themes | object | see below |


The default options are defined as follows:
```
{
    shortBondLength: 20,
    bondLength: 25,
    bondSpacing: 4,
    debug: false,
    themes: {
        dark: {
            C: '#fff',
            O: '#e74c3c',
            N: '#3498db',
            F: '#27ae60',
            CL: '#16a085',
            BR: '#d35400',
            I: '#8e44ad',
            P: '#d35400',
            S: '#f1c40f',
            B: '#e67e22',
            SI: '#e67e22',
            BACKGROUND: '#141414'
        },
        light: {
            C: '#222',
            O: '#e74c3c',
            N: '#3498db',
            F: '#27ae60',
            CL: '#16a085',
            BR: '#d35400',
            I: '#8e44ad',
            P: '#d35400',
            S: '#f1c40f',
            B: '#e67e22',
            SI: '#e67e22',
            BACKGROUND: '#fff'
        }
    }
};
```
### [Documentation](/doc/all.md)
The documentation can be found in the docs folder. A markdown version is available [here](/doc/all.md).
