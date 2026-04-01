<script>
    import {afterUpdate} from 'svelte';

    export let smiles  = '';
    export let options = {};
    export let theme   = 'light'

    let target;

    afterUpdate(() => {
        SmilesDrawer.parse(smiles, (tree) => {
            const drawer = new SmilesDrawer.Drawer(options);
            drawer.draw(tree, target, theme);
        }, (error) => {
            // Handle parse errors (invalid SMILES) here.
            console.warn(error);
        });
    });
</script>

<canvas bind:this={target} data-smiles={smiles}></canvas>
