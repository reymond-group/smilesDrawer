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

```
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Smiles Drawer Example</title>
        <meta name="description" content="A minimal smiles drawer example.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <input id="example-input" name="example-input" />
        <canvas id="example-canvas" width="500" height="500"></canvas>

        <script src="/dist/smiles-drawer.min.js"></script>
        <script>
            var input = document.getElementById('example-input');
            var options = {};
            
            // Initialize the drawer
            var smilesDrawer = new SmilesDrawer(options);
            
            input.addEventListener('input', function() {
                // Parse the input
                var data = smiles.parse(input.value);

                // Draw to the canvas
                smilesDrawer.draw(data, 'example-canvas', 'light', false);
            });

        </script>
    </body>
</html>
```

### Options

### [Documentation](/doc/all.md)
The documentation can be found in the docs folder. A markdown version is available [here](/doc/all.md).
