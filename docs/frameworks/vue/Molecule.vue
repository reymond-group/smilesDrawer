<script setup>
    import {useTemplateRef, watchEffect} from 'vue';

    const canvas = useTemplateRef('canvas');
    const props  = defineProps({
        smiles:  {type: String, required: true},
        options: {type: Object, default:  {}},
        theme:   {type: String, default:  'light'},
    });

    watchEffect(() => {
        if (canvas.value === null) {
            // Not ready yet...
            return
        }

        SmilesDrawer.parse(props.smiles, (tree) => {
            const drawer = new SmilesDrawer.Drawer(props.options);
            drawer.draw(tree, canvas.value, props.theme);
        }, (error) => {
            // Handle parse errors (invalid SMILES) here.
            console.warn(error);
        });
    });
</script>

<template>
    <canvas ref="canvas" :data-smiles="props.smiles"></canvas>
</template>
